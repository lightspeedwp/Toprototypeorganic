# Destinations Templates Refactor Prompt

## Context
The destinations section currently has routing issues where visiting `/destinations/south-africa` or `/destinations/south-africa/cape-town` shows "Destination not found" errors. The system needs a complete refactor to properly handle hierarchical destination types (countries, regions, cities, parks) with appropriate templates for each.

## Current Issues

### 1. Routing Problems
- **Error:** "Destination not found" message appears for both country and region destination URLs
- **Root Cause:** Router not properly detecting and routing to correct page templates based on destination type

### 2. Logo Display Issue
- **Problem:** Logo not displaying in header for light and dark modes
- **Solution Needed:** Logo component needs proper implementation with stroke="currentColor" to inherit design system colors

### 3. Template Modernization
Need to modernize and refresh destination templates for:
- Countries (e.g., South Africa)
- Regions / Cities / Towns (e.g., Cape Town, Kruger)

## Required Architecture

### Data Structure Enhancement
Enhance the `Destination` type with:
```typescript
{
  type: 'country' | 'region' | 'city' | 'park';
  countryInfo: {
    // 10 country information sections:
    banking: string;
    climate: string;
    cuisine: string;
    electricity: string;
    dress: string;
    health: string;
    safety: string;
    transport: string;
    visa: string;
    currency: string;
  };
  videos: Video[];
  relatedSpecialIds: string[];
  relatedBlogIds: string[];
  relatedReviewIds: string[];
  dedicatedConsultantId: string;
}
```

### Smart Router Component
Create `DestinationRouter` that:
1. Detects destination type from mock data
2. Routes to `DestinationCountryPage` for countries
3. Routes to `DestinationRegionPage` for regions/cities/parks
4. Falls back to `DestinationSingleEnhanced` for legacy destinations
5. Uses internal lazy loading with Suspense to avoid circular dependencies

### Page Templates Required

#### 1. DestinationCountryPage (`/destinations/south-africa`)
**Sections (in order):**
1. Hero with country image
2. About section with highlights and experiences
3. Fast Facts sidebar
4. Tours section (6 featured tours)
5. 10 Country Information cards with icons (Banking, Climate, Cuisine, Electricity, Dress, Health, Safety, Transport, Visa, Currency)
6. Videos section
7. Photo gallery (4 images)
8. Special offers
9. Blog posts
10. Reviews
11. Dedicated consultant card

#### 2. DestinationRegionPage (`/destinations/cape-town`)
**Sections (in order):**
1. Hero with parent country breadcrumb
2. About section with highlights/experiences
3. Fast Facts sidebar
4. Tours section
5. **Accommodation section** (key difference from country page)
6. Videos
7. Gallery
8. Specials
9. Blog posts
10. Reviews
11. Dedicated consultant

#### 3. DestinationsArchiveEnhanced (`/destinations`)
**Sections (in order):**
1. Modern hero section
2. **Featured Countries section** (4-column grid with overlay cards)
3. **Featured Regions & Cities section** (3-column grid with destination cards)
4. All Destinations with advanced filtering:
   - Search bar
   - Type filter (All/Countries/Regions)
   - Continent filter
   - View mode toggle (3-col/2-col/list)
   - Pagination
   - Empty state with clear filters button

## Required New Components

### 1. ReviewCard Component
**Location:** `/src/app/components/patterns/ReviewCard.tsx`
**CSS File:** `/src/styles/components/reviews-section.css`
**Features:**
- Displays individual review cards
- Rating stars display
- Quote icon
- Review content
- Author info (name, location, date)
- Link to full review page
- Uses BEM naming convention

### 2. TeamMemberCard Component
**Location:** `/src/app/components/patterns/TeamMemberCard.tsx`
**CSS File:** `/src/styles/components/team-card.css`
**Features:**
- Team member photo
- Name and role
- Bio text
- Contact info (email, phone)
- Props: `showContact` and `showBio` (not `showFull`)
- Uses BEM naming convention

## Design System Requirements

### ✅ MUST USE:
1. **CSS Custom Properties ONLY:**
   - Colors: `var(--primary)`, `var(--foreground)`, `var(--card)`, `var(--border)`, etc.
   - Spacing: `var(--spacing-section-sm)`, `var(--spacing-gap-lg)`, etc.
   - Typography: `var(--text-6xl)`, `var(--text-4xl)`, `var(--font-family-lora)`, etc.
   - Borders: `var(--radius-lg)`, `var(--radius-xl)`, etc.
   - Shadows: `var(--elevation-sm)`, `var(--elevation-md)`, etc.

2. **Typography Font Faces (ONLY):**
   - **Lora (serif)** - via `font-serif` class - for headings
   - **Noto Sans (sans-serif)** - via `font-sans` class - for body/UI
   - **Courier New (monospace)** - via `font-mono` class - for code

3. **WordPress Block System Classes:**
   - `wp-block-columns`
   - `wp-block-row`
   - `wp-block-column`
   - BEM naming for custom components

4. **Semantic HTML:**
   - Use proper heading hierarchy (H1 → H2 → H3)
   - Semantic elements (`<section>`, `<article>`, `<nav>`, etc.)
   - Let semantic HTML inherit typography from `/src/styles/theme.css`

