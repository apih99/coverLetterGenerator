'use client';

import React, { useState } from 'react';

interface SimplePdfUploaderProps {
  onTextExtracted: (text: string) => void;
  onError: (error: string) => void;
  onExtractionStart: () => void;
  onExtractionEnd: () => void;
}

const SimplePdfUploader: React.FC<SimplePdfUploaderProps> = ({
  onTextExtracted,
  onError,
  onExtractionStart,
  onExtractionEnd
}) => {
  const [fileName, setFileName] = useState<string>('');

  const extractText = async (file: File) => {
    try {
      onExtractionStart();
      setFileName(file.name);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      
      // Send to API
      const response = await fetch('/api/extract-text', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to extract text from PDF');
      }
      
      const data = await response.json();
      onTextExtracted(data.text);
    } catch (err: any) {
      onError(err.message || 'Failed to extract text from PDF');
    } finally {
      onExtractionEnd();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.type !== 'application/pdf') {
      onError('Please upload a PDF file');
      return;
    }
    
    extractText(file);
  };

  return (
    <div>
      <label htmlFor="resumeUpload" className="block text-sm font-medium text-gray-700">
        Upload Your Resume (PDF) *
      </label>
      <div className="mt-1 flex items-center">
        <input
          type="file"
          id="resumeUpload"
          accept="application/pdf"
          onChange={handleFileChange}
          className="sr-only"
        />
        <label
          htmlFor="resumeUpload"
          className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Choose PDF file
        </label>
        <span className="ml-3 text-sm text-gray-500">
          {fileName || 'No file chosen'}
        </span>
      </div>
    </div>
  );
};

export default SimplePdfUploader; 