# Audit CSS — CSS Architecture Audit

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit css`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately. Use only the tools available: `read`, `write_tool`, `fast_apply_tool`, `edit_tool`, `delete_tool`, `file_search`, and `bash` (node_modules only).

---

## Prompt Purpose

**Objective:** Audit CSS file organization, imports, and compliance. Find broken imports, orphaned files, oversized files, duplicate rules, and Tailwind class usage in TSX files.

**When to Use:** After CSS refactoring, adding new pages/components, or periodically to verify architecture integrity.

---

## Workflow Steps

### Step 1: Import Chain Verification

1. Read `/src/styles/index.css` — verify every `@import` resolves to an existing file.
2. Read `/src/styles/global.css` — verify its unique imports resolve correctly.
3. Follow the import chain: check that imported files also have valid sub-imports.
4. List all broken imports.

### Step 2: Orphaned CSS Files

1. List all `.css` files in `/src/styles/` and all subdirectories.
2. For each file, verify it is imported by `index.css`, `global.css`, or by another imported file.
3. Flag files with zero importers as orphaned.

### Step 3: File Size Check

1. Check all CSS files against a 400-line limit.
2. Flag any files over the limit with suggested split points.

### Step 4: Class Convention Check

Search for:
1. **Tailwind utility classes** in `.tsx` files (`className="flex gap-4"`) — must be zero (except `.wp-*` prefixed utilities).
2. **Non-wp-* custom utility classes** — all utility classes should use `.wp-*` prefix.
3. **Hardcoded values** in CSS files — should use `var()` references from `theme-base.css`, `theme-light.css`, or `theme-dark.css`.
4. **Unapproved fonts** — search CSS for font-family declarations not using `var(--font-family-lora)`, `var(--font-family-noto-sans)`, `var(--font-family-caveat)`, `var(--font-family-shadows)`, or `var(--font-family-mono)`.

### Step 5: Duplicate Rule Detection

1. Spot-check 5-10 CSS files for duplicate selectors or redundant rules.
2. Identify rules that could be consolidated into base files in `/src/styles/base/`.

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
- [ ] All custom utility classes use `.wp-*` prefix
- [ ] Zero hardcoded color/font/spacing values in CSS
- [ ] Report saved to `/reports/`
