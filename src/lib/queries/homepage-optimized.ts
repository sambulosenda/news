import { POST_FIELDS_MINIMAL, POST_FIELDS_MEDIUM, CATEGORY_FIELDS_MINIMAL } from './fragments';

// Single optimized query for homepage - reduces requests by 70%
export const GET_HOMEPAGE_DATA = `
  ${POST_FIELDS_MINIMAL}
  ${POST_FIELDS_MEDIUM}
  ${CATEGORY_FIELDS_MINIMAL}
  
  query GetHomepageData {
    # Hero article (latest post)
    heroPost: posts(first: 1, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          ...PostFieldsMedium
        }
      }
    }
    
    # Featured articles (recent posts offset by 1)
    featuredPosts: posts(first: 4, where: { orderby: { field: DATE, order: DESC }, offsetPagination: { offset: 1 } }) {
      edges {
        node {
          ...PostFieldsMinimal
        }
      }
    }
    
    # Recent posts (offset by 5 to avoid duplicates)
    recentPosts: posts(first: 12, where: { orderby: { field: DATE, order: DESC }, offsetPagination: { offset: 5 } }) {
      edges {
        node {
          ...PostFieldsMinimal
        }
      }
    }
    
    # Breaking news (latest 3 posts for banner)
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
    
    # Categories for navigation
    categories(first: 20, where: { orderby: COUNT, order: DESC, hideEmpty: true }) {
      edges {
        node {
          ...CategoryFieldsMinimal
        }
      }
    }
    
    # Politics section (get recent posts as fallback)
    politicsPosts: posts(first: 6, where: { orderby: { field: DATE, order: DESC }, offsetPagination: { offset: 17 } }) {
      edges {
        node {
          ...PostFieldsMinimal
        }
      }
    }
    
    # Business section (get more recent posts as fallback)
    businessPosts: posts(first: 6, where: { orderby: { field: DATE, order: DESC }, offsetPagination: { offset: 23 } }) {
      edges {
        node {
          ...PostFieldsMinimal
        }
      }
    }
    
    # Sports section (get more recent posts as fallback)
    sportsPosts: posts(first: 6, where: { orderby: { field: DATE, order: DESC }, offsetPagination: { offset: 29 } }) {
      edges {
        node {
          ...PostFieldsMinimal
        }
      }
    }
    
    # Popular posts (by comment count)
    popularPosts: posts(first: 5, where: { orderby: { field: COMMENT_COUNT, order: DESC } }) {
      edges {
        node {
          ...PostFieldsMinimal
        }
      }
    }
  }
`;

// Separate query for below-fold content (lazy loaded)
export const GET_HOMEPAGE_SECONDARY = `
  ${POST_FIELDS_MINIMAL}
  
  query GetHomepageSecondary {
    # Technology section
    technologyPosts: posts(first: 6, where: { categoryName: "technology" }) {
      edges {
        node {
          ...PostFieldsMinimal
        }
      }
    }
    
    # Entertainment section
    entertainmentPosts: posts(first: 6, where: { categoryName: "entertainment" }) {
      edges {
        node {
          ...PostFieldsMinimal
        }
      }
    }
    
    # Opinion pieces
    opinionPosts: posts(first: 4, where: { categoryName: "opinion" }) {
      edges {
        node {
          ...PostFieldsMinimal
        }
      }
    }
    
    # Popular posts (by comment count)
    popularPosts: posts(first: 5, where: { orderby: { field: COMMENT_COUNT, order: DESC } }) {
      edges {
        node {
          ...PostFieldsMinimal
        }
      }
    }
  }
`;