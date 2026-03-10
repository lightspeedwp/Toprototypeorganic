# Block Patterns Overview

## Purpose

This document defines the **taxonomy of block patterns**, their **composition rules**, and their **WordPress block theme mapping** for the LightSpeed Tour Operator plugin prototype.

**🎨 DESIGN SYSTEM COMPLIANCE:**  
All patterns MUST use CSS custom properties from `/src/styles/theme.css`:
- **Colors:** Use semantic tokens (`bg-primary`, `text-foreground`, `border-border`)
- **Spacing:** Use Tailwind spacing scale (`p-4`, `gap-6`, `mb-12`)
- **Typography:** Use semantic HTML elements (h1-h6, p) for automatic font styling
- **Borders:** Use `border-border` for default borders
- **Radius:** Use `rounded-md`, `rounded-lg` for consistent rounding
- **Shadows:** Use `shadow-sm` for elevation

**🚫 NEVER hardcode:** Colors, font families, spacing values, border colors, or radius values.

---

## Pattern Taxonomy

Block patterns are the **primary compositional unit** of the system. Every page template must be assembled exclusively from these approved patterns.

---

## Approved Pattern Catalogue

### 1. Hero Pattern

**Intent:** Establish page context, introduce primary content object.

**File:** `/src/app/components/patterns/Hero.tsx`

**WordPress Mapping:** `<!-- wp:pattern {"slug":"lightspeed/hero"} /-->`

**Allowed Elements:**
- H1 (page title)
- Intro paragraph/excerpt
- Taxonomy context (breadcrumbs or term labels)
- Optional single CTA button

**Disallowed:**
- Decorative layouts
- Multi-CTA rows
- Image sliders/carousels
- Background images (unless content-derived)

**Guideline:** [components/Hero.md](components/Hero.md)

**Usage:**
```typescript
<Hero
  title="Explore Iceland"
  excerpt="Discover the land of fire and ice..."
  taxonomyLabel="Destinations"
/>
```

---

### 2. Archive Header Pattern

**Intent:** Provide context for archive/taxonomy pages.

**File:** `/src/app/components/patterns/ArchiveHeader.tsx`

**WordPress Mapping:** Custom pattern for archive templates

**Allowed Elements:**
- H1 (archive title)
- Archive description
- Taxonomy term context
- Result count (optional)

**Guideline:** [components/ArchiveHeader.md](components/ArchiveHeader.md)

**Usage:**
```typescript
<ArchiveHeader
  title="Adventure Tours"
  description="Explore our collection of adventure tours..."
  resultCount={12}
/>
```

---

### 3. Card Grid Pattern

**Intent:** Structured listings of a single content type.

**File:** `/src/app/components/patterns/CardGrid.tsx`

**WordPress Mapping:** `<!-- wp:query -->` with `<!-- wp:post-template -->`

**Rules:**
- One content type per grid
- Consistent card anatomy within grid
- Explicit empty state handling
- Responsive grid layout (1/2/3 columns)

**Card Component Variants:**
- `TourCard.tsx` - For tours
- `DestinationCard.tsx` - For destinations
- `AccommodationCard.tsx` - For accommodation
- `BlogCard.tsx` - For blog posts
- `TeamCard.tsx` - For team members
- `SpecialCard.tsx` - For specials

**Guideline:** [components/CardGrid.md](components/CardGrid.md)

**Usage:**
```typescript
<CardGrid
  items={tours}
  CardComponent={TourCard}
  emptyMessage="No tours found"
/>
```

---

### 4. Filter / Taxonomy Navigation Pattern

**Intent:** Navigational filtering via taxonomy terms.

**File:** `/src/app/components/patterns/TaxonomyNav.tsx`

**WordPress Mapping:** Custom navigation pattern

**Rules:**
- Keyboard accessible
- Does not rely on color alone
- Degrades gracefully to links
- Shows active state clearly

**Guideline:** [patterns/TaxonomyNav.md](patterns/TaxonomyNav.md)

**Usage:**
```typescript
<TaxonomyNav
  terms={travelStyles}
  activeTermId="adventure"
  onTermClick={handleTermClick}
/>
```

---

### 5. Editorial Content Block Pattern

**Intent:** Long-form narrative content.

