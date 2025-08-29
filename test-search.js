// Test search functionality
const fetch = require('node-fetch');

async function testSearch() {
  const query = `
    query SearchPosts($search: String!, $first: Int) {
      posts(
        first: $first
        where: { 
          search: $search,
          orderby: { field: DATE, order: DESC }
        }
      ) {
        edges {
          node {
            id
            title
            slug
            excerpt
            date
          }
        }
      }
    }
  `;

  const variables = {
    search: "politics",
    first: 5
  };

  try {
    const response = await fetch('https://backend.reportfocusnews.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();
    
    console.log('Search Results:');
    console.log(JSON.stringify(result, null, 2));
    
    if (result.data?.posts?.edges) {
      console.log(`\nFound ${result.data.posts.edges.length} results for "politics"`);
      result.data.posts.edges.forEach((edge, index) => {
        console.log(`${index + 1}. ${edge.node.title}`);
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testSearch();