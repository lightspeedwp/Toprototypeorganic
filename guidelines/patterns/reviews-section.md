# Reviews Section Pattern

**Category:** Content / Social Proof  
**WordPress Equivalent:** Group block + Grid block + Custom Review blocks  
**Section Styles:** `section-reviews-default`, `section-reviews-summary`  
**Status:** ✅ Documented

---

## Overview

Displays customer reviews with ratings, testimonials, author info, and verification badges. Builds trust and social proof.

---

## WordPress Block Structure

```
Group {
  className: "section-reviews-default"
  
  Inner Blocks:
    └── Container
          ├── HeadingBlock { level: 2, text: "Customer Reviews" }
          ├── ReviewsSummary
          │   ├── AverageRating { stars: 4.8, count: 156 }
          │   └── RatingDistribution { 5: 120, 4: 28, 3: 6, 2: 1, 1: 1 }
          ├── Grid { columns: { xs: 1, md: 2 } }
          │   └── ReviewCard (per review)
          │         ├── StarRating { value: 5 }
          │         ├── ReviewText { text: "..." }
          │         ├── AuthorName { name: "Sarah M." }
          │         ├── TravelDate { date: "Traveled: June 2024" }
          │         └── VerifiedBadge
          └── Button { variant: "secondary", text: "Read All Reviews" }
}
```

---

## Section Styles

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
  color: var(--accent);  /* Amber stars */
}

.section-reviews-default .star-rating .empty {
  color: var(--muted-foreground);
}
```

---

## Design Token Usage

### Colors
- Background: `bg-muted` → `var(--muted)`
- Card: `bg-card` → `var(--card)`
- Border: `border-border` → `var(--border)`
- Stars (filled): `text-accent` → `var(--accent)` (Amber)
- Stars (empty): `text-muted-foreground` → `var(--muted-foreground)`
- Verified badge: `text-primary` → `var(--primary)`

### Typography
- Review text: AUTOMATIC via `<p>`
- Author name: AUTOMATIC via semantic HTML
- Date: `text-sm text-muted-foreground`

---

## Props Interface

```typescript
interface ReviewsSectionPatternProps {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
  showSummary?: boolean;
  variant?: 'default' | 'summary';
}

interface Review {
  id: string;
  rating: number;
  text: string;
  authorName: string;
  travelDate: string;
  verified: boolean;
}
```

---

## Usage Examples

```typescript
<ReviewsSectionPattern
  averageRating={4.8}
  totalReviews={156}
  reviews={TOUR_REVIEWS.slice(0, 6)}
  showSummary={true}
  variant="default"
/>
```

---

## Accessibility Requirements

- [ ] Star ratings use `aria-label="4.5 out of 5 stars"`
- [ ] Review cards have proper heading hierarchy
- [ ] Verified badge has `aria-label="Verified purchase"`

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

