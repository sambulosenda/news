import { Metadata } from 'next';
import Link from 'next/link';
import HeaderWrapper from '@/components/HeaderWrapper';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Mobile Apps - Report Focus News',
  description: 'Download Report Focus News mobile apps for iOS and Android. Get breaking news alerts, personalized content, and offline reading on your smartphone.',
};

export default function MobileAppsPage() {
  const features = [
    {
      icon: '🔔',
      title: 'Breaking News Alerts',
      description: 'Get instant notifications for major breaking news and developing stories from South Africa and Zimbabwe.',
    },
    {
      icon: '📱',
      title: 'Optimized for Mobile',
      description: 'Enjoy a seamless reading experience with our mobile-first design and intuitive navigation.',
    },
    {
      icon: '📖',
      title: 'Offline Reading',
      description: 'Save articles to read later, even without an internet connection.',
    },
    {
      icon: '⚡',
      title: 'Fast & Lightweight',
      description: 'Our apps are optimized for speed and performance, using minimal data and battery.',
    },
    {
      icon: '🎯',
      title: 'Personalized Feed',
      description: 'Customize your news feed based on your interests and preferred topics.',
    },
    {
      icon: '🌙',
      title: 'Dark Mode',
      description: 'Switch to dark mode for comfortable reading in low-light conditions.',
    },
  ];

  const appScreenshots = [
    {
      title: 'Home Screen',
      description: 'Browse latest news with our clean, intuitive interface',
    },
    {
      title: 'Article View',
      description: 'Enjoy distraction-free reading with customizable text size',
    },
    {
      title: 'Categories',
      description: 'Navigate through different news sections easily',
    },
  ];

  return (
    <>
      <HeaderWrapper />
      
      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
          <div className="container-wide py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Report Focus News
                  <span className="block text-red-600 mt-2">On Your Phone</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Stay connected to the latest news from South Africa and Zimbabwe with our free mobile apps. 
                  Available for iOS and Android devices.
                </p>
                
                {/* Download Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-sm font-semibold">App Store</div>
                    </div>
                  </Link>
                  
                  <Link
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Get it on</div>
                      <div className="text-sm font-semibold">Google Play</div>
                    </div>
                  </Link>
                </div>
                
                {/* App Stats */}
                <div className="flex gap-8 mt-8 pt-8 border-t border-gray-200">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">500K+</div>
                    <div className="text-sm text-gray-600">Downloads</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4.8★</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">Free</div>
                    <div className="text-sm text-gray-600">No Ads</div>
                  </div>
                </div>
              </div>
              
              {/* Phone Mockup */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-72 h-[600px] bg-gray-900 rounded-[3rem] shadow-2xl p-3">
                  <div className="absolute top-1/2 -translate-y-1/2 -left-1 w-1 h-12 bg-gray-800 rounded-r-lg"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-1 h-20 bg-gray-800 rounded-l-lg"></div>
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    <div className="bg-red-700 text-white p-4 text-center">
                      <h2 className="font-bold text-lg">Report Focus</h2>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="bg-gray-100 h-32 rounded-lg animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="bg-gray-100 h-4 rounded animate-pulse"></div>
                        <div className="bg-gray-100 h-4 w-3/4 rounded animate-pulse"></div>
                      </div>
                      <div className="bg-gray-100 h-24 rounded-lg animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="bg-gray-100 h-4 rounded animate-pulse"></div>
                        <div className="bg-gray-100 h-4 w-2/3 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container-wide py-12 lg:py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Everything You Need in a News App
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our mobile apps are designed to deliver the best news reading experience on your smartphone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Screenshots Section */}
        <section className="bg-gray-50 py-12 lg:py-16">
          <div className="container-wide">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                See It in Action
              </h2>
              <p className="text-lg text-gray-600">
                Experience our beautifully designed interface
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {appScreenshots.map((screenshot, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-2xl shadow-lg p-2 mb-4">
                    <div className="bg-gray-200 h-96 rounded-xl animate-pulse"></div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {screenshot.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {screenshot.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-red-700 text-white">
          <div className="container-wide py-12 lg:py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Download Report Focus News Today
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of readers who stay informed with our mobile apps. 
              Free to download, no subscription required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </Link>
              
              <Link
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </Link>
            </div>
            
            {/* QR Code Section */}
            <div className="mt-12 pt-8 border-t border-red-600">
              <p className="text-sm mb-4">Or scan this QR code with your phone</p>
              <div className="inline-block bg-white p-4 rounded-lg">
                <div className="w-32 h-32 bg-gray-200"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="container-wide py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            System Requirements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                iOS
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Requires iOS 12.0 or later</li>
                <li>• Compatible with iPhone, iPad, and iPod touch</li>
                <li>• Size: Approximately 45 MB</li>
                <li>• Languages: English</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Android
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Requires Android 5.0 and up</li>
                <li>• Compatible with phones and tablets</li>
                <li>• Size: Approximately 35 MB</li>
                <li>• Languages: English</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}