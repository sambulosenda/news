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
      
      // Extract current post's tags for matching
      const currentTags = currentPost.tags?.edges?.map(e => e.node.slug) || [];
      
      // Score each post based on relevance
      const scoredPosts = allPosts
        .filter((p: WPPost) => p.id !== currentPost.id)
        .map((p: WPPost) => {
          let score = 0;
          
          // Category match (highest weight)
          if (categorySlug && p.categories?.edges?.some(e => e.node.slug === categorySlug)) {
            score += 10;
          }
          
          // Tag matches (medium weight - 3 points per matching tag)
          if (currentTags.length > 0 && p.tags?.edges) {
            const postTags = p.tags.edges.map(e => e.node.slug);
            const matchingTags = currentTags.filter(tag => postTags.includes(tag));
            score += matchingTags.length * 3;
          }
          
          // Recency bonus (1 point for posts within last 7 days)
          const postDate = new Date(p.date);
          const daysSincePublished = (Date.now() - postDate.getTime()) / (1000 * 60 * 60 * 24);
          if (daysSincePublished <= 7) {
            score += 1;
          }
          
          return { post: p, score };
        })
        .sort((a: any, b: any) => b.score - a.score)
        .map((item: any) => item.post);
      
      return scoredPosts;
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