# Breakpoints System

**Version:** 5.0.0  
**Last Updated:** January 2025  
**WordPress Block Theme Compatible:** ✅

Complete breakpoint definitions, media query patterns, and responsive strategies for the Ash Shaw Makeup Portfolio.

---

## 📏 Breakpoint Scale

### Three-Tier Breakpoint System

The portfolio uses a **three-tier breakpoint system** optimized for makeup artistry and visual storytelling:

```css
/* CSS Custom Properties */
:root {
  --breakpoint-mobile: 767px;    /* Max width for mobile */
  --breakpoint-tablet: 768px;    /* Min width for tablet */
  --breakpoint-desktop: 1024px;  /* Min width for desktop */
  --breakpoint-xl: 1440px;       /* Min width for large desktop */
  
  /* Container max-widths */
  --container-mobile: 100%;
  --container-tablet: 720px;
  --container-desktop: 1280px;
  --container-xl: 1600px;
}
```

### Breakpoint Ranges

| Device | Range | Viewport Width | Use Case |
|--------|-------|----------------|----------|
| **Mobile** | `< 768px` | 375px - 767px | Single column, stacked layout |
| **Tablet** | `768px - 1023px` | 768px - 1023px | 2 columns, hybrid interactions |
| **Desktop** | `1024px+` | 1024px - 1439px | Multi-column, hover effects |
| **Large Desktop** | `1440px+` | 1440px+ | Maximum width, enhanced visuals |

---

## 📱 Visual Breakpoint Reference

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        RESPONSIVE BREAKPOINTS                           │
└────────────────────────────────────────────────────────────────────────┘

Mobile                  Tablet                    Desktop              XL
< 768px                 768px - 1023px            1024px - 1439px      1440px+
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────┐        ┌───────────────────┐    ┌─────────────────────────────┐
│   iPhone    │        │    iPad Portrait  │    │      Desktop/Laptop         │
│   Galaxy    │        │    Smaller Tabs   │    │      13"+ screens           │
│  Portrait   │        │   Touch+Mouse     │    │      Mouse primary          │
└─────────────┘        └───────────────────┘    └─────────────────────────────┘

375px  414px  767px    768px    834px   1023px  1024px   1280px   1439px  1440px+
  │      │      │        │        │        │       │        │        │        │
  └──────┴──────┘        └────────┴────────┘       └────────┴────────┘        │
   Mobile Range            Tablet Range              Desktop Range        XL Range
```

---

## 🎯 Media Query Patterns

### Mobile-First Approach (Recommended)

Always start with mobile styles, then enhance for larger screens:

```css
/* ✅ MOBILE-FIRST (RECOMMENDED) */

/* Base styles - Mobile (< 768px) */
.component {
  padding: var(--wp--preset--spacing--20);
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--20);
}

/* Tablet styles (768px+) */
@media (min-width: 768px) {
  .component {
    padding: var(--wp--preset--spacing--40);
    flex-direction: row;
    gap: var(--wp--preset--spacing--40);
  }
}

/* Desktop styles (1024px+) */
@media (min-width: 1024px) {
  .component {
    padding: var(--wp--preset--spacing--60);
    max-width: 1280px;
    margin-inline: auto;
  }
}

/* Large Desktop styles (1440px+) */
@media (min-width: 1440px) {
  .component {
    padding: var(--wp--preset--spacing--80);
    max-width: 1600px;
  }
}
```

### Desktop-First Approach (Avoid)

```css
/* ❌ DESKTOP-FIRST (AVOID) */

