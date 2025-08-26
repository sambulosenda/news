import Image from 'next/image';
import { useState } from 'react';

interface OptimizedArticleImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

/**
 * Optimized article image with Next.js Image component
 * Includes WebP/AVIF optimization, responsive loading, and fallbacks
 */
export default function OptimizedArticleImage({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  width,
  height,
}: OptimizedArticleImageProps) {
  const [imageError, setImageError] = useState(false);

  // Generate optimized image URL for WordPress images
  const getOptimizedSrc = () => {
    if (!src) return '';
    
    if (src.includes('backend.reportfocusnews.com')) {
      return `/api/image-proxy?url=${encodeURIComponent(src)}`;
    }
    
    return src;
  };

  const optimizedSrc = getOptimizedSrc();

  if (imageError || !optimizedSrc) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center ${fill ? 'absolute inset-0' : ''} ${className}`}
        style={!fill && width && height ? { width, height } : undefined}
      >
        <div className="text-center p-4">
          <div className="w-12 h-12 mx-auto mb-2 opacity-30">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
          </div>
          <p className="text-sm text-gray-500">Image unavailable</p>
        </div>
      </div>
    );
  }

  const imageProps = {
    src: optimizedSrc,
    alt,
    className: `${className} transition-opacity duration-300`,
    priority,
    sizes,
    quality: 85, // Good balance of quality vs size
    onError: () => setImageError(true),
    placeholder: 'blur' as const,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width || 800}
      height={height || 450}
    />
  );
}