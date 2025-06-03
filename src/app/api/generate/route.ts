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
      You are an expert AI assistant specializing in crafting compelling, professional cover letters.
      Your goal is to generate a personalized cover letter based on the provided information.
      The cover letter MUST be ready to send, with no placeholders or instructions for the user to fill in later.
      
      Here is the information to use:
      
      **Candidate Information:**
      Name: ${userName}
      Email: ${userEmail}
      Phone: ${userPhone}
      
      **Job Application Details:**
      Company Name: ${companyName}
      Position Applied For: ${position}
      
      **Candidate's Resume Text:**
      --- START RESUME TEXT ---
      ${resumeText}
      --- END RESUME TEXT ---
      
      **Cover Letter Requirements:**
      
      **Structure:**
      1.  **Introduction:**
          *   Clearly state the candidate's name.
          *   Mention the specific position (${position}) they are applying for.
          *   Mention the company (${companyName}).
          *   Briefly express strong interest and enthusiasm for the role and company.
      2.  **Body Paragraph 1 (Skills & Experience):**
          *   Highlight 2-3 key skills or experiences directly from the **Candidate's Resume Text** that are most relevant to the **Position Applied For** (${position}).
          *   Provide specific examples or achievements from the resume to back up these claims. If the resume mentions projects like "TeleAIBot" or "Face Recognition Attendance System", try to weave them in as examples of their capabilities.
      3.  **Body Paragraph 2 (Company Fit & Motivation):**
          *   Explain *why* the candidate is a good fit for **${companyName}**.
          *   If possible, subtly infer or state a general positive attribute about ${companyName} or its industry that would appeal to a candidate applying for ${position}. For example, if it's an insurance company, you could mention their stability, customer focus, or use of data. If it's a tech company, innovation or cutting-edge projects.
          *   Connect the candidate's motivations or values (as can be inferred from the resume) to the company.
      4.  **Closing Paragraph:**
          *   Reiterate strong interest in the opportunity.
          *   Express eagerness to discuss their qualifications further in an interview.
          *   Mention that their resume provides further detail.
      5.  **Professional Sign-off:**
          *   Use "Sincerely," followed by the candidate's full name (${userName}).
      
      **Tone and Style:**
      *   Professional and formal, yet enthusiastic and confident.
      *   Personalized: The content should feel tailored to the candidate's resume and the specific company/role.
      *   Concise and impactful. Avoid jargon unless it's present in the resume and relevant to the role.
      
      **Strict Instructions (Crucial):**
      *   **NO PLACEHOLDERS:** Absolutely do not include bracketed placeholders like "[Your Skill]", "[Reason for Interest]", "[Platform where you saw the advertisement]", or "[Company Address]". Generate complete sentences and paragraphs.
      *   **USE PROVIDED INFORMATION:** Base the letter *only* on the information provided (Name, Email, Phone, Company, Position, Resume Text). Do not invent skills or experiences not found in the resume.
      *   **NO DATES:** Do not include any date in the cover letter.
      *   **NO ADVERTISEMENT PLATFORM:** Do not ask or mention where the user saw the advertisement.
      *   **NO COMPANY ADDRESS FIELD:** Do not include a placeholder or field for the company address beneath the company name. Just the Hiring Manager and Company Name is sufficient for the recipient block.
      *   **RELY ON RESUME:** The core content for skills, experiences, and projects MUST come from the **Candidate's Resume Text**. If the resume text is sparse or lacks specific details for a section, write the best possible general statement that aligns with a professional seeking the specified role, rather than using a placeholder.
      
      Generate the cover letter now.
      `;

      // Generate the cover letter
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const coverLetter = response.text();

      return NextResponse.json({ coverLetter });
    } catch (apiError: unknown) {
      console.error("Gemini API error:", apiError);
      const errorMessage = apiError instanceof Error ? apiError.message : 'Unknown API error';
      return NextResponse.json(
        { 
          error: "Error calling Gemini API", 
          details: errorMessage
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Error generating cover letter:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: "Failed to generate cover letter",
        details: errorMessage
      },
      { status: 500 }
    );
  }
} 