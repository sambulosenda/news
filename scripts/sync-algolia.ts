/**
 * Script to sync WordPress content to Algolia
 * Run this script periodically (via cron job) to keep Algolia index updated
 * Usage: npm run sync:algolia
 */

import 'dotenv/config';
import { algoliasearch } from 'algoliasearch';
import { fetchGraphQLDirect } from '../src/lib/api/fetch-direct';
import { formatArticleForAlgolia } from '../src/lib/algolia/config';

// Load environment variables from .env.local
import { config } from 'dotenv';
config({ path: '.env.local' });

// Algolia configuration
const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY || '';
const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'reportfocus_articles';

// GraphQL query to fetch all posts - function to handle cursor
const GET_ALL_POSTS = (cursor: string | null = null) => `
  query GetAllPosts {
    posts(first: 50${cursor ? `, after: "${cursor}"` : ''}) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          excerpt
          content
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          categories {
            edges {
              node {
                name
              }
            }
          }
          tags {
            edges {
              node {
                name
              }
            }
          }
          author {
            node {
              name
            }
          }
        }
      }
    }
  }
`;

async function syncToAlgolia() {
  console.log('🚀 Starting Algolia sync...');
  
  // Validate environment variables
  if (!ALGOLIA_APP_ID || !ALGOLIA_ADMIN_API_KEY) {
    console.error('❌ Missing Algolia credentials. Please set ALGOLIA_APP_ID and ALGOLIA_ADMIN_API_KEY');
    process.exit(1);
  }
  
  // Initialize Algolia client
  const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);
  
  // Configure index settings
  console.log('⚙️  Configuring index settings...');
  await client.setSettings({
    indexName: ALGOLIA_INDEX_NAME,
    indexSettings: {
      searchableAttributes: [
        'title',
        'excerpt',
        'content',
        'categories',
        'tags',
        'author'
      ],
      attributesToRetrieve: [
        'objectID',
        'title',
        'excerpt',
        'slug',
        'date',
        'categories',
        'author',
        'featuredImage',
        'readingTime'
      ],
      attributesToHighlight: [
        'title',
        'excerpt'
      ],
      customRanking: [
        'desc(date_timestamp)'
      ],
      attributesForFaceting: [
        'searchable(categories)',
        'searchable(tags)',
        'searchable(author)'
      ],
      hitsPerPage: 20,
      typoTolerance: true,
      removeStopWords: ['en']
    }
  });
  
  let hasNextPage = true;
  let cursor = null;
  let totalPosts = 0;
  let allRecords = [];
  
  // Fetch all posts from WordPress (limit to 500 for initial sync)
  console.log('📚 Fetching posts from WordPress (limiting to 500 for initial sync)...');
  while (hasNextPage && totalPosts < 500) {
    try {
      const data = await fetchGraphQLDirect(GET_ALL_POSTS(cursor));
      
      if (!data?.posts?.edges) {
        console.error('❌ Failed to fetch posts');
        break;
      }
      
      const posts = data.posts.edges.map((e: any) => e.node);
      const formattedPosts = posts.map(formatArticleForAlgolia);
      
      allRecords.push(...formattedPosts);
      totalPosts += posts.length;
      
      console.log(`  Fetched ${totalPosts} posts so far...`);
      
      hasNextPage = data.posts.pageInfo.hasNextPage;
      cursor = data.posts.pageInfo.endCursor;
    } catch (error) {
      console.error('❌ Error fetching posts:', error);
      break;
    }
  }
  
  if (allRecords.length === 0) {
    console.log('⚠️  No posts to sync');
    return;
  }
  
  // Clear and update the index
  console.log(`🔄 Syncing ${allRecords.length} posts to Algolia...`);
  try {
    // Clear existing records
    await client.clearObjects({ indexName: ALGOLIA_INDEX_NAME });
    
    // Add new records in batches
    const batchSize = 100;
    for (let i = 0; i < allRecords.length; i += batchSize) {
      const batch = allRecords.slice(i, i + batchSize);
      await client.saveObjects({ 
        indexName: ALGOLIA_INDEX_NAME,
        objects: batch 
      });
      console.log(`  Indexed ${Math.min(i + batchSize, allRecords.length)} of ${allRecords.length} posts`);
    }
    
    console.log('✅ Sync completed successfully!');
    console.log(`📊 Total posts indexed: ${allRecords.length}`);
  } catch (error) {
    console.error('❌ Error syncing to Algolia:', error);
    process.exit(1);
  }
}

// Run the sync
syncToAlgolia().catch(console.error);