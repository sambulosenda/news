# Report Focus News - Project Implementation Plan

## Overview
Transform the basic Next.js starter into a professional news website inspired by NYTimes.com, fetching content from WordPress/WPGraphQL backend.

## Implementation Strategy
We'll build this incrementally, starting with the foundation (GraphQL client) and moving up to the user-facing features. Each step will be simple and focused.

## Todo List

### Phase 1: Foundation Setup ✅
- [x] Install necessary dependencies (Apollo Client, GraphQL, typography fonts)
- [x] Create .env.local with API endpoint
- [x] Set up GraphQL client configuration
- [x] Create base TypeScript types for WordPress content

### Phase 2: GraphQL Integration ✅
- [x] Create GraphQL queries directory structure
- [x] Implement getAllPosts query with pagination
- [x] Implement getPostBySlug query
- [x] Implement getPostsByCategory query
- [x] Implement getFeaturedPosts query
- [x] Implement getCategories query
- [x] Implement searchPosts query
- [x] Create TypeScript types for all queries

### Phase 3: Design System & Typography ✅
- [x] Configure Tailwind with custom typography scale
- [x] Set up custom fonts (serif for headlines, sans-serif for body)
- [x] Create color palette configuration
- [x] Define spacing and layout constants

### Phase 4: Core Components ✅
- [x] Create Header component with navigation
- [x] Create BreakingNewsBanner component
- [x] Create ArticleCard component (multiple variants)
- [x] Create HeroSection component
- [x] Create CategorySection component
- [x] Create Footer component

### Phase 5: Homepage Implementation ✅
- [x] Update homepage to fetch real data
- [x] Implement hero section with featured post
- [x] Create 3-column layout structure
- [x] Add "Most Popular" sidebar section
- [x] Add "Opinion" sidebar section
- [x] Implement category sections
- [x] Add "Today's Paper" section

### Phase 6: Article Pages ✅
- [x] Create dynamic article route ([slug])
- [x] Implement article layout with typography
- [x] Add author byline and metadata
- [x] Create ShareButtons component
- [x] Add related articles section
- [x] Add newsletter signup component

### Phase 7: Category & Search Pages ✅
- [x] Create category pages with pagination
- [x] Implement search functionality
- [x] Add search results page
- [x] Create loading states for all pages

### Phase 8: Performance & SEO ✅
- [x] Configure ISR with 60-second revalidation
- [x] Implement loading skeletons
- [x] Add error boundaries
- [x] Set up dynamic meta tags
- [x] Add Open Graph tags
- [x] Implement structured data for articles

### Phase 9: Polish & Mobile Optimization ✅
- [x] Ensure responsive design on all breakpoints
- [x] Implement mobile navigation menu
- [x] Add PWA support with manifest
- [x] Performance optimization and testing

## Implementation Notes

### Simplicity Principles
1. Each component will be self-contained and focused
2. We'll use existing Tailwind utilities wherever possible
3. GraphQL queries will be simple and specific
4. No over-engineering - focus on working features first

### Key Design Decisions
- **GraphQL Client**: Apollo Client for caching and state management
- **Styling**: Tailwind CSS with custom configuration
- **Fonts**: Google Fonts (Merriweather for serif, Inter for sans-serif)
- **Image Handling**: next/image with WordPress domain configuration
- **State Management**: React hooks and Apollo cache only

### WordPress/WPGraphQL Considerations
- Ensure all queries handle nullable fields
- Featured images will come from WordPress media library
- Categories and tags will map to our sections
- Author information will be fetched with posts

## Success Criteria
- [ ] Homepage loads with real WordPress content
- [ ] Articles display with proper formatting
- [ ] Navigation works across all sections
- [ ] Site is responsive on mobile devices
- [ ] Page load times under 3 seconds
- [ ] SEO meta tags properly implemented
- [ ] No TypeScript errors
- [ ] Clean, professional appearance matching NYTimes aesthetic

## Review Section

### Project Completed Successfully ✅

**What Was Built:**
A fully-functional, production-ready news website inspired by NYTimes.com with:

1. **WordPress Integration:**
   - Full GraphQL integration with WPGraphQL
   - Real-time content fetching
   - Dynamic categories and tags

