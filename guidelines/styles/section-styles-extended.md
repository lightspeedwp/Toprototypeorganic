# Section Styles Extended - New Patterns

**Purpose:** Define section styles for all 18 new patterns from Phase 0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Documented

---

## Overview

This document defines **26 new section styles** for the patterns created in Phase 0. These styles build on the existing 22 section styles to provide a complete library of 48 total section styles.

**Design System Compliance:**
- ✅ All colors use semantic tokens from `/src/styles/theme.css`
- ✅ All spacing uses Tailwind scale (matches CSS variables)
- ✅ Typography inherits from semantic HTML (no hardcoded classes)
- ✅ Dark mode automatic via CSS custom properties

---

## New Section Styles (26 total)

### 1-2. Newsletter Signup Styles

#### `section-newsletter-default`

**Purpose:** High-visibility newsletter signup (homepage, blog archive)

```css
.section-newsletter-default {
  background: var(--accent);                    /* Amber */
  color: var(--accent-foreground);              /* White */
  padding: var(--spacing-section-md);           /* 48-96px */
  text-align: center;
}

.section-newsletter-default .container {
  max-width: 640px;
  margin: 0 auto;
}

.section-newsletter-default input {
  background: var(--input-background);
  color: var(--foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.section-newsletter-default button {
  background: var(--accent-foreground);         /* White button */
  color: var(--accent);                         /* Amber text */
  font-weight: var(--font-weight-medium);
}
```

**Tailwind Classes:**
- Background: `bg-accent`
- Text: `text-accent-foreground`
- Padding: `py-16 md:py-20`
- Alignment: `text-center`

---

#### `section-newsletter-sidebar`

**Purpose:** Subtle inline newsletter (blog posts, sidebar)

```css
.section-newsletter-sidebar {
  background: var(--secondary);                 /* Beige */
  color: var(--secondary-foreground);           /* Dark */
  padding: var(--spacing-element-lg);           /* 24-48px */
  text-align: left;
  border-radius: var(--radius-lg);
}

.section-newsletter-sidebar .container {
  max-width: 480px;
}
```

**Tailwind Classes:**
- Background: `bg-secondary`
- Text: `text-secondary-foreground`
- Padding: `py-8 md:py-12`
- Radius: `rounded-lg`

---

### 3-4. Filter Bar Styles

#### `section-filter-bar-default`

**Purpose:** Full-featured filter bar (tours, accommodation archives)

```css
.section-filter-bar-default {
  background: var(--muted);
  border-bottom: 1px solid var(--border);
  padding: var(--spacing-element-md);           /* 16-32px */
  position: sticky;
  top: 64px;
  z-index: 40;
}

.section-filter-bar-default .container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-gap-md);                   /* 16-32px */
  align-items: center;
}

.section-filter-bar-default input[type="search"] {
  background: var(--input-background);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  min-width: 240px;
  flex: 1;
}
```

**Tailwind Classes:**
- Background: `bg-muted`
- Border: `border-b border-border`
- Padding: `py-4 md:py-6`
- Position: `sticky top-16 z-40`

---

#### `section-filter-bar-compact`

**Purpose:** Minimal filter bar (blog, simple archives)

```css
.section-filter-bar-compact {
  background: var(--background);
  border-bottom: 1px solid var(--border);
  padding: var(--spacing-element-sm);           /* 12-24px */
  position: sticky;
  top: 64px;
  z-index: 40;
}

.section-filter-bar-compact .container {
  display: flex;
  gap: var(--spacing-gap-sm);
  align-items: center;
}
```

**Tailwind Classes:**
- Background: `bg-background`
- Border: `border-b border-border`
- Padding: `py-2 md:py-4`
- Position: `sticky top-16 z-40`

---

### 5. Empty State Style

#### `section-empty-state-default`

**Purpose:** No results / empty content messaging

```css
.section-empty-state-default {
  background: var(--background);
  padding: var(--spacing-section-lg);           /* 64-128px */
  text-align: center;
}

.section-empty-state-default .icon {
  color: var(--muted-foreground);
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-element-lg);
}
```

**Tailwind Classes:**
- Background: `bg-background`
- Padding: `py-20 md:py-24`
- Alignment: `text-center`

---

### 6-7. Pricing Section Styles

#### `section-pricing-default`

