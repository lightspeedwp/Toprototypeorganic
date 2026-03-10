# 🎨 Before & After: Design System Migration

**Visual examples of code before and after design system compliance.**

---

## ❌ BEFORE: Hardcoded & Non-Compliant

### **Example 1: Button with Hardcoded Colors**

```tsx
// ❌ BAD - Hardcoded colors, inline styles
function BadButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        backgroundColor: '#4a7311',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '6px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        fontWeight: '600',
      }}
    >
      {children}
    </button>
  );
}
```

**Problems:**
- ❌ Hardcoded hex color `#4a7311`
- ❌ Hardcoded color name `white`
- ❌ Inline styles
- ❌ Hardcoded font `Arial`
- ❌ User cannot customize
- ❌ No dark mode support

---

## ✅ AFTER: CSS Variables & Compliant

### **Example 1: Button with CSS Variables**

**React Component:**
```tsx
// ✅ GOOD - Uses design system
import { cn } from "../../lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
}

export function Button({ children, variant = "default" }: ButtonProps) {
  return (
    <button
      className={cn(
        "button",
        variant && `button--${variant}`
      )}
    >
      {children}
    </button>
  );
}
```

**CSS File:** `/src/styles/components/button.css`
```css
/* Button - Design System Compliant */
.button {
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-lg);
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 200ms ease;
}

.button:hover {
  background-color: var(--muted);
}

.button--primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-color: var(--primary);
}

.button--primary:hover {
  opacity: 0.9;
}

.button--secondary {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
  border-color: var(--secondary);
}
```

**Benefits:**
- ✅ All colors use CSS variables
- ✅ User can customize by editing theme files
- ✅ Automatic dark mode support
- ✅ External CSS file
- ✅ No inline styles
- ✅ Uses defined fonts

**User Customization:**
```css
/* User edits theme-light.css */
--primary: #c0392b;  /* Change from green to red */
/* Button automatically becomes red! */
```

---

## ❌ BEFORE: Card with Hardcoded Styles

```tsx
// ❌ BAD - Hardcoded everything
function BadCard({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h3
        style={{
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontSize: '24px',
          fontWeight: '700',
          color: '#333',
          marginBottom: '12px',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '16px',
          color: '#666',
          lineHeight: '1.6',
        }}
      >
        {description}
      </p>
    </div>
  );
}
```

