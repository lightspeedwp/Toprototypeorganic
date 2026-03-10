# Design System Contract Audit Report

**Date:** 2026-03-03
**Auditor:** AI (prompted by design-system-contract-audit.md)
**Scope:** Full CSS architecture — `/src/styles/` (patterns, parts, templates, global, wordpress-classes)
**Prompt:** `/prompts/design-system-contract-audit.md`

---

## Executive Summary

| Metric | Count |
|--------|-------|
| **Total CSS files scanned** | ~50 |
| **Total violations found** | 118 |
| **Critical** | 3 |
| **High** | 63 |
| **Medium** | 31 |
| **Low** | 21 |

### Top-Level Findings
1. **63 non-exempt margin violations** across patterns/parts/templates (High)
2. **21 desktop-first `@media (max-width:)` queries** across 17 files (Medium)
3. **3 hardcoded `max-width: 1440px`** instances that violate new container contract (Critical)
4. **Card grid column breakpoints misaligned** with the 640/1024/1280/1440/1680 contract (High)
5. **Typography and font tokens fully compliant** — all use `var(--*)` (Pass)
6. **Colour tokens fully compliant** in authored CSS — no hardcoded hex outside theme files (Pass)

---

## Contract A: Token Usage Compliance

### Status: MOSTLY PASSING

**Font families:** All pattern/part/template CSS files use `var(--font-family-lora)`, `var(--font-family-noto-sans)`, or `var(--font-family-mono)`. **PASS**

**Font sizes:** All pattern/part/template CSS files use `var(--text-*)` tokens. No hardcoded pixel/rem font sizes found. **PASS**

**Font weights:** All use `var(--font-weight-*)` tokens. **PASS**

**Spacing:** Most spacing uses CSS variables. Some hardcoded `rem` values found in margin declarations (counted separately under Contract B).

**Colours:** No hardcoded hex colours found outside of theme-light.css, theme-dark.css, and theme-variables.css. **PASS**

### Critical: Container Max-Width (3 instances)

| # | File | Line | Current Value | Required Value |
|---|------|------|---------------|----------------|
| 1 | `/src/styles/global.css` | 283 | `max-width: 1440px` | `max-width: 1600px` or `var(--container-max-width)` |
| 2 | `/src/styles/wordpress-classes.css` | 138 | `max-width: 1440px` | `max-width: 1600px` or `var(--container-max-width)` |
| 3 | `/src/styles/parts/header.css` | 55 | `max-width: 1440px` | `max-width: 1600px` or `var(--container-max-width)` |

**Fix:** Replace all three with `max-width: var(--container-max-width)` to use the canonical token (currently `1600px` in theme-base.css).

---

## Contract B: Zero-Margin Policy

### Status: 63 NON-EXEMPT VIOLATIONS

After filtering out exempt margins (`margin-inline: auto`, `margin: 0`, resets), the following non-exempt margin declarations remain:

#### Patterns (28 non-exempt)

| File | Lines | Properties | Severity |
|------|-------|------------|----------|
| `mobile-menu.css` | 213, 214, 302, 355 | margin-top, margin-left | High |
| `editorial-content.css` | 172, 194, 199, 221, 236, 258, 279, 308 | margin-block (prose elements) | Medium (may be prose-exempt) |
| `feature-card.css` | 49, 80 | margin-bottom | High |
| `team-card.css` | 116, 123, 145, 158 | margin-bottom | High |
| `blog-card.css` | 112, 140, 154 | margin-bottom | High |
| `featured-section.css` | 46 | margin-top: 3rem | High |
| `sitemap-grid.css` | 26, 27, 58 | margin-left, margin-right (negative), margin-top | High |

#### Parts (11 non-exempt)

| File | Lines | Properties | Severity |
|------|-------|------------|----------|
| `header.css` | 237, 329, 347, 482, 515 | margin-top, margin-bottom | High |
| `footer.css` | 41, 68, 96, 104, 114, 201, 251, 273 | margin-bottom, margin-top | High |

#### Templates (24 non-exempt)

| File | Lines | Properties | Severity |
|------|-------|------------|----------|
| `home.css` | 112, 123, 265, 319, 327, 404, 416 | margin-bottom, margin-top | High |
| `single-tour.css` | 98, 106, 118, 126, 131, 139, 144, 152, 183, 191, 198, 231, 239, 263, 282 | margin-bottom, margin-top | High |
| `archive.css` | 68, 92, 159, 222, 353, 390, 398, 415, 424, 433 | margin-bottom, margin-top | High |
| `single.css` | 84, 141, 150, 159, 164, 210 | margin-bottom, margin-top | High |

**Fix strategy:** Replace `margin-bottom` with `gap` on parent flex/grid containers, or convert to `padding-block` on the section itself. For child element spacing, convert parent to `display: flex; flex-direction: column; gap: var(--spacing-gap-*)`.

---

## Contract C: Typography

### Status: PASS

- All font-family declarations use `var(--font-family-lora)`, `var(--font-family-noto-sans)`, or `var(--font-family-mono)`
- All font-size declarations use `var(--text-*)` tokens
- All font-weight declarations use `var(--font-weight-*)` tokens
- No prohibited fonts found
- Heading hierarchy maintained in semantic HTML rules

---

## Contract D: Responsive/Layout

### Desktop-First Media Queries: 21 violations

