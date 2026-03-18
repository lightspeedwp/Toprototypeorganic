# Audit Routing — Route Integrity & Navigation Compliance

**Type:** Audit  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `audit routing`

---

## Prompt Purpose

**Objective:** Audit all navigation links, `<Link>` components, and programmatic navigations against the router definition — identify mismatches that cause 404s or blank pages, validate logo behavior, verify route guards, and confirm the route map matches `/guidelines/routes.md`.

**When to Use:** After adding, removing, or renaming routes; after navigation refactors; periodically as a quality gate.

**Reference Guidelines:**
- `/guidelines/routes.md`
- `/guidelines/design-tokens/navigation.md`

---

## Workflow Steps

### Step 1: Router Definition Inventory

1. **Read router config:** Parse the router definition (typically `/src/app/routes.ts` or equivalent) and build a complete list of valid route paths.
2. **Read routes guideline:** Parse `/guidelines/routes.md` for the documented route map.
3. **Diff:** Compare router config vs guideline document — list any routes that exist in code but not in docs (undocumented) or in docs but not in code (missing).
4. **Nested routes:** Verify all child routes resolve correctly with their parent path prefixes.

### Step 2: Link Target Validation

Scan all `.tsx` files for navigation elements:

1. **`<Link to="...">` targets:** Extract every `to` prop value and verify it matches a defined route.
2. **`<a href="...">` internal links:** Find `<a>` tags with relative paths or same-domain URLs — these should typically be `<Link>` components.
3. **`navigate("...")` calls:** Search for programmatic navigation and verify destination paths.
4. **Dynamic segments:** For routes like `/services/:slug`, verify that all navigations provide valid slug values from data sources.
5. **Hash links:** Verify `#section-id` targets exist on the destination page.

### Step 3: 404 & Blank Page Detection

1. **Catch-all route:** Verify a `path: "*"` catch-all route exists and renders a proper 404 page.
2. **Orphan routes:** Identify routes defined in the router but unreachable via any navigation link.
3. **Broken redirects:** Check for redirect routes that point to non-existent destinations.
4. **Index routes:** Verify every route group has an `index` route or redirect.

### Step 4: Logo Navigation

1. **Logo click:** Verify that clicking the site logo/wordmark navigates to the home route (`/`).
2. **Logo consistency:** The logo link must be present in all layout components (header, footer if applicable).
3. **Accessibility:** Logo link must have `aria-label` (e.g., "Return to homepage").
4. **No full reload:** Logo click must use client-side navigation (`<Link>`), not `<a href="/">`.

### Step 5: Navigation Component Audit

1. **Active state:** Verify `NavLink` or equivalent highlights the current route accurately.
2. **Mobile nav:** Confirm mobile hamburger menu links match desktop navigation.
3. **Footer links:** Verify footer navigation links point to valid routes.
4. **Breadcrumbs:** If breadcrumbs exist, verify they reflect the actual route hierarchy.

### Step 6: Report

Save report to `/reports/YYYY-MM/routing-audit.md` with:
- Total routes defined vs documented
- Undocumented routes (in code, not in `routes.md`)
- Missing routes (in `routes.md`, not in code)
- Broken link targets (by file and line)
- Logo navigation status
- Orphan routes
- Fixes applied
- Remaining issues with priority

---

## Success Criteria

- [ ] All `<Link>` targets resolve to defined routes
- [ ] Zero internal `<a href>` tags (should be `<Link>`)
- [ ] Router config matches `/guidelines/routes.md`
- [ ] Catch-all 404 route exists and renders correctly
- [ ] Logo click navigates to `/` via client-side routing
- [ ] No orphan or unreachable routes
- [ ] Report saved to `/reports/`
