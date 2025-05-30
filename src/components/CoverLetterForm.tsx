'use client';

import React, { useState } from 'react';
import { generateCoverLetter } from '../lib/gemini';
import { PDFDownloadButton } from '../lib/pdfGenerator';
import SimplePdfUploader from './SimplePdfUploader';

const CoverLetterForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    userName: '',
    userEmail: '',
    userPhone: '',
  });
  
  // Resume text state
  const [resumeText, setResumeText] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionSuccess, setExtractionSuccess] = useState(false);
  
  // Generated cover letter state
  const [coverLetter, setCoverLetter] = useState('');
  const [editedCoverLetter, setEditedCoverLetter] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle text extraction
  const handleTextExtracted = (text: string) => {
    setResumeText(text);
    setExtractionSuccess(true);
    setError('');
  };

  // Handle extraction error
  const handleExtractionError = (errorMsg: string) => {
    setError(errorMsg);
    setExtractionSuccess(false);
  };

  // Handle edit mode toggle
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle save edited cover letter
  const handleSaveEdit = () => {
    setCoverLetter(editedCoverLetter);
    setIsEditing(false);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditedCoverLetter(coverLetter);
    setIsEditing(false);
  };

  // Handle edit text change
  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedCoverLetter(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');
    
    try {
      // Validate required fields
      if (!resumeText || !formData.companyName || !formData.position) {
        throw new Error('Please upload your resume and fill in all required fields');
      }
      
      // Generate cover letter
      const generatedText = await generateCoverLetter(
        resumeText,
        formData.userName,
        formData.userEmail,
        formData.userPhone,
        formData.companyName,
        formData.position
      );
      
      setCoverLetter(generatedText);
      setEditedCoverLetter(generatedText);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to generate cover letter');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="userEmail"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="userPhone"
                name="userPhone"
                value={formData.userPhone}
                onChange={handleChange}
                className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          {/* Job Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Job Information</h3>
            
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position/Role *
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="text-gray-900 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
        
        {/* Resume Upload */}
        <div>
          <SimplePdfUploader
            onTextExtracted={handleTextExtracted}
            onError={handleExtractionError}
            onExtractionStart={() => setIsExtracting(true)}
            onExtractionEnd={() => setIsExtracting(false)}
          />
          {isExtracting && (
            <div className="mt-2">
              <p className="text-sm text-blue-600">Extracting text from PDF...</p>
            </div>
          )}
          {extractionSuccess && (
            <div className="mt-2">
              <p className="text-sm text-green-600">✓ Resume text extracted successfully</p>
            </div>
          )}
        </div>
        
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isGenerating || isExtracting || !resumeText}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
          >
            {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Note: You need to set up a Gemini API key in the .env.local file for this to work.
          </p>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
            {error.includes("API key") && (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <h4 className="font-medium">API Key Required</h4>
                <p className="text-sm mt-1">
                  You need to set up a Gemini API key to use this application:
                </p>
                <ol className="list-decimal list-inside text-sm mt-1 space-y-1">
                  <li>Go to <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google AI Studio</a></li>
                  <li>Create an account or sign in</li>
                  <li>Get an API key</li>
                  <li>Create a <code className="bg-gray-100 px-1 rounded">.env.local</code> file in the project root</li>
                  <li>Add <code className="bg-gray-100 px-1 rounded">GEMINI_API_KEY=your_key_here</code></li>
                  <li>Restart the application</li>
                </ol>
              </div>
            )}
          </div>
        )}
      </form>

      {/* Generated Cover Letter */}
      {coverLetter && (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-blue-800 text-xl font-bold">Your Cover Letter</h2>
            <div className="flex space-x-3">
              {!isEditing ? (
                <>
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Edit
                  </button>
                  <PDFDownloadButton
                    coverLetterText={coverLetter}
                    userName={formData.userName}
                    userEmail={formData.userEmail}
                    userPhone={formData.userPhone}
                    companyName={formData.companyName}
                    position={formData.position}
                  />
                </>
              ) : (
                <>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
          
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={editedCoverLetter}
                onChange={handleEditChange}
                className="w-full h-96 p-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 resize-vertical"
                placeholder="Edit your cover letter here..."
              />
              <p className="text-sm text-gray-500">
                Make any changes to your cover letter above. Click "Save" to keep your changes or "Cancel" to discard them.
              </p>
            </div>
          ) : (
            <div className="text-gray-900 bg-white p-6 border border-gray-200 rounded-md shadow-sm whitespace-pre-wrap">
              {coverLetter}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoverLetterForm; 