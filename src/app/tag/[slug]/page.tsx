import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchGraphQLCached } from '@/lib/api/graphql-cache';
import { GET_POSTS_BY_TAG, GET_TAG_BY_SLUG } from '@/lib/queries/tags';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/cards/ArticleCard';
import PaginationControls from '@/components/common/PaginationControls';
import TagSchema from '@/components/seo/TagSchema';
import RelatedTags from '@/components/tags/RelatedTags';

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

// Cache tag pages for 5 minutes
export const revalidate = 300;

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Fetch tag data
  const tagData = await fetchGraphQLCached(
    GET_TAG_BY_SLUG,
    { slug },
    { ttl: 300 }
  );
  
  const tag = tagData?.tag;
  
  if (!tag) {
    return {
      title: 'Tag Not Found',
      robots: { index: false, follow: false }
    };
  }

  const title = tag.seo?.title || `${tag.name} News & Articles`;
  const description = tag.seo?.metaDesc || tag.description || 
    `Latest ${tag.name} news, articles and updates from Report Focus News. Browse all content tagged with ${tag.name}.`;

  return {
    title,
    description,
    keywords: `${tag.name}, ${tag.name} news, ${tag.name} articles, ${tag.name} updates, South Africa ${tag.name}, Zimbabwe ${tag.name}`,
    openGraph: {
      title: tag.seo?.opengraphTitle || title,
      description: tag.seo?.opengraphDescription || description,
      type: 'website',
      url: `https://reportfocusnews.com/tag/${slug}/`,
      images: tag.seo?.opengraphImage ? [{
        url: tag.seo.opengraphImage.sourceUrl,
        alt: tag.name
      }] : [],
      siteName: 'Report Focus News'
    },
    twitter: {
      card: 'summary_large_image',
      title: title.substring(0, 70),
      description: description.substring(0, 200)
    },
    alternates: {
      canonical: tag.seo?.canonical || `https://reportfocusnews.com/tag/${slug}/`
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params;
  const { page = '1' } = await searchParams;
  
  const currentPage = parseInt(page, 10) || 1;
  const postsPerPage = 12;
  const after = currentPage > 1 ? btoa(`arrayconnection:${(currentPage - 1) * postsPerPage - 1}`) : null;
  
  // Fetch tag and posts data in parallel
  const [tagData, postsData] = await Promise.all([
    fetchGraphQLCached(
      GET_TAG_BY_SLUG,
      { slug },
      { ttl: 300 }
    ),
    fetchGraphQLCached(
      GET_POSTS_BY_TAG,
      { slug, first: postsPerPage, after },
      { ttl: 60 } // 1 minute cache for posts
    )
  ]);

  const tag = tagData?.tag;
  const posts = postsData?.posts;

  if (!tag) {
    notFound();
  }

  const totalPosts = tag.count || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const hasNextPage = posts?.pageInfo?.hasNextPage || false;
  const hasPreviousPage = currentPage > 1;

  return (
    <>
      <TagSchema 
        tag={tag}
        url={`https://reportfocusnews.com/tag/${slug}/`}
        posts={posts?.edges?.map((edge: any) => edge.node) || []}
      />
      
      <HeaderWrapper />
      
      <main className="min-h-screen bg-gray-50">
        {/* Tag Header */}
        <div className="bg-white border-b">
          <div className="container-wide py-8">
            <div className="max-w-4xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Link href="/" className="hover:text-gray-900 transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href="/tags" className="hover:text-gray-900 transition-colors">
                  Tags
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">{tag.name}</span>
              </nav>

              {/* Tag Title & Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="px-4 py-2 bg-red-600 text-white rounded-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {tag.name}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {totalPosts} {totalPosts === 1 ? 'article' : 'articles'}
                  </p>
                </div>
              </div>

              {/* Tag Description */}
              {tag.description && (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {tag.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related Tags */}
        <RelatedTags currentTagSlug={slug} currentTagName={tag.name} />

        {/* Posts Grid */}
        <div className="container-wide py-8">
          {posts?.edges?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.edges.map((edge: any) => (
                  <ArticleCard 
                    key={edge.node.id}
                    article={edge.node}
                    variant="standard"
                    showCategory
                    showAuthor
                    showDate
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl={`/tag/${slug}`}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found with this tag.</p>
              <Link 
                href="/tags" 
                className="inline-block mt-4 text-red-600 hover:text-red-700 font-medium"
              >
                Browse all tags →
              </Link>
            </div>
          )}
        </div>

      </main>
      
      <Footer />
    </>
  );
}