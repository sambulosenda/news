'use client';

export default function WeatherMap() {
  return (
    <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
      {/* Embed OpenWeatherMap or another weather map service */}
      <iframe
        width="100%"
        height="100%"
        src="https://openweathermap.org/weathermap?basemap=map&cities=false&layer=temperature&lat=-26&lon=28&zoom=5"
        frameBorder="0"
        className="absolute inset-0"
        title="Weather Map"
      />
      <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded shadow-lg text-sm">
        Temperature Map
      </div>
    </div>
  );
}