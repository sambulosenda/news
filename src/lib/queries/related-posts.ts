export const GET_RELATED_POSTS = `
  query GetRelatedPosts($categories: [ID!], $tags: [ID!], $exclude: [ID!], $first: Int = 6) {
    posts(
      first: $first
      where: {
        categoryIn: $categories
        tagIn: $tags
        notIn: $exclude
        orderby: { field: DATE, order: DESC }
      }
    ) {
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
        }
      }
    }
  }
`;

export const GET_POSTS_BY_CATEGORY_FOR_RELATED = `
  query GetPostsByCategoryForRelated($categorySlug: String!, $exclude: [ID!], $first: Int = 6) {
    posts(
      first: $first
      where: {
        categoryName: $categorySlug
        notIn: $exclude
        orderby: { field: DATE, order: DESC }
      }
    ) {
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
        }
      }
    }
  }
`;