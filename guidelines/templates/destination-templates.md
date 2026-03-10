# Destination Templates Guidelines

**Version:** 1.0  
**Last Updated:** 2026-02-28  
**Status:** Production Ready

---

## Overview

The LightSpeed Tour Operator system includes three destination page templates that handle different destination types through smart routing. These templates follow WordPress block theme architecture with strict design system compliance.

---

## Template Architecture

### Smart Routing System

All destination URLs (`/destinations/:slug`) are handled by **DestinationRouter**, which:
1. Detects the destination's `type` field from mock data
2. Routes to the appropriate template based on type
3. Falls back to legacy template if no type is specified

**Routing Logic:**
```
type: "country" → DestinationCountryPage
type: "region" | "city" | "park" → DestinationRegionPage
No type → DestinationSingleEnhanced (legacy)
```

---

## 1. DestinationCountryPage Template

**Purpose:** Display country-level destinations with comprehensive travel information  
**Location:** `/src/app/pages/DestinationCountryPage.tsx`  
**Example:** `/destinations/south-africa`

### Required Destination Fields

```typescript
{
  type: "country",
  continentId: string,
  tourIds: string[],
  accommodationIds: string[],
  travelStyles: string[],
  highlights: string[], // 4-6 items
  experiences: string[], // 6-8 items
  bestTime: string,
  climate: string,
  currency: string,
  language: string,
  timezone: string,
  countryInfo: {
    banking: string,
    climate: string,
    cuisine: string,
    electricity: string,
    dress: string,
    health: string,
    safety: string,
    transport: string,
    visa: string,
    currency: string,
  },
  videos: Array<{
    id: string,
    title: string,
    url: string,
    thumbnail?: string,
  }>, // 3-5 videos
  gallery: string[], // 4-8 images
  relatedSpecialIds: string[],
  relatedBlogIds: string[],
  relatedReviewIds: string[],
  dedicatedConsultantId: string,
}
```

### Section Order (Fixed)

1. **Hero Section**
   - Full-width hero image
   - Country name (H1)
   - Excerpt subtitle
   - Breadcrumbs: Home > Destinations > [Country]

2. **About Section** (2-column layout)
   - **Main Content (2/3 width):**
     - H2: "About [Country]"
     - Full destination content
     - Highlights list (with MapPin icons)
     - Experiences badges
   - **Fast Facts Sidebar (1/3 width, sticky):**
     - Best time to visit
     - Climate
     - Currency
     - Language
     - Timezone

3. **Tours Section** (bg-muted)
   - H2: "Tours in [Country]"
   - Subtitle: "Discover our curated tours..."
   - 3-column grid (6 tours max)
   - "View all tours" link if more than 6

4. **Country Information Section** (bg-background)
   - H2: "Essential Travel Information"
   - Subtitle: "Everything you need to know..."
   - 2-column grid of 10 info cards:
     - Banking (CreditCard icon)
     - Climate (Calendar icon)
     - Cuisine (Utensils icon)
     - Electricity (Zap icon)
     - Dress (Shirt icon)
     - Health (Heart icon)
     - Safety (Shield icon)
     - Transport (Bus icon)
     - Visa (FileText icon)
     - Currency (DollarSign icon)

5. **Videos Section** (bg-muted)
   - H2: "Destination Videos"
   - 3-column grid
   - Video placeholder with title

6. **Photo Gallery** (bg-background)
   - H2: "Photo Gallery"
   - 4-column grid
   - Aspect-square images with hover scale

7. **Special Offers Section** (bg-accent)
   - H2: "Special Offers"
   - 3-column grid
   - Links to special offers

8. **Blog Posts Section** (bg-background)
   - H2: "Related Articles"
   - 3-column grid
   - Links to blog posts

9. **Reviews Section** (bg-muted)
   - H2: "Traveler Reviews"
   - 3-column grid
   - ReviewCard components

10. **Dedicated Consultant Section** (bg-background)
    - H2: "Your Destination Expert"
    - Subtitle: "Get personalized advice..."
    - Single TeamMemberCard (centered)

### Design System Requirements

**Colors:**
- All colors via CSS custom properties
- Section backgrounds alternate: `bg-background`, `bg-muted`, `bg-accent`
- Use `border-border` for card borders
- Use `text-primary` for accent colors

**Typography:**
- H1: Lora (serif), automatic sizing
- H2: Lora (serif), automatic sizing
- H3: Lora (serif), automatic sizing
- Body text: Noto Sans (sans-serif), automatic sizing
- No Tailwind text size classes unless intentionally overriding

**Spacing:**
- Section padding: `py-section-md`
- Card gaps: `gap-6`
- Container: Use `<Container>` component

