import { algoliasearch } from 'algoliasearch';

// Algolia configuration
export const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
export const ALGOLIA_SEARCH_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '';
export const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY || ''; // Server-side only
export const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'reportfocus_articles';

// Create search client (for frontend) - lazy initialization
export const searchClient = ALGOLIA_APP_ID && ALGOLIA_SEARCH_API_KEY 
  ? algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY)
  : null as any;

// Create admin client (for backend/indexing) - lazy initialization
export const adminClient = ALGOLIA_APP_ID && ALGOLIA_ADMIN_API_KEY
  ? algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY)
  : null as any;

// Search configuration
export const searchConfig = {
  // Number of results per page
  hitsPerPage: 20,
  
  // Searchable attributes (in order of importance)
  searchableAttributes: [
    'title',
    'excerpt',
    'content',
    'categories',
    'tags',
    'author'
  ],
  
  // Attributes to retrieve
  attributesToRetrieve: [
    'objectID',
    'title',
    'excerpt',
    'slug',
    'date',
    'categories',
    'author',
    'featuredImage',
    'readingTime'
  ],
  
  // Attributes to highlight
  attributesToHighlight: [
    'title',
    'excerpt'
  ],
  
  // Custom ranking
  customRanking: [
    'desc(date)', // Most recent first
    'desc(popularity)' // Then by popularity
  ],
  
  // Facets for filtering
  attributesForFaceting: [
    'searchable(categories)',
    'searchable(tags)',
    'searchable(author)',
    'date_timestamp'
  ],
  
  // Typo tolerance
  typoTolerance: true,
  minWordSizefor1Typo: 4,
  minWordSizefor2Typos: 8,
  
  // Remove stop words
  removeStopWords: ['en'],
  
  // Synonyms (can be expanded)
  synonyms: [
    ['SA', 'South Africa'],
    ['ZIM', 'Zimbabwe'],
    ['JSE', 'Johannesburg Stock Exchange'],
    ['ANC', 'African National Congress'],
    ['ZANU-PF', 'Zimbabwe African National Union'],
    ['load shedding', 'power cuts', 'blackouts'],
    ['forex', 'foreign exchange'],
    ['SADC', 'Southern African Development Community']
  ]
};

// Helper function to format article for Algolia
export function formatArticleForAlgolia(article: any) {
  return {
    objectID: article.id,
    title: article.title,
    excerpt: article.excerpt?.replace(/<[^>]*>/g, ''), // Strip HTML
    content: article.content?.replace(/<[^>]*>/g, '').substring(0, 5000), // First 5000 chars
    slug: article.slug,
    date: article.date,
    date_timestamp: new Date(article.date).getTime(),
    categories: article.categories?.edges?.map((e: any) => e.node.name) || [],
    tags: article.tags?.edges?.map((e: any) => e.node.name) || [],
    author: article.author?.node?.name || 'Unknown',
    featuredImage: article.featuredImage?.node?.sourceUrl || null,
    readingTime: Math.ceil((article.content?.split(' ').length || 0) / 200) // Estimate reading time
  };
}