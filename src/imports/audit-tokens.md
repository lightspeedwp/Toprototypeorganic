# Audit Tokens — Design Token Compliance Audit

**Type:** Audit  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `audit tokens`

---

## Prompt Purpose

**Objective:** Verify that ALL generated UI uses CSS variables from `/src/styles/` for colors, spacing, typography, borders, and radius. Identify and fix any hardcoded values.

**When to Use:** After building new components/templates, or periodically to verify compliance.

---

## Workflow Steps

### Step 1: Read Token Definitions

1. Read `/src/styles/theme.css` and `/src/styles/global.css` for defined CSS variables.
2. Note all available tokens: `--spacing-*`, `--font-*`, `--text-*`, `--radius*`, color variables.

### Step 2: Scan for Violations

Search all `.tsx` files in `/src/app/` for:

1. **Hardcoded colors:** Hex values (`#fff`, `#1a1a1a`), `rgb()`, `hsl()` in style props or inline styles.
2. **Hardcoded spacing:** Raw `px` or `rem` values in padding, margin, gap properties.
3. **Hardcoded fonts:** Font family names (`'Lexend'`, `'Inter'`, `sans-serif`) instead of `var(--font-*)`.
4. **Hardcoded font sizes:** Raw pixel/rem sizes instead of `var(--text-*)`.
5. **Hardcoded radius:** Raw pixel values instead of `var(--radius*)`.

### Step 3: Fix Violations

For each violation:
1. Identify the nearest matching CSS variable.
2. Replace the hardcoded value with the variable reference.
3. If no matching variable exists, flag it for review (do not create new tokens).

### Step 4: Report

Save report to `/reports/YYYY-MM/token-compliance-audit.md` with:
- Total files scanned
- Violations found (by category)
- Violations fixed
- Remaining issues

---

## Success Criteria

- [ ] Zero hardcoded hex/rgb/hsl color values in style props
- [ ] Zero hardcoded px/rem spacing values
- [ ] Zero hardcoded font family names
- [ ] Zero hardcoded font sizes
- [ ] 100% CSS variable usage for all styling
- [ ] Report saved to `/reports/`
