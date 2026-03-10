# Light & Dark Mode Style Audit Report
**Project:** LightSpeed Tour Operator Prototype  
**Date:** 2026-03-03  
**Auditor:** AI Assistant (prompted by `/prompts/light-dark-mode-style-audit.md`)  
**Overall Status:** ✅ PASS (all P0/P1 violations resolved)

---

## Executive Summary

| Phase | Status | Findings | Fixed |
|-------|--------|----------|-------|
| 1A — theme-base.css completeness | ✅ PASS | 0 | — |
| 1B — theme-light.css colour-only | ✅ PASS | 0 | — |
| 1C — theme-dark.css all tokens overridden | ✅ PASS | 0 | — |
| 1D — theme-variables.css uses var() | ✅ PASS | 0 | — |
| 2 — Hardcoded hex in CSS files | ✅ PASS | 0 (outside theme files) | — |
| 3A — Inline styles with colours | ✅ PASS | 0 violations (dynamic positional inline styles: acceptable) | — |
| 3B — Hardcoded hex in JSX | ✅ PASS | 0 | — |
| 3C — Tailwind dark: prefix classes | ✅ PASS | 0 in component/page files | — |
| 3D — Hardcoded font families | ✅ PASS | 0 in app files | — |
| **4 — Broken CSS variable references** | **🔧 FIXED** | **18 violations** | **18** |
| 5 — Hardcoded Tailwind color classes | 🔧 FIXED | 5 violations | 5 |
| 6 — tailwind.css clean | ✅ PASS | 0 UI styles | — |

---

## Phase 4 — Broken CSS Variable References (P1 — All Fixed)

### Root Cause
Several CSS files referenced `-rgb` suffix variables (e.g. `--primary-rgb`, `--background-rgb`) and `--color-*-rgb` suffix variables (e.g. `--color-background-rgb`) that **do not exist** in the design token system. These were left over from an older theme architecture that exposed raw RGB channel values alongside hex values. The theme refactor (v5.0) removed these in favour of pure hex tokens, but the consuming CSS files were not updated.

**Fix applied:** All `rgba(var(--*-rgb), opacity)` patterns replaced with the modern CSS `color-mix(in srgb, var(--token) X%, transparent)` syntax, which achieves identical results without needing separate RGB channel variables.

### Violations Fixed

| File | Line | Old Value | New Value |
|------|------|-----------|-----------|
| `parts/header.css` | 38 | `rgba(var(--color-background-rgb), 0.95)` | `color-mix(in srgb, var(--background) 95%, transparent)` |
| `parts/footer.css` | 29 | `rgba(var(--color-muted-rgb), 0.3)` | `color-mix(in srgb, var(--muted) 30%, transparent)` |
| `parts/footer.css` | 111 | `rgba(var(--color-foreground-rgb), 0.8)` | `color-mix(in srgb, var(--foreground) 80%, transparent)` |
| `parts/footer.css` | 181 | `rgba(var(--color-primary-rgb), 0.1)` | `color-mix(in srgb, var(--primary) 10%, transparent)` |
| `parts/footer.css` | 198 | `rgba(var(--color-foreground-rgb), 0.8)` | `color-mix(in srgb, var(--foreground) 80%, transparent)` |
| `parts/footer.css` | 242 | `rgba(var(--color-primary-rgb), 0.1)` | `color-mix(in srgb, var(--primary) 10%, transparent)` |
| `parts/footer.css` | 336 | `rgba(var(--color-muted-foreground-rgb), 0.5)` | `color-mix(in srgb, var(--muted-foreground) 50%, transparent)` |
| `patterns/cta.css` | 38 | `rgba(var(--primary-rgb), 0.1)` | `color-mix(in srgb, var(--primary) 10%, transparent)` |
| `patterns/cta.css` | 40 | `rgba(var(--primary-rgb), 0.05)` | `color-mix(in srgb, var(--primary) 5%, transparent)` |
| `patterns/cta.css` | 76 | `rgba(var(--background-rgb), 0.9)` | `color-mix(in srgb, var(--background) 90%, transparent)` |
| `patterns/cta.css` | 77 | `rgba(var(--background-rgb), 0.8)` | `color-mix(in srgb, var(--background) 80%, transparent)` |
| `patterns/cta.css` | 78 | `rgba(var(--background-rgb), 0.9)` | `color-mix(in srgb, var(--background) 90%, transparent)` |
| `patterns/editorial-content.css` | 317 | `rgba(var(--primary-rgb), 0.1)` | `color-mix(in srgb, var(--primary) 10%, transparent)` |
| `patterns/editorial-content.css` | 322 | `rgba(var(--destructive-rgb), 0.1)` | `color-mix(in srgb, var(--destructive) 10%, transparent)` |
| `patterns/editorial-content.css` | 327 | `rgba(var(--success-rgb), 0.1)` | `color-mix(in srgb, var(--success) 10%, transparent)` |
| `patterns/taxonomy-nav.css` | 84 | `rgba(var(--foreground-rgb), 0.1)` | `color-mix(in srgb, var(--foreground) 10%, transparent)` |
| `patterns/taxonomy-nav.css` | 90 | `rgba(255, 255, 255, 0.2)` | `color-mix(in srgb, var(--primary-foreground) 20%, transparent)` |
| `templates/home.css` | 47 | `rgba(var(--primary-rgb), 0.05)` | `color-mix(in srgb, var(--primary) 5%, transparent)` |
| `common/back-to-top.css` | 40 | `rgba(var(--primary-rgb), 0.9)` | `color-mix(in srgb, var(--primary) 90%, transparent)` |

