# Spacing Design Tokens

**Version:** 5.2.0  
**Last Updated:** March 2026  
**WordPress Theme.json Compatible:** ✅

Complete spacing system for the Ash Shaw Makeup Portfolio, aligned with WordPress block theme standards using numeric spacing scale (10-100) with extended ultra-wide breakpoint support.

## ✅ IMPLEMENTATION COMPLETE (v5.0.0)

**WordPress Preset System Fully Implemented:**
- ✅ **WordPress Variables:** All `--wp--preset--spacing--{slug}` variables added to globals.css
- ✅ **Helper Classes:** 150+ utility classes (`.p-spacing-40`, `.py-section`, etc.)
- ✅ **Fluid Spacing:** Complete fluid scale with viewport-aware scaling
- ✅ **Component Spacing:** Dedicated variables for buttons, cards, sections
- ✅ **Block Gap:** WordPress-standard block gap variables

**See Also:** [wordpress-preset-system.md](../wordpress-preset-system.md) for complete implementation details

## ✅ WordPress Theme.json Alignment (v5.0.0)

This spacing system now uses WordPress `--wp--preset--spacing--` CSS variables:

- ✅ **Numeric Slugs (10-100):** Fixed rem scale for consistency
- ✅ **Fluid Extensions:** Responsive spacing with viewport scaling
- ✅ **Helper Classes:** `.p-spacing-{slug}`, `.py-section`, `.gap-block-md`
- ✅ **Component-Specific:** Dedicated button, card, and section spacing

**Key Difference from Previous Version:**
- **Before:** Custom variables (--space-xs, --space-sm, --card-padding-mobile, etc.)
- **Now:** WordPress presets (--wp--preset--spacing--40, --wp--preset--spacing--fluid-md, etc.)
- **Legacy Support:** Old variables preserved for backward compatibility

## 📋 Table of Contents

