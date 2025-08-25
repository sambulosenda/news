import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Report Focus News',
  description: 'Privacy policy for Report Focus News. Learn how we collect, use, and protect your personal information when you use our news platform.',
  keywords: 'privacy policy, data protection, POPIA compliance, GDPR, personal information, Report Focus News privacy',
  alternates: {
    canonical: 'https://reportfocusnews.com/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-4">Privacy Policy</h1>
          
          <div className="bg-blue-50 p-4 rounded-lg not-prose mb-8">
            <p className="text-sm text-gray-700">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-700 mt-2">
              This Privacy Policy explains how Report Focus News ("we," "our," or "us") collects, 
              uses, and protects your information when you visit our website.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">1. Information We Collect</h2>
            
            <h3 className="font-bold text-xl mb-3">1.1 Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Newsletter subscriptions (email address, name)</li>
              <li>Contact form submissions (name, email, message content)</li>
              <li>News tips and source communications</li>
              <li>Comments and user-generated content (if applicable)</li>
              <li>Survey responses and feedback</li>
            </ul>

            <h3 className="font-bold text-xl mb-3 mt-6">1.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>IP address and location data (country/region level)</li>
              <li>Browser type and version</li>
              <li>Device information (type, operating system)</li>
              <li>Pages visited and time spent on site</li>
              <li>Referring website or search terms</li>
              <li>Date and time of visits</li>
            </ul>

            <h3 className="font-bold text-xl mb-3 mt-6">1.3 Cookies and Tracking Technologies</h3>
            <p className="text-gray-700 mb-3">
              We use cookies and similar technologies to enhance your experience. For detailed 
              information, please see our <Link href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use collected information for:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Delivering news content and services</li>
              <li>Sending newsletters and breaking news alerts (with consent)</li>
              <li>Responding to inquiries and news tips</li>
              <li>Improving website functionality and user experience</li>
              <li>Analyzing traffic and usage patterns</li>
              <li>Detecting and preventing fraud or abuse</li>
              <li>Complying with legal obligations</li>
              <li>Protecting sources and maintaining journalistic integrity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">3. Legal Basis for Processing</h2>
            <p className="text-gray-700 mb-4">We process your information based on:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Consent:</strong> For newsletters and marketing communications</li>
              <li><strong>Legitimate Interests:</strong> For providing news services and improving our platform</li>
              <li><strong>Legal Obligations:</strong> When required by law or court order</li>
              <li><strong>Vital Interests:</strong> In rare cases involving safety or emergency</li>
              <li><strong>Public Interest:</strong> For journalistic purposes and freedom of expression</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">4. Information Sharing</h2>
            <p className="text-gray-700 mb-4">We do not sell your personal information. We may share information with:</p>
            
            <h3 className="font-bold text-xl mb-3">4.1 Service Providers</h3>
            <p className="text-gray-700 mb-3">
              Third-party services that help us operate our website (hosting, analytics, email services) 
              under strict confidentiality agreements.
            </p>

            <h3 className="font-bold text-xl mb-3">4.2 Legal Requirements</h3>
            <p className="text-gray-700 mb-3">
              When required by law, court order, or to protect rights and safety. We will resist 
              overly broad requests and protect journalistic sources.
            </p>

            <h3 className="font-bold text-xl mb-3">4.3 Business Transfers</h3>
            <p className="text-gray-700">
              In the event of merger, acquisition, or sale of assets, with continued protection 
              under this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">5. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Encryption of data in transit (HTTPS)</li>
              <li>Secure storage with access controls</li>
              <li>Regular security assessments</li>
              <li>Staff training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">Under applicable laws (including POPIA and GDPR), you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your information (subject to legal requirements)</li>
              <li><strong>Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Objection:</strong> Object to certain processing activities</li>
              <li><strong>Restriction:</strong> Limit how we use your information</li>
              <li><strong>Withdraw Consent:</strong> For consent-based processing</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise these rights, contact us at privacy@reportfocusnews.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">7. Data Retention</h2>
            <p className="text-gray-700 mb-4">We retain information for:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Newsletter subscriptions: Until you unsubscribe</li>
              <li>Website analytics: 26 months</li>
              <li>Contact inquiries: 2 years</li>
              <li>Legal compliance records: As required by law</li>
              <li>Journalistic archives: Indefinitely for public interest</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">8. International Transfers</h2>
            <p className="text-gray-700">
              Your information may be transferred to and processed in countries outside South Africa 
              and Zimbabwe. We ensure appropriate safeguards are in place, including standard 
              contractual clauses and adequacy decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700">
              Our website is not intended for children under 13. We do not knowingly collect 
              information from children. If you believe we have collected information from a 
              child, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">10. Third-Party Links</h2>
            <p className="text-gray-700">
              Our website may contain links to third-party websites. We are not responsible for 
              their privacy practices. Please review their privacy policies before providing 
              personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">11. Special Provisions for Journalism</h2>
            <p className="text-gray-700 mb-4">
              As a news organization, we may process personal information for journalistic purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Source protection is paramount - we protect confidential sources</li>
              <li>Public interest reporting may involve processing personal information</li>
              <li>Archive maintenance for historical and research purposes</li>
              <li>Freedom of expression and information rights apply</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">12. Regional Compliance</h2>
            
            <h3 className="font-bold text-xl mb-3">12.1 South Africa (POPIA)</h3>
            <p className="text-gray-700 mb-3">
              We comply with the Protection of Personal Information Act (POPIA). South African 
              residents have specific rights under POPIA, including the right to lodge complaints 
              with the Information Regulator.
            </p>

            <h3 className="font-bold text-xl mb-3">12.2 Zimbabwe</h3>
            <p className="text-gray-700 mb-3">
              We respect Zimbabwean data protection principles and constitutional privacy rights.
            </p>

            <h3 className="font-bold text-xl mb-3">12.3 European Union (GDPR)</h3>
            <p className="text-gray-700">
              For EU residents accessing our site, we comply with GDPR requirements where applicable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">13. Updates to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy periodically. Material changes will be notified 
              via website notice or email (for subscribers). Continued use after changes constitutes 
              acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">14. Contact Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg not-prose">
              <h3 className="font-bold mb-3">Data Protection Officer</h3>
              <p className="text-gray-700">Report Focus News</p>
              <p className="text-gray-700">Email: privacy@reportfocusnews.com</p>
              <p className="text-gray-700">Phone: +27 XX XXX XXXX</p>
              
              <h3 className="font-bold mb-3 mt-4">Regulatory Authorities</h3>
              <p className="text-gray-700">
                <strong>South Africa:</strong> Information Regulator<br />
                Website: www.justice.gov.za/inforeg<br />
                Email: complaints.IR@justice.gov.za
              </p>
            </div>
          </section>

          <section className="border-t pt-6">
            <div className="bg-yellow-50 p-4 rounded-lg not-prose">
              <p className="text-sm text-gray-700">
                <strong>Your Privacy Matters:</strong> We are committed to protecting your privacy 
                and maintaining the trust you place in us as your news source. If you have any 
                questions or concerns about our privacy practices, please don't hesitate to contact us.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}