import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Publishing Principles - Report Focus News',
  description: 'Our editorial guidelines and publishing standards for news coverage in South Africa and Zimbabwe.',
};

export default function PublishingPrinciples() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-8">Publishing Principles</h1>
          
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Editorial Independence</h2>
            <p>
              Report Focus News maintains complete editorial independence. Our news coverage is guided solely by 
              journalistic merit and public interest, free from political, commercial, or other external influences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Content Standards</h2>
            
            <h3 className="text-xl font-semibold mb-2">News Selection</h3>
            <ul>
              <li>Newsworthiness based on public interest and impact</li>
              <li>Relevance to South African and Zimbabwean audiences</li>
              <li>Timeliness and significance of events</li>
              <li>Balance between different types of news (politics, business, society, etc.)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Verification Process</h3>
            <ul>
              <li>All facts must be verified through multiple sources</li>
              <li>Documents and data must be authenticated</li>
              <li>Images and videos must be verified for authenticity</li>
              <li>Claims must be fact-checked before publication</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Writing Standards</h3>
            <ul>
              <li>Clear, concise, and accessible language</li>
              <li>Objective tone in news reporting</li>
              <li>Clear distinction between news and opinion</li>
              <li>Proper attribution and citation of sources</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Types of Content</h2>
            
            <h3 className="text-xl font-semibold mb-2">News Articles</h3>
            <p>Factual reporting of current events with verified information and balanced perspectives.</p>
            
            <h3 className="text-xl font-semibold mb-2">Analysis</h3>
            <p>In-depth examination of news events providing context and expert interpretation.</p>
            
            <h3 className="text-xl font-semibold mb-2">Opinion/Editorial</h3>
            <p>Clearly labeled commentary representing the views of writers or the editorial board.</p>
            
            <h3 className="text-xl font-semibold mb-2">Features</h3>
            <p>Long-form storytelling on topics of human interest and societal importance.</p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Corrections and Updates</h2>
            <ul>
              <li>Errors are corrected promptly and transparently</li>
              <li>Corrections are clearly marked with timestamp</li>
              <li>Significant corrections are noted at the top of articles</li>
              <li>Updates to developing stories are clearly indicated</li>
              <li>Previous versions are archived when appropriate</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Transparency</h2>
            
            <h3 className="text-xl font-semibold mb-2">Bylines and Attribution</h3>
            <ul>
              <li>All articles include clear bylines</li>
              <li>Contributing authors are properly credited</li>
              <li>Wire service content is clearly labeled</li>
              <li>Guest contributors are identified</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Conflicts of Interest</h3>
            <ul>
              <li>Potential conflicts are disclosed to readers</li>
              <li>Financial interests are transparently declared</li>
              <li>Personal relationships relevant to coverage are noted</li>
              <li>Journalists recuse themselves when conflicts arise</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Legal and Ethical Compliance</h2>
            <ul>
              <li>Adherence to South African and Zimbabwean media laws</li>
              <li>Respect for copyright and intellectual property</li>
              <li>Protection of minors in reporting</li>
              <li>Responsible reporting on sensitive topics (suicide, violence, etc.)</li>
              <li>Respect for privacy rights</li>
              <li>Compliance with court orders and legal restrictions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Digital Publishing Standards</h2>
            <ul>
              <li>Headlines accurately reflect article content</li>
              <li>Social media posts are factual and responsible</li>
              <li>SEO practices do not compromise editorial integrity</li>
              <li>Multimedia content is properly licensed and credited</li>
              <li>User-generated content is verified before use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Advertising and Sponsorship</h2>
            <ul>
              <li>Clear separation between editorial and advertising content</li>
              <li>Sponsored content is clearly labeled</li>
              <li>Native advertising is distinguishable from news</li>
              <li>Advertisers have no influence on editorial decisions</li>
              <li>Political advertising is clearly marked</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Regional Considerations</h2>
            <p>
              Our publishing principles are adapted to the Southern African context:
            </p>
            <ul>
              <li>Sensitivity to cultural and linguistic diversity</li>
              <li>Understanding of regional political dynamics</li>
              <li>Commitment to promoting democracy and human rights</li>
              <li>Focus on development and economic empowerment stories</li>
              <li>Platform for diverse African voices</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Review and Updates</h2>
            <p>
              These publishing principles are reviewed annually and updated as needed to reflect 
              evolving journalistic standards and regional needs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Contact</h2>
            <p>
              Questions about our publishing principles can be directed to: 
              <a href="mailto:editor@reportfocusnews.com" className="text-red-700 hover:underline">editor@reportfocusnews.com</a>
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-600 mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}