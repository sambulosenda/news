import { Metadata } from 'next';
import { fetchGraphQL } from '@/lib/fetch-graphql';
import { GET_AUTHOR_POSTS } from '@/lib/queries/posts';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { WPPost } from '@/types/wordpress';

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Common authors data (in production, this would come from WordPress)
const authorsData: Record<string, any> = {
  'staff-reporter': {
    name: 'Staff Reporter',
    bio: 'News team at Report Focus News covering breaking stories across South Africa and Zimbabwe.',
    avatar: '/images/staff-avatar.jpg',
    role: 'News Team',
    twitter: '@reportfocusnews',
    expertise: ['Breaking News', 'Politics', 'Business', 'Crime']
  }
};

async function getAuthorData(slug: string) {
  // For now, return mock data. In production, fetch from WordPress
  const authorInfo = authorsData[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    bio: `Journalist at Report Focus News`,
    role: 'Reporter'
  };

  // Fetch posts by author (you'd need to implement author filtering in your GraphQL)
  const postsData = await fetchGraphQL(GET_AUTHOR_POSTS, { 
    authorId: 1, // This would be dynamic based on author
    exclude: [],
    first: 20 
  });

  return {
    author: authorInfo,
    posts: postsData?.posts?.edges?.map((e: { node: WPPost }) => e.node) || [],
  };
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { author } = await getAuthorData(slug);

  return {
    title: `${author.name} - Journalist | Report Focus News`,
    description: author.bio || `Read latest articles by ${author.name} on Report Focus News. Expert coverage of South Africa and Zimbabwe news.`,
    openGraph: {
      title: `${author.name} - Report Focus News`,
      description: author.bio,
      type: 'profile',
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const { author, posts } = await getAuthorData(slug);

  return (
    <>
      {/* Author Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": author.name,
            "url": `https://reportfocusnews.com/author/${slug}/`,
            "image": author.avatar,
            "jobTitle": author.role || "Journalist",
            "worksFor": {
              "@type": "NewsMediaOrganization",
              "name": "Report Focus News"
            },
            "description": author.bio,
            "sameAs": author.twitter ? [`https://twitter.com/${author.twitter.replace('@', '')}`] : [],
            "knowsAbout": author.expertise || ["News", "South Africa", "Zimbabwe"]
          })
        }}
      />

      <HeaderWrapper />
      
      <main className="bg-white">
        <div className="container-wide py-8 lg:py-12">
          {/* Author Header */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-600">
                      {author.name.charAt(0)}
                    </span>
                  </div>
                </div>
                
                {/* Author Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{author.name}</h1>
                  <p className="text-lg text-gray-600 mb-4">{author.role}</p>
                  <p className="text-gray-700 mb-4">{author.bio}</p>
                  
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