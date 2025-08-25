import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { fetchGraphQLCached } from '@/lib/api/graphql-cache';
import { GET_POST_BY_SLUG } from '@/lib/queries/posts';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import { WPPost } from '@/types/wordpress';
import BackToTop from '@/components/common/BackToTop';

// Static revalidation for news - aggressive caching
export const revalidate = 60;
export const dynamicParams = true;

// Import components directly for server components
import ShareButtons from '@/components/features/ShareButtons';
import ReadingProgress from '@/components/features/ReadingProgress';
import MobileShareBar from '@/components/features/MobileShareBar';

interface PostPageProps {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
}

// Lightning-fast article fetch
async function getArticle(slug: string): Promise<WPPost | null> {
  try {
    const data = await fetchGraphQLCached(
      GET_POST_BY_SLUG, 
      { slug }, 
      { ttl: 60 }
    );
    return data?.postBy || null;
  } catch {
    return null;
  }
}


// Lightweight content parser - faster than html-react-parser
function FastContentRenderer({ content }: { content: string }) {
  return (
    <div 
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticle(slug);
  
  if (!post) return { title: 'Article Not Found' };

  return {
    title: `${post.title} | Report Focus News`,
    description: post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || '',
  };
}

export default async function FastArticlePage({ params }: PostPageProps) {
  const { year, month, day, slug } = await params;
  const post = await getArticle(slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `https://reportfocusnews.com/${year}/${month}/${day}/${slug}/`;
  
  // Pre-calculate reading time
  const wordCount = post.content?.split(' ').length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <>
      <ReadingProgress />
      
      <HeaderWrapper />
      
      <main className="min-h-screen bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Critical above-fold content - render immediately */}
          
          {/* Category & Meta - Inline styles for instant paint */}
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
            {post.categories?.edges?.[0]?.node && (
              <>
                <Link 
                  href={`/category/${post.categories.edges[0].node.slug}`}
                  style={{ color: '#dc2626', fontWeight: '500' }}
                >
                  {post.categories.edges[0].node.name}
                </Link>
                <span>•</span>
              </>
            )}
            <time>{format(new Date(post.date), 'MMM d, yyyy')}</time>
            <span>•</span>
            <span>{readingTime} min read</span>
          </div>

          {/* Title - Critical for LCP */}
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            {post.title}
          </h1>

          {/* Excerpt - Important for context */}
          {post.excerpt && (
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#6b7280', 
              marginBottom: '1.5rem',
              lineHeight: '1.5'
            }}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          )}

          {/* Author section - simplified */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingBottom: '2rem',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '2rem'
          }}>
            {post.author?.node && (
              <div style={{ fontWeight: '500' }}>
                By {post.author.node.name}
              </div>
            )}
            <ShareButtons url={canonicalUrl} title={post.title} />
          </div>

          {/* Featured Image - Load with priority */}
          {post.featuredImage?.node?.sourceUrl && (
            <figure style={{ marginBottom: '2rem' }}>
              <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '0.5rem' }}>
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 896px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </figure>
          )}

          {/* Article Content - The actual LCP element */}
          <FastContentRenderer content={post.content || ''} />

          {/* Tags - Non-critical, can load later */}
          {post.tags?.edges && post.tags.edges.length > 0 && (
            <Suspense fallback={null}>
              <div className="mt-8 pt-8 border-t">
                <div className="flex flex-wrap gap-2">
                  {post.tags.edges.map((tag) => (
                    <Link
                      key={tag.node.id}
                      href={`/tag/${tag.node.slug}`}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                    >
                      {tag.node.name}
                    </Link>
                  ))}
                </div>
              </div>
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