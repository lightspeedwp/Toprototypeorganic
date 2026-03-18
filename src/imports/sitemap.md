# Sitemap — Sync SiteMap Template with Routes

**Type:** Utility  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `sitemap`

---

## Prompt Purpose

**Objective:** Synchronize the SiteMapTemplate component with the actual registered routes, ensuring every route appears in the sitemap and no dead links exist.

**When to Use:** After adding or removing templates/routes, or during cleanup.

---

## Workflow Steps

### Step 1: Build Route Inventory

1. Read all route files in `/src/app/routes/` to build the complete route list.
2. For each route, record: path, component name, category (services, about, insights, etc.).

### Step 2: Read Current Sitemap

1. Read `/src/app/components/templates/SiteMapTemplate.tsx`.
2. Extract all page listings and their paths.

### Step 3: Diff and Update

1. **Missing from sitemap:** Routes that exist but are not in the sitemap → add them in the correct category section.
2. **Dead links in sitemap:** Paths listed in sitemap that have no route → remove them.
3. **Category organization:** Ensure pages are grouped logically (Services, About, Insights, Work, Legal, System).
4. **Statistics:** Update any page/section counts displayed in the template.

### Step 4: Design System Compliance

All changes must use:
- CSS variables for all styling (`var(--spacing-*)`, `var(--foreground)`, etc.)
- `var(--font-primary)` / `var(--font-secondary)` for typography
- `.wp-*` classes for layout — no Tailwind
- `@phosphor-icons/react` for any icons

---

## Success Criteria

- [ ] Every registered route appears in the sitemap
- [ ] Zero dead links in the sitemap
- [ ] Page counts are accurate
- [ ] 100% CSS variable compliance in modified code
