# Audit Hero — Template Part & Pattern Compliance

**Type:** Audit  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `audit hero`  
**Repeatable:** Yes  
**Estimated Duration:** 1 session (20-35 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/rules/design-system-rules.md` — Styling compliance
- `/guidelines/components/Hero.md` — Hero component guidelines
- `/guidelines/patterns/hero-patterns.md` — Hero pattern variants
- `/guidelines/overview-components.md` — Component architecture
- `/guidelines/design-tokens/typography.md` — Typography tokens
- `/guidelines/design-tokens/spacing.md` — Spacing tokens

---

## Design System Rules

- **Typography:** ONLY 5 approved font variables (Lora, Noto Sans, Courier New, Caveat, Shadows Into Light)
- **Colors:** CSS variables only from `theme-base.css` / `theme-light.css` / `theme-dark.css`
- **Icons:** `@phosphor-icons/react` (default) — `lucide-react` is legacy
- **Router:** `react-router` only — never `react-router-dom`
- **Styling:** External CSS with BEM naming (`.wp-pattern-hero__*`) — no inline styles
- **Layout:** Zero Margin Policy — flex/grid gaps only

---

## Purpose

Audit the hero section architecture to ensure **every page and template** uses a single, canonical Hero template part that delegates rendering to different pattern components powered by centralised data files.

### Architecture Goal

```
HeroPart (Template Part — ONE component, always loaded in every page)
│
├── Determines layout variant via `context` prop or route
│
├── HeroDefaultPattern      — Standard: badge, title, description, CTAs, scroll arrow
├── HeroHomepagePattern     — Full-bleed: parallax image, overlay text, animated elements
├── HeroArchivePattern      — Compact: title, description, result count, no image
├── HeroSinglePattern       — Detail: image background, breadcrumb trail, meta info
├── HeroDevToolsPattern     — Utility: minimal, icon-driven, no hero image
└── (future patterns...)    — Extensible per page archetype
```

### Data Architecture Goal

```
/src/app/data/content/heroes.ts         — Main hero content (context-keyed)
/src/app/data/content/hero-devtools.ts  — Dev tools hero data (all dev-tools pages)
```

Each hero entry is keyed by `context` string. Pages call `getHeroContent("context-name")` and the Hero template part renders the appropriate pattern with that data.

---

## Audit Steps

### Step 1: Inventory Hero Component Usage

1. Read `/src/app/components/patterns/Hero.tsx` — document its full API, props, variants
2. Search for ALL Hero imports across pages and templates:
   ```
   file_search: content_pattern="Hero" name_pattern="**/pages/*.tsx"
   file_search: content_pattern="Hero" name_pattern="**/templates/*.tsx"
   ```
3. Identify pages that do NOT import Hero — these are violations unless justified

**Record:**
- [ ] Total pages/templates: [N]
- [ ] Pages using `<Hero />`: [N]
- [ ] Pages WITHOUT hero: [N] — list them
- [ ] Pages with inline/hardcoded hero sections (not using the Hero component): [N]

### Step 2: Check Template Part vs Pattern Split

The current Hero component at `/src/app/components/patterns/Hero.tsx`:

1. Is it a monolithic component with all layouts in one file?
2. Or does it delegate to sub-patterns?
3. Does it accept a `variant` or `layout` prop?
4. How does it determine which visual layout to render?

**Expected split:**
- Template part: Orchestrator that picks the right pattern based on context
- Patterns: Individual layout components (Homepage, Archive, Single, DevTools, etc.)

### Step 3: Audit Data File Coverage

1. Read `/src/app/data/content/heroes.ts` — list ALL context keys
2. Cross-reference with pages that use `<Hero context="..." />`
3. Identify missing hero data entries (pages that pass props directly instead of using data file)
4. Check if dev tools pages share a single hero data entry or have individual ones

**Questions:**
- [ ] Does every page have a corresponding hero data entry?
- [ ] Are any hero titles/descriptions hardcoded in page files instead of the data file?
- [ ] Is there a dedicated dev tools hero data file or section?
- [ ] Do archive pages (tours, destinations, accommodation, blog, reviews, team) all have entries?
- [ ] Do single-detail pages (tour, destination, accommodation, blog post) use dynamic data?

### Step 4: Dev Tools Hero Consistency

Dev tools pages (`/dev-tools/*`) should share a consistent hero pattern:
- [ ] All dev tools pages use the Hero component
- [ ] All dev tools hero data comes from one data source (e.g., `DEV_TOOLS_HERO_DATA`)
- [ ] Dev tools hero pattern is visually distinct from main site (no background image, utility-focused)
- [ ] Each dev tools page has its own `context` entry with unique title/description

**Scan all dev tools pages:**
```
file_search: content_pattern="Hero" name_pattern="**/dev-tools/*.tsx"
```

### Step 5: Hero Height & Layout Variants

Document which height/layout variants exist:
- [ ] `large` — Homepage, landing pages (full viewport)
- [ ] `medium` — Standard content pages
- [ ] `small` — Archive listing pages, utility pages
- [ ] `compact` — Dev tools, minimal pages

Are these height variants handled by:
- CSS class on the hero container?
- Props passed to the component?
- Separate pattern components?

### Step 6: CSS Architecture

1. Read `/src/styles/patterns/hero.css`
2. Check BEM naming (`.wp-pattern-hero`, `.wp-pattern-hero__title`, etc.)
3. Verify all values use CSS variables
4. Check for pattern-specific modifier classes (`.wp-pattern-hero--home`, `.wp-pattern-hero--devtools`, etc.)
5. Check responsive behaviour at mobile/tablet breakpoints

### Step 7: Icon & Badge System

The Hero component uses icons for badges:
1. Are icons resolved from `@phosphor-icons/react`?
2. Is there a legacy `ICON_MAP` translating Lucide names to Phosphor?
3. Should the data file use Phosphor icon names directly?

### Step 8: Pages Missing Hero — Full Scan

Run a comprehensive scan to find ALL pages/templates that DON'T use the Hero:

1. List every `.tsx` in `/src/app/pages/`
2. List every `.tsx` in `/src/app/templates/`
3. Cross-reference with Hero imports
4. Classify missing pages:
   - **Should have Hero:** Add to task list
   - **Legitimately no Hero:** Document exception (e.g., login, 404, modals)

### Step 9: Generate Report

Save to `/reports/YYYY-MM/YYYY-MM-DD-hero-audit.md`:

```markdown
# Hero Template Part Audit

**Date:** [Today]

## Coverage Summary
- Total pages/templates: [N]
- Using Hero component: [N] ([%]%)
- Missing Hero: [N]
- Using data file: [N]
- Hardcoded content: [N]

## Hero Data Contexts
| Context Key | Page | Data Source | Layout Variant |
|-------------|------|-------------|----------------|
| home | HomePage | heroes.ts | large |
| ... | ... | ... | ... |

## Pages Without Hero
| Page | Should Have Hero? | Notes |
|------|------------------|-------|
| ... | Yes/No | ... |

## Architecture Findings
- Current: [monolithic / pattern-split / hybrid]
- Recommended: [pattern-split with data-driven context]

## Issues Found
1. [issue] — Priority [P0/P1/P2]

## Recommended Actions
1. [action]
```

Add tasks to `/tasks/task-list.md`.

---

## Success Criteria

- [ ] Every page/template audited for Hero usage
- [ ] Hero data file completeness verified
- [ ] Dev tools hero consistency checked
- [ ] Missing hero entries identified and tasked
- [ ] Pattern architecture documented
- [ ] CSS compliance verified
- [ ] Icon system checked (Phosphor, no legacy Lucide)
- [ ] Report saved and tasks created