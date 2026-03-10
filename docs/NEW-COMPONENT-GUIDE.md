# New Component Development Guide

**Version:** 1.0  
**Last Updated:** February 26, 2026

This guide shows you how to create new components that properly use the design system's CSS variables, ensuring users can customize the entire site by editing CSS files only.

---

## 🎯 Quick Rules

### ✅ ALWAYS DO:
1. **Use CSS variables** - All colors, fonts, spacing from theme files
2. **Use defined fonts only** - Lora (serif), Noto Sans (sans-serif), Courier New (mono)
3. **Use BEM naming** - `.wp-{category}-{component}__element--modifier`
4. **Create external CSS** - No inline styles, dedicated CSS files
5. **Use Tailwind utilities** - They reference CSS variables via `@theme inline`
6. **Test dark mode** - Verify in both light and dark modes

### ❌ NEVER DO:
1. **Hardcoded colors** - `color: #548235` ❌ Use `color: var(--primary)` ✅
2. **Hardcoded fonts** - `font-family: "Arial"` ❌ Use `font-family: var(--font-family-noto-sans)` ✅
3. **Inline styles** - `style={{ color: 'green' }}` ❌ Use className with CSS variables ✅
4. **`dark:` classes** - `dark:bg-slate-800` ❌ Use `.dark` selector in CSS ✅
5. **Random font families** - Only Lora, Noto Sans, Courier New allowed

---

## 📐 Component Template

### Step 1: Create the React Component

**File:** `/src/app/components/{category}/{ComponentName}.tsx`

```tsx
/**
 * ComponentName - Brief description
 * 
 * Uses WordPress BEM CSS classes (NO dark: Tailwind classes)
 * All styling via /src/styles/{category}/{component-name}.css
 * Uses CSS variables from WordPress theme.json
 * 
 * Typography: ONLY uses defined fonts:
 * - Lora (serif) via var(--font-family-lora)
 * - Noto Sans (sans-serif) via var(--font-family-noto-sans)
 * - Courier New (monospace) via var(--font-family-mono)
 * 
 * @see /src/styles/{category}/{component-name}.css
 */

import { cn } from "../../lib/utils";

interface ComponentNameProps {
  /** Component properties */
  title: string;
  description?: string;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export function ComponentName({
  title,
  description,
  variant = "default",
  className,
}: ComponentNameProps) {
  return (
    <div
      className={cn(
        "wp-pattern-component-name",
        `wp-pattern-component-name--${variant}`,
        className
      )}
    >
      <h3 className="wp-pattern-component-name__title">
        {title}
      </h3>
      {description && (
        <p className="wp-pattern-component-name__description">
          {description}
        </p>
      )}
    </div>
  );
}
```

### Step 2: Create the CSS File

**File:** `/src/styles/{category}/{component-name}.css`

```css
/**
 * ComponentName - WordPress Pattern Component
 * 
 * BEM Structure: .wp-pattern-component-name__*
 * 
 * Handles light/dark mode using CSS variables aligned with WordPress theme.json.
 * NO dark: Tailwind classes - uses .dark selector instead.
 * 
 * All colors, typography, spacing, borders, and radius values use CSS variables
 * from theme-light.css and theme-dark.css for complete design system compliance.
 * 
 * @version 1.0
 * @see /src/styles/theme-light.css
 * @see /src/styles/theme-dark.css
 */

/* ============================================
   BASE COMPONENT
   ============================================ */

.wp-pattern-component-name {
  padding: var(--spacing-gap-md);
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: all 200ms ease;
}

.wp-pattern-component-name:hover {
  border-color: var(--primary);
  box-shadow: var(--elevation-sm);
}

/* ============================================
   TITLE
   ============================================ */

.wp-pattern-component-name__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--card-foreground);
  margin-bottom: 0.5rem;
}

/* ============================================
   DESCRIPTION
   ============================================ */

.wp-pattern-component-name__description {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-normal);
  color: var(--muted-foreground);
  line-height: var(--leading-normal);
}

/* ============================================
   VARIANTS
   ============================================ */

/* Primary Variant */
.wp-pattern-component-name--primary {
  background-color: var(--primary);
  border-color: var(--primary);
}

.wp-pattern-component-name--primary .wp-pattern-component-name__title {
  color: var(--primary-foreground);
}

.wp-pattern-component-name--primary .wp-pattern-component-name__description {
  color: rgba(255, 255, 255, 0.9); /* Light mode primary foreground 90% */
}

.dark .wp-pattern-component-name--primary .wp-pattern-component-name__description {
  color: rgba(26, 26, 26, 0.9); /* Dark mode primary foreground 90% */
}

/* Secondary Variant */
.wp-pattern-component-name--secondary {
  background-color: var(--secondary);
  border-color: var(--secondary);
}

.wp-pattern-component-name--secondary .wp-pattern-component-name__title {
  color: var(--secondary-foreground);
}

.wp-pattern-component-name--secondary .wp-pattern-component-name__description {
  color: var(--secondary-foreground);
  opacity: 0.9;
}

/* ============================================
   DARK MODE OVERRIDES
   ============================================ */

.dark .wp-pattern-component-name {
  /* Dark mode specific adjustments if needed */
  /* Most colors auto-switch via CSS variables */
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
  .wp-pattern-component-name {
    padding: var(--spacing-gap-sm);
  }
  
  .wp-pattern-component-name__title {
    font-size: var(--text-lg);
  }
}
```

