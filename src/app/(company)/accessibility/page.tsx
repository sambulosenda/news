import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Accessibility Statement - Report Focus News',
  description: 'Report Focus News commitment to web accessibility and our efforts to ensure our South African and Zimbabwe news content is accessible to all users.',
  keywords: 'accessibility, web accessibility, WCAG, inclusive design, disability access, Report Focus News',
};

export default function AccessibilityStatement() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-8">Accessibility Statement</h1>
          
          <section className="mb-8">
            <p className="lead text-xl text-gray-700 mb-6">
              Report Focus News is committed to ensuring that our website is accessible to all users, 
              including those with disabilities. We believe that access to news and information is a 
              fundamental right that should be available to everyone in South Africa, Zimbabwe, and beyond.
            </p>
            
            <p className="text-sm text-gray-600">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Our Commitment</h2>
            <p>
              We are dedicated to providing a website that is accessible to the widest possible 
              audience, regardless of technology or ability. We continually work to improve the 
              accessibility and usability of our website for all users.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Our Goals</h3>
            <ul>
              <li>Ensure equal access to news and information for all users</li>
              <li>Comply with international accessibility standards</li>
              <li>Provide multiple ways to access and navigate our content</li>
              <li>Continuously improve our accessibility features</li>
              <li>Foster an inclusive digital environment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Accessibility Standards</h2>
            <p>
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA 
              standards, published by the World Wide Web Consortium (W3C). These guidelines explain 
              how to make web content more accessible for people with disabilities.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">WCAG 2.1 Principles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">1. Perceivable</h4>
                <p className="text-sm">Information must be presentable in ways users can perceive.</p>
                <ul className="text-sm mt-2">
                  <li>Text alternatives for images</li>
                  <li>Captions for videos</li>
                  <li>Sufficient color contrast</li>
                  <li>Resizable text</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">2. Operable</h4>
                <p className="text-sm">Interface components must be operable by all users.</p>
                <ul className="text-sm mt-2">
                  <li>Keyboard accessible</li>
                  <li>No seizure-inducing content</li>
                  <li>Sufficient time limits</li>
                  <li>Clear navigation</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">3. Understandable</h4>
                <p className="text-sm">Information and UI operation must be understandable.</p>
                <ul className="text-sm mt-2">
                  <li>Readable text</li>
                  <li>Predictable functionality</li>
                  <li>Input assistance</li>
                  <li>Error identification</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">4. Robust</h4>
                <p className="text-sm">Content must be interpretable by assistive technologies.</p>
                <ul className="text-sm mt-2">
                  <li>Valid HTML markup</li>
                  <li>Compatible with screen readers</li>
                  <li>Future-proof coding</li>
                  <li>Semantic HTML structure</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Accessibility Features</h2>
            
            <h3 className="text-xl font-semibold mb-2">Visual Accessibility</h3>
            <ul>
              <li><strong>High Contrast:</strong> Our color scheme meets WCAG AA contrast requirements</li>
              <li><strong>Scalable Text:</strong> Text can be enlarged up to 200% without loss of functionality</li>
              <li><strong>Alternative Text:</strong> All images include descriptive alt text</li>
              <li><strong>Clear Typography:</strong> Readable fonts and appropriate line spacing</li>
              <li><strong>Focus Indicators:</strong> Visible focus indicators for keyboard navigation</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Keyboard Navigation</h3>
            <ul>
              <li><strong>Full Keyboard Access:</strong> All interactive elements are keyboard accessible</li>
              <li><strong>Logical Tab Order:</strong> Content follows a logical tab sequence</li>
              <li><strong>Skip Links:</strong> Skip to main content and navigation options</li>
              <li><strong>Keyboard Shortcuts:</strong> Standard shortcuts work as expected</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Screen Reader Support</h3>
            <ul>
              <li><strong>Semantic HTML:</strong> Proper heading hierarchy and markup structure</li>
              <li><strong>ARIA Labels:</strong> Appropriate ARIA labels for complex interactions</li>
              <li><strong>Descriptive Links:</strong> Link text clearly describes the destination</li>
              <li><strong>Form Labels:</strong> All form fields have associated labels</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Content Structure</h3>
            <ul>
              <li><strong>Heading Hierarchy:</strong> Logical H1-H6 heading structure</li>
              <li><strong>List Markup:</strong> Proper use of ordered and unordered lists</li>
              <li><strong>Table Headers:</strong> Data tables include proper headers</li>
              <li><strong>Content Landmarks:</strong> Clear page regions for navigation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Assistive Technology Compatibility</h2>
            <p>
              Our website has been tested with and supports the following assistive technologies:
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Screen Readers</h3>
            <ul>
              <li><strong>NVDA:</strong> Free screen reader for Windows</li>
              <li><strong>JAWS:</strong> Popular commercial screen reader</li>
              <li><strong>VoiceOver:</strong> Built-in screen reader for Mac and iOS</li>
              <li><strong>TalkBack:</strong> Built-in screen reader for Android</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Browser Compatibility</h3>
            <ul>
              <li>Chrome (latest version)</li>
              <li>Firefox (latest version)</li>
              <li>Safari (latest version)</li>
              <li>Edge (latest version)</li>
              <li>Mobile browsers on iOS and Android</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Input Methods</h3>
            <ul>
              <li>Keyboard-only navigation</li>
              <li>Voice control software</li>
              <li>Switch navigation devices</li>
              <li>Touch screen interfaces</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Known Limitations</h2>
            <p>
              Despite our efforts, some limitations may exist. We are actively working to address these issues:
            </p>
            <ul>
              <li><strong>Third-party Content:</strong> Some embedded social media content may have accessibility limitations</li>
              <li><strong>Legacy Content:</strong> Older articles may not meet current accessibility standards</li>
              <li><strong>Complex Graphics:</strong> Some infographics may require additional description</li>
              <li><strong>Live Content:</strong> Breaking news updates may have brief accessibility delays</li>
            </ul>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <p>
                <strong>Alternative Access:</strong> If you encounter content that is not accessible, 
                please contact us, and we will provide an alternative format or additional assistance.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Regional Considerations</h2>
            
            <h3 className="text-xl font-semibold mb-2">South African Context</h3>
            <ul>
              <li>Compliance with South African accessibility legislation</li>
              <li>Consideration for local internet connectivity variations</li>
              <li>Support for multiple South African languages where feasible</li>
              <li>Awareness of regional assistive technology availability</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Zimbabwean Context</h3>
            <ul>
              <li>Optimized for varying internet speeds and data limitations</li>
              <li>Consideration for available assistive technologies</li>
              <li>Mobile-first approach for accessibility</li>
              <li>Offline reading capabilities where possible</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Accessibility Tools and Resources</h2>
            
            <h3 className="text-xl font-semibold mb-2">Browser Accessibility Features</h3>
            <ul>
              <li><strong>Text Size:</strong> Use browser zoom (Ctrl/Cmd + or -) to increase text size</li>
              <li><strong>High Contrast:</strong> Enable high contrast mode in your operating system</li>
              <li><strong>Reader Mode:</strong> Use browser reader mode for simplified article viewing</li>
              <li><strong>Voice Control:</strong> Enable browser voice navigation features</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Operating System Features</h3>
            <ul>
              <li><strong>Windows:</strong> Narrator, Magnifier, High Contrast themes</li>
              <li><strong>macOS:</strong> VoiceOver, Zoom, Display accommodations</li>
              <li><strong>iOS:</strong> VoiceOver, Voice Control, Display & Text Size</li>
              <li><strong>Android:</strong> TalkBack, Select to Speak, Magnification</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Testing and Monitoring</h2>
            <p>
              We regularly test our website's accessibility through:
            </p>
            <ul>
              <li><strong>Automated Testing:</strong> Regular scans using accessibility testing tools</li>
              <li><strong>Manual Testing:</strong> Navigation testing with keyboard and screen readers</li>
              <li><strong>User Testing:</strong> Feedback from users with disabilities</li>
              <li><strong>Third-party Audits:</strong> Periodic professional accessibility assessments</li>
              <li><strong>Continuous Monitoring:</strong> Ongoing checks as new content is published</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Ongoing Improvements</h2>
            <p>
              Accessibility is an ongoing commitment. Our improvement efforts include:
            </p>
            <ul>
              <li>Regular accessibility training for our editorial and development teams</li>
              <li>Implementation of accessibility checks in our content management workflow</li>
              <li>Updates to website code and design based on user feedback</li>
              <li>Adoption of new accessibility technologies and standards</li>
              <li>Community engagement with disability rights organizations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Feedback and Support</h2>
            <p>
              We welcome your feedback on the accessibility of our website. If you:
            </p>
            <ul>
              <li>Encounter accessibility barriers on our website</li>
              <li>Have suggestions for accessibility improvements</li>
              <li>Need content in an alternative format</li>
              <li>Require assistance accessing our content</li>
            </ul>
            
            <div className="bg-gray-50 p-6 rounded mt-4">
              <h3 className="text-lg font-semibold mb-3">Contact Our Accessibility Team</h3>
              <p>
                <strong>Accessibility Officer:</strong> <a href="mailto:accessibility@reportfocusnews.com" className="text-red-700 hover:underline">accessibility@reportfocusnews.com</a><br />
                <strong>Phone:</strong> +27 XX XXX XXXX<br />
                <strong>WhatsApp:</strong> +27 XX XXX XXXX<br />
                <strong>General Inquiries:</strong> <a href="mailto:info@reportfocusnews.com" className="text-red-700 hover:underline">info@reportfocusnews.com</a>
              </p>
              <p className="mt-3 text-sm text-gray-600">
                We aim to respond to accessibility feedback within 48 hours and resolve issues within 5 business days.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Alternative Access Methods</h2>
            <p>
              If you have difficulty accessing our website, we offer these alternatives:
            </p>
            <ul>
              <li><strong>Email Newsletter:</strong> Daily news digest delivered to your inbox</li>
              <li><strong>RSS Feeds:</strong> Subscribe to our content feeds for easy access</li>
              <li><strong>Social Media:</strong> Follow us for news updates and article links</li>
              <li><strong>Phone Support:</strong> Call for assistance accessing specific content</li>
              <li><strong>Text-only Version:</strong> Available upon request for critical content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Legal Framework</h2>
            <p>
              Our accessibility efforts align with various legal and policy frameworks:
            </p>
            <ul>
              <li>United Nations Convention on the Rights of Persons with Disabilities</li>
              <li>South African Constitution and disability rights legislation</li>
              <li>Zimbabwe Constitution and accessibility provisions</li>
              <li>International accessibility standards and best practices</li>
            </ul>
          </section>

          <section>
            <p className="text-sm text-gray-600 mt-8">
              This accessibility statement demonstrates our ongoing commitment to digital inclusion. 
              We will continue to improve our website's accessibility and welcome your partnership 
              in making news and information accessible to all.
            </p>
            
            <p className="text-sm text-gray-600 mt-4">
              For the latest updates to this statement and our accessibility features, 
              please check this page regularly or contact our accessibility team.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}