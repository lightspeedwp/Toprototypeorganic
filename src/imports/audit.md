# Audit — Master Orchestrator

**Category:** Prompt  
**Version:** 2.0.0  
**Last Updated:** 2026-03-15  
**Status:** Active  
**Template Used:** _templates/prompt-template.md

---

## Trigger

`audit` (bare word, no sub-trigger specified)

## Behaviour

Runs ALL 17 audit sub-triggers sequentially. Each audit follows the standard workflow: scan → fix → report → task list.

## Execution Order

| Step | Sub-Trigger | Prompt File | Report Output |
|---|---|---|---|
| 1 | `audit routes` | `/prompts/routes.md` | `YYYY-MM-DD-routes-audit.md` |
| 2 | `audit sitemap` | `/prompts/sitemap.md` | `YYYY-MM-DD-sitemap-audit.md` |
| 3 | `audit tokens` | `/prompts/audit-tokens.md` | `YYYY-MM-DD-tokens-audit.md` |
| 4 | `audit css` | `/prompts/audit-css.md` | `YYYY-MM-DD-css-audit.md` |
| 5 | `audit a11y` | `/prompts/audit-a11y.md` | `YYYY-MM-DD-a11y-audit.md` |
| 6 | `audit data` | `/prompts/audit-data.md` | `YYYY-MM-DD-data-audit.md` |
| 7 | `audit responsive` | `/prompts/audit-responsive.md` | `YYYY-MM-DD-responsive-audit.md` |
| 8 | `audit styles` | `/prompts/audit-styles.md` | `YYYY-MM-DD-styles-audit.md` |
| 9 | `audit guidelines` | `/prompts/audit-guidelines.md` | `YYYY-MM-DD-guidelines-audit.md` |
| 10 | `audit theme` | `/prompts/audit-light-dark-mode.md` | `YYYY-MM-DD-theme-mode-audit.md` |
| 11 | `audit style` | `/prompts/audit-retro-style.md` | `YYYY-MM-DD-retro-style-audit.md` |
| 12 | `audit webgl` | `/prompts/audit-webgl.md` | `YYYY-MM-DD-webgl-audit.md` |
| 13 | `audit routing` | `/prompts/audit-routing.md` | `YYYY-MM-DD-routing-audit.md` |
| 14 | `audit layout` | `/prompts/audit-layout.md` | `YYYY-MM-DD-layout-audit.md` |
| 15 | `audit functionality` | `/prompts/audit-functionality.md` | `YYYY-MM-DD-functionality-audit.md` |
| 16 | `audit accessibility` | `/prompts/audit-accessibility.md` | `YYYY-MM-DD-accessibility-audit.md` |
| 17 | `audit performance` | `/prompts/audit-performance.md` | `YYYY-MM-DD-performance-audit.md` |

## Post-Audit Summary

After all 17 audits complete, print a summary dashboard:

```
## Audit Summary — YYYY-MM-DD

| Audit | Grade | Auto-Fixed | Open Issues | Report |
|---|---|---|---|---|
| Routes | A/B/C/F | N | N | ✅ |
| Sitemap | A/B/C/F | N | N | ✅ |
| Tokens | A/B/C/F | N | N | ✅ |
| CSS | A/B/C/F | N | N | ✅ |
| A11y | A/B/C/F | N | N | ✅ |
| Data | A/B/C/F | N | N | ✅ |
| Responsive | A/B/C/F | N | N | ✅ |
| Styles | A/B/C/F | N | N | ✅ |
| Guidelines | A/B/C/F | N | N | ✅ |
| Theme | A/B/C/F | N | N | ✅ |
| Style | A/B/C/F | N | N | ✅ |
| WebGL | A/B/C/F | N | N | ✅ |
| Routing | A/B/C/F | N | N | ✅ |
| Layout | A/B/C/F | N | N | ✅ |
| Functionality | A/B/C/F | N | N | ✅ |
| Accessibility | A/B/C/F | N | N | ✅ |
| Performance | A/B/C/F | N | N | ✅ |

**Next step:** Type `process reports` to convert reports into task lists.
```

## Modifiers

| Command | Behaviour |
|---|---|
| `audit` | Run all 17 sub-triggers |
| `audit && process reports` | Run all 17, then auto-chain to `process reports` |
| `audit tokens, css, a11y` | Run only listed sub-triggers (comma-separated) |

## Rules

1. Each audit writes its own report to `/reports/YYYY-MM/`.
2. Each audit creates or updates its own task list in `/tasks/`.
3. Auto-fix violations where safe. Document unfixable issues.
4. Do NOT chain to `process reports` unless `&&` is used.
5. If session capacity is reached mid-sequence, note which audits remain and prompt the user to type `continue` or re-run the remaining audits.

---

## Version History

| Version | Date | Changes |
|---|---|---|
| 2.0.0 | 2026-03-15 | Expanded from 9 to 17 sub-triggers. Added theme, style, webgl, routing, layout, functionality, accessibility, performance |
| 1.0.0 | 2026-03-15 | Initial creation — 9-step audit orchestrator |