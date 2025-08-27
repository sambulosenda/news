import { gql } from '@apollo/client';

// Get all tags with post count
export const GET_ALL_TAGS = gql`
  query GetAllTags($first: Int = 100, $after: String) {
    tags(first: $first, after: $after, where: { orderby: COUNT, order: DESC }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          databaseId
          name
          slug
          description
          count
          uri
        }
      }
    }
  }
`;

// Get popular tags for tag cloud
export const GET_POPULAR_TAGS = gql`
  query GetPopularTags($first: Int = 30) {
    tags(first: $first, where: { orderby: COUNT, order: DESC, hideEmpty: true }) {
      edges {
        node {
          id
          name
          slug
          count
          uri
        }
      }
    }
  }
`;

// Get posts by tag with pagination
export const GET_POSTS_BY_TAG = gql`
  query GetPostsByTag($slug: String!, $first: Int = 12, $after: String) {
    tag(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      count
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
    posts(
      first: $first
      after: $after
      where: { 
        tagSlugIn: [$slug], 
        orderby: { field: DATE, order: DESC },
        status: PUBLISH
      }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          databaseId
          title
          slug
          uri
          date
          modified
          excerpt
          content(format: RENDERED)
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          author {
            node {
              name
              slug
              avatar {
                url
              }
            }
          }
          categories {
            edges {
              node {
                name
                slug
                uri
              }
            }
          }
          tags {
            edges {
              node {
                name
                slug
                uri
              }
            }
          }
        }
        cursor
      }
    }
  }
`;

// Get tag by slug for single tag info
export const GET_TAG_BY_SLUG = gql`
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

// Get related tags based on shared posts
export const GET_RELATED_TAGS = gql`
  query GetRelatedTags($tagSlug: String!, $first: Int = 10) {
    posts(first: 20, where: { tagSlugIn: [$tagSlug] }) {
      edges {
        node {
          tags(first: $first) {
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
      }
    }
  }
`;