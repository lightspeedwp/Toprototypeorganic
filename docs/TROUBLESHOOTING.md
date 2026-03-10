# Design System Troubleshooting Guide

**Common issues and how to fix them.**

---

## 🐛 Problem: Component doesn't update when I change CSS variables

### Symptoms:
- Changed `--primary` in theme-light.css
- Saved file
- Component still shows old color

### Solutions:

**1. Hard refresh browser**
```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

**2. Check if component is actually using CSS variables**

❌ **If component has hardcoded value:**
```tsx
<div style={{ backgroundColor: '#4a7311' }}>
```

This will NEVER update when you change CSS variables!

✅ **Component must use CSS variable:**
```tsx
<div className="bg-primary">
```

Or in CSS:
```css
.my-component {
  background-color: var(--primary);
}
```

**3. Check if CSS file is imported**

Open `/src/styles/global.css` and verify:
```css
@import './patterns/my-component.css';
```

**4. Check browser console for CSS errors**

Open DevTools (F12) → Console tab
Look for CSS parsing errors

**5. Verify CSS variable is defined**

Open DevTools → Elements tab → Computed styles
Search for `--primary`
Should show the value from theme-light.css

---

## 🐛 Problem: Dark mode isn't working

### Symptoms:
- Toggle dark mode
- Colors don't change
- Component looks broken

### Solutions:

**1. Check if using `dark:` classes (NOT ALLOWED)**

❌ **Wrong:**
```tsx
<div className="bg-white dark:bg-slate-900">
```

This approach is prohibited! Remove ALL `dark:` classes.

✅ **Correct:**
```tsx
<div className="bg-background">
```

The CSS variable automatically switches:
```css
:root {
  --background: #ffffff;
}

.dark {
  --background: #1a1a1a;
}
```

**2. Verify dark mode colors are defined**

Open `/src/styles/theme-dark.css`

Should have:
```css
.dark {
  --primary: #90ba48;
  --background: #1a1a1a;
  /* etc */
}
```

**3. Check if .dark class is being applied**

Open DevTools → Elements tab
Look at `<html>` or `<body>` element
Should have `class="dark"` when dark mode active

**4. Hard-coded opacity values**

If using rgba() with hardcoded colors:

❌ **Wrong:**
```css
background-color: rgba(74, 115, 17, 0.1);
```

This will look wrong in dark mode!

✅ **Correct:**
```css
/* Light mode */
background-color: rgba(74, 115, 17, 0.1);

/* Dark mode */
.dark .my-component {
  background-color: rgba(144, 186, 72, 0.1);
}
```

Or use CSS variable:
```css
background-color: var(--primary);
opacity: 0.1;
```

---

## 🐛 Problem: Wrong font is showing

### Symptoms:
- Component shows Arial, Helvetica, or system font
- Not using Lora or Noto Sans

### Solutions:

**1. Check if fonts are loaded**

Open DevTools → Network tab → Filter by "Font"
Should see:
- Lora (loaded from Google Fonts)
- Noto Sans (loaded from Google Fonts)

**2. Check font import in fonts.css**

Open `/src/styles/fonts.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&display=swap');
```

**3. Check if component specifies font**

❌ **Wrong:**
```tsx
<h1 style={{ fontFamily: 'Arial' }}>
```

✅ **Correct:**
```tsx
<h1 className="font-serif">
```

Or in CSS:
```css
h1 {
  font-family: var(--font-family-lora);
}
```

**4. Verify font-family CSS variables**

Open `/src/styles/theme.css`:

```css
:root {
  --font-family-lora: "Lora", serif;
  --font-family-noto-sans: "Noto Sans", sans-serif;
  --font-family-mono: "Courier New", monospace;
}
```

**5. Check Tailwind font class mapping**

Open `/src/styles/theme.css`:

```css
@theme inline {
  --font-family-serif: var(--font-family-lora);
  --font-family-sans: var(--font-family-noto-sans);
  --font-family-mono: var(--font-family-mono);
}
```

---

## 🐛 Problem: Spacing looks wrong on mobile

### Symptoms:
- Too much or too little spacing
- Layout breaks on mobile
- Horizontal scrolling

### Solutions:

**1. Check if using fluid spacing**

For major sections, use fluid spacing:

❌ **Wrong (fixed):**
```css
padding-top: 5rem; /* Always 80px */
```

✅ **Correct (fluid):**
```css
padding-top: var(--spacing-section-md); /* Adjusts 48px-80px */
```

**2. Test on actual mobile device**

Desktop responsive view ≠ real mobile

Use Chrome DevTools device toolbar (Ctrl+Shift+M)
Or test on physical device

**3. Check for hardcoded widths**

❌ **Wrong:**
```css
width: 1200px; /* Breaks on mobile! */
```

✅ **Correct:**
```css
max-width: 75rem; /* 1200px max, but shrinks on mobile */
```

Or use Container component:
```tsx
<Container>
  {/* Content automatically constrained */}
