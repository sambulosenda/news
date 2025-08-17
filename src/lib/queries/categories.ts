import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories($first: Int = 20) {
    categories(first: $first, where: { orderby: COUNT, order: DESC }) {
      edges {
        node {
          id
          databaseId
          name
          slug
          description
          count
        }
      }
    }
  }
`;

export const GET_CATEGORY_BY_SLUG = gql`
  query GetCategoryBySlug($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      count
    }
  }
`;

export const GET_MENU_CATEGORIES = gql`
  query GetMenuCategories {
    categories(first: 100, where: { hideEmpty: false }) {
      nodes {
        id
        databaseId
        name
        slug
        count
        description
        parentId
        parent {
          node {
            id
            databaseId
            name
            slug
          }
        }
        children {
          nodes {
            id
            databaseId
            name
            slug
            count
          }
        }
      }
    }
  }
`;