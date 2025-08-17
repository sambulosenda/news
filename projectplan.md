# Report Focus News - Project Implementation Plan

## Overview
Transform the basic Next.js starter into a professional news website inspired by NYTimes.com, fetching content from WordPress/WPGraphQL backend.

## Implementation Strategy
We'll build this incrementally, starting with the foundation (GraphQL client) and moving up to the user-facing features. Each step will be simple and focused.

## Todo List

### Phase 1: Foundation Setup ✅
- [x] Install necessary dependencies (Apollo Client, GraphQL, typography fonts)
- [x] Create .env.local with API endpoint
- [x] Set up GraphQL client configuration
- [x] Create base TypeScript types for WordPress content

### Phase 2: GraphQL Integration ✅
- [x] Create GraphQL queries directory structure
- [x] Implement getAllPosts query with pagination
- [x] Implement getPostBySlug query
- [x] Implement getPostsByCategory query
- [x] Implement getFeaturedPosts query
- [x] Implement getCategories query
- [x] Implement searchPosts query
- [x] Create TypeScript types for all queries

### Phase 3: Design System & Typography ✅
- [x] Configure Tailwind with custom typography scale
- [x] Set up custom fonts (serif for headlines, sans-serif for body)
- [x] Create color palette configuration
- [x] Define spacing and layout constants

### Phase 4: Core Components ✅
- [x] Create Header component with navigation
- [x] Create BreakingNewsBanner component
- [x] Create ArticleCard component (multiple variants)
- [x] Create HeroSection component
- [x] Create CategorySection component
- [x] Create Footer component

### Phase 5: Homepage Implementation
- [ ] Update homepage to fetch real data
- [ ] Implement hero section with featured post
- [ ] Create 3-column layout structure
- [ ] Add "Most Popular" sidebar section
- [ ] Add "Opinion" sidebar section
- [ ] Implement category sections
- [ ] Add "Today's Paper" section

### Phase 6: Article Pages
- [ ] Create dynamic article route ([slug])
- [ ] Implement article layout with typography
- [ ] Add author byline and metadata
- [ ] Create ShareButtons component
- [ ] Add related articles section
- [ ] Add newsletter signup component

### Phase 7: Category & Search Pages
- [ ] Create category pages with pagination
- [ ] Implement search functionality
- [ ] Add search results page
- [ ] Create loading states for all pages

### Phase 8: Performance & SEO
- [ ] Configure ISR with 60-second revalidation
- [ ] Implement loading skeletons
- [ ] Add error boundaries
- [ ] Set up dynamic meta tags
- [ ] Add Open Graph tags
- [ ] Implement structured data for articles

### Phase 9: Polish & Mobile Optimization
- [ ] Ensure responsive design on all breakpoints
- [ ] Implement mobile navigation menu
- [ ] Add dark mode support (optional)
- [ ] Performance optimization and testing

## Implementation Notes

### Simplicity Principles
1. Each component will be self-contained and focused
2. We'll use existing Tailwind utilities wherever possible
3. GraphQL queries will be simple and specific
4. No over-engineering - focus on working features first

### Key Design Decisions
- **GraphQL Client**: Apollo Client for caching and state management
- **Styling**: Tailwind CSS with custom configuration
- **Fonts**: Google Fonts (Merriweather for serif, Inter for sans-serif)
- **Image Handling**: next/image with WordPress domain configuration
- **State Management**: React hooks and Apollo cache only

### WordPress/WPGraphQL Considerations
- Ensure all queries handle nullable fields
- Featured images will come from WordPress media library
- Categories and tags will map to our sections
- Author information will be fetched with posts

## Success Criteria
- [ ] Homepage loads with real WordPress content
- [ ] Articles display with proper formatting
- [ ] Navigation works across all sections
- [ ] Site is responsive on mobile devices
- [ ] Page load times under 3 seconds
- [ ] SEO meta tags properly implemented
- [ ] No TypeScript errors
- [ ] Clean, professional appearance matching NYTimes aesthetic

## Review Section
*To be completed after implementation*

---

Ready to begin implementation. The plan focuses on incremental, simple changes that build upon each other. We'll start with the GraphQL foundation since all other features depend on it.