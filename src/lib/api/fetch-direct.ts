// Direct GraphQL fetch without Apollo Client
export async function fetchGraphQLDirect(query: string, tags?: string[]) {
  try {
    // console.log('Direct fetch: Starting request to GraphQL');
    const response = await fetch('https://backend.reportfocusnews.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { 
        revalidate: 60, // Revalidate every minute for fresh news
        tags: tags || ['posts'] // Add cache tags for on-demand revalidation
      }
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