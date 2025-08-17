# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Report Focus News - A modern news website inspired by NYTimes.com that fetches content from a WordPress backend using WPGraphQL.

**Tech Stack:**
- Next.js 15.4.6 with App Router
- TypeScript with strict mode enabled
- Tailwind CSS v4
- React 19.1.0

**Backend Configuration:**
- WordPress backend URL: https://backend.reportfocusnews.com
- GraphQL endpoint: https://backend.reportfocusnews.com/graphql
- Frontend domain: www.reportfocusnews.com

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Project Architecture

### Directory Structure
- `/src/app/` - Next.js App Router pages and layouts
- `/src/components/` - Reusable React components (to be created)
- `/src/lib/` - Utility functions, GraphQL client, and queries (to be created)
- `/src/types/` - TypeScript type definitions for GraphQL and components (to be created)
- `/public/` - Static assets

### Key Configuration Files
- `next.config.ts` - Next.js configuration (needs updating for GraphQL, images, and ISR)
- `tsconfig.json` - TypeScript configuration with path alias `@/*` for `src/*`
- `tailwind.config.ts` - Tailwind CSS configuration (needs customization for NYTimes-inspired design)

## GraphQL Integration Requirements

### Required Queries
1. **Homepage Content:**
   - Latest posts with featured images
   - Posts by category (Politics, Business, Technology, etc.)
   - Breaking news posts
   - Popular/trending posts

2. **Article Pages:**
   - Single post with full content
   - Author information
   - Related articles
   - Comments (if available)

3. **Navigation:**
   - Categories/sections
   - Tags
   - Menu items

### Environment Variables Needed
Create `.env.local`:
```
NEXT_PUBLIC_WORDPRESS_API_URL=https://backend.reportfocusnews.com/graphql
WORDPRESS_API_URL=https://backend.reportfocusnews.com/graphql
```

## Design System Requirements

### Typography
- Headlines: Serif font (Georgia or similar)
- Body text: Sans-serif
- Implement responsive font sizing

### Layout
- Multi-column grid (3-4 columns on desktop)
- Mobile-first responsive design
- Breaking news banner
- Section-based organization

### Color Scheme
- Primary: Black and white
- Minimal accent colors
- Dark mode support required

## Performance Optimization Checklist

1. **Static Generation (SSG):**
   - Generate static pages for articles at build time
   - Implement ISR (Incremental Static Regeneration) with appropriate revalidation

2. **Image Optimization:**
   - Use `next/image` for all images
   - Configure proper image domains in `next.config.ts`
   - Implement responsive image sizes

3. **SEO Requirements:**
   - Dynamic meta tags for each page
   - Open Graph tags
   - Structured data (JSON-LD)
   - XML sitemap generation

## Core Components to Implement

1. **Layout Components:**
   - Header with navigation mega-menu
   - Footer with links and newsletter signup
   - Breaking news banner

2. **Content Components:**
   - ArticleCard (multiple variants for different layouts)
   - HeroSection
   - CategorySection
   - AuthorByline
   - ShareButtons

3. **Utility Components:**
   - LoadingStates
   - ErrorBoundary
   - SearchBar
   - DarkModeToggle

## Testing Approach

When implementing features:
1. Check TypeScript compilation: `npm run build`
2. Verify linting passes: `npm run lint`
3. Test responsive design at breakpoints: 320px, 768px, 1024px, 1440px
4. Verify GraphQL queries return expected data
5. Check Core Web Vitals performance

## Deployment Preparation

For Vercel deployment:
1. Ensure all environment variables are configured
2. Set up ISR revalidation intervals
3. Configure image domains
4. Add error handling for GraphQL failures
5. Implement proper loading and error states

## Working Instructions

### Instructions

1. First think through the problem, read the codebase for relevant files, and write a plan to projectplan.md.
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the projectplan.md file with a summary of the changes you made and any other relevant information.