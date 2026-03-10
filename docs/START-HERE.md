# ⚠️ STOP! READ THIS FIRST! ⚠️

## 🚨 MANDATORY: UI Generation Rules

**Before generating ANY React component or CSS, you MUST follow these rules.**

---

## ❌ PROHIBITED (NEVER DO THIS)

### **1. NO Hardcoded Colors**

```tsx
// ❌ WRONG - Hardcoded hex colors
<div style={{ backgroundColor: '#4a7311', color: 'white' }}>

// ❌ WRONG - Hardcoded RGB colors
<div style={{ backgroundColor: 'rgb(74, 115, 17)' }}>

// ❌ WRONG - Hardcoded color names
<div className="bg-white text-black">

// ❌ WRONG - Tailwind color classes
<button className="bg-green-600 text-white hover:bg-green-700">
```

### **2. NO Hardcoded Fonts**

```tsx
// ❌ WRONG - Hardcoded font families
<h1 style={{ fontFamily: 'Arial, sans-serif' }}>

// ❌ WRONG - Font families not in design system
<p style={{ fontFamily: 'Helvetica, Georgia, Times' }}>

// ❌ WRONG - Generic font utilities (unless they map to our fonts)
<div className="font-['Arial']">
```

### **3. NO Inline Styles** (except dynamic calculated values)

```tsx
// ❌ WRONG - Static inline styles
<div style={{ padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>

// ✅ OK - Dynamic calculated values only
<div style={{ width: `${dynamicWidth}px`, height: `${dynamicHeight}px` }}>
```

### **4. NO dark: Classes**

```tsx
// ❌ WRONG - Tailwind dark mode classes
<div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">

// ❌ WRONG - Any dark: prefix
<button className="bg-primary dark:bg-primary-dark">
```

### **5. NO Hardcoded Spacing**

```tsx
// ❌ WRONG - Hardcoded padding/margin values
<section style={{ padding: '64px 32px', marginBottom: '48px' }}>

// ❌ WRONG - Arbitrary Tailwind values
<div className="p-[64px] mb-[48px]">
```

---

## ✅ REQUIRED (ALWAYS DO THIS)

### **1. USE CSS Variables for Colors**

```tsx
// ✅ CORRECT - Tailwind classes that reference CSS variables
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">
<div className="bg-card text-card-foreground border border-border">

// ✅ CORRECT - In external CSS file
.my-component {
  background-color: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
}
```

**Available Color Variables:**
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--accent`, `--accent-foreground`
- `--muted`, `--muted-foreground`
- `--card`, `--card-foreground`
- `--success`, `--warning`, `--destructive`, `--info`
- `--border`, `--input`, `--ring`

### **2. USE Only These 3 Fonts**

```css
/* ✅ CORRECT - In external CSS file */
.heading {
  font-family: var(--font-family-lora);      /* Serif - for headings */
}

.body-text {
  font-family: var(--font-family-noto-sans); /* Sans - for body/UI */
}

.code {
  font-family: var(--font-family-mono);      /* Mono - for code */
}
```

```tsx
// ✅ CORRECT - Tailwind font classes
<h1 className="font-serif">  {/* → Lora */}
<p className="font-sans">    {/* → Noto Sans */}
<code className="font-mono"> {/* → Courier New */}
```

**ONLY these 5 fonts are allowed. No others.**

### **3. USE External CSS Files**

```tsx
// ✅ CORRECT - Component with className
export function MyComponent() {
  return (
    <div className="wp-pattern-mycomponent">
      <h2 className="wp-pattern-mycomponent__title">Title</h2>
      <p className="wp-pattern-mycomponent__text">Text</p>
    </div>
  );
}
```

```css
/* ✅ CORRECT - External CSS file: /src/styles/patterns/mycomponent.css */
.wp-pattern-mycomponent {
  padding: var(--spacing-section-md);
  background-color: var(--card);
  border-radius: var(--radius-lg);
  box-shadow: var(--elevation-sm);
}

.wp-pattern-mycomponent__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--primary);
}

