import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Diversity Policy - Report Focus News',
  description: 'Our commitment to diversity, equity, and inclusion in news coverage and workplace practices.',
};

export default function DiversityPolicy() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-8">Diversity Policy</h1>
          
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Our Commitment to Diversity</h2>
            <p>
              Report Focus News is committed to diversity, equity, and inclusion in all aspects of our operations. 
              We believe that diverse perspectives strengthen our journalism and better serve the communities of 
              South Africa, Zimbabwe, and the broader Southern African region.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Diversity in Coverage</h2>
            
            <h3 className="text-xl font-semibold mb-2">Inclusive Storytelling</h3>
            <ul>
              <li>We actively seek diverse voices and perspectives in our reporting</li>
              <li>We cover stories from all communities, regardless of race, ethnicity, or social status</li>
              <li>We ensure our coverage reflects the demographic diversity of Southern Africa</li>
              <li>We challenge stereotypes and avoid discriminatory language</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Language and Accessibility</h3>
            <ul>
              <li>We respect the linguistic diversity of our region</li>
              <li>We provide content that is accessible to readers with disabilities</li>
              <li>We use clear, inclusive language that respects all communities</li>
              <li>We consider translation and multilingual content where appropriate</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Geographic Representation</h3>
            <ul>
              <li>We cover urban and rural communities equally</li>
              <li>We ensure all provinces and regions receive fair coverage</li>
              <li>We highlight stories from marginalized and underserved areas</li>
              <li>We maintain correspondents across diverse geographic locations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Diversity in Sources</h2>
            <ul>
              <li>We actively cultivate diverse expert sources</li>
              <li>We ensure gender balance in our sourcing</li>
              <li>We seek perspectives from different age groups</li>
              <li>We include voices from various economic backgrounds</li>
              <li>We platform indigenous knowledge and perspectives</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Workplace Diversity</h2>
            
            <h3 className="text-xl font-semibold mb-2">Hiring and Recruitment</h3>
            <ul>
              <li>We actively recruit from diverse talent pools</li>
              <li>We eliminate bias in our hiring processes</li>
              <li>We provide equal opportunities for advancement</li>
              <li>We support internship programs for underrepresented groups</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Inclusive Culture</h3>
            <ul>
              <li>We foster a workplace where all employees feel valued and respected</li>
              <li>We provide diversity and inclusion training</li>
              <li>We celebrate cultural diversity and different perspectives</li>
              <li>We have zero tolerance for discrimination or harassment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Community Engagement</h2>
            <ul>
              <li>We partner with diverse community organizations</li>
              <li>We attend and cover events from all communities</li>
              <li>We seek feedback from diverse audience segments</li>
              <li>We support journalism training in underserved communities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Accountability Measures</h2>
            <ul>
              <li>We regularly audit our coverage for diversity metrics</li>
              <li>We track the diversity of our sources and subjects</li>
              <li>We publish annual diversity reports</li>
              <li>We welcome feedback on our diversity efforts</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Regional Context</h2>
            <p>
              We recognize the unique diversity challenges and opportunities in Southern Africa, including:
            </p>
            <ul>
              <li>The legacy of apartheid and colonialism</li>
              <li>Ongoing economic inequality</li>
              <li>Cultural and tribal diversity</li>
              <li>Gender equality challenges</li>
              <li>LGBTQ+ rights and representation</li>
              <li>Disability inclusion</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Contact Us</h2>
            <p>
              For questions, suggestions, or concerns about our diversity efforts, please contact our 
              Diversity and Inclusion team at: <a href="mailto:diversity@reportfocusnews.com" className="text-red-700 hover:underline">diversity@reportfocusnews.com</a>
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