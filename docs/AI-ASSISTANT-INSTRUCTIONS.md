# 🤖 AI ASSISTANT INSTRUCTIONS

**Instructions for AI assistants generating UI code for this project**

**Last Updated:** February 24, 2026

---

## 🎯 **PRIMARY DIRECTIVE**

When generating ANY UI code for this project, you MUST strictly follow the WordPress BEM CSS design system using CSS variables ONLY.

---

## 🚨 **CRITICAL RULES - NO EXCEPTIONS**

### **1. CSS Variables Only**

❌ **NEVER generate code like this:**
```css
.component {
  background-color: #548235;
  color: white;
  font-family: "Arial", sans-serif;
  font-size: 24px;
  padding: 60px;
}
```

✅ **ALWAYS generate code like this:**
```css
.wp-pattern-component {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  font-family: var(--font-family-lora);
  font-size: var(--text-3xl);
  padding-top: var(--spacing-section-lg);
  padding-bottom: var(--spacing-section-lg);
}
```

---

### **2. Allowed Fonts Only**

**ONLY these 3 fonts are allowed:**

✅ **Lora** (serif) - `var(--font-family-lora)` - Headings, editorial
✅ **Noto Sans** (sans-serif) - `var(--font-family-noto-sans)` - Body, UI
✅ **Courier New** (monospace) - `var(--font-family-courier-new)` - Code

❌ **NEVER use:**
- Arial, Helvetica, Times New Roman, Georgia, Verdana, or any other font
- Font names without CSS variables

---

### **3. No Inline Styles**

❌ **NEVER generate:**
```tsx
<div style={{ backgroundColor: 'white', padding: '20px' }}>
```

✅ **ALWAYS generate:**
```tsx
<div className="wp-pattern-component">
```

---

### **4. No dark: Classes**

❌ **NEVER generate:**
```tsx
<div className="bg-white dark:bg-slate-800">
```

✅ **ALWAYS generate:**
```tsx
<div className="wp-pattern-component">  {/* CSS variables handle dark mode */}
```

---

### **5. BEM Naming Convention**

✅ **ALWAYS use WordPress BEM naming:**

```css
/* Template Parts */
.wp-part-header
.wp-part-header__nav
.wp-part-header__nav-item--open

/* Pattern Components */
.wp-pattern-hero
.wp-pattern-hero__title
.wp-pattern-hero--minimal

/* Card Components */
.wp-card-tour
.wp-card-tour__image
.wp-card-tour--featured
```

❌ **NEVER use generic names:**
```css
.button { }    /* ❌ Wrong */
.card { }      /* ❌ Wrong */
.hero { }      /* ❌ Wrong */
```

---

## 📚 **AVAILABLE CSS VARIABLES**

### **Colors:**

```css
/* Primary */
var(--color-primary)
var(--color-primary-foreground)

/* Secondary */
var(--color-secondary)
var(--color-secondary-foreground)

/* Accent */
var(--color-accent)
var(--color-accent-foreground)

/* Muted */
var(--color-muted)
var(--color-muted-foreground)

/* Card */
var(--color-card)
var(--color-card-foreground)

/* Background */
var(--color-background)
var(--color-foreground)

/* UI */
var(--color-border)
var(--color-ring)
var(--color-input)
```

### **Typography:**

```css
/* Fonts (ONLY 3 ALLOWED) */
var(--font-family-lora)
var(--font-family-noto-sans)
var(--font-family-courier-new)

/* Sizes */
var(--text-6xl)    /* 60px - H1 */
var(--text-4xl)    /* 36px - H2 */
var(--text-3xl)    /* 30px - H3 */
var(--text-2xl)    /* 24px - H4 */
var(--text-xl)     /* 20px - H5 */
var(--text-lg)     /* 18px - H6 */
var(--text-base)   /* 16px - Body */
var(--text-sm)     /* 14px - Small */

/* Weights */
var(--font-weight-bold)       /* 700 - H1 */
var(--font-weight-semibold)   /* 600 - H2, H3 */
var(--font-weight-medium)     /* 500 - H4-H6, buttons */
var(--font-weight-normal)     /* 400 - Body */
```

### **Spacing:**

```css
/* Section Spacing (fluid) */
var(--spacing-section-xl)   /* 96-160px */
var(--spacing-section-lg)   /* 64-96px */
var(--spacing-section-md)   /* 48-80px */
var(--spacing-section-sm)   /* 32-64px */

/* Gap Spacing (fluid) */
var(--spacing-gap-lg)       /* 32-48px */
var(--spacing-gap-md)       /* 24-40px */
var(--spacing-gap-sm)       /* 16-32px */
```

### **UI:**

```css
/* Radius */
var(--radius-sm)    /* 2px */
var(--radius-md)    /* 4px */
var(--radius-lg)    /* 6px */
var(--radius-xl)    /* 8px */
var(--radius-full)  /* Circle */

/* Shadows */
var(--elevation-sm)  /* Subtle */
var(--elevation-md)  /* Medium */
var(--elevation-lg)  /* Large */
```

