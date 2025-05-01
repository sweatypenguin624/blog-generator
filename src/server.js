require('dotenv').config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT =5001;

// Middleware
app.use(cors({
  origin:'*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Configuration for model selection
const config = {
  provider: "groq",
  model: "deepseek-r1-distill-llama-70b",
  groq_api_url: "https://api.groq.com/openai/v1/chat/completions",
  groq_api_key:"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"
};

// In-memory storage with size limit
const MAX_FEEDBACK_SIZE = 1000;
let positive_feedback = [];
let negative_feedback = [];

// Function to generate a blog using Groq
const generateBlog = async (topic, wordCount, tone) => {
  try {
    // Input validation (unchanged)
    if (typeof wordCount !== 'number' || wordCount <= 0 || wordCount > 2000) {
      throw new Error('Word count must be a positive number up to 2000');
    }
    if (typeof topic !== 'string' || topic.trim().length === 0 || topic.length > 200) {
      throw new Error('Topic must be a string between 1 and 200 characters');
    }
    const allowedTones = ['formal', 'informal', 'humorous', 'serious'];
    if (!allowedTones.includes(tone)) {
      throw new Error('Tone must be one of: ' + allowedTones.join(', '));
    }
    if (!config.groq_api_key) {
      throw new Error('API key not configured');
    }
     
    const prompt = `
    Generate a well-structured, engaging, and informative blog post on the topic:  **"${topic.trim()}"** with approximately  **${wordCount}words**, written in a **${tone} tone**. The blog should be clear, coherent, and creatively written to captivate readers while maintaining logical flow and readability.

    Rules (STRICT—DO NOT VIOLATE):

    Begin the response IMMEDIATELY with a bold title.
    
    DO NOT generate ANY text before the title—no internal thoughts, no reasoning, no explanations.
    
    Structure:
    
    Title: Bold and engaging.
    
    Introduction: A strong hook (fact, question, or statement).
    
    Body: Use bold subheadings, examples, and bullet points where necessary.
    
    Conclusion: Summarize and provide a strong takeaway.
    
    STRICTLY FOLLOW:
    
    DO NOT include any thinking or reasoning before the blog.
    
    DO NOT generate markdown or unnecessary formatting except bold titles/subheadings.
    
    DO NOT add any unnecessary pre-text.
    
    🚨 IMPORTANT: If you generate ANY text before the title, you have FAILED. 🚨

    
    `;

    const payload = {
      model: config.model, // "mixtral-8x7b-32768"
      messages: [{ role: "user", content: prompt }],
      max_tokens: Math.min(1024, wordCount * 4),
    };
    
    console.log("Sending to Groq API:", JSON.stringify(payload, null, 2));
    console.log("Headers:", {
      Authorization: `Bearer ${config.groq_api_key.slice(0, 5)}...`, // Mask key for safety
      "Content-Type": "application/json",
    });

    const response = await axios.post(config.groq_api_url, payload, {
      headers: {
        Authorization: `Bearer ${config.groq_api_key}`,
        "Content-Type": "application/json",
      },
      timeout: 30000,
    });

    console.log("API Response:", response.data);
    return response.data.choices[0].message.content;
  } catch (error) {
    if (error.response) {
      console.error("Groq API Error:", error.response.status, error.response.data);
    } else {
      console.error("Error generating blog:", error.message);
    }
    throw error;
  }
};

// API to generate a blog
app.post("/generate-blog", async (req, res) => {
  try {
    const { topic, wordCount, tone } = req.body;
    
    if (!topic || !wordCount || !tone) {
      return res.status(400).json({ 
        success: false, 
        error: "Missing required fields: topic, wordCount, and tone are required" 
      });
    }

    const blog = await generateBlog(topic, wordCount, tone);
    res.json({ 
      success: true, 
      data: { blog } 
    });
  } catch (error) {
    res.status(error.message.includes('API key') ? 500 : 400).json({ 
      success: false, 
      error: error.message || "Failed to generate blog" 
    });
  }
});

// API to store feedback
// app.post("/submit-feedback", (req, res) => {
//   try {
//     const { blog, feedback } = req.body;

//     if (!blog || !feedback) {
//       return res.status(400).json({ 
//         success: false, 
//         error: "Missing blog content or feedback type" 
//       });
//     }

//     if (typeof blog !== 'string' || blog.trim().length === 0) {
//       return res.status(400).json({
//         success: false,
//         error: "Blog content must be a non-empty string"
//       });
//     }

//     if (feedback === "positive") {
//       if (positive_feedback.length >= MAX_FEEDBACK_SIZE) {
//         positive_feedback.shift(); // Remove oldest
//       }
//       positive_feedback.push(blog.trim());
//     } else if (feedback === "negative") {
//       if (negative_feedback.length >= MAX_FEEDBACK_SIZE) {
//         negative_feedback.shift(); // Remove oldest
//       }
//       negative_feedback.push(blog.trim());
//     } else {
//       return res.status(400).json({ 
//         success: false, 
//         error: "Feedback type must be 'positive' or 'negative'" 
//       });
//     }

//     res.json({ 
//       success: true, 
//       message: "Feedback submitted successfully",
//       data: {
//         total_positive: positive_feedback.length,
//         total_negative: negative_feedback.length
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ 
//       success: false, 
//       error: "Failed to process feedback: " + error.message 
//     });
//   }
// });

// API to retrieve stored feedback
// app.get("/get-feedback", (req, res) => {
//   try {
//     res.json({ 
//       success: true, 
//       data: { 
//         positive_feedback: positive_feedback.slice(-10), // Return last 10
//         negative_feedback: negative_feedback.slice(-10),
//         total_positive: positive_feedback.length,
//         total_negative: negative_feedback.length
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: "Failed to retrieve feedback: " + error.message
//     });
//   }
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Something went wrong on the server"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // if (!process.env.GROQ_API_KEY) {
  //   console.warn('Warning: GROQ_API_KEY is not set in environment variables');
  // }
});