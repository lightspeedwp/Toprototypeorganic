# Destinations System Comprehensive Improvement Prompt

**Version:** 1.0  
**Created:** 2026-02-28  
**Status:** Ready for Execution

---

## Overview

This prompt covers a comprehensive improvement of the destinations system including templates, data structure, guidelines, and design system compliance. Execute phases sequentially.

---

## Phase 1: Template Visual & Layout Improvements

### Objective
Ensure all destination templates have modern, attractive heroes and consistent spacing/layouts.

### Tasks

#### 1.1 Hero Component Modernization

**Review and improve these templates:**
- `/src/app/pages/DestinationCountryPage.tsx`
- `/src/app/pages/DestinationRegionPage.tsx`
- `/src/app/pages/DestinationsArchiveEnhanced.tsx`
- `/src/app/pages/DestinationSingle.tsx` (legacy)

**Requirements:**
- Use Hero pattern from `/src/app/components/patterns/Hero.tsx`
- Full-width hero with featured image
- Proper text overlay with gradient for readability
- Breadcrumbs integrated into hero
- Responsive on mobile (stack elements vertically)
- All colors use CSS custom properties (no hardcoded values)
- Typography uses only defined fonts (Lora for headings, Noto Sans for body)

**Design Specifications:**
```typescript
// Hero Structure
<Hero
  title={destination.title}
  subtitle={destination.excerpt}
  backgroundImage={destination.featuredImage}
  height="tall" // Options: "default", "tall", "full"
  overlay="gradient" // Ensures text readability
  breadcrumbs={breadcrumbArray}
  alignment="center" // or "left"
/>
```

**Hero Styling (use CSS custom properties):**
- Background overlay: `rgba(0, 0, 0, 0.4)` to `rgba(0, 0, 0, 0)`
- Title color: `var(--foreground)` or white overlay text
- Subtitle color: `var(--muted-foreground)` or white with opacity
- Min height: `clamp(400px, 50vh, 600px)`
- Padding: `var(--spacing-section-lg)` vertically

#### 1.2 Consistent Spacing System

**Implement consistent section padding:**

```typescript
// Section padding (vertical)
className="py-section-md" // Standard sections
className="py-section-lg" // Hero and major sections
className="py-section-sm" // Compact sections

// Container usage
<Container>
  {/* All section content */}
</Container>

// Vertical gaps between sections (handled by padding)
// NO additional margin needed - padding handles it

// Horizontal gaps (within sections)
className="gap-6"   // Card grids
className="gap-8"   // Major content blocks
className="gap-4"   // Tight groupings
```

**Section Background Alternation:**
```typescript
// Pattern: alternate between background and muted
<section className="py-section-md bg-background">
<section className="py-section-md bg-muted">
<section className="py-section-md bg-background">
<section className="py-section-md bg-accent"> // Special sections
```

#### 1.3 Grid & Layout Consistency

**Card Grids (standard pattern):**
```typescript
// 3-column grid (default for cards)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => <Card key={item.id} {...item} />)}
</div>

// 4-column grid (compact cards like gallery)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// 2-column grid (detailed content)
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

**2-Column Layout with Sidebar:**
```typescript
// Main content + sidebar (Fast Facts)
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  {/* Main content - 2/3 width */}
  <div className="lg:col-span-2">
    {/* Content */}
  </div>
  
  {/* Sidebar - 1/3 width, sticky */}
  <aside className="lg:sticky lg:top-4 lg:self-start">
    {/* Fast facts */}
  </aside>
</div>
```

**Country Info Grid (10 items, 2 columns):**
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {countryInfoItems.map((item) => (
    <InfoCard key={item.id} {...item} />
  ))}
</div>
```

#### 1.4 Design System Compliance Check

**Before implementing, verify:**
- [ ] All colors use `var(--color-name)` from `/src/styles/theme-light.css` and `/src/styles/theme-dark.css`
- [ ] Typography uses `var(--font-family-lora)` or `var(--font-family-noto-sans)` only
- [ ] No Tailwind text size classes unless intentionally overriding semantic HTML defaults
- [ ] Spacing uses `var(--spacing-*)` tokens or Tailwind scale
- [ ] Border radius uses `var(--radius-*)` tokens
- [ ] Shadows use `var(--elevation-*)` tokens
- [ ] No inline styles (`style={{}}`)
- [ ] No `dark:` Tailwind classes (use `.dark` selector in CSS files)