**File:** `/src/app/components/patterns/EditorialContent.tsx`

**WordPress Mapping:** `<!-- wp:post-content /-->` or `<!-- wp:group -->`

**Rules:**
- Semantic HTML only (h2, h3, p, ul, ol, blockquote)
- Content does not encode layout logic
- Supports rich text formatting
- No hardcoded styling

**Guideline:** [components/EditorialContent.md](components/EditorialContent.md)

**Usage:**
```typescript
<EditorialContent
  content={destination.content}
  sections={[
    { heading: "Overview", content: "..." },
    { heading: "What to Expect", content: "..." }
  ]}
/>
```

---

### 6. Meta / Quick-Facts Pattern

**Intent:** Scannable structured data (key/value pairs).

**File:** `/src/app/components/parts/FastFacts.tsx`

**WordPress Mapping:** Custom meta block pattern

**Rules:**
- Tolerates missing fields gracefully
- Stable ordering of facts
- Icon + label + value structure
- No visual inventions

**Guideline:** [components/FastFacts.md](components/FastFacts.md)

**Usage:**
```typescript
<FastFacts
  facts={[
    { icon: Calendar, label: "Duration", value: "8 days" },
    { icon: Users, label: "Group Size", value: "12-16" },
    { icon: DollarSign, label: "From", value: "$2,995" }
  ]}
/>
```

---

### 7. Cross-link / Related Content Pattern

**Intent:** Encourage discovery via contextual related items.

**File:** `/src/app/components/patterns/RelatedContent.tsx`

**WordPress Mapping:** Custom related content pattern

**Rules:**
- Limited count (3-6 items)
- Grouped by relationship type
- Explicit empty states
- Uses CardGrid internally

**Guideline:** [patterns/RelatedContent.md](patterns/RelatedContent.md)

**Usage:**
```typescript
<RelatedContent
  title="Related Tours"
  items={relatedTours}
  CardComponent={TourCard}
  limit={3}
/>
```

---

### 8. Call-to-Action Pattern

**Intent:** Convert intent to action (enquiry/contact/next step).

**File:** `/src/app/components/patterns/CTA.tsx`

**WordPress Mapping:** `<!-- wp:group -->` with `<!-- wp:buttons -->`

**Rules:**
- Exactly one primary action
- Clear outcome/value proposition
- No extraneous links
- Optional supporting text

**Guideline:** [components/CTA.md](components/CTA.md)

**Usage:**
```typescript
<CTA
  title="Ready to Explore?"
  description="Contact us to start planning your adventure"
  primaryAction={{ label: "Get in Touch", href: "/contact" }}
/>
```

---

## Pattern Composition Rules

### Content Ordering (Global)

Pattern order is **fixed** unless a pattern is omitted due to missing content:

1. **Hero** or **Archive Header** (page context)
2. **Taxonomy Navigation** (optional filtering)
3. **Editorial Content** (primary narrative)
4. **Meta/Quick-Facts** (structured data)
5. **Card Grid** (listings)
6. **Related Content** (cross-links)
7. **CTA** (conversion)

### Empty State Rule

If a section would be empty:
- **Option A:** Omit the pattern entirely
- **Option B:** Show an explicit empty-state message
- **Prohibited:** Never show a blank/white area

---

## Pattern Usage by Page Archetype

### Content Hub Archetype

**Example:** Tours Archive (`/tours`)

**Required Patterns (in order):**
1. Hero
2. Taxonomy Navigation (optional)
3. Card Grid
4. CTA (optional)

```typescript
<PageLayout>
  <Hero title="Our Tours" excerpt="..." />
  <TaxonomyNav terms={travelStyles} />
  <CardGrid items={tours} CardComponent={TourCard} />
  <CTA title="Custom Tour?" primaryAction={...} />
</PageLayout>
```

---

### Taxonomy Archive Archetype

**Example:** Adventure Tours (`/travel-styles/adventure`)

**Required Patterns (in order):**
1. Archive Header
2. Taxonomy Navigation (siblings/children) (optional)
3. Card Grid
4. CTA (optional)

