import type { Metadata } from "next";
import { Inter, Merriweather, Playfair_Display } from "next/font/google";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"], // Reduced weights for performance
  variable: "--font-merriweather",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"], // Reduced weights for performance
  variable: "--font-playfair",
  display: "swap",
  preload: false, // Only preload critical fonts
});

export const metadata: Metadata = {
  metadataBase: new URL('https://reportfocusnews.com'),
  title: "Report Focus News - South Africa & Zimbabwe Breaking News",
  description: "Your trusted source for breaking news from South Africa and Zimbabwe. In-depth coverage of politics, business, and current affairs across Southern Africa.",
  keywords: "South Africa news, Zimbabwe news, Southern Africa, breaking news, politics, business, Johannesburg, Cape Town, Harare, Bulawayo, current affairs",
  openGraph: {
    title: "Report Focus News",
    description: "Your trusted source for breaking news and in-depth journalism",
    url: "https://www.reportfocusnews.com",
    siteName: "Report Focus News",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Report Focus News",
    description: "Your trusted source for breaking news and in-depth journalism",
    images: ["/og-image.jpg"],
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body
        className={`${inter.variable} ${merriweather.variable} ${playfair.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
