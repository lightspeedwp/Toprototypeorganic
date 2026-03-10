# Design System Enforcement Guide

**Mandatory rules for ALL UI generation - no exceptions.**

---

## 🚨 CRITICAL: This Document is Law

**Every component, page, and element MUST follow these rules.**

If you're about to write React/CSS code, read this first.

---

## ✅ The Golden Rule

**ALL UI styling MUST use CSS variables from:**
- `/src/styles/theme-light.css` (light mode colors)
- `/src/styles/theme-dark.css` (dark mode colors)
- `/src/styles/theme.css` (typography, spacing, radius)

**If it's not a CSS variable from these files, you cannot use it.**

---

## 🎨 Colors - Mandatory Rules

### ✅ CORRECT - Use CSS Variables

**In React (Tailwind classes):**
```tsx
<div className="bg-primary text-primary-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-muted text-muted-foreground">
<div className="border-border">
```

**In CSS:**
```css
.my-component {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: 1px solid var(--border);
}
```

---

### ❌ FORBIDDEN - Hardcoded Colors

**Never use:**
```tsx
// ❌ Hex colors
<div style={{ backgroundColor: '#4a7311' }}>
<div className="bg-[#4a7311]">

// ❌ RGB colors
<div style={{ color: 'rgb(74, 115, 17)' }}>

// ❌ Color names
<div style={{ backgroundColor: 'green' }}>
<div style={{ color: 'white' }}>

// ❌ Hardcoded in CSS
.my-component {
  background-color: #4a7311; /* FORBIDDEN */
}
```

**Exception:** Comments are OK:
```tsx
// Primary color is #4a7311 ← This is fine (comment)
```

---

## 🔤 Typography - Mandatory Rules

### ✅ CORRECT - Use Defined Fonts

**ONLY 3 fonts are allowed:**

1. **Lora (Serif)** - For headings
   ```tsx
   <h1>Title</h1>  {/* Auto-uses Lora */}
   ```
   
   ```css
   .my-heading {
     font-family: var(--font-family-lora);
   }
   ```

2. **Noto Sans (Sans-serif)** - For body text
   ```tsx
   <p>Body text</p>  {/* Auto-uses Noto Sans */}
   ```
   
   ```css
   .my-text {
     font-family: var(--font-family-noto-sans);
   }
   ```

3. **Courier New (Monospace)** - For code
   ```tsx
   <code>Code</code>  {/* Auto-uses Courier New */}
   ```
   
   ```css
   .my-code {
     font-family: var(--font-family-mono);
   }
   ```

---

### ❌ FORBIDDEN - Other Fonts

**Never use:**
```tsx
// ❌ Arial, Helvetica, system fonts
<div style={{ fontFamily: 'Arial, sans-serif' }}>
<div style={{ fontFamily: 'Helvetica' }}>

// ❌ Random fonts
<div style={{ fontFamily: 'Inter, sans-serif' }}>
<div style={{ fontFamily: 'Roboto' }}>

// ❌ Hardcoded in CSS
.my-component {
  font-family: 'Arial', sans-serif; /* FORBIDDEN */
}
```

**If you need a font, it MUST be one of the 3 defined fonts.**

---

## 📐 Spacing - Mandatory Rules

### ✅ CORRECT - Use CSS Variables or Tailwind

**CSS Variables (fluid spacing):**
```css
.section {
  padding-top: var(--spacing-section-md);
  padding-bottom: var(--spacing-section-md);
}

.grid {
  gap: var(--spacing-gap-lg);
}

.container {
  padding-left: var(--spacing-container-sm);
  padding-right: var(--spacing-container-sm);
}
```

**Tailwind Classes (fixed spacing):**
```tsx
<div className="p-4 gap-6 mb-12">
<div className="py-8 px-4">
```

---

### ❌ FORBIDDEN - Hardcoded Spacing

**Never use:**
```tsx
// ❌ Inline styles with pixel values
<div style={{ padding: '20px' }}>
<div style={{ marginBottom: '16px' }}>

// ❌ Hardcoded in CSS
.my-component {
  padding: 20px; /* FORBIDDEN - use var() or rem */
  margin-bottom: 16px; /* FORBIDDEN */
}
```

**Use variables or Tailwind scale instead.**

---

## 🎭 Dark Mode - Mandatory Rules

### ✅ CORRECT - Use CSS Variables (Auto-Switch)

**CSS variables automatically switch for dark mode:**

```tsx
<div className="bg-background text-foreground">
<div className="bg-card text-card-foreground">
```

**In CSS:**
```css
.my-component {
  background-color: var(--background);
  color: var(--foreground);
}
```