**Problems:**
- ❌ All inline styles
- ❌ Hardcoded colors (white, #e0e0e0, #333, #666)
- ❌ Hardcoded fonts (Helvetica, Arial)
- ❌ Hardcoded spacing
- ❌ No dark mode
- ❌ User cannot customize

---

## ✅ AFTER: Card with CSS Variables

**React Component:**
```tsx
// ✅ GOOD - Clean and semantic
import { cn } from "../../lib/utils";

interface CardProps {
  title: string;
  description: string;
  variant?: "default" | "primary";
}

export function Card({ title, description, variant = "default" }: CardProps) {
  return (
    <div
      className={cn(
        "wp-card",
        variant && `wp-card--${variant}`
      )}
    >
      <h3 className="wp-card__title">{title}</h3>
      <p className="wp-card__description">{description}</p>
    </div>
  );
}
```

**CSS File:** `/src/styles/components/card.css`
```css
/* Card - Design System Compliant */
.wp-card {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--elevation-sm);
  transition: all 200ms ease;
}

.wp-card:hover {
  border-color: var(--primary);
  box-shadow: var(--elevation-md);
}

.wp-card__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--card-foreground);
  margin-bottom: 0.75rem;
}

.wp-card__description {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-normal);
  color: var(--muted-foreground);
  line-height: var(--leading-normal);
}

.wp-card--primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-color: var(--primary);
}

.wp-card--primary .wp-card__title,
.wp-card--primary .wp-card__description {
  color: var(--primary-foreground);
}
```

**Benefits:**
- ✅ No inline styles
- ✅ All colors use CSS variables
- ✅ Automatic dark mode
- ✅ BEM naming convention
- ✅ User customizable
- ✅ Uses defined fonts
- ✅ Responsive design

---

## ❌ BEFORE: Dark Mode with Tailwind Classes

```tsx
// ❌ BAD - dark: classes
function BadDarkModeComponent() {
  return (
    <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
      <h2 className="text-green-600 dark:text-green-400">
        Section Title
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Body text here
      </p>
    </div>
  );
}
```

**Problems:**
- ❌ Uses `dark:` classes
- ❌ User cannot customize dark mode via CSS
- ❌ Hardcoded Tailwind color classes
- ❌ Maintenance nightmare (2x the classes)

---

## ✅ AFTER: Dark Mode with CSS Variables

**React Component:**
```tsx
// ✅ GOOD - Automatic dark mode
export function DarkModeComponent() {
  return (
    <div className="wp-section">
      <h2 className="wp-section__title">
        Section Title
      </h2>
      <p className="wp-section__description">
        Body text here
      </p>
    </div>
  );
}
```

**CSS File:**
```css
/* Light & Dark Mode - Automatic switching */
.wp-section {
  background-color: var(--background);
  color: var(--foreground);
}

.wp-section__title {
  color: var(--primary);  /* Auto-switches! */
}

.wp-section__description {
  color: var(--muted-foreground);  /* Auto-switches! */
}
```

**Theme Files:**
```css
/* theme-light.css */
:root {
  --background: #FFFFFF;
  --foreground: #000000;
  --primary: #4a7311;
  --muted-foreground: #595959;
}

/* theme-dark.css */
.dark {
  --background: #0A0A0A;
  --foreground: #FFFFFF;
  --primary: #90BA48;  /* Lighter for dark mode */
  --muted-foreground: #B8B8B8;
}
```

**Benefits:**
- ✅ Single set of classes
- ✅ Automatic color switching
- ✅ User can customize both modes
- ✅ Easier maintenance
- ✅ WCAG compliant in both modes

---

## ❌ BEFORE: Typography with Hardcoded Fonts

```tsx
// ❌ BAD - Hardcoded fonts everywhere
function BadTypography() {
  return (
    <div>
      <h1 style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '48px' }}>
        Heading
      </h1>
      <p style={{ fontFamily: 'Georgia, serif', fontSize: '16px' }}>
        Body text
      </p>
      <code style={{ fontFamily: 'Monaco, monospace', fontSize: '14px' }}>
        Code example
      </code>
    </div>
  );
}
```

**Problems:**
- ❌ Hardcoded fonts (Helvetica, Georgia, Monaco)
- ❌ Inline styles
- ❌ User cannot change fonts
- ❌ Not using defined font families

---

## ✅ AFTER: Typography with Semantic HTML

**React Component:**
```tsx
// ✅ GOOD - Semantic HTML, automatic styling
export function Typography() {
  return (
    <div>
      <h1>Heading</h1>
      <p>Body text</p>
      <code>Code example</code>
    </div>
  );
}
```

**CSS File:** `/src/styles/theme.css` (already exists!)
```css
/* Semantic HTML gets automatic styling */
h1 {
  font-family: var(--font-family-lora);  /* Lora serif */
  font-size: var(--text-6xl);            /* Fluid 48-72px */
  font-weight: var(--font-weight-bold);  /* 700 */
}

p {
  font-family: var(--font-family-noto-sans);  /* Noto Sans */
  font-size: var(--text-base);                 /* Fluid 16-18px */
  font-weight: var(--font-weight-normal);      /* 400 */
}

code {
  font-family: var(--font-family-mono);  /* Courier New */
  font-size: 0.9em;
}
```

**User Customization:**
```css
/* User edits theme.css */
--font-family-lora: 'Playfair Display', serif;
--font-family-noto-sans: 'Inter', sans-serif;
/* All headings and body text automatically update! */
```

**Benefits:**
- ✅ Semantic HTML
- ✅ No inline styles
- ✅ Automatic styling
- ✅ User can change fonts globally
- ✅ Only 3 defined font families
- ✅ Fluid typography (responsive)

---

## 📊 Comparison Summary

| Aspect | ❌ Before | ✅ After |
|--------|-----------|----------|
| **Colors** | Hardcoded hex/names | CSS variables |
| **Fonts** | Multiple random fonts | 3 defined fonts |
| **Styling** | Inline styles | External CSS |
| **Dark Mode** | `dark:` classes | Automatic switching |
| **Customization** | Impossible | Edit 3 CSS files |
| **Maintenance** | Nightmare | Easy |
| **Code Size** | 2x larger | 50% smaller |
| **User Control** | None | Complete |

---

## 🎯 Key Takeaways

### **Before (Non-Compliant):**
- 🔴 Hardcoded colors everywhere
- 🔴 Random fonts (Arial, Helvetica, Georgia, etc.)
- 🔴 Inline styles on every element
- 🔴 `dark:` classes duplicating code
- 🔴 User has zero customization
- 🔴 Maintenance nightmare
- 🔴 No consistency

### **After (Design System Compliant):**
- 🟢 All colors use CSS variables
- 🟢 Only 3 defined fonts (Lora, Noto Sans, Courier New)
- 🟢 External CSS files with BEM naming
- 🟢 Automatic dark mode (no `dark:` classes)
- 🟢 **User can customize everything by editing 3 CSS files!**
- 🟢 Easy maintenance
- 🟢 Complete consistency

---

## 🚀 Migration Checklist

When migrating existing code:

1. **Remove inline styles** → Move to external CSS file
2. **Replace hex colors** → Use `var(--primary)`, `var(--background)`, etc.
3. **Replace hardcoded fonts** → Use `var(--font-family-lora)`, etc.
4. **Remove dark: classes** → Use CSS variables that auto-switch
5. **Add BEM classes** → `.wp-pattern-*`, `.wp-card-*`, etc.
6. **Test in both modes** → Light and dark
7. **Run verification** → `./scripts/verify-compliance.sh`

---

## 📚 Resources

- **Complete Guide:** `/docs/MIGRATION-GUIDE.md`
- **Template:** `/docs/COMPONENT-TEMPLATE.md`
- **Rules:** `/docs/DESIGN-SYSTEM-ENFORCEMENT.md`
- **Variables:** `/docs/CSS-VARIABLES.md`

---

**The difference is night and day!** 🌓

**Before:** Hardcoded mess, zero user control  
**After:** Clean, maintainable, fully customizable  

**Users love it. Developers love it. Everyone wins!** 🎉
