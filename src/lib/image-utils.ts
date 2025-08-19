// Utilities for image optimization and blur placeholders

/**
 * Generate a low-quality image placeholder (LQIP) data URL
 * This creates a tiny base64 encoded image for instant display
 */
export function generateBlurPlaceholder(): string {
  // Generic news image blur placeholder
  // This is a tiny 10x10 image that gets blurred via CSS
  return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
}

/**
 * Calculate aspect ratio for responsive images
 */
export function getAspectRatio(width: number, height: number): number {
  return height / width;
}

/**
 * Generate srcSet string for responsive images
 */
export function generateSrcSet(baseUrl: string, widths: number[] = [320, 640, 768, 1024, 1280, 1920]): string {
  return widths
    .map(width => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizes(): string {
  return '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
}

/**
 * Optimize image URL for WordPress/CDN
 */
export function optimizeImageUrl(url: string, width?: number, quality = 80): string {
  if (!url) return '';
  
  // If it's already optimized or from a CDN, return as is
  if (url.includes('?w=') || url.includes('&w=')) {
    return url;
  }
  
  // Add query parameters for optimization
  const separator = url.includes('?') ? '&' : '?';
  let optimizedUrl = url;
  
  if (width) {
    optimizedUrl += `${separator}w=${width}`;
  }
  
  if (quality < 100) {
    optimizedUrl += `${width ? '&' : separator}q=${quality}`;
  }
  
  return optimizedUrl;
}

/**
 * Preload critical images
 */
export function preloadImage(url: string, as: 'image' = 'image'): void {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Lazy load images with Intersection Observer
 */
export function setupLazyLoading(): void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01,
  });
  
  images.forEach(img => imageObserver.observe(img));
}

/**
 * Check if browser supports WebP
 */
export async function supportsWebP(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  
  const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
  
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img.width === 1);
    img.onerror = () => resolve(false);
    img.src = webpData;
  });
}

/**
 * Get optimal image format based on browser support
 */
export async function getOptimalFormat(originalUrl: string): Promise<string> {
  const isWebPSupported = await supportsWebP();
  
  if (isWebPSupported && !originalUrl.includes('.gif')) {
    // Convert to WebP if supported and not a GIF
    return originalUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  
  return originalUrl;
}