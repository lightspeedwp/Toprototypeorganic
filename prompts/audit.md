# Audit — Master Orchestrator

**Type:** Orchestrator  
**Created:** 2026-03-18  
**Version:** 4.0.0  
**Status:** Active  
**Trigger Word:** `audit`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Design System Rules

**Read before auditing:** `/guidelines/rules/design-system-rules.md`

- ALL styling via CSS variables from `theme-base.css` / `theme-light.css` / `theme-dark.css`
- Typography: ONLY 5 approved fonts (Lora, Noto Sans, Courier New, Caveat, Shadows Into Light)
- Icons: `@phosphor-icons/react` (default) — `lucide-react` is legacy, being phased out
- Router: `react-router` only — never `react-router-dom`
- Layout: Zero Margin Policy — flex/grid gaps only

---

## Trigger

`audit` (bare word, no sub-trigger specified)

## Behaviour

Runs ALL audit sub-triggers sequentially. Each audit follows the standard workflow: scan, fix, report, task list.

## Execution Order

### Design System & Styling (Steps 1–6)

| Step | Sub-Trigger | Prompt File | Report Output |
|---|---|---|---|
| 1 | `audit tokens` | `/prompts/audit-tokens.md` | `tokens-audit.md` |
| 2 | `audit css` | `/prompts/audit-css.md` | `css-architecture-audit.md` |
| 3 | `audit styles` | `/prompts/audit-styles.md` | `styles-compliance-audit.md` |
| 4 | `audit theme` | `/prompts/audit-theme.md` | `theme-mode-audit.md` |
| 5 | `audit style` | `/prompts/audit-style.md` | `style-audit.md` |
| 6 | `apply bem` | `/prompts/apply-bem.md` | `bem-compliance-audit.md` |

### Accessibility & Responsiveness (Steps 7–9)

| Step | Sub-Trigger | Prompt File | Report Output |
|---|---|---|---|
| 7 | `audit a11y` | `/prompts/audit-a11y.md` | `a11y-audit.md` |
| 8 | `audit accessibility` | `/prompts/audit-accessibility.md` | `accessibility-comprehensive-audit.md` |
| 9 | `audit responsive` | `/prompts/audit-responsive.md` | `responsive-audit.md` |

### Content & Data (Steps 10–11)

| Step | Sub-Trigger | Prompt File | Report Output |
|---|---|---|---|
| 10 | `audit data` | `/prompts/audit-data.md` | `data-architecture-audit.md` |
| 11 | `audit images` | `/prompts/audit-images.md` | `image-audit.md` |

### Layout, Routing & Functionality (Steps 12–15)

| Step | Sub-Trigger | Prompt File | Report Output |
|---|---|---|---|
| 12 | `audit layout` | `/prompts/audit-layout.md` | `layout-audit.md` |
| 13 | `audit routing` | `/prompts/audit-routing.md` | `routing-audit.md` |
| 14 | `audit routes` | `/prompts/audit-routes.md` | `routes-audit.md` |
| 15 | `audit functionality` | `/prompts/audit-functionality.md` | `functionality-audit.md` |

### Icons (Step 16)

| Step | Sub-Trigger | Prompt File | Report Output |
|---|---|---|---|
| 16 | `audit phosphor` | `/prompts/audit-phosphor.md` | `phosphor-audit.md` |

### Template Parts (Steps 17–19)

| Step | Sub-Trigger | Prompt File | Report Output |
|---|---|---|---|
| 17 | `audit header` | `/prompts/audit-header.md` | `header-audit.md` |
| 18 | `audit footer` | `/prompts/audit-footer.md` | `footer-audit.md` |
| 19 | `audit hero` | `/prompts/audit-hero.md` | `hero-audit.md` |

### Infrastructure (Steps 20–22)

| Step | Sub-Trigger | Prompt File | Report Output |
|---|---|---|---|
| 20 | `audit webgl` | `/prompts/audit-webgl.md` | `webgl-audit.md` |
| 21 | `audit guidelines` | `/prompts/audit-guidelines.md` | `guidelines-standards-audit.md` |
| 22 | `audit memory` | `/prompts/audit-memory.md` | `memory-reduction-audit.md` |

## Post-Audit Summary

After all audits complete, generate a combined report at `/reports/YYYY-MM/YYYY-MM-DD-full-audit.md` and print a summary dashboard:

```
## Audit Summary — YYYY-MM-DD

| # | Audit | Grade | Auto-Fixed | Open Issues | Report |
|---|---|---|---|---|---|
| 1 | Tokens | A/B/C/F | N | N | path |
| 2 | CSS | A/B/C/F | N | N | path |
| 3 | Styles | A/B/C/F | N | N | path |
| 4 | Theme | A/B/C/F | N | N | path |
| 5 | Style | A/B/C/F | N | N | path |
| 6 | BEM | A/B/C/F | N | N | path |
| 7 | A11y | A/B/C/F | N | N | path |
| 8 | Accessibility | A/B/C/F | N | N | path |
| 9 | Responsive | A/B/C/F | N | N | path |
| 10 | Data | A/B/C/F | N | N | path |
| 11 | Images | A/B/C/F | N | N | path |
| 12 | Layout | A/B/C/F | N | N | path |
| 13 | Routing | A/B/C/F | N | N | path |
| 14 | Routes | A/B/C/F | N | N | path |
| 15 | Functionality | A/B/C/F | N | N | path |
| 16 | Phosphor | A/B/C/F | N | N | path |
| 17 | Header | A/B/C/F | N | N | path |
| 18 | Footer | A/B/C/F | N | N | path |
| 19 | Hero | A/B/C/F | N | N | path |
| 20 | WebGL | A/B/C/F | N | N | path |
| 21 | Guidelines | A/B/C/F | N | N | path |
| 22 | Memory | A/B/C/F | N | N | path |

**Overall Grade:** [weighted average]
**Total Auto-Fixed:** [N]
**Total Open Issues:** [N]
```

## Modifiers

| Command | Behaviour |
|---|---|
| `audit` | Run all 22 sub-triggers |
| `audit tokens, css, a11y` | Run only listed sub-triggers (comma-separated) |
| `audit then changelog` | Run all audits, then update changelog |

## Rules

1. Each audit writes its own report to `/reports/YYYY-MM/`.
2. Each audit creates or updates tasks in `/tasks/task-list.md` if issues remain.
3. Auto-fix violations where safe. Document unfixable issues.
4. If session capacity is reached mid-sequence, note which audits remain and prompt the user to type `continue`.
5. All fixes must use CSS variables from `theme-base.css` / `theme-light.css` / `theme-dark.css`.
6. Only the 5 approved fonts: Lora, Noto Sans, Caveat, Shadows Into Light, Courier New.
7. Icons from `@phosphor-icons/react` — flag any `lucide-react` imports as migration targets.

## Guideline References (Read-Only — do NOT modify these during audit)

- `/guidelines/rules/design-system-rules.md` — Styling compliance rules
- `/guidelines/rules/file-organization.md` — File placement rules
- `/guidelines/overview-components.md` — Component architecture
- `/guidelines/overview-icons.md` — Icon system
- `/guidelines/design-tokens/` — All 17 design token files
