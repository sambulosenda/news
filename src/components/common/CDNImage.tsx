'use client';

import { useState, useEffect } from 'react';
import { getCDNImageUrl } from '@/lib/cdn';

interface CDNImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  onError?: () => void;
}

/**
 * CDNImage component optimized for SEO
 * - No fallback images that Google might index
 * - Direct CDN URLs for crawlers
 * - Graceful degradation without showing placeholder
 */
export default function CDNImage({
  src,
  alt,
  className = '',
  width,
  height,
  fill = false,
  priority = false,
  onError,
}: CDNImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get CDN URL immediately
  const imageUrl = getCDNImageUrl(src);
  
  useEffect(() => {
    // Reset error state when src changes
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
    
    // Log error for monitoring but don't show fallback
    console.error(`[CDNImage] Failed to load: ${imageUrl}`);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // If there's an error, return null (no image) instead of fallback
  // This prevents Google from indexing placeholder images
  if (hasError) {
    return null;
  }

  if (fill) {
    return (
      <>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <img
          src={imageUrl}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover ${className} ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </>
    );
  }

  return (
    <>
      {isLoading && (
        <div
          className="bg-gray-100 animate-pulse"
          style={{ width: width || 'auto', height: height || 'auto' }}
        />
      )}
      <img
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        style={isLoading ? { position: 'absolute', visibility: 'hidden' } : undefined}
      />
    </>
  );
}