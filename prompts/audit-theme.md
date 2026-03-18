# Audit Theme — Light/Dark Mode Token Compliance

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit theme`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Audit the entire codebase for light/dark mode compliance — verify theme switching mechanism, eliminate hardcoded color/font values in TSX/TS, validate token inversion per the dual-theme system, and confirm WCAG 1.4.3 contrast in both modes.

**When to Use:** After design token updates, theme refactors, or when adding new pages/components.

**Reference Files:**
- `/src/styles/theme-base.css` — Theme-agnostic tokens (typography, spacing, radius)
- `/src/styles/theme-light.css` — Light mode colors and shadows
- `/src/styles/theme-dark.css` — Dark mode color overrides

---

## Workflow Steps

### Step 1: Theme Switching Mechanism

1. **Verify toggle:** Theme switching uses `html[data-theme]` or `.dark` class and works across all routes.
2. **Persistence:** Theme preference persists across navigation.
3. **No stranded tokens:** No light-mode-only token values leak into dark mode or vice versa.
4. **System preference:** `prefers-color-scheme` media query is respected as fallback.

### Step 2: Hardcoded Value Scan

Scan all `.ts` and `.tsx` files for:

1. **Hex values:** Hardcoded hex colors (`#fff`, `#000`, `#3b82f6`) — must use CSS variables.
2. **RGB/HSL literals:** `rgb(`, `rgba(`, `hsl(`, `hsla(` — must use CSS variables.
3. **Font-family literals:** Hardcoded font names — must use:
   - `var(--font-family-lora)`
   - `var(--font-family-noto-sans)`
   - `var(--font-family-caveat)`
   - `var(--font-family-shadows)`
   - `var(--font-family-mono)`
4. **Inline styles:** Check `style={{}}` props for hardcoded color, background, or font values.
5. **Exemptions:** `motion/react` animation props and dynamic CSS custom property values are permitted.

### Step 3: Token Inversion Validation

1. **Background/foreground pairs:** `--background` <-> `--foreground` invert correctly.
2. **Card surfaces:** `--card`, `--card-foreground` use correct values per mode.
3. **Muted surfaces:** `--muted`, `--muted-foreground` contrast correctly.
4. **Border tokens:** `--border`, `--border-soft` are visible in both modes.
5. **Primary/accent:** `--primary`, `--accent`, `--secondary` have mode-appropriate values.

### Step 4: Contrast Compliance (WCAG 1.4.3)

1. **Normal text:** All text/background combinations meet 4.5:1.
2. **Large text:** Headings >= 18px meet 3:1.
3. **Interactive states:** Buttons, links, form elements meet contrast in all states — both modes.

### Step 5: Report

Save report to `/reports/YYYY-MM/theme-mode-audit.md` with:
- Hardcoded violations by file
- Token inversion issues
- Contrast failures by mode
- Fixes applied
- Remaining issues

---

## Success Criteria

- [ ] Theme switching works on all routes without stranded tokens
- [ ] Zero hardcoded hex/rgb/font-family values in `.ts`/`.tsx` files (with documented exemptions)
- [ ] All semantic token pairs invert correctly
- [ ] WCAG 1.4.3 contrast met in both light and dark modes
- [ ] Only 5 approved font families used: Lora, Noto Sans, Caveat, Shadows Into Light, Courier New
- [ ] Report saved to `/reports/`
