interface VideoObjectSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string | string[];
  uploadDate: string;
  duration?: string; // ISO 8601 format, e.g., "PT1M33S"
  contentUrl?: string;
  embedUrl?: string;
  url: string;
  author?: {
    name: string;
    url?: string;
  };
  interactionStatistic?: {
    watchCount?: number;
    likeCount?: number;
    commentCount?: number;
  };
  keywords?: string[];
  transcript?: string;
  inLanguage?: string;
  region?: string[];
}

export default function VideoObjectSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  url,
  author,
  interactionStatistic,
  keywords,
  transcript,
  inLanguage = 'en-ZA',
  region = ['ZA', 'ZW'],
}: VideoObjectSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: Array.isArray(thumbnailUrl) ? thumbnailUrl : [thumbnailUrl],
    uploadDate,
    ...(duration && { duration }),
    ...(contentUrl && { contentUrl }),
    ...(embedUrl && { embedUrl }),
    url,
    ...(author && {
      author: {
        '@type': 'Person',
        name: author.name,
        ...(author.url && { url: author.url }),
      },
    }),
    publisher: {
      '@type': 'NewsMediaOrganization',
      '@id': 'https://reportfocusnews.com/#organization',
      name: 'Report Focus News',
      logo: {
        '@type': 'ImageObject',
        url: 'https://reportfocusnews.com/logo.png',
      },
    },
    ...(interactionStatistic && {
      interactionStatistic: [
        ...(interactionStatistic.watchCount
          ? [
              {
                '@type': 'InteractionCounter',
                interactionType: { '@type': 'WatchAction' },
                userInteractionCount: interactionStatistic.watchCount,
              },
            ]
          : []),
        ...(interactionStatistic.likeCount
          ? [
              {
                '@type': 'InteractionCounter',
                interactionType: { '@type': 'LikeAction' },
                userInteractionCount: interactionStatistic.likeCount,
              },
            ]
          : []),
        ...(interactionStatistic.commentCount
          ? [
              {
                '@type': 'InteractionCounter',
                interactionType: { '@type': 'CommentAction' },
                userInteractionCount: interactionStatistic.commentCount,
              },
            ]
          : []),
      ],
    }),
    ...(keywords && { keywords: keywords.join(', ') }),
    ...(transcript && { transcript }),
    inLanguage,
    regionsAllowed: region,
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    potentialAction: {
      '@type': 'WatchAction',
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