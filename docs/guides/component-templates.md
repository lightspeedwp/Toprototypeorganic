# Component Templates Guide

**Purpose:** Ready-to-use component templates that follow design system compliance

**Date:** December 28, 2024 (Archived: February 25, 2026)  
**Note:** References updated to use `/src/styles/global.css` for all CSS variables

---

## 🎯 Overview

This guide provides **copy-paste templates** for common component patterns. All templates use CSS variables from `/src/styles/global.css` and follow accessibility best practices.

**Use these templates when:**
- Creating new components
- Refactoring existing components
- Learning design system patterns
- Ensuring consistency

**IMPORTANT:** All styling must use CSS variables from `/src/styles/global.css`. No hardcoded colors, fonts, or spacing values.

---

## 🎨 Pattern Components

### Hero Section

**Use for:** Page headers, landing sections, feature highlights

```tsx
/**
 * Hero pattern component.
 * Uses CSS variables from /src/styles/global.css
 * 
 * @module Hero
 * @category patterns
 */

import { cn } from "../../lib/utils";

interface HeroProps {
  /** Optional CSS class name */
  className?: string;
  /** Hero title */
  title: string;
  /** Hero description */
  description?: string;
  /** Call-to-action buttons */
  actions?: React.ReactNode;
  /** Background image URL */
  backgroundImage?: string;
}

/**
 * Hero component for page headers.
 * All styling uses CSS variables for design system compliance.
 * 
 * @component
 * @category patterns
 */
export function Hero({ 
  className, 
  title, 
  description, 
  actions,
  backgroundImage 
}: HeroProps) {
  return (
    <section 
      className={cn(
        "relative",
        "bg-gradient-to-b from-muted/50 to-background",
        "py-section-lg",
        className
      )}
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {/* Semantic heading - gets styling from global.css */}
          <h1>{title}</h1>
          
          {description && (
            <p className="text-muted-foreground mt-4">
              {description}
            </p>
          )}
          
          {actions && (
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

**Usage:**
```tsx
<Hero
  title="Welcome to Our Tour"
  description="Explore amazing destinations around the world"
  actions={
    <>
      <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg">
        Get Started
      </button>
      <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg">
        Learn More
      </button>
    </>
  }
/>
```

---

### Card Grid

**Use for:** Tour listings, destination grids, blog posts, feature cards

```tsx
/**
 * CardGrid pattern component.
 * 
 * @module CardGrid
 * @category patterns
 */

import { cn } from "../../lib/utils";

