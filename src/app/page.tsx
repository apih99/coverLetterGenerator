'use client';

import React from 'react';
import CoverLetterForm from '../components/CoverLetterForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
            AI Cover Letter Generator
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Create professional, personalized cover letters in seconds
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <CoverLetterForm />
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by Gemini AI - Create tailored cover letters for your job applications</p>
        </div>
        </div>
      </main>
  );
}
