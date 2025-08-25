import { SITE_CONFIG, SOCIAL_LINKS } from '@/constants';

// Site configuration
export const siteConfig = {
  ...SITE_CONFIG,
  url: `https://${SITE_CONFIG.domain}`,
  
  // Meta tags
  meta: {
    title: {
      default: SITE_CONFIG.name,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
      'news',
      'breaking news',
      'politics',
      'business',
      'technology',
      'sports',
      'entertainment',
      'world news',
    ],
  },
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: `https://${SITE_CONFIG.domain}`,
    siteName: SITE_CONFIG.name,
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: '@reportfocusnews',
    creator: '@reportfocusnews',
  },
  
  // Social links
  social: SOCIAL_LINKS,
  
  // Footer links
  footerLinks: {
    company: [
      { name: 'About', href: '/about' },
      { name: 'Team', href: '/about/team' },
      { name: 'Standards', href: '/about/standards' },
      { name: 'Ownership', href: '/about/ownership' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Ethics Policy', href: '/ethics' },
    ],
    resources: [
      { name: 'Contact', href: '/contact' },
      { name: 'Corrections', href: '/corrections' },
      { name: 'Accessibility', href: '/accessibility' },
      { name: 'Mobile Apps', href: '/mobile-apps' },
    ],
  },
} as const;