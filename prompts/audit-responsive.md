# Audit Responsive — Responsive Design Audit

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit responsive`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Audit CSS and components for responsive design compliance — breakpoint usage, mobile-first approach, grid/flex behavior, touch targets on mobile, and fluid typography/spacing scaling.

**When to Use:** After building new templates, or when responsive issues are reported.

**Reference Files:**
- `/src/styles/theme-base.css` — Fluid type scale and spacing tokens
- `/guidelines/design-tokens/responsive.md` — Breakpoint standards

---

## Workflow Steps

### Step 1: Read Breakpoint System

1. Read `/src/styles/theme-base.css` for fluid `clamp()` values and layout constants.
2. Read `/guidelines/design-tokens/responsive.md` for breakpoint standards.
3. Note the approved breakpoint values used in the project.

### Step 2: Breakpoint Usage Audit

Scan CSS files for:
1. **Custom breakpoints:** Media queries using non-standard breakpoint values — flag for correction.
2. **Mobile-first check:** Verify base styles are mobile and `min-width` queries add complexity.
3. **Breakpoint coverage:** Templates should respond at key widths (320px, 428px, 768px, 1024px, 1280px minimum).

### Step 3: Grid and Layout Audit

1. **Grid responsiveness:** Multi-column card grids (tours, destinations, accommodations, blog) collapse appropriately on small screens.
2. **Overflow:** No horizontal scroll on any viewport width.
3. **Typography scaling:** Fluid type scale from `theme-base.css` (`clamp()` values) is used — no fixed font sizes.
4. **Image sizing:** Images scale with container, no fixed-width images causing overflow.
5. **Zero Margin Policy:** All layouts use flex/grid gaps — no margin utilities for layout spacing.

### Step 4: Mega Menu Responsiveness

1. **Desktop:** Mega menu dropdowns display correctly at 1024px+.
2. **Mobile:** Navigation collapses to hamburger menu below 1024px.
3. **Transition:** No layout shift or broken state at the breakpoint boundary.

### Step 5: Touch Target Audit (Mobile)

1. All interactive elements meet 44x44px minimum on viewports <= 768px.
2. Sufficient spacing between tap targets on mobile.
3. Archive filter buttons, pagination controls, and form inputs meet touch target requirements.

### Step 6: Report

Save report to `/reports/YYYY-MM/responsive-audit.md` with:
- Breakpoints audited
- Non-standard breakpoints found
- Layout issues found
- Touch target violations
- Fixes applied

---

## Success Criteria

- [ ] All media queries use approved breakpoint values
- [ ] Mobile-first approach verified
- [ ] No horizontal overflow at any viewport width
- [ ] Fluid typography from `theme-base.css` used throughout
- [ ] Touch targets meet 44x44px on mobile
- [ ] Mega menu transitions correctly between mobile/desktop
- [ ] Zero margin utilities for layout (flex/grid gaps only)
- [ ] Report saved to `/reports/`
