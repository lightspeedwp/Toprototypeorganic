# 🚨 MANDATORY DESIGN SYSTEM ENFORCEMENT 🚨

**THIS RULE APPLIES TO ALL UI GENERATION - NO EXCEPTIONS!**

---

## ⚠️ CRITICAL: BEFORE GENERATING ANY UI ⚠️

**Run this command FIRST:**

```bash
./scripts/pre-generation-check.sh
```

This interactive script will verify you understand:
1. ✅ Must use CSS variables for ALL styling
2. ✅ Must use ONLY defined fonts (Lora, Noto Sans, Courier New)
3. ✅ Must create external CSS files
4. ✅ Must use BEM naming convention
5. ✅ Must avoid hardcoded colors
6. ✅ Must avoid inline styles
7. ✅ Must avoid dark: classes

**If you skip this check, your component WILL be rejected!** ❌

---

## 🎯 The Design System Contract

### **USER CONTRACT:**

> "I can customize EVERY visual aspect of this site by editing 3 CSS files."

**Files:**
- `/src/styles/theme-light.css` - Light mode colors & tokens
- `/src/styles/theme-dark.css` - Dark mode colors (auto-switch)
- `/src/styles/theme.css` - Typography & spacing

**If a user can't change something by editing these files, you've hardcoded it!** ❌

---

### **DEVELOPER CONTRACT:**

> "I will use CSS variables for ALL styling, so users can customize the site by editing CSS."

**Promise:**
- ✅ ALL colors via CSS variables
- ✅ ALL fonts via CSS variables
- ✅ ALL spacing via CSS variables
- ✅ ALL radius via CSS variables
- ✅ ALL shadows via CSS variables
- ✅ External CSS files with BEM naming
- ✅ No hardcoded values
- ✅ No inline styles
- ✅ No dark: classes

---

## 🎨 Available CSS Variables (80+)

### **Colors (26 variables)**

```css
/* Base Colors */
var(--background)               /* Page background */
var(--foreground)               /* Page text */

/* Brand Colors */
var(--primary)                  /* Primary brand color */
var(--primary-foreground)       /* Text on primary */
var(--secondary)                /* Secondary brand color */
var(--secondary-foreground)     /* Text on secondary */
var(--accent)                   /* Accent color */
var(--accent-foreground)        /* Text on accent */

/* Utility Colors */
var(--muted)                    /* Muted background */
var(--muted-foreground)         /* Muted text */
var(--card)                     /* Card background */
var(--card-foreground)          /* Card text */

/* State Colors */
var(--success)                  /* Success state */
var(--success-foreground)       /* Text on success */
var(--warning)                  /* Warning state */
var(--warning-foreground)       /* Text on warning */
var(--destructive)              /* Error/destructive state */
var(--destructive-foreground)   /* Text on destructive */
var(--info)                     /* Info state */
var(--info-foreground)          /* Text on info */

/* Border & Input */
var(--border)                   /* Border color */
var(--input)                    /* Input border */
var(--input-background)         /* Input background */
var(--ring)                     /* Focus ring */

/* Sidebar (optional) */
var(--sidebar)                  /* Sidebar background */
var(--sidebar-foreground)       /* Sidebar text */
/* ... 6 more sidebar variables ... */

/* Charts */
var(--chart-1) to var(--chart-5) /* Chart colors */
```

---

### **Typography (30+ variables)**

**Font Families (ONLY THESE 3!):**

```css
var(--font-family-lora)         /* 'Lora', serif - Headings */
var(--font-family-noto-sans)    /* 'Noto Sans', sans-serif - Body/UI */
var(--font-family-mono)         /* 'Courier New', monospace - Code */
```

**❌ NO OTHER FONTS ALLOWED!**
- ❌ Arial, Helvetica, Georgia, Times New Roman
- ❌ Any font not listed above
- ✅ ONLY Lora, Noto Sans, Courier New

**Font Sizes (10 fluid levels):**

```css
var(--text-6xl)    /* 48-72px - H1 */
var(--text-5xl)    /* 36-60px - Display/Hero */
var(--text-4xl)    /* 30-48px - H2 */
var(--text-3xl)    /* 24-36px - H3 */
var(--text-2xl)    /* 20-30px - H4 */
var(--text-xl)     /* 18-24px - H5 */
var(--text-lg)     /* 16-20px - H6 */
var(--text-base)   /* 16-18px - Body */
var(--text-sm)     /* 14-16px - Small */
var(--text-xs)     /* 12-14px - Tiny */
```