### Step 3: Import CSS in global.css

**File:** `/src/styles/global.css`

```css
/* Add to appropriate section */
@import './{category}/{component-name}.css';
```

---

## 🎨 Using Design System Tokens

### Colors

**Available via CSS Variables:**

```css
/* Primary Colors */
background-color: var(--primary);
color: var(--primary-foreground);

background-color: var(--secondary);
color: var(--secondary-foreground);

background-color: var(--accent);
color: var(--accent-foreground);

/* Backgrounds */
background-color: var(--background);
background-color: var(--card);
background-color: var(--muted);

/* Text Colors */
color: var(--foreground);
color: var(--muted-foreground);
color: var(--card-foreground);

/* Borders */
border-color: var(--border);
outline-color: var(--ring);

/* Semantic */
background-color: var(--success);
background-color: var(--warning);
background-color: var(--destructive);
background-color: var(--info);
```

**Via Tailwind Utilities** (auto-mapped to CSS variables):

```tsx
<div className="bg-card text-card-foreground border border-border">
  {/* Automatically uses var(--card), var(--card-foreground), var(--border) */}
</div>
```

### Typography

**Font Families** (ONLY these 3 allowed):

```css
/* Serif - For headings */
font-family: var(--font-family-lora);

/* Sans-serif - For body text */
font-family: var(--font-family-noto-sans);

/* Monospace - For code */
font-family: var(--font-family-mono);
```

**Via Tailwind:**

```tsx
<h1 className="font-serif">{/* Uses Lora */}</h1>
<p className="font-sans">{/* Uses Noto Sans */}</p>
<code className="font-mono">{/* Uses Courier New */}</code>
```

**Font Sizes** (fluid, responsive):

```css
font-size: var(--text-xs);      /* 12px */
font-size: var(--text-sm);      /* 14px */
font-size: var(--text-base);    /* 16px */
font-size: var(--text-lg);      /* 18px */
font-size: var(--text-xl);      /* 20px */
font-size: var(--text-2xl);     /* 24px */
font-size: var(--text-3xl);     /* 30px */
font-size: var(--text-4xl);     /* 36px */
font-size: var(--text-5xl);     /* 48px */
font-size: var(--text-6xl);     /* 60px */
```

**Via Tailwind:**

```tsx
<p className="text-sm">{/* 14px */}</p>
<h2 className="text-4xl">{/* 36px */}</h2>
```

**Font Weights:**

```css
font-weight: var(--font-weight-normal);    /* 400 */
font-weight: var(--font-weight-medium);    /* 500 */
font-weight: var(--font-weight-semibold);  /* 600 */
font-weight: var(--font-weight-bold);      /* 700 */
```

**Via Tailwind:**

```tsx
<p className="font-normal">{/* 400 */}</p>
<p className="font-medium">{/* 500 */}</p>
<p className="font-semibold">{/* 600 */}</p>
<p className="font-bold">{/* 700 */}</p>
```

### Spacing

**Section Spacing** (for major layout sections):

```css
padding-top: var(--spacing-section-sm);    /* Fluid 2rem-3rem */
padding-top: var(--spacing-section-md);    /* Fluid 3rem-5rem */
padding-top: var(--spacing-section-lg);    /* Fluid 4rem-7rem */
```

**Gap Spacing** (for element spacing):

```css
gap: var(--spacing-gap-sm);    /* Fluid 0.75rem-1rem */
gap: var(--spacing-gap-md);    /* Fluid 1rem-1.5rem */
gap: var(--spacing-gap-lg);    /* Fluid 1.5rem-2rem */
```

