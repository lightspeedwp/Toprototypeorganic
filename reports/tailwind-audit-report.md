# 🔍 TAILWIND CSS & DESIGN SYSTEM COMPLIANCE AUDIT REPORT

**Comprehensive Codebase Audit - Tailwind CSS Class Replacement & Design System Violations**

**Date:** February 24, 2026  
**Audit Status:** ✅ Complete  
**Report Version:** 1.0

---

## 📊 **EXECUTIVE SUMMARY**

### **Audit Statistics:**

| Metric | Count | Status |
|--------|-------|--------|
| **Total files audited** | 50+ | ✅ Complete |
| **Tailwind classes found** | 500+ instances | 🟠 Needs replacement |
| **dark: classes found** | 28 instances | 🔴 CRITICAL - Must fix |
| **Components affected** | 20+ | 🟠 High priority |
| **Estimated effort** | 12-16 hours | Medium complexity |

### **Violation Severity Breakdown:**

| Severity | Count | Priority | Status |
|----------|-------|----------|--------|
| 🔴 **CRITICAL** | 28 | P0 | Must fix immediately |
| 🟠 **HIGH** | 200+ | P1 | Should fix soon |
| 🟡 **MEDIUM** | 150+ | P2 | Can fix later |
| 🟢 **LOW** | 100+ | P3 | Nice to have |

---

## 🚨 **CRITICAL FINDINGS (P0 - Fix Immediately)**

### **Finding 1: dark: Class Usage (28 instances)**

**Severity:** 🔴 **CRITICAL**  
**Impact:** Breaks design system, prevents theme customization  
**Priority:** P0 - Must fix immediately

**Files Affected:**
1. `/src/app/components/common/Logo.tsx` (2 instances)
2. `/src/app/components/blocks/theme/SiteLogo.tsx` (4 instances)
3. `/src/app/components/blocks/ui/input.tsx` (2 instances)
4. `/src/app/components/blocks/ui/textarea.tsx` (1 instance)
5. `/src/app/components/blocks/ui/tabs.tsx` (3 instances)
6. `/src/app/components/blocks/ui/badge.tsx` (2 instances)
7. `/src/app/components/blocks/ui/breadcrumb.tsx` (1 instance)
8. `/src/app/components/blocks/ui/select.tsx` (2 instances)
9. `/src/app/components/blocks/ui/switch.tsx` (2 instances)
10. `/src/app/components/blocks/ui/checkbox.tsx` (1 instance)
11. `/src/app/components/blocks/ui/radio-group.tsx` (1 instance)
12. `/src/app/components/blocks/ui/toggle.tsx` (1 instance)
13. `/src/app/components/blocks/ui/input-otp.tsx` (1 instance)
14. `/src/app/components/patterns/SitemapGridPattern.tsx` (2 instances)
15. `/src/app/pages/TemplateTester.tsx` (2 instances)
16. `/src/app/pages/DevToolsPage.tsx` (1 instance)

**Examples:**

**Logo.tsx:**
```tsx
// ❌ CURRENT (WRONG)
<LogoLight className={cn(sizeClasses[size], "w-auto block dark:hidden text-foreground")} />
<LogoDark className={cn(sizeClasses[size], "w-auto hidden dark:block text-foreground")} />

// ✅ SHOULD BE (CORRECT)
<LogoLight className={cn(sizeClasses[size], "wp-common-logo wp-common-logo--light")} />
<LogoDark className={cn(sizeClasses[size], "wp-common-logo wp-common-logo--dark")} />
```

**CSS to add:**
```css
/* /src/styles/common/logo.css */
.wp-common-logo {
  width: auto;
  color: var(--color-foreground);
}

.wp-common-logo--light {
  display: block;
}

.wp-common-logo--dark {
  display: none;
}

.dark .wp-common-logo--light {
  display: none;
}

.dark .wp-common-logo--dark {
  display: block;
}
```

**UI Components (input, textarea, etc.):**
```tsx
// ❌ CURRENT (WRONG)
className="dark:bg-input/30 dark:aria-invalid:ring-destructive/40"

// ✅ SHOULD BE (CORRECT)
className="wp-ui-input"
```

**CSS to add:**
```css
/* /src/styles/blocks/ui-components.css */
.wp-ui-input {
  background-color: var(--color-input);
}

.dark .wp-ui-input {
  background-color: rgba(var(--color-input-rgb), 0.3);
}

.wp-ui-input[aria-invalid="true"] {
  ring: 2px solid rgba(var(--color-destructive-rgb), 0.2);
}

.dark .wp-ui-input[aria-invalid="true"] {
  ring: 2px solid rgba(var(--color-destructive-rgb), 0.4);
}
```

