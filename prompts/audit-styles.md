# Audit Styles — Design System Styling Audit

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit styles`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Comprehensive audit of styling compliance across all components — CSS variable usage, WordPress utility classes, icon library, router imports, and font enforcement. Combines token, CSS, and class convention checks into a single pass.

**When to Use:** As a comprehensive pre-deployment check or after major UI changes.

---

## Workflow Steps

### Step 1: Import Library Check

Search all `.tsx` files for prohibited imports:
1. `react-router-dom` -> must be zero (use `react-router`)
2. Tailwind utility classes in `className` props -> must be zero (use BEM classes + `.wp-*` utilities)
3. Any icon library other than `lucide-react` -> flag

### Step 2: CSS Variable Compliance

Scan all `.tsx` files for inline `style` props:
1. **Colors:** Zero hardcoded hex/rgb/hsl -> must use `var(--*)` color variables
2. **Spacing:** Zero hardcoded px/rem in padding/gap -> must use `var(--spacing-*)`
3. **Typography:** Zero hardcoded font names -> must use one of:
   - `var(--font-family-lora)`
   - `var(--font-family-noto-sans)`
   - `var(--font-family-caveat)`
   - `var(--font-family-shadows)`
   - `var(--font-family-mono)`
4. **Font sizes:** Zero hardcoded sizes -> must use `var(--text-*)` scale
5. **Border radius:** Zero hardcoded radius -> must use `var(--radius-*)`
6. **Borders:** Zero hardcoded border colors -> must use `var(--border)` or semantic variables
7. **Exemptions:** `motion/react` animation props and dynamic CSS custom property values are permitted.

### Step 3: Class Convention Check

1. Custom classes must use BEM naming (`.block__element--modifier`) or `.wp-*` prefix.
2. No Tailwind utility classes (`flex`, `gap-4`, `text-center`, etc.).
3. Every component root element should have a BEM block class.

### Step 4: Font Face Verification

1. Read `/src/styles/fonts.css` and `/src/styles/theme-base.css` to get defined font faces.
2. Verify no component references a font family not in the 5 approved fonts.
3. All heading text uses `var(--font-family-lora)`.
4. All body/UI text uses `var(--font-family-noto-sans)`.
5. Accent text uses `var(--font-family-caveat)` or `var(--font-family-shadows)` sparingly.
6. Code/mono text uses `var(--font-family-mono)`.

### Step 5: Zero Margin Policy

1. Search for margin utilities or margin declarations used for layout spacing.
2. All layout spacing must use flex/grid gaps with `var(--spacing-*)` tokens.
3. Flag any `margin-top`, `margin-bottom`, `mt-*`, `mb-*` used for section/component spacing.

### Step 6: Fix and Report

1. Fix all violations found.
2. Save report to `/reports/YYYY-MM/styles-compliance-audit.md` with violation counts by category.

---

## Success Criteria

- [ ] Zero `react-router-dom` imports
- [ ] Zero Tailwind utility classes
- [ ] Zero hardcoded colors, spacing, fonts, sizes, or radius values
- [ ] All classes use BEM naming or `.wp-*` prefix
- [ ] 100% font face compliance (5 approved fonts only)
- [ ] Zero margin utilities for layout spacing
- [ ] Icons from `lucide-react` only
- [ ] Report saved to `/reports/`
