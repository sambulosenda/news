import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import FAQSchema from '@/components/seo/FAQSchema';

export const metadata: Metadata = {
  title: 'Crime & Safety FAQ - Emergency Numbers, Safety Tips | SA & Zimbabwe',
  description: 'Emergency contact numbers, crime reporting procedures, safety tips for residents and tourists in South Africa and Zimbabwe. Stay safe with our comprehensive guide.',
  keywords: 'emergency numbers South Africa, crime reporting SA, safety tips, Zimbabwe emergency, police contact, tourist safety, crime statistics, home security',
  alternates: {
    canonical: 'https://reportfocusnews.com/faq/safety',
  },
};

const safetyFAQs = [
  {
    question: 'What are the emergency numbers in South Africa?',
    answer: 'South Africa emergency numbers: Police 10111, Medical Emergency 10177, All emergencies from cell 112, Fire Department 10177, Crime Stop 08600 10111, Gender Violence Command Centre 0800 428 428. Private: Netcare 082 911, ER24 084 124, Discovery 0860 999 911. Save these in your phone. Cell phone 112 works even without airtime or SIM card.',
  },
  {
    question: 'What are the emergency numbers in Zimbabwe?',
    answer: 'Zimbabwe emergency numbers: Police 995, Medical Emergency 994, Fire Brigade 993, Ambulance (MARS) 0782 800 111, Netcare Zimbabwe +263 8677 000 911, PSMAS ambulance 0772 251 325. WhatsApp emergency contacts increasingly used. Save multiple numbers as response times vary. Private ambulances more reliable but require payment upfront.',
  },
  {
    question: 'How do I report a crime in South Africa?',
    answer: 'Report crime in SA: Visit nearest police station immediately, call 10111 for emergencies, Crime Stop 08600 10111 for anonymous tips. Get case number (CAS) - essential for insurance. Can report online via www.saps.gov.za for certain crimes. Take: ID, proof of address, evidence/photos. For gender-based violence: call 0800 428 428. Keep copy of statement and case number.',
  },
  {
    question: 'What are the safety tips for tourists in South Africa?',
    answer: 'Tourist safety tips for SA: Avoid displaying wealth (jewelry, cameras, phones), use Uber/registered taxis not minibus taxis, dont walk alone at night, keep car doors locked and windows up, avoid CBD areas after dark, use ATMs inside malls/banks, keep copies of documents, dont resist during robbery, research safe areas before visiting, join guided tours for townships.',
  },
  {
    question: 'How safe is public transport in South Africa?',
    answer: 'SA public transport safety varies: Gautrain - very safe with security, MyCiti/Rea Vaya buses - generally safe, Uber/Bolt - safer options with tracking, Metered taxis - use registered companies, Minibus taxis - avoid as tourist (unpredictable, can be dangerous). Long distance: major bus companies (Intercape, Greyhound) safer than minibus taxis. Avoid train services except Gautrain.',
  },
  {
    question: 'What areas should I avoid in Johannesburg?',
    answer: 'High-risk areas in Johannesburg: CBD (especially Hillbrow, Yeoville, Berea), avoid after dark: Braamfontein, parts of Observatory. Alexandra township (except with guide), certain parts of Soweto (safe with tours). Safer areas: Sandton, Rosebank, Melrose, Waterfall, Northern suburbs. Always research current conditions as safety can change. Use secure parking, avoid walking at night anywhere.',
  },
  {
    question: 'What areas should I avoid in Cape Town?',
    answer: 'High-risk areas in Cape Town: Cape Flats townships (Khayelitsha, Nyanga, Gugulethu) except with registered tours, parts of CBD after dark, isolated hiking trails, certain beaches at night. Safer areas: Waterfront, Camps Bay, Sea Point, Constantia, Southern suburbs. Table Mountain: hike in groups, avoid after dark. Beach safety: never leave belongings unattended.',
  },
  {
    question: 'How do I protect myself from carjacking?',
    answer: 'Carjacking prevention: Be alert at traffic lights/stop signs, keep 2-car length to escape, lock doors and close windows, hide valuables, avoid using phone at robots, be vigilant entering/leaving driveways, vary routes home, dont stop for strangers, if hijacked - dont resist, give keys immediately, raise hands to show compliance. Most hijackings occur at home driveways - be extra alert.',
  },
  {
    question: 'What should I do if I am a victim of crime?',
    answer: 'If you are a crime victim: Ensure your safety first, call police 10111 immediately, get medical attention if needed, report to nearest police station, get case number, contact your embassy if foreign national, inform insurance within 24 hours, get trauma counseling (free at police stations), join victim support groups. Keep all evidence, dont wash if sexual assault, take photos of injuries.',
  },
  {
    question: 'How can I secure my home in South Africa?',
    answer: 'Home security tips: Install alarm system linked to armed response, electric fencing or spikes on walls, security gates on doors, burglar bars on windows, outdoor beams/sensors, CCTV cameras, join neighborhood watch, get to know neighbors, dont advertise absences on social media, vary routines, keep emergency numbers handy, have panic button, consider getting a dog.',
  },
  {
    question: 'What are common tourist scams in Southern Africa?',
    answer: 'Common scams: ATM card swapping, fake police asking to check money, overcharging at markets, fake parking attendants, distraction theft (someone spills on you), fake accommodation bookings, currency exchange scams, sob stories asking for money, fake tour guides, credit card skimming. Tips: use official services, verify credentials, never hand over cards/documents, be skeptical of approaches.',
  },
  {
    question: 'Is it safe to walk at night in South Africa?',
    answer: 'Walking at night is generally NOT recommended in SA cities. Exceptions: secured areas like Waterfront, inside estates, organized night tours. If you must: walk in groups, stick to well-lit busy areas, avoid showing valuables, stay alert, use Uber for short distances, inform someone of plans. Most crimes occur after dark. Even safe areas become risky at night.',
  },
  {
    question: 'What is the crime situation in Zimbabwe?',
    answer: 'Zimbabwe crime is generally lower than SA but increasing due to economic challenges. Common crimes: pickpocketing, bag snatching, theft from vehicles, occasional robberies. Safer than SA for violent crime but property crime rising. Political rallies can turn violent - avoid. Police may request bribes. Keep USD in small denominations. Rural areas generally safer than cities.',
  },
  {
    question: 'How do I stay safe at ATMs?',
    answer: 'ATM safety: Use ATMs inside banks/malls, never at night, be aware of surroundings, cover PIN, dont count money at ATM, dont accept help from strangers, if card is retained - cancel immediately, watch for skimming devices, have someone watch your back, never give PIN to anyone, if followed from ATM - drive to police station, cancel cards if suspicious.',
  },
  {
    question: 'What should women know about safety in SA?',
    answer: 'Women safety tips: SA has high GBV rates - be extra cautious, avoid walking alone, dress conservatively in certain areas, trust your instincts, carry pepper spray (legal), share uber trips with friends, avoid excessive alcohol, join womens travel groups, know emergency numbers (0800 428 428 for GBV), stay in groups at night, research safe accommodation, be assertive in uncomfortable situations.',
  },
];

