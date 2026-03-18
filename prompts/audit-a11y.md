# Audit A11y — WCAG 2.1 AA Quick Accessibility Audit

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit a11y`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Quick accessibility audit covering semantic HTML, keyboard navigation, ARIA labels, focus states, touch targets, and reduced motion support. For a comprehensive deep-dive, use `audit accessibility` instead.

**When to Use:** After building new UI components, or as a periodic quality gate.

---

## Workflow Steps

### Step 1: Semantic HTML Audit

1. **Heading hierarchy:** Each page has one `<h1>`, headings are sequential (no H1 -> H3 skip).
2. **Landmark elements:** `<main>`, `<nav>`, `<header>`, `<footer>`, `<aside>` used appropriately.
3. **List markup:** Related items use `<ul>`/`<ol>` + `<li>`, not stacked `<div>`.
4. **Button vs link:** `<button>` for actions, `<a>` for navigation — no `<div onClick>`.

### Step 2: Keyboard Navigation

1. All clickable elements are focusable.
2. Logical tab order follows visual layout.
3. All interactive elements have visible focus styles (`:focus-visible`).
4. Skip-to-content link exists.

### Step 3: ARIA Labels

1. **Icon-only buttons:** Must have `aria-label` or `<span className="sr-only">`.
2. **Form inputs:** All inputs have associated `<label>` or `aria-label`.
3. **Dynamic content:** Modals, dropdowns, toggles have proper ARIA roles and states.
4. **Images:** All `<img>` have meaningful `alt` text (or `alt=""` for decorative).

### Step 4: Touch Targets

1. All interactive elements meet minimum 44x44px touch target size.
2. Sufficient spacing between adjacent touch targets.

### Step 5: Reduced Motion

1. Animations respect `prefers-reduced-motion` media query.
2. No essential information conveyed only through animation.

### Step 6: Color Contrast

1. Text/background meets 4.5:1 (normal text) or 3:1 (large text).
2. Information is not conveyed by color alone.

### Step 7: Report

Save report to `/reports/YYYY-MM/a11y-audit.md`.

---

## Success Criteria

- [ ] All pages have correct heading hierarchy
- [ ] All interactive elements are keyboard accessible
- [ ] All icon-only buttons have labels
- [ ] All touch targets meet 44x44px minimum
- [ ] Reduced motion support exists
- [ ] Report saved to `/reports/`
