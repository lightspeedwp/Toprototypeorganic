# Responsive Design Tokens

**Source of Truth:** `/src/styles/theme-base.css`, `/guidelines/design-tokens/breakpoints.md`
**Last Verified:** March 13, 2026
**Status:** Active

---

## Purpose

Defines the responsive strategy — breakpoints, fluid scaling via `clamp()`, and mobile-first media query rules. This is the central reference for all responsive behaviour.

---

## Core Strategy

**Clamp-first for fluid sizing. Media queries only for structural changes.**

| Approach | Use For | How |
|----------|---------|-----|
| `clamp()` | Typography, spacing, gaps | Smooth scaling, no breakpoints needed |
| Media queries | Grid columns, nav mode, content reorder | Mobile-first `min-width` only |

---

## Breakpoints

| Name | Value | Tailwind Prefix | Usage |
|------|-------|-----------------|-------|
| Mobile | 0–639px | (default) | Single column, hamburger nav |
| Tablet | 640px | `sm:` | 2 columns, expanded cards |
| Tablet landscape | 768px | `md:` | Navigation shifts |
| Desktop | 1024px | `lg:` | Full nav, 3+ columns |
| Wide | 1280px | `xl:` | 4 columns, wider content |
| Ultrawide | 1440px | `2xl:` | 5+ columns, max content width |

---

## Grid Column Progression

The card grid follows this exact mobile-first progression:

| Breakpoint | Columns | CSS |
|-----------|---------|-----|
| Default | 1 | `grid-template-columns: 1fr` |
| 640px | 2 | `grid-template-columns: repeat(2, 1fr)` |
| 1024px | 3 | `grid-template-columns: repeat(3, 1fr)` |
| 1280px | 4 | `grid-template-columns: repeat(4, 1fr)` |
| 1440px | 5 | `grid-template-columns: repeat(5, 1fr)` |
| 1680px | 6 | `grid-template-columns: repeat(6, 1fr)` |

---

## Fluid Tokens (clamp-based)

### Typography — Scales without breakpoints

| Token | Min (320px) | Max (1920px) |
|-------|-------------|-------------|
| `var(--text-6xl)` | 48px (3rem) | 96px (6rem) |
| `var(--text-4xl)` | 32px (2rem) | 64px (4rem) |
| `var(--text-base)` | 16px (1rem) | 20px (1.25rem) |
| `var(--text-sm)` | 14px (0.875rem) | 18px (1.125rem) |

### Spacing — Scales without breakpoints

| Token | Min (320px) | Max (1920px) |
|-------|-------------|-------------|
| `var(--spacing-section-md)` | 64px | 128px |
| `var(--spacing-gap-md)` | 16px | 48px |
| `var(--spacing-element-md)` | 16px | 32px |

---

## Media Query Rules

### Do: Mobile-first (`min-width`)

```css
/* ✅ CORRECT — mobile-first */
.wp-pattern-grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .wp-pattern-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .wp-pattern-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Don't: Desktop-first (`max-width`)

```css
/* ❌ WRONG — desktop-first violates the contract */
@media (max-width: 1024px) {
  .wp-pattern-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Container Max-Widths

| Token | Value | Usage |
|-------|-------|-------|
| `var(--container-max-width)` | 1600px | Default content width |
| `var(--container-max-width-narrow)` | 800px | Editorial/reading content |
| `var(--container-max-width-wide)` | 1800px | Full-width sections |

---

## Related Guidelines

| Guideline | Relationship |
|-----------|-------------|
| `/guidelines/design-tokens/breakpoints.md` | Detailed breakpoint documentation |
| `/guidelines/design-tokens/spacing.md` | Spacing token reference |
| `/guidelines/design-tokens/MODERN-SPACING.md` | Advanced fluid spacing patterns |
| `/guidelines/design-tokens/typography.md` | Typography token reference |
