/**
 * Author enrichment for E-E-A-T signals
 * Adds additional data to WordPress authors for better SEO
 */

// List of news agencies (not individual journalists)
export const NEWS_AGENCIES = [
  'AFP',
  'Reuters',
  'AP',
  'Associated Press',
  'Bloomberg',
  'BBC',
  'CNN',
  'Al Jazeera',
  'SABC',
  'ENCA',
  'News24',
  'IOL',
  'SAPA',
  'ZBC',
  'The Herald',
  'NewsDay'
];

// Author enrichment data for key journalists
const AUTHOR_ENRICHMENTS: Record<string, any> = {
  'samuel-moyo': {
    expertise: ['Politics', 'Government', 'Elections', 'Policy Analysis'],
    yearsOfExperience: 10,
    education: 'MA Journalism, University of the Witwatersrand',
    verified: true,
    awards: ['2023 Southern Africa Media Award for Political Reporting'],
    twitter: '@samuelmoyo',
  },
  'thandi-ndlovu': {
    expertise: ['Business', 'Economics', 'Markets', 'Mining'],
    yearsOfExperience: 8,
    education: 'BCom Economics, University of Cape Town',
    verified: true,
    twitter: '@thandindlovu',
  },
  'john-smith': {
    expertise: ['Crime', 'Courts', 'Legal Affairs', 'Investigation'],
    yearsOfExperience: 12,
    education: 'BA Journalism, Rhodes University',
    verified: true,
    awards: ['2022 Investigative Journalism Award'],
  },
  'mary-johnson': {
    expertise: ['Sports', 'Rugby', 'Cricket', 'Soccer'],
    yearsOfExperience: 6,
    education: 'BA Sports Journalism, Stellenbosch University',
    verified: true,
  },
  'staff-reporter': {
    expertise: ['General News', 'Breaking News'],
    yearsOfExperience: 5,
    verified: true,
  },
  'newsroom': {
    expertise: ['Breaking News', 'Politics', 'Business', 'Current Affairs'],
    yearsOfExperience: 5,
    verified: true,
  }
};

/**
 * Check if an author name is a news agency
 */
export function isNewsAgency(name: string): boolean {
  if (!name) return false;
  return NEWS_AGENCIES.some(agency => 
    name.toLowerCase().includes(agency.toLowerCase()) ||
    agency.toLowerCase().includes(name.toLowerCase())
  );
}

/**
 * Enrich author data with additional E-E-A-T signals
 */
export function enrichAuthor(author: any): any {
  if (!author) return author;

  // Check if it's a news agency
  const isAgency = isNewsAgency(author.name);
  
  // Start with base author data
  const enrichedAuthor = {
    ...author,
    isNewsAgency: isAgency,
  };

  // If it's a news agency, add appropriate fields
  if (isAgency) {
    enrichedAuthor.type = 'NewsMediaOrganization';
    enrichedAuthor.jobTitle = undefined; // Agencies don't have job titles
    
    // Set a standard description if not provided
    if (!enrichedAuthor.bio) {
      enrichedAuthor.bio = `${author.name} is an international news agency providing breaking news and analysis.`;
    }
  } else {
    enrichedAuthor.type = 'Person';
    
    // Add enrichment data if available
    const enrichmentData = AUTHOR_ENRICHMENTS[author.slug];
    if (enrichmentData) {
      enrichedAuthor.expertise = enrichmentData.expertise || author.expertise;
      enrichedAuthor.yearsOfExperience = enrichmentData.yearsOfExperience || author.yearsOfExperience;
      enrichedAuthor.education = enrichmentData.education || author.education;
      enrichedAuthor.verified = enrichmentData.verified || author.verified;
      enrichedAuthor.awards = enrichmentData.awards || author.awards;
      enrichedAuthor.twitter = enrichmentData.twitter || author.twitter;
    }
    
    // Set default job title if not provided
    if (!enrichedAuthor.jobTitle && !isAgency) {
      enrichedAuthor.jobTitle = 'Journalist';
    }
    
    // Set a default bio if not provided
    if (!enrichedAuthor.bio) {
      enrichedAuthor.bio = `${author.name} is a journalist at Report Focus News covering stories across South Africa and Zimbabwe.`;
    }
  }

  return enrichedAuthor;
}

/**
 * Get author schema type for structured data
 */
export function getAuthorSchemaType(author: any): string {
  return isNewsAgency(author.name) ? 'NewsMediaOrganization' : 'Person';
}

/**
 * Format author display name
 */
export function formatAuthorName(author: any): string {
  if (isNewsAgency(author.name)) {
    // For news agencies, ensure consistent formatting
    return author.name.toUpperCase() === 'AFP' ? 'AFP' : 
           author.name.toUpperCase() === 'AP' ? 'Associated Press' :
           author.name;
  }
  return author.name;
}