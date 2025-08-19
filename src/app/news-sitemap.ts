import { MetadataRoute } from 'next';
import { fetchGraphQL } from '@/lib/fetch-graphql';
import { GET_RECENT_POSTS } from '@/lib/queries/posts';

export default async function newsSitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.reportfocusnews.com';

  // Fetch recent posts (Google News typically considers articles from last 2 days)
  const postsData = await fetchGraphQL(GET_RECENT_POSTS, { first: 1000 });

  type Post = {
    slug: string;
    title: string;
    date: string;
    modified?: string;
  };
  
  interface PostEdge {
    node: Post;
  }
  
  const posts: Post[] = postsData?.posts?.edges?.map((edge: PostEdge) => edge.node) || [];

  // Filter posts from last 2 days for Google News
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  const recentPosts = posts.filter(post => new Date(post.date) > twoDaysAgo);

  // Generate news sitemap entries
  const newsEntries = recentPosts.map((post) => {
    const postDate = new Date(post.date);
    const year = postDate.getFullYear();
    const month = String(postDate.getMonth() + 1).padStart(2, '0');
    const day = String(postDate.getDate()).padStart(2, '0');
    
    return {
      url: `${baseUrl}/${year}/${month}/${day}/${post.slug}/`,
      lastModified: new Date(post.modified || post.date),
      changeFrequency: 'hourly' as const,
      priority: 1.0,
    };
  });

  return newsEntries;
}