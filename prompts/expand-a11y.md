# Expand Accessibility — Discover & Propose A11y Enhancements

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand a11y`  
**Repeatable:** Yes — run after adding new interactive features or pages  
**Estimated Duration:** 1 session (15-25 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/WCAG-ACCESSIBILITY-STANDARDS.md` — Full WCAG 2.1 AA reference
- `/guidelines/design-tokens/touch-targets.md` — Touch target sizing
- `/guidelines/rules/design-system-rules.md` — Styling compliance

---

## Purpose

Go beyond basic WCAG compliance auditing (`audit a11y`) to **propose new accessibility features and patterns** that would improve the user experience for people using assistive technologies. Focus on keyboard navigation flows, screen reader announcements, focus management for dynamic content, and progressive enhancement patterns.

---

## Expansion Areas

### 1. Keyboard Navigation Patterns

- **Arrow key navigation** in card grids, tab bars, mega menus
- **Escape key** to close modals, dropdowns, search overlays
- **Home/End keys** in lists and navigation
- **Page Up/Down** in long scrollable content
- **Keyboard shortcuts** for power users (/ for search, ? for help)
- **Roving tabindex** for composite widgets

### 2. Screen Reader Announcements

- **Live regions** (`aria-live`) for dynamic content updates
- **Loading state announcements** — "Loading tours..." → "12 tours found"
- **Filter result announcements** — "Showing 5 of 61 tours"
- **Form validation announcements** — inline error messages
- **Page transition announcements** — route change notification
- **Toast/notification announcements** — status messages

### 3. Focus Management

- **Modal focus trapping** — focus stays within open modal
- **Return focus** — focus returns to trigger after modal/dialog closes
- **Skip links** — "Skip to main content", "Skip to navigation"
- **Section skip links** — "Skip to tours", "Skip to reviews"
- **Focus on route change** — focus moves to main heading on navigation
- **Focus indicators** — visible, high-contrast focus rings on all interactive elements

### 4. Dynamic Content Accessibility

- **Accordion state** — `aria-expanded`, `aria-controls`
- **Tab panel association** — `role="tablist"`, `role="tab"`, `role="tabpanel"`
- **Carousel accessibility** — live region, pause on focus, slide announcements
- **Infinite scroll alternative** — "Load more" button with count
- **Image gallery** — keyboard navigation, alt text, slide position

### 5. Progressive Enhancement

- **Reduced motion** — `prefers-reduced-motion` for all animations
- **High contrast** — `prefers-contrast: more` support
- **Print styles** — essential content prints cleanly
- **No-JS fallback** — critical content visible without JavaScript

---

## Steps

### Step 1: Audit Current A11y Features

1. Search for `aria-` attributes across all `.tsx` files
2. Search for `role=` attributes
3. Search for `tabIndex` usage
4. Search for `onKeyDown` / `onKeyUp` handlers
5. Search for `prefers-reduced-motion` in CSS
6. Check for skip links in header/layout

Build current coverage:

| Feature | Implemented? | Files | Quality |
|---------|-------------|-------|---------|
| aria-label on buttons | Partial | 20/35 | Inconsistent |
| Skip links | ❌ | — | Missing |
| Focus trapping (modals) | ❌ | — | Missing |
| Live regions | ❌ | — | Missing |
| Reduced motion | Partial | 3 CSS files | Incomplete |

### Step 2: Map Interactive Patterns

For each interactive pattern, assess keyboard and screen reader support:

| Pattern | Keyboard Nav? | Screen Reader? | Focus Managed? | Gaps |
|---------|--------------|---------------|----------------|------|
| MegaMenu | Partial | Partial | ❌ | Arrow keys, escape, focus return |
| FilterBar | ❌ | ❌ | ❌ | All |
| CardGrid | ❌ | Partial | ❌ | Grid navigation |
| Modal | ❌ | ❌ | ❌ | Focus trap, escape, return focus |
| ImageGallery | ❌ | ❌ | ❌ | Arrow keys, alt text, position |

### Step 3: Propose Enhancements

For each gap, create a detailed proposal:

```
### Proposed: Skip Links Component

**Location:** `/src/app/components/blocks/SkipLinks.tsx`
**CSS:** `/src/styles/blocks/skip-links.css`

**Behaviour:**
- Visually hidden by default
- Visible on Tab focus
- Links: "Skip to main content", "Skip to navigation", "Skip to footer"
- Uses smooth scroll to target

**WCAG Criteria:** 2.4.1 Bypass Blocks (Level A)
**Effort:** Low
**Impact:** High
```

### Step 4: Prioritise by WCAG Level

| # | Enhancement | WCAG Criterion | Level | Effort | Impact | Priority |
|---|------------|---------------|-------|--------|--------|----------|
| 1 | Skip links | 2.4.1 | A | Low | High | Critical |
| 2 | Focus trapping | 2.4.3 | A | Medium | High | Critical |
| 3 | Live regions for filters | 4.1.3 | AA | Low | Medium | High |
| 4 | Keyboard nav for menus | 2.1.1 | A | Medium | High | High |
| 5 | Reduced motion CSS | 2.3.3 | AAA | Low | Medium | Medium |

### Step 5: User Decision

Present all recommendations. Wait for approval.

---

## Rules

1. **WCAG 2.1 AA is the baseline** — Level A gaps are critical
2. **Never remove existing a11y features** — only add or enhance
3. **Test with keyboard only** — every feature must work without a mouse
4. **Semantic HTML first** — use native elements before ARIA
5. **CSS variables for focus styles** — `var(--ring-color)`, `var(--ring-width)`
6. **Never auto-implement** — present proposals and wait for approval

---

## Success Criteria

- [ ] Current a11y feature coverage mapped
- [ ] All interactive patterns assessed for keyboard/screen reader support
- [ ] WCAG criterion referenced for each proposal
- [ ] Effort and impact estimated
- [ ] Priority ranking by WCAG level and impact
- [ ] Recommendations presented for user approval
