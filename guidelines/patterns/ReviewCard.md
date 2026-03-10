# ReviewCard Pattern Guidelines

**Component:** ReviewCard  
**Category:** Pattern  
**Version:** 1.0  
**Last Updated:** 2026-02-28

---

## Overview

The ReviewCard pattern displays individual traveler reviews with ratings, quotes, and author information. Used in destination pages, tour pages, and review archives.

---

## Component Location

**File:** `/src/app/components/patterns/ReviewCard.tsx`  
**CSS:** `/src/styles/components/reviews-section.css`

---

## Usage

```typescript
import ReviewCard from "../components/patterns/ReviewCard";
// or
import { ReviewCard } from "../components/patterns/ReviewCard";

<ReviewCard 
  review={reviewObject}
  showExcerpt={true}
  className="additional-classes"
/>
```

---

## Props

### Required Props

**`review`** (Review object)
```typescript
{
  id: string;
  slug: string;
  author: string;
  authorLocation: string;
  rating: number; // 1-5
  excerpt: string;
  content: string;
  verified: boolean;
}
```

### Optional Props

**`showExcerpt`** (boolean, default: true)
- `true` → Display excerpt (shorter)
- `false` → Display full content

**`className`** (string, default: "")
- Additional CSS classes to apply to wrapper

---

## Visual Structure

```
┌─────────────────────────────────┐
│  [Quote Icon]                   │
│                                 │
│  ★★★★★ (Rating Stars)          │
│                                 │
│  "Review content text here      │
│   truncated to 200 characters   │
│   if longer..."                 │
│                                 │
│  ─────────────────────────      │
│  John Smith                     │
│  Cape Town, South Africa        │
│                      [Verified] │
│                                 │
│  Read full review →             │
└─────────────────────────────────┘
```

---

## BEM CSS Structure

### Block

**`.review-card`** - Main container
- `display: flex`
- `flex-direction: column`
- `gap: 1rem`
- `padding: 1.5rem`
- `background-color: var(--card)`
- `border: 1px solid var(--border)`
- `border-radius: var(--radius-lg)`

**Hover State:**
- `border-color: var(--primary)`
- `box-shadow: var(--elevation-sm)`

### Elements

**`.review-card__quote-icon`** - Quote icon wrapper
- Circular background (3rem × 3rem)
- `background-color: var(--muted)`
- `color: var(--primary)`
- Centered quote icon

**`.review-card__rating`** - Star rating container
- `display: flex`
- `align-items: center`
- `gap: 0.25rem`

**`.review-card__star--filled`** - Filled star
- `fill: var(--primary)`
- `stroke: var(--primary)`

**`.review-card__star--empty`** - Empty star
- `fill: none`
- `stroke: var(--muted-foreground)`

**`.review-card__content`** - Review text wrapper
- `flex: 1`

**`.review-card__text`** - Review content text
- `font-family: var(--font-family-noto-sans)`
- `font-size: var(--text-base)`
- `font-weight: var(--font-weight-normal)`
- `line-height: var(--leading-relaxed)`
- `color: var(--foreground)`

**`.review-card__author`** - Author section
- `display: flex`
- `align-items: center`
- `justify-content: space-between`
- `padding-top: 1rem`
- `border-top: 1px solid var(--border)`

**`.review-card__author-info`** - Author details wrapper
- `flex: 1`

**`.review-card__author-name`** - Author name
- `font-family: var(--font-family-lora)` (serif)
- `font-size: var(--text-base)`
- `font-weight: var(--font-weight-medium)`
- `color: var(--foreground)`

**`.review-card__author-location`** - Author location
- `font-family: var(--font-family-noto-sans)`
- `font-size: var(--text-sm)`
- `color: var(--muted-foreground)`

**`.review-card__verified-badge`** - Verified indicator
- Green badge with checkmark
- `background-color: rgba(27, 94, 32, 0.1)`
- `border: 1px solid var(--success)`
- `border-radius: var(--radius-full)`
- `color: var(--success)`

**`.review-card__link`** - Read more link
- `font-family: var(--font-family-noto-sans)`
- `font-size: var(--text-sm)`
- `font-weight: var(--font-weight-medium)`
- `color: var(--primary)`
- Hover: underline

---

## Design System Compliance

### Colors
✅ All colors use CSS custom properties:
- Background: `var(--card)`
- Border: `var(--border)`
- Text: `var(--foreground)`
- Muted text: `var(--muted-foreground)`
- Accent: `var(--primary)`
- Success: `var(--success)`

❌ NO hardcoded colors like `#548235` or `white`

### Typography
✅ Only approved fonts:
- Author name: `var(--font-family-lora)` (Lora serif)
- Review text: `var(--font-family-noto-sans)` (Noto Sans)
- All other text: `var(--font-family-noto-sans)`

❌ NO other fonts like Arial, Helvetica, or system fonts

### Spacing
✅ Uses CSS custom properties and consistent spacing:
- Card padding: `1.5rem`
- Internal gaps: `0.25rem` to `1rem`
- Icon size: `3rem`

### Borders & Radius
✅ Uses design system tokens:
- Border radius: `var(--radius-lg)`
- Badge radius: `var(--radius-full)`
- Border width: `1px solid`

### Shadows
✅ Uses elevation tokens:
- Hover shadow: `var(--elevation-sm)`

