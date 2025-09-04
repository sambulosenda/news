import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Editorial Standards - Report Focus News',
  description: 'Our comprehensive editorial standards and journalistic principles for accurate, fair, and ethical news reporting in South Africa and Zimbabwe.',
  keywords: 'editorial standards, journalism ethics, news standards, South Africa news, Zimbabwe news, media integrity',
};

export default function EditorialStandards() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-8">Editorial Standards</h1>
          
          <section className="mb-8">
            <p className="lead text-xl text-gray-700 mb-6">
              Report Focus News maintains the highest editorial standards to ensure accurate, 
              fair, and ethical journalism that serves the public interest in South Africa and Zimbabwe.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Accuracy and Verification</h2>
            
            <h3 className="text-xl font-semibold mb-2">Fact-Checking Process</h3>
            <ul>
              <li>All facts are verified through at least two independent sources</li>
              <li>Primary sources are prioritized over secondary reporting</li>
              <li>Claims by public figures are fact-checked against official records</li>
              <li>Statistical data is verified through original sources</li>
              <li>Expert opinions are sought from qualified professionals</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Source Verification</h3>
            <ul>
              <li>Sources are vetted for credibility and expertise</li>
              <li>Anonymous sources must be approved by senior editors</li>
              <li>Information from social media requires independent verification</li>
              <li>Government and institutional claims are cross-referenced</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Editorial Independence</h2>
            
            <h3 className="text-xl font-semibold mb-2">Editorial Decision Making</h3>
            <ul>
              <li>Editorial decisions are made independently of commercial considerations</li>
              <li>News coverage is not influenced by advertisers or sponsors</li>
              <li>Political independence is maintained across all coverage</li>
              <li>Editorial content is clearly separated from advertising</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Conflict of Interest</h3>
            <ul>
              <li>Staff disclose potential conflicts of interest to editors</li>
              <li>Financial interests in covered companies are disclosed</li>
              <li>Personal relationships with news subjects are reported</li>
              <li>Gifts and hospitality are declined or disclosed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Fairness and Balance</h2>
            
            <h3 className="text-xl font-semibold mb-2">Balanced Reporting</h3>
            <ul>
              <li>Multiple perspectives are presented on controversial issues</li>
              <li>Opposing viewpoints are given fair representation</li>
              <li>Context is provided to help readers understand complex issues</li>
              <li>Minority opinions are included when relevant</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Right of Reply</h3>
            <ul>
              <li>Subjects of critical coverage are offered opportunity to respond</li>
              <li>Responses are published promptly and prominently</li>
              <li>Reasonable time is allowed for responses to serious allegations</li>
              <li>Clarifications are published when misunderstandings occur</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Language and Style</h2>
            
            <h3 className="text-xl font-semibold mb-2">Writing Standards</h3>
            <ul>
              <li>Clear, concise language accessible to general readers</li>
              <li>Technical terms explained when necessary</li>
              <li>Active voice preferred over passive construction</li>
              <li>Jargon and acronyms defined on first use</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Cultural Sensitivity</h3>
            <ul>
              <li>Respectful terminology for all cultural and ethnic groups</li>
              <li>Awareness of regional sensitivities and context</li>
              <li>Inclusive language that serves diverse audiences</li>
              <li>Careful consideration of historical and social context</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Legal and Ethical Compliance</h2>
            
            <h3 className="text-xl font-semibold mb-2">Legal Standards</h3>
            <ul>
              <li>Compliance with South African and Zimbabwean media laws</li>
              <li>Respect for court orders and reporting restrictions</li>
              <li>Protection of minors' identities in criminal cases</li>
              <li>Adherence to privacy and defamation laws</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Ethical Guidelines</h3>
            <ul>
              <li>Respect for human dignity in all reporting</li>
              <li>Sensitivity in reporting on trauma and tragedy</li>
              <li>Protection of vulnerable sources and subjects</li>
              <li>Responsible use of graphic images and content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Digital Media Standards</h2>
            
            <h3 className="text-xl font-semibold mb-2">Online Content</h3>
            <ul>
              <li>Same editorial standards apply to digital and traditional media</li>
              <li>Headlines accurately reflect article content</li>
              <li>Social media posts maintain journalistic integrity</li>
              <li>User-generated content is moderated for accuracy</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Multimedia Content</h3>
            <ul>
              <li>Photos and videos are accurately captioned</li>
              <li>Image manipulation is disclosed when used</li>
              <li>Audio and video content maintains editorial standards</li>
              <li>Copyright and permissions are respected</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Corrections and Accountability</h2>
            
            <h3 className="text-xl font-semibold mb-2">Error Correction</h3>
            <ul>
              <li>Errors are corrected promptly and transparently</li>
              <li>Corrections are published prominently</li>
              <li>Original errors are not removed but marked as corrected</li>
              <li>Significant errors trigger internal review process</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Public Accountability</h3>
            <ul>
              <li>Readers can contact editors about editorial concerns</li>
              <li>Complaints are investigated and addressed</li>
              <li>Editorial decisions are explained when requested</li>
              <li>Regular review of editorial practices and standards</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Staff Training and Development</h2>
            <ul>
              <li>Regular training on journalistic ethics and standards</li>
              <li>Updates on legal requirements and best practices</li>
              <li>Cultural sensitivity and diversity training</li>
              <li>Digital journalism and fact-checking skills development</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Reader Engagement</h2>
            <ul>
              <li>Reader feedback is welcomed and considered</li>
              <li>Comments are moderated for constructive dialogue</li>
              <li>Community concerns are reflected in news coverage</li>
              <li>Transparency about editorial processes and decisions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Contact Our Editorial Team</h2>
            <p>
              Questions about our editorial standards or specific coverage decisions can be directed to:
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <p>
                <strong>Editor-in-Chief:</strong> <a href="mailto:editorial@reportfocusnews.com" className="text-red-700 hover:underline">editorial@reportfocusnews.com</a><br />
                <strong>Editorial Standards:</strong> <a href="mailto:editorial@reportfocusnews.com" className="text-red-700 hover:underline">editorial@reportfocusnews.com</a><br />
                <strong>Complaints:</strong> <a href="mailto:editorial@reportfocusnews.com" className="text-red-700 hover:underline">editorial@reportfocusnews.com</a>
              </p>
            </div>
          </section>

          <section>
            <p className="text-sm text-gray-600 mt-8">
              Last updated: {new Date().toLocaleDateString()}<br />
              These standards are reviewed annually and updated as needed to reflect best practices in journalism.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}