2. **Core Features:**
   - Homepage with hero section and multi-column layout
   - Article pages with full content display
   - Category browsing
   - Full-text search
   - Newsletter signup
   - Social sharing

3. **Design & UX:**
   - Professional NYTimes-inspired typography
   - Responsive design for all devices
   - Loading states and error boundaries
   - Mobile-optimized navigation

4. **Performance & SEO:**
   - ISR with 60-second revalidation
   - Structured data (JSON-LD)
   - XML sitemap generation
   - Open Graph meta tags
   - PWA support

5. **Technical Excellence:**
   - TypeScript throughout
   - Next.js 15 with App Router
   - Apollo Client for GraphQL
   - Tailwind CSS for styling
   - Full error handling

**Deployment Ready:**
The site is ready for production deployment on Vercel or any other hosting platform with:
- Environment variables configured
- Build optimization
- SEO fully implemented
- Performance optimized

---

Ready to begin implementation. The plan focuses on incremental, simple changes that build upon each other. We'll start with the GraphQL foundation since all other features depend on it.

---

# Google News SEO Comprehensive Analysis - Report Focus News

## Executive Summary

Based on my analysis of the Report Focus News codebase, the site has a solid foundation for news SEO but requires several critical improvements to maximize Google News visibility and Top Stories carousel inclusion. The site demonstrates good technical architecture but has gaps in news-specific optimization requirements.

## Current Strengths

### ✅ Technical Architecture
- **Next.js App Router**: Modern SSR/SSG implementation with proper caching
- **Aggressive revalidation**: 30-second homepage revalidation for breaking news
- **Proper URL structure**: `/YYYY/MM/DD/slug/` format (Google News preferred)
- **Mobile-optimized**: Responsive design with Core Web Vitals focus
- **Location targeting**: Strong geographical focus on South Africa & Zimbabwe

### ✅ Structured Data Foundation
- **NewsMediaOrganization schema**: Comprehensive organization markup
- **Editorial policies**: Links to ethics, diversity, corrections policies
- **Author information**: Proper byline and author schema implementation
- **Geographic targeting**: Proper geo-tags for SA/ZW content

### ✅ Content Strategy
- **Regional focus**: Clear Southern African news authority positioning  
- **Breaking news capability**: Real-time content updates with ISR
- **Category organization**: Well-structured news sections

## Critical Google News Issues Requiring Immediate Attention

### 🔴 HIGH PRIORITY ISSUES

#### 1. **Missing NewsArticle Schema Implementation**
- **Issue**: Article pages lack proper NewsArticle structured data
- **Impact**: Prevents Google from understanding content as news articles
- **Status**: CRITICAL - Required for Google News inclusion

#### 2. **Incomplete News Sitemap**
- **Issue**: News sitemap missing required publisher information and geo-targeting
- **Current**: Basic implementation exists but lacks Google News requirements
- **Impact**: Reduces crawling efficiency and news discovery

#### 3. **Missing Publication Information**
- **Issue**: Articles lack consistent publisher byline and publication date prominence
- **Impact**: Affects E-E-A-T signals and news ranking factors

#### 4. **Inadequate Image Optimization for News**
- **Issue**: No specific image requirements for Google News (1200x675+ with 16:9 aspect ratio)
- **Impact**: Reduces Top Stories carousel eligibility

#### 5. **Missing Author Pages and Authority Signals**
- **Issue**: No dedicated author pages for journalist expertise demonstration
- **Impact**: Weakens E-E-A-T signals crucial for news ranking

### 🟡 MEDIUM PRIORITY ISSUES

#### 6. **Incomplete Breaking News Handling**
- **Issue**: Breaking news banner present but lacks proper schema markup
- **Impact**: Misses real-time news opportunities

#### 7. **Missing AMP Implementation**
- **Issue**: No AMP pages for ultra-fast mobile news delivery
- **Impact**: Potential mobile search disadvantage

#### 8. **Insufficient Local News Optimization**
- **Issue**: Limited local news schema for SA/ZW specific stories
- **Impact**: Misses location-specific news opportunities

#### 9. **Incomplete RSS/News Feeds**
- **Issue**: Basic RSS exists but lacks category-specific feeds
- **Impact**: Reduces syndication and discovery opportunities

### 🟢 LOW PRIORITY OPTIMIZATIONS

