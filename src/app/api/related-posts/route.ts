import { NextRequest, NextResponse } from 'next/server';
import { fetchGraphQLCached } from '@/lib/api/graphql-cache';
import { GET_RECENT_POSTS } from '@/lib/queries/posts';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug required' }, { status: 400 });
  }

  try {
    const recentData = await fetchGraphQLCached(
      GET_RECENT_POSTS, 
      { first: 7 }, 
      { ttl: 600 } // 10 minute cache
    );
    
    const posts = recentData?.posts?.nodes?.filter(
      (post: { slug: string }) => post.slug !== slug
    ).slice(0, 4) || [];

    return NextResponse.json(
      { posts },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return NextResponse.json(
      { posts: [] },
      { status: 200 }
    );
  }
}