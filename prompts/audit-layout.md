# Audit Layout — Visual Integrity & Responsive Layout Compliance

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit layout`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Audit all pages and components for layout integrity — broken layouts, missing sections, overflow/scroll issues, container inconsistencies, and responsiveness regressions across breakpoints.

**When to Use:** After major layout changes, component refactors, new page builds, or when visual bugs are reported.

---

## Workflow Steps

### Step 1: Container & Width Consistency

1. **Container classes:** All page sections use the standard container pattern (`.wp-container` or equivalent).
2. **Max-width consistency:** Content uses the defined layout constant from `theme-base.css`.
3. **Padding consistency:** All containers apply consistent horizontal padding using `var(--spacing-*)` tokens.
4. **Full-bleed exceptions:** Hero sections and background elements that intentionally break container width use the correct pattern.

### Step 2: Overflow & Scroll Issues

1. **Horizontal overflow:** Search for elements causing horizontal scrollbars.
2. **Hidden overflow clipping:** Identify `overflow: hidden` that unintentionally clips content.
3. **Sticky/fixed positioning:** Verify sticky headers and floating elements don't overlap content.
4. **Z-index conflicts:** Scan for layering conflicts.

### Step 3: Missing Sections & Structural Gaps

Cross-reference each page template against its archetype:

| Archetype | Required Patterns (order) |
|---|---|
| **Content Hub** | Hero -> Filter (opt) -> Card Grid -> FAQ -> CTA (opt) |
| **Taxonomy Archive** | Archive Header -> Tax Nav (opt) -> Card Grid -> Pagination -> FAQ -> CTA (opt) |
| **Single Detail** | Hero -> Editorial -> Meta/Facts -> Supporting (opt) -> Related -> FAQ -> CTA |
| **Editorial Listing** | Listing Header -> Card Grid -> Pagination -> FAQ (opt) |
| **Utility Page** | Page Header -> Editorial -> Structured Block -> CTA (opt) |

### Step 4: Grid & Flexbox Integrity

1. **Grid layouts** respond correctly to breakpoints.
2. **Flex wrapping** looks intentional when items wrap.
3. **Gap consistency:** All grids/flex containers use `var(--spacing-*)` gap tokens.
4. **Zero Margin Policy:** No margin utilities for layout — flex/grid gaps only.

### Step 5: Responsive Breakpoint Audit

Test at: 320px, 428px, 768px, 1024px, 1280px, 1920px+

Verify at each:
1. No content overflow
2. Text remains readable
3. Images scale proportionally
4. Touch targets remain accessible
5. Navigation adapts (hamburger on mobile, mega menu on desktop)

### Step 6: Report

Save report to `/reports/YYYY-MM/layout-audit.md`.

---

## Success Criteria

- [ ] All pages use consistent container patterns
- [ ] Zero horizontal overflow issues at any breakpoint
- [ ] All page templates match their archetype sections
- [ ] Grid layouts collapse correctly at all breakpoints
- [ ] Spacing uses `var(--spacing-*)` tokens throughout
- [ ] Zero margin utilities for layout (flex/grid gaps only)
- [ ] Report saved to `/reports/`
