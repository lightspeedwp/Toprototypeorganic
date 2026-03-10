# CSS File Structure Guidelines
**LSX Design System — LightSpeed Tour Operator Prototype**
**Version:** 5.0 — Tailwind-Free Architecture

---

## ⚠️ Critical: This Project Does NOT Use Tailwind CSS

Tailwind CSS is **present in the build pipeline only** as a technical dependency of the Vite/React prototype runtime. It is **not our styling system**.

| File | Role |
|------|------|
| `tailwind.css` | Build pipeline only. Contains `@import 'tailwindcss'`, the `@theme inline` compatibility bridge, and animation keyframes. **Add nothing here.** |
| Everything else | Pure CSS using our own design tokens and WordPress-aligned class names. |

**New components must use BEM class names from `global.css`, not Tailwind utility classes.**

---

## Architecture Overview

```
/src/styles/
│
├── index.css               ← Master entry point — imports in cascade order
├── fonts.css               ← @font-face declarations ONLY
│
├── tailwind.css            ← ⚠️ BUILD PIPELINE ONLY (do not add styles)
│
├── theme-base.css          ← Shared tokens: typography, spacing, radius, animation
├── theme-light.css         ← Light mode: colours, shadows, logos
├── theme-dark.css          ← Dark mode: colour overrides, shadows, logos
├── theme-variables.css     ← WordPress --wp--preset--* namespace mapping
├── theme-funky.css         ← Optional vibrant theme (.theme-funky class)
├── theme.css               ← Orchestrator: imports all theme files + base resets
│
├── global.css              ← WordPress-aligned utility classes + block classes
├── sections.css            ← Section layout presets
├── breadcrumbs.css         ← Breadcrumb pattern
├── print.css               ← Print media overrides
│
├── blocks/                 ← WordPress block-level styles
│   ├── README.css
│   └── ui-components.css
│
├── common/                 ← Utility component styles
│   ├── back-to-top.css
│   ├── logo.css
│   ├── page-nav.css
│   ├── section-header.css
│   ├── template-browser.css
│   └── view-all.css
│
├── components/             ← Reusable UI component styles
│   ├── alert.css
│   ├── badge.css
│   ├── button.css
│   ├── card.css
│   ├── form.css
│   └── reviews-section.css
│
├── parts/                  ← WordPress template part styles
│   ├── README.css
│   ├── header.css
│   └── footer.css
│
├── patterns/               ← WordPress block pattern styles
│   ├── README.css
│   ├── archive-header.css
│   ├── author-bio.css
│   ├── blog-card.css
│   ├── breadcrumbs.css
│   ├── card-grid.css
│   ├── cards.css
│   ├── cta.css
│   ├── editorial-content.css
│   ├── faq.css
│   ├── fast-facts.css
│   ├── feature-card.css
│   ├── featured-section.css
│   ├── hero.css
│   ├── mobile-menu.css
│   ├── notification-banner.css
│   ├── pagination.css
│   ├── related-content.css
│   ├── search-filter.css
│   ├── sitemap-grid.css
│   ├── taxonomy-nav.css
│   └── team-card.css
│
├── pages/                  ← Page-specific overrides (last resort only)
│   └── *.css
│
├── templates/              ← WordPress page template styles
│   └── *.css
│
└── utilities/              ← Reserved for future standalone utilities
    └── README.css
```

---

## The Five Theme Files

### 1. `theme-base.css` — Theme-Agnostic Tokens

**What goes here:** Everything that does not change between light and dark mode.

```css
:root {
  /* Font families (ONLY these 3 — no exceptions) */
  --font-family-lora:      'Lora', Georgia, serif;
  --font-family-noto-sans: 'Noto Sans', Arial, sans-serif;
  --font-family-mono:      'Courier New', Courier, monospace;

  /* Fluid type scale */
  --text-6xl: clamp(3rem, 5vw + 1rem, 4.5rem);
  /* ... all --text-* variables */

  /* Fluid spacing */
  --spacing-section-md: clamp(3rem, 5vw + 1rem, 6rem);
  /* ... all --spacing-* variables */

  /* Border radius */
  --radius: 4px;
  /* ... all --radius-* variables */

  /* Animation tokens */
  --transition-base: 200ms ease;
  /* ... */
}
```

**Rule:** If a variable's value is the same in light and dark mode, it belongs in `theme-base.css`.

---

### 2. `theme-light.css` — Light Mode Colours

**What goes here:** All semantic colour tokens for the default (light) mode, plus light-mode shadows and logo references.

```css
:root {
  --background:     #FFFFFF;
  --foreground:     #000000;
  --primary:        #4A7311;
  --elevation-sm:   0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  --logo-url:       url('/public/logos/logo-dark.svg');
  /* ... */
}
```

**Rule:** Only `:root { ... }` blocks. No element selectors. No class selectors.

---

### 3. `theme-dark.css` — Dark Mode Colour Overrides

