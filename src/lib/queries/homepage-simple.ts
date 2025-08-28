// Simplified homepage query without fragments for debugging
export const GET_HOMEPAGE_DATA_SIMPLE = `
  query GetHomepageData {
    heroPost: posts(first: 1, where: { categoryName: "Featured", orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          slug
          title
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
    
    featuredPosts: posts(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          slug
          title
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
    
    recentPosts: posts(first: 12, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          slug
          title
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
    
    breakingNews: posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          title
          slug
          date
        }
      }
    }
    
    categories(first: 20, where: { orderby: COUNT, order: DESC, hideEmpty: true }) {
      edges {
        node {
          id
          slug
          name
          count
        }
      }
    }
    
    politicsPosts: posts(first: 6, where: { categoryName: "Politics", orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          slug
          title
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
    
    businessPosts: posts(first: 6, where: { categoryName: "Business", orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          slug
          title
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
    
    sportsPosts: posts(first: 6, where: { categoryName: "Sports", orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          id
          slug
          title
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
    
    popularPosts: posts(first: 5, where: { orderby: { field: COMMENT_COUNT, order: DESC } }) {
      edges {
        node {
          id
          slug
          title
          date
        }
      }
    }
  }
`;