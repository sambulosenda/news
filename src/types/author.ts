/**
 * Enhanced author types for Google News credibility
 */

export interface AuthorCredentials {
  // Basic Information
  id: string;
  name: string;
  slug: string;
  email?: string;
  
  // Professional Details
  title?: string; // e.g., "Senior Political Correspondent"
  bio?: string;
  expertise?: string[]; // ["Politics", "Economics", "Crime"]
  yearsOfExperience?: number;
  education?: string;
  awards?: string[];
  
  // Social Proof
  twitter?: string;
  linkedin?: string;
  verified?: boolean;
  
  // Publication History
  articleCount?: number;
  joinedDate?: string;
  
  // Avatar
  avatar?: {
    url: string;
    alt?: string;
  };
}

export interface AuthorBeat {
  name: string;
  description: string;
  icon?: string;
}

export interface AuthorStats {
  totalArticles: number;
  totalViews?: number;
  averageReadTime?: number;
  topCategories: string[];
  recentArticles: number;
}