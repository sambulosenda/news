import { Metadata } from 'next';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import FAQSchema from '@/components/FAQSchema';

export const metadata: Metadata = {
  title: 'Economy FAQ - Rand Exchange Rate, Fuel Prices, Inflation | SA & Zimbabwe',
  description: 'Economic questions answered: Rand to dollar rate, fuel price changes, inflation, interest rates, and economic indicators for South Africa and Zimbabwe.',
  keywords: 'rand to dollar, fuel price South Africa, Zimbabwe dollar, inflation rate SA, interest rates, petrol price, diesel price, economic indicators, JSE, ZSE',
  alternates: {
    canonical: 'https://reportfocusnews.com/faq/economy',
  },
};

const economyFAQs = [
  {
    question: 'What is the current rand to dollar exchange rate?',
    answer: 'The rand to dollar exchange rate fluctuates daily based on market conditions. As of 2024, it typically ranges between R17-R20 to $1 USD. Check current rates at major banks (FNB, Standard Bank, Absa, Nedbank) or financial websites. The rate is influenced by interest rates, political stability, commodity prices, and global economic conditions.',
  },
  {
    question: 'Why is the fuel price increasing in South Africa?',
    answer: 'Fuel prices in South Africa increase due to: international oil prices (Brent crude), rand/dollar exchange rate weakness, government taxes and levies (RAF, fuel levy), wholesale and retail margins, and distribution costs. The Department of Energy adjusts prices monthly based on these factors. Weaker rand and higher oil prices are the main drivers.',
  },
  {
    question: 'How is the fuel price calculated in South Africa?',
    answer: 'South African fuel prices are calculated using: Basic Fuel Price (BFP) based on international petroleum prices, freight and insurance costs, wholesale margin, retail margin, fuel levy and Road Accident Fund levy, slate levy, and other government imposts. The price is adjusted on the first Wednesday of each month.',
  },
  {
    question: 'What is the current inflation rate in South Africa?',
    answer: 'South Africa\'s inflation rate (CPI) typically ranges between 3-6%, which is the SARB target range. Current rates vary monthly - check Statistics SA for latest figures. Inflation affects food prices, transport costs, housing, and utilities. The Reserve Bank uses interest rates to control inflation.',
  },
  {
    question: 'What is the repo rate in South Africa?',
    answer: 'The repo rate is the rate at which the South African Reserve Bank lends to commercial banks. As of 2024, it has been ranging between 7-8.25%. The rate affects prime lending rate (repo + 3.5%), home loans, vehicle finance, and credit card rates. SARB adjusts it to control inflation.',
  },
  {
    question: 'Why does Zimbabwe use US dollars?',
    answer: 'Zimbabwe adopted the US dollar in 2009 after hyperinflation destroyed the Zimbabwe dollar. The country uses a multi-currency system including USD, South African Rand, and reintroduced the Zimbabwe dollar (ZWL) in 2019. However, USD remains preferred due to ZWL instability. Most transactions and savings are in USD.',
  },
  {
    question: 'What caused Zimbabwe\'s hyperinflation?',
    answer: 'Zimbabwe\'s hyperinflation (peak: 79.6 billion percent in 2008) was caused by: excessive money printing, land reform disrupting agriculture, economic mismanagement, international sanctions, loss of export earnings, and collapse of production. The economy lost 50% of its value, leading to abandonment of the currency.',
  },
  {
    question: 'How do I invest in the JSE?',
    answer: 'To invest in the JSE (Johannesburg Stock Exchange): 1) Open a brokerage account (Easy Equities, Standard Bank, FNB, etc.), 2) Fund your account, 3) Research companies (JSE Top 40, resources, financials), 4) Buy shares through your broker, 5) Consider ETFs for diversification. Minimum investments can be as low as R10 on some platforms.',
  },
  {
    question: 'What affects the South African rand strength?',
    answer: 'The rand is affected by: commodity prices (gold, platinum), load shedding impact on economy, political stability and policy uncertainty, global risk sentiment (risk-on/risk-off), interest rate differentials with developed markets, current account balance, foreign investment flows, and credit ratings.',
  },
  {
    question: 'What is BRICS and how does it affect SA economy?',
    answer: 'BRICS (Brazil, Russia, India, China, South Africa) is an economic bloc representing 40% of global population. Benefits for SA include: increased trade with member countries, New Development Bank funding, reduced dependency on Western markets, currency swap agreements, and political influence. BRICS expansion in 2024 includes more countries.',
  },
  {
    question: 'How does load shedding affect the SA economy?',
    answer: 'Load shedding costs the SA economy R1-2 billion per day through: reduced productivity, business closures, job losses, reduced investor confidence, increased operating costs (generators), damaged equipment, and lower GDP growth. Stage 6 load shedding can reduce GDP by 5% annually.',
  },
  {
    question: 'What is the unemployment rate in South Africa?',
    answer: 'South Africa has one of the world\'s highest unemployment rates at 32-33% (official) or 42-43% (expanded definition including discouraged workers). Youth unemployment exceeds 60%. Main causes include: skills mismatch, slow economic growth, rigid labor laws, and poor education outcomes.',
  },
  {
    question: 'How do I send money between SA and Zimbabwe?',
    answer: 'Money transfer options include: bank transfers (expensive, slow), money transfer services (Western Union, MoneyGram), mobile money (EcoCash, M-Pesa), online platforms (WorldRemit, Sendwave), and informal channels (not recommended). Compare fees and exchange rates. Formal channels are safer and legal.',
  },
  {
    question: 'What are the main exports of South Africa?',
    answer: 'South Africa\'s main exports include: minerals (gold, platinum, diamonds, coal), vehicles and machinery, iron and steel, agricultural products (citrus, wine, maize), and chemicals. China is the largest trading partner, followed by Germany, USA, UK, and India. Mining remains crucial despite decline.',
  },
  {
    question: 'What is the GDP of South Africa vs Zimbabwe?',
    answer: 'South Africa\'s GDP is approximately $400-420 billion (largest in Southern Africa, 2nd in Africa). Zimbabwe\'s GDP is approximately $25-30 billion. SA\'s economy is about 15 times larger. Per capita: SA (~$7,000), Zimbabwe (~$1,500). Both face economic challenges but at different scales.',
  },
];

