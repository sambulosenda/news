import { NextRequest, NextResponse } from 'next/server';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  // Check if API key is configured
  if (!OPENWEATHER_API_KEY) {
    console.warn('OpenWeatherMap API key not configured, using mock data');
    // Jump to mock data generation
    return generateMockWeatherData(city, lat, lon);
  }

  let url = '';
  
  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  } else if (city) {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  } else {
    return NextResponse.json(
      { error: 'Please provide either city or coordinates' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 1800 } // Cache for 30 minutes
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenWeatherMap API error:', response.status, errorData);
      
      // If API key is invalid or not activated, fall back to mock data
      if (response.status === 401) {
        console.warn('API key invalid or not activated yet. Using mock data.');
        return generateMockWeatherData(city, lat, lon);
      }
      
      throw new Error(`Weather API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return generateMockWeatherData(city, lat, lon);
  }
}

function generateMockWeatherData(city: string | null, lat: string | null, lon: string | null) {
    // Mock data for development with variety based on city
    const mockWeatherData: Record<string, any> = {
      'Johannesburg': { temp: 22, humidity: 45, weather: 'Clear', icon: '01d', country: 'ZA' },
      'Cape Town': { temp: 18, humidity: 65, weather: 'Clouds', icon: '02d', country: 'ZA' },
      'Durban': { temp: 25, humidity: 75, weather: 'Rain', icon: '10d', country: 'ZA' },
      'Pretoria': { temp: 23, humidity: 42, weather: 'Clear', icon: '01d', country: 'ZA' },
      'Port Elizabeth': { temp: 19, humidity: 70, weather: 'Clouds', icon: '03d', country: 'ZA' },
      'Bloemfontein': { temp: 20, humidity: 38, weather: 'Clear', icon: '01d', country: 'ZA' },
      'Harare': { temp: 24, humidity: 48, weather: 'Clear', icon: '01d', country: 'ZW' },
      'Bulawayo': { temp: 26, humidity: 40, weather: 'Clear', icon: '01d', country: 'ZW' },
      'Chitungwiza': { temp: 23, humidity: 50, weather: 'Clouds', icon: '02d', country: 'ZW' },
      'Mutare': { temp: 21, humidity: 55, weather: 'Clouds', icon: '04d', country: 'ZW' },
      'Gweru': { temp: 22, humidity: 44, weather: 'Clear', icon: '01d', country: 'ZW' },
      'Victoria Falls': { temp: 28, humidity: 60, weather: 'Clouds', icon: '02d', country: 'ZW' },
    };

    // Determine city name from coordinates or use provided city
    let cityName = city || 'Johannesburg';
    if (!city && lat && lon) {
      // Map coordinates to city names (approximate)
      const coords = `${lat},${lon}`;
      const coordsMap: Record<string, string> = {
        '-26.2041,28.0473': 'Johannesburg',
        '-33.9249,18.4241': 'Cape Town',
        '-29.8587,31.0218': 'Durban',
        '-25.7479,28.2293': 'Pretoria',
        '-33.9608,25.6022': 'Port Elizabeth',
        '-29.0852,26.1596': 'Bloemfontein',
        '-17.8292,31.0522': 'Harare',
        '-20.1325,28.5874': 'Bulawayo',
        '-17.9938,31.0756': 'Chitungwiza',
        '-18.9707,32.6709': 'Mutare',
        '-19.45,29.8167': 'Gweru',
        '-17.9243,25.8572': 'Victoria Falls',
      };
      cityName = coordsMap[coords] || 'Johannesburg';
    }

    const mockData = mockWeatherData[cityName] || mockWeatherData['Johannesburg'];
    
    return NextResponse.json({
      coord: { lon: lon ? parseFloat(lon) : 28.0473, lat: lat ? parseFloat(lat) : -26.2041 },
      weather: [
        {
          id: 800,
          main: mockData.weather,
          description: mockData.weather.toLowerCase(),
          icon: mockData.icon
        }
      ],
      base: 'stations',
      main: {
        temp: mockData.temp,
        feels_like: mockData.temp - 1,
        temp_min: mockData.temp - 4,
        temp_max: mockData.temp + 4,
        pressure: 1013,
        humidity: mockData.humidity
      },
      visibility: 10000,
      wind: {
        speed: 3.5,
        deg: 180
      },
      clouds: { all: mockData.weather === 'Clear' ? 0 : mockData.weather === 'Clouds' ? 50 : 80 },
      dt: Date.now() / 1000,
      sys: {
        type: 1,
        id: 1,
        country: mockData.country,
        sunrise: 1609308000,
        sunset: 1609356000
      },
      timezone: 7200,
      id: 993800,
      name: cityName,
      cod: 200
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
}