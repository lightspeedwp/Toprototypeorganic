# Expand Data — Discover Shared Data Structures & Content Patterns

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand data`  
**Repeatable:** Yes — run after adding new pages or content areas  
**Estimated Duration:** 1 session (15-30 minutes)  
**Followed by:** Approved structures can be scaffolded via direct implementation or `update data`.

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Content architecture, canonical post types & taxonomies
- `/guidelines/rules/design-system-rules.md` — No inline content rule
- `/guidelines/blocks/overview-blocks.md` — Block data patterns

---

## Design System Rules (apply to ALL generated/modified UI)

- ALL styling via CSS variables from `/src/styles/theme-base.css`, `/src/styles/theme-light.css`, `/src/styles/theme-dark.css`
- Typography: ONLY approved font faces via CSS variables
- Icons: `@phosphor-icons/react` (default) — `lucide-react` is legacy
- Zero Margin Policy: flex/grid gaps only for layout spacing

---

## Purpose

Scan all templates, pages, and components for **content patterns that could benefit from shared, typed data structures**. This goes beyond `update data` (which migrates existing hardcoded content) by identifying **new data interfaces** that don't exist yet — reusable content shapes that appear across multiple pages but are currently ad-hoc or inconsistent.

---

## What to Look For

### Cross-Page Content Patterns

1. **Statistics/Counter blocks** — pages showing numbers with labels (e.g., "87 destinations", "5-star reviews")
2. **Feature lists** — repeated icon + title + description groups
3. **Testimonial/quote structures** — name, role, quote, image, rating
4. **Timeline/process steps** — numbered sequences with titles and descriptions
5. **Comparison tables** — feature grids across products/options
6. **FAQ structures** — question + answer pairs reused across pages
7. **Social proof elements** — partner logos, certification badges, trust indicators
8. **Pricing structures** — price, duration, included items, per-person info
9. **Contact/address blocks** — phone, email, address, social links, map coordinates
10. **SEO metadata** — page title, description, keywords, OG image per page

### Content Shape Inconsistencies

Look for the same conceptual content stored differently across pages:
- Different field names for the same data (e.g., `subtitle` vs `tagline` vs `description`)
- Missing fields on some instances (e.g., some tours have `duration`, others don't)
- Inline arrays that should be separate data entities

---

## Steps

### Step 1: Inventory Existing Data Structures

1. Read all files in `/src/app/data/`
2. Read `/src/app/data/types.ts` for all type definitions
3. Build a complete type inventory:

| Type Name | Fields | Used By | Records |
|-----------|--------|---------|---------|
| Tour | id, title, slug, ... | TourCard, TourDetail | 61 |
| Destination | ... | DestCard | 87 |

### Step 2: Scan Templates for Undocumented Patterns

1. Read all page files in `/src/app/pages/`
2. Read all pattern components in `/src/app/components/patterns/`
3. For each file, identify content that:
   - Is structured (arrays, objects, lists) but inline
   - Appears in similar form on other pages
   - Would benefit from a shared TypeScript interface

Build a pattern discovery table:

| # | Pattern | Found In | Current State | Proposed Type |
|---|---------|----------|---------------|---------------|
| 1 | Stats counters | Home, About, Tours Archive | Inline arrays, different shapes | `StatItem { label, value, icon?, suffix? }` |
| 2 | Process steps | How to Book, About | Inline, inconsistent fields | `ProcessStep { number, title, description, icon? }` |

### Step 3: Identify Missing Data Relationships

Check for content types that should reference each other:

| Parent Type | Child Type | Relationship | Currently Linked? |
|-------------|-----------|-------------|-------------------|
| Tour | Destination | Tour belongs to Destination | ? |
| Tour | Accommodation | Tour includes Accommodation | ? |
| Destination | Tour | Destination has many Tours | ? |
| Accommodation | Destination | Accommodation in Destination | ? |

### Step 4: Propose New Data Interfaces

For each discovered pattern, propose a typed interface:

```typescript
// Proposed: /src/app/data/types.ts additions

export interface StatItem {
  id: string;
  label: string;
  value: number | string;
  icon?: string;
  suffix?: string;
}

export interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon?: string;
}
```

### Step 5: Propose New Data Files

For each new data type, propose a data file:

| Data Type | Proposed File | Source Pages | Estimated Records |
|-----------|--------------|-------------|-------------------|
| SiteStats | `site-stats.ts` | Home, About | 6-10 |
| ProcessSteps | `process-steps.ts` | How to Book | 4-6 |
| PageMeta | `page-meta.ts` | All pages | 20+ |

### Step 6: User Decision

Present complete recommendation with:
- New types to add to `types.ts`
- New data files to create
- Components that would need updating to consume the new data

Wait for approval before implementing.

---

## Continuation Protocol

When user approves:
1. Add types to `/src/app/data/types.ts`
2. Create data files with extracted content
3. Update components to import from data files
4. Run `update data` to verify zero hardcoded content remains

---

## Rules

1. **Never change visual output** — data extraction must be invisible
2. **Use existing naming conventions** — follow patterns in current data files
3. **Type everything** — every data structure needs a TypeScript interface
4. **Prefer shared types** — if two pages use similar structures, unify them
5. **Never auto-implement** — present proposals and wait for approval
6. **IDs must be slugs** — meaningful string IDs, not numeric

---

## Success Criteria

- [ ] All existing data types inventoried
- [ ] Cross-page content patterns discovered
- [ ] Data relationship gaps identified
- [ ] New TypeScript interfaces proposed
- [ ] New data files proposed with estimated records
- [ ] Recommendations presented for user approval
