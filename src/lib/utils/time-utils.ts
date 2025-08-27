/**
 * Time utility functions for displaying relative and absolute timestamps
 * Critical for Google News freshness signals
 */

/**
 * Get relative time string (e.g., "5 minutes ago", "2 hours ago")
 * Used for showing article freshness to users and search engines
 */
export function getRelativeTime(date: string | Date): string {
  const now = new Date();
  const publishDate = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor((now.getTime() - publishDate.getTime()) / 1000);
  
  // Less than a minute
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  // Less than an hour
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  // Less than a day
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  // Less than a week
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  }
  
  // Less than a month
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }
  
  // Less than a year
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  }
  
  // Years
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
}

/**
 * Check if article is breaking news (published within last 2 hours)
 */
export function isBreakingNews(date: string | Date): boolean {
  const now = new Date();
  const publishDate = typeof date === 'string' ? new Date(date) : date;
  const diffInHours = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60);
  return diffInHours <= 2;
}

/**
 * Check if article was recently updated
 */
export function wasRecentlyUpdated(
  publishDate: string | Date, 
  modifiedDate?: string | Date
): boolean {
  if (!modifiedDate) return false;
  
  const published = typeof publishDate === 'string' ? new Date(publishDate) : publishDate;
  const modified = typeof modifiedDate === 'string' ? new Date(modifiedDate) : modifiedDate;
  
  // Check if modified is significantly after published (more than 5 minutes)
  const diffInMinutes = (modified.getTime() - published.getTime()) / (1000 * 60);
  return diffInMinutes > 5;
}

/**
 * Get update indicator text
 */
export function getUpdateIndicator(
  publishDate: string | Date,
  modifiedDate?: string | Date
): string | null {
  if (!wasRecentlyUpdated(publishDate, modifiedDate)) return null;
  
  const modified = typeof modifiedDate === 'string' ? new Date(modifiedDate) : modifiedDate!;
  const now = new Date();
  const diffInHours = (now.getTime() - modified.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours < 1) {
    return 'Updated recently';
  } else if (diffInHours < 24) {
    return `Updated ${Math.floor(diffInHours)} ${Math.floor(diffInHours) === 1 ? 'hour' : 'hours'} ago`;
  }
  
  return null;
}

/**
 * Format date for SEO-friendly display
 */
export function formatSEODate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString();
}

/**
 * Get freshness class for styling based on age
 */
export function getFreshnessClass(date: string | Date): string {
  const now = new Date();
  const publishDate = typeof date === 'string' ? new Date(date) : date;
  const diffInHours = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60);
  
  if (diffInHours <= 1) return 'freshness-hot'; // Red/urgent
  if (diffInHours <= 6) return 'freshness-fresh'; // Orange
  if (diffInHours <= 24) return 'freshness-recent'; // Blue
  if (diffInHours <= 72) return 'freshness-standard'; // Gray
  return 'freshness-archive'; // Light gray
}