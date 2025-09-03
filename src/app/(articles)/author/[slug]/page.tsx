import { Metadata } from 'next';
import Image from 'next/image';
import { fetchGraphQL } from '@/lib/api/fetch-graphql';
import { GET_POSTS_BY_AUTHOR_SLUG } from '@/lib/queries/posts';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/cards/ArticleCard';
import { WPPost } from '@/types/wordpress';
import { enrichAuthor, formatAuthorName } from '@/lib/utils/author-enrichment';

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getAuthorData(slug: string) {
  try {
    // Fetch author and their posts from WordPress
    const result = await fetchGraphQL(GET_POSTS_BY_AUTHOR_SLUG, { 
      authorSlug: slug,
      first: 20 
    });
    
    const wpUser = result?.user;
    
    if (!wpUser) {
      // Author not found in WordPress
      return null;
    }
    
    // Enrich WordPress data with additional E-E-A-T signals
    const authorData = enrichAuthor({
      id: wpUser.slug || slug,
      name: wpUser.name,
      slug: wpUser.slug || slug,
      bio: wpUser.description,
      avatar: wpUser.avatar?.url,
      firstName: wpUser.firstName,
      lastName: wpUser.lastName,
    });

    // Get posts from the same query
    const posts = wpUser.posts?.edges?.map((e: { node: WPPost }) => e.node) || [];

    return {
      author: authorData,
      posts: posts,
    };
  } catch (error) {
    console.error('Error fetching author data:', error);
    return null;
  }
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getAuthorData(slug);
  
  if (!data) {
    return {
      title: 'Author Not Found',
      description: 'The requested author could not be found.',
    };
  }
  
  const { author } = data;
  const posts = data.posts;

  const title = author.isNewsAgency 
    ? `${author.name} - News Agency`
    : `${author.name} - ${author.jobTitle || 'Journalist'}`;

  return {
    title: title,
    description: author.bio,
    keywords: [
      author.name,
      `${author.name} articles`,
      `${author.name} Report Focus`,
      'South Africa news',
      'Zimbabwe news',
      'journalist',
      'reporter'
    ].join(', '),
    authors: [{ name: author.name }],
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `https://reportfocusnews.com/author/${slug}/`,
    },
    openGraph: {
      title: `${author.name} - Journalist at Report Focus News`,
      description: author.bio,
      type: 'profile',
      url: `https://reportfocusnews.com/author/${slug}/`,
      images: author.avatar ? [{
        url: author.avatar,
        alt: author.name,
      }] : [],
      siteName: 'Report Focus News',
    },
    twitter: {
      card: 'summary',
      title: `${author.name} - Report Focus News`,
      description: author.bio?.substring(0, 160),
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const data = await getAuthorData(slug);

  if (!data) {
    return (
      <>
        <HeaderWrapper />
        <main className="bg-white">
          <div className="container-wide py-8 lg:py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Author Not Found</h1>
              <p className="text-gray-600">The author you're looking for could not be found.</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { author } = data;
  const posts = data.posts;

  return (
    <>
      {/* Author Schema Markup for E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": author.isNewsAgency ? "NewsMediaOrganization" : "Person",
            "@id": `https://reportfocusnews.com/author/${slug}/#${author.isNewsAgency ? 'organization' : 'person'}`,
            "name": author.name,
            "url": `https://reportfocusnews.com/author/${slug}/`,
            "image": author.avatar || `https://reportfocusnews.com/images/authors/${slug}.jpg`,
            "jobTitle": author.isNewsAgency ? undefined : (author.jobTitle || "Journalist"),
            "worksFor": {
              "@type": "NewsMediaOrganization",
              "@id": "https://reportfocusnews.com/#organization",
              "name": "Report Focus News",
              "url": "https://reportfocusnews.com"
            },
            "description": author.bio,
            "numberOfArticles": posts.length,
            "mainEntityOfPage": {
              "@type": "ProfilePage",
              "@id": `https://reportfocusnews.com/author/${slug}/`,
              "dateModified": new Date().toISOString(),
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://reportfocusnews.com" },
                  { "@type": "ListItem", "position": 2, "name": "Authors", "item": "https://reportfocusnews.com/authors" },
                  { "@type": "ListItem", "position": 3, "name": author.name, "item": `https://reportfocusnews.com/author/${slug}/` }
                ]
              }
            }
          })
        }}
      />

      <HeaderWrapper />
      
      <main className="bg-white">
        <div className="container-wide py-8 lg:py-12">
          {/* Simple Author Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex gap-6 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {author.avatar ? (
                  <Image 
                    src={author.avatar} 
                    alt={author.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                    priority
                  />
                ) : (
                  <div className="w-[120px] h-[120px] bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-medium text-gray-500">
                      {author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Author Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {formatAuthorName(author)}
                </h1>
                
                {/* Show expertise if available */}
                {author.expertise && author.expertise.length > 0 && (
                  <div className="mb-3">
                    <span className="text-sm text-gray-500">Expertise: </span>
                    <span className="text-sm text-gray-700">{author.expertise.join(', ')}</span>
                  </div>
                )}
                
                {/* Show years of experience if available */}
                {author.yearsOfExperience && author.yearsOfExperience > 0 && (
                  <div className="mb-3">
                    <span className="text-sm text-gray-500">Experience: </span>
                    <span className="text-sm text-gray-700">{author.yearsOfExperience}+ years</span>
                  </div>
                )}
                
                <p className="text-gray-600 leading-relaxed mb-3">
                  {author.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Articles by Author */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-wide">
              MORE FROM AUTHOR <span className="text-orange-500">•</span>
            </h2>
            
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: WPPost) => (
                  <ArticleCard
                    key={post.id}
                    article={post}
                    variant="default"
                    showImage={true}
                    showExcerpt={true}
                    showAuthor={false}
                    showCategory={true}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-12">
                No articles found by this author.
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

// Revalidate every 5 minutes
export const revalidate = 300;