export default function EconomyFAQ() {
  return (
    <>
      <FAQSchema 
        faqs={economyFAQs}
        pageTitle="Economy FAQ - South Africa & Zimbabwe Economic Questions"
        pageDescription="Get answers to economic questions about exchange rates, fuel prices, inflation, and more"
      />
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-4">
            Economy FAQ: Your Financial Questions Answered
          </h1>
          
          <p className="text-xl text-gray-700 mb-8">
            Understanding the economy of South Africa and Zimbabwe. From exchange rates to fuel prices, 
            inflation to investments - get clear answers to complex economic questions.
          </p>

          <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-8">
            <p className="font-semibold">
              💰 Economic Indicators Update Daily - Check Report Focus News for Latest Rates
            </p>
          </div>

          <div className="space-y-8">
            {economyFAQs.map((faq, index) => (
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
              Quick Economic References
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">South Africa</h3>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Currency:</strong> Rand (ZAR)</li>
                  <li>• <strong>Central Bank:</strong> SARB</li>
                  <li>• <strong>Stock Exchange:</strong> JSE</li>
                  <li>• <strong>Inflation Target:</strong> 3-6%</li>
                  <li>• <strong>Prime Rate:</strong> Repo + 3.5%</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Zimbabwe</h3>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>Currency:</strong> Multi-currency (USD, ZWL)</li>
                  <li>• <strong>Central Bank:</strong> RBZ</li>
                  <li>• <strong>Stock Exchange:</strong> ZSE</li>
                  <li>• <strong>Main Challenge:</strong> Currency stability</li>
                  <li>• <strong>Key Sector:</strong> Mining, Agriculture</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Fuel Price Resources</h3>
              <ul className="text-sm space-y-1">
                <li>• AA (Automobile Association)</li>
                <li>• Department of Energy</li>
                <li>• CEF (Central Energy Fund)</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Exchange Rates</h3>
              <ul className="text-sm space-y-1">
                <li>• XE.com</li>
                <li>• Bank websites</li>
                <li>• Google Finance</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Economic Data</h3>
              <ul className="text-sm space-y-1">
                <li>• Statistics SA</li>
                <li>• SARB.co.za</li>
                <li>• Trading Economics</li>
              </ul>
            </div>
          </section>

          <section className="mt-8 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-sm">
              <strong>Disclaimer:</strong> Economic data changes rapidly. These FAQs provide general information only. 
              For investment decisions, consult qualified financial advisors. Exchange rates and prices mentioned are 
              indicative. Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}