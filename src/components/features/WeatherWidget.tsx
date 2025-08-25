'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: [{
    main: string;
    description: string;
    icon: string;
  }];
  wind: {
    speed: number;
    deg: number;
  };
  visibility: number;
  name: string;
  sys: {
    country: string;
  };
}

interface WeatherWidgetProps {
  city?: string;
  lat?: number;
  lon?: number;
  detectLocation?: boolean;
  compact?: boolean;
}

export default function WeatherWidget({ 
  city, 
  lat, 
  lon, 
  detectLocation = false,
  compact = false,
  detailed = false
}: WeatherWidgetProps & { detailed?: boolean }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        let url = '';
        
        if (lat && lon) {
          url = `/api/weather?lat=${lat}&lon=${lon}`;
        } else if (city) {
          url = `/api/weather?city=${city}`;
        } else {
          url = `/api/weather?city=Johannesburg`;
        }
        
        console.log('Fetching weather from:', url);
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Weather data received:', data);
        setWeather(data);
        setLoading(false);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError('Failed to load weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, lat, lon, isClient]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-24 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-sm p-2 bg-red-50 rounded-lg">
        {error}
      </div>
    );
  }

  if (!isClient) {
    return (
      <div className="animate-pulse">
        <div className="h-24 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-gray-500 text-sm p-2">
        No weather data available
      </div>
    );
  }

  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  if (compact) {
    return (
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-800">{temp}°</p>
              <p className="text-sm text-gray-500">C</p>
            </div>
            <p className="text-sm text-gray-600 capitalize mt-1">
              {weather.weather[0].description}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                <span className="text-xs text-gray-500">{weather.main.humidity}%</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
                <span className="text-xs text-gray-500">{weather.wind.speed}m/s</span>
              </div>
            </div>
          </div>
          <div className="relative w-20 h-20">
            <Image
              src={iconUrl}
              alt={weather.weather[0].description}
              fill
              className="object-contain drop-shadow-sm"
              unoptimized
            />
          </div>
        </div>
      </div>
    );
  }

  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const getUVIndex = () => {
    // Mock UV index based on time of day
    const hour = new Date().getHours();
    if (hour < 6 || hour > 18) return 0;
    if (hour >= 11 && hour <= 15) return Math.round(8 + Math.random() * 3);
    return Math.round(3 + Math.random() * 3);
  };

  const uvIndex = getUVIndex();
  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { level: 'Low', color: 'text-green-600 bg-green-100' };
    if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-600 bg-yellow-100' };
    if (uv <= 7) return { level: 'High', color: 'text-orange-600 bg-orange-100' };
    if (uv <= 10) return { level: 'Very High', color: 'text-red-600 bg-red-100' };
    return { level: 'Extreme', color: 'text-purple-600 bg-purple-100' };
  };

  return (
    <div className="">
      <div className="flex items-start justify-between mb-6">
        <div>
          {!detailed && (
            <h3 className="text-2xl font-bold mb-2">
              {weather.name}, {weather.sys.country}
            </h3>
          )}
          <div className="flex items-baseline gap-2">
            <p className="text-6xl font-bold text-gray-900">{temp}°</p>
            <p className="text-2xl text-gray-500">C</p>
          </div>
          <p className="text-gray-600 mt-1">Feels like {feelsLike}°C</p>
          <p className="text-xl capitalize mt-3 text-gray-700 font-medium">
            {weather.weather[0].description}
          </p>
        </div>
        <div className="text-center">
          <div className="relative w-36 h-36">
            <Image
              src={iconUrl}
              alt={weather.weather[0].description}
              fill
              className="object-contain drop-shadow-md"
              unoptimized
            />
          </div>
          <div className="mt-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUVLevel(uvIndex).color}`}>
              UV {uvIndex} - {getUVLevel(uvIndex).level}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-2xl">
        <div className="bg-white p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
            <p className="text-gray-600 text-sm font-medium">Wind</p>
          </div>
          <p className="text-2xl font-bold">{weather.wind.speed}</p>
          <p className="text-xs text-gray-500">m/s {getWindDirection(weather.wind.deg)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <p className="text-gray-600 text-sm font-medium">Humidity</p>
          </div>
          <p className="text-2xl font-bold">{weather.main.humidity}%</p>
          <p className="text-xs text-gray-500">Moisture level</p>
        </div>
        <div className="bg-white p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-gray-600 text-sm font-medium">Pressure</p>
          </div>
          <p className="text-2xl font-bold">{weather.main.pressure}</p>
          <p className="text-xs text-gray-500">hPa</p>
        </div>
        <div className="bg-white p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p className="text-gray-600 text-sm font-medium">Visibility</p>
          </div>
          <p className="text-2xl font-bold">{(weather.visibility / 1000).toFixed(1)}</p>
          <p className="text-xs text-gray-500">km</p>
        </div>
      </div>
    </div>
  );
}