import { Metadata } from 'next';
import Image from 'next/image';
import { fetchGraphQL } from '@/lib/api/fetch-graphql';
import { GET_POSTS_BY_AUTHOR_SLUG } from '@/lib/queries/posts';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import ArticleCard from '@/components/cards/ArticleCard';
import { WPPost } from '@/types/wordpress';
import { getAuthorBySlug } from '@/data/authors';

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getAuthorData(slug: string) {
  try {
    // Fetch author and their posts in a single query
    const result = await fetchGraphQL(GET_POSTS_BY_AUTHOR_SLUG, { 
      authorSlug: slug,
      first: 20 
    });
    
    const wpUser = result?.user;
    
    if (!wpUser) {
      // Author not found in WordPress, try local data
      const localAuthorInfo = getAuthorBySlug(slug);
      const fallbackAuthor = localAuthorInfo || {
        id: slug,
        name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        slug: slug,
        title: 'Reporter',
        bio: `Journalist at Report Focus News`,
        expertise: ['News'],
        verified: false,
      };
      
      return {
        author: fallbackAuthor,
        posts: [],
      };
    }
    
    // Get local author data for additional info
    const localAuthorInfo = getAuthorBySlug(slug);
    
    // Combine WordPress and local data
    const authorData = {
      id: wpUser.slug || slug,
      name: wpUser.name,
      slug: wpUser.slug || slug,
      bio: wpUser.description || localAuthorInfo?.bio || `Journalist at Report Focus News`,
      avatar: wpUser.avatar?.url,
      // Add local data if available
      title: localAuthorInfo?.title || 'Reporter',
      expertise: localAuthorInfo?.expertise || ['News'],
      yearsOfExperience: localAuthorInfo?.yearsOfExperience,
      verified: localAuthorInfo?.verified || false,
      education: localAuthorInfo?.education,
      twitter: localAuthorInfo?.twitter,
      linkedin: localAuthorInfo?.linkedin,
    };

    // Get posts from the same query
    const posts = wpUser.posts?.edges?.map((e: { node: WPPost }) => e.node) || [];

    return {
      author: authorData,
      posts: posts,
    };
  } catch (error) {
    console.error('Error fetching author data:', error);
    
    // Fallback to local data
    const localAuthorInfo = getAuthorBySlug(slug);
    const authorData = localAuthorInfo || {
      id: slug,
      name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      slug: slug,
      title: 'Reporter',
      bio: `Journalist at Report Focus News`,
      expertise: ['News'],
      verified: false,
    };
    
    return {
      author: authorData,
      posts: [],
    };
  }
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { author, posts } = await getAuthorData(slug);
  
  const expertiseString = author.expertise?.join(', ') || 'News';
  const articleCount = posts.length;

  return {
    title: `${author.name}${author.title ? ` - ${author.title}` : ''}`,
    description: author.bio || `${author.name} is a ${author.title || 'journalist'} at Report Focus News specializing in ${expertiseString}. Read ${articleCount || 'their'} latest articles covering South Africa and Zimbabwe news.`,
    keywords: [
      author.name,
      `${author.name} articles`,
      `${author.name} Report Focus`,
      ...(author.expertise || []),
      'South Africa news',
      'Zimbabwe news',
      'journalist',
      author.title || 'reporter'
    ].join(', '),
    authors: [{ name: author.name }],
    robots: {
      index: true,  // Index author pages for E-E-A-T signals (following Guardian/Al Jazeera standard)
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    alternates: {
      canonical: `https://reportfocusnews.com/author/${slug}/`,
    },
    openGraph: {
      title: `${author.name} - ${author.title || 'Journalist'} at Report Focus News`,
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
      creator: author.twitter,
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const { author, posts } = await getAuthorData(slug);

  return (
    <>
      {/* Enhanced Author Schema Markup for E-E-A-T */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `https://reportfocusnews.com/author/${slug}/#person`,
            "name": author.name,
            "url": `https://reportfocusnews.com/author/${slug}/`,
            "image": author.avatar || `https://reportfocusnews.com/images/authors/${slug}.jpg`,
            "jobTitle": author.title || "Journalist",
            "worksFor": {
              "@type": "NewsMediaOrganization",
              "@id": "https://reportfocusnews.com/#organization",
              "name": "Report Focus News",
              "url": "https://reportfocusnews.com"
            },
            "description": author.bio,
            "sameAs": [
              ...(author.twitter ? [`https://twitter.com/${author.twitter.replace('@', '')}`] : []),
              ...(author.linkedin ? [`https://linkedin.com/in/${author.linkedin}`] : [])
            ],
            "knowsAbout": author.expertise || ["News", "South Africa", "Zimbabwe"],
            ...(author.education && { "alumniOf": { "@type": "EducationalOrganization", "name": author.education }}),
            ...(author.yearsOfExperience && { "experienceInYears": author.yearsOfExperience }),
            ...(author.verified && { "identifier": { "@type": "PropertyValue", "name": "Verified Journalist", "value": "true" }}),
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
                  {author.name}
                </h1>
                
                <p className="text-gray-600 leading-relaxed mb-3">
                  {author.bio}
                </p>
                
                {/* Follow and social links */}
                <div className="text-gray-600">
                  {author.twitter && (
                    <span>Follow <a href={`https://twitter.com/${author.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">{author.twitter}</a></span>
                  )}
                  {author.twitter && author.linkedin && <span className="mx-2">·</span>}
                  {author.linkedin && (
                    <a href={`https://linkedin.com/in/${author.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">LinkedIn</a>
                  )}
                </div>
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