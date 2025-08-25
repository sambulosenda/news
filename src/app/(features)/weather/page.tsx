import { Metadata } from 'next';
import HeaderWrapper from '@/components/layout/HeaderWrapper';
import Footer from '@/components/layout/Footer';
import WeatherWidget from '@/components/features/WeatherWidget';
import WeatherMap from '@/components/features/WeatherMap';

export const metadata: Metadata = {
  title: 'Weather - South Africa & Zimbabwe | Report Focus News',
  description: 'Get the latest weather forecasts for South Africa and Zimbabwe. Current conditions, 7-day forecasts, and weather alerts for major cities.',
  keywords: 'weather South Africa, weather Zimbabwe, Johannesburg weather, Cape Town weather, Harare weather, Bulawayo weather, weather forecast, SA weather',
};

// Major cities to display
const southAfricaCities = [
  { name: 'Johannesburg', lat: -26.2041, lon: 28.0473, id: 'johannesburg' },
  { name: 'Cape Town', lat: -33.9249, lon: 18.4241, id: 'cape-town' },
  { name: 'Durban', lat: -29.8587, lon: 31.0218, id: 'durban' },
  { name: 'Pretoria', lat: -25.7479, lon: 28.2293, id: 'pretoria' },
  { name: 'Port Elizabeth', lat: -33.9608, lon: 25.6022, id: 'port-elizabeth' },
  { name: 'Bloemfontein', lat: -29.0852, lon: 26.1596, id: 'bloemfontein' },
];

const zimbabweCities = [
  { name: 'Harare', lat: -17.8292, lon: 31.0522, id: 'harare' },
  { name: 'Bulawayo', lat: -20.1325, lon: 28.5874, id: 'bulawayo' },
  { name: 'Chitungwiza', lat: -17.9938, lon: 31.0756, id: 'chitungwiza' },
  { name: 'Mutare', lat: -18.9707, lon: 32.6709, id: 'mutare' },
  { name: 'Gweru', lat: -19.4500, lon: 29.8167, id: 'gweru' },
  { name: 'Victoria Falls', lat: -17.9243, lon: 25.8572, id: 'victoria-falls' },
];

export default function WeatherPage() {
  return (
    <>
      <HeaderWrapper />
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container-wide py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Weather</h1>
            <p className="text-lg opacity-90">
              Current conditions and forecasts for South Africa and Zimbabwe
            </p>
          </div>
        </div>

        {/* Current Location Weather */}
        <section className="container-wide py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Your Location
            </h2>
            <WeatherWidget detectLocation={true} />
          </div>
        </section>

        {/* Weather Map */}
        <section className="container-wide py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Weather Map</h2>
            <WeatherMap />
          </div>
        </section>

        {/* South Africa Cities */}
        <section className="container-wide py-8">
          <h2 className="text-2xl font-bold mb-6">South Africa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {southAfricaCities.map((city) => (
              <div key={city.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <WeatherWidget 
                  city={city.name}
                  lat={city.lat}
                  lon={city.lon}
                  compact={true}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Zimbabwe Cities */}
        <section className="container-wide py-8">
          <h2 className="text-2xl font-bold mb-6">Zimbabwe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zimbabweCities.map((city) => (
              <div key={city.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <WeatherWidget 
                  city={city.name}
                  lat={city.lat}
                  lon={city.lon}
                  compact={true}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Weather Alerts */}
        <section className="container-wide py-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-yellow-800 mb-2">Weather Alerts</h3>
                <p className="text-yellow-700">
                  No severe weather alerts at this time. Check back regularly for updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="container-wide py-8">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Weather Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Data Sources</h4>
                <p className="text-gray-700 text-sm">
                  Weather data is provided by OpenWeatherMap and local meteorological services.
                  Updates every 30 minutes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Forecast Accuracy</h4>
                <p className="text-gray-700 text-sm">
                  7-day forecasts are estimates and become less accurate further into the future.
                  Check daily for the most current information.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}