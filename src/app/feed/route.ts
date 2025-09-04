import { fetchGraphQL } from '@/lib/api/fetch-graphql';
import { GET_RECENT_POSTS } from '@/lib/queries/posts';

export async function GET() {
  try {
    const postsData = await fetchGraphQL(GET_RECENT_POSTS, { first: 50 });
    const posts = postsData?.posts?.edges?.map((edge: any) => edge.node) || [];

    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:georss="http://www.georss.org/georss">
  <channel>
    <title>Report Focus News</title>
    <description>Breaking news from South Africa &amp; Zimbabwe. Politics, business, load shedding updates &amp; more.</description>
    <link>https://reportfocusnews.com</link>
    <language>en-ZA</language>
    <copyright>© ${new Date().getFullYear()} Report Focus News</copyright>
    <managingEditor>editorial@reportfocusnews.com (Report Focus Editorial Team)</managingEditor>
    <webMaster>support@reportfocusnews.com (Report Focus Support)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <category domain="https://reportfocusnews.com/news/">News</category>
    <generator>Next.js RSS Generator</generator>
    <docs>https://reportfocusnews.com/about/standards</docs>
    <cloud domain="reportfocusnews.com" port="80" path="/rpc" registerProcedure="" protocol="soap"/>
    <ttl>60</ttl>
    <atom:link href="https://reportfocusnews.com/feed" rel="self" type="application/rss+xml"/>
    
    <image>
      <url>https://reportfocusnews.com/logo.png</url>
      <title>Report Focus News</title>
      <link>https://reportfocusnews.com</link>
      <width>144</width>
      <height>144</height>
      <description>Report Focus News Logo</description>
    </image>

    ${posts.map((post: any) => {
      const postDate = new Date(post.date);
      const year = postDate.getFullYear();
      const month = String(postDate.getMonth() + 1).padStart(2, '0');
      const day = String(postDate.getDate()).padStart(2, '0');
      const postUrl = `https://reportfocusnews.com/${year}/${month}/${day}/${post.slug}/`;
      
      const category = post.categories?.edges?.[0]?.node?.name || 'News';
      const tags = post.tags?.edges?.map((tag: any) => tag.node.name) || [];
      const excerpt = post.excerpt?.replace(/<[^>]*>/g, '') || '';
      const content = post.content?.replace(/<script[^>]*>.*?<\/script>/gi, '') || '';

      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${excerpt}]]></description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
      <pubDate>${postDate.toUTCString()}</pubDate>
      <category domain="${category}">${category}</category>
      ${tags.map((tag: string) => `<category>${tag}</category>`).join('')}
      <author>editorial@reportfocusnews.com (${post.author?.node?.name || 'Report Focus News'})</author>
      <source url="https://reportfocusnews.com/feed">Report Focus News</source>
      ${post.featuredImage?.node?.sourceUrl ? `
      <media:content type="image/jpeg" url="${post.featuredImage.node.sourceUrl}">
        <media:title><![CDATA[${post.featuredImage.node.altText || post.title}]]></media:title>
        ${post.featuredImage.node.caption ? `<media:description><![CDATA[${post.featuredImage.node.caption.replace(/<[^>]*>/g, '')}]]></media:description>` : ''}
      </media:content>
      <enclosure url="${post.featuredImage.node.sourceUrl}" type="image/jpeg" length="0"/>` : ''}
      <georss:point>-26.2041 28.0473</georss:point>
    </item>`;
    }).join('')}
  </channel>
</rss>`;

    return new Response(feed, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('RSS Feed Error:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}