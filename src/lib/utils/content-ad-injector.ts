/**
 * Content Ad Injector - Intelligently places ads within article content
 * for optimal performance and user experience
 */

interface AdPlacement {
  position: 'after-paragraph' | 'after-heading' | 'after-image' | 'after-list';
  index: number;
  elementHtml: string;
}

interface AdConfig {
  minParagraphsBeforeFirst?: number;
  minWordsBetweenAds?: number;
  maxAdsPerArticle?: number;
  preferredPositions?: Array<'early' | 'middle' | 'late'>;
}

const DEFAULT_CONFIG: AdConfig = {
  minParagraphsBeforeFirst: 2,
  minWordsBetweenAds: 300,
  maxAdsPerArticle: 3,
  preferredPositions: ['early', 'middle', 'late']
};

/**
 * Counts words in HTML content
 */
function countWords(html: string): number {
  const text = html.replace(/<[^>]*>/g, '').trim();
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Finds optimal positions for ad placement within content
 */
export function findAdPlacements(
  content: string,
  config: AdConfig = DEFAULT_CONFIG
): AdPlacement[] {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const placements: AdPlacement[] = [];
  
  // Parse content into blocks
  const blocks = content.split(/(<\/(?:p|h[2-6]|ul|ol|blockquote|figure)>)/i);
  
  let paragraphCount = 0;
  let wordsSinceLastAd = 0;
  let totalWords = 0;
  
  // Calculate total words for position strategy
  const totalContentWords = countWords(content);
  
  for (let i = 0; i < blocks.length; i += 2) {
    const block = blocks[i] + (blocks[i + 1] || '');
    
    if (!block.trim()) continue;
    
    // Count paragraphs
    if (/<\/p>/i.test(block)) {
      paragraphCount++;
    }
    
    // Count words in this block
    const blockWords = countWords(block);
    wordsSinceLastAd += blockWords;
    totalWords += blockWords;
    
    // Determine if we should place an ad after this block
    const shouldPlaceAd = 
      placements.length < mergedConfig.maxAdsPerArticle! &&
      paragraphCount >= mergedConfig.minParagraphsBeforeFirst! &&
      wordsSinceLastAd >= mergedConfig.minWordsBetweenAds!;
    
    if (shouldPlaceAd) {
      // Determine position type
      let positionType: 'after-paragraph' | 'after-heading' | 'after-list' | 'after-image' = 'after-paragraph';
      
      if (/<\/h[2-6]>/i.test(block)) {
        positionType = 'after-heading';
      } else if (/<\/(?:ul|ol)>/i.test(block)) {
        positionType = 'after-list';
      } else if (/<\/figure>/i.test(block)) {
        positionType = 'after-image';
      }
      
      // Check if this position aligns with preferred positions
      const contentProgress = totalWords / totalContentWords;
      const isEarly = contentProgress < 0.35;
      const isMiddle = contentProgress >= 0.35 && contentProgress < 0.7;
      const isLate = contentProgress >= 0.7;
      
      const preferredNow = 
        (isEarly && mergedConfig.preferredPositions!.includes('early')) ||
        (isMiddle && mergedConfig.preferredPositions!.includes('middle')) ||
        (isLate && mergedConfig.preferredPositions!.includes('late'));
      
      if (preferredNow || placements.length === 0) {
        placements.push({
          position: positionType,
          index: Math.floor(i / 2),
          elementHtml: block
        });
        
        wordsSinceLastAd = 0;
      }
    }
  }
  
  return placements;
}

/**
 * Injects ad components into content at optimal positions
 */
export function injectAdsIntoContent(
  content: string,
  adComponent: string,
  config?: AdConfig
): string {
  const placements = findAdPlacements(content, config);
  
  if (placements.length === 0) {
    return content;
  }
  
  // Split content into blocks for insertion
  const blocks = content.split(/(<\/(?:p|h[2-6]|ul|ol|blockquote|figure)>)/i);
  const processedBlocks: string[] = [];
  
  let placementIndex = 0;
  
  for (let i = 0; i < blocks.length; i += 2) {
    const block = blocks[i] + (blocks[i + 1] || '');
    processedBlocks.push(block);
    
    // Check if we should insert an ad after this block
    if (
      placementIndex < placements.length &&
      Math.floor(i / 2) === placements[placementIndex].index
    ) {
      // Add spacing wrapper around ad
      processedBlocks.push(`
        <div class="my-8 mx-auto max-w-full ad-wrapper" data-ad-position="${placements[placementIndex].position}">
          ${adComponent}
        </div>
      `);
      placementIndex++;
    }
  }
  
  return processedBlocks.join('');
}

/**
 * Creates React component string for server-side rendering
 */
export function createAdComponentString(
  adType: 'InArticleAd' | 'ResponsiveAd',
  publisherId: string,
  adSlot: string
): string {
  return `<div class="ad-placeholder" data-ad-type="${adType}" data-publisher-id="${publisherId}" data-ad-slot="${adSlot}"></div>`;
}

/**
 * Determines the best ad format based on content position
 */
export function getOptimalAdFormat(
  position: 'early' | 'middle' | 'late',
  deviceType?: 'mobile' | 'desktop'
): 'in-article' | 'responsive' | 'multiplex' {
  if (position === 'early') {
    return 'in-article'; // Fluid, native-looking ads perform best early
  } else if (position === 'middle') {
    return deviceType === 'mobile' ? 'in-article' : 'responsive';
  } else {
    return 'responsive'; // Standard display ads work well at the end
  }
}