### ❌ NEVER USE:
- Hardcoded colors (`#548235`, `white`, `rgb()`)
- Hardcoded fonts (font-family values not from design system)
- Inline styles (`style={{...}}`)
- `dark:` Tailwind classes (use `.dark` selector in CSS instead)
- Non-semantic HTML (`<div className="heading">` instead of `<h2>`)
- `react-router-dom` package (use `react-router` instead)

## Mock Data Expansion

### South Africa (Country)
Add complete country destination with:
- Full country information (10 sections)
- Videos array
- Gallery images
- Highlights array
- Experiences array
- Related tours, specials, blog posts, reviews
- Dedicated consultant ID

### Cape Town & Kruger (Regions)
Update as child destinations with:
- Parent country reference
- Region-specific content
- Accommodation listings
- All standard destination data

## Routing Configuration

### In `/src/app/routes.ts`:
```typescript
// Import only DestinationRouter (not individual pages)
const DestinationRouter = lazy(() => import("./pages/DestinationRouter"));
const DestinationsArchiveEnhanced = lazy(() => import("./pages/DestinationsArchiveEnhanced"));

// Routes
{ path: "destinations", index: true, Component: DestinationsArchiveEnhanced },
{ path: "destinations/:slug", Component: DestinationRouter }
```

### In `/src/app/pages/DestinationRouter.tsx`:
```typescript
// Use internal lazy loading to avoid circular dependencies
const DestinationCountryPage = lazy(() => import("./DestinationCountryPage"));
const DestinationRegionPage = lazy(() => import("./DestinationRegionPage"));

// Smart routing based on destination.type
```

## Implementation Steps

### Phase 1: Fix Routing & Logo
1. ✅ Update Logo component with compass icon and `stroke="currentColor"`
2. ✅ Create DestinationRouter with smart type detection
3. ✅ Update routes.ts to use only DestinationRouter
4. ✅ Remove circular dependencies

### Phase 2: Create Components
1. ✅ Create ReviewCard component + CSS
2. ✅ Create TeamMemberCard component + CSS
3. ✅ Import CSS files into `/src/styles/index.css`
4. ✅ Verify all imports use `react-router` (not `react-router-dom`)

### Phase 3: Create Page Templates
1. ✅ Create DestinationCountryPage with all 11 sections
2. ✅ Create DestinationRegionPage with accommodation focus
3. ✅ Create DestinationsArchiveEnhanced with featured sections

### Phase 4: Expand Mock Data
1. ✅ Add South Africa as full country destination
2. ✅ Update Cape Town and Kruger as child regions
3. ✅ Ensure all data includes necessary fields

### Phase 5: Polish & Test
1. ✅ Verify all pages use CSS custom properties exclusively
2. ✅ Test routing for countries, regions, and archive
3. ✅ Verify logo displays in both light and dark modes
4. ✅ Test filtering and search on archive page
5. ✅ Verify proper BEM naming conventions

## Success Criteria

### Functionality
- ✅ `/destinations/south-africa` loads DestinationCountryPage
- ✅ `/destinations/cape-town` loads DestinationRegionPage
- ✅ `/destinations` loads DestinationsArchiveEnhanced
- ✅ Logo displays correctly in light and dark modes
- ✅ No "Destination not found" errors
- ✅ Smart routing detects and routes by destination type

### Design System Compliance
- ✅ 100% CSS custom properties usage (no hardcoded values)
- ✅ Only Lora, Noto Sans, and Courier New fonts used
- ✅ WordPress Block System classes for layout
- ✅ BEM naming for custom components
- ✅ Semantic HTML with proper heading hierarchy
- ✅ No inline styles
- ✅ No `dark:` classes (use `.dark` selector in CSS)

### Code Quality
- ✅ No circular dependencies
- ✅ Proper component separation
- ✅ All imports use `react-router` (not `react-router-dom`)
- ✅ Both default and named exports for all pages
- ✅ Proper TypeScript types
- ✅ External CSS files for all styling

## Files to Create/Modify

### New Files:
1. `/src/app/pages/DestinationRouter.tsx`
2. `/src/app/pages/DestinationCountryPage.tsx`
3. `/src/app/pages/DestinationRegionPage.tsx`
4. `/src/app/pages/DestinationsArchiveEnhanced.tsx`
5. `/src/app/components/patterns/ReviewCard.tsx`
6. `/src/app/components/patterns/TeamMemberCard.tsx`
7. `/src/styles/components/reviews-section.css`
8. `/src/styles/components/team-card.css`

### Modified Files:
1. `/src/app/routes.ts` - Update destination routes
2. `/src/app/data/mock.ts` - Add South Africa, update Cape Town/Kruger
3. `/src/app/data/types.ts` - Enhance Destination interface
4. `/src/app/components/common/Logo.tsx` - Fix light/dark mode display
5. `/src/styles/index.css` - Import new CSS files

## Notes
- All components must be compatible with lazy loading
- Ensure proper Suspense boundaries in DestinationRouter
- Follow existing patterns from tours and accommodation templates
- Maintain consistency with the rest of the application
- Test thoroughly in both light and dark modes
