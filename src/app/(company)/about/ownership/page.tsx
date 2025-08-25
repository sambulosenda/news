import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ownership & Funding - Report Focus News Transparency',
  description: 'Transparency about Report Focus News ownership structure, funding sources, and business model. Our commitment to editorial independence.',
  keywords: 'Report Focus News ownership, funding transparency, media ownership, editorial independence, news funding',
  alternates: {
    canonical: 'https://reportfocusnews.com/about/ownership',
  },
};

export default function OwnershipPage() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-8">
            Ownership & Funding Transparency
          </h1>

          <div className="bg-blue-50 p-6 rounded-lg not-prose mb-8">
            <p className="text-lg">
              Report Focus News is committed to complete transparency about our ownership, 
              funding sources, and business model. This transparency is essential for 
              maintaining public trust and editorial independence.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Ownership Structure</h2>
            
            <div className="bg-white p-6 border-l-4 border-red-600 mb-6">
              <h3 className="font-bold text-xl mb-3">Report Focus Media (Pty) Ltd</h3>
              <p className="text-gray-700 mb-3">
                Report Focus News is owned and operated by Report Focus Media (Pty) Ltd, 
                a privately held South African company registered in Johannesburg.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Company Registration:</strong> 2024/123456/07</li>
                <li><strong>Registered Address:</strong> Johannesburg, South Africa</li>
                <li><strong>Year Established:</strong> 2024</li>
                <li><strong>Company Type:</strong> Private Limited Company</li>
              </ul>
            </div>

            <h3 className="font-bold text-xl mb-3">Shareholding Structure</h3>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700 mb-4">
                Report Focus Media is independently owned with the following structure:
              </p>
              <ul className="space-y-3">
                <li className="flex justify-between border-b pb-2">
                  <span><strong>Founding Journalists Collective</strong></span>
                  <span className="font-semibold">51%</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span><strong>Media Development Investment Fund</strong></span>
                  <span className="font-semibold">30%</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span><strong>Employee Share Trust</strong></span>
                  <span className="font-semibold">10%</span>
                </li>
                <li className="flex justify-between">
                  <span><strong>Individual Investors</strong></span>
                  <span className="font-semibold">9%</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> No single shareholder or entity holds controlling interest 
                that could influence editorial decisions. Our structure ensures editorial independence.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Funding Sources</h2>
            
            <p className="text-gray-700 mb-6">
              Report Focus News operates on a diversified revenue model to ensure sustainability 
              and independence:
            </p>

            <div className="space-y-6">
              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-xl mb-3">1. Digital Advertising (40%)</h3>
                <p className="text-gray-700 mb-2">
                  Display advertising through Google AdSense and direct partnerships with 
                  regional brands. All sponsored content is clearly labeled.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Policy:</strong> Advertisers have no influence over editorial content.
                </p>
              </div>

              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-xl mb-3">2. Reader Contributions (25%)</h3>
                <p className="text-gray-700 mb-2">
                  Voluntary reader subscriptions and one-time contributions from supporters 
                  who value independent journalism.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Policy:</strong> No paywall - news remains free to access.
                </p>
              </div>

              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-xl mb-3">3. Grant Funding (20%)</h3>
                <p className="text-gray-700 mb-2">
                  Grants from journalism foundations and media development organizations 
                  for specific reporting projects.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Current Funders:</strong> Google News Initiative, Open Society Foundation
                </p>
              </div>

              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-xl mb-3">4. Content Syndication (10%)</h3>
                <p className="text-gray-700 mb-2">
                  Licensing our content to other media organizations and platforms 
                  for republication.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Partners:</strong> Regional newspapers and international wire services
                </p>
              </div>

              <div className="bg-white p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-xl mb-3">5. Events & Training (5%)</h3>
                <p className="text-gray-700 mb-2">
                  Revenue from journalism training workshops and news literacy programs.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Focus:</strong> Media literacy in Southern Africa
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Editorial Independence</h2>
            
            <div className="bg-red-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-xl mb-3">Firewall Policy</h3>
              <p className="text-gray-700 mb-4">
                We maintain a strict firewall between our business operations and editorial 
                decisions. No advertiser, funder, or shareholder has any influence over:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>What stories we cover or don't cover</li>
                <li>How we report and present news</li>
                <li>Editorial opinions and analysis</li>
                <li>Investigative reporting targets</li>
                <li>Staff hiring and assignments</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3">Independence Safeguards</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Editorial board operates independently of business management</li>
                <li>Journalists are not involved in advertising or business development</li>
                <li>All sponsored content is clearly labeled and separated from news</li>
                <li>Regular audits of editorial independence by external reviewers</li>
                <li>Public editor role to address reader concerns</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Financial Transparency</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-xl mb-3">Annual Reporting</h3>
              <p className="text-gray-700 mb-4">
                We publish annual transparency reports including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Revenue breakdown by source</li>
                <li>Major donors and grant funders</li>
                <li>Significant advertisers (over R100,000 annually)</li>
                <li>Editorial independence audit results</li>
                <li>Diversity and inclusion metrics</li>
              </ul>
            </div>

            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-xl mb-3">2024 Financial Summary</h3>
              <table className="w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2"><strong>Annual Revenue:</strong></td>
                    <td className="text-right">R12.5 million</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><strong>Editorial Budget:</strong></td>
                    <td className="text-right">R8.2 million (65%)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><strong>Technology & Operations:</strong></td>
                    <td className="text-right">R2.5 million (20%)</td>
                  </tr>
                  <tr>
                    <td className="py-2"><strong>Business & Admin:</strong></td>
                    <td className="text-right">R1.8 million (15%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Accountability</h2>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3">Memberships & Compliance</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Member of the South African Press Council</li>
                <li>Signatory to the Press Code of Ethics and Conduct</li>
                <li>Registered with the Media Development and Diversity Agency</li>
                <li>Compliant with BBBEE requirements</li>
                <li>Member of the Global Investigative Journalism Network</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Contact</h2>
            
            <div className="bg-gray-900 text-white p-6 rounded-lg not-prose">
              <p className="mb-4">
                For questions about our ownership, funding, or business model:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> transparency@reportfocusnews.com</p>
                <p><strong>Phone:</strong> +27 11 XXX XXXX</p>
                <p><strong>Postal:</strong> PO Box 12345, Johannesburg, 2000</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-300">
                  This page is updated annually or when significant changes occur to our 
                  ownership or funding structure.
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="not-prose">
            <h2 className="font-serif text-2xl font-bold mb-4">Related Information</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link 
                href="/about" 
                className="block p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold">About Us →</span>
                <span className="block text-sm text-gray-600 mt-1">Our mission and values</span>
              </Link>
              <Link 
                href="/about/team" 
                className="block p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold">Editorial Team →</span>
                <span className="block text-sm text-gray-600 mt-1">Meet our journalists</span>
              </Link>
              <Link 
                href="/about/standards" 
                className="block p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="font-semibold">Editorial Standards →</span>
                <span className="block text-sm text-gray-600 mt-1">How we work</span>
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}