**The variables change automatically when `.dark` class is on `<html>`:**
```css
/* theme-light.css */
:root {
  --background: #ffffff;
}

/* theme-dark.css */
.dark {
  --background: #1a1a1a;
}
```

---

### ❌ FORBIDDEN - dark: Classes

**Never use Tailwind dark: classes:**

```tsx
// ❌ FORBIDDEN
<div className="bg-white dark:bg-slate-900">
<div className="text-gray-900 dark:text-gray-100">
<div className="border-gray-200 dark:border-gray-700">
```

**Why forbidden?** 
- Users cannot customize dark mode via CSS files
- Violates the "one source of truth" principle
- CSS variables handle this automatically

---

## 🎨 Styling Method - Mandatory Rules

### ✅ CORRECT - External CSS with BEM

**Step 1: Create CSS file**
```css
/* /src/styles/patterns/my-component.css */
.wp-pattern-my-component {
  background-color: var(--card);
  color: var(--card-foreground);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
}

.wp-pattern-my-component__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-semibold);
}

.wp-pattern-my-component--primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
```

**Step 2: Import in global.css**
```css
@import './patterns/my-component.css';
```

**Step 3: Use in React**
```tsx
<div className="wp-pattern-my-component wp-pattern-my-component--primary">
  <h3 className="wp-pattern-my-component__title">Title</h3>
</div>
```

---

### ❌ FORBIDDEN - Inline Styles

**Never use:**
```tsx
// ❌ Inline style objects
<div style={{
  backgroundColor: 'var(--primary)',
  padding: '1rem',
  borderRadius: '8px'
}}>

// ❌ Even with CSS variables!
<div style={{ color: 'var(--foreground)' }}>
```

**Why forbidden?**
- Cannot be overridden by user CSS
- Hard to maintain
- Mixes styling with logic

**Exception:** Dynamic values calculated in JavaScript:
```tsx
// ✅ OK - value calculated dynamically
<div style={{ width: `${percentage}%` }}>
```

---

## 📛 BEM Naming - Mandatory Rules

### ✅ CORRECT - BEM Structure

```
.wp-{category}-{component}              // Block
.wp-{category}-{component}__element     // Element
.wp-{category}-{component}--modifier    // Modifier
```

**Categories:**
- `wp-pattern-*` - Content patterns
- `wp-block-*` - WordPress blocks
- `wp-part-*` - Template parts
- `wp-common-*` - Common utilities

**Example:**
```css
.wp-pattern-feature-card { }
.wp-pattern-feature-card__icon { }
.wp-pattern-feature-card__title { }
.wp-pattern-feature-card__description { }
.wp-pattern-feature-card--primary { }
.wp-pattern-feature-card--accent { }
```

---

### ❌ FORBIDDEN - Generic Names

**Never use:**
```css
/* ❌ Too generic */
.card { }
.button { }
.title { }

/* ❌ Conflicts with libraries */
.feature { }
.hero { }
```

**Why forbidden?**
- Conflicts with shadcn/ui
- Conflicts with other libraries
- Not semantic for WordPress

---

## 🧪 Verification Checklist

**Before submitting ANY component, verify:**

- [ ] No hex colors (`#4a7311`, `#ffffff`)
- [ ] No RGB colors (`rgb(74, 115, 17)`)
- [ ] No color names (`white`, `green`, `black`)
- [ ] No inline styles (`style={{...}}`) — use CSS custom property pattern for dynamic values
- [ ] No `dark:` classes
- [ ] Only uses Lora, Noto Sans, or Courier New
- [ ] Uses BEM naming (`.wp-pattern-*`)
- [ ] External CSS file created
- [ ] CSS imported in global.css
- [ ] Uses CSS variables for all colors
- [ ] Uses CSS variables or Tailwind for spacing
- [ ] No `href="#"` placeholder links — use `<button>` or real routes
- [ ] All `<img>` elements have appropriate `alt` text
- [ ] External links have `target="_blank"` + `rel="noopener noreferrer"` + `aria-label`
- [ ] Tested in light mode
- [ ] Tested in dark mode
- [ ] Customization works (change CSS variable, see update)

---

## 🛠️ Enforcement Tools

### **Automated Audit**

Run before committing:
```bash
./scripts/audit-design-system.sh
```

Checks for:
- Hardcoded colors
- Inline styles
- `dark:` classes
- Hardcoded fonts
- Hardcoded spacing

**Must pass with 0 violations before submitting.**

---

### **Manual Checks**

