import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check for malformed URLs containing social media domains
  if (pathname.includes('facebook.com') || 
      pathname.includes('twitter.com') || 
      pathname.includes('instagram.com') ||
      pathname.includes('youtube.com') ||
      pathname.includes('linkedin.com')) {
    // Extract the clean path before the social media URL
    const cleanPath = pathname.split(/(?:facebook|twitter|instagram|youtube|linkedin)\.com/)[0];
    
    // Redirect to the clean path or 404 if invalid
    if (cleanPath && cleanPath !== pathname) {
      return NextResponse.redirect(new URL(cleanPath || '/404', request.url));
    }
    return NextResponse.redirect(new URL('/404', request.url));
  }
  
  // Check for excessively long or suspicious pagination URLs
  if (/\/page\/\d{3,}/.test(pathname)) {
    // Redirect to search page for page numbers > 99
    return NextResponse.redirect(new URL('/search', request.url));
  }
  
  const response = NextResponse.next();
  
  // Cache control for different paths
  
  // Articles: Cache for 1 minute at CDN, 10 seconds in browser
  if (pathname.match(/^\/\d{4}\/\d{2}\/\d{2}\/.+/)) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=60, stale-while-revalidate=120'
    );
  }
  
  // Homepage: Cache for 30 seconds at CDN
  else if (pathname === '/') {
    response.headers.set(
      'Cache-Control', 
      'public, s-maxage=30, stale-while-revalidate=60'
    );
  }
  
  // Static assets: Cache for 1 year
  else if (pathname.match(/\.(js|css|jpg|jpeg|png|gif|ico|svg|woff|woff2)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
  }
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};