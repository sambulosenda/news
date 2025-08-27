'use client';

import { useState } from 'react';

export default function TestErrorPage() {
  const [testType, setTestType] = useState('');

  const triggerError = (type: string) => {
    setTestType(type);
    
    switch(type) {
      case 'client':
        // This will be caught by the ErrorBoundary
        throw new Error('Test client-side error for Sentry');
        
      case 'async':
        // Async error
        setTimeout(() => {
          throw new Error('Test async error for Sentry');
        }, 100);
        break;
        
      case 'promise':
        // Unhandled promise rejection
        Promise.reject(new Error('Test promise rejection for Sentry'));
        break;
        
      case 'reference':
        // Reference error
        // @ts-expect-error Testing reference error for Sentry monitoring
        window.nonExistentFunction();
        break;
        
      case 'type':
        // Type error
        // @ts-expect-error Testing type error for Sentry monitoring
        (null).toString();
        break;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Error Monitoring Test Page</h1>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-yellow-800">
            <strong>⚠️ Warning:</strong> This page is for testing error monitoring only.
            Click the buttons below to trigger different types of errors that will be sent to Sentry.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-4">Test Error Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => triggerError('client')}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Trigger Client Error
              </button>
              
              <button
                onClick={() => triggerError('async')}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              >
                Trigger Async Error
              </button>
              
              <button
                onClick={() => triggerError('promise')}
                className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
              >
                Trigger Promise Rejection
              </button>
              
              <button
                onClick={() => triggerError('reference')}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Trigger Reference Error
              </button>
              
              <button
                onClick={() => triggerError('type')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Trigger Type Error
              </button>
              
              <button
                onClick={() => {
                  window.location.href = '/non-existent-page-404';
                }}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Test 404 Error
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">How to verify:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>Make sure Sentry DSN is configured in your environment variables</li>
              <li>Click any button above to trigger an error</li>
              <li>Check your Sentry dashboard to see the error report</li>
              <li>The error should include stack trace, user context, and breadcrumbs</li>
            </ol>
          </div>

          {testType && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                Attempting to trigger {testType} error...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}