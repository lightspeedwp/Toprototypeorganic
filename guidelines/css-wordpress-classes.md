# WordPress CSS Class Naming Conventions

**Version:** 1.0.0  
**Created:** February 24, 2026  
**Purpose:** Define WordPress theme.json-aligned CSS naming patterns

---

## Overview

This document establishes the CSS naming conventions for migrating from Tailwind CSS to WordPress-native CSS classes. All classes follow WordPress block theme patterns and use CSS custom properties exclusively.

---

## Core Principles

1. **BEM Methodology**: Block Element Modifier pattern
2. **WordPress Conventions**: Follow WordPress block editor patterns
3. **CSS Variables Only**: No hardcoded colors, fonts, or spacing
4. **Semantic Naming**: Self-documenting, human-readable names
5. **Design System Compliance**: All values from theme.css tokens

---

## Naming Patterns

### Block-Level Elements (BEM)

```css
.wp-block-{namespace}-{block}
.wp-block-{namespace}-{block}__element
.wp-block-{namespace}-{block}--modifier
```

**Namespace:** `lts` (LightSpeed Tour Operator)

#### Examples

```css
/* Block */
.wp-block-lts-hero { }

/* Element (double underscore) */
.wp-block-lts-hero__title { }
.wp-block-lts-hero__content { }
.wp-block-lts-hero__image { }

/* Modifier (double dash) */
.wp-block-lts-hero--centered { }
.wp-block-lts-hero--full-width { }
.wp-block-lts-hero--gradient { }
```

### Utility Classes (WordPress Semantic)

```css
.has-{property}-{value}
.is-{state}
```

#### Examples

```css
/* Color Utilities */
.has-primary-background-color { background-color: var(--primary); }
.has-foreground-color { color: var(--foreground); }

/* Spacing Utilities */
.has-padding-4 { padding: 1rem; }
.has-margin-bottom-8 { margin-bottom: 2rem; }
.has-gap-6 { gap: 1.5rem; }

/* Typography Utilities */
.has-lora-font-family { font-family: var(--font-family-lora); }
.has-base-font-size { font-size: var(--text-base); }
.has-bold-font-weight { font-weight: var(--font-weight-bold); }

/* State Utilities */
.is-visible { visibility: visible; }
.is-active { /* active state styles */ }
```

### Layout Utilities (Namespaced)

```css
.wp-block-lts-layout--{property}
```

#### Examples

```css
/* Display */
.wp-block-lts-layout--flex { display: flex; }
.wp-block-lts-layout--grid { display: grid; }

/* Flex Direction */
.wp-block-lts-layout--flex-col { flex-direction: column; }

/* Flex Alignment */
.wp-block-lts-layout--items-center { align-items: center; }
.wp-block-lts-layout--justify-between { justify-content: space-between; }

/* Grid */
.wp-block-lts-layout--grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
```

---

## Tailwind to WordPress Mapping

### Layout Classes

| Tailwind | WordPress Class | CSS |
|----------|----------------|-----|
| `flex` | `.wp-block-lts-layout--flex` | `display: flex;` |
| `flex items-center` | `.wp-block-lts-layout--flex .wp-block-lts-layout--items-center` | `display: flex; align-items: center;` |
| `grid grid-cols-3` | `.wp-block-lts-layout--grid .wp-block-lts-layout--grid-cols-3` | `display: grid; grid-template-columns: repeat(3, 1fr);` |
| `flex-col` | `.wp-block-lts-layout--flex-col` | `flex-direction: column;` |
| `justify-between` | `.wp-block-lts-layout--justify-between` | `justify-content: space-between;` |
| `relative` | `.wp-block-lts-layout--relative` | `position: relative;` |
| `absolute` | `.wp-block-lts-layout--absolute` | `position: absolute;` |
| `hidden` | `.wp-block-lts-layout--hidden` | `display: none;` |

### Spacing Classes

