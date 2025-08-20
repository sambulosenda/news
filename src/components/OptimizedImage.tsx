'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fill?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  aspectRatio = '16/10',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  fill = false,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={fill ? {} : { aspectRatio }}
      >
        <svg 
          className="w-8 h-8 text-gray-400" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    onLoad: handleLoad,
    onError: handleError,
    priority,
    sizes,
    className: `${className} transition-opacity duration-300 ${
      isLoading ? 'opacity-0' : 'opacity-100'
    }`,
    ...(fill ? { fill: true } : { width, height }),
  };

  return (
    <div className={fill ? 'relative' : ''} style={fill ? {} : { aspectRatio }}>
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse ${fill ? '' : 'rounded'}`}
          style={fill ? {} : { aspectRatio }}
        />
      )}
      <Image {...imageProps} alt={alt} />
    </div>
  );
}