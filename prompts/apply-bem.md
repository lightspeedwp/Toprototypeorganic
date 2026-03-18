# Apply BEM — BEM Class Compliance Audit & Fix

**Type:** Audit + Fix  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `apply bem`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately. Use only the tools available: `read`, `write_tool`, `fast_apply_tool`, `edit_tool`, `delete_tool`, `file_search`, and `bash` (node_modules only).

---

## Prompt Purpose

**Objective:** Review the codebase to identify components and templates where BEM (Block Element Modifier) classes are missing, inconsistent, or replaced by inline styles or Tailwind utilities. Where violations are found, apply BEM classes that map to existing CSS rules in `/src/styles/` — prioritising design tokens and WordPress-aligned variables.

**When to Use:** After building new components, after importing Figma frames, or periodically to enforce BEM consistency across the UI layer.

---

## What Is BEM in This Project?

This project uses BEM with WordPress alignment:

| Convention | Example |
|---|---|
| **Block** | `.query-loop`, `.hero`, `.card-grid` |
| **Element** | `.query-loop__title`, `.hero__heading` |
| **Modifier** | `.query-loop-card--clickable`, `.hero--centered` |
| **WP utility** | `.wp-flex`, `.wp-items-center`, `.wp-gap-4` |

**Rules:**
- BEM classes live in `/src/styles/` CSS files — never in TSX as Tailwind utilities.
- Every visual component should have a BEM block class on its root element.
- Child elements use `__` element separator; visual variants use `--` modifier.
- `.wp-*` prefixed utility classes are permitted for layout helpers (flex, grid, gap, alignment).
- Inline `style` attributes are permitted ONLY for dynamic/computed values (e.g., `style={{ '--progress': percent }}`), or when required by `motion/react` animation props.

---

## Workflow Steps

### Step 1: Read Existing CSS Inventory

1. Read `/src/styles/index.css` to understand the full import tree.
2. Read `/src/styles/global.css` for WordPress-aligned utility classes.
3. Read `/src/styles/theme-base.css` for theme-agnostic design tokens (typography, spacing, borders, radius).
4. Read `/src/styles/theme-light.css` and `/src/styles/theme-dark.css` for color tokens.
5. Read `/src/styles/base/` directory for shared base classes.
6. Read `/src/styles/patterns/` directory for pattern-level BEM classes.
7. Read `/src/styles/blocks/` directory for block-level BEM classes.
8. Read `/src/styles/components/` directory for component-level BEM classes.
9. Build a mental inventory of all available BEM selectors.

### Step 2: Scan TSX Files for BEM Violations

Search all `.tsx` files in `/src/app/` for the following violation types:

#### Violation Type A — Missing BEM Block Class
Components whose root element has no `className` or uses only Tailwind utilities / inline styles instead of a BEM block class.

```tsx
// Violation — no BEM class
<div style={{ display: 'flex', gap: '16px', padding: '24px' }}>

// Correct — BEM block + CSS variables
<div className="feature-grid">
```

#### Violation Type B — Inline Styles Replacing CSS Variables
Elements using inline `style` with values that should come from CSS variables via a BEM class.

```tsx
// Violation — hardcoded inline styles
<h2 style={{ fontFamily: "'Lora', serif", fontSize: '2rem', color: '#fff' }}>

// Correct — BEM element class with CSS variables
<h2 className="feature-grid__title">
```

#### Violation Type C — Tailwind Utilities Instead of BEM
Elements using Tailwind utility classes (`flex`, `gap-4`, `text-lg`, `rounded-xl`) instead of BEM classes or `.wp-*` utilities.

```tsx
// Violation — Tailwind utilities
<div className="flex items-center gap-4 rounded-xl bg-gray-900 p-6">

// Correct — BEM + wp utilities
<div className="card-grid__item wp-flex wp-items-center wp-gap-4">
```

#### Violation Type D — Inconsistent BEM Naming
Elements using ad-hoc class names that do not follow BEM convention.

#### Violation Type E — Missing CSS Rule for BEM Class
A TSX file references a BEM class name that has no corresponding CSS rule in `/src/styles/`.

