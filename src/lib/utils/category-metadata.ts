// Category-specific metadata for better SEO
export const categoryMetadata: Record<string, {
  title: string;
  description: string;
  keywords: string[];
}> = {
  politics: {
    title: 'SA & Zimbabwe Politics News - Elections & Government',
    description: 'Breaking political news from South Africa & Zimbabwe. Live election updates, ANC, ZANU-PF, EFF coverage. Parliamentary debates & government policy analysis.',
    keywords: ['South Africa politics', 'Zimbabwe politics', 'ANC news', 'ZANU-PF', 'elections SA', 'Zimbabwe elections', 'parliament news', 'government policy', 'political analysis'],
  },
  business: {
    title: 'SA & Zimbabwe Business News - JSE, Mining & Economy',
    description: 'Live business news from SA & Zimbabwe. JSE market updates, ZSE stock prices, rand exchange rates, mining sector news. Economic analysis & company earnings.',
    keywords: ['South Africa business', 'Zimbabwe economy', 'JSE news', 'ZSE stock market', 'rand dollar', 'mining news', 'company earnings', 'economic growth', 'investment Africa'],
  },
  world: {
    title: 'World News - International News with African Perspective',
    description: 'Global news and international affairs from an African perspective. World politics, global economy, international relations affecting South Africa and Zimbabwe.',
    keywords: ['world news', 'international news', 'global politics', 'BRICS news', 'UN Africa', 'global economy', 'international relations', 'Africa world news'],
  },
  africa: {
    title: 'Africa News - Continental Coverage from Southern Africa',
    description: 'Pan-African news coverage focusing on SADC region, AU updates, and continental developments. Breaking news from across Africa with Southern African perspective.',
    keywords: ['Africa news', 'SADC news', 'African Union', 'continental news', 'sub-Saharan Africa', 'African politics', 'Africa economy', 'regional integration'],
  },
  sports: {
    title: 'Sports News - SA & Zimbabwe Sports, Cricket, Football, Rugby',
    description: 'Latest sports news from South Africa and Zimbabwe. Proteas cricket, Springboks rugby, Bafana Bafana football, Warriors, PSL, and international sports coverage.',
    keywords: ['South Africa sports', 'Zimbabwe sports', 'Proteas cricket', 'Springboks rugby', 'Bafana Bafana', 'Warriors football', 'PSL news', 'sports results'],
  },
  entertainment: {
    title: 'Entertainment News - SA & Zimbabwe Celebrities, Music, Culture',
    description: 'Entertainment news from South Africa and Zimbabwe. Celebrity updates, music releases, Amapiano, film industry, cultural events, and lifestyle coverage.',
    keywords: ['SA entertainment', 'Zimbabwe entertainment', 'celebrity news', 'Amapiano', 'African music', 'film news', 'cultural events', 'lifestyle news'],
  },
  technology: {
    title: 'Technology News - Tech Innovation in South Africa & Zimbabwe',
    description: 'Technology news and digital innovation from Southern Africa. Fintech, mobile money, startups, telecommunications, and digital transformation in SA and Zimbabwe.',
    keywords: ['SA technology', 'Zimbabwe tech', 'fintech Africa', 'mobile money', 'tech startups', 'digital innovation', 'telecommunications', 'tech news Africa'],
  },
  health: {
    title: 'Health News - Healthcare Updates from SA & Zimbabwe',
    description: 'Health and medical news from South Africa and Zimbabwe. Public health updates, healthcare system news, medical breakthroughs, and wellness information.',
    keywords: ['South Africa health', 'Zimbabwe healthcare', 'public health', 'medical news', 'healthcare system', 'wellness', 'disease outbreak', 'health policy'],
  },
  education: {
    title: 'Education News - Schools & Universities in SA & Zimbabwe',
    description: 'Education news covering schools, universities, and educational policy in South Africa and Zimbabwe. UNISA, UZ, matric results, and academic developments.',
    keywords: ['SA education', 'Zimbabwe education', 'universities', 'schools news', 'matric results', 'UNISA', 'UZ news', 'education policy', 'student news'],
  },
  opinion: {
    title: 'Opinion & Analysis - Commentary on SA & Zimbabwe Affairs',
    description: 'Expert opinion, analysis, and commentary on South African and Zimbabwean current affairs. Thought leadership on politics, economy, and society.',
    keywords: ['opinion pieces', 'analysis SA', 'Zimbabwe commentary', 'thought leadership', 'editorial', 'expert opinion', 'current affairs', 'political analysis'],
  },
  'breaking-news': {
    title: 'Breaking News SA & Zimbabwe - Live Updates Now',
    description: 'BREAKING: Live news from South Africa & Zimbabwe happening now. Urgent updates on developing stories, alerts & real-time coverage. Get the facts first.',
    keywords: ['breaking news', 'latest news', 'urgent news', 'developing story', 'news alerts', 'live updates', 'South Africa breaking', 'Zimbabwe breaking'],
  },
  crime: {
    title: 'SA & Zimbabwe Crime News - Safety Updates & Reports',
    description: 'Latest crime news from South Africa & Zimbabwe. SAPS reports, court cases, safety alerts & crime statistics. Stay informed on public safety.',
    keywords: ['SA crime', 'Zimbabwe crime', 'police news', 'court cases', 'crime statistics', 'safety news', 'SAPS', 'law enforcement'],
  },
};

// Helper function to get optimized metadata for a category
export function getCategoryMetadata(slug: string) {
  const metadata = categoryMetadata[slug.toLowerCase()];
  
  if (!metadata) {
    // Default metadata for uncategorized sections
    return {
      title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} News - Report Focus News`,
      description: `Latest ${slug} news and updates from South Africa and Zimbabwe. Stay informed with Report Focus News.`,
      keywords: [`${slug} news`, `South Africa ${slug}`, `Zimbabwe ${slug}`, 'Report Focus News'],
    };
  }
  
  return metadata;
}