export default function SafetyFAQ() {
  return (
    <>
      <FAQSchema 
        faqs={safetyFAQs}
        pageTitle="Crime & Safety FAQ - South Africa & Zimbabwe"
        pageDescription="Emergency numbers, crime reporting, and safety tips for Southern Africa"
      />
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-4">
            Crime & Safety FAQ: Staying Safe in Southern Africa
          </h1>
          
          <p className="text-xl text-gray-700 mb-8">
            Essential safety information, emergency contacts, and crime prevention tips for 
            residents and visitors in South Africa and Zimbabwe.
          </p>

          <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-8">
            <p className="font-semibold">
              🚨 Emergency: SA Police 10111 | Medical 10177 | All emergencies from cell: 112
            </p>
          </div>

          <div className="space-y-8">
            {safetyFAQs.map((faq, index) => (
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
              Quick Reference: Emergency Contacts
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border border-gray-200">
                <h3 className="font-semibold mb-3 text-red-600">South Africa</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between"><strong>Police:</strong> <span className="font-mono">10111</span></li>
                  <li className="flex justify-between"><strong>Medical:</strong> <span className="font-mono">10177</span></li>
                  <li className="flex justify-between"><strong>All (Cell):</strong> <span className="font-mono">112</span></li>
                  <li className="flex justify-between"><strong>Crime Stop:</strong> <span className="font-mono">08600 10111</span></li>
                  <li className="flex justify-between"><strong>GBV Hotline:</strong> <span className="font-mono">0800 428 428</span></li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <h3 className="font-semibold mb-3 text-red-600">Zimbabwe</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between"><strong>Police:</strong> <span className="font-mono">995</span></li>
                  <li className="flex justify-between"><strong>Medical:</strong> <span className="font-mono">994</span></li>
                  <li className="flex justify-between"><strong>Fire:</strong> <span className="font-mono">993</span></li>
                  <li className="flex justify-between"><strong>MARS:</strong> <span className="font-mono">0782 800 111</span></li>
                  <li className="flex justify-between"><strong>Netcare:</strong> <span className="font-mono">08677 000 911</span></li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Tourist Safety</h3>
              <ul className="text-sm space-y-1">
                <li>✓ Use registered tour operators</li>
                <li>✓ Stay in secure accommodation</li>
                <li>✓ Avoid displaying valuables</li>
                <li>✓ Use Uber/Bolt for transport</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Home Security</h3>
              <ul className="text-sm space-y-1">
                <li>✓ Install alarm systems</li>
                <li>✓ Join neighborhood watch</li>
                <li>✓ Secure all entry points</li>
                <li>✓ Have panic button ready</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Personal Safety</h3>
              <ul className="text-sm space-y-1">
                <li>✓ Trust your instincts</li>
                <li>✓ Avoid walking alone</li>
                <li>✓ Stay alert in public</li>
                <li>✓ Keep emergency numbers</li>
              </ul>
            </div>
          </section>

          <section className="mt-8 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-sm font-semibold mb-2">⚠️ Important Safety Notice</p>
            <p className="text-sm">
              Crime can happen anywhere. Stay vigilant, trust your instincts, and prioritize your safety. 
              This guide provides general advice - always assess your specific situation. In emergencies, 
              comply with criminals demands - property can be replaced, lives cannot.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}