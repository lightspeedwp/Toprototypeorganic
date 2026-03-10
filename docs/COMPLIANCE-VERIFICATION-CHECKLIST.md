# ✅ Design System Compliance Verification

**Use this checklist to verify ANY component follows design system rules.**

---

## 🎯 Quick Verification (30 seconds)

Run this automated check:

```bash
./scripts/verify-compliance.sh
```

If it passes all 10 checks, you're good! ✅

If not, follow the detailed checklist below.

---

## 📋 Manual Verification Checklist

### **1. Colors** ✅

**Check:** Open the `.tsx` file and search for:
- [ ] No `#` followed by 6 characters (hex colors like `#4a7311`)
- [ ] No `rgb(` or `rgba(` color values
- [ ] No color names (`white`, `black`, `red`, `blue`, etc.)
- [ ] No Tailwind color classes (`bg-green-600`, `text-blue-500`, etc.)

**Should use:**
- ✅ `bg-primary`, `text-primary-foreground`
- ✅ `bg-card`, `text-card-foreground`
- ✅ `bg-muted`, `text-muted-foreground`
- ✅ `border-border`, `ring-ring`
- ✅ Or CSS classes with `var(--primary)` in CSS file

**Exception:** Logo SVG brand colors (acceptable)

---

### **2. Fonts** ✅

**Check:** Open the `.tsx` and `.css` files and search for:
- [ ] No `font-family:` with hardcoded fonts (`Arial`, `Helvetica`, `Georgia`, etc.)
- [ ] No `fontFamily:` in inline styles

**Should use in CSS:**
- ✅ `font-family: var(--font-family-lora);` (for headings, labels)
- ✅ `font-family: var(--font-family-noto-sans);` (for body, UI)
- ✅ `font-family: var(--font-family-mono);` (for code)

**Or use Tailwind classes:**
- ✅ `font-serif` → Lora
- ✅ `font-sans` → Noto Sans
- ✅ `font-mono` → Courier New

**Only these 3 fonts are allowed. No others.**

---

### **3. Inline Styles** ✅

**Check:** Open the `.tsx` file and search for:
- [ ] No `style={{` anywhere in the component

**Exception:** Dynamic calculated values (width/height from props) are acceptable:
```tsx
// ✅ OK - Dynamic value calculated from props
<div style={{ width: `${width}px` }}>

// ❌ NOT OK - Static styling
<div style={{ backgroundColor: 'white', padding: '24px' }}>
```

**Should use:**
- ✅ External CSS file with CSS classes
- ✅ Tailwind utility classes
- ✅ BEM naming convention (`.wp-pattern-*__element`)

---

### **4. Dark Mode** ✅

**Check:** Open the `.tsx` file and search for:
- [ ] No `dark:` prefix in className
- [ ] No `dark:bg-*`, `dark:text-*`, `dark:border-*`, etc.

**Should use:**
- ✅ CSS variables that automatically switch (`var(--background)`, `var(--foreground)`)
- ✅ Single set of classes (no duplicates for dark mode)

**Example:**
```tsx
// ❌ WRONG
<div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">

// ✅ CORRECT
<div className="bg-background text-foreground">
```

---

### **5. CSS Variables** ✅

**Check:** Open the `.css` file and verify:

**Colors:**
- [ ] Uses `var(--primary)`, `var(--secondary)`, `var(--accent)`
- [ ] Uses `var(--background)`, `var(--foreground)`
- [ ] Uses `var(--card)`, `var(--card-foreground)`
- [ ] Uses `var(--muted)`, `var(--muted-foreground)`
- [ ] Uses `var(--border)`, `var(--input)`, `var(--ring)`
- [ ] Uses `var(--success)`, `var(--warning)`, `var(--destructive)`, `var(--info)`

**Typography:**
- [ ] Uses `var(--font-family-lora)` or `var(--font-family-noto-sans)` or `var(--font-family-mono)`
- [ ] Uses `var(--text-6xl)` through `var(--text-xs)` for font sizes
- [ ] Uses `var(--font-weight-bold)`, `var(--font-weight-semibold)`, etc.
- [ ] Uses `var(--leading-tight)`, `var(--leading-normal)`, etc. for line heights
- [ ] Uses `var(--tracking-tight)`, `var(--tracking-normal)`, etc. for letter spacing

**Spacing:**
- [ ] Uses `var(--spacing-section-*)` for section padding
- [ ] Uses `var(--spacing-gap-*)` for grid/flex gaps
- [ ] Uses `var(--spacing-element-*)` for element spacing

**Radius:**
- [ ] Uses `var(--radius-sm)` through `var(--radius-full)` for border-radius

**Shadows:**
- [ ] Uses `var(--elevation-sm)` through `var(--elevation-xl)` for box-shadow

---

### **6. External CSS File** ✅

**Check:** Component has corresponding CSS file:
- [ ] Component: `/src/app/components/patterns/MyComponent.tsx`
- [ ] CSS File: `/src/styles/patterns/my-component.css`
- [ ] CSS imported in `/src/styles/index.css`

**Example:**
```css
/* Add to /src/styles/index.css */
@import './patterns/my-component.css';
```

---

### **7. BEM Naming** ✅

**Check:** CSS classes follow BEM convention:
- [ ] Block: `.wp-pattern-mycomponent`
- [ ] Element: `.wp-pattern-mycomponent__title`
- [ ] Modifier: `.wp-pattern-mycomponent--primary`

