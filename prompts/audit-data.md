# Audit Data — Data File Architecture Audit

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit data`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Audit all data files in `/src/app/data/` for duplicates, orphaned files, oversized files, type safety, and compliance with the centralized data architecture. This project has 87 destinations, 50 accommodations, 61 tours, 41 reviews, 18 team members, 44 blog posts, and 91 FAQs — all must be wired correctly.

**When to Use:** After adding new data files, or periodically to verify data architecture integrity.

---

## Canonical Post Types (Reference)

Tours, Destinations (hierarchical), Accommodation, Specials, Team, Reviews, Blog Posts, Core Pages (About, Contact, FAQ)

## Canonical Taxonomies

Travel Styles, Accommodation Types, Continents, Brands, Facilities, Blog Categories, Blog Tags

---

## Workflow Steps

### Step 1: Inventory Data Files

1. List all `.ts` files in `/src/app/data/` and subdirectories.
2. Record: filename, line count, export names, number of importers.

### Step 2: Find Orphaned Files

1. For each data file, search the codebase for imports.
2. Files with zero importers -> flag as orphaned.
3. Confirm no dynamic imports reference the file before recommending deletion.

### Step 3: Find Duplicates

1. Compare data files covering the same domain (e.g., multiple FAQ files, multiple testimonial arrays).
2. Identify overlapping exports or near-duplicate data arrays.
3. Recommend consolidation where appropriate.

### Step 4: File Size Check

1. Flag any data file over 500 lines.
2. Suggest split strategies (by category, by continent, by data type).

### Step 5: Type Safety Check

1. Verify exported data uses TypeScript interfaces (not `any` or untyped arrays).
2. Check that interfaces are defined in `/src/app/data/types.ts` or co-located and exported.
3. Verify all data arrays match their declared types (no missing required fields).

### Step 6: Data Integrity Cross-Check

1. Verify slugs are unique within each post type.
2. Verify relational references (e.g., tour -> destination slug) point to valid entries.
3. Verify image URLs are valid Unsplash format (no dynamically constructed photo IDs).

### Step 7: Fix and Report

1. Delete confirmed orphaned files.
2. Consolidate obvious duplicates.
3. Save report to `/reports/YYYY-MM/data-architecture-audit.md`.

---

## Success Criteria

- [ ] Zero orphaned data files (or justified exceptions)
- [ ] Zero duplicate data across files
- [ ] All data files under 500 lines
- [ ] All exports are type-safe (TypeScript interfaces)
- [ ] All relational references are valid
- [ ] All image URLs are valid Unsplash format
- [ ] Report saved to `/reports/`
