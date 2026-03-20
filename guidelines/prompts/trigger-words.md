# Trigger Words — Quick Command Reference

**Version:** 4.0.0  
**Last Updated:** 2026-03-18  
**Status:** Active

---

## Overview

Trigger words are single-word or short-phrase commands that tell the AI to execute a specific prompt file. This eliminates the need to paste full prompt instructions — just type the word.

---

## Registered Trigger Words

### Project Maintenance

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **cleanup** | `/prompts/cleanup.md` | Full project hygiene: filesystem, imports, routes, tasks, reports, changelog, devtools |
| **continue** | `/prompts/continue.md` | Resume next unchecked task from `/tasks/task-list.md` |
| **cleanup then continue** | Both in sequence | Run cleanup first, then continue with next task |
| **changelog** | `/prompts/changelog.md` | Update CHANGELOG.md with recent undocumented work |
| **cleanup guidelines** | `/prompts/cleanup-guidelines.md` | Guideline file maintenance — duplicates, outdated content, template compliance |
| **process reports** | `/prompts/process-reports.md` | Organize, rename, and archive reports |
| **release** | `/prompts/release.md` | Version bump, changelog release, update version references |

### Scaffolding (New Components)

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **new block** | `/prompts/new-block.md` | Scaffold an atomic block component (button, card, badge) |
| **new pattern** | `/prompts/new-pattern.md` | Scaffold a section-level pattern (hero, CTA, card grid) |
| **new template** | `/prompts/new-template.md` | Scaffold a page template with route and CSS |

### Design Tokens & Styling

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **audit tokens** | `/prompts/audit-tokens.md` | Design token compliance — hardcoded values vs CSS variables |
| **audit css** | `/prompts/audit-css.md` | CSS architecture — broken imports, orphaned files, duplicate rules |
| **audit styles** | `/prompts/audit-styles.md` | Comprehensive styling — tokens + CSS + class conventions + fonts in one pass |
| **audit style** | `/prompts/audit-style.md` | Organic design language compliance — visual consistency, branding |
| **audit theme** | `/prompts/audit-theme.md` | Light/dark mode token compliance — hardcoded values, token inversion, contrast |
| **apply bem** | `/prompts/apply-bem.md` | BEM class compliance audit & fix — missing/inconsistent BEM classes |

### Data & Content

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **audit data** | `/prompts/audit-data.md` | Data file architecture — orphaned files, duplicates, type safety, relational integrity |
| **audit images** | `/prompts/audit-images.md` | Broken image & asset compliance — URLs, alt text, lazy loading |

### Accessibility

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **audit a11y** | `/prompts/audit-a11y.md` | Quick WCAG 2.1 AA accessibility audit |
| **audit accessibility** | `/prompts/audit-accessibility.md` | Comprehensive WCAG 2.1 AA deep-dive |

### Layout, Routing & Functionality

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **audit layout** | `/prompts/audit-layout.md` | Visual integrity & responsive layout |
| **audit responsive** | `/prompts/audit-responsive.md` | Responsive design — breakpoints, mobile-first, grids, touch targets |
| **audit routing** | `/prompts/audit-routing.md` | Route integrity — link validation, 404s, logo nav, mega menu links |
| **audit functionality** | `/prompts/audit-functionality.md` | UI state & interaction — search, filters, forms, navigation, dead UI |

### Performance & Memory

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **audit memory** | `/prompts/audit-memory.md` | Codebase memory reduction audit — duplicates, oversized files, orphans |
| **optimize memory** | `/prompts/optimize-memory.md` | Execute memory optimization based on audit findings |

### Specialized

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **audit webgl** | `/prompts/audit-webgl.md` | Canvas & WebGL usage inventory |
| **audit guidelines** | `/prompts/audit-guidelines.md` | Guideline file standards — frontmatter, heading hierarchy |
| **guidelines audit** | `/prompts/guidelines-audit.md` | Deep systematic review of all guideline files against codebase |
| **update guidelines** | `/prompts/update-guidelines.md` | Sync guideline files with codebase after changes |
| **audit routes** | `/prompts/audit-routes.md` | Route integrity — links, navigation data, page cross-reference |
| **sitemap** | `/prompts/sitemap.md` | Sync sitemap page with actual routes |
| **status** | `/prompts/status.md` | Project health dashboard (read-only snapshot) |
| **process reports deep** | `/prompts/process-reports-orchestrator.md` | Deep report processing — verify findings, extract tasks, archive resolved |

### Icons & Icon Migration

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **audit phosphor** | `/prompts/audit-phosphor.md` | Icon system compliance — broken imports, legacy lucide detection, migration batches |
| **migrate phosphor** | `/prompts/migrate-phosphor.md` | Execute icon migration batch (lucide → Phosphor) |

### Template Parts (Header / Footer / Hero)

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **audit header** | `/prompts/audit-header.md` | Header template part — pattern routing, homepage/devtools variants, breadcrumbs |
| **audit footer** | `/prompts/audit-footer.md` | Footer template part — main site vs dev tools pattern, data sources |
| **audit hero** | `/prompts/audit-hero.md` | Hero template part — data coverage, pattern variants, dev tools consistency |

### Archive & Housekeeping

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **archive prompts** | `/prompts/archive-prompts.md` | Review non-trigger prompts — repurpose general ones, archive specific/completed ones |
| **archive reports** | `/prompts/archive-reports.md` | Review reports — promote reusable methodology, archive resolved/superseded results |
| **archive tasks** | `/prompts/archive-tasks.md` | Review task files — extract reusable workflows, archive completed, consolidate active |
| **archive guidelines** | `/prompts/archive-guidelines.md` | Review guidelines — merge duplicates, update outdated, archive superseded files |

