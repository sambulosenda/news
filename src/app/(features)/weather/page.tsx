import { fetchGraphQL } from '@/lib/api/fetch-graphql';
import { GET_MENU_CATEGORIES } from '@/lib/queries/categories';
import Header from '@/components/layout/HeaderNYT';
import Footer from '@/components/layout/Footer';
import { WPCategory } from '@/types/wordpress';
import WeatherWrapper from './weather-wrapper';

export default async function WeatherPage() {
  // Fetch categories server-side for the header
  const categoriesData = await fetchGraphQL(GET_MENU_CATEGORIES);
  const categories = (categoriesData?.categories?.nodes || []) as WPCategory[];
  
  const breakingNews = {
    show: false,
    title: "Major story developing",
    link: "/breaking/story-slug"
  };

  return (
    <>
      <Header categories={categories} breakingNews={breakingNews} />
      
      <main>
        {/* Static SEO content that loads immediately */}
        <div className="sr-only">
          <h1>Weather Forecast for South Africa and Zimbabwe</h1>
          <p>Get live weather updates and accurate forecasts for major cities in Southern Africa including Johannesburg, Cape Town, Durban, Pretoria, Port Elizabeth, Bloemfontein, Harare, Bulawayo, Victoria Falls, and more. Our weather service provides comprehensive meteorological data including temperature, humidity, wind speed, UV index, and 5-day forecasts.</p>
          
          <h2>South African Cities Weather</h2>
          <ul>
            <li>Johannesburg Weather - Current conditions and 5-day forecast</li>
            <li>Cape Town Weather - Coastal weather updates and predictions</li>
            <li>Durban Weather - KwaZulu-Natal weather information</li>
            <li>Pretoria Weather - Gauteng region weather forecast</li>
            <li>Port Elizabeth Weather - Eastern Cape weather conditions</li>
            <li>Bloemfontein Weather - Free State weather updates</li>
          </ul>
          
          <h2>Zimbabwe Cities Weather</h2>
          <ul>
            <li>Harare Weather - Zimbabwe capital weather forecast</li>
            <li>Bulawayo Weather - Matabeleland weather conditions</li>
            <li>Victoria Falls Weather - Tourist destination weather</li>
            <li>Mutare Weather - Eastern Highlands weather updates</li>
            <li>Gweru Weather - Midlands region forecast</li>
            <li>Chitungwiza Weather - Greater Harare weather</li>
          </ul>
        </div>

        {/* Client-side interactive weather component */}
        <WeatherWrapper />
        
        {/* Additional structured data for weather */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Weather Forecasts for Southern Africa",
              "description": "Live weather updates and forecasts for major cities",
              "numberOfItems": 12,
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Johannesburg Weather",
                  "url": "https://www.reportfocusnews.com/weather#johannesburg"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Cape Town Weather",
                  "url": "https://www.reportfocusnews.com/weather#cape-town"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Harare Weather",
                  "url": "https://www.reportfocusnews.com/weather#harare"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Durban Weather",
                  "url": "https://www.reportfocusnews.com/weather#durban"
                }
              ]
            }),
          }}
        />
      </main>
      
      <Footer />
    </>
  );
}