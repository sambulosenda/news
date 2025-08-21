import { Metadata } from 'next';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';
import NewsletterSignupForm from '@/components/NewsletterSignupForm';

export const metadata: Metadata = {
  title: 'Newsletters - Report Focus News',
  description: 'Subscribe to Report Focus News newsletters for daily updates on South Africa and Zimbabwe news, politics, business, sports, and more.',
};

export default function NewslettersPage() {
  const newsletters = [
    {
      id: 'morning-briefing',
      name: 'Morning Briefing',
      description: 'Start your day with the top stories from South Africa and Zimbabwe. Delivered weekdays at 6 AM.',
      frequency: 'Daily (Mon-Fri)',
      icon: '☀️',
    },
    {
      id: 'evening-update',
      name: 'Evening Update',
      description: 'Catch up on the day\'s most important developments. Delivered weekdays at 6 PM.',
      frequency: 'Daily (Mon-Fri)',
      icon: '🌙',
    },
    {
      id: 'breaking-news',
      name: 'Breaking News Alerts',
      description: 'Get instant notifications for major breaking news and developing stories.',
      frequency: 'As it happens',
      icon: '🚨',
    },
    {
      id: 'politics-weekly',
      name: 'Politics Weekly',
      description: 'In-depth analysis of political developments in Southern Africa.',
      frequency: 'Weekly (Sundays)',
      icon: '🏛️',
    },
    {
      id: 'business-digest',
      name: 'Business Digest',
      description: 'Market updates, economic news, and business insights from the region.',
      frequency: 'Daily (Mon-Fri)',
      icon: '📈',
    },
    {
      id: 'weekend-edition',
      name: 'Weekend Edition',
      description: 'The best reads, features, and analysis from the week.',
      frequency: 'Weekly (Saturdays)',
      icon: '📰',
    },
  ];

  return (
    <>
      <HeaderWrapper />
      
      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-gray-50 border-b border-gray-200">
          <div className="container-wide py-12 lg:py-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Stay Informed with Our Newsletters
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Choose from our selection of newsletters to get the news delivered straight to your inbox. 
                From breaking news alerts to in-depth weekly analysis, we have something for every reader.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter Grid */}
        <section className="container-wide py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {newsletters.map((newsletter) => (
              <div
                key={newsletter.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl" role="img" aria-label={newsletter.name}>
                    {newsletter.icon}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {newsletter.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {newsletter.frequency}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {newsletter.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Signup Form Section */}
        <section className="bg-gray-900 text-white">
          <div className="container-wide py-12 lg:py-16">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Subscribe to All Newsletters
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Sign up once to receive all our newsletters. You can manage your preferences anytime.
              </p>
              
              <NewsletterSignupForm />
              
              <p className="text-xs text-gray-400 mt-6">
                By subscribing, you agree to our Privacy Policy and Terms of Service. 
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container-wide py-12 lg:py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I manage my newsletter preferences?
              </h3>
              <p className="text-sm text-gray-600">
                You can manage your preferences by clicking the "Manage Preferences" link at the bottom of any newsletter email.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I unsubscribe from specific newsletters?
              </h3>
              <p className="text-sm text-gray-600">
                Yes, you can unsubscribe from individual newsletters while remaining subscribed to others through your preference center.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are the newsletters free?
              </h3>
              <p className="text-sm text-gray-600">
                Yes, all our newsletters are completely free. We believe in keeping our readers informed without barriers.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What if I'm not receiving newsletters?
              </h3>
              <p className="text-sm text-gray-600">
                Please check your spam folder and add noreply@reportfocusnews.com to your address book. If issues persist, contact our support team.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}