**Container Padding:**

```css
padding-left: var(--spacing-container-sm);    /* Fluid 1rem-1.5rem */
padding-right: var(--spacing-container-sm);
```

**Via Tailwind** (fixed 4px scale, for layout precision):

```tsx
<div className="p-4 gap-6 mb-12">
  {/* padding: 16px, gap: 24px, margin-bottom: 48px */}
</div>
```

### Border Radius

```css
border-radius: var(--radius-sm);    /* calc(var(--radius) - 2px) */
border-radius: var(--radius-md);    /* var(--radius) */
border-radius: var(--radius-lg);    /* calc(var(--radius) + 2px) */
border-radius: var(--radius-xl);    /* calc(var(--radius) + 4px) */
border-radius: var(--radius-full);  /* 9999px (pill shape) */
```

**Via Tailwind:**

```tsx
<div className="rounded-sm">{/* Small radius */}</div>
<div className="rounded-lg">{/* Large radius */}</div>
<div className="rounded-full">{/* Pill/circle */}</div>
```

### Shadows

```css
box-shadow: var(--elevation-sm);    /* Subtle shadow */
box-shadow: var(--elevation-md);    /* Medium shadow */
box-shadow: var(--elevation-lg);    /* Large shadow */
```

**Via Tailwind:**

```tsx
<div className="shadow-sm">{/* Uses var(--elevation-sm) */}</div>
```

---

## 🌗 Dark Mode Support

### Method 1: CSS with .dark Selector (Recommended for custom components)

```css
/* Light mode (default) */
.wp-pattern-my-component {
  background-color: var(--card);
  color: var(--card-foreground);
}

/* Dark mode override */
.dark .wp-pattern-my-component {
  /* Usually not needed - CSS variables auto-switch */
  /* Only add if you need specific dark mode adjustments */
}
```

### Method 2: Tailwind Utilities (Auto-mapped to CSS variables)

```tsx
<div className="bg-card text-card-foreground border border-border">
  {/* Automatically uses correct light/dark values via CSS variables */}
</div>
```

**❌ NEVER USE:**

```tsx
<div className="bg-white dark:bg-slate-800">
  {/* ❌ Hardcoded colors, bypasses design system */}
</div>
```

**✅ ALWAYS USE:**

```tsx
<div className="bg-card">
  {/* ✅ Uses var(--card) which auto-switches light/dark */}
</div>
```

---

## 📦 Complete Example: Feature Card Component

### React Component

**File:** `/src/app/components/patterns/FeatureCard.tsx`

```tsx
/**
 * Feature Card Component
 * 
 * Displays a feature with icon, title, and description.
 * 
 * @see /src/styles/patterns/feature-card.css
 */

import { cn } from "../../lib/utils";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "default" | "primary" | "accent";
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  variant = "default",
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "wp-pattern-feature-card",
        `wp-pattern-feature-card--${variant}`,
        className
      )}
    >
      <div className="wp-pattern-feature-card__icon-wrapper">
        <Icon className="wp-pattern-feature-card__icon" />
      </div>
      <h3 className="wp-pattern-feature-card__title">{title}</h3>
      <p className="wp-pattern-feature-card__description">{description}</p>
    </div>
  );
}
```

### CSS Styles

**File:** `/src/styles/patterns/feature-card.css`

