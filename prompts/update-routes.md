# Update Routes — Sync Routes, Navigation & Link Data

**Type:** Maintenance  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `update routes`  
**Repeatable:** Yes — run after adding/removing pages  
**Estimated Duration:** 1 session (10-20 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Page archetypes
- `/guidelines/patterns/navigation-links.md` — Link patterns

---

## Purpose

Sync the route configuration, navigation data files, and internal links with all existing page files. Unlike `audit routes` (read-only analysis), this prompt **makes the changes**.

---

## Steps

### Step 1: Inventory Pages

1. List all `.tsx` files in `/src/app/pages/` recursively
2. Extract the intended route path from each (filename convention or existing route)
3. Build page inventory table

### Step 2: Sync routes.ts

1. Read `/src/app/routes.ts`
2. Add routes for pages that exist but have no route
3. Remove routes for pages that no longer exist
4. Verify all component imports resolve
5. Ensure catch-all `*` route exists for 404

### Step 3: Update Navigation Data

1. Read navigation data files (header nav, footer nav, mega menu)
2. Add links for new pages that belong in navigation
3. Remove links for deleted pages
4. Verify all `path` values match routes.ts entries
5. Update any labels that don't match page titles

### Step 4: Internal Link Audit

1. Search for `<Link to=` and `navigate(` across all components
2. Verify each link target exists in routes.ts
3. Fix or remove broken internal links

### Step 5: Summary

```
## Update Routes Session — [Today's Date]

| Action | Count |
|--------|-------|
| Routes added | [N] |
| Routes removed | [N] |
| Nav links added | [N] |
| Nav links removed | [N] |
| Broken internal links fixed | [N] |
```

---

## Success Criteria

- [ ] Every page file has a corresponding route
- [ ] No dead routes pointing to missing pages
- [ ] Navigation data matches routes.ts
- [ ] Zero broken internal links
