# Dark & Light Mode Design Tokens

**Source of Truth:** `/src/styles/theme-light.css`, `/src/styles/theme-dark.css`
**Last Verified:** March 13, 2026
**Status:** Active

---

## Purpose

Defines how the dual-theme system works — how colors switch between modes, how to add new tokens, and the rules that prevent mode-specific bugs.

---

## Architecture

```
theme.css (orchestrator)
├── theme-base.css     ← Shared: typography, spacing, radius, animation
├── theme-light.css    ← :root colors, shadows, logos (default)
├── theme-dark.css     ← .dark overrides for all color tokens
└── theme-variables.css ← WordPress --wp--preset--* namespace
```

### How It Works

1. **Light mode** is the default (`:root` in `theme-light.css`)
2. **Dark mode** activates when `.dark` class is on `<html>` element
3. **All components reference semantic tokens** — never raw colors
4. **Automatic switching** — no `dark:` Tailwind classes needed

---

## Rules

### Critical: No `dark:` Classes

```tsx
{/* ❌ NEVER — dark: Tailwind classes are banned */}
<div className="bg-white dark:bg-slate-800 text-black dark:text-white">

{/* ✅ ALWAYS — semantic tokens handle both modes */}
<div className="bg-background text-foreground">
```

### Token Pairing

Every color token has a `-foreground` companion that guarantees readable contrast:

| Surface Token | Text Token | Light Contrast | Dark Contrast |
|--------------|------------|----------------|---------------|
| `--background` | `--foreground` | 21:1 | 15.3:1 |
| `--card` | `--card-foreground` | 21:1 | 15.3:1 |
| `--primary` | `--primary-foreground` | 7.23:1 | AA+ |
| `--secondary` | `--secondary-foreground` | 8.14:1 | AA+ |
| `--accent` | `--accent-foreground` | 5.76:1 | AA+ |
| `--muted` | `--muted-foreground` | 6.68:1 | AA+ |
| `--destructive` | `--destructive-foreground` | 8.59:1 | AA+ |

### Adding New Color Tokens

When adding a new semantic color:

1. Define in `theme-light.css` under `:root`
2. Define dark override in `theme-dark.css` under `.dark`
3. Add RGB companion (`--token-rgb`) if `rgba()` usage is needed
4. Verify WCAG AA contrast (≥ 4.5:1 for text, ≥ 3:1 for non-text)
5. Update this guideline file

---

## Mode-Specific Assets

### Logos

| Mode | Variable | Asset |
|------|----------|-------|
| Light | `var(--logo-url)` | Dark logo on white background |
| Dark | `var(--logo-url)` | Light logo on dark background |

### Shadows

Shadows are mode-specific because opacity perception differs on dark backgrounds:

| Token | Light | Dark |
|-------|-------|------|
| `var(--elevation-sm)` | `0px 1px 2px rgba(0,0,0,0.05)` | Adjusted opacity |
| `var(--elevation-md)` | `0px 4px 6px rgba(0,0,0,0.10)` | Adjusted opacity |

---

## Testing Dark Mode

1. Toggle via the dark mode switcher in the header
2. Check browser console for contrast audit results (auto-runs in dev)
3. Verify all text is readable on all surfaces
4. Verify no elements "disappear" (same color as background)
5. Verify images and logos switch appropriately

---

## Do / Don't

### Do

```css
/* ✅ Use semantic tokens — they switch automatically */
.wp-pattern-card {
  background-color: var(--card);
  color: var(--card-foreground);
  border: var(--border-width) solid var(--border);
}
```

### Don't

```css
/* ❌ Hardcoded colors won't switch in dark mode */
.wp-pattern-card {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #e0e0e0;
}

/* ❌ dark: classes bypass the token system */
.dark .wp-pattern-card {
  background-color: #1a1a1a;
}
```

---

## Related Guidelines

| Guideline | Relationship |
|-----------|-------------|
| `/guidelines/design-tokens/colors.md` | Full color token reference |
| `/guidelines/design-tokens/shadows.md` | Mode-specific shadow tokens |
