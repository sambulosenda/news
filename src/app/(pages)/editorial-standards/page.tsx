import { Metadata } from 'next';
import Link from 'next/link';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Editorial Standards & Guidelines',
  description: 'Our commitment to accurate, fair, and ethical journalism. Learn about Report Focus News editorial standards and practices.',
  alternates: {
    canonical: 'https://reportfocusnews.com/editorial-standards/',
  },
};

export default function EditorialStandardsPage() {
  return (
    <>
      <HeaderWrapper />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="prose prose-lg max-w-none">
          <h1>Editorial Standards & Guidelines</h1>
          
          <section className="mb-8">
            <h2>Our Mission</h2>
            <p>
              Report Focus News is committed to providing accurate, timely, and comprehensive news coverage 
              of South Africa and Zimbabwe. We adhere to the highest standards of journalistic integrity 
              and ethical reporting.
            </p>
          </section>

          <section className="mb-8">
            <h2>Editorial Principles</h2>
            <ul>
              <li><strong>Accuracy:</strong> We verify all information through multiple sources before publication</li>
              <li><strong>Fairness:</strong> We present balanced coverage and seek multiple perspectives</li>
              <li><strong>Independence:</strong> Our editorial content is free from undue influence</li>
              <li><strong>Transparency:</strong> We clearly identify sources and potential conflicts of interest</li>
              <li><strong>Accountability:</strong> We correct errors promptly and transparently</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2>Fact-Checking Process</h2>
            <p>
              All news articles undergo a rigorous fact-checking process:
            </p>
            <ol>
              <li>Primary source verification</li>
              <li>Cross-reference with official records</li>
              <li>Expert consultation where appropriate</li>
              <li>Editorial review before publication</li>
              <li>Post-publication monitoring for accuracy</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2>Source Protection</h2>
            <p>
              We protect the confidentiality of sources who provide information in confidence. 
              Anonymous sources are used only when necessary for public interest stories, 
              and such usage is clearly indicated to readers.
            </p>
          </section>

          <section className="mb-8">
            <h2>Corrections Policy</h2>
            <p>
              When we make an error, we correct it quickly and transparently. Corrections are 
              published prominently and linked to the original article. Readers can report 
              errors through our <Link href="/contact">contact form</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2>Editorial Independence</h2>
            <p>
              Our newsroom maintains editorial independence from business operations, advertisers, 
              and political interests. Editorial decisions are made solely based on news value 
              and public interest.
            </p>
          </section>

          <section className="mb-8">
            <h2>Conflict of Interest</h2>
            <p>
              Our journalists disclose any potential conflicts of interest. We maintain clear 
              boundaries between editorial content and business relationships.
            </p>
          </section>

          <section className="mb-8">
            <h2>Contact Editorial Team</h2>
            <p>
              For editorial inquiries, story tips, or feedback about our coverage:
            </p>
            <ul>
              <li>Email: <a href="mailto:editorial@reportfocusnews.com">editorial@reportfocusnews.com</a></li>
              <li>Tips: <a href="mailto:tips@reportfocusnews.com">tips@reportfocusnews.com</a></li>
            </ul>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}