### Step 3: Match Violations to Existing CSS

For each violation found:

1. **Check if an existing BEM class already covers the intent.** Prefer reusing over creating.
2. **Check base classes first** — `/src/styles/base/`.
3. **Check pattern classes** — `/src/styles/patterns/*.css`.
4. **Check component classes** — `/src/styles/components/*.css`.
5. **Map inline styles to CSS variables:**

| Inline Style | CSS Variable |
|---|---|
| `fontFamily: "'Lora'"` | `var(--font-family-lora)` |
| `fontFamily: "'Noto Sans'"` | `var(--font-family-noto-sans)` |
| `fontFamily: "'Caveat'"` | `var(--font-family-caveat)` |
| `fontFamily: "'Shadows Into Light'"` | `var(--font-family-shadows)` |
| `fontFamily: "'Courier New'"` | `var(--font-family-mono)` |
| `fontSize: '2rem'` | `var(--text-4xl)` |
| `color: '#fff'` | `var(--foreground)` |
| `padding: '24px'` | `var(--spacing-6)` |
| `borderRadius: '12px'` | `var(--radius-lg)` |
| `gap: '16px'` | `var(--spacing-4)` |
| `background: '#1a1a2e'` | `var(--card)` |

### Step 4: Apply Fixes

For each violation:

1. **If an existing CSS rule matches** — apply the BEM class, remove redundant inline styles or Tailwind classes.
2. **If a minor CSS addition is needed** — add the rule to the appropriate existing CSS file. Use only CSS variables.
3. **If the component needs a new BEM block** — create the CSS in the correct location:
   - Pattern -> `/src/styles/patterns/[name].css`
   - Block -> `/src/styles/blocks/[category]/[name].css`
   - Component -> `/src/styles/components/[name].css`
   - Page -> `/src/styles/pages/[name].css`
   - Register the new file via `@import` in `/src/styles/index.css` under the correct section.
4. **Never hardcode values in CSS** — all properties must use `var()` references.

### Step 5: Gap Analysis — Missing Design Tokens

After applying fixes, assess whether the existing CSS variable inventory is sufficient. If gaps are found, document them in the report.

### Step 6: Report

Save report to `/reports/YYYY-MM/bem-compliance-audit.md` with:

- Files scanned / violations found / violations fixed
- Violations by Type (A through E)
- Files modified (TSX and CSS)
- Token gap analysis

### Step 7: Task List (If Needed)

If violations remain unfixed, create or update `/tasks/bem-compliance-task-list.md`.

---

## Success Criteria

- [ ] Every component has a BEM block class on its root element
- [ ] Zero inline styles for values covered by CSS variables
- [ ] Zero Tailwind utility classes (`.wp-*` utilities are acceptable)
- [ ] All BEM classes follow Block__Element--Modifier convention
- [ ] Every BEM class referenced in TSX has a corresponding CSS rule
- [ ] All new CSS rules use 100% CSS variables (zero hardcoded values)
- [ ] Typography uses ONLY approved font variables: `var(--font-family-lora)`, `var(--font-family-noto-sans)`, `var(--font-family-caveat)`, `var(--font-family-shadows)`, `var(--font-family-mono)`
- [ ] Report saved to `/reports/YYYY-MM/bem-compliance-audit.md`

---

## Design System Compliance Reminders

| Category | Rule |
|---|---|
| **Colors** | Semantic CSS variables only — `var(--primary)`, `var(--foreground)` |
| **Spacing** | `var(--spacing-*)` tokens only |
| **Typography** | 5 approved fonts via CSS variables only |
| **Font sizes** | CSS variable scale only — `var(--text-6xl)` through `var(--text-2xs)` |
| **Border radius** | CSS variable tokens only — `var(--radius)`, `var(--radius-lg)` |
| **Icons** | `lucide-react` only |
| **Classes** | BEM convention + `.wp-*` utilities — zero Tailwind classes |
| **Hardcoded values** | ZERO allowed — no hex, no px, no rem, no font names |
