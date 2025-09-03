'use client';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQPageSchemaProps {
  faqs: FAQItem[];
  title: string;
  url: string;
}

export default function FAQPageSchema({ faqs, title, url }: FAQPageSchemaProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faqpage`,
    'name': title,
    'url': url,
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://reportfocusnews.com' },
        { '@type': 'ListItem', 'position': 2, 'name': 'FAQ', 'item': 'https://reportfocusnews.com/faq' },
        { '@type': 'ListItem', 'position': 3, 'name': title, 'item': url }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}