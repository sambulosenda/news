import { MetadataRoute } from 'next';
import { fetchGraphQL } from '@/lib/fetch-graphql';
import { GET_ALL_POSTS } from '@/lib/queries/posts';
import { GET_CATEGORIES } from '@/lib/queries/categories';
import { detectLocationFromContent } from '@/lib/location-detector';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.reportfocusnews.com';

  // Fetch all posts and categories
  const [postsData, categoriesData] = await Promise.all([
    fetchGraphQL(GET_ALL_POSTS, { first: 100 }),
    fetchGraphQL(GET_CATEGORIES, { first: 50 }),
  ]);

  type Post = {
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
  };
  
  type Category = {
    slug: string;
  };
  
  interface PostEdge {
    node: Post;
  }
  
  interface CategoryEdge {
    node: Category;
  }
  
  const posts: Post[] = postsData?.posts?.edges?.map((edge: PostEdge) => edge.node) || [];
  const categories: Category[] = categoriesData?.categories?.edges?.map((edge: CategoryEdge) => edge.node) || [];

  // Static pages with regional focus
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Location-specific landing pages
    {
      url: `${baseUrl}/news/south-africa/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news/zimbabwe/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news/politics/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/business/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news/breaking/`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    // Editorial pages for Google News
    {
      url: `${baseUrl}/ethics-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/diversity-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/coverage-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/masthead`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Dynamic post pages with location-based prioritization
  const postPages = posts.map((post) => {
    const postDate = new Date(post.date);
    const year = postDate.getFullYear();
    const month = String(postDate.getMonth() + 1).padStart(2, '0');
    const day = String(postDate.getDate()).padStart(2, '0');
    
    // Detect location to set priority
    const category = post.categories?.edges?.[0]?.node?.name || '';
    const tags = post.tags?.edges?.map(edge => edge.node.name) || [];
    const location = detectLocationFromContent(
      post.title || '',
      post.content || post.excerpt || '',
      category,
      tags
    );
    
    // Higher priority for South Africa/Zimbabwe content
    const priority = location ? 0.9 : 0.7;
    
    // More frequent updates for recent posts
    const isRecent = (Date.now() - postDate.getTime()) < (7 * 24 * 60 * 60 * 1000); // 7 days
    const changeFrequency = isRecent ? 'daily' as const : 'weekly' as const;
    
    return {
      url: `${baseUrl}/${year}/${month}/${day}/${post.slug}/`,
      lastModified: new Date(post.modified || post.date),
      changeFrequency,
      priority,
    };
  });

  // Category pages with /news/ prefix
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/news/${category.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages, ...categoryPages];
}