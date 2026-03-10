# Typography Scaling Responsive Guidelines

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Part of:** Ash Shaw Makeup Portfolio Design System

## Overview

This document defines how typography scales and adapts across different device sizes, ensuring optimal readability and visual hierarchy on all screens from mobile phones to large desktop displays.

## Table of Contents

1. [Fluid Typography System](#fluid-typography-system)
2. [Device-Specific Scaling](#device-specific-scaling)
3. [Heading Hierarchy](#heading-hierarchy)
4. [Body Text Scaling](#body-text-scaling)
5. [Line Height Adjustments](#line-height-adjustments)
6. [Letter Spacing](#letter-spacing)
7. [Reading Width](#reading-width)
8. [Implementation Patterns](#implementation-patterns)

---

## Fluid Typography System

### Core Principle

All typography uses CSS `clamp()` for fluid scaling between minimum and maximum sizes:

```css
font-size: clamp([min-size], [preferred-size], [max-size]);
```

**Benefits:**
- ✅ Smooth scaling across all viewport widths
- ✅ No sudden jumps at breakpoints
- ✅ Optimal readability at every size
- ✅ Reduces need for media queries

### Scaling Formula

```
Viewport contribution = (max-size - min-size) / (max-viewport - min-viewport) * 100
```

**Example: Hero H1**
```css
/* clamp(36px @ 320px → 120px @ 1920px) */
.text-hero-h1 {
  font-size: clamp(2.25rem, 2.25rem + 5.25vw, 7.5rem);
}
```

---

## Device-Specific Scaling

### Mobile (320px - 767px)

**Typography Priorities:**
- ✅ Maximum readability in limited space
- ✅ Touch-friendly line heights
- ✅ Shorter line lengths for scanning
- ✅ Larger tap targets for links

**Scaling Behavior:**
```css
/* Headings scale from minimum size */
.text-hero-h1      { font-size: clamp(2.25rem, 6vw, 7.5rem); }    /* 36px → 46px */
.text-section-h2   { font-size: clamp(1.5rem, 4vw, 3rem); }       /* 24px → 30px */
.text-subsection-h3 { font-size: clamp(1.25rem, 3vw, 2rem); }     /* 20px → 24px */

/* Body text optimized for mobile reading */
.text-body-guideline { font-size: clamp(1rem, 1.5vw, 1.25rem); }  /* 16px → 18px */
```

**Mobile-Specific Adjustments:**
```css
/* Increase line height for easier reading */
.mobile-line-height {
  line-height: 1.6; /* vs 1.5 on desktop */
}

/* Reduce letter spacing on condensed screens */
.mobile-letter-spacing {
  letter-spacing: -0.01em;
}
```

### Tablet (768px - 1023px)

**Typography Priorities:**
- ✅ Balanced hierarchy
- ✅ Comfortable reading for both orientations
- ✅ Efficient use of medium-sized screen space
- ✅ Prepare for desktop-like layouts

**Scaling Behavior:**
```css
/* Headings in mid-range */
.text-hero-h1      { font-size: clamp(2.25rem, 6vw, 7.5rem); }    /* 46px → 61px */
.text-section-h2   { font-size: clamp(1.5rem, 4vw, 3rem); }       /* 30px → 40px */
.text-subsection-h3 { font-size: clamp(1.25rem, 3vw, 2rem); }     /* 24px → 30px */

/* Body text approaching desktop comfort */
.text-body-guideline { font-size: clamp(1rem, 1.5vw, 1.25rem); }  /* 18px → 19px */
```

**Tablet-Specific Considerations:**
```css
/* Portrait vs Landscape */
@media (orientation: portrait) {
  /* Larger text for vertical reading */
  .tablet-portrait-text {
    font-size: 1.1em;
  }
}

@media (orientation: landscape) {
  /* Optimize for horizontal scanning */
  .tablet-landscape-text {
    line-height: 1.5;
  }
}
```

### Desktop (1024px+)

**Typography Priorities:**
- ✅ Maximum visual impact
- ✅ Comfortable long-form reading
- ✅ Clear hierarchy with ample spacing
- ✅ Sophisticated typography details

**Scaling Behavior:**
```css
/* Headings at maximum size */
.text-hero-h1      { font-size: clamp(2.25rem, 6vw, 7.5rem); }    /* 61px → 120px */
.text-section-h2   { font-size: clamp(1.5rem, 4vw, 3rem); }       /* 40px → 48px */
.text-subsection-h3 { font-size: clamp(1.25rem, 3vw, 2rem); }     /* 30px → 32px */

/* Body text at optimal reading size */
.text-body-guideline { font-size: clamp(1rem, 1.5vw, 1.25rem); }  /* 19px → 20px */
```

**Desktop-Specific Enhancements:**
```css
/* Enhanced typography details */
.desktop-typography {
  letter-spacing: -0.02em;    /* Optical adjustment for large text */
  font-feature-settings: 
    "kern" 1,                  /* Kerning */
    "liga" 1,                  /* Ligatures */
    "calt" 1;                  /* Contextual alternates */
}
```

---

## Heading Hierarchy

### H1 - Hero Titles

**Purpose:** Primary page headings, maximum visual impact

```css
.text-hero-h1 {
  font-family: var(--font-title);     /* Righteous */
  font-size: clamp(2.25rem, 6vw, 7.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
```

**Responsive Behavior:**
- **Mobile (320px):** 36px - Fits within screen, remains impactful
- **Tablet (768px):** 46px - Balanced presence without overwhelming
- **Desktop (1440px):** 86px - Maximum drama and visual hierarchy
- **Large Desktop (1920px+):** 120px - Caps at maximum for readability

**Usage Example:**
```tsx
<h1 className="text-hero-h1 font-title font-bold text-gradient-pink-purple-blue dark:text-purple-100">
  Ash Shaw
</h1>
```

### H2 - Section Headers

**Purpose:** Major section divisions, primary content organization

```css
.text-section-h2 {
  font-family: var(--font-heading);   /* Playfair Display */
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
}
```

**Responsive Behavior:**
- **Mobile (320px):** 24px - Clear hierarchy below H1
- **Tablet (768px):** 30px - Strong section presence
- **Desktop (1440px):** 57px - Commanding section headers
- **Large Desktop (1920px+):** 48px - Optimal for scanning

### H3 - Subsection Headers

**Purpose:** Content subsections, secondary organization

```css
.text-subsection-h3 {
  font-family: var(--font-heading);   /* Playfair Display */
  font-size: clamp(1.25rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
}
```

**Responsive Behavior:**
- **Mobile (320px):** 20px - Readable subdivision
- **Tablet (768px):** 24px - Clear subsection markers
- **Desktop (1440px):** 43px - Prominent organization
- **Large Desktop (1920px+):** 32px - Balanced hierarchy

### H4 - Card Titles

**Purpose:** Component headings, card titles, list headers

```css
.text-card-title {
  font-family: var(--font-heading);   /* Playfair Display */
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  font-weight: 600;
  line-height: 1.3;
}
```

**Responsive Behavior:**
- **Mobile (320px):** 18px - Compact but readable
- **Tablet (768px):** 20px - Strong card presence
- **Desktop (1440px):** 28px - Prominent component headings
- **Large Desktop (1920px+):** 24px - Balanced in layouts

---

## Body Text Scaling

### Primary Body Text

**Purpose:** Main content, paragraphs, descriptions

```css
.text-body-guideline {
  font-family: var(--font-body);      /* Inter */
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: normal;
}
```

**Responsive Behavior:**
- **Mobile (320px):** 16px - Standard reading size
- **Tablet (768px):** 18px - Comfortable reading
- **Desktop (1440px):** 21px - Optimal desktop reading
- **Large Desktop (1920px+):** 20px - Prevents text from becoming too large

**Optimal Line Length:**
```css
/* Constrain reading width for comfort */
.reading-width {
  max-width: 65ch;  /* 65 characters per line */
}
```

### Small Text

**Purpose:** Captions, metadata, fine print

```css
.text-fluid-sm {
  font-family: var(--font-body);      /* Inter */
  font-size: clamp(0.875rem, 1.25vw, 1rem);
  font-weight: 400;
  line-height: 1.5;
}
```

**Responsive Behavior:**
- **Mobile (320px):** 14px - Minimum legible size
- **Tablet (768px):** 15px - Clear metadata
- **Desktop (1440px+):** 16px - Standard small text

### Button Text

**Purpose:** CTAs, interactive elements

```css
.text-button-fluid {
  font-family: var(--font-body);      /* Inter */
  font-size: clamp(1rem, 1.25vw, 1.125rem);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.01em;
}
```

**Responsive Behavior:**
- **Mobile (320px):** 16px - Large touch targets
- **Tablet (768px):** 17px - Prominent CTAs
- **Desktop (1440px+):** 18px - Clear call to action

---

## Line Height Adjustments

### Heading Line Heights

**Purpose:** Tight leading for visual impact, scalable spacing

```css
/* Hero titles - tightest */
.text-hero-h1 {
  line-height: 1.1;  /* Dramatic impact */
}

/* Section headers - balanced */
.text-section-h2 {
  line-height: 1.2;  /* Clear but compact */
}

/* Subsections - readable */
.text-subsection-h3 {
  line-height: 1.3;  /* Comfortable hierarchy */
}

/* Card titles - friendly */
.text-card-title {
  line-height: 1.4;  /* Multi-line friendly */
}
```

### Body Line Heights

**Purpose:** Optimal reading comfort across devices

```css
/* Standard body text */
.text-body-guideline {
  line-height: 1.6;  /* Optimal for sustained reading */
}

/* Long-form content */
.text-longform {
  line-height: 1.7;  /* Extra breathing room */
}

/* Compact lists */
.text-compact {
  line-height: 1.5;  /* Efficient vertical space */
}
```

**Mobile Adjustments:**
```css
@media (max-width: 767px) {
  /* Increase line height on mobile for easier reading */
  .text-body-guideline {
    line-height: 1.65;
  }
}
```

---

## Letter Spacing

### Display Text (Large Headlines)

**Purpose:** Optical adjustments for large text

```css
/* Large hero text needs tighter tracking */
.text-hero-h1 {
  letter-spacing: -0.02em;  /* Pull letters together */
}

/* Section headers slightly tight */
.text-section-h2 {
  letter-spacing: -0.015em;
}

/* Subsections minimal adjustment */
.text-subsection-h3 {
  letter-spacing: -0.01em;
}
```

**Why Negative Tracking?**
- Large text appears spaced out optically
- Negative tracking improves visual cohesion
- Creates more impactful, professional appearance

### Body Text (Reading Content)

**Purpose:** Maximum readability

```css
/* Body text uses normal spacing */
.text-body-guideline {
  letter-spacing: normal;  /* Browser default */
}

/* Small text needs slight opening */
.text-fluid-sm {
  letter-spacing: 0.005em;  /* Improve legibility */
}
```

### Button Text (Interactive Elements)

**Purpose:** Clear, scannable CTAs

```css
/* Buttons use slight positive tracking */
.text-button-fluid {
  letter-spacing: 0.01em;  /* Improve scannability */
}

/* All-caps buttons need more space */
.button-uppercase {
  letter-spacing: 0.05em;  /* Prevent cramping */
}
```

---

## Reading Width

### Optimal Line Length

**Purpose:** Maintain comfortable reading regardless of viewport width

**The 65-Character Rule:**
- Ideal line length: **45-75 characters**
- Optimal: **65 characters per line**
- Prevents eye strain and improves comprehension

### Implementation

```css
/* Constrain reading width */
.reading-container {
  max-width: 65ch;      /* 65 characters */
  margin-left: auto;
  margin-right: auto;
}

/* Blog posts and articles */
.article-content {
  max-width: 70ch;      /* Slightly wider for comfort */
}

/* Narrow reading column */
.narrow-reading {
  max-width: 55ch;      /* Focused reading */
}
```

### Responsive Reading Width

```css
/* Mobile: Full width with padding */
@media (max-width: 767px) {
  .reading-container {
    max-width: 100%;
    padding-left: var(--spacing-fluid-md);
    padding-right: var(--spacing-fluid-md);
  }
}

/* Tablet: Start constraining */
@media (min-width: 768px) and (max-width: 1023px) {
  .reading-container {
    max-width: 65ch;
  }
}

/* Desktop: Optimal width */
@media (min-width: 1024px) {
  .reading-container {
    max-width: 70ch;
  }
}
```

---

## Implementation Patterns

### Component Pattern: Hero Section

```tsx
export function HeroSection() {
  return (
    <section className="py-fluid-2xl">
      <div className="container mx-auto px-fluid-md">
        {/* Hero title - fluid scaling */}
        <h1 className="text-hero-h1 font-title font-bold text-gradient-pink-purple-blue dark:text-purple-100 mb-fluid-md text-center lg:text-left">
          Ash Shaw
        </h1>
        
        {/* Tagline - responsive sizing */}
        <p className="text-fluid-xl font-body font-normal text-gray-700 dark:text-purple-200 mb-fluid-lg text-center lg:text-left max-w-3xl">
          Makeup that shines with colour, energy, and connection.
        </p>
        
        {/* Body text - constrained width */}
        <div className="reading-container">
          <p className="text-body-guideline font-body font-normal text-gray-600 dark:text-purple-300 leading-relaxed">
            Detailed description content here...
          </p>
        </div>
      </div>
    </section>
  );
}
```

### Component Pattern: Blog Post

```tsx
export function BlogPost() {
  return (
    <article className="container mx-auto px-fluid-md py-fluid-lg">
      {/* Article title */}
      <h1 className="text-section-h2 font-heading font-bold text-gray-800 dark:text-purple-100 mb-fluid-md">
        Festival Makeup Guide 2025
      </h1>
      
      {/* Article content with optimal reading width */}
      <div className="article-content">
        <p className="text-body-guideline font-body font-normal text-gray-700 dark:text-purple-200 leading-relaxed mb-fluid-md">
          Long-form content with optimal line length...
        </p>
        
        <h2 className="text-subsection-h3 font-heading font-semibold text-gray-800 dark:text-purple-100 mt-fluid-lg mb-fluid-md">
          Subsection Title
        </h2>
        
        <p className="text-body-guideline font-body font-normal text-gray-700 dark:text-purple-200 leading-relaxed">
          More content...
        </p>
      </div>
    </article>
  );
}
```

### Component Pattern: Card Grid

```tsx
export function PortfolioGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-md">
      {items.map((item) => (
        <article key={item.id} className="bg-white dark:bg-purple-900 rounded-xl p-fluid-md">
          {/* Card title - scales with viewport */}
          <h3 className="text-card-title font-heading font-semibold text-gray-800 dark:text-purple-100 mb-fluid-sm line-clamp-2">
            {item.title}
          </h3>
          
          {/* Card description - readable size */}
          <p className="text-body-guideline font-body font-normal text-gray-600 dark:text-purple-300 line-clamp-3">
            {item.description}
          </p>
          
          {/* Metadata - small text */}
          <div className="flex items-center gap-fluid-sm mt-fluid-sm">
            <span className="text-fluid-sm font-body text-gray-500 dark:text-purple-400">
              {item.category}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
```

---

## Testing Checklist

### Typography Scaling Validation

- [ ] **Mobile (320px):** All text readable without zooming
- [ ] **Mobile (375px):** Comfortable reading on standard phones
- [ ] **Tablet (768px):** Clear hierarchy without crowding
- [ ] **Tablet (1024px):** Balanced scaling between mobile and desktop
- [ ] **Desktop (1440px):** Optimal visual impact and readability
- [ ] **Large Desktop (1920px+):** Text doesn't become too large

### Line Length Validation

- [ ] **Body text:** 45-75 characters per line
- [ ] **Blog articles:** 55-70 characters per line
- [ ] **Narrow content:** Not less than 45 characters
- [ ] **Wide viewports:** Max-width constraints working

### Accessibility Validation

- [ ] **Minimum size:** No text smaller than 14px
- [ ] **Line height:** Minimum 1.5 for body text
- [ ] **Contrast:** All text meets WCAG AAA standards
- [ ] **Zoom:** Text scales properly up to 200%

---

## Related Documentation

- **[Breakpoints Guide](./breakpoints.md)** - Responsive breakpoint system
- **[Typography Tokens](../design-tokens/typography.md)** - Complete typography scale
- **[Spacing Adjustments](./spacing-adjustments.md)** - Responsive spacing patterns
- **[Layout Patterns](./layout-patterns.md)** - Responsive layout strategies

---

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Maintained by:** Ash Shaw Portfolio Team
