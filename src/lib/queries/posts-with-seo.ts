import { gql } from '@apollo/client';

// Query with AIOSEO fields
export const GET_POST_WITH_SEO = gql`
  query GetPostWithSEO($slug: String!) {
    postBy(slug: $slug) {
      id
      databaseId
      title
      slug
      date
      modified
      excerpt
      content
      
      # AIOSEO Fields (if using WPGraphQL for AIOSEO)
      seo {
        title
        metaDesc
        metaKeywords
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
        }
        twitterTitle
        twitterDescription
        twitterImage {
          sourceUrl
        }
        canonical
        focusKeywords
        schema {
          raw
        }
      }
      
      # Yoast SEO fields (alternative if using Yoast)
      # Remove if using AIOSEO
      # seo {
      #   title
      #   metaDesc
      #   focuskw
      #   opengraphTitle
      #   opengraphDescription
      #   opengraphImage {
      #     sourceUrl
      #   }
      #   twitterTitle
      #   twitterDescription
      # }
      
      featuredImage {
        node {
          sourceUrl
          altText
          caption
          description
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
          slug
          firstName
          lastName
          description
          avatar {
            url
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

// Test query to check what SEO fields are available
export const TEST_SEO_FIELDS = gql`
  query TestSEOFields($slug: String!) {
    postBy(slug: $slug) {
      id
      title
      # Try to query seo field to see structure
      seo {
        __typename
      }
    }
  }
`;