import type { Metadata } from "next";
import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ApolloWrapper } from "@/lib/api/apollo-wrapper";
import SearchActionSchema from "@/components/seo/SearchActionSchema";
import SiteNavigationSchema from "@/components/seo/SiteNavigationSchema";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import NewsPerformanceOptimizer from "@/components/performance/NewsPerformanceOptimizer";
import PerformanceMonitor from "@/components/performance/PerformanceMonitor";
import WebSiteSchema from "@/components/seo/WebSiteSchema";
import { GoogleAdsenseScript } from "@/components/ads/GoogleAdsense";
import { ADSENSE_CONFIG, shouldShowAds } from "@/config/adsense";
import { fontVariables, fontStyles } from "@/lib/fonts";
import "@/styles/critical.css";
import "@/styles/globals.css";

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
        {/* Inline critical font styles for zero-delay font loading */}
        <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
        
        {/* Critical resource preloading for better performance */}
        <link rel="preconnect" href="https://backend.reportfocusnews.com" />
        <link rel="dns-prefetch" href="https://backend.reportfocusnews.com" />
        
        {/* Preload critical web fonts - will work when network is available */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preload critical images for LCP optimization */}
        <link rel="preload" as="image" href="/og-image.jpg" fetchPriority="high" />
        
        {/* Resource hints for third-party services */}
        {shouldShowAds() && (
          <>
            <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
            <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
          </>
        )}
        
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
        {/* Google Search Console - Site already verified through domain verification */}
        <link rel="alternate" type="application/rss+xml" title="Report Focus News RSS Feed" href="/rss.xml" />
      </head>
      <body
        className={`${fontVariables} font-sans antialiased bg-white text-gray-900`}
      >
        <SearchActionSchema />
        <SiteNavigationSchema />
        <OrganizationSchema />
        <WebSiteSchema />
        <NewsPerformanceOptimizer />
        <PerformanceMonitor />
        <ApolloWrapper>{children}</ApolloWrapper>
        {shouldShowAds() && <GoogleAdsenseScript pId={ADSENSE_CONFIG.publisherId} />}
        <SpeedInsights />
      </body>
    </html>
  );
}
