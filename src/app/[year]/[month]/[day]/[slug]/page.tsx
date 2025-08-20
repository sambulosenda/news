import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import parse from 'html-react-parser';
import readingTime from 'reading-time';
import { fetchGraphQLCached } from '@/lib/graphql-cache';
import { GET_POST_BY_SLUG } from '@/lib/queries/posts';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import ShareButtons from '@/components/ShareButtons';
import { WPPost } from '@/types/wordpress';
import ReadingProgress from '@/components/ReadingProgress';
import BackToTop from '@/components/BackToTop';
import MobileShareBar from '@/components/MobileShareBar';

// Enable static generation with aggressive ISR for news articles
export const revalidate = 60; // Revalidate every minute for news freshness
export const dynamicParams = true; // Allow any article slug

interface PostPageProps {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
}

// OPTIMIZED: Single query for article data with caching
async function getArticleData(slug: string): Promise<WPPost | null> {
  try {
    // Use aggressive caching for articles
    const data = await fetchGraphQLCached(
      GET_POST_BY_SLUG, 
      { slug }, 
      { ttl: 60, forceRefresh: false }
    );
    
    return data?.postBy || null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Lazy load related content to not block main article
const RelatedArticles = async ({ categoryId, postId }: { categoryId: number; postId: string }) => {
  // This component loads after the main article
  const { gql } = await import('@/lib/fetch-graphql');
  const { fetchGraphQLCached } = await import('@/lib/graphql-cache');
  
  const SIMPLE_RELATED_QUERY = gql`
    query GetRelated($categoryId: Int!, $exclude: [ID!]) {
      posts(
        where: { categoryId: $categoryId, notIn: $exclude }
        first: 3
      ) {
        edges {
          node {
            id
            title
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `;
  
  const data = await fetchGraphQLCached(
    SIMPLE_RELATED_QUERY,
    { categoryId, exclude: [postId] },
    { ttl: 300 } // Cache for 5 minutes
  );
  
  const posts = data?.posts?.edges?.map((e: any) => e.node) || [];
  
  if (posts.length === 0) return null;
  
  return (
    <section className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <article key={post.id} className="group">
            <Link href={`/post/${post.slug}`} className="block">
              {post.featuredImage?.node?.sourceUrl && (
                <div className="relative aspect-video mb-3 overflow-hidden rounded">
                  <Image
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug, year, month, day } = await params;
  
  // Quick fetch for metadata only
  const post = await getArticleData(slug);
  
  if (!post) {
    return { title: 'Article Not Found' };
  }

  const description = post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || '';
  const canonicalUrl = `https://reportfocusnews.com/${year}/${month}/${day}/${slug}/`;

  return {
    title: `${post.title} | Report Focus News`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: post.author?.node?.name ? [post.author.node.name] : [],
      images: post.featuredImage?.node?.sourceUrl ? [
        {
          url: post.featuredImage.node.sourceUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
  };
}

export default async function OptimizedPostPage({ params }: PostPageProps) {
  const { year, month, day, slug } = await params;
  
  // Single optimized query for article
  const post = await getArticleData(slug);

  if (!post) {
    notFound();
  }

  const stats = post.content ? readingTime(post.content) : { text: '1 min read' };
  const canonicalUrl = `https://reportfocusnews.com/${year}/${month}/${day}/${slug}/`;
  const categoryId = post.categories?.edges?.[0]?.node?.databaseId;

  return (
    <>
      <ReadingProgress />
      <HeaderWrapper />
      
      <main className="min-h-screen bg-white">
        {/* Article Header - Load immediately */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Category & Date */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            {post.categories?.edges?.[0]?.node && (
              <>
                <Link 
                  href={`/category/${post.categories.edges[0].node.slug}`}
                  className="text-red-600 font-medium hover:underline"
                >
                  {post.categories.edges[0].node.name}
                </Link>
                <span>•</span>
              </>
            )}
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            <span>•</span>
            <span>{stats.text}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <div className="text-xl text-gray-600 mb-6 leading-relaxed">
              {parse(post.excerpt)}
            </div>
          )}

          {/* Author & Share */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b">
            <div className="flex items-center gap-3">
              {post.author?.node && (
                <>
                  {post.author.node.avatar?.url && (
                    <Image
                      src={post.author.node.avatar.url}
                      alt={post.author.node.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-medium">{post.author.node.name}</div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(post.date), 'h:mm a')}
                    </div>
                  </div>
                </>
              )}
            </div>
            <ShareButtons url={canonicalUrl} title={post.title} />
          </div>

          {/* Featured Image */}
          {post.featuredImage?.node?.sourceUrl && (
            <figure className="mb-8">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
              {post.featuredImage.node.caption && (
                <figcaption className="mt-2 text-sm text-gray-600 text-center">
                  {parse(post.featuredImage.node.caption)}
                </figcaption>
              )}
            </figure>
          )}

          {/* Article Content - Priority */}
          <div className="prose prose-lg max-w-none">
            {parse(post.content || '')}
          </div>

          {/* Tags */}
          {post.tags?.edges && post.tags.edges.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {post.tags.edges.map((tag) => (
                  <Link
                    key={tag.node.id}
                    href={`/tag/${tag.node.slug}`}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                  >
                    {tag.node.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Lazy load related articles */}
          {categoryId && (
            <Suspense fallback={
              <div className="mt-12 pt-8 border-t">
                <div className="animate-pulse">
                  <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                      <div key={i}>
                        <div className="aspect-video bg-gray-200 rounded mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }>
              <RelatedArticles categoryId={categoryId} postId={post.databaseId.toString()} />
            </Suspense>
          )}
        </article>
      </main>
      
      <Footer />
      <BackToTop />
      <MobileShareBar url={canonicalUrl} title={post.title} />
    </>
  );
}