| Tailwind | WordPress Class | CSS |
|----------|----------------|-----|
| `p-4` | `.has-padding-4` | `padding: 1rem;` |
| `py-8` | `.has-vertical-padding-8` | `padding-block: 2rem;` |
| `px-6` | `.has-horizontal-padding-6` | `padding-inline: 1.5rem;` |
| `pt-4` | `.has-padding-top-4` | `padding-top: 1rem;` |
| `pb-8` | `.has-padding-bottom-8` | `padding-bottom: 2rem;` |
| `m-4` | `.has-margin-4` | `margin: 1rem;` |
| `mb-12` | `.has-margin-bottom-12` | `margin-bottom: 3rem;` |
| `mx-auto` | `.has-horizontal-margin-auto` | `margin-inline: auto;` |
| `gap-4` | `.has-gap-4` | `gap: 1rem;` |
| `gap-6` | `.has-gap-6` | `gap: 1.5rem;` |

### Color Classes

| Tailwind | WordPress Class | CSS |
|----------|----------------|-----|
| `bg-background` | `.has-background-background-color` | `background-color: var(--background);` |
| `bg-primary` | `.has-primary-background-color` | `background-color: var(--primary);` |
| `text-foreground` | `.has-foreground-color` | `color: var(--foreground);` |
| `text-primary` | `.has-primary-color` | `color: var(--primary);` |
| `text-muted-foreground` | `.has-muted-foreground-color` | `color: var(--muted-foreground);` |
| `border-border` | `.has-border-border-color` | `border-color: var(--border);` |

### Typography Classes

| Tailwind | WordPress Class | CSS |
|----------|----------------|-----|
| `font-serif` | `.has-lora-font-family` | `font-family: var(--font-family-lora);` |
| `font-sans` | `.has-noto-sans-font-family` | `font-family: var(--font-family-noto-sans);` |
| `font-mono` | `.has-mono-font-family` | `font-family: var(--font-family-mono);` |
| `text-base` | `.has-base-font-size` | `font-size: var(--text-base);` |
| `text-lg` | `.has-lg-font-size` | `font-size: var(--text-lg);` |
| `text-2xl` | `.has-2xl-font-size` | `font-size: var(--text-2xl);` |
| `font-bold` | `.has-bold-font-weight` | `font-weight: var(--font-weight-bold);` |
| `font-medium` | `.has-medium-font-weight` | `font-weight: var(--font-weight-medium);` |
| `leading-tight` | `.has-tight-line-height` | `line-height: var(--leading-tight);` |
| `text-center` | `.has-text-align-center` | `text-align: center;` |

### Border & Radius Classes

| Tailwind | WordPress Class | CSS |
|----------|----------------|-----|
| `border` | `.has-border` | `border: 1px solid var(--border);` |
| `border-2` | `.has-border-2` | `border-width: 2px;` |
| `border-t` | `.has-border-top` | `border-top: 1px solid var(--border);` |
| `rounded-md` | `.has-border-radius-md` | `border-radius: var(--radius-md);` |
| `rounded-lg` | `.has-border-radius-lg` | `border-radius: var(--radius-lg);` |
| `rounded-full` | `.has-border-radius-full` | `border-radius: 9999px;` |

### Shadow Classes

| Tailwind | WordPress Class | CSS |
|----------|----------------|-----|
| `shadow-sm` | `.has-shadow-sm` | `box-shadow: var(--box-shadow-sm);` |
| `shadow-none` | `.has-shadow-none` | `box-shadow: none;` |

### Width & Height Classes

| Tailwind | WordPress Class | CSS |
|----------|----------------|-----|
| `w-full` | `.has-width-full` | `width: 100%;` |
| `w-auto` | `.has-width-auto` | `width: auto;` |
| `max-w-4xl` | `.has-max-width-4xl` | `max-width: 56rem;` |
| `h-full` | `.has-height-full` | `height: 100%;` |
| `min-h-screen` | `.has-min-height-screen` | `min-height: 100vh;` |

### Responsive Prefixes

| Tailwind | WordPress Class |
|----------|----------------|
| `md:flex` | `.md\:wp-block-lts-layout--flex` |
| `lg:grid-cols-3` | `.lg\:wp-block-lts-layout--grid-cols-3` |
| `md:gap-6` | `.md\:has-gap-6` |
| `lg:px-8` | `.lg\:has-horizontal-padding-8` |

---

## Component Example

### Before (Tailwind)

```tsx
export function Hero() {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="text-center max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-6xl font-bold mb-6 text-foreground">
          Welcome to Adventure
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Discover amazing destinations
        </p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
```

### After (WordPress CSS)

