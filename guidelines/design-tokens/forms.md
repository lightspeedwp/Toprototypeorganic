# Form Design Tokens

**Source of Truth:** `/src/styles/theme-base.css`, `/src/styles/theme-light.css`
**Mobile Reference:** `/guidelines/mobile/forms.md`
**Last Verified:** March 13, 2026
**Status:** Active

---

## Purpose

Defines form input styling — heights, padding, borders, colors, and mobile-specific rules. All form elements must use these tokens.

---

## Input Sizing

| Size | Height Token | Min Height | Usage |
|------|-------------|------------|-------|
| Small | `var(--ui-height-sm)` | 32px | Compact forms, filters |
| Default | `var(--ui-height-md)` | 44px | Standard forms (meets touch target) |
| Large | `var(--ui-height-lg)` | 56px | Prominent inputs, hero search |

---

## Input Styling Tokens

| Property | Token | Value | Notes |
|----------|-------|-------|-------|
| Background | `var(--input-background)` | White (light) / Dark (dark) | Adapts to theme |
| Text color | `var(--foreground)` | Black / White | High contrast |
| Border | `var(--border)` | `#8A8A8A` / dark variant | WCAG 3:1 non-text contrast |
| Border width | `var(--border-width)` | 1px | Standard |
| Border radius | `var(--radius-md)` | 4px | Consistent with buttons |
| Focus ring | `var(--ring)` | Blue | High-visibility |
| Placeholder | `var(--muted-foreground)` | Grey | Readable but distinct from input |
| Padding | `var(--spacing-element-sm)` | 12–24px fluid | Internal spacing |
| Font | `var(--font-family-noto-sans)` | Noto Sans | Body font for inputs |
| Font size | `var(--text-base)` | 16px+ | **Critical:** Prevents iOS auto-zoom |

---

## Form Layout

### Zero-Margin Rule

Forms follow the zero-margin policy. Use flex/grid gaps:

```css
/* ✅ CORRECT */
.wp-pattern-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-gap-md);
}

/* ❌ WRONG */
.wp-pattern-form__field {
  margin-bottom: 1rem;
}
```

### Label Styling

| Property | Token | Notes |
|----------|-------|-------|
| Font | `var(--font-family-noto-sans)` | Body font |
| Weight | `var(--font-weight-medium)` | 500 — clear hierarchy |
| Size | `var(--text-sm)` | Slightly smaller than input |
| Color | `var(--foreground)` | Full contrast |
| Gap to input | `var(--spacing-gap-xs)` | 8–20px fluid |

---

## Mobile Rules

### iOS Auto-Zoom Prevention

**CRITICAL:** Input font size MUST be ≥ 16px to prevent iOS Safari from zooming on focus.

```css
/* ✅ CORRECT — 16px minimum */
.wp-pattern-form__input {
  font-size: var(--text-base); /* clamp(1rem, ...) — always ≥ 16px */
}

/* ❌ WRONG — triggers iOS zoom */
.wp-pattern-form__input {
  font-size: 14px;
}
```

### Touch Targets

All interactive form elements (inputs, selects, checkboxes, radio buttons) must meet the 44px minimum touch target:

```css
.wp-pattern-form__input {
  min-height: var(--touch-target-min); /* 44px */
}
```

---

## Validation States

| State | Border Token | Color Token | Icon |
|-------|-------------|-------------|------|
| Default | `var(--border)` | `var(--foreground)` | None |
| Focus | `var(--ring)` | `var(--foreground)` | None |
| Error | `var(--destructive)` | `var(--destructive)` | `CircleX` |
| Success | `var(--success)` | `var(--success)` | `CircleCheck` |
| Disabled | `var(--muted)` | `var(--muted-foreground)` | None |

---

## Do / Don't

### Do

```css
/* ✅ Use tokens for all input styling */
.wp-pattern-form__input {
  min-height: var(--ui-height-md);
  padding: var(--spacing-element-sm);
  font-family: var(--font-family-noto-sans);
  font-size: var(--text-base);
  border: var(--border-width) solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--input-background);
  color: var(--foreground);
}
```

### Don't

```css
/* ❌ Hardcoded values */
.wp-pattern-form__input {
  height: 40px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
```
