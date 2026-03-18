# Audit Retro/Funky Style — Design Language Compliance

**Type:** Audit  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `audit style`

---

## Prompt Purpose

**Objective:** Audit all pages and components for adherence to the Funky Neon design language — identify legacy branding patterns, mismatched palettes, non-compliant typography stacks, and incorrect border/radius treatments that deviate from the design token guidelines.

**When to Use:** After migrating pages to the new design system, or when reviewing visual consistency across the site.

**Reference Guidelines:**
- `/guidelines/design-tokens/funky-design.md`
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
2. **Old component patterns:** Identify components still using pre-redesign patterns (flat cards without glass effects, missing gradient stripes, no neon hover states).
3. **Inconsistent sections:** Flag pages where some sections follow the Funky Neon aesthetic and others use legacy styling (e.g., plain white cards next to glassmorphism cards).
4. **Brand mark usage:** Verify logo, brand colors, and accent treatments follow current brand guidelines.

### Step 2: Typography Compliance

1. **Font stack violations:** Search for hardcoded `font-family` declarations — only `var(--font-primary)`, `var(--font-secondary)`, and `var(--font-mono)` are permitted.
2. **Weight consistency:** Verify font weights use `var(--font-weight-*)` tokens, not numeric literals (except where tokens resolve to them in CSS).
3. **Size tokens:** All font sizes must use `var(--text-*)` tokens — no raw `px`, `rem`, or `em` values for font-size.
4. **Letter spacing:** Verify `var(--letter-spacing-*)` tokens are used, not hardcoded `em` values.
5. **Line height:** Verify `var(--line-height-*)` or `var(--leading-*)` tokens are used.

### Step 3: Border & Radius Treatment

1. **Border tokens:** All borders must use `var(--border)`, `var(--border-soft)`, or `var(--glass-border)` — no hardcoded `1px solid #...`.
2. **Radius tokens:** All border-radius values must use `var(--radius-*)` tokens — no hardcoded `px` or `rem` values.
3. **Funky accents:** Verify gradient top-stripes (the signature 3px animated gradient) exist on interactive cards.
4. **Glass effects:** Verify glassmorphism cards use `backdrop-filter: blur()` with correct `var(--glass-bg)` and `var(--glass-border)`.

### Step 4: Shadow & Glow Compliance

1. **Shadow tokens:** All box-shadow values must use `var(--shadow-*)` or `var(--shadow-neon*)` tokens.
2. **Neon glows:** Dark mode hover states should use neon glow effects (`var(--shadow-neon)`, `var(--shadow-glow-*)`).
3. **No hardcoded shadows:** Search for inline `box-shadow` with raw pixel/color values.

### Step 5: Spacing Compliance

1. **Spacing tokens:** All padding, margin, and gap values must use `var(--spacing-*)` tokens.
2. **Padding-first architecture:** Verify components use padding and gap primarily, with margin reserved for rare layout-level spacing.
3. **Section spacing:** Verify consistent section padding across pages (`var(--spacing-20)` or `var(--spacing-24)` for major sections).

### Step 6: Report

Save report to `/reports/YYYY-MM/retro-style-audit.md` with:
- Pages/components audited
- Legacy pattern violations (by file)
- Typography violations
- Border/radius violations
- Shadow/glow violations
- Spacing violations
- Fixes applied
- Remaining issues with priority

---

## Success Criteria

- [ ] Zero legacy palette references (`COLORS` constants, old theme objects)
- [ ] All typography uses design token font variables exclusively
- [ ] All borders and radii use design token variables
- [ ] Glassmorphism and neon glow patterns applied consistently
- [ ] All spacing uses `var(--spacing-*)` tokens
- [ ] Report saved to `/reports/`
