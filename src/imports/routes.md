# Routes Audit & Fix — Reusable Prompt

**Category:** Audit  
**Version:** 1.0.0  
**Last Updated:** 2026-03-15  
**Status:** Active  
**Trigger Word:** `routes`  
**Task List:** `/tasks/routes-task-list.md`

---

## Purpose

Full route integrity audit: validates all registered routes, link references, slug-to-path mappings, navigation data consistency, and dynamic route patterns. Auto-fixes where possible, flags remaining issues as tasks.

**Shared with:** `sitemap` trigger (both write to `routes-task-list.md`).

---

## Pre-Read (Required)

Before executing, read these files in order:

1. `/guidelines/routes.md` — Routing architecture & conventions
2. `/src/app/routes/index.ts` — Route orchestrator
3. `/src/app/utils/route-map.ts` — Slug-to-path mapping
4. `/src/app/data/site-pages/navigation.ts` — Navigation menus
5. `/src/app/data/site-pages/pages.ts` — Site pages registry

---

## Audit Phase (6 Steps)

### Step 1: Route Definition Scan

Scan ALL route files in `/src/app/routes/`:

- List every registered `path` across all route modules
- Count total routes (static + dynamic)
- Flag any route file exceeding 300 lines
- Flag duplicate paths (same path in multiple files)
- Verify every `Component` reference resolves to an actual import

### Step 2: Route Map Validation

Cross-reference `/src/app/utils/route-map.ts` against route definitions:

- **Orphaned slugs:** Slug maps to a path that has no matching route definition
- **Missing slugs:** Route exists but has no slug entry in route-map
- **Stale references:** JSDoc `@see` comments pointing to non-existent files
- **Dynamic pattern coverage:** Verify all dynamic patterns (`slug.startsWith(...)`) have corresponding `:param` routes

### Step 3: Navigation Data Audit

Check `/src/app/data/site-pages/navigation.ts`:

- Every `page` value must resolve via `slugToPath()` to a valid route
- Flag navigation items pointing to non-existent pages
- Flag categorization issues (e.g., media pages listed under "Solutions")
- Compare main nav structure against actual site sections

### Step 4: Link Reference Scan

Search the entire codebase for hardcoded links:

- `href="/"` patterns in `.tsx` files (should use `slugToPath()` or `navigateTo()`)
- `to="/"` patterns (React Router `<Link>` components)
- `navigate("/"` patterns
- Flag any link pointing to a path with no matching route

### Step 5: Template Import Verification

For every template imported in route files:

- Verify the template file exists at the imported path
- Flag duplicate imports (same template imported in multiple route files)
- Verify all templates in `/src/app/components/templates/` have at least one route

### Step 6: SiteMap Consistency

Cross-reference `SiteMapTemplate.tsx` page lists against actual routes:

- Pages listed in SiteMap but with no route = dead link
- Routes that exist but are not in SiteMap = unlisted page

---

## Fix Phase

### Auto-Fix Rules

1. **Missing route-map entries:** Add slug entry for any route that has no slug mapping
2. **Stale JSDoc references:** Update `@see` comments to correct file paths
3. **Simple categorization fixes:** Move misplaced navigation items to correct section

### Manual-Fix (Add to Task List)

1. **Missing routes:** Routes referenced in SiteMap/DevTools but with no route definition
2. **File size violations:** Route files exceeding 300 lines need splitting
3. **Guideline updates:** `routes.md` guideline needs updating to reflect current architecture
4. **Structural navigation changes:** Adding/removing top-level nav items

---

## Output

### Report

Save to: `/reports/2026-03/YYYY-MM-DD-routes-audit.md`

Include:
- Total routes counted (by module)
- Route map coverage (slugs vs routes)
- Navigation data status
- Link scan results
- Issues found (auto-fixed vs manual)

### Task List

Write to: `/tasks/routes-task-list.md`

- Add tasks with checkboxes (`- [ ] Task`)
- Group by priority (P1 = broken links, P2 = missing entries, P3 = cleanup)
- Include a date header for each audit run

### Master Task List

Update `/tasks/master-task-list.md`:
- Update the Trigger Task Lists Dashboard row for `routes-task-list.md`
- Set status, last run date, open/done counts

---

## Environment Reminders

1. This is Figma Make — no terminal commands, no browser refresh
2. All edits via file editing tools
3. Design system compliance: CSS variables only, `@phosphor-icons/react`, `react-router`, `.wp-*` classes
