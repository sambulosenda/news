import { fetchGraphQL } from '@/lib/api/fetch-graphql';
import { format } from 'date-fns';
import { detectLocationFromContent } from '@/lib/utils/location-detector';

// Custom query to include featured images
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

export async function GET() {
  const postsData = await fetchGraphQL(GET_NEWS_SITEMAP_POSTS, { first: 1000 });
  
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
  
  interface PostEdge {
    node: Post;
  }
  
  const posts: Post[] = postsData?.posts?.edges?.map((edge: PostEdge) => edge.node) || [];
  
  // Filter posts from last 7 days (optimal for Google News)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentPosts = posts.filter(post => {
    const postDate = new Date(post.date);
    return postDate >= sevenDaysAgo;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${recentPosts.map(post => {
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
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=300, s-maxage=300', // 5 minutes for breaking news
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}