# ⚠️ MANDATORY: UI Generation Rules

**READ THIS BEFORE GENERATING ANY UI COMPONENT**

---

## 🚨 CRITICAL REQUIREMENTS

### **ALL generated UI MUST:**

1. ✅ **Use CSS variables ONLY** - No hardcoded colors, spacing, fonts, radius, shadows
2. ✅ **Use defined fonts ONLY** - Lora (serif), Noto Sans (sans), Courier New (mono)
3. ✅ **Use external CSS files** - No inline styles (`style={{}}`)
4. ✅ **Use BEM naming** - `.wp-pattern-*`, `.wp-card-*`, `.wp-section-*`
5. ✅ **Support dark mode automatically** - Via CSS variables (no `dark:` classes)

---

## 📋 The Rules

### **❌ NEVER DO THIS:**

```tsx
// ❌ WRONG - Hardcoded colors
<button style={{ backgroundColor: '#4a7311', color: 'white' }}>
  Click Me
</button>

// ❌ WRONG - Hardcoded fonts
<h1 style={{ fontFamily: 'Arial, sans-serif' }}>
  Title
</h1>

// ❌ WRONG - Inline styles
<div style={{ padding: '24px', borderRadius: '8px' }}>
  Content
</div>

// ❌ WRONG - dark: classes
<div className="bg-white dark:bg-slate-900">
  Content
</div>

// ❌ WRONG - Tailwind color classes
<button className="bg-green-600 text-white">
  Click
</button>
```

---

### **✅ ALWAYS DO THIS:**

```tsx
// ✅ CORRECT - Component with className
export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="button button--primary">
      {children}
    </button>
  );
}
```

```css
/* ✅ CORRECT - External CSS with CSS variables */
.button {
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-lg);
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
}

.button--primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
```

---

## 🎨 Available CSS Variables

### **Colors**
```css
/* Semantic Colors */
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

/* State Colors */
var(--success)
var(--success-foreground)
var(--warning)
var(--warning-foreground)
var(--destructive)
var(--destructive-foreground)
var(--info)
var(--info-foreground)
```

### **Typography**
```css
/* Font Families - ONLY USE THESE 3 */
var(--font-family-lora)         /* Serif - for headings, labels */
var(--font-family-noto-sans)    /* Sans-serif - for body, UI */
var(--font-family-mono)         /* Monospace - for code */

/* Font Sizes - Fluid/Responsive */
var(--text-6xl)    /* H1: 48-72px */
var(--text-5xl)    /* Display: 36-60px */
var(--text-4xl)    /* H2: 30-48px */
var(--text-3xl)    /* H3: 24-36px */
var(--text-2xl)    /* H4: 20-30px */
var(--text-xl)     /* H5: 18-24px */
var(--text-lg)     /* H6: 16-20px */
var(--text-base)   /* Body: 16-18px */
var(--text-sm)     /* Small: 14-16px */
var(--text-xs)     /* Tiny: 12-14px */

/* Font Weights */
var(--font-weight-light)      /* 300 */
var(--font-weight-normal)     /* 400 */
var(--font-weight-medium)     /* 500 */
var(--font-weight-semibold)   /* 600 */
var(--font-weight-bold)       /* 700 */

/* Line Heights */
var(--leading-tight)     /* 1.2 - Headings */
var(--leading-snug)      /* 1.375 - Subheadings */
var(--leading-normal)    /* 1.5 - Body */
var(--leading-relaxed)   /* 1.625 - Long-form */
var(--leading-loose)     /* 1.75 - Spacious */

/* Letter Spacing */
var(--tracking-tighter)  /* -0.05em */
var(--tracking-tight)    /* -0.025em */
var(--tracking-normal)   /* 0em */
var(--tracking-wide)     /* 0.025em */
var(--tracking-wider)    /* 0.05em */
```

