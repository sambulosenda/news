import { fetchGraphQLCached } from './graphql-cache';
import { GET_POST_BY_SLUG } from '@/lib/queries/posts';
import { detectLocationFromContent } from '@/lib/utils/location-detector';

// Memoization for metadata generation
const metadataCache = new Map<string, any>();
const METADATA_CACHE_TTL = 300000; // 5 minutes

interface ArticleData {
  article: any;
  metadata: {
    title: string;
    description: string;
    keywords: string;
    canonicalUrl: string;
    ogImage: string;
    location?: any;
  };
}

/**
 * Optimized article data fetcher with deduplication and caching
 * Eliminates duplicate API calls between generateMetadata and page component
 */
export async function fetchArticleWithMetadata(
  slug: string,
  year: string,
  month: string,
  day: string
): Promise<ArticleData | null> {
  const cacheKey = `${year}-${month}-${day}-${slug}`;
  
  // Check cache first
  const cached = metadataCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < METADATA_CACHE_TTL) {
    return cached.data;
  }

  try {
    // Single API call for both page and metadata with optimized caching
    const articleData = await fetchGraphQLCached(
      GET_POST_BY_SLUG,
      { slug },
      { 
        ttl: 60, // 1 minute cache for breaking news
        staleWhileRevalidate: 300 // Serve stale content for 5 minutes while refreshing
      }
    );

    const article = articleData?.postBy;
    if (!article) return null;

    // Process metadata efficiently
    const metadata = await generateOptimizedMetadata(article, year, month, day, slug);
    
    const result = { article, metadata };
    
    // Cache the result
    metadataCache.set(cacheKey, {
      data: result,
      timestamp: Date.now(),
    });

    // Clean cache periodically - keep more items for better performance
    if (metadataCache.size > 100) {
      const oldestKey = metadataCache.keys().next().value;
      if (oldestKey) metadataCache.delete(oldestKey);
    }

    return result;
  } catch (error) {
    console.error('Error fetching article with metadata:', error);
    return null;
  }
}

async function generateOptimizedMetadata(
  article: any,
  year: string,
  month: string,
  day: string,
  slug: string
) {
  // Use excerpt for meta description
  const description = article.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || '';
  
  // Use article title
  const title = article.title;
  
  // Optimize image URL generation
  const ogImage = article.featuredImage?.node?.sourceUrl
    ? `https://reportfocusnews.com/api/image-proxy?url=${encodeURIComponent(article.featuredImage.node.sourceUrl)}`
    : 'https://reportfocusnews.com/og-image.jpg';
  
  // Build canonical URL
  const canonicalUrl = `https://reportfocusnews.com/${year}/${month}/${day}/${slug}/`;

  // Optimize location detection (async but don't block)
  const category = article.categories?.edges?.[0]?.node?.name || '';
  const tags = article.tags?.edges?.map((tag: any) => tag.node.name) || [];
  
  // Use Promise.resolve to make this non-blocking
  const location = await Promise.resolve().then(() =>
    detectLocationFromContent(
      article.title || '',
      article.content || article.excerpt || '',
      category,
      tags
    )
  );

  // Enhanced keywords with location
  const locationKeywords = location ? [
    location.country,
    ...(location.city ? [location.city] : []),
    'Southern Africa',
    `${location.country} news`,
    `${location.country} ${category.toLowerCase()}`
  ] : ['South Africa', 'Zimbabwe', 'Southern Africa'];

  const keywords = [
    ...tags.slice(0, 5),
    ...locationKeywords
  ].filter(Boolean).join(', ');

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    location,
  };
}

// Prefetch function for better performance
export async function prefetchArticleData(slug: string) {
  try {
    await fetchGraphQLCached(
      GET_POST_BY_SLUG,
      { slug },
      { ttl: 300 } // 5 minute cache for prefetch
    );
  } catch (error) {
    // Silent fail for prefetch
    console.warn('Article prefetch failed:', error);
  }
}