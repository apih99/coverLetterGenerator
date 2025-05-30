# AI Cover Letter Generator

A Next.js web application that generates professional cover letters using the Gemini API. Users can upload their resume as a PDF, enter the company name and position, and the AI will generate a personalized cover letter that can be downloaded as a PDF.

## Features

- Upload your resume as a PDF
- Generate personalized cover letters based on your resume and job details
- Download cover letters as PDF files
- Modern, responsive UI built with Next.js and Tailwind CSS
- Powered by Google's Gemini AI

## Getting Started

### Prerequisites

- Node.js 18.x or later
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cover-letter-generator.git
   cd cover-letter-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. **IMPORTANT**: Create a `.env.local` file in the root directory with your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/).

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Key Setup (Required)

The application requires a Gemini API key to function. Without it, you'll see a "Failed to generate cover letter" error.

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create an account or sign in
3. Navigate to the API keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file as shown above

## How to Use

1. Fill in your personal information (name, email, phone)
2. Enter the company name and position you're applying for
3. Upload your resume as a PDF file
4. Click "Generate Cover Letter"
5. Review the generated cover letter
6. Click "Download as PDF" to save the cover letter

## Technologies Used

- Next.js
- React
- Tailwind CSS
- Google Gemini API
- React-PDF for PDF generation
- pdf-parse for PDF text extraction

## License

This project is licensed under the MIT License.

## Acknowledgments

- Google Gemini API for AI text generation
- Next.js team for the excellent framework
