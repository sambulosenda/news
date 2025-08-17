import { Metadata } from 'next';
import Link from 'next/link';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'FAQ Hub - Frequently Asked Questions | Report Focus News',
  description: 'Find answers to frequently asked questions about South Africa and Zimbabwe. Load shedding, elections, economy, visas, and more.',
  keywords: 'FAQ South Africa, FAQ Zimbabwe, frequently asked questions, help center, load shedding FAQ, elections FAQ, economy FAQ',
  alternates: {
    canonical: 'https://reportfocusnews.com/faq',
  },
};

const faqCategories = [
  {
    title: 'Load Shedding',
    slug: 'load-shedding',
    description: 'Everything about power cuts, schedules, and stages',
    icon: '⚡',
    popular: true,
    questions: [
      'What are load shedding stages?',
      'How to check schedule?',
      'Why does SA have load shedding?',
    ],
  },
  {
    title: 'Elections & Voting',
    slug: 'elections',
    description: 'Voter registration, requirements, and election dates',
    icon: '🗳️',
    popular: true,
    questions: [
      'How to register to vote?',
      'When are next elections?',
      'What documents needed?',
    ],
  },
  {
    title: 'Economy & Finance',
    slug: 'economy',
    description: 'Exchange rates, fuel prices, inflation, and investments',
    icon: '💰',
    popular: true,
    questions: [
      'Current rand to dollar rate?',
      'Why fuel prices increasing?',
      'How to invest in JSE?',
    ],
  },
  {
    title: 'Immigration & Visas',
    slug: 'immigration',
    description: 'Visa requirements, permits, and travel documents',
    icon: '✈️',
    popular: false,
    questions: [
      'SA visa requirements',
      'Zimbabwe visa process',
      'Work permit applications',
    ],
  },
  {
    title: 'Government Services',
    slug: 'government',
    description: 'ID documents, licenses, grants, and public services',
    icon: '🏛️',
    popular: false,
    questions: [
      'How to apply for ID?',
      'SASSA grant applications',
      'License renewal process',
    ],
  },
  {
    title: 'Crime & Safety',
    slug: 'safety',
    description: 'Emergency numbers, crime reporting, and safety tips',
    icon: '🚨',
    popular: false,
    questions: [
      'Emergency contact numbers',
      'How to report crime',
      'Safety tips for tourists',
    ],
  },
];

export default function FAQHub() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-4 text-center">
            Frequently Asked Questions
          </h1>
          
          <p className="text-xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Find quick answers to common questions about South Africa and Zimbabwe. 
            From load shedding schedules to election information, we've got you covered.
          </p>

          {/* Popular FAQs */}
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-6">
              Most Popular FAQs
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {faqCategories.filter(cat => cat.popular).map((category) => (
                <Link
                  key={category.slug}
                  href={`/faq/${category.slug}`}
                  className="block bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-red-600 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{category.icon}</span>
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                      POPULAR
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {category.questions.map((q, idx) => (
                      <li key={idx}>• {q}</li>
                    ))}
                  </ul>
                  <p className="text-red-600 font-semibold mt-4">
                    View all questions →
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* All FAQ Categories */}
          <section>
            <h2 className="font-serif text-2xl font-bold mb-6">
              All FAQ Categories
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {faqCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/faq/${category.slug}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-semibold">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Quick Links */}
          <section className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h2 className="font-serif text-2xl font-bold mb-4">
              Didn't Find Your Answer?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Contact Newsroom</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Have a news tip or story idea?
                </p>
                <a href="mailto:news@reportfocusnews.com" className="text-red-600 hover:underline">
                  news@reportfocusnews.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-2">General Inquiries</h3>
                <p className="text-sm text-gray-700 mb-2">
                  For other questions and feedback
                </p>
                <a href="mailto:info@reportfocusnews.com" className="text-red-600 hover:underline">
                  info@reportfocusnews.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Browse News</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Stay updated with latest news
                </p>
                <Link href="/" className="text-red-600 hover:underline">
                  Go to Homepage
                </Link>
              </div>
            </div>
          </section>

          {/* SEO Content */}
          <section className="mt-12 prose prose-lg max-w-none">
            <h2 className="font-serif text-2xl font-bold mb-4">
              About Our FAQ Section
            </h2>
            <p className="text-gray-700">
              Report Focus News FAQ section provides quick, reliable answers to common questions about 
              life in South Africa and Zimbabwe. Our frequently asked questions cover essential topics 
              that affect daily life, from understanding load shedding stages to navigating election 
              processes, economic indicators, and government services.
            </p>
            <p className="text-gray-700">
              We update our FAQs regularly to reflect current information, policy changes, and emerging 
              issues. Whether you're a resident, visitor, or interested observer of Southern African 
              affairs, our FAQ section helps you find accurate, timely information quickly.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}