**Components:**
- Hero: Use `<Hero>` pattern
- Cards: Custom cards with hover states
- Reviews: Use `<ReviewCard>` pattern
- Team: Use `<TeamMemberCard>` pattern

---

## 2. DestinationRegionPage Template

**Purpose:** Display region/city/park destinations with accommodation focus  
**Location:** `/src/app/pages/DestinationRegionPage.tsx`  
**Example:** `/destinations/cape-town`

### Required Destination Fields

```typescript
{
  type: "region" | "city" | "park",
  parentId: string, // Reference to country destination
  continentId: string,
  tourIds: string[],
  accommodationIds: string[], // KEY DIFFERENCE - required for regions
  travelStyles: string[],
  highlights: string[],
  experiences: string[],
  bestTime: string,
  climate: string,
  currency: string,
  language: string,
  timezone: string,
  videos: Array<{...}>,
  gallery: string[],
  relatedSpecialIds: string[],
  relatedBlogIds: string[],
  relatedReviewIds: string[],
  dedicatedConsultantId: string,
}
```

### Section Order (Fixed)

1. **Hero Section**
   - Breadcrumbs: Home > Destinations > [Country] > [Region]
   - Note: Parent country is linked

2. **About Section** (2-column layout)
   - **Fast Facts Sidebar includes:**
     - **Country** (linked to parent country)
     - Best time to visit
     - Climate
     - Currency
     - Language
     - Timezone

3. **Tours Section** (bg-muted)
   - Same as country template
   - Shows up to 6 tours
   - "View all tours" if more

4. **Accommodation Section** (bg-background)
   - **KEY DIFFERENCE FROM COUNTRY PAGE**
   - H2: "Where to Stay in [Region]"
   - Subtitle: "Hand-picked accommodation options..."
   - 3-column grid (6 accommodations max)
   - "View all accommodation" link if more than 6

5. **Videos Section** (bg-muted)
   - Same as country template

6. **Photo Gallery** (bg-background)
   - Same as country template

7. **Special Offers Section** (bg-accent)
   - Same as country template

8. **Blog Posts Section** (bg-background)
   - Same as country template

9. **Reviews Section** (bg-muted)
   - Same as country template

10. **Dedicated Consultant Section** (bg-background)
    - Same as country template

### Design System Requirements

Same as DestinationCountryPage with one addition:
- Parent country link in Fast Facts uses `text-primary hover:underline`

---

## 3. DestinationsArchiveEnhanced Page

**Purpose:** Main destinations listing with featured sections and advanced filtering  
**Location:** `/src/app/pages/DestinationsArchiveEnhanced.tsx`  
**Route:** `/destinations`

### Required Features

1. **Featured Countries Section**
   - 4-column grid
   - Overlay cards with gradient
   - Shows first 4 destinations with `type: "country"`
   - Card design: Image with text overlay at bottom
   - Shows tour count

2. **Featured Regions & Cities Section**
   - 3-column grid
   - Standard cards with border
   - Shows first 6 destinations with `type: "region" | "city" | "park"`
   - Shows tour count

3. **All Destinations Section**
   - Advanced filtering:
     - Search bar (filters by title)
     - Type filter (All/Countries/Regions dropdown)
     - Continent filter (dropdown)
     - View mode toggle (3-col/2-col/list buttons)
   - Pagination (12 items per page)
   - Empty state with "Clear all filters" button

### Section Order (Fixed)

1. **Hero Section**
   - H1: "Explore Our Destinations"
   - Subtitle: "Discover incredible places..."
   - Breadcrumbs: Home > Destinations

2. **Featured Countries** (bg-background)
   - H2: "Featured Countries"
   - Subtitle: "Explore our most popular..."
   - 4-column grid (lg:grid-cols-4)
   - Overlay cards with image + gradient

3. **Featured Regions & Cities** (bg-muted)
   - H2: "Featured Regions & Cities"
   - Subtitle: "Discover unique regions..."
   - 3-column grid (lg:grid-cols-3)
   - Standard cards

4. **All Destinations** (bg-background)
   - H2: "All Destinations"
   - Filter controls (search + type + continent + view mode)
   - Responsive grid (changes based on view mode)
   - Pagination controls
   - Empty state

### View Modes

