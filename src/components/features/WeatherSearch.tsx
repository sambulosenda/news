'use client';

import React, { useState, useRef, useEffect } from 'react';

interface City {
  name: string;
  lat: number;
  lon: number;
  country?: string;
}

interface WeatherSearchProps {
  onCitySelect: (city: City) => void;
}

// Popular cities in South Africa and Zimbabwe
const popularCities: City[] = [
  // South Africa
  { name: 'Johannesburg', lat: -26.2041, lon: 28.0473, country: 'ZA' },
  { name: 'Cape Town', lat: -33.9249, lon: 18.4241, country: 'ZA' },
  { name: 'Durban', lat: -29.8587, lon: 31.0218, country: 'ZA' },
  { name: 'Pretoria', lat: -25.7479, lon: 28.2293, country: 'ZA' },
  { name: 'Port Elizabeth', lat: -33.9608, lon: 25.6022, country: 'ZA' },
  { name: 'Bloemfontein', lat: -29.0852, lon: 26.1596, country: 'ZA' },
  { name: 'East London', lat: -33.0153, lon: 27.9116, country: 'ZA' },
  { name: 'Kimberley', lat: -28.7282, lon: 24.7499, country: 'ZA' },
  { name: 'Polokwane', lat: -23.9045, lon: 29.4689, country: 'ZA' },
  { name: 'Nelspruit', lat: -25.4753, lon: 30.9694, country: 'ZA' },
  // Zimbabwe
  { name: 'Harare', lat: -17.8292, lon: 31.0522, country: 'ZW' },
  { name: 'Bulawayo', lat: -20.1325, lon: 28.5874, country: 'ZW' },
  { name: 'Chitungwiza', lat: -17.9938, lon: 31.0756, country: 'ZW' },
  { name: 'Mutare', lat: -18.9707, lon: 32.6709, country: 'ZW' },
  { name: 'Gweru', lat: -19.4500, lon: 29.8167, country: 'ZW' },
  { name: 'Victoria Falls', lat: -17.9243, lon: 25.8572, country: 'ZW' },
  { name: 'Masvingo', lat: -20.0736, lon: 30.8277, country: 'ZW' },
  { name: 'Kwekwe', lat: -18.9281, lon: 29.8147, country: 'ZW' },
  { name: 'Kadoma', lat: -18.3333, lon: 29.9167, country: 'ZW' },
  { name: 'Chinhoyi', lat: -17.3667, lon: 30.2000, country: 'ZW' },
];

export default function WeatherSearch({ onCitySelect }: WeatherSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCities([]);
      setIsOpen(false);
      return;
    }

    const filtered = popularCities.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filtered);
    setIsOpen(filtered.length > 0);
    setSelectedIndex(-1);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCities.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredCities.length) {
          handleCitySelect(filteredCities[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleCitySelect = (city: City) => {
    onCitySelect(city);
    setSearchTerm(city.name);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const getCountryFlag = (country?: string) => {
    switch (country) {
      case 'ZA':
        return '🇿🇦';
      case 'ZW':
        return '🇿🇼';
      default:
        return '🌍';
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a city..."
          className="w-full px-5 py-4 pl-14 bg-white/95 backdrop-blur-md rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-white/40 border border-white/30 text-lg font-medium"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && filteredCities.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl border border-gray-200 overflow-hidden max-h-80 overflow-y-auto">
          <ul className="py-2">
            {filteredCities.map((city, index) => (
              <li
                key={`${city.name}-${city.country}`}
                className={`px-4 py-3 hover:bg-sky-50 cursor-pointer flex items-center justify-between transition-colors ${
                  index === selectedIndex ? 'bg-sky-50' : ''
                }`}
                onClick={() => handleCitySelect(city)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCountryFlag(city.country)}</span>
                  <div>
                    <div className="font-medium text-gray-900">{city.name}</div>
                    <div className="text-xs text-gray-500">
                      {city.country === 'ZA' ? 'South Africa' : 'Zimbabwe'}
                    </div>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchTerm && filteredCities.length === 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-gray-500 text-center">
            No cities found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}