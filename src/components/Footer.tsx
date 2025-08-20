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
      { name: 'Editorials', href: '/opinion/editorials/' },
      { name: 'Op-Eds', href: '/opinion/op-eds/' },
      { name: 'Letters', href: '/opinion/letters/' },
      { name: 'Columnists', href: '/opinion/columnists/' },
    ],
  },
  services: {
    title: 'FAQ & Services',
    links: [
      { name: 'Load Shedding Schedule', href: '/faq/load-shedding' },
      { name: 'Elections Guide', href: '/faq/elections' },
      { name: 'Economy & Finance', href: '/faq/economy' },
      { name: 'Immigration & Visas', href: '/faq/immigration' },
      { name: 'Government Services', href: '/faq/government' },
      { name: 'Crime & Safety', href: '/faq/safety' },
    ],
  },
  more: {
    title: 'More',
    links: [
      { name: 'RSS Feed', href: '/rss.xml' },
      { name: 'News Sitemap', href: '/news-sitemap.xml' },
      { name: 'Search', href: '/search' },
      { name: 'FAQ Hub', href: '/faq' },
      { name: 'Accessibility', href: '/accessibility' },
      { name: 'Corrections', href: '/corrections' },
    ],
  },
  company: {
    title: 'Report Focus',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/about/team' },
      { name: 'Editorial Standards', href: '/about/standards' },
      { name: 'Ownership & Funding', href: '/about/ownership' },
      { name: 'Contact', href: '/contact' },
      { name: 'Ethics Policy', href: '/ethics' },
    ],
  },
};

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/reportfocus', icon: 'facebook' },
  { name: 'Twitter', href: 'https://twitter.com/reportfocus', icon: 'twitter' },
  { name: 'Instagram', href: 'https://instagram.com/reportfocus', icon: 'instagram' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/reportfocus', icon: 'linkedin' },
  { name: 'YouTube', href: 'https://youtube.com/reportfocus', icon: 'youtube' },
  { name: 'WhatsApp', href: 'https://wa.me/reportfocus', icon: 'whatsapp' },
];

const SocialIcon = ({ icon }: { icon: string }) => {
  const iconPaths: Record<string, string> = {
    facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    twitter: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
    instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
    youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    whatsapp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z'
  };
  
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d={iconPaths[icon]} />
    </svg>
  );
};

export default function Footer() {
  return (
    <footer className="bg-white mt-20" role="contentinfo">

      {/* Main Footer Content */}
      <div className="border-t border-gray-200">
        <div className="container-wide py-12">
          {/* Logo and Description */}
          <div className="text-center mb-10">
            <Link href="/" className="inline-block">
              <h2 className="font-display text-4xl font-bold text-gray-900 hover:text-red-700 transition-colors">
                Report Focus News
              </h2>
            </Link>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Your trusted source for independent journalism covering Southern Africa and beyond. 
              Delivering accurate, unbiased news since 2024.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
            {Object.entries(footerSections).map(([key, section]) => (
              <div key={key}>
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4 pb-2 border-b-2 border-red-700">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-red-700 text-sm transition-colors inline-flex items-center group"
                      >
                        <span className="w-0 group-hover:w-2 h-[1px] bg-red-700 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Social Media Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700">Connect with us:</span>
                <div className="flex gap-2">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-red-700 text-gray-700 hover:text-white rounded-full transition-all duration-200 hover:scale-110"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <SocialIcon icon={social.icon} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* App Download Buttons */}
              <div className="flex gap-3">
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-xs">
                    <div className="opacity-75">Download on</div>
                    <div className="font-semibold -mt-0.5">App Store</div>
                  </div>
                </a>
                
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                  </svg>
                  <div className="text-xs">
                    <div className="opacity-75">Get it on</div>
                    <div className="font-semibold -mt-0.5">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 text-gray-400">
        <div className="container-wide py-8">
          <div className="flex flex-col space-y-6">
            {/* Legal Links - Centered */}
            <nav className="flex flex-wrap justify-center text-sm">
              <Link href="/privacy" className="px-3 py-1 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-600 select-none">•</span>
              <Link href="/terms" className="px-3 py-1 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span className="text-gray-600 select-none">•</span>
              <Link href="/cookies" className="px-3 py-1 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <span className="text-gray-600 select-none">•</span>
              <Link href="/accessibility" className="px-3 py-1 hover:text-white transition-colors">
                Accessibility
              </Link>
              <span className="text-gray-600 select-none">•</span>
              <Link href="/ethics" className="px-3 py-1 hover:text-white transition-colors">
                Ethics Policy
              </Link>
              <span className="text-gray-600 select-none">•</span>
              <Link href="/sitemap.xml" className="px-3 py-1 hover:text-white transition-colors">
                Sitemap
              </Link>
            </nav>
            
            {/* Copyright - Centered */}
            <div className="text-center">
              <p className="text-sm">
                © 2025 Report Focus News. All rights reserved.
              </p>
              <p className="text-xs mt-2 text-gray-500">
                Independent journalism serving South Africa and Zimbabwe since 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}