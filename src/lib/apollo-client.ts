import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://backend.reportfocusnews.com/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      RootQuery: {
        queryType: true,
      },
      Post: {
        keyFields: ['id', 'slug'],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;