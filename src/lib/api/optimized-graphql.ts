import { ApolloClient, InMemoryCache, gql, DocumentNode } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://backend.reportfocusnews.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      RootQuery: {
        queryType: true,
      },
      Post: {
        keyFields: ['slug'], // Use slug as key for better cache hits
        fields: {
          content: {
            merge: false, // Don't merge content, replace entirely
          },
          relatedPosts: {
            merge: false,
          },
        },
      },
      Category: {
        keyFields: ['slug'],
      },
      Tag: {
        keyFields: ['slug'],
      },
    },
    possibleTypes: {},
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first', // Enable cache for better performance
      errorPolicy: 'all',
    },
    watchQuery: {
      fetchPolicy: 'cache-and-network', // Background refresh while serving cache
    },
  },
});

// Optimized fetch for article pages with intelligent caching
export async function fetchArticleOptimized(query: DocumentNode, variables = {}) {
  try {
    const { data } = await client.query({
      query,
      variables,
      fetchPolicy: 'cache-first' // Try cache first
    });
    
    return data;
  } catch (error) {
    console.error('GraphQL Error:', error instanceof Error ? error.message : 'Unknown error');
    
    // Fallback to network if cache fails
    try {
      const { data } = await client.query({
        query,
        variables,
        fetchPolicy: 'network-only',
      });
      return data;
    } catch (fallbackError) {
      console.error('Fallback GraphQL Error:', fallbackError);
      return null;
    }
  }
}

// Prefetch related content for better UX
export async function prefetchRelatedContent(categoryId: number, excludeId: string) {
  const relatedQuery = gql`
    query PrefetchRelated($categoryId: Int!, $exclude: [ID]) {
      posts(first: 6, where: { categoryId: $categoryId, notIn: $exclude }) {
        edges {
          node {
            id
            slug
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `;

  try {
    await client.query({
      query: relatedQuery,
      variables: { categoryId, exclude: [excludeId] },
      fetchPolicy: 'cache-first',
    });
  } catch (error) {
    // Silent fail for prefetch
    console.warn('Prefetch failed:', error);
  }
}

export { gql };