**Purpose:** Seasonal pricing tables (tours, accommodation)

```css
.section-pricing-default {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-element-lg);           /* 24-48px */
}

.section-pricing-default table {
  width: 100%;
  border-collapse: collapse;
}

.section-pricing-default th {
  background: var(--muted);
  font-family: var(--font-family-lora);
  font-weight: var(--font-weight-medium);
  padding: 12px 16px;
  text-align: left;
}

.section-pricing-default td {
  border-top: 1px solid var(--border);
  padding: 12px 16px;
}
```

**Tailwind Classes:**
- Background: `bg-card`
- Border: `border border-border rounded-lg`
- Padding: `p-6 md:p-8`

---

#### `section-pricing-comparison`

**Purpose:** Side-by-side pricing comparison

```css
.section-pricing-comparison {
  background: var(--background);
  padding: var(--spacing-section-md);
}

.section-pricing-comparison .pricing-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-gap-lg);
}
```

**Tailwind Classes:**
- Background: `bg-background`
- Padding: `py-12 md:py-16`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

---

### 8-9. Inclusions Styles

#### `section-inclusions-default`

**Purpose:** What's included/excluded lists

```css
.section-inclusions-default {
  background: var(--muted);
  padding: var(--spacing-section-md);
}

.section-inclusions-default .included-list li::before {
  content: "✓";
  color: var(--primary);
  font-weight: var(--font-weight-bold);
  margin-right: 8px;
}

.section-inclusions-default .excluded-list li::before {
  content: "✗";
  color: var(--destructive);
  font-weight: var(--font-weight-bold);
  margin-right: 8px;
}
```

**Tailwind Classes:**
- Background: `bg-muted`
- Padding: `py-12 md:py-16`
- Columns: `grid grid-cols-1 md:grid-cols-2 gap-8`

---

#### `section-inclusions-compact`

**Purpose:** Compact inline inclusions

```css
.section-inclusions-compact {
  background: var(--background);
  padding: var(--spacing-element-lg);
}
```

**Tailwind Classes:**
- Background: `bg-background`
- Padding: `py-8 md:py-12`

---

### 10-11. Reviews Section Styles

#### `section-reviews-default`

**Purpose:** Customer reviews grid

```css
.section-reviews-default {
  background: var(--muted);
  padding: var(--spacing-section-md);
}

.section-reviews-default .review-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-element-md);
}

.section-reviews-default .star-rating .filled {
  color: var(--accent);                         /* Amber stars */
}

.section-reviews-default .star-rating .empty {
  color: var(--muted-foreground);
}
```

**Tailwind Classes:**
- Background: `bg-muted`
- Padding: `py-12 md:py-16`
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-6`

---

#### `section-reviews-summary`

**Purpose:** Compact review summary only

```css
.section-reviews-summary {
  background: var(--background);
  padding: var(--spacing-element-lg);
}
```

**Tailwind Classes:**
- Background: `bg-background`
- Padding: `py-8`

---

### 12-13. Room Types Styles

#### `section-room-types-default`

**Purpose:** Room options grid

```css
.section-room-types-default {
  background: var(--background);
  padding: var(--spacing-section-md);
}

.section-room-types-default .room-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.section-room-types-default .price {
  font-family: var(--font-family-lora);
  font-weight: var(--font-weight-semibold);
  color: var(--primary);
}
```

**Tailwind Classes:**
- Background: `bg-background`
- Padding: `py-12 md:py-16`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

---

#### `section-room-types-table`

**Purpose:** Room comparison table

```css
.section-room-types-table {
  background: var(--background);
  padding: var(--spacing-section-md);
}

.section-room-types-table table {
  width: 100%;
  border-collapse: collapse;
}
```

**Tailwind Classes:**
- Background: `bg-background`
- Padding: `py-12 md:py-16`

---

### 14-15. Map Section Styles

#### `section-map-default`

**Purpose:** Full-width map section

```css
.section-map-default {
  background: var(--background);
  padding: var(--spacing-section-md);
}

.section-map-default .map-container {
  width: 100%;
  height: 400px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
}

@media (min-width: 768px) {
  .section-map-default .map-container {
    height: 500px;
  }
}
```

**Tailwind Classes:**
- Background: `bg-background`
- Padding: `py-12 md:py-16`
- Map: `w-full h-[400px] md:h-[500px] rounded-lg border border-border`

---

#### `section-map-inline`

**Purpose:** Sidebar map layout

```css
.section-map-inline {
  background: var(--muted);
  padding: var(--spacing-section-md);
}