---

## Phase 2: Data Structure Reorganization

### Objective
Break up destination data into logical, scalable files organized by geography.

### Current Structure (Single File)
```
/src/app/data/
└── destinations.ts (all destinations in one array)
```

### New Structure (Organized by Geography)

```
/src/app/data/
├── destinations/
│   ├── index.ts                  // Export aggregator
│   ├── continents.ts             // Continent taxonomy
│   ├── africa/
│   │   ├── index.ts              // Africa aggregator
│   │   ├── south-africa.ts       // Country data
│   │   ├── south-africa-regions.ts // SA regions/cities
│   │   ├── kenya.ts              // Country data
│   │   ├── kenya-regions.ts      // Kenya regions
│   │   ├── tanzania.ts
│   │   ├── tanzania-regions.ts
│   │   └── ...
│   ├── asia/
│   │   ├── index.ts
│   │   ├── thailand.ts
│   │   ├── thailand-regions.ts
│   │   ├── vietnam.ts
│   │   ├── vietnam-regions.ts
│   │   └── ...
│   ├── europe/
│   │   ├── index.ts
│   │   ├── italy.ts
│   │   ├── italy-regions.ts
│   │   ├── france.ts
│   │   ├── france-regions.ts
│   │   └── ...
│   ├── north-america/
│   │   ├── index.ts
│   │   ├── usa.ts
│   │   ├── usa-regions.ts
│   │   ├── canada.ts
│   │   ├── canada-regions.ts
│   │   └── ...
│   ├── south-america/
│   │   ├── index.ts
│   │   ├── peru.ts
│   │   ├── peru-regions.ts
│   │   ├── brazil.ts
│   │   ├── brazil-regions.ts
│   │   └── ...
│   └── oceania/
│       ├── index.ts
│       ├── australia.ts
│       ├── australia-regions.ts
│       ├── new-zealand.ts
│       ├── new-zealand-regions.ts
│       └── ...
```

### Tasks

#### 2.1 Create Continents Taxonomy

**File:** `/src/app/data/destinations/continents.ts`

```typescript
export interface Continent {
  id: string;
  slug: string;
  name: string;
  description: string;
  featuredImage: string;
  countryCount?: number;
}

export const CONTINENTS: Continent[] = [
  {
    id: "continent-1",
    slug: "africa",
    name: "Africa",
    description: "Experience diverse wildlife, ancient cultures, and stunning landscapes from the Sahara to Cape Town.",
    featuredImage: "https://images.unsplash.com/...",
  },
  {
    id: "continent-2",
    slug: "asia",
    name: "Asia",
    description: "Discover ancient temples, modern cities, tropical beaches, and rich cultural heritage across the world's largest continent.",
    featuredImage: "https://images.unsplash.com/...",
  },
  // ... 4 more continents
];
```

#### 2.2 Create Country Data Files

**Template:** `/src/app/data/destinations/africa/south-africa.ts`

