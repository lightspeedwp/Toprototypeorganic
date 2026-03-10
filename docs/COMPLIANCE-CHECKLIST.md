# ✅ DESIGN SYSTEM COMPLIANCE CHECKLIST

**Ensure all new components follow the WordPress BEM CSS design system**

**Last Updated:** February 24, 2026

---

## 📋 **BEFORE WRITING ANY CODE**

Before creating a new component, component variant, or UI element, review this checklist!

---

## 🎨 **CSS VARIABLES COMPLIANCE**

### **Colors**

- [ ] **NO hardcoded colors** - Never use `#hex`, `rgb()`, or named colors directly
- [ ] **Use semantic tokens** - Always use `var(--color-*)` variables
- [ ] **Test both modes** - Verify colors work in light and dark mode

**❌ NEVER DO THIS:**
```css
.component {
  background-color: #548235;  /* ❌ Hardcoded color */
  color: white;               /* ❌ Named color */
  border: 1px solid rgb(226, 232, 240); /* ❌ Hardcoded RGB */
}
```

**✅ ALWAYS DO THIS:**
```css
.wp-pattern-component {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  border: 1px solid var(--color-border);
}
```

**Available Color Variables:**
```css
/* Brand Colors */
var(--color-primary)
var(--color-primary-foreground)
var(--color-secondary)
var(--color-secondary-foreground)
var(--color-accent)
var(--color-accent-foreground)

/* Surface Colors */
var(--color-background)
var(--color-foreground)
var(--color-card)
var(--color-card-foreground)
var(--color-muted)
var(--color-muted-foreground)

/* UI Colors */
var(--color-border)
var(--color-ring)
var(--color-input)
```

---

### **Typography**

- [ ] **NO hardcoded fonts** - Never use font-family with literal names
- [ ] **Use defined fonts ONLY** - Lora, Noto Sans, Courier New
- [ ] **Use font variables** - Always use `var(--font-family-*)`
- [ ] **Use size variables** - Always use `var(--text-*)`
- [ ] **Use weight variables** - Always use `var(--font-weight-*)`

**❌ NEVER DO THIS:**
```css
.component {
  font-family: "Arial", sans-serif;  /* ❌ Wrong font */
  font-size: 24px;                   /* ❌ Hardcoded size */
  font-weight: 600;                  /* ❌ Hardcoded weight */
}
```

**✅ ALWAYS DO THIS:**
```css
.wp-pattern-component__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
}
```

**Available Font Variables:**
```css
/* Font Families (ONLY these 3!) */
var(--font-family-lora)          /* Serif - Headings */
var(--font-family-noto-sans)     /* Sans-serif - Body */
var(--font-family-courier-new)   /* Monospace - Code */

/* Font Sizes */
var(--text-6xl)   /* 60px - H1 */
var(--text-4xl)   /* 36px - H2 */
var(--text-3xl)   /* 30px - H3 */
var(--text-2xl)   /* 24px - H4 */
var(--text-xl)    /* 20px - H5 */
var(--text-lg)    /* 18px - H6 */
var(--text-base)  /* 16px - Body */
var(--text-sm)    /* 14px - Small */
var(--text-xs)    /* 12px - Extra Small */

/* Font Weights */
var(--font-weight-bold)      /* 700 - H1 */
var(--font-weight-semibold)  /* 600 - H2, H3 */
var(--font-weight-medium)    /* 500 - H4-H6, buttons */
var(--font-weight-normal)    /* 400 - Body */
```

**Typography Rules:**
- ✅ Headings (H1-H6) → Lora (serif)
- ✅ Body text (p, span) → Noto Sans (sans-serif)
- ✅ Code (code, pre) → Courier New (monospace)
- ✅ Buttons, labels → Noto Sans (sans-serif)

---

### **Spacing**

- [ ] **NO hardcoded spacing** - Never use fixed pixel values
- [ ] **Use spacing variables** - Use `var(--spacing-*)` for sections/gaps
- [ ] **Use Tailwind scale** - Use Tailwind classes (p-4, mb-6, etc.) for fixed spacing
- [ ] **Mobile-first** - Write mobile styles first, then use media queries

**❌ NEVER DO THIS:**
```css
.component {
  padding: 60px;           /* ❌ Hardcoded spacing */
  margin-bottom: 48px;     /* ❌ Hardcoded spacing */
  gap: 32px;               /* ❌ Hardcoded gap */
}
```

