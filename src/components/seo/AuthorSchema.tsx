import { enrichAuthor } from '@/lib/utils/author-enrichment';

interface AuthorSchemaProps {
  authorName?: string;
  authorSlug?: string;
  authorDescription?: string;
  authorAvatar?: string;
}

/**
 * Author structured data for Google News
 * Handles both individual journalists and news agencies
 */
export default function AuthorSchema({ 
  authorName, 
  authorSlug,
  authorDescription,
  authorAvatar
}: AuthorSchemaProps) {
  if (!authorName) return null;
  
  const slug = authorSlug || authorName.toLowerCase().replace(/\s+/g, '-');
  
  // Enrich author data for better E-E-A-T signals
  const author = enrichAuthor({
    name: authorName,
    slug: slug,
    bio: authorDescription,
    avatar: authorAvatar
  });
  
  // Build schema based on whether it's a person or news agency
  const schema = author.isNewsAgency ? {
    // News Agency Schema
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": author.name,
    "url": `https://reportfocusnews.com/author/${slug}/`,
    ...(author.bio && { "description": author.bio }),
    ...(author.avatar && {
      "logo": {
        "@type": "ImageObject",
        "url": author.avatar,
        "caption": author.name
      }
    }),
    "publishingPrinciples": "https://reportfocusnews.com/publishing-principles/",
    "ownershipFundingInfo": "https://reportfocusnews.com/about/",
    "actionableFeedbackPolicy": "https://reportfocusnews.com/contact/"
  } : {
    // Individual Journalist Schema
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author.name,
    "url": `https://reportfocusnews.com/author/${slug}/`,
    ...(author.bio && { "description": author.bio }),
    ...(author.avatar && {
      "image": {
        "@type": "ImageObject",
        "url": author.avatar,
        "caption": author.name
      }
    }),
    "worksFor": {
      "@type": "NewsMediaOrganization",
      "name": "Report Focus News",
      "url": "https://reportfocusnews.com"
    },
    "jobTitle": author.jobTitle || "Journalist",
    ...(author.expertise && author.expertise.length > 0 && {
      "knowsAbout": author.expertise
    }),
    ...(author.education && {
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": author.education
      }
    }),
    ...(author.awards && author.awards.length > 0 && {
      "award": author.awards
    }),
    ...(author.verified && {
      "identifier": {
        "@type": "PropertyValue",
        "name": "Verified Journalist",
        "value": "true"
      }
    }),
    ...(author.twitter && {
      "sameAs": [`https://twitter.com/${author.twitter.replace('@', '')}`]
    })
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}