.wp-pattern-mycomponent__text {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  color: var(--muted-foreground);
}
```

### **4. USE CSS Variables for Dark Mode**

```tsx
// ✅ CORRECT - Single set of classes, auto-switches
<div className="bg-background text-foreground">
<div className="bg-card border-border">
```

**NO dark: classes needed. CSS variables handle it automatically!**

### **5. USE CSS Variables for Spacing**

```css
/* ✅ CORRECT - Fluid responsive spacing */
.section {
  padding: var(--spacing-section-md);    /* 48-96px fluid */
  gap: var(--spacing-gap-lg);            /* 24-48px fluid */
  margin-bottom: var(--spacing-element-lg);
}
```

**Or use Tailwind spacing that scales:**
```tsx
<div className="p-6 gap-4 mb-12">  {/* OK - consistent scale */}
```

### **6. USE BEM Naming Convention**

```css
/* ✅ CORRECT - BEM naming */
.wp-pattern-notification { }              /* Block */
.wp-pattern-notification__title { }       /* Element */
.wp-pattern-notification__message { }     /* Element */
.wp-pattern-notification--success { }     /* Modifier */
.wp-pattern-notification--error { }       /* Modifier */
```

**Prefixes:**
- `.wp-pattern-*` - Pattern components
- `.wp-card-*` - Card components
- `.wp-section-*` - Section components
- `.wp-part-*` - Template parts

---

## 📋 Component Generation Workflow

**ALWAYS follow these steps:**

### **Step 1: Create React Component**

```tsx
// /src/app/components/patterns/MyComponent.tsx
import { cn } from "../../lib/utils";

interface MyComponentProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function MyComponent({ variant = "primary", children }: MyComponentProps) {
  return (
    <div className={cn("wp-pattern-mycomponent", `wp-pattern-mycomponent--${variant}`)}>
      <div className="wp-pattern-mycomponent__content">
        {children}
      </div>
    </div>
  );
}
```

**Checklist:**
- [ ] TypeScript interface for props
- [ ] No inline styles
- [ ] BEM class names
- [ ] Semantic HTML elements
- [ ] No hardcoded values

### **Step 2: Create External CSS File**

```css
/* /src/styles/patterns/mycomponent.css */

/**
 * MyComponent Styles
 * 
 * Design System Compliant:
 * ✅ All colors use CSS variables
 * ✅ All fonts use defined families
 * ✅ All spacing uses CSS variables
 * ✅ Automatic dark mode
 * ✅ BEM naming convention
 */

.wp-pattern-mycomponent {
  padding: var(--spacing-section-md);
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--elevation-sm);
}

.wp-pattern-mycomponent__content {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}

.wp-pattern-mycomponent--primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.wp-pattern-mycomponent--secondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}
```

**Checklist:**
- [ ] JSDoc comment at top
- [ ] All colors via `var(--*)`
- [ ] All fonts via `var(--font-family-*)`
- [ ] All spacing via `var(--spacing-*)`
- [ ] BEM naming
- [ ] No hardcoded values

### **Step 3: Import CSS in Index**

```css
/* /src/styles/index.css */
@import './patterns/mycomponent.css';
```

### **Step 4: Verify Compliance**

```bash
./scripts/verify-compliance.sh
```

**Must see:**
```
✅ Design System Compliance Check Complete
✅ All checks passed!
```

---

## 🎯 Quick Verification Checklist

**Before submitting ANY component, verify:**

- [ ] **No `#` in code** (hex colors)
- [ ] **No `rgb(` or `rgba(`** (hardcoded colors)
- [ ] **No `style={{`** (inline styles, except dynamic values)
- [ ] **No `dark:`** (dark mode classes)
- [ ] **No `font-family:`** except with CSS variables
- [ ] **No `Arial`, `Helvetica`, `Georgia`** (font names)
- [ ] **Has external CSS file** with BEM naming
- [ ] **CSS imported** in `/src/styles/index.css`
- [ ] **Uses only** Lora, Noto Sans, Courier New, Caveat, Shadows Into Light fonts
- [ ] **All colors** via CSS variables
- [ ] **All spacing** via CSS variables or Tailwind scale
- [ ] **Passes** `./scripts/verify-compliance.sh`

---

## 🎨 Available CSS Variables

### **Colors (26 variables)**
```css
var(--background)
var(--foreground)
var(--primary)
var(--primary-foreground)
var(--secondary)
var(--secondary-foreground)
var(--accent)
var(--accent-foreground)
var(--muted)
var(--muted-foreground)
var(--card)
var(--card-foreground)
var(--border)
var(--input)
var(--ring)
var(--success)
var(--success-foreground)
var(--warning)
var(--warning-foreground)
var(--destructive)
var(--destructive-foreground)
var(--info)
var(--info-foreground)
/* + sidebar, popover, chart colors */
```

