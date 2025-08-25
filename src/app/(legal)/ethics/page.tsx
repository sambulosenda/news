import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Ethics Policy - Report Focus News Journalism Standards',
  description: 'Ethics policy and code of conduct for Report Focus News. Our commitment to ethical journalism, transparency, and accountability in covering South Africa and Zimbabwe.',
  keywords: 'journalism ethics, code of conduct, editorial ethics, media ethics, Report Focus News ethics, journalistic integrity',
  alternates: {
    canonical: 'https://reportfocusnews.com/ethics',
  },
};

export default function EthicsPage() {
  return (
    <>
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="font-serif text-4xl font-bold mb-8">
            Ethics Policy & Code of Conduct
          </h1>

          <div className="bg-blue-50 p-6 rounded-lg not-prose mb-8">
            <p className="text-lg font-serif">
              Report Focus News is committed to the highest standards of journalistic ethics. 
              This policy guides our newsroom in maintaining integrity, independence, and public trust.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Core Ethical Principles</h2>
            
            <div className="bg-white p-6 border-l-4 border-red-600 mb-6">
              <h3 className="font-bold text-xl mb-3">1. Truth and Accuracy</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We pursue truth relentlessly and report it accurately</li>
                <li>We verify information before publication</li>
                <li>We distinguish between fact, opinion, and speculation</li>
                <li>We correct errors promptly and transparently</li>
                <li>We never knowingly publish false information</li>
              </ul>
            </div>

            <div className="bg-white p-6 border-l-4 border-blue-600 mb-6">
              <h3 className="font-bold text-xl mb-3">2. Independence</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We maintain editorial independence from all external influences</li>
                <li>We resist pressure from advertisers, sources, and political entities</li>
                <li>We avoid conflicts of interest and declare them when unavoidable</li>
                <li>We do not accept gifts, favors, or special treatment</li>
                <li>We make editorial decisions based on public interest</li>
              </ul>
            </div>

            <div className="bg-white p-6 border-l-4 border-green-600 mb-6">
              <h3 className="font-bold text-xl mb-3">3. Fairness and Impartiality</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We present multiple perspectives on controversial issues</li>
                <li>We give subjects of negative coverage opportunity to respond</li>
                <li>We treat all people with respect and dignity</li>
                <li>We avoid stereotypes based on race, gender, religion, or nationality</li>
                <li>We ensure balanced coverage across communities</li>
              </ul>
            </div>

            <div className="bg-white p-6 border-l-4 border-yellow-600 mb-6">
              <h3 className="font-bold text-xl mb-3">4. Accountability</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We take responsibility for our journalism</li>
                <li>We explain our editorial decisions when questioned</li>
                <li>We welcome feedback and respond to concerns</li>
                <li>We admit mistakes and learn from them</li>
                <li>We maintain transparent correction procedures</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Sourcing and Verification</h2>
            
            <h3 className="font-bold text-xl mb-3">Source Protection</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>We protect confidential sources without exception</li>
              <li>We clearly explain terms of anonymity before granting it</li>
              <li>We use anonymous sources only when necessary for important stories</li>
              <li>We verify information from anonymous sources through additional means</li>
            </ul>

            <h3 className="font-bold text-xl mb-3">Verification Standards</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>We require at least two independent sources for contested facts</li>
              <li>We verify user-generated content before publication</li>
              <li>We clearly label content that cannot be independently verified</li>
              <li>We fact-check claims made by public officials</li>
              <li>We consult experts for technical or specialized topics</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Conflicts of Interest</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3">Prohibited Activities</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Accepting payment for coverage or editorial decisions</li>
                <li>Trading on insider information obtained through journalism</li>
                <li>Participating in political activities that compromise objectivity</li>
                <li>Having financial interests in subjects we cover</li>
                <li>Using position for personal gain or advantage</li>
              </ul>
            </div>

            <h3 className="font-bold text-xl mb-3 mt-6">Disclosure Requirements</h3>
            <p className="text-gray-700 mb-3">
              Staff must disclose any potential conflicts including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Financial investments related to coverage areas</li>
              <li>Family relationships with newsmakers</li>
              <li>Previous employment or affiliations</li>
              <li>Personal relationships that could affect coverage</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Privacy and Consent</h2>
            
            <h3 className="font-bold text-xl mb-3">Privacy Principles</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>We respect individual privacy unless overridden by public interest</li>
              <li>We obtain consent before photographing or recording in private spaces</li>
              <li>We are especially careful with vulnerable individuals and minors</li>
              <li>We pixelate or obscure identities when safety requires it</li>
              <li>We handle victims of crime and trauma with sensitivity</li>
            </ul>

            <h3 className="font-bold text-xl mb-3">Public Interest Exceptions</h3>
            <p className="text-gray-700 mb-3">
              Privacy may be overridden when:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Exposing crime or serious wrongdoing</li>
              <li>Protecting public health and safety</li>
              <li>Preventing the public from being misled</li>
              <li>Revealing conflicts of interest in public officials</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Digital and Social Media</h2>
            
            <h3 className="font-bold text-xl mb-3">Online Standards</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Same ethical standards apply online as in print</li>
              <li>We verify social media content before using it</li>
              <li>We correct online errors as quickly as print errors</li>
              <li>We moderate comments to prevent hate speech and abuse</li>
              <li>We clearly distinguish between news and sponsored content</li>
            </ul>

            <h3 className="font-bold text-xl mb-3">Staff Social Media Guidelines</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Personal accounts should not compromise professional integrity</li>
              <li>Political opinions should not undermine perceived impartiality</li>
              <li>Confidential information must never be shared</li>
              <li>Breaking news goes to the newsroom first, not personal accounts</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Corrections and Clarifications</h2>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3">Our Commitment</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We correct errors promptly and prominently</li>
                <li>We don't hide or minimize our mistakes</li>
                <li>We explain what was wrong and what is correct</li>
                <li>We maintain a public corrections page</li>
                <li>We notify affected parties of significant corrections</li>
              </ul>
              <p className="mt-4 text-gray-700">
                Report corrections to: <a href="mailto:corrections@reportfocusnews.com" className="text-blue-600 hover:underline">corrections@reportfocusnews.com</a>
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Plagiarism and Attribution</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>We never present others' work as our own</li>
              <li>We attribute all quotes, data, and unique reporting</li>
              <li>We credit other news organizations when building on their work</li>
              <li>We respect intellectual property rights</li>
              <li>We obtain permission for copyrighted material</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Diversity and Inclusion</h2>
            
            <h3 className="font-bold text-xl mb-3">Coverage Commitments</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Represent all communities in South Africa and Zimbabwe</li>
              <li>Seek diverse voices and perspectives</li>
              <li>Challenge stereotypes and prejudices</li>
              <li>Use inclusive language and imagery</li>
              <li>Cover underrepresented communities fairly</li>
            </ul>

            <h3 className="font-bold text-xl mb-3">Newsroom Diversity</h3>
            <p className="text-gray-700">
              We strive for a newsroom that reflects the diversity of the communities we serve, 
              including diversity of race, ethnicity, gender, age, religion, economic background, 
              and life experience.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Advertising and Sponsorship</h2>
            
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="font-bold text-xl mb-3">Clear Separation</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Editorial content is never influenced by advertisers</li>
                <li>Sponsored content is clearly labeled</li>
                <li>Native advertising is distinguishable from news</li>
                <li>Editorial staff do not create advertising content</li>
                <li>Ad placement never implies editorial endorsement</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Regional Considerations</h2>
            
            <h3 className="font-bold text-xl mb-3">South Africa</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Respect constitutional values including human dignity and equality</li>
              <li>Consider the Press Code of Ethics and Conduct</li>
              <li>Be sensitive to the country's history and ongoing reconciliation</li>
              <li>Report on all 11 official languages' communities</li>
            </ul>

            <h3 className="font-bold text-xl mb-3">Zimbabwe</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Navigate political sensitivities while maintaining independence</li>
              <li>Protect sources in challenging press freedom environment</li>
              <li>Balance diaspora and local perspectives</li>
              <li>Report on rural and urban communities equally</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Enforcement and Accountability</h2>
            
            <h3 className="font-bold text-xl mb-3">Internal Processes</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Regular ethics training for all editorial staff</li>
              <li>Ethics committee reviews of challenging cases</li>
              <li>Clear procedures for reporting ethical concerns</li>
              <li>Protection for whistleblowers</li>
              <li>Annual review of ethics policy</li>
            </ul>

            <h3 className="font-bold text-xl mb-3">External Accountability</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Public editor/ombudsman role (when established)</li>
              <li>Engagement with press councils</li>
              <li>Transparency reports on our practices</li>
              <li>Open dialogue with readers and communities</li>
            </ul>
          </section>

          <section className="border-t pt-8">
            <div className="bg-gray-900 text-white p-8 rounded-lg not-prose">
              <h2 className="font-serif text-2xl font-bold mb-4">Report Ethical Concerns</h2>
              <p className="mb-4">
                If you believe we have violated our ethical standards, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Standards Editor:</strong> standards@reportfocusnews.com</p>
                <p><strong>Reader's Editor:</strong> readerseditor@reportfocusnews.com</p>
                <p><strong>Corrections:</strong> corrections@reportfocusnews.com</p>
              </div>
              <p className="mt-4 text-sm text-gray-300">
                All concerns are taken seriously and investigated thoroughly.
              </p>
            </div>
          </section>

          <section className="mt-8">
            <div className="bg-blue-50 p-4 rounded-lg not-prose">
              <p className="text-sm text-gray-700">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}<br />
                This ethics policy is a living document that evolves with journalism best practices 
                and community needs. We welcome feedback on how we can better serve the public interest.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}