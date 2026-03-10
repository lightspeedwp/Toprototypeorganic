# 📜 DESIGN SYSTEM CONTRACT

**This is a BINDING CONTRACT between the design system and all UI generation.**

**Date Effective:** February 27, 2026  
**Status:** ✅ **ACTIVE & ENFORCED**  
**Violation Consequence:** ❌ **COMPONENT REJECTED**

---

## 🤝 THE CONTRACT

**I, the UI generator, hereby PROMISE to:**

### **Article 1: CSS Variables Only**

**I WILL:**
- ✅ Use CSS variables for ALL colors
- ✅ Use CSS variables for ALL fonts
- ✅ Use CSS variables for ALL spacing
- ✅ Use CSS variables for ALL borders
- ✅ Use CSS variables for ALL radius
- ✅ Use CSS variables for ALL shadows

**I WILL NOT:**
- ❌ Hardcode ANY hex colors (`#FFFFFF`, `#4a7311`, etc.)
- ❌ Hardcode ANY rgb colors (`rgb(255,255,255)`, etc.)
- ❌ Hardcode ANY color names (`white`, `black`, `green`, etc.)
- ❌ Hardcode ANY spacing values (`padding: 24px`, etc.)

**Consequence if broken:** Component REJECTED, must be rewritten.

---

### **Article 2: Font Families**

**I WILL ONLY USE THESE 3 FONTS:**

1. ✅ **Lora** (serif) via `var(--font-family-lora)` or `className="font-serif"`
2. ✅ **Noto Sans** (sans-serif) via `var(--font-family-noto-sans)` or `className="font-sans"`
3. ✅ **Courier New** (monospace) via `var(--font-family-mono)` or `className="font-mono"`

**I WILL NOT USE:**
- ❌ Arial
- ❌ Helvetica
- ❌ Georgia
- ❌ Times New Roman
- ❌ Verdana
- ❌ Tahoma
- ❌ Comic Sans
- ❌ ANY font not listed above

**Consequence if broken:** Component REJECTED, must be rewritten.

---

### **Article 3: External CSS Files**

**I WILL:**
- ✅ Create external CSS file for component styling
- ✅ Use BEM naming convention (`.wp-pattern-*`, `.wp-part-*`)
- ✅ Import CSS in `/src/styles/index.css`
- ✅ Use CSS variables in all CSS rules

**I WILL NOT:**
- ❌ Use inline styles (except for dynamic calculated values)
- ❌ Put all styling in React component
- ❌ Skip creating CSS file

**Consequence if broken:** Component REJECTED, must be rewritten.

---

### **Article 4: Dark Mode**

**I WILL:**
- ✅ Use CSS variables that auto-switch in dark mode
- ✅ Test component in both light and dark modes
- ✅ Ensure readability in both modes

**I WILL NOT:**
- ❌ Use `dark:` Tailwind classes
- ❌ Create separate dark mode styling
- ❌ Hardcode dark mode colors

**Consequence if broken:** Component REJECTED, must be rewritten.

---

### **Article 5: User Customization**

**I PROMISE:**

> "Users will be able to customize EVERY visual aspect of my component by editing CSS variables in these 3 files:"
> 
> - `/src/styles/theme-light.css`
> - `/src/styles/theme-dark.css`
> - `/src/styles/theme.css`
> 
> "They will NOT need to touch React code, rebuild, or understand programming."

**If this promise is broken:** Component REJECTED, must be rewritten.

---

## 📋 VERIFICATION CHECKLIST

**I agree to verify EVERY component against this checklist:**

### **Colors:**
- [ ] ✅ No `#` hex colors
- [ ] ✅ No `rgb()` or `rgba()` functions
- [ ] ✅ No color names (`white`, `black`, `green`)
- [ ] ✅ All colors via `var(--*)` or Tailwind classes
- [ ] ✅ Tested in light mode
- [ ] ✅ Tested in dark mode

### **Fonts:**
- [ ] ✅ Only Lora, Noto Sans, Courier New used
- [ ] ✅ Font via `var(--font-family-*)` or Tailwind utility
- [ ] ✅ No Arial, Helvetica, Georgia, Times, etc.

### **Spacing:**
- [ ] ✅ Spacing via Tailwind classes or `var(--spacing-*)`
- [ ] ✅ No hardcoded pixel/rem values

### **Styling:**
- [ ] ✅ External CSS file created
- [ ] ✅ BEM naming used
- [ ] ✅ CSS imported in index.css
- [ ] ✅ No inline styles (except dynamic)

### **Dark Mode:**
- [ ] ✅ No `dark:` classes
- [ ] ✅ Auto-switches via CSS variables
- [ ] ✅ Tested in both modes

---

## 🎯 THE ONE RULE TO RULE THEM ALL

**If I'm writing code and I need to ask:**

> "Can a user customize this by editing a CSS variable?"

**And the answer is NO:**

**THEN I MUST STOP AND REWRITE IT!** ❌

---

## ✅ CORRECT EXAMPLES (APPROVED)

### **Example 1: Button Component**

```tsx
// ✅ APPROVED - Uses CSS variables via Tailwind
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-sans font-medium hover:opacity-90 transition-opacity">
  Click me
</button>
```

**Why approved:**
- ✅ Colors: `bg-primary`, `text-primary-foreground` → CSS variables
- ✅ Font: `font-sans` → Noto Sans
- ✅ Spacing: `px-4 py-2` → Tailwind scale
- ✅ Radius: `rounded-md` → CSS variable
- ✅ No inline styles
- ✅ Users can change primary color in theme-light.css

