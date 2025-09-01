import type { Metadata } from "next";
import React from "react";
import { Inter, Roboto } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ApolloWrapper } from "@/lib/api/apollo-wrapper";
import SearchActionSchema from "@/components/seo/SearchActionSchema";
import SiteNavigationSchema from "@/components/seo/SiteNavigationSchema";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import NewsPerformanceOptimizer from "@/components/performance/NewsPerformanceOptimizer";
import WebSiteSchema from "@/components/seo/WebSiteSchema";
import WebVitalsClient from "@/components/performance/WebVitalsClient";
import { GoogleAdsenseScript } from "@/components/ads/GoogleAdsense";
import { ADSENSE_CONFIG, shouldShowAds } from "@/config/adsense";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Better for LCP - shows text immediately with fallback
  preload: true,
  adjustFontFallback: true, // Better fallback matching
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap", // Better for LCP - shows text immediately
  preload: true,
  adjustFontFallback: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://reportfocusnews.com'),
  title: {
    default: "SA & Zimbabwe Breaking News - Report Focus News",
    template: "%s | Report Focus News"
  },
  description: "Breaking news from South Africa & Zimbabwe. Live updates on load shedding, politics, crime, business & sports. Trusted by millions for accurate Southern African news.",
  keywords: "South Africa news, Zimbabwe news, load shedding today, Eskom, SASSA grants, petrol price, breaking news SA, Johannesburg news, Harare news, ZAR USD exchange rate",
  openGraph: {
    title: "SA & Zimbabwe Breaking News - Report Focus News",
    description: "Breaking news from SA & Zimbabwe. Live updates on load shedding, politics, crime & business. Get the facts first.",
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
    title: "SA & Zimbabwe Breaking News - Report Focus News",
    description: "Breaking news from SA & Zimbabwe. Live updates on load shedding, politics, crime & business.",
    images: ["https://reportfocusnews.com/og-image.jpg"],
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
  verification: {
    google: 'Ht1qagqS6RXNU4R7Z9y4Q0IGeht5_Nj0VlQY1g73pfE',
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
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="Ht1qagqS6RXNU4R7Z9y4Q0IGeht5_Nj0VlQY1g73pfE" />
        
        {/* Critical resource preloading for better performance */}
        <link rel="preconnect" href="https://backend.reportfocusnews.com" />
        <link rel="dns-prefetch" href="https://backend.reportfocusnews.com" />
        <link rel="preconnect" href="https://newsreportfocus.b-cdn.net" />
        <link rel="dns-prefetch" href="https://newsreportfocus.b-cdn.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preload critical images for LCP optimization */}
        <link rel="preload" as="image" href="/og-image.jpg" fetchPriority="high" />
        
        {/* Preload critical CSS (if using external stylesheets) */}
        <link rel="preload" as="style" href="/_next/static/css/app.css" />
        
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
        
        {/* Critical inline CSS for faster FCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold CSS */
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html { -webkit-text-size-adjust: 100%; }
            body { min-height: 100vh; font-family: var(--font-inter), system-ui, sans-serif; }
            img { max-width: 100%; height: auto; display: block; }
            a { color: inherit; text-decoration: none; }
            .container-wide { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
            @media (min-width: 1024px) { .container-wide { padding: 0 2rem; } }
            /* Prevent layout shift */
            img[loading="lazy"] { background: #f3f4f6; }
            .aspect-\\[16\\/9\\] { aspect-ratio: 16/9; }
            /* Skeleton loading */
            .skeleton { background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%); background-size: 200% 100%; animation: skeleton 1.5s infinite; }
            @keyframes skeleton { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
          `
        }} />
      </head>
      <body
        className={`${inter.variable} ${roboto.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <SearchActionSchema />
        <SiteNavigationSchema />
        <OrganizationSchema />
        <WebSiteSchema />
        <NewsPerformanceOptimizer />
        <ErrorBoundary>
          <ApolloWrapper>{children}</ApolloWrapper>
        </ErrorBoundary>
        {shouldShowAds() && <GoogleAdsenseScript pId={ADSENSE_CONFIG.publisherId} />}
        <SpeedInsights />
        <WebVitalsClient />
      </body>
    </html>
  );
}
