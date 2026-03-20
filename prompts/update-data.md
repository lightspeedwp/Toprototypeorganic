# Update Data — Migrate Hardcoded Content to Data Files

**Type:** Maintenance  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `update data`  
**Repeatable:** Yes — run after adding new pages/templates or when content drift is suspected  
**Estimated Duration:** 1 session (20-40 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Content architecture, canonical post types
- `/guidelines/rules/design-system-rules.md` — No inline content rule
- `/guidelines/blocks/overview-blocks.md` — Block data patterns

---

## Purpose

Audit the entire codebase for hardcoded content within templates, pages, and components. ALL displayable content — text, labels, descriptions, metadata, URLs, image paths, lists — MUST live in data files in `/src/app/data/` and be dynamically imported by components. This ensures content is:

- Centrally managed and easily updated
- Consistent across all instances
- Available for future CMS migration
- Separated from presentation logic

---

## What Counts as Hardcoded Content

### MUST be in data files:

- Page titles, subtitles, descriptions
- Hero headings, subheadings, CTAs
- Card content (titles, descriptions, prices, images)
- Navigation labels and link paths
- Footer content (links, addresses, social URLs)
- FAQ questions and answers
- Testimonials and reviews
- Team member information
- Feature lists and bullet points
- Form labels and placeholder text
- Error messages and empty state text
- SEO metadata (page titles, descriptions)
- Button labels and CTA text

### Acceptable as inline (NOT hardcoded content):

- Structural HTML/JSX (element names, class names)
- Tailwind/CSS class strings
- Conditional logic and event handlers
- Import statements
- Component prop types and interfaces
- Aria labels that are purely structural (e.g., `aria-label="Close menu"`)
- Dev tools labels and debug text

---

## Steps

### Step 1: Audit Pages for Hardcoded Content

1. List all `.tsx` files in `/src/app/pages/` (including subdirectories)
2. For each page file, scan for:
   - String literals inside JSX that are NOT class names, aria-labels, or structural
   - Template literals with displayable text
   - Arrays or objects defined inline with content data
   - Any text that a content editor would want to change

3. Build a violations table:

| # | File | Line(s) | Hardcoded Content | Severity |
|---|------|---------|-------------------|----------|
| 1 | `pages/About.tsx` | 24-30 | Team bios inline | High |
| 2 | `pages/Home.tsx` | 15 | Hero heading string | High |

**Severity guide:**
- **High** — Full content blocks (paragraphs, lists, structured data)
- **Medium** — Individual labels, headings, or descriptions
- **Low** — Single words or short labels unlikely to change

### Step 2: Audit Components for Hardcoded Content

1. List all `.tsx` files in `/src/app/components/` (recursively)
2. Apply same scan as Step 1
3. Pay special attention to:
   - Pattern components (Hero, CTA, CardGrid) — should receive ALL content via props from data
   - Template parts (Header, Footer) — navigation and link content from data
   - Block components — labels and default values from data

### Step 3: Inventory Existing Data Files

1. List all files in `/src/app/data/`
2. Read `/src/app/data/types.ts` (or equivalent) for type definitions
3. Build a coverage map:

| Content Type | Data File | Type Definition | Used By |
|-------------|-----------|-----------------|---------|
| Tours | `tours.ts` | `Tour` | TourCard, TourDetail |
| Destinations | `destinations.ts` | `Destination` | DestinationCard |
| [missing] | — | — | About page (hardcoded) |

### Step 4: Create Missing Data Files

For each content type found hardcoded but lacking a data file:

1. Create the data file in `/src/app/data/` following existing naming patterns
2. Define TypeScript interfaces/types in the types file
3. Extract ALL hardcoded content into the data structure
4. Use existing data files as the template for structure and naming

**Data file template:**

```typescript
// /src/app/data/[content-type].ts
import type { ContentType } from "./types";

export const CONTENT_TYPE_DATA: ContentType[] = [
  {
    id: "unique-slug",
    title: "Content Title",
    description: "Content description...",
    // ... all fields
  },
];
```

### Step 5: Update Components to Use Data

For each hardcoded violation found:

1. Import the appropriate data file
2. Replace hardcoded content with dynamic references
3. Ensure props are typed with the data types
4. Verify the component renders identically after migration

**Pattern — Page level:**
```typescript
import { PAGE_DATA } from "../data/page-content";

export default function AboutPage() {
  return (
    <Hero
      title={PAGE_DATA.hero.title}
      subtitle={PAGE_DATA.hero.subtitle}
      image={PAGE_DATA.hero.image}
    />
  );
}
```

**Pattern — Mapped content:**
```typescript
import { TEAM_MEMBERS } from "../data/team";

{TEAM_MEMBERS.map((member) => (
  <TeamCard key={member.id} {...member} />
))}
```

### Step 6: Verify No Regressions

1. Spot-check 5-10 updated components — content should render identically
2. Verify all imports resolve
3. Check that no data files are orphaned (imported by at least one component)
4. Verify TypeScript types match data structures

### Step 7: Summary

```
## Update Data Session — [Today's Date]

### Audit Results
| Category | Files Scanned | Violations Found |
|----------|--------------|-----------------|
| Pages | [N] | [N] |
| Components | [N] | [N] |

### Migrations
| Action | Count |
|--------|-------|
| Data files created | [N] |
| Data files updated | [N] |
| Types added/updated | [N] |
| Components updated | [N] |
| Hardcoded values migrated | [N] |

### Data Coverage
| Content Type | Status |
|-------------|--------|
| Tours | ✅ Complete |
| Destinations | ✅ Complete |
| [new type] | ✅ Migrated |

### Remaining Issues
- [list or "None — all content is data-driven"]
```

---

## Rules

1. **ALL displayable content MUST live in data files** — no exceptions for "simple" pages
2. **Never change the visual output** — migration must be invisible to the user
3. **Use existing data patterns** — follow the conventions in existing data files
4. **Type everything** — all data must have TypeScript interfaces
5. **Use meaningful IDs** — slugs, not numeric IDs
6. **Group related content** — one data file per content type, not per page
7. **Import from data, never from components** — data flows one way: data → component

---

## Success Criteria

- [ ] Zero hardcoded displayable content in any page file
- [ ] Zero hardcoded displayable content in any component file
- [ ] Every content type has a data file with TypeScript types
- [ ] Every data file is imported by at least one component
- [ ] Visual output is identical before and after migration
