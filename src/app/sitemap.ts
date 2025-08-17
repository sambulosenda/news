import { MetadataRoute } from 'next';
import { fetchGraphQL } from '@/lib/fetch-graphql';
import { GET_ALL_POSTS } from '@/lib/queries/posts';
import { GET_CATEGORIES } from '@/lib/queries/categories';

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

  // Static pages
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
  ];

  // Dynamic post pages
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Category pages
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages, ...categoryPages];
}