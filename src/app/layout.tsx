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
  metadataBase: new URL('https://www.reportfocusnews.com'),
  title: "Report Focus News - Breaking News, Analysis, and Journalism",
  description: "Stay informed with Report Focus News - Your trusted source for breaking news, in-depth analysis, and comprehensive journalism coverage.",
  keywords: "news, breaking news, politics, business, technology, world news, Report Focus",
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
