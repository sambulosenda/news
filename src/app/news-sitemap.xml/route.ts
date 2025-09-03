import { fetchGraphQL } from '@/lib/api/fetch-graphql';
import { GET_RECENT_POSTS } from '@/lib/queries/posts';
import { NextResponse } from 'next/server';

// Google News sitemap must be XML format, not NextJS sitemap format
export async function GET() {
  const baseUrl = 'https://reportfocusnews.com';

  try {
    // Fetch recent posts with full details for Google News sitemap
    const postsData = await fetchGraphQL(GET_RECENT_POSTS, { first: 1000 });

    type Post = {
      slug: string;
      title: string;
      date: string;
      modified?: string;
      categories?: {
        edges: Array<{
          node: {
            name: string;
            slug: string;
          };
        }>;
      };
      author?: {
        node?: {
          name: string;
        };
      };
      excerpt?: string;
      featuredImage?: {
        node?: {
          sourceUrl: string;
          altText?: string;
        };
      };
      tags?: {
        edges: Array<{
          node: {
            name: string;
          };
        }>;
      };
    };
    
    interface PostEdge {
      node: Post;
    }
    
    const posts: Post[] = postsData?.posts?.edges?.map((edge: PostEdge) => edge.node) || [];

    // Filter posts from last 2 days for Google News (can extend to 30 days max)
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const recentPosts = posts.filter(post => new Date(post.date) > twoDaysAgo);

    // Generate Google News XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentPosts.map((post) => {
  const postDate = new Date(post.date);
  const year = postDate.getFullYear();
  const month = String(postDate.getMonth() + 1).padStart(2, '0');
  const day = String(postDate.getDate()).padStart(2, '0');
  const url = `${baseUrl}/${year}/${month}/${day}/${post.slug}/`;
  
  // Clean title for XML
  const cleanTitle = post.title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
    
  // Get keywords from tags
  const keywords = post.tags?.edges?.map(tag => tag.node.name).slice(0, 10).join(', ') || '';
  
  // Get genre/section (unused but keeping for future use)
  // const genre = post.categories?.edges?.[0]?.node?.name || 'General';
  
  return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>Report Focus News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${postDate.toISOString()}</news:publication_date>
      <news:title>${cleanTitle}</news:title>
      <news:keywords>${keywords}</news:keywords>
      <news:stock_tickers></news:stock_tickers>
    </news:news>
    <lastmod>${new Date(post.modified || post.date).toISOString()}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>`;
}).join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=1800',
      },
    });

  } catch (error) {
    console.error('Error generating news sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}