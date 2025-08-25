import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import FAQSchema from '@/components/seo/FAQSchema';

export const metadata: Metadata = {
  title: 'Government Services FAQ - ID, Licenses, Grants | South Africa & Zimbabwe',
  description: 'How to apply for ID documents, drivers licenses, SASSA grants, passports, and other government services in South Africa and Zimbabwe.',
  keywords: 'South Africa ID application, SASSA grants, drivers license renewal, passport application, birth certificate, Zimbabwe ID, government services',
  alternates: {
    canonical: 'https://reportfocusnews.com/faq/government',
  },
};

const governmentFAQs = [
  {
    question: 'How do I apply for a South African ID?',
    answer: 'To apply for SA ID: Visit any Home Affairs office with: birth certificate (if first time), biometric photos will be taken at office, R140 fee for first issue, fingerprints taken electronically. For smart ID card: same process but costs R140. Lost ID: police affidavit required plus R140. Processing: 2-8 weeks for collection. Age 16+ can apply. Online booking available for appointments.',
  },
  {
    question: 'How do I apply for SASSA grants in South Africa?',
    answer: 'SASSA grants available: Child Support (R510), Old Age (R2,090), Disability (R2,090), Foster Care (R1,130), Care Dependency (R2,090), Grant-in-Aid (R510), Social Relief of Distress (R350). Apply at SASSA office with: SA ID, proof of income, bank statements, medical reports (for disability), birth certificates (for child grant). Must pass means test. Payment via bank, Post Office, or CashSend.',
  },
  {
    question: 'How do I renew my drivers license in South Africa?',
    answer: 'Renew SA drivers license: Book online at www.natis.gov.za or walk-in, visit DLTC with: ID, current license, proof of address, eye test certificate (valid 6 months), R250 fee for light vehicle, R350 for heavy vehicle. Renew before expiry or pay R100 penalty per expired license card. Temporary license valid while waiting. Collection: 5-6 weeks.',
  },
  {
    question: 'How do I apply for a South African passport?',
    answer: 'SA passport application: Apply at Home Affairs or bank (FNB, Standard Bank, Nedbank). Requirements: SA ID, completed Form BI-73, R400 fee (adult), R250 (child), parental consent for minors. Tourist passport: 32 pages, Maxi: 48 pages (R400). Processing: 10-13 working days normal, 5 days express (additional R200). Valid for 10 years (adult), 5 years (minor).',
  },
  {
    question: 'How do I get an unabridged birth certificate in SA?',
    answer: 'Unabridged birth certificate shows both parents details. Apply at Home Affairs with: ID of applicant, completed Form BI-154, R75 fee. If applying for child: both parents IDs or death certificate if deceased. Processing: 6-8 weeks. Can apply online via eHomeAffairs. Required for: visa applications, traveling with minors, school registration. Abridged (R20) only shows child details.',
  },
  {
    question: 'How do I register a birth in South Africa?',
    answer: 'Register birth within 30 days at Home Affairs. Requirements: Form BI-24 (given at hospital), parents IDs or passports, parents marriage certificate (if married), proof of birth from hospital/clinic. Late registration (after 30 days): requires additional forms and R70 fee. Birth certificate issued free first time. Unmarried parents: both must be present or affidavit required.',
  },
  {
    question: 'How do I apply for Zimbabwe national ID?',
    answer: 'Zimbabwe ID application: Visit any Registrar General office with: birth certificate, proof of residence, two passport photos, $3-10 fee (citizens), parents IDs if under 18. Metal ID being phased out for plastic cards. E-passport also serves as ID. Processing: 1-3 months normal, same day for urgent (higher fee). Age 16+ must have ID by law.',
  },
  {
    question: 'What is the R350 SRD grant?',
    answer: 'Social Relief of Distress (R350) grant for unemployed South Africans: Apply online at srd.sassa.gov.za, WhatsApp 082 046 8553, or USSD *134*7737#. Requirements: SA citizen/permanent resident, 18-60 years, unemployed, no other income/grants, not receiving UIF. Monthly applications required. Payment via bank, ShopRite, Pick n Pay, Boxer, or Post Office. Appeals possible if declined.',
  },
  {
    question: 'How do I get a Police Clearance Certificate in SA?',
    answer: 'Police clearance (PCC) application: Apply at any police station with: SA ID, completed form, R114 fee (fingerprints). For immigration: specific forms required. Processing: 4-8 weeks. Valid for 6 months from issue. Can apply online via SAPS website. Required for: visa applications, employment, adoption. Foreign nationals can also apply with passport.',
  },
  {
    question: 'How do I register a death in South Africa?',
    answer: 'Register death within 7 days at Home Affairs. Requirements: BI-1663 form from hospital/doctor, deceased ID, informant ID. Death certificate issued free (first copy). Burial order provided for funeral. If death at home: police must be called first. Stillborn: different process with BI-1664 form. Multiple certified copies: R20 each. Required for: estate, insurance, bank accounts.',
  },
  {
    question: 'How do I change my surname in South Africa?',
    answer: 'Change surname at Home Affairs with: ID, completed Form BI-85, R125 fee for adults (R60 for minors), marriage certificate (if due to marriage), divorce decree (if reverting), deed poll for other changes. Processing: 6-8 weeks. Must update: ID, passport, drivers license, bank accounts. Published in Government Gazette. Reasons: marriage, divorce, or any other valid reason.',
  },
  {
    question: 'How do I apply for a marriage certificate in SA?',
    answer: 'Get married: Give 3 months notice at Home Affairs, both partners present with: IDs, divorce decree (if applicable), death certificate (if widowed). Fee: R75. Wedding by Home Affairs: additional fee. Church/venue wedding: marriage officer submits documents. Certificate: collected after wedding or posted. Certified copies: R75 each. Foreign nationals need additional documents.',
  },
  {
    question: 'What documents do I need for school registration in SA?',
    answer: 'School registration requires: birth certificate (unabridged for Grade R/1), immunization card, proof of address, parents IDs, previous school reports/transfer letter, photos of child. Public schools: no fees for qualifying families (exemption forms available). Age: Grade R (turning 5), Grade 1 (turning 6). Application periods vary by province. Foreign learners need study permit.',
  },
  {
    question: 'How do I report corruption in government services?',
    answer: 'Report corruption: National Anti-Corruption Hotline: 0800 701 701, Presidential Hotline: 17737, SAPS Crime Stop: 08600 10111, Public Protector: 0800 11 20 40. Online: www.corruption.gov.za. WhatsApp: 082 990 3320. Anonymous reporting allowed. Provide: date, place, people involved, evidence if available. Protected by Whistle-blower Protection Act.',
  },
  {
    question: 'How do I check my tax number and status in SA?',
    answer: 'Check tax status: Register on SARS eFiling (www.sars.gov.za), call 0800 00 7277, visit SARS branch. Tax number on: IRP5, tax returns, SARS correspondence. Lost tax number: recover via eFiling or branch. Tax clearance: apply online, valid 1 year. Required for: tenders, emigration, certain permits. Auto-assessment for simple returns.',
  },
];

