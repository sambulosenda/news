import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import parse from 'html-react-parser';
import readingTime from 'reading-time';
import { fetchGraphQL } from '@/lib/fetch-graphql';
import { GET_POST_BY_SLUG, GET_RELATED_POSTS, GET_AUTHOR_POSTS } from '@/lib/queries/posts';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import ShareButtons from '@/components/ShareButtons';
import { WPPost } from '@/types/wordpress';
import LocalNewsSchema from '@/components/LocalNewsSchema';
import ReadingProgress from '@/components/ReadingProgress';
import BackToTop from '@/components/BackToTop';
import MobileShareBar from '@/components/MobileShareBar';
import { detectLocationFromContent, generateLocationKeywords } from '@/lib/location-detector';

interface PostPageProps {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
}

interface PostEdge {
  node: WPPost;
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

  return data?.posts?.edges?.map((edge: PostEdge) => edge.node) || [];
}

async function getAuthorPosts(authorId: number, currentPostId: string) {
  const data = await fetchGraphQL(GET_AUTHOR_POSTS, {
    authorId: authorId,
    exclude: [currentPostId],
    first: 3,
  });

  return data?.posts?.edges?.map((edge: PostEdge) => edge.node) || [];
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  // Detect location from content
  const category = post.categories?.edges?.[0]?.node?.name || '';
  const tags = post.tags?.edges?.map((edge: { node: { name: string } }) => edge.node.name) || [];
  const location = detectLocationFromContent(
    post.title || '',
    post.content || '',
    category,
    tags
  );

  // Generate location-specific keywords
  const locationKeywords = generateLocationKeywords(location, category);
  
  const plainTextExcerpt = post.excerpt 
    ? post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160)
    : '';

  // Enhanced title with location context
  const enhancedTitle = location 
    ? `${post.title} - ${location.country} News`
    : post.title;

  // Enhanced description with location context
  const enhancedDescription = location && location.city
    ? `${plainTextExcerpt} Latest news from ${location.city}, ${location.country}.`
    : location
    ? `${plainTextExcerpt} Breaking news from ${location.country}.`
    : plainTextExcerpt;

  const canonicalUrl = `https://reportfocusnews.com/${format(new Date(post.date), 'yyyy')}/${format(new Date(post.date), 'MM')}/${format(new Date(post.date), 'dd')}/${slug}/`;

  return {
    title: enhancedTitle,
    description: enhancedDescription,
    keywords: locationKeywords.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: enhancedTitle,
      description: enhancedDescription,
      type: 'article',
      url: canonicalUrl,
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
      locale: 'en_ZA',
    },
    twitter: {
      card: 'summary_large_image',
      title: enhancedTitle,
      description: enhancedDescription,
      images: post.featuredImage?.node ? [post.featuredImage.node.sourceUrl] : undefined,
    },
    other: {
      'article:published_time': post.date,
      'article:modified_time': post.modified || post.date,
      ...(post.author?.node?.name && { 'article:author': post.author.node.name }),
      'article:section': category,
      'news_keywords': locationKeywords.slice(0, 10).join(', '),
      // Geographic targeting
      ...(location && {
        'geo.region': location.country === 'South Africa' ? 'ZA' : 'ZW',
        'geo.country': location.country === 'South Africa' ? 'ZA' : 'ZW',
        'geo.placename': location.city || (location.country === 'South Africa' ? 'Johannesburg' : 'Harare'),
        'content:location': `${location.city || ''}, ${location.country}`.trim().replace(/^,\s*/, ''),
      }),
      // Content classification
      'content:tier': 'free',
      'distribution': 'global',
      'audience': 'general',
      'language': 'en-ZA',
      // News-specific meta tags
      'article:tag': tags.slice(0, 5).join(', '),
      'article:opinion': 'false',
      'article:content_tier': 'free',
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

  const authorPosts = post.author?.node 
    ? await getAuthorPosts(post.author.node.databaseId, post.databaseId.toString())
    : [];

  const stats = post.content ? readingTime(post.content) : { text: '1 min read' };

  const plainTextExcerpt = post.excerpt 
    ? post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160)
    : '';

  const canonicalUrl = `https://reportfocusnews.com/${year}/${month}/${day}/${slug}/`;
  
  // Detect location for schema markup
  const tags = post.tags?.edges?.map((edge: { node: { name: string } }) => edge.node.name) || [];
  const location = detectLocationFromContent(
    post.title || '',
    post.content || '',
    category?.name || '',
    tags
  );
  
  const keywords = category 
    ? [category.name, ...tags]
    : [];

  return (
    <>
      <ReadingProgress />
      <LocalNewsSchema
        title={post.title}
        description={plainTextExcerpt}
        url={canonicalUrl}
        imageUrl={post.featuredImage?.node?.sourceUrl}
        datePublished={post.date}
        dateModified={post.modified}
        authorName={post.author?.node?.name}
        keywords={keywords}
        category={category?.name}
        location={location || undefined}
        contentTier="free"
      />
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
            <div className="prose prose-lg max-w-3xl mx-auto mb-12 [&>p]:mb-6 [&>p]:leading-[1.7] [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:mt-8 [&>h3]:mb-4 first:[&>p]:first-letter:text-5xl first:[&>p]:first-letter:font-bold first:[&>p]:first-letter:mr-1 first:[&>p]:first-letter:float-left first:[&>p]:first-letter:font-serif">
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

        {/* More from Author */}
        {authorPosts.length > 0 && (
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="font-serif text-2xl font-bold mb-6">
              More from {post.author?.node?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {authorPosts.map((authorPost: WPPost) => (
                <ArticleCard
                  key={authorPost.id}
                  article={authorPost}
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
      <BackToTop />
      <MobileShareBar url={canonicalUrl} title={post.title} />
    </>
  );
}

// Enable ISR - articles cached for 5 minutes (allows quick corrections)
export const revalidate = 300;