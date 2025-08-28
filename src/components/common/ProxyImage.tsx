'use client';

import { useState, useEffect } from 'react';
import { getCDNImageUrl } from '@/lib/cdn';

interface ProxyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
}

const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2U1ZTdlYiIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMTUwIiBzdHlsZT0iZmlsbDojOWNhM2FmO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjIwcHg7Zm9udC1mYW1pbHk6QXJpYWwsc2Fucy1zZXJpZiI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';

/**
 * ProxyImage component that loads images through Bunny CDN
 * This provides fast, cached image delivery with global distribution
 */
export default function ProxyImage({
  src,
  alt,
  className = '',
  width,
  height,
  fill = false,
}: ProxyImageProps) {
  // Use CDN URL instead of proxy
  const getOptimizedUrl = (originalSrc: string) => {
    if (!originalSrc) return FALLBACK_IMAGE;
    return getCDNImageUrl(originalSrc);
  };
  
  const initialSrc = getOptimizedUrl(src);
  const [imgSrc, setImgSrc] = useState<string>(initialSrc);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const newSrc = getOptimizedUrl(src);
    if (newSrc !== imgSrc) {
      setImgSrc(newSrc);
      setIsLoading(true);
      setHasError(false);
    }
  }, [src, imgSrc]);

  const handleError = () => {
    setImgSrc(FALLBACK_IMAGE);
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  if (fill) {
    return (
      <div className="relative w-full h-full overflow-hidden">
        {isLoading && !hasError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={imgSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover ${className} ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
          loading="lazy"
        />
        {hasError && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Image Not Available</span>
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
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
      {hasError && (
        <div
          className="absolute inset-0 bg-gray-200 flex items-center justify-center"
          style={{ width: width || 400, height: height || 300 }}
        >
          <span className="text-gray-500">Image Not Available</span>
        </div>
      )}
    </div>
  );
}