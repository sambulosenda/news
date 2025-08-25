import { ReactNode } from 'react';
import { WPPost, WPCategory } from './wordpress';

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Layout component props
export interface LayoutProps extends BaseComponentProps {
  showHeader?: boolean;
  showFooter?: boolean;
}

// Article card props
export interface ArticleCardProps {
  post: WPPost;
  variant?: 'default' | 'compact' | 'large' | 'horizontal';
  showImage?: boolean;
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showDate?: boolean;
  priority?: boolean;
}

// Hero section props
export interface HeroSectionProps {
  posts: WPPost[];
  variant?: 'default' | 'split' | 'overlay';
}

// Category section props
export interface CategorySectionProps {
  category: WPCategory;
  posts: WPPost[];
  showMore?: boolean;
  limit?: number;
}

// Header props
export interface HeaderProps {
  categories?: WPCategory[];
  breakingNews?: {
    show: boolean;
    title: string;
    link: string;
  };
}

// Footer props
export interface FooterProps extends BaseComponentProps {
  showNewsletter?: boolean;
  showSocialLinks?: boolean;
}

// Search props
export interface SearchProps {
  initialQuery?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

// Newsletter props
export interface NewsletterProps {
  variant?: 'inline' | 'modal' | 'sidebar';
  title?: string;
  description?: string;
}