# Expand — Run All Expand Sub-Triggers

**Type:** Orchestrator  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand`  
**Repeatable:** Yes — run after major milestones to discover growth opportunities  
**Estimated Duration:** 1 session (60-90 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Trigger words table, page archetypes
- `/guidelines/rules/workflow.md` — Task/report workflow

---

## Purpose

Master orchestrator that runs ALL expand sub-triggers sequentially. Each sub-trigger analyses the codebase from a different angle and proposes improvements. The user reviews and approves proposals, then uses `continue` to scaffold approved items via the appropriate `new *` trigger.

---

## Execution Order

Run each sub-trigger IN ORDER. Present each sub-trigger's recommendations, get user approval, then proceed to the next. Do NOT auto-build — each sub-trigger generates proposals only.

### 1. `expand prompts`

Read and execute `/prompts/expand-prompts.md`

- Scans chat history for recurring patterns and manual workflows
- Recommends new or enhanced trigger-word prompts
- Identifies prompt coverage gaps

### 2. `expand guidelines`

Read and execute `/prompts/expand-guidelines.md`

- Scans chat history for undocumented decisions and corrections
- Recommends guideline updates and clarifications
- Identifies vague or missing rules

### 3. `expand functionality`

Read and execute `/prompts/expand-functionality.md`

- Audits interactive features and UI behaviours
- Identifies user journey gaps and accessibility needs
- Proposes new features with implementation sizing

### 4. `expand patterns`

Read and execute `/prompts/expand-patterns.md`

- Analyses pattern coverage across page archetypes
- Identifies content types lacking presentation patterns
- Proposes new block patterns (scaffoldable via `new pattern`)

### 5. `expand pages`

Read and execute `/prompts/expand-pages.md`

- Identifies missing standalone pages (legal, marketing, utility)
- Checks essential page checklists for tour operator websites
- Proposes new pages (scaffoldable via `new template`)

### 6. `expand templates`

Read and execute `/prompts/expand-templates.md`

- Analyses content type → page coverage
- Identifies missing archive and detail pages
- Proposes new templates (scaffoldable via `new template`)

### 7. `expand data`

Read and execute `/prompts/expand-data.md`

- Scans templates for content patterns needing shared data structures
- Identifies cross-page content shapes (stats, testimonials, feature lists)
- Proposes new typed data interfaces and data files

### 8. `expand components`

Read and execute `/prompts/expand-components.md`

- Identifies duplicated component logic across templates and patterns
- Proposes shared atomic block components to reduce code duplication
- Components scaffoldable via `new block`

### 9. `expand webgl`

Read and execute `/prompts/expand-webgl.md`

- Reviews pages for Canvas/WebGL integration opportunities
- Recommends visual enhancements based on page context and content type
- Assesses technical feasibility and performance impact

### 10. `expand triggers`

Read and execute `/prompts/expand-triggers.md`

- Meta-analysis of the trigger word registry
- Identifies gaps, overlaps, naming inconsistencies, missing orchestrators
- Proposes new triggers to fill system-level gaps

### 11. `expand blocks`

Read and execute `/prompts/expand-blocks.md`

- Identifies missing atomic block components (PriceTag, StarRating, etc.)
- Maps WordPress core and custom blocks to React equivalents
- Proposes blocks that patterns would consume

### 12. `expand parts`

Read and execute `/prompts/expand-parts.md`

- Identifies missing template parts (Breadcrumbs, SocialSharing, etc.)
- Analyses templates for repeated structural sections
- Proposes shared parts with pattern variants

### 13. `expand contexts`

Read and execute `/prompts/expand-contexts.md`

- Identifies missing React contexts (Wishlist, Compare, RecentlyViewed, etc.)
- Analyses prop drilling and cross-component state needs
- Proposes context specifications with state, actions, and consumers

### 14. `expand hooks`

Read and execute `/prompts/expand-hooks.md`

- Identifies duplicated stateful logic across components
- Proposes shared custom hooks (useLocalStorage, useMediaQuery, etc.)
- Cross-references with context dependencies

### 15. `expand a11y`

Read and execute `/prompts/expand-a11y.md`

- Proposes accessibility enhancements beyond WCAG compliance
- Focus management, screen reader announcements, keyboard patterns
- Prioritised by WCAG level and user impact

### 16. `expand routes`

Read and execute `/prompts/expand-routes.md`

- Analyses navigation flows for orphaned pages and dead-ends
- Identifies missing breadcrumbs and UX gaps
- Proposes navigation improvements

### 17. `expand seo`

Read and execute `/prompts/expand-seo.md`

- Scans for missing meta descriptions, OG tags, schema markup
- Maps content types to schema.org types
- Proposes SEO data structures and components

### 18. `expand animations`

Read and execute `/prompts/expand-animations.md`

- Discovers pages that would benefit from scroll-triggered animations
- Proposes micro-interactions and CSS transitions
- All animations aligned with design system tokens

### 19. `expand styles`

Read and execute `/prompts/expand-styles.md`

- Audits CSS file architecture and BEM compliance
- Identifies missing CSS files, unused tokens, dark mode gaps
- Proposes structural improvements to style organisation

---

## Combined Summary

After all sub-triggers complete:

```
## Full Expand Session — [Today's Date]

