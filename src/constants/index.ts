// Site configuration constants
export const SITE_CONFIG = {
  name: 'Report Focus News',
  shortName: 'Report Focus',
  domain: 'reportfocusnews.com',
  description: 'Breaking news, analysis, and in-depth reporting',
  locale: 'en_US',
  timezone: 'America/New_York',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  graphql: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://backend.reportfocusnews.com/graphql',
  wordpress: 'https://backend.reportfocusnews.com',
} as const;

// Cache configuration
export const CACHE_CONFIG = {
  defaultRevalidate: 3600, // 1 hour
  shortRevalidate: 300, // 5 minutes
  longRevalidate: 86400, // 24 hours
} as const;

// Pagination
export const PAGINATION = {
  postsPerPage: 20,
  initialPosts: 10,
  relatedPosts: 5,
} as const;

// Image sizes
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  medium: { width: 300, height: 200 },
  large: { width: 1024, height: 683 },
  hero: { width: 1920, height: 1080 },
} as const;

// Social media links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/reportfocusnews',
  facebook: 'https://facebook.com/reportfocusnews',
  instagram: 'https://instagram.com/reportfocusnews',
  linkedin: 'https://linkedin.com/company/reportfocusnews',
} as const;