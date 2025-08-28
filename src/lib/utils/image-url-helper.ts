/**
 * Image URL Helper
 * Manages image URLs with Bunny CDN integration
 */

import { getCDNImageUrl } from '@/lib/cdn';

interface ImageUrlOptions {
  context?: 'browser' | 'seo' | 'sitemap';
  fallback?: string;
}

const DEFAULT_FALLBACK = 'https://reportfocusnews.com/og-image.jpg';

/**
 * Get the appropriate image URL based on context
 * - All contexts now use CDN URLs for better performance and SEO
 * - CDN provides global distribution and caching
 */
export function getImageUrl(
  originalUrl: string | undefined | null,
  options: ImageUrlOptions = {}
): string {
  const { 
    fallback = DEFAULT_FALLBACK 
  } = options;

  // No image URL provided
  if (!originalUrl) {
    return fallback;
  }

  // Use CDN for all contexts - CDN is now properly configured
  // CDN URLs are accessible by Google crawlers and provide better loading times
  return getCDNImageUrl(originalUrl);
}

/**
 * Check if an image URL needs proxying
 */
export function needsProxy(url: string): boolean {
  return url.includes('backend.reportfocusnews.com');
}

/**
 * Get Open Graph compliant image dimensions
 */
export function getOGImageDimensions(width?: number, height?: number) {
  // Google recommends at least 1200x630 for Open Graph images
  return {
    width: width || 1200,
    height: height || 630,
  };
}