```typescript
<PageLayout>
  <ArchiveHeader title="Adventure Tours" description="..." />
  <TaxonomyNav terms={siblingStyles} activeTermId="adventure" />
  <CardGrid items={adventureTours} CardComponent={TourCard} />
  <CTA title="Not sure?" primaryAction={...} />
</PageLayout>
```

---

### Single Detail Archetype

**Example:** Tour Detail (`/tours/iceland-explorer`)

**Required Patterns (in order):**
1. Hero
2. Editorial Content (primary narrative)
3. Fast Facts (meta block)
4. Supporting Editorial Sections (optional)
5. Related Content (cross-links)
6. CTA (enquiry)

```typescript
<PageLayout>
  <Hero title={tour.title} excerpt={tour.excerpt} />
  <EditorialContent content={tour.content} />
  <FastFacts facts={tourFacts} />
  <EditorialContent sections={[
    { heading: "What's Included", content: tour.included },
    { heading: "Itinerary", content: tour.itinerary }
  ]} />
  <RelatedContent title="Similar Tours" items={relatedTours} />
  <CTA title="Interested?" primaryAction={...} />
</PageLayout>
```

---

### Editorial Listing Archetype

**Example:** Blog (`/blog`)

**Required Patterns (in order):**
1. Archive Header
2. Card Grid (posts only)
3. Pagination

```typescript
<PageLayout>
  <ArchiveHeader title="Travel Blog" description="..." />
  <CardGrid items={posts} CardComponent={BlogCard} />
  <Pagination currentPage={1} totalPages={5} />
</PageLayout>
```

---

### Utility Page Archetype

**Example:** FAQ (`/faq`)

**Required Patterns (in order):**
1. Hero (page header)
2. Editorial Content
3. Structured Utility Block (accordion/form) (optional)
4. CTA (optional)

```typescript
<PageLayout>
  <Hero title="Frequently Asked Questions" />
  <EditorialContent content={faqIntro} />
  <Accordion items={faqItems} />
  <CTA title="Still have questions?" primaryAction={...} />
</PageLayout>
```

---

## Pattern Nesting Rules

### Allowed Nesting

- **RelatedContent** may contain **CardGrid**
- **CardGrid** may contain **Card Components**
- **EditorialContent** may contain semantic HTML blocks
- **Container** may wrap any pattern

### Prohibited Nesting

- **Hero** inside any other pattern
- **ArchiveHeader** inside any other pattern
- **CTA** inside **CardGrid**
- **Pattern** inside **Card Component** (cards are atomic)

---

## WordPress Block Theme Mapping

| React Pattern         | WordPress Pattern Slug               | Block Type        |
| --------------------- | ------------------------------------ | ----------------- |
| Hero                  | `lightspeed/hero`                    | Custom pattern    |
| ArchiveHeader         | `lightspeed/archive-header`          | Custom pattern    |
| CardGrid              | Uses `core/query` + `core/post-template` | Core blocks   |
| TaxonomyNav           | `lightspeed/taxonomy-nav`            | Custom pattern    |
| EditorialContent      | Uses `core/post-content` or `core/group` | Core blocks   |
| FastFacts             | `lightspeed/fast-facts`              | Custom pattern    |
| RelatedContent        | `lightspeed/related-content`         | Custom pattern    |
| CTA                   | `lightspeed/cta`                     | Custom pattern    |

---

## Pattern Variants

Some patterns support **variants** for different contexts:

### Hero Variants

- **Default:** Full-width, centered text
- **With Image:** Featured image background (future)
- **Compact:** Reduced height for utility pages

### Card Grid Variants

- **1 Column:** Mobile default
- **2 Columns:** Tablet
- **3 Columns:** Desktop default
- **4 Columns:** Wide screens (optional)

### CTA Variants

- **Centered:** Default alignment
- **Split:** Text left, action right (future)
- **Banner:** Full-width accent background

---

## Accessibility Requirements

All patterns must meet WCAG 2.1 AA:

1. **Heading Order:** Logical hierarchy (H1 → H2 → H3)
2. **Keyboard Navigation:** All interactive elements keyboard-reachable
3. **Focus States:** Visible focus indicators
4. **Color Independence:** Information not conveyed by color alone
5. **Labels:** Proper ARIA labels where needed
6. **Empty States:** Announced to screen readers

---

