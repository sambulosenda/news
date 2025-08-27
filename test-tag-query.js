// Test the exact query being used in the app
const testQuery = `
  query GetTagBySlug($slug: String!) {
    tag(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      count
      uri
      seo {
        title
        metaDesc
        canonical
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

// Test without SEO fields
const simpleQuery = `
  query GetTagBySlug($slug: String!) {
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

console.log('Testing with SEO fields...');
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
  console.log('With SEO:', JSON.stringify(data, null, 2));
  
  // Now test without SEO
  console.log('\nTesting without SEO fields...');
  return fetch('https://backend.reportfocusnews.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      query: simpleQuery,
      variables: { slug: '2021-unrest' }
    })
  });
})
.then(res => res.json())
.then(data => {
  console.log('Without SEO:', JSON.stringify(data, null, 2));
})
.catch(err => console.error('Error:', err));