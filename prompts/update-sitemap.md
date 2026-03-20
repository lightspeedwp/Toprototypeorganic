# Update Sitemap — Sync Sitemap Page with Routes

**Type:** Maintenance  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `update sitemap`  
**Repeatable:** Yes — run after route changes  
**Estimated Duration:** 1 session (5-15 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Page archetypes

---

## Purpose

Sync the sitemap page component with the current route configuration. Ensures every registered route appears on the sitemap with correct titles, paths, and categorisation.

---

## Steps

### Step 1: Read Current Routes

1. Read `/src/app/routes.ts` — build complete route list
2. Categorise each route (Main Pages, Archive Pages, Detail Pages, Dev Tools, Utility)

### Step 2: Read Sitemap Page

1. Find and read the sitemap page component
2. Compare its listed routes against the route list

### Step 3: Sync

1. Add missing routes to sitemap
2. Remove routes from sitemap that no longer exist
3. Update page titles/descriptions to match current data
4. Ensure categories are correct

### Step 4: Summary

```
## Update Sitemap — [Today's Date]
- Routes on sitemap: [N]
- Added: [N] | Removed: [N] | Updated: [N]
```

---

## Success Criteria

- [ ] Every route appears on the sitemap page
- [ ] No dead links on the sitemap
- [ ] Categories are accurate
