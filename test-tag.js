const query = `
  query {
    tag(id: "corruption", idType: SLUG) {
      id
      name
      slug
      count
    }
    tags(first: 5) {
      edges {
        node {
          name
          slug
          count
        }
      }
    }
  }
`;

fetch('http://backend.reportfocusnews.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
.then(r => r.json())
.then(d => console.log(JSON.stringify(d, null, 2)))
.catch(e => console.error('Error:', e));