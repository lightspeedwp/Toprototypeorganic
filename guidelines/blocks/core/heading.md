# Heading Block (core/heading)

**Category:** Core Content  
**WordPress Block:** `core/heading`  
**Status:** ✅ Documented

---

## Overview

The Heading block provides semantic heading elements (h1-h6) with automatic typography styling from the design system. This block is foundational to proper document structure and accessibility.

**Key Principle:** Typography is **automatic** via semantic HTML. No Tailwind classes (`text-4xl`, `font-bold`) should be applied unless intentionally overriding defaults.

---

## Block Attributes

```typescript
interface HeadingBlockAttributes {
  /** Heading level (1-6) */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  
  /** Heading text content */
  children: React.ReactNode;
  
  /** Optional custom classes (use sparingly) */
  className?: string;
  
  /** Optional ID for anchor links */
  id?: string;
  
  /** Optional text alignment override */
  textAlign?: 'left' | 'center' | 'right';
}
```

---

## Design Token Application

### Automatic Typography (Semantic HTML)

Each heading level automatically receives styling from `/src/styles/theme.css`:

**H1 (Page Title):**
```css
h1 {
  font-family: var(--font-family-lora);          /* Lora serif */
  font-size: var(--text-6xl);                    /* clamp(3rem, 5vw + 1rem, 4.5rem) */
  font-weight: var(--font-weight-bold);          /* 700 */
  line-height: var(--leading-tight);             /* 1.2 */
  letter-spacing: var(--tracking-tighter);       /* -0.05em */
  margin-bottom: 1.5rem;                         /* 24px */
}
```

**H2 (Section Heading):**
```css
h2 {
  font-family: var(--font-family-lora);
  font-size: var(--text-4xl);                    /* clamp(1.875rem, 3vw + 0.5rem, 3rem) */
  font-weight: var(--font-weight-semibold);      /* 600 */
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin-bottom: 1.25rem;
}
```

**H3 (Subsection Heading):**
```css
h3 {
  font-family: var(--font-family-lora);
  font-size: var(--text-3xl);                    /* clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem) */
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  margin-bottom: 1rem;
}
```

**H4 (Card/Block Heading):**
```css
h4 {
  font-family: var(--font-family-lora);
  font-size: var(--text-2xl);                    /* clamp(1.25rem, 2vw + 0.25rem, 1.875rem) */
  font-weight: var(--font-weight-medium);        /* 500 */
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-normal);
  margin-bottom: 0.75rem;
}
```

**H5 (Small Section Heading):**
```css
h5 {
  font-family: var(--font-family-lora);
  font-size: var(--text-xl);                     /* clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem) */
  font-weight: var(--font-weight-medium);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-normal);
  margin-bottom: 0.5rem;
}
```

**H6 (Smallest Heading):**
```css
h6 {
  font-family: var(--font-family-lora);
  font-size: var(--text-lg);                     /* clamp(1rem, 1vw + 0.125rem, 1.25rem) */
  font-weight: var(--font-weight-medium);
  line-height: var(--leading-normal);
  letter-spacing: var(--tracking-normal);
  margin-bottom: 0.5rem;
}
```

---

## Implementation

### Component Structure

```typescript
// /src/app/components/blocks/core/HeadingBlock.tsx

interface HeadingBlockProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export function HeadingBlock({ 
  level, 
  children, 
  className,
  id,
  textAlign
}: HeadingBlockProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag 
      id={id} 
      className={cn(
        textAlign && `text-${textAlign}`,
        className
      )}
    >
      {children}
    </Tag>
  );
}
```

---

## Usage Examples

### ✅ Correct Usage (Semantic HTML)

```typescript
// Hero section title
<HeadingBlock level={1}>
  African Safari Tours
</HeadingBlock>

// Section heading
<HeadingBlock level={2}>
  Featured Tours
</HeadingBlock>

// Card title
<HeadingBlock level={4}>
  Iceland Explorer
</HeadingBlock>

// With anchor link
<HeadingBlock level={2} id="pricing">
  Pricing & Dates
</HeadingBlock>

// With center alignment (intentional override)
<HeadingBlock level={2} textAlign="center">
  Why Choose Us
</HeadingBlock>
```

### ❌ Incorrect Usage (Hardcoded Tailwind Classes)

```typescript
// ❌ WRONG: Hardcoded size/weight classes
<HeadingBlock level={2} className="text-4xl font-semibold">
  Featured Tours
</HeadingBlock>

// ✅ CORRECT: Let semantic HTML handle it
<HeadingBlock level={2}>
  Featured Tours
</HeadingBlock>
```

---

## Nesting Rules

### Can contain:
- Text content
- Inline elements (`<span>`, `<a>`, `<strong>`, etc.)
- Icons (inline SVG or icon components)

