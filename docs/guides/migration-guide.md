# Component Migration Guide

**Purpose:** Step-by-step guide for migrating non-compliant components to design system standards

**Date:** December 28, 2024 (Archived: February 25, 2026)  
**Status:** ⚠️ Some automation scripts referenced may not exist

---

## ⚠️ NOTE

This guide references some automation scripts that may not be currently available:
- `npm run validate:tokens`
- `npm run fix:tokens`

The manual migration patterns and checklists are still valid. Use `/scripts/design-system-verify.sh` for validation.

---

## 🎯 Overview

This guide helps you migrate existing components from **non-compliant** to **compliant** with the design system.

**When to use this guide:**
- Converting legacy components
- Fixing compliance violations
- Refactoring existing code
- Upgrading third-party components

**Expected outcome:** 95%+ compliance score after migration

---

## 🔍 Pre-Migration Checklist

Before migrating, assess your component:

1. Review component code for violations
2. Note violation types and counts
3. Plan manual fixes
4. Check references in guidelines

---

## 📋 Migration Steps

### Step 1: Backup Original Component

```bash
# Create a backup (in case you need to reference it)
cp src/app/components/MyComponent.tsx src/app/components/MyComponent.backup.tsx
```

**Important:** Don't commit backup files. They're for reference only.

---

### Step 2: Fix Hardcoded Colors

**❌ Before (Non-compliant):**
```tsx
<div style={{ background: '#4a7311', color: '#ffffff' }}>
  Content
</div>
```

**✅ After (Compliant):**
```tsx
<div className="bg-primary text-primary-foreground">
  Content
</div>
```

**Common Replacements:**

| Hardcoded | Semantic Token |
|-----------|----------------|
| `#4a7311` | `bg-primary text-primary-foreground` |
| `#6ea532` | `bg-primary text-primary-foreground` |
| `#ffffff` | `bg-background text-foreground` |
| `#f5f5f5` | `bg-muted text-muted-foreground` |
| `#1a1a1a` | `bg-foreground text-background` |
| `#e5e5e5` | `border-border` |

---

### Step 3: Fix Typography Violations

**❌ Before (Non-compliant):**
```tsx
<h2 className="text-2xl font-bold text-gray-900">
  Section Title
</h2>
```

**✅ After (Compliant):**
```tsx
<h2>Section Title</h2>
```

**Why?** Semantic HTML gets sizing from `/src/styles/global.css` automatically:
- H2 → Uses CSS variable sizing
- Font: Lora (serif) or Noto Sans (sans-serif)
- Weight: Defined in CSS variables
- Dark mode compatible

**Exception:** When you need to deviate from defaults:
```tsx
{/* Override with comment explaining why */}
<h2 className="text-lg"> {/* Intentionally smaller for compact layout */}
  Compact Title
</h2>
```

**Common Typography Fixes:**

| Element | ❌ Before | ✅ After |
|---------|-----------|----------|
| H1 | `<h1 className="text-4xl font-bold">` | `<h1>` |
| H2 | `<h2 className="text-2xl font-semibold">` | `<h2>` |
| H3 | `<h3 className="text-xl font-medium">` | `<h3>` |
| P | `<p className="text-base text-gray-600">` | `<p className="text-muted-foreground">` |
| Label | `<label className="text-sm font-medium">` | `<label>` |

---

### Step 4: Fix Spacing Violations

**❌ Before (Non-compliant):**
```tsx
<div style={{ padding: '24px', margin: '16px 0' }}>
  Content
</div>
```

**✅ After (Compliant):**
```tsx
<div className="p-6 my-4">
  Content
</div>
```

**Spacing Conversion Table:**

| Pixels | Tailwind | Use Case |
|--------|----------|----------|
| 4px | `1` | Extra small gaps |
| 8px | `2` | Small gaps |
| 12px | `3` | Medium-small gaps |
| 16px | `4` | Medium gaps |
| 24px | `6` | Large gaps |
| 32px | `8` | Extra large gaps |
| 48px | `12` | Section spacing |
| 64px | `16` | Large section spacing |

---

### Step 5: Fix Accessibility Violations

#### Missing Alt Text