### **Spacing**
```css
/* Section Spacing - Fluid/Responsive */
var(--spacing-section-sm)    /* 32-64px */
var(--spacing-section-md)    /* 48-96px */
var(--spacing-section-lg)    /* 64-128px */
var(--spacing-section-xl)    /* 80-160px */

/* Container Padding - Fluid/Responsive */
var(--spacing-container-sm)  /* 16-32px */
var(--spacing-container-md)  /* 24-48px */
var(--spacing-container-lg)  /* 32-64px */

/* Element Spacing - Fluid/Responsive */
var(--spacing-element-xs)    /* 8-16px */
var(--spacing-element-sm)    /* 12-24px */
var(--spacing-element-md)    /* 16-32px */
var(--spacing-element-lg)    /* 24-48px */

/* Gap Spacing - Fluid/Responsive */
var(--spacing-gap-xs)        /* 8-16px */
var(--spacing-gap-sm)        /* 12-24px */
var(--spacing-gap-md)        /* 16-32px */
var(--spacing-gap-lg)        /* 24-48px */
```

### **Border Radius**
```css
var(--radius-sm)     /* 2px */
var(--radius-md)     /* 4px */
var(--radius-lg)     /* 6px */
var(--radius-xl)     /* 8px */
var(--radius-2xl)    /* 12px */
var(--radius-3xl)    /* 16px */
var(--radius-full)   /* 9999px (circle) */
```

### **Shadows/Elevation**
```css
var(--elevation-sm)  /* Subtle shadow */
var(--elevation-md)  /* Medium shadow */
var(--elevation-lg)  /* Large shadow */
var(--elevation-xl)  /* Extra large shadow */
```

---

## 🎯 Quick Checklist

Before submitting any UI component, verify:

- [ ] **No hardcoded colors** - All colors use `var(--*)` 
- [ ] **No hardcoded fonts** - Only Lora, Noto Sans, Courier New via CSS variables
- [ ] **No inline styles** - All styling in external CSS files
- [ ] **No `dark:` classes** - Dark mode handled by CSS variables automatically
- [ ] **Uses BEM naming** - `.wp-pattern-*`, `.wp-card-*`, etc.
- [ ] **Semantic HTML** - Use `<h1>`, `<h2>`, `<p>`, not `<div>` with classes
- [ ] **CSS file created** - Component has corresponding CSS file
- [ ] **Tested in both modes** - Works in light AND dark mode

---

## 🚀 Component Generation Workflow

**Step 1: Create React Component**
```tsx
// /src/app/components/patterns/MyComponent.tsx
import { cn } from "../../lib/utils";

export function MyComponent() {
  return (
    <div className="wp-pattern-mycomponent">
      <h2 className="wp-pattern-mycomponent__title">Title</h2>
      <p className="wp-pattern-mycomponent__description">Description</p>
    </div>
  );
}
```

**Step 2: Create CSS File**
```css
/* /src/styles/patterns/mycomponent.css */
.wp-pattern-mycomponent {
  padding: var(--spacing-section-md);
  background-color: var(--card);
  color: var(--card-foreground);
  border-radius: var(--radius-lg);
}

.wp-pattern-mycomponent__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--primary);
}

.wp-pattern-mycomponent__description {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  color: var(--muted-foreground);
}
```

**Step 3: Import CSS**
```css
/* Add to /src/styles/index.css */
@import './patterns/mycomponent.css';
```

**Step 4: Verify**
```bash
./scripts/verify-compliance.sh
```

---

## 📚 Resources

- **Variable Reference:** `/docs/CSS-VARIABLES.md`
- **Component Template:** `/docs/COMPONENT-TEMPLATE.md`
- **Before/After Examples:** `/docs/BEFORE-AFTER-EXAMPLES.md`
- **Enforcement Rules:** `/docs/DESIGN-SYSTEM-ENFORCEMENT.md`

---

## 💡 Why This Matters

**User Benefit:**
- ✅ Users can customize entire site by editing 3 CSS files
- ✅ No coding knowledge required
- ✅ Changes apply instantly

**Developer Benefit:**
- ✅ Consistent styling across entire project
- ✅ Easy maintenance
- ✅ Automatic dark mode support
- ✅ WCAG AA compliant

**Project Benefit:**
- ✅ Professional design system
- ✅ Production-ready
- ✅ Scalable and maintainable

---

## ⚡ Remember

**The golden rule:**

> If a user wants to change a color, font, spacing, or any visual aspect, they should be able to do it by editing a CSS variable in one of the 3 theme files.

**If they can't, you've hardcoded something. Fix it!**

---

**This is mandatory. No exceptions.** 🚨