```typescript
import type { Destination } from "../../types";

export const SOUTH_AFRICA: Destination = {
  id: "dest-sa",
  slug: "south-africa",
  title: "South Africa",
  type: "country",
  excerpt: "150 chars max, compelling description",
  content: "300-500 words comprehensive description",
  featuredImage: "unsplash URL",
  continentId: "continent-1",
  tourIds: ["tour-1", "tour-2", "tour-3"],
  accommodationIds: ["acc-sa-1", "acc-sa-2"],
  travelStyles: ["adventure", "luxury", "wildlife"],
  bestTime: "May - September",
  climate: "Temperate with regional variations",
  currency: "South African Rand (ZAR)",
  language: "11 official languages including English",
  timezone: "SAST (UTC+2)",
  highlights: [
    "Table Mountain and Cape Town",
    "Kruger National Park - Big Five safaris",
    // ... 4-6 total
  ],
  countryInfo: {
    banking: "2-3 sentences...",
    climate: "2-3 sentences with temperatures...",
    cuisine: "2-3 sentences...",
    electricity: "Voltage, plugs, load shedding...",
    dress: "What to pack...",
    health: "Vaccinations, malaria, insurance...",
    safety: "Practical safety tips...",
    transport: "Roads, flights, taxis...",
    visa: "Entry requirements...",
    currency: "Denominations, exchange, tipping...",
  },
  experiences: [
    "Big Five Safari Game Drives",
    "Wine Tasting Tours",
    // ... 6-8 total
  ],
  videos: [
    { id: "vid-1", title: "...", url: "...", thumbnail: "..." },
    // 3-5 videos
  ],
  gallery: [
    "image-url-1",
    // 4-8 images
  ],
  relatedSpecialIds: ["special-1"],
  relatedBlogIds: ["blog-1", "blog-2"],
  relatedReviewIds: ["review-1", "review-2", "review-3"],
  dedicatedConsultantId: "team-1",
};
```

#### 2.3 Create Region Data Files

**Template:** `/src/app/data/destinations/africa/south-africa-regions.ts`

```typescript
import type { Destination } from "../../types";

export const SOUTH_AFRICA_REGIONS: Destination[] = [
  {
    id: "dest-sa-cape-town",
    slug: "cape-town",
    title: "Cape Town",
    type: "city",
    parentId: "dest-sa", // Links to country
    excerpt: "150 chars...",
    content: "300-500 words...",
    featuredImage: "unsplash URL",
    continentId: "continent-1",
    tourIds: ["tour-1"],
    accommodationIds: ["acc-ct-1", "acc-ct-2", "acc-ct-3"], // Required for regions
    travelStyles: ["luxury", "adventure", "cultural"],
    bestTime: "October - April",
    climate: "Mediterranean",
    currency: "South African Rand (ZAR)",
    language: "English, Afrikaans, Xhosa",
    timezone: "SAST (UTC+2)",
    highlights: [
      "Table Mountain with cable car",
      "V&A Waterfront",
      // ... 4-6 items
    ],
    experiences: [
      "Table Mountain Hiking",
      "Wine Tasting Tours",
      // ... 6-8 items
    ],
    videos: [{ id: "...", title: "...", url: "...", thumbnail: "..." }],
    gallery: ["url-1", "url-2", "url-3", "url-4"],
    relatedSpecialIds: ["special-1"],
    relatedBlogIds: ["blog-1"],
    relatedReviewIds: ["review-1", "review-2"],
    dedicatedConsultantId: "team-1",
  },
  {
    id: "dest-sa-kruger",
    slug: "kruger-national-park",
    title: "Kruger National Park",
    type: "park",
    parentId: "dest-sa",
    // ... full data
  },
  {
    id: "dest-sa-garden-route",
    slug: "garden-route",
    title: "Garden Route",
    type: "region",
    parentId: "dest-sa",
    // ... full data
  },
  // ... more regions
];
```

#### 2.4 Create Continent Aggregators

**Template:** `/src/app/data/destinations/africa/index.ts`

```typescript
import { SOUTH_AFRICA } from "./south-africa";
import { SOUTH_AFRICA_REGIONS } from "./south-africa-regions";
import { KENYA } from "./kenya";
import { KENYA_REGIONS } from "./kenya-regions";
import { TANZANIA } from "./tanzania";
import { TANZANIA_REGIONS } from "./tanzania-regions";
// ... more imports

export const AFRICA_DESTINATIONS = [
  SOUTH_AFRICA,
  ...SOUTH_AFRICA_REGIONS,
  KENYA,
  ...KENYA_REGIONS,
  TANZANIA,
  ...TANZANIA_REGIONS,
  // ... more
];

export const AFRICA_COUNTRIES = [
  SOUTH_AFRICA,
  KENYA,
  TANZANIA,
  // ... more
];

export const AFRICA_REGIONS = [
  ...SOUTH_AFRICA_REGIONS,
  ...KENYA_REGIONS,
  ...TANZANIA_REGIONS,
  // ... more
];
```

