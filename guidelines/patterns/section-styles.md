# Section Styles & WordPress Alignment

**Version:** 1.0  
**Last Updated:** December 25, 2024

This document defines **section composition patterns** for the LightSpeed Tour Operator prototype, aligned with **WordPress block theme architecture**.

---

## Table of Contents

1. [Overview](#overview)
2. [Section Anatomy](#section-anatomy)
3. [Background Patterns](#background-patterns)
4. [Dark Mode Considerations](#dark-mode-considerations)
5. [Typography in Sections](#typography-in-sections)
6. [Spacing Standards](#spacing-standards)
7. [Section Pattern Library](#section-pattern-library)
8. [Common Mistakes](#common-mistakes)
9. [Accessibility Requirements](#accessibility-requirements)

---

## Overview

### WordPress Concept

In WordPress block themes, **sections** are compositional containers that:

1. Group related content blocks
2. Apply consistent spacing and backgrounds
3. Create visual rhythm through alternation
4. Map to `<section>` semantic HTML

### Prototype Implementation

Every template page should alternate between **light** and **dark** section backgrounds to create visual hierarchy and improve readability.

---

## Section Anatomy

### Basic Structure

```tsx
<section className="py-12 md:py-16 [BACKGROUND_CLASS]">
  <Container>
    {/* Section content */}
  </Container>
</section>
```

### Required Elements

1. **Semantic tag**: Always use `<section>`
2. **Vertical padding**: `py-12 md:py-16` (base) or `py-12 md:py-20` (hero)
3. **Background class**: One of the approved background patterns
4. **Container**: Wrap all content in `<Container>` for width constraints
5. **Optional aria-label**: For sections without visible headings

---

## Background Patterns

### 1. Default Background (Light)

**Class:** `bg-background`  
**When to use:** Default sections, alternating with muted  
**Dark mode:** Automatically switches to dark background

```tsx
<section className="py-12 md:py-16 bg-background">
  <Container>
    <h2>Section Title</h2>
    <p>Content with default background</p>
  </Container>
</section>
```

**Color values:**
- Light mode: `rgba(255, 255, 255, 1)` (white)
- Dark mode: `rgba(20, 20, 20, 1)` (near black)

---

### 2. Muted Background

**Class:** `bg-muted`  
**When to use:** Hero sections, alternating sections, emphasis areas  
**Dark mode:** Automatically adjusts to muted dark

```tsx
<section className="py-12 md:py-20 bg-muted">
  <Container>
    <h1>Hero Title</h1>
    <p className="text-muted-foreground">Hero description</p>
  </Container>
</section>
```

**Color values:**
- Light mode: `rgba(225, 225, 225, 1)` (light gray)
- Dark mode: `rgba(60, 60, 60, 1)` (dark gray)

**Common usage:**
- Hero sections
- Archive headers
- Every other content section
- Gallery backgrounds

---

### 3. Muted Subtle (30% opacity)

**Class:** `bg-muted/30`  
**When to use:** Subtle alternation, less emphasis than full muted  
**Dark mode:** Automatically adjusts opacity

```tsx
<section className="py-12 md:py-16 bg-muted/30">
  <Container>
    <h2>Itinerary Section</h2>
    {/* Content */}
  </Container>
</section>
```

**Common usage:**
- Itinerary sections
- Gallery sections
- Secondary content areas

---

### 4. Primary Background

**Class:** `bg-primary text-primary-foreground`  
**When to use:** CTA sections, high-emphasis actions  
**Dark mode:** Primary color remains consistent, foreground adjusts

```tsx
<section className="py-12 md:py-16 bg-primary text-primary-foreground">
  <Container>
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="mb-4">Ready to Book?</h2>
      <p className="mb-6 opacity-90" style={{ fontFamily: 'var(--font-family-noto-sans)', fontSize: 'var(--text-lg)', lineHeight: '1.75' }}>
        Contact us today
      </p>
      <button className="px-6 py-3 bg-primary-foreground text-primary rounded-md">
        Get Started
      </button>
    </div>
  </Container>
</section>
```

**Color values:**
- Primary: `rgba(74, 115, 17, 1)` (olive green) - same in both modes
- Foreground (light): `rgba(255, 255, 255, 1)` (white)
- Foreground (dark): `rgba(255, 255, 255, 1)` (white)

**Important notes:**
- **Always include `text-primary-foreground`** on the section
- Use `opacity-90` for secondary text (not `text-muted-foreground`)
- Buttons should invert: `bg-primary-foreground text-primary`

---

### 5. Card Background

**Class:** `bg-card`  
**When to use:** Nested cards, modal content  
**Dark mode:** Automatically adjusts to card dark

```tsx
<div className="bg-card border border-border rounded-lg p-6">
  <h3>Card Title</h3>
  <p className="text-card-foreground">Card content</p>
</div>
```

**Color values:**
- Light mode: `rgba(255, 255, 255, 1)` (white)
- Dark mode: `rgba(30, 30, 30, 1)` (dark gray)

---

## Dark Mode Considerations

### Automatic Color Switching

All semantic color tokens automatically adapt to dark mode via CSS variables:

```css
/* Light mode */
:root {
  --background: rgba(255, 255, 255, 1);
  --foreground: rgba(9, 9, 9, 1);
  --muted: rgba(225, 225, 225, 1);
  --muted-foreground: rgba(86, 86, 86, 1);
}

/* Dark mode */
.dark {
  --background: rgba(20, 20, 20, 1);
  --foreground: rgba(245, 245, 245, 1);
  --muted: rgba(60, 60, 60, 1);
  --muted-foreground: rgba(150, 150, 150, 1);
}
```

### Text Color Rules

1. **Never use hardcoded grays** - Always use semantic tokens
2. **Test contrast in both modes** - Use browser dev tools
3. **Use foreground colors appropriately**:
   - `text-foreground` - Primary text
   - `text-muted-foreground` - Secondary text
   - `text-primary` - Links, emphasis
   - `text-primary-foreground` - Text on primary backgrounds

### Contrast Requirements

**WCAG 2.1 AA Standards:**
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

**Test in both modes:**

```tsx
{/* ❌ BAD - May fail in dark mode */}
<p className="text-gray-600">Description</p>

{/* ✅ GOOD - Adapts automatically */}
<p className="text-muted-foreground">Description</p>
```

---

## Typography in Sections

### Heading Colors

**Default sections** (bg-background, bg-muted):
```tsx
<h2>Uses default heading styles</h2>
{/* Automatically uses --foreground color */}
```

**Primary sections** (bg-primary):
```tsx
<h2 className="mb-4">Section Title</h2>
{/* Inherits text-primary-foreground from section */}
```

### Body Text Colors

**Default sections:**
```tsx
<p className="text-muted-foreground" style={{ fontFamily: 'var(--font-family-noto-sans)', fontSize: 'var(--text-lg)', lineHeight: '1.75' }}>
  Secondary description text
</p>
```

**Primary sections:**
```tsx
<p className="mb-6 opacity-90" style={{ fontFamily: 'var(--font-family-noto-sans)', fontSize: 'var(--text-lg)', lineHeight: '1.75' }}>
  Text on primary background (use opacity instead of muted)
</p>
```

---

## Spacing Standards

### Vertical Spacing (Section Padding)

**Standard sections:**
```tsx
className="py-12 md:py-16"
```
- Mobile: 48px top/bottom
- Desktop: 64px top/bottom

**Hero sections:**
```tsx
className="py-12 md:py-20"
```
- Mobile: 48px top/bottom
- Desktop: 80px top/bottom

### Internal Spacing

**Section header to content:**
```tsx
<Container>
  <SectionHeaderPattern
    title="Section Title"
    description="Section description"
  />
  {/* Patterns handle their own top margin */}
  <ContentPattern />
</Container>
```

**Between elements:**
```tsx
<h2 className="mb-4">Title</h2>
<p className="mb-6">Paragraph</p>
<div className="flex gap-4">Buttons</div>
```

---

## Section Pattern Library

### 1. Hero Section

```tsx
<section className="py-12 md:py-20 bg-muted">
  <Container>
    <div className="max-w-3xl">
      <h1 className="mb-4">Page Title</h1>
      <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-family-noto-sans)', fontSize: 'var(--text-lg)', lineHeight: '1.75' }}>
        Page description
      </p>
    </div>
  </Container>
</section>
```

**Usage:** First section on archive pages, single pages  
**Background:** `bg-muted`  
**Max width:** `max-w-3xl` for readability

---

### 2. Content Section (Default)

```tsx
<section className="py-12 md:py-16">
  <Container>
    <h2>Section Title</h2>
    <p>Section content</p>
  </Container>
</section>
```

**Usage:** Standard content sections  
**Background:** None (uses default bg-background)  
**Alternation:** Alternate with muted sections

---

### 3. Content Section (Muted)

```tsx
<section className="py-12 md:py-16 bg-muted/30">
  <Container>
    <SectionHeaderPattern
      title="Section Title"
      description="Section description"
    />
    {/* Pattern content */}
  </Container>
</section>
```

**Usage:** Itinerary, gallery, supporting sections  
**Background:** `bg-muted/30` for subtle emphasis

---

### 4. CTA Section

```tsx
<section className="py-12 md:py-16 bg-primary text-primary-foreground">
  <Container>
    <div className="text-center max-w-2xl mx-auto">
      <h2 className="mb-4">Call to Action Title</h2>
      <p className="mb-6 opacity-90" style={{ fontFamily: 'var(--font-family-noto-sans)', fontSize: 'var(--text-lg)', lineHeight: '1.75' }}>
        Supporting description text
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="px-6 py-3 bg-primary-foreground text-primary rounded-md hover:opacity-90 transition-opacity font-medium">
          Primary Action
        </button>
        <button className="px-6 py-3 border border-primary-foreground text-primary-foreground rounded-md hover:bg-primary-foreground/10 transition-colors font-medium">
          Secondary Action
        </button>
      </div>
    </div>
  </Container>
</section>
```

**Usage:** Final section on most templates, CTA placements  
**Background:** `bg-primary text-primary-foreground`  
**Max width:** `max-w-2xl mx-auto` for centered content

---

### 5. Related Content Section

```tsx
<section className="py-12 md:py-16">
  <Container>
    <SectionHeaderPattern
      title="Related Content"
      description="Explore more options"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {/* Cards */}
    </div>
  </Container>
</section>
```

**Usage:** Related tours, destinations, accommodation  
**Background:** Default (alternates with previous section)  
**Grid:** Responsive grid pattern

---

## Common Mistakes

### ❌ Mistake 1: Missing Container

```tsx
{/* BAD */}
<section className="py-12 md:py-16">
  <h2>Title</h2>
  <p>Content without container spans full width</p>
</section>
```

```tsx
{/* GOOD */}
<section className="py-12 md:py-16">
  <Container>
    <h2>Title</h2>
    <p>Content properly constrained</p>
  </Container>
</section>
```

---

### ❌ Mistake 2: Forgetting text-primary-foreground

```tsx
{/* BAD */}
<section className="py-12 md:py-16 bg-primary">
  <Container>
    <h2>Title is invisible!</h2>
  </Container>
</section>
```

```tsx
{/* GOOD */}
<section className="py-12 md:py-16 bg-primary text-primary-foreground">
  <Container>
    <h2>Title is visible!</h2>
  </Container>
</section>
```

---

### ❌ Mistake 3: Using text-muted-foreground on Primary

```tsx
{/* BAD */}
<section className="py-12 md:py-16 bg-primary text-primary-foreground">
  <Container>
    <p className="text-muted-foreground">This will look wrong</p>
  </Container>
</section>
```

```tsx
{/* GOOD */}
<section className="py-12 md:py-16 bg-primary text-primary-foreground">
  <Container>
    <p className="opacity-90">This will look correct</p>
  </Container>
</section>
```

---

### ❌ Mistake 4: Hardcoded Background Colors

```tsx
{/* BAD */}
<section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800">
  <Container>Content</Container>
</section>
```

```tsx
{/* GOOD */}
<section className="py-12 md:py-16 bg-muted">
  <Container>Content</Container>
</section>
```

---

### ❌ Mistake 5: Inconsistent Section Spacing

```tsx
{/* BAD - Mixing padding values */}
<section className="py-8 md:py-12">...</section>
<section className="py-16 md:py-24">...</section>
<section className="py-6 md:py-10">...</section>
```

```tsx
{/* GOOD - Consistent padding */}
<section className="py-12 md:py-16">...</section>
<section className="py-12 md:py-16">...</section>
<section className="py-12 md:py-20">...</section> {/* Hero only */}
```

---

## Accessibility Requirements

### Semantic HTML

✅ **Always use `<section>` tag** for major content areas  
✅ **Provide heading** or `aria-label` for each section  
✅ **Use landmark roles** where appropriate (`role="region"`)

### ARIA Labels

```tsx
{/* Section without visible heading */}
<section className="py-12 md:py-16" aria-label="Related Tours">
  <Container>
    {/* Content */}
  </Container>
</section>

{/* Section with heading - no aria-label needed */}
<section className="py-12 md:py-16">
  <Container>
    <h2>Related Tours</h2>
    {/* Content */}
  </Container>
</section>
```

### Color Contrast

**Test all sections in both light and dark modes:**

1. Open browser dev tools
2. Toggle dark mode
3. Use contrast checker on all text
4. Verify minimum 4.5:1 for body text
5. Verify minimum 3:1 for large text

---

## Section Alternation Examples

### Tours Archive Template

```tsx
{/* 1. Hero - Muted */}
<section className="py-12 md:py-20 bg-muted">
  {/* Hero content */}
</section>

{/* 2. Filter - Default background (border only) */}
<section className="py-6 border-b border-border bg-background">
  {/* Filter */}
</section>

{/* 3. Card Grid - Default */}
<section className="py-12 md:py-16">
  {/* Tours grid */}
</section>

{/* 4. CTA - Primary */}
<section className="py-12 md:py-16 bg-primary text-primary-foreground">
  {/* CTA */}
</section>
```

### Tour Single Template

```tsx
{/* 1. Hero - Muted */}
<section className="py-12 md:py-20 bg-muted">
  {/* Breadcrumbs, title, description */}
</section>

{/* 2. Content + Facts - Default */}
<section className="py-12 md:py-16">
  {/* Editorial content + sidebar */}
</section>

{/* 3. Itinerary - Muted subtle */}
<section className="py-12 md:py-16 bg-muted/30">
  {/* Itinerary list */}
</section>

{/* 4. Travel Info - Default */}
<section className="py-12 md:py-16">
  {/* Travel information */}
</section>

{/* 5. Gallery - Muted subtle */}
<section className="py-12 md:py-16 bg-muted/30">
  {/* Photo gallery */}
</section>

{/* 6. Related Destinations - Default (from block) */}
<DestinationRelatedToursBlock /> {/* Handles own section */}

{/* 7. Related Accommodation - Muted (from block) */}
<DestinationRelatedAccommodationBlock /> {/* Handles own section */}

{/* 8. CTA - Primary */}
<section className="py-12 md:py-16 bg-primary text-primary-foreground">
  {/* CTA */}
</section>
```

---

## Quick Reference

### Section Background Classes

| Class | Usage | Dark Mode |
|-------|-------|-----------|
| `bg-background` | Default sections | Auto |
| `bg-muted` | Hero, alternating | Auto |
| `bg-muted/30` | Subtle emphasis | Auto |
| `bg-primary text-primary-foreground` | CTA sections | Same |
| `bg-card` | Cards, modals | Auto |

### Section Padding

| Class | Mobile | Desktop | Usage |
|-------|--------|---------|-------|
| `py-12 md:py-16` | 48px | 64px | Standard |
| `py-12 md:py-20` | 48px | 80px | Hero only |
| `py-6` | 24px | 24px | Filters, navigation |

### Text Colors

| Class | Usage | Dark Mode |
|-------|-------|-----------|
| `text-foreground` | Primary text (default) | Auto |
| `text-muted-foreground` | Secondary text | Auto |
| `text-primary` | Links, emphasis | Same |
| `text-primary-foreground` | Text on primary BG | Same |
| `opacity-90` | Subdued on primary BG | N/A |

---

## WordPress Mapping

### Block Theme Equivalents

In WordPress, these sections would map to:

1. **Core Group Block** with background settings
2. **Core Cover Block** for hero sections
3. **Custom pattern compositions** in `patterns/*.php`
4. **Template part variations** in `parts/*.html`

### theme.json Alignment

Section styles should align with `theme.json` settings:

```json
{
  "settings": {
    "color": {
      "palette": [
        { "slug": "background", "color": "rgba(255, 255, 255, 1)" },
        { "slug": "foreground", "color": "rgba(9, 9, 9, 1)" },
        { "slug": "primary", "color": "rgba(74, 115, 17, 1)" },
        { "slug": "muted", "color": "rgba(225, 225, 225, 1)" }
      ]
    },
    "spacing": {
      "padding": true,
      "margin": true,
      "units": ["px", "rem", "vh"]
    }
  }
}
```

---

## Pattern Component Section Backgrounds

### Current Pattern Component Defaults

**Hero Pattern**
- Default background: `bg-muted`
- Usage: All hero sections (page headers)
- Typical position: First section on page

**EditorialContent Pattern**
- Default background: `bg-muted`
- Can be overridden: `<EditorialContent className="bg-background" .../>`
- Usage: Long-form narrative content

**FAQ Pattern**
- Default background: `bg-background`
- Usage: Question and answer sections
- Works well alternating with `bg-muted` sections

**CTA Pattern**
- Default background: `bg-primary/5 dark:bg-primary/10`
- Usage: Call-to-action sections (usually page end)
- Provides subtle brand color emphasis

**FastFacts Pattern**
- Default background: `bg-muted`
- Usage: Statistics and key figures
- Visual emphasis through background

**CardGrid Pattern**
- No default background (inherits from parent section)
- Must be wrapped in `<section>` with appropriate background

---

## Complete Page Examples

### Example 1: About Page (Proper Alternation)

```tsx
export function AboutPage() {
  return (
    <>
      {/* 1. Hero: bg-muted */}
      <Hero
        title="About Us"
        intro="Our story and mission"
        image="..."
      />

      {/* 2. Editorial: bg-background (override default) */}
      <EditorialContent
        className="bg-background"
        content={`<h2>Our Story</h2><p>...</p>`}
      />

      {/* 3. Fast Facts: bg-muted */}
      <FastFacts facts={[...]} />

      {/* 4. Team Grid: bg-background */}
      <section className="py-12 md:py-16 bg-background">
        <Container>
          <h2>Meet Our Team</h2>
          <CardGrid>{/* team cards */}</CardGrid>
        </Container>
      </section>

      {/* 5. FAQ: bg-background (but could use bg-muted if previous was bg-background) */}
      <FAQ items={FAQ_COMPANY} title="FAQs" />

      {/* 6. CTA: bg-primary/5 */}
      <CTA title="Get in Touch" primaryAction={{...}} />
    </>
  );
}
```

**Section Flow:**
1. bg-muted (Hero)
2. bg-background (Editorial)
3. bg-muted (FastFacts)
4. bg-background (Team)
5. bg-background (FAQ) - Note: Same as previous, but acceptable if distinct content
6. bg-primary/5 (CTA)

**Better alternation:**
```tsx
{/* 5. FAQ: Use bg-muted to alternate */}
<FAQ items={FAQ_COMPANY} title="FAQs" className="bg-muted" />
```

---

### Example 2: Contact Page (Proper Alternation)

```tsx
export function ContactPage() {
  return (
    <>
      {/* 1. Hero: bg-muted */}
      <Hero title="Get in Touch" intro="..." />

      {/* 2. Contact Info: bg-background */}
      <section className="py-12 md:py-16 bg-background">
        <Container>
          {/* Contact details */}
        </Container>
      </section>

      {/* 3. Editorial: bg-muted (default) */}
      <EditorialContent content={`<h2>Visit Us</h2>...`} />

      {/* 4. FAQ: bg-background */}
      <FAQ items={FAQ_CONTACT} title="Contact FAQs" />

      {/* 5. CTA: bg-primary/5 */}
      <CTA title="Call Us" primaryAction={{...}} />
    </>
  );
}
```

**Section Flow:**
1. bg-muted
2. bg-background
3. bg-muted
4. bg-background
5. bg-primary/5

**Perfect alternation!**

---

### Example 3: FAQ Page (Multiple FAQ Sections)

```tsx
export function FAQPage() {
  return (
    <>
      {/* 1. Hero: bg-muted */}
      <Hero title="Frequently Asked Questions" />

      {/* 2-7. Alternating FAQ sections */}
      <FAQ items={FAQ_GENERAL} title="General" />        {/* bg-background */}
      <FAQ items={FAQ_TOURS} title="Tours" className="bg-muted" />
      <FAQ items={FAQ_DESTINATIONS} title="Destinations" /> {/* bg-background */}
      <FAQ items={FAQ_ACCOMMODATION} title="Lodges" className="bg-muted" />
      <FAQ items={FAQ_BOOKING} title="Booking" />        {/* bg-background */}
      <FAQ items={FAQ_LOGISTICS} title="Travel" className="bg-muted" />

      {/* 8. CTA: bg-primary/5 */}
      <CTA title="Still Have Questions?" primaryAction={{...}} />
    </>
  );
}
```

**Section Flow:**
1. bg-muted (Hero)
2. bg-background (FAQ 1)
3. bg-muted (FAQ 2)
4. bg-background (FAQ 3)
5. bg-muted (FAQ 4)
6. bg-background (FAQ 5)
7. bg-muted (FAQ 6)
8. bg-primary/5 (CTA)

**Perfect alternation using className overrides!**

---

## Pattern Override Guidelines

### When to Override Pattern Defaults

**Override Required:**
- When two consecutive sections would have the same background
- When visual hierarchy needs adjustment
- When emphasizing/de-emphasizing specific content

**How to Override:**

```tsx
// EditorialContent - override from bg-muted to bg-background
<EditorialContent className="bg-background" content={...} />

// FAQ - override from bg-background to bg-muted
<FAQ items={...} className="bg-muted" />

// Any pattern - add custom background
<SomePattern className="bg-muted/30" />
```

**Never Override:**
- Hero (always bg-muted for consistency)
- CTA (always bg-primary/5 for brand emphasis)

---

## Section Background Checklist

When building a new page template:

- [ ] First section is Hero with bg-muted
- [ ] Sections alternate between bg-background and bg-muted
- [ ] No two consecutive sections have identical backgrounds (unless intentional)
- [ ] Last section before footer is CTA with bg-primary/5
- [ ] All custom sections have explicit background classes
- [ ] Pattern components have className overrides where needed
- [ ] Dark mode colors are tested and legible
- [ ] Text colors use semantic tokens (text-foreground, text-muted-foreground)
- [ ] Borders use border-border for dark mode compatibility

---

## Dark Mode Section Testing

### Test Checklist for Each Section

**Text Legibility:**
- [ ] Headings are readable (text-foreground)
- [ ] Body text is readable (text-muted-foreground or text-foreground)
- [ ] Links are distinguishable and readable
- [ ] Focus states are visible

**Backgrounds:**
- [ ] bg-background renders correctly in both modes
- [ ] bg-muted renders correctly in both modes
- [ ] bg-muted/30 provides subtle differentiation
- [ ] bg-card works on both bg-background and bg-muted parents

**Borders & Separators:**
- [ ] border-border is visible in both modes
- [ ] Dividers and separators are visible
- [ ] Card borders stand out from backgrounds

**Interactive Elements:**
- [ ] Buttons maintain proper contrast
- [ ] Links have visible hover states
- [ ] Focus rings are visible (ring-ring)
- [ ] Disabled states are distinguishable

---

## Common Section Mistakes & Fixes

### Mistake 1: No Background Specified

❌ **Wrong:**
```tsx
<section className="py-12">
  <Container>
    <h2>Content</h2>
  </Container>
</section>
```

✅ **Correct:**
```tsx
<section className="py-12 md:py-16 bg-background">
  <Container>
    <h2>Content</h2>
  </Container>
</section>
```

---

### Mistake 2: Consecutive Identical Backgrounds

❌ **Wrong:**
```tsx
<EditorialContent content={...} />        {/* bg-muted */}
<FAQ items={...} className="bg-muted" />  {/* bg-muted */}
```

✅ **Correct:**
```tsx
<EditorialContent content={...} />  {/* bg-muted */}
<FAQ items={...} />                 {/* bg-background */}
```

---

### Mistake 3: Using Hardcoded Colors

❌ **Wrong:**
```tsx
<section className="py-12 bg-gray-100 dark:bg-gray-800">
```

✅ **Correct:**
```tsx
<section className="py-12 md:py-16 bg-muted">
```

---

### Mistake 4: Forgetting Container

❌ **Wrong:**
```tsx
<section className="py-12 bg-background">
  <h2>Content</h2>
  <p>Text</p>
</section>
```

✅ **Correct:**
```tsx
<section className="py-12 md:py-16 bg-background">
  <Container>
    <h2>Content</h2>
    <p>Text</p>
  </Container>
</section>
```

---

### Mistake 5: Inconsistent Padding

❌ **Wrong:**
```tsx
<section className="py-8 bg-background">      {/* Too small */}
<section className="py-24 bg-muted">          {/* Too large */}
```

✅ **Correct:**
```tsx
<section className="py-12 md:py-16 bg-background">  {/* Standard */}
<section className="py-12 md:py-20 bg-muted">        {/* Hero */}
```

---

## WordPress Block Theme Alignment

### How Sections Map to WordPress

**React Section:**
```tsx
<section className="py-12 md:py-16 bg-muted">
  <Container>
    <h2>Section Title</h2>
    <p>Content</p>
  </Container>
</section>
```

**WordPress Equivalent (block markup):**
```html
<!-- wp:group {"style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem"}}},"backgroundColor":"muted"} -->
<div class="wp-block-group has-muted-background-color has-background">
  <!-- wp:heading -->
  <h2>Section Title</h2>
  <!-- /wp:heading -->
  
  <!-- wp:paragraph -->
  <p>Content</p>
  <!-- /wp:paragraph -->
</div>
<!-- /wp:group -->
```

**WordPress theme.json:**
```json
{
  "settings": {
    "color": {
      "palette": [
        {
          "slug": "background",
          "color": "#ffffff",
          "name": "Background"
        },
        {
          "slug": "muted",
          "color": "#e1e1e1",
          "name": "Muted"
        }
      ]
    },
    "spacing": {
      "padding": {
        "top": "3rem",
        "bottom": "3rem"
      }
    }
  }
}
```

**Key Mapping:**
- React `bg-background` → WordPress `has-background-background-color`
- React `bg-muted` → WordPress `has-muted-background-color`
- React `py-12` → WordPress spacing preset
- React `Container` → WordPress `alignwide` or `alignfull` constraint

---

## Version History

**1.1** - December 26, 2024
- Added pattern component default backgrounds
- Added complete page examples
- Added pattern override guidelines
- Added section background checklist
- Added dark mode testing checklist
- Added common mistakes and fixes
- Added WordPress block theme mapping
- Added FAQ page multiple section example

**1.0** - December 25, 2024
- Initial section style guidelines
- Dark mode documentation
- Accessibility requirements
- Common mistakes and fixes
- WordPress alignment notes
