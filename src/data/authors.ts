/**
 * Author credentials and expertise data
 * This is critical for Google News trust signals
 * Update this with your actual journalists' information
 */

import { AuthorCredentials } from '@/types/author';

export const AUTHORS: Record<string, AuthorCredentials> = {
  'admin': {
    id: 'admin',
    name: 'Report Focus News',
    slug: 'admin',
    title: 'Editorial Team',
    bio: 'The Report Focus News editorial team brings you breaking news and in-depth analysis from South Africa and Zimbabwe.',
    expertise: ['Breaking News', 'Politics', 'Business', 'Current Affairs'],
    yearsOfExperience: 5,
    verified: true,
    joinedDate: '2024-01-01',
  },
  'newsroom': {
    id: 'newsroom',
    name: 'Newsroom',
    slug: 'newsroom',
    title: 'Report Focus News Newsroom',
    bio: 'Breaking news and updates from the Report Focus News newsroom. Our team of journalists brings you the latest developments from South Africa and Zimbabwe.',
    expertise: ['Breaking News', 'Politics', 'Business', 'Current Affairs', 'Crime', 'Sports'],
    yearsOfExperience: 5,
    verified: true,
    joinedDate: '2024-01-01',
  },
  'staff-reporter': {
    id: 'staff-reporter',
    name: 'Staff Reporter',
    slug: 'staff-reporter',
    title: 'Report Focus News',
    bio: 'News reporting from Report Focus News staff journalists covering stories across South Africa and Zimbabwe.',
    expertise: ['General News', 'Breaking News', 'Current Affairs'],
    yearsOfExperience: 5,
    verified: true,
    joinedDate: '2024-01-01',
  },
  'samuel-moyo': {
    id: 'samuel-moyo',
    name: 'Samuel Moyo',
    slug: 'samuel-moyo',
    email: 'editorial@reportfocusnews.com',
    title: 'Senior Political Correspondent',
    bio: 'Samuel Moyo is an award-winning journalist covering politics and governance in Southern Africa. With over 10 years of experience, he specializes in investigative reporting on government affairs, elections, and policy analysis.',
    expertise: ['Politics', 'Government', 'Elections', 'Policy Analysis', 'Investigative Journalism'],
    yearsOfExperience: 10,
    education: 'MA Journalism, University of the Witwatersrand',
    awards: ['2023 Southern Africa Media Award for Political Reporting'],
    twitter: '@samuelmoyo',
    linkedin: 'samuel-moyo',
    verified: true,
    articleCount: 450,
    joinedDate: '2024-01-15',
    avatar: {
      url: '/authors/samuel-moyo.jpg',
      alt: 'Samuel Moyo'
    }
  },
  'thandi-ndlovu': {
    id: 'thandi-ndlovu',
    name: 'Thandi Ndlovu',
    slug: 'thandi-ndlovu',
    email: 'editorial@reportfocusnews.com',
    title: 'Business & Economics Editor',
    bio: 'Thandi Ndlovu leads our business coverage, focusing on market trends, economic policy, and corporate news across Southern Africa. She has extensive experience covering the JSE, Zimbabwe Stock Exchange, and regional economic developments.',
    expertise: ['Business', 'Economics', 'Markets', 'Corporate News', 'Mining', 'Agriculture'],
    yearsOfExperience: 8,
    education: 'BCom Economics, University of Cape Town',
    twitter: '@thandindlovu',
    linkedin: 'thandi-ndlovu',
    verified: true,
    articleCount: 320,
    joinedDate: '2024-02-01',
    avatar: {
      url: '/authors/thandi-ndlovu.jpg',
      alt: 'Thandi Ndlovu'
    }
  },
  'john-smith': {
    id: 'john-smith',
    name: 'John Smith',
    slug: 'john-smith',
    email: 'editorial@reportfocusnews.com',
    title: 'Crime & Courts Reporter',
    bio: 'John Smith covers crime, justice, and legal affairs across South Africa. His investigative work has exposed corruption and helped bring criminals to justice.',
    expertise: ['Crime', 'Courts', 'Legal Affairs', 'Corruption', 'Investigation'],
    yearsOfExperience: 12,
    education: 'BA Journalism, Rhodes University',
    awards: ['2022 Investigative Journalism Award'],
    twitter: '@johnsmith_sa',
    verified: true,
    articleCount: 580,
    joinedDate: '2024-01-10',
    avatar: {
      url: '/authors/john-smith.jpg',
      alt: 'John Smith'
    }
  },
  'mary-johnson': {
    id: 'mary-johnson',
    name: 'Mary Johnson',
    slug: 'mary-johnson',
    email: 'editorial@reportfocusnews.com',
    title: 'Sports Editor',
    bio: 'Mary Johnson brings you comprehensive sports coverage from across Southern Africa, with special focus on rugby, cricket, soccer, and athletics.',
    expertise: ['Sports', 'Rugby', 'Cricket', 'Soccer', 'Athletics'],
    yearsOfExperience: 6,
    education: 'BA Sports Journalism, Stellenbosch University',
    twitter: '@maryjohnson_sport',
    verified: true,
    articleCount: 280,
    joinedDate: '2024-03-01',
    avatar: {
      url: '/authors/mary-johnson.jpg',
      alt: 'Mary Johnson'
    }
  },
  'tatenda': {
    id: 'tatenda',
    name: 'Tatenda Chirimuta',
    slug: 'tatenda',
    email: 'editorial@reportfocusnews.com',
    title: 'Senior Reporter',
    bio: 'Tatenda Chirimuta is an experienced journalist covering Zimbabwe news, politics, and current affairs. With deep insights into local issues and regional dynamics, Tatenda brings authoritative reporting on developments across Zimbabwe.',
    expertise: ['Zimbabwe Politics', 'Current Affairs', 'Economic Development', 'Social Issues', 'Regional News'],
    yearsOfExperience: 7,
    education: 'BA Media Studies, University of Zimbabwe',
    twitter: '@tatenda_news',
    linkedin: 'tatenda-chirimuta',
    verified: true,
    articleCount: 410,
    joinedDate: '2024-01-20',
    avatar: {
      url: '/authors/tatenda.jpg',
      alt: 'Tatenda Chirimuta'
    }
  }
};

// Get author by slug with fallback to default
export function getAuthorBySlug(slug: string): AuthorCredentials {
  // If author exists in our data, return it
  if (AUTHORS[slug]) {
    return AUTHORS[slug];
  }
  
  // For unknown authors, create a basic author object with their name
  // This prevents all unknown authors from showing as "Report Focus News"
  const name = slug
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return {
    id: slug,
    name: name,
    slug: slug,
    title: 'Reporter',
    bio: `${name} is a journalist at Report Focus News covering stories across South Africa and Zimbabwe.`,
    expertise: ['News'],
    yearsOfExperience: 0,
    verified: false,
    joinedDate: new Date().toISOString().split('T')[0],
  };
}

// Get author expertise areas
export function getAuthorExpertise(slug: string): string[] {
  const author = getAuthorBySlug(slug);
  return author.expertise || [];
}

// Check if author is verified
export function isAuthorVerified(slug: string): boolean {
  const author = getAuthorBySlug(slug);
  return author.verified || false;
}

// Get all authors for sitemap
export function getAllAuthors(): AuthorCredentials[] {
  return Object.values(AUTHORS);
}