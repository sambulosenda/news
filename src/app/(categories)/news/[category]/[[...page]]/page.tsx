import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchGraphQL } from '@/lib/api/fetch-graphql';
import { GET_POSTS_BY_CATEGORY } from '@/lib/queries/posts';
import { GET_CATEGORY_BY_SLUG } from '@/lib/queries/categories';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/cards/ArticleCard';
import { WPPost, WPCategory } from '@/types/wordpress';
import { getCategoryMetadata } from '@/lib/utils/category-metadata';
import PaginationControls from '@/components/common/PaginationControls';

interface CategoryPageProps {
  params: Promise<{
    category: string;
    page?: string[];
  }>;
}

const POSTS_PER_PAGE = 12;

function extractPageNumber(pageParams?: string[]): number {
  if (!pageParams || pageParams.length === 0) return 1;
  if (pageParams[0] === 'page' && pageParams[1]) {
    const pageNum = parseInt(pageParams[1]);
    return isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;
  }
  return 1;
}

async function getCategoryData(slug: string, page: number = 1) {
  // For pagination, we need to fetch previous pages to get the cursor
  let cursor = null;
  
  // If we're on page 2+, we need to fetch previous pages to get the cursor
  if (page > 1) {
    const skipCount = (page - 1) * POSTS_PER_PAGE;
    // Fetch all previous items to get to the right cursor
    const previousData = await fetchGraphQL(GET_POSTS_BY_CATEGORY, { 
      categorySlug: slug, 
      first: skipCount 
    });
    
    if (previousData?.posts?.edges?.length > 0) {
      cursor = previousData.posts.pageInfo.endCursor;
    }
  }

  const [categoryData, postsData] = await Promise.all([
    fetchGraphQL(GET_CATEGORY_BY_SLUG, { slug }),
    fetchGraphQL(GET_POSTS_BY_CATEGORY, { 
      categorySlug: slug, 
      first: POSTS_PER_PAGE,
      after: cursor
    }),
  ]);

  if (!categoryData?.category) {
    return null;
  }

  return {
    category: categoryData.category as WPCategory,
    posts: postsData?.posts?.edges?.map((e: { node: WPPost }) => e.node) || [],
    pageInfo: postsData?.posts?.pageInfo || { hasNextPage: false, hasPreviousPage: false },
    totalCount: postsData?.posts?.edges?.length || 0
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug, page: pageParams } = await params;
  const pageNum = extractPageNumber(pageParams);
  const data = await getCategoryData(categorySlug, pageNum);
  
  if (!data) {
    return {
      title: 'Category Not Found',
    };
  }

  const { category } = data;
  
  // Get optimized metadata for this category
  const optimizedMeta = getCategoryMetadata(categorySlug);
  
  const baseTitle = optimizedMeta.title.includes('Report Focus') 
    ? optimizedMeta.title 
    : `${optimizedMeta.title} | Report Focus News`;
  
  const title = pageNum > 1 
    ? `${baseTitle} - Page ${pageNum}`
    : baseTitle;

  const baseDescription = optimizedMeta.description || category.description || 
    `Latest ${category.name} news and updates from South Africa and Zimbabwe.`;
  
  const description = pageNum > 1
    ? `${baseDescription} Page ${pageNum}`
    : baseDescription;

  // Canonical URL handling for pagination
  const canonicalUrl = pageNum === 1
    ? `https://reportfocusnews.com/news/${categorySlug}/`
    : `https://reportfocusnews.com/news/${categorySlug}/page/${pageNum}/`;

  // Pagination meta tags
  const prevUrl = pageNum > 1 
    ? pageNum === 2 
      ? `https://reportfocusnews.com/news/${categorySlug}/`
      : `https://reportfocusnews.com/news/${categorySlug}/page/${pageNum - 1}/`
    : undefined;

  const nextUrl = data.pageInfo.hasNextPage
    ? `https://reportfocusnews.com/news/${categorySlug}/page/${pageNum + 1}/`
    : undefined;

  return {
    title,
    description,
    keywords: [
      ...optimizedMeta.keywords,
      category.name,
      `${category.name} news`,
      ...(pageNum > 1 ? [`page ${pageNum}`] : [])
    ].join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'Report Focus News',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      // Only index first 3 pages to avoid thin content
      index: pageNum <= 3,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    other: {
      ...(prevUrl && { 'rel:prev': prevUrl }),
      ...(nextUrl && { 'rel:next': nextUrl }),
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug, page: pageParams } = await params;
  const pageNum = extractPageNumber(pageParams);
  
  const data = await getCategoryData(categorySlug, pageNum);
  
  if (!data) {
    notFound();
  }
  
  const { category, posts, pageInfo } = data;
  
  // Calculate total pages (estimate based on pagination)
  const hasMorePages = pageInfo.hasNextPage;
  const showPagination = pageNum > 1 || hasMorePages;

  return (
    <>
      {/* SEO: Pagination link tags for crawlers */}
      {pageNum > 1 && (
        <link 
          rel="prev" 
          href={pageNum === 2 
            ? `https://reportfocusnews.com/news/${categorySlug}/`
            : `https://reportfocusnews.com/news/${categorySlug}/page/${pageNum - 1}/`
          } 
        />
      )}
      {pageInfo.hasNextPage && (
        <link 
          rel="next" 
          href={`https://reportfocusnews.com/news/${categorySlug}/page/${pageNum + 1}/`} 
        />
      )}

      {/* Schema markup for category page with pagination */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": pageNum === 1 
              ? `https://reportfocusnews.com/news/${categorySlug}/#webpage`
              : `https://reportfocusnews.com/news/${categorySlug}/page/${pageNum}/#webpage`,
            "url": pageNum === 1
              ? `https://reportfocusnews.com/news/${categorySlug}/`
              : `https://reportfocusnews.com/news/${categorySlug}/page/${pageNum}/`,
            "name": pageNum === 1 
              ? `${category.name} News`
              : `${category.name} News - Page ${pageNum}`,
            "isPartOf": {
              "@type": "WebSite",
              "@id": "https://reportfocusnews.com/#website"
            },
            "about": {
              "@type": "Thing",
              "name": category.name,
              "description": category.description
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://reportfocusnews.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "News",
                  "item": "https://reportfocusnews.com/news"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": category.name,
                  "item": `https://reportfocusnews.com/news/${categorySlug}/`
                },
                ...(pageNum > 1 ? [{
                  "@type": "ListItem",
                  "position": 4,
                  "name": `Page ${pageNum}`,
                  "item": `https://reportfocusnews.com/news/${categorySlug}/page/${pageNum}/`
                }] : [])
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": posts.map((post: WPPost, index: number) => ({
                "@type": "ListItem",
                "position": (pageNum - 1) * POSTS_PER_PAGE + index + 1,
                "url": `https://reportfocusnews.com/${post.date.substring(0, 4)}/${post.date.substring(5, 7)}/${post.date.substring(8, 10)}/${post.slug}/`
              }))
            }
          })
        }}
      />

      <HeaderWrapper />
      
      <main className="bg-white">
        <div className="container-wide py-8">
          {/* Category Header */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {category.name}
              {pageNum > 1 && <span className="text-gray-500 text-3xl ml-2">- Page {pageNum}</span>}
            </h1>
            {category.description && pageNum === 1 && (
              <p className="text-lg text-gray-600 max-w-3xl">
                {category.description}
              </p>
            )}
          </div>

          {/* Articles Grid */}
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post: WPPost) => (
                  <ArticleCard
                    key={post.id}
                    article={post}
                    variant="default"
                    showImage={true}
                    showExcerpt={true}
                    showAuthor={true}
                    showCategory={false}
                  />
                ))}
              </div>

              {/* Pagination */}
              {showPagination && (
                <PaginationControls
                  currentPage={pageNum}
                  hasNextPage={pageInfo.hasNextPage}
                  hasPreviousPage={pageNum > 1}
                  basePath={`/news/${categorySlug}`}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No articles found in this category.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

// Re-export generateStaticParams which generates the categories
// We'll handle pagination dynamically
export { generateStaticParams } from '../generateStaticParams';