**Font Weights (5 levels):**

```css
var(--font-weight-light)        /* 300 */
var(--font-weight-normal)       /* 400 */
var(--font-weight-medium)       /* 500 */
var(--font-weight-semibold)     /* 600 */
var(--font-weight-bold)         /* 700 */
```

**Line Heights (5 levels):**

```css
var(--leading-tight)            /* 1.2 - Headings */
var(--leading-snug)             /* 1.375 - Subheadings */
var(--leading-normal)           /* 1.5 - Body */
var(--leading-relaxed)          /* 1.625 - Long-form */
var(--leading-loose)            /* 1.75 - Spacious */
```

**Letter Spacing (5 levels):**

```css
var(--tracking-tighter)         /* -0.05em - Large headings */
var(--tracking-tight)           /* -0.025em - Medium headings */
var(--tracking-normal)          /* 0em - Body */
var(--tracking-wide)            /* 0.025em - Labels */
var(--tracking-wider)           /* 0.05em - Uppercase */
```

---

### **Spacing (12+ variables - All Fluid/Responsive)**

**Section Spacing:**

```css
var(--spacing-section-sm)    /* 32-64px fluid */
var(--spacing-section-md)    /* 48-96px fluid */
var(--spacing-section-lg)    /* 64-128px fluid */
var(--spacing-section-xl)    /* 80-160px fluid */
```

**Container Padding:**

```css
var(--spacing-container-sm)  /* 16-32px fluid */
var(--spacing-container-md)  /* 24-48px fluid */
var(--spacing-container-lg)  /* 32-64px fluid */
```

**Element Spacing:**

```css
var(--spacing-element-xs)    /* 8-16px fluid */
var(--spacing-element-sm)    /* 12-24px fluid */
var(--spacing-element-md)    /* 16-32px fluid */
var(--spacing-element-lg)    /* 24-48px fluid */
```

**Gap Spacing:**

```css
var(--spacing-gap-xs)        /* 8-16px fluid */
var(--spacing-gap-sm)        /* 12-24px fluid */
var(--spacing-gap-md)        /* 16-32px fluid */
var(--spacing-gap-lg)        /* 24-48px fluid */
```

---

### **Border Radius (8 variables)**

```css
var(--radius-sm)             /* 2px */
var(--radius-md)             /* 4px */
var(--radius-lg)             /* 6px */
var(--radius-xl)             /* 8px */
var(--radius-2xl)            /* 12px */
var(--radius-3xl)            /* 16px */
var(--radius-full)           /* 9999px (circle) */
```

---

### **Shadows (4 variables)**

```css
var(--elevation-sm)          /* Subtle shadow */
var(--elevation-md)          /* Medium shadow */
var(--elevation-lg)          /* Large shadow */
var(--elevation-xl)          /* Extra large shadow */
```

---

## ❌ PROHIBITED (NEVER DO THIS!)

### **1. Hardcoded Colors**

```tsx
// ❌ WRONG - Hardcoded hex colors
<div style={{ backgroundColor: '#4a7311', color: 'white' }}>

// ❌ WRONG - Hardcoded RGB colors
<div style={{ backgroundColor: 'rgb(74, 115, 17)' }}>

// ❌ WRONG - Hardcoded color names
<div className="bg-white text-black">

// ❌ WRONG - Tailwind color classes
<button className="bg-green-600 text-white">

// ✅ CORRECT - CSS variables via Tailwind
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">

// ✅ CORRECT - CSS variables in CSS file
.my-component {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
```

---

### **2. Hardcoded Fonts**

```tsx
// ❌ WRONG - Hardcoded font families
<h1 style={{ fontFamily: 'Arial, sans-serif' }}>

// ❌ WRONG - Non-defined fonts
<p style={{ fontFamily: 'Helvetica, Georgia' }}>

// ❌ WRONG - Font utilities not mapped
<div className="font-['Arial']">

// ✅ CORRECT - Defined fonts via Tailwind
<h1 className="font-serif">    {/* → Lora */}
<p className="font-sans">      {/* → Noto Sans */}
<code className="font-mono">   {/* → Courier New */}

// ✅ CORRECT - CSS variables in CSS file
.heading {
  font-family: var(--font-family-lora);
}

.body-text {
  font-family: var(--font-family-noto-sans);
}
```

