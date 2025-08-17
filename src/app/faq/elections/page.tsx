import { Metadata } from 'next';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import FAQSchema from '@/components/FAQSchema';

export const metadata: Metadata = {
  title: 'Elections FAQ - South Africa & Zimbabwe Voting Guide 2024',
  description: 'Complete guide to elections in South Africa and Zimbabwe. Voter registration, voting requirements, election dates, and everything you need to know about voting.',
  keywords: 'South Africa elections, Zimbabwe elections, how to register to vote, IEC, ZEC, voting requirements, election dates, ANC, ZANU-PF, voter registration',
  alternates: {
    canonical: 'https://reportfocusnews.com/faq/elections',
  },
};

const electionsFAQs = [
  {
    question: 'When are the next elections in South Africa?',
    answer: 'The next South African general elections are scheduled for 2024. Municipal elections occur every 5 years (next in 2026). Provincial and national elections happen simultaneously every 5 years. By-elections occur as needed when councillor positions become vacant.',
  },
  {
    question: 'How do I register to vote in South Africa?',
    answer: 'To register to vote in South Africa: 1) You must be 16 or older to register (18 to vote), 2) Visit any IEC office during office hours, 3) Bring your green barcoded ID, smart ID card, or temporary ID certificate, 4) Complete the registration form, 5) Check your registration online at www.elections.org.za or SMS your ID number to 32810.',
  },
  {
    question: 'What documents do I need to vote in South Africa?',
    answer: 'To vote in South Africa you need: A green barcoded ID book, smart ID card, or temporary ID certificate. You must vote at the voting station where you are registered. If voting outside your ward, you can only vote for national and provincial ballots, not local.',
  },
  {
    question: 'When are the next elections in Zimbabwe?',
    answer: 'Zimbabwe held harmonized elections in August 2023. The next general elections are scheduled for 2028. By-elections occur periodically for vacant parliamentary and council seats. Presidential, parliamentary, and local government elections typically happen simultaneously.',
  },
  {
    question: 'How do I register to vote in Zimbabwe?',
    answer: 'To register to vote in Zimbabwe: 1) Be 18 years or older, 2) Visit any ZEC office or registration center, 3) Bring your national ID or valid passport, 4) Provide proof of residence, 5) Complete the voter registration form, 6) Receive your registration slip. Registration is ongoing except during election periods.',
  },
  {
    question: 'What are the requirements to vote in Zimbabwe?',
    answer: 'To vote in Zimbabwe you need: Valid national ID or passport, your name must appear on the voters roll, vote at your designated polling station, registration slip (helpful but not mandatory). You cannot vote with a drivers license or any other form of ID.',
  },
  {
    question: 'Can South African citizens living abroad vote?',
    answer: 'Yes, South African citizens abroad can vote if: They are registered voters, notify the IEC of intention to vote abroad, vote at a South African embassy or consulate, only for national and provincial elections (not municipal). Registration to vote abroad opens before each election.',
  },
  {
    question: 'Can Zimbabweans in the diaspora vote?',
    answer: 'Currently, Zimbabweans living abroad cannot vote in elections unless they return to Zimbabwe. The constitution allows for diaspora voting, but enabling legislation has not been passed. This remains a contentious political issue with ongoing court cases.',
  },
  {
    question: 'What time do polling stations open and close?',
    answer: 'In South Africa: Polling stations open at 7:00 AM and close at 9:00 PM. Anyone in the queue by 9:00 PM will be allowed to vote. In Zimbabwe: Polling stations open at 7:00 AM and close at 7:00 PM, with extensions possible if there are queues.',
  },
  {
    question: 'Who are the main political parties in South Africa?',
    answer: 'Major South African political parties include: ANC (African National Congress) - ruling party, DA (Democratic Alliance) - official opposition, EFF (Economic Freedom Fighters), IFP (Inkatha Freedom Party), ActionSA, PA (Patriotic Alliance), FF Plus (Freedom Front Plus), GOOD, COPE, and numerous smaller parties.',
  },
  {
    question: 'Who are the main political parties in Zimbabwe?',
    answer: 'Major Zimbabwean political parties include: ZANU-PF (ruling party led by Emmerson Mnangagwa), CCC (Citizens Coalition for Change - main opposition), MDC Alliance factions, ZAPU, and several smaller parties. The political landscape has been dominated by ZANU-PF since independence.',
  },
  {
    question: 'How does proportional representation work in South Africa?',
    answer: 'South Africa uses a proportional representation system where: Parties get seats based on their percentage of votes, 200 National Assembly seats are from national lists, 200 are from regional lists, No constituency MPs - all are from party lists, Parties need 0.25% of votes for a seat (about 50,000 votes).',
  },
  {
    question: 'What is a spoiled ballot?',
    answer: 'A spoiled ballot is a vote that cannot be counted because: It is marked incorrectly (multiple marks, unclear marks), the voter\'s choice is not clear, it contains identifying marks, it is defaced or torn. Spoiled ballots are separated and not counted for any party.',
  },
  {
    question: 'Can I take photos in the voting booth?',
    answer: 'No, taking photos inside the voting booth is illegal in both South Africa and Zimbabwe. This protects the secrecy of the ballot. You may take photos outside the polling station. Sharing photos of your marked ballot on social media is prohibited and can result in prosecution.',
  },
  {
    question: 'What happens if I\'m not on the voters roll on election day?',
    answer: 'If you\'re not on the voters roll, you cannot vote. In South Africa, you can check your registration status online, via SMS, or at IEC offices before election day. In Zimbabwe, provisional voters rolls are displayed before elections for verification. Always verify your registration well before election day.',
  },
];

export default function ElectionsFAQ() {
  return (
    <>
      <FAQSchema 
        faqs={electionsFAQs}
        pageTitle="Elections FAQ - South Africa & Zimbabwe Voting Guide"
        pageDescription="Complete guide to voting in South African and Zimbabwean elections"
      />
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-4">
            Elections FAQ: South Africa & Zimbabwe Voting Guide
          </h1>
          
          <p className="text-xl text-gray-700 mb-8">
            Everything you need to know about voting in South African and Zimbabwean elections. 
            From registration to polling day, we answer your most important questions.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
            <p className="font-semibold">
              🗳️ Remember: Your vote is your voice. Make sure you're registered!
            </p>
          </div>

          <div className="space-y-8">
            {electionsFAQs.map((faq, index) => (
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
              Important Election Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">South Africa</h3>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>IEC:</strong> www.elections.org.za</li>
                  <li>• <strong>Check Registration:</strong> SMS ID to 32810</li>
                  <li>• <strong>IEC Contact:</strong> 0800 11 8000</li>
                  <li>• <strong>Report Issues:</strong> complaints@elections.org.za</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Zimbabwe</h3>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>ZEC:</strong> www.zec.org.zw</li>
                  <li>• <strong>ZEC Offices:</strong> All provincial capitals</li>
                  <li>• <strong>Hotline:</strong> Available during elections</li>
                  <li>• <strong>Voter Education:</strong> Multiple languages available</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm">
              <strong>Disclaimer:</strong> Election dates and procedures may change. 
              Always verify current information with official electoral bodies (IEC for South Africa, ZEC for Zimbabwe). 
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}