</Container>
```

**4. Check breakpoints**

Use Tailwind responsive prefixes:

```tsx
<div className="p-4 md:p-6 lg:p-8">
  {/* 16px mobile, 24px tablet, 32px desktop */}
</div>
```

---

## 🐛 Problem: Audit script reports violations

### Symptoms:
```bash
./scripts/audit-design-system.sh
❌ Found 15 hardcoded color violations
```

### Solutions:

**1. See which files have violations**

```bash
grep -rn "#[0-9a-fA-F]\{6\}" src/app --include="*.tsx"
```

Output shows file:line:violation

**2. Common false positives**

Comments are OK:
```tsx
// Primary color is #4a7311 ← This is fine (comment)
```

Imported images are OK:
```tsx
import img from "figma:asset/abc123.png"; // ← This is fine
```

**3. Fix each violation**

For each file:line reported:

1. Open file
2. Find the hardcoded value
3. Replace with CSS variable
4. Test visually

**4. Re-run audit**

```bash
./scripts/audit-design-system.sh
```

Should now show:
```
✅ All checks passed! Design system is compliant.
```

---

## 🐛 Problem: Colors look wrong / contrast is bad

### Symptoms:
- Text hard to read
- Low contrast
- Accessibility issues

### Solutions:

**1. Check WCAG contrast ratio**

Use browser DevTools:
- Select element
- Check contrast ratio in color picker
- Must be ≥ 4.5:1 for WCAG AA

**2. Use correct foreground color**

Each background has a matching foreground:

```tsx
/* Correct pairs */
<div className="bg-primary text-primary-foreground">
<div className="bg-card text-card-foreground">
<div className="bg-muted text-muted-foreground">
```

Never mix:
```tsx
/* ❌ Wrong - might have bad contrast */
<div className="bg-primary text-card-foreground">
```

**3. Check theme colors are WCAG compliant**

Open `/src/styles/theme-light.css` and `/src/styles/theme-dark.css`

All color pairs should meet WCAG AA:
- Normal text: 4.5:1
- Large text: 3:1

**4. Use muted foreground for less important text**

```tsx
<h2 className="text-foreground">Title</h2>
<p className="text-muted-foreground">Subtitle</p>
```

---

## 🐛 Problem: Button styles not applying

### Symptoms:
- Button looks like plain text
- No background color
- Styles missing

### Solutions:

**1. Check if button CSS is imported**

Open `/src/styles/global.css`:

```css
@import './components/button.css';
```

**2. Check class name**

Must match CSS file:

```tsx
<button className="button button--primary">
```

Not:
```tsx
<button className="btn primary"> ← Wrong class names!
```

**3. Check CSS specificity conflict**

If another CSS rule is more specific, it will override.

Open DevTools → Elements → Styles tab
Check which rules are applied and crossed out

**4. Use cn() utility for multiple classes**

```tsx
import { cn } from "../../lib/utils";

<button className={cn(
  "button",
  "button--primary",
  isLoading && "button--disabled"
)}>
```

---

## 🐛 Problem: Component CSS not loading

### Symptoms:
- Styles completely missing
- Component looks unstyled
- No CSS classes applied

### Solutions:

**1. Verify CSS file exists**

Check file exists at:
```
/src/styles/{category}/{component-name}.css
```

**2. Verify import in global.css**

Open `/src/styles/global.css`:

Must have:
```css
@import './patterns/my-component.css';
```

**3. Check import order**

Some CSS needs to come after others.

Component CSS should be near the end:

```css
/* Theme */
@import './theme-light.css';
@import './theme-dark.css';
@import './theme.css';

