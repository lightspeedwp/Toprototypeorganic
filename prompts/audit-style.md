# Audit Style — Organic Design Language Compliance

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit style`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Audit all pages and components for adherence to the Organic design language — identify legacy branding patterns, mismatched palettes, non-compliant typography stacks, and incorrect border/radius/shadow treatments that deviate from the design token guidelines.

**When to Use:** After migrating pages to the new design system, or when reviewing visual consistency across the site.

**Reference Files:**
- `/src/styles/theme-base.css` — Typography, spacing, radius, animation tokens
- `/src/styles/theme-light.css` — Light mode colors and shadows
- `/src/styles/theme-dark.css` — Dark mode colors and shadows
- `/src/styles/theme-organic.css` — Organic design tokens
- `/guidelines/design-tokens/colors.md`
- `/guidelines/design-tokens/typography.md`
- `/guidelines/design-tokens/borders.md`
- `/guidelines/design-tokens/radii.md`
- `/guidelines/design-tokens/shadows.md`

---

## Workflow Steps

### Step 1: Legacy Branding Pattern Scan

Scan all `.tsx` and `.css` files for:

1. **Mismatched palette sources:** Find imports or references to legacy `COLORS` constants, old theme objects, or non-token color mappings.
2. **Old component patterns:** Identify components still using pre-redesign patterns that don't match the organic aesthetic.
3. **Inconsistent sections:** Flag pages where some sections follow the organic aesthetic and others use legacy styling.
4. **Brand mark usage:** Verify logo, brand colors, and accent treatments follow current brand guidelines.

### Step 2: Typography Compliance

1. **Font stack violations:** Search for hardcoded `font-family` declarations — only these 5 CSS variables are permitted:
   - `var(--font-family-lora)` — Headings, editorial content
   - `var(--font-family-noto-sans)` — Body text, UI elements
   - `var(--font-family-caveat)` — Accent/display text (use sparingly)
   - `var(--font-family-shadows)` — Decorative accents (very sparingly)
   - `var(--font-family-mono)` — Code, technical content
2. **Weight consistency:** Verify font weights use `var(--font-weight-*)` tokens.
3. **Size tokens:** All font sizes must use `var(--text-*)` tokens — no raw `px`, `rem`, or `em` values.
4. **Letter spacing:** Verify `var(--letter-spacing-*)` tokens are used.
5. **Line height:** Verify `var(--line-height-*)` or `var(--leading-*)` tokens are used.

### Step 3: Border & Radius Treatment

1. **Border tokens:** All borders must use `var(--border)`, `var(--border-soft)`, or semantic border variables — no hardcoded `1px solid #...`.
2. **Radius tokens:** All border-radius values must use `var(--radius-*)` tokens.
3. **Organic accents:** Verify organic shape elements and decorative borders follow the design system.

### Step 4: Shadow Compliance

1. **Shadow tokens:** All box-shadow values must use `var(--shadow-*)` tokens.
2. **No hardcoded shadows:** Search for inline `box-shadow` with raw pixel/color values.
3. **Mode awareness:** Shadows should differ between light/dark mode via CSS variables.

### Step 5: Spacing Compliance

1. **Spacing tokens:** All padding and gap values must use `var(--spacing-*)` tokens.
2. **Zero Margin Policy:** Verify components use padding and gap only, with zero margin utilities for layout.
3. **Section spacing:** Verify consistent section padding across pages using design tokens.

### Step 6: Report

Save report to `/reports/YYYY-MM/style-audit.md` with:
- Pages/components audited
- Legacy pattern violations (by file)
- Typography violations
- Border/radius violations
- Shadow violations
- Spacing violations
- Fixes applied
- Remaining issues with priority

---

## Success Criteria

- [ ] Zero legacy palette references
- [ ] All typography uses the 5 approved font variables exclusively
- [ ] All borders and radii use design token variables
- [ ] All shadows use design token variables
- [ ] All spacing uses `var(--spacing-*)` tokens
- [ ] Zero margin utilities for layout
- [ ] Report saved to `/reports/`