#### 2.5 Create Main Aggregator

**File:** `/src/app/data/destinations/index.ts`

```typescript
import { CONTINENTS } from "./continents";
import { AFRICA_DESTINATIONS } from "./africa";
import { ASIA_DESTINATIONS } from "./asia";
import { EUROPE_DESTINATIONS } from "./europe";
import { NORTH_AMERICA_DESTINATIONS } from "./north-america";
import { SOUTH_AMERICA_DESTINATIONS } from "./south-america";
import { OCEANIA_DESTINATIONS } from "./oceania";

// Aggregate all destinations
export const DESTINATIONS = [
  ...AFRICA_DESTINATIONS,
  ...ASIA_DESTINATIONS,
  ...EUROPE_DESTINATIONS,
  ...NORTH_AMERICA_DESTINATIONS,
  ...SOUTH_AMERICA_DESTINATIONS,
  ...OCEANIA_DESTINATIONS,
];

// Export continents
export { CONTINENTS };

// Export by type
export const COUNTRIES = DESTINATIONS.filter((d) => d.type === "country");
export const REGIONS = DESTINATIONS.filter((d) => d.type !== "country");
```

#### 2.6 Update Imports Across Codebase

**Update all files importing destinations:**

```typescript
// OLD
import { DESTINATIONS } from "../data/mock";

// NEW
import { DESTINATIONS, CONTINENTS, COUNTRIES, REGIONS } from "../data/destinations";
```

**Files to update:**
- `/src/app/pages/DestinationRouter.tsx`
- `/src/app/pages/DestinationCountryPage.tsx`
- `/src/app/pages/DestinationRegionPage.tsx`
- `/src/app/pages/DestinationsArchiveEnhanced.tsx`
- `/src/app/data/mock.ts` (remove DESTINATIONS, re-export from new location)
- Any other files importing destinations

### Target Content Requirements

**Minimum Destinations to Create:**

**Africa (15 destinations):**
- Countries (5): South Africa, Kenya, Tanzania, Morocco, Egypt
- Regions (10): Cape Town, Kruger, Masai Mara, Serengeti, Marrakech, etc.

**Asia (15 destinations):**
- Countries (5): Thailand, Vietnam, Japan, Indonesia, India
- Regions (10): Bangkok, Phuket, Kyoto, Bali, Rajasthan, etc.

**Europe (15 destinations):**
- Countries (5): Italy, France, Spain, Greece, Portugal
- Regions (10): Rome, Paris, Barcelona, Santorini, Lisbon, etc.

**North America (12 destinations):**
- Countries (4): USA, Canada, Mexico, Costa Rica
- Regions (8): New York, California, British Columbia, Cancun, etc.

**South America (12 destinations):**
- Countries (4): Peru, Brazil, Argentina, Chile
- Regions (8): Machu Picchu, Rio, Buenos Aires, Patagonia, etc.

**Oceania (9 destinations):**
- Countries (3): Australia, New Zealand, Fiji
- Regions (6): Sydney, Great Barrier Reef, Queenstown, Milford Sound, etc.

**Total:** 78 destinations (27 countries, 51 regions/cities/parks)

---

## Phase 3: Data Content Creation

### Objective
Create accurate, comprehensive content for all destinations.

### Content Writing Guidelines

#### Country Destinations (Full Detail)

**Required Fields:**
- `excerpt`: 1-2 sentences, 150 chars max, compelling hook
- `content`: 3 paragraphs, 300-500 words total
  - Para 1: Overview and main attractions (150 words)
  - Para 2: Experiences and what to expect (150 words)
  - Para 3: Cultural/historical significance (100 words)
- `highlights`: 4-6 bullet points with specific names
- `countryInfo`: All 10 sections, 2-3 sentences each (specific and practical)
- `experiences`: 6-8 activities (2-3 words each)
- `videos`: 3-5 videos with descriptive titles
- `gallery`: 4-8 high-quality Unsplash images
- `relatedSpecialIds`: At least 1
- `relatedBlogIds`: At least 2
- `relatedReviewIds`: At least 3
- `dedicatedConsultantId`: Required

