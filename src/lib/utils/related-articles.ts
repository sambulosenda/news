/**
 * Advanced Related Articles Algorithm
 * Uses multiple signals to find the most relevant related content
 */

import { WPPost } from '@/types/wordpress';

interface RelevanceScore {
  postId: string;
  score: number;
  reasons: string[];
}

/**
 * Calculate similarity between two strings using simple word matching
 */
function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = text1.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const words2 = text2.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return union.size > 0 ? intersection.size / union.size : 0;
}

/**
 * Calculate time-based relevance (newer articles score higher)
 */
function calculateTimeRelevance(articleDate: string, baseDate: string): number {
  const article = new Date(articleDate).getTime();
  const base = new Date(baseDate).getTime();
  const daysDiff = Math.abs(article - base) / (1000 * 60 * 60 * 24);
  
  // Articles within same week score highest
  if (daysDiff <= 7) return 1.0;
  if (daysDiff <= 30) return 0.8;
  if (daysDiff <= 90) return 0.6;
  if (daysDiff <= 180) return 0.4;
  return 0.2;
}

/**
 * Find related articles using multiple relevance signals
 */
export function findRelatedArticles(
  currentPost: WPPost,
  allPosts: WPPost[],
  limit: number = 6
): WPPost[] {
  const scores: RelevanceScore[] = [];
  
  // Extract current post features
  const currentCategories = new Set(
    currentPost.categories?.edges?.map(e => e.node.slug) || []
  );
  const currentTags = new Set(
    currentPost.tags?.edges?.map(e => e.node.slug) || []
  );
  const currentAuthor = currentPost.author?.node?.slug;
  const currentTitle = currentPost.title || '';
  const currentExcerpt = currentPost.excerpt?.replace(/<[^>]*>/g, '') || '';
  const currentContent = currentTitle + ' ' + currentExcerpt;
  
  // Score each potential related post
  for (const post of allPosts) {
    // Skip the current post
    if (post.id === currentPost.id) continue;
    
    let score = 0;
    const reasons: string[] = [];
    
    // 1. Category matching (highest weight: 40%)
    const postCategories = post.categories?.edges?.map(e => e.node.slug) || [];
    const commonCategories = postCategories.filter(cat => currentCategories.has(cat));
    if (commonCategories.length > 0) {
      score += 0.4 * (commonCategories.length / Math.max(currentCategories.size, 1));
      reasons.push(`${commonCategories.length} common categories`);
    }
    
    // 2. Tag matching (weight: 30%)
    const postTags = post.tags?.edges?.map(e => e.node.slug) || [];
    const commonTags = postTags.filter(tag => currentTags.has(tag));
    if (commonTags.length > 0) {
      score += 0.3 * (commonTags.length / Math.max(currentTags.size, 1));
      reasons.push(`${commonTags.length} common tags`);
    }
    
    // 3. Title/Content similarity (weight: 20%)
    const postContent = (post.title || '') + ' ' + (post.excerpt?.replace(/<[^>]*>/g, '') || '');
    const similarity = calculateTextSimilarity(currentContent, postContent);
    if (similarity > 0.1) {
      score += 0.2 * similarity;
      reasons.push(`content similarity: ${Math.round(similarity * 100)}%`);
    }
    
    // 4. Time relevance (weight: 5%)
    const timeRelevance = calculateTimeRelevance(post.date, currentPost.date);
    score += 0.05 * timeRelevance;
    if (timeRelevance > 0.8) {
      reasons.push('recent article');
    }
    
    // 5. Same author bonus (weight: 5%)
    if (currentAuthor && post.author?.node?.slug === currentAuthor) {
      score += 0.05;
      reasons.push('same author');
    }
    
    // Store score if article is relevant
    if (score > 0.1) {
      scores.push({
        postId: post.id,
        score,
        reasons
      });
    }
  }
  
  // Sort by relevance score and return top articles
  scores.sort((a, b) => b.score - a.score);
  
  const relatedIds = scores.slice(0, limit).map(s => s.postId);
  return allPosts.filter(post => relatedIds.includes(post.id));
}

/**
 * Group related articles by category for better organization
 */
export function groupRelatedByCategory(
  articles: WPPost[]
): Map<string, WPPost[]> {
  const grouped = new Map<string, WPPost[]>();
  
  articles.forEach(article => {
    const categories = article.categories?.edges?.map(e => e.node.name) || ['Uncategorized'];
    const primaryCategory = categories[0];
    
    if (!grouped.has(primaryCategory)) {
      grouped.set(primaryCategory, []);
    }
    grouped.get(primaryCategory)!.push(article);
  });
  
  return grouped;
}

/**
 * Get trending related articles based on view count or engagement
 * (This would need actual view count data from your analytics)
 */
export function getTrendingRelated(
  relatedArticles: WPPost[],
  limit: number = 3
): WPPost[] {
  // For now, return most recent as "trending"
  // In production, you'd sort by actual view counts or engagement metrics
  return [...relatedArticles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

/**
 * Smart related articles that adapts based on context
 */
export interface SmartRelatedOptions {
  preferSameAuthor?: boolean;
  preferRecentArticles?: boolean;
  excludeCategories?: string[];
  minScore?: number;
}

export function getSmartRelatedArticles(
  currentPost: WPPost,
  allPosts: WPPost[],
  options: SmartRelatedOptions = {}
): WPPost[] {
  const {
    preferSameAuthor = false,
    preferRecentArticles = true,
    excludeCategories = []
  } = options;
  
  let filteredPosts = allPosts;
  
  // Apply exclusion filters
  if (excludeCategories.length > 0) {
    filteredPosts = filteredPosts.filter(post => {
      const categories = post.categories?.edges?.map(e => e.node.slug) || [];
      return !categories.some(cat => excludeCategories.includes(cat));
    });
  }
  
  // Get base related articles
  let related = findRelatedArticles(currentPost, filteredPosts, 12);
  
  // Apply preferences
  if (preferSameAuthor && currentPost.author?.node?.slug) {
    const sameAuthor = related.filter(
      p => p.author?.node?.slug === currentPost.author?.node?.slug
    );
    const others = related.filter(
      p => p.author?.node?.slug !== currentPost.author?.node?.slug
    );
    related = [...sameAuthor, ...others];
  }
  
  if (preferRecentArticles) {
    related.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  }
  
  return related.slice(0, 6);
}