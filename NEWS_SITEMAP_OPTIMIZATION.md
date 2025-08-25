# News Sitemap Optimization Recommendations

## Current Issue
- 1-hour cache may delay breaking news visibility in Google News
- Competitors with faster updates may get indexed first

## Recommended Cache Settings by Content Type

### Option 1: Aggressive (For Breaking News Sites)
```typescript
'Cache-Control': 'public, max-age=300, s-maxage=300' // 5 minutes
```
- **Pros**: Breaking news appears quickly in Google News
- **Cons**: Higher server load, more WordPress API calls
- **Best for**: High-traffic news sites with frequent updates

### Option 2: Balanced (Recommended)
```typescript
'Cache-Control': 'public, max-age=900, s-maxage=900' // 15 minutes
```
- **Pros**: Good balance of freshness and performance
- **Cons**: 15-minute delay for breaking news
- **Best for**: Most news sites with regular updates

### Option 3: Conservative (Current)
```typescript
'Cache-Control': 'public, max-age=3600, s-maxage=3600' // 1 hour
```
- **Pros**: Lower server load, fewer API calls
- **Cons**: Up to 1-hour delay for new content
- **Best for**: Sites with less time-sensitive content

## Implementation Change

To update, modify `/src/app/(feeds)/news-sitemap.xml/route.ts` line 100:

```typescript
// Change from:
'Cache-Control': 'public, max-age=3600, s-maxage=3600',

// To (15-minute cache):
'Cache-Control': 'public, max-age=900, s-maxage=900',
```

## Additional Optimizations

### 1. Implement ISR (Incremental Static Regeneration)
Add to the route file:
```typescript
export const revalidate = 900; // Regenerate every 15 minutes
```

### 2. Use Edge Caching
If using Vercel/Cloudflare:
```typescript
'Cache-Control': 'public, max-age=300, s-maxage=900, stale-while-revalidate=3600'
```
- Browsers cache: 5 minutes
- CDN cache: 15 minutes  
- Serve stale content while revalidating: 1 hour

### 3. Separate Breaking News Sitemap
Create a separate `/breaking-news-sitemap.xml` with:
- Only last 6 hours of content
- 5-minute cache
- Higher priority for Google News

### 4. Use Webhooks for Instant Updates
Set up WordPress webhook to trigger revalidation when new posts are published:
```typescript
// In /api/revalidate
await res.revalidate('/news-sitemap.xml');
```

## Monitoring

### Track Performance:
1. **Google Search Console** 
   - Monitor "Sitemaps" report
   - Check "Crawl stats" for news-sitemap.xml

2. **Server Logs**
   - Track Googlebot crawl frequency
   - Monitor cache hit rates

3. **Google Publisher Center**
   - Check content freshness scores
   - Monitor indexing speed

## Expected Results

With 15-minute cache:
- New articles appear in Google News within 15-30 minutes
- Reduced server load vs 5-minute cache
- Better competitiveness for breaking news
- Improved crawl efficiency

## Priority Action

**Immediate**: Change cache to 15 minutes (max-age=900)
**Next Sprint**: Implement webhook-based revalidation
**Future**: Consider separate breaking news sitemap