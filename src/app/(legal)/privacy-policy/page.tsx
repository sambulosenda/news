import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - Report Focus News',
  description: 'Learn how Report Focus News collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <section className="mb-8">
            <p className="text-sm text-gray-600">
              Effective Date: {new Date().toLocaleDateString()}<br />
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Introduction</h2>
            <p>
              Report Focus News ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website reportfocusnews.com. Please read this privacy policy carefully.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-2">Information You Provide</h3>
            <ul>
              <li>Contact information (name, email address) when subscribing to newsletters</li>
              <li>Comments and feedback on articles</li>
              <li>Information submitted through contact forms</li>
              <li>User preferences and settings</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Information Collected Automatically</h3>
            <ul>
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our news service</li>
              <li>Send newsletters and breaking news alerts (with consent)</li>
              <li>Respond to comments and inquiries</li>
              <li>Analyze usage patterns to improve our content and services</li>
              <li>Personalize content based on your interests</li>
              <li>Comply with legal obligations</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website 
              and hold certain information. Cookies are files with small amount of data which 
              may include an anonymous unique identifier.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Types of Cookies We Use</h3>
            <ul>
              <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>

            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
              However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following situations:</p>
            <ul>
              <li>With service providers who assist in operating our website</li>
              <li>To comply with legal obligations or court orders</li>
              <li>To protect our rights, privacy, safety, or property</li>
              <li>With your consent or at your direction</li>
              <li>In connection with a merger, sale, or acquisition of all or a portion of our business</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Third-Party Services</h2>
            <p>
              Our website may contain links to third-party websites and services. We are not responsible 
              for the privacy practices or content of these third parties. We encourage you to read the 
              privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your 
              personal information against accidental or unlawful destruction, loss, alteration, 
              unauthorized disclosure, or access. However, no method of transmission over the Internet 
              or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your information to another service</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Restriction:</strong> Request restriction of processing your information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Children's Privacy</h2>
            <p>
              Our website is not directed to children under 13 years of age, and we do not knowingly 
              collect personal information from children under 13. If we become aware that we have 
              collected personal information from a child under 13, we will take steps to delete 
              such information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">International Data Transfers</h2>
            <p>
              Your information may be transferred to and maintained on servers located outside of your 
              state, province, country, or other governmental jurisdiction where data protection laws 
              may differ from those of your jurisdiction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Regional Compliance</h2>
            
            <h3 className="text-xl font-semibold mb-2">South Africa - POPIA</h3>
            <p>
              For South African residents, we comply with the Protection of Personal Information Act (POPIA). 
              You have the right to object to processing, request correction, and lodge complaints with the 
              Information Regulator.
            </p>

            <h3 className="text-xl font-semibold mb-2">European Union - GDPR</h3>
            <p>
              For EU residents, we comply with the General Data Protection Regulation (GDPR). 
              You have additional rights including the right to data portability and to lodge 
              complaints with supervisory authorities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last Updated" date. 
              You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our privacy practices, 
              please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <p>
                <strong>Email:</strong> <a href="mailto:legal@reportfocusnews.com" className="text-red-700 hover:underline">legal@reportfocusnews.com</a><br />
                <strong>Data Protection Officer:</strong> <a href="mailto:legal@reportfocusnews.com" className="text-red-700 hover:underline">legal@reportfocusnews.com</a><br />
                <strong>Postal Address:</strong> Report Focus News, Johannesburg, South Africa
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}