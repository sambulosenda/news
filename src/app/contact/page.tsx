import { Metadata } from 'next';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Report Focus News - Get in Touch with Our Newsroom',
  description: 'Contact Report Focus News for news tips, press inquiries, corrections, or general questions. Reach our newsroom covering South Africa and Zimbabwe.',
  keywords: 'contact Report Focus News, newsroom contact, news tips, press inquiries, South Africa news contact, Zimbabwe news contact',
  alternates: {
    canonical: 'https://reportfocusnews.com/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-8">
            Contact Report Focus News
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            We value communication with our readers and sources. Whether you have a news tip, 
            feedback about our coverage, or need to reach our newsroom, we're here to listen.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* News Tips */}
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-600">
              <h2 className="font-serif text-2xl font-bold mb-4">Send a News Tip</h2>
              <p className="text-gray-700 mb-4">
                Have information about a story? We protect our sources and take tips seriously.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">Email:</p>
                  <a href="mailto:tips@reportfocusnews.com" className="text-red-600 hover:underline">
                    tips@reportfocusnews.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold">WhatsApp:</p>
                  <p className="text-gray-700">+27 XX XXX XXXX</p>
                </div>
                <div>
                  <p className="font-semibold">Signal:</p>
                  <p className="text-gray-700">+27 XX XXX XXXX</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                For sensitive information, we recommend using encrypted communication.
              </p>
            </div>

            {/* General Inquiries */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h2 className="font-serif text-2xl font-bold mb-4">General Inquiries</h2>
              <p className="text-gray-700 mb-4">
                For general questions, feedback, or comments about our coverage.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">Main Newsroom:</p>
                  <a href="mailto:newsroom@reportfocusnews.com" className="text-blue-600 hover:underline">
                    newsroom@reportfocusnews.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold">Reader Services:</p>
                  <a href="mailto:readers@reportfocusnews.com" className="text-blue-600 hover:underline">
                    readers@reportfocusnews.com
                  </a>
                </div>
                <div>
                  <p className="font-semibold">Phone:</p>
                  <p className="text-gray-700">+27 XX XXX XXXX</p>
                </div>
              </div>
            </div>
          </div>

          {/* Department Contacts */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-6">Department Contacts</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 border border-gray-200 rounded">
                <h3 className="font-bold text-xl mb-3">Editorial</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Editor-in-Chief:</strong> editor@reportfocusnews.com</p>
                  <p><strong>Managing Editor:</strong> managing@reportfocusnews.com</p>
                  <p><strong>News Editor:</strong> news@reportfocusnews.com</p>
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-200 rounded">
                <h3 className="font-bold text-xl mb-3">Specialized Desks</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Politics:</strong> politics@reportfocusnews.com</p>
                  <p><strong>Business:</strong> business@reportfocusnews.com</p>
                  <p><strong>Investigations:</strong> investigate@reportfocusnews.com</p>
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-200 rounded">
                <h3 className="font-bold text-xl mb-3">Corrections & Standards</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Corrections:</strong> corrections@reportfocusnews.com</p>
                  <p><strong>Standards Editor:</strong> standards@reportfocusnews.com</p>
                  <p><strong>Reader's Editor:</strong> readerseditor@reportfocusnews.com</p>
                </div>
              </div>

              <div className="bg-white p-6 border border-gray-200 rounded">
                <h3 className="font-bold text-xl mb-3">Technical & Support</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Website Issues:</strong> webmaster@reportfocusnews.com</p>
                  <p><strong>Subscription Support:</strong> support@reportfocusnews.com</p>
                  <p><strong>Technical Help:</strong> tech@reportfocusnews.com</p>
                </div>
              </div>
            </div>
          </section>

          {/* Regional Offices */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-6">Regional Bureaus</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3">South Africa Bureau</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Johannesburg Office</strong></p>
                  <p>Email: jhb@reportfocusnews.com</p>
                  <p>Phone: +27 11 XXX XXXX</p>
                  <div className="mt-3">
                    <p><strong>Cape Town Office</strong></p>
                    <p>Email: cpt@reportfocusnews.com</p>
                    <p>Phone: +27 21 XXX XXXX</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3">Zimbabwe Bureau</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Harare Office</strong></p>
                  <p>Email: harare@reportfocusnews.com</p>
                  <p>Phone: +263 4 XXX XXX</p>
                  <div className="mt-3">
                    <p><strong>Bulawayo Office</strong></p>
                    <p>Email: bulawayo@reportfocusnews.com</p>
                    <p>Phone: +263 9 XXX XXX</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Press & Media */}
          <section className="mb-12">
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
              <h2 className="font-serif text-2xl font-bold mb-4">Press & Media Inquiries</h2>
              <p className="text-gray-700 mb-4">
                For press releases, media partnerships, and journalist inquiries:
              </p>
              <div className="space-y-2">
                <p><strong>Press Office:</strong> press@reportfocusnews.com</p>
                <p><strong>Partnerships:</strong> partnerships@reportfocusnews.com</p>
                <p><strong>Syndication:</strong> syndication@reportfocusnews.com</p>
              </div>
            </div>
          </section>

          {/* Social Media */}
          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold mb-6">Follow Us</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="#" className="bg-blue-600 text-white p-4 rounded text-center hover:bg-blue-700 transition-colors">
                <p className="font-bold">Facebook</p>
                <p className="text-sm">@ReportFocusNews</p>
              </a>
              <a href="#" className="bg-sky-500 text-white p-4 rounded text-center hover:bg-sky-600 transition-colors">
                <p className="font-bold">Twitter/X</p>
                <p className="text-sm">@ReportFocus</p>
              </a>
              <a href="#" className="bg-pink-600 text-white p-4 rounded text-center hover:bg-pink-700 transition-colors">
                <p className="font-bold">Instagram</p>
                <p className="text-sm">@reportfocusnews</p>
              </a>
              <a href="#" className="bg-blue-700 text-white p-4 rounded text-center hover:bg-blue-800 transition-colors">
                <p className="font-bold">LinkedIn</p>
                <p className="text-sm">Report Focus News</p>
              </a>
            </div>
          </section>

          {/* Important Notes */}
          <section className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h2 className="font-serif text-2xl font-bold mb-4">Important Information</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours during business days.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>News Tips:</strong> We protect our sources. Anonymous tips are welcome.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Corrections:</strong> Report errors to corrections@reportfocusnews.com for prompt review.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">•</span>
                <span><strong>Advertising:</strong> We do not handle advertising inquiries through editorial contacts.</span>
              </li>
            </ul>
          </section>

          {/* Office Hours */}
          <section className="mt-8 p-6 bg-gray-900 text-white rounded-lg">
            <h2 className="font-serif text-2xl font-bold mb-4">Newsroom Hours</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">South Africa (SAST)</h3>
                <p>Monday - Friday: 06:00 - 22:00</p>
                <p>Saturday - Sunday: 08:00 - 20:00</p>
                <p className="text-sm text-gray-300 mt-2">Breaking news desk operates 24/7</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Zimbabwe (CAT)</h3>
                <p>Monday - Friday: 06:00 - 22:00</p>
                <p>Saturday - Sunday: 08:00 - 20:00</p>
                <p className="text-sm text-gray-300 mt-2">Emergency contact available 24/7</p>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}