**What goes here:** Only the tokens that differ from light mode, scoped to `.dark`.

```css
.dark {
  --background: #0A0A0A;
  --foreground: #FFFFFF;
  --primary:    #90BA48;  /* Lighter for dark background */
  --elevation-sm: 0px 1px 3px 0px rgba(0, 0, 0, 0.50);
  --logo-url:   url('/public/logos/logo-light.svg');
  /* ... */
}
```

**Rule:** Never redefine `--font-family-*`, `--text-*`, `--spacing-*`, or `--radius-*` here. Those are in `theme-base.css` and do not change between modes.

---

### 4. `theme-variables.css` — WordPress Preset Namespace

**What goes here:** `--wp--preset--*` variables that map to our semantic tokens. These are what WordPress's `theme.json` would generate. Keeping them in sync ensures zero translation cost.

```css
:root {
  --wp--preset--color--primary:     var(--primary);
  --wp--preset--font-size--large:   var(--text-lg);
  --wp--preset--spacing--40:        var(--spacing-gap-md);
  /* ... */
}
```

**Rule:** Never hardcode values here. Always reference semantic tokens via `var()`.

---

### 5. `theme-funky.css` — Alternative Vibrant Theme

**What goes here:** Colour overrides for an experimental vibrant theme. Uses `.theme-funky` class scope so it layers on top of the existing light/dark system.

```css
.theme-funky { /* light funky */
  --primary:    #00695C;  /* Deep teal */
  --secondary:  #BF360C;  /* Terracotta */
  --accent:     #558B2F;  /* Lime */
  /* ... */
}

.dark.theme-funky { /* dark funky */
  --primary:    #4DB6AC;
  /* ... */
}
```

**Activation:** Add `theme-funky` class to `<html>` element:
```html
<html class="theme-funky">          <!-- light funky -->
<html class="dark theme-funky">     <!-- dark funky  -->
```

---

## `tailwind.css` — The Build Pipeline File

This file is required for the prototype runtime. It must exist. It must contain the `@import 'tailwindcss'` directive. Beyond the documented contents, it must not be modified.

```css
/* Required — DO NOT REMOVE */
@import 'tailwindcss' source(none);
@source '../**/*.{js,ts,jsx,tsx}';
@import 'tw-animate-css';

/* Dark mode variant */
@custom-variant dark (&:is(.dark *));

/* Legacy bridge — maps CSS vars to Tailwind utility names */
@theme inline {
  --color-primary: var(--primary);
  /* ... */
}
```

### Why does `@theme inline` exist?

Many existing components use Tailwind class names like `bg-primary`, `text-foreground`, `border-border`. The `@theme inline` block maps our CSS variables to Tailwind's internal token names so those class names resolve correctly.

**This is a migration bridge, not a design choice.** As components are migrated to WordPress BEM class names, entries should be removed from `@theme inline`.

---

## Font Rules (Non-Negotiable)

Only **three** font families are permitted anywhere in this project:

| Token | Family | Use |
|-------|--------|-----|
| `var(--font-family-lora)` | Lora (serif) | H1–H6, labels, blockquotes, editorial |
| `var(--font-family-noto-sans)` | Noto Sans (sans-serif) | Body, buttons, inputs, UI |
| `var(--font-family-mono)` | Courier New (monospace) | Code, technical content |

**Never:**
- Hardcode `font-family: 'Arial'` or any other font name
- Use Google Font imports outside of `fonts.css`
- Add new font families without a design system decision

---

## CSS Variable Rules

### ✅ Always

```css
/* Use semantic tokens */
background-color: var(--background);
color: var(--foreground);
font-family: var(--font-family-lora);
font-size: var(--text-4xl);
padding: var(--spacing-section-md);
border-radius: var(--radius-lg);
box-shadow: var(--elevation-sm);
transition: all var(--transition-base);
```

### ❌ Never

```css
/* Hardcoded colours */
background-color: #FFFFFF;
color: white;
color: rgba(0, 0, 0, 1);

/* Hardcoded fonts */
font-family: 'Arial', sans-serif;
font-family: 'Georgia', serif;

/* Hardcoded sizes */
font-size: 24px;
font-size: 1.5rem;

/* Inline styles in JSX/TSX */
style={{ backgroundColor: 'white', color: 'green' }}

/* Tailwind dark: prefix classes */
className="dark:bg-slate-800 dark:text-white"
```

---

## BEM Naming Convention

All CSS classes follow the WordPress-aligned BEM pattern:

```
.wp-block-{block}           Block root
.wp-block-{block}__element  Element within block
.wp-block-{block}--modifier Block modifier (state/variant)

.wp-pattern-{name}          Pattern root
.wp-part-{name}             Template part root

.has-{property}             WordPress utility modifier
.is-{state}                 WordPress state modifier
```

### Examples

