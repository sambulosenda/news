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
          '/search',  // Block all search pages
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
      // Block AI bots from scraping content for training
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
      {
        userAgent: 'cohere-ai',
        disallow: '/',
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        disallow: '/',
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
    ],
    sitemap: 'https://reportfocusnews.com/sitemap-index.xml',
    host: 'https://reportfocusnews.com',
  };
}