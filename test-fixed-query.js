// Test the corrected query
const testQuery = `
  query GetTagBySlug($slug: ID!) {
    tag(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      count
      uri
    }
  }
`;

fetch('https://backend.reportfocusnews.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    query: testQuery,
    variables: { slug: '2021-unrest' }
  })
})
.then(res => res.json())
.then(data => {
  console.log('Response:', JSON.stringify(data, null, 2));
})
.catch(err => console.error('Error:', err));