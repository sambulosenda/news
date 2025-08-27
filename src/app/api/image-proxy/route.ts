import { NextRequest, NextResponse } from 'next/server';
import { getCDNImageUrl } from '@/lib/cdn';

/**
 * Image Proxy Route - Now redirects to Bunny CDN
 * Kept for backward compatibility with existing links
 * New code should use CDN URLs directly
 */
export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');
    
    if (!url) {
      return new NextResponse('Missing URL parameter', { status: 400 });
    }

    // Decode the URL if it's encoded
    const decodedUrl = decodeURIComponent(url);
    
    // Get CDN URL
    const cdnUrl = getCDNImageUrl(decodedUrl);
    
    // Redirect to CDN URL (permanent redirect for SEO)
    return NextResponse.redirect(cdnUrl, {
      status: 301, // Permanent redirect
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      }
    });
  } catch (error) {
    console.error('[Image Proxy] Error:', error);
    
    // Return a fallback image on error
    return NextResponse.redirect('https://reportfocusnews.com/og-image.jpg', {
      status: 302, // Temporary redirect for errors
    });
  }
}

// Keep HEAD method for compatibility
export async function HEAD(request: NextRequest) {
  return GET(request);
}