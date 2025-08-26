import { NextRequest, NextResponse } from 'next/server';

// In-memory cache for processed images
const imageCache = new Map<string, { buffer: ArrayBuffer; contentType: string; timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');
    const quality = request.nextUrl.searchParams.get('q') || '85';
    const width = request.nextUrl.searchParams.get('w');
    const height = request.nextUrl.searchParams.get('h');
    
    if (!url) {
      return new NextResponse('Missing URL parameter', { status: 400 });
    }

    // Validate it's from our backend or handle Google crawler
    const userAgent = request.headers.get('user-agent') || '';
    const isGoogleBot = userAgent.toLowerCase().includes('googlebot') || 
                         userAgent.toLowerCase().includes('google-inspectiontool');
    
    if (!url.includes('backend.reportfocusnews.com') && !isGoogleBot) {
      return new NextResponse('Invalid image source', { status: 403 });
    }

    // Create cache key with optimization parameters
    const cacheKey = `${url}-${quality}-${width}-${height}`;
    
    // Check cache first
    const cached = imageCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return new NextResponse(cached.buffer, {
        status: 200,
        headers: {
          'Content-Type': cached.contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Access-Control-Allow-Origin': '*',
          'X-Cache': 'HIT',
        },
      });
    }

    console.log('[Image Proxy] Fetching:', url);

    // Fetch image with proper headers to bypass hotlink protection
    const imageResponse = await fetch(url, {
      headers: {
        'Referer': 'https://backend.reportfocusnews.com/',
        'Origin': 'https://backend.reportfocusnews.com',
        'User-Agent': 'WordPress/6.3.1',
        'Accept': 'image/webp,image/avif,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      redirect: 'follow',
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

    // Cache the result
    imageCache.set(cacheKey, {
      buffer,
      contentType,
      timestamp: Date.now(),
    });

    // Clean cache periodically (keep under 100 items)
    if (imageCache.size > 100) {
      const oldestKey = imageCache.keys().next().value;
      if (oldestKey) imageCache.delete(oldestKey);
    }

    // Return image with aggressive caching
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'X-Cache': 'MISS',
        'Vary': 'Accept', // For WebP support
      },
    });
  } catch (error) {
    console.error('[Image Proxy] Error:', error);
    return new NextResponse('Failed to proxy image', { status: 500 });
  }
}