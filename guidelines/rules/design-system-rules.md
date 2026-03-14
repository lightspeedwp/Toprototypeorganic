# Design System Rules

**Category:** Rules — Mandatory Compliance
**Last Updated:** March 13, 2026
**Status:** Active — Enforced on ALL UI generation

---

## The Two Non-Negotiable Rules

### Rule 1: Use CSS Variables ONLY

All styling MUST use CSS custom properties from `/src/styles/theme-base.css`, `theme-light.css`, and `theme-dark.css`.

**Never hardcode:**
- Colors → use `var(--primary)`, `var(--foreground)`, etc.
- Fonts → use `var(--font-family-lora)`, `var(--font-family-noto-sans)`, etc.
- Font sizes → use `var(--text-6xl)`, `var(--text-base)`, etc.
- Font weights → use `var(--font-weight-bold)`, `var(--font-weight-medium)`, etc.
- Spacing → use `var(--spacing-section-md)`, `var(--spacing-gap-lg)`, etc.
- Borders → use `var(--border)`, `var(--border-width)`, etc.
- Radius → use `var(--radius-md)`, `var(--radius-lg)`, etc.
- Shadows → use `var(--elevation-sm)`, `var(--elevation-md)`, etc.

### Rule 2: Use ONLY 5 Approved Fonts

| Font | Variable | Usage |
|------|----------|-------|
| **Lora** (serif) | `var(--font-family-lora)` | Headings (H1-H6), labels, blockquotes, editorial |
| **Noto Sans** (sans) | `var(--font-family-noto-sans)` | Body text, paragraphs, buttons, inputs, UI |
| **Courier New** (mono) | `var(--font-family-mono)` | Code blocks, technical content |
| **Caveat** (handwriting) | `var(--font-family-caveat)` | Accent text, organic flourishes (sparingly) |
| **Shadows Into Light** | `var(--font-family-shadows)` | Alternative accent text (very sparingly) |

**No other fonts are allowed.**

---

## Zero Margin Policy

ALL elements must rely on flex/grid gaps or specific padding. Margins are prohibited for layout orchestration.

```css
/* ✅ CORRECT */
.wp-pattern-grid { display: grid; gap: var(--spacing-gap-md); }

/* ❌ WRONG */
.wp-pattern-card { margin-bottom: 1.5rem; }
```

**Exception:** Prose-flow margins within editorial content blocks (`<p>`, `<h2>`, `<blockquote>` inside content sections) are accepted as they map to WordPress `--wp--style--block-gap`.

---

## Zero Inline Styles Policy

**STRICTLY PROHIBITED:** `style={{ }}` attributes in JSX.

**Exemptions (only 2):**
1. `motion/react` style prop for dynamic animation values: `<motion.div style={{ y, scale }} />`
2. Dynamic CSS Custom Properties: `style={{ '--dynamic-width': value } as React.CSSProperties}`

---

## No `dark:` Classes

CSS variables handle dark mode automatically. Never use Tailwind `dark:` prefixed classes.

```tsx
{/* ❌ WRONG */}
<div className="bg-white dark:bg-slate-800">

{/* ✅ CORRECT */}
<div className="bg-background">
```

---

## BEM Naming Convention

All CSS classes must follow BEM with WordPress-aligned prefixes:

| Prefix | Category | Example |
|--------|----------|---------|
| `.wp-part-*` | Template parts | `.wp-part-header__nav-link` |
| `.wp-pattern-*` | Block patterns | `.wp-pattern-hero__title` |
| `.wp-block-*` | Block components | `.wp-block-card__image` |
| `.wp-template-*` | Page templates | `.wp-template-archive__grid` |

---

## External CSS Files

All styling must be in dedicated `.css` files with BEM classes. Never define styles inline in JSX.

```
/src/styles/
├── parts/header.css        ← .wp-part-header
├── patterns/hero.css       ← .wp-pattern-hero
├── templates/archive.css   ← .wp-template-archive
└── common/container.css    ← Container utility
```

---

## Semantic HTML

Use semantic HTML elements. They receive typography defaults automatically from `theme.css`:

```tsx
<h2>Section Title</h2>   {/* Gets Lora, 32px, 600 automatically */}
<p>Body text</p>          {/* Gets Noto Sans, 16px, 400 automatically */}
<nav>Navigation</nav>     {/* Semantic landmark */}
<article>Content</article> {/* Content block */}
```

**Do NOT use Tailwind typography classes** (e.g., `text-2xl`, `font-bold`, `leading-tight`) unless intentionally overriding defaults.

---

## Organic Section Wrappers

Use organic section wrappers for page layout sections:

- `organic-section-top` — First section on page
- `organic-section-middle` — Interior sections
- `organic-section-bottom` — Last section on page

Do not use plain `<section>` or `<div>` for primary page sections.

---

## Quick Compliance Checklist

Before submitting any UI:

- [ ] All colors use `var(--color-*)` tokens
- [ ] All fonts use `var(--font-family-*)` tokens
- [ ] All sizing uses `var(--text-*)` or `var(--spacing-*)` tokens
- [ ] No inline `style={{ }}` attributes (except exemptions)
- [ ] No `dark:` Tailwind classes
- [ ] No hardcoded hex values in CSS
- [ ] No fonts outside the 5 approved families
- [ ] BEM naming with `.wp-*` prefixes
- [ ] External CSS files for all styling
- [ ] Semantic HTML elements
- [ ] Zero margins for layout (flex/grid gaps only)

---

## Reference

| Topic | Guideline File |
|-------|---------------|
| Full color token list | `/guidelines/design-tokens/colors.md` |
| Typography tokens | `/guidelines/design-tokens/typography.md` |
| Spacing tokens | `/guidelines/design-tokens/spacing.md` |
| Dark/light mode | `/guidelines/design-tokens/dark-light-mode.md` |
| All design tokens | `/guidelines/design-tokens/` (full folder) |
