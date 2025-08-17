import { Metadata } from 'next';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import FAQSchema from '@/components/FAQSchema';

export const metadata: Metadata = {
  title: 'Immigration & Visa FAQ - South Africa & Zimbabwe Travel Requirements',
  description: 'Visa requirements, work permits, residency, and immigration information for South Africa and Zimbabwe. Tourist visas, business visas, and permit applications explained.',
  keywords: 'South Africa visa, Zimbabwe visa, work permit SA, critical skills visa, tourist visa, business visa, visa requirements, immigration SA, Zimbabwe immigration',
  alternates: {
    canonical: 'https://reportfocusnews.com/faq/immigration',
  },
};

const immigrationFAQs = [
  {
    question: 'Do I need a visa to visit South Africa?',
    answer: 'Visa requirements for South Africa depend on your nationality. Citizens of 75+ countries (including USA, UK, EU) can visit visa-free for up to 90 days. SADC citizens generally get 30 days visa-free. Others need to apply for a visa before travel. Check with the South African embassy in your country or the DHA website for specific requirements.',
  },
  {
    question: 'How do I apply for a South African tourist visa?',
    answer: 'To apply for a SA tourist visa: 1) Complete Form BI-84, 2) Provide valid passport (30+ days validity, 2 blank pages), 3) Two passport photos, 4) Return flight tickets, 5) Proof of accommodation, 6) Proof of sufficient funds (bank statements), 7) Yellow fever certificate if from endemic area, 8) Pay visa fee (varies by country). Submit at SA embassy/consulate or VFS Global center.',
  },
  {
    question: 'What is a critical skills visa for South Africa?',
    answer: 'A critical skills visa allows qualified professionals in high-demand fields to work in SA. Eligible fields include: engineering, ICT, health professions, sciences, agriculture, and more. Requirements: qualification in critical skill area, SAQA evaluation of foreign qualifications, professional registration where applicable, and job offer (recommended but not mandatory). Valid for up to 5 years.',
  },
  {
    question: 'How long can I stay in South Africa on a tourist visa?',
    answer: 'Tourist visa duration varies: Visa-free nationals get 30-90 days depending on country. Standard tourist visa: up to 90 days. Extensions possible for good cause up to 90 additional days. Must leave SA before visa expires to avoid being declared undesirable. Overstaying can result in 1-5 year ban from entering South Africa.',
  },
  {
    question: 'What documents do I need for Zimbabwe visa?',
    answer: 'For Zimbabwe visa you need: Valid passport (6+ months validity), completed visa application form, two passport photos, proof of accommodation, return flight tickets, proof of sufficient funds ($500+ recommended), yellow fever certificate if applicable. Tourist visa can be obtained on arrival for many nationalities at airports and land borders. Business visa requires invitation letter.',
  },
  {
    question: 'Can I get a Zimbabwe visa on arrival?',
    answer: 'Yes, citizens of most countries can get Zimbabwe visa on arrival. Categories: Category A (free entry), Category B ($30-75 on arrival), Category C (must apply in advance). Most Western countries fall under Category B. Fees: Single entry $30-55, Double entry $45-70, Multiple entry $55-100. Payment in USD cash preferred at borders.',
  },
  {
    question: 'How do I apply for permanent residence in South Africa?',
    answer: 'SA permanent residence categories include: Direct residence (5+ years continuous work/spousal/life partner permits), Business (R5 million investment), Retired persons (R37,000 monthly income), Financially independent (R12 million net worth), or Relative of SA citizen/permanent resident. Process takes 18-24 months. Must not leave SA for more than 90 days per year while application pending.',
  },
  {
    question: 'What is the ZEP (Zimbabwe Exemption Permit)?',
    answer: 'The Zimbabwe Exemption Permit allowed Zimbabweans to live and work in SA temporarily. The ZEP program ended in 2023, with permits valid until June 2025. ZEP holders must apply for other visa categories (work, business, critical skills) before expiry or return to Zimbabwe. No new ZEPs are being issued. Consult immigration lawyers for transition options.',
  },
  {
    question: 'Can I work in South Africa on a tourist visa?',
    answer: 'No, you cannot work on a tourist visa in South Africa. Working without proper authorization is illegal and can result in deportation and being declared undesirable. To work legally, you need: General work visa (with job offer), Critical skills visa, Intra-company transfer visa, or Business visa. Violation can result in 1-5 year ban from SA.',
  },
  {
    question: 'How long does SA visa processing take?',
    answer: 'SA visa processing times vary: Tourist visa: 5-10 working days, Work visa: 8-12 weeks, Critical skills: 8-12 weeks, Permanent residence: 18-24 months, Appeals: 6-12 months. Premium/express services available at some missions. Apply well in advance of travel dates. VFS Global handles applications in many countries.',
  },
  {
    question: 'What is KAZA UniVisa?',
    answer: 'KAZA UniVisa allows travel between Zimbabwe and Zambia (and day trips to Botswana via Kazungula). Cost: $50 for 30 days. Available at: Victoria Falls, Harare, Lusaka airports, and Kazungula borders. Perfect for tourists visiting Victoria Falls from both sides. Not valid for employment. Can be extended once for another 30 days.',
  },
  {
    question: 'Can I study in South Africa on a tourist visa?',
    answer: 'No, you need a study visa to study in South Africa. Study visa requirements: Letter of acceptance from recognized institution, proof of medical cover, proof of sufficient funds, police clearance certificates, medical and radiological reports, proof of accommodation. Study visas allow part-time work (20 hours/week). Must be renewed annually.',
  },
  {
    question: 'What happens if my visa expires while in SA?',
    answer: 'If your visa expires: You become an illegal foreigner immediately, face arrest and deportation, may be declared undesirable (banned 1-5 years), pay admission of guilt fine (R2,500-R5,000), and detained until deportation. If visa expiring: apply for extension 60 days before expiry, or leave SA before expiry date. Good cause required for extensions.',
  },
  {
    question: 'Do children need visas for South Africa?',
    answer: 'Children need same visas as adults plus additional documents: Unabridged birth certificate (showing both parents), consent affidavit from non-traveling parent(s), death certificate if parent deceased, court order if sole custody, and contact details of parents. These requirements apply even for visa-exempt nationals. Both parents should be present at immigration or provide consent.',
  },
  {
    question: 'Can I convert my visa status while in South Africa?',
    answer: 'Generally, you cannot change visa status within SA (must apply from home country). Exceptions: Spouse of SA citizen/permanent resident, Life partner visa, Children of SA citizens. Tourist to work visa changes not allowed in country. Must leave SA and apply from country of origin. Some critical skills applications possible in-country with good cause.',
  },
];

