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
          '/search?*',
          '/*?utm_*',
          '/*?ref=*',
          '/tag/*', // Uncomment if you don't want tag pages indexed
        ],
      },
      {
        userAgent: 'Googlebot-News',
        allow: ['/', '/news/', '/20*'], // Allow news bot to access dated articles
      },
    ],
    sitemap: [
      'https://www.reportfocusnews.com/sitemap.xml',
      'https://www.reportfocusnews.com/news-sitemap.xml',
    ],
  };
}