/* Base */
@import './base.css';

/* Components (after theme) */
@import './components/button.css';
@import './patterns/my-component.css';
```

**4. Hard refresh browser**

```
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)
```

**5. Check browser console**

Open DevTools → Console
Look for CSS import errors

---

## 🐛 Problem: Tailwind classes not working

### Symptoms:
- `bg-primary` not applying color
- `p-4` not adding padding
- Tailwind utilities have no effect

### Solutions:

**1. Check Tailwind is configured**

Open `/src/styles/theme.css`:

Should have:
```css
@theme inline {
  --color-primary: var(--primary);
  --color-background: var(--background);
  /* etc */
}
```

**2. Verify class name is valid**

Valid:
```tsx
<div className="bg-primary text-primary-foreground">
```

Invalid:
```tsx
<div className="bg-custom-color"> ← No such class!
```

**3. Check if color is defined**

Tailwind can only use colors in `@theme inline` block.

If you add a new CSS variable, add it to theme.css:

```css
@theme inline {
  --color-my-new-color: var(--my-new-color);
}
```

**4. Hard refresh and clear cache**

Sometimes Tailwind JIT compilation needs refresh.

---

## 🐛 Problem: BEM naming confusion

### Symptoms:
- Not sure what to name CSS classes
- Inconsistent naming across components

### Solutions:

**Structure:**
```
.wp-{category}-{component}                 // Block
.wp-{category}-{component}__element        // Element
.wp-{category}-{component}--modifier       // Modifier
```

**Categories:**
- `wp-pattern-*` - Content patterns
- `wp-block-*` - WordPress blocks
- `wp-part-*` - Template parts
- `wp-common-*` - Common utilities

**Example:**
```css
.wp-pattern-card { }                        /* Block */
.wp-pattern-card__title { }                 /* Element */
.wp-pattern-card__description { }           /* Element */
.wp-pattern-card--primary { }               /* Modifier */
.wp-pattern-card--primary .wp-pattern-card__title { } /* Modifier + Element */
```

**Usage:**
```tsx
<div className="wp-pattern-card wp-pattern-card--primary">
  <h3 className="wp-pattern-card__title">Title</h3>
  <p className="wp-pattern-card__description">Description</p>
</div>
```

---

## 🐛 Problem: TypeScript errors

### Symptoms:
```
Property 'variant' does not exist on type 'MyComponentProps'
```

### Solutions:

**1. Define proper interface**

```tsx
interface MyComponentProps {
  variant?: "default" | "primary" | "secondary";
  size?: "sm" | "default" | "lg";
  className?: string;
  children: React.ReactNode;
}
```

**2. Use correct prop types**

```tsx
export function MyComponent({ 
  variant = "default",
  size = "default",
  className,
  children 
}: MyComponentProps) {
  // ...
}
```

**3. Don't use 'any'**

❌ Wrong:
```tsx
export function MyComponent(props: any) {
```

✅ Correct:
```tsx
export function MyComponent(props: MyComponentProps) {
```

---

## 📋 Debugging Checklist

When something doesn't work:

- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Check browser console for errors
- [ ] Check CSS is imported in global.css
- [ ] Check component is using CSS variables (not hardcoded)
- [ ] Check class names match CSS file
- [ ] Check CSS variables are defined in theme files
- [ ] Test in light AND dark mode
- [ ] Run audit script: `./scripts/audit-design-system.sh`
- [ ] Check DevTools → Elements → Styles for specificity issues
- [ ] Check DevTools → Network → Fonts for font loading

---

## 🆘 Still Stuck?

**Check documentation:**
1. `/docs/NEW-COMPONENT-GUIDE.md`
2. `/docs/DESIGN-TOKENS-REFERENCE.md`
3. `/docs/QUICK-REFERENCE.md`
4. `/docs/MIGRATION-GUIDE.md`

**Study working examples:**
1. `/src/app/components/patterns/FeatureCard.tsx`
2. `/src/app/pages/DesignSystemExample.tsx`
3. `/dev-tools/design-system` (live example)

**Common fixes:**
- Hard refresh browser
- Check imports
- Use CSS variables
- Remove `dark:` classes
- Use BEM naming
- Test customization

---

**Remember:** 99% of issues are because something is hardcoded instead of using CSS variables! 🎨
