/**
 * CDN Configuration for Bunny CDN
 * Replaces image-proxy with direct CDN URLs
 */

const CDN_URL = 'https://newsreportfocus.b-cdn.net';
const ORIGIN_URL = 'https://backend.reportfocusnews.com';
const ORIGIN_URL_HTTP = 'http://backend.reportfocusnews.com';

/**
 * Convert WordPress image URLs to CDN URLs
 * @param originalUrl - The original WordPress image URL
 * @returns The CDN URL
 */
export function getCDNImageUrl(originalUrl: string | null | undefined): string {
  if (!originalUrl) return '';
  
  // If it's already a CDN URL, return as is
  if (originalUrl.includes('newsreportfocus.b-cdn.net')) {
    return originalUrl;
  }
  
  // Replace WordPress backend URL with CDN URL (both HTTP and HTTPS)
  if (originalUrl.includes('backend.reportfocusnews.com')) {
    return originalUrl
      .replace(ORIGIN_URL, CDN_URL)
      .replace(ORIGIN_URL_HTTP, CDN_URL);
  }
  
  // Handle relative URLs from WordPress
  if (originalUrl.startsWith('/wp-content')) {
    return `${CDN_URL}${originalUrl}`;
  }
  
  // Handle encoded URLs (from old image-proxy)
  if (originalUrl.includes('image-proxy')) {
    const match = originalUrl.match(/url=([^&]*)/);
    if (match && match[1]) {
      const decodedUrl = decodeURIComponent(match[1]);
      return getCDNImageUrl(decodedUrl);
    }
  }
  
  // Return original URL if it doesn't match any patterns
  return originalUrl;
}

/**
 * Check if URL is from WordPress backend
 */
export function isWordPressImage(url: string): boolean {
  return url.includes('backend.reportfocusnews.com') || url.startsWith('/wp-content');
}

/**
 * Get optimized image URL with CDN and optional transforms
 */
export function getOptimizedImageUrl(
  url: string,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
  }
): string {
  const cdnUrl = getCDNImageUrl(url);
  
  // Bunny CDN optimizer parameters (if you enable Bunny Optimizer)
  if (options && cdnUrl.includes('newsreportfocus.b-cdn.net')) {
    const params = new URLSearchParams();
    if (options.width) params.append('width', options.width.toString());
    if (options.height) params.append('height', options.height.toString());
    if (options.quality) params.append('quality', options.quality.toString());
    
    const separator = cdnUrl.includes('?') ? '&' : '?';
    return params.toString() ? `${cdnUrl}${separator}${params.toString()}` : cdnUrl;
  }
  
  return cdnUrl;
}