/* Desktop styles (default) */
.component {
  padding: var(--wp--preset--spacing--60);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

/* Tablet styles (max-width: 1023px) */
@media (max-width: 1023px) {
  .component {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile styles (max-width: 767px) */
@media (max-width: 767px) {
  .component {
    grid-template-columns: 1fr;
  }
}
```

**Why mobile-first is better:**
- Smaller CSS file size for mobile users
- Progressive enhancement mindset
- Easier to maintain and debug
- Better performance on mobile devices

---

## 🎨 Breakpoint Usage Examples

### Example 1: Portfolio Grid

```css
/* Portfolio gallery that adapts across all breakpoints */
.portfolio-grid {
  /* Mobile: Single column */
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--wp--preset--spacing--20);
  padding: var(--wp--preset--spacing--20);
}

@media (min-width: 768px) {
  .portfolio-grid {
    /* Tablet: 2 columns */
    grid-template-columns: repeat(2, 1fr);
    gap: var(--wp--preset--spacing--30);
    padding: var(--wp--preset--spacing--40);
  }
}

@media (min-width: 1024px) {
  .portfolio-grid {
    /* Desktop: 3 columns */
    grid-template-columns: repeat(3, 1fr);
    gap: var(--wp--preset--spacing--40);
    padding: var(--wp--preset--spacing--60);
  }
}

@media (min-width: 1440px) {
  .portfolio-grid {
    /* Large Desktop: 4 columns */
    grid-template-columns: repeat(4, 1fr);
    gap: var(--wp--preset--spacing--50);
  }
}
```

---

### Example 2: Hero Section

```css
/* Hero section with split layout on larger screens */
.hero-section {
  /* Mobile: Stacked layout */
  display: flex;
  flex-direction: column;
  padding: var(--wp--preset--spacing--40) var(--wp--preset--spacing--20);
  gap: var(--wp--preset--spacing--40);
}

@media (min-width: 768px) {
  .hero-section {
    /* Tablet: Still stacked but more padding */
    padding: var(--wp--preset--spacing--60) var(--wp--preset--spacing--40);
    gap: var(--wp--preset--spacing--50);
  }
}

@media (min-width: 1024px) {
  .hero-section {
    /* Desktop: Side-by-side layout */
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: var(--wp--preset--spacing--80) var(--wp--preset--spacing--60);
    gap: var(--wp--preset--spacing--60);
  }
}
```

---

### Example 3: Navigation

```css
/* Navigation that transforms from hamburger to horizontal */
.main-nav {
  /* Mobile: Hidden by default (hamburger menu) */
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: white;
  padding: var(--wp--preset--spacing--40);
}

.main-nav.open {
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--30);
}

@media (min-width: 768px) {
  .main-nav {
    /* Tablet: Hybrid - some visible, some hidden */
    position: static;
    display: flex;
    flex-direction: row;
    height: auto;
    width: auto;
    background: transparent;
    padding: 0;
    gap: var(--wp--preset--spacing--30);
  }
}

@media (min-width: 1024px) {
  .main-nav {
    /* Desktop: Full horizontal navigation */
    gap: var(--wp--preset--spacing--40);
  }
}
```

---

## 🔍 Container Queries (Modern Approach)

Container queries allow components to respond to their **container's size** rather than the viewport:

```css
/* Container query setup */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Component responds to container width */
.card {
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--20);
}

/* When container is 400px+ wide */
@container card (min-width: 400px) {
  .card {
    flex-direction: row;
    gap: var(--wp--preset--spacing--30);
  }
}

/* When container is 600px+ wide */
@container card (min-width: 600px) {
  .card {
    gap: var(--wp--preset--spacing--40);
  }
}
```

**When to use container queries:**
- ✅ Reusable components that appear in different contexts
- ✅ Components in sidebars or variable-width containers
- ✅ Card components that should adapt to their container
- ❌ Full-page layouts (use media queries)
- ❌ Browser support is critical (fallback needed)

---

## 📐 Responsive Typography

Typography scales using **clamp()** for fluid scaling:

```css
/* Fluid typography using clamp() */
h1 {
  font-size: clamp(
    2rem,              /* Minimum size (mobile) */
    5vw,               /* Preferred size (scales with viewport) */
    5rem               /* Maximum size (desktop) */
  );
  line-height: 1.1;
}

h2 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.2;
}

p {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.6;
}
```

**See:** [typography-scaling.md](./typography-scaling.md) for complete typography system

---

## 📦 Responsive Spacing

Spacing adapts using WordPress spacing scale:

```css
/* Responsive section padding */
.section {
  /* Mobile */
  padding-block: var(--wp--preset--spacing--40);
  padding-inline: var(--wp--preset--spacing--20);
}

@media (min-width: 768px) {
  .section {
    /* Tablet */
    padding-block: var(--wp--preset--spacing--60);
    padding-inline: var(--wp--preset--spacing--40);
  }
}

@media (min-width: 1024px) {
  .section {
    /* Desktop */
    padding-block: var(--wp--preset--spacing--80);
    padding-inline: var(--wp--preset--spacing--60);
  }
}
```

**See:** [spacing-adjustments.md](./spacing-adjustments.md) for complete spacing system

---

## 🎯 Common Breakpoint Patterns

### Pattern 1: Stacked to Grid

```css
/* Transforms from stacked to grid layout */
.content-blocks {
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--30);
}

@media (min-width: 768px) {
  .content-blocks {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--wp--preset--spacing--40);
  }
}

@media (min-width: 1024px) {
  .content-blocks {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--wp--preset--spacing--50);
  }
}
```

---

### Pattern 2: Full-Width to Contained

```css
/* Mobile: Full width, Desktop: Contained */
.container {
  width: 100%;
  padding-inline: var(--wp--preset--spacing--20);
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin-inline: auto;
    padding-inline: var(--wp--preset--spacing--40);
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1280px;
    padding-inline: var(--wp--preset--spacing--60);
  }
}

@media (min-width: 1440px) {
  .container {
    max-width: 1600px;
  }
}
```

---

### Pattern 3: Hidden to Visible

```css
/* Hide on mobile, show on desktop */
.desktop-only {
  display: none;
}

@media (min-width: 1024px) {
  .desktop-only {
    display: block;
  }
}

/* Show on mobile, hide on desktop */
.mobile-only {
  display: block;
}

@media (min-width: 1024px) {
  .mobile-only {
    display: none;
  }
}
```

---

### Pattern 4: Reorder Content

```css
/* Reorder content for different screen sizes */
.content-wrapper {
  display: flex;
  flex-direction: column;
}

.content-text {
  order: 2; /* Text second on mobile */
}

