# Sitemap — Sync Sitemap with Routes

**Type:** Utility  
**Version:** 2.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `sitemap`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Synchronize any sitemap page/component with the actual registered routes, ensuring every route appears in the sitemap and no dead links exist.

**When to Use:** After adding or removing pages/routes, or during cleanup.

---

## Workflow Steps

### Step 1: Build Route Inventory

1. Read `/src/app/routes.ts` to build the complete route list.
2. For each route, record: path, component name, category (tours, destinations, blog, etc.).

### Step 2: Read Current Sitemap

1. Find the sitemap page/component (search for "sitemap" or "SiteMap" in `/src/app/`).
2. Extract all page listings and their paths.

### Step 3: Diff and Update

1. **Missing from sitemap:** Routes that exist but are not listed -> add them in the correct category.
2. **Dead links in sitemap:** Paths listed but with no route -> remove them.
3. **Category organization:** Ensure pages are grouped logically by content type:
   - Tours, Destinations, Accommodations, Specials
   - Blog, Team, Reviews
   - Core Pages (About, Contact, FAQ)
   - Account pages
   - Dev Tools (if applicable)
4. **Statistics:** Update any page/section counts displayed.

### Step 4: Design System Compliance

All changes must use:
- CSS variables for all styling (`var(--spacing-*)`, `var(--foreground)`, etc.)
- Only 5 approved font variables for typography
- BEM classes + `.wp-*` utilities — no Tailwind
- `lucide-react` for any icons
- `<Link>` from `react-router` for all internal links

---

## Success Criteria

- [ ] Every registered route appears in the sitemap
- [ ] Zero dead links in the sitemap
- [ ] Page counts are accurate
- [ ] Pages grouped by logical content categories
- [ ] 100% CSS variable compliance in modified code
- [ ] Only approved fonts used
