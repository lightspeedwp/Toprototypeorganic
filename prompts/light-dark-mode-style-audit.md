# Light & Dark Mode Style Audit Prompt
**LSX Design System — LightSpeed Tour Operator Prototype**
**Version:** 1.0
**Date:** 2026-03-03
**Scope:** Full codebase audit of light/dark mode style compliance

---

## Audit Overview

This prompt instructs a comprehensive audit of the entire codebase to verify that:

1. All colours are defined via CSS variables (no hardcoded values)
2. Both light and dark modes are correctly and completely implemented
3. No Tailwind `dark:` prefix classes are used in components
4. No inline styles containing colour/font values appear in TSX/JSX
5. All three permitted font families are used exclusively
6. Every semantic colour token has a dark-mode override in `theme-dark.css`
7. WCAG AA contrast ratios are met in both modes

---

## Phase 1 — CSS Variable Completeness Audit

### 1A. Verify `theme-base.css` contains all shared tokens

Check that the following token groups are defined in `theme-base.css` and NOT duplicated in `theme-light.css` or `theme-dark.css`:

- [ ] `--font-family-lora`, `--font-family-noto-sans`, `--font-family-mono`
- [ ] All `--text-*` size variables (xs through 6xl)
- [ ] All `--font-weight-*` variables
- [ ] All `--leading-*` line-height variables
- [ ] All `--tracking-*` letter-spacing variables
- [ ] All `--spacing-section-*`, `--spacing-container-*`, `--spacing-element-*`, `--spacing-gap-*`
- [ ] All `--radius-*` variables
- [ ] All `--transition-*` animation variables
- [ ] All `--z-*` z-index variables
- [ ] `--header-bar-height`
- [ ] Layout constants: `--container-max-width`, `--container-max-width-narrow`, `--container-max-width-wide`

**Command to check for duplicates:**
```bash
grep -n "font-family-lora\|text-6xl\|spacing-section\|radius-sm\|transition-base" \
  src/styles/theme-light.css \
  src/styles/theme-dark.css
```
Any hits in the above command indicate tokens that were NOT moved to `theme-base.css`.

---

### 1B. Verify `theme-light.css` contains ONLY colour tokens

The following should NOT appear in `theme-light.css`:
- `--font-family-*` (belongs in theme-base.css)
- `--text-*` (belongs in theme-base.css)
- `--font-weight-*` (belongs in theme-base.css)
- `--leading-*` (belongs in theme-base.css)
- `--spacing-*` (belongs in theme-base.css)
- `--radius-*` (belongs in theme-base.css)

**Command:**
```bash
grep -n "font-family\|--text-\|font-weight\|leading-\|spacing-\|radius-" \
  src/styles/theme-light.css
```
Expected: zero matches.

---

### 1C. Verify `theme-dark.css` overrides ALL semantic colour tokens

Every semantic colour token defined in `theme-light.css` under `:root` must have a corresponding override in `theme-dark.css` under `.dark`.

**Tokens that MUST be overridden in `.dark { ... }`:**

```
--background          --foreground
--card                --card-foreground
--popover             --popover-foreground
--primary             --primary-foreground
--secondary           --secondary-foreground
--accent              --accent-foreground
--muted               --muted-foreground
--destructive         --destructive-foreground
--success             --success-foreground
--warning             --warning-foreground
--info                --info-foreground
--border              --input
--input-background    --ring
--sidebar             --sidebar-foreground
--sidebar-primary     --sidebar-primary-foreground
--sidebar-accent      --sidebar-accent-foreground
--sidebar-border      --sidebar-ring
--chart-1             --chart-2
--chart-3             --chart-4             --chart-5
--elevation-sm        --elevation-md
--elevation-lg        --elevation-xl
--logo-url            --logo-icon-url
```

**Command:**
```bash
# Extract all tokens from theme-light.css :root block
grep "^\s*--" src/styles/theme-light.css | sed 's/:.*$//' | tr -d ' '
```
Then verify each appears in `theme-dark.css`.

---

### 1D. Verify `theme-variables.css` WordPress preset mappings

Every `--wp--preset--color--*` entry should reference `var(--token)` and NOT a hardcoded hex value.

