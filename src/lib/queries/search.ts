export const SEARCH_POSTS = `
  query SearchPosts($search: String!, $first: Int = 20, $after: String) {
    posts(
      first: $first
      after: $after
      where: {
        search: $search
        orderby: { field: DATE, order: DESC }
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
          author {
            node {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const SEARCH_WITH_FILTERS = `
  query SearchWithFilters(
    $search: String!
    $first: Int = 20
    $after: String
    $categoryIn: [ID]
    $dateQuery: DateQueryInput
  ) {
    posts(
      first: $first
      after: $after
      where: {
        search: $search
        categoryIn: $categoryIn
        dateQuery: $dateQuery
        orderby: { field: DATE, order: DESC }
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
        total
      }
      edges {
        node {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            edges {
              node {
                id
                name
                slug
              }
            }
          }
          author {
            node {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const GET_POPULAR_SEARCHES = `
  query GetPopularSearches {
    categories(first: 10, where: { orderby: COUNT, order: DESC }) {
      edges {
        node {
          id
          name
          slug
          count
        }
      }
    }
    tags(first: 20, where: { orderby: COUNT, order: DESC }) {
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