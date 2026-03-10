# Typography Verification Guidelines

**Version:** 1.0  
**Last Updated:** December 25, 2024

This document provides **comprehensive typography verification rules** for the LightSpeed Tour Operator prototype to ensure consistency with the design system and WordPress theme architecture.

---

## Table of Contents

1. [Overview](#overview)
2. [Design System Typography](#design-system-typography)
3. [Verification Checklist](#verification-checklist)
4. [Common Typography Mistakes](#common-typography-mistakes)
5. [Acceptable Exceptions](#acceptable-exceptions)
6. [Template-Specific Standards](#template-specific-standards)
7. [Typography Audit Process](#typography-audit-process)
8. [Fixing Typography Issues](#fixing-typography-issues)

---

## Overview

### Core Principle

**Let semantic HTML handle typography defaults. Only override when intentionally deviating.**

The design system provides automatic typography styling via CSS variables in `/src/styles/theme.css`. These styles apply to semantic HTML elements (`h1`, `h2`, `h3`, `h4`, `p`, `label`, `button`, `input`) automatically.

---

### Typography Philosophy

1. **Semantic HTML First** - Use `<h1>`, `<h2>`, `<p>` without size/weight classes
2. **CSS Variables for Overrides** - Use inline styles with CSS variables when needed
3. **Consistency Over Customization** - Don't create one-off sizes
4. **Accessibility** - Proper heading hierarchy (h1 → h2 → h3)
5. **Responsive** - Typography adapts via CSS variables

---

## Design System Typography

### Automatic Element Styles

Defined in `/src/styles/theme.css`:

```css
:where(:not(:has([class*=" text-"]), :not(:has([class^="text-\\"])))) {
  h1 {
    font-family: var(--font-family-lora);
    font-size: var(--text-4xl);      /* 48px */
    font-weight: var(--font-weight-semibold);  /* 600 */
    line-height: 1.25;
  }

  h2 {
    font-family: var(--font-family-lora);
    font-size: var(--text-2xl);      /* 36px */
    font-weight: var(--font-weight-semibold);  /* 600 */
    line-height: 1.25;
  }

  h3 {
    font-family: var(--font-family-lora);
    font-size: var(--text-xl);       /* 24px */
    font-weight: var(--font-weight-semibold);  /* 600 */
    line-height: 1.25;
  }

  h4 {
    font-family: var(--font-family-lora);
    font-size: var(--text-lg);       /* 20px */
    font-weight: var(--font-weight-semibold);  /* 600 */
    line-height: 1.25;
  }

  p {
    font-family: var(--font-family-noto-sans);
    font-size: var(--text-base);     /* 16px */
    font-weight: var(--font-weight-normal);    /* 400 */
    line-height: 1.5;
  }

  label {
    font-family: var(--font-family-lora);
    font-size: var(--text-base);     /* 16px */
    font-weight: var(--font-weight-medium);    /* 500 */
    line-height: 1.5;
  }

  button {
    font-family: var(--font-family-noto-sans);
    font-size: var(--text-base);     /* 16px */
    font-weight: var(--font-weight-medium);    /* 500 */
    line-height: 1.5;
  }

  input {
    font-family: var(--font-family-noto-sans);
    font-size: var(--text-base);     /* 16px */
    font-weight: var(--font-weight-normal);    /* 400 */
    line-height: 1.5;
  }
}
```

---

### CSS Variables Reference

**Font Families:**
- `--font-family-lora` - Serif (headings, labels)
- `--font-family-noto-sans` - Sans-serif (body, UI)

**Font Sizes:**
- `--text-4xl` - 48px (h1)
- `--text-2xl` - 36px (h2)
- `--text-xl` - 24px (h3)
- `--text-lg` - 20px (h4, larger body text)
- `--text-base` - 16px (default body, buttons, inputs)

**Font Weights:**
- `--font-weight-normal` - 400 (body text)
- `--font-weight-medium` - 500 (labels, buttons)
- `--font-weight-semibold` - 600 (headings)

---

## Verification Checklist

### 1. Headings Compliance

**Check all `<h1>`, `<h2>`, `<h3>`, `<h4>` tags:**

- [ ] **No Tailwind text size classes** (`text-xl`, `text-2xl`, `text-4xl`)
- [ ] **No Tailwind font weight classes** (`font-bold`, `font-semibold`)
- [ ] **No inline fontSize in style attribute** (unless intentional exception)
- [ ] **Proper heading hierarchy** (only one h1 per page, logical h2 → h3 progression)
- [ ] **Utility classes only for spacing/color** (`mb-4`, `text-primary`)

✅ **Correct:**
```tsx
<h1>Page Title</h1>
<h2 className="mb-4">Section Title</h2>
<h3 className="mb-2 text-primary">Subsection</h3>
```

❌ **Incorrect:**
```tsx
<h1 className="text-4xl font-bold">Page Title</h1>
<h2 className="text-2xl font-semibold mb-4">Section Title</h2>
<h3 style={{ fontSize: '24px', fontWeight: 600 }}>Subsection</h3>
```

---

### 2. Paragraph Text Compliance

**Check all `<p>` tags:**

- [ ] **No Tailwind text size classes** (use semantic `<p>` tag)
- [ ] **Color classes allowed** (`text-muted-foreground`, `text-foreground`)
- [ ] **Spacing classes allowed** (`mb-4`, `mb-6`)
- [ ] **Utility classes allowed** (`line-clamp-2`, `max-w-3xl`)

✅ **Correct:**
```tsx
<p className="text-muted-foreground mb-6">Description text</p>
<p className="max-w-3xl mx-auto">Centered text with max width</p>
```

❌ **Incorrect:**
```tsx
<p className="text-lg font-medium">This overrides defaults</p>
<p style={{ fontSize: '18px' }}>Hardcoded size</p>
```

---

### 3. Inline Style Overrides

**When you MUST override (e.g., larger intro text):**

- [ ] **Use CSS variables** (not hardcoded values)
- [ ] **Include all properties** (family, size, lineHeight if needed)
- [ ] **Document why** (comment explaining deviation)

✅ **Correct:**
```tsx
{/* Larger intro text for hero sections */}
<p 
  className="text-muted-foreground" 
  style={{ 
    fontFamily: 'var(--font-family-noto-sans)', 
    fontSize: 'var(--text-lg)', 
    lineHeight: '1.75' 
  }}
>
  Hero introduction text
</p>
```

❌ **Incorrect:**
```tsx
<p style={{ fontSize: '20px', fontFamily: 'Noto Sans' }}>
  Hardcoded values
</p>
```

---

### 4. Acceptable Hardcoded Sizes

**Very few cases allow Tailwind text classes:**

- [ ] **Pricing displays** (`text-xl`, `text-2xl`)
- [ ] **Utility labels** (`text-xs`, `text-sm`)
- [ ] **Badge/tag text** (`text-xs`, `text-sm`)
- [ ] **Metadata** (dates, counts) (`text-sm`)

✅ **Acceptable:**
```tsx
<span className="text-2xl font-semibold text-primary">$2,500</span>
<span className="text-xs text-muted-foreground">Posted 2 days ago</span>
<span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
  Featured
</span>
```

---

### 5. Dark Mode Typography

**Check all text has proper dark mode colors:**

- [ ] **No hardcoded gray text** (e.g., `text-gray-600`)
- [ ] **Use semantic color tokens** (`text-foreground`, `text-muted-foreground`)
- [ ] **Primary backgrounds use opacity** (not `text-muted-foreground`)
- [ ] **Test legibility in dark mode**

✅ **Correct:**
```tsx
{/* Default section */}
<p className="text-muted-foreground">Secondary text</p>

{/* Primary section */}
<section className="bg-primary text-primary-foreground">
  <p className="opacity-90">Subdued text on primary</p>
</section>
```

❌ **Incorrect:**
```tsx
<p className="text-gray-600">Won't adapt to dark mode</p>

<section className="bg-primary text-primary-foreground">
  <p className="text-muted-foreground">Wrong on primary background</p>
</section>
```

---

## Common Typography Mistakes

### Mistake 1: Overriding Heading Sizes

❌ **Problem:**
```tsx
<h2 className="text-xl font-bold">
  Section Title
</h2>
```

**Issues:**
- Overrides design system (h2 should be 36px, not 24px)
- Creates inconsistency across templates
- Harder to maintain global typography changes

✅ **Solution:**
```tsx
<h2 className="mb-4">
  Section Title
</h2>
```

**Result:**
- Automatically gets 36px, Lora, 600 weight
- Consistent across all templates
- Easy to update globally via theme.css

---

### Mistake 2: Hardcoded Body Text Sizes

❌ **Problem:**
```tsx
<p className="text-lg">
  This is regular body text
</p>
```

**Issues:**
- Creates visual inconsistency
- Defeats purpose of design system
- Body text should be 16px (--text-base)

✅ **Solution:**
```tsx
<p>
  This is regular body text
</p>
```

**OR, if intentionally larger (e.g., hero intro):**

```tsx
<p 
  className="text-muted-foreground"
  style={{ 
    fontFamily: 'var(--font-family-noto-sans)', 
    fontSize: 'var(--text-lg)', 
    lineHeight: '1.75' 
  }}
>
  Hero introduction text (intentionally larger)
</p>
```

---

### Mistake 3: Mixing Multiple Text Sizes

❌ **Problem:**
```tsx
<div>
  <p className="text-base">Paragraph 1</p>
  <p className="text-lg">Paragraph 2</p>
  <p>Paragraph 3</p>
  <p className="text-sm">Paragraph 4</p>
</div>
```

**Issues:**
- Inconsistent reading experience
- No clear typographic hierarchy
- Looks unprofessional

✅ **Solution:**
```tsx
<div>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
  <p>Paragraph 3</p>
  <p>Paragraph 4</p>
</div>
```

**OR, use hierarchy properly:**

```tsx
<div>
  <h3>Section Heading</h3>
  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-lg)' }}>
    Lead paragraph (larger)
  </p>
  <p>Regular paragraph</p>
  <p className="text-xs text-muted-foreground">Metadata (smaller)</p>
</div>
```

---

### Mistake 4: Plain HTML Headings in String Content

❌ **Problem:**
```tsx
<section>
  <h2>Our Story</h2>
  <p>We are a tour company...</p>
</section>
```

**If the h2 appears visually correct, this is GOOD, not a mistake!**

**Only a mistake if:**
- Using Typography component incorrectly
- Hardcoding sizes in the heading
- Breaking heading hierarchy

---

## Acceptable Exceptions

### 1. Product Pricing

**Use case:** Emphasizing price in product cards

✅ **Acceptable:**
```tsx
<span className="text-2xl font-semibold text-primary">
  $2,500
</span>
<span className="text-muted-foreground text-sm">
  per person
</span>
```

**Rationale:**
- Pricing needs visual emphasis
- Standard e-commerce pattern
- Not part of content hierarchy

---

### 2. Utility Text / Labels

**Use case:** Small metadata, timestamps, counts

✅ **Acceptable:**
```tsx
<div className="flex items-center gap-2 text-xs text-muted-foreground">
  <Clock className="w-3 h-3" />
  <span>Posted 2 hours ago</span>
</div>
```

**Rationale:**
- Utility information, not content
- Needs to be visually distinct (smaller)
- Standard UI pattern

---

### 3. Badges / Tags

**Use case:** Category badges, status indicators

✅ **Acceptable:**
```tsx
<span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
  Featured
</span>
```

**Rationale:**
- UI component, not content
- Needs compact display
- Standard badge pattern

---

### 4. Hero / Display Text

**Use case:** Extra-large hero text (use with caution)

✅ **Use CSS variables:**
```tsx
<h1 
  className="mb-6"
  style={{ fontSize: 'var(--text-4xl)' }}
>
  Massive Hero Title
</h1>
```

⚠️ **Caution:**
- Only for exceptional hero displays
- Must use CSS variables
- Document why size override needed

---

## Template-Specific Standards

### Tours Archive Template

**Expected typography:**

```tsx
{/* Hero Section */}
<section className="py-12 md:py-20 bg-muted">
  <Container>
    <h1 className="mb-4">Our Tours</h1> {/* 48px, Lora, 600 */}
    <p 
      className="text-muted-foreground" 
      style={{ fontSize: 'var(--text-lg)', lineHeight: '1.75' }}
    >
      Intro text (20px, larger than body)
    </p>
  </Container>
</section>

{/* Content Section */}
<section className="py-12 md:py-16">
  <Container>
    <h2 className="mb-6">Featured Tours</h2> {/* 36px, Lora, 600 */}
    {/* Card grid */}
  </Container>
</section>

{/* CTA Section */}
<section className="bg-primary text-primary-foreground py-12 md:py-16">
  <h2 className="mb-4">Ready to Book?</h2> {/* 36px, white */}
  <p 
    className="opacity-90"
    style={{ fontSize: 'var(--text-lg)', lineHeight: '1.75' }}
  >
    CTA description
  </p>
</section>
```

**Key points:**
- h1 in hero section (no size override)
- h2 for section titles
- Larger intro text uses CSS variables
- CTA text uses opacity (not muted color)

---

### Tour Single Template

**Expected typography:**

```tsx
{/* Hero */}
<h1 className="mb-4">{tour.title}</h1> {/* 48px */}
<p style={{ fontSize: 'var(--text-lg)' }}>
  {tour.excerpt}
</p> {/* 20px intro */}

{/* Content */}
<article className="prose">
  <h2>About This Tour</h2> {/* 36px */}
  <p>{tour.content}</p> {/* 16px */}
  
  <h3>Tour Highlights</h3> {/* 24px */}
  <ul>
    <li>Highlight 1</li>
  </ul>
</article>

{/* Itinerary */}
<h2>Day-by-Day Itinerary</h2> {/* 36px */}
<h3>Day 1: Arrival</h3> {/* 24px */}
<p>Itinerary description</p> {/* 16px */}
```

---

### About Page Template

**Expected typography:**

```tsx
{/* Hero */}
<h1 className="mb-6">About Us</h1> {/* 48px */}
<p style={{ fontSize: 'var(--text-lg)' }}>
  Intro paragraph
</p> {/* 20px */}

{/* Editorial Content */}
<h2>Our Story</h2> {/* 36px */}
<p>Company history...</p> {/* 16px */}

<h3>Our Approach</h3> {/* 24px */}
<p>Philosophy...</p> {/* 16px */}

{/* Team Section */}
<h2 className="mb-4">Meet Our Team</h2> {/* 36px */}
<p className="text-muted-foreground">
  Team introduction
</p> {/* 16px, muted */}
```

---

## Typography Audit Process

### Step 1: Visual Scan

**Look for obvious issues:**

1. Open template in browser
2. Look for text that seems too large/small
3. Check heading hierarchy makes visual sense
4. Verify consistent spacing

**Common visual red flags:**
- h2 looks same size as h3
- Body text varies in size
- Headings look too small/large

---

### Step 2: Code Search

**Search for problematic patterns:**

```bash
# Search for Tailwind text size classes
grep -r "text-xl\|text-2xl\|text-4xl\|text-lg" src/app/pages/*.tsx
grep -r "text-xl\|text-2xl\|text-4xl\|text-lg" src/app/templates/*.tsx

# Search for font weight classes
grep -r "font-bold\|font-semibold" src/app/pages/*.tsx

# Search for hardcoded fontSize
grep -r "fontSize:" src/app/pages/*.tsx
```

**Evaluate each result:**
- Is it on a heading? → Fix needed
- Is it on body text? → Fix needed
- Is it on pricing/metadata? → Acceptable exception

---

### Step 3: Template Review

**Check each template systematically:**

1. Hero section typography
2. Section headings (h2)
3. Subsection headings (h3, h4)
4. Body paragraphs
5. Card text
6. CTA sections
7. Footer text

**For each element, verify:**
- ✅ No Tailwind size/weight classes on semantic HTML
- ✅ Overrides use CSS variables
- ✅ Dark mode colors correct
- ✅ Heading hierarchy logical

---

### Step 4: Dark Mode Test

**Switch to dark mode:**

1. Click dark mode toggle
2. Review all text for legibility
3. Check breadcrumbs specifically
4. Check muted text isn't invisible
5. Check primary sections

**Common dark mode issues:**
- Breadcrumbs too faint
- Muted text too dark
- Hardcoded gray text invisible

---

## Fixing Typography Issues

### Fix Pattern 1: Remove Hardcoded Sizes from Headings

**Before:**
```tsx
<h2 className="text-2xl font-bold mb-4">
  Section Title
</h2>
```

**After:**
```tsx
<h2 className="mb-4">
  Section Title
</h2>
```

---

### Fix Pattern 2: Convert Text Classes to CSS Variables

**Before:**
```tsx
<p className="text-lg text-muted-foreground">
  Description
</p>
```

**After:**
```tsx
<p 
  className="text-muted-foreground"
  style={{ 
    fontFamily: 'var(--font-family-noto-sans)', 
    fontSize: 'var(--text-lg)', 
    lineHeight: '1.75' 
  }}
>
  Description (intentionally larger for hero intro)
</p>
```

**OR (if regular body text):**
```tsx
<p className="text-muted-foreground">
  Description
</p>
```

---

### Fix Pattern 3: Remove Inline fontSize

**Before:**
```tsx
<h3 style={{ fontSize: '24px', fontWeight: 600 }}>
  Subsection
</h3>
```

**After:**
```tsx
<h3 className="mb-2">
  Subsection
</h3>
```

---

### Fix Pattern 4: Convert Typography Component Overrides

**Before:**
```tsx
<Typography variant="h2" size="xl" className="mb-4">
  Section Title
</Typography>
```

**After:**
```tsx
<h2 className="mb-4">
  Section Title
</h2>
```

**Rationale:**
- Semantic HTML is simpler
- Design system handles styling
- No need for Typography component wrapper

---

## Verification Report Template

### Template Audit Report

**Template:** `ArchiveTourTemplate.tsx`  
**Date:** December 25, 2024  
**Status:** ✅ Compliant | 🟡 Minor Issues | 🔴 Major Issues

**Findings:**

| Element | Location | Issue | Fix |
|---------|----------|-------|-----|
| h1 | Line 35 | ✅ Correct | N/A |
| h2 | Line 64 | ✅ Correct | N/A |
| p (hero) | Line 38 | ✅ Uses CSS variables | N/A |
| p (CTA) | Line 67 | ✅ Uses CSS variables | N/A |

**Typography Compliance:** 100%

**Dark Mode:** ✅ All text legible

**Recommendations:** None

---

### Multi-Template Summary

**Total Templates Audited:** 10  
**Fully Compliant:** 6 (60%)  
**Minor Issues:** 3 (30%)  
**Major Issues:** 1 (10%)

**Issues Found:**
- 16 plain HTML headings (need verification, may be correct)
- 15+ hardcoded text sizes (need removal)
- 3 Typography components with size overrides

**Priority Fixes:**
1. Remove hardcoded sizes from headings
2. Convert body text to semantic `<p>` tags
3. Remove Typography component overrides

---

## WordPress Alignment

### theme.json Typography

**React CSS variables map to theme.json:**

```json
{
  "settings": {
    "typography": {
      "fontFamilies": [
        {
          "slug": "lora",
          "fontFamily": "Lora, serif",
          "name": "Lora"
        },
        {
          "slug": "noto-sans",
          "fontFamily": "Noto Sans, sans-serif",
          "name": "Noto Sans"
        }
      ],
      "fontSizes": [
        { "slug": "4xl", "size": "48px", "name": "4XL" },
        { "slug": "2xl", "size": "36px", "name": "2XL" },
        { "slug": "xl", "size": "24px", "name": "XL" },
        { "slug": "lg", "size": "20px", "name": "Large" },
        { "slug": "base", "size": "16px", "name": "Base" }
      ],
      "fontWeights": [
        { "slug": "normal", "weight": "400" },
        { "slug": "medium", "weight": "500" },
        { "slug": "semibold", "weight": "600" }
      ]
    }
  }
}
```

---

## WordPress 6.9 "Fit Text" Feature

**NEW in WordPress 6.9:** Typography system now supports the "Fit text to container" feature for creating high-impact, responsive headlines that automatically scale to fill their container width.

### Overview

The Fit Text feature enables dynamic font scaling for standout design moments:
- **Hero headlines** - Large, impactful page titles
- **Banners** - Eye-catching promotional sections
- **Callouts** - Attention-grabbing announcements
- **Featured content** - Pull quotes and testimonials

### Block Support

Initially available for:
- **Paragraph blocks** (`core/paragraph`)
- **Heading blocks** (`core/heading`)

### Verification Guidelines

When implementing fit-text behavior:

**✅ Correct implementation:**
```tsx
{/* Hero with fit-text headline */}
<div className="fit-text-container max-w-4xl mx-auto">
  <h1 className="fit-text">
    Discover the Land of Fire and Ice
  </h1>
</div>
```

**CSS Requirements:**
```css
.fit-text-container {
  container-type: inline-size;
  width: 100%;
}

.fit-text {
  font-family: var(--font-family-lora);
  font-weight: var(--font-weight-semibold);
  line-height: 1.1;
  font-size: clamp(2rem, 8vw, 12rem);
  width: 100%;
  text-align: center;
}
```

### Usage Checklist

- [ ] **Only on hero headlines** - Not on body text
- [ ] **Uses CSS variables** - Font family from design system
- [ ] **Uses clamp()** - Minimum and maximum sizes set
- [ ] **Container queries** - Proper container-type set
- [ ] **Accessibility tested** - Legible at all viewport sizes
- [ ] **Character limit** - Max 60-80 characters for readability

### Acceptable Use Cases

**✅ Good for:**
- Hero section main headlines
- Section intro banners
- Feature callout boxes
- Promotional overlays
- Landing page titles

**❌ Avoid for:**
- Body text (readability issues)
- Long paragraphs (too large)
- Navigation elements (inconsistent)
- Form labels (unpredictable sizing)
- Card titles in grids (layout breaks)

### Verification Test

**Test fit-text implementation:**

1. **Desktop (1920px):** Text should fill container width
2. **Tablet (768px):** Text should scale down proportionally
3. **Mobile (375px):** Text should be readable (min 2rem)
4. **Ultra-wide (2560px):** Text should not exceed max size (12rem)
5. **Dark mode:** Text should maintain legibility and contrast

### Common Mistakes

❌ **Problem: Fit text on body paragraphs**
```tsx
<p className="fit-text">
  Long description text that becomes unreadable...
</p>
```

**Fix:** Only use fit-text on short, impactful headlines:
```tsx
<h1 className="fit-text">
  Explore Iceland
</h1>
<p>
  Regular paragraph text at normal size
</p>
```

---

❌ **Problem: No minimum/maximum sizes**
```tsx
.fit-text {
  font-size: 8vw; /* Can be too small or too large */
}
```

**Fix:** Use clamp() for size constraints:
```tsx
.fit-text {
  font-size: clamp(2rem, 8vw, 12rem);
}
```

---

❌ **Problem: Hardcoded font families**
```tsx
.fit-text {
  font-family: 'Lora'; /* Not using CSS variable */
}
```

**Fix:** Use design system CSS variables:
```tsx
.fit-text {
  font-family: var(--font-family-lora);
  font-weight: var(--font-weight-semibold);
}
```

---

## Quick Reference

### Typography Checklist

**For every template page:**

- [ ] Only one h1 per page
- [ ] Logical heading hierarchy (h1 → h2 → h3)
- [ ] No Tailwind text sizes on headings
- [ ] No Tailwind font weights on headings
- [ ] Body text uses semantic `<p>` tags
- [ ] Overrides use CSS variables
- [ ] Dark mode text legible
- [ ] Breadcrumbs legible in both modes
- [ ] CTA sections use opacity (not muted)
- [ ] Pricing/metadata exceptions documented

### Color Tokens for Typography

| Token | Usage | Light | Dark |
|-------|-------|-------|------|
| `text-foreground` | Primary text | Near black | Near white |
| `text-muted-foreground` | Secondary text | Gray | Light gray |
| `text-primary` | Links, emphasis | Olive green | Olive green |
| `text-primary-foreground` | Text on primary BG | White | White |
| `opacity-90` | Subdued on primary | 90% opacity | 90% opacity |

---

## Version History

**1.0** - December 25, 2024
- Initial typography verification guidelines
- Design system reference
- Verification checklist
- Common mistakes documentation
- Acceptable exceptions
- Template-specific standards
- Audit process
- Fix patterns
- WordPress alignment