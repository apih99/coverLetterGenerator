'use client';

import { useState, useEffect } from 'react';

export default function TestPage() {
  const [envData, setEnvData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    async function checkEnv() {
      try {
        const response = await fetch('/api/test-env');
        const data = await response.json();
        setEnvData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    checkEnv();
  }, []);

  const testGeminiApi = async () => {
    setTestLoading(true);
    setTestResult(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: "I am a software developer with 5 years of experience in React and Node.js.",
          userName: "John Doe",
          userEmail: "john.doe@example.com",
          userPhone: "123-456-7890",
          companyName: "Test Company",
          position: "Software Developer",
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.details || 'Unknown error');
      }
      
      setTestResult(data.coverLetter || JSON.stringify(data));
    } catch (err: any) {
      setTestResult(`Error: ${err.message}`);
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
        {loading ? (
          <p>Loading environment data...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-w-2xl">
            {JSON.stringify(envData, null, 2)}
          </pre>
        )}
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Test Gemini API</h2>
        <button
          onClick={testGeminiApi}
          disabled={testLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {testLoading ? 'Testing...' : 'Test API'}
        </button>
        
        {testResult && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Result:</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-w-2xl max-h-96">
              {testResult}
            </pre>
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Manual Setup Instructions</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Create a <code className="bg-gray-100 px-1 rounded">.env.local</code> file in the project root directory</li>
          <li>Add the following line: <code className="bg-gray-100 px-1 rounded">GEMINI_API_KEY=your_api_key_here</code></li>
          <li>Restart the development server</li>
          <li>Try the test again</li>
        </ol>
      </div>
    </div>
  );
} 