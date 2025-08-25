'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ForecastDay {
  dt: number;
  temp: {
    min: number;
    max: number;
    day: number;
  };
  weather: [{
    main: string;
    description: string;
    icon: string;
  }];
  humidity: number;
  wind_speed: number;
  pop: number; // Probability of precipitation
}

interface WeatherForecastProps {
  lat: number;
  lon: number;
}

export default function WeatherForecast({ lat, lon }: WeatherForecastProps) {
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, _setError] = useState<string | null>(null);

  useEffect(() => {
    // For now, we'll generate mock forecast data
    // In production, this would call the OpenWeatherMap forecast API
    const generateMockForecast = () => {
      const _days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const weatherConditions = [
        { main: 'Clear', icon: '01d', description: 'clear sky' },
        { main: 'Clouds', icon: '02d', description: 'few clouds' },
        { main: 'Clouds', icon: '03d', description: 'scattered clouds' },
        { main: 'Clouds', icon: '04d', description: 'broken clouds' },
        { main: 'Rain', icon: '09d', description: 'shower rain' },
        { main: 'Rain', icon: '10d', description: 'rain' },
        { main: 'Thunderstorm', icon: '11d', description: 'thunderstorm' },
      ];

      const mockData: ForecastDay[] = [];
      const today = new Date();
      
      for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const baseTemp = 20 + Math.random() * 10; // Base temp between 20-30
        
        mockData.push({
          dt: date.getTime() / 1000,
          temp: {
            min: Math.round(baseTemp - 3 - Math.random() * 2),
            max: Math.round(baseTemp + 3 + Math.random() * 2),
            day: Math.round(baseTemp),
          },
          weather: [randomWeather],
          humidity: Math.round(40 + Math.random() * 40),
          wind_speed: Math.round(2 + Math.random() * 8),
          pop: Math.random() > 0.6 ? Math.round(Math.random() * 70) : 0,
        });
      }
      
      setForecast(mockData);
      setLoading(false);
    };

    // Simulate API call delay
    setTimeout(generateMockForecast, 500);
  }, [lat, lon]);

  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-xl h-48"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {forecast.map((day, index) => (
        <div
          key={day.dt}
          className={`bg-gradient-to-br ${
            index === 0 
              ? 'from-sky-100 to-blue-100 border-sky-300' 
              : 'from-gray-50 to-white border-gray-200'
          } rounded-xl border p-4 hover:border-sky-300 transition-all duration-300 group`}
        >
          <div className="text-center">
            <div className={`font-semibold ${index === 0 ? 'text-sky-700' : 'text-gray-700'}`}>
              {getDayName(day.dt)}
            </div>
            <div className="text-xs text-gray-500 mb-3">
              {getDate(day.dt)}
            </div>
            
            <div className="relative w-16 h-16 mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Image
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-center items-center gap-2">
                <span className="text-xl font-bold">{day.temp.max}°</span>
                <span className="text-sm text-gray-500">{day.temp.min}°</span>
              </div>
              
              <div className="text-xs text-gray-600 capitalize">
                {day.weather[0].description}
              </div>
              
              {day.pop > 0 && (
                <div className="flex items-center justify-center gap-1 text-xs text-blue-600">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a3 3 0 106 0v5a3 3 0 11-6 0V9z" clipRule="evenodd" />
                  </svg>
                  {day.pop}%
                </div>
              )}
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  {day.wind_speed} m/s
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}