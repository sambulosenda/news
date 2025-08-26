import { format } from 'date-fns';
import { detectLocationFromContent } from '@/lib/utils/location-detector';

// Direct GraphQL query
const GET_NEWS_SITEMAP_POSTS = `
  query GetNewsSitemapPosts($first: Int!) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      edges {
        node {
          slug
          date
          modified
          title
          content
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
              caption
            }
          }
          categories {
            edges {
              node {
                name
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

// Fetch posts directly from GraphQL
async function fetchPosts(first: number = 1000) {
  try {
    const response = await fetch('https://backend.reportfocusnews.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_NEWS_SITEMAP_POSTS,
        variables: { first }
      }),
    });

    const data = await response.json();
    return data?.data?.posts?.edges || [];
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const debug = searchParams.get('debug') === 'true';
  
  if (debug) {
    console.error('[DEBUG] Fetching news sitemap...');
  }
  
  try {
    const edges = await fetchPosts();
    
    if (debug) {
      console.error('[DEBUG] Posts fetched:', edges.length);
    }
    
    type Post = {
      slug: string;
      date: string;
      modified?: string;
      title: string;
      content?: string;
      excerpt?: string;
      featuredImage?: {
        node?: {
          sourceUrl?: string;
          altText?: string;
          caption?: string;
        };
      };
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
    
    const posts: Post[] = edges.map((edge: any) => edge.node);
    
    if (debug && posts.length > 0) {
      console.error('[DEBUG] First post:', posts[0].title, posts[0].date);
    }
    
    // Filter posts - use 2 days for Google News (they only accept articles from last 2 days)
    // Can override with ?days=N for testing
    const daysToInclude = parseInt(searchParams.get('days') || '2');
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToInclude);
    
    const recentPosts = debug 
      ? posts.slice(0, 20) // In debug mode, just show first 20
      : posts.filter(post => {
          const postDate = new Date(post.date);
          return postDate >= cutoffDate;
        }).slice(0, 1000); // Google News max limit is 1000 URLs
    
    // If no recent posts, show the 10 most recent regardless of date
    const finalPosts = recentPosts.length > 0 ? recentPosts : posts.slice(0, 10);
    
    if (debug) {
      console.error('[DEBUG] Posts after filtering:', finalPosts.length);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${finalPosts.map(post => {
    const postDate = new Date(post.date);
    const year = postDate.getFullYear();
    const month = String(postDate.getMonth() + 1).padStart(2, '0');
    const day = String(postDate.getDate()).padStart(2, '0');
    const category = post.categories?.edges?.[0]?.node?.name || 'News';
    const tags = post.tags?.edges?.map(edge => edge.node.name) || [];
    
    // Detect location for geo-targeting
    const location = detectLocationFromContent(
      post.title || '',
      post.content || post.excerpt || '',
      category,
      tags
    );
    
    // Enhanced keywords for regional news
    const keywords = [
      category,
      ...tags.slice(0, 3),
      ...(location ? [
        location.country,
        ...(location.city ? [location.city] : []),
        'Southern Africa'
      ] : ['South Africa', 'Zimbabwe'])
    ].filter(Boolean).slice(0, 10);
    
    // Convert WordPress backend image URL to frontend proxy URL
    const imageUrl = post.featuredImage?.node?.sourceUrl 
      ? `https://reportfocusnews.com/api/image-proxy?url=${encodeURIComponent(post.featuredImage.node.sourceUrl)}`
      : null;
    
    return `
  <url>
    <loc>https://reportfocusnews.com/${year}/${month}/${day}/${post.slug}/</loc>
    ${imageUrl ? `
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${escapeXml(post.featuredImage?.node?.altText || post.title)}</image:title>
      <image:caption>${escapeXml(post.featuredImage?.node?.caption || post.title)}</image:caption>
    </image:image>` : ''}
    <news:news>
      <news:publication>
        <news:name>Report Focus News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${format(postDate, "yyyy-MM-dd'T'HH:mm:ssxxx")}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
      <news:keywords>${escapeXml(keywords.join(', '))}</news:keywords>
      ${location ? `<news:geo_locations>${escapeXml(location.country)}${location.city ? `, ${location.city}` : ''}</news:geo_locations>` : '<news:geo_locations>South Africa, Zimbabwe</news:geo_locations>'}
    </news:news>
    <lastmod>${format(new Date(post.modified || post.date), "yyyy-MM-dd'T'HH:mm:ssxxx")}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>`;
  }).join('')}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Error generating news sitemap:', error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"></urlset>`,
      {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=300, s-maxage=300',
        },
      }
    );
  }
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}