#### Region/City Destinations (Standard Detail)

**Required Fields:**
- `excerpt`: 1-2 sentences, 150 chars max
- `content`: 2-3 paragraphs, 250-400 words
- `highlights`: 4-6 specific attractions
- `accommodationIds`: At least 2-3 (this is the key difference from countries)
- `experiences`: 6-8 activities
- `videos`: 2-4 videos
- `gallery`: 4-6 images
- `relatedSpecialIds`: Optional but recommended
- `relatedBlogIds`: At least 1
- `relatedReviewIds`: At least 2
- `dedicatedConsultantId`: Optional but recommended

#### Image Guidelines

**Use Unsplash with specific search terms:**
- Countries: "{country} landscape", "{country} culture", "{country} landmark"
- Cities: "{city} skyline", "{city} street", "{city} architecture"
- Nature: "{location} nature", "{location} sunset", "{location} scenery"
- Always test URLs before committing

**Image sizes:**
- Featured images: 1200x800 minimum
- Gallery images: 800x600 minimum
- Ensure high quality and proper aspect ratios

#### Content Quality Standards

**Excerpt:**
- ✅ "Experience diverse wildlife, ancient cultures, and stunning landscapes from the Sahara to Cape Town."
- ❌ "South Africa is a beautiful country with many things to see and do."

**Content:**
- ✅ Specific, detailed, informative with concrete examples
- ❌ Generic, vague, repetitive descriptions

**Highlights:**
- ✅ "Table Mountain - UNESCO World Heritage Site with cable car access"
- ❌ "Beautiful mountain"

**Country Info:**
- ✅ "230V, 50Hz. Unique 3-pin round plugs (Type M). Bring a universal adapter."
- ❌ "You need an adapter."

---

## Phase 4: Guidelines Documentation

### Objective
Create and update comprehensive guidelines for all destination-related components.

### Tasks

#### 4.1 Update Template Guidelines

**File:** `/guidelines/templates/destination-templates.md`

**Add/Update Sections:**
- Hero component specifications with examples
- Spacing and layout standards (padding, gaps, grids)
- Section background alternation pattern
- Mobile responsiveness requirements
- Design system compliance checklist
- Content writing guidelines with examples
- Image selection and sizing guidelines
- Accessibility requirements (WCAG 2.1 AA)

#### 4.2 Create/Update Block Guidelines

**Review and update these guideline files:**

**Existing blocks to document:**
- `/guidelines/blocks/overview-blocks.md` - Update with destination usage
- Create if missing: `/guidelines/blocks/destination-hero-block.md`
- Create if missing: `/guidelines/blocks/destination-info-card-block.md`
- Create if missing: `/guidelines/blocks/destination-highlights-block.md`
- Create if missing: `/guidelines/blocks/destination-experiences-block.md`

**Each block guideline should include:**
- Block purpose and usage
- Required props and data structure
- Visual structure diagram
- BEM CSS class naming
- Design system compliance (colors, typography, spacing)
- Responsive behavior
- Accessibility requirements
- WordPress block mapping
- Code examples
- Common issues and solutions

#### 4.3 Create/Update Pattern Guidelines

**Files to create/update:**

**Existing patterns:**
- `/guidelines/patterns/ReviewCard.md` ✅ (already created)
- `/guidelines/patterns/TeamMemberCard.md` ✅ (already created)
- `/guidelines/patterns/hero-patterns.md` - Update with destination examples

**New patterns to document:**
- `/guidelines/patterns/FastFactsSidebar.md`
- `/guidelines/patterns/CountryInfoGrid.md`
- `/guidelines/patterns/DestinationCard.md`
- `/guidelines/patterns/VideoGallery.md`
- `/guidelines/patterns/ImageGallery.md`

**Each pattern guideline should include:**
- Pattern purpose and when to use it
- Component props documentation
- Visual structure with ASCII diagram
- Complete BEM CSS structure
- Design system compliance
- Responsive behavior
- Content requirements
- Use cases with code examples
- Integration examples
- Common issues and solutions
- Testing checklist

