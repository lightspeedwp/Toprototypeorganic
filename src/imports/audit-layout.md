# Audit Layout — Visual Integrity & Responsive Layout Compliance

**Type:** Audit  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `audit layout`

---

## Prompt Purpose

**Objective:** Audit all pages and components for layout integrity — find broken layouts, missing sections, overflow/scroll issues, container inconsistencies, and responsiveness regressions across breakpoints.

**When to Use:** After major layout changes, component refactors, new page builds, or when visual bugs are reported.

**Reference Guidelines:**
- `/guidelines/design-tokens/responsive.md`
- `/guidelines/design-tokens/spacing.md`
- `/guidelines/components/components-vs-patterns.md`
- `/guidelines/templates/page-archetypes.md`

---

## Workflow Steps

### Step 1: Container & Width Consistency

Scan all template and page components for:

1. **Container classes:** Verify all page sections use the standard container pattern (`.wp-container`, max-width wrapper, or equivalent layout constant).
2. **Max-width consistency:** Identify sections that use inconsistent max-width values — content should use `1152px` (wp-max-w-6xl) or the defined layout constant.
3. **Padding consistency:** Verify all containers apply consistent horizontal padding (`var(--spacing-6)` on mobile, scaling up at breakpoints).
4. **Full-bleed exceptions:** Hero sections and background elements that intentionally break container width should be documented and use the correct pattern.

### Step 2: Overflow & Scroll Issues

1. **Horizontal overflow:** Search for elements that cause horizontal scrollbars — check for `width: 100vw` (which includes scrollbar), fixed-width elements exceeding viewport, and content that doesn't respect `overflow: hidden` on parents.
2. **Hidden overflow clipping:** Identify elements with `overflow: hidden` that unintentionally clip content (box shadows, absolutely positioned children, dropdown menus).
3. **Sticky/fixed positioning:** Verify sticky headers, sidebars, and floating elements don't overlap content or cause scroll issues.
4. **Z-index conflicts:** Scan for z-index values that cause layering conflicts (modals behind headers, tooltips clipped by sections).

### Step 3: Missing Sections & Structural Gaps

1. **Page completeness:** Cross-reference each page template against its archetype in `/guidelines/templates/page-archetypes.md` — identify missing sections.
2. **Empty states:** Verify pages handle empty data gracefully (no blank areas where content should be).
3. **Section ordering:** Confirm sections appear in the expected order per archetype definitions.
4. **Footer/header presence:** Every route renders the site header and footer (unless explicitly excluded, e.g., 404 page).

### Step 4: Grid & Flexbox Integrity

1. **Grid layouts:** Verify CSS Grid templates respond to breakpoints — no single-column layouts stuck at desktop, no 3-column grids that don't collapse on mobile.
2. **Flex wrapping:** Ensure flex containers with `flex-wrap: wrap` still look intentional when items wrap.
3. **Gap consistency:** Verify all grids and flex containers use `var(--spacing-*)` gap tokens, not arbitrary values.
4. **Alignment:** Check for misaligned items — inconsistent vertical alignment in card grids, uneven image heights, text that doesn't align with adjacent columns.

### Step 5: Responsive Breakpoint Audit

Test each page template at these breakpoints:

| Breakpoint | Width | Expected Behavior |
|---|---|---|
| Mobile S | 320px | Single column, stacked layout |
| Mobile L | 428px | Single column, comfortable spacing |
| Tablet | 768px | 2-column grids, side-by-side layouts begin |
| Desktop | 1024px | Full grid layouts, sidebars visible |
| Desktop L | 1280px | Max-width container centered |
| Ultra-wide | 1920px+ | Content doesn't stretch uncomfortably |

For each breakpoint, verify:
1. No content overflow
2. Text remains readable (not too wide or too narrow)
3. Images scale proportionally
4. Touch targets remain accessible on touch breakpoints
5. Navigation adapts (hamburger on mobile, full nav on desktop)

### Step 6: Report

Save report to `/reports/YYYY-MM/layout-audit.md` with:
- Pages/templates audited
- Container inconsistencies (by file)
- Overflow issues found
- Missing sections per archetype
- Grid/flex issues
- Breakpoint regression list
- Fixes applied
- Remaining issues with priority

---

## Success Criteria

- [ ] All pages use consistent container patterns
- [ ] Zero horizontal overflow issues at any breakpoint
- [ ] All page templates match their archetype sections
- [ ] Grid layouts collapse correctly at all breakpoints
- [ ] Spacing uses `var(--spacing-*)` tokens throughout
- [ ] Report saved to `/reports/`
