import Link from 'next/link';

const footerSections = {
  news: {
    title: 'News',
    links: [
      { name: 'Breaking News', href: '/news/breaking-news/' },
      { name: 'Politics', href: '/news/politics/' },
      { name: 'Business', href: '/news/business/' },
      { name: 'Technology', href: '/news/technology/' },
      { name: 'World', href: '/news/world/' },
      { name: 'Sports', href: '/news/sports/' },
      { name: 'Health', href: '/news/health/' },
      { name: 'Science', href: '/news/science/' },
    ],
  },
  opinion: {
    title: 'Opinion & Analysis',
    links: [
      { name: 'Latest Articles', href: '/news/world/' },
      { name: 'Business Analysis', href: '/news/business/' },
      { name: 'Political Commentary', href: '/news/politics/' },
      { name: 'Tech Insights', href: '/news/technology/' },
    ],
  },
  regions: {
    title: 'FAQ Hub',
    links: [
      { name: 'Load Shedding', href: '/faq/load-shedding' },
      { name: 'Elections Guide', href: '/faq/elections' },
      { name: 'Economy & Finance', href: '/faq/economy' },
      { name: 'Immigration & Visas', href: '/faq/immigration' },
      { name: 'Government Services', href: '/faq/government' },
      { name: 'Crime & Safety', href: '/faq/safety' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'RSS Feed', href: '/rss.xml' },
      { name: 'News Sitemap', href: '/news-sitemap.xml' },
      { name: 'Main Sitemap', href: '/sitemap.xml' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Ethics Policy', href: '/ethics' },
    ],
  },
  company: {
    title: 'About Report Focus',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Editorial Standards', href: '/about/standards' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
      { name: 'Corrections', href: '/corrections' },
      { name: 'Contact Us', href: '/contact' },
    ],
  },
};

const newsletters = [
  { name: 'Morning Briefing', description: 'Daily news digest delivered at 6 AM', href: '#' },
  { name: 'Evening Wrap', description: 'Top stories summary each evening', href: '#' },
  { name: 'Weekend Edition', description: 'Deep dives and analysis every Saturday', href: '#' },
  { name: 'Breaking News Alerts', description: 'Instant notifications for major stories', href: '#' },
];

const socialLinks = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
  { name: 'YouTube', href: '#', icon: 'youtube' },
  { name: 'RSS', href: '/rss.xml', icon: 'rss' },
];

const appLinks = [
  { name: 'iOS App', href: '#', platform: 'apple' },
  { name: 'Android App', href: '#', platform: 'google' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Cookie Policy', href: '/cookies' },
  { name: 'Accessibility', href: '/accessibility' },
  { name: 'Ethics Policy', href: '/ethics' },
  { name: 'Corrections', href: '/corrections' },
];

// Social Media Icons Component
const SocialIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const iconPaths = {
    facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    twitter: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
    instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    rss: 'M4.259 23.467c-2.35 0-4.259-1.917-4.259-4.252 0-2.349 1.909-4.244 4.259-4.244 2.349 0 4.244 1.895 4.244 4.244 0 2.335-1.895 4.252-4.244 4.252zM0.005 10.873v6.133c3.993 0 7.749 1.562 10.577 4.391 2.825 2.822 4.384 6.595 4.384 10.603h6.16c0-11.651-9.478-21.127-21.121-21.127zM0.012 0v6.136c14.243 0 25.836 11.604 25.836 25.864h6.152c0-17.64-14.352-32-31.988-32z'
  };
  
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d={iconPaths[icon as keyof typeof iconPaths]} />
    </svg>
  );
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t-2 border-gray-900 mt-20" role="contentinfo">
      {/* Compact Newsletter Section */}
      <div className="bg-gray-900 text-white">
        <div className="container-wide py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <h3 className="font-serif text-xl font-bold mb-1">
                Get Report Focus News in your inbox
              </h3>
              <p className="text-gray-300 text-sm">
                Daily briefings, breaking news alerts, and weekend deep dives
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-white text-gray-900 placeholder-gray-500 w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-white"
                required
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-red-700 text-white font-semibold hover:bg-red-600 transition-colors whitespace-nowrap"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container-wide py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-3">
                {section.title}
              </h4>
              <nav>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 hover:underline text-sm transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Social Media & Apps Section */}
      <div className="container-wide py-6 border-t border-gray-200 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Media */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Follow us:</span>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-900 text-gray-700 hover:text-white transition-colors rounded"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <SocialIcon icon={social.icon} className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Apps */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Get the app:</span>
            <div className="flex gap-2">
              {appLinks.map((app) => (
                <Link
                  key={app.name}
                  href={app.href}
                  className="inline-flex items-center px-4 py-1.5 bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition-colors rounded"
                >
                  {app.platform === 'apple' ? 'iOS' : 'Android'}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compact Bottom Legal Section */}
      <div className="bg-gray-100 border-t border-gray-300">
        <div className="container-wide py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            {/* Copyright */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Report Focus News</span>
              <span>© {new Date().getFullYear()}</span>
              <span className="hidden sm:inline">• Independent journalism since 2024</span>
            </div>

            {/* Legal Links */}
            <nav className="flex flex-wrap justify-center gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-gray-900 hover:underline transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}