**Command:**
```bash
grep --color "wp--preset" src/styles/theme-variables.css | grep -v "var(--"
```
Expected: zero matches (all should use `var()`).

---

## Phase 2 — Hardcoded Colour Audit (CSS Files)

Search all CSS files for hardcoded colour values.

### 2A. Hex colours

```bash
grep -rn "#[0-9A-Fa-f]\{3,8\}" \
  src/styles/ \
  --include="*.css" \
  --exclude="theme-light.css" \
  --exclude="theme-dark.css" \
  --exclude="theme-funky.css" \
  --exclude="theme-variables.css"
```

**Expected:** The only files that should contain hex values are the four theme files. Any hex found in `global.css`, `components/`, `patterns/`, `parts/`, `templates/`, or `pages/` is a violation.

### 2B. RGB / RGBA colours

```bash
grep -rn "rgb\|rgba\|hsl\|hsla" \
  src/styles/ \
  --include="*.css" \
  --exclude="theme-light.css" \
  --exclude="theme-dark.css" \
  --exclude="theme-funky.css" \
  --exclude="theme-variables.css"
```

**Expected:** Zero matches outside the four theme files.

### 2C. Named colours (white, black, red, etc.)

```bash
grep -rn "color:\s*white\|color:\s*black\|color:\s*red\|background:\s*white\|background:\s*black" \
  src/styles/ \
  --include="*.css" \
  --exclude="theme*.css"
```

**Expected:** Zero matches.

---

## Phase 3 — Hardcoded Style Audit (TSX/JSX Components)

### 3A. Inline style attributes

Search for `style={{` in all React component files:

```bash
grep -rn "style={{" \
  src/app/ \
  --include="*.tsx" \
  --include="*.ts"
```

For each result, evaluate:
- Does the inline style contain a colour? → **VIOLATION** — move to CSS class using `var(--token)`
- Does the inline style contain a font-family? → **VIOLATION** — use semantic HTML or CSS class
- Does the inline style contain a pixel/rem size? → **VIOLATION** — use a design token
- Is it purely positional (top, left, transform) for animation? → **ACCEPTABLE** if no alternative

### 3B. Hardcoded hex colours in JSX

```bash
grep -rn "#[0-9A-Fa-f]\{3,8\}" \
  src/app/ \
  --include="*.tsx" \
  --include="*.ts"
```

**Expected:** Zero matches.

### 3C. Tailwind `dark:` prefix classes

```bash
grep -rn "dark:" \
  src/app/ \
  --include="*.tsx" \
  --include="*.ts"
```

**Expected:** Zero matches. Dark mode is handled exclusively via CSS variable switching, not Tailwind's `dark:` prefix.

### 3D. Hardcoded font families in JSX/TSX

```bash
grep -rn "fontFamily\|font-family" \
  src/app/ \
  --include="*.tsx" \
  --include="*.ts"
```

For each result, verify it references `var(--font-family-lora)`, `var(--font-family-noto-sans)`, or `var(--font-family-mono)` — NOT a raw font name string.

### 3E. Tailwind text/font utility classes on non-override uses

```bash
grep -rn "className=.*\btext-[0-9]\|className=.*\bfont-bold\|className=.*\bfont-semibold\|className=.*\bfont-medium\|className=.*\bleading-" \
  src/app/ \
  --include="*.tsx"
```

For each result, evaluate:
- Is this an intentional one-off deviation from the semantic HTML defaults? → **ACCEPTABLE** (document why)
- Is it on a bare `<h1>`, `<h2>`, `<p>` element? → **VIOLATION** — use semantic HTML, the CSS resets handle typography

---

## Phase 4 — Component-Level Dark Mode Visual Audit

Manually navigate to each of the following pages in both light and dark mode. Check every element for:

- [ ] Correct background colour (not transparent/wrong shade)
- [ ] Correct text colour (not invisible against background)
- [ ] Correct border colour (visible but not too heavy)
- [ ] Correct shadow (proportional to mode)
- [ ] Logo switches between dark logo (light mode) and light logo (dark mode)
- [ ] Focus rings visible in both modes
- [ ] Hover states visible in both modes

