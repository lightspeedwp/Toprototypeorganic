# Audit Accessibility — WCAG 2.1 AA Compliance Audit

**Type:** Audit  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `audit a11y`

---

## Prompt Purpose

**Objective:** Audit all components and templates for WCAG 2.1 AA accessibility compliance — semantic HTML, keyboard navigation, ARIA labels, focus states, touch targets, and reduced motion support.

**When to Use:** After building new UI components, or periodically as a quality gate.

---

## Workflow Steps

### Step 1: Semantic HTML Audit

Scan `.tsx` files for:
1. **Heading hierarchy:** Each page has one `<h1>`, headings are sequential (no H1 → H3 skip).
2. **Landmark elements:** `<main>`, `<nav>`, `<header>`, `<footer>`, `<aside>` used appropriately.
3. **List markup:** Related items use `<ul>`/`<ol>` + `<li>`, not stacked `<div>`.
4. **Button vs link:** `<button>` for actions, `<a>` for navigation — no `<div onClick>`.

### Step 2: Keyboard Navigation

1. **Interactive elements:** All clickable elements are focusable (`<button>`, `<a>`, or `tabIndex`).
2. **Focus order:** Logical tab order follows visual layout.
3. **Focus visibility:** All interactive elements have visible focus styles (`:focus-visible`).
4. **Skip link:** Site has a skip-to-content link.

### Step 3: ARIA Labels

1. **Icon-only buttons:** Must have `aria-label` or `<span className="sr-only">`.
2. **Form inputs:** All inputs have associated `<label>` or `aria-label`.
3. **Dynamic content:** Modals, dropdowns, and toggles have proper ARIA roles and states.
4. **Images:** All `<img>` have meaningful `alt` text (or `alt=""` for decorative).

### Step 4: Touch Targets

1. All interactive elements meet minimum 44x44px touch target size.
2. Sufficient spacing between adjacent touch targets.
3. See `/guidelines/design-tokens/touch-targets.md` for standards.

### Step 5: Reduced Motion

1. Animations respect `prefers-reduced-motion` media query.
2. No essential information conveyed only through animation.
3. CSS transitions/animations have `@media (prefers-reduced-motion: reduce)` alternatives.

### Step 6: Color Contrast

1. Text color vs background meets 4.5:1 ratio (normal text) or 3:1 (large text).
2. Interactive elements have sufficient contrast in all states (default, hover, focus, active).
3. Information is not conveyed by color alone.

### Step 7: Report

Save report to `/reports/YYYY-MM/accessibility-audit.md` with:
- Files scanned
- Violations by category (semantic, keyboard, ARIA, touch, motion, contrast)
- Fixes applied
- Remaining issues with priority levels

---

## Success Criteria

- [ ] All pages have correct heading hierarchy
- [ ] All interactive elements are keyboard accessible
- [ ] All icon-only buttons have labels
- [ ] All touch targets meet 44x44px minimum
- [ ] Reduced motion support exists for all animations
- [ ] Report saved to `/reports/`
