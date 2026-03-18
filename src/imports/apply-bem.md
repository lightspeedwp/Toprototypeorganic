# Apply BEM — BEM Class Compliance Audit & Fix

**Type:** Audit + Fix  
**Created:** 2026-03-16  
**Status:** Ready  
**Trigger Word:** `apply bem`

---

## Prompt Purpose

**Objective:** Review the codebase to identify components and templates where BEM (Block Element Modifier) classes are missing, inconsistent, or replaced by inline styles or Tailwind utilities. Where violations are found, apply BEM classes that map to existing CSS rules in `/src/styles/` — prioritising design tokens, WordPress-aligned variables, and pre-existing pattern/block/component CSS.

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
- Inline `style` attributes are permitted ONLY for dynamic/computed values (e.g., `style={{ '--progress': percent }}`).

---

## Workflow Steps

### Step 1: Read Existing CSS Inventory

1. Read `/src/styles/index.css` to understand the full import tree.
2. Read `/src/styles/tailwind.css` and any `global.css` for design tokens (colors, spacing, borders, radius, typography).
3. Read `/src/styles/base/` directory for shared base classes (card-base, glass-effect-base, grid-responsive-base, icon-wrapper-base).
4. Read `/src/styles/patterns/` directory for pattern-level BEM classes.
5. Read `/src/styles/blocks/` directory for block-level BEM classes.
6. Read `/src/styles/components/` directory for component-level BEM classes.
7. Build a mental inventory of all available BEM selectors.

### Step 2: Scan TSX Files for BEM Violations

Search all `.tsx` files in `/src/app/` for the following violation types:

#### Violation Type A — Missing BEM Block Class
Components whose root element has no `className` or uses only Tailwind utilities / inline styles instead of a BEM block class.

```tsx
// ❌ Violation — no BEM class
<div style={{ display: 'flex', gap: '16px', padding: '24px' }}>

// ✅ Correct — BEM block + CSS variables
<div className="feature-grid">
```

#### Violation Type B — Inline Styles Replacing CSS Variables
Elements using inline `style` with values that should come from CSS variables via a BEM class.

```tsx
// ❌ Violation — hardcoded inline styles
<h2 style={{ fontFamily: "'Lexend', sans-serif", fontSize: '2rem', color: '#fff' }}>

// ✅ Correct — BEM element class with CSS variables
<h2 className="feature-grid__title">
```

#### Violation Type C — Tailwind Utilities Instead of BEM
Elements using Tailwind utility classes (`flex`, `gap-4`, `text-lg`, `rounded-xl`) instead of BEM classes or `.wp-*` utilities.

```tsx
// ❌ Violation — Tailwind utilities
<div className="flex items-center gap-4 rounded-xl bg-gray-900 p-6">

// ✅ Correct — BEM + wp utilities
<div className="card-grid__item wp-flex wp-items-center wp-gap-4">
```

#### Violation Type D — Inconsistent BEM Naming
Elements using ad-hoc class names that do not follow BEM convention (no block context, no `__` element separator, no `--` modifier separator).

```tsx
// ❌ Violation — ad-hoc class
<span className="badge-text highlight">

// ✅ Correct — BEM convention
<span className="feature-grid__badge feature-grid__badge--highlighted">
```

#### Violation Type E — Missing CSS Rule for BEM Class
A TSX file references a BEM class name that has no corresponding CSS rule in `/src/styles/`. The class exists in JSX but does nothing because no CSS defines it.

### Step 3: Match Violations to Existing CSS

For each violation found:

1. **Check if an existing BEM class already covers the intent.** Search `/src/styles/` for classes that provide the same visual outcome. Prefer reusing over creating.
2. **Check base classes first** — `/src/styles/base/card-base.css`, `glass-effect-base.css`, `grid-responsive-base.css`, `icon-wrapper-base.css` provide shared patterns used by many components.
3. **Check pattern classes** — `/src/styles/patterns/*.css` for pattern-level BEM selectors.
4. **Check component classes** — `/src/styles/components/*.css` for component-level BEM selectors.
5. **Map inline styles to CSS variables:**

| Inline Style | CSS Variable |
|---|---|
| `fontFamily: "'Lexend'"` | `var(--font-primary)` |
| `fontSize: '1.5rem'` | `var(--text-h3)` |
| `color: '#fff'` | `var(--foreground)` |
| `padding: '24px'` | `var(--spacing-6)` |
| `borderRadius: '12px'` | `var(--radius-lg)` |
| `gap: '16px'` | `var(--spacing-4)` |
| `background: '#1a1a2e'` | `var(--card)` |