```tsx
export function Hero() {
  return (
    <div className="wp-block-lts-hero wp-block-lts-hero--gradient wp-block-lts-hero--centered">
      <div className="wp-block-lts-hero__content">
        <h1 className="wp-block-lts-hero__title has-foreground-color">
          Welcome to Adventure
        </h1>
        <p className="wp-block-lts-hero__subtitle has-muted-foreground-color has-margin-bottom-8">
          Discover amazing destinations
        </p>
        <div className="wp-block-lts-hero__actions">
          <button className="wp-block-lts-button wp-block-lts-button--primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
```

### Corresponding CSS

```css
/* /src/styles/patterns/hero.css */

.wp-block-lts-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wp-block-lts-hero--gradient {
  background: linear-gradient(
    to bottom right,
    rgba(74, 115, 17, 0.1),
    rgba(92, 83, 64, 0.1)
  );
}

.wp-block-lts-hero--centered {
  text-align: center;
}

.wp-block-lts-hero__content {
  max-width: 56rem;
  margin-inline: auto;
  padding-inline: 1rem;
  padding-block: 2rem;
}

.wp-block-lts-hero__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-6xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-tight);
  margin-bottom: 1.5rem;
}

.wp-block-lts-hero__subtitle {
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
}

.wp-block-lts-hero__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
```

---

## CSS Custom Properties Reference

### Colors (from theme.css)

```css
/* Base */
--background
--foreground
--card
--card-foreground

/* Brand */
--primary
--primary-foreground
--secondary
--secondary-foreground
--accent
--accent-foreground

/* Utility */
--muted
--muted-foreground
--destructive
--success
--warning
--info

/* Borders & Inputs */
--border
--input
--ring
```

### Typography (from theme.css)

```css
/* Font Families */
--font-family-lora           /* Serif for headings */
--font-family-noto-sans      /* Sans-serif for body */
--font-family-mono           /* Monospace for code */

/* Font Sizes (Fluid) */
--text-xs                    /* 12px - 14px */
--text-sm                    /* 14px - 16px */
--text-base                  /* 16px - 18px */
--text-lg                    /* 16px - 20px */
--text-xl                    /* 18px - 24px */
--text-2xl                   /* 20px - 30px */
--text-3xl                   /* 24px - 36px */
--text-4xl                   /* 30px - 48px */
--text-5xl                   /* 36px - 60px */
--text-6xl                   /* 48px - 72px */

/* Font Weights */
--font-weight-light          /* 300 */
--font-weight-normal         /* 400 */
--font-weight-medium         /* 500 */
--font-weight-semibold       /* 600 */
--font-weight-bold           /* 700 */

/* Line Heights */
--leading-tight              /* 1.2 */
--leading-snug               /* 1.375 */
--leading-normal             /* 1.5 */
--leading-relaxed            /* 1.625 */
--leading-loose              /* 1.75 */
```

### Spacing (from theme.css)

```css
/* Section Spacing (Fluid) */
--spacing-section-sm         /* 32px - 64px */
--spacing-section-md         /* 48px - 96px */
--spacing-section-lg         /* 64px - 128px */
--spacing-section-xl         /* 80px - 160px */

/* Container Padding (Fluid) */
--spacing-container-sm       /* 16px - 32px */
--spacing-container-md       /* 24px - 48px */
--spacing-container-lg       /* 32px - 64px */

/* Element Spacing (Fluid) */
--spacing-element-xs         /* 8px - 16px */
--spacing-element-sm         /* 12px - 24px */
--spacing-element-md         /* 16px - 32px */
--spacing-element-lg         /* 24px - 48px */

/* Gap Spacing (Fluid) */
--spacing-gap-xs             /* 8px - 16px */
--spacing-gap-sm             /* 12px - 24px */
--spacing-gap-md             /* 16px - 32px */
--spacing-gap-lg             /* 24px - 48px */
```

### Borders & Radius (from theme.css)

```css
/* Border Radius */
--radius-sm                  /* calc(var(--radius) - 2px) */
--radius-md                  /* var(--radius) */
--radius-lg                  /* calc(var(--radius) + 2px) */
--radius-xl                  /* calc(var(--radius) + 4px) */

/* Shadows */
--box-shadow-sm              /* var(--elevation-sm) */
```

---

## Best Practices

