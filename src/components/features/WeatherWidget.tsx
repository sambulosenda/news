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
  compact = false 
}: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let url = '';
        
        if (detectLocation) {
          // Get user's location
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                url = `/api/weather?lat=${latitude}&lon=${longitude}`;
                const res = await fetch(url);
                const data = await res.json();
                setWeather(data);
                setLoading(false);
              },
              () => {
                setError('Location access denied. Showing Johannesburg weather.');
                // Default to Johannesburg
                fetchDefaultWeather();
              }
            );
          } else {
            fetchDefaultWeather();
          }
        } else if (lat && lon) {
          url = `/api/weather?lat=${lat}&lon=${lon}`;
          const res = await fetch(url);
          const data = await res.json();
          setWeather(data);
          setLoading(false);
        } else if (city) {
          url = `/api/weather?city=${city}`;
          const res = await fetch(url);
          const data = await res.json();
          setWeather(data);
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to load weather data');
        setLoading(false);
      }
    };

    const fetchDefaultWeather = async () => {
      try {
        const url = `/api/weather?city=Johannesburg`;
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city, lat, lon, detectLocation]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg"></div>
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

  if (!weather) return null;

  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  if (compact) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{weather.name}</h3>
            <p className="text-3xl font-bold">{temp}°C</p>
            <p className="text-sm text-gray-600 capitalize">
              {weather.weather[0].description}
            </p>
          </div>
          <div className="relative w-20 h-20">
            <Image
              src={iconUrl}
              alt={weather.weather[0].description}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold">
            {weather.name}, {weather.sys.country}
          </h3>
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