# Design System - Complete Implementation Guide

**A fully customizable design system using CSS variables.**

Users can customize the entire site by editing just 3 CSS files - no React code changes needed!

---

## 🎯 Quick Start

### For Users (Customization)

**Want to change your site's colors, fonts, or spacing?**

Edit these 3 files:

1. **`/src/styles/theme-light.css`** - Light mode colors
2. **`/src/styles/theme-dark.css`** - Dark mode colors
3. **`/src/styles/theme.css`** - Typography, spacing, radius

**That's it!** Save the files and refresh your browser. The entire site updates automatically.

**Example:** Change the primary color:

```css
/* In theme-light.css */
:root {
  --primary: #c0392b; /* Change from green to red */
}
```

**Result:** All buttons, links, icons, cards, and UI elements are now red! 🎨

---

### For Developers (Building Components)

**Want to create a new component?**

1. Read `/docs/NEW-COMPONENT-GUIDE.md`
2. Study `/src/app/components/patterns/FeatureCard.tsx` (example)
3. Copy the template and customize
4. All styling must use CSS variables from theme files

**Rules:**
- ✅ All colors via CSS variables
- ✅ Only 3 fonts (Lora, Noto Sans, Courier New)
- ✅ BEM naming convention
- ✅ No inline styles
- ✅ No `dark:` classes
- ✅ External CSS files only

---

## 📚 Documentation

### Essential Reading

1. **[NEW-COMPONENT-GUIDE.md](./NEW-COMPONENT-GUIDE.md)**
   - Complete guide for building components
   - Step-by-step instructions with code examples
   - Templates ready to copy-paste

2. **[DESIGN-TOKENS-REFERENCE.md](./DESIGN-TOKENS-REFERENCE.md)**
   - Quick reference for all CSS variables
   - Colors, typography, spacing, radius, shadows
   - Usage examples and common patterns

3. **[DESIGN-SYSTEM-COMPLIANCE-CHECKLIST.md](./DESIGN-SYSTEM-COMPLIANCE-CHECKLIST.md)**
   - Comprehensive checklist for all components
   - What to do and what NOT to do
   - Testing and verification steps

4. **[DESIGN-SYSTEM-AUDIT.md](./DESIGN-SYSTEM-AUDIT.md)**
   - Automated audit tools
   - Scripts to check for violations
   - CI/CD integration guide

---

## 🎨 Design System Features

### Colors

**All colors are customizable via CSS variables:**

```css
/* Primary Colors */
var(--primary)
var(--secondary)
var(--accent)

/* Backgrounds */
var(--background)
var(--card)
var(--muted)

/* Text Colors */
var(--foreground)
var(--muted-foreground)

/* Semantic Colors */
var(--success)
var(--warning)
var(--destructive)
var(--info)
```

**Dark mode is automatic** - CSS variables change when `.dark` class is present.

---

### Typography

**Only 3 font families allowed:**

1. **Lora (serif)** - For headings
   ```css
   font-family: var(--font-family-lora);
   ```

2. **Noto Sans (sans-serif)** - For body text
   ```css
   font-family: var(--font-family-noto-sans);
   ```

3. **Courier New (monospace)** - For code
   ```css
   font-family: var(--font-family-mono);
   ```

**Font sizes are fluid and responsive:**
```css
var(--text-xs)    /* 12px */
var(--text-sm)    /* 14px */
var(--text-base)  /* 16px */
var(--text-lg)    /* 18px */
var(--text-xl)    /* 20px */
var(--text-2xl)   /* 24px */
var(--text-3xl)   /* 30px */
var(--text-4xl)   /* 36px */
var(--text-5xl)   /* 48px */
var(--text-6xl)   /* 60px */
```

---

### Spacing

**Fluid spacing adapts to viewport:**

```css
/* Section Spacing (for major layout sections) */
var(--spacing-section-sm)  /* clamp(2rem, 4vw, 3rem) */
var(--spacing-section-md)  /* clamp(3rem, 6vw, 5rem) */
var(--spacing-section-lg)  /* clamp(4rem, 8vw, 7rem) */

/* Gap Spacing (for element spacing) */
var(--spacing-gap-sm)      /* clamp(0.75rem, 2vw, 1rem) */
var(--spacing-gap-md)      /* clamp(1rem, 3vw, 1.5rem) */
var(--spacing-gap-lg)      /* clamp(1.5rem, 4vw, 2rem) */
```

**Tailwind scale for precision:**
```tsx
<div className="p-4 gap-6 mb-12">
  {/* 16px, 24px, 48px - fixed values for precise layout */}
</div>
```

---

### Border Radius

```css
var(--radius-sm)   /* Small - 4px */
var(--radius-md)   /* Medium - 6px */
var(--radius-lg)   /* Large - 8px */
var(--radius-xl)   /* Extra Large - 10px */
var(--radius-full) /* Pill shape - 9999px */
```

---

### Shadows

```css
var(--elevation-sm)  /* Subtle shadow */
var(--elevation-md)  /* Medium shadow */
var(--elevation-lg)  /* Large shadow */
```

---

## 🖥️ View Live Examples

### Design System Showcase

**URL:** `/dev-tools/design-system`

**Shows:**
- All color tokens in action
- Complete typography scale
- Spacing demonstrations
- Border radius examples
- Component examples (buttons, cards, forms)
- How to customize

### Real-World Example Page

**URL:** `/dev-tools/design-system-example`

**Shows:**
- Complete landing page using design system
- Hero section with primary background
- Feature cards with all variants
- Stats section with custom styling
- How-it-works section
- CTA sections
- Testimonials
- All using CSS variables only!

---

## 🔧 Component Examples

### Study These Components

