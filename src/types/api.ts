// API response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// GraphQL response types
export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export interface GraphQLError {
  message: string;
  extensions?: {
    code?: string;
    [key: string]: any;
  };
  path?: (string | number)[];
  locations?: Array<{
    line: number;
    column: number;
  }>;
}

// Cache types
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Request options
export interface RequestOptions {
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached';
  revalidate?: number | false;
  tags?: string[];
  headers?: Record<string, string>;
}

// Search types
export interface SearchParams {
  query: string;
  page?: number;
  limit?: number;
  categories?: string[];
  tags?: string[];
  author?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: 'relevance' | 'date' | 'popularity';
}

// Related posts types
export interface RelatedPostsParams {
  postId: string;
  limit?: number;
  categories?: string[];
  tags?: string[];
}