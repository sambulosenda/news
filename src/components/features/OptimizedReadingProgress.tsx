'use client';

import { useEffect, useState, useCallback } from 'react';

// Debounced scroll handler for better performance
function useThrottledScroll(callback: () => void, delay: number = 16) {
  const [isThrottled, setIsThrottled] = useState(false);

  const throttledCallback = useCallback(() => {
    if (!isThrottled) {
      callback();
      setIsThrottled(true);
      setTimeout(() => setIsThrottled(false), delay);
    }
  }, [callback, delay, isThrottled]);

  return throttledCallback;
}

export default function OptimizedReadingProgress() {
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setProgress(Math.min(100, Math.max(0, scrollProgress)));
  }, []);

  const throttledUpdateProgress = useThrottledScroll(updateProgress, 16); // ~60fps

  useEffect(() => {
    // Use passive listeners for better scroll performance
    const options = { passive: true, capture: false };
    window.addEventListener('scroll', throttledUpdateProgress, options);
    window.addEventListener('resize', updateProgress, options);
    
    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener('scroll', throttledUpdateProgress, options);
      window.removeEventListener('resize', updateProgress, options);
    };
  }, [throttledUpdateProgress, updateProgress]);

  // Use CSS transforms for better performance (GPU acceleration)
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-red-600 transition-transform duration-75 ease-out will-change-transform"
        style={{ 
          transform: `translateX(${progress - 100}%)`,
          transformOrigin: 'left center'
        }}
      />
    </div>
  );
}