**Complete list:** `/docs/CSS-VARIABLES.md`

---

## 🎯 **CODE GENERATION WORKFLOW**

### **When asked to create a component:**

**Step 1: Create CSS File**

File: `/src/styles/patterns/[component-name].css`

```css
/**
 * [ComponentName] Pattern - WordPress Block Pattern
 * 
 * BEM Structure: .wp-pattern-[component-name]__*
 */

/* Base Component */
.wp-pattern-[component-name] {
  background-color: var(--color-card);
  color: var(--color-card-foreground);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-section-md);
  gap: var(--spacing-gap-md);
}

/* Title Element */
.wp-pattern-[component-name]__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-foreground);
}

/* Body Element */
.wp-pattern-[component-name]__body {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-normal);
  color: var(--color-foreground);
}

/* Button Element */
.wp-pattern-[component-name]__button {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--color-primary);
  cursor: pointer;
}

.wp-pattern-[component-name]__button:hover {
  opacity: 0.9;
}

.wp-pattern-[component-name]__button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
```

**Step 2: Import CSS**

Add to `/src/styles/global.css`:

```css
@import './patterns/[component-name].css';
```

**Step 3: Create React Component**

File: `/src/app/components/patterns/[ComponentName].tsx`

```typescript
/**
 * [ComponentName] Pattern Component
 * 
 * WordPress Equivalent: patterns/[component-name].php
 */

import { cn } from "../../lib/utils";

export interface [ComponentName]Props {
  title: string;
  description?: string;
  variant?: "standard" | "highlighted";
  className?: string;
}

export function [ComponentName]({
  title,
  description,
  variant = "standard",
  className,
}: [ComponentName]Props) {
  return (
    <section
      className={cn(
        "wp-pattern-[component-name]",
        variant === "highlighted" && "wp-pattern-[component-name]--highlighted",
        className
      )}
    >
      <h2 className="wp-pattern-[component-name]__title">
        {title}
      </h2>
      
      {description && (
        <p className="wp-pattern-[component-name]__body">
          {description}
        </p>
      )}
    </section>
  );
}
```

---

## ✅ **VALIDATION CHECKLIST**

Before providing generated code, verify:

**CSS Variables:**
- [ ] All colors use `var(--color-*)`
- [ ] All fonts use `var(--font-family-*)`
- [ ] All font sizes use `var(--text-*)`
- [ ] All font weights use `var(--font-weight-*)`
- [ ] All spacing uses `var(--spacing-*)` or Tailwind scale
- [ ] All borders use `var(--color-border)`
- [ ] All radius uses `var(--radius-*)`
- [ ] All shadows use `var(--elevation-*)`

**Typography:**
- [ ] Headings use Lora (`var(--font-family-lora)`)
- [ ] Body text uses Noto Sans (`var(--font-family-noto-sans)`)
- [ ] Code uses Courier New (`var(--font-family-courier-new)`)
- [ ] NO other fonts used

**Code Quality:**
- [ ] NO inline styles
- [ ] NO hardcoded colors
- [ ] NO hardcoded fonts
- [ ] NO `dark:` classes
- [ ] BEM naming consistent
- [ ] Semantic HTML used

---

## 📝 **COMMON PATTERNS**

### **Button:**

```css
.wp-pattern-component__button {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--color-primary);
  cursor: pointer;
  transition: all 200ms ease;
}

.wp-pattern-component__button:hover {
  opacity: 0.9;
}

.wp-pattern-component__button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
```

### **Card:**

```css
.wp-card-component {
  background-color: var(--color-card);
  color: var(--color-card-foreground);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--elevation-sm);
  transition: all 200ms ease;
}

.wp-card-component:hover {
  box-shadow: var(--elevation-md);
}
```

### **Heading + Body:**

```css
.wp-pattern-component__heading {
  font-family: var(--font-family-lora);
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-foreground);
  margin-bottom: 0.5rem;
}

.wp-pattern-component__body {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-normal);
  color: var(--color-foreground);
  line-height: 1.5;
}
```

---

## 🚫 **WHAT NOT TO GENERATE**

### **NEVER generate:**

**1. Hardcoded Colors:**
```css
background-color: #ffffff;
color: black;
border: 1px solid #e2e8f0;
```

**2. Hardcoded Fonts:**
```css
font-family: "Arial", sans-serif;
font-family: "Helvetica", sans-serif;
```

**3. Hardcoded Sizes:**
```css
font-size: 24px;
padding: 60px;
```

**4. Inline Styles:**
```tsx
<div style={{ backgroundColor: 'white' }}>
```

**5. Dark Mode Classes:**
```tsx
<div className="bg-white dark:bg-slate-800">
```

