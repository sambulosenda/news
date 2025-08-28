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
    // Direct fetch result logged
    return data.data;
  } catch {
    // Direct fetch error occurred
    return null;
  }
}