### Step 4: Apply Fixes

For each violation:

1. **If an existing CSS rule matches** — apply the BEM class to the element, remove redundant inline styles or Tailwind classes.
2. **If a minor CSS addition is needed** — add the rule to the appropriate existing CSS file (never create a new CSS file unless justified). Use only CSS variables.
3. **If the component needs a new BEM block** — create the CSS in the correct location:
   - Pattern → `/src/styles/patterns/[name].css`
   - Block → `/src/styles/blocks/[category]/[name].css`
   - Component → `/src/styles/components/[name].css`
   - Register the new file via `@import` in `/src/styles/index.css` under the correct section.
4. **Never hardcode values in CSS** — all properties must use `var()` references:
   - Colors: `var(--primary)`, `var(--foreground)`, `var(--muted-foreground)`
   - Spacing: `var(--spacing-*)` 
   - Typography: `var(--font-primary)`, `var(--text-*)`, `var(--font-weight-*)`
   - Borders: `var(--border)`, `var(--radius-*)`
   - Transitions: `var(--transition-base)`, `var(--ease-in-out)`

### Step 5: Gap Analysis — Missing Design Tokens

After applying fixes, assess whether the existing CSS variable inventory is sufficient:

1. **Were any CSS rules written with hardcoded values because no token existed?** Flag these.
2. **Are there repeated inline styles that suggest a missing utility class or token?** Document them.
3. **Are there color, spacing, or typography patterns not covered by the current token set?**

If gaps are found, add this to the report:

> **Token Gap Detected:** The current design token set does not cover all BEM class needs. Run `audit tokens` to identify missing variables and `audit css` to verify CSS architecture integrity.

### Step 6: Report

Save report to `/reports/YYYY-MM/bem-compliance-audit.md` with:

```markdown
# BEM Compliance Audit

## Summary
- **Files scanned:** [count]
- **Violations found:** [count]
- **Violations fixed:** [count]
- **New CSS rules created:** [count]
- **Existing CSS rules reused:** [count]

## Violations by Type
| Type | Count | Fixed |
|---|---|---|
| A — Missing BEM block | X | X |
| B — Inline styles replacing CSS | X | X |
| C — Tailwind instead of BEM | X | X |
| D — Inconsistent naming | X | X |
| E — Missing CSS for class | X | X |

## Files Modified
- [list of TSX files where BEM classes were applied]

## CSS Files Modified
- [list of CSS files where rules were added]

## Token Gap Analysis
- [list any missing tokens or recommend `audit tokens` / `audit css`]
```

### Step 7: Task List (If Needed)

If violations remain unfixed (e.g., complex components requiring review, or token gaps needing user decision):

1. Create or update `/tasks/bem-compliance-task-list.md` with remaining items.
2. Each task should specify the file, violation type, and recommended fix.

---

## Success Criteria

- [ ] Every component has a BEM block class on its root element
- [ ] Zero inline styles for values covered by CSS variables
- [ ] Zero Tailwind utility classes (`.wp-*` utilities are acceptable)
- [ ] All BEM classes follow Block__Element--Modifier convention
- [ ] Every BEM class referenced in TSX has a corresponding CSS rule
- [ ] All new CSS rules use 100% CSS variables (zero hardcoded values)
- [ ] Typography uses ONLY `var(--font-primary)` and `var(--font-secondary)` font faces
- [ ] Report saved to `/reports/YYYY-MM/bem-compliance-audit.md`
- [ ] Token gap analysis completed (recommends `audit tokens` / `audit css` if needed)

---

## Design System Compliance Reminders

| Category | Rule |
|---|---|
| **Colors** | Semantic CSS variables only — `var(--primary)`, `var(--foreground)` |
| **Spacing** | `var(--spacing-*)` tokens only — `var(--spacing-4)`, `var(--spacing-8)` |
| **Typography** | Font faces from CSS only — `var(--font-primary)`, `var(--font-secondary)` |
| **Font sizes** | CSS variable scale only — `var(--text-h1)`, `var(--text-sm)` |
| **Border radius** | CSS variable tokens only — `var(--radius)`, `var(--radius-lg)` |
| **Icons** | `@phosphor-icons/react` only — zero `lucide-react` imports |
| **Classes** | BEM convention + `.wp-*` utilities — zero Tailwind classes |
| **Hardcoded values** | ZERO allowed — no hex, no px, no rem, no font names |
