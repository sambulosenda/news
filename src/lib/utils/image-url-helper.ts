/**
 * Image URL Helper
 * Manages image URLs for different contexts (browser vs crawler)
 */

interface ImageUrlOptions {
  context?: 'browser' | 'seo' | 'sitemap';
  fallback?: string;
}

const DEFAULT_FALLBACK = 'https://reportfocusnews.com/og-image.jpg';

/**
 * Get the appropriate image URL based on context
 * - For browsers: Use proxy to avoid CORS and hotlinking issues
 * - For SEO/crawlers: Use direct URLs that Google can access
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

  // For SEO contexts (meta tags, structured data, sitemaps)
  // Use direct URLs so Google and other crawlers can access them
  if (context === 'seo' || context === 'sitemap') {
    // Ensure the URL is absolute
    if (originalUrl.startsWith('http')) {
      return originalUrl;
    }
    // Handle relative URLs from WordPress
    if (originalUrl.startsWith('/')) {
      return `https://backend.reportfocusnews.com${originalUrl}`;
    }
    return originalUrl;
  }

  // For browser context, use proxy for WordPress images
  // This helps with CORS and potential hotlinking protection
  if (context === 'browser' && originalUrl.includes('backend.reportfocusnews.com')) {
    return `/api/image-proxy?url=${encodeURIComponent(originalUrl)}`;
  }

  // For other images (not from WordPress), return as-is
  return originalUrl;
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