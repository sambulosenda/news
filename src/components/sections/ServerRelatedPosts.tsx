import { fetchGraphQLCached } from '@/lib/api/graphql-cache';
import { GET_RELATED_POSTS, GET_RECENT_POSTS } from '@/lib/queries/posts';
import ArticleCard from '@/components/cards/ArticleCard';
import { WPPost } from '@/types/wordpress';

interface ServerRelatedPostsProps {
  slug: string;
  categoryId?: number;
  currentPostId?: string;
}

/**
 * Server-side related posts component for better SEO and performance
 * Uses ISR caching and server-side rendering
 */
export default async function ServerRelatedPosts({ 
  slug, 
  categoryId, 
  currentPostId 
}: ServerRelatedPostsProps) {
  let relatedPosts: WPPost[] = [];

  try {
    if (categoryId && currentPostId) {
      // Try to get related posts by category first
      const relatedData = await fetchGraphQLCached(
        GET_RELATED_POSTS,
        { 
          categoryId, 
          exclude: [currentPostId], 
          first: 6 
        },
        { ttl: 600 } // 10 minutes cache
      );
      
      relatedPosts = relatedData?.posts?.edges?.map((edge: { node: WPPost }) => edge.node) || [];
    }

    // If no related posts or not enough, get recent posts as fallback
    if (relatedPosts.length < 4) {
      const recentData = await fetchGraphQLCached(
        GET_RECENT_POSTS,
        { first: 8 },
        { ttl: 300 } // 5 minutes cache
      );
      
      const recentPosts = recentData?.posts?.nodes?.filter(
        (post: WPPost) => post.slug !== slug
      ) || [];
      
      // Merge and deduplicate
      const existingIds = new Set(relatedPosts.map(p => p.id));
      const additionalPosts = recentPosts
        .filter((post: WPPost) => !existingIds.has(post.id))
        .slice(0, 4 - relatedPosts.length);
      
      relatedPosts = [...relatedPosts, ...additionalPosts];
    }

    // Limit to 4 posts
    relatedPosts = relatedPosts.slice(0, 4);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    // Return empty array on error, component will not render
    return null;
  }

  if (!relatedPosts.length) {
    return null;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-12 border-t-2 border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
          More from Report Focus News
        </h2>
        <div className="w-20 h-1 bg-red-700"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedPosts.map((relatedPost: WPPost) => (
          <ArticleCard
            key={relatedPost.id}
            article={relatedPost}
            variant="default"
            showImage={true}
            showExcerpt={true}
            showAuthor={false}
            showCategory={true}
          />
        ))}
      </div>
    </section>
  );
}

// Loading component for better UX during streaming
export function RelatedPostsSkeleton() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-12 border-t-2 border-gray-200">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
          More from Report Focus News
        </h2>
        <div className="w-20 h-1 bg-red-700"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-[16/9] rounded-lg mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
}