#### 4.4 Update Part Guidelines

**Files to review/update:**
- `/guidelines/components/Header.md` - Add destination navigation
- `/guidelines/components/Footer.md` - Add destination links
- `/guidelines/components/Container.md` - Verify usage in destinations

#### 4.5 Create Data Guidelines

**New file:** `/guidelines/data/destination-data-structure.md`

**Include:**
- Complete data schema for countries
- Complete data schema for regions/cities/parks
- Required vs. optional fields
- Field descriptions and formats
- Content writing guidelines
- Image URL guidelines
- Relationship management (parent/child, related content)
- Migration guide from old to new structure
- Data validation rules

#### 4.6 Update Main Guidelines

**File:** `/guidelines/Guidelines.md`

**Update sections:**
- Quick Start checklist (add destination guidelines)
- Component Organization (reflect new structure)
- Data Architecture (new destinations folder structure)
- Import Conventions (new destination imports)
- File Locations (new data structure)

---

## Phase 5: Design System Compliance Audit

### Objective
Ensure 100% design system compliance across all destination templates and components.

### Tasks

#### 5.1 Color Audit

**Check all destination files for:**
- ❌ Hardcoded colors: `#548235`, `white`, `black`, `rgba(...)` in JSX
- ✅ CSS custom properties: `var(--primary)`, `var(--foreground)`, etc.

**Correct patterns:**
```typescript
// ❌ WRONG
<div style={{ backgroundColor: '#548235', color: 'white' }}>

// ❌ WRONG
<div className="bg-[#548235] text-white">

// ✅ CORRECT
<div className="bg-primary text-primary-foreground">
```

#### 5.2 Typography Audit

**Check all destination files for:**
- ❌ Hardcoded fonts: `font-family: 'Arial'` in CSS
- ❌ Non-approved fonts in Tailwind: `font-sans` without proper mapping
- ✅ Only Lora (serif), Noto Sans (sans-serif), Courier New (monospace)

**Correct patterns:**
```typescript
// ❌ WRONG
<h1 className="text-4xl font-bold">

// ✅ CORRECT (semantic HTML with automatic styling)
<h1>Destination Title</h1>

// ✅ ACCEPTABLE (intentional override)
<span className="text-sm font-medium">Small label</span>
```

#### 5.3 Spacing Audit

**Check for:**
- ❌ Inconsistent section padding
- ❌ Magic numbers: `mt-[37px]`
- ✅ Standard spacing tokens: `py-section-md`, `gap-6`, `mb-8`

#### 5.4 CSS Class Audit

**Check for:**
- ❌ Inline styles: `style={{ ... }}`
- ❌ `dark:` classes: `dark:bg-slate-800`
- ✅ BEM CSS classes in external files
- ✅ Semantic HTML elements

#### 5.5 Create Compliance Report

**File:** `/reports/destinations-design-system-audit.md`

**Include:**
- Files audited (count)
- Violations found by type
- Compliance score (percentage)
- Specific violations with line numbers
- Recommended fixes
- Before/after examples

---

## Phase 6: Testing & Validation

### Objective
Ensure all destination pages work correctly and meet quality standards.

### Tasks

#### 6.1 Functional Testing

**Test these routes:**
- `/destinations` - Archive with featured sections
- `/destinations/south-africa` - Country page
- `/destinations/cape-town` - City page
- `/destinations/kruger-national-park` - Park page
- 5 random country pages
- 5 random region pages

**Verify:**
- [ ] All routes load without errors
- [ ] Smart routing works correctly
- [ ] All sections render with data
- [ ] Images load correctly
- [ ] Links work (internal and external)
- [ ] Related content displays correctly
- [ ] Empty states handle gracefully

#### 6.2 Design System Testing

**Verify on all pages:**
- [ ] All colors use CSS custom properties
- [ ] Only approved fonts used
- [ ] Consistent spacing throughout
- [ ] No inline styles present
- [ ] No `dark:` Tailwind classes
- [ ] Proper BEM naming in custom CSS

#### 6.3 Responsive Testing