**3-column (default):**
```typescript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

**2-column:**
```typescript
className="grid grid-cols-1 md:grid-cols-2 gap-6"
```

**List:**
```typescript
className="grid grid-cols-1 gap-6"
// Cards use flex layout: image (fixed width) + content
```

### Filter Logic

**Search:**
- Filters destination.title (case-insensitive)

**Type Filter:**
- "all" → Show all
- "countries" → `destination.type === "country"`
- "regions" → `destination.type !== "country"`

**Continent Filter:**
- "all" → Show all
- [continent-id] → `destination.continentId === [continent-id]`

**Interaction:**
- Any filter change resets to page 1
- "Clear filters" button appears when any filter is active
- Empty state shows when no results

### Design System Requirements

**Featured Country Cards:**
```css
.overlay-card {
  position: relative;
  aspect-ratio: 3/4;
  background: gradient from black/80 to transparent
  text: white
  hover: scale image 1.05
}
```

**Filter Controls:**
- Search input: `bg-card border-border focus:ring-ring`
- Dropdowns: `bg-card border-border`
- View mode buttons: Active = `bg-primary text-primary-foreground`
- All use CSS custom properties

**Pagination:**
- Buttons: `border-border hover:border-primary`
- Active page: `bg-primary text-primary-foreground`
- Disabled: `opacity-50 cursor-not-allowed`

---

## Data Requirements

### Minimum Required Fields (All Destination Types)

```typescript
{
  id: string,
  slug: string,
  title: string,
  excerpt: string, // 1-2 sentences, 150 chars max
  content: string, // 2-3 paragraphs, 300-500 words
  featuredImage: string, // Unsplash URL, 1200x800 min
  continentId: string,
  tourIds: string[], // At least 1-3 tours
  travelStyles: string[], // At least 2-3 styles
  bestTime: string, // "Month - Month" format
  climate: string, // Brief description
  currency: string, // Full name + code
  language: string, // Languages spoken
  timezone: string, // Zone + UTC offset
  highlights: string[], // 4-6 bullet points
}
```

### Additional Fields for Countries

```typescript
{
  type: "country",
  countryInfo: {
    banking: string, // 2-3 sentences
    climate: string, // 2-3 sentences with temperatures
    cuisine: string, // 2-3 sentences
    electricity: string, // Voltage + plug type
    dress: string, // 1-2 sentences
    health: string, // 2-3 sentences
    safety: string, // 2-3 sentences
    transport: string, // 2-3 sentences
    visa: string, // 2-3 sentences
    currency: string, // 2-3 sentences with denominations
  },
  experiences: string[], // 6-8 experiences
  videos: Array<{...}>, // 3-5 videos
  gallery: string[], // 4-8 images
  relatedSpecialIds: string[], // At least 1
  relatedBlogIds: string[], // At least 2
  relatedReviewIds: string[], // At least 3
  dedicatedConsultantId: string, // Required
}
```

### Additional Fields for Regions

```typescript
{
  type: "region" | "city" | "park",
  parentId: string, // Required - parent country
  accommodationIds: string[], // Required - at least 2
  experiences: string[], // 6-8 experiences
  videos: Array<{...}>, // 2-4 videos
  gallery: string[], // 4-6 images
  relatedSpecialIds: string[], // Optional
  relatedBlogIds: string[], // At least 1
  relatedReviewIds: string[], // At least 2
  dedicatedConsultantId: string, // Optional but recommended
}
```

---

## Component Usage

### Hero Pattern

```typescript
<Hero
  title={destination.title}
  subtitle={destination.excerpt}
  backgroundImage={destination.featuredImage}
  breadcrumbs={breadcrumbArray}
/>
```

### ReviewCard Pattern

```typescript
<ReviewCard 
  review={reviewObject}
  showExcerpt={true} // Use excerpt, not full content
/>
```

### TeamMemberCard Pattern

```typescript
<TeamMemberCard
  member={consultantObject}
  showContact={true} // Show email and phone
  showBio={true} // Show full bio
/>
```

### Container Component

```typescript
<Container>
  {/* All section content */}
