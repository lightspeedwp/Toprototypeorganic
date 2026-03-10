# 🎨 DESIGN SYSTEM STYLE GUIDE

**LightSpeed Tour Operator - WordPress BEM CSS Architecture**  
**Version:** 1.0  
**Date:** February 24, 2026

---

## 📖 **TABLE OF CONTENTS**

1. [Overview](#overview)
2. [CSS Variables](#css-variables)
3. [Typography](#typography)
4. [Colors](#colors)
5. [Spacing](#spacing)
6. [Components](#components)
7. [Dark Mode](#dark-mode)
8. [Customization Guide](#customization-guide)
9. [Best Practices](#best-practices)

---

## 🎯 **OVERVIEW**

This design system uses **WordPress-aligned BEM CSS** with **CSS custom properties** (variables) for complete theme customization. All styling is centralized in CSS files, making it easy to update the entire site by modifying variables.

### **Key Features:**

✅ **CSS Variables Only** - No hardcoded values  
✅ **Automatic Dark Mode** - Switches via CSS custom properties  
✅ **Full Customization** - Update variables to change entire theme  
✅ **WordPress Aligned** - BEM naming matches WordPress patterns  
✅ **Accessible** - WCAG 2.1 AA compliant  
✅ **Responsive** - Fluid spacing and responsive breakpoints  

---

## 🎨 **CSS VARIABLES**

All design tokens are defined as CSS custom properties in `/src/styles/theme-light.css` and `/src/styles/theme-dark.css`.

### **File Structure:**

```
/src/styles/
├── theme.css              # Main entry point (imports light/dark)
├── theme-light.css        # Light mode variables
├── theme-dark.css         # Dark mode variables
├── fonts.css              # Font face definitions
└── global.css             # Global styles + imports
```

---

## ✍️ **TYPOGRAPHY**

### **Font Families**

**Defined in:** `/src/styles/fonts.css`

```css
--font-family-lora: "Lora", Georgia, serif;
--font-family-noto-sans: "Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-family-courier-new: "Courier New", monospace;
```

### **Usage:**

| Element | Font Family | Variable | Use Case |
|---------|-------------|----------|----------|
| Headings (H1-H6) | Lora (serif) | `--font-family-lora` | Headings, labels, blockquotes |
| Body Text | Noto Sans (sans-serif) | `--font-family-noto-sans` | Paragraphs, buttons, UI |
| Code | Courier New (monospace) | `--font-family-courier-new` | Code blocks |

### **Font Sizes**

```css
--text-6xl: 3.75rem;      /* 60px - H1 */
--text-4xl: 2.25rem;      /* 36px - H2 */
--text-3xl: 1.875rem;     /* 30px - H3 */
--text-2xl: 1.5rem;       /* 24px - H4 */
--text-xl: 1.25rem;       /* 20px - H5 */
--text-lg: 1.125rem;      /* 18px - H6 */
--text-base: 1rem;        /* 16px - Body */
--text-sm: 0.875rem;      /* 14px - Small */
--text-xs: 0.75rem;       /* 12px - Extra Small */
```

### **Font Weights**

**Modern Scale (Updated December 2024):**

```css
--font-weight-bold: 700;      /* H1 - Maximum impact */
--font-weight-semibold: 600;  /* H2, H3 - Strong hierarchy */
--font-weight-medium: 500;    /* H4-H6, buttons - Modern, clean */
--font-weight-normal: 400;    /* Body - Optimal readability */
```

### **Usage in Components:**

| Element | Font Size | Font Weight | Font Family |
|---------|-----------|-------------|-------------|
| H1 | `--text-6xl` (60px) | `--font-weight-bold` (700) | Lora (serif) |
| H2 | `--text-4xl` (36px) | `--font-weight-semibold` (600) | Lora (serif) |
| H3 | `--text-3xl` (30px) | `--font-weight-semibold` (600) | Lora (serif) |
| H4 | `--text-2xl` (24px) | `--font-weight-medium` (500) | Lora (serif) |
| H5 | `--text-xl` (20px) | `--font-weight-medium` (500) | Lora (serif) |
| H6 | `--text-lg` (18px) | `--font-weight-medium` (500) | Lora (serif) |
| Body | `--text-base` (16px) | `--font-weight-normal` (400) | Noto Sans |
| Button | `--text-base` (16px) | `--font-weight-medium` (500) | Noto Sans |

### **Example CSS:**

```css
/* Heading */
h1 {
  font-family: var(--font-family-lora);
  font-size: var(--text-6xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-foreground);
}

/* Body Text */
p {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-normal);
  color: var(--color-foreground);
}

/* Button */
button {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary-foreground);
  background-color: var(--color-primary);
}
```

---

## 🎨 **COLORS**

### **Semantic Color Tokens**

**Light Mode** (`theme-light.css`) and **Dark Mode** (`theme-dark.css`) each define semantic color tokens:

```css
/* Primary Brand Colors */
--color-primary: /* Main brand color */
--color-primary-foreground: /* Text on primary */

/* Secondary Colors */
--color-secondary: /* Secondary brand color */
--color-secondary-foreground: /* Text on secondary */

/* Accent Colors */
--color-accent: /* Accent/highlight color */
--color-accent-foreground: /* Text on accent */

/* Muted Colors */
--color-muted: /* Muted background */
--color-muted-foreground: /* Muted text */

/* Card Colors */
--color-card: /* Card background */
--color-card-foreground: /* Card text */

/* Background Colors */
--color-background: /* Page background */
--color-foreground: /* Page text */

/* UI Colors */
--color-border: /* Border color */
--color-ring: /* Focus ring color */
```

### **Light Mode Colors** (`theme-light.css`)

```css
:root {
  /* Primary - Green brand color */
  --color-primary-rgb: 84, 130, 53;
  --color-primary: rgb(84, 130, 53);
  --color-primary-foreground: rgb(255, 255, 255);

  /* Background */
  --color-background-rgb: 255, 255, 255;
  --color-background: rgb(255, 255, 255);

  /* Foreground (text) */
  --color-foreground-rgb: 15, 23, 42;
  --color-foreground: rgb(15, 23, 42);

  /* Card */
  --color-card: rgb(255, 255, 255);
  --color-card-foreground: rgb(15, 23, 42);

  /* Accent */
  --color-accent-rgb: 240, 249, 235;
  --color-accent: rgb(240, 249, 235);
  --color-accent-foreground: rgb(22, 78, 99);

  /* Muted */
  --color-muted-rgb: 241, 245, 249;
  --color-muted: rgb(241, 245, 249);
  --color-muted-foreground: rgb(100, 116, 139);

  /* Border */
  --color-border: rgb(226, 232, 240);

  /* Ring (focus) */
  --color-ring: rgb(84, 130, 53);

  /* Logo */
  --logo-current-color: var(--logo-dark);
}
```

### **Dark Mode Colors** (`theme-dark.css`)

```css
.dark {
  /* Primary - Lighter green for better contrast */
  --color-primary-rgb: 110, 165, 50;
  --color-primary: rgb(110, 165, 50);
  --color-primary-foreground: rgb(255, 255, 255);

  /* Background */
  --color-background-rgb: 15, 23, 42;
  --color-background: rgb(15, 23, 42);

  /* Foreground (text) */
  --color-foreground-rgb: 248, 250, 252;
  --color-foreground: rgb(248, 250, 252);

  /* Card */
  --color-card: rgb(30, 41, 59);
  --color-card-foreground: rgb(248, 250, 252);

  /* Accent */
  --color-accent-rgb: 51, 65, 85;
  --color-accent: rgb(51, 65, 85);
  --color-accent-foreground: rgb(248, 250, 252);

  /* Muted */
  --color-muted-rgb: 30, 41, 59;
  --color-muted: rgb(30, 41, 59);
  --color-muted-foreground: rgb(148, 163, 184);

  /* Border */
  --color-border: rgb(51, 65, 85);

  /* Ring (focus) */
  --color-ring: rgb(110, 165, 50);

  /* Logo */
  --logo-current-color: var(--logo-light);
}
```

### **Using Color Variables in CSS:**

```css
/* Button with primary color */
.wp-pattern-cta__button {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  border: 2px solid var(--color-primary);
}

/* Card with semantic colors */
.wp-card-tour {
  background-color: var(--color-card);
  color: var(--color-card-foreground);
  border: 1px solid var(--color-border);
}

/* Text with muted color */
.wp-card-tour__meta {
  color: var(--color-muted-foreground);
}
```

---

## 📏 **SPACING**

### **Fluid Responsive Spacing**

**Defined in:** `/src/styles/theme.css`

Spacing uses `clamp()` for fluid responsive behavior:

```css
/* Section Spacing (vertical padding between page sections) */
--spacing-section-xl: clamp(6rem, 8vw, 10rem);    /* 96-160px */
--spacing-section-lg: clamp(4rem, 6vw, 6rem);     /* 64-96px */
--spacing-section-md: clamp(3rem, 5vw, 5rem);     /* 48-80px */
--spacing-section-sm: clamp(2rem, 4vw, 4rem);     /* 32-64px */

/* Gap Spacing (space between elements) */
--spacing-gap-lg: clamp(2rem, 3vw, 3rem);         /* 32-48px */
--spacing-gap-md: clamp(1.5rem, 2.5vw, 2.5rem);   /* 24-40px */
--spacing-gap-sm: clamp(1rem, 2vw, 2rem);         /* 16-32px */
```

### **Tailwind Scale (for fixed spacing)**

You can also use Tailwind's spacing scale via utility classes:

| Class | Size | Pixels |
|-------|------|--------|
| `p-2` | 0.5rem | 8px |
| `p-4` | 1rem | 16px |
| `p-6` | 1.5rem | 24px |
| `p-8` | 2rem | 32px |
| `p-12` | 3rem | 48px |
| `p-16` | 4rem | 64px |

### **Using Spacing Variables:**

```css
/* Section with responsive padding */
.wp-pattern-hero {
  padding-top: var(--spacing-section-lg);
  padding-bottom: var(--spacing-section-lg);
}

/* Grid with responsive gap */
.wp-pattern-card-grid__grid {
  gap: var(--spacing-gap-md);
}

/* Fixed padding with Tailwind */
.wp-part-header__bar {
  padding-left: 1rem;  /* 16px */
  padding-right: 1rem; /* 16px */
}
```

---

## 🧩 **COMPONENTS**

### **BEM Naming Convention**

All components follow WordPress-aligned BEM (Block Element Modifier) naming:

```css
/* Template Parts */
.wp-part-{part}                    /* Block */
.wp-part-{part}__{element}         /* Element */
.wp-part-{part}__{element}--{modifier}  /* Modifier */

/* Pattern Components */
.wp-pattern-{pattern}              /* Block */
.wp-pattern-{pattern}__{element}   /* Element */
.wp-pattern-{pattern}--{modifier}  /* Modifier */

/* Card Components */
.wp-card-{type}                    /* Block */
.wp-card-{type}__{element}         /* Element */
.wp-card-{type}--{variant}         /* Modifier */
```

### **Examples:**

```css
/* Header (Template Part) */
.wp-part-header                     /* Header container */
.wp-part-header__nav                /* Navigation block */
.wp-part-header__nav-item           /* Navigation item */
.wp-part-header__nav-item--open     /* Open navigation item */
.wp-part-header--scrolled           /* Scrolled header state */

/* Hero (Pattern Component) */
.wp-pattern-hero                    /* Hero container */
.wp-pattern-hero__title             /* Hero title */
.wp-pattern-hero__image             /* Hero image */
.wp-pattern-hero--minimal           /* Minimal hero variant */

/* Card (Card Component) */
.wp-card-tour                       /* Tour card container */
.wp-card-tour__image                /* Tour card image */
.wp-card-tour__title                /* Tour card title */
.wp-card-tour__meta                 /* Tour card metadata */
```

### **Component CSS File Locations:**

```
/src/styles/
├── parts/
│   ├── header.css              # .wp-part-header__*
│   └── footer.css              # .wp-part-footer__*
│
└── patterns/
    ├── hero.css                # .wp-pattern-hero__*
    ├── archive-header.css      # .wp-pattern-archive-header__*
    ├── card-grid.css           # .wp-pattern-card-grid__*
    ├── cards.css               # .wp-card-{type}__*
    ├── cta.css                 # .wp-pattern-cta__*
    ├── editorial-content.css   # .wp-pattern-editorial-content__*
    ├── fast-facts.css          # .wp-pattern-fast-facts__*
    ├── faq.css                 # .wp-pattern-faq__*
    ├── taxonomy-nav.css        # .wp-pattern-taxonomy-nav__*
    ├── pagination.css          # .wp-pattern-pagination__*
    ├── related-content.css     # .wp-pattern-related-content__*
    └── mobile-menu.css         # .wp-pattern-mobile-menu__*
```

---

## 🌗 **DARK MODE**

### **How It Works**

Dark mode is handled automatically via CSS custom properties:

1. **Theme Toggle** - JavaScript adds/removes `.dark` class on `<html>`
2. **CSS Variables Switch** - Variables redefined in `.dark` selector
3. **Automatic Adaptation** - All colors adapt via CSS variables

### **JavaScript (already implemented):**

```typescript
// Toggle dark mode
const toggleTheme = () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Initialize theme on load
useEffect(() => {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', initial === 'dark');
}, []);
```

### **CSS (already implemented):**

```css
/* Light Mode */
:root {
  --color-background: rgb(255, 255, 255);
  --color-foreground: rgb(15, 23, 42);
}

/* Dark Mode */
.dark {
  --color-background: rgb(15, 23, 42);
  --color-foreground: rgb(248, 250, 252);
}
```

### **Benefits:**

✅ **Zero JavaScript** - Colors adapt via CSS only  
✅ **Instant Switch** - No re-render needed  
✅ **Persistent** - Theme saved to localStorage  
✅ **System Preference** - Respects `prefers-color-scheme`  
✅ **Logo Switch** - Logo automatically switches color  

---

## 🎨 **CUSTOMIZATION GUIDE**

### **How to Change the Entire Theme**

**Step 1: Edit Color Variables**

Open `/src/styles/theme-light.css`:

```css
:root {
  /* Change primary brand color from green to blue */
  --color-primary-rgb: 37, 99, 235;
  --color-primary: rgb(37, 99, 235);
  
  /* Change background to off-white */
  --color-background: rgb(250, 250, 250);
  
  /* Change muted color */
  --color-muted: rgb(243, 244, 246);
}
```

Open `/src/styles/theme-dark.css`:

```css
.dark {
  /* Adjust primary color for dark mode contrast */
  --color-primary-rgb: 59, 130, 246;
  --color-primary: rgb(59, 130, 246);
  
  /* Change dark background to pure black */
  --color-background: rgb(0, 0, 0);
}
```

**Result:** Entire site changes to blue theme with adjusted backgrounds!

---

### **How to Change Typography**

**Step 1: Edit Font Variables**

Open `/src/styles/theme.css`:

```css
:root {
  /* Change heading font from Lora to Playfair Display */
  --font-family-lora: "Playfair Display", Georgia, serif;
  
  /* Change body font from Noto Sans to Inter */
  --font-family-noto-sans: "Inter", -apple-system, sans-serif;
  
  /* Adjust font sizes */
  --text-6xl: 4rem;      /* Larger H1 (64px instead of 60px) */
  --text-base: 1.125rem; /* Larger body (18px instead of 16px) */
}
```

**Step 2: Add Font Imports**

Add to `/src/styles/fonts.css`:

```css
/* Import new fonts from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
```

**Result:** Entire site uses new fonts!

---

### **How to Change Spacing**

**Step 1: Edit Spacing Variables**

Open `/src/styles/theme.css`:

```css
:root {
  /* Increase section spacing for more breathing room */
  --spacing-section-xl: clamp(8rem, 10vw, 12rem);  /* 128-192px */
  --spacing-section-lg: clamp(6rem, 8vw, 8rem);    /* 96-128px */
  --spacing-section-md: clamp(4rem, 6vw, 6rem);    /* 64-96px */
  
  /* Decrease gap spacing for tighter layouts */
  --spacing-gap-lg: clamp(1.5rem, 2.5vw, 2.5rem);  /* 24-40px */
  --spacing-gap-md: clamp(1rem, 2vw, 2rem);        /* 16-32px */
}
```

**Result:** All sections and grids adjust automatically!

---

### **How to Add New Component Variants**

**Example: Adding a "Large" Hero Variant**

**Step 1: Add CSS Modifier**

Add to `/src/styles/patterns/hero.css`:

```css
/* Large Hero Variant */
.wp-pattern-hero--large {
  min-height: 90vh; /* Taller than standard */
}

.wp-pattern-hero--large .wp-pattern-hero__title {
  font-size: var(--text-7xl); /* Larger title */
}

.wp-pattern-hero--large .wp-pattern-hero__subtitle {
  font-size: var(--text-2xl); /* Larger subtitle */
}
```

**Step 2: Use in Component**

```typescript
<Hero
  variant="large"
  title="Welcome to Africa"
  subtitle="Experience the adventure of a lifetime"
  backgroundImage="/images/hero-large.jpg"
/>
```

**Step 3: Update Component Logic**

```typescript
export function Hero({ variant = "standard", ...props }) {
  return (
    <section
      className={cn(
        "wp-pattern-hero",
        variant === "large" && "wp-pattern-hero--large"
      )}
    >
      {/* ... */}
    </section>
  );
}
```

**Result:** New large hero variant available!

---

## ✅ **BEST PRACTICES**

### **DO:**

✅ **Use CSS Variables** - Always use design system tokens  
✅ **Follow BEM** - Use `.wp-part-*`, `.wp-pattern-*`, `.wp-card-*` naming  
✅ **Centralize Styling** - Keep all CSS in dedicated files  
✅ **Test Dark Mode** - Verify all changes work in both modes  
✅ **Use Semantic HTML** - `<h1>-<h6>`, `<nav>`, `<article>`, etc.  
✅ **Test Accessibility** - Check keyboard navigation, contrast, screen readers  
✅ **Test Responsive** - Verify mobile, tablet, desktop breakpoints  

### **DON'T:**

❌ **Don't Use Inline Styles** - Never use `style={{...}}`  
❌ **Don't Hardcode Colors** - Always use `var(--color-*)`  
❌ **Don't Hardcode Fonts** - Always use `var(--font-family-*)`  
❌ **Don't Hardcode Spacing** - Use variables or Tailwind classes  
❌ **Don't Use `dark:` Classes** - Let CSS variables handle dark mode  
❌ **Don't Break BEM** - Follow naming convention consistently  

---

## 📚 **QUICK REFERENCE**

### **Most Used Variables:**

```css
/* Colors */
var(--color-primary)
var(--color-background)
var(--color-foreground)
var(--color-border)
var(--color-muted-foreground)

/* Typography */
var(--font-family-lora)          /* Headings */
var(--font-family-noto-sans)     /* Body */
var(--text-6xl)                  /* H1 */
var(--text-base)                 /* Body */
var(--font-weight-semibold)      /* H2, H3 */
var(--font-weight-normal)        /* Body */

/* Spacing */
var(--spacing-section-lg)        /* Section padding */
var(--spacing-gap-md)            /* Grid gap */
```

### **Common Patterns:**

```css
/* Button */
background-color: var(--color-primary);
color: var(--color-primary-foreground);
font-family: var(--font-family-noto-sans);
font-weight: var(--font-weight-medium);

/* Card */
background-color: var(--color-card);
color: var(--color-card-foreground);
border: 1px solid var(--color-border);

/* Heading */
font-family: var(--font-family-lora);
font-size: var(--text-3xl);
font-weight: var(--font-weight-semibold);
color: var(--color-foreground);

/* Body Text */
font-family: var(--font-family-noto-sans);
font-size: var(--text-base);
font-weight: var(--font-weight-normal);
color: var(--color-foreground);
```

---

## 🎉 **SUMMARY**

This design system provides:

✅ **Complete Theme Customization** via CSS variables  
✅ **Automatic Dark Mode** via CSS custom properties  
✅ **Typography Control** via font variables  
✅ **Spacing Control** via responsive tokens  
✅ **Component Consistency** via BEM methodology  
✅ **Accessibility** via semantic HTML and WCAG compliance  
✅ **Maintainability** via centralized styling  

**To customize:** Just edit the CSS variables in `/src/styles/theme-light.css` and `/src/styles/theme-dark.css`!

---

**Questions?** Refer to the component CSS files for detailed examples and patterns.

**Need help?** Check the comprehensive documentation in `/tasks/` directory.

🎨 **Happy designing!** 🎨