## Pattern Guidelines Files

Each pattern has detailed documentation in `guidelines/patterns/`:

**Essential Pattern Guidelines:**
- [section-styles.md](patterns/section-styles.md) - Section composition, backgrounds, spacing (22 preset styles)
- [navigation-links.md](patterns/navigation-links.md) - Link vs button, breadcrumbs, accessibility
- [typography-verification.md](patterns/typography-verification.md) - Typography standards and verification

**Specific Pattern Guidelines:**
- [hero-patterns.md](patterns/hero-patterns.md) - Hero section variations
- [card-grid-patterns.md](patterns/card-grid-patterns.md) - Card layout patterns
- [cta-patterns.md](patterns/cta-patterns.md) - Call-to-action patterns
- [cta-patterns-UPDATED.md](patterns/cta-patterns-UPDATED.md) - Updated CTA patterns with conversion focus
- [editorial-content-patterns.md](patterns/editorial-content-patterns.md) - Editorial content blocks
- [filter-patterns.md](patterns/filter-patterns.md) - Taxonomy and search filters
- [faq-pattern.md](patterns/faq-pattern.md) - FAQ accordion pattern

---

## Related Documentation

- [overview-components.md](overview-components.md) - Component architecture
- [blocks/overview-blocks.md](blocks/overview-blocks.md) - Block components and tour operator blocks
- [overview-templates.md](overview-templates.md) - Page template archetypes (future)
- [overview-parts.md](overview-parts.md) - Template parts (future)

---

## New Patterns (Phase 0 - Documented)

### Utility Patterns

**1. Newsletter Signup Pattern**
- **File:** `/src/app/components/patterns/NewsletterSignupPattern.tsx`
- **Guideline:** [patterns/newsletter-signup.md](patterns/newsletter-signup.md)
- **Section Styles:** `section-newsletter-default`, `section-newsletter-sidebar`
- **Purpose:** Email capture for leads and subscribers

**2. Search & Filter Pattern**
- **File:** `/src/app/components/patterns/SearchFilterPattern.tsx`
- **Guideline:** [patterns/search-filter.md](patterns/search-filter.md)
- **Section Styles:** `section-filter-bar-default`, `section-filter-bar-compact`
- **Purpose:** Advanced search and filtering for archives

**3. Empty State Pattern**
- **File:** `/src/app/components/patterns/EmptyStatePattern.tsx`
- **Guideline:** [patterns/empty-state.md](patterns/empty-state.md)
- **Section Styles:** `section-empty-state-default`
- **Purpose:** Helpful messaging when no results found

### Tour/Accommodation Patterns

**4. Pricing Section Pattern**
- **File:** `/src/app/components/patterns/PricingSectionPattern.tsx`
- **Guideline:** [patterns/pricing-section.md](patterns/pricing-section.md)
- **Section Styles:** `section-pricing-default`, `section-pricing-comparison`
- **Purpose:** Seasonal pricing tables

**5. Inclusions & Exclusions Pattern**
- **File:** `/src/app/components/patterns/InclusionsPattern.tsx`
- **Guideline:** [patterns/inclusions-exclusions.md](patterns/inclusions-exclusions.md)
- **Section Styles:** `section-inclusions-default`, `section-inclusions-compact`
- **Purpose:** What's included/excluded in tour packages

**6. Reviews Section Pattern**
- **File:** `/src/app/components/patterns/ReviewsSectionPattern.tsx`
- **Guideline:** [patterns/reviews-section.md](patterns/reviews-section.md)
- **Section Styles:** `section-reviews-default`, `section-reviews-summary`
- **Purpose:** Customer reviews and ratings

**7. Room Types Pattern**
- **File:** `/src/app/components/patterns/RoomTypesPattern.tsx`
- **Guideline:** [patterns/room-types.md](patterns/room-types.md)
- **Section Styles:** `section-room-types-default`, `section-room-types-table`
- **Purpose:** Accommodation room options comparison

### Destination Patterns

**8. Map Section Pattern**
- **File:** `/src/app/components/patterns/MapSectionPattern.tsx`
- **Guideline:** [patterns/map-section.md](patterns/map-section.md)
- **Section Styles:** `section-map-default`, `section-map-inline`
- **Purpose:** Interactive/static maps for locations