</Container>
```

---

## WordPress Alignment

### Template Mapping

| React Template | WordPress Equivalent |
|----------------|---------------------|
| DestinationCountryPage | `single-destination-country.html` |
| DestinationRegionPage | `single-destination-region.html` |
| DestinationsArchiveEnhanced | `archive-destination.html` |
| DestinationRouter | N/A (routing logic) |

### Block Patterns Used

- Hero pattern (`pattern-hero`)
- Card grid pattern (`pattern-card-grid`)
- Fast facts pattern (`pattern-fast-facts`)
- Review section pattern (`pattern-reviews`)
- CTA pattern (`pattern-cta`)

### Template Parts

- `<Header>` - Site header with navigation
- `<Footer>` - Site footer with links
- `<Container>` - Width constraint wrapper

---

## Accessibility Requirements

**WCAG 2.1 AA Compliance:**

1. **Heading Hierarchy:**
   - One H1 per page (destination title)
   - H2 for section titles
   - H3 for card titles
   - Logical nesting (no skipped levels)

2. **Keyboard Navigation:**
   - All interactive elements keyboard-reachable
   - Tab order follows visual order
   - Filter controls keyboard accessible

3. **Focus States:**
   - Visible focus indicators on all interactive elements
   - Use `focus-visible:ring-2 ring-ring`

4. **Image Alt Text:**
   - All images have descriptive alt text
   - Format: "{destination} {descriptor}" (e.g., "South Africa landscape")

5. **Empty States:**
   - Clear messaging when no results found
   - Actionable "Clear filters" button provided

6. **Color Independence:**
   - Information not conveyed by color alone
   - Icons supplement color coding
   - Sufficient contrast ratios (4.5:1 minimum)

---

## Testing Checklist

### Functional Tests

- [ ] Country page loads with all 11 sections
- [ ] Region page loads with accommodation section
- [ ] Archive page shows featured sections
- [ ] Search filter works correctly
- [ ] Type filter works correctly
- [ ] Continent filter works correctly
- [ ] View mode toggle works correctly
- [ ] Pagination works correctly
- [ ] Empty state appears when appropriate
- [ ] Parent country link works in region pages
- [ ] All "View all" links work correctly

### Design System Tests

- [ ] All colors use CSS custom properties
- [ ] Only Lora and Noto Sans fonts used
- [ ] Semantic HTML elements used throughout
- [ ] No inline styles present
- [ ] No `dark:` Tailwind classes used
- [ ] Proper section background alternation
- [ ] Responsive layouts work on mobile
- [ ] Light and dark modes both work

### Content Tests

- [ ] All required destination fields populated
- [ ] Country info sections comprehensive
- [ ] Image URLs valid and load correctly
- [ ] Related content IDs reference valid records
- [ ] Breadcrumbs accurate and linked correctly
- [ ] Fast facts display correctly

### Accessibility Tests

- [ ] Heading hierarchy correct
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Alt text present and descriptive
- [ ] Color contrast meets WCAG AA
- [ ] Screen reader announcements correct

---

## Common Issues & Solutions

### Issue: Destination not found error

**Cause:** Destination slug doesn't exist in mock data  
**Solution:** Verify destination exists in `/src/app/data/destinations.ts`

### Issue: Empty sections appearing

**Cause:** Related content arrays are empty  
**Solution:** Populate relatedSpecialIds, relatedBlogIds, relatedReviewIds

### Issue: Country info cards missing

**Cause:** `countryInfo` object not defined or `type !== "country"`  
**Solution:** Add full countryInfo object for country-type destinations

### Issue: Accommodation section not showing

**Cause:** Region doesn't have `accommodationIds` or array is empty  
**Solution:** Add at least 2 accommodation IDs to region destinations

### Issue: Wrong template loading

**Cause:** `type` field incorrect or missing  
**Solution:** Set correct type: "country", "region", "city", or "park"

### Issue: Parent country link broken

**Cause:** `parentId` references non-existent destination  
**Solution:** Verify parentId matches a real country destination

---

## Migration Guide

### From Legacy DestinationSingleEnhanced

1. Add `type` field to destination data
2. Add enhanced fields (countryInfo, videos, gallery, etc.)
3. Update destination content to be comprehensive
4. Ensure all related IDs are populated
5. Test with DestinationRouter

### Content Writing Guidelines

**Excerpt (1-2 sentences, 150 chars):**
- Hook the reader with unique selling proposition
- Highlight what makes this destination special

**Content (2-3 paragraphs, 300-500 words):**
- Paragraph 1: Overview and main attractions
- Paragraph 2: Experiences and what to expect
- Paragraph 3: Cultural/historical significance

**Highlights (4-6 bullet points):**
- Specific attractions or experiences
- Use concrete names (not "beautiful beaches")
- Start with strong verbs or nouns

**Experiences (6-8 items):**
- Activity-focused (e.g., "Wine Tasting", "Safari Drives")
- Keep to 2-3 words each
- Mix active and cultural experiences

**Country Info (2-3 sentences each):**
- Be practical and specific
- Include numbers where relevant (voltage, temperatures)
- Address common traveler concerns

---

## File Locations

**Templates:**
- `/src/app/pages/DestinationRouter.tsx`
- `/src/app/pages/DestinationCountryPage.tsx`
- `/src/app/pages/DestinationRegionPage.tsx`
- `/src/app/pages/DestinationsArchiveEnhanced.tsx`

**Components:**
- `/src/app/components/patterns/ReviewCard.tsx`
- `/src/app/components/patterns/TeamMemberCard.tsx`

**Styles:**
- `/src/styles/components/reviews-section.css`
- `/src/styles/components/team-card.css`

**Data:**
- `/src/app/data/destinations.ts`
- `/src/app/data/types.ts`

**Routes:**
- `/src/app/routes.ts`

---

**Last Updated:** 2026-02-28  
**Maintained By:** Development Team  
**Review Schedule:** Quarterly
