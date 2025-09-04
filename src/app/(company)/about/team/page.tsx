import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Editorial Team & Masthead - Report Focus News',
  description: 'Meet the editorial team behind Report Focus News. Our journalists, editors, and contributors covering South Africa and Zimbabwe.',
  keywords: 'Report Focus News team, editorial staff, journalists, editors, masthead, newsroom team',
  alternates: {
    canonical: 'https://reportfocusnews.com/about/team',
  },
};

// This would typically come from a CMS or database
const editorialTeam = {
  leadership: [
    {
      name: 'Sarah Mitchell',
      role: 'Editor-in-Chief',
      bio: 'Award-winning journalist with 20 years of experience covering Southern African politics and economics.',
      email: 'editorial@reportfocusnews.com',
      twitter: '@sarahmitchell',
      image: '/team/sarah-mitchell.jpg',
    },
    {
      name: 'Thomas Ndlovu',
      role: 'Managing Editor',
      bio: 'Former Reuters correspondent with expertise in African business and financial markets.',
      email: 'editorial@reportfocusnews.com',
      twitter: '@thomasndlovu',
      image: '/team/thomas-ndlovu.jpg',
    },
    {
      name: 'Rebecca Dube',
      role: 'Deputy Editor',
      bio: 'Specializes in investigative journalism and social justice reporting across Southern Africa.',
      email: 'editorial@reportfocusnews.com',
      twitter: '@rebeccadube',
      image: '/team/rebecca-dube.jpg',
    },
  ],
  editors: [
    {
      name: 'James Mpofu',
      role: 'Politics Editor',
      bio: 'Covers parliamentary affairs, elections, and governance in SA and Zimbabwe.',
      email: 'editorial@reportfocusnews.com',
    },
    {
      name: 'Priya Naidoo',
      role: 'Business Editor',
      bio: 'Financial journalist covering JSE, ZSE, and regional economic development.',
      email: 'editorial@reportfocusnews.com',
    },
    {
      name: 'David Moyo',
      role: 'Sports Editor',
      bio: 'Sports journalism veteran covering cricket, rugby, and football.',
      email: 'editorial@reportfocusnews.com',
    },
    {
      name: 'Lisa van der Merwe',
      role: 'Digital Editor',
      bio: 'Leads our digital strategy and multimedia content production.',
      email: 'editorial@reportfocusnews.com',
    },
  ],
  reporters: [
    {
      name: 'Michael Sibanda',
      role: 'Senior Political Reporter',
      location: 'Harare',
    },
    {
      name: 'Amanda Kruger',
      role: 'Economics Correspondent',
      location: 'Johannesburg',
    },
    {
      name: 'Fortune Mguni',
      role: 'Court Reporter',
      location: 'Bulawayo',
    },
    {
      name: 'Thandiwe Moyo',
      role: 'Health & Science Reporter',
      location: 'Cape Town',
    },
    {
      name: 'Peter Olwagen',
      role: 'Crime Reporter',
      location: 'Durban',
    },
    {
      name: 'Grace Mutandwa',
      role: 'Education Reporter',
      location: 'Pretoria',
    },
  ],
};

export default function EditorialTeam() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-6xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-4">
            Editorial Team & Masthead
          </h1>
          
          <p className="text-xl text-gray-700 mb-12">
            Report Focus News is produced by a team of experienced journalists committed to 
            delivering accurate, timely, and impactful news from South Africa and Zimbabwe.
          </p>

          {/* Leadership Section */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-4">
              Editorial Leadership
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {editorialTeam.leadership.map((person) => (
                <div key={person.name} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="mb-4">
                    {/* Placeholder for actual images */}
                    <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-center">
                    {person.name}
                  </h3>
                  <p className="text-red-600 font-semibold text-center mb-3">
                    {person.role}
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    {person.bio}
                  </p>
                  <div className="text-center space-y-1">
                    <a 
                      href={`mailto:${person.email}`}
                      className="block text-sm text-blue-600 hover:underline"
                    >
                      {person.email}
                    </a>
                    {person.twitter && (
                      <a 
                        href={`https://twitter.com/${person.twitter.replace('@', '')}`}
                        className="block text-sm text-gray-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {person.twitter}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section Editors */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-4">
              Section Editors
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {editorialTeam.editors.map((person) => (
                <div key={person.name} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-serif text-lg font-bold">
                    {person.name}
                  </h3>
                  <p className="text-red-600 font-semibold mb-2">
                    {person.role}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    {person.bio}
                  </p>
                  <a 
                    href={`mailto:${person.email}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {person.email}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Reporters */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-8 border-b-2 border-gray-200 pb-4">
              Reporting Team
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {editorialTeam.reporters.map((person) => (
                <div key={person.name} className="border-l-4 border-red-600 pl-4 py-2">
                  <h3 className="font-semibold">
                    {person.name}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {person.role}
                  </p>
                  <p className="text-xs text-gray-500">
                    📍 {person.location}
                  </p>
                </div>
              ))}
            </div>
          </section>


          {/* Contact Information */}
          <section className="mb-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="font-serif text-2xl font-bold mb-4">
              Contact Our Newsroom
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">General Editorial</h3>
                <p className="text-sm text-gray-700">
                  <strong>Email:</strong> newsroom@reportfocusnews.com<br />
                  <strong>Phone:</strong> +27 11 XXX XXXX<br />
                  <strong>WhatsApp:</strong> +27 XX XXX XXXX
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3">News Tips</h3>
                <p className="text-sm text-gray-700">
                  <strong>Email:</strong> editorial@reportfocusnews.com<br />
                  <strong>SecureDrop:</strong> Available for sensitive information<br />
                  <strong>Signal:</strong> +27 XX XXX XXXX
                </p>
              </div>
            </div>
          </section>

          {/* Editorial Standards Link */}
          <section className="bg-gray-900 text-white p-8 rounded-lg">
            <h2 className="font-serif text-2xl font-bold mb-4">
              Our Commitment
            </h2>
            <p className="mb-6">
              Every member of our editorial team is committed to the highest standards of 
              journalism. We adhere to strict editorial guidelines and ethical principles 
              to ensure accurate, fair, and independent reporting.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/about/standards" 
                className="bg-white text-gray-900 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
              >
                Editorial Standards →
              </Link>
              <Link 
                href="/ethics" 
                className="bg-white text-gray-900 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
              >
                Ethics Policy →
              </Link>
              <Link 
                href="/corrections" 
                className="bg-white text-gray-900 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
              >
                Corrections Policy →
              </Link>
            </div>
          </section>

          {/* Last Updated */}
          <div className="mt-8 text-sm text-gray-500 text-center">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>This masthead is updated regularly to reflect our current editorial team.</p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}