'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';

// Organized footer structure for SA/ZW news site
const footerSections = {
  saNews: {
    title: '🇿🇦 South Africa',
    links: [
      { name: 'Politics', href: '/news/politics/' },
      { name: 'Business', href: '/news/business/' },
      { name: 'Crime & Courts', href: '/news/crime/' },
      { name: 'Load Shedding', href: '/faq/load-shedding' },
      { name: 'Economy', href: '/faq/economy' },
    ],
  },
  zwNews: {
    title: '🇿🇼 Zimbabwe', 
    links: [
      { name: 'Politics', href: '/news/zimbabwe-politics/' },
      { name: 'Business', href: '/news/zimbabwe-business/' },
      { name: 'Economy', href: '/news/zimbabwe-economy/' },
      { name: 'Immigration', href: '/faq/immigration' },
      { name: 'Diaspora', href: '/news/diaspora/' },
    ],
  },
  topics: {
    title: '📰 Topics',
    links: [
      { name: 'Breaking News', href: '/news/breaking-news/' },
      { name: 'Technology', href: '/news/technology/' },
      { name: 'Sports', href: '/news/sports/' },
      { name: 'Health', href: '/news/health/' },
      { name: 'Entertainment', href: '/news/entertainment/' },
    ],
  },
  quickLinks: {
    title: '⚡ Quick Links',
    links: [
      { name: 'Elections Guide', href: '/faq/elections' },
      { name: 'Government Services', href: '/faq/government' },
      { name: 'Crime & Safety', href: '/faq/safety' },
      { name: 'Weather', href: '/weather' },
      { name: 'Exchange Rates', href: '/exchange-rates' },
    ],
  },
  about: {
    title: 'ℹ️ About',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/about/team' },
      { name: 'Contact', href: '/contact' },
      { name: 'Advertise', href: '/advertise' },
      { name: 'Work With Us', href: '/careers' },
    ],
  },
};

// Social Media Icons Component
const SocialIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const iconPaths = {
    facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    twitter: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
    whatsapp: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z',
    telegram: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
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

export default function FooterImproved() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 mt-20" role="contentinfo">
      {/* Newsletter Section with gradient background */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
          }} />
        </div>
        
        <div className="container-wide py-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-serif text-3xl lg:text-4xl font-bold mb-3">
              Stay Informed. Stay Ahead.
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Get breaking news from South Africa & Zimbabwe delivered to your inbox
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-6 py-3 bg-white/10 backdrop-blur text-white placeholder-gray-400 border border-white/20 rounded-lg focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all"
                required
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                disabled={subscribeStatus === 'loading'}
                className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {subscribeStatus === 'loading' ? 'Subscribing...' : 
                 subscribeStatus === 'success' ? '✓ Subscribed!' : 
                 'Subscribe Free'}
              </button>
            </form>
            
            {subscribeStatus === 'success' && (
              <p className="text-green-400 mt-3 animate-fade-in">
                Thank you! Check your email to confirm subscription.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
                <span className="text-lg">{section.title.split(' ')[0]}</span>
                <span>{section.title.split(' ').slice(1).join(' ')}</span>
              </h4>
              <nav>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
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

        {/* Trust Indicators */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h5 className="font-bold text-gray-900 mb-2">Trusted Since 2024</h5>
              <p className="text-sm text-gray-600">
                Independent journalism covering Southern Africa with integrity
              </p>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-2">24/7 Coverage</h5>
              <p className="text-sm text-gray-600">
                Breaking news updates around the clock from SA & Zimbabwe
              </p>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-2">Multi-Platform</h5>
              <p className="text-sm text-gray-600">
                Read on web, mobile, or get our apps for iOS and Android
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social & Apps Section with better styling */}
      <div className="bg-white border-y border-gray-200">
        <div className="container-wide py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Social Media */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Connect With Us</span>
              <div className="flex gap-2">
                {[
                  { name: 'Facebook', icon: 'facebook', href: '#' },
                  { name: 'Twitter', icon: 'twitter', href: '#' },
                  { name: 'WhatsApp', icon: 'whatsapp', href: '#' },
                  { name: 'Telegram', icon: 'telegram', href: '#' },
                  { name: 'LinkedIn', icon: 'linkedin', href: '#' },
                  { name: 'YouTube', icon: 'youtube', href: '#' },
                  { name: 'RSS', icon: 'rss', href: '/rss.xml' },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-900 text-gray-700 hover:text-white transition-all duration-200 rounded-lg hover:scale-110"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <SocialIcon icon={social.icon} className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* App Downloads */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Download Our App</span>
              <div className="flex gap-3">
                <Link
                  href="#"
                  className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on</div>
                    <div className="text-sm font-semibold -mt-1">App Store</div>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-semibold -mt-1">Google Play</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 text-white">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            {/* Copyright */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">Report Focus News</span>
              <span className="text-gray-400">© {new Date().getFullYear()}</span>
              <span className="hidden sm:inline text-gray-400">• Your trusted source for Southern African news</span>
            </div>

            {/* Legal Links */}
            <nav className="flex flex-wrap justify-center gap-4 text-gray-400">
              {[
                { name: 'Privacy', href: '/privacy' },
                { name: 'Terms', href: '/terms' },
                { name: 'Cookies', href: '/cookies' },
                { name: 'Ethics', href: '/ethics' },
                { name: 'Corrections', href: '/corrections' },
                { name: 'RSS', href: '/rss.xml' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-white transition-colors"
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