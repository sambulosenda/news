import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { WPPost } from '@/types/wordpress';
import { getCDNImageUrl } from '@/lib/cdn';
import { 
  findRelatedArticles, 
  groupRelatedByCategory,
  getTrendingRelated 
} from '@/lib/utils/related-articles';

interface SmartRelatedArticlesProps {
  currentPost: WPPost;
  allPosts: WPPost[];
  variant?: 'grid' | 'list' | 'mixed';
  showCategories?: boolean;
}

export default function SmartRelatedArticles({ 
  currentPost,
  allPosts,
  variant = 'mixed',
  showCategories = true
}: SmartRelatedArticlesProps) {
  // Find related articles using smart algorithm
  const relatedArticles = findRelatedArticles(currentPost, allPosts, 9);
  
  if (relatedArticles.length === 0) {
    // Fallback to recent articles from same category
    const currentCategory = currentPost.categories?.edges?.[0]?.node.slug;
    const fallbackArticles = allPosts
      .filter(p => 
        p.id !== currentPost.id && 
        p.categories?.edges?.some(e => e.node.slug === currentCategory)
      )
      .slice(0, 6);
    
    if (fallbackArticles.length === 0) {
      return null;
    }
    
    return <FallbackRelated articles={fallbackArticles} />;
  }

  // Get trending articles from the related set
  const trending = getTrendingRelated(relatedArticles, 3);
  const regular = relatedArticles.filter(a => !trending.includes(a)).slice(0, 6);
  
  if (variant === 'mixed') {
    return <MixedLayout trending={trending} regular={regular} showCategories={showCategories} />;
  } else if (variant === 'list') {
    return <ListLayout articles={relatedArticles.slice(0, 6)} showCategories={showCategories} />;
  } else {
    return <GridLayout articles={relatedArticles.slice(0, 6)} showCategories={showCategories} />;
  }
}

// Mixed layout with featured trending articles
function MixedLayout({ 
  trending, 
  regular, 
  showCategories 
}: { 
  trending: WPPost[]; 
  regular: WPPost[]; 
  showCategories: boolean;
}) {
  return (
    <section className="my-12 py-8 border-t-2 border-gray-200">
      <h2 className="font-serif text-3xl font-bold mb-6">Related Articles</h2>
      
      {/* Trending Related - Featured */}
      {trending.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-bold text-red-600 uppercase tracking-wide mb-4">
            Trending Related
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trending.map((article) => (
              <FeaturedCard key={article.id} article={article} showCategory={showCategories} />
            ))}
          </div>
        </div>
      )}
      
      {/* Regular Related */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regular.map((article) => (
          <ArticleCard key={article.id} article={article} showCategory={showCategories} />
        ))}
      </div>
    </section>
  );
}

// Grid layout
function GridLayout({ 
  articles, 
  showCategories 
}: { 
  articles: WPPost[]; 
  showCategories: boolean;
}) {
  return (
    <section className="my-12 py-8 border-t-2 border-gray-200">
      <h2 className="font-serif text-3xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} showCategory={showCategories} />
        ))}
      </div>
    </section>
  );
}

// List layout
function ListLayout({ 
  articles, 
  showCategories 
}: { 
  articles: WPPost[]; 
  showCategories: boolean;
}) {
  return (
    <section className="my-12 py-8 border-t-2 border-gray-200">
      <h2 className="font-serif text-3xl font-bold mb-6">Related Articles</h2>
      <div className="space-y-4">
        {articles.map((article) => (
          <ListCard key={article.id} article={article} showCategory={showCategories} />
        ))}
      </div>
    </section>
  );
}