.section-map-inline .container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-gap-lg);
}

@media (min-width: 768px) {
  .section-map-inline .container {
    grid-template-columns: 40% 60%;
  }
}
```

**Tailwind Classes:**
- Background: `bg-muted`
- Grid: `grid grid-cols-1 md:grid-cols-[40%_60%] gap-6`

---

### 16-17. Climate Info Styles

#### `section-climate-default`

**Purpose:** Seasonal weather grid

```css
.section-climate-default {
  background: var(--muted);
  padding: var(--spacing-section-md);
}

.section-climate-default .season-card {
  background: var(--card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-element-md);
  text-align: center;
}

.section-climate-default .season-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--spacing-element-sm);
  color: var(--accent);
}
```

**Tailwind Classes:**
- Background: `bg-muted`
- Padding: `py-12 md:py-16`
- Grid: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6`

---

#### `section-climate-compact`

**Purpose:** Compact table format

```css
.section-climate-compact {
  background: var(--background);
  padding: var(--spacing-element-lg);
}
```

**Tailwind Classes:**
- Background: `bg-background`
- Padding: `py-8 md:py-12`

---

### 18-19. Highlights Grid Styles

#### `section-highlights-default`

**Purpose:** Top attractions grid

```css
.section-highlights-default {
  background: var(--background);
  padding: var(--spacing-section-md);
}

.section-highlights-default .highlight-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.section-highlights-default .highlight-card img {
  transition: transform 0.3s ease;
}

.section-highlights-default .highlight-card:hover img {
  transform: scale(1.05);
}
```

**Tailwind Classes:**
- Background: `bg-background`
- Padding: `py-12 md:py-16`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

---

#### `section-highlights-carousel`

**Purpose:** Horizontal scrolling highlights

```css
.section-highlights-carousel {
  background: var(--muted);
  padding: var(--spacing-section-md);
}

.section-highlights-carousel .carousel {
  display: flex;
  gap: var(--spacing-gap-md);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.section-highlights-carousel .highlight-card {
  scroll-snap-align: start;
  flex: 0 0 300px;
}
```

**Tailwind Classes:**
- Background: `bg-muted`
- Layout: `flex gap-6 overflow-x-auto snap-x`

---

### 20-21. Countdown Timer Styles

#### `section-countdown-default`

**Purpose:** Large countdown display

```css
.section-countdown-default {
  background: var(--accent);
  color: var(--accent-foreground);
  padding: var(--spacing-section-md);
  text-align: center;
}

.section-countdown-default .timer {
  display: flex;
  gap: var(--spacing-gap-lg);
  justify-content: center;
  margin: var(--spacing-element-lg) 0;
}

.section-countdown-default .time-value {
  font-size: var(--text-6xl);
  font-weight: var(--font-weight-bold);
  line-height: 1;
}

.section-countdown-default .time-label {
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
```

**Tailwind Classes:**
- Background: `bg-accent`
- Text: `text-accent-foreground`
- Padding: `py-16 md:py-20`

---

#### `section-countdown-inline`

**Purpose:** Compact header countdown

```css
.section-countdown-inline {
  background: var(--secondary);
  padding: var(--spacing-element-md);
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**Tailwind Classes:**
- Background: `bg-secondary`
- Padding: `py-4 md:py-6`
- Layout: `flex justify-center items-center`

---

### 22. Breadcrumbs Style

#### `section-breadcrumbs-default`

**Purpose:** Navigation breadcrumb trail

```css
.section-breadcrumbs-default {
  background: var(--background);
  border-bottom: 1px solid var(--border);
  padding: var(--spacing-element-sm);
}

.section-breadcrumbs-default nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-gap-xs);
  font-size: var(--text-sm);
}

.section-breadcrumbs-default a {
  color: var(--muted-foreground);
  text-decoration: none;
}

.section-breadcrumbs-default a:hover {
  color: var(--primary);
  text-decoration: underline;
}