**6. Generic Class Names:**
```css
.button { }
.card { }
.hero { }
```

---

## ✅ **WHAT TO GENERATE**

### **ALWAYS generate:**

**1. CSS Variables:**
```css
background-color: var(--color-primary);
color: var(--color-foreground);
border: 1px solid var(--color-border);
```

**2. Defined Fonts:**
```css
font-family: var(--font-family-lora);
font-family: var(--font-family-noto-sans);
```

**3. Variable Sizes:**
```css
font-size: var(--text-3xl);
padding-top: var(--spacing-section-lg);
```

**4. External CSS:**
```tsx
<div className="wp-pattern-component">
```

**5. BEM Classes:**
```css
.wp-pattern-hero
.wp-pattern-hero__title
.wp-pattern-hero--minimal
```

**6. Semantic HTML:**
```tsx
<h2>Title</h2>
<nav>Navigation</nav>
<article>Content</article>
```

---

## 📖 **REFERENCE DOCUMENTS**

**For AI Assistants to Reference:**

1. **Enforcement Guide:** `/docs/DESIGN-SYSTEM-ENFORCEMENT.md`
2. **Compliance Checklist:** `/docs/COMPLIANCE-CHECKLIST.md`
3. **CSS Variables:** `/docs/CSS-VARIABLES.md`
4. **Component Template:** `/docs/COMPONENT-TEMPLATE.md`
5. **Quick Start:** `/docs/QUICK-START.md`
6. **Style Guide:** `/docs/STYLE-GUIDE.md`

---

## 🎯 **SUMMARY FOR AI ASSISTANTS**

When generating code for this project:

1. ✅ **Use CSS variables for EVERYTHING**
2. ✅ **Use ONLY Lora, Noto Sans, Courier New fonts**
3. ✅ **Follow BEM naming: `.wp-part-*`, `.wp-pattern-*`, `.wp-card-*`**
4. ✅ **Create external CSS files, NOT inline styles**
5. ✅ **NO `dark:` classes - CSS variables handle dark mode**
6. ✅ **Use semantic HTML elements**

**When in doubt:**
- Check `/docs/CSS-VARIABLES.md` for available variables
- Follow patterns in `/docs/COMPONENT-TEMPLATE.md`
- Reference `/docs/DESIGN-SYSTEM-ENFORCEMENT.md`

---

## 🤖 **EXAMPLE CONVERSATION**

**User:** "Create a notification banner component"

**AI Assistant Response:**

"I'll create a notification banner component following the WordPress BEM CSS design system.

**Step 1: Create CSS file** (`/src/styles/patterns/notification-banner.css`):

```css
/**
 * Notification Banner Pattern - WordPress Block Pattern
 * 
 * BEM Structure: .wp-pattern-notification-banner__*
 */

.wp-pattern-notification-banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background-color: var(--color-accent);
  color: var(--color-accent-foreground);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.wp-pattern-notification-banner__icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  color: var(--color-primary);
}

.wp-pattern-notification-banner__message {
  flex: 1;
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-normal);
  color: var(--color-foreground);
}

.wp-pattern-notification-banner__close {
  flex-shrink: 0;
  padding: 0.25rem;
  background: none;
  border: none;
  color: var(--color-muted-foreground);
  cursor: pointer;
}

.wp-pattern-notification-banner__close:hover {
  color: var(--color-foreground);
}

.wp-pattern-notification-banner__close:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

**Step 2: Import in global.css:**

```css
@import './patterns/notification-banner.css';
```

**Step 3: Create React component** (`/src/app/components/patterns/NotificationBanner.tsx`):

```typescript
import { X, Info } from "lucide-react";
import { cn } from "../../lib/utils";

export interface NotificationBannerProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

export function NotificationBanner({
  message,
  onClose,
  className,
}: NotificationBannerProps) {
  return (
    <div className={cn("wp-pattern-notification-banner", className)}>
      <Info className="wp-pattern-notification-banner__icon" />
      <p className="wp-pattern-notification-banner__message">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="wp-pattern-notification-banner__close"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
```

**Usage:**

```tsx
<NotificationBanner
  message="Your changes have been saved successfully"
  onClose={() => console.log('Closed')}
/>
```

This component:
- ✅ Uses CSS variables for all colors, fonts, spacing
- ✅ Uses Noto Sans font for text
- ✅ Follows BEM naming (`.wp-pattern-notification-banner__*`)
- ✅ Uses external CSS file (no inline styles)
- ✅ Supports dark mode via CSS variables (no `dark:` classes)
- ✅ Uses semantic HTML
- ✅ Includes accessibility (ARIA label, focus states)
"

---

**This is the pattern ALL AI assistants should follow when generating code for this project.**

---

**Last Updated:** February 24, 2026  
**Version:** 1.0  
**Status:** ⚠️ **MANDATORY FOR ALL AI ASSISTANTS**
