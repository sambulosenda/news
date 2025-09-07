/**
 * Generate an SEO-optimized meta description from content
 * Follows best practices: 150-160 characters, compelling, includes keywords
 */
export function generateMetaDescription(
  content: string | null | undefined,
  title: string | null | undefined,
  excerpt: string | null | undefined
): string {
  // Priority 1: Use excerpt if available
  if (excerpt) {
    const cleanExcerpt = excerpt
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    if (cleanExcerpt.length > 0) {
      // Ensure it ends with proper punctuation
      const truncated = cleanExcerpt.substring(0, 157);
      const lastPeriod = truncated.lastIndexOf('.');
      const lastQuestion = truncated.lastIndexOf('?');
      const lastExclamation = truncated.lastIndexOf('!');
      
      const lastPunctuation = Math.max(lastPeriod, lastQuestion, lastExclamation);
      
      if (lastPunctuation > 100) {
        return truncated.substring(0, lastPunctuation + 1);
      }
      
      return truncated + (truncated.length === 157 ? '...' : '');
    }
  }
  
  // Priority 2: Generate from content
  if (content) {
    // Remove HTML tags and decode entities
    const cleanContent = content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
      .replace(/&amp;/g, '&') // Decode ampersands
      .replace(/&lt;/g, '<') // Decode less than
      .replace(/&gt;/g, '>') // Decode greater than
      .replace(/&quot;/g, '"') // Decode quotes
      .replace(/&#39;/g, "'") // Decode apostrophes
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    if (cleanContent.length > 0) {
      // Try to get the first 2 sentences
      const sentences = cleanContent.split(/[.!?]+/);
      
      if (sentences.length > 0) {
        let description = '';
        
        for (const sentence of sentences) {
          const trimmedSentence = sentence.trim();
          if (!trimmedSentence) continue;
          
          const potentialDescription = description 
            ? `${description}. ${trimmedSentence}`
            : trimmedSentence;
          
          if (potentialDescription.length <= 157) {
            description = potentialDescription;
          } else {
            // If adding this sentence would exceed limit, use what we have
            if (description) {
              return description + '.';
            }
            // Or truncate the first sentence
            return trimmedSentence.substring(0, 154) + '...';
          }
          
          // Stop after 2 sentences or 150 chars
          if (description.length > 100 && description.includes('.')) {
            return description + '.';
          }
        }
        
        if (description) {
          return description + (description.endsWith('.') ? '' : '.');
        }
      }
    }
  }
  
  // Priority 3: Generate from title
  if (title) {
    const cleanTitle = title
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (cleanTitle.length > 0) {
      // Create a description from the title
      const baseDescription = `Read the latest news: ${cleanTitle}`;
      
      if (baseDescription.length <= 160) {
        return baseDescription;
      }
      
      // Truncate if too long
      return `${cleanTitle.substring(0, 150)}...`;
    }
  }
  
  // Fallback
  return 'Get the latest news and updates from Report Focus News - Your trusted source for Southern African news.';
}

/**
 * Validate and optimize an existing meta description
 */
export function optimizeMetaDescription(description: string | null | undefined): string | null {
  if (!description) return null;
  
  const cleaned = description
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // If it's too short, return null to trigger generation
  if (cleaned.length < 50) return null;
  
  // If it's too long, truncate properly
  if (cleaned.length > 160) {
    const truncated = cleaned.substring(0, 157);
    const lastPeriod = truncated.lastIndexOf('.');
    
    if (lastPeriod > 100) {
      return truncated.substring(0, lastPeriod + 1);
    }
    
    return truncated + '...';
  }
  
  return cleaned;
}