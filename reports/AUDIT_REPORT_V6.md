# Audit Report V6: CSS Architecture & Data Integrity

**Date:** February 19, 2026  
**Scope:** `/src/` directory - CSS cascade analysis, data import verification, dead code detection  
**Status:** Complete

---

## Executive Summary

This audit identified **2 build-blocking errors**, **4 high-risk cascade conflicts**, **6 architecture violations**, and several remediation items. The critical issues are a broken data import (`POSTS` / `ALL_POSTS` names don't exist) and a dangerous overlap between `global.css` utility classes and Tailwind's generated utilities.

---

## Phase 1: CSS Import & Cascade Analysis

### 1.1 CSS Loading Order (index.css)

**Current order in `/src/styles/index.css`:**

```
1. fonts.css        - @font-face declarations
2. tailwind.css     - @import 'tailwindcss' + @source scanning
3. theme.css        - CSS variables (light/dark) + @theme inline block
4. global.css       - CSS reset, semantic HTML rules, utility classes
5. sections.css     - Section preset styles (22 types)
6. breadcrumbs.css  - Breadcrumb styles
7. print.css        - Print media queries
```

**Finding:** The order is *mostly correct* (variables before consumers, base before components, print last). However:

#### CRITICAL: `global.css` loads AFTER Tailwind and redefines identical class names

| global.css class | Tailwind class | Conflict |
|---|---|---|
| `.flex { display: flex }` | `.flex { display: flex }` | Benign duplicate |
| `.grid { display: grid; gap: var(--spacing-gap-md) }` | `.grid { display: grid }` | **DANGEROUS** - adds unwanted default `gap` |
| `.hidden { display: none }` | `.hidden { display: none }` | Benign duplicate |
| `.relative/.absolute/.fixed/.sticky` | Same names | Benign duplicates |
| `.p-4`, `.py-12`, `.py-16`, `.mx-auto` | Same names | **DANGEROUS** - static values override Tailwind's dynamic values |
| `.card { background-color, border, border-radius, padding, box-shadow }` | Used by shadcn/ui Card | **DANGEROUS** - adds unwanted defaults to all `.card` elements |
| `.max-w-sm` through `.max-w-6xl` | Same names | Overrides with static values |
| `.cursor-pointer`, `.overflow-hidden`, `.opacity-*` | Same names | Benign duplicates |

**Impact:** Any component using Tailwind's `.grid` class will unexpectedly receive `gap: var(--spacing-gap-md)`. Any shadcn/ui `Card` component will receive `global.css`'s padding, border, and shadow on top of its own styles. The `.py-12` and `.py-16` classes in global.css use static `rem` values that conflict with the fluid `py-section-*` tokens we've been migrating to.

### 1.2 Component-to-CSS Mapping

**Components with explicit CSS imports (correct):**

| Component | CSS File | Status |
|---|---|---|
| `BannerCover.tsx` | `BannerCover.css` | OK |
| `Gallery.tsx` | `Gallery.css` | OK |
| `TourItinerary.tsx` | `TourItinerary.css` | OK |
| `TourInclusionsExclusions.tsx` | `TourInclusionsExclusions.css` | OK |
| `TourQuickFacts.tsx` | `TourQuickFacts.css` | OK |
| `TourTrustBadges.tsx` | `TourTrustBadges.css` | OK |
| `TourContactCTA.tsx` | `TourContactCTA.css` | OK |
| `TourGallerySection.tsx` | `TourGallerySection.css` | OK |
| `TourRelatedSection.tsx` | `TourRelatedSection.css` | OK |
| `TourOverview.tsx` | `TourOverview.css` | OK |
| `SingleTourTemplate.tsx` | `SingleTourTemplate.css` | OK |

**Components relying on global scope (no explicit CSS import):**

All components in `/src/app/components/patterns/`, `/src/app/components/parts/`, `/src/app/components/common/`, and `/src/app/components/layout/` rely entirely on Tailwind utility classes via `className` props. This is **acceptable** for this project's architecture (Tailwind-first with component-level CSS only for tour-operator blocks).

**Orphan CSS files:** None found. All CSS files in `/src/styles/` are imported by `index.css`. All component CSS files are imported by their respective `.tsx` files.

### 1.3 Specificity & `!important` Audit

| File | `!important` Count | Context | Severity |
|---|---|---|---|
| `global.css` | 4 | `@media (prefers-reduced-motion)` + `@media print .no-print` | **Acceptable** - accessibility/print media queries |
| `print.css` | 22 | All within `@media print {}` | **Acceptable** - print styles legitimately need overrides |
| `sections.css` | 2 | `@media print {}` block: `white !important`, `black !important` | **Low risk** - print-only, but uses hardcoded colors |

**Hardcoded colors in sections.css (print block):**
- Line 919: `background-color: white !important`
- Line 920: `color: black !important`
- Line 921: `border: 1px solid #ccc`
- Lines 153-154: `rgba(0, 0, 0, 0.4)` and `rgba(0, 0, 0, 0.6)` (gradient overlays)
- Lines 280-281: `rgba(255, 255, 255, 0.1)` (border opacity)

The gradient overlays and border opacity values are acceptable (they're transparency effects, not semantic colors). The print `white`/`black`/`#ccc` values are acceptable for print media.

### 1.4 preview.tsx Double-Import

`/preview.tsx` (Storybook config) imports CSS files individually AND also imports `index.css`:

```tsx
import "../src/styles/fonts.css";      // Also in index.css
import "../src/styles/theme.css";      // Also in index.css
import "../src/styles/tailwind.css";   // Also in index.css
import "../src/styles/sections.css";   // Also in index.css
import "../src/styles/print.css";      // Also in index.css
import "../src/styles/index.css";      // Imports ALL of the above again
```

**Impact:** Every CSS file is loaded twice in Storybook. The second load (via `index.css`) overrides the first, creating unpredictable cascade behavior when the load order differs.

---

## Phase 2: Data Layer Verification

### 2.1 Import/Export Mismatches

#### BUILD BLOCKER: `POSTS` does not exist

**File:** `/src/app/components/patterns/CardGrid.stories.tsx:6`
```tsx
import { TOURS, DESTINATIONS, POSTS } from '../../data/mock';
```

**Problem:** `mock.ts` exports `BLOG_POSTS`, not `POSTS`. No file in `/src/app/data/` exports a constant named `POSTS`.

**Fix:** Change `POSTS` to `BLOG_POSTS`.

#### BUILD BLOCKER: `ALL_POSTS` does not exist

**File:** `/src/app/pages/BlogSingle.tsx:41`
```tsx
import { ALL_POSTS, ALL_BLOG_CATEGORIES } from "../data/mockExpanded";
```

**Problem:** `mockExpanded.ts` exports `ALL_BLOG_POSTS`, not `ALL_POSTS`. No file in `/src/app/data/` exports a constant named `ALL_POSTS`.

**Fix:** Change `ALL_POSTS` to `ALL_BLOG_POSTS`.

### 2.2 Dual Re-Export Pattern (mock.ts vs index.ts)

The data layer has two "barrel" files that re-export from domain files:

| File | Purpose | Risk |
|---|---|---|
| `data/index.ts` | Full re-export of ALL domain files including `mockExpanded` | **Potential duplicate symbols** |
| `data/mock.ts` | Legacy re-export with alias mappings | **Missing exports for some names** |

**Specific gap in mock.ts:** `mock.ts` does NOT re-export `REVIEW_CATEGORIES`, `TEAM_ROLES`, `TEAM_MEMBERS`, or `SPECIAL_CATEGORIES` because it manually imports only `REVIEWS_DATA`, `TEAM_DATA`, and `SPECIALS_DATA` instead of using `export *`. Components that need these taxonomy constants must import from the domain files directly (e.g., `../data/reviews`) or from `../data` (index.ts).

**Current usage is correct** - pages importing taxonomy constants use the domain files or `mockExpanded.ts` directly. But this is fragile.

### 2.3 Path Resolution

All import paths verified as correct. No broken relative paths found.

### 2.4 Type Safety

All data files import TypeScript interfaces from `./types.ts`. No `any` types found in data imports. Type coverage is excellent.

### 2.5 Circular Dependency Analysis

**Import graph:**
```
pages/*.tsx → data/mock.ts → data/{tours,destinations,blog,...}.ts → data/types.ts
pages/*.tsx → data/mockExpanded.ts → data/{tours,...}.ts + data/generators.ts → data/types.ts
data/index.ts → data/mock.ts ❌ NO (index.ts imports from domain files directly)
data/index.ts → data/mockExpanded.ts → data/{domain files} → data/types.ts
```

**Result:** No circular dependencies detected. All import chains are unidirectional: `pages → barrel files → domain files → types`.

---

## Phase 3: Dead Code & Zombie Imports

### 3.1 Legacy Static Spacing Classes in global.css

`global.css` defines static spacing utilities that are now superseded by the fluid `py-section-*` tokens:

```css
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.py-16 { padding-top: 4rem; padding-bottom: 4rem; }
```

These are **dead code** since the entire codebase has been migrated to `py-section-sm`, `py-section-md`, `py-section-lg`, `py-section-xl`. They should be removed to avoid confusion.

### 3.2 Storybook Preview Double-Import

As noted in 1.4, `preview.tsx` imports CSS files that are already imported by `index.css`.

### 3.3 Dual Barrel Files

Both `data/index.ts` and `data/mock.ts` serve as barrel exports for the same underlying data. This creates maintenance overhead. All new code should import from `data/index.ts` (or domain files directly). `mock.ts` should be deprecated.

---

## Findings Summary

### CRITICAL ERRORS (Build Blockers)

| ID | File | Issue | Fix |
|---|---|---|---|
| **C-01** | `CardGrid.stories.tsx:6` | Imports `POSTS` which doesn't exist | Change to `BLOG_POSTS` |
| **C-02** | `BlogSingle.tsx:41` | Imports `ALL_POSTS` which doesn't exist | Change to `ALL_BLOG_POSTS` |

### LOADING ORDER RISKS

| ID | File | Issue | Severity |
|---|---|---|---|
| **L-01** | `global.css` | `.grid` class adds default `gap` that overrides Tailwind | **High** |
| **L-02** | `global.css` | `.card` class adds padding/border/shadow that conflicts with shadcn/ui | **High** |
| **L-03** | `global.css` | Static `.py-12`, `.py-16`, `.p-4`, `.p-6` etc. override Tailwind utilities | **Medium** |
| **L-04** | `preview.tsx` | Double-imports all CSS files (individual + index.css) | **Medium** |

### ARCHITECTURE VIOLATIONS

| ID | File | Issue |
|---|---|---|
| **A-01** | `global.css` | Redefines 40+ Tailwind utility class names, creating a shadow utility layer |
| **A-02** | `global.css` | Contains its own CSS reset that conflicts with Tailwind preflight |
| **A-03** | `data/mock.ts` + `data/index.ts` | Dual barrel exports create ambiguity about canonical import source |
| **A-04** | `sections.css:919-921` | Print styles use hardcoded `white`/`black` instead of print-safe tokens |
| **A-05** | `global.css` | Defines `.font-bold`, `.font-semibold` etc. that shadow Tailwind's font-weight utilities |
| **A-06** | `global.css` | Defines responsive utilities (`.md\:grid--cols-*`, `.lg\:*`) using BEM naming that won't match Tailwind's responsive prefix syntax |

---

## Remediation Plan

### Step 1: Fix Build Blockers (Immediate)

1. **`/src/app/components/patterns/CardGrid.stories.tsx`** - Change `POSTS` to `BLOG_POSTS`
2. **`/src/app/pages/BlogSingle.tsx`** - Change `ALL_POSTS` to `ALL_BLOG_POSTS`

### Step 2: Resolve CSS Cascade Conflicts (High Priority)

3. **`/src/styles/global.css`** - Remove or rename the following classes that conflict with Tailwind:
   - Remove `.flex`, `.grid` (and their modifiers `.flex--row`, `.grid--cols-*`, etc.) — Tailwind handles these
   - Remove `.hidden`, `.block`, `.inline-block`, `.inline`
   - Remove `.relative`, `.absolute`, `.fixed`, `.sticky`
   - Remove `.p-*`, `.px-*`, `.py-*`, `.mt-*`, `.mb-*`, `.mx-auto` — Tailwind handles spacing
   - Remove `.max-w-*`, `.w-*`, `.h-*`
   - Remove `.cursor-pointer`, `.cursor-not-allowed`, `.opacity-*`, `.overflow-*`
   - Remove `.object-cover`, `.object-contain`
   - Remove `.pointer-events-none`
   - Rename `.card` to `.wp-block-card` (keep only the WP-prefixed version)
   - Rename `.grid` references to `.wp-block-grid`
   - Remove `.font-bold`, `.font-semibold`, etc. (Tailwind handles these)
   - Remove `.tracking-*` (Tailwind handles these)
   - Remove responsive `.md\:*` and `.lg\:*` utilities (Tailwind handles these)

4. **`/src/styles/global.css`** - Remove the CSS reset block (`*, *::before, *::after { box-sizing... }`) since Tailwind's preflight already handles this.

5. **Keep in global.css** (these are WordPress-specific and don't conflict):
   - Semantic HTML typography rules (`h1`-`h6`, `p`, `a`, `blockquote`, `code`, `pre`, `ul`/`ol`)
   - WordPress block classes (`.wp-block-*`, `.has-*-background`, `.has-*-color`)
   - WordPress alignment classes (`.alignleft`, `.alignright`, `.aligncenter`, `.alignwide`, `.alignfull`)
   - Container classes (`.container`, `.container--narrow`, `.container--wide`)
   - Section classes (`.section`, `.section--sm`, `.section--lg`)
   - Button WP classes (`.wp-block-button`, `.button--primary`, etc.)
   - Form WP classes (`.form__*`)
   - Image WP classes (`.wp-block-image`, `.image--*`)
   - WordPress block spacing (`.wp-block`)
   - Header navigation classes (`.header-*`, `.mobile-menu-*`)
   - Accessibility rules (`:focus-visible`, `prefers-reduced-motion`, `prefers-contrast`)
   - Screen reader class (`.screen-reader-text`, `.sr-only`)

### Step 3: Fix Preview Double-Import (Medium Priority)

6. **`/preview.tsx`** - Remove individual CSS imports and keep only `import "../src/styles/index.css"`:
   ```tsx
   // Remove these:
   // import "../src/styles/fonts.css";
   // import "../src/styles/theme.css";
   // import "../src/styles/tailwind.css";
   // import "../src/styles/sections.css";
   // import "../src/styles/print.css";
   
   // Keep only:
   import "../src/styles/index.css";
   ```

### Step 4: Consolidate Data Barrel Exports (Low Priority)

7. **`/src/app/data/mock.ts`** - Add a deprecation comment directing new code to import from domain files or `data/index.ts`.

### Step 5: Clean Up Dead CSS (Low Priority)

8. **`/src/styles/global.css`** - After Step 2, remove the static `.py-12`, `.py-16` definitions that are now superseded by fluid `py-section-*` tokens.

---

## Risk Assessment

| Change | Risk | Rollback |
|---|---|---|
| Fix `POSTS`/`ALL_POSTS` imports | **None** - purely additive fix | Revert two lines |
| Remove Tailwind-conflicting classes from global.css | **Medium** - could expose components that relied on global.css defaults | Check each removed class has Tailwind equivalent in component |
| Fix preview.tsx double-import | **Low** - Storybook only | Revert preview.tsx |
| Deprecate mock.ts | **None** - no code change, documentation only | N/A |