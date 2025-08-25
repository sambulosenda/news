import { fetchGraphQL } from '@/lib/api/fetch-graphql';
import { 
  GET_RECENT_POSTS, 
  GET_FEATURED_POSTS,
  GET_POPULAR_POSTS,
  GET_POSTS_BY_CATEGORY 
} from '@/lib/queries/posts';
import { GET_CATEGORIES } from '@/lib/queries/categories';
import { WPPost, WPCategory } from '@/types/wordpress';

interface CategoryEdge {
  node: WPCategory;
}

interface PostEdge {
  node: WPPost;
}

interface HomepageData {
  recentPosts: WPPost[];
  featuredPosts: WPPost[];
  popularPosts: WPPost[];
  categories: WPCategory[];
  categorySections: Array<{
    category: WPCategory;
    posts: WPPost[];
  }>;
}

// Cache homepage data for better performance
let homepageCache: {
  data: HomepageData | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getOptimizedHomepageData(): Promise<HomepageData> {
  const now = Date.now();
  
  // Return cached data if still fresh
  if (homepageCache.data && (now - homepageCache.timestamp) < CACHE_DURATION) {
    return homepageCache.data;
  }

  try {
    // Fetch core data in parallel
    const [recentData, featuredData, popularData, categoriesData] = await Promise.all([
      fetchGraphQL(GET_RECENT_POSTS, { first: 20 }),
      fetchGraphQL(GET_FEATURED_POSTS, { first: 5 }),
      fetchGraphQL(GET_POPULAR_POSTS, { first: 5 }),
      fetchGraphQL(GET_CATEGORIES, { first: 10 }),
    ]);

    const categories = categoriesData?.categories?.edges?.map((e: CategoryEdge) => e.node) || [];
    
    // Optimize category section queries - only fetch for main categories
    const priorityCategories = categories.slice(0, 3);
    const categoryPromises = priorityCategories.map(async (category: any) => {
      try {
        const categoryData = await fetchGraphQL(GET_POSTS_BY_CATEGORY, {
          categorySlug: category.slug,
          first: 6,
        });
        return {
          category,
          posts: categoryData?.posts?.edges?.map((e: PostEdge) => e.node) || [],
        };
      } catch (error) {
        console.error(`Failed to fetch posts for category ${category.slug}:`, error);
        return {
          category,
          posts: [],
        };
      }
    });

    const categorySections = await Promise.all(categoryPromises);

    const data: HomepageData = {
      recentPosts: recentData?.posts?.nodes || [],
      featuredPosts: featuredData?.posts?.nodes || [],
      popularPosts: popularData?.posts?.nodes || [],
      categories,
      categorySections,
    };

    // Update cache
    homepageCache = {
      data,
      timestamp: now,
    };

    return data;
  } catch (error) {
    console.error('Failed to fetch homepage data:', error);
    
    // Return cached data if available, even if stale
    if (homepageCache.data) {
      return homepageCache.data;
    }
    
    // Fallback to empty data
    return {
      recentPosts: [],
      featuredPosts: [],
      popularPosts: [],
      categories: [],
      categorySections: [],
    };
  }
}

// Function to invalidate cache when needed
export function invalidateHomepageCache(): void {
  homepageCache = {
    data: null,
    timestamp: 0,
  };
}