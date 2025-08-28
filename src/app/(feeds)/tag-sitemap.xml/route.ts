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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${allTags
    .filter(edge => edge.node.count && edge.node.count > 0) // Only include tags with posts
    .map(edge => {
      const tag = edge.node;
      const url = `https://reportfocusnews.com/tag/${tag.slug}/`;
      
      return `
  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.6</priority>
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