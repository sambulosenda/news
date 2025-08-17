import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import parse from 'html-react-parser';
import readingTime from 'reading-time';
import { fetchGraphQL } from '@/lib/fetch-graphql';
import { GET_POST_BY_SLUG, GET_RECENT_POSTS } from '@/lib/queries/posts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { WPPost } from '@/types/wordpress';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

async function getPostData(slug: string) {
  const data = await fetchGraphQL(GET_POST_BY_SLUG, { slug });
  
  if (!data?.post) {
    return null;
  }

  // Get related posts (recent posts for now)
  const relatedData = await fetchGraphQL(GET_RECENT_POSTS, { first: 4 });
  
  return {
    post: data.post as WPPost,
    relatedPosts: (relatedData?.posts?.nodes || []) as WPPost[],
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const data = await getPostData(params.slug);
  
  if (!data) {
    return {
      title: 'Article Not Found',
    };
  }

  const { post } = data;
  const imageUrl = post.featuredImage?.node?.sourceUrl;

  return {
    title: `${post.title} - Report Focus News`,
    description: post.excerpt ? parse(post.excerpt).toString() : '',
    openGraph: {
      title: post.title,
      description: post.excerpt ? parse(post.excerpt).toString() : '',
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: post.author?.node ? [post.author.node.name] : [],
      images: imageUrl ? [imageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ? parse(post.excerpt).toString() : '',
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const data = await getPostData(params.slug);

  if (!data) {
    notFound();
  }

  const { post, relatedPosts } = data;
  const stats = post.content ? readingTime(post.content) : null;
  const category = post.categories?.edges?.[0]?.node;

  return (
    <>
      <Header />
      
      <main>
        <article className="container-content py-8">
          {/* Article Header */}
          <header className="mb-8">
            {category && (
              <Link
                href={`/category/${category.slug}`}
                className="category-badge mb-4 inline-block"
              >
                {category.name}
              </Link>
            )}
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <div className="text-xl text-gray-600 mb-6">
                {parse(post.excerpt)}
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b border-gray-200">
              {post.author?.node && (
                <div className="flex items-center gap-2">
                  {post.author.node.avatar?.url && (
                    <Image
                      src={post.author.node.avatar.url}
                      alt={post.author.node.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-medium text-gray-900">
                      By {post.author.node.name}
                    </div>
                  </div>
                </div>
              )}
              
              <time dateTime={post.date}>
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
              
              {stats && (
                <span>{stats.text}</span>
              )}
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage?.node && (
            <div className="mb-8">
              <div className="relative aspect-[16/9]">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
              {post.featuredImage.node.caption && (
                <p className="mt-2 text-sm text-gray-600">
                  {parse(post.featuredImage.node.caption)}
                </p>
              )}
            </div>
          )}

          {/* Article Content */}
          {post.content && (
            <div className="article-content max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                {parse(post.content)}
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-200">
            <ShareButtons 
              url={`https://www.reportfocusnews.com/post/${post.slug}`}
              title={post.title}
            />
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-4xl mx-auto mt-12 p-8 bg-gray-50 rounded-lg">
            <NewsletterSignup />
          </div>

          {/* Tags */}
          {post.tags?.edges && post.tags.edges.length > 0 && (
            <div className="max-w-4xl mx-auto mt-8">
              <div className="flex flex-wrap gap-2">
                {post.tags.edges.map(({ node: tag }) => (
                  <Link
                    key={tag.id}
                    href={`/tag/${tag.slug}`}
                    className="px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="container-content py-12 border-t-2 border-gray-900">
            <h2 className="font-serif text-3xl font-bold mb-8">More to Read</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPosts
                .filter(p => p.id !== post.id)
                .slice(0, 4)
                .map((relatedPost) => (
                  <ArticleCard
                    key={relatedPost.id}
                    article={relatedPost}
                    variant="default"
                    showImage={true}
                    showExcerpt={false}
                    showAuthor={false}
                    showCategory={true}
                  />
                ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

// Share Buttons Component
function ShareButtons({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-4">
      <span className="font-medium text-gray-700">Share:</span>
      <div className="flex gap-2">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Share on Twitter"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
        
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Share on Facebook"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
        
        <a
          href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Share via Email"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
        
        <button
          onClick={() => navigator.clipboard.writeText(url)}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Copy link"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// Newsletter Signup Component
function NewsletterSignup() {
  return (
    <>
      <h3 className="font-serif text-2xl font-bold mb-2">
        Get the Morning Briefing
      </h3>
      <p className="text-gray-600 mb-4">
        Start your day with the top stories delivered to your inbox.
      </p>
      <form className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

// Revalidate every 60 seconds
export const revalidate = 60;