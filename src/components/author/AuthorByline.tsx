import Link from 'next/link';
import { getAuthorBySlug } from '@/data/authors';

interface AuthorBylineProps {
  authorName?: string;
  authorSlug?: string;
  variant?: 'compact' | 'full' | 'detailed';
  showAvatar?: boolean;
  className?: string;
}

/**
 * Enhanced author byline with credentials
 * Shows author expertise and verified status for Google News trust signals
 */
export default function AuthorByline({
  authorName,
  authorSlug,
  variant = 'compact',
  showAvatar = false,
  className = ''
}: AuthorBylineProps) {
  if (!authorName) return null;
  
  const slug = authorSlug || authorName.toLowerCase().replace(/\s+/g, '-');
  const authorData = getAuthorBySlug(slug);
  const authorUrl = `/author/${slug}/`;
  
  // Compact variant - just name and verified badge
  if (variant === 'compact') {
    return (
      <span className={`author-byline ${className}`}>
        By{' '}
        <Link 
          href={authorUrl}
          className="text-gray-700 font-medium hover:text-red-600 transition-colors"
        >
          {authorData.name || authorName}
        </Link>
        {authorData.verified && (
          <span className="ml-1 inline-flex items-center" title="Verified Journalist">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
        )}
      </span>
    );
  }
  
  // Full variant - includes title and expertise
  if (variant === 'full') {
    return (
      <div className={`author-byline-full ${className}`}>
        <div className="flex items-center gap-3">
          {showAvatar && authorData.avatar && (
            <Link href={authorUrl}>
              <img 
                src={authorData.avatar.url} 
                alt={authorData.avatar.alt || authorData.name}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  // Fallback to initials if image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </Link>
          )}
          <div>
            <div className="flex items-center gap-1">
              <Link 
                href={authorUrl}
                className="text-gray-900 font-semibold hover:text-red-600 transition-colors"
              >
                {authorData.name || authorName}
              </Link>
              {authorData.verified && (
                <span title="Verified Journalist">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
            {authorData.title && (
              <p className="text-sm text-gray-600">{authorData.title}</p>
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
          {showAvatar && authorData.avatar && (
            <Link href={authorUrl}>
              <img 
                src={authorData.avatar.url} 
                alt={authorData.avatar.alt || authorData.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            </Link>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Link 
                href={authorUrl}
                className="text-lg font-bold text-gray-900 hover:text-red-600 transition-colors"
              >
                {authorData.name || authorName}
              </Link>
              {authorData.verified && (
                <span title="Verified Journalist">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
            {authorData.title && (
              <p className="text-sm font-medium text-gray-700 mb-2">{authorData.title}</p>
            )}
            {authorData.bio && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{authorData.bio}</p>
            )}
            {authorData.expertise && authorData.expertise.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {authorData.expertise.slice(0, 3).map((topic) => (
                  <span 
                    key={topic} 
                    className="inline-block px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}