### Can be contained by:
- Group Block
- Container Component
- Any pattern component
- Grid cells
- Column blocks

### Cannot contain:
- Block-level elements (`<div>`, `<p>`, `<section>`)
- Other heading blocks
- Form elements

---

## Accessibility Requirements

### Heading Hierarchy

**Rules:**
- [ ] One `<h1>` per page (page title)
- [ ] Logical hierarchy (h1 → h2 → h3, no skipping levels)
- [ ] Headings describe content accurately
- [ ] No headings used purely for styling

**Example - Correct Hierarchy:**
```html
<h1>Tour Details</h1>              <!-- Page title -->
  <h2>Overview</h2>                <!-- Section -->
    <h3>What to Expect</h3>        <!-- Subsection -->
  <h2>Pricing</h2>                 <!-- Section -->
    <h3>Seasonal Rates</h3>        <!-- Subsection -->
  <h2>Itinerary</h2>               <!-- Section -->
    <h3>Day 1: Arrival</h3>        <!-- Subsection -->
```

**Example - Incorrect Hierarchy:**
```html
<h1>Tour Details</h1>
  <h3>Overview</h3>                <!-- ❌ WRONG: Skipped h2 -->
  <h2>Pricing</h2>
    <h4>Seasonal Rates</h4>        <!-- ❌ WRONG: Skipped h3 -->
```

### Screen Readers

- [ ] Headings provide document outline for screen reader navigation
- [ ] Users can jump between headings to navigate content
- [ ] Heading text clearly describes section content

### SEO

- [ ] H1 contains primary keyword (page title)
- [ ] H2-H3 contain secondary keywords (section topics)
- [ ] Heading structure matches page outline
- [ ] Unique H1 per page (not duplicate across site)

---

## Design System Compliance

### ✅ Correct Implementation

**Pattern: Hero**
```typescript
<GroupBlock className="section-hero-primary">
  <Container>
    <HeadingBlock level={1}>
      African Safari Tours
    </HeadingBlock>
    <ParagraphBlock>
      Discover unforgettable wildlife experiences...
    </ParagraphBlock>
  </Container>
</GroupBlock>
```
**Result:** H1 automatically gets 48-72px (fluid), Lora, 700 weight, tight leading

**Pattern: Card Grid**
```typescript
<GroupBlock className="section-card-grid-default">
  <Container>
    <HeadingBlock level={2}>
      Featured Tours
    </HeadingBlock>
    <Grid>
      {tours.map(tour => (
        <TourCard key={tour.id}>
          <HeadingBlock level={4}>
            {tour.title}
          </HeadingBlock>
        </TourCard>
      ))}
    </Grid>
  </Container>
</GroupBlock>
```
**Result:** 
- H2 automatically gets 30-48px (fluid), Lora, 600 weight
- H4 (card titles) automatically get 20-30px (fluid), Lora, 500 weight

---

## Related Blocks

- [ParagraphBlock](./paragraph.md) - Body text block
- [ListBlock](./list.md) - List block (often follows headings)
- [SpacerBlock](./spacer.md) - Vertical spacing between sections

---

## Related Patterns

- [Hero Pattern](/guidelines/patterns/hero-patterns.md) - Uses H1
- [Section Header Pattern](/guidelines/patterns/section-header.md) - Uses H2
- [Card Patterns](/guidelines/patterns/card-grid-patterns.md) - Use H4 for card titles

---

## WordPress Equivalent

### Block Editor (Gutenberg)

```html
<!-- wp:heading {"level":2} -->
<h2>Featured Tours</h2>
<!-- /wp:heading -->
```

### Block Pattern Registration

```php
<?php
/**
 * Pattern: Section with heading
 */
?>

<!-- wp:group {"className":"section-card-grid-default"} -->
<section class="wp-block-group section-card-grid-default">
  
  <!-- wp:heading {"level":2} -->
  <h2>Featured Tours</h2>
  <!-- /wp:heading -->
  
  <!-- Content... -->
  
</section>
<!-- /wp:group -->
```

---

## Testing Checklist

### Visual Testing
- [ ] H1-H6 render with correct sizes at mobile/tablet/desktop
- [ ] Fluid typography scales smoothly
- [ ] Font family is Lora (serif)
- [ ] Font weights are correct (H1: 700, H2-H3: 600, H4-H6: 500)
- [ ] Line heights provide good readability
- [ ] Letter spacing looks natural

### Accessibility Testing
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] One H1 per page
- [ ] Screen reader can navigate by headings
- [ ] Heading text describes content accurately

### Design Token Compliance
- [ ] No hardcoded `text-*` size classes
- [ ] No hardcoded `font-*` weight classes
- [ ] No hardcoded `leading-*` classes
- [ ] Typography 100% from CSS variables

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete - Ready for Implementation

