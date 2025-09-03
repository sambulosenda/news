export default function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsMediaOrganization",
        "@id": "https://reportfocusnews.com/#organization",
        "name": "Report Focus News",
        "alternateName": "RFN",
        "url": "https://reportfocusnews.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://reportfocusnews.com/logo.svg",
          "width": 600,
          "height": 60
        },
        "image": "https://reportfocusnews.com/og-image.jpg",
        "description": "Independent news coverage of South Africa and Zimbabwe",
        "foundingDate": "2018-09-27",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "ZA"
        },
        "sameAs": [
          "https://twitter.com/reportfocusnews",
          "https://facebook.com/reportfocusnews",
          "https://instagram.com/reportfocusnews",
          "https://linkedin.com/company/reportfocusnews"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "contact@reportfocusnews.com"
        },
        "ethicsPolicy": "https://reportfocusnews.com/ethics",
        "diversityPolicy": "https://reportfocusnews.com/diversity-policy",
        "correctionsPolicy": "https://reportfocusnews.com/corrections",
        "publishingPrinciples": "https://reportfocusnews.com/publishing-principles",
        "actionableFeedbackPolicy": "https://reportfocusnews.com/contact",
        "ownershipFundingInfo": "https://reportfocusnews.com/about/ownership",
        "areaServed": [
          {
            "@type": "Country",
            "name": "South Africa"
          },
          {
            "@type": "Country",  
            "name": "Zimbabwe"
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://reportfocusnews.com/#website",
        "url": "https://reportfocusnews.com",
        "name": "Report Focus News",
        "description": "Breaking news from South Africa and Zimbabwe",
        "publisher": {
          "@id": "https://reportfocusnews.com/#organization"
        },
        "inLanguage": "en-ZA",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://reportfocusnews.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}