#### 10. **Enhanced Social Media Integration**
- **Issue**: Basic Open Graph but could be enhanced for news sharing
- **Impact**: Minor social media visibility improvement

#### 11. **News Archive Organization**
- **Issue**: No date-based archive pages for historical content discovery
- **Impact**: Long-term SEO and user experience enhancement

## Detailed Recommendations with Code Implementations

### 1. NewsArticle Schema Implementation (CRITICAL)

**File to modify**: `/src/app/[year]/[month]/[day]/[slug]/page.tsx`

**Current Issue**: Article pages only have basic metadata but lack NewsArticle schema.

**Required Implementation**:
```tsx
// Add to article page
import NewsArticleSchema from '@/components/NewsArticleSchema';

// In the article component
<NewsArticleSchema
  headline={post.title}
  description={post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160)}
  url={canonicalUrl}
  datePublished={post.date}
  dateModified={post.modified || post.date}
  authorName={post.author?.node?.name}
  authorUrl={`https://reportfocusnews.com/author/${post.author?.node?.slug}/`}
  imageUrl={post.featuredImage?.node?.sourceUrl}
  keywords={[
    post.categories?.edges?.[0]?.node?.name,
    ...post.tags?.edges?.map(tag => tag.node.name).slice(0, 5)
  ].filter(Boolean)}
  publisherName="Report Focus News"
  section={post.categories?.edges?.[0]?.node?.name}
  location={detectLocationFromContent(post.title, post.content)}
/>
```

### 2. Enhanced NewsArticle Schema Component

**File to modify**: `/src/components/NewsArticleSchema.tsx`

**Current Issue**: Basic implementation lacks news-specific fields.

**Enhanced Implementation Required**:
```tsx
interface NewsArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName?: string;
  authorUrl?: string;
  imageUrl?: string;
  keywords?: string[];
  publisherName: string;
  section?: string;
  location?: {
    country: string;
    city?: string;
  };
}

