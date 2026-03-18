# Audit Tokens — Design Token Compliance Audit

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit tokens`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Verify that ALL generated UI uses CSS variables from `/src/styles/` for colors, spacing, typography, borders, and radius. Identify and fix any hardcoded values.

**When to Use:** After building new components/templates, or periodically to verify compliance.

**Reference Files:**
- `/src/styles/theme-base.css` — Typography (font families, fluid type scale, weights), spacing scale, border radius, layout constants, animation tokens
- `/src/styles/theme-light.css` — Light mode colors and shadows
- `/src/styles/theme-dark.css` — Dark mode color overrides and shadows
- `/src/styles/global.css` — WordPress-aligned utility classes

---

## Workflow Steps

### Step 1: Read Token Definitions

1. Read `/src/styles/theme-base.css` for all theme-agnostic tokens.
2. Read `/src/styles/theme-light.css` and `/src/styles/theme-dark.css` for color tokens.
3. Note all available tokens:
   - Fonts: `--font-family-lora`, `--font-family-noto-sans`, `--font-family-caveat`, `--font-family-shadows`, `--font-family-mono`
   - Type scale: `--text-6xl` through `--text-2xs`
   - Spacing: `--spacing-*`
   - Radius: `--radius-*`
   - Colors: `--primary`, `--secondary`, `--accent`, `--foreground`, `--background`, `--card`, `--muted`, `--border`, etc.
   - Shadows: `--shadow-*`

### Step 2: Scan for Violations

Search all `.tsx` files in `/src/app/` for:

1. **Hardcoded colors:** Hex values (`#fff`, `#1a1a1a`), `rgb()`, `hsl()` in style props or inline styles.
2. **Hardcoded spacing:** Raw `px` or `rem` values in padding, gap properties.
3. **Hardcoded fonts:** Font family names (`'Lora'`, `'Noto Sans'`, `'Inter'`, `'Arial'`, `sans-serif`) instead of `var(--font-family-*)`.
4. **Hardcoded font sizes:** Raw pixel/rem sizes instead of `var(--text-*)`.
5. **Hardcoded radius:** Raw pixel values instead of `var(--radius-*)`.
6. **Exemptions:** `motion/react` animation props and dynamic CSS custom property values (`style={{ '--progress': value }}`) are permitted.

### Step 3: Fix Violations

For each violation:
1. Identify the nearest matching CSS variable from `theme-base.css`, `theme-light.css`, or `theme-dark.css`.
2. Replace the hardcoded value with the variable reference.
3. If no matching variable exists, flag it for review (do not create new tokens without user approval).

### Step 4: Report

Save report to `/reports/YYYY-MM/token-compliance-audit.md` with:
- Total files scanned
- Violations found (by category: colors, spacing, fonts, sizes, radius)
- Violations fixed
- Remaining issues (missing tokens)

---

## Token Quick Reference

| Category | Variable Pattern | Example |
|---|---|---|
| Heading font | `var(--font-family-lora)` | Lora serif |
| Body font | `var(--font-family-noto-sans)` | Noto Sans |
| Accent font | `var(--font-family-caveat)` | Caveat handwritten |
| Decorative font | `var(--font-family-shadows)` | Shadows Into Light |
| Mono font | `var(--font-family-mono)` | Courier New |
| Font size | `var(--text-base)` | Fluid clamp() value |
| Spacing | `var(--spacing-4)` | Scale token |
| Radius | `var(--radius-lg)` | Border radius |
| Color | `var(--primary)` | Semantic color |
| Shadow | `var(--shadow-sm)` | Box shadow |

---

## Success Criteria

- [ ] Zero hardcoded hex/rgb/hsl color values in style props
- [ ] Zero hardcoded px/rem spacing values
- [ ] Zero hardcoded font family names (only 5 approved font variables)
- [ ] Zero hardcoded font sizes
- [ ] Zero hardcoded border radius values
- [ ] 100% CSS variable usage for all styling
- [ ] Report saved to `/reports/`
