import { ApolloClient, InMemoryCache, gql, DocumentNode } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://backend.reportfocusnews.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      RootQuery: {
        queryType: true,
      },
      Post: {
        keyFields: ['id'],
      },
      Category: {
        keyFields: ['id'],
      },
      Tag: {
        keyFields: ['id'],
      },
    },
    // Disable cache warnings in production
    possibleTypes: {},
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only', // Always fetch fresh for news
      errorPolicy: 'all',
    },
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});

export async function fetchGraphQL(query: DocumentNode, variables = {}, options = {}) {
  try {
    const { data } = await client.query({
      query,
      variables,
      fetchPolicy: 'network-only', // Always fetch fresh for news
      ...options,
    });
    
    return data;
  } catch (error) {
    console.error('GraphQL Error:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

// Optimized version for article pages - fetches fresh data
export async function fetchGraphQLFresh(query: DocumentNode, variables = {}) {
  try {
    const { data } = await client.query({
      query,
      variables,
      fetchPolicy: 'network-only', // Always fetch fresh for articles
    });
    
    return data;
  } catch (error) {
    console.error('GraphQL Error:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

export { gql };