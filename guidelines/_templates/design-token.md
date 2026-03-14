# [Token Category Name] Design Tokens

**Source of Truth:** `/src/styles/[file].css`
**Last Verified:** [DATE]
**Status:** Active

---

## Purpose

[1-2 sentences explaining what this token category controls and why it matters.]

---

## Source CSS Files

| File | What It Contains |
|------|------------------|
| `/src/styles/theme-base.css` | [Describe what's in here for this category] |
| `/src/styles/theme-light.css` | [If applicable — light mode overrides] |
| `/src/styles/theme-dark.css` | [If applicable — dark mode overrides] |

---

## Token Reference

### [Sub-category 1]

| Token | CSS Variable | Value (Light) | Value (Dark) | Usage |
|-------|-------------|---------------|--------------|-------|
| [Name] | `var(--token-name)` | `[value]` | `[value]` | [Where to use] |

### [Sub-category 2]

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|-------|
| [Name] | `var(--token-name)` | `[value]` | [Where to use] |

---

## Usage Rules

### Do

```css
/* ✅ CORRECT — use the CSS variable */
.my-element {
  [property]: var(--token-name);
}
```

```tsx
{/* ✅ CORRECT — use Tailwind class mapped to token */}
<div className="[tailwind-class]">
```

### Don't

```css
/* ❌ WRONG — hardcoded value */
.my-element {
  [property]: [hardcoded-value];
}
```

```tsx
{/* ❌ WRONG — inline style */}
<div style={{ [property]: '[value]' }}>
```

---

## Tailwind Mapping

| CSS Variable | Tailwind Class | Notes |
|-------------|----------------|-------|
| `var(--token)` | `class-name` | [Usage notes] |

---

## Responsive Behaviour

[Describe how this token category behaves across breakpoints. If tokens use `clamp()`, document the min/preferred/max values.]

---

## Accessibility

[WCAG compliance notes specific to this token category.]

---

## WordPress Mapping

| CSS Variable | WordPress `theme.json` Path | Notes |
|-------------|----------------------------|-------|
| `var(--token)` | `settings.[category].[name]` | [Mapping notes] |
