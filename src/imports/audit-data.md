# Audit Data — Data File Architecture Audit

**Type:** Audit  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `audit data`

---

## Prompt Purpose

**Objective:** Audit all data files in `/src/app/data/` for duplicates, orphaned files, oversized files, type safety, and compliance with the centralized data architecture.

**When to Use:** After adding new data files, or periodically to verify data architecture integrity.

---

## Workflow Steps

### Step 1: Inventory Data Files

1. List all `.ts` files in `/src/app/data/` and subdirectories.
2. Record: filename, line count, export names, number of importers.

### Step 2: Find Orphaned Files

1. For each data file, search the codebase for imports.
2. Files with zero importers → flag as orphaned.
3. Confirm no dynamic imports reference the file before deleting.

### Step 3: Find Duplicates

1. Compare data files covering the same domain (e.g., multiple testimonial files, multiple FAQ files).
2. Identify overlapping exports or near-duplicate data arrays.
3. Recommend consolidation where appropriate.

### Step 4: File Size Check

1. Flag any data file over 500 lines (see `/guidelines/build-rules.md`).
2. Suggest split strategies (by category, by page, by data type).

### Step 5: Type Safety Check

1. Verify exported data uses TypeScript interfaces (not `any` or untyped arrays).
2. Check that interfaces are defined and exported for consumer use.
3. See `/guidelines/data-files.md` for data file standards.

### Step 6: Fix and Report

1. Delete confirmed orphaned files.
2. Consolidate obvious duplicates.
3. Save report to `/reports/YYYY-MM/data-architecture-audit.md`.

---

## Success Criteria

- [ ] Zero orphaned data files (or justified exceptions)
- [ ] Zero duplicate data across files
- [ ] All data files under 500 lines
- [ ] All exports are type-safe (TypeScript interfaces)
- [ ] Report saved to `/reports/`
