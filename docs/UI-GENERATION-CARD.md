# 🎨 UI GENERATION QUICK REFERENCE CARD

**USE THIS FOR EVERY COMPONENT - NO EXCEPTIONS!**

---

## ✅ BEFORE WRITING ANY CODE

**Ask yourself these 3 questions:**

1. ❓ **"Can a user customize this by editing CSS variables?"**
   - ✅ YES → Continue
   - ❌ NO → You're hardcoding something - stop!

2. ❓ **"Am I using ONLY Lora, Noto Sans, or Courier New fonts?"**
   - ✅ YES → Continue
   - ❌ NO → Wrong font - stop!

3. ❓ **"Am I creating an external CSS file with CSS variables?"**
   - ✅ YES → Continue
   - ❌ NO → Must create external CSS - stop!

---

## 🎨 CSS VARIABLES YOU MUST USE

### **Colors (Use These, Never Hardcode!)**

```tsx
// ✅ CORRECT - Use Tailwind classes that map to CSS variables
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">
<div className="bg-card text-card-foreground border border-border">
<div className="bg-success text-success-foreground">
<div className="bg-warning text-warning-foreground">
<div className="bg-destructive text-destructive-foreground">
<div className="bg-muted text-muted-foreground">

// ❌ WRONG - Never hardcode colors
<div style={{ backgroundColor: '#FFFFFF' }}>
<div className="bg-white">
<div className="bg-green-600">
```

### **Fonts (ONLY These 3!)**

```tsx
// ✅ CORRECT - Use font utility classes
<h1 className="font-serif">     {/* → Lora */}
<p className="font-sans">       {/* → Noto Sans */}
<code className="font-mono">    {/* → Courier New */}

// ❌ WRONG - Never use other fonts
<h1 style={{ fontFamily: 'Arial' }}>
<p style={{ fontFamily: 'Helvetica' }}>
<div className="font-['Georgia']">
```

### **Spacing (Use Tailwind or CSS Variables)**

```tsx
// ✅ CORRECT - Tailwind spacing
<div className="p-4 gap-4">
<section className="py-12">

// ✅ CORRECT - CSS variables in external CSS
.my-component {
  padding: var(--spacing-element-md);
  gap: var(--spacing-gap-lg);
}

// ❌ WRONG - Hardcoded spacing
<div style={{ padding: '24px' }}>
```

### **Border Radius (Use Tailwind)**

```tsx
// ✅ CORRECT
<div className="rounded-lg">    {/* → var(--radius-lg) */}
<div className="rounded-full">  {/* → var(--radius-full) */}

// ❌ WRONG
<div style={{ borderRadius: '8px' }}>
```

---

## 🚫 NEVER DO THIS

```tsx
// ❌ HARDCODED COLORS
<div style={{ backgroundColor: '#4a7311', color: 'white' }}>
<div className="bg-green-600 text-white">

// ❌ HARDCODED FONTS
<h1 style={{ fontFamily: 'Arial, sans-serif' }}>
<p style={{ fontFamily: 'Helvetica' }}>

// ❌ INLINE STYLES (except dynamic values)
<div style={{ padding: '24px', margin: '16px' }}>

// ❌ DARK MODE CLASSES
<div className="bg-white dark:bg-slate-900">

// ❌ NON-DEFINED FONTS
<div className="font-['Times']">
```

---

## ✅ ALWAYS DO THIS

```tsx
// ✅ USE TAILWIND CLASSES
<div className="bg-background text-foreground p-4 rounded-lg">
<button className="bg-primary text-primary-foreground">
<h1 className="font-serif">
<p className="font-sans">

// ✅ CREATE EXTERNAL CSS WITH CSS VARIABLES
/* /src/styles/patterns/my-component.css */
.wp-pattern-mycomponent {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-element-md);
  box-shadow: var(--elevation-sm);
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
}

// ✅ IMPORT CSS IN INDEX.CSS
@import './patterns/my-component.css';
```

---

## 📋 COMPONENT GENERATION CHECKLIST

**Before submitting ANY component:**

- [ ] ✅ No `#` hex colors in code
- [ ] ✅ No `rgb()` or `rgba()` colors
- [ ] ✅ No color names (`white`, `black`, `green`)
- [ ] ✅ No `style={{}}` inline styles (except dynamic)
- [ ] ✅ No `dark:` classes
- [ ] ✅ No fonts other than Lora, Noto Sans, Courier New
- [ ] ✅ External CSS file created
- [ ] ✅ CSS imported in `/src/styles/index.css`
- [ ] ✅ All colors via CSS variables
- [ ] ✅ All fonts via defined families
- [ ] ✅ BEM naming in CSS
- [ ] ✅ Works in light mode
- [ ] ✅ Works in dark mode (automatic)

---

## 🎯 THE ONE RULE

> **Users must be able to customize this by editing CSS variables in theme files.**

**Can they?** ✅ Ship it!  
**Can't they?** ❌ Fix it!

---

## 📚 QUICK LINKS

**Variables:**
- All 80+ variables: `/docs/CSS-VARIABLES-COMPLETE.md`

**Examples:**
- Perfect component: `/docs/COMPONENT-TEMPLATE.md`
- Before/After: `/docs/BEFORE-AFTER-EXAMPLES.md`

**Help:**
- Quick ref: `/docs/QUICK-REFERENCE.md`
- Troubleshooting: `/docs/TROUBLESHOOTING.md`

---

## 🎨 COMMON PATTERNS

### **Button**
```tsx
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-sans font-medium">
  Click me
</button>
```

### **Card**
```tsx
<div className="bg-card text-card-foreground border border-border rounded-lg p-6 shadow-sm">
  <h3 className="font-serif text-2xl mb-2">Title</h3>
  <p className="font-sans text-base">Description</p>
</div>
```

### **Alert**
```tsx
<div className="bg-success text-success-foreground p-4 rounded-md">
  <p className="font-sans font-medium">Success message</p>
</div>
```

### **Section**
```tsx
<section className="py-12 md:py-16 lg:py-20">
  <div className="container mx-auto px-4">
    {/* Content */}
  </div>
</section>
```

---

**KEEP THIS CARD OPEN WHILE CODING!** 📌

**Status:** ✅ Production Ready  
**Enforcement:** 🚨 Maximum Level  
**Quality:** ⭐⭐⭐⭐⭐ World-Class