**❌ Before:**
```tsx
<img src="/tour.jpg" />
```

**✅ After:**
```tsx
<img src="/tour.jpg" alt="Adventure tour in Iceland with mountain scenery" />
```

**Guidelines:**
- Describe what's in the image
- Be specific (not just "tour image")
- Keep under 125 characters
- For decorative images: `alt=""`

---

#### Missing ARIA Labels

**❌ Before:**
```tsx
<button onClick={handleClose}>
  <X />  {/* Icon only */}
</button>
```

**✅ After:**
```tsx
<button onClick={handleClose} aria-label="Close dialog">
  <X />
</button>
```

**When to use:**
- Icon-only buttons
- Complex interactive elements
- Screen reader context needed

---

#### Missing Focus Indicators

**❌ Before:**
```tsx
<a href="/tours" className="text-primary hover:underline">
  View Tours
</a>
```

**✅ After:**
```tsx
<a 
  href="/tours" 
  className="text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
>
  View Tours
</a>
```

---

### Step 6: Fix Semantic HTML Violations

**❌ Before:**
```tsx
<div onClick={handleClick} className="cursor-pointer">
  Click me
</div>
```

**✅ After:**
```tsx
<button onClick={handleClick}>
  Click me
</button>
```

**Common Fixes:**

| ❌ Wrong | ✅ Right | Reason |
|---------|---------|---------|
| `<div onClick>` | `<button>` | Interactive element |
| `<span onClick>` | `<button>` | Interactive element |
| `<div>` wrapper | `<section>` | Semantic container |
| `<div>` for text | `<p>` | Text content |
| `<span>` for title | `<h2>` | Section heading |

---

## 🔄 Complete Migration Example

### Before: Non-Compliant Component

```tsx
export function TourCard({ tour }) {
  return (
    <div 
      style={{ 
        background: '#ffffff',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #e5e5e5'
      }}
      onClick={() => window.location.href = `/tours/${tour.slug}`}
    >
      <img src={tour.image} />
      
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
        {tour.name}
      </div>
      
      <div style={{ fontSize: '14px', color: '#666666', marginTop: '8px' }}>
        {tour.excerpt}
      </div>
      
      <div 
        style={{ 
          background: '#4a7311',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '6px',
          marginTop: '16px',
          cursor: 'pointer'
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleBooking(tour.id);
        }}
      >
        Book Now
      </div>
    </div>
  );
}
```

**Violations:**
- ❌ Inline styles with hardcoded colors
- ❌ Inline spacing (24px, 8px, etc.)
- ❌ Text size/weight in inline styles
- ❌ Missing alt text
- ❌ Div instead of button
- ❌ No semantic HTML
- ❌ No focus indicators
- ❌ No TypeScript types

**Compliance Score:** ~30%

---

### After: Compliant Component

```tsx
/**
 * TourCard component.
 * 
 * @module TourCard
 * @category components
 */

import { cn } from "../../lib/utils";
import { Tour } from "../../data/types";
import { Button } from "../ui/button";

interface TourCardProps {
  /** Tour data */
  tour: Tour;
  /** Optional CSS class name */
  className?: string;
  /** Booking handler */
  onBook?: (tourId: string) => void;
}

/**
 * Tour card component for displaying tour information.
 * Uses CSS variables from /src/styles/global.css for all styling.
 * 
 * @component
 * @category components
 */
export function TourCard({ tour, className, onBook }: TourCardProps) {
  return (
    <article 
      className={cn(
        // Design tokens - colors (from global.css)
        "bg-card text-card-foreground",
        // Design tokens - spacing
        "p-6",
        // Design tokens - borders & radius
        "rounded-lg border border-border",
        // Design tokens - shadows
        "shadow-sm",
        // Interactive states
        "hover:shadow-md transition-shadow",
        // Custom classes
        className
      )}
    >
      {/* Image with proper alt text */}
      <img 
        src={tour.image} 
        alt={`${tour.name} - ${tour.destination}`}
        className="w-full h-48 object-cover rounded-lg"
      />
      
      {/* Semantic heading - gets styling from global.css */}
      <h3 className="mt-4">{tour.name}</h3>
      
      {/* Description with semantic color */}
      <p className="text-muted-foreground mt-2">
        {tour.excerpt}
      </p>
      
      {/* Semantic button with design tokens */}
      <Button
        variant="default"
        className="mt-4 w-full"
        onClick={() => onBook?.(tour.id)}
      >
        Book Now
      </Button>
    </article>
  );
}
```

