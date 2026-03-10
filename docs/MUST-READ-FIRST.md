# ⚠️ STOP - READ THIS BEFORE GENERATING ANY UI ⚠️

**This document is MANDATORY - NO EXCEPTIONS**

---

## 🚨 THE TWO NON-NEGOTIABLE RULES 🚨

### **RULE #1: CSS Variables ONLY**

**ALL styling MUST use CSS variables from:**
- `/src/styles/theme-light.css`
- `/src/styles/theme-dark.css`
- `/src/styles/theme.css`

**WHY?** So users can customize the entire site by editing these 3 files.

**✅ CORRECT:**
```tsx
<div className="bg-primary text-primary-foreground">
<button className="bg-card text-card-foreground border border-border">
```

```css
.my-component {
  background-color: var(--card);
  color: var(--foreground);
  font-family: var(--font-family-noto-sans);
}
```

**❌ WRONG:**
```tsx
<div style={{ backgroundColor: '#4a7311', color: 'white' }}>
<div className="bg-green-600 text-white">
<div className="bg-white dark:bg-slate-900">
```

---

### **RULE #2: ONLY 5 Fonts**

**ONLY use these font faces:**
1. **Lora** (serif) - `font-serif` or `var(--font-family-lora)`
2. **Noto Sans** (sans-serif) - `font-sans` or `var(--font-family-noto-sans)`
3. **Courier New** (mono) - `font-mono` or `var(--font-family-mono)`
4. **Caveat** (handwriting) - `font-caveat` or `var(--font-family-caveat)`
5. **Shadows Into Light** (handwriting) - `font-shadows` or `var(--font-family-shadows)`

**❌ NEVER use:** Arial, Helvetica, Georgia, Times, Verdana, or ANY other font!

**✅ CORRECT:**
```tsx
<h1 className="font-serif">Title</h1>
<p className="font-sans">Body text</p>
<code className="font-mono">Code</code>
```

**❌ WRONG:**
```tsx
<h1 style={{ fontFamily: 'Arial' }}>Title</h1>
<p className="font-['Helvetica']">Text</p>
```

---

## 📋 BEFORE GENERATING ANY UI - CHECK THIS:

```
[ ] Will you use CSS variables for ALL colors?
[ ] Will you use CSS variables for ALL spacing?
[ ] Will you use CSS variables for ALL fonts?
[ ] Will you ONLY use Lora, Noto Sans, or Courier New?
[ ] Will you avoid hardcoded colors (#hex, rgb(), names)?
[ ] Will you avoid inline styles?
[ ] Will you avoid dark: classes?
[ ] Can users customize this by editing the 3 CSS files?
```

**If ANY answer is NO, STOP and fix it!**

---

## 🎯 THE ONE QUESTION

> **"Can a user customize this by editing CSS variables in the 3 theme files?"**

**✅ YES** → Continue  
**❌ NO** → You hardcoded something - STOP!

---

## 📚 MORE DETAILS

- **Quick reference:** `/docs/UI-GENERATION-CARD.md`
- **Printable checklist:** `/docs/CHECKLIST-PRINTABLE.md`
- **All CSS variables:** `/docs/CSS-VARIABLES-COMPLETE.md`
- **Pre-generation check:** Run `./scripts/pre-generation-check.sh`

---

## ⚡ QUICK PATTERNS

**Colors:**
```tsx
bg-background text-foreground
bg-primary text-primary-foreground
bg-card text-card-foreground border-border
bg-success text-success-foreground
```

**Fonts:**
```tsx
font-serif    → Lora
font-sans     → Noto Sans
font-mono     → Courier New
```

**Spacing:**
```tsx
p-4 px-6 py-8 gap-4 space-y-6
```

**Radius:**
```tsx
rounded-sm rounded-md rounded-lg rounded-xl
```

---

## 🚫 NEVER DO THIS

```tsx
// ❌ NEVER: Hardcoded colors
style={{ backgroundColor: '#FFFFFF' }}
className="bg-white"
className="bg-green-600"

// ❌ NEVER: Wrong fonts
style={{ fontFamily: 'Arial' }}
className="font-['Helvetica']"

// ❌ NEVER: Inline styles (except dynamic)
style={{ padding: '24px', margin: '16px' }}

// ❌ NEVER: Dark mode classes
className="bg-white dark:bg-slate-900"
```

---

## ✅ ALWAYS DO THIS

```tsx
// ✅ ALWAYS: Tailwind classes → CSS variables
<div className="bg-background text-foreground p-4 rounded-lg">
<button className="bg-primary text-primary-foreground">
<h1 className="font-serif">
<p className="font-sans">

// ✅ ALWAYS: External CSS → CSS variables
/* /src/styles/patterns/my-component.css */
.my-component {
  background-color: var(--card);
  color: var(--card-foreground);
  font-family: var(--font-family-noto-sans);
  padding: var(--spacing-element-md);
  border-radius: var(--radius-lg);
}
```

---

## 🔒 THIS IS LOCKED IN

**These rules are:**
- ✅ **MANDATORY** - No exceptions
- ✅ **ENFORCED** - Automatically verified
- ✅ **LOCKED** - Cannot be bypassed
- ✅ **CRITICAL** - User customization depends on this

**Follow these rules = Perfect component ✅**  
**Break these rules = Component rejected ❌**

---

**NOW: Keep this document open and follow these rules for EVERY component!**

**Status:** 🔒 **LOCKED & ENFORCED**
