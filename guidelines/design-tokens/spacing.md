# Spacing Design Tokens

**Version:** 6.0 — Fully Fluid Utility System
**Last Updated:** March 2026
**Status:** Production Ready
**Source of Truth:** `/src/styles/theme-base.css`, `/src/styles/theme.css`

---

## Overview

This document defines the **gap-first spacing system** for the LightSpeed Tour Operator prototype. All layout spacing between sibling elements uses `flex`/`grid` **gap** — never margins. Padding is used for internal component spacing and section rhythm.

**All gap and padding values MUST use the fluid utility classes** defined in `/src/styles/theme.css`. These classes reference `clamp()` CSS variables from `/src/styles/theme-base.css`, ensuring spacing scales fluidly with the viewport.

**For fluid spacing token values**, see [MODERN-SPACING.md](MODERN-SPACING.md).
**For layout block patterns** (Group, Stack, Row, Columns, Grid), see [/guidelines/blocks/design/](/guidelines/blocks/design/).

---

## Core Principles

### 1. Gap-First, Always

Every parent container that has multiple children MUST use `flex` or `grid` with a `gap` to space them. Children never push each other apart — the parent controls the rhythm.

```tsx
// ✅ CORRECT — parent controls spacing via gap
<div className="flex flex-col gap-6">
  <h2>Title</h2>
  <p>Description</p>
  <CardGrid />
</div>

// ❌ WRONG — children push each other with margin
<div>
  <h2 className="mb-4">Title</h2>
  <p className="mb-6">Description</p>
  <CardGrid />
</div>
```

### 2. Zero Margin Policy

Margins are **strictly prohibited** on:
- Headings (`h1`–`h6`)
- Paragraphs (`p`)
- Buttons
- Cards
- Any layout-level element

**The parent always controls spacing between its children via `gap`.**

### 3. Allowed Margin Exceptions

| Exception | Example | Reason |
|-----------|---------|--------|
| `mx-auto` | Centering a block element | Standard CSS centering pattern |
| `mb-0` / `mt-0` / `m-0` | Resetting inherited defaults | Override browser/library defaults |
| Negative margins (`-mt-*`, `-mb-*`) | Overlay effects, stats overlapping hero banners | Intentional design overlap |
| `sr-only` / accessibility helpers | Screen reader utilities | Accessibility requirement |
| `margin-inline: auto` on containers | Container centering | WordPress alignment pattern |

**Everything else uses gap or padding.**

### 4. No `space-y-*` or `space-x-*`

Tailwind's `space-y-*` and `space-x-*` utilities use `> * + * { margin-top }` under the hood — they are margin abstractions.

**Replace all `space-y-*` with `flex flex-col gap-*`.**
**Replace all `space-x-*` with `flex gap-*`.**

```tsx
// ❌ DEPRECATED — space-y uses margin under the hood
<div className="space-y-4">
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</div>

// ✅ CORRECT — flex gap is explicit and predictable
<div className="flex flex-col gap-4">
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</div>
```

### 5. No Arbitrary Gap Values — Use Fluid Utility Classes

**Tailwind arbitrary values like `gap-[var(--spacing-gap-lg)]` are PROHIBITED.**

The design system provides dedicated fluid utility classes for every spacing token. These are shorter, more readable, and ensure consistent usage across the codebase.

```tsx
// ❌ PROHIBITED — arbitrary Tailwind value
<div className="flex flex-col gap-[var(--spacing-gap-lg)]">

// ❌ PROHIBITED — arbitrary Tailwind value
<div className="flex flex-col gap-[var(--spacing-element-md)]">

// ✅ CORRECT — fluid utility class
<div className="flex flex-col gap-fluid-lg">

// ✅ CORRECT — fluid element-gap utility class
<div className="flex flex-col gap-element-md">
```

**Why?**
- Shorter and more readable class names
- Enforces consistent token usage (no typos in variable names)
- Easier to grep/audit across the codebase
- All backed by the same `clamp()` CSS variables

---

## 🚨 Complete Fluid Utility Class Reference

All fluid utility classes are defined in `/src/styles/theme.css`. They reference `clamp()` CSS variables from `/src/styles/theme-base.css`.

