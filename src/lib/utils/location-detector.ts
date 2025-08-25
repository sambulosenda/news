export interface LocationData {
  country: 'South Africa' | 'Zimbabwe';
  city?: string;
  region?: string;
}

// South African cities and regions
const southAfricanLocations = {
  cities: [
    'johannesburg', 'cape town', 'durban', 'pretoria', 'port elizabeth', 'bloemfontein',
    'east london', 'pietermaritzburg', 'witbank', 'welkom', 'polokwane', 'rustenburg',
    'nelspruit', 'kimberley', 'george', 'stellenbosch', 'paarl', 'springs', 'roodepoort',
    'benoni', 'boksburg', 'brakpan', 'krugersdorp', 'randburg', 'sandton', 'soweto',
    'centurion', 'vanderbijlpark', 'sasolburg', 'potchefstroom', 'klerksdorp', 'vereeniging'
  ],
  regions: [
    'gauteng', 'western cape', 'kwazulu-natal', 'eastern cape', 'limpopo', 'mpumalanga',
    'north west', 'northern cape', 'free state'
  ],
  keywords: [
    'south africa', 'south african', 'sa government', 'anc', 'da', 'eff', 'ramaphosa',
    'cyril ramaphosa', 'parliament', 'cape town', 'union buildings', 'rand', 'zar',
    'johannesburg stock exchange', 'jse', 'sars', 'eskom', 'transnet', 'sabc'
  ]
};

// Zimbabwean cities and regions
const zimbabweanLocations = {
  cities: [
    'harare', 'bulawayo', 'chitungwiza', 'mutare', 'gweru', 'kwekwe', 'kadoma',
    'masvingo', 'chinhoyi', 'norton', 'marondera', 'ruwa', 'chegutu', 'zvishavane',
    'bindura', 'beitbridge', 'redcliff', 'victoria falls', 'hwange', 'kariba'
  ],
  regions: [
    'harare province', 'bulawayo province', 'manicaland', 'mashonaland central',
    'mashonaland east', 'mashonaland west', 'masvingo province', 'matabeleland north',
    'matabeleland south', 'midlands'
  ],
  keywords: [
    'zimbabwe', 'zimbabwean', 'zanu-pf', 'mdc', 'emmerson mnangagwa', 'mnangagwa',
    'robert mugabe', 'reserve bank of zimbabwe', 'rbz', 'zimbabwe dollar', 'zwd',
    'zimbabwe stock exchange', 'zse', 'zimra', 'zbc', 'herald zimbabwe'
  ]
};

export function detectLocationFromContent(
  title: string = '',
  content: string = '',
  category: string = '',
  tags: string[] = []
): LocationData | null {
  const searchText = `${title} ${content} ${category} ${tags.join(' ')}`.toLowerCase();
  
  // Check for South African indicators
  const saMatches = {
    cities: southAfricanLocations.cities.filter(city => 
      searchText.includes(city.toLowerCase())
    ),
    regions: southAfricanLocations.regions.filter(region => 
      searchText.includes(region.toLowerCase())
    ),
    keywords: southAfricanLocations.keywords.filter(keyword => 
      searchText.includes(keyword.toLowerCase())
    )
  };

  // Check for Zimbabwean indicators
  const zwMatches = {
    cities: zimbabweanLocations.cities.filter(city => 
      searchText.includes(city.toLowerCase())
    ),
    regions: zimbabweanLocations.regions.filter(region => 
      searchText.includes(region.toLowerCase())
    ),
    keywords: zimbabweanLocations.keywords.filter(keyword => 
      searchText.includes(keyword.toLowerCase())
    )
  };

  // Calculate relevance scores
  const saScore = saMatches.cities.length * 3 + saMatches.regions.length * 2 + saMatches.keywords.length;
  const zwScore = zwMatches.cities.length * 3 + zwMatches.regions.length * 2 + zwMatches.keywords.length;

  // Determine primary location
  if (saScore > zwScore && saScore > 0) {
    return {
      country: 'South Africa',
      city: saMatches.cities[0] ? formatCityName(saMatches.cities[0]) : undefined,
      region: saMatches.regions[0] ? formatRegionName(saMatches.regions[0]) : undefined,
    };
  } else if (zwScore > 0) {
    return {
      country: 'Zimbabwe',
      city: zwMatches.cities[0] ? formatCityName(zwMatches.cities[0]) : undefined,
      region: zwMatches.regions[0] ? formatRegionName(zwMatches.regions[0]) : undefined,
    };
  }

  // Default to South Africa if no specific location detected (since it's the primary market)
  return {
    country: 'South Africa'
  };
}

function formatCityName(city: string): string {
  return city
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatRegionName(region: string): string {
  return region
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Keywords for local SEO optimization
export const localKeywords = {
  southAfrica: {
    primary: [
      'South Africa news', 'SA breaking news', 'South African politics',
      'Johannesburg news', 'Cape Town news', 'Durban news', 'Pretoria news'
    ],
    secondary: [
      'SA government', 'ANC news', 'DA news', 'EFF news', 'Ramaphosa news',
      'South African economy', 'JSE news', 'rand currency', 'Eskom news',
      'load shedding', 'SARS news', 'South African business'
    ],
    local: [
      'Gauteng news', 'Western Cape news', 'KwaZulu-Natal news',
      'Eastern Cape news', 'Free State news', 'Limpopo news',
      'Mpumalanga news', 'Northern Cape news', 'North West news'
    ]
  },
  zimbabwe: {
    primary: [
      'Zimbabwe news', 'Zim breaking news', 'Zimbabwean politics',
      'Harare news', 'Bulawayo news', 'Zimbabwe economy'
    ],
    secondary: [
      'ZANU-PF news', 'MDC news', 'Mnangagwa news', 'Zimbabwe dollar',
      'ZSE news', 'RBZ news', 'Zimbabwe business', 'Herald Zimbabwe'
    ],
    local: [
      'Harare Province news', 'Bulawayo Province news', 'Manicaland news',
      'Mashonaland news', 'Matabeleland news', 'Masvingo news', 'Midlands news'
    ]
  }
};

// Generate location-based meta keywords
export function generateLocationKeywords(location: LocationData | null, category: string = ''): string[] {
  const keywords: string[] = [];
  
  if (!location) {
    // Default Southern Africa keywords
    keywords.push(...localKeywords.southAfrica.primary.slice(0, 3));
    keywords.push(...localKeywords.zimbabwe.primary.slice(0, 2));
  } else if (location.country === 'South Africa') {
    keywords.push(...localKeywords.southAfrica.primary);
    if (location.city) {
      keywords.push(`${location.city} news`, `${location.city} ${category.toLowerCase()}`);
    }
    if (location.region) {
      keywords.push(`${location.region} news`);
    }
    keywords.push(...localKeywords.southAfrica.secondary.slice(0, 5));
  } else if (location.country === 'Zimbabwe') {
    keywords.push(...localKeywords.zimbabwe.primary);
    if (location.city) {
      keywords.push(`${location.city} news`, `${location.city} ${category.toLowerCase()}`);
    }
    if (location.region) {
      keywords.push(`${location.region} news`);
    }
    keywords.push(...localKeywords.zimbabwe.secondary.slice(0, 5));
  }

  // Add category-specific keywords
  if (category) {
    keywords.push(`${category.toLowerCase()} news ${location?.country || 'Southern Africa'}`);
  }

  return keywords.filter((keyword, index, self) => self.indexOf(keyword) === index);
}