**Test on:**
- [ ] Mobile (375px width)
- [ ] Tablet (768px width)
- [ ] Desktop (1280px width)
- [ ] Large desktop (1920px width)

**Verify:**
- [ ] Layouts adapt properly
- [ ] Images scale correctly
- [ ] Text remains readable
- [ ] Touch targets are 44px min on mobile
- [ ] No horizontal scroll
- [ ] Grids stack appropriately

#### 6.4 Accessibility Testing

**Verify:**
- [ ] Heading hierarchy correct (one H1, logical nesting)
- [ ] All images have alt text
- [ ] Links have descriptive text
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Screen reader announces correctly

#### 6.5 Performance Testing

**Verify:**
- [ ] Page loads in < 3 seconds
- [ ] Images are optimized
- [ ] No unnecessary re-renders
- [ ] Lazy loading works for images
- [ ] Code splitting effective

#### 6.6 Content Quality Testing

**Verify:**
- [ ] No placeholder text ("Lorem ipsum")
- [ ] Excerpts under 150 characters
- [ ] Content is 300-500 words
- [ ] Highlights are specific and descriptive
- [ ] Country info sections complete and practical
- [ ] Image URLs valid and load correctly

---

## Phase 7: Documentation & Handoff

### Objective
Create comprehensive documentation for the improved destinations system.

### Tasks

#### 7.1 Create System Overview

**File:** `/docs/destinations-system-overview.md`

**Include:**
- Architecture diagram
- Data structure explanation
- Template routing flow
- Component hierarchy
- File organization
- How to add new destinations
- How to add new continents
- Troubleshooting guide

#### 7.2 Create Content Guide

**File:** `/docs/destinations-content-guide.md`

**Include:**
- Content writing standards
- Image selection guidelines
- Data field requirements
- SEO best practices
- Example good content
- Example bad content
- Content checklist

#### 7.3 Create Developer Guide

**File:** `/docs/destinations-developer-guide.md`

**Include:**
- Setup instructions
- File structure explanation
- Component usage examples
- Adding new templates
- Design system integration
- Common patterns
- Testing procedures
- Deployment checklist

#### 7.4 Update Main README

**File:** `/README.md`

**Update sections:**
- Destinations system overview
- Link to destinations guidelines
- Link to developer guide
- Data structure visualization
- Quick start for destinations

#### 7.5 Create Migration Log

**File:** `/docs/destinations-migration-log.md`

**Document:**
- What was changed
- Why it was changed
- Before/after structure
- Breaking changes
- Migration steps for existing code
- Rollback plan if needed

---

## Acceptance Criteria

### Phase 1: Templates ✅
- [ ] All templates have modern hero components
- [ ] Consistent spacing throughout (py-section-md, gap-6, etc.)
- [ ] Proper grid layouts implemented
- [ ] 100% design system compliance

### Phase 2: Data Structure ✅
- [ ] Data organized by continent folders
- [ ] Countries in separate files
- [ ] Regions in separate files
- [ ] Aggregator files created
- [ ] All imports updated

### Phase 3: Content ✅
- [ ] 27 countries with full data
- [ ] 51 regions with full data
- [ ] All required fields populated
- [ ] High-quality images
- [ ] Accurate, detailed content

### Phase 4: Guidelines ✅
- [ ] Template guidelines updated/created
- [ ] Block guidelines created
- [ ] Pattern guidelines created
- [ ] Data guidelines created
- [ ] Main guidelines updated

### Phase 5: Compliance ✅
- [ ] Color audit complete (100% CSS variables)
- [ ] Typography audit complete (only approved fonts)
- [ ] Spacing audit complete (consistent tokens)
- [ ] No inline styles
- [ ] No dark: classes
- [ ] Audit report generated

### Phase 6: Testing ✅
- [ ] All routes functional
- [ ] Design system compliant
- [ ] Responsive on all devices
- [ ] Accessible (WCAG AA)
- [ ] Performance optimized
- [ ] Content quality verified

### Phase 7: Documentation ✅
- [ ] System overview created
- [ ] Content guide created
- [ ] Developer guide created
- [ ] README updated
- [ ] Migration log created

---

## Design System Requirements (Critical)

