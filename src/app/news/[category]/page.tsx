import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchGraphQL } from '@/lib/fetch-graphql';
import { GET_POSTS_BY_CATEGORY } from '@/lib/queries/posts';
import { GET_CATEGORY_BY_SLUG } from '@/lib/queries/categories';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { WPPost, WPCategory } from '@/types/wordpress';
import { localKeywords } from '@/lib/location-detector';
import { getCategoryMetadata } from '@/lib/category-metadata';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

async function getCategoryData(slug: string) {
  const [categoryData, postsData] = await Promise.all([
    fetchGraphQL(GET_CATEGORY_BY_SLUG, { slug }),
    fetchGraphQL(GET_POSTS_BY_CATEGORY, { 
      categorySlug: slug, 
      first: 20 
    }),
  ]);

  if (!categoryData?.category) {
    return null;
  }

  return {
    category: categoryData.category as WPCategory,
    posts: postsData?.posts?.edges?.map((e: { node: WPPost }) => e.node) || [],
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const data = await getCategoryData(categorySlug);
  
  if (!data) {
    return {
      title: 'Category Not Found',
    };
  }

  const { category } = data;

  // Get optimized metadata for this category
  const optimizedMeta = getCategoryMetadata(categorySlug);
  
  // Use optimized metadata if available, otherwise fall back to dynamic generation
  const enhancedTitle = optimizedMeta.title.includes('Report Focus') 
    ? optimizedMeta.title 
    : `${optimizedMeta.title} | Report Focus News`;
    
  const enhancedDescription = optimizedMeta.description || (category.description 
    ? `${category.description} Latest ${category.name} news from South Africa and Zimbabwe.`
    : `Breaking ${category.name} news and analysis from South Africa and Zimbabwe. Stay updated with Report Focus News.`);

  // Combine optimized keywords with location-specific ones
  const categoryKeywords = [
    ...optimizedMeta.keywords,
    ...localKeywords.southAfrica.primary.map(keyword => `${keyword} ${category.name.toLowerCase()}`).slice(0, 3),
    ...localKeywords.zimbabwe.primary.map(keyword => `${keyword} ${category.name.toLowerCase()}`).slice(0, 3),
  ];

  const canonicalUrl = `https://reportfocusnews.com/news/${categorySlug}/`;

  return {
    title: enhancedTitle,
    description: enhancedDescription,
    keywords: categoryKeywords.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: enhancedTitle,
      description: enhancedDescription,
      type: 'website',
      url: canonicalUrl,
      locale: 'en_ZA',
    },
    twitter: {
      card: 'summary_large_image',
      title: enhancedTitle,
      description: enhancedDescription,
    },
    other: {
      'geo.region': 'ZA-GP;ZW-HA',
      'geo.country': 'ZA;ZW',
      'geo.placename': 'Johannesburg;Harare',
      'content:category': category.name,
      'content:region': 'Southern Africa',
      'language': 'en-ZA',
      'audience': 'general',
      'distribution': 'global',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const data = await getCategoryData(categorySlug);

  if (!data) {
    notFound();
  }

  const { category, posts } = data;

  return (
    <>
      <HeaderWrapper />
      
      <main className="container-wide py-8">
        {/* Category Header */}
        <div className="mb-8 pb-8 border-b-2 border-gray-900">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-gray-600">
              {category.description}
            </p>
          )}
        </div>

        {/* Articles Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: WPPost, index: number) => (
              <ArticleCard
                key={post.id}
                article={post}
                variant={index === 0 ? 'featured' : 'default'}
                showImage={true}
                showExcerpt={index === 0}
                showAuthor={index === 0}
                showCategory={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found in this category.</p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

// Revalidate every 60 seconds
export const revalidate = 60;