1. **FeatureCard** - Pattern component
   - File: `/src/app/components/patterns/FeatureCard.tsx`
   - CSS: `/src/styles/patterns/feature-card.css`
   - Features: Icon, title, description, 3 variants

2. **Logo** - Simple component
   - File: `/src/app/components/common/Logo.tsx`
   - CSS: `/src/styles/common/logo.css`
   - Features: Light/dark mode switching, size variants

3. **Button** - UI component
   - CSS: `/src/styles/components/button.css`
   - Variants: Primary, secondary, outline, ghost, destructive

4. **Form Elements** - Input components
   - CSS: `/src/styles/components/form.css`
   - Elements: Input, textarea, select, checkbox, radio

---

## 🎯 Design Principles

### 1. CSS Variables Only

**❌ Never do this:**
```tsx
<div style={{ backgroundColor: '#4a7311', color: 'white' }}>
```

**✅ Always do this:**
```tsx
<div className="bg-primary text-primary-foreground">
```

Or in CSS:
```css
.my-component {
  background-color: var(--primary);
  color: var(--primary-foreground);
}
```

---

### 2. No Inline Styles

**❌ Never do this:**
```tsx
<button style={{ padding: '20px', fontSize: '16px' }}>
```

**✅ Always do this:**
```tsx
<button className="button button--primary">
```

Or create a CSS class:
```css
.button--primary {
  padding: 0.75rem 1.5rem;
  font-size: var(--text-base);
}
```

---

### 3. No dark: Classes

**❌ Never do this:**
```tsx
<div className="bg-white dark:bg-slate-900">
```

**✅ Always do this:**
```tsx
<div className="bg-background">
```

The CSS variable automatically switches:
```css
/* Light mode */
:root {
  --background: #ffffff;
}

/* Dark mode */
.dark {
  --background: #1a1a1a;
}
```

---

### 4. Only Defined Fonts

**❌ Never do this:**
```tsx
<h1 style={{ fontFamily: 'Arial, Helvetica' }}>
```

**✅ Always do this:**
```tsx
<h1 className="font-serif">{/* Uses Lora */}</h1>
<p className="font-sans">{/* Uses Noto Sans */}</p>
<code className="font-mono">{/* Uses Courier New */}</code>
```

---

### 5. BEM Naming

**❌ Never do this:**
```tsx
<div className="card">
  <div className="title">Title</div>
</div>
```

**✅ Always do this:**
```tsx
<div className="wp-pattern-card">
  <h3 className="wp-pattern-card__title">Title</h3>
  <p className="wp-pattern-card__description">Description</p>
</div>
```

---

## 🧪 Testing & Validation

### Manual Testing

Before submitting any component:

1. **Visual Testing:**
   - [ ] Looks good in light mode
   - [ ] Looks good in dark mode
   - [ ] Responsive on mobile, tablet, desktop
   - [ ] Works with different content lengths

2. **Customization Testing:**
   - [ ] Edit `--primary` color in theme-light.css
   - [ ] Verify component updates automatically
   - [ ] Edit font size variables
   - [ ] Verify typography updates
   - [ ] Edit spacing variables
   - [ ] Verify layout adjusts

3. **Accessibility Testing:**
   - [ ] Keyboard navigation works
   - [ ] Focus states visible
   - [ ] Color contrast meets WCAG AA
   - [ ] Screen reader compatible

### Automated Testing

Run the audit script:

```bash
chmod +x scripts/audit-design-system.sh
./scripts/audit-design-system.sh
```

**Checks for:**
- Hardcoded colors
- Inline styles
- `dark:` classes
- Hardcoded fonts
- Hardcoded spacing

---

## 🚀 Getting Started Checklist

### For Users:

- [ ] Open `/src/styles/theme-light.css`
- [ ] Change `--primary` color to your brand color
- [ ] Save and refresh browser
- [ ] See entire site update automatically! 🎉

### For Developers:

- [ ] Read `/docs/NEW-COMPONENT-GUIDE.md`
- [ ] Read `/docs/DESIGN-TOKENS-REFERENCE.md`
- [ ] Study `/src/app/components/patterns/FeatureCard.tsx`
- [ ] Copy template from guide
- [ ] Build your component
- [ ] Run audit script
- [ ] Submit! ✅

---

## 📞 Need Help?

### Documentation

1. **Component Development:** `/docs/NEW-COMPONENT-GUIDE.md`
2. **CSS Variables:** `/docs/DESIGN-TOKENS-REFERENCE.md`
3. **Compliance Check:** `/docs/DESIGN-SYSTEM-COMPLIANCE-CHECKLIST.md`
4. **Audit Tools:** `/docs/DESIGN-SYSTEM-AUDIT.md`

### Examples

1. **Token Showcase:** `/dev-tools/design-system`
2. **Real-world Page:** `/dev-tools/design-system-example`
3. **Example Component:** `FeatureCard.tsx`

### Guidelines

- **Project Guidelines:** `/guidelines/Guidelines.md`
- **Color System:** `/guidelines/design-tokens/colors.md`
- **Typography System:** `/guidelines/design-tokens/typography.md`
- **Spacing System:** `/guidelines/design-tokens/spacing.md`

---

## 🎊 Summary

**For Users:**
- ✅ Customize entire site by editing 3 CSS files
- ✅ No coding knowledge required
- ✅ Changes apply instantly
- ✅ Full control over colors, fonts, spacing

**For Developers:**
- ✅ Clear guidelines and templates
- ✅ Consistent patterns across codebase
- ✅ Easy to maintain and extend
- ✅ Automated compliance checking

**Result:**
- ✅ 100% CSS variable compliance
- ✅ Zero hardcoded values
- ✅ Full dark mode support
- ✅ User-customizable
- ✅ Production-ready

---

**The entire site is controlled by CSS variables. Change them, and everything updates automatically!** 🚀
