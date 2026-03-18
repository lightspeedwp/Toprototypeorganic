# Audit Light/Dark Mode — Theme Token Compliance

**Type:** Audit  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `audit theme`

---

## Prompt Purpose

**Objective:** Audit the entire codebase for light/dark mode compliance — verify theme switching mechanism, eliminate hardcoded color/font values in TSX/TS, validate token inversion per `dark-light-mode.md`, and confirm WCAG 1.4.3 contrast in both modes.

**When to Use:** After design token updates, theme refactors, or when adding new pages/components.

**Reference Guidelines:**
- `/guidelines/design-tokens/dark-light-mode.md`
- `/guidelines/design-tokens/colors.md`
- `/guidelines/design-tokens/typography.md`

---

## Workflow Steps

### Step 1: Theme Switching Mechanism

1. **Verify toggle:** Theme switching uses `html[data-theme]` or `.dark` class and works across all routes.
2. **Persistence:** Theme preference persists across navigation (no flash of wrong theme).
3. **No stranded tokens:** Confirm no light-mode-only token values leak into dark mode or vice versa.
4. **System preference:** Verify `prefers-color-scheme` media query is respected as fallback.

### Step 2: Hardcoded Value Scan

Scan all `.ts` and `.tsx` files for violations:

1. **Hex values:** Search for hardcoded hex colors (`#fff`, `#000`, `#3b82f6`, etc.) — must use CSS variables.
2. **RGB/HSL literals:** Search for `rgb(`, `rgba(`, `hsl(`, `hsla(` — must use CSS variables.
3. **Font-family literals:** Search for hardcoded font names (`"Inter"`, `"Poppins"`, `sans-serif`, etc.) — must use `var(--font-primary)`, `var(--font-secondary)`, or `var(--font-mono)`.
4. **Known offenders:** Flag `src/constants/theme.ts` specifically — any hardcoded values there must migrate to CSS variables.
5. **Inline styles:** Check `style={{}}` props for hardcoded color, background, or font values.

### Step 3: Token Inversion Validation

Per `/guidelines/design-tokens/dark-light-mode.md`:

1. **Background/foreground pairs:** Verify all semantic pairs invert correctly (e.g., `--background` ↔ `--foreground`).
2. **Card surfaces:** `--card`, `--card-foreground` use correct token values per mode.
3. **Muted surfaces:** `--muted`, `--muted-foreground` contrast correctly in both modes.
4. **Border tokens:** `--border`, `--border-soft` are visible in both modes.
5. **Primary/accent:** Verify `--primary`, `--accent`, `--secondary` have mode-appropriate values (no washed-out neon in light mode, no invisible pastels in dark mode).

### Step 4: Contrast Compliance (WCAG 1.4.3)

1. **Normal text:** All text/background combinations meet 4.5:1 contrast ratio.
2. **Large text:** Headings and text ≥18px meet 3:1 contrast ratio.
3. **Interactive states:** Buttons, links, and form elements meet contrast in default, hover, focus, and disabled states — both modes.
4. **Neon effects:** Verify neon glow text remains readable (gradient text with `background-clip: text` must have fallback `color` on the element or ancestor).

### Step 5: Report

Save report to `/reports/YYYY-MM/theme-mode-audit.md` with:
- Files scanned (count of `.ts`, `.tsx`, `.css`)
- Hardcoded violations by file (hex, rgb, font-family)
- Token inversion issues
- Contrast failures by mode
- Fixes applied
- Remaining issues with priority levels

---

## Success Criteria

- [ ] Theme switching works on all routes without stranded tokens
- [ ] Zero hardcoded hex/rgb/font-family values in `.ts`/`.tsx` files
- [ ] `src/constants/theme.ts` uses only CSS variable references
- [ ] All semantic token pairs invert correctly per `dark-light-mode.md`
- [ ] WCAG 1.4.3 contrast met in both light and dark modes
- [ ] Report saved to `/reports/`
