// Direct fetch test without Apollo Client
export async function testDirectFetch() {
  const query = `
    query GetHomepageData {
      posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            slug
            title
            date
            excerpt
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://backend.reportfocusnews.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    console.log('Direct fetch result:', {
      hasData: !!data.data,
      postsCount: data.data?.posts?.edges?.length || 0,
      firstPostTitle: data.data?.posts?.edges?.[0]?.node?.title || 'No title',
    });
    return data.data;
  } catch (error) {
    console.error('Direct fetch error:', error);
    return null;
  }
}