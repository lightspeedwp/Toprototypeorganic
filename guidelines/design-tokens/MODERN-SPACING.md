# Modern Spacing & Layout Guidelines

**Version:** 4.0 — March 2026
**Status:** Production Ready
**Source of Truth:** `/src/styles/theme-base.css`, `/src/styles/theme-variables.css`

---

## Overview

This document defines the **fluid spacing system**, **zero-margin policy**, **blockGap implementation**, and **multi-breakpoint column scaling** for the LightSpeed Tour Operator prototype. All spacing uses `clamp()` for smooth viewport-responsive sizing between **320px** and **1920px**.

---

## Key Principles

### 1. Zero Margin for Layout Orchestration

Margins are **strictly prohibited** for structural layout in patterns, parts, and templates.

**Why:**
- Margins collapse unpredictably in nested layouts
- A component should not "push" other components away
- WordPress `theme.json` uses `blockGap` and `padding`, not margins
- Containers define space between children via `gap`

**Allowed Margin Exceptions:**
- Semantic flow margins on `h1-h6`, `p`, and content prose (as defined in `theme.css @layer base`)
- Accessibility helpers (e.g., `sr-only` with negative margins)
- Print layout adjustments
- `margin-inline: auto` for centering

**Replacement Strategy:**
| Instead of... | Use... |
|----------------|--------|
| `margin-bottom` on sections | `padding-block` on containers |
| `margin-top` between siblings | `gap` on parent flex/grid |
| `margin-left/right` for gutters | `padding-inline` on containers |
| `space-y-*` on children | `gap` on parent |

### 2. Clamp-First Fluid Scaling

All spacing uses `clamp(min, preferred, max)` for viewport-responsive sizing.
- Minimum viewport: **320px** (20rem)
- Maximum viewport: **1920px** (120rem)
- Media queries are reserved for **structural layout changes** only (grid columns, nav switches)

### 3. WordPress blockGap Alignment

`--wp--style--block-gap` is the canonical WordPress spacing variable. The prototype maps it to CSS Grid/Flexbox `gap`:
- Unified `gap` for consistent spacing
- Split `row-gap` / `column-gap` for layout-specific control

---

## Fluid Spacing Scale (Source of Truth)

These are the **exact values** from `/src/styles/theme-base.css`:

### Section Padding — Outer vertical rhythm of page sections

```css
--spacing-section-sm: clamp(2.5rem, 5vw + 1rem, 5rem);   /* 40px -> 80px */
--spacing-section-md: clamp(4rem, 8vw + 1rem, 8rem);     /* 64px -> 128px */
--spacing-section-lg: clamp(5rem, 10vw + 2rem, 10rem);   /* 80px -> 160px */
--spacing-section-xl: clamp(6rem, 12vw + 2rem, 12rem);   /* 96px -> 192px */
```

### Container Padding — Horizontal inset for content containers

```css
--spacing-container-sm: clamp(1rem, 2vw + 0.5rem, 2.5rem);  /* 16px -> 40px */
--spacing-container-md: clamp(1.5rem, 3vw + 0.5rem, 4rem);  /* 24px -> 64px */
--spacing-container-lg: clamp(2rem, 4vw + 1rem, 6rem);      /* 32px -> 96px */
```

### Element Spacing — Internal padding for cards, buttons, etc.

```css
--spacing-element-xs: clamp(0.5rem, 1vw + 0.25rem, 1rem);      /* 8px -> 16px */
--spacing-element-sm: clamp(0.75rem, 1.5vw + 0.25rem, 1.5rem); /* 12px -> 24px */
--spacing-element-md: clamp(1rem, 2vw + 0.5rem, 2rem);         /* 16px -> 32px */
--spacing-element-lg: clamp(1.5rem, 3vw + 0.5rem, 3rem);       /* 24px -> 48px */
--spacing-element-xl: clamp(2rem, 4vw + 1rem, 4.5rem);         /* 32px -> 72px */
```

### Gap Spacing — Grid and Flexbox gaps

```css
--spacing-gap-xs: clamp(0.5rem, 1vw + 0.25rem, 1.25rem);  /* 8px -> 20px */
--spacing-gap-sm: clamp(0.75rem, 1.5vw + 0.25rem, 2rem);  /* 12px -> 32px */
--spacing-gap-md: clamp(1rem, 2vw + 0.5rem, 3rem);        /* 16px -> 48px */
--spacing-gap-lg: clamp(1.5rem, 3vw + 0.5rem, 4.5rem);    /* 24px -> 72px */
```