**Action Required:**
- Remove ALL `dark:` classes
- Create BEM CSS classes with `.dark` selector for dark mode
- Use CSS variables for all colors

**Estimated Effort:** 4-6 hours

---

## 🟠 **HIGH PRIORITY FINDINGS (P1 - Fix Soon)**

### **Finding 2: Tailwind Typography Classes (200+ instances)**

**Severity:** 🟠 **HIGH**  
**Impact:** Prevents semantic HTML styling, hard to maintain  
**Priority:** P1 - Should fix soon

**Common Classes Found:**
```
text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl
font-normal, font-medium, font-semibold, font-bold, font-serif, font-sans
leading-tight, leading-normal, leading-relaxed
```

**Files Most Affected:**
1. `/src/app/components/common/TemplateBrowser.tsx` (30+ instances)
2. `/src/app/components/common/PageNav.tsx` (10+ instances)
3. `/src/app/components/patterns/*.tsx` (50+ instances)
4. `/src/app/components/blocks/ui/*.tsx` (40+ instances)

**Examples:**

**TemplateBrowser.tsx:**
```tsx
// ❌ CURRENT (WRONG)
<h2 className="text-card-foreground font-serif font-semibold">
  Template Browser
</h2>
<p className="text-xs text-muted-foreground font-sans font-medium">
  Current Template
</p>

// ✅ SHOULD BE (CORRECT)
<h2 className="wp-pattern-template-browser__title">
  Template Browser
</h2>
<p className="wp-pattern-template-browser__label">
  Current Template
</p>
```

**CSS to add:**
```css
/* /src/styles/common/template-browser.css */
.wp-pattern-template-browser__title {
  font-family: var(--font-family-lora);
  font-weight: var(--font-weight-semibold);
  color: var(--color-card-foreground);
}

.wp-pattern-template-browser__label {
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-muted-foreground);
}
```

**Action Required:**
- Replace Tailwind typography classes with BEM classes
- Use CSS variables for all font properties
- Rely on semantic HTML default styling where possible

**Estimated Effort:** 6-8 hours

---

### **Finding 3: Tailwind Color Classes (150+ instances)**

**Severity:** 🟠 **HIGH**  
**Impact:** Prevents theme customization, inconsistent colors  
**Priority:** P1 - Should fix soon

**Common Classes Found:**
```
bg-white, bg-card, bg-muted, bg-primary, bg-accent
text-foreground, text-muted-foreground, text-primary
border-border, border-primary
```

**Examples:**

**TemplateBrowser.tsx:**
```tsx
// ❌ CURRENT (WRONG)
<div className="bg-card border border-border rounded-lg">
  <div className="bg-muted/30 border-b border-border">
    <p className="text-muted-foreground">Label</p>
  </div>
</div>

// ✅ SHOULD BE (CORRECT)
<div className="wp-pattern-template-browser__panel">
  <div className="wp-pattern-template-browser__header">
    <p className="wp-pattern-template-browser__label">Label</p>
  </div>
</div>
```

**CSS to add:**
```css
/* /src/styles/common/template-browser.css */
.wp-pattern-template-browser__panel {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.wp-pattern-template-browser__header {
  background-color: rgba(var(--color-muted-rgb), 0.3);
  border-bottom: 1px solid var(--color-border);
}

.wp-pattern-template-browser__label {
  color: var(--color-muted-foreground);
}
```

**Action Required:**
- Replace Tailwind color classes with BEM classes
- Use CSS variables for all colors
- Ensure dark mode support via CSS variables

**Estimated Effort:** 4-6 hours

---

### **Finding 4: Tailwind Spacing Classes (100+ instances)**

**Severity:** 🟠 **HIGH**  
**Impact:** Inconsistent spacing, hard to maintain  
**Priority:** P1 - Should fix soon

**Common Classes Found:**
```
p-1, p-2, p-3, p-4, p-6, p-8
m-1, m-2, m-3, m-4, mb-2, mb-3, mb-4, mt-4
gap-1, gap-2, gap-3, gap-4
```

**Decision:**
- **Keep Tailwind spacing for simple/utility spacing** (p-4, m-2, gap-4)
- **Replace with CSS variables for component-specific spacing** (sections, major elements)

**Examples:**

**Keep Tailwind (Utility Spacing):**
```tsx
// ✅ OK TO KEEP
<div className="flex items-center gap-2 p-4">
  <Icon />
  <span>Label</span>
</div>
```

