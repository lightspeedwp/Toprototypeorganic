# Audit CSS — CSS Architecture Audit

**Type:** Audit  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `audit css`

---

## Prompt Purpose

**Objective:** Audit CSS file organization, imports, and compliance. Find broken imports, orphaned files, oversized files, duplicate rules, and Tailwind class usage.

**When to Use:** After CSS refactoring, or periodically to verify architecture integrity.

---

## Workflow Steps

### Step 1: Import Chain Verification

1. Read `/src/styles/index.css` — verify every `@import` resolves to an existing file.
2. Follow the import chain: check that imported files also have valid sub-imports.
3. List all broken imports.

### Step 2: Orphaned CSS Files

1. List all `.css` files in `/src/styles/`.
2. For each file, verify it is imported by `index.css` or by another imported file.
3. Flag files with zero importers as orphaned.

### Step 3: File Size Check

1. Check all CSS files against the 400-line limit (see `/guidelines/build-rules.md`).
2. Flag any files over the limit with suggested split points.

### Step 4: Class Convention Check

Search CSS files for:
1. **Tailwind utility classes** in `.tsx` files (`className="flex gap-4"`) — must be zero.
2. **Non-wp-* custom classes** — all utility classes should use `.wp-*` prefix.
3. **Hardcoded values** in CSS files — should use `var()` references.

### Step 5: Duplicate Rule Detection

1. Spot-check 5-10 CSS files for duplicate selectors or redundant rules.
2. Identify rules that could be consolidated into base files.

### Step 6: Fix and Report

1. Fix all broken imports.
2. Delete confirmed orphaned files (not protected).
3. Save report to `/reports/YYYY-MM/css-architecture-audit.md`.

---

## Success Criteria

- [ ] Zero broken CSS imports
- [ ] Zero orphaned CSS files (or justified exceptions)
- [ ] All CSS files under 400 lines
- [ ] Zero Tailwind utility classes in `.tsx` files
- [ ] All custom classes use `.wp-*` prefix
- [ ] Report saved to `/reports/`