.content-image {
  order: 1; /* Image first on mobile */
}

@media (min-width: 1024px) {
  .content-wrapper {
    flex-direction: row;
  }
  
  .content-text {
    order: 1; /* Text first on desktop */
    flex: 1;
  }
  
  .content-image {
    order: 2; /* Image second on desktop */
    flex: 1;
  }
}
```

---

## 🖼️ Responsive Images

### Using `srcset` and `sizes`

```html
<!-- Responsive image with multiple sources -->
<img
  src="image-800w.jpg"
  srcset="
    image-400w.jpg 400w,
    image-800w.jpg 800w,
    image-1200w.jpg 1200w,
    image-1600w.jpg 1600w
  "
  sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 50vw,
    33vw
  "
  alt="Makeup artistry example"
  loading="lazy"
/>
```

### CSS Responsive Images

```css
/* Responsive background images */
.hero-bg {
  background-image: url('hero-mobile.jpg');
  background-size: cover;
  background-position: center;
}

@media (min-width: 768px) {
  .hero-bg {
    background-image: url('hero-tablet.jpg');
  }
}

@media (min-width: 1024px) {
  .hero-bg {
    background-image: url('hero-desktop.jpg');
  }
}

@media (min-width: 1440px) {
  .hero-bg {
    background-image: url('hero-xl.jpg');
  }
}
```

---

## ⚡ Performance Considerations

### Lazy Loading

```html
<!-- Lazy load images below the fold -->
<img
  src="image.jpg"
  loading="lazy"
  alt="Portfolio work"
/>

<!-- Eager load hero images -->
<img
  src="hero.jpg"
  loading="eager"
  alt="Hero image"
/>
```

### Reduce Media Queries

```css
/* ❌ BAD - Too many breakpoints */
@media (min-width: 375px) { }
@media (min-width: 414px) { }
@media (min-width: 576px) { }
@media (min-width: 768px) { }
@media (min-width: 992px) { }
@media (min-width: 1024px) { }
@media (min-width: 1200px) { }
@media (min-width: 1440px) { }

/* ✅ GOOD - Strategic breakpoints */
@media (min-width: 768px) { }   /* Tablet */
@media (min-width: 1024px) { }  /* Desktop */
@media (min-width: 1440px) { }  /* XL Desktop */
```

---

## 📱 Testing Checklist

Test all components at these specific widths:

### Mobile Testing
- [ ] **375px** - iPhone SE, Small Android
- [ ] **414px** - iPhone 12 Pro Max, Large Android
- [ ] **767px** - Maximum mobile width

### Tablet Testing
- [ ] **768px** - iPad Portrait (minimum tablet)
- [ ] **834px** - iPad Pro 11" Portrait
- [ ] **1023px** - Maximum tablet width

### Desktop Testing
- [ ] **1024px** - Small desktop (minimum desktop)
- [ ] **1280px** - Standard desktop
- [ ] **1439px** - Maximum desktop width

### Large Desktop Testing
- [ ] **1440px** - Large desktop (minimum XL)
- [ ] **1920px** - Full HD displays
- [ ] **2560px** - 2K/QHD displays

---

## 🔗 Related Documentation

- [Layout Patterns](./layout-patterns.md) - Responsive grid and flexbox patterns
- [Typography Scaling](./typography-scaling.md) - How text adapts across breakpoints
- [Spacing Adjustments](./spacing-adjustments.md) - Responsive spacing patterns
- [Navigation Responsive](./navigation-responsive.md) - Navigation evolution
- [Interaction Modes](./interaction-modes.md) - Touch vs hover patterns

---

## ✅ Best Practices Summary

### DO ✅

1. **Use mobile-first media queries**
   ```css
   @media (min-width: 768px) { /* Tablet */ }
   @media (min-width: 1024px) { /* Desktop */ }
   ```

2. **Use WordPress CSS variables**
   ```css
   padding: var(--wp--preset--spacing--40);
   font-size: var(--wp--preset--font-size--400);
   ```

3. **Test at all major breakpoints**
   - 375px, 768px, 1024px, 1440px

4. **Use semantic breakpoint names**
   ```css
   /* ✅ GOOD */
   @media (min-width: 768px) { /* Tablet */ }
   
   /* ❌ BAD */
   @media (min-width: 768px) { /* iPad */ }
   ```

### DON'T ❌

1. **Don't use device-specific breakpoints**
   ```css
   /* ❌ BAD */
   @media (min-width: 375px) { /* iPhone SE */ }
   ```

2. **Don't use too many breakpoints**
   ```css
   /* ❌ BAD */
   @media (min-width: 576px) { }
   @media (min-width: 768px) { }
   @media (min-width: 992px) { }
   ```

3. **Don't hardcode values**
   ```css
   /* ❌ BAD */
   padding: 40px;
   
   /* ✅ GOOD */
   padding: var(--wp--preset--spacing--40);
   ```

---

**Version:** 5.0.0 (WordPress Breakpoint System)  
**Last Updated:** January 2025  
**Maintained By:** Ash Shaw Portfolio Team