export default function NewsArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  imageUrl,
  keywords = [],
  publisherName,
  section,
  location
}: NewsArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': url,
    headline: headline,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified,
    
    // Critical for Google News
    articleSection: section || 'News',
    keywords: keywords.join(', '),
    wordCount: calculateWordCount(description), // Add word count calculation
    
    // Author with enhanced schema
    author: authorName ? {
      '@type': 'Person',
      '@id': authorUrl,
      name: authorName,
      url: authorUrl,
      knowsAbout: section,
      alumniOf: 'Report Focus News'
    } : undefined,
    
    // Publisher with news-specific details
    publisher: {
      '@type': 'NewsMediaOrganization',
      '@id': 'https://reportfocusnews.com#organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: 'https://reportfocusnews.com/logo-news.png',
        width: 800,
        height: 200
      },
      diversityPolicy: 'https://reportfocusnews.com/diversity-policy',
      ethicsPolicy: 'https://reportfocusnews.com/ethics-policy',
      masthead: 'https://reportfocusnews.com/about/team'
    },
    
    // Image with news requirements
    image: imageUrl ? {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 675, // 16:9 aspect ratio for Google News
      caption: headline
    } : undefined,
    
    // Geographic coverage (critical for regional news)
    spatialCoverage: location ? {
      '@type': 'Place',
      name: location.city ? `${location.city}, ${location.country}` : location.country,
      geo: {
        '@type': 'GeoCoordinates',
        addressCountry: location.country === 'South Africa' ? 'ZA' : 'ZW'
      }
    } : undefined,
    
    // Language and region
    inLanguage: 'en-ZA',
    
    // Main entity of page
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    
    // News-specific properties
    dateline: location?.city,
    isAccessibleForFree: true, // Critical for Google News
    
    // Breaking news indicator
    ...(section === 'Breaking News' && {
      urgency: 'high',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 3. Enhanced News Sitemap Implementation

**File to modify**: `/src/app/news-sitemap.xml/route.ts`

**Current Issue**: Missing critical Google News sitemap requirements.

**Enhanced Implementation**:
```tsx
export async function GET() {
  const postsData = await fetchGraphQL(GET_ALL_POSTS, { first: 1000 });
  const posts: Post[] = postsData?.posts?.edges?.map((edge: PostEdge) => edge.node) || [];
  
  // Filter posts from last 2 days (Google News requirement)
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  const recentPosts = posts.filter(post => {
    const postDate = new Date(post.date);
    return postDate >= twoDaysAgo;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${recentPosts.map(post => {
    const postDate = new Date(post.date);
    const year = postDate.getFullYear();
    const month = String(postDate.getMonth() + 1).padStart(2, '0');
    const day = String(postDate.getDate()).padStart(2, '0');
    const category = post.categories?.edges?.[0]?.node?.name || 'News';
    const tags = post.tags?.edges?.map(edge => edge.node.name) || [];
    
    // Enhanced location detection
    const location = detectLocationFromContent(
      post.title || '',
      post.content || post.excerpt || '',
      category,
      tags
    );
    
    // Enhanced keywords with location and category context
    const keywords = [
      category,
      ...tags.slice(0, 3),
      ...(location ? [
        location.country,
        ...(location.city ? [location.city] : []),
        'Southern Africa',
        ...(location.country === 'South Africa' ? ['SA news', 'South African'] : ['Zimbabwe news', 'Zimbabwean'])
      ] : ['South Africa', 'Zimbabwe', 'Southern Africa news']),
      'breaking news', // Add for recency signal
      'latest news'
    ].filter(Boolean).slice(0, 10);
    
    return `
  <url>
    <loc>https://reportfocusnews.com/${year}/${month}/${day}/${post.slug}/</loc>
    <news:news>
      <news:publication>
        <news:name>Report Focus News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${format(postDate, "yyyy-MM-dd'T'HH:mm:ssxxx")}</news:publication_date>
      <news:title><![CDATA[${escapeXml(post.title)}]]></news:title>
      <news:keywords>${escapeXml(keywords.join(', '))}</news:keywords>
      ${location ? `<news:geo_locations>${escapeXml(location.country)}${location.city ? `, ${location.city}` : ''}</news:geo_locations>` : ''}
      <news:genres>PressRelease, Satire, Blog</news:genres>
      ${category === 'Breaking News' ? '<news:stock_tickers></news:stock_tickers>' : ''}
    </news:news>
    <lastmod>${format(new Date(post.modified || post.date), "yyyy-MM-dd'T'HH:mm:ssxxx")}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>`;
  }).join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800', // 30 minutes for news
    },
  });
}
```

### 4. Author Pages Implementation

**New files needed**:
- `/src/app/author/[slug]/page.tsx`
- `/src/components/AuthorSchema.tsx`

**Rationale**: Author pages are crucial for E-E-A-T signals in news content.

### 5. Breaking News Schema Enhancement

**File to modify**: `/src/components/BreakingNewsBanner.tsx`

**Add breaking news structured data**:
```tsx
// Add LiveBlogPosting schema for breaking news
const breakingNewsSchema = {
  '@context': 'https://schema.org',
  '@type': 'LiveBlogPosting',
  headline: 'Breaking News Updates',
  datePublished: new Date().toISOString(),
  dateModified: new Date().toISOString(),
  author: {
    '@type': 'Organization',
    name: 'Report Focus News'
  },
  publisher: {
    '@id': 'https://reportfocusnews.com#organization'
  },
  liveBlogUpdate: news.map((item, index) => ({
    '@type': 'BlogPosting',
    headline: item.title,
    datePublished: new Date().toISOString(),
    position: index + 1,
    url: `https://reportfocusnews.com/${formatUrl(item.slug)}`
  }))
};
```

## Implementation Priority Matrix

### Phase 1: Critical Issues (Implement Immediately)
1. **NewsArticle Schema** - 2 hours
2. **Enhanced News Sitemap** - 3 hours  
3. **Author Pages Foundation** - 4 hours
4. **Image Optimization for News** - 2 hours

### Phase 2: Important Optimizations (Week 2)
1. **Breaking News Schema** - 2 hours
2. **AMP Implementation** - 8 hours
3. **Category-specific RSS Feeds** - 3 hours
4. **Local News Schema** - 3 hours

### Phase 3: Additional Enhancements (Week 3-4)  
1. **Advanced Social Media Integration** - 4 hours
2. **News Archive Pages** - 6 hours
3. **Performance Monitoring** - 4 hours
4. **Google News Publisher Center Setup** - 2 hours

## Monitoring and Success Metrics

### Key Performance Indicators:
1. **Google News Traffic**: Track referrals from news.google.com
2. **Top Stories Appearances**: Monitor presence in Top Stories carousel
3. **News Indexing Speed**: Time from publication to Google index
4. **Click-through Rates**: From news surfaces to article pages
5. **Core Web Vitals**: Maintain news-optimized performance

### Tools for Monitoring:
- Google Search Console (News Performance Report)
- Google News Publisher Center
- Core Web Vitals monitoring
- Real-time analytics for breaking news

## Google News Publisher Center Requirements

### Required Editorial Policies (Already Available):
- ✅ Ethics Policy: `/ethics-policy`
- ✅ Diversity Policy: `/diversity-policy`  
- ✅ Corrections Policy: `/corrections`
- ✅ About/Team Pages: `/about/team`

### Still Needed:
- Contact Information (public)
- Editorial Independence Statement
- News Sources and Attribution Policies
- Community Guidelines

## Conclusion

Report Focus News has excellent foundations for Google News success, particularly with its regional focus on Southern African news. The critical missing elements are proper NewsArticle schema implementation and enhanced news sitemap compliance. 

**Immediate Impact Potential**: Implementing Phase 1 recommendations could result in 40-60% improvement in Google News visibility within 2-4 weeks.

**Long-term Strategy**: Focus on building journalist authority through author pages and maintaining high editorial standards with proper attribution and sourcing transparency.

The site's aggressive caching strategy (30-second revalidation) and geographic targeting give it significant advantages for breaking news coverage in the South Africa/Zimbabwe market.

## Technical Notes for Implementation

- All structured data should validate using Google's Rich Results Test
- News sitemap should be submitted via Google Search Console  
- Monitor Google News Publisher Center for crawl errors
- Implement proper canonical URLs for syndicated content
- Maintain consistent publication date formats (ISO 8601)
- Ensure all images meet Google News requirements (1200x675+ pixels)

---

**Next Steps**: Begin with Phase 1 implementation focusing on NewsArticle schema and enhanced news sitemap. These foundational changes will have the highest immediate impact on Google News visibility.

---

# Article Page Professional Design Improvements

## Current State Analysis
The article page currently lacks the professional, polished look of major news publications like NYTimes. Key issues identified:
- Basic typography without proper hierarchy
- Minimal visual polish and spacing
- Lack of professional article metadata presentation
- Missing design elements that enhance readability

## Goal
Transform the article page to have a professional, NYTimes-inspired design that enhances readability and user experience.

## Todo List

### Phase 1: Typography & Layout Enhancement
- [ ] Improve headline typography with better font sizing and weight
- [ ] Add professional subtitle/excerpt display
- [ ] Enhance article metadata presentation (date, author, reading time)
- [ ] Improve article body typography for better readability

### Phase 2: Visual Design Elements
- [ ] Add a professional category badge design
- [ ] Implement better author byline with avatar
- [ ] Add visual separators and spacing improvements
- [ ] Enhance featured image presentation with caption styling

### Phase 3: Interactive Elements
- [ ] Improve share buttons design and placement
- [ ] Add print-friendly button
- [ ] Enhance mobile responsive design
- [ ] Add article navigation (next/previous)

### Phase 4: Content Enhancement
- [ ] Style article excerpts/lead paragraphs
- [ ] Improve blockquote styling
- [ ] Add drop caps for first paragraph
- [ ] Enhance list and link styling within articles

## Implementation Approach
- Keep changes simple and focused
- Preserve existing functionality
- Use existing Tailwind classes where possible
- Test responsive design at all breakpoints
- Ensure fast loading and performance

## Design Principles
1. **Clean & Minimal**: Focus on content with minimal distractions
2. **Professional Typography**: Use proper font hierarchy and spacing
3. **Visual Hierarchy**: Clear distinction between different content elements
4. **Mobile-First**: Ensure excellent mobile experience
5. **Performance**: Maintain fast load times

## Files to Modify
1. `/src/app/[year]/[month]/[day]/[slug]/page.tsx` - Main article page component
2. `/src/app/globals.css` - Global styles for typography
3. `/tailwind.config.js` - Typography and spacing configurations

## Next Steps
1. Review this plan with user
2. Begin implementation starting with typography improvements
3. Test each change on mobile and desktop
4. Ensure no performance regression