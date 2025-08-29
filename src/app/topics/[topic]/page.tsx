import { Metadata } from 'next';
import { fetchGraphQL } from '@/lib/api/fetch-graphql';
import { SEARCH_POSTS } from '@/lib/queries/posts';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/cards/ArticleCard';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { WPPost } from '@/types/wordpress';
import { notFound } from 'next/navigation';

// Define popular topics that deserve their own pages
const POPULAR_TOPICS = {
  'load-shedding': {
    title: 'Load Shedding News',
    description: 'Latest load shedding updates, schedules, and power crisis news in South Africa',
    keywords: 'load shedding, Eskom, power cuts, electricity, stage 6, blackouts',
    query: 'load shedding'
  },
  'elections': {
    title: 'Election News',
    description: 'South African and Zimbabwe election news, results, and political analysis',
    keywords: 'elections, voting, ANC, DA, EFF, ZANU-PF, democracy',
    query: 'elections'
  },
  'crime': {
    title: 'Crime News',
    description: 'Breaking crime news, safety updates, and police reports from South Africa and Zimbabwe',
    keywords: 'crime, safety, police, SAPS, robbery, murder, hijacking',
    query: 'crime'
  },
  'economy': {
    title: 'Economy & Business News',
    description: 'Economic updates, market news, rand exchange rates, and business reports',
    keywords: 'economy, business, JSE, rand, dollar, inflation, interest rates',
    query: 'economy business'
  },
  'sports': {
    title: 'Sports News',
    description: 'Latest sports news, scores, and updates on rugby, cricket, soccer from South Africa',
    keywords: 'sports, rugby, cricket, soccer, Springboks, Proteas, Bafana Bafana',
    query: 'sports'
  }
};

interface TopicPageProps {
  params: Promise<{
    topic: string;
  }>;
}

async function getTopicPosts(query: string) {
  const TIMEOUT_MS = 5000;
  const MAX_RETRIES = 2;
  
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const data = await fetchGraphQL(SEARCH_POSTS, { 
        search: query,
        first: 30
      }, {}, controller.signal);
      
      clearTimeout(timeoutId);
      return data?.posts?.edges?.map((e: { node: WPPost }) => e.node) || [];
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error && error.name === 'AbortError') {
        console.error(`Topic posts request timed out (attempt ${attempt + 1}/${MAX_RETRIES + 1})`);
      } else {
        console.error(`Error fetching topic posts (attempt ${attempt + 1}/${MAX_RETRIES + 1}):`, error);
      }
      
      // If this was the last attempt, return empty array
      if (attempt === MAX_RETRIES) {
        console.error('All retry attempts failed for topic posts');
        return [];
      }
      
      // Exponential backoff: wait 1s, 2s, 4s, etc.
      const backoffMs = Math.pow(2, attempt) * 1000;
      console.error(`Retrying topic posts fetch in ${backoffMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, backoffMs));
    }
  }
  
  return [];
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;
  const topicData = POPULAR_TOPICS[topic as keyof typeof POPULAR_TOPICS];
  
  if (!topicData) {
    notFound();
  }
  
  const posts = await getTopicPosts(topicData.query);
  
  const breadcrumbItems = [
    { name: 'Home', url: 'https://reportfocusnews.com' },
    { name: 'Topics', url: 'https://reportfocusnews.com/topics' },
    { name: topicData.title, url: `https://reportfocusnews.com/topics/${topic}` }
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <HeaderWrapper />
      
      <main className="container-wide py-8 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* SEO-optimized heading */}
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            {topicData.title}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {topicData.description}
          </p>
          
          {/* Articles */}
          {posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post: WPPost) => (
                <ArticleCard
                  key={post.id}
                  article={post}
                  variant="horizontal"
                  showImage={true}
                  showExcerpt={true}
                  showAuthor={true}
                  showCategory={true}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No articles found for this topic.</p>
          )}
          
          {/* SEO Content Block */}
          <div className="mt-12 prose prose-gray max-w-none">
            <h2 className="text-2xl font-bold mb-4">About {topicData.title}</h2>
            <p className="text-gray-700">
              Stay informed with our comprehensive coverage of {topicData.title.toLowerCase()}. 
              Report Focus News brings you breaking news, in-depth analysis, and expert commentary 
              on all aspects of {topicData.query} in South Africa and Zimbabwe.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

// Generate metadata for each topic page
export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { topic } = await params;
  const topicData = POPULAR_TOPICS[topic as keyof typeof POPULAR_TOPICS];
  
  if (!topicData) {
    return {
      title: 'Topic Not Found',
      description: 'The requested topic page was not found.'
    };
  }
  
  return {
    title: topicData.title,
    description: topicData.description,
    keywords: topicData.keywords,
    openGraph: {
      title: `${topicData.title} | Report Focus News`,
      description: topicData.description,
      type: 'website',
      url: `https://reportfocusnews.com/topics/${topic}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${topicData.title} | Report Focus News`,
      description: topicData.description,
    },
    robots: {
      index: true,  // DO index topic pages - they have unique, valuable content
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `https://reportfocusnews.com/topics/${topic}`,
    },
  };
}

// Generate static params for popular topics
export async function generateStaticParams() {
  return Object.keys(POPULAR_TOPICS).map((topic) => ({
    topic: topic,
  }));
}