---

## Phase 5 — Hardcoded Tailwind Color Classes (P1 — All Fixed)

### Violations Fixed

| File | Old Value | New Value |
|------|-----------|-----------|
| `templates/ArchiveDestinationTemplate.tsx` | `bg-orange-500/10 text-orange-600` | `bg-primary/10 text-primary` |
| `templates/ArchiveDestinationTemplate.tsx` | `bg-blue-500/10 text-blue-600` | `bg-secondary/10 text-secondary` |
| `templates/ArchiveDestinationTemplate.tsx` | `bg-amber-500/10 text-amber-600` | `bg-accent/10 text-accent` |
| `templates/ArchiveDestinationTemplate.tsx` | `bg-emerald-500/10 text-emerald-600` | `bg-muted text-muted-foreground` |
| `pages/DestinationsArchiveTest.tsx` | `bg-green-100 border-green-300 text-green-800 text-green-700` | `bg-success/10 border-success text-success text-muted-foreground` |

---

## Acceptable Inline Styles (P4 — No Action Required)

The following `style={{}}` usages were reviewed and accepted because they contain **only dynamic positional/layout values** — never hardcoded colours or fonts:

| File | Usage | Reason |
|------|-------|--------|
| `LoadingState.tsx` | `width/height` from numeric props | Dynamic layout |
| `Skeleton.tsx` | `width/height` from numeric props | Dynamic layout |
| `GroupBlock.tsx` | `backgroundImage: url(...)`, `opacity` | Dynamic content |
| `SiteLogo.tsx` | `width` from prop | Dynamic sizing |
| `RelatedRegionsBlock.tsx` | `gridTemplateColumns` | Dynamic grid |
| `progress.tsx` | `translateX` transform | Animation |
| `chart.tsx` | `backgroundColor: item.color` | Chart data value |
| `SwipeableCard.tsx` | `opacity`, `transform` | Touch gesture animation |
| `PullToRefresh.tsx` | `height`, `transform`, `animation` | Gesture animation |
| `BottomSheet.tsx` | `height`, `transform`, `opacity` | Gesture animation |
| `TripPlannerPage.tsx` | `width: percentage` | Progress bar |
| `TourComparisonPage.tsx` | `gridTemplateColumns` | Dynamic column count |
| `ShadowScale.tsx` | `boxShadow: var(${t.variable})` | Dev tool (uses CSS var) |
| `RadiusSpecimens.tsx` | `borderRadius: var(${t.variable})` | Dev tool (uses CSS var) |
| `SpacingScale.tsx` | `height: var(${t.variable})` | Dev tool (uses CSS var) |
| `AnimationsShowcase.tsx` | `boxShadow: "var(--elevation-sm)"` | Uses CSS variable |
| `CardInteractions.tsx` | `backgroundColor: var(${item.variable})` | Dev tool (uses CSS var) |
| `SectionStylesShowcase.tsx` | `backgroundImage: url(unsplash)` | Demo image URL |

