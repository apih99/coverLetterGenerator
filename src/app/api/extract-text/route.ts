import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    try {
      // Simple text extraction using TextDecoder
      const decoder = new TextDecoder('utf-8');
      let text = decoder.decode(new Uint8Array(arrayBuffer));
      
      // Clean up the text - remove non-printable characters
      text = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ');
      
      return NextResponse.json({ 
        text: text,
        source: 'server-fallback'
      });
    } catch (error) {
      console.error('Error extracting text:', error);
      return NextResponse.json(
        { error: 'Failed to extract text' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 