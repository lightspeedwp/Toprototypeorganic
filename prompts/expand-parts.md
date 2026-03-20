# Expand Parts — Discover & Propose Template Parts

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand parts`  
**Repeatable:** Yes — run after adding new pages or templates  
**Estimated Duration:** 1 session (10-20 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/blocks/overview-parts.md` — Template parts reference
- `/guidelines/overview-components.md` — Component architecture
- `/guidelines/Guidelines.md` — WordPress-native React mapping

---

## Design System Rules (apply to ALL generated/modified UI)

- ALL styling via CSS variables from `/src/styles/theme-base.css`, `/src/styles/theme-light.css`, `/src/styles/theme-dark.css`
- Typography: ONLY approved font faces via CSS variables
- External `.css` files with BEM naming (`.wp-part-*`)
- Icons: `@phosphor-icons/react` (default)
- Zero Margin Policy: flex/grid gaps only for layout spacing

---

## Purpose

Analyse all page templates to identify **shared page sections** that should be extracted into reusable template parts in `/src/app/components/parts/`. Template parts are the WordPress equivalent of shared layout sections — they appear across multiple templates with pattern variations. Unlike patterns (which compose blocks for a specific content need), parts are **structural sections** of the page layout.

---

## Canonical Template Parts

Every WordPress block theme should have these parts:

| Part | Purpose | Shared Across | Patterns |
|------|---------|--------------|----------|
| **Header** | Site navigation, logo, search | All pages | Default, Minimal, Transparent |
| **Footer** | Links, contact, copyright | All pages | Default, Minimal, CTA |
| **Hero** | Page hero/banner section | Most pages | 8+ pattern variants |
| **Breadcrumbs** | Hierarchical navigation | Detail & archive pages | Default, Compact |
| **Sidebar** | Secondary content column | Blog, archive pages | Default, Filter, Related |
| **MobileMenu** | Mobile navigation drawer | All pages (mobile) | Default |
| **PostMeta** | Author, date, category info | Blog posts, articles | Default, Compact |
| **SocialSharing** | Share buttons | Detail pages, blog | Default, Floating |
| **Pagination** | Page navigation | Archive pages | Default, Load More |
| **Comments** | Comment section | Blog posts | Default |
| **AuthorBio** | Author information box | Blog posts | Default, Compact |
| **RelatedContent** | Related items section | Detail pages | Cards, List |
| **Newsletter** | Email signup section | Multiple pages | Inline, Banner, Footer |

---

## Steps

### Step 1: Inventory Existing Parts

1. List all components in `/src/app/components/parts/`
2. For each, note: name, patterns registered, pages that use it

| Part | File | Patterns | Used By Pages |
|------|------|----------|--------------|
| Header | parts/Header.tsx | Default, Transparent | All |
| Footer | parts/Footer.tsx | Default | All |
| Hero | parts/Hero.tsx | 8 variants | Most |

### Step 2: Scan Templates for Repeated Sections

1. Read all page templates in `/src/app/pages/`
2. Identify structural sections that appear in 2+ templates
3. Check if they're already extracted as parts or inline

| Section | Found In | Extracted? | Should Be Part? |
|---------|----------|-----------|----------------|
| Breadcrumb trail | Tour Detail, Destination Detail, Blog Post | ❌ Inline | ✅ Yes |
| Author info box | Blog Post, Blog Author Archive | ❌ Inline | ✅ Yes |
| Share buttons | Tour Detail, Blog Post, Accommodation Detail | ❌ Inline | ✅ Yes |
| Related items grid | Tour Detail, Accommodation Detail, Blog Post | Partial | ✅ Yes |
| Newsletter signup | Home, Blog, About | ❌ Inline | ✅ Yes |

### Step 3: Identify Missing Part Patterns

For each existing part, check if it has enough pattern variants:

| Part | Current Patterns | Missing Patterns | Priority |
|------|-----------------|-----------------|----------|
| Header | Default, Transparent | Minimal (checkout), Distraction-free | Medium |
| Footer | Default | Minimal, CTA-focused | Low |
| Hero | 8 variants | — | Complete |
| Breadcrumbs | ❌ No part | Default, Compact | High |

### Step 4: Generate Part Specifications

For each proposed new part:

```
### Proposed: Breadcrumbs Part

**Location:** `/src/app/components/parts/Breadcrumbs.tsx`
**CSS:** `/src/styles/parts/breadcrumbs.css`
**BEM Root:** `.wp-part-breadcrumbs`
**WP Equivalent:** `parts/breadcrumbs.html`

**Patterns:**
- Default — full path with separators
- Compact — current page + parent only (mobile)

**Props:**
- `items: BreadcrumbItem[]` (auto-generated from route or manual)
- `variant?: "default" | "compact"`

**Schema:** Generates BreadcrumbList JSON-LD

**Used by:** Tour Detail, Destination Detail, Accommodation Detail, Blog Post
```

### Step 5: User Decision

Present recommendations table. Wait for approval.

---

## Continuation Protocol

When user says **`continue`** after approving:

1. Scaffold the highest-priority part
2. Create the part component, CSS file, and initial pattern
3. Update consuming templates to use the new part
4. Prompt: "Part [name] created. Say `continue` for the next one."

---

## Rules

1. **Parts are structural** — they define page layout sections, not content
2. **Parts live in `/components/parts/`** — CSS in `/styles/parts/`
3. **BEM naming** — `.wp-part-[name]` class convention
4. **Parts consume patterns** — parts select which pattern to render
5. **Parts are shared** — minimum 2 templates must use a part
6. **CSS variables only** — all styling via design tokens
7. **Never auto-create** — present proposals and wait for approval

---

## Success Criteria

- [ ] All existing parts inventoried with pattern coverage
- [ ] Template sections analysed for extraction candidates
- [ ] Missing parts identified from canonical list
- [ ] Part specifications include props, patterns, and consumers
- [ ] Ready for `continue` execution chain