1. [WordPress Numeric Spacing Scale](#wordpress-numeric-spacing-scale)
2. [Fluid Spacing Extensions](#fluid-spacing-extensions)
3. [Component-Specific Spacing](#component-specific-spacing)
4. [Helper Classes](#helper-classes)
5. [CSS Variable Usage](#css-variable-usage)
6. [Migration Guide](#migration-guide)
7. [Common Spacing Patterns](#common-spacing-patterns)

---

## WordPress Numeric Spacing Scale

### Core Spacing Scale

All spacing uses **numeric slugs (10-100)** with increments of 10:

```css
/* WordPress Theme.json Spacing Scale (Fixed Values) */
--wp--preset--spacing--10: 0.625rem;   /* 10px */
--wp--preset--spacing--20: 1.25rem;    /* 20px */
--wp--preset--spacing--30: 1.875rem;   /* 30px */
--wp--preset--spacing--40: 2.5rem;     /* 40px (Default) */
--wp--preset--spacing--50: 3.125rem;   /* 50px */
--wp--preset--spacing--60: 3.75rem;    /* 60px */
--wp--preset--spacing--70: 4.375rem;   /* 70px */
--wp--preset--spacing--80: 5rem;       /* 80px */
--wp--preset--spacing--90: 5.625rem;   /* 90px */
--wp--preset--spacing--100: 6.25rem;   /* 100px */
```

### Responsive Breakpoints (v5.2.0)

The project now supports **extended ultra-wide breakpoints** for 4-6 column layouts on large displays:

| Breakpoint | Min Width | Use Case | Typical Columns |
|------------|-----------|----------|--------------------|
| Mobile Compact | >320px | Small phones | 1 column |
| Mobile | >480px | Standard phones | 1-2 columns |
| Small | >600px | Phablets | 2 columns |
| Tablet Portrait | >768px | Tablets, small laptops | 2-3 columns |
| Tablet Landscape | >1024px | Landscape tablets, laptops | 3 columns |
| Wide | >1280px | Standard laptops | 3-4 columns |
| Desktop | >1440px | Standard desktops | 3-4 columns |
| **Desktop Wide** | **>1568px** | **Wide displays** | **4 columns** |
| **Desktop Ultra-wide** | **>1768px** | **Ultra-wide monitors** | **4-5 columns** |
| **Desktop XL** | **>1800px** | **Extra-large displays** | **5 columns optimized** |
| **Full HD** | **>1920px** | **1920×1080+ displays** | **5-6 columns** |

**Layout Width Variables:**
```css
--wp--preset--layout--content: 800px;        /* Reading width */
--wp--preset--layout--wide: 1440px;          /* Standard desktop */
--wp--preset--layout--desktop-wide: 1568px;  /* Wide desktop */
--wp--preset--layout--ultra-wide: 1768px;    /* Ultra-wide */
--wp--preset--layout--desktop-xl: 1800px;    /* Extra-large (NEW v5.2.1) */
--wp--preset--layout--full-hd: 1920px;       /* Full HD */
--wp--preset--layout--full: 100%;            /* Full viewport */
```

**Media Query Examples:**
```css
/* Standard Desktop (3-4 columns) */
@media (min-width: 1440px) {
  .grid-portfolio {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Desktop Wide (4 columns optimized) */
@media (min-width: 1568px) {
  .grid-portfolio {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Desktop Ultra-wide (5 columns) */
@media (min-width: 1768px) {
  .grid-portfolio {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* Full HD (5-6 columns optimized) */
@media (min-width: 1920px) {
  .grid-portfolio {
    grid-template-columns: repeat(6, 1fr);
  }
}
```

### Visual Spacing Scale

```
┌─────────────────────────────────────────────────────────────────────┐
│              WORDPRESS NUMERIC SPACING SCALE (Fixed)                 │
└─────────────────────────────────────────────────────────────────────┘

--spacing--10
▓                                    0.625rem (10px)

--spacing--20
▓▓                                   1.25rem (20px)

--spacing--30
▓▓▓                                  1.875rem (30px)

--spacing--40
▓▓▓▓                                 2.5rem (40px)

--spacing--50
▓▓▓▓▓                                3.125rem (50px)

--spacing--60
▓▓▓▓▓▓                               3.75rem (60px)

--spacing--70
▓▓▓▓▓▓▓                              4.375rem (70px)

--spacing--80
▓▓▓▓▓▓▓▓                             5rem (80px)

--spacing--90
▓▓▓▓▓▓▓▓▓                            5.625rem (90px)

--spacing--100
▓▓▓▓▓▓▓▓▓▓                           6.25rem (100px)
```

### Spacing Progression

The numeric scale provides **predictable progression**:

| Slug | Rem Value | Pixel Value | Use Case |
|------|-----------|-------------|----------|
| `10` | 0.625rem | 10px | Tight padding, small gaps |
| `20` | 1.25rem | 20px | Card padding, button spacing |
| `30` | 1.875rem | 30px | Component margins |
| `40` | 2.5rem | 40px | **Default component spacing** |
| `50` | 3.125rem | 50px | Section padding (small) |
| `60` | 3.75rem | 60px | Section padding (medium) |
| `70` | 4.375rem | 70px | Section padding (large) |
| `80` | 5rem | 80px | **Page section spacing** |
| `90` | 5.625rem | 90px | Hero section padding |
| `100` | 6.25rem | 100px | Maximum spacing, large gaps |

---

## Fluid Spacing Extensions

### Fluid Spacing Scale

All spacing uses **numeric slugs (10-100)** with increments of 10, with fluid extensions for responsive design:

```css
/* WordPress Theme.json Spacing Scale (Fluid Values) */
--wp--preset--spacing--fluid-10: clamp(0.625rem, 0.625rem + 0.0625vw, 0.625rem);   /* 10px */
--wp--preset--spacing--fluid-20: clamp(1.25rem, 1.25rem + 0.125vw, 1.25rem);    /* 20px */
--wp--preset--spacing--fluid-30: clamp(1.875rem, 1.875rem + 0.1875vw, 1.875rem);   /* 30px */
--wp--preset--spacing--fluid-40: clamp(2.5rem, 2.5rem + 0.25vw, 2.5rem);     /* 40px */
--wp--preset--spacing--fluid-50: clamp(3.125rem, 3.125rem + 0.3125vw, 3.125rem);   /* 50px */
--wp--preset--spacing--fluid-60: clamp(3.75rem, 3.75rem + 0.375vw, 3.75rem);    /* 60px */
--wp--preset--spacing--fluid-70: clamp(4.375rem, 4.375rem + 0.4375vw, 4.375rem);   /* 70px */
--wp--preset--spacing--fluid-80: clamp(5rem, 5rem + 0.5vw, 5rem);       /* 80px */
--wp--preset--spacing--fluid-90: clamp(5.625rem, 5.625rem + 0.5625vw, 5.625rem);   /* 90px */
--wp--preset--spacing--fluid-100: clamp(6.25rem, 6.25rem + 0.625vw, 6.25rem);   /* 100px */
```

### Visual Fluid Spacing Scale

```
┌─────────────────────────────────────────────────────────────────────┐
│              WORDPRESS NUMERIC SPACING SCALE (Fluid)                 │
└─────────────────────────────────────────────────────────────────────┘

--spacing--fluid-10
▓                                    0.625rem (10px)

--spacing--fluid-20
▓▓                                   1.25rem (20px)

--spacing--fluid-30
▓▓▓                                  1.875rem (30px)

--spacing--fluid-40
▓▓▓▓                                 2.5rem (40px)

--spacing--fluid-50
▓▓▓▓▓                                3.125rem (50px)

--spacing--fluid-60
▓▓▓▓▓▓                               3.75rem (60px)

--spacing--fluid-70
▓▓▓▓▓▓▓                              4.375rem (70px)

--spacing--fluid-80
▓▓▓▓▓▓▓▓                             5rem (80px)

--spacing--fluid-90
▓▓▓▓▓▓▓▓▓                            5.625rem (90px)

--spacing--fluid-100
▓▓▓▓▓▓▓▓▓▓                           6.25rem (100px)
```

### Fluid Spacing Progression

The fluid scale provides **responsive progression**:

| Slug | Rem Value | Pixel Value | Use Case |
|------|-----------|-------------|----------|
| `10` | 0.625rem | 10px | Tight padding, small gaps |
| `20` | 1.25rem | 20px | Card padding, button spacing |
| `30` | 1.875rem | 30px | Component margins |
| `40` | 2.5rem | 40px | **Default component spacing** |
| `50` | 3.125rem | 50px | Section padding (small) |
| `60` | 3.75rem | 60px | Section padding (medium) |
| `70` | 4.375rem | 70px | Section padding (large) |
| `80` | 5rem | 80px | **Page section spacing** |
| `90` | 5.625rem | 90px | Hero section padding |
| `100` | 6.25rem | 100px | Maximum spacing, large gaps |

---

## Component-Specific Spacing

### Buttons

```css
/* Button Padding */
.button-padding {
  padding: var(--wp--preset--spacing--20) var(--wp--preset--spacing--40);
}

/* Small Button */
.button-small {
  padding: var(--wp--preset--spacing--10) var(--wp--preset--spacing--30);
}

/* Large Button */
.button-large {
  padding: var(--wp--preset--spacing--30) var(--wp--preset--spacing--50);
}
```

**React/TSX Usage:**
```tsx
<button className="px-spacing-40 py-spacing-20 bg-gradient-pink-purple-blue">
  Submit
</button>
```

### Cards

```css
/* Card Padding */
.card-padding {
  padding: var(--wp--preset--spacing--40);
}

/* Compact Card */
.card-compact {
  padding: var(--wp--preset--spacing--20);
}

/* Spacious Card */
.card-spacious {
  padding: var(--wp--preset--spacing--60);
}
```

**React/TSX Usage:**
```tsx
<div className="p-spacing-40 bg-white rounded-xl shadow-lg">
  Card Content
</div>
```

### Sections

```css
/* Section Vertical Spacing */
.section-spacing {
  padding-top: var(--wp--preset--spacing--80);
  padding-bottom: var(--wp--preset--spacing--80);
}

/* Small Section */
.section-small {
  padding-block: var(--wp--preset--spacing--50);
}

/* Large Section */
.section-large {
  padding-block: var(--wp--preset--spacing--100);
}
```

**React/TSX Usage:**
```tsx
<section className="py-spacing-80 px-spacing-40">
  Section Content
</section>
```

### Content Flow

```css
/* Stack Spacing (between elements) */
.stack-spacing-20 > * + * {
  margin-top: var(--wp--preset--spacing--20);
}

.stack-spacing-30 > * + * {
  margin-top: var(--wp--preset--spacing--30);
}

.stack-spacing-40 > * + * {
  margin-top: var(--wp--preset--spacing--40);
}
```

---

## Helper Classes

### Padding Utilities

```css
/* Padding Utilities */
.p-spacing-10 { padding: var(--wp--preset--spacing--10); }
.p-spacing-20 { padding: var(--wp--preset--spacing--20); }
.p-spacing-30 { padding: var(--wp--preset--spacing--30); }
.p-spacing-40 { padding: var(--wp--preset--spacing--40); }
.p-spacing-50 { padding: var(--wp--preset--spacing--50); }
.p-spacing-60 { padding: var(--wp--preset--spacing--60); }
.p-spacing-70 { padding: var(--wp--preset--spacing--70); }
.p-spacing-80 { padding: var(--wp--preset--spacing--80); }
.p-spacing-90 { padding: var(--wp--preset--spacing--90); }
.p-spacing-100 { padding: var(--wp--preset--spacing--100); }

/* Vertical Padding (py) */
.py-spacing-40 {
  padding-top: var(--wp--preset--spacing--40);
  padding-bottom: var(--wp--preset--spacing--40);
}

/* Horizontal Padding (px) */
.px-spacing-20 {
  padding-left: var(--wp--preset--spacing--20);
  padding-right: var(--wp--preset--spacing--20);
}

/* Margin Bottom (mb) */
.mb-spacing-30 {
  margin-bottom: var(--wp--preset--spacing--30);
}

/* Margin Top (mt) */
.mt-spacing-40 {
  margin-top: var(--wp--preset--spacing--40);
}

/* Gap */
.gap-spacing-30 {
  gap: var(--wp--preset--spacing--30);
}
```

### Section Padding

```css
/* Section Padding */
.py-section {
  padding-top: var(--wp--preset--spacing--80);
  padding-bottom: var(--wp--preset--spacing--80);
}

.py-section-small {
  padding-top: var(--wp--preset--spacing--50);
  padding-bottom: var(--wp--preset--spacing--50);
}

.py-section-large {
  padding-top: var(--wp--preset--spacing--100);
  padding-bottom: var(--wp--preset--spacing--100);
}
```

### Block Gap

```css
/* Block Gap */
.gap-block-sm {
  gap: var(--wp--preset--spacing--20);
}

.gap-block-md {
  gap: var(--wp--preset--spacing--40);
}

.gap-block-lg {
  gap: var(--wp--preset--spacing--60);
}
```

---

## CSS Variable Usage

### WordPress Preset Variables

All spacing uses WordPress custom properties:

```css
/* Padding */
.component {
  padding: var(--wp--preset--spacing--40);
}

/* Margin */
.section {
  margin-block: var(--wp--preset--spacing--80);
}

/* Gap (Flexbox/Grid) */
.grid {
  gap: var(--wp--preset--spacing--30);
}

/* Directional Spacing */
.card {
  padding-top: var(--wp--preset--spacing--40);
  padding-bottom: var(--wp--preset--spacing--40);
  padding-left: var(--wp--preset--spacing--20);
  padding-right: var(--wp--preset--spacing--20);
}
```

### Tailwind-Style Utility Classes

For backward compatibility with existing code:

```css
/* Padding Utilities */
.p-spacing-10 { padding: var(--wp--preset--spacing--10); }
.p-spacing-20 { padding: var(--wp--preset--spacing--20); }
.p-spacing-30 { padding: var(--wp--preset--spacing--30); }
.p-spacing-40 { padding: var(--wp--preset--spacing--40); }
.p-spacing-50 { padding: var(--wp--preset--spacing--50); }
.p-spacing-60 { padding: var(--wp--preset--spacing--60); }
.p-spacing-70 { padding: var(--wp--preset--spacing--70); }
.p-spacing-80 { padding: var(--wp--preset--spacing--80); }
.p-spacing-90 { padding: var(--wp--preset--spacing--90); }
.p-spacing-100 { padding: var(--wp--preset--spacing--100); }

/* Vertical Padding (py) */
.py-spacing-40 {
  padding-top: var(--wp--preset--spacing--40);
  padding-bottom: var(--wp--preset--spacing--40);
}

/* Horizontal Padding (px) */
.px-spacing-20 {
  padding-left: var(--wp--preset--spacing--20);
  padding-right: var(--wp--preset--spacing--20);
}

/* Margin Bottom (mb) */
.mb-spacing-30 {
  margin-bottom: var(--wp--preset--spacing--30);
}

/* Margin Top (mt) */
.mt-spacing-40 {
  margin-top: var(--wp--preset--spacing--40);
}

/* Gap */
.gap-spacing-30 {
  gap: var(--wp--preset--spacing--30);
}
```

---

## Migration Guide

### Old vs New Mapping

| Old Class | New Class | Value |
|-----------|-----------|-------|
| `.p-fluid-xs` | `.p-spacing-10` | 0.625rem (10px) |
| `.p-fluid-sm` | `.p-spacing-20` | 1.25rem (20px) |
| `.p-fluid-md` | `.p-spacing-40` | 2.5rem (40px) |
| `.p-fluid-lg` | `.p-spacing-50` | 3.125rem (50px) |
| `.p-fluid-xl` | `.p-spacing-60` | 3.75rem (60px) |
| `.p-fluid-2xl` | `.p-spacing-80` | 5rem (80px) |
| `.p-fluid-3xl` | `.p-spacing-90` | 5.625rem (90px) |
| `.p-fluid-4xl` | `.p-spacing-100` | 6.25rem (100px) |

### Migration Examples

**Before (Semantic):**
```tsx
<div className="p-fluid-md mb-fluid-lg">
  Content
</div>
```

**After (Numeric):**
```tsx
<div className="p-spacing-40 mb-spacing-50">
  Content
</div>
```

**Before (Component Spacing):**
```tsx
<button className="px-button py-button">
  Click Me
</button>
```

**After (Explicit Numeric):**
```tsx
<button className="px-spacing-40 py-spacing-20">
  Click Me
</button>
```

---

## Common Spacing Patterns

### Layout Containers

```css
/* Max-width Container with Padding */
.container {
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: var(--wp--preset--spacing--40);
}

/* Wide Container */
.container-wide {
  max-width: 1600px;
  margin-inline: auto;
  padding-inline: var(--wp--preset--spacing--60);
}
```

### Grid Systems

```css
/* Card Grid with Gap */
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--wp--preset--spacing--40);
}

/* Portfolio Grid */
.grid-portfolio {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--wp--preset--spacing--30);
}
```

### Flexbox Layouts

```css
/* Horizontal Navigation */
.nav-horizontal {
  display: flex;
  gap: var(--wp--preset--spacing--40);
  align-items: center;
}

/* Vertical Stack */
.stack-vertical {
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--20);
}
```

### Form Layouts

```css
/* Form Field Spacing */
.form-field {
  margin-bottom: var(--wp--preset--spacing--30);
}

/* Form Group */
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--wp--preset--spacing--10);
}

/* Form Submit Button */
.form-submit {
  margin-top: var(--wp--preset--spacing--40);
}
```

---

## Responsive Spacing Patterns

### Mobile-First Approach

```css
/* Base (Mobile) */
.responsive-section {
  padding: var(--wp--preset--spacing--40);
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .responsive-section {
    padding: var(--wp--preset--spacing--60);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .responsive-section {
    padding: var(--wp--preset--spacing--80);
  }
}
```

### Responsive Grid Gaps

```css
/* Responsive Card Grid */
.responsive-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--wp--preset--spacing--20);
}

@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--wp--preset--spacing--30);
  }
}

@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--wp--preset--spacing--40);
  }
}
```

---

## Best Practices

### ✅ DO

1. **Use numeric slugs consistently**
   ```css
   /* ✅ GOOD */
   padding: var(--wp--preset--spacing--40);
   margin-block: var(--wp--preset--spacing--80);
   gap: var(--wp--preset--spacing--30);
   ```

2. **Reference via CSS variables**
   ```css
   /* ✅ GOOD */
   .component {
     padding: var(--wp--preset--spacing--40);
   }
   
   /* ❌ BAD */
   .component {
     padding: 2.5rem; /* Don't hardcode */
   }
   ```

3. **Use appropriate scale for context**
   - Small elements (buttons, inputs): `--spacing--10` to `--spacing--30`
   - Medium components (cards): `--spacing--30` to `--spacing--50`
   - Large sections: `--spacing--60` to `--spacing--100`

4. **Maintain vertical rhythm**
   ```css
   /* ✅ GOOD - Consistent spacing */
   .content > * + * {
     margin-top: var(--wp--preset--spacing--30);
   }
   ```

### ❌ DON'T

1. **Don't use arbitrary values**
   ```css
   /* ❌ BAD */
   .component {
     padding: 25px; /* Not in scale */
   }
   
   /* ✅ GOOD */
   .component {
     padding: var(--wp--preset--spacing--40); /* Use scale */
   }
   ```

2. **Don't mix semantic and numeric**
   ```css
   /* ❌ BAD */
   .component {
     padding: var(--spacing-fluid-md); /* Old semantic */
     margin: var(--wp--preset--spacing--40); /* New numeric */
   }
   ```

3. **Don't skip scale increments**
   ```css
   /* ⚠️ AVOID - Jumping too far */
   .component {
     padding: var(--wp--preset--spacing--10);
     margin: var(--wp--preset--spacing--100);
   }
   
   /* ✅ BETTER - Gradual progression */
   .component {
     padding: var(--wp--preset--spacing--20);
     margin: var(--wp--preset--spacing--60);
   }
   ```

---

## Accessibility Considerations

### Touch Target Minimum (44px)

Always ensure interactive elements meet WCAG minimum touch target size:

```css
/* Button with minimum touch target */
.button {
  min-height: 44px; /* 2.75rem */
  padding: var(--wp--preset--spacing--20) var(--wp--preset--spacing--40);
}

/* Icon Button */
.icon-button {
  min-width: 44px;
  min-height: 44px;
  padding: var(--wp--preset--spacing--10);
}
```

### Focus Indicator Spacing

```css
/* Focus Ring with Offset */
.interactive:focus {
  outline: 4px solid var(--color-pink-200);
  outline-offset: 4px; /* Use spacing--10 equivalent */
}
```

---

## WordPress Block Editor Integration

### Block Pattern Spacing

```html
<!-- wp:group {"style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}}} -->
<div class="wp-block-group" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)">
  <!-- Content -->
</div>
<!-- /wp:group -->
```

### Custom CSS in Blocks

```css
/* Custom block spacing */
.wp-block-custom {
  padding: var(--wp--preset--spacing--40);
  margin-block: var(--wp--preset--spacing--60);
}

.wp-block-custom > * + * {
  margin-top: var(--wp--preset--spacing--30);
}
```

---

## Summary

### Key Takeaways

- ✅ **Numeric scale (10-100)** replaces semantic names (xs, sm, md, lg, xl)
- ✅ **Fixed rem values** instead of fluid clamp() for spacing
- ✅ **WordPress theme.json compatible** with standard CSS variables
- ✅ **Predictable progression** (increments of 10)
- ✅ **Design tool integration** (Figma, Sketch compatible)

### Quick Reference

| Spacing | Value | Common Use |
|---------|-------|------------|
| `--spacing--10` | 0.625rem (10px) | Tight gaps, small padding |
| `--spacing--20` | 1.25rem (20px) | Button padding, input spacing |
| `--spacing--30` | 1.875rem (30px) | Content flow, card margins |
| `--spacing--40` | 2.5rem (40px) | **Default component spacing** |
| `--spacing--50` | 3.125rem (50px) | Small section padding |
| `--spacing--60` | 3.75rem (60px) | Medium section padding |
| `--spacing--70` | 4.375rem (70px) | Large section padding |
| `--spacing--80` | 5rem (80px) | **Page section spacing** |
| `--spacing--90` | 5.625rem (90px) | Hero sections |
| `--spacing--100` | 6.25rem (100px) | Maximum spacing |

---

**Version:** 5.2.0 (WordPress Numeric Scale)  
**Last Updated:** March 2026  
**Maintained By:** Ash Shaw Portfolio Team

**Related Documentation:**
- [Typography Design Tokens](./typography.md) - Font sizing system
- [Colors Design Tokens](./colors.md) - Color palette
- [Component Guidelines](../components/) - Component-specific usage