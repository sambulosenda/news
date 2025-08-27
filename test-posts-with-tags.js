// Check if posts actually have these tags
const testQuery = `
  query {
    posts(first: 10, where: { tagSlugIn: ["2021-unrest"] }) {
      edges {
        node {
          title
          slug
          tags {
            edges {
              node {
                name
                slug
              }
            }
          }
        }
      }
    }
  }
`;

fetch('https://backend.reportfocusnews.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: testQuery })
})
.then(res => res.json())
.then(data => {
  console.log('Posts with tag "2021-unrest":');
  if (data.data?.posts?.edges?.length > 0) {
    data.data.posts.edges.forEach(edge => {
      console.log(`- ${edge.node.title}`);
      if (edge.node.tags?.edges?.length > 0) {
        console.log('  Tags:', edge.node.tags.edges.map(t => t.node.name).join(', '));
      }
    });
  } else {
    console.log('No posts found with this tag');
  }
  
  // Now check posts with ANY tags
  console.log('\nChecking posts with ANY tags...');
  const anyTagsQuery = `
    query {
      posts(first: 5) {
        edges {
          node {
            title
            tags {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;
  
  return fetch('https://backend.reportfocusnews.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: anyTagsQuery })
  });
})
.then(res => res.json())
.then(data => {
  console.log('\nLatest posts and their tags:');
  data.data?.posts?.edges?.forEach(edge => {
    console.log(`\nPost: ${edge.node.title}`);
    if (edge.node.tags?.edges?.length > 0) {
      console.log('Tags:', edge.node.tags.edges.map(t => `${t.node.name} (${t.node.slug})`).join(', '));
    } else {
      console.log('Tags: None');
    }
  });
})
.catch(err => console.error('Error:', err));