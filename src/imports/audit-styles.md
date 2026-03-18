# Audit Styles — Design System Styling Audit

**Type:** Audit  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `audit styles`

---

## Prompt Purpose

**Objective:** Comprehensive audit of styling compliance across all components — CSS variable usage, WordPress utility classes, icon library, router imports, and font enforcement. Combines token, CSS, and class convention checks into a single pass.

**When to Use:** As a comprehensive pre-deployment check or after major UI changes.

---

## Workflow Steps

### Step 1: Import Library Check

Search all `.tsx` files for prohibited imports:
1. `lucide-react` → must be zero (use `@phosphor-icons/react`)
2. `react-router-dom` → must be zero (use `react-router`)
3. Tailwind utility classes in `className` props → must be zero

### Step 2: CSS Variable Compliance

Scan all `.tsx` files for inline `style` props:
1. **Colors:** Zero hardcoded hex/rgb/hsl → must use `var(--*)` color variables
2. **Spacing:** Zero hardcoded px/rem in padding/margin/gap → must use `var(--spacing-*)`
3. **Typography:** Zero hardcoded font names → must use `var(--font-primary)` or `var(--font-secondary)`
4. **Font sizes:** Zero hardcoded sizes → must use `var(--text-*)` scale
5. **Border radius:** Zero hardcoded radius → must use `var(--radius*)`
6. **Borders:** Zero hardcoded border colors → must use `var(--border)` or semantic variables

### Step 3: Class Convention Check

1. Custom classes must use `.wp-*` prefix for WordPress compatibility.
2. No Tailwind utility classes (`flex`, `gap-4`, `text-center`, etc.).
3. BEM-style naming where appropriate.

### Step 4: Font Face Verification

1. Read `/src/styles/fonts.css` to get defined font faces.
2. Verify no component references a font family not defined in the CSS.
3. All heading text uses `var(--font-primary)` or `var(--font-secondary)`.

### Step 5: Fix and Report

1. Fix all violations found.
2. Save report to `/reports/YYYY-MM/styles-compliance-audit.md` with violation counts by category.

---

## Success Criteria

- [ ] Zero `lucide-react` imports
- [ ] Zero `react-router-dom` imports
- [ ] Zero Tailwind utility classes
- [ ] Zero hardcoded colors, spacing, fonts, sizes, or radius values
- [ ] All classes use `.wp-*` prefix
- [ ] 100% font face compliance
- [ ] Report saved to `/reports/`
