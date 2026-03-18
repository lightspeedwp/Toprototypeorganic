# Audit Routes — Route Integrity & Navigation

**Type:** Audit  
**Version:** 2.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `audit routes`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Full route integrity audit — validates all registered routes, link references, navigation data consistency, and dynamic route patterns. Auto-fixes where possible, flags remaining issues as tasks.

**When to Use:** After adding/removing pages or routes, during cleanup, or as part of the full `audit` orchestrator.

---

## Pre-Read (Required)

Before executing, read these files:

1. `/src/app/routes.ts` — Route definitions (single file using `createBrowserRouter`)
2. Navigation/menu data files in `/src/app/data/` (if any)
3. `/guidelines/Guidelines.md` — Page archetypes and routing conventions

---

## Audit Phase

### Step 1: Route Definition Scan

Scan `/src/app/routes.ts`:
- List every registered `path` (static and dynamic `:param` routes)
- Count total routes
- Flag the file if exceeding 500 lines (recommend splitting into route groups)
- Flag duplicate paths
- Verify every `Component` reference resolves to an actual import

### Step 2: Page File Cross-Reference

Cross-reference routes against page files:
- **Orphaned pages:** Files in `/src/app/pages/` with no matching route -> flag
- **Missing pages:** Routes pointing to components that don't exist -> flag as broken
- **Import verification:** Every lazy/dynamic import resolves to an actual file

### Step 3: Navigation Data Audit

Check navigation/menu data files:
- Every navigation link path must resolve to a registered route
- Flag navigation items pointing to non-existent routes
- Compare mega menu structure against actual route tree

### Step 4: Link Reference Scan

Search the codebase for link patterns:
- `<Link to="..."` patterns in `.tsx` files
- `useNavigate()` / `navigate("..."` patterns
- Flag any link pointing to a path with no matching route
- Verify all internal links use `<Link>` from `react-router` (not `<a href>`)

### Step 5: Sitemap Consistency

If a SiteMap page/component exists:
- Pages listed in sitemap but with no route = dead link
- Routes that exist but are not in sitemap = unlisted page

---

## Fix Phase

### Auto-Fix Rules

1. **Missing route entries:** Add route for pages that exist but have no route
2. **Dead navigation links:** Remove or correct navigation items pointing to non-existent routes

### Manual-Fix (Add to Task List)

1. **Missing page files:** Routes pointing to non-existent components
2. **Route file too large:** Needs splitting into route groups
3. **Structural navigation changes:** Adding/removing top-level nav items

---

## Report

Save to: `/reports/YYYY-MM/routes-audit.md`

Include:
- Total routes counted
- Page file coverage (pages with routes vs orphaned)
- Navigation data status
- Link scan results
- Issues found (auto-fixed vs manual)

---

## Design System Compliance

All fixes must:
- Use `react-router` (`<Link>`, `useNavigate`, `createBrowserRouter`) — never `react-router-dom`
- Use CSS variables for any styling changes
- Use only the 5 approved font variables
- Use `lucide-react` for any icons added
