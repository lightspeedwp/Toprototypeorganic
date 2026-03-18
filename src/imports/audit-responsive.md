# Audit Responsive — Responsive Design Audit

**Type:** Audit  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `audit responsive`

---

## Prompt Purpose

**Objective:** Audit CSS and components for responsive design compliance — breakpoint usage, mobile-first approach, grid/flex behavior, touch targets on mobile, and WordPress adminbar compatibility.

**When to Use:** After building new templates, or when responsive issues are reported.

---

## Workflow Steps

### Step 1: Read Breakpoint System

1. Read `/src/styles/responsive.css` for defined breakpoints.
2. Read `/guidelines/design-tokens/responsive.md` (if exists) for breakpoint standards.
3. Note the approved breakpoint values.

### Step 2: Breakpoint Usage Audit

Scan CSS files for:
1. **Custom breakpoints:** Media queries using non-standard breakpoint values → flag for correction.
2. **Mobile-first check:** Verify base styles are mobile and `min-width` queries add complexity.
3. **Breakpoint coverage:** Templates should respond at key widths (480px, 768px, 1024px, 1280px minimum).

### Step 3: Grid and Layout Audit

1. **Grid responsiveness:** Multi-column grids collapse appropriately on small screens.
2. **Overflow:** No horizontal scroll on any viewport width.
3. **Typography scaling:** Font sizes are readable on mobile (minimum 16px body text).
4. **Image sizing:** Images scale with container, no fixed-width images causing overflow.

### Step 4: WordPress Compatibility

1. **Admin bar offset:** Styles account for the 32px WordPress admin bar at desktop / 46px at mobile.
2. **Sidebar awareness:** Content area adjusts when WordPress sidebar is open (782px breakpoint).

### Step 5: Touch Target Audit (Mobile)

1. All interactive elements meet 44x44px minimum on viewports ≤768px.
2. Sufficient spacing between tap targets on mobile.

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
- [ ] Touch targets meet 44x44px on mobile
- [ ] WordPress admin bar compatibility verified
- [ ] Report saved to `/reports/`
