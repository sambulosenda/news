import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Cache control for different paths
  const pathname = request.nextUrl.pathname;
  
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