### Quick Reference Table

| Level | Variable | Mobile (320px) | Desktop (1920px) | Use Case |
|-------|----------|----------------|------------------|----------|
| **Section SM** | `--spacing-section-sm` | 40px | 80px | Small section padding |
| **Section MD** | `--spacing-section-md` | 64px | 128px | Standard section padding |
| **Section LG** | `--spacing-section-lg` | 80px | 160px | Hero, large section padding |
| **Section XL** | `--spacing-section-xl` | 96px | 192px | Maximum section padding |
| **Container SM** | `--spacing-container-sm` | 16px | 40px | Mobile-friendly gutters |
| **Container MD** | `--spacing-container-md` | 24px | 64px | Standard container gutters |
| **Container LG** | `--spacing-container-lg` | 32px | 96px | Spacious container gutters |
| **Element XS** | `--spacing-element-xs` | 8px | 16px | Tight padding, small gaps |
| **Element SM** | `--spacing-element-sm` | 12px | 24px | Button padding, input spacing |
| **Element MD** | `--spacing-element-md` | 16px | 32px | Card padding, content flow |
| **Element LG** | `--spacing-element-lg` | 24px | 48px | Large component spacing |
| **Element XL** | `--spacing-element-xl` | 32px | 72px | Feature blocks, hero content |
| **Gap XS** | `--spacing-gap-xs` | 8px | 20px | Tight grid/flex gaps |
| **Gap SM** | `--spacing-gap-sm` | 12px | 32px | Standard component gaps |
| **Gap MD** | `--spacing-gap-md` | 16px | 48px | Card grid gaps |
| **Gap LG** | `--spacing-gap-lg` | 24px | 72px | Section-level gaps |

---

## WordPress Preset Mapping

From `/src/styles/theme-variables.css`:

```css
--wp--preset--spacing--20: var(--spacing-gap-xs);     /* XS gap */
--wp--preset--spacing--30: var(--spacing-gap-sm);     /* SM gap */
--wp--preset--spacing--40: var(--spacing-gap-md);     /* MD gap (default blockGap) */
--wp--preset--spacing--50: var(--spacing-gap-lg);     /* LG gap */
--wp--preset--spacing--60: var(--spacing-section-sm); /* Section SM */
--wp--preset--spacing--70: var(--spacing-section-md); /* Section MD */
--wp--preset--spacing--80: var(--spacing-section-lg); /* Section LG */
```

**Usage in WordPress patterns:**
```html
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}}} -->
```

---

## Fluid Utility Classes

From `theme.css @layer utilities`:

```css
/* Section padding */
.py-section-sm { padding-top: var(--spacing-section-sm); padding-bottom: var(--spacing-section-sm); }
.py-section-md { padding-top: var(--spacing-section-md); padding-bottom: var(--spacing-section-md); }
.py-section-lg { padding-top: var(--spacing-section-lg); padding-bottom: var(--spacing-section-lg); }
.py-section-xl { padding-top: var(--spacing-section-xl); padding-bottom: var(--spacing-section-xl); }

/* Gap utilities */
.gap-fluid-xs { gap: var(--spacing-gap-xs); }
.gap-fluid-sm { gap: var(--spacing-gap-sm); }
.gap-fluid-md { gap: var(--spacing-gap-md); }
.gap-fluid-lg { gap: var(--spacing-gap-lg); }
```

From `global.css`:

```css
/* Grid gap modifiers */
.grid--gap-sm { gap: var(--spacing-gap-sm); }
.grid--gap-md { gap: var(--spacing-gap-md); }
.grid--gap-lg { gap: var(--spacing-gap-lg); }

/* Flex gap modifiers */
.flex--gap-sm { gap: var(--spacing-gap-sm); }
.flex--gap-md { gap: var(--spacing-gap-md); }
.flex--gap-lg { gap: var(--spacing-gap-lg); }

/* Section classes */
.section     { padding-block: var(--spacing-section-md); }
.section--sm { padding-block: var(--spacing-section-sm); }
.section--lg { padding-block: var(--spacing-section-lg); }
```

