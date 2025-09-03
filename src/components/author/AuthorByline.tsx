import Link from 'next/link';
import Image from 'next/image';
import { isNewsAgency, formatAuthorName } from '@/lib/utils/author-enrichment';

interface AuthorBylineProps {
  authorName?: string;
  authorSlug?: string;
  authorDescription?: string;
  authorAvatar?: string;
  variant?: 'compact' | 'full' | 'detailed';
  showAvatar?: boolean;
  className?: string;
}

/**
 * Author byline component that displays author information from WordPress
 * Handles both individual journalists and news agencies
 */
export default function AuthorByline({
  authorName,
  authorSlug,
  authorDescription,
  authorAvatar,
  variant = 'compact',
  showAvatar = false,
  className = ''
}: AuthorBylineProps) {
  if (!authorName) return null;
  
  // Check if it's a news agency
  const isAgency = isNewsAgency(authorName);
  
  // Generate slug from name if not provided
  const slug = authorSlug || authorName.toLowerCase().replace(/\s+/g, '-');
  const authorUrl = `/author/${slug}/`;
  
  // Format the display name
  const displayName = formatAuthorName({ name: authorName });
  
  // Compact variant - just name
  if (variant === 'compact') {
    return (
      <span className={`author-byline ${className}`}>
        {isAgency ? 'Source: ' : 'By '}
        <Link 
          href={authorUrl}
          className="text-gray-700 font-medium hover:text-red-600 transition-colors"
        >
          {displayName}
        </Link>
        {isAgency && (
          <span className="ml-1 text-xs text-gray-500">(Wire Service)</span>
        )}
      </span>
    );
  }
  
  // Full variant - includes avatar if available
  if (variant === 'full') {
    return (
      <div className={`author-byline-full ${className}`}>
        <div className="flex items-center gap-3">
          {showAvatar && authorAvatar && !isAgency && (
            <Link href={authorUrl} className="relative w-10 h-10">
              <Image 
                src={authorAvatar} 
                alt={displayName}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </Link>
          )}
          <div>
            <div className="text-sm text-gray-500">
              {isAgency ? 'Source' : 'Written by'}
            </div>
            <Link 
              href={authorUrl}
              className="text-gray-900 font-semibold hover:text-red-600 transition-colors"
            >
              {displayName}
            </Link>
            {isAgency && (
              <span className="ml-2 text-xs text-gray-500">(Wire Service)</span>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Detailed variant - full author card
  if (variant === 'detailed') {
    return (
      <div className={`author-card bg-gray-50 p-4 rounded-lg ${className}`}>
        <div className="flex items-start gap-4">
          {showAvatar && authorAvatar && !isAgency && (
            <Link href={authorUrl} className="relative w-16 h-16">
              <Image 
                src={authorAvatar} 
                alt={displayName}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            </Link>
          )}
          <div className="flex-1">
            <div className="mb-1">
              <div className="text-sm text-gray-500 mb-1">
                {isAgency ? 'News Source' : 'About the Author'}
              </div>
              <Link 
                href={authorUrl}
                className="text-lg font-bold text-gray-900 hover:text-red-600 transition-colors"
              >
                {displayName}
              </Link>
              {isAgency && (
                <span className="ml-2 text-sm text-gray-500">(Wire Service)</span>
              )}
            </div>
            {authorDescription && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {authorDescription}
              </p>
            )}
            {isAgency && !authorDescription && (
              <p className="text-sm text-gray-600">
                {displayName} is an international news agency providing breaking news and analysis.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}