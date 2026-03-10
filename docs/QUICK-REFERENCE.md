# Design System Quick Reference Card

**Keep this open while developing!**

---

## 🎨 Colors

```css
/* Primary */
bg-primary text-primary-foreground
bg-secondary text-secondary-foreground
bg-accent text-accent-foreground

/* Backgrounds */
bg-background text-foreground
bg-card text-card-foreground
bg-muted text-muted-foreground

/* Borders */
border-border ring-ring

/* Semantic */
bg-success text-success-foreground
bg-warning text-warning-foreground
bg-destructive text-destructive-foreground
bg-info text-info-foreground
```

---

## 🔤 Typography

```tsx
/* Fonts (ONLY these 3!) */
font-serif       /* Lora - Headings */
font-sans        /* Noto Sans - Body */
font-mono        /* Courier New - Code */

/* Sizes */
text-xs   text-sm   text-base   text-lg   text-xl
text-2xl  text-3xl  text-4xl    text-5xl  text-6xl

/* Weights */
font-normal    /* 400 - Body */
font-medium    /* 500 - UI, buttons */
font-semibold  /* 600 - H2, H3 */
font-bold      /* 700 - H1 */
```

---

## 📏 Spacing

```tsx
/* Padding/Margin (4px scale) */
p-1   p-2   p-3   p-4   p-5   p-6   p-8   p-10  p-12  p-16

/* Gap */
gap-1  gap-2  gap-3  gap-4  gap-6  gap-8  gap-12

/* Section Spacing (use in CSS) */
padding-top: var(--spacing-section-sm);  /* ~2-3rem */
padding-top: var(--spacing-section-md);  /* ~3-5rem */
padding-top: var(--spacing-section-lg);  /* ~4-7rem */
```

---

## 🔲 Border Radius

```tsx
rounded-sm   /* Small */
rounded-md   /* Medium */
rounded-lg   /* Large */
rounded-xl   /* Extra Large */
rounded-full /* Pill/Circle */
```

---

## 🌑 Shadows

```tsx
shadow-sm  /* Subtle */
shadow-md  /* Medium */
shadow-lg  /* Large */
```

---

## ✅ DO's

```tsx
// ✅ Use CSS variables via Tailwind
<div className="bg-primary text-primary-foreground">

// ✅ Use external CSS with BEM
<div className="wp-pattern-my-card">
  <h3 className="wp-pattern-my-card__title">

// ✅ Use semantic HTML
<h2>Section Title</h2>
<button>Click Me</button>

// ✅ Use defined fonts
<h1 className="font-serif">
<p className="font-sans">
<code className="font-mono">

// ✅ Dark mode via CSS variables
.my-component {
  background-color: var(--card);
}
```

---

## ❌ DON'Ts

```tsx
// ❌ No hardcoded colors
<div style={{ backgroundColor: '#4a7311' }}>
<div className="bg-green-600">

// ❌ No inline styles
<div style={{ padding: '20px' }}>

// ❌ No dark: classes
<div className="dark:bg-slate-900">

// ❌ No random fonts
<h1 style={{ fontFamily: 'Arial' }}>

// ❌ No generic class names
<div className="card">
<div className="title">
```

---

## 📦 Component Template

```tsx
// React Component
import { cn } from "../../lib/utils";

interface MyComponentProps {
  title: string;
  variant?: "default" | "primary";
  className?: string;
}

export function MyComponent({ title, variant = "default", className }: MyComponentProps) {
  return (
    <div className={cn(
      "wp-pattern-my-component",
      `wp-pattern-my-component--${variant}`,
      className
    )}>
      <h3 className="wp-pattern-my-component__title">
        {title}
      </h3>
    </div>
  );
}

export default MyComponent;
```

```css
/* CSS File */
.wp-pattern-my-component {
  padding: 1.5rem;
  background-color: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.wp-pattern-my-component__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--card-foreground);
}

.wp-pattern-my-component--primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.dark .wp-pattern-my-component {
  /* Usually not needed - variables auto-switch */
}
```

---

## 🔍 Quick Checks

Before submitting:

- [ ] No hardcoded colors (`#hex`, `rgb()`, color names)
- [ ] No inline styles (`style={{...}}`)
- [ ] No `dark:` classes
- [ ] Only uses Lora, Noto Sans, Courier New
- [ ] BEM naming (`.wp-pattern-*__element--modifier`)
- [ ] External CSS file created and imported
- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Responsive (mobile, tablet, desktop)

---

## 🚀 Quick Commands

```bash
# Run audit
./scripts/audit-design-system.sh

# Check for hardcoded colors
grep -r "#[0-9a-fA-F]\{6\}" src/app --include="*.tsx"

# Check for inline styles
grep -r "style={{" src/app --include="*.tsx"

# Check for dark: classes
grep -r "dark:" src/app --include="*.tsx"
```

---

## 📚 Docs

- `/docs/NEW-COMPONENT-GUIDE.md` - Full guide
- `/docs/DESIGN-TOKENS-REFERENCE.md` - All CSS variables
- `/docs/DESIGN-SYSTEM-COMPLIANCE-CHECKLIST.md` - Complete checklist

---

## 🎯 Examples

- `/dev-tools/design-system` - Token showcase
- `/dev-tools/design-system-example` - Real-world page
- `FeatureCard.tsx` - Perfect example component

---

## 💡 Remember

**Users customize by editing 3 CSS files:**
1. `theme-light.css` - Light colors
2. `theme-dark.css` - Dark colors  
3. `theme.css` - Typography, spacing

**NO React code changes needed!**

---

**Print this and keep it visible! 📄**
