# Design System Compliance Checklist

**Use this checklist when creating or reviewing any component to ensure 100% design system compliance.**

**Last Updated:** February 26, 2026

---

## ✅ Pre-Development Checklist

Before writing any code:

- [ ] Read `/docs/NEW-COMPONENT-GUIDE.md`
- [ ] Read `/docs/DESIGN-TOKENS-REFERENCE.md`
- [ ] Review existing similar components
- [ ] Check `/guidelines/Guidelines.md` for project rules

---

## 🎨 Color Compliance

### ❌ NEVER DO:

```tsx
// ❌ Hardcoded hex colors
<div style={{ backgroundColor: '#4a7311' }}>

// ❌ Hardcoded named colors
<div style={{ color: 'green' }}>

// ❌ Hardcoded RGB
<div style={{ backgroundColor: 'rgb(74, 115, 17)' }}>

// ❌ Random Tailwind colors
<div className="bg-green-600 text-white">
```

### ✅ ALWAYS DO:

```tsx
// ✅ CSS variables via Tailwind utilities
<div className="bg-primary text-primary-foreground">

// ✅ CSS variables in external CSS
.my-component {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

// ✅ Semantic color tokens
<div className="bg-card text-card-foreground border border-border">
```

### Available Color Variables:

```css
/* Primary Colors */
var(--primary)
var(--secondary)
var(--accent)

/* Backgrounds */
var(--background)
var(--card)
var(--muted)
var(--popover)

/* Text Colors */
var(--foreground)
var(--muted-foreground)
var(--card-foreground)
var(--popover-foreground)

/* Borders & Focus */
var(--border)
var(--input)
var(--ring)

/* Semantic */
var(--success)
var(--warning)
var(--destructive)
var(--info)
```

**Checklist:**
- [ ] No hardcoded colors anywhere
- [ ] All colors use `var(--token-name)`
- [ ] Uses semantic tokens (primary, card, muted, etc.)
- [ ] Tested in light mode
- [ ] Tested in dark mode

---

## 🔤 Typography Compliance

### ❌ NEVER DO:

```tsx
// ❌ Random font families
<h1 style={{ fontFamily: 'Arial' }}>

// ❌ Hardcoded font families
<p className="font-['Helvetica']">

// ❌ Google Fonts other than Lora/Noto Sans
@import url('https://fonts.googleapis.com/css2?family=Roboto');
```

### ✅ ALWAYS DO:

```css
/* ✅ Only these 3 fonts allowed */

/* Serif - For headings */
font-family: var(--font-family-lora);
/* or */ .font-serif

/* Sans-serif - For body text */
font-family: var(--font-family-noto-sans);
/* or */ .font-sans

/* Monospace - For code */
font-family: var(--font-family-mono);
/* or */ .font-mono
```

### Font Size Variables:

```css
var(--text-xs)      /* 12px */
var(--text-sm)      /* 14px */
var(--text-base)    /* 16px */
var(--text-lg)      /* 18px */
var(--text-xl)      /* 20px */
var(--text-2xl)     /* 24px */
var(--text-3xl)     /* 30px */
var(--text-4xl)     /* 36px */
var(--text-5xl)     /* 48px */
var(--text-6xl)     /* 60px */
```

### Font Weight Variables:

```css
var(--font-weight-normal)     /* 400 */
var(--font-weight-medium)     /* 500 */
var(--font-weight-semibold)   /* 600 */
var(--font-weight-bold)       /* 700 */
```

**Checklist:**
- [ ] Uses only Lora, Noto Sans, or Courier New
- [ ] No other font families anywhere
- [ ] Font sizes use CSS variables or Tailwind classes
- [ ] Font weights use CSS variables or Tailwind classes
- [ ] Headings use Lora (serif)
- [ ] Body text uses Noto Sans (sans-serif)
- [ ] Code uses Courier New (monospace)

---

## 📏 Spacing Compliance

### ❌ NEVER DO:

```tsx
// ❌ Hardcoded pixel values
<div style={{ padding: '20px' }}>

// ❌ Hardcoded rem values
<div style={{ marginBottom: '2rem' }}>

// ❌ Random spacing
<div style={{ gap: '15px' }}>
```

### ✅ ALWAYS DO:

