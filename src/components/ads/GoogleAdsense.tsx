'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

// Define the global adsbygoogle type
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface GoogleAdsenseProps {
  pId: string; // Publisher ID (e.g., "ca-pub-xxxxxxxxxx")
}

// This component loads the Google AdSense script once per page
export function GoogleAdsenseScript({ pId }: GoogleAdsenseProps) {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}

interface AdUnitProps {
  dataAdClient: string; // Your AdSense client ID (ca-pub-xxxxxxxxxx)
  dataAdSlot: string; // The ad unit ID
  dataAdFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  dataAdLayoutKey?: string; // For fluid layout ads
  dataFullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Placeholder component for development
function AdPlaceholder({ 
  format = 'auto', 
  className = '',
  style = {}
}: { 
  format?: string; 
  className?: string;
  style?: React.CSSProperties;
}) {
  const getPlaceholderSize = () => {
    switch (format) {
      case 'horizontal':
        return 'h-24';
      case 'rectangle':
        return 'h-64';
      case 'vertical':
        return 'h-96';
      default:
        return 'h-32';
    }
  };

  return (
    <div 
      className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${getPlaceholderSize()} ${className}`}
      style={style}
    >
      <div className="text-center">
        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
        <p className="text-sm text-gray-500 font-medium">Advertisement</p>
        <p className="text-xs text-gray-400 mt-1">{format} ad</p>
      </div>
    </div>
  );
}

// Reusable AdSense ad unit component
export function AdUnit({
  dataAdClient,
  dataAdSlot,
  dataAdFormat = 'auto',
  dataAdLayoutKey,
  dataFullWidthResponsive = true,
  className = '',
  style = { display: 'block' }
}: AdUnitProps) {
  // Check if we should show placeholder
  const isTestMode = process.env.NODE_ENV === 'development' || 
                     dataAdClient === 'ca-pub-XXXXXXXXXXXXXXXX' ||
                     !dataAdClient || 
                     dataAdClient.includes('XXXX');
  
  useEffect(() => {
    if (!isTestMode) {
      try {
        // Push the ad to AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [isTestMode]);

  // Show placeholder in test mode
  if (isTestMode) {
    return (
      <AdPlaceholder 
        format={dataAdFormat} 
        className={className} 
        style={style}
      />
    );
  }

  const insProps: React.InsHTMLAttributes<HTMLElement> & { [key: string]: unknown } = {
    className: `adsbygoogle ${className}`,
    style,
    'data-ad-client': dataAdClient,
    'data-ad-slot': dataAdSlot,
    'data-ad-format': dataAdFormat,
    'data-full-width-responsive': dataFullWidthResponsive.toString(),
  };

  // Add layout key if provided (for fluid ads)
  if (dataAdLayoutKey) {
    insProps['data-ad-layout-key'] = dataAdLayoutKey;
  }

  return <ins {...insProps} />;
}

// Pre-configured ad components for different placements
export function InArticleAd({ dataAdClient, dataAdSlot }: Pick<AdUnitProps, 'dataAdClient' | 'dataAdSlot'>) {
  const insProps: React.InsHTMLAttributes<HTMLElement> & { [key: string]: unknown } = {
    className: 'adsbygoogle',
    style: { display: 'block', textAlign: 'center' },
    'data-ad-layout': 'in-article',
    'data-ad-format': 'fluid',
    'data-ad-client': dataAdClient,
    'data-ad-slot': dataAdSlot,
  };

  const isTestMode = process.env.NODE_ENV === 'development' || 
                     dataAdClient === 'ca-pub-XXXXXXXXXXXXXXXX' ||
                     !dataAdClient || 
                     dataAdClient.includes('XXXX');

  useEffect(() => {
    if (!isTestMode) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [isTestMode]);

  if (isTestMode) {
    return (
      <div className="my-8 mx-auto max-w-full">
        <AdPlaceholder format="fluid" style={{ display: 'block', textAlign: 'center' }} />
      </div>
    );
  }

  return (
    <div className="my-8 mx-auto max-w-full">
      <ins {...insProps} />
    </div>
  );
}

export function SidebarAd({ dataAdClient, dataAdSlot }: Pick<AdUnitProps, 'dataAdClient' | 'dataAdSlot'>) {
  return (
    <div className="mb-6">
      <AdUnit
        dataAdClient={dataAdClient}
        dataAdSlot={dataAdSlot}
        dataAdFormat="rectangle"
        style={{ display: 'block', minHeight: '250px' }}
      />
    </div>
  );
}

export function BannerAd({ dataAdClient, dataAdSlot }: Pick<AdUnitProps, 'dataAdClient' | 'dataAdSlot'>) {
  return (
    <div className="w-full bg-gray-50 py-4">
      <div className="container-wide">
        <AdUnit
          dataAdClient={dataAdClient}
          dataAdSlot={dataAdSlot}
          dataAdFormat="horizontal"
          dataFullWidthResponsive={true}
          style={{ display: 'block', minHeight: '90px' }}
        />
      </div>
    </div>
  );
}

export function ResponsiveAd({ dataAdClient, dataAdSlot }: Pick<AdUnitProps, 'dataAdClient' | 'dataAdSlot'>) {
  return (
    <div className="w-full">
      <AdUnit
        dataAdClient={dataAdClient}
        dataAdSlot={dataAdSlot}
        dataAdFormat="auto"
        dataFullWidthResponsive={true}
        className="min-h-[100px]"
      />
    </div>
  );
}