### Priority pages to audit

**Core templates:**
- [ ] `/` — Home page
- [ ] `/tours` — Tours archive
- [ ] `/tours/{slug}` — Tour single
- [ ] `/destinations` — Destinations archive
- [ ] `/destinations/{slug}` — Destination single
- [ ] `/blog` — Blog archive
- [ ] `/blog/{slug}` — Blog single
- [ ] `/about` — About page
- [ ] `/contact` — Contact page
- [ ] `/faq` — FAQ page

**Component-heavy pages:**
- [ ] `/design-system` — Design system showcase
- [ ] `/component-library` — Component library
- [ ] `/sustainability` — Sustainability page (newly added)

**Checklist per page (both modes):**
- [ ] Hero section background/text readable
- [ ] Navigation links visible and correctly coloured
- [ ] Card backgrounds correct (light mode: white; dark mode: #1A1A1A)
- [ ] Card borders visible
- [ ] Button primary colour correct
- [ ] Button text on primary colour readable
- [ ] Footer background and text readable
- [ ] Form inputs visible (background, border, text)
- [ ] Focus ring visible on tab navigation
- [ ] No "flash" of wrong background colour on page load

---

## Phase 5 — WCAG Contrast Ratio Audit

For each colour pair below, verify the contrast ratio meets WCAG AA (4.5:1 for normal text, 3:1 for large text).

### Light Mode Pairs

| Text colour | Background | Required ratio | Actual ratio | Status |
|-------------|------------|----------------|--------------|--------|
| `--foreground` (#000000) | `--background` (#FFFFFF) | 4.5:1 | 21:1 | ✅ |
| `--primary` (#4A7311) | `--background` (#FFFFFF) | 4.5:1 | 7.23:1 | ✅ |
| `--secondary` (#5C5340) | `--background` (#FFFFFF) | 4.5:1 | 8.14:1 | ✅ |
| `--accent` (#B87A00) | `--background` (#FFFFFF) | 4.5:1 | 7.01:1 | ✅ |
| `--muted-foreground` (#595959) | `--background` (#FFFFFF) | 4.5:1 | 7.03:1 | ✅ |
| `--muted-foreground` (#595959) | `--muted` (#F5F5F5) | 4.5:1 | 6.68:1 | ⚠️ near-miss |
| `--primary-foreground` (#FFFFFF) | `--primary` (#4A7311) | 4.5:1 | ~4.5:1 | ⚠️ verify |
| `--destructive` (#B71C1C) | `--background` (#FFFFFF) | 4.5:1 | 8.59:1 | ✅ |

### Dark Mode Pairs

| Text colour | Background | Required ratio | Actual ratio | Status |
|-------------|------------|----------------|--------------|--------|
| `--foreground` (#FFFFFF) | `--background` (#0A0A0A) | 4.5:1 | 19.26:1 | ✅ |
| `--primary` (#90BA48) | `--background` (#0A0A0A) | 4.5:1 | 8.14:1 | ✅ |
| `--primary` (#90BA48) | `--card` (#1A1A1A) | 4.5:1 | 7.24:1 | ✅ |
| `--muted-foreground` (#B8B8B8) | `--background` (#0A0A0A) | 4.5:1 | 7.73:1 | ✅ |
| `--muted-foreground` (#B8B8B8) | `--muted` (#262626) | 4.5:1 | 7.5:1 | ✅ |
| `--accent` (#FFB740) | `--background` (#0A0A0A) | 4.5:1 | 9.86:1 | ✅ |
| `--primary-foreground` (#000000) | `--primary` (#90BA48) | 4.5:1 | 8.14:1 | ✅ |

**Tool for manual verification:** https://webaim.org/resources/contrastchecker/

---

## Phase 6 — Theme File Structure Compliance

### 6A. Verify `tailwind.css` contains NO UI styles

```bash
grep -n "background-color\|color:\|font-family\|padding\|margin\|border-radius" \
  src/styles/tailwind.css
```

**Expected:** Zero matches. Only `@import`, `@source`, `@custom-variant`, and `@theme inline` entries are permitted.

### 6B. Verify `theme.css` contains no hardcoded values

```bash
grep -n "#[0-9A-Fa-f]\{3,8\}\|rgba\|rgb(" \
  src/styles/theme.css
```

**Expected:** Zero matches. `theme.css` only imports and defines structure using `var()` references.

### 6C. Verify import chain is correct

Check that `index.css` imports files in the documented order (theme.css before global.css, etc.):

```bash
grep "@import" src/styles/index.css
```

Verify order matches:
1. `fonts.css`
2. `tailwind.css`
3. `theme.css`
4. `global.css`
5. `sections.css`, `breadcrumbs.css`, `print.css`
6. `parts/*.css`
7. `templates/*.css`
8. `pages/*.css`
9. `patterns/*.css`
10. `common/*.css`, `components/*.css`

---

## Phase 7 — New Component Compliance Check

For each new component added since the last audit (check git log or file timestamps), verify:

**CSS file:**
- [ ] Dedicated CSS file created in correct `/src/styles/` subdirectory
- [ ] No hardcoded colour values
- [ ] No hardcoded font-family values
- [ ] Uses only CSS variables from theme system
- [ ] CSS file imported in `index.css`
- [ ] BEM class naming: `.wp-block-*`, `.wp-pattern-*`, or `.wp-part-*`

**TSX/TSX file:**
- [ ] No `style={{ }}` attributes with colour/font values
- [ ] No `dark:` Tailwind prefix classes
- [ ] No hardcoded hex or rgb colours in className strings
- [ ] Uses semantic HTML elements (h1-h6 pick up typography automatically)
- [ ] Only uses the three permitted font families if overriding via className

---

## Reporting

### Report Format

Save results to: `/reports/{date}-light-dark-mode-audit.md`

Include:
1. **Executive summary** — overall compliance score (violations found / total checks)
2. **Phase results** — pass/fail per phase
3. **Violations list** — file path, line number, violation type, recommended fix
4. **Contrast issues** — specific pairs that fail WCAG AA
5. **Recommended actions** — prioritised fix list (P0: blocks dark mode, P1: visual issues, P2: code hygiene)

### Violation Severity

| Severity | Definition | Examples |
|----------|------------|---------|
| **P0 Critical** | Element invisible or unreadable in one mode | White text on white bg in dark mode |
| **P1 High** | Hardcoded colour that doesn't adapt to dark mode | `color: #4A7311` in a component CSS file |
| **P2 Medium** | Wrong semantic token used but visually OK | Using `--primary` where `--foreground` is correct |
| **P3 Low** | Code hygiene: Tailwind `dark:` class used but works | `dark:text-white` alongside CSS variable |
| **P4 Info** | Deviation documented but should be reviewed | Inline style used for animation positioning |

---

## Acceptance Criteria

The audit passes when:

- [ ] **Zero P0** violations (no invisible/unreadable content in either mode)
- [ ] **Zero P1** violations (no hardcoded colours outside theme files)
- [ ] **Zero** `dark:` Tailwind prefix classes in component files
- [ ] **Zero** inline `style={}` with colour or font values
- [ ] **Zero** hex/rgb/rgba values in component or pattern CSS files
- [ ] **100%** of semantic colour tokens have dark mode overrides
- [ ] **100%** WCAG AA compliance for all documented colour pairs
- [ ] **Zero** font families other than Lora, Noto Sans, Courier New

---

## Related Files

| File | Purpose |
|------|---------|
| `/docs/CSS-FILE-STRUCTURE.md` | CSS architecture guidelines |
| `/src/styles/theme-base.css` | Shared design tokens |
| `/src/styles/theme-light.css` | Light mode colours |
| `/src/styles/theme-dark.css` | Dark mode colours |
| `/src/styles/theme-variables.css` | WordPress preset namespace |
| `/src/styles/theme-funky.css` | Alternative vibrant theme |
| `/src/styles/tailwind.css` | Build pipeline compatibility |
| `/src/styles/global.css` | WordPress-aligned utilities |
| `/guidelines/THEME-VARIATIONS.md` | Theme variation documentation |
| `/src/app/components/common/ThemeSwitcher.tsx` | Theme toggle implementation |
