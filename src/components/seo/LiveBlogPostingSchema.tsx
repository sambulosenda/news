interface LiveUpdate {
  headline: string;
  datePublished: string;
  articleBody: string;
  author?: {
    name: string;
    url?: string;
  };
}

interface LiveBlogPostingSchemaProps {
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  coverageStartTime: string;
  coverageEndTime?: string;
  updates: LiveUpdate[];
  url: string;
  isLive?: boolean;
  keywords?: string[];
  location?: {
    name: string;
    address?: string;
  };
}

export default function LiveBlogPostingSchema({
  headline,
  description,
  datePublished,
  dateModified,
  coverageStartTime,
  coverageEndTime,
  updates,
  url,
  isLive = true,
  keywords,
  location,
}: LiveBlogPostingSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LiveBlogPosting',
    '@id': url,
    headline,
    description,
    datePublished,
    dateModified,
    coverageStartTime,
    ...(coverageEndTime && { coverageEndTime }),
    ...(keywords && { keywords: keywords.join(', ') }),
    ...(location && {
      location: {
        '@type': 'Place',
        name: location.name,
        ...(location.address && { address: location.address }),
      },
    }),
    liveBlogUpdate: updates.map((update, index) => ({
      '@type': 'BlogPosting',
      '@id': `${url}#update-${index + 1}`,
      headline: update.headline,
      datePublished: update.datePublished,
      articleBody: update.articleBody,
      ...(update.author && {
        author: {
          '@type': 'Person',
          name: update.author.name,
          ...(update.author.url && { url: update.author.url }),
        },
      }),
    })),
    publisher: {
      '@type': 'NewsMediaOrganization',
      '@id': 'https://reportfocusnews.com/#organization',
      name: 'Report Focus News',
      logo: {
        '@type': 'ImageObject',
        url: 'https://reportfocusnews.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    isAccessibleForFree: true,
    isLiveBlog: isLive,
    potentialAction: {
      '@type': 'ReadAction',
      target: url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}