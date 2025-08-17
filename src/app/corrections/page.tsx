import { Metadata } from 'next';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Corrections and Clarifications - Report Focus News',
  description: 'Our commitment to accuracy includes transparently correcting errors and providing clarifications to ensure reliable news coverage of South Africa and Zimbabwe.',
  keywords: 'corrections, clarifications, errors, accuracy, journalism standards, transparency, Report Focus News',
};

export default function CorrectionsAndClarifications() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-8">Corrections and Clarifications</h1>
          
          <section className="mb-8">
            <p className="lead text-xl text-gray-700 mb-6">
              Report Focus News is committed to accuracy in all our reporting. When we make mistakes, 
              we correct them quickly and transparently. This page outlines our correction policy and 
              displays recent corrections to maintain our readers' trust.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Our Commitment to Accuracy</h2>
            <p>
              Accuracy is fundamental to credible journalism. While we strive for perfection in all our 
              reporting on South African and Zimbabwean news, we acknowledge that errors can occur. 
              When they do, we take full responsibility and act swiftly to correct them.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Our Promise</h3>
            <ul>
              <li>We will correct errors promptly and transparently</li>
              <li>Corrections will be published as prominently as the original error</li>
              <li>We will learn from our mistakes to prevent future errors</li>
              <li>We welcome reader feedback and fact-checking assistance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Types of Corrections</h2>
            
            <h3 className="text-xl font-semibold mb-2">Corrections</h3>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <p>
                <strong>Definition:</strong> Corrections address factual errors that materially affect 
                the accuracy or understanding of a story. These include incorrect names, dates, places, 
                numbers, quotes, or other significant factual mistakes.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-2">Clarifications</h3>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <p>
                <strong>Definition:</strong> Clarifications address information that, while not 
                technically incorrect, may be unclear, incomplete, or misleading. They provide 
                additional context to help readers better understand the story.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-2">Updates</h3>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <p>
                <strong>Definition:</strong> Updates add new information to developing stories or 
                provide follow-up details that were not available at the time of original publication.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Our Correction Process</h2>
            
            <h3 className="text-xl font-semibold mb-2">Step 1: Error Identification</h3>
            <ul>
              <li>Internal fact-checking and editorial review</li>
              <li>Reader feedback and corrections submissions</li>
              <li>Source notifications of inaccuracies</li>
              <li>Social media monitoring for accuracy concerns</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Step 2: Verification</h3>
            <ul>
              <li>Editorial team investigates reported errors</li>
              <li>Original sources are consulted when possible</li>
              <li>Additional fact-checking is conducted</li>
              <li>Senior editors review findings</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Step 3: Publication</h3>
            <ul>
              <li>Corrections are published within 24 hours when possible</li>
              <li>Clear explanation of what was incorrect</li>
              <li>Accurate information is provided</li>
              <li>Date and time of correction are noted</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Step 4: Follow-up</h3>
            <ul>
              <li>Original article is updated with correction notice</li>
              <li>Social media posts may be corrected or deleted</li>
              <li>Affected parties are notified when appropriate</li>
              <li>Lessons learned are shared with editorial team</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">How to Report an Error</h2>
            <p>
              If you notice an error in our reporting, please contact us immediately. The faster we 
              know about a mistake, the quicker we can correct it.
            </p>
            
            <div className="bg-gray-50 p-6 rounded">
              <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
              <p>
                <strong>Corrections Email:</strong> <a href="mailto:corrections@reportfocusnews.com" className="text-red-700 hover:underline">corrections@reportfocusnews.com</a><br />
                <strong>Newsroom:</strong> <a href="mailto:news@reportfocusnews.com" className="text-red-700 hover:underline">news@reportfocusnews.com</a><br />
                <strong>Editor-in-Chief:</strong> <a href="mailto:editor@reportfocusnews.com" className="text-red-700 hover:underline">editor@reportfocusnews.com</a><br />
                <strong>Phone:</strong> +27 XX XXX XXXX<br />
                <strong>WhatsApp:</strong> +27 XX XXX XXXX
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-2 mt-6">What to Include in Your Report</h3>
            <ul>
              <li><strong>Article URL:</strong> Link to the article containing the error</li>
              <li><strong>Publication Date:</strong> When the article was published</li>
              <li><strong>Specific Error:</strong> Exact quote or information that is incorrect</li>
              <li><strong>Correct Information:</strong> What the accurate information should be</li>
              <li><strong>Source:</strong> Where you found the correct information (if applicable)</li>
              <li><strong>Your Contact Details:</strong> So we can follow up if needed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Recent Corrections</h2>
            <p>
              We publish all significant corrections and clarifications here to maintain transparency 
              with our readers. This section is updated regularly as corrections are made.
            </p>
            
            <div className="bg-gray-50 p-6 rounded">
              <p className="text-gray-600 italic">
                No recent corrections to display. This section will be updated when corrections 
                are published. We are committed to accuracy and will transparently report any 
                errors that occur in our coverage.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-2 mt-6">Correction Format</h3>
            <p>When corrections are published, they will follow this format:</p>
            
            <div className="bg-red-50 border border-red-200 p-4 rounded">
              <p><strong>CORRECTION - [Date]</strong></p>
              <p><strong>Article:</strong> [Article Title and URL]</p>
              <p><strong>Error:</strong> [Description of what was incorrect]</p>
              <p><strong>Correction:</strong> [Correct information]</p>
              <p><strong>Date Corrected:</strong> [When the correction was made]</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Standards for Corrections</h2>
            
            <h3 className="text-xl font-semibold mb-2">Prominence</h3>
            <ul>
              <li>Corrections appear prominently at the top of corrected articles</li>
              <li>Corrections page is easily accessible from our main navigation</li>
              <li>Significant corrections may be published as separate articles</li>
              <li>Social media corrections use the same prominence as original posts</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Clarity</h3>
            <ul>
              <li>Corrections clearly state what was wrong and what is right</li>
              <li>Language is straightforward and easy to understand</li>
              <li>Context is provided when necessary for clarity</li>
              <li>No attempt is made to minimize or hide errors</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Timeliness</h3>
            <ul>
              <li>Minor factual errors: Corrected within 2 hours when possible</li>
              <li>Significant errors: Corrected within 24 hours</li>
              <li>Complex errors requiring investigation: Interim notice published immediately</li>
              <li>Breaking news errors: Corrected as soon as identified</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Prevention Measures</h2>
            <p>
              While we will always correct errors when they occur, our primary focus is on 
              preventing them in the first place.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Editorial Processes</h3>
            <ul>
              <li>Multi-level fact-checking for all articles</li>
              <li>Verification of sources and quotes before publication</li>
              <li>Senior editor review for sensitive or complex stories</li>
              <li>Use of reliable, authoritative sources</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Training and Development</h3>
            <ul>
              <li>Regular accuracy training for all editorial staff</li>
              <li>Best practices workshops for fact-checking</li>
              <li>Review of common error patterns and prevention strategies</li>
              <li>Continuous professional development in journalism standards</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Technology and Tools</h3>
            <ul>
              <li>Fact-checking tools and verification software</li>
              <li>Multiple source verification requirements</li>
              <li>Editorial workflow systems with built-in checks</li>
              <li>Regular review of accuracy metrics and trends</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Reader Responsibility</h2>
            <p>
              While we take full responsibility for our content's accuracy, readers can help 
              maintain high standards by:
            </p>
            <ul>
              <li>Reading articles carefully and critically</li>
              <li>Checking multiple sources for important information</li>
              <li>Reporting suspected errors quickly and respectfully</li>
              <li>Providing specific, factual corrections rather than opinions</li>
              <li>Understanding the difference between disagreement and error</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Complaints Process</h2>
            <p>
              If you're not satisfied with how we've handled a correction or error, you can 
              escalate your concern:
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Internal Process</h3>
            <ol>
              <li>Contact the original reporter or section editor</li>
              <li>Escalate to the Editor-in-Chief if unsatisfied</li>
              <li>Final internal review by the Editorial Board</li>
            </ol>

            <h3 className="text-xl font-semibold mb-2">External Options</h3>
            <ul>
              <li>South African Press Council (for South African content)</li>
              <li>Zimbabwe Media Commission (for Zimbabwean content)</li>
              <li>International journalism ethics organizations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Transparency Commitment</h2>
            <p>
              Our commitment to transparency includes:
            </p>
            <ul>
              <li>Publishing all significant corrections publicly</li>
              <li>Maintaining this corrections page as a permanent record</li>
              <li>Providing annual accuracy reports when appropriate</li>
              <li>Sharing lessons learned with the broader journalism community</li>
              <li>Never removing or hiding original errors from the public record</li>
            </ul>
          </section>

          <section>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
              <h3 className="text-lg font-semibold mb-2">Thank You for Your Vigilance</h3>
              <p>
                Our readers are our most valuable fact-checkers. Your attention to detail and 
                willingness to report errors helps us maintain the highest standards of accuracy 
                in our coverage of South African and Zimbabwean news.
              </p>
              <p className="mt-2">
                Together, we can ensure that Report Focus News remains a trusted source of 
                accurate, reliable information for our community.
              </p>
            </div>
            
            <p className="text-sm text-gray-600 mt-8">
              Last updated: {new Date().toLocaleDateString()}<br />
              This page is reviewed monthly and updated as needed to reflect our current correction practices.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}