**9. Climate Information Pattern**
- **File:** `/src/app/components/patterns/ClimateInfoPattern.tsx`
- **Guideline:** [patterns/climate-info.md](patterns/climate-info.md)
- **Section Styles:** `section-climate-default`, `section-climate-compact`
- **Purpose:** Seasonal weather and best time to visit

**10. Highlights Grid Pattern**
- **File:** `/src/app/components/patterns/HighlightsGridPattern.tsx`
- **Guideline:** [patterns/highlights-grid.md](patterns/highlights-grid.md)
- **Section Styles:** `section-highlights-default`, `section-highlights-carousel`
- **Purpose:** Top attractions/experiences display

### Special Patterns

**11. Countdown Timer Pattern**
- **File:** `/src/app/components/patterns/CountdownPattern.tsx`
- **Guideline:** [patterns/countdown-timer.md](patterns/countdown-timer.md)
- **Section Styles:** `section-countdown-default`, `section-countdown-inline`
- **Purpose:** Limited-time offer urgency

### Content Patterns

**12. Breadcrumbs Pattern**
- **File:** `/src/app/components/patterns/BreadcrumbsPattern.tsx`
- **Guideline:** [patterns/breadcrumbs.md](patterns/breadcrumbs.md)
- **Section Styles:** `section-breadcrumbs-default`
- **Purpose:** Hierarchical navigation trail

**13. Statistics & Metrics Pattern**
- **File:** `/src/app/components/patterns/StatisticsMetricsPattern.tsx`
- **Guideline:** [patterns/statistics-metrics.md](patterns/statistics-metrics.md)
- **Section Styles:** `section-statistics-default`
- **Purpose:** Key company/product metrics display

**14. Contact Information Pattern**
- **File:** `/src/app/components/patterns/ContactInfoPattern.tsx`
- **Guideline:** [patterns/contact-info.md](patterns/contact-info.md)
- **Section Styles:** `section-contact-info-default`
- **Purpose:** Contact details with icons

**15. Why Choose Us Pattern**
- **File:** `/src/app/components/patterns/WhyChooseUsPattern.tsx`
- **Guideline:** [patterns/why-choose-us.md](patterns/why-choose-us.md)
- **Section Styles:** `section-feature-default`
- **Purpose:** Value propositions and differentiators

### Blog Patterns

**16. Author Bio Pattern**
- **File:** `/src/app/components/patterns/AuthorBioPattern.tsx`
- **Guideline:** [patterns/author-bio.md](patterns/author-bio.md)
- **Section Styles:** `section-author-bio-default`
- **Purpose:** Author information on blog posts

### Utility Pages Patterns

**17. Table of Contents Pattern**
- **File:** `/src/app/components/patterns/TableOfContentsPattern.tsx`
- **Guideline:** [patterns/table-of-contents.md](patterns/table-of-contents.md)
- **Section Styles:** `section-toc-default`
- **Purpose:** Jump links for long-form content

**18. Sitemap Grid Pattern**
- **File:** `/src/app/components/patterns/SitemapGridPattern.tsx`
- **Guideline:** [patterns/sitemap-grid.md](patterns/sitemap-grid.md)
- **Section Styles:** `section-sitemap-default`
- **Purpose:** Complete site structure display

---

## Pattern Count Summary

**Total Patterns:** 48 (30 existing + 18 new)

**By Category:**
- Hero/Header: 2
- Navigation: 3
- Content Display: 12
- Meta/Features: 8
- Utility: 8
- Tour Operator: 5
- Blog: 2
- Legal/Sitemap: 2
- CTA: 2
- Form: 2
- Social Proof: 2

**Documentation Status:**
- ✅ **18 new patterns fully documented (Phase 0 complete)**
- ✅ **30 existing patterns documented**
- ✅ **48 total patterns with complete guidelines**

---

## Next Steps

**Phase 1:** Implement 5 core content blocks + Group block  
**Phase 2:** Implement 18 new patterns  
**Phase 3:** Apply patterns to 15 templates  
**Phase 4:** Create 5 new page templates  

---

**Last Updated:** December 27, 2024  
**Status:** ✅ Phase 0 Documentation Complete