```css
/**
 * Feature Card - WordPress Pattern Component
 * BEM: .wp-pattern-feature-card__*
 */

/* Base Card */
.wp-pattern-feature-card {
  padding: 1.5rem;
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--elevation-sm);
  transition: all 200ms ease;
}

.wp-pattern-feature-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

/* Icon Wrapper */
.wp-pattern-feature-card__icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  margin-bottom: 1rem;
  background-color: rgba(74, 115, 17, 0.1); /* primary with 10% opacity */
  border-radius: var(--radius-lg);
}

.dark .wp-pattern-feature-card__icon-wrapper {
  background-color: rgba(144, 186, 72, 0.1); /* dark mode primary 10% */
}

/* Icon */
.wp-pattern-feature-card__icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--primary);
}

/* Title */
.wp-pattern-feature-card__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--card-foreground);
  margin-bottom: 0.5rem;
}

/* Description */
.wp-pattern-feature-card__description {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-normal);
  color: var(--muted-foreground);
  line-height: var(--leading-normal);
}

/* Primary Variant */
.wp-pattern-feature-card--primary {
  background-color: var(--primary);
  border-color: var(--primary);
}

.wp-pattern-feature-card--primary .wp-pattern-feature-card__icon-wrapper {
  background-color: rgba(255, 255, 255, 0.2);
}

.dark .wp-pattern-feature-card--primary .wp-pattern-feature-card__icon-wrapper {
  background-color: rgba(0, 0, 0, 0.2);
}

.wp-pattern-feature-card--primary .wp-pattern-feature-card__icon,
.wp-pattern-feature-card--primary .wp-pattern-feature-card__title,
.wp-pattern-feature-card--primary .wp-pattern-feature-card__description {
  color: var(--primary-foreground);
}

/* Accent Variant */
.wp-pattern-feature-card--accent {
  background-color: var(--accent);
  border-color: var(--accent);
}

.wp-pattern-feature-card--accent .wp-pattern-feature-card__icon-wrapper {
  background-color: rgba(255, 255, 255, 0.2);
}

.dark .wp-pattern-feature-card--accent .wp-pattern-feature-card__icon-wrapper {
  background-color: rgba(0, 0, 0, 0.2);
}

.wp-pattern-feature-card--accent .wp-pattern-feature-card__icon,
.wp-pattern-feature-card--accent .wp-pattern-feature-card__title,
.wp-pattern-feature-card--accent .wp-pattern-feature-card__description {
  color: var(--accent-foreground);
}

/* Responsive */
@media (max-width: 768px) {
  .wp-pattern-feature-card {
    padding: 1rem;
  }
  
  .wp-pattern-feature-card__title {
    font-size: var(--text-lg);
  }
}
```

### Usage Example

```tsx
import { Zap, Shield, Heart } from "lucide-react";
import { FeatureCard } from "../components/patterns/FeatureCard";

function FeaturesSection() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={Zap}
            title="Fast Performance"
            description="Lightning-fast load times and smooth interactions."
          />
          <FeatureCard
            icon={Shield}
            title="Secure & Reliable"
            description="Built with security best practices and tested thoroughly."
            variant="primary"
          />
          <FeatureCard
            icon={Heart}
            title="User Friendly"
            description="Intuitive interface designed for excellent user experience."
          />
        </div>
      </Container>
    </section>
  );
}
```

---

## 🎯 Checklist for New Components

Before submitting a new component, verify:

- [ ] **All colors use CSS variables** (no hardcoded colors)
- [ ] **Typography uses ONLY defined fonts** (Lora, Noto Sans, Courier New)
- [ ] **No inline styles** (all styling in external CSS or Tailwind utilities)
- [ ] **No `dark:` classes** (dark mode via CSS `.dark` selector)
- [ ] **BEM naming convention** followed (`.wp-{category}-{component}__element--modifier`)
- [ ] **CSS file created** in appropriate folder
- [ ] **CSS imported** in global.css
- [ ] **Tested in light mode** (verify colors, typography, spacing)
- [ ] **Tested in dark mode** (verify auto-switching works)
- [ ] **Responsive design** (test on mobile, tablet, desktop)
- [ ] **Accessible** (keyboard navigation, ARIA labels, color contrast)

---

## 📚 Reference Files

**Theme Files** (User-customizable):
- `/src/styles/theme-light.css` - Light mode colors
- `/src/styles/theme-dark.css` - Dark mode colors
- `/src/styles/theme.css` - Typography, spacing, Tailwind integration

**Component Examples:**
- `/src/app/components/common/Logo.tsx` - Simple component
- `/src/app/components/common/TemplateBrowser.tsx` - Complex component
- `/src/app/components/blocks/ui/input.tsx` - Form component

**CSS Examples:**
- `/src/styles/common/logo.css` - Simple component CSS
- `/src/styles/common/template-browser.css` - Complex component CSS
- `/src/styles/blocks/ui-components.css` - Form components CSS

**Guidelines:**
- `/guidelines/Guidelines.md` - Complete guidelines
- `/guidelines/design-tokens/colors.md` - Color tokens reference
- `/guidelines/design-tokens/typography.md` - Typography reference
- `/guidelines/design-tokens/spacing.md` - Spacing reference

---

## 🚀 Quick Start

1. **Copy the component template** from this guide
2. **Replace placeholder names** with your component name
3. **Add your component logic** using CSS variable classes
4. **Create CSS file** with BEM classes
5. **Import CSS** in global.css
6. **Test in both modes** (light and dark)
7. **Verify checklist** above

**Result:** A fully customizable component that users can style by editing CSS files! 🎉
