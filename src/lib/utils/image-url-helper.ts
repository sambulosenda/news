/**
 * Image URL Helper
 * Manages image URLs with Bunny CDN integration
 */

import { getCDNImageUrl } from '@/lib/cdn';

interface ImageUrlOptions {
  context?: 'browser' | 'seo' | 'sitemap' | 'twitter';
  fallback?: string;
}

const DEFAULT_FALLBACK = 'https://reportfocusnews.com/og-image.jpg';

/**
 * Get the appropriate image URL based on context
 * - All contexts use CDN URLs except Twitter which needs direct URLs
 * - CDN provides global distribution and caching
 * - Twitter/X gets direct WordPress URLs for better compatibility
 */
export function getImageUrl(
  originalUrl: string | undefined | null,
  options: ImageUrlOptions = {}
): string {
  const { 
    context = 'browser',
    fallback = DEFAULT_FALLBACK 
  } = options;

  // No image URL provided
  if (!originalUrl) {
    return fallback;
  }

  // For Twitter, return direct WordPress URL (no CDN)
  // Twitter/X has issues with some CDN URLs
  if (context === 'twitter') {
    // If it's already a CDN URL, convert back to WordPress URL
    if (originalUrl.includes('newsreportfocus.b-cdn.net')) {
      return originalUrl.replace('https://newsreportfocus.b-cdn.net', 'https://backend.reportfocusnews.com');
    }
    // If it's a relative URL, prepend the WordPress domain
    if (originalUrl.startsWith('/wp-content')) {
      return `https://backend.reportfocusnews.com${originalUrl}`;
    }
    // Return as-is if it's already a full WordPress URL
    return originalUrl;
  }

  // Use CDN for all other contexts
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