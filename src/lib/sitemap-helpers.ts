import { fetchGraphQL } from '@/lib/fetch-graphql';

// Query to get total post count
const GET_POST_COUNT = `
  query GetPostCount {
    posts {
      pageInfo {
        total
      }
    }
  }
`;

// Query to fetch posts with pagination
const GET_POSTS_PAGINATED = `
  query GetPostsPaginated($first: Int!, $after: String) {
    posts(first: $first, after: $after, where: { orderby: { field: DATE, order: DESC } }) {
      pageInfo {
        hasNextPage
        endCursor
        total
      }
      edges {
        node {
          id
          slug
          date
          modified
          title
          excerpt
          content
          categories {
            edges {
              node {
                name
                slug
              }
            }
          }
          tags {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;

export interface Post {
  slug: string;
  date: string;
  modified?: string;
  title?: string;
  content?: string;
  excerpt?: string;
  categories?: {
    edges: Array<{
      node: {
        name: string;
        slug?: string;
      };
    }>;
  };
  tags?: {
    edges: Array<{
      node: {
        name: string;
      };
    }>;
  };
}

/**
 * Fetches all posts from WordPress using pagination
 * @param batchSize - Number of posts to fetch per request (default 100)
 * @returns Array of all posts
 */
export async function fetchAllPosts(batchSize = 100): Promise<Post[]> {
  const allPosts: Post[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;
  let page = 0;
  
  // Safety limit to prevent infinite loops (max 10000 posts)
  const maxPages = 100;
  
  while (hasNextPage && page < maxPages) {
    try {
      const data = await fetchGraphQL(GET_POSTS_PAGINATED, {
        first: batchSize,
        after: endCursor,
      });
      
      if (!data?.posts?.edges) {
        console.error('No posts data returned');
        break;
      }
      
      const posts = data.posts.edges.map((edge: any) => edge.node);
      allPosts.push(...posts);
      
      hasNextPage = data.posts.pageInfo.hasNextPage;
      endCursor = data.posts.pageInfo.endCursor;
      page++;
      
      // Log progress
      console.log(`Fetched ${allPosts.length} posts (page ${page})`);
      
      // Add a small delay to avoid overwhelming the server
      if (hasNextPage) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error(`Error fetching posts page ${page}:`, error);
      break;
    }
  }
  
  console.log(`Total posts fetched: ${allPosts.length}`);
  return allPosts;
}

/**
 * Fetches all categories from WordPress
 * @param limit - Maximum number of categories to fetch
 * @returns Array of categories
 */
export async function fetchAllCategories(limit = 100) {
  const GET_ALL_CATEGORIES = `
    query GetAllCategories($first: Int!) {
      categories(first: $first) {
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
  
  try {
    const data = await fetchGraphQL(GET_ALL_CATEGORIES, { first: limit });
    return data?.categories?.edges?.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}