// Featured card for trending articles
function FeaturedCard({ article, showCategory }: { article: WPPost; showCategory: boolean }) {
  const postDate = new Date(article.date);
  const postUrl = `/${format(postDate, 'yyyy')}/${format(postDate, 'MM')}/${format(postDate, 'dd')}/${article.slug}/`;
  const imageUrl = getCDNImageUrl(article.featuredImage?.node?.sourceUrl);
  
  return (
    <article className="group bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <Link href={postUrl}>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={imageUrl}
              alt={article.featuredImage?.node?.altText || article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
              loading="lazy"
            />
            <div className="absolute top-2 left-2">
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                TRENDING
              </span>
            </div>
          </div>
        </Link>
      )}
      
      <div className="p-4">
        {showCategory && article.categories?.edges?.[0] && (
          <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">
            {article.categories.edges[0].node.name}
          </p>
        )}
        <h3 className="font-bold text-sm mb-2 line-clamp-2">
          <Link href={postUrl} className="hover:text-red-600 transition-colors">
            {article.title}
          </Link>
        </h3>
        <p className="text-xs text-gray-500">
          {format(postDate, 'MMM d, yyyy')}
        </p>
      </div>
    </article>
  );
}

// Regular article card
function ArticleCard({ article, showCategory }: { article: WPPost; showCategory: boolean }) {
  const postDate = new Date(article.date);
  const postUrl = `/${format(postDate, 'yyyy')}/${format(postDate, 'MM')}/${format(postDate, 'dd')}/${article.slug}/`;
  const imageUrl = getCDNImageUrl(article.featuredImage?.node?.sourceUrl);
  
  return (
    <article className="group">
      {imageUrl && (
        <Link href={postUrl}>
          <div className="relative aspect-[16/10] mb-3 overflow-hidden rounded">
            <Image
              src={imageUrl}
              alt={article.featuredImage?.node?.altText || article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          </div>
        </Link>
      )}
      
      <div>
        {showCategory && article.categories?.edges?.[0] && (
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
            {article.categories.edges[0].node.name}
          </p>
        )}
        <h3 className="font-serif text-lg font-bold mb-2 line-clamp-2">
          <Link href={postUrl} className="hover:text-red-600 transition-colors">
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <div
            className="text-sm text-gray-600 mb-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: article.excerpt }}
          />
        )}
        <p className="text-xs text-gray-500">
          {format(postDate, 'MMM d, yyyy')}
        </p>
      </div>
    </article>
  );
}

// List card layout
function ListCard({ article, showCategory }: { article: WPPost; showCategory: boolean }) {
  const postDate = new Date(article.date);
  const postUrl = `/${format(postDate, 'yyyy')}/${format(postDate, 'MM')}/${format(postDate, 'dd')}/${article.slug}/`;
  const imageUrl = getCDNImageUrl(article.featuredImage?.node?.sourceUrl);
  
  return (
    <article className="group flex gap-4 pb-4 border-b border-gray-200">
      {imageUrl && (
        <Link href={postUrl} className="flex-shrink-0">
          <div className="relative w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded">
            <Image
              src={imageUrl}
              alt={article.featuredImage?.node?.altText || article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="150px"
              loading="lazy"
            />
          </div>
        </Link>
      )}
      
      <div className="flex-1">
        {showCategory && article.categories?.edges?.[0] && (
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">
            {article.categories.edges[0].node.name}
          </p>
        )}
        <h3 className="font-serif text-base md:text-lg font-bold mb-1 line-clamp-2">
          <Link href={postUrl} className="hover:text-red-600 transition-colors">
            {article.title}
          </Link>
        </h3>
        {article.excerpt && (
          <div
            className="text-sm text-gray-600 mb-2 line-clamp-2 hidden md:block"
            dangerouslySetInnerHTML={{ __html: article.excerpt }}
          />
        )}
        <p className="text-xs text-gray-500">
          {format(postDate, 'MMM d, yyyy')}
          {article.author?.node?.name && (
            <span> • By {article.author.node.name}</span>
          )}
        </p>
      </div>
    </article>
  );
}

// Fallback when no smart related found
function FallbackRelated({ articles }: { articles: WPPost[] }) {
  return (
    <section className="my-12 py-8 border-t-2 border-gray-200">
      <h2 className="font-serif text-3xl font-bold mb-6">More Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} showCategory={true} />
        ))}
      </div>
    </section>
  );
}