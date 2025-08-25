'use client';

import dynamic from 'next/dynamic';

const WeatherClient = dynamic(() => import('./weather-client'), {
  ssr: false,
  loading: () => <WeatherLoadingSkeleton />
});

function WeatherLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      <div className="container-wide py-16">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg w-64 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mb-8"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WeatherWrapper() {
  return <WeatherClient />;
}