---

### **Example 2: Card with External CSS**

```tsx
// ✅ APPROVED - Uses external CSS with CSS variables
export function InfoCard({ title, description }: InfoCardProps) {
  return (
    <div className="wp-pattern-info-card">
      <h3 className="wp-pattern-info-card__title">{title}</h3>
      <p className="wp-pattern-info-card__description">{description}</p>
    </div>
  );
}
```

```css
/* /src/styles/patterns/info-card.css */
/* ✅ APPROVED - All CSS variables */

.wp-pattern-info-card {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-element-md);
  box-shadow: var(--elevation-sm);
}

.wp-pattern-info-card__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--foreground);
  margin-bottom: var(--spacing-element-xs);
}

.wp-pattern-info-card__description {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  color: var(--muted-foreground);
}
```

**Why approved:**
- ✅ External CSS file
- ✅ BEM naming
- ✅ All colors via CSS variables
- ✅ All fonts via CSS variables (Lora, Noto Sans)
- ✅ All spacing via CSS variables
- ✅ Users can customize by editing theme files

---

## ❌ REJECTED EXAMPLES (VIOLATIONS)

### **Example 1: Hardcoded Colors** ❌

```tsx
// ❌ REJECTED - Hardcoded colors
<div style={{ backgroundColor: '#4a7311', color: 'white' }}>
  Content
</div>

// ❌ REJECTED - Hardcoded Tailwind colors
<div className="bg-green-600 text-white">
  Content
</div>
```

**Violation:** Hardcoded colors  
**Why rejected:** Users cannot change these by editing CSS variables  
**Fix:** Use `bg-primary text-primary-foreground`

---

### **Example 2: Wrong Font** ❌

```tsx
// ❌ REJECTED - Non-defined font
<h1 style={{ fontFamily: 'Arial, sans-serif' }}>
  Title
</h1>

// ❌ REJECTED - Non-defined font
<p className="font-['Helvetica']">
  Text
</p>
```

**Violation:** Using fonts not in the defined list  
**Why rejected:** Breaks design system consistency  
**Fix:** Use `font-serif` (Lora), `font-sans` (Noto Sans), or `font-mono` (Courier New)

---

### **Example 3: Inline Styles** ❌

```tsx
// ❌ REJECTED - Inline styles
<div style={{
  padding: '24px',
  margin: '16px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}}>
  Content
</div>
```

**Violation:** Inline styles with hardcoded values  
**Why rejected:** Users cannot customize by editing CSS  
**Fix:** Use Tailwind classes or external CSS with CSS variables

---

### **Example 4: Dark Mode Classes** ❌

```tsx
// ❌ REJECTED - Dark mode classes
<div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">
  Content
</div>
```

**Violation:** Manual dark mode classes  
**Why rejected:** CSS variables handle dark mode automatically  
**Fix:** Use `bg-background text-foreground`

---

## 📚 AVAILABLE RESOURCES

**Quick Reference:**
- `/docs/UI-GENERATION-CARD.md` - One-page reference
- `/docs/QUICK-REFERENCE.md` - Cheat sheet

**Complete Guide:**
- `/docs/CSS-VARIABLES-COMPLETE.md` - All 80+ variables
- `/docs/DESIGN-SYSTEM-MANDATORY.md` - Full enforcement guide

**Examples:**
- `/docs/COMPONENT-TEMPLATE.md` - Copy-paste template
- `/docs/BEFORE-AFTER-EXAMPLES.md` - Visual comparisons

**Verification:**
- `/scripts/pre-generation-check.sh` - Run before coding
- `/scripts/verify-compliance.sh` - Run after coding

---

## ✍️ SIGNATURE

**By generating UI components, I acknowledge that:**

1. ✅ I have READ and UNDERSTAND this contract
2. ✅ I will use CSS variables for ALL styling
3. ✅ I will use ONLY Lora, Noto Sans, Courier New fonts
4. ✅ I will create external CSS files with BEM naming
5. ✅ I will avoid hardcoded colors, fonts, inline styles, dark: classes
6. ✅ I will enable users to customize everything via CSS variables
7. ✅ I will verify compliance using automated tools
8. ✅ I understand violations result in component rejection

**Signed:** UI Generator  
**Date:** Every time I generate UI  
**Status:** ✅ **CONTRACT ACTIVE**

---

## 🚨 ENFORCEMENT

**This contract is ENFORCED by:**

1. **Pre-generation check:** `/scripts/pre-generation-check.sh`
2. **Documentation:** 23 comprehensive guides (200KB+)
3. **Post-generation check:** `/scripts/verify-compliance.sh`

**Violations will result in:**
- ❌ Component rejected
- ❌ Must be rewritten
- ❌ No exceptions

---

## 🎯 THE PROMISE

**I PROMISE:**

> "Every component I generate will be customizable by users editing CSS variables. They will never need to touch React code to change colors, fonts, spacing, or any visual aspect."

**This is my binding promise.** ✅

---

**Date Effective:** February 27, 2026  
**Status:** ✅ **ACTIVE & ENFORCED**  
**Quality:** ⭐⭐⭐⭐⭐ **World-Class**  
**Enforcement:** 🚨 **MAXIMUM LEVEL**

**CONTRACT ACCEPTED AND BINDING.** ✅
