'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  InMemoryCache,
  ApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support';

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://backend.reportfocusnews.com/graphql',
  });

  // Optimized cache configuration for better performance
  const cache = new InMemoryCache({
    typePolicies: {
      RootQuery: {
        queryType: true,
        fields: {
          posts: {
            // Cache posts effectively
            keyArgs: ['where', 'first', 'after'],
            merge(existing, incoming, { args }) {
              // Handle pagination
              if (!existing || !args?.after) {
                return incoming;
              }
              return {
                ...incoming,
                edges: [...existing.edges, ...incoming.edges],
              };
            },
          },
          post: {
            // Cache individual posts by slug
            keyArgs: ['id', 'slug'],
          },
          categories: {
            // Cache categories (rarely change)
            keyArgs: false,
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
      Post: {
        keyFields: ['id'],
        fields: {
          // Normalize date handling
          date: {
            read(date) {
              return date ? new Date(date).toISOString() : null;
            },
          },
        },
      },
      Category: {
        keyFields: ['id'],
      },
      User: {
        keyFields: ['id'],
      },
    },
  });

  return new ApolloClient({
    cache,
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
    defaultOptions: {
      watchQuery: {
        // Use cache-first for better performance
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
        // Only refetch if explicitly requested
        nextFetchPolicy: 'cache-first',
        // Don't refetch on window focus
        refetchWritePolicy: 'merge',
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
        // Return partial data while fetching
        returnPartialData: true,
        // Don't notify on background refetch
        notifyOnNetworkStatusChange: false,
      },
    },
    // Enable query batching for multiple queries
    queryDeduplication: true,
    // Assume immutable results for better performance
    assumeImmutableResults: true,
    // Don't refetch queries on reconnect (news is not real-time critical)
    connectToDevTools: process.env.NODE_ENV === 'development',
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}