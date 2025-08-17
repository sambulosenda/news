export interface WPPost {
  id: string;
  databaseId: number;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  date: string;
  modified?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
      caption?: string;
      mediaDetails?: {
        width: number;
        height: number;
      };
    };
  };
  author?: {
    node: {
      name: string;
      firstName?: string;
      lastName?: string;
      avatar?: {
        url: string;
      };
      description?: string;
    };
  };
  categories?: {
    edges: Array<{
      node: WPCategory;
    }>;
  };
  tags?: {
    edges: Array<{
      node: WPTag;
    }>;
  };
}

export interface WPCategory {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

export interface WPTag {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

export interface WPPage {
  id: string;
  databaseId: number;
  slug: string;
  title: string;
  content?: string;
  date: string;
  modified?: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText?: string;
    };
  };
}

export interface WPMenu {
  id: string;
  name: string;
  menuItems?: {
    nodes: WPMenuItem[];
  };
}

export interface WPMenuItem {
  id: string;
  label: string;
  path: string;
  parentId?: string;
  cssClasses?: string[];
  target?: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface PostsConnection {
  edges: Array<{
    node: WPPost;
    cursor: string;
  }>;
  pageInfo: PageInfo;
  nodes?: WPPost[];
}

export interface CategoriesConnection {
  edges: Array<{
    node: WPCategory;
  }>;
  nodes?: WPCategory[];
}

export interface SEOData {
  title?: string;
  metaDesc?: string;
  canonical?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: {
    sourceUrl: string;
  };
  opengraphUrl?: string;
  opengraphType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: {
    sourceUrl: string;
  };
}