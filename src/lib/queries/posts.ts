import { gql } from '@apollo/client';

export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    databaseId
    slug
    title
    excerpt
    date
    modified
    featuredImage {
      node {
        sourceUrl
        altText
        caption
        mediaDetails {
          width
          height
        }
      }
    }
    author {
      node {
        databaseId
        name
        firstName
        lastName
        avatar {
          url
        }
        description
      }
    }
    categories {
      edges {
        node {
          id
          databaseId
          name
          slug
        }
      }
    }
  }
`;

export const GET_ALL_POSTS = gql`
  ${POST_FIELDS}
  query GetAllPosts($first: Int = 10, $after: String) {
    posts(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          ...PostFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_POST_BY_SLUG = gql`
  ${POST_FIELDS}
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      ...PostFields
      content
      author {
        node {
          name
          firstName
          lastName
          description
          avatar {
            url
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
    }
  }
`;

export const GET_RELATED_POSTS = gql`
  ${POST_FIELDS}
  query GetRelatedPosts($categoryId: Int!, $exclude: [ID], $first: Int = 4) {
    posts(
      first: $first
      where: { 
        categoryId: $categoryId,
        notIn: $exclude,
        orderby: { field: DATE, order: DESC }
      }
    ) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

export const GET_POSTS_BY_CATEGORY = gql`
  ${POST_FIELDS}
  query GetPostsByCategory($categorySlug: String!, $first: Int = 10, $after: String) {
    posts(
      first: $first
      after: $after
      where: { 
        categoryName: $categorySlug, 
        orderby: { field: DATE, order: DESC } 
      }
    ) {
      edges {
        node {
          ...PostFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_FEATURED_POSTS = gql`
  ${POST_FIELDS}
  query GetFeaturedPosts($first: Int = 5) {
    posts(
      first: $first
      where: { 
        orderby: { field: DATE, order: DESC },
        tagSlugIn: ["featured"]
      }
    ) {
      nodes {
        ...PostFields
      }
    }
  }
`;

export const GET_RECENT_POSTS = gql`
  ${POST_FIELDS}
  query GetRecentPosts($first: Int = 10) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...PostFields
      }
    }
  }
`;

export const GET_POPULAR_POSTS = gql`
  ${POST_FIELDS}
  query GetPopularPosts($first: Int = 5) {
    posts(
      first: $first
      where: { 
        orderby: { field: COMMENT_COUNT, order: DESC }
      }
    ) {
      nodes {
        ...PostFields
      }
    }
  }
`;

export const SEARCH_POSTS = gql`
  ${POST_FIELDS}
  query SearchPosts($search: String!, $first: Int = 10, $after: String) {
    posts(
      first: $first
      after: $after
      where: { 
        search: $search,
        orderby: { field: DATE, order: DESC }
      }
    ) {
      edges {
        node {
          ...PostFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

export const GET_AUTHOR_POSTS = gql`
  ${POST_FIELDS}
  query GetAuthorPosts($authorId: Int!, $exclude: [ID!], $first: Int!) {
    posts(
      where: { 
        authorId: $authorId, 
        notIn: $exclude 
      }
      first: $first
    ) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;