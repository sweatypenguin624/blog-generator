
# 📝 AI Blog Generator

Transform your ideas into compelling blog posts effortlessly with the **AI Blog Generator**. This web application leverages modern web technologies to provide a seamless experience in generating, editing, and previewing blog content.

---

## 🚀 Features

- 🧠 **AI-Powered Content Generation**: Generate blog content based on user-provided topics or prompts.
- ✍️ **Rich Text Editor**: Utilize a user-friendly editor to modify and enhance generated content.
- 📄 **Live Preview**: Instantly preview your blog post as you edit.
- 💾 **Save & Export**: Save your drafts and export the final content in various formats.
- 🎨 **Responsive Design**: Enjoy a consistent experience across devices with a responsive UI.

---

## 🧰 Tech Stack

| Technology        | Description                             |
|-------------------|-----------------------------------------|
| ⚛️ React          | Frontend library for building UI        |
| 🎨 Tailwind CSS   | Utility-first CSS framework             |
| 📝 TypeScript     | Typed superset of JavaScript            |
| 🔧 Vite           | Fast frontend build tool                |
| 🗃️ Node.js        | Backend runtime environment             |
| 🧠 OpenAI API     | AI-powered content generation           |

---

## 📂 Project Structure

```
blog-generator/
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # API services and utilities
│   └── styles/           # Tailwind CSS configurations
├── .gitignore            # Git ignore file
├── index.html            # Main HTML file
├── package.json          # Project metadata and dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sweatypenguin624/blog-generator.git
   cd blog-generator
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

3. **Start the development server:**

   Using npm:

   ```bash
   npm run dev
   ```

   Or using Yarn:

   ```bash
   yarn dev
   ```

4. **Open in browser:**

   Navigate to `http://localhost:5173` to view the application.

---

## 🔑 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
VITE_OPENAI_API_KEY=your_openai_api_key
```

Replace `your_openai_api_key` with your actual API key from [OpenAI](https://openai.com/api/).

---

## 🧠 AI Integration

The application integrates with OpenAI's API to generate blog content based on user input. Ensure you have a valid API key and have set it in the `.env` file as described above.

---

## 📦 Build for Production

To build the project for production:

Using npm:

```bash
npm run build
```

Or using Yarn:

```bash
yarn build
```

The optimized files will be in the `dist/` directory.

---

## 📌 Future Enhancements

- [ ] 🌐 **Multilingual Support**: Generate content in multiple languages.
- [ ] 🖼️ **Image Integration**: Automatically add relevant images to blog posts.
- [ ] 📊 **Analytics Dashboard**: Track the performance of generated content.
- [ ] 🔗 **CMS Integration**: Directly publish to popular content management systems.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Sweaty Penguin**  
GitHub: [@sweatypenguin624](https://github.com/sweatypenguin624)
