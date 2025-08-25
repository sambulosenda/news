# Page Organization Plan for App Directory

## Current Structure Issues
- Pages are scattered at the root level
- Related pages are not grouped together
- Difficult to find specific page types
- No clear separation between content types

## Proposed Organization Using Route Groups

Next.js Route Groups (folders with parentheses) allow us to organize files without affecting URLs.

### Proposed Structure:

```
src/app/
├── (home)/              # Homepage
│   └── page.tsx         # Main homepage
│
├── (articles)/          # Article/Post pages
│   ├── post/
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   ├── [year]/
│   │   └── [month]/
│   │       └── [day]/
│   │           └── [slug]/
│   │               ├── page.tsx
│   │               └── loading.tsx
│   └── author/
│       └── [slug]/
│           └── page.tsx
│
├── (categories)/        # Category and news pages
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx
│   └── news/
│       └── [category]/
│           ├── page.tsx
│           └── generateStaticParams.ts
│
├── (legal)/            # Legal and policy pages
│   ├── terms/
│   │   └── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   ├── privacy-policy/
│   │   └── page.tsx
│   ├── cookies/
│   │   └── page.tsx
│   ├── ethics/
│   │   └── page.tsx
│   ├── ethics-policy/
│   │   └── page.tsx
│   ├── diversity-policy/
│   │   └── page.tsx
│   └── publishing-principles/
│       └── page.tsx
│
├── (company)/          # About and company pages
│   ├── about/
│   │   ├── page.tsx
│   │   ├── team/
│   │   │   └── page.tsx
│   │   ├── standards/
│   │   │   └── page.tsx
│   │   └── ownership/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── corrections/
│   │   └── page.tsx
│   └── accessibility/
│       └── page.tsx
│
├── (info)/             # Information pages
│   └── faq/
│       ├── page.tsx
│       ├── economy/
│       │   └── page.tsx
│       ├── elections/
│       │   └── page.tsx
│       ├── government/
│       │   └── page.tsx
│       ├── immigration/
│       │   └── page.tsx
│       ├── load-shedding/
│       │   └── page.tsx
│       └── safety/
│           └── page.tsx
│
├── (features)/         # Feature pages
│   ├── search/
│   │   └── page.tsx
│   ├── newsletters/
│   │   └── page.tsx
│   └── mobile-apps/
│       └── page.tsx
│
├── api/                # API routes (keep as is)
│   ├── related-posts/
│   └── revalidate/
│
├── (feeds)/           # Feed routes
│   ├── rss.xml/
│   │   └── route.ts
│   ├── feed.xml/
│   │   └── route.ts
│   ├── sitemap.xml/
│   │   └── route.ts
│   ├── sitemap-index.xml/
│   │   └── route.ts
│   ├── sitemap_index.xml/
│   │   └── route.ts
│   ├── news-sitemap.xml/
│   │   └── route.ts
│   └── news-sitemap.ts
│
├── layout.tsx         # Root layout
├── error.tsx          # Error handling
├── not-found.tsx      # 404 page
├── loading.tsx        # Loading state
├── robots.ts          # Robots.txt
├── sitemap.ts         # Sitemap generation
├── icon.tsx           # Favicon
├── apple-icon.tsx     # Apple touch icon
└── opengraph-image.tsx # OG image
```

## Benefits of This Organization

1. **Logical Grouping**: Related pages are grouped together
2. **Easy Navigation**: Developers can quickly find pages by category
3. **No URL Changes**: Route groups don't affect URLs
4. **Better Maintenance**: Clear separation of concerns
5. **Scalability**: Easy to add new pages in appropriate groups

## Implementation Strategy

1. Create route group directories
2. Move pages into appropriate groups
3. Update any relative imports
4. Test all routes to ensure they work
5. Update documentation

## Notes

- Route groups (folders with parentheses) are ignored in the URL structure
- This means `/about` still works even though the file is at `/(company)/about/page.tsx`
- This organization is purely for developer experience
- All existing URLs remain unchanged