import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchGraphQL } from '@/lib/fetch-graphql';
import { GET_POSTS_BY_CATEGORY } from '@/lib/queries/posts';
import { GET_CATEGORY_BY_SLUG } from '@/lib/queries/categories';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { WPPost, WPCategory } from '@/types/wordpress';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
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
  const { slug } = await params;
  const data = await getCategoryData(slug);
  
  if (!data) {
    return {
      title: 'Category Not Found',
    };
  }

  const { category } = data;

  return {
    title: `${category.name} News - Report Focus News`,
    description: category.description || `Latest ${category.name} news and updates from Report Focus News`,
    openGraph: {
      title: `${category.name} - Report Focus News`,
      description: category.description || `Latest ${category.name} news and updates`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const data = await getCategoryData(slug);

  if (!data) {
    notFound();
  }

  const { category, posts } = data;

  return (
    <>
      <Header />
      
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