import { Metadata } from 'next';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import FAQSchema from '@/components/FAQSchema';

export const metadata: Metadata = {
  title: 'Load Shedding FAQ - Schedule, Stages, Updates | South Africa',
  description: 'Everything you need to know about load shedding in South Africa. Check schedules, understand stages, get updates, and find solutions for power cuts.',
  keywords: 'load shedding, load shedding today, load shedding schedule, load shedding stages, Eskom, power cuts South Africa, load shedding Cape Town, load shedding Johannesburg',
  alternates: {
    canonical: 'https://reportfocusnews.com/faq/load-shedding',
  },
};

const loadSheddingFAQs = [
  {
    question: 'What is load shedding in South Africa?',
    answer: 'Load shedding is the controlled interruption of electricity supply to prevent the entire power grid from collapsing. Eskom implements load shedding when electricity demand exceeds available supply, rotating power cuts across different areas to balance the grid.',
  },
  {
    question: 'What are the load shedding stages 1 to 8?',
    answer: 'Load shedding stages indicate severity: Stage 1 removes 1000MW from the grid (2 hours without power), Stage 2 removes 2000MW (2 hours twice or 4 hours once), Stage 3 removes 3000MW (2 hours three times), Stage 4 removes 4000MW (2 hours four times), Stage 5 removes 5000MW, Stage 6 removes 6000MW (4 hours twice), Stage 7 removes 7000MW, and Stage 8 removes 8000MW from the national grid.',
  },
  {
    question: 'How do I check my load shedding schedule today?',
    answer: 'Check your load shedding schedule through: 1) EskomSePush app (most popular), 2) Your municipality website, 3) City Power website for Johannesburg, 4) City of Cape Town app, 5) Eskom website for direct Eskom customers, or 6) Local municipality social media pages for real-time updates.',
  },
  {
    question: 'What time does load shedding start and end today?',
    answer: 'Load shedding times vary by area and stage. Typically, blocks are 2-4 hours depending on the stage. Check EskomSePush app or your municipality website for exact times in your area. Schedules usually run from 00:00 to 22:00, with different areas affected at different times.',
  },
  {
    question: 'Why does South Africa have load shedding?',
    answer: 'South Africa experiences load shedding due to: aging coal power stations, insufficient maintenance over decades, delays in building new power stations (Medupi and Kusile), increased electricity demand, coal supply problems, corruption and mismanagement at Eskom, and lack of investment in alternative energy sources.',
  },
  {
    question: 'How long will load shedding last in South Africa?',
    answer: 'According to government projections, load shedding may continue until 2024-2025 as new generation capacity comes online. However, this depends on maintenance of existing power stations, completion of new projects, growth in renewable energy, and success of energy reform initiatives.',
  },
  {
    question: 'What appliances can I use during load shedding?',
    answer: 'During load shedding, you can use: battery-powered devices, gas stoves and heaters, solar-powered equipment, inverters and UPS systems (if pre-installed), generators (following safety guidelines), power banks for phones, and battery-operated lights. Avoid using candles due to fire risk.',
  },
  {
    question: 'How can I prepare for load shedding?',
    answer: 'Prepare for load shedding by: downloading schedule apps, charging all devices before outages, investing in backup power (inverter/generator), keeping flashlights and batteries ready, filling water containers (pumps may not work), having non-perishable food available, and backing up important work regularly.',
  },
  {
    question: 'What is the difference between load shedding and load reduction?',
    answer: 'Load shedding is scheduled, controlled power cuts affecting all customers in rotation. Load reduction targets specific areas with high illegal connections or non-payment, typically during peak hours (5-9am and 5-9pm). Load reduction is not announced in advance and mainly affects townships.',
  },
  {
    question: 'Does load shedding affect cell phone towers?',
    answer: 'Yes, load shedding affects cell towers. Most towers have 6-8 hour battery backup, but during extended outages or higher stages, network coverage may be lost. Some areas experience complete communication blackouts during Stage 4 and above.',
  },
  {
    question: 'Can load shedding damage my appliances?',
    answer: 'Yes, power surges when electricity returns can damage appliances. Protect devices by: unplugging sensitive electronics before load shedding, using surge protectors, installing surge arrestors at your DB board, and waiting a few minutes after power returns before switching on appliances.',
  },
  {
    question: 'What areas are exempt from load shedding?',
    answer: 'Areas typically exempt include: essential hospitals, key government installations, some industrial areas with special agreements, areas sharing a grid with essential services. However, exemptions are becoming rarer as load shedding intensifies.',
  },
];

export default function LoadSheddingFAQ() {
  return (
    <>
      <FAQSchema 
        faqs={loadSheddingFAQs}
        pageTitle="Load Shedding FAQ - South Africa"
        pageDescription="Complete guide to understanding load shedding in South Africa"
      />
      <HeaderWrapper />
      <main className="container-content py-12">
        <article className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl font-bold mb-4">
            Load Shedding FAQ: Everything You Need to Know
          </h1>
          
          <p className="text-xl text-gray-700 mb-8">
            Get answers to the most common questions about load shedding in South Africa. 
            Updated daily with the latest information from Eskom and municipalities.
          </p>

          <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-8">
            <p className="font-semibold">
              ⚡ Current Status: Check EskomSePush or your municipality for today's schedule
            </p>
          </div>

          <div className="space-y-8">
            {loadSheddingFAQs.map((faq, index) => (
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
              Useful Load Shedding Resources
            </h2>
            <ul className="space-y-2">
              <li>• <strong>EskomSePush App:</strong> Most popular schedule app</li>
              <li>• <strong>Eskom Website:</strong> Official announcements</li>
              <li>• <strong>City Power Johannesburg:</strong> For Joburg residents</li>
              <li>• <strong>City of Cape Town:</strong> For Cape Town residents</li>
              <li>• <strong>Report Focus News:</strong> Latest load shedding news and updates</li>
            </ul>
          </section>

          <section className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()} | 
              This FAQ is updated regularly as load shedding situations change. 
              Always verify current schedules with official sources.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}