**✅ ALWAYS DO THIS:**
```css
.wp-pattern-component {
  padding-top: var(--spacing-section-lg);
  padding-bottom: var(--spacing-section-lg);
  gap: var(--spacing-gap-md);
}

/* OR use Tailwind classes */
.wp-pattern-component {
  padding-left: 1rem;    /* 16px */
  padding-right: 1rem;   /* 16px */
  margin-bottom: 3rem;   /* 48px */
}
```

**Available Spacing Variables:**
```css
/* Section Spacing (fluid responsive) */
var(--spacing-section-xl)  /* 96-160px */
var(--spacing-section-lg)  /* 64-96px */
var(--spacing-section-md)  /* 48-80px */
var(--spacing-section-sm)  /* 32-64px */

/* Gap Spacing (fluid responsive) */
var(--spacing-gap-lg)      /* 32-48px */
var(--spacing-gap-md)      /* 24-40px */
var(--spacing-gap-sm)      /* 16-32px */
```

---

### **Borders & Radius**

- [ ] **NO hardcoded borders** - Use `var(--color-border)`
- [ ] **NO hardcoded radius** - Use `var(--radius-*)`

**❌ NEVER DO THIS:**
```css
.component {
  border: 1px solid #e2e8f0;  /* ❌ Hardcoded color */
  border-radius: 8px;         /* ❌ Hardcoded radius */
}
```

**✅ ALWAYS DO THIS:**
```css
.wp-pattern-component {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}
```

**Available Radius Variables:**
```css
var(--radius-sm)    /* 2px */
var(--radius-md)    /* 4px */
var(--radius-lg)    /* 6px */
var(--radius-xl)    /* 8px */
var(--radius-full)  /* Circle */
```

---

### **Shadows**

- [ ] **NO hardcoded shadows** - Use `var(--elevation-*)`

**❌ NEVER DO THIS:**
```css
.component {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);  /* ❌ Hardcoded shadow */
}
```

**✅ ALWAYS DO THIS:**
```css
.wp-pattern-component {
  box-shadow: var(--elevation-sm);
}
```

**Available Shadow Variables:**
```css
var(--elevation-sm)  /* Subtle shadow */
var(--elevation-md)  /* Medium shadow */
var(--elevation-lg)  /* Large shadow */
```

---

## 🏗️ **BEM NAMING COMPLIANCE**

### **Naming Convention**

- [ ] **Use WordPress BEM** - `.wp-{type}-{name}__{element}--{modifier}`
- [ ] **Follow component type** - part, pattern, or card
- [ ] **No generic names** - Always prefix with `.wp-*`

**Component Types:**

```css
/* Template Parts */
.wp-part-header
.wp-part-header__nav
.wp-part-header__nav--open

/* Pattern Components */
.wp-pattern-hero
.wp-pattern-hero__title
.wp-pattern-hero--minimal

/* Card Components */
.wp-card-tour
.wp-card-tour__image
.wp-card-tour--featured
```

**Naming Rules:**
- ✅ Block: `.wp-{type}-{name}`
- ✅ Element: `.wp-{type}-{name}__{element}`
- ✅ Modifier: `.wp-{type}-{name}--{modifier}` or `.wp-{type}-{name}__{element}--{modifier}`
- ❌ Never: `.hero`, `.card`, `.button` (not WordPress-aligned)

---

## 📁 **FILE STRUCTURE COMPLIANCE**

### **CSS Files**

- [ ] **Create dedicated CSS file** - One file per component
- [ ] **Use correct directory** - parts/, patterns/, or templates/
- [ ] **Import in global.css** - Add @import statement

**File Locations:**
```
/src/styles/
├── parts/           # Template parts (Header, Footer)
├── patterns/        # Pattern components (Hero, Cards, CTA, etc.)
└── templates/       # Template styles (Home, Archive, Single, etc.)
```

**Example:**
1. Create: `/src/styles/patterns/my-component.css`
2. Import in `/src/styles/global.css`:
   ```css
   @import './patterns/my-component.css';
   ```

---

### **React Components**

- [ ] **Use correct directory** - parts/ or patterns/
- [ ] **Match CSS file name** - Component name matches CSS file
- [ ] **Import CSS classes** - Use BEM classes in className

**File Locations:**
```
/src/app/components/
├── parts/           # Template parts
└── patterns/        # Pattern components
```

