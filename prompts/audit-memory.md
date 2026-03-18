# Audit Memory — Codebase Memory Reduction Audit

**Type:** Audit  
**Version:** 2.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `audit memory`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Focused, actionable audit for reducing codebase memory consumption. Targets the highest-impact areas: duplicate CSS, duplicate data files, oversized files, orphaned files, and unnecessary component variants.

**When to Use:** When the codebase feels bloated, before performance optimization, or periodically to maintain lean architecture.

**Related:** Use `optimize memory` for the full optimization workflow after this audit identifies targets.

---

## Audit Area 1: Duplicate CSS Files

**Problem:** CSS files may exist in both original and optimized/refactored versions, both loaded simultaneously.

**Steps:**
1. List all CSS files in `/src/styles/` recursively.
2. Identify any file pairs (original + optimized/refactored).
3. For each pair, determine which version is actively imported.
4. Recommend keeping the active version and removing the unused one.
5. Estimate line savings.

---

## Audit Area 2: Duplicate Data Files

**Problem:** Multiple data files may contain overlapping content for the same domain entity.

**Steps:**
1. List all `.ts` files in `/src/app/data/` with line counts.
2. Group files by domain (tours, destinations, accommodations, reviews, team, blog, FAQs, specials).
3. Identify overlapping exports or near-duplicate arrays.
4. Recommend consolidation strategy.

**Known data volumes:** 87 destinations, 50 accommodations, 61 tours, 41 reviews, 18 team members, 44 blog posts, 91 FAQs.

---

## Audit Area 3: Oversized Files

**Thresholds:**
- **Critical:** > 1,000 lines (split immediately)
- **High:** 500-1,000 lines (split or refactor)
- **Medium:** 300-500 lines (evaluate for extraction)

**Steps:**
1. List all files > 500 lines across `/src/app/` and `/src/styles/`.
2. Recommend split strategies per file type:
   - **CSS > 400 lines:** Split by concern (base, responsive, variants)
   - **Data > 500 lines:** Split by category or continent
   - **Components > 300 lines:** Extract sub-components
   - **Pages > 400 lines:** Extract pattern compositions

---

## Audit Area 4: Orphaned Files

**Steps:**
1. **Orphaned CSS:** Files in `/src/styles/` not imported by `index.css`, `global.css`, or any component.
2. **Orphaned data:** Exports in `/src/app/data/` never imported by any component or page.
3. **Orphaned components:** Components in `/src/app/components/` never imported by any page or other component.
4. **Dead CSS selectors:** Classes defined in CSS that appear in zero TSX files.

---

## Audit Area 5: Component Variant Analysis

**Steps:**
1. Identify component families with 3+ variants (e.g., multiple card types, multiple CTA patterns).
2. Assess whether variants differ only by a prop value (color, size, layout).
3. Recommend consolidation using prop-driven variants instead of separate components.

---

## Report

Save report to `/reports/YYYY-MM/memory-reduction-audit.md` with:
- File inventory summary (total files, total lines by category)
- Duplicate files identified (CSS and data)
- Oversized files with split recommendations
- Orphaned files identified
- Component consolidation candidates
- Estimated total line savings
- Priority-ordered action items

---

## Success Criteria

- [ ] Complete file inventory with line counts
- [ ] All duplicate file pairs identified
- [ ] All files > 500 lines listed with split strategy
- [ ] All orphaned files flagged
- [ ] Component consolidation candidates identified
- [ ] Report saved to `/reports/`
