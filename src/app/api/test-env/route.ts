import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check for environment variables
    const envVars = {
      GEMINI_API_KEY_EXISTS: !!process.env.GEMINI_API_KEY,
      NEXT_PUBLIC_GEMINI_API_KEY_EXISTS: !!process.env.NEXT_PUBLIC_GEMINI_API_KEY,
      NODE_ENV: process.env.NODE_ENV,
    };

    return NextResponse.json({
      message: "Environment check",
      environment: envVars,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to check environment",
        details: error.message,
      },
      { status: 500 }
    );
  }
} 