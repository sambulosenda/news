import Link from 'next/link';
import { fetchGraphQLCached } from '@/lib/api/graphql-cache';
import { GET_RELATED_TAGS } from '@/lib/queries/tags';

interface RelatedTagsProps {
  currentTagSlug: string;
  currentTagName?: string;
}

export default async function RelatedTags({ currentTagSlug }: RelatedTagsProps) {
  // Fetch related tags
  const relatedData = await fetchGraphQLCached(
    GET_RELATED_TAGS,
    { tagSlug: currentTagSlug, first: 15 },
    { ttl: 3600 } // 1 hour cache
  );

  // Extract and deduplicate tags
  const relatedTagsMap = new Map();
  
  relatedData?.posts?.edges?.forEach((edge: any) => {
    edge.node.tags?.edges?.forEach((tagEdge: any) => {
      const tag = tagEdge.node;
      if (tag.slug !== currentTagSlug && !relatedTagsMap.has(tag.slug)) {
        relatedTagsMap.set(tag.slug, tag);
      }
    });
  });

  const relatedTags = Array.from(relatedTagsMap.values())
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, 10);

  if (relatedTags.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-100 py-6 border-b">
      <div className="container-wide">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-sm font-medium text-gray-600">Related Topics:</span>
          <div className="flex flex-wrap gap-2">
            {relatedTags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/tag/${tag.slug}/`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white hover:bg-gray-50 text-gray-700 hover:text-red-600 rounded-full text-sm font-medium transition-colors border border-gray-200 hover:border-red-200"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {tag.name}
                {tag.count > 0 && (
                  <span className="text-xs text-gray-500">({tag.count})</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}