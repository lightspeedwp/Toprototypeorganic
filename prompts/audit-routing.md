# Audit Routing — Route Integrity & Navigation Compliance

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit routing`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Audit all navigation links, `<Link>` components, and programmatic navigations against the router definition — identify mismatches that cause 404s or blank pages, validate logo behavior, verify route completeness, and confirm the route map matches documentation.

**When to Use:** After adding, removing, or renaming routes; after navigation refactors; periodically as a quality gate.

---

## Workflow Steps

### Step 1: Router Definition Inventory

1. **Read router config:** Parse `/src/app/routes.ts` and build a complete list of valid route paths.
2. **Read routes guideline:** Parse `/guidelines/routes.md` (if exists) for the documented route map.
3. **Diff:** Compare router config vs guideline document — list undocumented routes and missing routes.
4. **Nested routes:** Verify all child routes (e.g., `/account/*`) resolve correctly with parent path prefixes.

### Step 2: Link Target Validation

Scan all `.tsx` files for navigation elements:

1. **`<Link to="...">` targets:** Extract every `to` prop value and verify it matches a defined route.
2. **`<a href="...">` internal links:** Find `<a>` tags with relative paths — these should typically be `<Link>` components for client-side routing.
3. **`navigate("...")` calls:** Search for programmatic navigation and verify destination paths.
4. **Dynamic segments:** For routes like `/tours/:slug`, verify navigations provide valid slug values from data files in `/src/app/data/`.
5. **Hash links:** Verify `#section-id` targets exist on the destination page.

### Step 3: 404 & Blank Page Detection

1. **Catch-all route:** Verify a `path: "*"` catch-all route exists and renders a proper 404 page.
2. **Orphan routes:** Identify routes defined in the router but unreachable via any navigation link.
3. **Broken redirects:** Check for redirect routes that point to non-existent destinations.
4. **Index routes:** Verify every route group has an `index` route or redirect.

### Step 4: Logo Navigation

1. **Logo click:** Verify clicking the site logo navigates to `/`.
2. **Logo consistency:** Logo link present in header (desktop and mobile).
3. **Accessibility:** Logo link has `aria-label` (e.g., "Return to homepage").
4. **No full reload:** Logo uses `<Link>`, not `<a href="/">`.

### Step 5: Navigation Component Audit

1. **Active state:** Verify navigation highlights the current route accurately.
2. **Mobile nav:** Confirm mobile hamburger menu links match desktop navigation and mega menu items.
3. **Mega menu:** All 6 main navigation items with mega menus link to valid routes.
4. **Footer links:** Footer navigation links point to valid routes.
5. **Breadcrumbs:** If breadcrumbs exist, they reflect the actual route hierarchy.

### Step 6: Report

Save report to `/reports/YYYY-MM/routing-audit.md` with:
- Total routes defined vs documented
- Undocumented routes
- Missing routes
- Broken link targets (by file)
- Logo navigation status
- Orphan routes
- Fixes applied
- Remaining issues

---

## Success Criteria

- [ ] All `<Link>` targets resolve to defined routes
- [ ] Zero internal `<a href>` tags (should be `<Link>`)
- [ ] Router config matches route documentation
- [ ] Catch-all 404 route exists and renders correctly
- [ ] Logo click navigates to `/` via client-side routing
- [ ] No orphan or unreachable routes
- [ ] All mega menu items link to valid routes
- [ ] Report saved to `/reports/`