### Fluid Gap Utilities (layout gaps between siblings)

| Utility Class | CSS Variable | Mobile (320px) | Desktop (1920px) | Use Case |
|---------------|-------------|----------------|------------------|----------|
| `gap-fluid-xs` | `--spacing-gap-xs` | 8px | 20px | Tight grid/flex gaps |
| `gap-fluid-sm` | `--spacing-gap-sm` | 12px | 32px | Standard component gaps |
| `gap-fluid-md` | `--spacing-gap-md` | 16px | 48px | Card grids, section content |
| `gap-fluid-lg` | `--spacing-gap-lg` | 24px | 72px | Section-level gaps, page containers |

### Fluid Element-Gap Utilities (internal component gaps)

| Utility Class | CSS Variable | Mobile (320px) | Desktop (1920px) | Use Case |
|---------------|-------------|----------------|------------------|----------|
| `gap-element-xs` | `--spacing-element-xs` | 8px | 16px | Tight internal gaps (icon+text) |
| `gap-element-sm` | `--spacing-element-sm` | 12px | 24px | Card content, form fields |
| `gap-element-md` | `--spacing-element-md` | 16px | 32px | Component content groups |
| `gap-element-lg` | `--spacing-element-lg` | 24px | 48px | Large component internal sections |
| `gap-element-xl` | `--spacing-element-xl` | 32px | 72px | Hero/CTA internal spacing |

### Fluid Section Padding

| Utility Class | CSS Variable | Mobile (320px) | Desktop (1920px) | Use Case |
|---------------|-------------|----------------|------------------|----------|
| `py-section-sm` | `--spacing-section-sm` | 40px | 80px | Small sections |
| `py-section-md` | `--spacing-section-md` | 64px | 128px | Standard sections |
| `py-section-lg` | `--spacing-section-lg` | 80px | 160px | Hero, large sections |
| `py-section-xl` | `--spacing-section-xl` | 96px | 192px | Maximum section spacing |

### Fluid Container Padding

| Utility Class | CSS Variable | Mobile (320px) | Desktop (1920px) | Use Case |
|---------------|-------------|----------------|------------------|----------|
| `px-container-sm` | `--spacing-container-sm` | 16px | 40px | Narrow containers |
| `px-container-md` | `--spacing-container-md` | 24px | 64px | Standard containers |
| `px-container-lg` | `--spacing-container-lg` | 32px | 96px | Wide containers |

### Fluid Element Padding

| Utility Class | CSS Variable | Use Case |
|---------------|-------------|----------|
| `p-element-xs` | `--spacing-element-xs` | Tight component padding |
| `p-element-sm` | `--spacing-element-sm` | Small card/button padding |
| `p-element-md` | `--spacing-element-md` | Standard card padding |
| `p-element-lg` | `--spacing-element-lg` | Large component padding |
| `p-element-xl` | `--spacing-element-xl` | Hero/CTA padding |
| `px-element-xs` through `px-element-lg` | Horizontal only | Inline padding |
| `py-element-xs` through `py-element-lg` | Vertical only | Block padding |
| `pt-element-sm`, `pt-element-md` | Top only | Top padding |
| `pb-element-sm`, `pb-element-md` | Bottom only | Bottom padding |

### Quick Reference

| Before (deprecated) | After (correct) |
|---------------------|-----------------| 
| `space-y-1` | `flex flex-col gap-1` |
| `space-y-1.5` | `flex flex-col gap-1.5` |
| `space-y-2` | `flex flex-col gap-2` |
| `space-y-3` | `flex flex-col gap-3` |
| `space-y-4` | `flex flex-col gap-4` |
| `space-y-6` | `flex flex-col gap-6` |
| `space-y-8` | `flex flex-col gap-8` |
| `space-y-12` | `flex flex-col gap-12` |
| `space-x-4` | `flex flex-row gap-4` (or `flex gap-4`) |

### Arbitrary Values → Fluid Utility Classes