---

## 🌗 **DARK MODE COMPLIANCE**

### **Dark Mode Rules**

- [ ] **NO `dark:` classes** - Never use Tailwind dark: prefix
- [ ] **Use CSS variables** - Colors adapt automatically
- [ ] **Test both modes** - Always verify light and dark

**❌ NEVER DO THIS:**
```tsx
<div className="bg-white dark:bg-slate-800">
  {/* ❌ Using dark: classes */}
</div>
```

**✅ ALWAYS DO THIS:**
```tsx
<div className="wp-pattern-component">
  {/* ✅ CSS variables handle dark mode automatically */}
</div>
```

**Why?**
- CSS variables in `theme-light.css` and `theme-dark.css` handle color switching
- `.dark` class on `<html>` triggers variable override
- Zero JavaScript needed for color changes

---

## ♿ **ACCESSIBILITY COMPLIANCE**

### **Semantic HTML**

- [ ] **Use semantic elements** - h1-h6, nav, article, section, etc.
- [ ] **NO generic divs** - Use appropriate HTML5 elements
- [ ] **Heading hierarchy** - One H1, logical H2→H3→H4 order

**❌ NEVER DO THIS:**
```tsx
<div className="heading">Title</div>  {/* ❌ Not semantic */}
```

**✅ ALWAYS DO THIS:**
```tsx
<h2>Title</h2>  {/* ✅ Semantic heading */}
```

---

### **ARIA Labels**

- [ ] **Label icon buttons** - Add aria-label to buttons without text
- [ ] **Label form inputs** - Use <label> or aria-label
- [ ] **Current state** - Use aria-current on active items

**Example:**
```tsx
{/* Icon button with label */}
<button
  aria-label="Close menu"
  className="wp-pattern-component__close"
>
  <X className="w-6 h-6" />
</button>

{/* Active navigation item */}
<a
  href="/about"
  aria-current={isActive ? "page" : undefined}
  className="wp-part-header__nav-link"
>
  About
</a>
```

---

### **Keyboard Navigation**

- [ ] **Focus states** - Use `var(--color-ring)` for focus outlines
- [ ] **Tab order** - Logical keyboard navigation
- [ ] **Interactive elements** - All clickable items keyboard-accessible

**Example:**
```css
.wp-pattern-component__button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
```

---

### **Color Contrast**

- [ ] **WCAG AA compliance** - Minimum 4.5:1 for normal text, 3:1 for large text
- [ ] **Test with tools** - Use browser DevTools or online checkers
- [ ] **Both modes** - Verify contrast in light and dark mode

**Tools:**
- Chrome DevTools → Lighthouse → Accessibility
- https://webaim.org/resources/contrastchecker/

---

## 📱 **RESPONSIVE DESIGN COMPLIANCE**

### **Mobile-First Approach**

- [ ] **Write mobile first** - Default styles for mobile
- [ ] **Add media queries** - Use `@media (min-width: ...)` for larger screens
- [ ] **Test all breakpoints** - Mobile (< 768px), Tablet (768-1023px), Desktop (1024px+)

**Breakpoints:**
```css
/* Mobile (default) */
.component {
  grid-template-columns: 1fr;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .component {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .component {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

### **Touch Targets**

- [ ] **Minimum size** - 44×44px for touch targets
- [ ] **Adequate spacing** - Space between interactive elements
- [ ] **Mobile testing** - Test on actual mobile devices

---

## 🚫 **PROHIBITED PATTERNS**

### **NEVER Use:**

**1. Inline Styles**
```tsx
{/* ❌ NEVER */}
<div style={{ backgroundColor: 'white', padding: '20px' }}>
```

**2. Hardcoded Colors**
```css
/* ❌ NEVER */
.component {
  background-color: #ffffff;
  color: #000000;
}
```

**3. Hardcoded Fonts**
```css
/* ❌ NEVER */
.component {
  font-family: "Arial", sans-serif;
}
```

**4. Dark Mode Classes**
```tsx
{/* ❌ NEVER */}
<div className="bg-white dark:bg-slate-800">
```

**5. Generic Class Names**
```css
/* ❌ NEVER */
.button { }
.card { }
.hero { }
```

**6. Non-Semantic HTML**
```tsx
{/* ❌ NEVER */}
<div className="heading">Title</div>
<span onClick={handleClick}>Button</span>
```

---

## ✅ **REQUIRED PATTERNS**

### **ALWAYS Use:**

**1. CSS Variables**
```css
/* ✅ ALWAYS */
.wp-pattern-component {
  background-color: var(--color-card);
  color: var(--color-foreground);
  font-family: var(--font-family-noto-sans);
  padding: var(--spacing-section-md);
}
```

**2. BEM Naming**
```css
/* ✅ ALWAYS */
.wp-pattern-component { }
.wp-pattern-component__title { }
.wp-pattern-component--variant { }
```

**3. Semantic HTML**
```tsx
{/* ✅ ALWAYS */}
<article className="wp-card-tour">
  <h3 className="wp-card-tour__title">Tour Name</h3>
  <p className="wp-card-tour__description">Description</p>
