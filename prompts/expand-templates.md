# Expand Templates — Discover & Propose New Page Templates

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand templates`  
**Repeatable:** Yes — run after adding new content types or data  
**Estimated Duration:** 1 session (15-25 minutes)  
**Followed by:** Type `continue` to scaffold the next approved template via the `new template` trigger.

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Page archetypes, canonical post types
- `/guidelines/blocks/overview-templates.md` — Template reference
- `/guidelines/patterns/archive-patterns.md` — Archive template system

---

## Purpose

Analyse the current codebase to identify **missing page templates** based on content types that lack dedicated pages, page archetypes not yet implemented, and routes referenced but not built. Each recommendation is scaffoldable via the `new template` trigger word.

---

## Analysis Steps

### Step 1: Inventory Existing Templates

1. List all page files in `/src/app/pages/` (including subdirectories)
2. Read `/src/app/routes.ts` for the complete route list
3. For each page, note:
   - Page name and archetype (Content Hub, Single Detail, Editorial Listing, etc.)
   - Which content type it serves
   - Patterns it uses

| Page | Archetype | Content Type | Route | Patterns Used |
|------|-----------|-------------|-------|---------------|
| ToursArchive | Content Hub | Tours | /tours | Hero, CardGrid |

### Step 2: Content Type Coverage

Cross-reference canonical post types with existing pages:

| Content Type | Records | Archive Page | Detail Page | Missing |
|-------------|---------|-------------|------------|---------|
| Tours | 61 | ✅ /tours | ✅ /tours/:slug | — |
| Destinations | 87 | ✅ /destinations | ❌ | Detail page |
| Accommodation | 50 | ❌ | ❌ | Both |
| Specials | ? | ❌ | ❌ | Both |
| Team | ? | ❌ | ❌ | Both |
| Reviews | ? | ❌ | ❌ | Both |
| Blog Posts | ? | ❌ | ❌ | Both |

### Step 3: Archetype Coverage

Check which page archetypes have at least one implementation:

| Archetype | Implemented? | Examples | Missing Implementation? |
|-----------|-------------|----------|------------------------|
| Content Hub | ✅ | Tours | — |
| Taxonomy Archive | ❌ | — | Travel Styles, Continents |
| Single Detail | ✅ | Tour Detail | Destination, Accommodation |
| Editorial Listing | ❌ | — | Blog |
| Utility Page | ✅ | FAQ | — |

### Step 4: Navigation & Sitemap Gaps

1. Check navigation data for links pointing to pages that don't exist
2. Check mega menu items without corresponding pages
3. Check footer links without pages

### Step 5: Taxonomy Pages

Check canonical taxonomies for dedicated pages:

| Taxonomy | Page? | Route | Missing? |
|----------|-------|-------|----------|
| Travel Styles | ❌ | — | Yes — needs archive |
| Accommodation Types | ❌ | — | Yes |
| Continents | ❌ | — | Yes |
| Brands | ❌ | — | Yes |

### Step 6: Generate Recommendations

```
### Template Expansion Proposals — [Today's Date]

| # | Priority | Template Name | Archetype | Content Type | Justification |
|---|----------|-------------|-----------|-------------|---------------|
| 1 | High | AccommodationArchive | Content Hub | Accommodation | 50 records with no page |
| 2 | High | AccommodationDetail | Single Detail | Accommodation | Data exists, no presentation |
| 3 | High | BlogListing | Editorial Listing | Blog Posts | Common archetype, not implemented |
| 4 | Medium | DestinationDetail | Single Detail | Destinations | 87 records, no detail view |
| 5 | Medium | TeamPage | Utility Page | Team | Team data exists, no page |
| 6 | Low | TravelStyleArchive | Taxonomy Archive | Travel Styles | Taxonomy without archive |

Total: [N] new templates recommended
```

**Priority guide:**
- **High** — Content type with significant data (20+ records) and no page at all
- **Medium** — Missing detail pages for content types that have archive pages
- **Low** — Taxonomy pages, secondary content types, or variants

### Step 7: User Decision

Wait for user input:
- User approves specific items → note which to build
- User says `continue` → scaffold the highest-priority approved template using `new template` trigger

---

## Continuation Protocol

When the user says **`continue`** after this prompt:

1. Read `/prompts/new-template.md`
2. Execute it with the next approved template from the proposals table
3. Provide the `new template` trigger with:
   - Template name and archetype
   - Content type and data source
   - Required patterns (from archetype definition)
   - Route path

After each template is built, prompt: "Template [name] complete. Say `continue` for the next template, or give a new instruction."

---

## Rules

1. **Only propose templates that conform to approved archetypes** — no freeform pages
2. **Every template must serve a content type** — no empty shell pages
3. **Data must exist before the page** — don't propose pages for content types without data files
4. **Include route path** — every proposal must have a planned URL
5. **Never auto-build** — always present proposals and wait for approval

---

## Success Criteria

- [ ] Complete inventory of existing pages with archetype classification
- [ ] Content type coverage gaps identified
- [ ] Archetype implementation gaps identified
- [ ] Navigation link gaps identified
- [ ] Prioritised proposal table with clear justifications
- [ ] Ready for `continue` → `new template` execution chain