### Prompt Maintenance

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **update triggers** | `/prompts/update-triggers.md` | Sync trigger words, prompt files & guideline tables — detect drift, fix counts |

### Update (Sync with Codebase)

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **update data** | `/prompts/update-data.md` | Audit codebase for hardcoded content, migrate ALL values to data files |
| **update routes** | `/prompts/update-routes.md` | Sync routes.ts, navigation data & internal links with page files |
| **update sitemap** | `/prompts/update-sitemap.md` | Sync sitemap page with current route configuration |
| **update guidelines** | `/prompts/update-guidelines.md` | Sync guideline files with current codebase state |
| **update prompts** | `/prompts/update-prompts.md` | Update prompt file references, frontmatter & design system reminders |
| **update reports** | `/prompts/update-reports.md` | Re-evaluate active reports, mark resolved issues, flag for archival |
| **update tasks** | `/prompts/update-tasks.md` | Sync task-list.md with project state, mark completed, remove stale |
| **update status** | `/prompts/update-status.md` | Generate fresh project health snapshot with all metrics |
| **update triggers** | `/prompts/update-triggers.md` | Sync trigger words, prompt files & guideline tables — detect drift, fix counts |

### Expand (Codebase & Chat History Analysis)

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **expand prompts** | `/prompts/expand-prompts.md` | Scan chat history for recurring patterns, recommend new or enhanced prompts |
| **expand guidelines** | `/prompts/expand-guidelines.md` | Scan chat history for undocumented decisions, recommend guideline updates |
| **expand functionality** | `/prompts/expand-functionality.md` | Audit interactive features, propose new UI behaviours and accessibility enhancements |
| **expand patterns** | `/prompts/expand-patterns.md` | Analyse pattern coverage gaps, propose new block patterns → `continue` chains to `new pattern` |
| **expand pages** | `/prompts/expand-pages.md` | Identify missing standalone pages (legal, marketing, utility) → `continue` chains to `new template` |
| **expand templates** | `/prompts/expand-templates.md` | Analyse content type coverage, propose archive/detail templates → `continue` chains to `new template` |
| **expand data** | `/prompts/expand-data.md` | Scan templates for content patterns needing shared data structures & typed interfaces |
| **expand components** | `/prompts/expand-components.md` | Identify duplicated component logic, propose shared atomic block components → `continue` chains to `new block` |
| **expand webgl** | `/prompts/expand-webgl.md` | Review pages for Canvas/WebGL integration opportunities based on content context |
| **expand triggers** | `/prompts/expand-triggers.md` | Meta-analyse trigger registry for gaps, overlaps, naming inconsistencies & missing orchestrators |
| **expand blocks** | `/prompts/expand-blocks.md` | Discover missing atomic block components (PriceTag, StarRating, etc.) mapped to WordPress blocks |
| **expand parts** | `/prompts/expand-parts.md` | Discover missing template parts (Breadcrumbs, SocialSharing, etc.) with pattern variants |
| **expand contexts** | `/prompts/expand-contexts.md` | Discover missing React contexts (Wishlist, Compare, RecentlyViewed, Notification, etc.) |
| **expand hooks** | `/prompts/expand-hooks.md` | Identify duplicated stateful logic, propose shared custom hooks (useLocalStorage, useMediaQuery, etc.) |
| **expand a11y** | `/prompts/expand-a11y.md` | Propose accessibility enhancements: keyboard navigation, screen reader, focus management, skip links |
| **expand routes** | `/prompts/expand-routes.md` | Analyse navigation flows for orphaned pages, missing breadcrumbs & UX dead-ends |
| **expand seo** | `/prompts/expand-seo.md` | Scan for missing meta descriptions, Open Graph tags, schema markup & internal linking |
| **expand animations** | `/prompts/expand-animations.md` | Discover scroll-triggered animations, micro-interactions & CSS transitions aligned with design tokens |
| **expand styles** | `/prompts/expand-styles.md` | Audit CSS file architecture, BEM compliance, unused tokens & dark mode coverage |

### Orchestrators

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **audit** | `/prompts/audit.md` | Master orchestrator — runs ALL 22 audit sub-triggers sequentially |
| **archive** | `/prompts/archive.md` | Master orchestrator — runs ALL archive sub-triggers sequentially |
| **update** | `/prompts/update.md` | Master orchestrator — runs ALL update sub-triggers sequentially |
| **expand** | `/prompts/expand.md` | Master orchestrator — runs ALL expand sub-triggers, generates combined backlog |

---

## How to Use

```
cleanup                    # Full project hygiene
continue                   # Resume next task
audit                      # Run ALL audits
audit tokens, css, styles  # Run specific audits (comma-separated)
new template               # Scaffold a new page
new pattern                # Scaffold a new section pattern
new block                  # Scaffold an atomic component
release minor              # Cut a minor version release
process reports            # Organize report files
cleanup then continue      # Chain: cleanup first, then next task
audit then changelog       # Chain: all audits, then update changelog
```

---

## Adding New Trigger Words

1. Create the prompt file in `/prompts/[name].md`
2. Add an entry to the appropriate table above
3. Add the trigger word to the `TRIGGER WORDS` section in `/guidelines/Guidelines.md`

---

## Rules for Trigger Word Prompts

1. **Self-contained:** Each prompt includes all instructions needed
2. **Single-session:** Prompts complete in one session (~30-45 min max)
3. **Idempotent:** Running twice is safe
4. **Environment-aware:** Includes Figma Make reminder
5. **Design-system-aware:** References 5 approved fonts, CSS variables, BEM classes, `@phosphor-icons/react`, `react-router`, Zero Margin Policy