</article>
```

**4. External CSS Files**
```
✅ Create: /src/styles/patterns/component.css
✅ Import: @import './patterns/component.css';
```

---

## 🧪 **TESTING CHECKLIST**

### **Before Committing Code:**

**Visual Testing:**
- [ ] Verify light mode appearance
- [ ] Verify dark mode appearance
- [ ] Test mobile (< 768px)
- [ ] Test tablet (768-1023px)
- [ ] Test desktop (1024px+)

**Functional Testing:**
- [ ] All interactive elements work
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus states visible
- [ ] Hover states work
- [ ] Theme toggle works

**Accessibility Testing:**
- [ ] Heading hierarchy logical
- [ ] ARIA labels present where needed
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard-only navigation works
- [ ] Screen reader friendly (test if possible)

**Code Quality:**
- [ ] No hardcoded colors
- [ ] No hardcoded fonts
- [ ] No hardcoded spacing (or justified)
- [ ] No inline styles
- [ ] No dark: classes
- [ ] BEM naming consistent
- [ ] CSS file imported
- [ ] Component documented

---

## 📝 **CODE REVIEW CHECKLIST**

### **For Reviewers:**

**CSS Variables:**
- [ ] All colors use `var(--color-*)`
- [ ] All fonts use `var(--font-family-*)`
- [ ] All spacing uses variables or Tailwind scale
- [ ] All borders use `var(--color-border)`
- [ ] All radius uses `var(--radius-*)`

**BEM Naming:**
- [ ] Class names follow WordPress BEM
- [ ] Consistent naming throughout
- [ ] No generic class names

**Dark Mode:**
- [ ] No `dark:` classes used
- [ ] Colors work in both modes
- [ ] Tested in light and dark

**Accessibility:**
- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Focus states present
- [ ] Color contrast verified

**Responsive:**
- [ ] Mobile-first approach
- [ ] Media queries correct
- [ ] Works at all breakpoints

---

## 🎯 **QUICK REFERENCE**

### **Before Writing Code:**

1. ✅ Check CSS variable reference: `/docs/CSS-VARIABLES.md`
2. ✅ Review component examples: `/src/styles/patterns/*.css`
3. ✅ Follow BEM naming convention
4. ✅ Create dedicated CSS file
5. ✅ Import CSS file in global.css

### **While Writing Code:**

1. ✅ Use CSS variables for everything
2. ✅ Follow BEM naming
3. ✅ Use semantic HTML
4. ✅ Write mobile-first
5. ✅ Add ARIA labels where needed

### **After Writing Code:**

1. ✅ Test light and dark mode
2. ✅ Test all breakpoints
3. ✅ Test keyboard navigation
4. ✅ Verify accessibility
5. ✅ Run code review checklist

---

## 🎉 **COMPLIANCE BENEFITS**

**When you follow this checklist:**

✅ **Easy Theming** - Change entire site by editing CSS variables  
✅ **Automatic Dark Mode** - Colors adapt automatically  
✅ **Consistent Design** - All components look cohesive  
✅ **Accessibility** - WCAG 2.1 AA compliant  
✅ **Maintainability** - Easy to update and extend  
✅ **Performance** - Optimized CSS architecture  

---

## 📚 **ADDITIONAL RESOURCES**

- **CSS Variables Reference:** `/docs/CSS-VARIABLES.md`
- **Quick Start Guide:** `/docs/QUICK-START.md`
- **Style Guide:** `/docs/STYLE-GUIDE.md`
- **Component Examples:** `/src/styles/patterns/*.css`

---

**Last Updated:** February 24, 2026  
**Version:** 1.0

✅ **Use this checklist for EVERY new component!**
