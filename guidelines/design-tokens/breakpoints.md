# Breakpoints & Responsive System

**Version:** 1.0.0 — March 2026
**Status:** Production Ready
**Strategy:** Clamp-first for fluid type/spacing; media queries only for structural changes

---

## Overview

This document defines the **responsive breakpoint system** for the LightSpeed Tour Operator prototype. The system uses a **clamp-first approach** where fluid `clamp()` values handle sizing, and media queries are reserved for **structural layout changes** (grid columns, nav mode switches, content reordering).

---

## Core Strategy (from Q&A Decision #3)

> **Clamp-first for fluid type/spacing. Media queries only for structural changes (grid columns, nav/layout shifts).**

This means:
- **Typography:** Scales automatically via `clamp()` — no media queries needed
- **Spacing:** Scales automatically via `clamp()` — no media queries needed
- **Grid columns:** Use `@media (min-width: ...)` to change column count
- **Navigation:** Use `@media (min-width: ...)` to switch hamburger vs horizontal
- **Content reorder:** Use `@media (min-width: ...)` to rearrange content blocks

---

## Breakpoint Scale

Per Q&A decision #4, the project uses these breakpoints (mobile-first):

| Breakpoint | Min Width | Token | Use Case |
|------------|-----------|-------|----------|
| **XS** | 320px | — | Base mobile (design floor) |
| **SM** | 480px | — | Large phones |
| **MD-SM** | 640px | `sm:` (Tailwind) | Phablets, 2-column starts |
| **MD** | 768px | `md:` (Tailwind) | Tablets, hybrid interactions |
| **LG** | 1024px | `lg:` (Tailwind) | Desktop, hover effects |
| **XL** | 1280px | `xl:` (Tailwind) | Wide desktop |
| **2XL** | 1440px | `2xl:` (Tailwind) | Standard large desktop |
| **3XL** | 1600px | — (custom) | Wide displays |
| **4XL** | 1920px | — (custom) | Full HD / design ceiling |

### Visual Reference

```
Mobile          Tablet          Desktop              Large Desktop
< 768px         768-1023px      1024-1439px          1440px+
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
320   480  640  768   1024  1280  1440  1600  1680  1920
 │     │    │    │      │     │     │     │     │     │
 └─────┴────┘    └──────┘     └─────┴─────┘     └─────┘
  Mobile Range   Tablet Range  Desktop Range    XL Range
```

---

## Grid Column Progression

Per Q&A decision #5:

| Viewport | Columns | Container Max Width |
|----------|---------|---------------------|
| 320px - 639px | 1 | 100% |
| 640px - 1023px | 2 | 100% |
| 1024px - 1279px | 3 | 1280px |
| 1280px - 1439px | 4 | 1440px |
| 1440px - 1679px | 5 | 1600px |
| 1680px+ | 6 | 1800px |

### Implementation

```css
.archive-grid {
  display: grid;
  gap: var(--spacing-gap-md);
  grid-template-columns: 1fr;
}

@media (min-width: 640px)  { .archive-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .archive-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1280px) { .archive-grid { grid-template-columns: repeat(4, 1fr); } }
@media (min-width: 1440px) { .archive-grid { grid-template-columns: repeat(5, 1fr); } }
@media (min-width: 1680px) { .archive-grid { grid-template-columns: repeat(6, 1fr); } }
```

### With Tailwind Classes

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-fluid-md">
  {/* Cards */}
