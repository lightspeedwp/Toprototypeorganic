# CSS Architecture: BEM & WordPress Alignment

**Principle:** A deterministic mapping between React components and WordPress block theme structures.

---

## 1. Directory Structure 📁

The stylesheet hierarchy mirrors the component architecture:

```
/src/styles/
├── theme.css             # Entry point (Imports all layers)
├── theme-base.css        # Layout, Typography, Spacing (Fluid)
├── theme-light.css       # Light mode colour tokens
├── theme-dark.css        # Dark mode colour tokens
├── theme-variables.css   # WordPress --wp--preset mapping
├── global.css            # Base element styles & cross-component utils
├── wordpress-classes.css # Native WP classes (.wp-block-*, etc.)
├── parts/                # Template Part styles (Header, Footer)
├── patterns/             # Block Pattern styles (Hero, Grid, CTA)
├── blocks/               # Individual Block styles
└── templates/            # Page-level composition styles
```

---

## 2. BEM Naming Convention 🏷️

We use a modified BEM (Block Element Modifier) convention that aligns with WordPress's native class names.

### Syntax
- **Block:** `.wp-pattern-{name}` or `.wp-block-lts-{name}`
- **Element:** `__element`
- **Modifier:** `--modifier`

### Example
```css
/* Block */
.wp-pattern-hero { ... }

/* Element */
.wp-pattern-hero__title { ... }

/* Modifier */
.wp-pattern-hero--large { ... }
```

---

## 3. WordPress `theme.json` Mapping 🧩

To ensure the prototype can be converted to a production WordPress theme, we map our CSS variables to the `--wp--preset--*` namespace.

### Color Mapping
`--primary` ➡️ `--wp--preset--color--primary`

### Spacing Mapping
`--spacing-md` ➡️ `--wp--preset--spacing--40`

### Implementation in `theme-variables.css`
```css
:root {
  --wp--preset--color--primary: var(--primary);
  --wp--preset--spacing--md: var(--spacing-element-md);
}
```

---

## 4. The "No Utility" Rule for Structural Layout 🚫

While Tailwind is available, **layout-critical styling** (gaps, padding, grid definitions) should live in the component's dedicated CSS file using BEM classes. This allows the design system to be updated globally without touching React code.

### ✅ Do:
```css
/* /src/styles/patterns/card-grid.css */
.wp-pattern-card-grid {
  display: grid;
  gap: var(--spacing-gap-lg);
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 1600px) {
  .wp-pattern-card-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
```

### ❌ Don't:
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-6 gap-8">
  {/* Hardcoding breakpoints and gaps in JSX makes updates difficult */}
</div>
```

---

## 5. Component Auditing 🔍

Every component must be audited for:
1. **Semantic HTML**: Use `<header>`, `<footer>`, `<main>`, `<article>`, `<section>`.
2. **Variable Only Styling**: No hardcoded hex codes or pixel values.
3. **Responsive Fluidity**: Does it look good at 320px? Does it scale to 1920px?
4. **Dark Mode Integrity**: Contrast ratios and overlay transparency.
