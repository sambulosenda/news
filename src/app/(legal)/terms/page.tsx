import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service - Report Focus News',
  description: 'Terms and conditions for using Report Focus News website and services. Read our user agreement and service terms.',
  keywords: 'terms of service, user agreement, website terms, legal terms, Report Focus News',
};

export default function TermsOfService() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-8">Terms of Service</h1>
          
          <section className="mb-8">
            <p className="text-sm text-gray-600">
              Effective Date: {new Date().toLocaleDateString()}<br />
              Last Updated: {new Date().toLocaleDateString()}
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="text-sm">
                <strong>Important Notice:</strong> These terms are provided for informational purposes. 
                For actual legal terms of service, please consult with qualified legal professionals 
                familiar with South African and Zimbabwean law.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using the Report Focus News website ("Website") located at 
              reportfocusnews.com, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Description of Service</h2>
            <p>
              Report Focus News provides online news and information services covering South Africa, 
              Zimbabwe, and the broader Southern African region. Our services include:
            </p>
            <ul>
              <li>News articles and reports</li>
              <li>Opinion and analysis pieces</li>
              <li>Newsletter subscriptions</li>
              <li>Comment and interaction features</li>
              <li>Search functionality</li>
              <li>RSS feeds and social media integration</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">User Accounts and Registration</h2>
            
            <h3 className="text-xl font-semibold mb-2">Account Creation</h3>
            <ul>
              <li>You may create an account to access certain features</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must be at least 13 years old to create an account</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Account Responsibilities</h3>
            <ul>
              <li>Keep your login credentials confidential</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>You are responsible for all activities under your account</li>
              <li>One person per account only</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Acceptable Use Policy</h2>
            
            <h3 className="text-xl font-semibold mb-2">Permitted Uses</h3>
            <ul>
              <li>Reading and sharing our content for personal, non-commercial use</li>
              <li>Posting respectful comments and engaging in constructive discussions</li>
              <li>Subscribing to newsletters and notifications</li>
              <li>Using our content for educational and research purposes with proper attribution</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Prohibited Activities</h3>
            <ul>
              <li>Posting harmful, threatening, abusive, or harassing content</li>
              <li>Sharing false, misleading, or defamatory information</li>
              <li>Violating intellectual property rights</li>
              <li>Attempting to hack, disrupt, or compromise our systems</li>
              <li>Spamming or sending unsolicited communications</li>
              <li>Using automated systems to access our content excessively</li>
              <li>Impersonating others or providing false information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Content and Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold mb-2">Our Content</h3>
            <ul>
              <li>All content on this website is owned by Report Focus News or licensed to us</li>
              <li>Content is protected by copyright and other intellectual property laws</li>
              <li>You may share articles using our designated sharing tools</li>
              <li>Commercial use requires written permission</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">User-Generated Content</h3>
            <ul>
              <li>You retain ownership of content you post (comments, submissions)</li>
              <li>You grant us a license to use, display, and distribute your content</li>
              <li>You are responsible for ensuring you have rights to content you post</li>
              <li>We may remove content that violates these terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Privacy and Data Protection</h2>
            <p>
              Your privacy is important to us. Our collection and use of personal information is 
              governed by our Privacy Policy, which is incorporated into these Terms by reference. 
              By using our services, you consent to the collection and use of information as 
              outlined in our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Comments and Community Guidelines</h2>
            
            <h3 className="text-xl font-semibold mb-2">Comment Policy</h3>
            <ul>
              <li>Comments should be relevant to the article or topic</li>
              <li>Respectful dialogue is encouraged; personal attacks are not tolerated</li>
              <li>No hate speech, discrimination, or harassment</li>
              <li>No spam, advertising, or self-promotion in comments</li>
              <li>Comments may be moderated and removed at our discretion</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Moderation</h3>
            <ul>
              <li>We reserve the right to moderate, edit, or remove comments</li>
              <li>Repeat violations may result in account suspension</li>
              <li>We are not responsible for user-generated content</li>
              <li>Reporting inappropriate content is encouraged</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Disclaimers and Limitation of Liability</h2>
            
            <h3 className="text-xl font-semibold mb-2">Service Disclaimer</h3>
            <ul>
              <li>Our website is provided "as is" without warranties of any kind</li>
              <li>We do not guarantee uninterrupted or error-free service</li>
              <li>Content is for informational purposes only</li>
              <li>We are not responsible for decisions made based on our content</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Limitation of Liability</h3>
            <p>
              To the fullest extent permitted by law, Report Focus News shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages, or any loss of 
              profits or revenues, whether incurred directly or indirectly, or any loss of data, 
              use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Third-Party Links and Services</h2>
            <ul>
              <li>Our website may contain links to third-party websites</li>
              <li>We are not responsible for third-party content or services</li>
              <li>Third-party sites have their own terms and privacy policies</li>
              <li>Use of third-party services is at your own risk</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Termination</h2>
            <ul>
              <li>We may terminate or suspend your access at any time</li>
              <li>You may stop using our services at any time</li>
              <li>Termination does not relieve you of obligations incurred before termination</li>
              <li>Provisions that should survive termination will continue to apply</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Regional Compliance</h2>
            
            <h3 className="text-xl font-semibold mb-2">South African Law</h3>
            <p>
              For users in South Africa, these terms are governed by South African law, including 
              the Electronic Communications and Transactions Act and the Protection of Personal 
              Information Act (POPIA).
            </p>

            <h3 className="text-xl font-semibold mb-2">Zimbabwean Law</h3>
            <p>
              For users in Zimbabwe, these terms comply with applicable Zimbabwean legislation 
              including the Access to Information and Protection of Privacy Act.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be posted on 
              this page with an updated effective date. Your continued use of the website after 
              changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Dispute Resolution</h2>
            <ul>
              <li>We encourage resolving disputes through direct communication first</li>
              <li>For formal disputes, mediation is preferred before litigation</li>
              <li>Governing law depends on user location (South African or Zimbabwean law)</li>
              <li>Courts in Johannesburg or Harare have jurisdiction for legal proceedings</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Contact Information</h2>
            <p>
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <p>
                <strong>Legal Inquiries:</strong> <a href="mailto:legal@reportfocusnews.com" className="text-red-700 hover:underline">legal@reportfocusnews.com</a><br />
                <strong>General Questions:</strong> <a href="mailto:contact@reportfocusnews.com" className="text-red-700 hover:underline">contact@reportfocusnews.com</a><br />
                <strong>Address:</strong> Report Focus News, Johannesburg, South Africa
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Severability</h2>
            <p>
              If any provision of these terms is found to be unenforceable or invalid, that 
              provision will be limited or eliminated to the minimum extent necessary so that 
              these Terms will otherwise remain in full force and effect.
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-600 mt-8">
              These Terms of Service constitute the entire agreement between you and Report Focus News 
              regarding the use of our website and services.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}