```bash
# Find hardcoded colors
grep -rn "#[0-9a-fA-F]\{6\}" src/app --include="*.tsx"

# Find inline styles
grep -rn "style={{" src/app --include="*.tsx"

# Find dark: classes
grep -rn "dark:" src/app --include="*.tsx"

# Find hardcoded fonts (common culprits)
grep -rn "Arial" src/app --include="*.tsx" --include="*.css"
grep -rn "Helvetica" src/app --include="*.tsx" --include="*.css"
grep -rn "Roboto" src/app --include="*.tsx" --include="*.css"
```

---

## 🚫 Common Violations & Fixes

### **Violation 1: Hardcoded Color**

❌ **Wrong:**
```tsx
<button style={{ backgroundColor: '#4a7311' }}>
```

✅ **Correct:**
```tsx
<button className="bg-primary text-primary-foreground">
```

---

### **Violation 2: Inline Styles**

❌ **Wrong:**
```tsx
<div style={{ padding: '1rem', borderRadius: '8px' }}>
```

✅ **Correct:**
```tsx
<div className="wp-pattern-my-component">
```

```css
.wp-pattern-my-component {
  padding: 1rem;
  border-radius: var(--radius-lg);
}
```

---

### **Violation 3: dark: Classes**

❌ **Wrong:**
```tsx
<div className="bg-white dark:bg-slate-900">
```

✅ **Correct:**
```tsx
<div className="bg-background">
```

---

### **Violation 4: Wrong Font**

❌ **Wrong:**
```tsx
<h1 style={{ fontFamily: 'Arial, sans-serif' }}>
```

✅ **Correct:**
```tsx
<h1>Title</h1>  {/* Auto-uses Lora */}
```

Or in CSS:
```css
h1 {
  font-family: var(--font-family-lora);
}
```

---

### **Violation 5: Hardcoded Spacing**

❌ **Wrong:**
```css
.section {
  padding-top: 80px;
  padding-bottom: 80px;
}
```

✅ **Correct:**
```css
.section {
  padding-top: var(--spacing-section-lg);
  padding-bottom: var(--spacing-section-lg);
}
```

---

## 📋 Quick Enforcement Checklist

**Print this and keep at your desk:**

### **Colors**
- ✅ Use `var(--primary)`, `var(--background)`, etc.
- ❌ No `#hex`, `rgb()`, or color names

### **Fonts**
- ✅ Only Lora, Noto Sans, Courier New
- ❌ No Arial, Helvetica, Inter, Roboto, etc.

### **Spacing**
- ✅ Use `var(--spacing-*)` or Tailwind classes
- ❌ No hardcoded pixels or rem values

### **Styling**
- ✅ External CSS files with BEM naming
- ❌ No inline styles (`style={{}}`)

### **Dark Mode**
- ✅ CSS variables auto-switch
- ❌ No `dark:` classes

### **Testing**
- ✅ Test in light mode
- ✅ Test in dark mode
- ✅ Test customization (change CSS var)
- ✅ Run audit script

---

## 🖼️ Image Alt Text - Mandatory Rules

**Updated:** March 4, 2026

### ✅ CORRECT - Descriptive Alt Text

**Meaningful images MUST have descriptive `alt` text:**
```tsx
// ✅ Descriptive alt for content images
<img src={user.avatar} alt={`Photo of ${user.name}`} />
<img src={tour.image} alt="Safari landscape in Kruger National Park" />
```

**Decorative images MUST use `alt=""` with `aria-hidden="true"`:**
```tsx
// ✅ Decorative/background images
<img src={bgImage} alt="" aria-hidden="true" className="wp-pattern-cta__background-image" />
```

### ❌ FORBIDDEN - Missing or Lazy Alt Text

```tsx
// ❌ No alt attribute at all
<img src={photo} />

// ❌ Empty alt on meaningful images
<img src={user.avatar} alt="" />

// ❌ Generic/useless alt text
<img src={destination.hero} alt="image" />
<img src={tour.photo} alt="photo" />
```

### Rules:
1. **Content images** → descriptive `alt` text (what the image shows)
2. **Decorative images** → `alt=""` + `aria-hidden="true"`
3. **Avatar/profile images** → `alt="Photo of {name}"`
4. **Never omit** the `alt` attribute entirely

---

## 🔗 Broken Links Prevention - Mandatory Rules

**Updated:** March 4, 2026

### ✅ CORRECT - Semantic Link Handling

**Links with real destinations:**
```tsx
// ✅ Internal page routes
<a href="/terms-conditions">Terms & Conditions</a>
<a href="/privacy-policy">Privacy Policy</a>

// ✅ External links with security attributes
<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
  <FacebookIcon />
</a>
```

**Interactive elements WITHOUT navigation:**
```tsx
// ✅ Use <button> for state-based actions
<button type="button" onClick={() => onPageChange(page)}>
  {page}
</button>

// ✅ Non-interactive display (addresses, labels)
<div className="flex items-center gap-3">
  <MapPinIcon /> <span>123 Travel St</span>
</div>
```

