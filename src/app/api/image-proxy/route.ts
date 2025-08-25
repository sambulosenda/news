import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');
    
    if (!url) {
      return new NextResponse('Missing URL parameter', { status: 400 });
    }

    // Validate it's from our backend
    if (!url.includes('backend.reportfocusnews.com')) {
      return new NextResponse('Invalid image source', { status: 403 });
    }

    console.log('[Image Proxy] Fetching:', url);

    // Fetch image with proper headers to bypass hotlink protection
    const imageResponse = await fetch(url, {
      headers: {
        'Referer': 'https://backend.reportfocusnews.com',
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      },
    });

    if (!imageResponse.ok) {
      console.error('[Image Proxy] Failed to fetch:', {
        url,
        status: imageResponse.status,
        statusText: imageResponse.statusText
      });
      return new NextResponse(`Failed to fetch image: ${imageResponse.status}`, { 
        status: imageResponse.status 
      });
    }

    const contentType = imageResponse.headers.get('Content-Type') || 'image/jpeg';
    const buffer = await imageResponse.arrayBuffer();

    // Return image with proper caching headers
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('[Image Proxy] Error:', error);
    return new NextResponse('Failed to proxy image', { status: 500 });
  }
}