### Prompts
- Patterns identified: [N] | New prompts recommended: [N] | Enhancements: [N]

### Guidelines
- Insights extracted: [N] | Updates recommended: [N]

### Functionality
- Features inventoried: [N] | New features recommended: [N]

### Patterns
- Existing: [N] | Gaps found: [N] | New patterns recommended: [N]

### Pages
- Existing: [N] | Essential pages missing: [N] | New pages recommended: [N]

### Templates
- Existing: [N] | Content types uncovered: [N] | New templates recommended: [N]

### Data
- Content patterns identified: [N] | New data interfaces recommended: [N]

### Components
- Duplicated logic found: [N] | New atomic components recommended: [N]

### WebGL
- Integration opportunities identified: [N] | New visual enhancements recommended: [N]

### Triggers
- Trigger word registry gaps identified: [N] | New triggers recommended: [N]

### Blocks
- Missing atomic blocks identified: [N] | New blocks recommended: [N]

### Parts
- Repeated structural sections identified: [N] | New parts recommended: [N]

### Contexts
- Missing React contexts identified: [N] | New contexts recommended: [N]

### Hooks
- Duplicated stateful logic identified: [N] | New hooks recommended: [N]

### A11y
- Accessibility enhancements identified: [N] | New a11y features recommended: [N]

### Routes
- Navigation gaps identified: [N] | New routes recommended: [N]

### SEO
- Missing SEO data identified: [N] | New SEO data structures recommended: [N]

### Animations
- Pages benefiting from animations identified: [N] | New animations recommended: [N]

### Styles
- CSS file architecture gaps identified: [N] | New style improvements recommended: [N]

### Combined Backlog (All Approved Items)
| # | Type | Name | Priority | Trigger to Build |
|---|------|------|----------|-----------------|
| 1 | Pattern | FilterBar | High | `new pattern` |
| 2 | Template | AccommodationArchive | High | `new template` |
| 3 | Page | Privacy Policy | High | `new template` |
| 4 | Feature | Pagination | High | (direct implementation) |
| ... | ... | ... | ... | ... |

Say `continue` to start building from the top of this backlog.
```

---

## Rules

1. **Run sub-triggers in order** — prompts/guidelines first (meta), then functionality, then patterns/pages/templates (implementation)
2. **Never auto-build** — each sub-trigger presents proposals only
3. **Consolidate the backlog** — merge all approved items into one prioritised list
4. **`continue` builds the next item** — using the appropriate `new *` trigger
5. **High priority items first** — sort the combined backlog by priority