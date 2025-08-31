import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - Trusted SA & Zimbabwe News Since 2024',
  description: 'Report Focus News: Southern Africa\'s trusted independent news source. Award-winning journalism covering SA & Zimbabwe since 2024. Meet our editorial team.',
  keywords: 'Report Focus News, South African news, Zimbabwe news, independent journalism, about us, news organization, media company',
  alternates: {
    canonical: 'https://reportfocusnews.com/about',
  },
  openGraph: {
    title: 'About Us - Trusted SA & Zimbabwe News Since 2024',
    description: 'Report Focus News: Southern Africa\'s trusted independent news source. Award-winning journalism covering SA & Zimbabwe.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-8">
            About Report Focus News
          </h1>

          <div className="bg-gray-50 p-6 rounded-lg mb-8 not-prose">
            <p className="text-xl font-serif leading-relaxed">
              Report Focus News is Southern Africa's trusted source for independent journalism, 
              delivering comprehensive coverage of South Africa and Zimbabwe with unwavering 
              commitment to truth, accuracy, and public service.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We exist to inform, educate, and empower the citizens of South Africa and Zimbabwe 
              through factual, unbiased reporting. Our mission is to strengthen democracy by 
              providing the information people need to make informed decisions about their 
              communities, their countries, and their future.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In an era of information overload and misinformation, Report Focus News stands as 
              a beacon of journalistic integrity, committed to separating fact from fiction and 
              delivering news that matters to Southern Africa.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">What We Cover</h2>
            <div className="grid md:grid-cols-2 gap-6 not-prose">
              <div className="bg-white p-6 border-l-4 border-red-600">
                <h3 className="font-bold text-xl mb-3">South Africa</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Political developments and governance</li>
                  <li>• Economic news and market analysis</li>
                  <li>• Load shedding and energy crisis</li>
                  <li>• Crime and safety updates</li>
                  <li>• Social issues and community stories</li>
                </ul>
              </div>
              <div className="bg-white p-6 border-l-4 border-green-600">
                <h3 className="font-bold text-xl mb-3">Zimbabwe</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Political landscape and reforms</li>
                  <li>• Economic recovery and development</li>
                  <li>• Currency and inflation updates</li>
                  <li>• Agricultural and mining sectors</li>
                  <li>• Diaspora news and immigration</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Our Values</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-2">Independence</h3>
                <p className="text-gray-700">
                  We maintain editorial independence from political parties, governments, and 
                  commercial interests. Our loyalty is to the truth and to our readers.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Accuracy</h3>
                <p className="text-gray-700">
                  Every story undergoes rigorous fact-checking. When errors occur, we correct 
                  them promptly and transparently.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Diversity</h3>
                <p className="text-gray-700">
                  We amplify voices from all communities, ensuring our coverage reflects the 
                  rich diversity of Southern Africa.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Accountability</h3>
                <p className="text-gray-700">
                  We hold power to account while being accountable to our readers through 
                  transparent journalism practices.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Our History</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Founded in 2024, Report Focus News emerged from a recognition that Southern Africa 
              needed a dedicated news platform that could bridge the information gap between 
              South Africa and Zimbabwe while maintaining the highest standards of journalism.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our team of experienced journalists, editors, and digital media professionals 
              brings decades of combined experience covering Southern African affairs, ensuring 
              deep understanding of the complex issues facing our region.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Why Trust Us</h2>
            <div className="bg-blue-50 p-6 rounded-lg not-prose">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Adherence to international journalism standards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Transparent correction and clarification policies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Clear separation between news and opinion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Protection of sources and whistleblowers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Regular independent audits of our practices</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Get Involved</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Quality journalism requires community support. Here's how you can help:
            </p>
            <div className="grid md:grid-cols-3 gap-4 not-prose">
              <div className="bg-gray-50 p-4 rounded text-center">
                <h3 className="font-bold mb-2">Share Our Stories</h3>
                <p className="text-sm text-gray-600">
                  Help spread factual news by sharing our articles
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded text-center">
                <h3 className="font-bold mb-2">Send News Tips</h3>
                <p className="text-sm text-gray-600">
                  Report news and help us investigate stories
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded text-center">
                <h3 className="font-bold mb-2">Provide Feedback</h3>
                <p className="text-sm text-gray-600">
                  Tell us how we can serve you better
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-4">Transparency & Policies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our commitment to transparency and ethical journalism:
            </p>
            <div className="space-y-2 not-prose">
              <Link href="/about/team" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                <span className="font-semibold">Editorial Team →</span>
                <span className="block text-sm text-gray-600">Meet our journalists and editors</span>
              </Link>
              <Link href="/about/ownership" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                <span className="font-semibold">Ownership & Funding →</span>
                <span className="block text-sm text-gray-600">Complete transparency about our structure</span>
              </Link>
              <Link href="/about/standards" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                <span className="font-semibold">Editorial Standards →</span>
                <span className="block text-sm text-gray-600">Our journalistic principles and practices</span>
              </Link>
              <Link href="/ethics" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                <span className="font-semibold">Ethics Policy →</span>
                <span className="block text-sm text-gray-600">Ethical guidelines for our newsroom</span>
              </Link>
              <Link href="/corrections" className="block p-3 bg-gray-50 hover:bg-gray-100 rounded transition-colors">
                <span className="font-semibold">Corrections Policy →</span>
                <span className="block text-sm text-gray-600">How we handle errors and clarifications</span>
              </Link>
            </div>
          </section>

          <section className="border-t pt-8">
            <div className="bg-gray-900 text-white p-8 rounded-lg not-prose">
              <h2 className="font-serif text-2xl font-bold mb-4">Contact Our Newsroom</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">General Inquiries</h3>
                  <p className="text-gray-300">newsroom@reportfocusnews.com</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">News Tips</h3>
                  <p className="text-gray-300">tips@reportfocusnews.com</p>
                </div>
              </div>
              <Link href="/contact" className="inline-block mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors">
                Full Contact Information →
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}