import { fetchGraphQL } from '@/lib/fetch-graphql';
import { GET_ALL_POSTS } from '@/lib/queries/posts';

export async function GET() {
  const postsData = await fetchGraphQL(GET_ALL_POSTS, { first: 50 });
  
  type Post = {
    slug: string;
    date: string;
    title: string;
    excerpt?: string;
    author?: {
      node: {
        name: string;
      };
    };
    categories?: {
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
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Report Focus News - South Africa &amp; Zimbabwe News</title>
    <link>https://reportfocusnews.com</link>
    <description>Your trusted source for South African and Zimbabwe news, politics, business, and more.</description>
    <language>en-ZA</language>
    <copyright>Copyright ${new Date().getFullYear()} Report Focus News</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://reportfocusnews.com/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>https://reportfocusnews.com/logo.png</url>
      <title>Report Focus News</title>
      <link>https://reportfocusnews.com</link>
    </image>
    ${posts.map(post => {
      const postDate = new Date(post.date);
      const year = postDate.getFullYear();
      const month = String(postDate.getMonth() + 1).padStart(2, '0');
      const day = String(postDate.getDate()).padStart(2, '0');
      const postUrl = `https://reportfocusnews.com/${year}/${month}/${day}/${post.slug}/`;
      const category = post.categories?.edges?.[0]?.node?.name || 'News';
      const excerpt = post.excerpt ? post.excerpt.replace(/<[^>]*>/g, '').substring(0, 200) : '';
      
      return `
    <item>
      <title><![CDATA[${escapeXml(post.title)}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${excerpt}...]]></description>
      <pubDate>${postDate.toUTCString()}</pubDate>
      <category>${escapeXml(category)}</category>
      ${post.author?.node ? `<dc:creator><![CDATA[${escapeXml(post.author.node.name)}]]></dc:creator>` : ''}
    </item>`;
    }).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=900, s-maxage=900',
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