---

## Responsive Behavior

### Mobile (< 768px)
- Card remains single column
- Full-width layout
- Touch-friendly tap targets

### Tablet (768px - 1024px)
- 2-column grid in parent container
- Card scales proportionally

### Desktop (> 1024px)
- 3-column grid in parent container
- Optimal reading width maintained

---

## Content Truncation

**Review Text:**
- Truncates at 200 characters if longer
- Adds "..." ellipsis
- Shows "Read full review" link if truncated
- Link goes to `/reviews/{review.slug}`

**Logic:**
```typescript
const truncatedContent = content.length > 200 
  ? `${content.slice(0, 200)}...` 
  : content;
```

---

## Accessibility

### Semantic HTML
- `<article>` wrapper for review
- `<dl>` for author details
- `<a>` for links

### ARIA Labels
- Rating has `aria-label="{rating} out of 5 stars"`
- Focus states visible with `focus-visible:ring-2 ring-ring`

### Keyboard Navigation
- Link is keyboard accessible
- Tab order: Quote icon (not focusable) → Read more link
- Enter activates link

### Screen Readers
- Author name and location announced correctly
- Rating value announced with context
- Verified badge announced

---

## Use Cases

### 1. Destination Pages
Display 3-6 reviews in a grid:
```typescript
<section className="py-section-md bg-muted">
  <Container>
    <h2 className="mb-8">Traveler Reviews</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  </Container>
</section>
```

### 2. Tour Pages
Display 4 reviews in a grid:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {reviews.slice(0, 4).map((review) => (
    <ReviewCard key={review.id} review={review} />
  ))}
</div>
```

### 3. Reviews Archive
Display all reviews with pagination:
```typescript
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {paginatedReviews.map((review) => (
    <ReviewCard 
      key={review.id} 
      review={review}
      showExcerpt={true}
    />
  ))}
</div>
```

---

## Data Requirements

### Review Object Structure

```typescript
{
  id: string, // Unique identifier
  slug: string, // URL-friendly identifier
  author: string, // Full name (e.g., "John Smith")
  authorLocation: string, // Location (e.g., "Cape Town, South Africa")
  rating: number, // 1-5 (integer)
  excerpt: string, // 100-150 chars, 1-2 sentences
  content: string, // Full review, 200-500 words
  verified: boolean, // true if verified booking
  tourId?: string, // Optional tour reference
  destinationId?: string, // Optional destination reference
  date?: string, // ISO date string
}
```

### Content Guidelines

**Excerpt (100-150 chars):**
- Opening sentence of review
- Hook the reader
- Example: "An unforgettable experience that exceeded all expectations."

**Content (200-500 words):**
- Personal experience narrative
- Specific details about tour/destination
- What stood out (positive or constructive)
- Would they recommend it?

**Author Name:**
- Use real or realistic names
- Format: "First Last"
- No titles or honorifics

**Author Location:**
- Format: "City, Country"
- Use recognizable locations
- Example: "London, United Kingdom"

---

## Common Issues & Solutions

### Issue: Stars not displaying correctly

**Cause:** Rating value outside 1-5 range  
**Solution:** Validate rating is integer between 1-5

### Issue: Verified badge missing

**Cause:** `verified` field is undefined or not boolean  
**Solution:** Set `verified: true` or `verified: false` explicitly

### Issue: Content not truncating

**Cause:** Content is null or undefined  
**Solution:** Ensure content field is always a string, even if empty

### Issue: Read more link not working

**Cause:** Review slug is invalid or route not defined  
**Solution:** Verify slug exists and `/reviews/:slug` route is configured

### Issue: Styles not applying

**Cause:** CSS file not imported  
**Solution:** Verify `/src/styles/components/reviews-section.css` is imported in `/src/styles/index.css`

---

## WordPress Alignment

### Pattern Registration
```php
register_block_pattern('lightspeed/review-card', [
  'title' => 'Review Card',
  'categories' => ['testimonials'],
  'content' => '<!-- wp:group {"className":"review-card"} -->',
]);
```

### Block Markup
Uses core blocks:
- `core/group` (wrapper)
- `core/paragraph` (review text)
- `core/heading` (author name)

---

## Testing Checklist

### Visual Tests
- [ ] Quote icon displays correctly
- [ ] Rating stars render (filled and empty)
- [ ] Content truncates at 200 chars
- [ ] Verified badge shows when true
- [ ] Hover state changes border color
- [ ] Card scales responsively

### Functional Tests
- [ ] Read more link works
- [ ] Content toggles between excerpt/full
- [ ] All props accepted correctly
- [ ] Custom className applied

### Accessibility Tests
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader announces correctly
- [ ] Color contrast meets WCAG AA

### Design System Tests
- [ ] All colors use CSS variables
- [ ] Only Lora and Noto Sans used
- [ ] No inline styles
- [ ] No dark: classes
- [ ] BEM naming followed

---

## File Locations

**Component:** `/src/app/components/patterns/ReviewCard.tsx`  
**CSS:** `/src/styles/components/reviews-section.css`  
**Data:** `/src/app/data/reviews.ts`  
**Types:** `/src/app/data/types.ts` (Review interface)

---

**Last Updated:** 2026-02-28  
**Status:** Production Ready  
**Review Schedule:** Quarterly
