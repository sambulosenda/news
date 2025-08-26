// Application routes
export const ROUTES = {
  home: '/',
  search: '/search',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  mobileApps: '/mobile-apps',
  
  // Dynamic routes
  post: (slug: string) => `/post/${slug}`,
  category: (slug: string) => `/news/${slug}`,
  author: (slug: string) => `/author/${slug}`,
  
  // API routes
  api: {
    revalidate: '/api/revalidate',
    relatedPosts: '/api/related-posts',
  },
  
  // Static pages
  faq: {
    main: '/faq',
    economy: '/faq/economy',
    elections: '/faq/elections',
    government: '/faq/government',
    immigration: '/faq/immigration',
    loadShedding: '/faq/load-shedding',
    safety: '/faq/safety',
  },
  
  // Feed routes
  rss: '/rss.xml',
  feed: '/feed.xml',
  sitemap: '/sitemap.xml',
  newsSitemap: '/news-sitemap.xml',
} as const;