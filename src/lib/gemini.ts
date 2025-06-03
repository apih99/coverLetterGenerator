import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
export const initializeGeminiClient = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("Gemini API key is not defined");
  }
  
  return new GoogleGenerativeAI(apiKey);
};

// Generate cover letter based on resume text, company name, and position
export const generateCoverLetter = async (
  resumeText: string,
  userName: string,
  userEmail: string,
  userPhone: string,
  companyName: string,
  position: string
) => {
  try {
    console.log("Calling generate API with data:", {
      resumeTextLength: resumeText.length,
      companyName,
      position,
      userName,
      userEmail,
      userPhone,
    });
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeText,
        userName,
        userEmail,
        userPhone,
        companyName,
        position,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API response error:", errorData);
      
      if (errorData.error === "API key not configured") {
        throw new Error("Gemini API key is not configured. Please add it to your .env.local file.");
      }
      
      if (errorData.details) {
        throw new Error(`${errorData.error}: ${errorData.details}`);
      }
      
      throw new Error(errorData.error || 'Failed to generate cover letter');
    }

    const data = await response.json();
    return data.coverLetter;
  } catch (error: unknown) {
    console.error("Error generating cover letter:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage.includes("API key")) {
      throw new Error("Gemini API key is not configured. Please add it to your .env.local file.");
    }
    throw error;
  }
}; 