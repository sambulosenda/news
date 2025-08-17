import Link from 'next/link';

const footerLinks = {
  news: {
    title: 'News',
    links: [
      { name: 'Politics', href: '/category/politics' },
      { name: 'Business', href: '/category/business' },
      { name: 'Technology', href: '/category/technology' },
      { name: 'World', href: '/category/world' },
      { name: 'Sports', href: '/category/sports' },
    ],
  },
  opinion: {
    title: 'Opinion',
    links: [
      { name: 'Editorials', href: '/category/editorials' },
      { name: 'Op-Ed', href: '/category/op-ed' },
      { name: 'Letters', href: '/category/letters' },
      { name: 'Guest Essays', href: '/category/guest-essays' },
    ],
  },
  arts: {
    title: 'Arts',
    links: [
      { name: 'Books', href: '/category/books' },
      { name: 'Movies', href: '/category/movies' },
      { name: 'Music', href: '/category/music' },
      { name: 'Television', href: '/category/television' },
      { name: 'Theater', href: '/category/theater' },
    ],
  },
  more: {
    title: 'More',
    links: [
      { name: 'Reader Center', href: '/reader-center' },
      { name: 'The Learning Network', href: '/learning' },
      { name: 'Tools & Services', href: '/tools' },
      { name: 'Multimedia', href: '/multimedia' },
      { name: 'Photography', href: '/photography' },
    ],
  },
};

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Careers', href: '/careers' },
  { name: 'Advertise', href: '/advertise' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Help', href: '/help' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t-2 border-gray-900 mt-16">
      {/* Newsletter Section */}
      <div className="container-wide py-8 border-b border-gray-200">
        <div className="max-w-2xl">
          <h3 className="font-serif text-2xl font-bold mb-2">
            Get the Report Focus Newsletter
          </h3>
          <p className="text-gray-600 mb-4">
            The most important news stories of the day, curated by our editors and delivered every morning.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Links Section */}
      <div className="container-wide py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-bold text-sm uppercase tracking-wide mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Subscribe Section */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide mb-4">
              Subscribe
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/subscribe/digital"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Digital Subscriptions
                </Link>
              </li>
              <li>
                <Link
                  href="/subscribe/home-delivery"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Home Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/subscribe/gift"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Gift Subscriptions
                </Link>
              </li>
              <li>
                <Link
                  href="/subscribe/group"
                  className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
                >
                  Group Subscriptions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container-wide py-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="font-display text-2xl font-bold">
              Report Focus
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
            {companyLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-gray-900 hover:underline"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Report Focus News. All rights reserved.
        </div>
      </div>
    </footer>
  );
}