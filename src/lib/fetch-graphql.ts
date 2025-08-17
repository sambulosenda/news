import { ApolloClient, InMemoryCache, gql, DocumentNode } from '@apollo/client';

const client = new ApolloClient({
  uri: process.env.WORDPRESS_API_URL || 'https://backend.reportfocusnews.com/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
});

export async function fetchGraphQL(query: DocumentNode, variables = {}) {
  try {
    const { data } = await client.query({
      query,
      variables,
    });
    return data;
  } catch (error) {
    console.error('GraphQL Error:', error);
    return null;
  }
}

export { gql };