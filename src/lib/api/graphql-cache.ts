import { DocumentNode } from '@apollo/client';
import { fetchGraphQL } from './fetch-graphql';

// Simple in-memory cache for GraphQL responses
// Perfect for news sites with ISR - cache lives for the duration of the build/request
const cache = new Map<string, { data: any; timestamp: number }>();

interface CacheOptions {
  ttl?: number; // Time to live in seconds
  forceRefresh?: boolean;
}

/**
 * Cached GraphQL fetch for news content
 * Uses in-memory caching with TTL for optimal performance
 */
export async function fetchGraphQLCached(
  query: DocumentNode,
  variables = {},
  options: CacheOptions = {}
) {
  const { ttl = 30, forceRefresh = false } = options; // 30 second default for news
  
  // Create cache key from query and variables
  const cacheKey = JSON.stringify({ 
    query: query.loc?.source.body, 
    variables 
  });
  
  // Check cache if not forcing refresh
  if (!forceRefresh) {
    const cached = cache.get(cacheKey);
    if (cached) {
      const age = (Date.now() - cached.timestamp) / 1000;
      if (age < ttl) {
        return cached.data;
      }
    }
  }
  
  // Fetch fresh data
  const data = await fetchGraphQL(query, variables);
  
  // Store in cache
  if (data) {
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
    
    // Clean up old entries periodically (keep cache under 100 items)
    if (cache.size > 100) {
      const oldestKey = cache.keys().next().value;
      if (oldestKey) cache.delete(oldestKey);
    }
  }
  
  return data;
}

/**
 * Prefetch GraphQL data for better performance
 * Use this for trending/popular articles
 */
export async function prefetchGraphQL(
  queries: Array<{ query: DocumentNode; variables?: any }>
) {
  const promises = queries.map(({ query, variables }) =>
    fetchGraphQLCached(query, variables, { ttl: 60 })
  );
  
  await Promise.all(promises);
}

/**
 * Clear the GraphQL cache
 * Useful for development or after content updates
 */
export function clearGraphQLCache() {
  cache.clear();
}