---

## Layout Constants

From `/src/styles/theme-base.css`:

```css
--container-max-width:        1600px;  /* Standard max width */
--container-max-width-narrow: 800px;   /* Reading/content width */
--container-max-width-wide:   1800px;  /* Wide layouts */

--header-bar-height: clamp(64px, 5vw, 80px); /* Sticky header offset */
```

**Note:** Per Q&A decision #11, the default container max-width has been expanded to **1600px** (from the previous 1440px) with fluid side gutters for an airy composition on large displays.

---

## Multi-Breakpoint Column Progression

Per Q&A decision #5, grid systems scale up to 6 columns on ultra-wide displays:

| Viewport Range | Columns (Archive) | Container Behaviour |
|----------------|-------------------|---------------------|
| 320px - 639px | 1 | Full width + `--spacing-container-sm` padding |
| 640px - 1023px | 2 | Full width + `--spacing-container-md` padding |
| 1024px - 1279px | 3 | Max 1280px centred |
| 1280px - 1439px | 4 | Max 1440px centred |
| 1440px - 1679px | 5 | Max 1600px centred |
| 1680px+ | 6 | Max 1800px centred |

### Implementation Pattern

```css
.archive-grid {
  display: grid;
  gap: var(--spacing-gap-md);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .archive-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .archive-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1280px) {
  .archive-grid { grid-template-columns: repeat(4, 1fr); }
}

@media (min-width: 1440px) {
  .archive-grid { grid-template-columns: repeat(5, 1fr); }
}

@media (min-width: 1680px) {
  .archive-grid { grid-template-columns: repeat(6, 1fr); }
}
```

---

## blockGap Implementation

`blockGap` is the WordPress-standard way to manage spacing between blocks.

### Canonical Variable

```css
--wp--style--block-gap: var(--spacing-gap-md); /* 16px -> 48px */
```

### Usage Patterns

```css
/* Stack pattern (vertical) — uses gap instead of margin */
.wp-block-group.is-layout-flow {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-gap-md);
}

/* Grid pattern (horizontal + vertical) */
.wp-block-group.is-layout-grid {
  display: grid;
  gap: var(--spacing-gap-md);
}

/* Split row-gap / column-gap for fine control */
.card-grid {
  display: grid;
  row-gap: var(--spacing-gap-lg);
  column-gap: var(--spacing-gap-md);
}
```

### React Implementation

```tsx
{/* Stack pattern — vertical gap, no margins */}
<div className="flex flex-col gap-fluid-md">
  <Hero />
  <CardGrid />
  <FAQ />
</div>

{/* Grid pattern — fluid gap */}
<div className="grid grid--gap-md">
  {cards.map(card => <Card key={card.id} />)}
</div>
```

---

## Component Spacing Patterns

### Section

```tsx
{/* Standard section with fluid vertical padding */}
<section className="py-section-md">
  <div className="container">
    {/* Content */}
  </div>
</section>
```

### Card

```css
/* Internal card padding — uses element tokens */
.wp-block-card {
  padding: var(--spacing-element-lg); /* 24px -> 48px */
}

/* Compact card */
.wp-block-card--compact {
  padding: var(--spacing-element-md); /* 16px -> 32px */
}
```

### Button

```css
/* Standard button padding */
.button {
  padding: var(--spacing-element-sm) var(--spacing-element-lg);
  /* vertical: 12px->24px, horizontal: 24px->48px */
}

/* Small button */
.button--sm {
  padding: var(--spacing-element-xs) var(--spacing-element-md);
}
```

### Container

```css
/* Standard container with fluid gutters */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin-inline: auto;
  padding-inline: var(--spacing-container-sm);
}
```

---

## Responsive Spacing Patterns

### Mobile-First with Clamp

Because all spacing tokens use `clamp()`, you typically **don't need responsive breakpoint classes** for spacing. The values scale automatically:

```tsx
{/* This JUST WORKS — clamp handles the rest */}
<section className="py-section-md">
  <div className="container">
    <div className="grid gap-fluid-md">
      <Card />
      <Card />
    </div>
  </div>
</section>
```

### When to Add Breakpoint Overrides

Only add responsive Tailwind classes when you need a **structural change**, not a size change:

