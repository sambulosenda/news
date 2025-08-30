# Malformed Search URL Removal Strategy

## Immediate Actions Required

### 1. Google Search Console URL Removal Requests

Submit removal requests for these URL patterns in Google Search Console:

**Urgent Removal Patterns:**
```
https://reportfocusnews.com/search/*/page/*/www.*
https://reportfocusnews.com/search/*/page/*/www
https://reportfocusnews.com/search/*/page/*
https://reportfocusnews.com/search/*/*
```

**Steps in Google Search Console:**
1. Go to Removals → New Request
2. Select "Remove this URL"
3. Enter each malformed URL pattern
4. Choose "Remove this URL only" (not the entire page)
5. Submit and monitor status

### 2. Site-wide URL Audit Commands

**Find all malformed search URLs indexed by Google:**
```bash
site:reportfocusnews.com "/search/" -inurl:"?q="
site:reportfocusnews.com "search" "page" "www"
site:reportfocusnews.com inurl:"/search/" -inurl:"?q"
```

### 3. Bulk Removal Using Patterns

**Submit these wildcard patterns for removal:**
- `*/search/*/page/*`
- `*/search/*/www*`
- `*/search/*` (exclude: `*/search?q=*`)

### 4. Monitor and Verify

**Check removal progress weekly:**
1. Search for remaining malformed URLs
2. Monitor Google Search Console for removal confirmations
3. Verify that redirects are working properly

## Technical Implementation Completed

✅ **Middleware URL validation** - Catches malformed URLs and redirects to proper search format
✅ **Next.js redirects** - Handles legacy URL patterns
✅ **Enhanced robots.txt** - Blocks future crawling of malformed patterns
✅ **Canonical URLs** - Proper canonical tags for search pages
✅ **Meta robots tags** - Noindex for search result pages

## Prevention Strategy

### Continuous Monitoring
- Set up Google Search Console alerts for new URL issues
- Regular audits using `site:` operator
- Monitor server logs for 404s matching malformed patterns

### SEO Best Practices Implemented
- Search result pages have `noindex` meta tag
- Canonical URLs properly set
- Structured data for search results
- Proper internal linking structure

## Expected Timeline

- **Week 1**: Submit removal requests, monitor initial removals
- **Week 2-3**: Most malformed URLs should be removed from index
- **Month 1**: Complete cleanup, establish monitoring routine
- **Ongoing**: Regular audits and prevention

## Success Metrics

- Reduction in malformed URLs appearing in Google search results
- Decreased 404 errors for malformed search patterns
- Improved search page SEO performance
- Clean URL structure maintained