### Colors
**All colors MUST use CSS custom properties from:**
- `/src/styles/theme-light.css` (light mode palette)
- `/src/styles/theme-dark.css` (dark mode palette)
- `/src/styles/theme.css` (main entry point)

**Approved color tokens:**
```css
/* Semantic colors */
--background
--foreground
--primary
--primary-foreground
--secondary
--secondary-foreground
--accent
--accent-foreground
--muted
--muted-foreground
--card
--card-foreground
--border
--ring
--success
--warning
--error
```

**Usage in JSX:**
```typescript
// ✅ CORRECT - Tailwind classes that map to CSS variables
className="bg-primary text-primary-foreground"
className="bg-card border-border"
className="text-muted-foreground"

// ❌ WRONG - Hardcoded colors
className="bg-[#548235] text-white"
style={{ backgroundColor: '#548235' }}
```

### Typography
**Only approved font families:**
1. **Lora** (serif) - `var(--font-family-lora)` - Use for headings
2. **Noto Sans** (sans-serif) - `var(--font-family-noto-sans)` - Use for body text
3. **Courier New** (monospace) - `var(--font-family-courier-new)` - Use for code

**Font usage:**
```typescript
// ✅ CORRECT - Semantic HTML (automatic styling)
<h1>Destination Title</h1>  // Gets Lora automatically
<h2>Section Title</h2>       // Gets Lora automatically
<p>Body text</p>             // Gets Noto Sans automatically

// ❌ WRONG - Manual font classes
<h1 className="font-serif text-4xl font-bold">
```

### Spacing
**Section padding tokens:**
```css
--spacing-section-sm   /* Small sections */
--spacing-section-md   /* Standard sections */
--spacing-section-lg   /* Hero, major sections */
```

**Usage:**
```typescript
// ✅ CORRECT
<section className="py-section-md bg-background">

// Also acceptable (Tailwind scale)
<div className="gap-6 mb-8 p-4">
```

### Borders & Radius
```css
--radius-sm   /* 2px */
--radius-md   /* 4px */
--radius-lg   /* 6px */
--radius-xl   /* 8px */
--radius-full /* 9999px */
```

### Critical Rules
1. ❌ NO hardcoded colors (hex, rgb, color names)
2. ❌ NO fonts other than Lora, Noto Sans, Courier New
3. ❌ NO inline styles (`style={{}}`)
4. ❌ NO `dark:` Tailwind classes (use `.dark` in CSS)
5. ✅ USE CSS custom properties for ALL styling
6. ✅ USE semantic HTML elements
7. ✅ USE BEM naming for custom CSS classes
8. ✅ USE external CSS files for component styles

---

## Execution Order

Execute phases in this order:

1. **Phase 1** (Templates) - Visual improvements
2. **Phase 2** (Data Structure) - File reorganization
3. **Phase 3** (Content) - Data creation
4. **Phase 5** (Compliance) - Audit before guidelines
5. **Phase 4** (Guidelines) - Documentation based on compliance
6. **Phase 6** (Testing) - Validate everything
7. **Phase 7** (Documentation) - Final handoff docs

---

## Time Estimates

- Phase 1 (Templates): 4-6 hours
- Phase 2 (Data Structure): 2-3 hours
- Phase 3 (Content): 12-16 hours (78 destinations × 10-15 min each)
- Phase 4 (Guidelines): 8-10 hours
- Phase 5 (Compliance): 3-4 hours
- Phase 6 (Testing): 4-6 hours
- Phase 7 (Documentation): 3-4 hours

**Total: 36-49 hours**

---

## Success Metrics

- **Design System Compliance:** 100%
- **Content Completeness:** 100% (all required fields)
- **Test Coverage:** All routes and components tested
- **Accessibility:** WCAG 2.1 AA compliant
- **Documentation:** Complete and comprehensive
- **User Satisfaction:** Easy to customize via CSS only

---

**Status:** Ready for Execution  
**Priority:** High  
**Complexity:** High  
**Dependencies:** None

---

**Created:** 2026-02-28  
**Last Updated:** 2026-02-28  
**Maintained By:** Development Team