| Before (deprecated) | After (correct) |
|---------------------|-----------------| 
| `gap-[var(--spacing-gap-xs)]` | `gap-fluid-xs` |
| `gap-[var(--spacing-gap-sm)]` | `gap-fluid-sm` |
| `gap-[var(--spacing-gap-md)]` | `gap-fluid-md` |
| `gap-[var(--spacing-gap-lg)]` | `gap-fluid-lg` |
| `gap-[var(--spacing-element-xs)]` | `gap-element-xs` |
| `gap-[var(--spacing-element-sm)]` | `gap-element-sm` |
| `gap-[var(--spacing-element-md)]` | `gap-element-md` |
| `gap-[var(--spacing-element-lg)]` | `gap-element-lg` |
| `gap-[var(--spacing-element-xl)]` | `gap-element-xl` |
| `p-[var(--spacing-element-md)]` | `p-element-md` |
| `px-[var(--spacing-element-md)]` | `px-element-md` |
| `py-[var(--spacing-element-sm)]` | `py-element-sm` |
| `pt-[var(--spacing-element-md)]` | `pt-element-md` |
| `pb-[var(--spacing-element-sm)]` | `pb-element-sm` |

### When to Use Fixed vs Fluid

| Context | Use Fixed (`gap-2`, `gap-4`) | Use Fluid (`gap-fluid-*`, `gap-element-*`) |
|---------|------------------------------|-------------------------------------------|
| Icon + label | ✅ `gap-2` | — |
| Title + subtitle group | ✅ `gap-2` / `gap-3` | — |
| Card meta items | ✅ `gap-3` | — |
| Card content sections | — | ✅ `gap-element-sm` |
| Grid of cards | — | ✅ `gap-fluid-md` |
| Section content blocks | — | ✅ `gap-fluid-md` / `gap-fluid-lg` |
| Page-level containers | — | ✅ `gap-fluid-lg` |
| Section vertical rhythm | — | ✅ `py-section-*` |

**Rule of thumb:** If the spacing should **grow with the viewport**, use a fluid utility. If it should remain **constant** (tight internal relationships), use a fixed Tailwind value.

### Mobile-Friendly Stacking Pattern

Page headers and toolbar rows that place a title/description alongside an action button **MUST** stack vertically on mobile and switch to side-by-side on desktop. This prevents buttons from overflowing the viewport on small screens.

```tsx
// ✅ CORRECT — stacks on mobile, side-by-side on md+
<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-fluid-sm">
  <div className="flex flex-col gap-element-sm">
    <h1>Page Title</h1>
    <p className="text-muted-foreground">Description text</p>
  </div>

  <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground w-full md:w-auto md:shrink-0">
    Action
  </button>
</div>
```

**Key classes:**
| Class | Purpose |
|-------|---------|
| `flex flex-col` | Stack vertically by default (mobile) |
| `md:flex-row` | Switch to horizontal at `md` breakpoint |
| `md:items-start` | Align items to top in horizontal mode |
| `md:justify-between` | Push title and button to opposite edges |
| `gap-fluid-sm` | Fluid gap between stacked/side-by-side elements |
| `w-full md:w-auto` | Button spans full width on mobile, auto on desktop |
| `md:shrink-0` | Prevent button from shrinking in flex row |
| `justify-center` | Center button content when full-width on mobile |

**❌ WRONG — button overflows on mobile:**
```tsx
<div className="flex items-start justify-between gap-6">
  <div>
    <h1>Page Title</h1>
    <p>Description</p>
  </div>
  <button className="px-6 py-3">Action</button>
</div>
```

---

## Implementation Checklist

- [ ] All `space-y-*` replaced with `flex flex-col gap-*`
- [ ] All `space-x-*` replaced with `flex gap-*`
- [ ] All `gap-[var(--spacing-*)]` arbitrary values replaced with fluid utility classes
- [ ] All `p-[var(--spacing-*)]` / `px-` / `py-` / `pt-` / `pb-` arbitrary values replaced with fluid utility classes
- [ ] No `mb-*`, `mt-*`, `ml-*`, `mr-*` on headings, paragraphs, or buttons
- [ ] Title + subtitle groups wrapped in `flex flex-col gap-2` containers
- [ ] Parent containers use appropriate gap scale
- [ ] Fluid gap tokens used for viewport-responsive spacing
- [ ] Section padding uses `py-section-*` classes
- [ ] Negative margins documented and intentional only
- [ ] `mx-auto` used only for centering