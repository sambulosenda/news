import { Metadata } from 'next';
import Link from 'next/link';
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
        {/* Breadcrumbs for SEO */}
        <nav aria-label="Breadcrumb" className="container-wide pt-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link href="/authors" className="hover:text-blue-600">Authors</Link></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-gray-900 font-semibold">{author.name}</li>
          </ol>
        </nav>
        
        <div className="container-wide py-8 lg:py-12">
          {/* Author Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {author.avatar ? (
                    <img 
                      src={author.avatar} 
                      alt={author.name}
                      className="w-32 h-32 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-4xl font-bold text-white">
                        {author.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Author Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {author.name}
                    {author.verified && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">{author.title || 'Reporter'}</p>
                  <p className="text-gray-700 mb-4 leading-relaxed">{author.bio}</p>
                  
                  {/* Credentials for E-E-A-T */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
                    {author.yearsOfExperience && (
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{author.yearsOfExperience}+ years of experience</span>
                      </div>
                    )}
                    {author.education && (
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        <span>{author.education}</span>
                      </div>
                    )}
                    {posts.length > 0 && (
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>{posts.length} articles published</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Social Links */}
                  {author.twitter && (
                    <div className="flex gap-4 justify-center md:justify-start">
                      <a 
                        href={`https://twitter.com/${author.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Twitter: {author.twitter}
                      </a>
                    </div>
                  )}
                  
                  {/* Expertise Tags */}
                  {author.expertise && (
                    <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                      {author.expertise.map((topic: string) => (
                        <span key={topic} className="px-3 py-1 bg-gray-200 text-sm rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Articles by Author */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 border-b-2 border-gray-900 pb-4">
              Latest Articles by {author.name}
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