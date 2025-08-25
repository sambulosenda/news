// SEO-optimized navigation structure
// This configuration groups categories logically for better user experience and SEO

export interface NavSection {
  name: string;
  slug: string;
  priority: number; // For ordering in navigation
  featured?: boolean; // Show in main nav
  children?: NavSection[];
}

export const navigationConfig: NavSection[] = [
  // Primary News Categories (High Priority)
  // Note: Breaking News is now handled by dynamic banner at top
  {
    name: 'World',
    slug: 'world',
    priority: 1,
    featured: true,
    children: [
      { name: 'Africa', slug: 'africa', priority: 1 },
      { name: 'Americas', slug: 'americas', priority: 2 },
      { name: 'Asia', slug: 'asia', priority: 3 },
      { name: 'Europe', slug: 'europe', priority: 4 },
      { name: 'Middle East', slug: 'middleeast', priority: 5 },
      { name: 'US & Canada', slug: 'united-states-canada', priority: 6 },
    ],
  },
  {
    name: 'Africa',
    slug: 'africa',
    priority: 2,
    featured: true,
    children: [
      { name: 'South Africa', slug: 'south-africa', priority: 1 },
      { name: 'Zimbabwe', slug: 'zimbabwe', priority: 2 },
      { name: 'Zambia', slug: 'zambia', priority: 3 },
      { name: 'Malawi', slug: 'malawi', priority: 4 },
      { name: 'Mozambique', slug: 'mozambique', priority: 5 },
      { name: 'Angola', slug: 'angola', priority: 6 },
      { name: 'Senegal', slug: 'senegal', priority: 7 },
      { name: 'East Africa', slug: 'east-africa', priority: 8 },
      { name: 'West Africa', slug: 'west-africa', priority: 9 },
      { name: 'Southern Africa', slug: 'southern-africa', priority: 10 },
    ],
  },
  {
    name: 'Politics',
    slug: 'politics',
    priority: 3,
    featured: true,
    children: [
      { name: 'US Politics', slug: 'us-politics', priority: 1 },
      { name: 'UK Politics', slug: 'uk-general-election', priority: 2 },
      { name: 'Elections', slug: 'elections-2012', priority: 3 },
    ],
  },
  {
    name: 'Business',
    slug: 'business',
    priority: 4,
    featured: true,
    children: [
      { name: 'Money & Finance', slug: 'money-finance', priority: 1 },
      { name: 'Technology', slug: 'tech-news', priority: 2 },
    ],
  },
  {
    name: 'Sports',
    slug: 'sports',
    priority: 5,
    featured: true,
  },
  {
    name: 'Entertainment',
    slug: 'entertainment',
    priority: 6,
    featured: true,
    children: [
      { name: 'Arts & Lifestyle', slug: 'arts-lifestyle', priority: 1 },
      { name: 'Youth Culture', slug: 'youth-culture-column', priority: 2 },
    ],
  },
  {
    name: 'Opinion',
    slug: 'opinion',
    priority: 7,
    featured: true,
  },
  {
    name: 'Weather',
    slug: 'weather',
    priority: 8,
    featured: true,
  },
  // Secondary Categories (In "More" dropdown)
  // Note: Breaking News category available here for direct access
  {
    name: 'Breaking News',
    slug: 'breaking-news',
    priority: 9,
    featured: false,
  },
  {
    name: 'Crime',
    slug: 'crime',
    priority: 10,
    featured: false,
  },
  {
    name: 'Health',
    slug: 'health-fitness',
    priority: 11,
    featured: false,
  },
  {
    name: 'Science',
    slug: 'science',
    priority: 12,
    featured: false,
  },
  {
    name: 'Environment',
    slug: 'environment',
    priority: 13,
    featured: false,
  },
  {
    name: 'Travel',
    slug: 'travel',
    priority: 14,
    featured: false,
  },
  {
    name: 'Food & Drinks',
    slug: 'food-drinks',
    priority: 16,
    featured: false,
  },
  {
    name: 'Videos',
    slug: 'videos',
    priority: 16,
    featured: false,
  },
];

// Helper function to map WordPress categories to our navigation structure
export function mapCategoriesToNavigation(wpCategories: any[]): NavSection[] {
  if (!wpCategories || !Array.isArray(wpCategories)) {
    return navigationConfig; // Return default config if no categories
  }
  
  const categoryMap = new Map<string, any>();
  
  // Create a map for quick lookup
  wpCategories.forEach(cat => {
    categoryMap.set(cat.slug, cat);
  });
  
  // Build navigation based on config
  return navigationConfig.map(section => {
    const wpCategory = categoryMap.get(section.slug);
    
    if (!wpCategory) return section;
    
    // Merge WordPress data with our config
    const navSection: NavSection = {
      ...section,
      name: wpCategory.name || section.name, // Use WP name if available
    };
    
    // Map children if they exist
    if (section.children && wpCategory.children?.nodes) {
      navSection.children = section.children.map(child => {
        const wpChild = wpCategory.children.nodes.find((c: any) => c.slug === child.slug);
        return {
          ...child,
          name: wpChild?.name || child.name,
        };
      }).filter(child => {
        // Only include children that exist in WordPress
        const wpChild = wpCategory.children.nodes.find((c: any) => c.slug === child.slug);
        return wpChild || categoryMap.has(child.slug);
      });
    }
    
    return navSection;
  });
}

// SEO Best Practices for Navigation:
// 1. Limit main navigation to 7-10 items for better UX and crawlability
// 2. Use descriptive, keyword-rich category names
// 3. Create logical hierarchies with parent-child relationships
// 4. Most important/popular categories should be in main nav
// 5. Use "mega menu" pattern for complex hierarchies
// 6. Ensure all categories are accessible within 3 clicks from homepage
// 7. Include breadcrumbs on category and article pages
// 8. Add schema.org markup for navigation