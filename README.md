# 🤖 AI Cover Letter Generator

A modern, intelligent Next.js web application that generates professional, personalized cover letters using Google's Gemini AI. Simply upload your resume, enter job details, and get a tailored cover letter ready for download as a PDF.

## ✨ Features

- **📄 PDF Resume Upload**: Upload your resume in PDF format for AI analysis
- **🎯 Personalized Generation**: Creates cover letters tailored to specific job positions and companies
- **📱 Responsive Design**: Modern, mobile-friendly interface built with Next.js 15 and Tailwind CSS
- **⚡ Fast Processing**: Powered by Google's Gemini AI for quick, intelligent content generation
- **📥 PDF Download**: Download your generated cover letter as a professionally formatted PDF
- **🔒 Privacy First**: Your data is processed securely and not stored permanently
- **🚀 Modern Tech Stack**: Built with the latest Next.js, React 19, and TypeScript

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 18.x or later ([Download here](https://nodejs.org/))
- **Gemini API Key**: Get yours from [Google AI Studio](https://aistudio.google.com/) (free tier available)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/cover-letter-generator.git
   cd cover-letter-generator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   # Required: Get your API key from https://aistudio.google.com/
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Key Setup

> **⚠️ Important**: The application requires a Gemini API key to function. Without it, you'll encounter generation errors.

### Getting Your API Key:

1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Navigate to **"Get API Key"** section
4. Create a new project (if needed)
5. Generate a new API key
6. Copy the key and add it to your `.env.local` file

### Free Tier Information:
- The Gemini API offers a generous free tier
- Perfect for personal use and testing
- Rate limits apply but are sufficient for individual use

## 📖 How to Use

1. **Personal Information**: Fill in your name, email, and phone number
2. **Job Details**: Enter the company name and position title you're applying for
3. **Resume Upload**: Upload your resume as a PDF file (the AI will extract and analyze the content)
4. **Generate**: Click "Generate Cover Letter" and wait for the AI to create your personalized letter
5. **Review & Edit**: Review the generated content and make any necessary adjustments
6. **Download**: Click "Download as PDF" to save your professional cover letter

## 🛠️ Available Scripts

```bash
# Development with Turbopack for faster builds
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🏗️ Project Structure

```
cover-letter-generator/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/            # API routes
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── CoverLetterForm.tsx
│   │   └── SimplePdfUploader.tsx
│   └── lib/               # Utility functions
├── public/                # Static assets
├── .env.local            # Environment variables (create this)
└── package.json          # Dependencies and scripts
```

## 🧰 Technologies Used

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with modern features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### AI & Processing
- **[Google Gemini API](https://ai.google.dev/)** - Advanced AI text generation
- **[@react-pdf/renderer](https://react-pdf.org/)** - PDF generation in React

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Turbopack](https://turbo.build/pack)** - Fast bundler for development

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI Team** for the powerful Gemini API
- **Vercel Team** for Next.js and excellent developer experience
- **React PDF Team** for seamless PDF generation capabilities

## 🐛 Troubleshooting

### Common Issues

**"Failed to generate cover letter" error:**
- Ensure your `.env.local` file contains a valid `GEMINI_API_KEY`
- Check that your API key has proper permissions
- Verify your internet connection

**PDF upload not working:**
- Ensure the file is a valid PDF
- Check file size (recommended under 10MB)
- Try with a different PDF file

**Development server won't start:**
- Ensure Node.js 18+ is installed
- Delete `node_modules` and run `npm install` again
- Check for port conflicts (default port 3000)

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/cover-letter-generator/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

---

Made with ❤️ and powered by AI
