# Algolia Search Implementation Guide

## Overview
This guide explains how to set up and use the Algolia search integration for Report Focus News.

## Setup Instructions

### 1. Create Algolia Account
1. Go to [Algolia.com](https://www.algolia.com) and sign up for a free account
2. Create a new application (select the closest region to your users)
3. Note down your credentials from the API Keys section

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory and add:

```env
# Algolia Configuration
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id_here
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=your_search_only_api_key_here
ALGOLIA_ADMIN_API_KEY=your_admin_api_key_here
NEXT_PUBLIC_ALGOLIA_INDEX_NAME=reportfocus_articles
```

**Important Security Notes:**
- `NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY` - This is the Search-Only API key (safe for frontend)
- `ALGOLIA_ADMIN_API_KEY` - This is the Admin API key (keep secret, server-side only)
- Never commit `.env.local` to version control

### 3. Initial Data Sync
Run the sync script to populate your Algolia index with existing articles:

```bash
npm run sync:algolia
```

This will:
- Fetch all articles from your WordPress backend
- Format them for Algolia
- Upload them to your Algolia index
- Configure search settings

### 4. Set Up Automatic Syncing
For production, set up a cron job to keep Algolia in sync:

**Option A: Vercel Cron (Recommended for Vercel hosting)**
Create `/app/api/cron/sync-algolia/route.ts`:

```typescript
export async function GET() {
  // Run sync logic
  // Return success response
}
```

Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/sync-algolia",
    "schedule": "0 */6 * * *"  // Every 6 hours
  }]
}
```

**Option B: GitHub Actions**
Use the provided workflow in `.github/workflows/sync-algolia.yml`

**Option C: External Cron Service**
Use services like EasyCron or Cron-Job.org to call your sync endpoint

## Features Implemented

### Search Components
- **SearchBox** (`/components/search/SearchBox.tsx`) - Reusable search input
- **SearchResults** (`/components/search/SearchResults.tsx`) - Full search results page
- **QuickSearchModal** (`/components/search/QuickSearchModal.tsx`) - Quick search overlay

### Search Features
- Instant search as you type
- Typo tolerance
- Faceted search (filter by category, author)
- Search highlighting
- Recent searches (stored locally)
- Trending topics
- South African & Zimbabwe-specific synonyms

### SEO Optimizations
- Proper search page meta tags
- Search result structured data
- Fast search response times
- Mobile-optimized search interface

## Usage

### Basic Search
Navigate to `/search` or use the search box in the header

### Programmatic Search
```typescript
import { searchClient } from '@/lib/algolia/config';

const index = searchClient.initIndex('reportfocus_articles');
const results = await index.search('query');
```

### Adding Search to Other Pages
```tsx
import SearchBox from '@/components/search/SearchBox';

<SearchBox placeholder="Search..." />
```

## Customization

### Search Synonyms
Edit `/src/lib/algolia/config.ts` to add more synonyms:

```typescript
synonyms: [
  ['SA', 'South Africa'],
  ['load shedding', 'power cuts'],
  // Add more...
]
```

### Search Ranking
Adjust the `customRanking` in the config to prioritize different factors:

```typescript
customRanking: [
  'desc(date_timestamp)',  // Most recent first
  'desc(popularity)',      // Then by popularity
  'desc(comment_count)'    // Then by engagement
]
```

## Monitoring

### Algolia Dashboard
- View search analytics at dashboard.algolia.com
- Monitor popular searches
- Track zero-result searches
- Set up search alerts

### Performance Metrics
- Average search speed: < 50ms
- Index size: Monitor in dashboard
- Search queries: Track usage against plan limits

## Troubleshooting

### No Search Results
1. Check if index is populated: `npm run sync:algolia`
2. Verify API keys are correct
3. Check browser console for errors

### Slow Search
1. Ensure you're using the closest Algolia region
2. Check index configuration
3. Reduce `searchableAttributes` if needed

### Sync Issues
1. Verify WordPress GraphQL endpoint is accessible
2. Check admin API key permissions
3. Review sync script logs

## Cost Optimization

### Free Tier Limits (as of 2024)
- 10,000 search requests/month
- 10,000 records

### Optimization Tips
1. Use `searchClient` caching
2. Implement debouncing on search input
3. Use pagination effectively
4. Consider implementing search result caching

## Future Enhancements
- [ ] Implement search analytics tracking
- [ ] Add voice search
- [ ] Create search suggestions API
- [ ] Add search filters for date ranges
- [ ] Implement saved searches for users
- [ ] Add search sharing functionality