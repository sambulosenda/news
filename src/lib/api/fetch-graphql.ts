import { DocumentNode, gql } from '@apollo/client';

// Ensure we always use the correct GraphQL endpoint
const graphqlEndpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://backend.reportfocusnews.com/graphql';


/**
 * Fetch GraphQL data using native fetch API
 * More reliable than Apollo Client in server-side environments
 */
export async function fetchGraphQL(query: DocumentNode, variables = {}, _options = {}, signal?: AbortSignal) {
  try {
    // Extract the query string from DocumentNode
    const queryString = query.loc?.source.body;
    
    if (!queryString) {
      throw new Error('Invalid GraphQL query - could not extract query string');
    }

    // Create timeout signal if not provided
    const timeoutSignal = signal || AbortSignal.timeout(5000); // 5 second timeout
    
    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      body: JSON.stringify({
        query: queryString,
        variables,
      }),
      signal: timeoutSignal,
      // Add Next.js cache options
      next: {
        revalidate: 60, // Cache for 1 minute by default
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Handle GraphQL errors
    if (result.errors && result.errors.length > 0) {
      console.error('GraphQL Errors:', result.errors);
      // For now, we'll return data even if there are errors (non-fatal errors)
      // You might want to handle this differently based on your needs
    }
    
    return result.data;
  } catch (error: unknown) {
    // Handle AbortError specifically
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('GraphQL request was aborted');
      return null;
    }
    
    console.error('GraphQL Error Details:', {
      endpoint: graphqlEndpoint,
      error: error instanceof Error ? error.message : 'Unknown error',
      variables,
    });
    return null;
  }
}

// Optimized version for article pages - fetches fresh data
export async function fetchGraphQLFresh(query: DocumentNode, variables = {}) {
  // This now uses the same implementation as fetchGraphQL since both are already optimized
  return fetchGraphQL(query, variables);
}

export { gql };