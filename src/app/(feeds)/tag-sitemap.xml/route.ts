import { NextResponse } from 'next/server';
import { fetchGraphQLCached } from '@/lib/api/graphql-cache';
import { GET_ALL_TAGS } from '@/lib/queries/tags';
import { WPTag } from '@/types/wordpress';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    let allTags: { node: WPTag }[] = [];
    let hasNextPage = true;
    let after = null;

    // Fetch all tags with pagination
    while (hasNextPage) {
      const data = await fetchGraphQLCached(
        GET_ALL_TAGS,
        { first: 100, after },
        { ttl: 3600 }
      );

      if (data?.tags?.edges) {
        allTags = [...allTags, ...data.tags.edges];
        hasNextPage = data.tags.pageInfo?.hasNextPage || false;
        after = data.tags.pageInfo?.endCursor;
      } else {
        hasNextPage = false;
      }
    }

    // Generate sitemap XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allTags
    .filter(edge => edge.node.count && edge.node.count > 0) // Only include tags with posts
    .sort((a, b) => (b.node.count || 0) - (a.node.count || 0)) // Sort by post count
    .map(edge => {
      const tag = edge.node;
      const url = `https://reportfocusnews.com/tag/${tag.slug}/`;
      
      // Dynamic priority based on post count
      let priority = 0.3; // Base priority
      if (tag.count && tag.count > 50) priority = 0.7;
      else if (tag.count && tag.count > 20) priority = 0.6;
      else if (tag.count && tag.count > 10) priority = 0.5;
      else if (tag.count && tag.count > 5) priority = 0.4;
      
      // Dynamic changefreq based on post count
      let changefreq = 'monthly';
      if (tag.count && tag.count > 50) changefreq = 'daily';
      else if (tag.count && tag.count > 20) changefreq = 'weekly';
      
      return `
  <url>
    <loc>${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join('')}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating tag sitemap:', error);
    
    // Return basic sitemap on error
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://reportfocusnews.com/tags/</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}