---

### **3. Inline Styles**

```tsx
// ❌ WRONG - Static inline styles
<div style={{ 
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  backgroundColor: 'white'
}}>

// ✅ CORRECT - Tailwind classes
<div className="p-6 rounded-lg shadow-sm bg-card">

// ✅ CORRECT - External CSS with CSS variables
<div className="wp-pattern-mycomponent">

/* my-component.css */
.wp-pattern-mycomponent {
  padding: var(--spacing-element-md);
  border-radius: var(--radius-lg);
  box-shadow: var(--elevation-sm);
  background-color: var(--card);
}
```

---

### **4. Dark Mode Classes**

```tsx
// ❌ WRONG - Tailwind dark mode classes
<div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">

// ❌ WRONG - Any dark: prefix
<button className="bg-primary dark:bg-primary-dark">

// ✅ CORRECT - Single set of classes (auto-switches!)
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">
```

**Why?** CSS variables handle dark mode automatically! No dark: classes needed!

---

## ✅ CORRECT EXAMPLES

### **Example 1: React Component with Tailwind**

```tsx
// /src/app/components/patterns/StatusBadge.tsx
import { cn } from "../../lib/utils";

interface StatusBadgeProps {
  variant?: "success" | "warning" | "destructive" | "info";
  children: React.ReactNode;
}

export function StatusBadge({ variant = "info", children }: StatusBadgeProps) {
  const variantClasses = {
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    info: "bg-info text-info-foreground",
  };

  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-3 py-1 rounded-full font-sans text-sm font-medium",
      variantClasses[variant]
    )}>
      {children}
    </span>
  );
}
```

**✅ Perfect because:**
- Uses CSS variables via Tailwind classes (bg-success, text-success-foreground, etc.)
- Uses defined font (font-sans → Noto Sans)
- Uses Tailwind spacing (px-3, py-1)
- Uses Tailwind radius (rounded-full)
- No hardcoded values
- No inline styles

---

### **Example 2: External CSS File**

```css
/* /src/styles/patterns/info-card.css */

/**
 * InfoCard Pattern
 * 
 * Design System Compliant:
 * ✅ All colors use CSS variables
 * ✅ All fonts use defined families
 * ✅ All spacing uses CSS variables
 * ✅ Automatic dark mode
 * ✅ BEM naming convention
 */

.wp-pattern-info-card {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-element-md);
  box-shadow: var(--elevation-sm);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.wp-pattern-info-card:hover {
  box-shadow: var(--elevation-md);
  border-color: var(--primary);
}

.wp-pattern-info-card__icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: var(--spacing-element-sm);
  color: var(--primary);
}

.wp-pattern-info-card__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-tight);
  color: var(--foreground);
  margin-bottom: var(--spacing-element-xs);
}

.wp-pattern-info-card__description {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--leading-normal);
  color: var(--muted-foreground);
  margin: 0;
}

.wp-pattern-info-card--highlighted {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-color: var(--primary);
}

.wp-pattern-info-card--highlighted .wp-pattern-info-card__title,
.wp-pattern-info-card--highlighted .wp-pattern-info-card__description {
  color: var(--primary-foreground);
}
```

**✅ Perfect because:**
- ALL colors via CSS variables
- ALL fonts via CSS variables (Lora, Noto Sans)
- ALL spacing via CSS variables
- ALL radius via CSS variables
- ALL shadows via CSS variables
- BEM naming convention
- No hardcoded values
- Automatic dark mode

---

## 📋 Component Generation Checklist

**Before submitting ANY component:**

