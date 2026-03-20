# Update — Run All Update Sub-Triggers

**Type:** Orchestrator  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `update`  
**Repeatable:** Yes — run after major codebase changes  
**Estimated Duration:** 1 session (30-60 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Trigger words table
- `/guidelines/rules/file-organization.md` — File placement rules
- `/guidelines/rules/workflow.md` — Task/report workflow

---

## Purpose

Master orchestrator that runs ALL update sub-triggers sequentially. Each sub-trigger syncs a specific domain of the project with the current codebase state.

---

## Execution Order

Run each sub-trigger IN ORDER. Complete one fully before starting the next.

### 1. `update data`

Read and execute `/prompts/update-data.md`

- Audits codebase for hardcoded content in templates/pages
- Migrates all content to data files in `/src/app/data/`
- Ensures all components dynamically reference data files

### 2. `update routes`

Read and execute `/prompts/update-routes.md`

- Syncs `/src/app/routes.ts` with all page files
- Adds missing routes, removes dead routes
- Updates navigation data files to match routes

### 3. `update sitemap`

Read and execute `/prompts/update-sitemap.md`

- Syncs the sitemap page with current routes
- Updates page metadata (titles, descriptions)

### 4. `update guidelines`

Read and execute `/prompts/update-guidelines.md`

- Syncs guideline files with current codebase state
- Updates component guidelines, pattern guidelines, block guidelines

### 5. `update prompts`

Read and execute `/prompts/update-prompts.md`

- Updates prompt file frontmatter and references
- Ensures prompts reference current files and patterns

### 6. `update reports`

Read and execute `/prompts/update-reports.md`

- Updates active report status based on current codebase
- Re-evaluates open issues in active reports

### 7. `update tasks`

Read and execute `/prompts/update-tasks.md`

- Syncs `task-list.md` with current project state
- Marks completed tasks, removes stale entries

### 8. `update status`

Read and execute `/prompts/update-status.md`

- Generates fresh project health snapshot
- Updates all counters and metrics

### 9. `update triggers`

Read and execute `/prompts/update-triggers.md`

- Final sync of trigger word tables
- Verifies all three sources of truth agree

---

## Combined Summary

After all sub-triggers complete:

```
## Full Update Session — [Today's Date]

### Data
- Hardcoded values migrated: [N] | Data files created/updated: [N]

### Routes
- Routes added: [N] | Routes removed: [N] | Nav data updated: [Y/N]

### Sitemap
- Pages synced: [N] | Metadata updated: [N]

### Guidelines
- Files updated: [N] | Outdated references fixed: [N]

### Prompts
- Prompts updated: [N] | References fixed: [N]

### Reports
- Reports re-evaluated: [N] | Issues resolved: [N]

### Tasks
- Tasks marked complete: [N] | Stale removed: [N]

### Status
- Health snapshot generated: [Y/N]

### Triggers
- Total trigger words: [N] | Sync issues fixed: [N]

### Issues Requiring Review
- [list or "None"]
```

---

## Rules

1. **Run sub-triggers in order** — data first (foundation), triggers last (verification)
2. **Never skip `update triggers`** — always run last to verify sync
3. **This orchestrator does NOT make direct changes** — it delegates to sub-triggers