export default function GovernmentFAQ() {
  return (
    <>
      <FAQSchema 
        faqs={governmentFAQs}
        pageTitle="Government Services FAQ - South Africa & Zimbabwe"
        pageDescription="Complete guide to government services, applications, and documents"
      />
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-4">
            Government Services FAQ: Documents, Licenses & Grants
          </h1>
          
          <p className="text-xl text-gray-700 mb-8">
            Step-by-step guides for ID applications, licenses, grants, and essential government 
            services in South Africa and Zimbabwe.
          </p>

          <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-8">
            <p className="font-semibold">
              🏛️ Tip: Book appointments online to avoid queues at government offices
            </p>
          </div>

          <div className="space-y-8">
            {governmentFAQs.map((faq, index) => (
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
              Government Service Contacts
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">South Africa</h3>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Home Affairs:</strong> 0800 60 11 90</li>
                  <li>• <strong>SASSA:</strong> 0800 60 10 11</li>
                  <li>• <strong>SARS:</strong> 0800 00 72 77</li>
                  <li>• <strong>Labour:</strong> 0860 040 506</li>
                  <li>• <strong>RTMC (Licenses):</strong> 087 285 0149</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Zimbabwe</h3>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Registrar General:</strong> All major cities</li>
                  <li>• <strong>Immigration:</strong> +263 4 791 913</li>
                  <li>• <strong>VID (Licenses):</strong> Regional offices</li>
                  <li>• <strong>ZRP:</strong> 995 (Emergency)</li>
                  <li>• <strong>Passport Office:</strong> Harare/Bulawayo</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-8 grid md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-3 rounded text-center">
              <h3 className="font-semibold text-sm mb-1">ID Card</h3>
              <p className="text-xs">R140</p>
              <p className="text-xs text-gray-600">2-8 weeks</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded text-center">
              <h3 className="font-semibold text-sm mb-1">Passport</h3>
              <p className="text-xs">R400</p>
              <p className="text-xs text-gray-600">10-13 days</p>
            </div>
            <div className="bg-green-50 p-3 rounded text-center">
              <h3 className="font-semibold text-sm mb-1">License</h3>
              <p className="text-xs">R250</p>
              <p className="text-xs text-gray-600">5-6 weeks</p>
            </div>
            <div className="bg-red-50 p-3 rounded text-center">
              <h3 className="font-semibold text-sm mb-1">Birth Cert</h3>
              <p className="text-xs">R75</p>
              <p className="text-xs text-gray-600">6-8 weeks</p>
            </div>
          </section>

          <section className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm">
              <strong>Note:</strong> Fees and processing times are approximate and subject to change. 
              Always verify current requirements with relevant government departments. 
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}