### 1. Use Semantic Block Names

✅ **Good:**
```css
.wp-block-lts-hero { }
.wp-block-lts-tour-card { }
.wp-block-lts-cta { }
```

❌ **Bad:**
```css
.section { }
.card { }
.button-group { }
```

### 2. Use Element Naming for Children

✅ **Good:**
```css
.wp-block-lts-card { }
.wp-block-lts-card__image { }
.wp-block-lts-card__title { }
.wp-block-lts-card__content { }
```

❌ **Bad:**
```css
.wp-block-lts-card { }
.wp-block-lts-card-image { }  /* Missing __ separator */
.wp-block-lts-card .image { } /* Generic class name */
```

### 3. Use Modifiers for Variants

✅ **Good:**
```css
.wp-block-lts-button { }
.wp-block-lts-button--primary { }
.wp-block-lts-button--secondary { }
.wp-block-lts-button--large { }
```

❌ **Bad:**
```css
.wp-block-lts-button { }
.wp-block-lts-primary-button { }  /* Wrong structure */
.wp-block-lts-button.large { }    /* Missing -- separator */
```

### 4. Always Use CSS Custom Properties

✅ **Good:**
```css
.wp-block-lts-hero {
  background-color: var(--background);
  color: var(--foreground);
  padding: var(--spacing-section-md);
}
```

❌ **Bad:**
```css
.wp-block-lts-hero {
  background-color: #FFFFFF;     /* Hardcoded color */
  color: #000000;                /* Hardcoded color */
  padding: 48px;                 /* Hardcoded spacing */
}
```

### 5. Use Utility Classes for Simple Styling

✅ **Good:**
```tsx
<div className="wp-block-lts-card has-padding-6 has-margin-bottom-8 has-shadow-sm">
```

✅ **Also Good (Component-specific styles):**
```tsx
<div className="wp-block-lts-card">
```
```css
.wp-block-lts-card {
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--box-shadow-sm);
}
```

### 6. Responsive Classes Use Escaped Colons

✅ **Good:**
```css
.md\:wp-block-lts-layout--flex {
  @media (min-width: 768px) {
    display: flex;
  }
}
```

```tsx
<div className="wp-block-lts-layout--grid md:wp-block-lts-layout--flex">
```

---

## File Organization

### Directory Structure

```
/src/styles/
├── wordpress-classes.css        # Utility classes (this provides most utilities)
├── blocks/                      # Block-specific styles
│   ├── hero.css
│   ├── card-grid.css
│   └── tour-card.css
├── parts/                       # Template part styles
│   ├── header.css
│   ├── footer.css
│   └── mobile-menu.css
├── patterns/                    # Pattern styles
│   ├── cta.css
│   └── archive-header.css
└── utilities/                   # Utility component styles
    ├── container.css
    └── breadcrumbs.css
```

### Import Order (in global.css)

```css
/* 1. WordPress utility classes (provides base utilities) */
@import './wordpress-classes.css';

/* 2. Component-specific styles */
@import './blocks/hero.css';
@import './parts/header.css';
@import './patterns/cta.css';
@import './utilities/container.css';
```

---

## Quick Reference

### Most Common Conversions

| Tailwind | WordPress |
|----------|-----------|
| `flex` | `.wp-block-lts-layout--flex` |
| `gap-4` | `.has-gap-4` |
| `p-6` | `.has-padding-6` |
| `mb-8` | `.has-margin-bottom-8` |
| `bg-primary` | `.has-primary-background-color` |
| `text-foreground` | `.has-foreground-color` |
| `font-bold` | `.has-bold-font-weight` |
| `rounded-lg` | `.has-border-radius-lg` |

---

## Validation Checklist

When creating new CSS classes, verify:

- [ ] Follows BEM pattern (block__element--modifier)
- [ ] Uses `wp-block-lts-` namespace for blocks/layouts
- [ ] Uses `has-` prefix for utility classes
- [ ] Uses `is-` prefix for state classes
- [ ] All values use CSS custom properties
- [ ] No hardcoded colors, fonts, or spacing
- [ ] Responsive variants use escaped colons (`.md\:`)
- [ ] Class names are semantic and self-documenting

---

**Reference:** `/tasks/tailwind-to-wordpress-migration.md`  
**Status:** Foundation established - Ready for component migration