**Replace with CSS Variables (Component Spacing):**
```tsx
// ❌ CURRENT (WRONG)
<section className="py-16">
  <div className="space-y-8">
    Content
  </div>
</section>

// ✅ SHOULD BE (CORRECT)
<section className="wp-pattern-hero">
  <div className="wp-pattern-hero__content">
    Content
  </div>
</section>
```

**CSS:**
```css
.wp-pattern-hero {
  padding-top: var(--spacing-section-lg);
  padding-bottom: var(--spacing-section-lg);
}

.wp-pattern-hero__content {
  gap: var(--spacing-gap-lg);
}
```

**Action Required:**
- Identify component-level spacing
- Replace with CSS variables
- Keep utility-level Tailwind spacing

**Estimated Effort:** 2-4 hours

---

## 🟡 **MEDIUM PRIORITY FINDINGS (P2 - Can Fix Later)**

### **Finding 5: Tailwind Layout Classes (150+ instances)**

**Severity:** 🟡 **MEDIUM**  
**Impact:** Hard to maintain, but functional  
**Priority:** P2 - Can fix later

**Common Classes Found:**
```
flex, inline-flex, grid, block, inline-block, hidden
items-center, items-start, justify-center, justify-between
```

**Decision:**
- **Keep most Tailwind layout classes** (they're functional and well-understood)
- **Move complex layouts to BEM CSS** (multi-line flex/grid configurations)

**Action Required:**
- Audit complex layouts
- Move to BEM CSS if readability suffers
- Keep simple utilities (flex, items-center, etc.)

**Estimated Effort:** 2-3 hours

---

### **Finding 6: Tailwind Responsive Classes (50+ instances)**

**Severity:** 🟡 **MEDIUM**  
**Impact:** Responsive behavior, moderate maintenance  
**Priority:** P2 - Can fix later

**Common Classes Found:**
```
sm:*, md:*, lg:*, xl:*
md:grid-cols-2, lg:grid-cols-3
sm:text-sm, md:text-base
```

**Decision:**
- **Keep responsive utilities for simple responsive changes**
- **Move complex responsive behavior to BEM CSS media queries**

**Action Required:**
- Review responsive patterns
- Consolidate into BEM CSS where appropriate
- Keep simple responsive utilities

**Estimated Effort:** 2-3 hours

---

## 📋 **DETAILED COMPONENT BREAKDOWN**

### **Component: Logo.tsx**

**File:** `/src/app/components/common/Logo.tsx`  
**Tailwind Classes Found:** 15+  
**Critical Violations:** 2 (`dark:` classes)  
**Effort:** Simple (30 minutes)

**Current Issues:**
- Uses `dark:hidden` and `dark:block` for logo switching
- Should use BEM with `.dark` selector

**Replacement Plan:**
```tsx
// Before:
<LogoLight className={cn(sizeClasses[size], "w-auto block dark:hidden text-foreground")} />
<LogoDark className={cn(sizeClasses[size], "w-auto hidden dark:block text-foreground")} />

// After:
<LogoLight className="wp-common-logo wp-common-logo--light" />
<LogoDark className="wp-common-logo wp-common-logo--dark" />
```

**CSS Required:**
```css
/* /src/styles/common/logo.css */
.wp-common-logo {
  width: auto;
  color: var(--color-foreground);
}

.wp-common-logo--light {
  display: block;
}

.wp-common-logo--dark {
  display: none;
}

.dark .wp-common-logo--light {
  display: none;
}

.dark .wp-common-logo--dark {
  display: block;
}

/* Size variants */
.wp-common-logo--sm {
  height: 1.5rem;
}

.wp-common-logo--md {
  height: 2rem;
}

.wp-common-logo--lg {
  height: 2.5rem;
}
```

---

### **Component: TemplateBrowser.tsx**

**File:** `/src/app/components/common/TemplateBrowser.tsx`  
**Tailwind Classes Found:** 50+  
**Critical Violations:** 0  
**Effort:** Complex (2-3 hours)

**Current Issues:**
- Heavy Tailwind usage for typography
- Many color classes
- Complex layout patterns
- Inline responsive classes

**Replacement Plan:**
- Create `/src/styles/common/template-browser.css`
- Define BEM classes for all elements
- Use CSS variables for all styling
- Move responsive behavior to media queries

**CSS Structure:**
```css
/* Base component */
.wp-pattern-template-browser { }
.wp-pattern-template-browser__toggle { }
.wp-pattern-template-browser__panel { }
.wp-pattern-template-browser__header { }
.wp-pattern-template-browser__search { }
.wp-pattern-template-browser__category { }
.wp-pattern-template-browser__item { }
.wp-pattern-template-browser__item--active { }
```

---

### **Component: UI Components (shadcn/ui)**

**Files:** `/src/app/components/blocks/ui/*.tsx`  
**Tailwind Classes Found:** 200+  
**Critical Violations:** 15+ (`dark:` classes)  
**Effort:** Complex (4-5 hours)

**Current Issues:**
- All shadcn/ui components use `dark:` classes
- Complex Tailwind class strings
- Hard to customize

**Replacement Plan:**
- Create `/src/styles/blocks/ui-components.css`
- Define BEM classes for each UI component
- Remove ALL `dark:` classes
- Use `.dark` selector in CSS
- Use CSS variables for all colors

**Priority UI Components to Fix:**
1. Input (2 `dark:` classes)
2. Textarea (1 `dark:` class)
3. Select (2 `dark:` classes)
4. Checkbox (2 `dark:` classes)
5. Radio (1 `dark:` class)
6. Switch (2 `dark:` classes)
7. Badge (2 `dark:` classes)
8. Tabs (3 `dark:` classes)
9. Toggle (1 `dark:` class)

---

## 📊 **REPLACEMENT MAPPING TABLE**

| Tailwind Class | BEM Replacement | CSS Variable | Priority |
|----------------|-----------------|--------------|----------|
| `dark:hidden` | Use `.dark .class--light { display: none; }` | N/A | P0 |
| `dark:block` | Use `.dark .class--dark { display: block; }` | N/A | P0 |
| `dark:bg-input/30` | Use `.dark .class { background-color: rgba(...) }` | `var(--color-input-rgb)` | P0 |
| `text-2xl font-bold` | `.wp-pattern-component__title` | `var(--text-2xl)`, `var(--font-weight-bold)` | P1 |
| `text-muted-foreground` | `.wp-pattern-component__label` | `var(--color-muted-foreground)` | P1 |
| `bg-card border border-border` | `.wp-pattern-component__panel` | `var(--color-card)`, `var(--color-border)` | P1 |
| `rounded-lg` | `.wp-pattern-component__panel` | `var(--radius-lg)` | P1 |
| `p-4 gap-2` | Keep Tailwind OR use spacing vars | `var(--spacing-*)` | P2 |
| `flex items-center` | Keep Tailwind | N/A | P3 |
| `md:grid-cols-2` | Keep Tailwind OR move to CSS media query | N/A | P2 |

---

## ✅ **SUCCESS CRITERIA**

### **Phase 1 Complete When:**
- [ ] Zero `dark:` classes remain
- [ ] All Logo components use BEM classes
- [ ] All UI components (shadcn) use BEM classes
- [ ] Light and dark mode work correctly
- [ ] Visual fidelity 100% maintained

### **Phase 2 Complete When:**
- [ ] Typography classes replaced with BEM
- [ ] Color classes replaced with BEM
- [ ] All CSS variables used correctly
- [ ] Semantic HTML styling works
- [ ] Theme customization works

### **Phase 3 Complete When:**
- [ ] Component-level spacing uses CSS variables
- [ ] Complex layouts moved to BEM CSS
- [ ] All BEM naming consistent
- [ ] CSS files organized properly
- [ ] Documentation updated

---

## 📝 **RECOMMENDATIONS**

### **1. Prioritize dark: Class Removal**
- **Highest impact** on design system compliance
- **Breaking design system** currently
- **Prevents theme customization**

### **2. Create CSS Files First**
- Define all BEM classes before replacing in TSX
- Ensure CSS variables are correct
- Test dark mode thoroughly

### **3. Incremental Approach**
- Fix one component at a time
- Test after each change
- Verify visual fidelity

### **4. Keep Some Tailwind**
- Utility spacing (`p-4`, `gap-2`) is OK
- Simple layouts (`flex`, `items-center`) is OK
- Focus on replacing critical violations first

### **5. Document Changes**
- Update component documentation
- Note any breaking changes
- Update style guide

---

## 🎯 **NEXT STEPS**

1. **Review this report** - Validate findings and priorities
2. **Create task list** - Break work into manageable tasks
3. **Set up testing** - Prepare visual regression tests
4. **Begin P0 work** - Start with `dark:` class removal
5. **Track progress** - Update progress tracker regularly

---

**Report Status:** ✅ Complete  
**Date:** February 24, 2026  
**Version:** 1.0  
**Auditor:** AI Assistant