### **Typography (30+ variables)**
```css
/* Font Families (ONLY THESE 3) */
var(--font-family-lora)       /* Serif - headings, labels */
var(--font-family-noto-sans)  /* Sans - body, UI */
var(--font-family-mono)       /* Mono - code */

/* Font Sizes (Fluid/Responsive) */
var(--text-6xl)   /* 48-72px - H1 */
var(--text-5xl)   /* 36-60px - Display */
var(--text-4xl)   /* 30-48px - H2 */
var(--text-3xl)   /* 24-36px - H3 */
var(--text-2xl)   /* 20-30px - H4 */
var(--text-xl)    /* 18-24px - H5 */
var(--text-lg)    /* 16-20px - H6 */
var(--text-base)  /* 16-18px - Body */
var(--text-sm)    /* 14-16px - Small */
var(--text-xs)    /* 12-14px - Tiny */

/* Font Weights */
var(--font-weight-light)      /* 300 */
var(--font-weight-normal)     /* 400 */
var(--font-weight-medium)     /* 500 */
var(--font-weight-semibold)   /* 600 */
var(--font-weight-bold)       /* 700 */

/* Line Heights */
var(--leading-tight)    /* 1.2 */
var(--leading-snug)     /* 1.375 */
var(--leading-normal)   /* 1.5 */
var(--leading-relaxed)  /* 1.625 */
var(--leading-loose)    /* 1.75 */

/* Letter Spacing */
var(--tracking-tighter)  /* -0.05em */
var(--tracking-tight)    /* -0.025em */
var(--tracking-normal)   /* 0em */
var(--tracking-wide)     /* 0.025em */
var(--tracking-wider)    /* 0.05em */
```

### **Spacing (12+ variables - Fluid/Responsive)**
```css
/* Section Spacing */
var(--spacing-section-sm)    /* 32-64px */
var(--spacing-section-md)    /* 48-96px */
var(--spacing-section-lg)    /* 64-128px */
var(--spacing-section-xl)    /* 80-160px */

/* Container Padding */
var(--spacing-container-sm)  /* 16-32px */
var(--spacing-container-md)  /* 24-48px */
var(--spacing-container-lg)  /* 32-64px */

/* Element Spacing */
var(--spacing-element-xs)    /* 8-16px */
var(--spacing-element-sm)    /* 12-24px */
var(--spacing-element-md)    /* 16-32px */
var(--spacing-element-lg)    /* 24-48px */

/* Gap Spacing */
var(--spacing-gap-xs)        /* 8-16px */
var(--spacing-gap-sm)        /* 12-24px */
var(--spacing-gap-md)        /* 16-32px */
var(--spacing-gap-lg)        /* 24-48px */
```

### **Border Radius (8 variables)**
```css
var(--radius-sm)     /* 2px */
var(--radius-md)     /* 4px */
var(--radius-lg)     /* 6px */
var(--radius-xl)     /* 8px */
var(--radius-2xl)    /* 12px */
var(--radius-3xl)    /* 16px */
var(--radius-full)   /* 9999px (circle) */
```

### **Shadows/Elevation (4 variables)**
```css
var(--elevation-sm)  /* Subtle shadow */
var(--elevation-md)  /* Medium shadow */
var(--elevation-lg)  /* Large shadow */
var(--elevation-xl)  /* Extra large shadow */
```

---

## 🎯 The Golden Rule

> **If a user wants to change any visual aspect of the site, they should be able to do it by editing a CSS variable in one of the 3 theme files:**
> 
> - `/src/styles/theme-light.css` (light mode colors)
> - `/src/styles/theme-dark.css` (dark mode colors)
> - `/src/styles/theme.css` (typography, spacing)

**If they can't → You've hardcoded something → Fix it!** ❌

**If they can → You've done it right!** ✅

---

## 📚 Documentation Resources

**MUST READ:**
- 📖 **[/docs/UI-GENERATION-RULES.md](/docs/UI-GENERATION-RULES.md)** - Complete rules guide
- 📖 **[/docs/QUICK-REFERENCE.md](/docs/QUICK-REFERENCE.md)** - One-page cheat sheet
- 📖 **[/docs/CSS-VARIABLES.md](/docs/CSS-VARIABLES.md)** - Variable reference

