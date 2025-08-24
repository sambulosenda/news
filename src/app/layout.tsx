import type { Metadata } from "next";
import React from "react";
import { Inter, Roboto } from "next/font/google";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import SearchActionSchema from "@/components/SearchActionSchema";
import SiteNavigationSchema from "@/components/SiteNavigationSchema";
import OrganizationSchema from "@/components/OrganizationSchema";
import NewsPerformanceOptimizer from "@/components/NewsPerformanceOptimizer";
import WebSiteSchema from "@/components/WebSiteSchema";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional", // Don't block render for fonts
  preload: true,
  adjustFontFallback: true, // Better fallback matching
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "optional",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://reportfocusnews.com'),
  title: {
    default: "Report Focus News - South Africa & Zimbabwe Breaking News",
    template: "%s | Report Focus News"
  },
  description: "Your trusted source for breaking news from South Africa and Zimbabwe. Live updates on load shedding, politics, business, crime and current affairs across Southern Africa.",
  keywords: "South Africa news, Zimbabwe news, load shedding today, Eskom, SASSA grants, petrol price, breaking news SA, Johannesburg news, Harare news, ZAR USD exchange rate",
  openGraph: {
    title: "Report Focus News - SA & Zimbabwe Breaking News",
    description: "Live breaking news, load shedding updates, politics and business from South Africa and Zimbabwe",
    url: "https://reportfocusnews.com",
    siteName: "Report Focus News",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Report Focus News - Southern Africa's Trusted News Source",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Report Focus News - SA & Zimbabwe Breaking News",
    description: "Live breaking news, load shedding updates, politics and business from South Africa and Zimbabwe",
    images: ["/og-image.jpg"],
    site: "@ReportFocus",
    creator: "@ReportFocus",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    'geo.region': 'ZA-GP;ZW-HA',
    'geo.placename': 'Johannesburg;Harare',
    'geo.country': 'ZA;ZW',
    'geo.position': '-26.2041;28.0473;-17.8292;31.0522',
    'ICBM': '-26.2041, 28.0473',
    'distribution': 'global',
    'audience': 'general',
    'coverage': 'worldwide',
    'target': 'South Africa, Zimbabwe',
    'language': 'en-ZA',
    'dc.language': 'en-ZA',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to optimize external resources */}
        <link rel="preconnect" href="https://backend.reportfocusnews.com" />
        <link rel="dns-prefetch" href="https://backend.reportfocusnews.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme and mobile optimization */}
        <meta name="theme-color" content="#DC2626" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Additional SEO */}
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
        <link rel="alternate" type="application/rss+xml" title="Report Focus News RSS Feed" href="/rss.xml" />
      </head>
      <body
        className={`${inter.variable} ${roboto.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <SearchActionSchema />
        <SiteNavigationSchema />
        <OrganizationSchema />
        <WebSiteSchema />
        <NewsPerformanceOptimizer />
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
