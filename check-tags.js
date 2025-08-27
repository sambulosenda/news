// Direct test to WordPress GraphQL
const testQuery = `
  query TestTags {
    tags(first: 5) {
      edges {
        node {
          id
          name
          slug
          count
        }
      }
    }
  }
`;

fetch('https://backend.reportfocusnews.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ 
    query: testQuery 
  })
})
.then(res => res.json())
.then(data => {
  console.log('GraphQL Response:', JSON.stringify(data, null, 2));
  
  if (data.data && data.data.tags) {
    console.log('\nTags found:', data.data.tags.edges.length);
    data.data.tags.edges.forEach(edge => {
      console.log(`- ${edge.node.name} (slug: ${edge.node.slug}, count: ${edge.node.count})`);
    });
  } else {
    console.log('\nNo tags found or error occurred');
  }
})
.catch(err => console.error('Error:', err));