**Component Development:**
- 📖 **[/docs/COMPONENT-TEMPLATE.md](/docs/COMPONENT-TEMPLATE.md)** - Copy-paste template
- 📖 **[/docs/NEW-COMPONENT-GUIDE.md](/docs/NEW-COMPONENT-GUIDE.md)** - Step-by-step guide
- 📖 **[/docs/BEFORE-AFTER-EXAMPLES.md](/docs/BEFORE-AFTER-EXAMPLES.md)** - Visual examples

**Verification:**
- 📖 **[/docs/COMPLIANCE-VERIFICATION-CHECKLIST.md](/docs/COMPLIANCE-VERIFICATION-CHECKLIST.md)** - Manual checklist
- 🔧 **`./scripts/verify-compliance.sh`** - Automated check

**Migration:**
- 📖 **[/docs/MIGRATION-GUIDE.md](/docs/MIGRATION-GUIDE.md)** - Migrate existing code
- 📖 **[/docs/TROUBLESHOOTING.md](/docs/TROUBLESHOOTING.md)** - Common issues

**Navigation:**
- 📖 **[/docs/INDEX.md](/docs/INDEX.md)** - Master navigation

---

## ⚡ Example: Perfect Component

**Component File:**
```tsx
// /src/app/components/patterns/AlertBanner.tsx
import { cn } from "../../lib/utils";
import { AlertCircle } from "lucide-react";

interface AlertBannerProps {
  variant?: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
}

export function AlertBanner({ variant = "info", title, message }: AlertBannerProps) {
  return (
    <div className={cn("wp-pattern-alert", `wp-pattern-alert--${variant}`)}>
      <AlertCircle className="wp-pattern-alert__icon" />
      <div className="wp-pattern-alert__content">
        <h3 className="wp-pattern-alert__title">{title}</h3>
        <p className="wp-pattern-alert__message">{message}</p>
      </div>
    </div>
  );
}
```

**CSS File:**
```css
/* /src/styles/patterns/alert.css */
.wp-pattern-alert {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-radius: var(--radius-lg);
  background-color: var(--card);
  border: 1px solid var(--border);
}

.wp-pattern-alert__icon {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
}

.wp-pattern-alert__content {
  flex: 1;
}

.wp-pattern-alert__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-base);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 0.25rem 0;
}

.wp-pattern-alert__message {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-sm);
  color: var(--muted-foreground);
  margin: 0;
}

.wp-pattern-alert--success {
  border-color: var(--success);
}

.wp-pattern-alert--success .wp-pattern-alert__icon {
  color: var(--success);
}

.wp-pattern-alert--warning {
  border-color: var(--warning);
}

.wp-pattern-alert--warning .wp-pattern-alert__icon {
  color: var(--warning);
}

.wp-pattern-alert--error {
  border-color: var(--destructive);
}

.wp-pattern-alert--error .wp-pattern-alert__icon {
  color: var(--destructive);
}
```

**Import:**
```css
/* /src/styles/index.css */
@import './patterns/alert.css';
```

**Result:**
- ✅ No hardcoded colors
- ✅ Only defined fonts (Lora, Noto Sans)
- ✅ No inline styles
- ✅ BEM naming
- ✅ Automatic dark mode
- ✅ User can customize via CSS variables

**Perfect!** 🎉

---

## 🚨 THIS IS MANDATORY

**These rules are NOT optional. They are MANDATORY for:**

1. ✅ **Consistency** - Everything looks cohesive
2. ✅ **User customization** - Users can change entire site appearance
3. ✅ **Maintainability** - Single source of truth
4. ✅ **Accessibility** - WCAG AA compliance
5. ✅ **Dark mode** - Automatic support
6. ✅ **Professional quality** - Production-ready

**If you don't follow these rules, your component will be rejected!** ❌

**Follow these rules, and your component will be perfect!** ✅

---

## ✨ Summary

**Before generating ANY component:**

1. 🛑 **STOP** - Don't write code yet
2. 📖 **READ** - This document and `/docs/UI-GENERATION-RULES.md`
3. 📋 **PLAN** - Component structure with BEM naming
4. ✍️ **CODE** - React component with classNames only
5. 🎨 **STYLE** - External CSS file with CSS variables
6. 🔗 **IMPORT** - Add CSS to `/src/styles/index.css`
7. ✅ **VERIFY** - Run `./scripts/verify-compliance.sh`
8. 🎉 **DONE** - Component is perfect!

**Follow this workflow EVERY TIME!**

---

**Now you're ready to build! Good luck!** 🚀✨
