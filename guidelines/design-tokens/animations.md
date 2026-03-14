# Animation & Transition Design Tokens

**Source of Truth:** `/src/styles/theme-base.css` (lines 210–223)
**Last Verified:** March 13, 2026
**Status:** Active

---

## Purpose

Defines transition durations, easing curves, and animation tokens. All motion must use these tokens to maintain consistent, accessible interactions across the prototype.

---

## Source CSS Files

| File | What It Contains |
|------|------------------|
| `/src/styles/theme-base.css` | Transition durations, easing curves |
| `/src/styles/theme-organic-motion.css` | Organic easing + `prefers-reduced-motion` support |

---

## Token Reference

### Transition Durations

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|-------|
| Fast | `var(--transition-fast)` | `150ms ease` | Hover states, toggles, micro-interactions |
| Base | `var(--transition-base)` | `200ms ease` | Default transitions, button states |
| Slow | `var(--transition-slow)` | `300ms ease` | Panel reveals, accordion open/close |
| Slower | `var(--transition-slower)` | `500ms ease` | Page transitions, hero animations |

### Easing Curves

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|-------|
| Ease In | `var(--ease-in)` | `cubic-bezier(0.4, 0, 1, 1)` | Elements exiting view |
| Ease Out | `var(--ease-out)` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering view |
| Ease In-Out | `var(--ease-in-out)` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default for most transitions |
| Spring | `var(--ease-spring)` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful/bouncy interactions |

---

## Usage Rules

### Do

```css
/* ✅ CORRECT — use the CSS variable */
.wp-pattern-card:hover {
  transition: transform var(--transition-base);
}

.wp-pattern-accordion__content {
  transition: max-height var(--transition-slow);
}
```

### Don't

```css
/* ❌ WRONG — hardcoded duration */
.wp-pattern-card:hover {
  transition: transform 200ms ease;
}

/* ❌ WRONG — arbitrary easing */
.my-element {
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

---

## Motion/React (Framer Motion) Integration

When using the `motion` package, reference CSS variables for consistency:

```tsx
// ✅ CORRECT — motion/react with design tokens
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
/>
```

**Note:** Motion/react `style` prop is an exempt inline style per the design system contract.

---

## Accessibility: Reduced Motion

All animations MUST respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This is implemented globally in `theme-organic-motion.css`.

---

## Quick Reference

| Need | Use |
|------|-----|
| Hover/focus feedback | `var(--transition-fast)` |
| General transitions | `var(--transition-base)` |
| Panels/accordions | `var(--transition-slow)` |
| Page-level animations | `var(--transition-slower)` |
| Entering elements | `var(--ease-out)` |
| Exiting elements | `var(--ease-in)` |
| Playful bounce | `var(--ease-spring)` |
