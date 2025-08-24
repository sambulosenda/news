'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

// Default fallback image (gray placeholder)
const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMTUwIiBzdHlsZT0iZmlsbDojOWNhM2FmO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjIwcHg7Zm9udC1mYW1pbHk6QXJpYWwsc2Fucy1zZXJpZiI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';

export default function SafeImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  quality = 75,
  placeholder,
  blurDataURL,
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Update imgSrc when src prop changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  // Validate and fix image URL
  const getValidImageUrl = (url: string): string => {
    if (!url) return FALLBACK_IMAGE;
    
    // Check if it's already a valid URL
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      // For WordPress images, ensure HTTPS
      if (url.startsWith('http://') && url.includes('reportfocusnews.com')) {
        return url.replace('http://', 'https://');
      }
      return url;
    }
    
    // If it's a relative URL, prepend the WordPress domain
    if (url.startsWith('/')) {
      return `https://backend.reportfocusnews.com${url}`;
    }
    
    // If it's a wp-content URL without domain
    if (url.includes('wp-content')) {
      return `https://backend.reportfocusnews.com/${url}`;
    }
    
    return url;
  };

  const handleError = () => {
    console.warn(`Image failed to load: ${imgSrc}`);
    setHasError(true);
    setIsLoading(false);
    
    // Try fallback strategies
    if (imgSrc !== FALLBACK_IMAGE) {
      // First try to fix the URL
      const validUrl = getValidImageUrl(src);
      if (validUrl !== imgSrc && validUrl !== FALLBACK_IMAGE) {
        setImgSrc(validUrl);
        setHasError(false);
        setIsLoading(true);
      } else {
        // Use fallback image
        setImgSrc(FALLBACK_IMAGE);
      }
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Validate initial URL
  const validSrc = getValidImageUrl(imgSrc);

  // Common image props
  const imageProps = {
    src: validSrc,
    alt,
    className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    onError: handleError,
    onLoad: handleLoad,
    priority,
    quality,
    ...(sizes && { sizes }),
    ...(placeholder && { placeholder }),
    ...(blurDataURL && { blurDataURL }),
  };

  if (fill) {
    return (
      <div className="relative w-full h-full">
        {isLoading && !hasError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <Image {...imageProps} fill alt={alt} />
        {hasError && imgSrc === FALLBACK_IMAGE && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <svg 
              className="w-12 h-12 text-gray-400" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      {isLoading && !hasError && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse" 
          style={{ width: width || 'auto', height: height || 'auto' }}
        />
      )}
      <Image 
        {...imageProps} 
        width={width || 400} 
        height={height || 300}
        alt={alt}
      />
      {hasError && imgSrc === FALLBACK_IMAGE && (
        <div 
          className="absolute inset-0 bg-gray-200 flex items-center justify-center"
          style={{ width: width || 400, height: height || 300 }}
        >
          <svg 
            className="w-12 h-12 text-gray-400" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
}