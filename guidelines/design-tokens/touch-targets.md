# Touch Target Design Tokens

**Source of Truth:** `/src/styles/theme-base.css` (lines 200–208)
**Mobile Reference:** `/guidelines/mobile/touch-targets.md`
**Last Verified:** March 13, 2026
**Status:** Active

---

## Purpose

Defines minimum interactive element sizes for accessibility compliance (WCAG 2.1 AA/AAA) across all devices.

---

## Token Reference

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|-------|
| Min touch target | `var(--touch-target-min)` | 44px | Minimum hit area for all interactive elements |
| UI height small | `var(--ui-height-sm)` | 32px | Compact controls (only in desktop-only contexts) |
| UI height default | `var(--ui-height-md)` | 44px | Standard buttons, inputs, links |
| UI height large | `var(--ui-height-lg)` | 56px | Prominent CTAs, hero inputs |

---

## Rules

### Minimum 44×44px for All Interactive Elements

Every button, link, input, checkbox, radio, select, and custom interactive element MUST have a minimum touch area of 44×44px.

```css
/* ✅ CORRECT */
.wp-pattern-cta__button {
  min-height: var(--touch-target-min);
  min-width: var(--touch-target-min);
}
```

### Spacing Between Targets

Adjacent touch targets need sufficient spacing to prevent mis-taps:

| Spacing | Value | Usage |
|---------|-------|-------|
| Minimum gap | 8px | Between adjacent interactive elements |
| Recommended gap | `var(--spacing-gap-xs)` | Standard gap between buttons |

### Small Visual Elements

If a visual element appears smaller than 44px (e.g., a small icon), the **hit area** must still be 44×44px:

```css
/* ✅ Visual is 24px but hit area is 44px */
.wp-pattern-nav__icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--touch-target-min);
  height: var(--touch-target-min);
  padding: var(--spacing-element-xs);
}
```

---

## Elements That Must Meet 44px

| Element | Token | Notes |
|---------|-------|-------|
| Buttons | `var(--ui-height-md)` | All variants |
| Form inputs | `var(--ui-height-md)` | Text, select, textarea |
| Navigation links | `var(--touch-target-min)` | Via padding |
| Checkboxes/radios | `var(--touch-target-min)` | Including label click area |
| Pagination items | `var(--touch-target-min)` | Each page number |
| Filter chips | `var(--touch-target-min)` | Via min-height |
| Close buttons | `var(--touch-target-min)` | Modal/dialog close |
| Accordion headers | `var(--touch-target-min)` | FAQ toggles |

---

## Exception: Desktop-Only Compact Controls

Elements used exclusively on desktop (e.g., template browser dev tools) may use `var(--ui-height-sm)` (32px), but this must be explicitly justified and never used on touch-accessible pages.

---

## Do / Don't

### Do
- Set `min-height: var(--touch-target-min)` on all interactive elements
- Use padding to expand small visual elements to 44px hit area
- Ensure 8px+ gap between adjacent targets

### Don't
- Create buttons or links smaller than 44×44px
- Rely on text-only links without sufficient height/padding
- Place interactive elements too close together (< 8px gap)
