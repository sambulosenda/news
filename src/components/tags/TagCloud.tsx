import Link from 'next/link';
import { fetchGraphQLCached } from '@/lib/api/graphql-cache';
import { GET_POPULAR_TAGS } from '@/lib/queries/tags';

interface TagCloudProps {
  limit?: number;
  title?: string;
  className?: string;
}

export default async function TagCloud({ 
  limit = 20, 
  title = 'Popular Tags',
  className = '' 
}: TagCloudProps) {
  // Fetch popular tags
  const tagsData = await fetchGraphQLCached(
    GET_POPULAR_TAGS,
    { first: limit },
    { ttl: 3600 } // 1 hour cache
  );

  const tags = tagsData?.tags?.edges || [];

  if (tags.length === 0) {
    return null;
  }

  // Calculate max count for sizing
  const maxCount = Math.max(...tags.map((edge: any) => edge.node.count || 0));

  // Size calculation for tag cloud effect
  const getTagSize = (count: number): string => {
    const ratio = count / maxCount;
    if (ratio > 0.8) return 'text-lg font-semibold';
    if (ratio > 0.6) return 'text-base font-medium';
    if (ratio > 0.4) return 'text-sm font-medium';
    return 'text-sm';
  };

  // Color variety
  const getTagColor = (index: number): string => {
    const colors = [
      'text-red-600 hover:text-red-700',
      'text-blue-600 hover:text-blue-700',
      'text-gray-700 hover:text-gray-900',
      'text-green-600 hover:text-green-700',
      'text-purple-600 hover:text-purple-700',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className={`bg-white rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((edge: any, index: number) => {
          const tag = edge.node;
          return (
            <Link
              key={tag.id}
              href={`/tag/${tag.slug}/`}
              className={`inline-block transition-all duration-200 hover:scale-105 ${getTagSize(tag.count)} ${getTagColor(index)}`}
              title={`${tag.count} articles`}
            >
              #{tag.name}
            </Link>
          );
        })}
      </div>
      <Link 
        href="/tags" 
        className="inline-block mt-4 text-sm text-red-600 hover:text-red-700 font-medium"
      >
        View all tags →
      </Link>
    </div>
  );
}