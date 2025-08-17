import { Metadata } from 'next';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Ethics Policy - Report Focus News',
  description: 'Our commitment to ethical journalism and editorial standards for South African and Zimbabwe news coverage.',
};

export default function EthicsPolicy() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-8">Ethics Policy</h1>
          
          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Our Commitment to Ethical Journalism</h2>
            <p>
              Report Focus News is committed to the highest standards of journalism ethics in our coverage of 
              South African and Zimbabwean news. We adhere to principles of accuracy, independence, fairness, 
              and accountability in all our reporting.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Core Principles</h2>
            
            <h3 className="text-xl font-semibold mb-2">1. Accuracy and Truthfulness</h3>
            <ul>
              <li>We strive for accuracy and truth in all our reporting</li>
              <li>We verify information before publication</li>
              <li>We promptly correct errors when identified</li>
              <li>We distinguish between facts, opinion, and speculation</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">2. Independence</h3>
            <ul>
              <li>We maintain editorial independence from political and commercial interests</li>
              <li>We disclose any potential conflicts of interest</li>
              <li>We refuse gifts or favors that could compromise our integrity</li>
              <li>We do not allow advertisers to influence our editorial content</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">3. Fairness and Impartiality</h3>
            <ul>
              <li>We present multiple perspectives on controversial issues</li>
              <li>We give subjects of critical coverage opportunity to respond</li>
              <li>We avoid stereotyping by race, gender, age, religion, ethnicity, or social status</li>
              <li>We respect the dignity and privacy of individuals</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">4. Accountability</h3>
            <ul>
              <li>We acknowledge and correct mistakes promptly</li>
              <li>We welcome feedback from our readers</li>
              <li>We explain our editorial decisions when appropriate</li>
              <li>We hold ourselves accountable to the public interest</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Regional Considerations</h2>
            <p>
              Given our focus on South African and Zimbabwean news, we are particularly sensitive to:
            </p>
            <ul>
              <li>The diverse cultural and linguistic landscape of Southern Africa</li>
              <li>Historical sensitivities and ongoing social challenges</li>
              <li>The importance of promoting democratic values and human rights</li>
              <li>The need for responsible reporting on political and economic issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Sources and Attribution</h2>
            <ul>
              <li>We identify sources whenever feasible</li>
              <li>We protect confidential sources who face danger or retribution</li>
              <li>We verify information from anonymous sources through multiple channels</li>
              <li>We attribute information that is not our original reporting</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Digital Standards</h2>
            <ul>
              <li>We apply the same ethical standards to online content as print</li>
              <li>We moderate user comments to prevent hate speech and misinformation</li>
              <li>We clearly label sponsored content and advertisements</li>
              <li>We respect intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-serif text-2xl font-bold mb-4">Complaints and Corrections</h2>
            <p>
              If you believe we have violated our ethics policy or made an error in our reporting, 
              please contact us at: <a href="mailto:editor@reportfocusnews.com" className="text-red-700 hover:underline">editor@reportfocusnews.com</a>
            </p>
            <p>
              We investigate all legitimate complaints and publish corrections prominently when warranted.
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