```css
/* Block */
.wp-block-card { }
.wp-block-card__header { }
.wp-block-card__title { }
.wp-block-card--featured { }

/* Pattern */
.wp-pattern-hero { }
.wp-pattern-hero__inner { }
.wp-pattern-hero__headline { }

/* Part */
.wp-part-header { }
.wp-part-footer { }

/* WordPress utilities */
.has-primary-background { }
.has-muted-foreground-color { }
.is-style-h1 { }
.is-active { }
```

---

## Dark Mode Implementation

Dark mode is implemented via a CSS class toggle, NOT Tailwind's `dark:` prefix:

```html
<html class="dark">  <!-- dark mode active -->
<html>               <!-- light mode (default) -->
```

The `ThemeSwitcher` component (`/src/app/components/common/ThemeSwitcher.tsx`) manages the class toggle and persists the preference to `localStorage`.

### How it works

```css
/* theme-light.css — default */
:root {
  --background: #FFFFFF;
  --foreground: #000000;
}

/* theme-dark.css — activated by .dark on <html> */
.dark {
  --background: #0A0A0A;
  --foreground: #FFFFFF;
}
```

Because components reference `var(--background)` and `var(--foreground)`, they automatically adapt when the `.dark` class is toggled — no `dark:` prefixed classes needed.

### ✅ Correct

```tsx
<div className="wp-block-card">
  {/* Automatically adapts via CSS variables */}
  <h3>Card heading</h3>
  <p>Card text</p>
</div>
```

### ❌ Wrong

```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  {/* Manual dark mode overrides — never do this */}
</div>
```

---

## Creating New CSS Files

### When to create a new file

| Situation | Destination |
|-----------|-------------|
| New WordPress block | `/src/styles/blocks/{block-name}.css` |
| New block pattern | `/src/styles/patterns/{pattern-name}.css` |
| New template part | `/src/styles/parts/{part-name}.css` |
| New page template | `/src/styles/templates/{template-name}.css` |
| Page-specific override | `/src/styles/pages/{page-name}.css` |
| New utility component | `/src/styles/common/{component-name}.css` |

### After creating a file

1. Add the `@import` to `index.css` in the correct section
2. Use the correct BEM prefix for the file's category
3. Reference only CSS variables — no hardcoded values
4. Verify light and dark mode both render correctly

---

## Import Order Rules (`index.css`)

The master `index.css` imports must follow this strict order:

```
1. fonts.css          (font faces — no cascade)
2. tailwind.css       (build pipeline)
3. theme.css          (design tokens — must come before everything else)
4. global.css         (utility classes — depends on theme tokens)
5. sections.css       (layout presets — depends on spacing tokens)
6. breadcrumbs.css    (specific pattern — keep near other layout files)
7. print.css          (media-scoped — no cascade conflict)
8. parts/             (template parts — header before content)
9. templates/         (page templates — after parts)
10. pages/            (page overrides — after templates)
11. patterns/         (block patterns — can be used by any template)
12. components/       (utility components — last, highest specificity)
```

**Never import theme files directly in a component or pattern CSS file.** They are always available via `:root` and `.dark` because `theme.css` is loaded globally via `index.css`.

---

## Checklist Before Writing Any CSS

- [ ] Does the variable I need exist in `theme-base.css` or `theme-light.css`?
- [ ] Am I using `var(--token-name)` and NOT a hardcoded value?
- [ ] Am I using only one of the three permitted font families?
- [ ] Am I following BEM naming (`wp-block-*`, `wp-pattern-*`, `wp-part-*`)?
- [ ] Have I created a dedicated `.css` file (not inline styles)?
- [ ] Will this component look correct in BOTH light and dark mode?
- [ ] Have I imported my new file in `index.css`?
- [ ] Am I NOT using Tailwind `dark:` prefix classes?

---

## Quick Reference — Key Variable Groups

| Group | Prefix | Example |
|-------|--------|---------|
| Colours (semantic) | — | `var(--primary)`, `var(--background)` |
| Typography sizes | `--text-` | `var(--text-4xl)`, `var(--text-base)` |
| Font families | `--font-family-` | `var(--font-family-lora)` |
| Font weights | `--font-weight-` | `var(--font-weight-semibold)` |
| Line heights | `--leading-` | `var(--leading-tight)` |
| Letter spacing | `--tracking-` | `var(--tracking-tight)` |
| Section spacing | `--spacing-section-` | `var(--spacing-section-md)` |
| Container padding | `--spacing-container-` | `var(--spacing-container-sm)` |
| Gap spacing | `--spacing-gap-` | `var(--spacing-gap-md)` |
| Element spacing | `--spacing-element-` | `var(--spacing-element-lg)` |
| Border radius | `--radius-` | `var(--radius-lg)` |
| Shadows | `--elevation-` | `var(--elevation-sm)` |
| Transitions | `--transition-` | `var(--transition-base)` |
| Z-index | `--z-` | `var(--z-dropdown)` |
| WP presets | `--wp--preset--` | `var(--wp--preset--color--primary)` |
