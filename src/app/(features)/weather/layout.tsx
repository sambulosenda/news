import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Weather Forecast South Africa & Zimbabwe | Live Weather Updates | Report Focus News',
  description: 'Get accurate weather forecasts for South Africa and Zimbabwe. Live weather updates for Johannesburg, Cape Town, Harare, Durban, and more. 5-day forecasts, hourly predictions, UV index, and weather warnings.',
  keywords: 'weather South Africa, weather Zimbabwe, Johannesburg weather, Cape Town weather, Harare weather, Durban weather, weather forecast, Southern Africa weather, live weather updates, 5-day forecast, hourly weather, UV index South Africa',
  openGraph: {
    title: 'Weather Forecast - South Africa & Zimbabwe | Report Focus News',
    description: 'Live weather updates and forecasts for major cities in South Africa and Zimbabwe. Get accurate 5-day forecasts, hourly predictions, and weather warnings.',
    type: 'website',
    url: 'https://www.reportfocusnews.com/weather',
    images: [
      {
        url: 'https://www.reportfocusnews.com/images/weather-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Weather Forecast for Southern Africa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weather Forecast - South Africa & Zimbabwe',
    description: 'Live weather updates for Southern Africa. Get forecasts for Johannesburg, Cape Town, Harare, and more.',
    images: ['https://www.reportfocusnews.com/images/weather-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://www.reportfocusnews.com/weather',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function WeatherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Weather Forecast - South Africa & Zimbabwe",
            "description": "Live weather updates and forecasts for major cities in Southern Africa",
            "url": "https://www.reportfocusnews.com/weather",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.reportfocusnews.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Weather",
                  "item": "https://www.reportfocusnews.com/weather"
                }
              ]
            },
            "mainEntity": {
              "@type": "WebApplication",
              "name": "Southern Africa Weather Forecast",
              "applicationCategory": "Weather",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              }
            },
            "publisher": {
              "@type": "NewsMediaOrganization",
              "name": "Report Focus News",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.reportfocusnews.com/logo.png"
              }
            }
          }),
        }}
      />
    </>
  );
}