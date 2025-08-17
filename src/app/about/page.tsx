import { Metadata } from 'next';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us - Report Focus News',
  description: 'Learn about Report Focus News, your trusted source for South African and Zimbabwe news coverage.',
};

export default function About() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-8">About Report Focus News</h1>
          
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Who We Are</h2>
            <p className="lead text-xl">
              Report Focus News is a leading digital news platform dedicated to providing comprehensive, 
              accurate, and timely coverage of events in South Africa, Zimbabwe, and the broader Southern African region.
            </p>
            <p>
              Founded with a mission to inform, educate, and empower our readers, we strive to be the most 
              trusted source for regional news, analysis, and commentary. Our team of experienced journalists 
              and contributors work tirelessly to bring you the stories that matter most.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Our Mission</h2>
            <p>
              To deliver independent, factual, and impactful journalism that serves the public interest 
              and strengthens democracy in Southern Africa. We believe in the power of informed citizens 
              to shape their communities and nations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Our Coverage</h2>
            <p>We provide comprehensive coverage across multiple sectors:</p>
            <ul>
              <li><strong>Politics:</strong> Government, elections, policy, and governance</li>
              <li><strong>Business:</strong> Markets, economy, entrepreneurship, and innovation</li>
              <li><strong>Society:</strong> Education, health, culture, and community issues</li>
              <li><strong>Sports:</strong> Local and international sporting events</li>
              <li><strong>Entertainment:</strong> Arts, culture, and lifestyle</li>
              <li><strong>Technology:</strong> Digital transformation and innovation</li>
              <li><strong>Opinion:</strong> Thought leadership and diverse perspectives</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Our Values</h2>
            
            <h3 className="text-xl font-semibold mb-2">Independence</h3>
            <p>We maintain editorial independence from political and commercial interests.</p>
            
            <h3 className="text-xl font-semibold mb-2">Accuracy</h3>
            <p>We are committed to factual reporting and rigorous fact-checking.</p>
            
            <h3 className="text-xl font-semibold mb-2">Fairness</h3>
            <p>We present balanced perspectives and give voice to all communities.</p>
            
            <h3 className="text-xl font-semibold mb-2">Accountability</h3>
            <p>We take responsibility for our work and correct errors transparently.</p>
            
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p>We embrace digital innovation to better serve our audiences.</p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Our Team</h2>
            <p>
              Report Focus News brings together experienced journalists, editors, and digital media 
              professionals from across Southern Africa. Our diverse team includes:
            </p>
            <ul>
              <li>Investigative journalists uncovering stories that matter</li>
              <li>Political correspondents providing insight into governance</li>
              <li>Business reporters tracking economic developments</li>
              <li>Community journalists telling local stories</li>
              <li>Digital specialists ensuring accessible content delivery</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Our Reach</h2>
            <p>
              With readers across South Africa, Zimbabwe, and the diaspora, Report Focus News serves 
              millions of readers monthly. We publish in English to reach the widest possible audience 
              while respecting the linguistic diversity of our region.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Awards and Recognition</h2>
            <p>
              Our commitment to excellence in journalism has been recognized through various awards 
              and partnerships with leading media organizations across Africa.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Partner With Us</h2>
            <p>
              We welcome partnerships with organizations that share our commitment to quality journalism 
              and public service. For partnership inquiries, please contact us at: 
              <a href="mailto:partnerships@reportfocusnews.com" className="text-red-700 hover:underline">partnerships@reportfocusnews.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Contact Us</h2>
            <p>
              <strong>General Inquiries:</strong> <a href="mailto:info@reportfocusnews.com" className="text-red-700 hover:underline">info@reportfocusnews.com</a><br />
              <strong>Newsroom:</strong> <a href="mailto:news@reportfocusnews.com" className="text-red-700 hover:underline">news@reportfocusnews.com</a><br />
              <strong>Advertising:</strong> <a href="mailto:advertising@reportfocusnews.com" className="text-red-700 hover:underline">advertising@reportfocusnews.com</a>
            </p>
          </section>

          <section>
            <p className="text-sm text-gray-600 mt-8">
              Report Focus News - Bringing Africa's Stories to the World
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}