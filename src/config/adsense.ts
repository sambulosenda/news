// Google AdSense Configuration
// Replace these values with your actual AdSense account details

export const ADSENSE_CONFIG = {
  // Your Google AdSense Publisher ID
  // Format: ca-pub-XXXXXXXXXXXXXXXX
  publisherId: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || 'ca-pub-XXXXXXXXXXXXXXXX',
  
  // Ad unit IDs for different placements
  adSlots: {
    // Homepage ads
    homepageBanner: process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_BANNER || 'XXXXXXXXXX',
    homepageSidebar: process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_SIDEBAR || 'XXXXXXXXXX',
    homepageInFeed: process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_INFEED || 'XXXXXXXXXX',
    
    // Article page ads
    articleInContent: process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE_CONTENT || 'XXXXXXXXXX',
    articleSidebar: process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE_SIDEBAR || 'XXXXXXXXXX',
    articleBottom: process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE_BOTTOM || 'XXXXXXXXXX',
    
    // Category page ads
    categoryBanner: process.env.NEXT_PUBLIC_AD_SLOT_CATEGORY_BANNER || 'XXXXXXXXXX',
    categorySidebar: process.env.NEXT_PUBLIC_AD_SLOT_CATEGORY_SIDEBAR || 'XXXXXXXXXX',
  },
  
  // Enable/disable ads globally (useful for development)
  enabled: process.env.NEXT_PUBLIC_ADS_ENABLED !== 'false',
  
  // Test mode - shows placeholder ads instead of real ones
  testMode: process.env.NODE_ENV === 'development',
};

// Helper function to check if ads should be shown
export function shouldShowAds(): boolean {
  // In development, always show placeholder ads if enabled
  if (process.env.NODE_ENV === 'development') {
    return ADSENSE_CONFIG.enabled;
  }
  // In production, only show if enabled and not in test mode
  return ADSENSE_CONFIG.enabled && !ADSENSE_CONFIG.testMode;
}

// Helper function to get ad client ID
export function getAdClient(): string {
  return ADSENSE_CONFIG.publisherId;
}