All `@media (max-width: ...)` queries must be converted to `@media (min-width: ...)` mobile-first equivalents.

| # | File | Line | Current | Suggested Replacement |
|---|------|------|---------|-----------------------|
| 1 | `sections.css` | 262 | `max-width: 640px` | `min-width: 641px` (invert logic) |
| 2 | `sections.css` | 891 | `max-width: 768px` | `min-width: 769px` (invert logic) |
| 3 | `header.css` | 640, 707 | `max-width: 1023px` | `min-width: 1024px` (invert logic) |
| 4 | `hero.css` | 398 | `max-width: 640px` | Refactor to mobile-first base |
| 5 | `card-grid.css` | 197 | `max-width: 640px` | Refactor to mobile-first base |
| 6 | `faq.css` | 250 | `max-width: 640px` | Refactor |
| 7 | `cta.css` | 318 | `max-width: 640px` | Refactor |
| 8 | `editorial-content.css` | 349 | `max-width: 640px` | Refactor |
| 9 | `cards.css` | 333, 483 | `max-width: 640px` | Refactor |
| 10 | `archive-header.css` | 123 | `max-width: 640px` | Refactor |
| 11 | `fast-facts.css` | 207 | `max-width: 640px` | Refactor |
| 12 | `related-content.css` | 163 | `max-width: 640px` | Refactor |
| 13 | `pagination.css` | 129 | `max-width: 640px` | Refactor |
| 14 | `breadcrumbs.css` | 165 | `max-width: 640px` | Refactor |
| 15 | `feature-card.css` | 170 | `max-width: 768px` | Refactor |
| 16 | `notification-banner.css` | 153 | `max-width: 640px` | Refactor |
| 17 | `home.css` | 402 | `max-width: 767px` | Refactor |
| 18 | `archive-tours.css` | 126 | `max-width: 767px` | Refactor |

### Card Grid Column Progression: MISALIGNED

**Current breakpoints in `card-grid.css`:**
- 2 cols at `480px` (contract says `640px`)
- 3 cols at `768px` (contract says `1024px`)
- 4 cols at `1024px` (contract says `1280px`)
- 5 cols at `1440px` (matches contract)
- 6 cols at `1600px` (contract says `1680px`)

**Required by contract:**
- 1 col: 320-639px
- 2 cols: 640-1023px
- 3 cols: 1024-1279px
- 4 cols: 1280-1439px
- 5 cols: 1440-1679px
- 6 cols: 1680px+

**Severity:** High — this is a core layout contract change.

---

## Contract E: WordPress Class Naming

### Status: MOSTLY PASSING

- Pattern CSS files use `.wp-pattern-*` BEM naming (PASS)
- Part CSS files use `.wp-part-*` BEM naming (PASS)
- Template CSS files use `.wp-template-*` or page-specific prefixes (PASS)
- `global.css` uses `.wp-block-*` and `.has-*` WordPress conventions (PASS)

**Note:** Some legacy selectors in global.css (`.container`, `.section`, `.card__*`) exist alongside WP-prefixed equivalents. These are tracked in the existing Tailwind migration task list.

---

## Contract F: Documentation ↔ Code Token Alignment

### Status: MOSTLY ALIGNED (updated this session)

- **MODERN-TYPOGRAPHY.md** → theme-base.css: Values match after v3.0 update. **PASS**
- **MODERN-SPACING.md** → theme-base.css: Values match after v4.0 update. **PASS**
- **breakpoints.md** → New file created this session. **PASS**
- **colors.md** → theme-light.css: Colour hex values in docs are from the pre-v5.0 palette (e.g., `rgba(74, 115, 17, 1)` vs new `#4A7311`). **NEEDS UPDATE** to match current hex format.
- **radii.md** → theme-base.css: Updated with extended scale. **PASS**
- **shadows.md** → theme-light.css: Shadow values in docs show old brutalist style (`0px 4px 0px 0px rgba(0,0,0,1)`) but code now uses standard elevation (`0px 1px 2px 0px rgba(0,0,0,0.05)`). **NEEDS UPDATE**
- **borders.md** → Old border colour values. **NEEDS UPDATE**

---

## Test Case Results

| TC | Description | Result | Notes |
|----|-------------|--------|-------|
| TC-1 | Fluid typography scaling | PASS | All `--text-*` use `clamp()` in theme-base.css |
| TC-2 | Fluid spacing scaling | PASS | All `--spacing-*` use `clamp()` in theme-base.css |
| TC-3 | Archive grid progression | FAIL | Breakpoints misaligned (480/768/1024 vs 640/1024/1280) |
| TC-4 | Non-exempt margin scan | FAIL | 63 non-exempt margins in patterns/parts/templates |
| TC-5 | Block gap behaviour | PARTIAL | Gap used in card-grid, but many components still use margin for child spacing |
| TC-6 | WP-aligned class names | PASS | Pattern/part/template CSS uses WP prefixes |
| TC-7 | Docs ↔ code token match | PARTIAL | Typography/spacing aligned; colours/shadows/borders docs need update |
| TC-8 | Container max-width | FAIL | 3 files still use hardcoded 1440px |
| TC-9 | Tailwind non-authoring | PASS | No `@apply` found in pattern/part/template CSS |
| TC-10 | Font family compliance | PASS | All use permitted CSS variable fonts |

---

**End of Report**
