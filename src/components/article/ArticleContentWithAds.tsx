'use client';

import { useEffect, useRef, useState } from 'react';
import { InArticleAd } from '@/components/ads/GoogleAdsense';
import LazyAdUnit from '@/components/ads/LazyAdUnit';
import { ADSENSE_CONFIG, shouldShowAds } from '@/config/adsense';

interface ArticleContentWithAdsProps {
  content: string;
  publisherId: string;
  adSlot: string;
}

export default function ArticleContentWithAds({ 
  content, 
  publisherId, 
  adSlot 
}: ArticleContentWithAdsProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [processedContent, setProcessedContent] = useState<string>(content);

  useEffect(() => {
    if (!shouldShowAds() || !contentRef.current) {
      setProcessedContent(content);
      return;
    }

    // Parse the content and find optimal ad positions
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const paragraphs = doc.querySelectorAll('p');
    
    // Insert ads after specific paragraph positions
    const adPositions = [2, 5, 8]; // After 3rd, 6th, and 9th paragraphs
    let adsInserted = 0;
    
    adPositions.forEach((position) => {
      if (paragraphs[position] && adsInserted < 2) { // Max 2 in-content ads
        const adPlaceholder = doc.createElement('div');
        adPlaceholder.className = 'in-content-ad-placeholder';
        adPlaceholder.setAttribute('data-ad-index', String(adsInserted));
        
        // Insert after the paragraph
        paragraphs[position].insertAdjacentElement('afterend', adPlaceholder);
        adsInserted++;
      }
    });
    
    setProcessedContent(doc.body.innerHTML);
  }, [content]);

  useEffect(() => {
    if (!shouldShowAds() || !contentRef.current) return;

    // Find and replace placeholders with actual ad components
    const placeholders = contentRef.current.querySelectorAll('.in-content-ad-placeholder');
    
    placeholders.forEach((placeholder, index) => {
      // Create a container for the React component
      const adContainer = document.createElement('div');
      adContainer.className = 'my-8 mx-auto max-w-full';
      
      // Replace placeholder with container
      placeholder.replaceWith(adContainer);
      
      // Render the ad component
      import('react-dom/client').then(({ createRoot }) => {
        const root = createRoot(adContainer);
        root.render(
          <LazyAdUnit
            adType="InArticleAd"
            dataAdClient={publisherId}
            dataAdSlot={adSlot}
            rootMargin={index === 0 ? '100px' : '200px'}
          />
        );
      });
    });
  }, [processedContent, publisherId, adSlot]);

  return (
    <div 
      ref={contentRef}
      className="article-content max-w-[720px] mx-auto font-serif text-gray-800"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}