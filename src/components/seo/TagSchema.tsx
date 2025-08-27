import Script from 'next/script';

interface TagSchemaProps {
  tag: {
    name: string;
    slug: string;
    description?: string;
    count?: number;
  };
  url: string;
  posts?: any[];
}

export default function TagSchema({ tag, url, posts = [] }: TagSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${tag.name} Articles & News`,
    description: tag.description || `Collection of articles tagged with ${tag.name}`,
    url: url,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.slice(0, 10).map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'NewsArticle',
          headline: post.title,
          url: `https://reportfocusnews.com/${post.date.substring(0, 4)}/${post.date.substring(5, 7)}/${post.date.substring(8, 10)}/${post.slug}/`,
          datePublished: post.date,
          dateModified: post.modified || post.date,
          author: {
            '@type': 'Person',
            name: post.author?.node?.name || 'Report Focus News'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Report Focus News',
            logo: {
              '@type': 'ImageObject',
              url: 'https://reportfocusnews.com/logo.png'
            }
          },
          image: post.featuredImage?.node?.sourceUrl ? {
            '@type': 'ImageObject',
            url: post.featuredImage.node.sourceUrl,
            width: post.featuredImage.node.mediaDetails?.width || 1200,
            height: post.featuredImage.node.mediaDetails?.height || 630
          } : undefined
        }
      })),
      numberOfItems: tag.count || posts.length
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': 'https://reportfocusnews.com/',
            name: 'Home'
          }
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': 'https://reportfocusnews.com/tags/',
            name: 'Tags'
          }
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@id': url,
            name: tag.name
          }
        }
      ]
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Report Focus News',
      url: 'https://reportfocusnews.com/',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://reportfocusnews.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  };

  return (
    <Script
      id={`tag-schema-${tag.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}