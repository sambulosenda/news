# Image Loading Fix Guide - 402 Payment Required Error

## Problem Identified
Images from `backend.reportfocusnews.com` are returning 402 (Payment Required) status, blocking image display on the frontend.

## Root Causes (Check These)

### 1. WordPress Hotlink Protection
Check if hotlink protection is enabled on your WordPress hosting:
- **cPanel**: Look for "Hotlink Protection" in security settings
- **Cloudflare**: Check "Hotlink Protection" under Scrape Shield
- **WordPress Plugins**: Check security plugins like Wordfence, All In One WP Security

**Fix**: Add `reportfocusnews.com` and `www.reportfocusnews.com` to the whitelist

### 2. .htaccess Rules
Check `/wp-content/.htaccess` or root `.htaccess` for rules like:
```apache
RewriteCond %{HTTP_REFERER} !^https?://(www\.)?backend\.reportfocusnews\.com [NC]
RewriteRule \.(jpg|jpeg|png|gif|webp)$ - [F,L]
```

**Fix**: Add your frontend domain to allowed referers:
```apache
RewriteCond %{HTTP_REFERER} !^https?://(www\.)?(backend\.)?reportfocusnews\.com [NC]
```

### 3. CDN or Hosting Issues
- Check if your hosting plan has bandwidth limits
- Verify CDN settings allow external access
- Ensure no payment/billing issues with hosting

### 4. WordPress Security Plugins
Common plugins that might block images:
- **Wordfence**: Settings > Firewall > Whitelisted URLs
- **Sucuri**: Firewall > Access Control > Whitelist
- **All In One WP Security**: Firewall > Internet Bots

## Quick Workarounds

### Option 1: Proxy Images Through Your Next.js App
Create an API route to proxy images:

```typescript
// src/app/api/image-proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) return new NextResponse('Missing URL', { status: 400 });
  
  const imageResponse = await fetch(url, {
    headers: {
      'Referer': 'https://backend.reportfocusnews.com',
      'User-Agent': 'WordPress/6.0'
    }
  });
  
  const buffer = await imageResponse.arrayBuffer();
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': imageResponse.headers.get('Content-Type') || 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000'
    }
  });
}
```

### Option 2: Use WordPress JSON API for Images
Instead of direct image URLs, use the WordPress REST API to fetch images with proper authentication.

### Option 3: Mirror Images to a Public CDN
Use a service like Cloudinary or ImageKit to mirror and serve your WordPress images.

## Immediate Actions

1. **Check WordPress Admin Panel**:
   - Go to Settings > Media
   - Check for any image protection plugins
   - Review security settings

2. **Contact Your Hosting Provider**:
   - Ask if hotlink protection is enabled
   - Verify no bandwidth/payment issues
   - Request to whitelist your frontend domain

3. **Test Direct Access**:
   - Try accessing an image URL directly in browser
   - Check if it works when coming from backend.reportfocusnews.com
   - Test with curl: `curl -I [image-url]`

## Long-term Solution

Consider using a proper CDN setup:
1. Upload images to a CDN (Cloudflare Images, AWS S3, etc.)
2. Serve images directly from CDN
3. Use WordPress only for content management, not image serving

This will improve performance and avoid cross-domain issues.