- [ ] ✅ Read /docs/START-HERE.md (first time)
- [ ] ✅ Run ./scripts/pre-generation-check.sh
- [ ] ✅ No `#` hex colors in code
- [ ] ✅ No `rgb(` or `rgba(` color values
- [ ] ✅ No `style={{}}` inline styles (except dynamic values)
- [ ] ✅ No `dark:` classes
- [ ] ✅ No hardcoded font families (Arial, Helvetica, etc.)
- [ ] ✅ Only Lora, Noto Sans, Courier New fonts used
- [ ] ✅ External CSS file with BEM naming created
- [ ] ✅ CSS imported in /src/styles/index.css
- [ ] ✅ All colors via CSS variables
- [ ] ✅ All fonts via CSS variables
- [ ] ✅ All spacing via CSS variables or Tailwind scale
- [ ] ✅ Run ./scripts/verify-compliance.sh - passes ✅
- [ ] ✅ Works in light mode
- [ ] ✅ Works in dark mode
- [ ] ✅ Responsive on mobile

---

## 🎯 The Golden Rule

> **If a user wants to change any visual aspect, they should edit a CSS variable in one of the 3 theme files:**
> 
> - `/src/styles/theme-light.css` (light mode colors)
> - `/src/styles/theme-dark.css` (dark mode colors)
> - `/src/styles/theme.css` (typography, spacing)

**Can they?** ✅ You did it right!  
**Can't they?** ❌ You hardcoded something - fix it!

---

## 📚 Essential Documentation

**🛑 MUST READ BEFORE CODING:**
- [/docs/START-HERE.md](/docs/START-HERE.md) - Visual enforcement guide (10 min)
- [/docs/UI-GENERATION-RULES.md](/docs/UI-GENERATION-RULES.md) - Mandatory rules (5 min)
- [/docs/QUICK-REFERENCE.md](/docs/QUICK-REFERENCE.md) - One-page cheat sheet (2 min)

**📖 COMPLETE REFERENCE:**
- [/docs/CSS-VARIABLES-COMPLETE.md](/docs/CSS-VARIABLES-COMPLETE.md) - All 80+ variables with examples (15 min)
- [/docs/SYSTEM-CONFIRMED.md](/docs/SYSTEM-CONFIRMED.md) - System verification (10 min)

**🔧 BUILDING COMPONENTS:**
- [/docs/COMPONENT-TEMPLATE.md](/docs/COMPONENT-TEMPLATE.md) - Copy-paste template
- [/docs/NEW-COMPONENT-GUIDE.md](/docs/NEW-COMPONENT-GUIDE.md) - Step-by-step guide
- [/docs/BEFORE-AFTER-EXAMPLES.md](/docs/BEFORE-AFTER-EXAMPLES.md) - Visual comparisons

**✅ VERIFICATION:**
- `/scripts/pre-generation-check.sh` - Run BEFORE coding
- `/scripts/verify-compliance.sh` - Run AFTER coding
- [/docs/COMPLIANCE-VERIFICATION-CHECKLIST.md](/docs/COMPLIANCE-VERIFICATION-CHECKLIST.md) - Manual checklist

**🆘 HELP:**
- [/docs/TROUBLESHOOTING.md](/docs/TROUBLESHOOTING.md) - Common issues
- [/docs/MIGRATION-GUIDE.md](/docs/MIGRATION-GUIDE.md) - Migrate existing code
- [/docs/INDEX.md](/docs/INDEX.md) - Master navigation

---

## 🚨 ENFORCEMENT

**This is NOT optional. This is MANDATORY.**

**If you generate UI that:**
- ❌ Uses hardcoded colors
- ❌ Uses hardcoded fonts (Arial, Helvetica, etc.)
- ❌ Uses inline styles
- ❌ Uses dark: classes
- ❌ Doesn't use CSS variables

**Your component will be REJECTED!** ❌

**Why? Because users cannot customize it by editing CSS variables!**

---

## 🎉 Summary

**Design System Contract:**

1. ✅ **Users** can customize everything by editing 3 CSS files
2. ✅ **Developers** use CSS variables for all styling
3. ✅ **Components** follow BEM naming with external CSS
4. ✅ **Fonts** are ONLY Lora, Noto Sans, Courier New
5. ✅ **Dark mode** is automatic (no dark: classes)
6. ✅ **Verification** is automated (run scripts)
7. ✅ **Documentation** is comprehensive (22 guides)
8. ✅ **Quality** is world-class (production ready)

**Follow these rules, and your component will be perfect!** ✅

**Break these rules, and your component will be rejected!** ❌

---

**NOW GET BUILDING!** 🚀✨

But first... run this:

```bash
./scripts/pre-generation-check.sh
```
