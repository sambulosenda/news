'use client';

import { useState, useEffect, useRef } from 'react';
import { getCDNImageUrl } from '@/lib/cdn';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
}

/**
 * Optimized image component for Core Web Vitals
 * - Lazy loading with intersection observer
 * - LQIP (Low Quality Image Placeholder)
 * - Responsive images with srcset
 * - WebP/AVIF format detection
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '100vw',
  quality = 75,
  onLoad
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Get CDN URL
  const imageUrl = getCDNImageUrl(src);
  
  // Generate srcset for responsive images
  const generateSrcSet = () => {
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
    return widths
      .map(w => `${imageUrl}?w=${w}&q=${quality} ${w}w`)
      .join(', ');
  };
  
  // LQIP - Low Quality Image Placeholder (base64 or tiny version)
  const placeholderUrl = `${imageUrl}?w=20&q=10&blur=10`;
  
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }
    
    // Set up intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              if (observerRef.current && imgRef.current) {
                observerRef.current.unobserve(imgRef.current);
              }
            }
          });
        },
        {
          // Start loading when image is 50px away from viewport
          rootMargin: '50px',
          threshold: 0.01
        }
      );
      
      if (imgRef.current) {
        observerRef.current.observe(imgRef.current);
      }
    } else {
      // Fallback for browsers without IntersectionObserver
      setIsInView(true);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);
  
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };
  
  return (
    <div className={`optimized-image-container ${className}`} style={{ position: 'relative' }}>
      {/* Placeholder/skeleton while loading */}
      {!isLoaded && (
        <div 
          className="image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f3f4f6',
            backgroundImage: `url(${placeholderUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(5px)',
            transform: 'scale(1.1)'
          }}
        />
      )}
      
      {/* Main image */}
      <picture>
        {/* WebP format for modern browsers */}
        <source
          type="image/webp"
          srcSet={isInView ? generateSrcSet().replace(/\.(jpg|jpeg|png)/gi, '.webp') : ''}
          sizes={sizes}
        />
        
        {/* AVIF format for newest browsers */}
        <source
          type="image/avif"
          srcSet={isInView ? generateSrcSet().replace(/\.(jpg|jpeg|png)/gi, '.avif') : ''}
          sizes={sizes}
        />
        
        {/* Original format fallback */}
        <img
          ref={imgRef}
          src={isInView ? imageUrl : placeholderUrl}
          srcSet={isInView ? generateSrcSet() : ''}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            display: 'block',
            width: '100%',
            height: 'auto'
          }}
          className={className}
        />
      </picture>
      
      {/* Native lazy loading hint */}
      {!priority && (
        <link rel="preload" as="image" href={imageUrl} imageSrcSet={generateSrcSet()} />
      )}
    </div>
  );
}