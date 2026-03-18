# New Template — Scaffold a Page Template

**Type:** Implementation  
**Version:** 2.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `new template`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Scaffold a new page template following the pattern composition architecture. The template is composed entirely from registered patterns, uses 100% CSS variables, and conforms to one of the approved page archetypes.

**When to Use:** When a new page needs to be added to the site.

---

## Input Required

The user must provide:
1. **Page name** — e.g., "Tour Detail", "Destination Archive", "Special Offers"
2. **Page archetype** — Content Hub, Taxonomy Archive, Single Detail, Editorial Listing, or Utility Page
3. **Patterns to include** — e.g., Hero, CardGrid, FAQ, CTA (see archetype requirements below)

---

## Page Archetypes (Required Pattern Order)

| Archetype | Required Patterns |
|---|---|
| **Content Hub** | Hero -> Filter (opt) -> Card Grid -> FAQ -> CTA (opt) |
| **Taxonomy Archive** | Archive Header -> Tax Nav (opt) -> Card Grid -> Pagination -> FAQ -> CTA (opt) |
| **Single Detail** | Hero -> Editorial -> Meta/Facts -> Supporting (opt) -> Related -> FAQ -> CTA |
| **Editorial Listing** | Listing Header -> Card Grid -> Pagination -> FAQ (opt) |
| **Utility Page** | Page Header -> Editorial -> Structured Block -> CTA (opt) |

---

## Workflow Steps

### Step 1: Read Guidelines

1. Read `/guidelines/blocks/overview-templates.md` for template archetypes.
2. Read `/guidelines/patterns/` for available patterns.
3. Identify which patterns already exist and which need to be created (use `new pattern` for missing ones).

### Step 2: Create Page Component

1. Create `/src/app/pages/[PageName]Page.tsx`.
2. Compose from registered patterns only — no bespoke inline sections.
3. Import data from `/src/app/data/` — never hardcode content.
4. Use semantic HTML structure with proper heading hierarchy (one `<h1>` per page).

### Step 3: Create Page CSS

1. Create `/src/styles/pages/[page-name].css`.
2. Use BEM class naming for page-specific overrides.
3. All values must use CSS variables — zero hardcoded values.
4. Include responsive breakpoints.

### Step 4: Design System Compliance

All generated code must:
- Use only the 5 approved font variables
- Use `var(--spacing-*)` for all spacing
- Use semantic color variables for all colors
- Use BEM classes + `.wp-*` utilities — no Tailwind
- Use `lucide-react` for icons
- Use `react-router` `<Link>` for navigation (never `<a href>` for internal links)
- Follow Zero Margin Policy
- Meet WCAG 2.1 AA accessibility

### Step 5: Register Route

1. Add the route to `/src/app/routes.ts` with correct path and component import.
2. Add the CSS import to `/src/styles/index.css` under the pages section.

### Step 6: Update Tracking

1. Add CHANGELOG entry under `[Unreleased]` -> Added.
2. Update `/tasks/task-list.md` if this was a tracked task.

---

## Success Criteria

- [ ] Page component created in `/src/app/pages/`
- [ ] CSS file created with page-specific BEM classes
- [ ] Route registered in `/src/app/routes.ts`
- [ ] CSS imported in `index.css`
- [ ] 100% CSS variable compliance
- [ ] Composed from registered patterns only
- [ ] Follows correct archetype pattern order
- [ ] Data imported from `/src/app/data/` (not hardcoded)
- [ ] Only approved fonts used
- [ ] CHANGELOG updated
