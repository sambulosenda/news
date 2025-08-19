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
    },
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first', // Use cache for better performance
      errorPolicy: 'all',
    },
  },
});

export async function fetchGraphQL(query: DocumentNode, variables = {}) {
  try {
    const uri = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://backend.reportfocusnews.com/graphql';
    console.log('Fetching GraphQL with URI:', uri);
    
    const { data } = await client.query({
      query,
      variables,
      fetchPolicy: 'network-only', // Force fresh data
    });
    
    console.log('GraphQL Response received, data keys:', data ? Object.keys(data) : 'null');
    
    // Additional debug for homepage
    if (data && data.recentPosts) {
      console.log('Recent posts count:', data.recentPosts.edges?.length || 0);
    }
    
    return data;
  } catch (error) {
    console.error('GraphQL Error Details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      graphQLErrors: (error as any)?.graphQLErrors,
      networkError: (error as any)?.networkError,
      query: query.loc?.source?.body?.substring(0, 200), // Show first 200 chars of query
    });
    return null;
  }
}

export { gql };