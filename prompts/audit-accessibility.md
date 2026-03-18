# Audit Accessibility — Comprehensive WCAG 2.1 AA Audit

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit accessibility`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Comprehensive accessibility audit covering focus visibility, keyboard navigation, ARIA labelling for icon-only buttons, and touch target sizing — with strict enforcement of AA baseline (24x24) and 44x44 for important controls.

**When to Use:** As a deep-dive complement to `audit a11y`. Use this for the full audit; use `audit a11y` for quick checks.

---

## Workflow Steps

### Step 1: Focus Visibility Audit

1. **`:focus-visible` styles:** Every interactive element MUST have visible `:focus-visible` styling.
2. **Focus ring styling:** Must use `outline: 2px solid var(--primary)` with `outline-offset`.
3. **Focus suppression:** Search for `outline: none` or `outline: 0` — violations unless paired with replacement.
4. **Focus within:** Composite components (dropdowns, accordions, tab panels) manage focus correctly.

### Step 2: Keyboard Navigation

1. **Tab order:** Interactive elements reachable via Tab in logical DOM order.
2. **Escape key:** Modals, dropdowns, popovers close on Escape.
3. **Arrow keys:** Tab panels, radio groups navigate with arrows.
4. **Enter/Space:** Buttons activate on Enter; checkboxes toggle on Space.
5. **Skip link:** "Skip to main content" link exists as first focusable element.
6. **Focus trap:** Modals trap focus within their bounds.
7. **Focus restoration:** When modal closes, focus returns to trigger element.

### Step 3: ARIA Labelling

1. **Icon-only buttons:** Every button containing only a `lucide-react` icon MUST have `aria-label`.
2. **Icon-only links:** Same rule for `<a>` tags with only an icon.
3. **Form associations:** Every input must have a visible `<label>` or `aria-label`/`aria-labelledby`.
4. **Dynamic regions:** Content updated dynamically should use `aria-live` (the `useResultsAnnouncement` hook handles this for archive filters).
5. **Roles:** Custom widgets must have correct ARIA roles (`role="tablist"`, etc.).
6. **States:** Toggle buttons use `aria-pressed` or `aria-expanded`. Disabled controls use `aria-disabled="true"`.
7. **Decorative elements:** Icons and ornamental SVGs must have `aria-hidden="true"`.

### Step 4: Touch Target Sizing

| Control Type | Minimum Size | Standard |
|---|---|---|
| All interactive elements | 24x24px | WCAG AA baseline |
| Primary actions (buttons, nav links) | 44x44px | Internal standard |
| Form inputs | 44px height | Internal standard |
| Icon-only buttons | 44x44px | Internal standard |
| Close/dismiss buttons | 44x44px | Internal standard |
| Pagination controls | 44x44px | Internal standard |

1. **Measure:** Flag anything below 24x24px.
2. **Important controls:** Primary buttons, nav links must meet 44x44px.
3. **Spacing:** Adjacent touch targets must have at least 8px spacing.

### Step 5: Image & Media Accessibility

1. **Alt text:** All `<img>` have `alt` — meaningful for content, empty for decorative.
2. **SVG accessibility:** Inline SVGs have `role="img"` + `aria-label`, or `aria-hidden="true"`.
3. **Background images:** Content conveyed via `background-image` has accessible text alternative.

### Step 6: Color & Contrast

1. **Text contrast:** Normal text meets 4.5:1 ratio.
2. **Large text contrast:** Text >= 18px or bold >= 14px meets 3:1 ratio.
3. **UI component contrast:** Borders, focus rings meet 3:1.
4. **Color independence:** No information conveyed by color alone.

### Step 7: Report

Save report to `/reports/YYYY-MM/accessibility-comprehensive-audit.md` with:
- Focus visibility violations
- Keyboard navigation issues
- ARIA labelling violations (icon-only buttons listed individually)
- Touch target violations (element, current size, required size)
- Contrast failures
- Fixes applied
- Remaining issues with priority (P1: blocks users, P2: degrades experience, P3: best practice)

---

## Success Criteria

- [ ] Every interactive element has visible `:focus-visible` styling
- [ ] Keyboard navigation works for all interactive flows
- [ ] All icon-only buttons/links have `aria-label`
- [ ] All interactive elements meet 24x24px minimum; important controls meet 44x44px
- [ ] All images have appropriate `alt` attributes
- [ ] Color contrast meets WCAG AA thresholds
- [ ] Report saved to `/reports/`
