import { MetadataRoute } from 'next';
import { fetchAllPosts, fetchAllCategories } from '@/lib/sitemap-helpers';
import { detectLocationFromContent } from '@/lib/location-detector';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://reportfocusnews.com';

  // Fetch ALL posts and categories using pagination
  const [posts, categories] = await Promise.all([
    fetchAllPosts(100), // Fetches all posts in batches of 100
    fetchAllCategories(100), // Fetches up to 100 categories
  ]);

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
      url: `${baseUrl}/news/breaking-news/`,
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
  const categoryPages = categories.map((category: any) => ({
    url: `${baseUrl}/news/${category.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages, ...categoryPages];
}