**Note on `src/imports/ToPlugin.tsx`:** This file is auto-generated from a Figma import and is outside the scope of the design system audit. It is not consumed by any page routes and should be considered read-only generated code.

---

## CSS Variable System Health Check

### Token Architecture — ✅ Clean

| File | Purpose | Status |
|------|---------|--------|
| `theme-base.css` | Shared tokens (typography, spacing, radius, animation) | ✅ Contains only theme-agnostic tokens |
| `theme-light.css` | Light mode colours + shadows + logos | ✅ Colour tokens only |
| `theme-dark.css` | Dark mode colour overrides under `.dark` | ✅ Overrides all semantic tokens |
| `theme-variables.css` | WordPress `--wp--preset--*` namespace | ✅ All values use `var()` references |
| `theme-funky.css` | Alternative vibrant theme | ✅ Colour-only overrides |
| `theme.css` | Orchestrator (imports + semantic HTML reset) | ✅ No hardcoded values |
| `tailwind.css` | Build pipeline compatibility bridge | ✅ No UI styles |

### Dark Mode Token Coverage — ✅ Complete

All 24 semantic colour tokens defined in `:root` (theme-light.css) have verified overrides in `.dark` (theme-dark.css):

- ✅ `--background` / `--foreground`
- ✅ `--card` / `--card-foreground`
- ✅ `--popover` / `--popover-foreground`
- ✅ `--primary` / `--primary-foreground`
- ✅ `--secondary` / `--secondary-foreground`
- ✅ `--accent` / `--accent-foreground`
- ✅ `--muted` / `--muted-foreground`
- ✅ `--destructive` / `--destructive-foreground`
- ✅ `--success` / `--success-foreground`
- ✅ `--warning` / `--warning-foreground`
- ✅ `--info` / `--info-foreground`
- ✅ `--border` / `--input` / `--input-background` / `--ring`
- ✅ All `--sidebar-*` tokens (8 tokens)
- ✅ All `--chart-*` tokens (5 tokens)
- ✅ `--elevation-sm/md/lg/xl`
- ✅ `--logo-url` / `--logo-icon-url`

---

## Outstanding Items for Future Audits

| Priority | Item | File | Notes |
|----------|------|------|-------|
| P3 | `breadcrumbs.css` uses `--color-*` prefix | `styles/breadcrumbs.css` | Functional (Tailwind maps these) but prefer direct `var(--token)` |
| P3 | `header.css` uses `--color-*` prefix throughout | `styles/parts/header.css` | Same as above — works, lower priority |
| P4 | `DesignSystemVerification.tsx` uses `width: '8px'` inline | Dev tools page | Hardcoded layout size, low severity |
| P4 | `ImageWithFallback.tsx` uses `bg-gray-100` | Protected component | Do not modify (protected file) |

---

## Recommendations

1. **Progressive cleanup of `--color-*` prefix usage** — `breadcrumbs.css` and `header.css` use the Tailwind-aliased `--color-*` variable names (e.g. `var(--color-border)` instead of `var(--border)`). Both work identically through the `@theme inline` bridge. Migrate to direct tokens (`var(--border)`) during next component update cycle.

2. **Add `--*-rgb` deprecation note** — Add a comment to `theme-light.css` and `theme-dark.css` explicitly documenting that `-rgb` suffix variables are deprecated and replaced by `color-mix()`. This prevents future contributors from re-introducing them.

3. **Run audit after each new page or pattern** — This audit should be run as part of the component generation checklist. The `/prompts/light-dark-mode-style-audit.md` prompt can be executed on-demand.
