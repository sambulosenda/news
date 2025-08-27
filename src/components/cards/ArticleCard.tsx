import Link from 'next/link';
import ServerCDNImage from '@/components/common/ServerCDNImage';
import ArticleTimestamp from '@/components/common/ArticleTimestamp';
import { format } from 'date-fns';
import { WPPost } from '@/types/wordpress';

interface ArticleCardProps {
  article: WPPost;
  variant?: 'default' | 'hero' | 'featured' | 'compact' | 'horizontal';
  showImage?: boolean;
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showCategory?: boolean;
}

export default function ArticleCard({
  article,
  variant = 'default',
  showImage = true,
  showExcerpt = true,
  showAuthor = true,
  showCategory = true,
}: ArticleCardProps) {
  const category = article.categories?.edges?.[0]?.node;
  
  // Generate date-based URL for posts
  const postDate = new Date(article.date);
  const postUrl = `/${format(postDate, 'yyyy')}/${format(postDate, 'MM')}/${format(postDate, 'dd')}/${article.slug}/`;
  const categoryUrl = category ? `/news/${category.slug}/` : '#';

  if (variant === 'hero') {
    // Note: The new HeroSection component handles the hero layout directly
    // This variant is kept for backward compatibility but simplified
    return (
      <article className="relative">
        {showImage && article.featuredImage?.node && (
          <Link href={postUrl}>
            <div className="relative aspect-[16/9] mb-4">
              <ServerCDNImage
                src={article.featuredImage.node.sourceUrl}
                alt={article.featuredImage.node.altText || article.title}
                fill
                className="object-cover"
              />
            </div>
          </Link>
        )}
        <div>
          {showCategory && category && (
            <Link
              href={categoryUrl}
              className="inline-block text-xs font-bold text-red-600 hover:text-red-700 uppercase tracking-wider mb-3"
            >
              {category.name}
            </Link>
          )}
          <h2 className="mb-4">
            <Link href={postUrl} className="font-sans font-bold text-xl md:text-2xl lg:text-3xl leading-tight text-black hover:text-gray-700 transition-colors block">
              {article.title}
            </Link>
          </h2>
          {showExcerpt && article.excerpt && (
            <div
              className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.excerpt }}
            />
          )}
          {showAuthor && (
            <div className="flex items-center text-xs text-gray-600">
              {article.author?.node && <span>By {article.author.node.name} • </span>}
              <ArticleTimestamp 
                publishDate={article.date} 
                modifiedDate={article.modified}
                showBreaking={true}
                className="text-xs"
              />
            </div>
          )}
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="flex gap-6 md:gap-8">
        {showImage && article.featuredImage?.node && (
          <Link href={postUrl} className="flex-shrink-0">
            <div className="relative w-32 h-32 lg:w-40 lg:h-40">
              <ServerCDNImage
                src={article.featuredImage.node.sourceUrl}
                alt={article.featuredImage.node.altText || article.title}
                fill
                className="object-cover"
              />
            </div>
          </Link>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="mb-3">
            <Link href={postUrl} className="font-sans font-bold text-lg lg:text-xl line-clamp-2 leading-tight text-black hover:text-gray-700 transition-colors block">
              {article.title}
            </Link>
          </h3>
          {showExcerpt && article.excerpt && (
            <div
              className="text-sm text-gray-600 line-clamp-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.excerpt }}
            />
          )}
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="py-3">
        {showCategory && category && (
          <Link
            href={categoryUrl}
            className="inline-block text-xs text-gray-600 uppercase tracking-wide mb-1"
          >
            {category.name}
          </Link>
        )}
        <h3>
          <Link href={postUrl} className="font-sans font-semibold text-base leading-snug text-black hover:text-gray-700 transition-colors block">
            {article.title}
          </Link>
        </h3>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article className="h-full">
        {showImage && article.featuredImage?.node && (
          <Link href={postUrl}>
            <div className="relative aspect-[3/2] mb-4">
              <ServerCDNImage
                src={article.featuredImage.node.sourceUrl}
                alt={article.featuredImage.node.altText || article.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </Link>
        )}
        <div className="p-6 h-full flex flex-col">
          {showCategory && category && (
            <Link
              href={categoryUrl}
              className="category-badge mb-3 self-start"
            >
              {category.name}
            </Link>
          )}
          <h3 className="mb-3 flex-grow">
            <Link href={postUrl} className="font-sans font-bold text-lg lg:text-xl leading-tight line-clamp-3 text-black hover:text-gray-700 transition-colors block">
              {article.title}
            </Link>
          </h3>
          {showExcerpt && article.excerpt && (
            <div
              className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.excerpt }}
            />
          )}
          {showAuthor && article.author?.node && (
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              By {article.author.node.name}
            </p>
          )}
          <div className="mt-auto pt-3">
            <ArticleTimestamp 
              publishDate={article.date} 
              modifiedDate={article.modified}
              className="text-xs text-gray-500"
            />
          </div>
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article>
      {showImage && article.featuredImage?.node && (
        <Link href={postUrl} className="group">
          <div className="relative aspect-[16/10] mb-3 overflow-hidden bg-gray-100">
            <ServerCDNImage
              src={article.featuredImage.node.sourceUrl}
              alt={article.featuredImage.node.altText || article.title}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      )}
      <div>
        {showCategory && category && (
          <Link
            href={categoryUrl}
            className="inline-block text-xs text-gray-600 uppercase tracking-wide mb-2"
          >
            {category.name}
          </Link>
        )}
        <h3 className="mb-2">
          <Link href={postUrl} className="font-sans text-lg font-bold line-clamp-2 leading-tight text-black hover:text-gray-700 transition-colors block">
            {article.title}
          </Link>
        </h3>
        {showExcerpt && article.excerpt && (
          <div
            className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.excerpt }}
          />
        )}
        {showAuthor && (
          <div className="flex items-center text-xs text-gray-500 font-medium">
            {article.author?.node && <span>By {article.author.node.name} • </span>}
            <ArticleTimestamp 
              publishDate={article.date} 
              modifiedDate={article.modified}
              className="text-xs"
            />
          </div>
        )}
      </div>
    </article>
  );
}