export default function ImmigrationFAQ() {
  return (
    <>
      <FAQSchema 
        faqs={immigrationFAQs}
        pageTitle="Immigration & Visa FAQ - South Africa & Zimbabwe"
        pageDescription="Complete guide to visas, permits, and immigration for South Africa and Zimbabwe"
      />
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-4">
            Immigration & Visa FAQ: SA & Zimbabwe Travel Guide
          </h1>
          
          <p className="text-xl text-gray-700 mb-8">
            Essential information about visas, work permits, and immigration requirements for 
            South Africa and Zimbabwe. From tourist visas to permanent residence.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
            <p className="font-semibold">
              ✈️ Important: Visa requirements change frequently. Always verify with official sources before travel.
            </p>
          </div>

          <div className="space-y-8">
            {immigrationFAQs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h2 className="font-serif text-2xl font-bold mb-3">
                  {faq.question}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <section className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h2 className="font-serif text-2xl font-bold mb-4">
              Official Immigration Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">South Africa</h3>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>DHA:</strong> www.dha.gov.za</li>
                  <li>• <strong>VFS Global:</strong> SA visa applications</li>
                  <li>• <strong>Immigration Hotline:</strong> 0800 60 11 90</li>
                  <li>• <strong>Email:</strong> info@dha.gov.za</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Zimbabwe</h3>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Immigration:</strong> www.zimimmigration.gov.zw</li>
                  <li>• <strong>Embassies:</strong> Check nearest location</li>
                  <li>• <strong>Border Posts:</strong> 24/7 at main borders</li>
                  <li>• <strong>Tourist Info:</strong> zimbabwetourism.net</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Visa Fees</h3>
              <ul className="text-sm space-y-1">
                <li>• SA Tourist: R425-R1,350</li>
                <li>• SA Work: R1,520</li>
                <li>• ZW on arrival: $30-100</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Processing Times</h3>
              <ul className="text-sm space-y-1">
                <li>• Tourist: 5-10 days</li>
                <li>• Work: 8-12 weeks</li>
                <li>• PR: 18-24 months</li>
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Key Requirements</h3>
              <ul className="text-sm space-y-1">
                <li>• Valid passport</li>
                <li>• Proof of funds</li>
                <li>• Return tickets</li>
              </ul>
            </div>
          </section>

          <section className="mt-8 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-sm">
              <strong>Disclaimer:</strong> Immigration laws change frequently. This information is for guidance only. 
              Always consult official government sources or immigration lawyers for current requirements. 
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}