# Component Template - Copy & Paste Ready

**Use this template when creating new components.**

---

## 📋 Template Files

### **1. React Component File**

```tsx
/**
 * MyComponent
 * 
 * [Brief description of what this component does]
 * 
 * @example
 * <MyComponent
 *   title="Example"
 *   description="Description here"
 *   variant="default"
 * />
 */

import { cn } from "../../lib/utils";
import type { LucideIcon } from "lucide-react";

interface MyComponentProps {
  /**
   * The component title
   */
  title: string;
  
  /**
   * The component description
   */
  description?: string;
  
  /**
   * Visual variant
   * @default "default"
   */
  variant?: "default" | "primary" | "accent";
  
  /**
   * Optional icon
   */
  icon?: LucideIcon;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Child elements
   */
  children?: React.ReactNode;
}

export function MyComponent({
  title,
  description,
  variant = "default",
  icon: Icon,
  className,
  children,
}: MyComponentProps) {
  return (
    <div
      className={cn(
        "wp-pattern-my-component",
        variant && `wp-pattern-my-component--${variant}`,
        className
      )}
    >
      {Icon && (
        <div className="wp-pattern-my-component__icon">
          <Icon className="w-6 h-6" />
        </div>
      )}
      
      <div className="wp-pattern-my-component__content">
        <h3 className="wp-pattern-my-component__title">{title}</h3>
        
        {description && (
          <p className="wp-pattern-my-component__description">
            {description}
          </p>
        )}
        
        {children}
      </div>
    </div>
  );
}

export default MyComponent;
```

**Save as:** `/src/app/components/patterns/MyComponent.tsx`

---

### **2. CSS File**

```css
/**
 * MyComponent Styles
 * 
 * [Brief description]
 * 
 * Uses CSS variables for all styling.
 * Fully customizable via theme files.
 */

/* Block */
.wp-pattern-my-component {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: all 200ms ease;
}

/* Hover effect */
.wp-pattern-my-component:hover {
  border-color: var(--primary);
  box-shadow: var(--elevation-sm);
}

/* Icon element */
.wp-pattern-my-component__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius-lg);
}

/* Content wrapper */
.wp-pattern-my-component__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Title element */
.wp-pattern-my-component__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--card-foreground);
  line-height: var(--leading-tight);
}

/* Description element */
.wp-pattern-my-component__description {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-normal);
  color: var(--muted-foreground);
  line-height: var(--leading-normal);
}

/* Primary variant modifier */
.wp-pattern-my-component--primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-color: var(--primary);
}

.wp-pattern-my-component--primary .wp-pattern-my-component__icon {
  background-color: var(--primary-foreground);
  color: var(--primary);
}

.wp-pattern-my-component--primary .wp-pattern-my-component__title {
  color: var(--primary-foreground);
}

.wp-pattern-my-component--primary .wp-pattern-my-component__description {
  color: var(--primary-foreground);
  opacity: 0.9;
}

/* Accent variant modifier */
.wp-pattern-my-component--accent {
  background-color: var(--accent);
  color: var(--accent-foreground);
  border-color: var(--accent);
}

.wp-pattern-my-component--accent .wp-pattern-my-component__icon {
  background-color: var(--accent-foreground);
  color: var(--accent);
}

.wp-pattern-my-component--accent .wp-pattern-my-component__title {
  color: var(--accent-foreground);
}

.wp-pattern-my-component--accent .wp-pattern-my-component__description {
  color: var(--accent-foreground);
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 768px) {
  .wp-pattern-my-component {
    padding: 1rem;
  }
  
  .wp-pattern-my-component__icon {
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .wp-pattern-my-component__title {
    font-size: var(--text-lg);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .wp-pattern-my-component {
    transition: none;
  }
}
```

**Save as:** `/src/styles/patterns/my-component.css`

---

### **3. Import in global.css**

```css
/* Add to /src/styles/global.css */
@import './patterns/my-component.css';
```

---

### **4. Usage Example**

```tsx
import { MyComponent } from "../components/patterns/MyComponent";
import { Zap } from "lucide-react";

export function ExamplePage() {
  return (
    <div className="container py-12">
      {/* Default variant */}
      <MyComponent
        title="Default Variant"
        description="This is the default styling"
        icon={Zap}
      />
      
      {/* Primary variant */}
      <MyComponent
        title="Primary Variant"
        description="This uses primary colors"
        icon={Zap}
        variant="primary"
      />
      
      {/* Accent variant */}
      <MyComponent
        title="Accent Variant"
        description="This uses accent colors"
        icon={Zap}
        variant="accent"
      />
      
      {/* With children */}
      <MyComponent
        title="With Custom Content"
        icon={Zap}
      >
        <button className="button button--primary button--sm">
          Action Button
        </button>
      </MyComponent>
    </div>
  );
}
```

