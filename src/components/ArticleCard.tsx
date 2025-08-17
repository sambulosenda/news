import Link from 'next/link';
import Image from 'next/image';
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

  if (variant === 'hero') {
    return (
      <article className="relative">
        {showImage && article.featuredImage?.node && (
          <Link href={`/post/${article.slug}`}>
            <div className="relative aspect-[16/9] mb-4">
              <Image
                src={article.featuredImage.node.sourceUrl}
                alt={article.featuredImage.node.altText || article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
        )}
        <div>
          {showCategory && category && (
            <Link
              href={`/category/${category.slug}`}
              className="category-badge mb-2"
            >
              {category.name}
            </Link>
          )}
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
            <Link href={`/post/${article.slug}`} className="hover:underline">
              {article.title}
            </Link>
          </h2>
          {showExcerpt && article.excerpt && (
            <div
              className="text-lg md:text-xl text-gray-700 mb-4 lg:mb-6 line-clamp-3 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.excerpt }}
            />
          )}
          {showAuthor && article.author?.node && (
            <p className="text-base text-gray-600">
              By {article.author.node.name} • {format(new Date(article.date), 'MMM d, yyyy')}
            </p>
          )}
        </div>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="flex gap-6">
        {showImage && article.featuredImage?.node && (
          <Link href={`/post/${article.slug}`} className="flex-shrink-0">
            <div className="relative w-32 h-32 lg:w-40 lg:h-40">
              <Image
                src={article.featuredImage.node.sourceUrl}
                alt={article.featuredImage.node.altText || article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, 128px"
              />
            </div>
          </Link>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-xl lg:text-2xl font-bold mb-2 line-clamp-2 leading-tight">
            <Link href={`/post/${article.slug}`} className="hover:underline">
              {article.title}
            </Link>
          </h3>
          {showExcerpt && article.excerpt && (
            <div
              className="text-base text-gray-600 line-clamp-2 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.excerpt }}
            />
          )}
        </div>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className="py-4 border-b border-gray-200 last:border-b-0">
        <h3 className="font-serif text-lg font-bold mb-2 leading-tight">
          <Link href={`/post/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600">
          {format(new Date(article.date), 'MMM d, yyyy')}
        </p>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article>
        {showImage && article.featuredImage?.node && (
          <Link href={`/post/${article.slug}`}>
            <div className="relative aspect-[3/2] mb-3">
              <Image
                src={article.featuredImage.node.sourceUrl}
                alt={article.featuredImage.node.altText || article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
        )}
        <div>
          {showCategory && category && (
            <Link
              href={`/category/${category.slug}`}
              className="category-badge mb-2"
            >
              {category.name}
            </Link>
          )}
          <h3 className="font-serif text-2xl lg:text-3xl font-bold mb-3 leading-tight">
            <Link href={`/post/${article.slug}`} className="hover:underline">
              {article.title}
            </Link>
          </h3>
          {showExcerpt && article.excerpt && (
            <div
              className="text-base lg:text-lg text-gray-700 mb-3 line-clamp-3 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.excerpt }}
            />
          )}
          {showAuthor && article.author?.node && (
            <p className="text-base text-gray-600">
              By {article.author.node.name}
            </p>
          )}
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article>
      {showImage && article.featuredImage?.node && (
        <Link href={`/post/${article.slug}`}>
          <div className="relative aspect-[16/10] mb-3">
            <Image
              src={article.featuredImage.node.sourceUrl}
              alt={article.featuredImage.node.altText || article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}
      <div>
        {showCategory && category && (
          <Link
            href={`/category/${category.slug}`}
            className="category-badge mb-2"
          >
            {category.name}
          </Link>
        )}
        <h3 className="font-serif text-xl font-bold mb-2">
          <Link href={`/post/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </h3>
        {showExcerpt && article.excerpt && (
          <div
            className="text-gray-700 mb-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: article.excerpt }}
          />
        )}
        {showAuthor && (
          <p className="text-sm text-gray-600">
            {article.author?.node && `By ${article.author.node.name} • `}
            {format(new Date(article.date), 'MMM d, yyyy')}
          </p>
        )}
      </div>
    </article>
  );
}