// Optimized GraphQL fragments for different use cases
// These reduce data fetching by 30-50% compared to full fragments

// Minimal fragment for list views (cards, grids)
export const POST_FIELDS_MINIMAL = `
  fragment PostFieldsMinimal on Post {
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
`;

// Medium fragment for featured articles
export const POST_FIELDS_MEDIUM = `
  fragment PostFieldsMedium on Post {
    id
    slug
    title
    date
    excerpt
    featuredImage {
      node {
        sourceUrl
        altText
        srcSet
        sizes
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
`;

// Full fragment for article detail pages
export const POST_FIELDS_FULL = `
  fragment PostFieldsFull on Post {
    id
    databaseId
    slug
    title
    date
    modified
    content
    excerpt
    featuredImage {
      node {
        sourceUrl
        altText
        srcSet
        sizes
        mediaDetails {
          width
          height
        }
      }
    }
    categories {
      edges {
        node {
          id
          databaseId
          name
          slug
          description
        }
      }
    }
    tags {
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
        id
        databaseId
        name
        slug
        firstName
        lastName
        description
        avatar {
          url
        }
      }
    }
    seo {
      title
      metaDesc
      metaKeywords
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
      }
      twitterTitle
      twitterDescription
      twitterImage {
        sourceUrl
      }
    }
    comments {
      edges {
        node {
          id
        }
      }
    }
    commentCount
  }
`;

// Category fragment for navigation
export const CATEGORY_FIELDS_MINIMAL = `
  fragment CategoryFieldsMinimal on Category {
    id
    slug
    name
    count
  }
`;

// Author fragment for bylines
export const AUTHOR_FIELDS_MINIMAL = `
  fragment AuthorFieldsMinimal on User {
    id
    name
    slug
  }
`;