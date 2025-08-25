import { NextRequest, NextResponse } from 'next/server';

// You'll need to get an API key from OpenWeatherMap
// Sign up at: https://openweathermap.org/api
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

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
      throw new Error('Weather API request failed');
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Weather API error:', error);
    
    // Return mock data for development
    return NextResponse.json({
      coord: { lon: 28.0473, lat: -26.2041 },
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }
      ],
      base: 'stations',
      main: {
        temp: 22,
        feels_like: 21,
        temp_min: 18,
        temp_max: 26,
        pressure: 1013,
        humidity: 45
      },
      visibility: 10000,
      wind: {
        speed: 3.5,
        deg: 180
      },
      clouds: { all: 0 },
      dt: Date.now() / 1000,
      sys: {
        type: 1,
        id: 1,
        country: 'ZA',
        sunrise: 1609308000,
        sunset: 1609356000
      },
      timezone: 7200,
      id: 993800,
      name: city || 'Johannesburg',
      cod: 200
    });
  }
}