---

## 📋 Checklist

After creating component, verify:

- [ ] React file saved in `/src/app/components/patterns/`
- [ ] CSS file saved in `/src/styles/patterns/`
- [ ] CSS imported in `/src/styles/global.css`
- [ ] TypeScript interfaces defined
- [ ] JSDoc comments added
- [ ] Default props set
- [ ] Uses `cn()` utility for className merging
- [ ] BEM naming convention (`.wp-pattern-*`)
- [ ] All colors use CSS variables
- [ ] Only uses Lora, Noto Sans, or Courier New fonts
- [ ] All spacing uses CSS variables or Tailwind
- [ ] No inline styles
- [ ] No `dark:` classes
- [ ] Hover states defined
- [ ] Focus states (if interactive)
- [ ] Responsive styles (@media queries)
- [ ] Reduced motion support
- [ ] Tested in light mode
- [ ] Tested in dark mode
- [ ] Tested customization (change CSS variable)
- [ ] Audit script passes: `./scripts/audit-design-system.sh`

---

## 🎨 Customization Examples

**Change primary variant background:**
```css
/* In theme-light.css */
--primary: #c0392b; /* Red instead of green */
```

**Change border radius:**
```css
/* In theme.css */
--radius-lg: 12px; /* More rounded */
```

**Change typography:**
```css
/* In theme.css */
--text-xl: 1.375rem; /* Larger title */
--font-weight-semibold: 700; /* Bolder */
```

**Component updates automatically!** 🎉

---

## 🚀 Quick Start

1. **Copy** the React template above
2. **Rename** `MyComponent` to your component name
3. **Copy** the CSS template above
4. **Rename** `.wp-pattern-my-component` to your BEM class
5. **Import** CSS in global.css
6. **Test** in browser
7. **Run** audit script
8. **Done!** ✅

---

## 📚 More Examples

**Study these working examples:**

- `/src/app/components/patterns/FeatureCard.tsx`
- `/src/styles/patterns/feature-card.css`

**Live examples:**

- `/dev-tools/component-library` - See all components
- `/dev-tools/design-system-example` - Real-world usage

**Documentation:**

- `/docs/NEW-COMPONENT-GUIDE.md` - Detailed guide
- `/docs/QUICK-REFERENCE.md` - Quick reference
- `/docs/DESIGN-TOKENS-REFERENCE.md` - CSS variables

---

## ⚠️ Common Mistakes

### **Mistake 1: Hardcoded Colors**

❌ **Wrong:**
```css
.wp-pattern-my-component {
  background-color: #4a7311;
}
```

✅ **Correct:**
```css
.wp-pattern-my-component {
  background-color: var(--primary);
}
```

---

### **Mistake 2: Inline Styles**

❌ **Wrong:**
```tsx
<div style={{ padding: '1.5rem' }}>
```

✅ **Correct:**
```tsx
<div className="wp-pattern-my-component">
```

---

### **Mistake 3: dark: Classes**

❌ **Wrong:**
```tsx
<div className="bg-white dark:bg-slate-900">
```

✅ **Correct:**
```tsx
<div className="bg-card">
```

---

### **Mistake 4: Generic Class Names**

❌ **Wrong:**
```css
.card { }
.title { }
```

✅ **Correct:**
```css
.wp-pattern-my-component { }
.wp-pattern-my-component__title { }
```

---

### **Mistake 5: Wrong Fonts**

❌ **Wrong:**
```css
.title {
  font-family: 'Arial', sans-serif;
}
```

✅ **Correct:**
```css
.wp-pattern-my-component__title {
  font-family: var(--font-family-lora);
}
```

---

## 🎯 Success Criteria

**Your component is ready when:**

1. ✅ Uses ONLY CSS variables for colors
2. ✅ Uses ONLY Lora, Noto Sans, or Courier New
3. ✅ No inline styles
4. ✅ No `dark:` classes
5. ✅ BEM naming convention
6. ✅ External CSS file
7. ✅ Responsive design
8. ✅ Reduced motion support
9. ✅ Works in light and dark mode
10. ✅ Customizable via theme files
11. ✅ Audit script passes with 0 violations

---

**Copy this template and start building!** 🎨
