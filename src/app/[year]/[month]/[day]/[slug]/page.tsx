import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import parse from 'html-react-parser';
import readingTime from 'reading-time';
import { fetchGraphQL } from '@/lib/fetch-graphql';
import { GET_POST_BY_SLUG, GET_RELATED_POSTS } from '@/lib/queries/posts';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import ShareButtons from '@/components/ShareButtons';
import { WPPost } from '@/types/wordpress';

interface PostPageProps {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
}

async function getPostData(slug: string) {
  const data = await fetchGraphQL(GET_POST_BY_SLUG, { slug });
  
  if (!data?.postBy) {
    return null;
  }

  return data.postBy as WPPost;
}

async function getRelatedPosts(categoryId: number, currentPostId: string) {
  const data = await fetchGraphQL(GET_RELATED_POSTS, {
    categoryId: categoryId,
    exclude: [currentPostId],
    first: 4,
  });

  return data?.posts?.edges?.map((edge: any) => edge.node) || [];
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const plainTextExcerpt = post.excerpt 
    ? post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160)
    : '';

  return {
    title: post.title,
    description: plainTextExcerpt,
    openGraph: {
      title: post.title,
      description: plainTextExcerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: post.author?.node ? [post.author.node.name] : undefined,
      images: post.featuredImage?.node ? [
        {
          url: post.featuredImage.node.sourceUrl,
          width: post.featuredImage.node.mediaDetails?.width,
          height: post.featuredImage.node.mediaDetails?.height,
          alt: post.featuredImage.node.altText || post.title,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: plainTextExcerpt,
      images: post.featuredImage?.node ? [post.featuredImage.node.sourceUrl] : undefined,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { year, month, day, slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  // For now, we'll accept any date in the URL as long as the slug matches
  // This prevents 404s when dates don't match exactly
  // You can re-enable strict validation later if needed
  
  // Optional: Log if dates don't match for debugging
  const postDate = new Date(post.date);
  const expectedYear = format(postDate, 'yyyy');
  const expectedMonth = format(postDate, 'MM');
  const expectedDay = format(postDate, 'dd');
  
  if (year !== expectedYear || month !== expectedMonth || day !== expectedDay) {
    console.log(`Date mismatch for ${slug}: URL has ${year}/${month}/${day}, post date is ${expectedYear}/${expectedMonth}/${expectedDay}`);
  }

  const category = post.categories?.edges?.[0]?.node;
  const relatedPosts = category 
    ? await getRelatedPosts(category.databaseId, post.databaseId.toString())
    : [];

  const stats = post.content ? readingTime(post.content) : { text: '1 min read' };

  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-8">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            {/* Category Badge */}
            {category && (
              <Link
                href={`/news/${category.slug}/`}
                className="inline-block mb-4 text-sm font-medium text-red-700 hover:text-red-800 uppercase tracking-wider"
              >
                {category.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <div 
                className="text-xl text-gray-700 mb-6 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            )}

            {/* Author and Meta Info */}
            <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
              {post.author?.node && (
                <div className="flex items-center gap-3">
                  {post.author.node.avatar && (
                    <Image
                      src={post.author.node.avatar.url}
                      alt={post.author.node.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">
                      By {post.author.node.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {format(new Date(post.date), 'MMMM d, yyyy')} • {stats.text}
                    </p>
                  </div>
                </div>
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
                  {post.featuredImage.node.caption}
                </p>
              )}
            </div>
          )}

          {/* Article Content */}
          {post.content && (
            <div className="prose prose-lg max-w-none mb-12">
              {parse(post.content)}
            </div>
          )}

          {/* Share Buttons */}
          <div className="py-6 border-t border-gray-200">
            <ShareButtons 
              url={`https://reportfocusnews.com/${year}/${month}/${day}/${slug}/`}
              title={post.title}
            />
          </div>

          {/* Author Bio */}
          {post.author?.node?.description && (
            <div className="py-8 border-t border-gray-200">
              <h3 className="font-serif text-xl font-bold mb-3">
                About the Author
              </h3>
              <div className="flex gap-4">
                {post.author.node.avatar && (
                  <Image
                    src={post.author.node.avatar.url}
                    alt={post.author.node.name}
                    width={80}
                    height={80}
                    className="rounded-full flex-shrink-0"
                  />
                )}
                <div>
                  <h4 className="font-medium text-lg mb-2">
                    {post.author.node.name}
                  </h4>
                  <p className="text-gray-700">
                    {post.author.node.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-8 border-t-2 border-gray-900">
            <h2 className="font-serif text-3xl font-bold mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPosts.map((relatedPost: WPPost) => (
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