interface CardGridProps {
  /** Optional CSS class name */
  className?: string;
  /** Grid items */
  children: React.ReactNode;
  /** Number of columns at each breakpoint */
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

/**
 * CardGrid component for displaying cards in a responsive grid.
 * 
 * @component
 * @category patterns
 */
export function CardGrid({ 
  className, 
  children,
  columns = { sm: 1, md: 2, lg: 3 }
}: CardGridProps) {
  return (
    <div 
      className={cn(
        "grid gap-6",
        `grid-cols-${columns.sm || 1}`,
        columns.md && `md:grid-cols-${columns.md}`,
        columns.lg && `lg:grid-cols-${columns.lg}`,
        className
      )}
    >
      {children}
    </div>
  );
}
```

**Usage:**
```tsx
<CardGrid columns={{ sm: 1, md: 2, lg: 3 }}>
  <TourCard tour={tour1} />
  <TourCard tour={tour2} />
  <TourCard tour={tour3} />
</CardGrid>
```

---

### Card

**Use for:** Tour cards, destination cards, blog post cards

```tsx
/**
 * Card component.
 * Uses CSS variables from /src/styles/global.css
 * 
 * @module Card
 * @category common
 */

import { cn } from "../../lib/utils";

interface CardProps {
  /** Optional CSS class name */
  className?: string;
  /** Card content */
  children: React.ReactNode;
  /** Make card interactive (clickable) */
  interactive?: boolean;
  /** Click handler for interactive cards */
  onClick?: () => void;
}

/**
 * Card component for content containers.
 * 
 * @component
 * @category common
 */
export function Card({ 
  className, 
  children, 
  interactive,
  onClick 
}: CardProps) {
  return (
    <div
      className={cn(
        // Design tokens from global.css
        "bg-card text-card-foreground",
        "p-6 rounded-lg",
        "border border-border",
        "shadow-sm",
        // Interactive states
        interactive && [
          "cursor-pointer",
          "hover:shadow-md hover:border-primary/50",
          "transition-all",
          "focus-visible:ring-2 focus-visible:ring-ring",
        ],
        className
      )}
      onClick={interactive ? onClick : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "button" : undefined}
    >
      {children}
    </div>
  );
}
```

**Usage:**
```tsx
<Card interactive onClick={() => console.log('clicked')}>
  <h3>Card Title</h3>
  <p className="text-muted-foreground mt-2">
    Card description
  </p>
</Card>
```

---

### Call-to-Action (CTA)

**Use for:** Newsletter signups, booking prompts, contact forms

```tsx
/**
 * CTA pattern component.
 * 
 * @module CTA
 * @category patterns
 */

import { cn } from "../../lib/utils";

interface CTAProps {
  /** Optional CSS class name */
  className?: string;
  /** CTA title */
  title: string;
  /** CTA description */
  description?: string;
  /** Primary action button */
  primaryAction?: React.ReactNode;
  /** Secondary action button */
  secondaryAction?: React.ReactNode;
  /** Background variant */
  variant?: 'default' | 'accent' | 'primary';
}

/**
 * CTA component for call-to-action sections.
 * 
 * @component
 * @category patterns
 */
export function CTA({ 
  className, 
  title, 
  description,
  primaryAction,
  secondaryAction,
  variant = 'default'
}: CTAProps) {
  const backgrounds = {
    default: 'bg-background text-foreground',
    accent: 'bg-accent text-accent-foreground',
    primary: 'bg-primary text-primary-foreground',
  };

  return (
    <section 
      className={cn(
        backgrounds[variant],
        "py-section-md",
        className
      )}
    >
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2>{title}</h2>
          
          {description && (
            <p className={cn(
              "mt-4",
              variant === 'default' && "text-muted-foreground"
            )}>
              {description}
            </p>
          )}
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {primaryAction}
            {secondaryAction}
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Usage:**
```tsx
<CTA
  title="Ready to Book Your Adventure?"
  description="Join thousands of happy travelers"
  variant="accent"
  primaryAction={
    <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg">
      Book Now
    </button>
  }
  secondaryAction={
    <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg">
      Contact Us
    </button>
  }
/>
```

---

## 🧩 Common Components

### Button

**Use for:** Actions, links styled as buttons, form submissions

```tsx
/**
 * Button component.
 * 
 * @module Button
 * @category common
 */

import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Optional CSS class name */
  className?: string;
  /** Button content */
  children: React.ReactNode;
}

/**
 * Button component with design system variants.
 * All styling uses CSS variables from global.css.
 * 
 * @component
 * @category common
 */
export function Button({ 
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        // Base styles
        "rounded-lg",
        "transition-colors",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        // Variant styles
        variants[variant],
        // Size styles
        sizes[size],
        // Custom classes
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

---

## ✅ Template Checklist

Before using any template:

- [ ] Uses semantic HTML elements
- [ ] Uses CSS variables from `/src/styles/global.css` ONLY
- [ ] No hardcoded colors, fonts, or spacing
- [ ] No text size classes on semantic HTML
- [ ] Includes focus indicators
- [ ] Includes ARIA labels where needed
- [ ] Responsive by default
- [ ] Dark mode compatible via CSS variables

---

## 🎓 Best Practices

### DO ✅

1. **Use semantic HTML:**
   ```tsx
   <h2>Section Title</h2>  // ✅ Gets styling from global.css
   ```

2. **Use design tokens:**
   ```tsx
   className="bg-card text-card-foreground"  // ✅ Uses CSS variables
   ```

3. **Include accessibility:**
   ```tsx
   <button aria-label="Close" className="focus-visible:ring-2">
   ```

### DON'T ❌

1. **Don't use hardcoded colors:**
   ```tsx
   style={{ background: '#4a7311' }}  // ❌ Violates design system
   ```

2. **Don't use size classes on headings:**
   ```tsx
   <h2 className="text-2xl">Title</h2>  // ❌ Override global.css styling
   ```

3. **Don't use inline spacing:**
   ```tsx
   style={{ padding: '24px' }}  // ❌ Use Tailwind classes instead
   ```

---

## 📚 Additional Resources

- **CSS Variables:** `/src/styles/global.css` - All design tokens
- **Guidelines:** `/guidelines/` folder
- **Design Tokens:** `/guidelines/design-tokens/` folder
- **Verification:** `/scripts/design-system-verify.sh`

---

**Last Updated:** December 28, 2024  
**Archived:** February 25, 2026  
**Version:** 1.0 (Updated for global.css)  
**Note:** All styling must use CSS variables from `/src/styles/global.css`
