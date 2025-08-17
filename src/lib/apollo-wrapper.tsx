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

  return new ApolloClient({
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
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}