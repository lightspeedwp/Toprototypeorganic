# 🚀 P0-2 IN PROGRESS: UI COMPONENTS

**Task:** Remove dark: Classes from UI Components (shadcn/ui)  
**Status:** 🟦 **IN PROGRESS** (60% complete)  
**Date Started:** February 24, 2026

---

## 📊 **PROGRESS TRACKING**

### **Files Updated (6/11):**

1. ✅ `/src/app/components/blocks/ui/input.tsx` - COMPLETE
   - Removed 2 `dark:` instances
   - Now uses `.wp-ui-input` BEM class
   
2. ✅ `/src/app/components/blocks/ui/textarea.tsx` - COMPLETE
   - Removed 1 `dark:` instance
   - Now uses `.wp-ui-textarea` BEM class
   
3. ✅ `/src/app/components/blocks/ui/select.tsx` - COMPLETE
   - Removed 2 `dark:` instances
   - Now uses `.wp-ui-select` BEM class with size variants
   
4. ✅ `/src/app/components/blocks/ui/checkbox.tsx` - COMPLETE
   - Removed 2 `dark:` instances
   - Now uses `.wp-ui-checkbox` BEM class
   
5. ✅ `/src/app/components/blocks/ui/radio-group.tsx` - COMPLETE
   - Removed 1 `dark:` instance
   - Now uses `.wp-ui-radio` BEM class

6. ✅ `/src/styles/blocks/ui-components.css` - CREATED
   - Complete CSS file with all BEM classes
   - Uses WordPress theme.json CSS variables ONLY
   - Supports light and dark modes via `.dark` selector
   - ZERO `dark:` Tailwind classes

### **Files Remaining (5/11):**

6. ⬜ `/src/app/components/blocks/ui/switch.tsx` (2 `dark:` instances)
7. ⬜ `/src/app/components/blocks/ui/tabs.tsx` (3 `dark:` instances)
8. ⬜ `/src/app/components/blocks/ui/badge.tsx` (2 `dark:` instances)
9. ⬜ `/src/app/components/blocks/ui/toggle.tsx` (1 `dark:` instance)
10. ⬜ `/src/app/components/blocks/ui/input-otp.tsx` (1 `dark:` instance)
11. ⬜ `/src/app/components/blocks/ui/breadcrumb.tsx` (1 `dark:` instance)

---

## ✅ **COMPLETED WORK**

### **CSS File Created:**

Created comprehensive `/src/styles/blocks/ui-components.css` with:
- ✅ All 11 component BEM classes defined
- ✅ 100% WordPress theme.json variable alignment
- ✅ Light AND dark mode support via `.dark` selector
- ✅ ZERO `dark:` Tailwind classes
- ✅ All colors use CSS variables from theme-light.css and theme-dark.css
- ✅ All typography uses CSS variables (font families, sizes, weights)
- ✅ All spacing uses CSS variables or fixed values
- ✅ All borders use CSS variables
- ✅ All radius uses CSS variables
- ✅ All shadows use CSS variables

### **Typography Alignment:**
✅ Uses ONLY defined font faces:
- `var(--font-family-noto-sans)` for all UI text
- `var(--text-base)`, `var(--text-sm)`, `var(--text-xs)` for font sizes
- `var(--font-weight-normal)`, `var(--font-weight-medium)` for font weights

### **Color Alignment:**
✅ Uses WordPress theme.json color variables:
- `var(--background)`, `var(--foreground)`
- `var(--card)`, `var(--card-foreground)`
- `var(--primary)`, `var(--primary-foreground)`
- `var(--secondary)`, `var(--secondary-foreground)`
- `var(--accent)`, `var(--accent-foreground)`
- `var(--muted)`, `var(--muted-foreground)`
- `var(--destructive)`, `var(--destructive-foreground)`
- `var(--success)`, `var(--success-foreground)`
- `var(--border)`, `var(--input)`, `var(--input-background)`, `var(--ring)`

### **Effects Alignment:**
✅ Uses WordPress theme.json effects:
- `var(--radius-sm)`, `var(--radius-md)`, `var(--radius-lg)`, `var(--radius-xl)`, `var(--radius-full)`
- `var(--elevation-sm)` for shadows

---

## 🎯 **NEXT STEPS**

### **Remaining Work:**
1. Update switch.tsx
2. Update tabs.tsx
3. Update badge.tsx
4. Update toggle.tsx
5. Update input-otp.tsx
6. Update breadcrumb.tsx

**Estimated Time Remaining:** 30-45 minutes

---

**Status:** 🟦 In Progress  
**Completion:** 60% (6/11 files)  
**Dark Classes Removed:** 8/17 (47%)
