import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
export { generateStaticParams } from './generateStaticParams';
import { fetchGraphQL } from '@/lib/fetch-graphql';
import { GET_POSTS_BY_CATEGORY } from '@/lib/queries/posts';
import { GET_CATEGORY_BY_SLUG } from '@/lib/queries/categories';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
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
      first: 25 
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
  const heroPost = posts[0];
  const gridPosts = posts.slice(1);

  return (
    <>
      <HeaderWrapper />
      
      <main className="bg-white">
        <div className="container-wide py-6 lg:py-8">
          {/* Category Header */}
          <div className="mb-8">
            <div className="border-b-4 border-red-600 pb-4">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-lg text-gray-600 mt-2">
                  {category.description}
                </p>
              )}
            </div>
          </div>

          {posts.length > 0 ? (
            <>
              {/* Hero Article */}
              {heroPost && (
                <section className="mb-12 pb-12 border-b-2 border-gray-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Hero Image */}
                    {heroPost.featuredImage?.node && (
                      <div className="order-2 lg:order-1">
                        <Link 
                          href={`/${format(new Date(heroPost.date), 'yyyy')}/${format(new Date(heroPost.date), 'MM')}/${format(new Date(heroPost.date), 'dd')}/${heroPost.slug}/`}
                          className="block group"
                        >
                          <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden bg-gray-100">
                            <Image
                              src={heroPost.featuredImage.node.sourceUrl}
                              alt={heroPost.featuredImage.node.altText || heroPost.title}
                              fill
                              priority
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                          </div>
                        </Link>
                      </div>
                    )}
                    
                    {/* Hero Content */}
                    <div className="order-1 lg:order-2 flex flex-col justify-center">
                      <article>
                        {/* Date */}
                        <time className="text-sm text-gray-500 font-medium">
                          {format(new Date(heroPost.date), 'MMMM d, yyyy')}
                        </time>
                        
                        {/* Title */}
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mt-2 mb-4">
                          <Link 
                            href={`/${format(new Date(heroPost.date), 'yyyy')}/${format(new Date(heroPost.date), 'MM')}/${format(new Date(heroPost.date), 'dd')}/${heroPost.slug}/`}
                            className="hover:text-gray-700"
                          >
                            {heroPost.title}
                          </Link>
                        </h2>
                        
                        {/* Excerpt */}
                        {heroPost.excerpt && (
                          <div
                            className="text-lg text-gray-600 leading-relaxed mb-4 line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: heroPost.excerpt }}
                          />
                        )}
                        
                        {/* Author */}
                        {heroPost.author?.node && (
                          <p className="text-base font-medium text-gray-700">
                            By {heroPost.author.node.name}
                          </p>
                        )}
                        
                        {/* Read More Link */}
                        <Link 
                          href={`/${format(new Date(heroPost.date), 'yyyy')}/${format(new Date(heroPost.date), 'MM')}/${format(new Date(heroPost.date), 'dd')}/${heroPost.slug}/`}
                          className="inline-flex items-center mt-4 text-red-600 font-semibold hover:text-red-700"
                        >
                          Read Full Story
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </article>
                    </div>
                  </div>
                </section>
              )}

              {/* Grid Articles */}
              {gridPosts.length > 0 && (
                <section>
                  <h2 className="font-serif text-2xl font-bold mb-6 pb-2 border-b border-gray-300">
                    More {category.name} Stories
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {gridPosts.map((post: WPPost) => {
                      const postDate = new Date(post.date);
                      const postUrl = `/${format(postDate, 'yyyy')}/${format(postDate, 'MM')}/${format(postDate, 'dd')}/${post.slug}/`;
                      
                      return (
                        <article key={post.id} className="group">
                          {/* Thumbnail */}
                          {post.featuredImage?.node && (
                            <Link href={postUrl} className="block mb-3">
                              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                <Image
                                  src={post.featuredImage.node.sourceUrl}
                                  alt={post.featuredImage.node.altText || post.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                              </div>
                            </Link>
                          )}
                          
                          {/* Content */}
                          <div>
                            <time className="text-xs text-gray-500">
                              {format(postDate, 'MMM d, yyyy')}
                            </time>
                            
                            <h3 className="font-serif text-lg font-bold leading-tight mt-1 mb-2">
                              <Link href={postUrl} className="hover:text-gray-700 group-hover:text-gray-700">
                                {post.title}
                              </Link>
                            </h3>
                            
                            {/* Show excerpt for first few grid items */}
                            {gridPosts.indexOf(post) < 3 && post.excerpt && (
                              <div
                                className="text-sm text-gray-600 line-clamp-2"
                                dangerouslySetInnerHTML={{ __html: post.excerpt }}
                              />
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-600">No articles found in this category.</p>
              <Link href="/" className="inline-block mt-4 text-red-600 font-semibold hover:text-red-700">
                ← Return to Homepage
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

// Revalidate every 2 minutes for category pages (news needs freshness)
export const revalidate = 120;