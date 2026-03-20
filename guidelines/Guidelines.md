# Figma Make Prototype Guidelines

**Version:** V4.1 — Modular Architecture
**Last Updated:** March 18, 2026

---

## Trigger Words — Quick Commands

| Trigger | Action | Prompt File |
|---------|--------|-------------|
| **cleanup** | Run full project hygiene | `/prompts/cleanup.md` |
| **continue** | Resume next unchecked task | `/prompts/continue.md` |
| **cleanup then continue** | Run cleanup, then next task | Both in sequence |
| **changelog** | Update CHANGELOG.md | `/prompts/changelog.md` |
| **cleanup guidelines** | Guideline file maintenance | `/prompts/cleanup-guidelines.md` |
| **process reports** | Organize and archive reports | `/prompts/process-reports.md` |
| **release** | Version bump and release workflow | `/prompts/release.md` |
| **new block** | Scaffold an atomic block component | `/prompts/new-block.md` |
| **new pattern** | Scaffold a section-level pattern | `/prompts/new-pattern.md` |
| **new template** | Scaffold a page template | `/prompts/new-template.md` |
| **apply bem** | BEM class compliance audit & fix | `/prompts/apply-bem.md` |
| **audit** | Run ALL audit sub-triggers | `/prompts/audit.md` |
| **audit tokens** | Design token compliance | `/prompts/audit-tokens.md` |
| **audit css** | CSS architecture audit | `/prompts/audit-css.md` |
| **audit styles** | Comprehensive styling audit | `/prompts/audit-styles.md` |
| **audit style** | Organic design language compliance | `/prompts/audit-style.md` |
| **audit theme** | Light/dark mode token compliance | `/prompts/audit-theme.md` |
| **audit data** | Data file architecture audit | `/prompts/audit-data.md` |
| **audit images** | Broken image & asset compliance | `/prompts/audit-images.md` |
| **audit a11y** | Quick WCAG 2.1 AA accessibility audit | `/prompts/audit-a11y.md` |
| **audit accessibility** | Comprehensive WCAG 2.1 AA deep-dive | `/prompts/audit-accessibility.md` |
| **audit layout** | Visual integrity & responsive layout | `/prompts/audit-layout.md` |
| **audit responsive** | Responsive design audit | `/prompts/audit-responsive.md` |
| **audit routing** | Route integrity & navigation | `/prompts/audit-routing.md` |
| **audit functionality** | UI state & interaction compliance | `/prompts/audit-functionality.md` |
| **audit memory** | Codebase memory reduction audit | `/prompts/audit-memory.md` |
| **optimize memory** | Execute memory optimization | `/prompts/optimize-memory.md` |
| **audit webgl** | Canvas & WebGL usage inventory | `/prompts/audit-webgl.md` |
| **audit guidelines** | Guideline file standards audit | `/prompts/audit-guidelines.md` |
| **guidelines audit** | Deep systematic guideline review | `/prompts/guidelines-audit.md` |
| **audit phosphor** | Icon system compliance & lucide→Phosphor migration | `/prompts/audit-phosphor.md` |
| **migrate phosphor** | Execute icon migration batch | `/prompts/migrate-phosphor.md` |
| **audit header** | Header template part & pattern compliance | `/prompts/audit-header.md` |
| **audit footer** | Footer template part & pattern compliance | `/prompts/audit-footer.md` |
| **audit hero** | Hero template part, pattern & data consistency | `/prompts/audit-hero.md` |
| **update guidelines** | Sync guideline files with codebase | `/prompts/update-guidelines.md` |
| **audit routes** | Route integrity, links, navigation data | `/prompts/audit-routes.md` |
| **sitemap** | Sync sitemap page with actual routes | `/prompts/sitemap.md` |
| **status** | Project health dashboard (read-only) | `/prompts/status.md` |
| **update triggers** | Sync trigger words, prompts & guideline tables | `/prompts/update-triggers.md` |
| **process reports deep** | Deep report processing with verification | `/prompts/process-reports-orchestrator.md` |
| **archive** | Run ALL archive sub-triggers | `/prompts/archive.md` |
| **archive prompts** | Review, repurpose & archive prompt files | `/prompts/archive-prompts.md` |
| **archive reports** | Review, promote & archive report files | `/prompts/archive-reports.md` |
| **archive tasks** | Review, repurpose & archive task files | `/prompts/archive-tasks.md` |
| **archive guidelines** | Review, merge & archive guideline files | `/prompts/archive-guidelines.md` |
| **update** | Run ALL update sub-triggers | `/prompts/update.md` |
| **update data** | Migrate hardcoded content to data files | `/prompts/update-data.md` |
| **update routes** | Sync routes, navigation & link data | `/prompts/update-routes.md` |
| **update sitemap** | Sync sitemap page with routes | `/prompts/update-sitemap.md` |
| **update guidelines** | Sync guideline files with codebase | `/prompts/update-guidelines.md` |
| **update prompts** | Sync prompt files with codebase | `/prompts/update-prompts.md` |
| **update reports** | Re-evaluate active report status | `/prompts/update-reports.md` |
| **update tasks** | Sync task list with project state | `/prompts/update-tasks.md` |
| **update status** | Generate project health snapshot | `/prompts/update-status.md` |
| **update triggers** | Sync trigger words, prompts & guideline tables | `/prompts/update-triggers.md` |
| **expand** | Run ALL expand sub-triggers | `/prompts/expand.md` |
| **expand prompts** | Discover reusable prompts from chat history | `/prompts/expand-prompts.md` |
| **expand guidelines** | Discover undocumented rules from chat history | `/prompts/expand-guidelines.md` |
| **expand functionality** | Propose new interactive features | `/prompts/expand-functionality.md` |
| **expand patterns** | Propose new block patterns | `/prompts/expand-patterns.md` |
| **expand pages** | Propose new standalone pages | `/prompts/expand-pages.md` |
| **expand templates** | Propose new page templates | `/prompts/expand-templates.md` |
| **expand data** | Discover shared data structures & content patterns | `/prompts/expand-data.md` |
| **expand components** | Identify duplicated component logic, propose shared blocks | `/prompts/expand-components.md` |
| **expand webgl** | Review pages for Canvas/WebGL integration opportunities | `/prompts/expand-webgl.md` |
| **expand triggers** | Meta-analyse trigger registry for gaps & overlaps | `/prompts/expand-triggers.md` |
| **expand blocks** | Discover missing atomic block components | `/prompts/expand-blocks.md` |
| **expand parts** | Discover missing template parts | `/prompts/expand-parts.md` |
| **expand contexts** | Discover missing React contexts | `/prompts/expand-contexts.md` |
| **expand hooks** | Discover missing custom React hooks | `/prompts/expand-hooks.md` |
| **expand a11y** | Propose accessibility enhancements beyond compliance | `/prompts/expand-a11y.md` |
| **expand routes** | Analyse navigation flows for gaps & dead-ends | `/prompts/expand-routes.md` |
| **expand seo** | Discover missing SEO, meta & schema markup | `/prompts/expand-seo.md` |
| **expand animations** | Propose scroll-triggered & micro-interaction animations | `/prompts/expand-animations.md` |
| **expand styles** | Audit CSS architecture & token coverage | `/prompts/expand-styles.md` |

Read the referenced prompt file