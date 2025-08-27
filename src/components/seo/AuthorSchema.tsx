import { getAuthorBySlug } from '@/data/authors';

interface AuthorSchemaProps {
  authorName?: string;
  authorSlug?: string;
}

/**
 * Author structured data for Google News
 * Establishes author credibility and expertise
 */
export default function AuthorSchema({ authorName, authorSlug }: AuthorSchemaProps) {
  if (!authorName) return null;
  
  const slug = authorSlug || authorName.toLowerCase().replace(/\s+/g, '-');
  const author = getAuthorBySlug(slug);
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author.name || authorName,
    "url": `https://reportfocusnews.com/author/${slug}/`,
    ...(author.title && { "jobTitle": author.title }),
    ...(author.email && { "email": author.email }),
    ...(author.bio && { "description": author.bio }),
    ...(author.avatar && {
      "image": {
        "@type": "ImageObject",
        "url": `https://reportfocusnews.com${author.avatar.url}`,
        "caption": author.name
      }
    }),
    "worksFor": {
      "@type": "NewsMediaOrganization",
      "name": "Report Focus News",
      "url": "https://reportfocusnews.com"
    },
    ...(author.expertise && {
      "knowsAbout": author.expertise
    }),
    ...(author.awards && author.awards.length > 0 && {
      "award": author.awards
    }),
    ...(author.education && {
      "alumniOf": {
        "@type": "EducationalOrganization", 
        "name": author.education
      }
    }),
    "sameAs": [
      author.twitter && `https://twitter.com/${author.twitter}`,
      author.linkedin && `https://linkedin.com/in/${author.linkedin}`
    ].filter(Boolean)
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}