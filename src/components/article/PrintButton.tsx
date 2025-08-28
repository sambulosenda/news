'use client';

import { useState } from 'react';

interface PrintButtonProps {
  articleTitle?: string;
  className?: string;
}

export default function PrintButton({ articleTitle, className = '' }: PrintButtonProps) {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    
    // Add print-mode class to body for additional styling if needed
    document.body.classList.add('print-mode');
    
    // Set document title for print
    const originalTitle = document.title;
    if (articleTitle) {
      document.title = `${articleTitle} - Report Focus News`;
    }
    
    // Trigger print dialog
    window.print();
    
    // Cleanup after print
    setTimeout(() => {
      document.body.classList.remove('print-mode');
      document.title = originalTitle;
      setIsPrinting(false);
    }, 1000);
  };

  return (
    <button
      onClick={handlePrint}
      disabled={isPrinting}
      className={`print-button inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${className}`}
      aria-label="Print this article"
    >
      <svg 
        className="w-3 h-3 sm:w-4 sm:h-4" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" 
        />
      </svg>
      {isPrinting ? 'Preparing...' : 'Print'}
    </button>
  );
}