</div>
```

**Note:** For 6 columns at 1680px+, use a custom CSS class since Tailwind doesn't have a `3xl:` prefix by default.

---

## Container Widths

Per Q&A decision #11:

```css
--container-max-width:        1600px;  /* Default max width (expanded from 1440px) */
--container-max-width-narrow: 800px;   /* Reading / content width */
--container-max-width-wide:   1800px;  /* Ultra-wide layouts */
```

### Container Pattern

```css
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin-inline: auto;
  padding-inline: var(--spacing-container-sm);
}
```

---

## Mobile-First Media Query Pattern

**Always use `min-width` (mobile-first), never `max-width` (desktop-first).**

```css
/* Base: Mobile (< 768px) */
.component {
  padding: var(--spacing-element-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-gap-sm);
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .component {
    flex-direction: row;
    gap: var(--spacing-gap-md);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .component {
    max-width: var(--container-max-width);
    margin-inline: auto;
  }
}
```

---

## When to Use Media Queries vs Clamp

### Use `clamp()` for (NO media query needed):
- Font sizes (all handled by `--text-*` tokens)
- Padding (all handled by `--spacing-*` tokens)
- Gaps (all handled by `--spacing-gap-*` tokens)
- Container gutters (all handled by `--spacing-container-*` tokens)

### Use media queries for:
- Grid column count changes
- Navigation mode (hamburger vs horizontal)
- Content visibility (`display: none` / `display: block`)
- Content reordering (`order` changes)
- Layout direction changes (`flex-direction`)

---

## Common Responsive Patterns

### Pattern 1: Stacked to Grid

```css
.content-blocks {
  display: grid;
  gap: var(--spacing-gap-md);
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .content-blocks {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .content-blocks {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Pattern 2: Navigation Transformation

```css
/* Mobile: Hamburger menu */
.header-desktop-nav { display: none; }
.header-hamburger { display: flex; }

@media (min-width: 1024px) {
  /* Desktop: Horizontal navigation */
  .header-desktop-nav { display: flex; align-items: center; gap: 0.25rem; }
  .header-hamburger { display: none; }
}
```

### Pattern 3: Content Reorder

```css
.content-wrapper {
  display: flex;
  flex-direction: column;
}

.content-text  { order: 2; } /* Text second on mobile */
.content-image { order: 1; } /* Image first on mobile */

@media (min-width: 1024px) {
  .content-wrapper { flex-direction: row; }
  .content-text  { order: 1; flex: 1; } /* Text first on desktop */
  .content-image { order: 2; flex: 1; } /* Image second on desktop */
}
```

### Pattern 4: Hidden/Visible

```css
/* Desktop-only elements */
.desktop-only { display: none; }
@media (min-width: 1024px) { .desktop-only { display: block; } }

/* Mobile-only elements */
.mobile-only { display: block; }
@media (min-width: 1024px) { .mobile-only { display: none; } }
```

---

## Container Queries (Advanced)

For reusable components that appear in variable-width containers, use CSS container queries:

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-gap-xs);
}

@container card (min-width: 400px) {
  .card {
    flex-direction: row;
    gap: var(--spacing-gap-md);
  }
}
```

**When to use container queries:**
- Reusable components in different width contexts
- Components in sidebars or variable-width containers
- Card components that adapt to their container

---

## Responsive Images

```html
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
  alt="Descriptive alt text"
  loading="lazy"
/>
```

**Rules:**
- Hero images: `loading="eager"` (above the fold)
- All other images: `loading="lazy"`
- Always provide `alt` text

---

## Performance Best Practices

### Limit Breakpoints

```css
/* CORRECT: Strategic breakpoints */
@media (min-width: 640px)  { /* Phablet */ }
@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Wide */ }
@media (min-width: 1440px) { /* Large */ }
@media (min-width: 1680px) { /* Ultra-wide */ }

/* WRONG: Too many granular breakpoints */
@media (min-width: 375px) { }
@media (min-width: 414px) { }
@media (min-width: 576px) { }
@media (min-width: 768px) { }
@media (min-width: 992px) { }
```

### Use Semantic Breakpoint Names in Comments

```css
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
/* NOT: */
@media (min-width: 768px) { /* iPad */ }
```

---

## Testing Checklist

### Mobile Testing
- [ ] **320px** — Design floor (smallest supported)
- [ ] **375px** — iPhone SE, small Android
- [ ] **414px** — iPhone Pro Max, large Android
- [ ] **767px** — Maximum mobile width

### Tablet Testing
- [ ] **768px** — iPad Portrait (minimum tablet)
- [ ] **834px** — iPad Pro 11" Portrait
- [ ] **1023px** — Maximum tablet width

### Desktop Testing
- [ ] **1024px** — Small desktop (minimum desktop)
- [ ] **1280px** — Standard desktop
- [ ] **1439px** — Maximum standard desktop

### Large Desktop Testing
- [ ] **1440px** — Large desktop
- [ ] **1600px** — Wide desktop
- [ ] **1680px** — Ultra-wide (6-column should activate)
- [ ] **1920px** — Full HD (design ceiling)

---

## Related Documentation

- [MODERN-SPACING.md](MODERN-SPACING.md) — Fluid spacing system (uses these breakpoints)
- [MODERN-TYPOGRAPHY.md](MODERN-TYPOGRAPHY.md) — Fluid typography (clamp-based, no breakpoints needed)
- [colors.md](colors.md) — Color tokens
- [borders.md](borders.md) — Border tokens
- [radii.md](radii.md) — Border radius tokens

---

**Version:** 1.0.0
**Last Updated:** March 2026
**Source of Truth:** Q&A decisions + `/src/styles/theme-base.css`
