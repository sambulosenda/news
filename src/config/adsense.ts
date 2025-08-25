// Google AdSense Configuration
// Replace these values with your actual AdSense account details

export const ADSENSE_CONFIG = {
  // Your Google AdSense Publisher ID
  // Format: ca-pub-XXXXXXXXXXXXXXXX
  publisherId: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || 'ca-pub-9333938975725844',
  
  // Ad unit IDs for different placements
  adSlots: {
    // Homepage ads
    homepageBanner: process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_BANNER || '3470843626',
    homepageSidebar: process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_SIDEBAR || '2364009038',
    homepageInFeed: process.env.NEXT_PUBLIC_AD_SLOT_HOMEPAGE_INFEED || '3901270229',
    
    // Article page ads
    articleInContent: process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE_CONTENT || '6204818177',
    articleSidebar: process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE_SIDEBAR || '2364009038',
    articleBottom: process.env.NEXT_PUBLIC_AD_SLOT_ARTICLE_BOTTOM || '4351878124',
    
    // Category page ads
    categoryBanner: process.env.NEXT_PUBLIC_AD_SLOT_CATEGORY_BANNER || '2364009038',
    categorySidebar: process.env.NEXT_PUBLIC_AD_SLOT_CATEGORY_SIDEBAR || '2364009038',
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