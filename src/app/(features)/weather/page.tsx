'use client';

import { useState } from 'react';
import ClientHeader from '@/components/layout/ClientHeader';
import Footer from '@/components/layout/Footer';
import WeatherWidget from '@/components/features/WeatherWidget';
import WeatherSearch from '@/components/features/WeatherSearch';
import WeatherForecast from '@/components/features/WeatherForecast';

// Major cities to display
const featuredCities = {
  'South Africa': [
    { name: 'Johannesburg', lat: -26.2041, lon: 28.0473, id: 'johannesburg' },
    { name: 'Cape Town', lat: -33.9249, lon: 18.4241, id: 'cape-town' },
    { name: 'Durban', lat: -29.8587, lon: 31.0218, id: 'durban' },
    { name: 'Pretoria', lat: -25.7479, lon: 28.2293, id: 'pretoria' },
    { name: 'Port Elizabeth', lat: -33.9608, lon: 25.6022, id: 'port-elizabeth' },
    { name: 'Bloemfontein', lat: -29.0852, lon: 26.1596, id: 'bloemfontein' },
  ],
  'Zimbabwe': [
    { name: 'Harare', lat: -17.8292, lon: 31.0522, id: 'harare' },
    { name: 'Bulawayo', lat: -20.1325, lon: 28.5874, id: 'bulawayo' },
    { name: 'Chitungwiza', lat: -17.9938, lon: 31.0756, id: 'chitungwiza' },
    { name: 'Mutare', lat: -18.9707, lon: 32.6709, id: 'mutare' },
    { name: 'Gweru', lat: -19.4500, lon: 29.8167, id: 'gweru' },
    { name: 'Victoria Falls', lat: -17.9243, lon: 25.8572, id: 'victoria-falls' },
  ]
};

export default function WeatherPage() {
  const [selectedCity, setSelectedCity] = useState<{name: string, lat: number, lon: number} | null>(null);
  const [activeCountry, setActiveCountry] = useState<'South Africa' | 'Zimbabwe'>('South Africa');

  return (
    <>
      <ClientHeader />
      
      <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
        {/* Hero Section - BBC Style */}
        <div className="bg-gradient-to-br from-sky-500 via-sky-600 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Animated clouds background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-20 right-20 w-48 h-48 bg-white rounded-full blur-3xl animate-pulse delay-300"></div>
            <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
          
          <div className="container-wide py-12 relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Weather
              </h1>
              <p className="text-xl text-sky-100 mb-8">
                Current conditions and forecasts for Southern Africa
              </p>
              
              {/* Weather Search */}
              <div className="max-w-xl">
                <WeatherSearch onCitySelect={(city) => {
                  setSelectedCity(city);
                  window.scrollTo({ top: 600, behavior: 'smooth' });
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Selected City Weather or Current Location */}
        {selectedCity && (
          <section className="container-wide py-8">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedCity.name}</h2>
                <p className="text-sky-100">Current Conditions & Forecast</p>
              </div>
              <div className="p-6">
                <WeatherWidget 
                  lat={selectedCity.lat}
                  lon={selectedCity.lon}
                  city={selectedCity.name}
                  detailed={true}
                />
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
                  <WeatherForecast lat={selectedCity.lat} lon={selectedCity.lon} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Quick Access Cities Tabs */}
        <section className="container-wide py-8">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {/* Country Tabs */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="flex">
                <button
                  onClick={() => setActiveCountry('South Africa')}
                  className={`flex-1 px-6 py-4 text-center font-semibold transition-all ${
                    activeCountry === 'South Africa'
                      ? 'bg-white text-sky-600 border-b-2 border-sky-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">🇿🇦</span>
                    South Africa
                  </div>
                </button>
                <button
                  onClick={() => setActiveCountry('Zimbabwe')}
                  className={`flex-1 px-6 py-4 text-center font-semibold transition-all ${
                    activeCountry === 'Zimbabwe'
                      ? 'bg-white text-sky-600 border-b-2 border-sky-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">🇿🇼</span>
                    Zimbabwe
                  </div>
                </button>
              </div>
            </div>

            {/* Cities Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredCities[activeCountry].map((city) => (
                  <div 
                    key={city.id} 
                    className="group cursor-pointer"
                    onClick={() => setSelectedCity(city)}
                  >
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-sky-300 transition-all duration-300 overflow-hidden">
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-sky-600 transition-colors">
                          {city.name}
                        </h3>
                        <WeatherWidget 
                          city={city.name}
                          lat={city.lat}
                          lon={city.lon}
                          compact={true}
                        />
                      </div>
                      <div className="bg-sky-50 px-4 py-2 text-center">
                        <span className="text-xs text-sky-700 font-medium">
                          Click for detailed forecast →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Weather Information Cards */}
        <section className="container-wide py-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Today's Highlights */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Today's Weather</h3>
                  <p className="text-sm text-gray-600">Regional Overview</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Clear skies in most coastal areas
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Possible afternoon showers inland
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  High UV index - sun protection advised
                </li>
              </ul>
            </div>

            {/* Weather Alerts */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Weather Alerts</h3>
                  <p className="text-sm text-gray-600">Current Warnings</p>
                </div>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>Heat Advisory:</strong> High temperatures expected in Northern regions. Stay hydrated.
                </p>
              </div>
            </div>

            {/* Travel Weather */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Travel Weather</h3>
                  <p className="text-sm text-gray-600">Popular Destinations</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Cape Town</span>
                  <span className="font-medium">18°C ☀️</span>
                </li>
                <li className="flex justify-between">
                  <span>Kruger Park</span>
                  <span className="font-medium">28°C ⛅</span>
                </li>
                <li className="flex justify-between">
                  <span>Victoria Falls</span>
                  <span className="font-medium">30°C ☀️</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Weather Map Section */}
        <section className="container-wide py-8">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold mb-2">Regional Weather Map</h2>
              <p className="text-gray-600">Interactive temperature and precipitation map</p>
            </div>
            <div className="relative h-[500px] bg-gradient-to-b from-sky-50 to-sky-100">
              {/* Placeholder for interactive map */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-sky-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-600 font-medium">Interactive Weather Map</p>
                  <p className="text-sm text-gray-500 mt-2">Temperature overlay for Southern Africa</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="container-wide py-8 pb-16">
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Weather Information</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <span className="text-sky-600 mr-2">📊</span>
                  Data Sources
                </h4>
                <p className="text-gray-700 text-sm">
                  Real-time data from OpenWeatherMap and regional meteorological services.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <span className="text-sky-600 mr-2">🔄</span>
                  Update Frequency
                </h4>
                <p className="text-gray-700 text-sm">
                  Weather data refreshes every 30 minutes for accurate conditions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <span className="text-sky-600 mr-2">📍</span>
                  Coverage
                </h4>
                <p className="text-gray-700 text-sm">
                  Comprehensive coverage for South Africa, Zimbabwe, and neighboring regions.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <span className="text-sky-600 mr-2">📱</span>
                  Mobile Access
                </h4>
                <p className="text-gray-700 text-sm">
                  Optimized for mobile devices. Access weather on the go.
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