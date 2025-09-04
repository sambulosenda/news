import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Cookie Policy - Report Focus News',
  description: 'Learn about how Report Focus News uses cookies and similar technologies to improve your browsing experience and analyze website usage.',
  keywords: 'cookie policy, cookies, tracking, privacy, website analytics, Report Focus News',
};

export default function CookiePolicy() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-8">Cookie Policy</h1>
          
          <section className="mb-8">
            <p className="text-sm text-gray-600">
              Effective Date: {new Date().toLocaleDateString()}<br />
              Last Updated: {new Date().toLocaleDateString()}
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="text-sm">
                <strong>Notice:</strong> This cookie policy is provided for informational purposes. 
                For comprehensive legal compliance, consult with data protection specialists familiar 
                with South African POPIA and international privacy regulations.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your computer, smartphone, or other device 
              when you visit a website. They are widely used to make websites work more efficiently and 
              provide information to website owners about how users interact with their sites.
            </p>
            <p>
              Report Focus News uses cookies and similar technologies to enhance your browsing experience, 
              analyze website traffic, and provide personalized content relevant to your interests.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
            <div className="bg-gray-50 p-4 rounded mb-4">
              <p><strong>Purpose:</strong> These cookies are necessary for the website to function properly.</p>
              <p><strong>Examples:</strong></p>
              <ul>
                <li>Authentication cookies to keep you logged in</li>
                <li>Security cookies to prevent fraud</li>
                <li>Load balancing cookies for website performance</li>
                <li>Cookie consent preferences</li>
              </ul>
              <p><strong>Duration:</strong> Session or up to 1 year</p>
              <p><strong>Can be disabled:</strong> No (website won't function properly)</p>
            </div>

            <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
            <div className="bg-gray-50 p-4 rounded mb-4">
              <p><strong>Purpose:</strong> Help us understand how visitors use our website.</p>
              <p><strong>Examples:</strong></p>
              <ul>
                <li>Google Analytics cookies (page views, bounce rate, session duration)</li>
                <li>Heat mapping tools to understand user behavior</li>
                <li>A/B testing cookies for website optimization</li>
                <li>Traffic source tracking</li>
              </ul>
              <p><strong>Duration:</strong> Up to 2 years</p>
              <p><strong>Can be disabled:</strong> Yes</p>
            </div>

            <h3 className="text-xl font-semibold mb-2">Functional Cookies</h3>
            <div className="bg-gray-50 p-4 rounded mb-4">
              <p><strong>Purpose:</strong> Enhance your experience and remember your preferences.</p>
              <p><strong>Examples:</strong></p>
              <ul>
                <li>Language and region preferences</li>
                <li>Font size and accessibility settings</li>
                <li>Newsletter subscription preferences</li>
                <li>Article reading progress</li>
                <li>Comment form information</li>
              </ul>
              <p><strong>Duration:</strong> Up to 1 year</p>
              <p><strong>Can be disabled:</strong> Yes (may affect functionality)</p>
            </div>

            <h3 className="text-xl font-semibold mb-2">Advertising Cookies</h3>
            <div className="bg-gray-50 p-4 rounded mb-4">
              <p><strong>Purpose:</strong> Display relevant advertisements and measure ad effectiveness.</p>
              <p><strong>Examples:</strong></p>
              <ul>
                <li>Google AdSense targeting cookies</li>
                <li>Social media advertising pixels</li>
                <li>Retargeting and remarketing cookies</li>
                <li>Frequency capping to limit ad repetition</li>
              </ul>
              <p><strong>Duration:</strong> Up to 2 years</p>
              <p><strong>Can be disabled:</strong> Yes</p>
            </div>

            <h3 className="text-xl font-semibold mb-2">Social Media Cookies</h3>
            <div className="bg-gray-50 p-4 rounded mb-4">
              <p><strong>Purpose:</strong> Enable social media sharing and interaction features.</p>
              <p><strong>Examples:</strong></p>
              <ul>
                <li>Facebook share and like buttons</li>
                <li>Twitter/X social integration</li>
                <li>LinkedIn sharing functionality</li>
                <li>WhatsApp sharing features</li>
              </ul>
              <p><strong>Duration:</strong> Varies by platform</p>
              <p><strong>Can be disabled:</strong> Yes (social features won't work)</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">How We Use Cookies</h2>
            
            <h3 className="text-xl font-semibold mb-2">Website Functionality</h3>
            <ul>
              <li>Remember your login status and preferences</li>
              <li>Maintain security across page visits</li>
              <li>Store your accessibility and display preferences</li>
              <li>Keep track of newsletter subscription status</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Analytics and Performance</h3>
            <ul>
              <li>Measure website traffic and popular content</li>
              <li>Understand how users navigate our site</li>
              <li>Identify technical issues and improve performance</li>
              <li>Track conversion rates and user engagement</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Content Personalization</h3>
            <ul>
              <li>Show relevant news based on your reading history</li>
              <li>Recommend related articles and topics</li>
              <li>Customize content for your geographic location</li>
              <li>Remember your comment and interaction preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Third-Party Cookies</h2>
            <p>
              Some cookies on our website are set by third-party services we use to enhance 
              your experience. These include:
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Analytics Services</h3>
            <ul>
              <li><strong>Google Analytics:</strong> Website traffic analysis and user behavior insights</li>
              <li><strong>Google Tag Manager:</strong> Manages marketing and analytics tags</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Advertising Networks</h3>
            <ul>
              <li><strong>Google AdSense:</strong> Displays relevant advertisements</li>
              <li><strong>Facebook Pixel:</strong> Social media advertising and conversion tracking</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Social Media Platforms</h3>
            <ul>
              <li><strong>Facebook:</strong> Social sharing and like buttons</li>
              <li><strong>Twitter/X:</strong> Tweet and share functionality</li>
              <li><strong>LinkedIn:</strong> Professional sharing features</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Content and Services</h3>
            <ul>
              <li><strong>YouTube:</strong> Embedded video content</li>
              <li><strong>Newsletter Services:</strong> Email subscription management</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Managing Your Cookie Preferences</h2>
            
            <h3 className="text-xl font-semibold mb-2">Browser Settings</h3>
            <p>Most web browsers allow you to control cookies through their settings:</p>
            <ul>
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Opt-Out Options</h3>
            <ul>
              <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:underline">Browser Add-on</a></li>
              <li><strong>Advertising Cookies:</strong> <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:underline">Your Online Choices</a></li>
              <li><strong>Network Advertising:</strong> <a href="http://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:underline">NAI Opt-Out</a></li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Mobile Device Settings</h3>
            <ul>
              <li><strong>iOS:</strong> Settings → Privacy → Tracking → Allow Apps to Request to Track</li>
              <li><strong>Android:</strong> Settings → Privacy → Ads → Reset advertising ID</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Cookie Consent Management</h2>
            <p>
              When you first visit our website, you'll see a cookie consent banner. You can:
            </p>
            <ul>
              <li>Accept all cookies for the full website experience</li>
              <li>Customize your preferences by cookie category</li>
              <li>Reject non-essential cookies (some features may not work)</li>
              <li>Change your preferences at any time using our cookie settings</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded">
              <p>
                <strong>Manage Your Cookie Preferences:</strong> You can update your cookie settings 
                at any time by clicking the "Cookie Settings" link in our website footer.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Regional Compliance</h2>
            
            <h3 className="text-xl font-semibold mb-2">South Africa - POPIA Compliance</h3>
            <p>
              We comply with the Protection of Personal Information Act (POPIA). Cookies containing 
              personal information are processed lawfully with appropriate consent and security measures.
            </p>

            <h3 className="text-xl font-semibold mb-2">European Union - GDPR Compliance</h3>
            <p>
              For EU visitors, we comply with the General Data Protection Regulation (GDPR) and 
              ePrivacy Directive, requiring explicit consent for non-essential cookies.
            </p>

            <h3 className="text-xl font-semibold mb-2">International Compliance</h3>
            <p>
              We follow international best practices for data protection and cookie usage, 
              respecting privacy rights regardless of your location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Data Retention</h2>
            <ul>
              <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain until expiry date or manual deletion</li>
              <li><strong>Analytics Data:</strong> Aggregated data retained for up to 26 months</li>
              <li><strong>Advertising Data:</strong> Typically retained for 12-24 months</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy periodically to reflect changes in our practices 
              or legal requirements. When we make significant changes, we will:
            </p>
            <ul>
              <li>Update the "Last Updated" date at the top of this page</li>
              <li>Notify users through our website or email newsletters</li>
              <li>Request fresh consent if required by law</li>
              <li>Provide clear information about the changes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Contact Us About Cookies</h2>
            <p>
              If you have questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <p>
                <strong>Privacy Officer:</strong> <a href="mailto:legal@reportfocusnews.com" className="text-red-700 hover:underline">legal@reportfocusnews.com</a><br />
                <strong>Data Protection:</strong> <a href="mailto:legal@reportfocusnews.com" className="text-red-700 hover:underline">legal@reportfocusnews.com</a><br />
                <strong>General Inquiries:</strong> <a href="mailto:contact@reportfocusnews.com" className="text-red-700 hover:underline">contact@reportfocusnews.com</a><br />
                <strong>Address:</strong> Report Focus News, Johannesburg, South Africa
              </p>
            </div>
          </section>

          <section>
            <p className="text-sm text-gray-600 mt-8">
              This Cookie Policy is part of our Privacy Policy and Terms of Service. 
              Please review these documents for complete information about our data practices.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}