```css
/* ✅ Section spacing (fluid) */
padding-top: var(--spacing-section-sm);
padding-top: var(--spacing-section-md);
padding-top: var(--spacing-section-lg);

/* ✅ Gap spacing (fluid) */
gap: var(--spacing-gap-sm);
gap: var(--spacing-gap-md);
gap: var(--spacing-gap-lg);

/* ✅ Container padding (fluid) */
padding-left: var(--spacing-container-sm);
padding-right: var(--spacing-container-sm);

/* ✅ Tailwind scale (fixed, for precision) */
p-4    /* 16px */
p-6    /* 24px */
gap-4  /* 16px */
mb-12  /* 48px */
```

**Checklist:**
- [ ] No hardcoded spacing values
- [ ] Uses CSS spacing variables for sections
- [ ] Uses Tailwind scale for component spacing
- [ ] Responsive spacing adjusts properly
- [ ] Spacing feels consistent with other components

---

## 🎭 Styling Method Compliance

### ❌ NEVER DO:

```tsx
// ❌ Inline styles
<div style={{ backgroundColor: 'white', color: 'green' }}>

// ❌ Style objects
const buttonStyle = {
  backgroundColor: '#4a7311',
  color: 'white'
};

// ❌ dark: Tailwind classes
<div className="bg-white dark:bg-slate-900">
```

### ✅ ALWAYS DO:

```tsx
// ✅ Tailwind utilities (map to CSS variables)
<div className="bg-card text-card-foreground border border-border">

// ✅ External CSS with BEM naming
<div className="wp-pattern-my-component">

// ✅ CSS with .dark selector for dark mode
.my-component {
  background-color: var(--card);
}

.dark .my-component {
  /* Usually not needed - variables auto-switch */
  /* Only for specific dark mode adjustments */
}
```

**Checklist:**
- [ ] No inline `style` attributes
- [ ] No style objects in JSX
- [ ] No `dark:` Tailwind classes
- [ ] Uses external CSS files with BEM naming
- [ ] Uses Tailwind utilities that map to CSS variables
- [ ] Dark mode handled via CSS variables or `.dark` selector

---

## 🏗️ Component Structure Compliance

### ❌ NEVER DO:

```tsx
// ❌ Random class names
<div className="my-card">
<div className="card-title">

// ❌ No semantic HTML
<div className="heading">Title</div>
<div className="button" onClick={...}>
```

### ✅ ALWAYS DO:

```tsx
// ✅ BEM naming convention
<div className="wp-pattern-my-card">
  <h3 className="wp-pattern-my-card__title">Title</h3>
  <p className="wp-pattern-my-card__description">Description</p>
</div>

// ✅ Semantic HTML
<h2>Section Title</h2>
<button onClick={...}>Click Me</button>
<nav>...</nav>
<article>...</article>
```

**BEM Structure:**
```
.wp-{category}-{component}                // Block
.wp-{category}-{component}__element       // Element
.wp-{category}-{component}--modifier      // Modifier
```

**Categories:**
- `wp-pattern-*` - Content patterns
- `wp-block-*` - WordPress blocks
- `wp-part-*` - Template parts
- `wp-section-*` - Section layouts

**Checklist:**
- [ ] Uses BEM naming convention
- [ ] Class names follow WordPress alignment
- [ ] Uses semantic HTML elements
- [ ] No generic class names (`.card`, `.button`, etc.)
- [ ] Component name matches CSS file name

---

## 📁 File Organization Compliance

### ✅ Required Files:

**React Component:**
```
/src/app/components/{category}/{ComponentName}.tsx
```

**CSS File:**
```
/src/styles/{category}/{component-name}.css
```

**Import in global.css:**
```css
@import './{category}/{component-name}.css';
```

**Checklist:**
- [ ] React component in correct folder
- [ ] CSS file created in matching folder
- [ ] CSS imported in global.css
- [ ] Component has proper documentation comments
- [ ] CSS has proper documentation header

---

## 🌗 Dark Mode Compliance

### ❌ NEVER DO:

```tsx
// ❌ dark: Tailwind classes
<div className="bg-white dark:bg-black">

// ❌ Conditional classes based on theme
<div className={isDark ? 'bg-black' : 'bg-white'}>

// ❌ JavaScript theme switching
const bgColor = theme === 'dark' ? '#000' : '#fff';
```

### ✅ ALWAYS DO:

```css
/* ✅ CSS variables auto-switch */
.my-component {
  background-color: var(--card);
  color: var(--card-foreground);
}

/* ✅ .dark selector for specific adjustments */
.my-component__icon-wrapper {
  background-color: rgba(74, 115, 17, 0.1);
}

.dark .my-component__icon-wrapper {
  background-color: rgba(144, 186, 72, 0.1);
}
```

