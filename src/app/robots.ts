import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/wp-admin/',
          '/*?utm_*',
          '/*?ref=*',
          '/tag/*',
          '/*?preview=*',
          '/*?draft=*',
        ],
      },
      {
        userAgent: 'Googlebot-News',
        allow: [
          '/', 
          '/news/', 
          '/20*',  // Year-based URLs (2024, 2025, etc.)
          '/news/politics/',
          '/news/business/',
          '/news/breaking-news/',
          '/news/south-africa/',
          '/news/zimbabwe/',
        ],
        disallow: [
          '/search*',
          '/tag/*',
          '/*?preview=*',
          '/*?draft=*',
        ],
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
    ],
    sitemap: 'https://reportfocusnews.com/sitemap-index.xml',
    host: 'https://reportfocusnews.com',
  };
}