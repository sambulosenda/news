import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check for malformed search URLs patterns
  if (pathname.startsWith('/search/')) {
    // Pattern: /search/term/page/number/www. or /search/term/anything-else
    const searchPathMatch = pathname.match(/^\/search\/(.+?)(?:\/page\/\d+)?(?:\/www\.?)?(?:\/.*)?$/);
    
    if (searchPathMatch) {
      const searchTerm = decodeURIComponent(searchPathMatch[1]);
      // Clean the search term (remove + signs, extra chars)
      const cleanTerm = searchTerm.replace(/\+/g, ' ').replace(/[^\w\s\-]/g, '').trim();
      
      if (cleanTerm && cleanTerm.length >= 2) {
        // Redirect to proper search URL with query parameter
        const redirectUrl = new URL('/search', request.url);
        redirectUrl.searchParams.set('q', cleanTerm);
        return NextResponse.redirect(redirectUrl, 301);
      }
    }
    
    // Block any other malformed search URLs
    return NextResponse.redirect(new URL('/search', request.url), 301);
  }
  
  // Block specific malformed patterns
  if (pathname.includes('/page/') && /\/page\/\d+\/www\.?(?:\/|$)/.test(pathname)) {
    return NextResponse.redirect(new URL('/search', request.url), 301);
  }
  
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