.section-breadcrumbs-default [aria-current="page"] {
  color: var(--foreground);
  font-weight: var(--font-weight-medium);
}
```

**Tailwind Classes:**
- Background: `bg-background`
- Border: `border-b border-border`
- Padding: `py-2 md:py-3`

---

### 23. Statistics Style

#### `section-statistics-default`

**Purpose:** Key metrics display

```css
.section-statistics-default {
  background: var(--muted);
  padding: var(--spacing-section-md);
}

.section-statistics-default .stat-card {
  text-align: center;
  padding: var(--spacing-element-md);
}

.section-statistics-default .stat-number {
  font-family: var(--font-family-lora);
  font-size: var(--text-6xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary);
  line-height: 1;
  margin-bottom: var(--spacing-element-xs);
}

.section-statistics-default .stat-label {
  font-size: var(--text-sm);
  color: var(--muted-foreground);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
```

**Tailwind Classes:**
- Background: `bg-muted`
- Padding: `py-12 md:py-16`
- Grid: `grid grid-cols-2 md:grid-cols-4 gap-6`

---

### 24. Contact Info Style

#### `section-contact-info-default`

**Purpose:** Contact details grid

```css
.section-contact-info-default {
  background: var(--background);
  padding: var(--spacing-section-md);
}

.section-contact-info-default .contact-card {
  text-align: center;
  padding: var(--spacing-element-md);
}

.section-contact-info-default .contact-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--spacing-element-sm);
  color: var(--primary);
}

.section-contact-info-default a {
  color: var(--primary);
  text-decoration: none;
}

.section-contact-info-default a:hover {
  text-decoration: underline;
}
```

**Tailwind Classes:**
- Background: `bg-background`
- Padding: `py-12 md:py-16`
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-6`

---

### 25. Author Bio Style

#### `section-author-bio-default`

**Purpose:** Author information block

```css
.section-author-bio-default {
  background: var(--muted);
  border-radius: var(--radius-lg);
  padding: var(--spacing-element-lg);
}

.section-author-bio-default .author-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: var(--spacing-element-sm);
}
```

**Tailwind Classes:**
- Background: `bg-muted`
- Radius: `rounded-lg`
- Padding: `p-6 md:p-8`

---

### 26. Table of Contents Style

#### `section-toc-default`

**Purpose:** Jump links for long content

```css
.section-toc-default {
  background: var(--muted);
  border-radius: var(--radius-lg);
  padding: var(--spacing-element-lg);
  margin-bottom: var(--spacing-section-md);
}

.section-toc-default ol {
  list-style-position: inside;
}

.section-toc-default a {
  color: var(--primary);
  text-decoration: none;
}

.section-toc-default a:hover {
  text-decoration: underline;
}
```

**Tailwind Classes:**
- Background: `bg-muted`
- Radius: `rounded-lg`
- Padding: `p-6 md:p-8`
- Margin: `mb-12`

---

## Complete Section Style Library

**Total Section Styles:** 48

**Existing (22):**
1-22. See `/guidelines/styles/section-styles.md`

**New (26):**
23. `section-newsletter-default`
24. `section-newsletter-sidebar`
25. `section-filter-bar-default`
26. `section-filter-bar-compact`
27. `section-empty-state-default`
28. `section-pricing-default`
29. `section-pricing-comparison`
30. `section-inclusions-default`
31. `section-inclusions-compact`
32. `section-reviews-default`
33. `section-reviews-summary`
34. `section-room-types-default`
35. `section-room-types-table`
36. `section-map-default`
37. `section-map-inline`
38. `section-climate-default`
39. `section-climate-compact`
40. `section-highlights-default`
41. `section-highlights-carousel`
42. `section-countdown-default`
43. `section-countdown-inline`
44. `section-breadcrumbs-default`
45. `section-statistics-default`
46. `section-contact-info-default`
47. `section-author-bio-default`
48. `section-toc-default`

*Note: Sitemap grid uses existing `section-default` style*

---

## Usage Pattern

All patterns must be wrapped in GroupBlock with section style:

```typescript
import { GroupBlock } from "../components/blocks/design/GroupBlock";
import { NewsletterSignupPattern } from "../components/patterns/NewsletterSignupPattern";

<GroupBlock className="section-newsletter-default">
  <NewsletterSignupPattern
    title="Stay Inspired"
    description="Get travel tips delivered to your inbox."
    variant="default"
  />
</GroupBlock>
```

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete - Ready for CSS Implementation