```tsx
{/* Structural change: 1 column -> 3 columns */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-md">
  <Card />
  <Card />
  <Card />
</div>
```

---

## Best Practices

### DO

1. **Use fluid spacing tokens for all spacing**
   ```css
   padding: var(--spacing-element-md);
   gap: var(--spacing-gap-md);
   ```

2. **Use `gap` instead of margins for child spacing**
   ```tsx
   <div className="flex flex-col gap-fluid-md">
     <BlockA />
     <BlockB />
   </div>
   ```

3. **Use `padding-block` for section separation**
   ```tsx
   <section className="py-section-md">...</section>
   ```

4. **Use `padding-inline` for horizontal gutters**
   ```css
   .container { padding-inline: var(--spacing-container-sm); }
   ```

### DON'T

1. **Don't use margins for layout spacing**
   ```css
   /* WRONG */
   .section { margin-bottom: 64px; }
   
   /* CORRECT */
   .section { padding-block: var(--spacing-section-md); }
   ```

2. **Don't hardcode pixel/rem values**
   ```css
   /* WRONG */
   padding: 2.5rem;
   
   /* CORRECT */
   padding: var(--spacing-element-lg);
   ```

3. **Don't skip the fluid scale**
   ```css
   /* WRONG */
   gap: 45px; /* Not in scale */
   
   /* CORRECT */
   gap: var(--spacing-gap-md); /* Fluid: 16px -> 48px */
   ```

4. **Don't mix old semantic and new token names**
   ```css
   /* WRONG — mixing legacy and current */
   padding: var(--space-md); /* Old name */
   gap: var(--spacing-gap-md); /* Current name */
   ```

---

## Migration from Old System

### Legacy Token Mapping

| Old Token | New Token | Notes |
|-----------|-----------|-------|
| `--space-xs` | `--spacing-element-xs` | Element-level |
| `--space-sm` | `--spacing-element-sm` | Element-level |
| `--space-md` | `--spacing-element-md` | Element-level |
| `--space-lg` | `--spacing-element-lg` | Element-level |
| `--space-xl` | `--spacing-element-xl` | Element-level |
| `--spacing-fluid-md` | `--spacing-gap-md` | Use for gaps |
| `--spacing-fluid-lg` | `--spacing-gap-lg` | Use for gaps |
| `p-4` / `p-6` (Tailwind) | `var(--spacing-element-md)` / `var(--spacing-element-lg)` | In BEM CSS classes |
| `py-12 md:py-16 lg:py-20` | `py-section-sm` | Single fluid class |
| `gap-4 md:gap-6 lg:gap-8` | `gap-fluid-md` | Single fluid class |

### Before / After Examples

**Before (multiple breakpoint classes):**
```tsx
<section className="py-12 md:py-16 lg:py-20">
  <div className="grid gap-4 md:gap-6 lg:gap-8">
    ...
  </div>
</section>
```

**After (single fluid tokens):**
```tsx
<section className="py-section-sm">
  <div className="grid gap-fluid-md">
    ...
  </div>
</section>
```

---

## Implementation Checklist

- [ ] Remove all `m-`, `mt-`, `mb-`, `ml-`, `mr-` classes from layout orchestration
- [ ] Replace with `gap-fluid-*` on parent containers
- [ ] Use `py-section-*` for section separation
- [ ] Ensure `clamp()` is used for all spacing values
- [ ] Test at 320px (mobile) and 1920px (large desktop)
- [ ] Verify 6-column grid works at 1680px+
- [ ] Confirm no hardcoded px/rem spacing values in CSS
- [ ] Confirm no inline `style={{ padding: ... }}` in JSX

---

## Related Documentation

- [MODERN-TYPOGRAPHY.md](MODERN-TYPOGRAPHY.md) — Fluid typography system
- [breakpoints.md](breakpoints.md) — Responsive breakpoint system
- [colors.md](colors.md) — Color tokens
- [spacing.md](spacing.md) — Legacy reference (deprecated)
- [borders.md](borders.md) — Border tokens
- [radii.md](radii.md) — Border radius tokens
- [shadows.md](shadows.md) — Shadow tokens

---

**Version:** 4.0
**Last Updated:** March 2026
**Source of Truth:** `/src/styles/theme-base.css`, `/src/styles/theme-variables.css`
