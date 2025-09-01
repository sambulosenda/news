// Direct GraphQL fetch without Apollo Client
export async function fetchGraphQLDirect(query: string, tags?: string[]) {
  try {
    // console.log('Direct fetch: Starting request to GraphQL');
    const response = await fetch('https://backend.reportfocusnews.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      body: JSON.stringify({ query }),
      next: { 
        revalidate: 30, // Increase to 30 seconds for better caching
        tags: tags || ['posts'] // Add cache tags for on-demand revalidation
      },
      // Add signal for timeout
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    const result = await response.json();
    
    // console.log('Direct fetch: Response received, has data:', !!result.data);
    
    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      return null;
    }
    
    if (result.data) {
      // console.log('Direct fetch: Data keys:', Object.keys(result.data));
    }
    
    return result.data;
  } catch (error) {
    console.error('Direct fetch error:', error);
    return null;
  }
}