**Improvements:**
- ✅ Design token colors from `/src/styles/global.css`
- ✅ Tailwind spacing (`p-6`, `mt-4`)
- ✅ Semantic HTML (`<article>`, `<h3>`, `<p>`)
- ✅ Proper alt text
- ✅ TypeScript types
- ✅ Semantic button component
- ✅ Focus indicators (from Button component)
- ✅ JSDoc documentation
- ✅ Dark mode compatible via CSS variables

**Compliance Score:** **98%** ✅

---

## 📊 Migration Checklist

Use this checklist for each component:

### Colors
- [ ] Removed all hardcoded hex colors
- [ ] Removed all RGB/RGBA colors
- [ ] Using semantic color tokens from `/src/styles/global.css`
- [ ] Colors work in both light and dark modes

### Typography
- [ ] Removed text size classes from semantic HTML
- [ ] Using `<h1>`, `<h2>`, `<h3>` without size overrides
- [ ] Using `<p>` for body text
- [ ] Using `<label>` for form labels
- [ ] Only fonts defined in CSS variables used

### Spacing
- [ ] Removed all inline padding/margin styles
- [ ] Using Tailwind spacing classes (`p-6`, `mb-4`, `gap-4`)
- [ ] Using fluid spacing for sections when appropriate

### Accessibility
- [ ] All images have descriptive alt text
- [ ] Icon-only buttons have aria-label
- [ ] All interactive elements have focus indicators
- [ ] Keyboard accessible (Tab, Enter work)
- [ ] Touch targets are ≥ 44px

### Semantic HTML
- [ ] Using `<button>` for buttons (not `<div onClick>`)
- [ ] Using `<a>` for links
- [ ] Using `<section>`, `<article>`, `<nav>` for structure
- [ ] Using proper heading hierarchy (H1 → H2 → H3)

### TypeScript
- [ ] Component has proper TypeScript types
- [ ] Props interface defined
- [ ] Types imported from `types.ts`

### Documentation
- [ ] Component has JSDoc comments
- [ ] Props documented
- [ ] Usage examples provided

---

## 💡 Common Migration Patterns

### Pattern 1: Card Component

```tsx
// Before
<div style={{ background: '#fff', padding: '20px', border: '1px solid #ccc' }}>

// After - Uses CSS variables from global.css
<div className="bg-card p-6 border border-border rounded-lg">
```

---

### Pattern 2: Button

```tsx
// Before
<div 
  style={{ background: '#4a7311', color: '#fff', padding: '12px 24px' }}
  onClick={handleClick}
>

// After - Uses CSS variables
<button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg">
```

---

### Pattern 3: Section

```tsx
// Before
<div style={{ padding: '60px 0', background: '#f5f5f5' }}>

// After - Uses CSS variables
<section className="py-section-md bg-muted">
```

---

### Pattern 4: Heading

```tsx
// Before
<h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a' }}>

// After - Gets styling from global.css automatically
<h2>
```

---

## ✅ Definition of Done

A component is "migrated" when:

- [ ] Compliance score ≥ 95%
- [ ] All tests passing
- [ ] Works in light and dark mode
- [ ] Keyboard accessible
- [ ] TypeScript types complete
- [ ] Documentation added
- [ ] Code reviewed
- [ ] Committed to repository

---

## 📚 Additional Resources

- **Design System:** `/src/styles/global.css` - All CSS variables
- **Guidelines:** `/guidelines/` folder
- **Component Templates:** `/docs/guides/component-templates.md` (if available)
- **Verification Script:** `/scripts/design-system-verify.sh`

---

**Last Updated:** December 28, 2024  
**Archived:** February 25, 2026  
**Version:** 1.0 (Archived)  
**Note:** References to automation scripts may be outdated. Manual patterns are still valid.
