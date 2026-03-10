# 🚀 QUICK START GUIDE

**WordPress BEM CSS Architecture - Developer Guide**  
**Version:** 1.0  
**Last Updated:** February 24, 2026

---

## 📖 **TABLE OF CONTENTS**

1. [Getting Started](#getting-started)
2. [Architecture Overview](#architecture-overview)
3. [Creating New Components](#creating-new-components)
4. [Customizing Colors](#customizing-colors)
5. [Customizing Typography](#customizing-typography)
6. [Adding Component Variants](#adding-component-variants)
7. [Testing Checklist](#testing-checklist)
8. [Common Patterns](#common-patterns)
9. [Troubleshooting](#troubleshooting)

---

## 🏁 **GETTING STARTED**

### **5-Minute Overview**

This project uses **WordPress BEM CSS** with **CSS custom properties** for complete theme customization.

**Key Concepts:**
- ✅ All styling via CSS variables (no hardcoded values)
- ✅ BEM naming: `.wp-part-*`, `.wp-pattern-*`, `.wp-card-*`
- ✅ Automatic dark mode via CSS variables
- ✅ Typography: Lora (serif), Noto Sans (sans-serif)
- ✅ Centralized styling in `/src/styles/`

### **File Structure**

```
/src/styles/
├── theme.css              # Main entry, CSS variables, Tailwind integration
├── theme-light.css        # Light mode color palette
├── theme-dark.css         # Dark mode color palette
├── fonts.css              # Font face definitions
├── global.css             # Global styles + CSS imports
├── parts/                 # Template parts (Header, Footer)
└── patterns/              # Pattern components (Hero, Cards, CTA, etc.)
```

---

## 🏗️ **ARCHITECTURE OVERVIEW**

### **BEM Naming Convention**

```css
/* Template Parts */
.wp-part-header
.wp-part-header__nav
.wp-part-header__nav-item--open

/* Pattern Components */
.wp-pattern-hero
.wp-pattern-hero__title
.wp-pattern-hero--minimal

/* Card Components */
.wp-card-tour
.wp-card-tour__image
.wp-card-tour__meta
```

### **Component Mapping**

| React Component | CSS File | BEM Class Prefix |
|----------------|----------|------------------|
| Header.tsx | parts/header.css | `.wp-part-header__*` |
| Footer.tsx | parts/footer.css | `.wp-part-footer__*` |
| Hero.tsx | patterns/hero.css | `.wp-pattern-hero__*` |
| CardTour.tsx | patterns/cards.css | `.wp-card-tour__*` |
| CTA.tsx | patterns/cta.css | `.wp-pattern-cta__*` |

---

## 🎨 **CREATING NEW COMPONENTS**

### **Step-by-Step Guide**

**Example: Creating a "Testimonial" Pattern Component**

#### **Step 1: Create CSS File**

Create `/src/styles/patterns/testimonial.css`:

```css
/**
 * Testimonial Pattern - WordPress Block Pattern
 * 
 * BEM Structure: .wp-pattern-testimonial__*
 * 
 * WordPress Equivalent: patterns/testimonial.php
 */

/* Base Testimonial */
.wp-pattern-testimonial {
  padding: var(--spacing-section-md);
  background-color: var(--color-card);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Testimonial Quote */
.wp-pattern-testimonial__quote {
  font-family: var(--font-family-lora);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-medium);
  color: var(--color-foreground);
  margin-bottom: 1.5rem;
}

/* Testimonial Author */
.wp-pattern-testimonial__author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Author Image */
.wp-pattern-testimonial__author-image {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  object-fit: cover;
}

/* Author Info */
.wp-pattern-testimonial__author-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* Author Name */
.wp-pattern-testimonial__author-name {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-foreground);
}

/* Author Role */
.wp-pattern-testimonial__author-role {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-sm);
  color: var(--color-muted-foreground);
}

/* Variant: Highlighted */
.wp-pattern-testimonial--highlighted {
  background-color: var(--color-accent);
  border: 2px solid var(--color-primary);
}
```

#### **Step 2: Import CSS in global.css**

Add to `/src/styles/global.css`:

```css
/* Content Patterns */
@import './patterns/hero.css';
@import './patterns/testimonial.css';  /* NEW */
@import './patterns/cta.css';
```

#### **Step 3: Create React Component**

Create `/src/app/components/patterns/Testimonial.tsx`:

```typescript
/**
 * Testimonial Pattern Component
 * 
 * WordPress Equivalent: patterns/testimonial.php
 * 
 * @module Testimonial
 * @category patterns
 */

interface TestimonialProps {
  quote: string;
  authorName: string;
  authorRole: string;
  authorImage?: string;
  variant?: "standard" | "highlighted";
}

export function Testimonial({
  quote,
  authorName,
  authorRole,
  authorImage,
  variant = "standard",
}: TestimonialProps) {
  return (
    <div
      className={cn(
        "wp-pattern-testimonial",
        variant === "highlighted" && "wp-pattern-testimonial--highlighted"
      )}
    >
      {/* Quote */}
      <blockquote className="wp-pattern-testimonial__quote">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="wp-pattern-testimonial__author">
        {authorImage && (
          <img
            src={authorImage}
            alt={authorName}
            className="wp-pattern-testimonial__author-image"
          />
        )}
        <div className="wp-pattern-testimonial__author-info">
          <div className="wp-pattern-testimonial__author-name">
            {authorName}
          </div>
          <div className="wp-pattern-testimonial__author-role">
            {authorRole}
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### **Step 4: Use Component**

```typescript
<Testimonial
  quote="This was the best safari experience of my life!"
  authorName="Sarah Johnson"
  authorRole="Travel Blogger"
  authorImage="/images/sarah.jpg"
  variant="highlighted"
/>
```

**Done!** ✅

---

## 🎨 **CUSTOMIZING COLORS**

### **Change Primary Brand Color**

**File:** `/src/styles/theme-light.css`

```css
:root {
  /* FROM: Green */
  --color-primary-rgb: 84, 130, 53;
  --color-primary: rgb(84, 130, 53);

  /* TO: Blue */
  --color-primary-rgb: 37, 99, 235;
  --color-primary: rgb(37, 99, 235);
}
```

**File:** `/src/styles/theme-dark.css`

```css
.dark {
  /* FROM: Light Green */
  --color-primary-rgb: 110, 165, 50;
  --color-primary: rgb(110, 165, 50);

  /* TO: Light Blue */
  --color-primary-rgb: 59, 130, 246;
  --color-primary: rgb(59, 130, 246);
}
```

**Result:** Entire site switches to blue theme! 🎨

---

### **Change Background Colors**

**File:** `/src/styles/theme-light.css`

```css
:root {
  /* Change to off-white */
  --color-background-rgb: 250, 250, 250;
  --color-background: rgb(250, 250, 250);

  /* Change card to pure white */
  --color-card: rgb(255, 255, 255);
}
```

**File:** `/src/styles/theme-dark.css`

```css
.dark {
  /* Change to pure black */
  --color-background-rgb: 0, 0, 0;
  --color-background: rgb(0, 0, 0);

  /* Change card to dark gray */
  --color-card: rgb(24, 24, 27);
}
```

---

## ✍️ **CUSTOMIZING TYPOGRAPHY**

### **Change Font Families**

**File:** `/src/styles/theme.css`

```css
:root {
  /* Change heading font */
  --font-family-lora: "Playfair Display", Georgia, serif;

  /* Change body font */
  --font-family-noto-sans: "Inter", -apple-system, sans-serif;
}
```

**File:** `/src/styles/fonts.css`

```css
/* Import new fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

---

### **Change Font Sizes**

**File:** `/src/styles/theme.css`

```css
:root {
  /* Make headings larger */
  --text-6xl: 4rem;      /* H1: 64px (was 60px) */
  --text-4xl: 2.5rem;    /* H2: 40px (was 36px) */

  /* Make body text larger */
  --text-base: 1.125rem; /* Body: 18px (was 16px) */
}
```

---

### **Change Font Weights**

**File:** `/src/styles/theme.css`

```css
:root {
  /* Make headings bolder */
  --font-weight-bold: 800;      /* H1 (was 700) */
  --font-weight-semibold: 700;  /* H2, H3 (was 600) */

  /* Make body lighter */
  --font-weight-normal: 300;    /* Body (was 400) */
}
```

---

## 🎭 **ADDING COMPONENT VARIANTS**

### **Example: Adding a "Wide" CTA Variant**

**File:** `/src/styles/patterns/cta.css`

```css
/* Add to existing CTA styles */

/* Wide CTA Variant */
.wp-pattern-cta--wide {
  max-width: 1400px; /* Wider than standard */
  padding: var(--spacing-section-xl); /* More padding */
}

.wp-pattern-cta--wide .wp-pattern-cta__title {
  font-size: var(--text-5xl); /* Larger title */
}
```

**File:** `/src/app/components/patterns/CTA.tsx`

```typescript
// Update props type
type CTAVariant = "standard" | "highlight" | "banner" | "wide"; // Add "wide"

export function CTA({ variant = "standard", ...props }: CTAProps) {
  return (
    <section
      className={cn(
        "wp-pattern-cta",
        variant === "highlight" && "wp-pattern-cta--highlight",
        variant === "banner" && "wp-pattern-cta--banner",
        variant === "wide" && "wp-pattern-cta--wide" // Add wide variant
      )}
    >
      {/* ... */}
    </section>
  );
}
```

**Usage:**

```typescript
<CTA
  variant="wide"
  title="Ready for Your African Adventure?"
  description="Contact us today to start planning your dream safari"
  buttonText="Get Started"
  buttonLink="/contact"
/>
```

---

## ✅ **TESTING CHECKLIST**

### **After Making Changes:**

**Visual Testing:**
- [ ] Check light mode appearance
- [ ] Check dark mode appearance
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1023px)
- [ ] Test on desktop (1024px+)
- [ ] Verify all colors use CSS variables
- [ ] Verify all fonts are correct

**Functional Testing:**
- [ ] Test all interactive elements (buttons, links, forms)
- [ ] Test keyboard navigation (Tab, Enter, Escape)
- [ ] Test focus states (visible outline/ring)
- [ ] Test hover states
- [ ] Test theme toggle (light/dark switch)

**Accessibility Testing:**
- [ ] Check heading hierarchy (H1 → H2 → H3)
- [ ] Check ARIA labels on icon buttons
- [ ] Test with keyboard only (no mouse)
- [ ] Check color contrast (WCAG AA: 4.5:1 minimum)
- [ ] Test with screen reader (if available)

**Browser Testing:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 📝 **COMMON PATTERNS**

### **Pattern 1: Button with Primary Color**

```css
.my-component__button {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  font-family: var(--font-family-noto-sans);
  font-weight: var(--font-weight-medium);
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.my-component__button:hover {
  opacity: 0.9;
}

.my-component__button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
```

---

### **Pattern 2: Card with Border**

```css
.my-component__card {
  background-color: var(--color-card);
  color: var(--color-card-foreground);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.my-component__card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

---

### **Pattern 3: Heading + Subheading**

```css
.my-component__heading {
  font-family: var(--font-family-lora);
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-foreground);
  margin-bottom: 0.5rem;
}

.my-component__subheading {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-lg);
  color: var(--color-muted-foreground);
}
```

---

### **Pattern 4: Responsive Grid**

```css
.my-component__grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 column */
  gap: var(--spacing-gap-md);
}

@media (min-width: 768px) {
  .my-component__grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .my-component__grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
  }
}
```

---

### **Pattern 5: Icon + Text**

```css
.my-component__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.my-component__icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-primary);
}

.my-component__text {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  color: var(--color-foreground);
}
```

---

## 🔧 **TROUBLESHOOTING**

### **Problem: Dark mode colors not working**

**Solution:** Make sure `.dark` class is on `<html>` element:

```typescript
// Check in browser console
document.documentElement.classList.contains('dark'); // Should return true in dark mode
```

---

### **Problem: CSS variables not working**

**Solution 1:** Check import order in `/src/styles/global.css`:

```css
/* Correct order: */
@import './wordpress-classes.css';  /* First */
@import './parts/header.css';       /* Then parts */
@import './patterns/hero.css';      /* Then patterns */
```

**Solution 2:** Make sure using `var()` syntax:

```css
/* ✅ Correct */
color: var(--color-primary);

/* ❌ Wrong */
color: --color-primary;
```

---

### **Problem: Fonts not loading**

**Solution:** Check `/src/styles/fonts.css` has correct imports:

```css
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap');
```

And check `/src/styles/index.css` imports fonts.css:

```css
@import './fonts.css';
```

---

### **Problem: BEM classes not applying**

**Solution:** Check CSS file is imported in `global.css`:

```css
@import './patterns/my-component.css';
```

And check component uses correct class:

```typescript
<div className="wp-pattern-my-component">
  {/* ... */}
</div>
```

---

### **Problem: Responsive breakpoints not working**

**Solution:** Use correct media query syntax:

```css
/* Mobile first (default) */
.component {
  grid-template-columns: 1fr;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .component {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .component {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 📚 **USEFUL RESOURCES**

### **Documentation Files:**

- `/docs/STYLE-GUIDE.md` - Complete design system documentation
- `/tasks/PROJECT-COMPLETE.md` - Project summary
- `/tasks/phase-6-verification.md` - Testing results

### **CSS Files:**

- `/src/styles/theme.css` - Main CSS variables
- `/src/styles/theme-light.css` - Light mode colors
- `/src/styles/theme-dark.css` - Dark mode colors
- `/src/styles/global.css` - CSS imports

### **Component Examples:**

- `/src/app/components/parts/Header.tsx` - Template part example
- `/src/app/components/patterns/Hero.tsx` - Pattern component example
- `/src/app/components/patterns/CardTour.tsx` - Card component example

---

## 🎯 **QUICK COMMANDS**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests (if configured)
npm test
```

---

## 💡 **PRO TIPS**

### **Tip 1: Use Browser DevTools**

Inspect elements to see which CSS variables are applied:

```
Right-click element → Inspect → Computed tab → Filter: --
```

### **Tip 2: Test Both Modes**

Always test changes in both light and dark mode:

```typescript
// Toggle dark mode in browser console
document.documentElement.classList.toggle('dark');
```

### **Tip 3: Use BEM Consistently**

Follow the pattern: `Block__Element--Modifier`

```css
.wp-pattern-hero                  /* Block */
.wp-pattern-hero__title           /* Element */
.wp-pattern-hero__title--large    /* Modifier */
```

### **Tip 4: Mobile-First**

Write mobile styles first, then use media queries for larger screens:

```css
/* Mobile (default) */
.component { font-size: 1rem; }

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .component { font-size: 1.25rem; }
}
```

---

## 🎉 **YOU'RE READY!**

You now have everything you need to:

✅ Create new components  
✅ Customize colors  
✅ Adjust typography  
✅ Add component variants  
✅ Test changes  
✅ Troubleshoot issues  

**Happy coding!** 🚀

---

**Need more help?** Check the full documentation in `/docs/STYLE-GUIDE.md`

**Questions?** Review the component CSS files in `/src/styles/patterns/` for examples.
