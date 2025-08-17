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
import ShareButtons from '@/components/ShareButtons';
import NewsletterSignup from '@/components/NewsletterSignup';
import { ArticleStructuredData } from '@/components/StructuredData';
import { WPPost } from '@/types/wordpress';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
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
  const { slug } = await params;
  const data = await getPostData(slug);
  
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
  const { slug } = await params;
  const data = await getPostData(slug);

  if (!data) {
    notFound();
  }

  const { post, relatedPosts } = data;
  const stats = post.content ? readingTime(post.content) : null;
  const category = post.categories?.edges?.[0]?.node;

  return (
    <>
      <ArticleStructuredData
        title={post.title}
        description={post.excerpt ? parse(post.excerpt).toString() : ''}
        datePublished={post.date}
        dateModified={post.modified}
        authorName={post.author?.node?.name}
        imageUrl={post.featuredImage?.node?.sourceUrl}
        url={`https://www.reportfocusnews.com/post/${post.slug}`}
      />
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

// Revalidate every 60 seconds
export const revalidate = 60;