**Checklist:**
- [ ] No `dark:` Tailwind classes
- [ ] Uses CSS variables that auto-switch
- [ ] Only uses `.dark` selector for opacity/transparency adjustments
- [ ] Tested in light mode
- [ ] Tested in dark mode
- [ ] Both modes look good

---

## ♿ Accessibility Compliance

**Checklist:**
- [ ] Semantic HTML elements used
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] All interactive elements keyboard-reachable
- [ ] Focus states visible (uses `var(--ring)`)
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] ARIA labels where needed
- [ ] Touch targets minimum 44px × 44px
- [ ] Works with screen readers
- [ ] Respects `prefers-reduced-motion`

---

## 📱 Responsive Compliance

**Checklist:**
- [ ] Looks good on mobile (320px - 767px)
- [ ] Looks good on tablet (768px - 1023px)
- [ ] Looks good on desktop (1024px+)
- [ ] Uses Tailwind responsive prefixes (`md:`, `lg:`)
- [ ] Fluid spacing adjusts properly
- [ ] No horizontal scroll on mobile
- [ ] Touch-friendly on mobile devices

---

## 🧪 Testing Checklist

Before submitting component:

### Visual Testing:
- [ ] Viewed in light mode
- [ ] Viewed in dark mode
- [ ] Tested on mobile viewport
- [ ] Tested on tablet viewport
- [ ] Tested on desktop viewport
- [ ] Tested with different content lengths

### Functional Testing:
- [ ] All interactive elements work
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Hover states work
- [ ] Links navigate correctly
- [ ] Buttons trigger actions

### Design System Testing:
- [ ] No hardcoded colors
- [ ] No hardcoded fonts
- [ ] No hardcoded spacing
- [ ] No inline styles
- [ ] No `dark:` classes
- [ ] Only uses defined fonts (Lora, Noto Sans, Courier New)
- [ ] All styling via CSS variables

### Customization Testing:
- [ ] Changed `--primary` in theme-light.css
- [ ] Verified component updated automatically
- [ ] Changed font size variables
- [ ] Verified typography updated
- [ ] Changed spacing variables
- [ ] Verified layout adjusted

---

## 📦 Documentation Checklist

**Component File:**
- [ ] JSDoc comment at top
- [ ] Props interface documented
- [ ] Usage example in comments
- [ ] References CSS file in comments

**CSS File:**
- [ ] Documentation header
- [ ] BEM structure explained
- [ ] References component file
- [ ] References theme files

---

## 🎯 Quick Reference

### Good Examples to Study:
- `/src/app/components/patterns/FeatureCard.tsx`
- `/src/app/components/common/Logo.tsx`
- `/src/app/pages/DesignSystemExample.tsx`

### CSS Examples:
- `/src/styles/patterns/feature-card.css`
- `/src/styles/common/logo.css`
- `/src/styles/pages/design-system-example.css`

### Documentation:
- `/docs/NEW-COMPONENT-GUIDE.md`
- `/docs/DESIGN-TOKENS-REFERENCE.md`
- `/guidelines/Guidelines.md`

---

## 🚀 Final Verification

Before considering component complete:

1. **Run through entire checklist** above
2. **View `/dev-tools/design-system`** to see how tokens work
3. **View `/dev-tools/design-system-example`** to see real-world usage
4. **Test customization** by editing CSS files
5. **Verify component updates automatically**

**If you can answer YES to all these questions, you're done:**

- ✅ Can users customize by editing CSS files only?
- ✅ Does it work in both light and dark mode?
- ✅ Does it use only the 3 defined fonts?
- ✅ Are there zero hardcoded values?
- ✅ Does it follow BEM naming?
- ✅ Is it accessible (WCAG AA)?
- ✅ Is it responsive?
- ✅ Is it documented?

---

## 📞 Need Help?

**Read these in order:**
1. `/docs/NEW-COMPONENT-GUIDE.md` - How to build components
2. `/docs/DESIGN-TOKENS-REFERENCE.md` - Available CSS variables
3. `/guidelines/Guidelines.md` - Project guidelines

**View these examples:**
1. `/dev-tools/design-system` - Token showcase
2. `/dev-tools/design-system-example` - Real-world page

**Study these components:**
1. `FeatureCard.tsx` + `feature-card.css` - Perfect example
2. `Logo.tsx` + `logo.css` - Simple component
3. `DesignSystemExample.tsx` + CSS - Complete page

---

**Remember:** If users can't customize it by editing CSS files, it's not compliant! 🎨
