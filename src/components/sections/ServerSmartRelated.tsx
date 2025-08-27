import { fetchGraphQLDirect } from '@/lib/api/fetch-direct';
import { WPPost } from '@/types/wordpress';
import SmartRelatedArticles from './SmartRelatedArticles';

interface ServerSmartRelatedProps {
  currentPost: WPPost;
  variant?: 'grid' | 'list' | 'mixed';
}

// GraphQL query to fetch related posts (not used due to API limitations)
/* const GET_RELATED_POSTS = `
  query GetRelatedPosts($categories: [String], $tags: [String], $exclude: [ID], $first: Int) {
    posts(
      where: { 
        categoryIn: $categories,
        tagIn: $tags,
        notIn: $exclude,
        orderby: { field: DATE, order: DESC }
      },
      first: $first
    ) {
      edges {
        node {
          id
          title
          slug
          date
          modified
          excerpt
          author {
            node {
              name
              slug
            }
          }
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
    }
  }
`; */

// Query for fallback recent posts (not used)
/* const GET_RECENT_POSTS = `
  query GetRecentPosts($exclude: [ID], $first: Int) {
    posts(
      where: { 
        notIn: $exclude,
        orderby: { field: DATE, order: DESC }
      },
      first: $first
    ) {
      edges {
        node {
          id
          title
          slug
          date
          modified
          excerpt
          author {
            node {
              name
              slug
            }
          }
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
    }
  }
`; */

async function fetchRelatedPosts(currentPost: WPPost): Promise<WPPost[]> {
  try {
    // For now, fetch recent posts from same category as a simpler approach
    // Since the GraphQL endpoint has issues with complex queries
    const categorySlug = currentPost.categories?.edges?.[0]?.node?.slug;
    
    const SIMPLE_RELATED_QUERY = `
      query GetRelatedPosts {
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
              id
              title
              slug
              date
              modified
              excerpt
              author {
                node {
                  name
                  slug
                }
              }
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
        }
      }
    `;
    
    const data = await fetchGraphQLDirect(SIMPLE_RELATED_QUERY);
    
    if (data?.posts?.edges?.length > 0) {
      // Filter posts to get ones from same category
      const allPosts = data.posts.edges.map((e: any) => e.node);
      
      // If we have a category, prioritize posts from same category
      if (categorySlug) {
        const sameCategoryPosts = allPosts.filter((p: WPPost) => 
          p.categories?.edges?.some(e => e.node.slug === categorySlug) &&
          p.id !== currentPost.id
        );
        
        const otherPosts = allPosts.filter((p: WPPost) => 
          !p.categories?.edges?.some(e => e.node.slug === categorySlug) &&
          p.id !== currentPost.id
        );
        
        return [...sameCategoryPosts, ...otherPosts];
      }
      
      // Otherwise just return all posts except current
      return allPosts.filter((p: WPPost) => p.id !== currentPost.id);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export default async function ServerSmartRelated({ 
  currentPost,
  variant = 'mixed'
}: ServerSmartRelatedProps) {
  // Fetch related posts from the server
  const relatedPosts = await fetchRelatedPosts(currentPost);
  
  if (relatedPosts.length === 0) {
    return null;
  }
  
  return (
    <SmartRelatedArticles
      currentPost={currentPost}
      allPosts={relatedPosts}
      variant={variant}
      showCategories={true}
    />
  );
}