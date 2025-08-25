import { API_ENDPOINTS, CACHE_CONFIG } from '@/constants';

// API configuration
export const apiConfig = {
  // GraphQL endpoint
  graphqlEndpoint: API_ENDPOINTS.graphql,
  
  // WordPress REST API
  wordpressApi: API_ENDPOINTS.wordpress,
  
  // Cache settings
  cache: {
    ...CACHE_CONFIG,
    // Specific cache times for different content types
    posts: CACHE_CONFIG.defaultRevalidate,
    categories: CACHE_CONFIG.longRevalidate,
    homepage: CACHE_CONFIG.shortRevalidate,
    author: CACHE_CONFIG.defaultRevalidate,
    search: CACHE_CONFIG.shortRevalidate,
  },
  
  // API request configuration
  request: {
    timeout: 10000, // 10 seconds
    retries: 3,
    retryDelay: 1000, // 1 second
  },
  
  // GraphQL query limits
  queryLimits: {
    postsPerPage: 20,
    maxPosts: 100,
    relatedPosts: 5,
    searchResults: 50,
  },
  
  // Image domains for Next.js Image component
  imageDomains: [
    'backend.reportfocusnews.com',
    'reportfocusnews.com',
    'www.reportfocusnews.com',
  ],
} as const;