### ❌ FORBIDDEN - Placeholder Links

```tsx
// ❌ NEVER use href="#"
<a href="#">Click me</a>
<a href="#" onClick={(e) => { e.preventDefault(); doSomething(); }}>Action</a>

// ❌ NEVER use empty href
<a href="">Link</a>

// ❌ NEVER use javascript: void
<a href="javascript:void(0)">Action</a>
```

### Decision Tree:
1. **Has a URL destination?** → Use `<a href="/real-route">`
2. **Triggers a JS action?** → Use `<button type="button" onClick={...}>`
3. **External URL?** → Add `target="_blank"` + `rel="noopener noreferrer"` + `aria-label`
4. **Display-only (no interaction)?** → Use `<span>` or `<div>`, not `<a>`

---

## 🎨 Dynamic Styling Pattern - CSS Custom Properties

**Updated:** March 4, 2026

When a component needs **runtime-dynamic values** (calculated in JavaScript), use the **CSS Custom Property pattern** instead of inline `style={{}}` attributes.

### ✅ CORRECT - CSS Custom Property Pattern

**Step 1: Pass dynamic values as CSS variables in JSX:**
```tsx
// ✅ Dynamic grid columns
<div
  className="grid gap-6"
  style={{ '--grid-columns': columnCount } as React.CSSProperties}
>

// ✅ Dynamic background image + overlay
<div
  className="wp-group-block"
  style={{
    '--group-bg-image': `url(${imageUrl})`,
    '--overlay-opacity': 0.6,
  } as React.CSSProperties}
>

// ✅ Dynamic logo width
<img
  className="wp-common-logo"
  style={{ '--logo-width': width } as React.CSSProperties}
/>
```

**Step 2: Reference the CSS variable in CSS:**
```css
/* Grid columns */
.grid[style*="--grid-columns"] {
  grid-template-columns: repeat(var(--grid-columns, 3), minmax(0, 1fr));
}

/* Background image */
[style*="--group-bg-image"] {
  background-image: var(--group-bg-image);
}

/* Overlay opacity */
.wp-group-block__overlay {
  opacity: var(--overlay-opacity, 0.5);
}

/* Logo width */
.wp-common-logo {
  width: var(--logo-width, auto);
}
```

### ❌ FORBIDDEN - Direct Inline Styles

```tsx
// ❌ Direct CSS property in style
<div style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
<div style={{ opacity: overlayOpacity }}>
<img style={{ width: logoWidth }}>
```

### Exempt Categories (No Conversion Needed):

| Category | Example | Reason |
|----------|---------|--------|
| **motion/react** animation | `<motion.div style={{ y }}>` | Motion library requires `style` prop |
| **shadcn/ui** internals | `progress.tsx`, `chart.tsx` | Third-party library code |
| **Touch/gesture** handlers | `SwipeableCard.tsx`, `BottomSheet.tsx` | Rapid frame-by-frame updates |
| **Dev tool** specimens | `SpacingScale.tsx`, `RadiusSpecimens.tsx` | Already using `var()` references |

### ESLint Enforcement (Proposed):

```json
{
  "rules": {
    "react/forbid-dom-props": ["warn", {
      "forbid": [{
        "propName": "style",
        "message": "Use CSS custom properties pattern: style={{ '--my-var': value }} + CSS var(). See /docs/DESIGN-SYSTEM-ENFORCEMENT.md"
      }]
    }]
  }
}
```

**Note:** This rule should be set to `"warn"` (not `"error"`) to accommodate the exempt categories above. Exempted files can use `// eslint-disable-next-line react/forbid-dom-props` with a comment explaining the exemption.

---

## 🎯 Remember

**If you're about to use a value that's NOT a CSS variable from theme files, STOP.**

**Ask yourself:**
1. Is this color/font/spacing defined in theme files?
2. Am I using the CSS variable or Tailwind class?
3. Could a user customize this by editing CSS?

**If the answer to #3 is "no", you're doing it wrong.**

---

## 📚 More Resources

- **Quick Reference:** `/docs/QUICK-REFERENCE.md`
- **Component Guide:** `/docs/NEW-COMPONENT-GUIDE.md`
- **Token Reference:** `/docs/DESIGN-TOKENS-REFERENCE.md`
- **Compliance Checklist:** `/docs/DESIGN-SYSTEM-COMPLIANCE-CHECKLIST.md`
- **Troubleshooting:** `/docs/TROUBLESHOOTING.md`

---

**This is mandatory. No exceptions. Every component. Every page. Every element.** ✅