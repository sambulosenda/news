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
          <div>
            <p className="text-2xl font-bold">{temp}°C</p>
            <p className="text-sm text-gray-600 capitalize">
              {weather.weather[0].description}
            </p>
          </div>
          <div className="relative w-16 h-16">
            <Image
              src={iconUrl}
              alt={weather.weather[0].description}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex items-start justify-between mb-4">
        <div>
          {!detailed && (
            <h3 className="text-2xl font-bold">
              {weather.name}, {weather.sys.country}
            </h3>
          )}
          <p className="text-5xl font-bold mt-2">{temp}°C</p>
          <p className="text-gray-600">Feels like {feelsLike}°C</p>
          <p className="text-lg capitalize mt-2">
            {weather.weather[0].description}
          </p>
        </div>
        <div className="relative w-32 h-32">
          <Image
            src={iconUrl}
            alt={weather.weather[0].description}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <div>
          <p className="text-gray-600 text-sm">Wind</p>
          <p className="font-semibold">{weather.wind.speed} m/s</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Humidity</p>
          <p className="font-semibold">{weather.main.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Pressure</p>
          <p className="font-semibold">{weather.main.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
}