import { Metadata } from 'next';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact Us - Report Focus News',
  description: 'Get in touch with Report Focus News for news tips, feedback, advertising, and general inquiries.',
};

export default function Contact() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-8">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="font-serif text-2xl font-bold mb-4">Newsroom</h2>
              <p className="mb-4 text-gray-700">
                Have a news tip or story idea? Our newsroom is always looking for important stories 
                that matter to our readers in South Africa and Zimbabwe.
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:news@reportfocusnews.com" className="text-red-700 hover:underline">news@reportfocusnews.com</a></p>
                <p><strong>WhatsApp:</strong> +27 XX XXX XXXX</p>
                <p><strong>News Tips:</strong> <a href="mailto:tips@reportfocusnews.com" className="text-red-700 hover:underline">tips@reportfocusnews.com</a></p>
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="font-serif text-2xl font-bold mb-4">Advertising</h2>
              <p className="mb-4 text-gray-700">
                Reach millions of engaged readers across Southern Africa with targeted advertising solutions.
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:advertising@reportfocusnews.com" className="text-red-700 hover:underline">advertising@reportfocusnews.com</a></p>
                <p><strong>Phone:</strong> +27 XX XXX XXXX</p>
              </div>
            </section>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="font-serif text-2xl font-bold mb-4">Editorial</h2>
              <p className="mb-4 text-gray-700">
                For letters to the editor, opinion pieces, and editorial inquiries.
              </p>
              <div className="space-y-2">
                <p><strong>Editor:</strong> <a href="mailto:editor@reportfocusnews.com" className="text-red-700 hover:underline">editor@reportfocusnews.com</a></p>
                <p><strong>Opinion:</strong> <a href="mailto:opinion@reportfocusnews.com" className="text-red-700 hover:underline">opinion@reportfocusnews.com</a></p>
                <p><strong>Letters:</strong> <a href="mailto:letters@reportfocusnews.com" className="text-red-700 hover:underline">letters@reportfocusnews.com</a></p>
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="font-serif text-2xl font-bold mb-4">General Inquiries</h2>
              <p className="mb-4 text-gray-700">
                For general questions, feedback, and other inquiries.
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> <a href="mailto:info@reportfocusnews.com" className="text-red-700 hover:underline">info@reportfocusnews.com</a></p>
                <p><strong>Feedback:</strong> <a href="mailto:feedback@reportfocusnews.com" className="text-red-700 hover:underline">feedback@reportfocusnews.com</a></p>
              </div>
            </section>
          </div>

          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4">Corrections and Complaints</h2>
            <p className="mb-4 text-gray-700">
              We take accuracy seriously. If you spot an error or have a complaint about our coverage, 
              please let us know immediately.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p><strong>Corrections:</strong> <a href="mailto:corrections@reportfocusnews.com" className="text-red-700 hover:underline">corrections@reportfocusnews.com</a></p>
              <p><strong>Complaints:</strong> <a href="mailto:complaints@reportfocusnews.com" className="text-red-700 hover:underline">complaints@reportfocusnews.com</a></p>
              <p className="mt-2 text-sm text-gray-600">
                Please include the article URL and publication date in your message.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4">Social Media</h2>
            <p className="mb-4 text-gray-700">
              Follow us on social media for breaking news and updates:
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://twitter.com/reportfocusnews" target="_blank" rel="noopener noreferrer" 
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                Twitter/X
              </a>
              <a href="https://facebook.com/reportfocusnews" target="_blank" rel="noopener noreferrer" 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Facebook
              </a>
              <a href="https://linkedin.com/company/reportfocusnews" target="_blank" rel="noopener noreferrer" 
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors">
                LinkedIn
              </a>
              <a href="https://instagram.com/reportfocusnews" target="_blank" rel="noopener noreferrer" 
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors">
                Instagram
              </a>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold mb-4">Office Locations</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">South Africa Office</h3>
                <p className="text-gray-700">
                  Johannesburg, Gauteng<br />
                  South Africa<br />
                  <strong>Phone:</strong> +27 XX XXX XXXX
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Zimbabwe Office</h3>
                <p className="text-gray-700">
                  Harare<br />
                  Zimbabwe<br />
                  <strong>Phone:</strong> +263 XX XXX XXXX
                </p>
              </div>
            </div>
          </section>

          <section className="bg-red-50 p-6 rounded-lg">
            <h2 className="font-serif text-2xl font-bold mb-4">Confidential News Tips</h2>
            <p className="mb-4 text-gray-700">
              Have sensitive information? We protect our sources. You can reach us securely:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Encrypted email: <a href="mailto:secure@reportfocusnews.com" className="text-red-700 hover:underline">secure@reportfocusnews.com</a></li>
              <li>WhatsApp (messages automatically delete): +27 XX XXX XXXX</li>
              <li>Signal: Available upon request</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}