import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userName, userEmail, userPhone, resumeText, companyName, position } = await request.json();

    // Validate input
    if (!resumeText || !companyName || !position || !userName || !userEmail || !userPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Initialize Gemini API
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    // Debug: Check if API key is present (don't log the full key for security)
    console.log("API Key present:", !!apiKey);
    console.log("API Key first few chars:", apiKey ? apiKey.substring(0, 3) + "..." : "none");
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Please add GEMINI_API_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

      // Create prompt for cover letter generation
      const prompt = `
        Generate a professional cover letter based on the following information:
        
        Resume Text (extracted from PDF):
        ${resumeText}
        Name: ${userName}
        Email: ${userEmail}
        Phone: ${userPhone}
        Company: ${companyName}
        Position: ${position}
        
        The cover letter should follow this structure:
        1. Introduction that mentions the position and company
        2. Body paragraphs highlighting relevant skills and experiences from the resume
        3. Explanation of why the candidate is a good fit for the company
        4. Closing paragraph expressing interest in an interview
        5. Professional sign-off
        6. Strictly follow the structure and format of the resume
        7. Do not put date in the cover letter
        
        Make it sound professional, enthusiastic, and personalized to both the resume and company.
      `;

      // Generate the cover letter
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const coverLetter = response.text();

      return NextResponse.json({ coverLetter });
    } catch (apiError: any) {
      console.error("Gemini API error:", apiError);
      return NextResponse.json(
        { 
          error: "Error calling Gemini API", 
          details: apiError.message || "Unknown API error" 
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error generating cover letter:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate cover letter",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
} 