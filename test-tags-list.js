const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');

const client = new ApolloClient({
  uri: 'http://backend.reportfocusnews.com/graphql',
  cache: new InMemoryCache(),
});

const GET_TAGS = gql`
  query GetTags {
    tags(first: 20) {
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

client.query({ query: GET_TAGS })
  .then(result => {
    console.log('Tags found:');
    result.data.tags.edges.forEach(edge => {
      console.log(`- ${edge.node.name} (${edge.node.slug}) - ${edge.node.count} posts`);
    });
  })
  .catch(error => console.error('Error:', error.message));