# Button Design Tokens

**Source of Truth:** `/src/styles/theme-base.css`, `/src/styles/theme-light.css`, `/src/styles/theme-dark.css`
**Component:** `/src/app/components/ui/button.tsx`
**Last Verified:** March 13, 2026
**Status:** Active

---

## Purpose

Defines the button styling system — variants, sizes, states, and their CSS variable mappings. All buttons must use design tokens for colors, spacing, radius, and typography.

---

## Button Variants

### Primary (Default)

| Property | Token | Light Value | Dark Value |
|----------|-------|-------------|------------|
| Background | `var(--primary)` | `#4A7311` | Dark mode value |
| Text | `var(--primary-foreground)` | `#FFFFFF` | Dark mode value |
| Border | None | — | — |
| Hover | Opacity or shade shift | — | — |

```tsx
<Button variant="default">Primary Action</Button>
```

### Secondary

| Property | Token | Usage |
|----------|-------|-------|
| Background | `var(--secondary)` | Warm beige/brown |
| Text | `var(--secondary-foreground)` | White |

### Outline

| Property | Token | Usage |
|----------|-------|-------|
| Background | Transparent | — |
| Text | `var(--foreground)` | Default text color |
| Border | `var(--border)` | Standard border |

### Ghost

| Property | Token | Usage |
|----------|-------|-------|
| Background | Transparent | — |
| Text | `var(--foreground)` | Default text color |
| Hover BG | `var(--accent)` | Subtle highlight |

### Destructive

| Property | Token | Usage |
|----------|-------|-------|
| Background | `var(--destructive)` | Red |
| Text | `var(--destructive-foreground)` | White |

---

## Button Sizes

| Size | Height Token | Padding | Font |
|------|-------------|---------|------|
| Small (`sm`) | `var(--ui-height-sm)` (32px) | `var(--spacing-element-xs)` | `var(--text-sm)` |
| Default (`default`) | `var(--ui-height-md)` (44px) | `var(--spacing-element-sm)` | `var(--text-base)` |
| Large (`lg`) | `var(--ui-height-lg)` (56px) | `var(--spacing-element-md)` | `var(--text-lg)` |
| Icon | `var(--ui-height-md)` (44px) | Equal padding | — |

**Accessibility:** Default and icon sizes meet the 44px minimum touch target (`var(--touch-target-min)`).

---

## Usage Rules

### Do

```tsx
{/* ✅ CORRECT — use variant prop, design system handles styling */}
<Button variant="default" size="default">Book Now</Button>
<Button variant="outline" size="lg">Learn More</Button>
```

```css
/* ✅ CORRECT — override via BEM class using tokens */
.wp-pattern-cta__button {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius-lg);
  padding: var(--spacing-element-sm) var(--spacing-element-md);
  font-family: var(--font-family-noto-sans);
  font-weight: var(--font-weight-medium);
  transition: opacity var(--transition-fast);
}
```

### Don't

```tsx
{/* ❌ WRONG — hardcoded colors */}
<button style={{ backgroundColor: '#4A7311', color: 'white' }}>Book Now</button>

{/* ❌ WRONG — arbitrary Tailwind colors */}
<button className="bg-green-700 text-white">Book Now</button>
```

---

## Focus States

All buttons MUST have visible focus indicators:

```css
.wp-pattern-cta__button:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

---

## Button Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Button text | `var(--font-family-noto-sans)` | `var(--font-weight-medium)` (500) | Matches size variant |
| Button label | `var(--font-family-noto-sans)` | `var(--font-weight-medium)` (500) | `var(--text-sm)` |

---

## Icon + Text Buttons

Buttons with icons must use flex layout with gap:

```css
.wp-pattern-cta__button {
  display: flex;
  align-items: center;
  gap: var(--spacing-gap-xs);
}
```

**Icon sizing:** Icons inside buttons should be 16px (`sm`), 20px (`default`), or 24px (`lg`).
