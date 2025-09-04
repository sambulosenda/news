/**
 * Google News Publisher Schema
 * Critical for Google News Publisher Center compliance
 * This schema helps establish trust and authority signals
 */

export default function GoogleNewsPublisherSchema() {
  const publisherSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "@id": "https://reportfocusnews.com/#publisher",
    "name": "Report Focus News",
    "url": "https://reportfocusnews.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://reportfocusnews.com/logo.svg",
      "width": 800,
      "height": 200
    },
    // Critical Google News fields for trust signals
    "foundingDate": "2018-09-27",
    "diversityPolicy": "https://reportfocusnews.com/diversity-policy",
    "ethicsPolicy": "https://reportfocusnews.com/ethics-policy", 
    "masthead": "https://reportfocusnews.com/about/team",
    "missionCoveragePrioritiesPolicy": "https://reportfocusnews.com/editorial-standards",
    "correctionsPolicy": "https://reportfocusnews.com/corrections",
    "ownershipFundingInfo": "https://reportfocusnews.com/about/funding",
    "actionableFeedbackPolicy": "https://reportfocusnews.com/contact/editorial-feedback",
    "publishingPrinciples": "https://reportfocusnews.com/publishing-principles",
    
    // Geographic coverage for regional news authority
    "areaServed": [
      {
        "@type": "Country",
        "name": "South Africa",
        "alternateName": "ZA"
      },
      {
        "@type": "Country", 
        "name": "Zimbabwe",
        "alternateName": "ZW"
      }
    ],
    
    // Editorial expertise areas
    "knowsAbout": [
      "South African Politics",
      "Zimbabwe Politics", 
      "Southern African Business",
      "African Economics",
      "Regional Government Policy",
      "Elections",
      "Mining Industry",
      "Agriculture",
      "Infrastructure Development",
      "Education Policy",
      "Healthcare Systems",
      "Technology in Africa"
    ],
    
    // Contact information for editorial inquiries
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Editorial",
        "email": "editorial@reportfocusnews.com",
        "areaServed": ["ZA", "ZW"]
      },
      {
        "@type": "ContactPoint", 
        "contactType": "News Tips",
        "email": "editorial@reportfocusnews.com",
        "areaServed": ["ZA", "ZW"]
      }
    ],
    
    // Address for legal and verification purposes
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ZA",
      "addressRegion": "Gauteng",
      "addressLocality": "Johannesburg"
    },
    
    // Social media verification
    "sameAs": [
      "https://twitter.com/reportfocusnews",
      "https://facebook.com/reportfocusnews", 
      "https://linkedin.com/company/reportfocusnews"
    ],
    
    // Editorial standards and credibility
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": "Verified News Publisher",
      "credentialCategory": "Media Accreditation"
    },
    
    // News content types published
    "significantLink": [
      "https://reportfocusnews.com/news/politics/",
      "https://reportfocusnews.com/news/business/",
      "https://reportfocusnews.com/news/breaking/"
    ],
    
    // Language and audience
    "inLanguage": "en-ZA",
    "audience": {
      "@type": "Audience",
      "name": "Southern African News Readers",
      "audienceType": "General Public",
      "geographicArea": ["South Africa", "Zimbabwe", "Southern Africa"]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(publisherSchema) }}
    />
  );
}