**Pattern prefixes:**
- `.wp-pattern-*` - Pattern components
- `.wp-card-*` - Card components
- `.wp-section-*` - Section components
- `.wp-part-*` - Template parts
- `.wp-template-*` - Templates

**Example:**
```css
.wp-pattern-notification {
  /* Block */
}

.wp-pattern-notification__title {
  /* Element */
}

.wp-pattern-notification--success {
  /* Modifier */
}
```

---

### **8. Semantic HTML** ✅

**Check:** Uses proper HTML elements:
- [ ] `<h1>`, `<h2>`, `<h3>` for headings (not `<div>` with class)
- [ ] `<p>` for paragraphs
- [ ] `<button>` for clickable actions
- [ ] `<a>` for navigation links
- [ ] `<nav>` for navigation sections
- [ ] `<article>` for content blocks
- [ ] `<section>` for page sections

**Avoid:**
```tsx
// ❌ WRONG
<div className="heading">Section Title</div>

// ✅ CORRECT
<h2>Section Title</h2>
```

---

### **9. Accessibility** ✅

**Check:**
- [ ] Buttons have `aria-label` when no visible text
- [ ] Images have `alt` text
- [ ] Form inputs have `<label>` elements
- [ ] Focus states visible (`:focus` with `var(--ring)`)
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Keyboard navigation works (tab through all interactive elements)

---

### **10. Responsive Design** ✅

**Check:** Component works on all screen sizes:
- [ ] Desktop (1920px+) ✅
- [ ] Laptop (1024px+) ✅
- [ ] Tablet (768px+) ✅
- [ ] Mobile (320px+) ✅

**Uses fluid spacing:**
- [ ] `var(--spacing-section-*)` - Scales with viewport
- [ ] `var(--text-*)` - Fluid typography (clamp values)
- [ ] Media queries for mobile-specific adjustments

---

## 🎨 Component Anatomy Checklist

Every component should have:

### **React Component (.tsx)**
- [ ] Imports from correct paths (relative imports)
- [ ] TypeScript interface for props
- [ ] JSDoc comment explaining component
- [ ] No inline styles (except dynamic values)
- [ ] BEM class names
- [ ] Semantic HTML elements
- [ ] Accessibility attributes

### **CSS File (.css)**
- [ ] JSDoc comment at top
- [ ] All colors use CSS variables
- [ ] All fonts use CSS variables
- [ ] All spacing uses CSS variables
- [ ] BEM naming convention
- [ ] Responsive media queries
- [ ] No hardcoded values

### **Integration**
- [ ] CSS imported in `/src/styles/index.css`
- [ ] Component exported from appropriate directory
- [ ] Used in example page or documentation

---

## 🚀 Final Verification Steps

### **Step 1: Visual Check**
1. Open component in browser
2. Check light mode ✅
3. Toggle to dark mode ✅
4. Verify colors change automatically
5. Check on mobile (responsive) ✅

### **Step 2: Code Review**
1. Search for `#` (hex colors) ❌ Should be 0 results
2. Search for `style={{` ❌ Should be 0 or only dynamic values
3. Search for `dark:` ❌ Should be 0 results
4. Search for `font-family:` ✅ Should only find CSS variables
5. Search for `Arial`, `Helvetica`, `Georgia` ❌ Should be 0 results

### **Step 3: Automated Check**
```bash
./scripts/verify-compliance.sh
```

Should see:
```
✅ Design System Compliance Check Complete
✅ All checks passed!
```

---

## 📊 Scoring

**Gold Standard (100%):**
- ✅ All 10 checks pass
- ✅ Zero hardcoded values
- ✅ Zero inline styles
- ✅ Zero dark: classes
- ✅ Perfect BEM naming
- ✅ Full accessibility
- ✅ Automatic dark mode

**Acceptable (90%+):**
- ✅ All critical checks pass
- ⚠️ Minor issues (e.g., 1-2 dynamic inline styles)
- ✅ Mostly compliant

**Needs Work (<90%):**
- ❌ Multiple violations
- ❌ Hardcoded colors/fonts
- ❌ Missing CSS file
- ❌ Needs refactoring

---

## 🎯 Quick Reference

**Colors:**
```css
var(--primary), var(--secondary), var(--accent)
var(--background), var(--foreground)
var(--card), var(--muted)
var(--success), var(--warning), var(--destructive), var(--info)
var(--border), var(--input), var(--ring)
```

**Fonts:**
```css
var(--font-family-lora)       /* Headings */
var(--font-family-noto-sans)  /* Body */
var(--font-family-mono)       /* Code */
```

**Sizes:**
```css
var(--text-6xl), var(--text-4xl), var(--text-2xl), var(--text-base), var(--text-sm)
```

**Spacing:**
```css
var(--spacing-section-md), var(--spacing-gap-lg)
```

**Radius:**
```css
var(--radius-sm), var(--radius-lg), var(--radius-full)
```

**Shadows:**
```css
var(--elevation-sm), var(--elevation-md), var(--elevation-lg)
```

---

## 💡 Remember

**If a user wants to change it, they should edit CSS variables, not React code.**

That's the golden rule! 🌟

---

## 📚 Resources

- **Rules:** `/docs/UI-GENERATION-RULES.md`
- **Variables:** `/docs/CSS-VARIABLES.md`
- **Template:** `/docs/COMPONENT-TEMPLATE.md`
- **Examples:** `/docs/BEFORE-AFTER-EXAMPLES.md`

---

**Print this checklist and keep it next to your desk!** 📌
