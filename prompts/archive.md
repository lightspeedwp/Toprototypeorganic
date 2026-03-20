# Archive — Run All Archive Sub-Triggers

**Type:** Orchestrator  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `archive`  
**Repeatable:** Yes — run periodically to keep the project lean  
**Estimated Duration:** 1 session (30-60 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Trigger words table
- `/guidelines/rules/file-organization.md` — File placement rules

---

## Purpose

Master orchestrator that runs ALL archive sub-triggers sequentially, then verifies the trigger word system is still in sync.

---

## Execution Order

Run each sub-trigger IN ORDER. Complete one fully before starting the next.

### 1. `archive prompts`

Read and execute `/prompts/archive-prompts.md`

- Reviews all non-trigger prompt files in `/prompts/`
- Classifies as General (repurpose) or Specific (archive)
- Repurposes general prompts into trigger word system
- Archives specific/completed prompts to `/prompts/archive/`

### 2. `archive reports`

Read and execute `/prompts/archive-reports.md`

- Reviews all report files in `/reports/`
- Promotes reusable methodology to `/docs/` or `/guidelines/`
- Archives resolved/superseded reports to `/reports/archive/`
- Keeps active reports with open issues

### 3. `archive tasks`

Read and execute `/prompts/archive-tasks.md`

- Reviews all task files in `/tasks/` (except `task-list.md`)
- Extracts reusable workflows into prompt files
- Archives completed task files to `/tasks/archive/`
- Consolidates active tasks into `task-list.md`

### 4. `archive guidelines`

Read and execute `/prompts/archive-guidelines.md`

- Reviews all guideline files in `/guidelines/`
- Merges duplicates into canonical files
- Updates outdated guidelines with minor drift
- Archives truly superseded guidelines to `/guidelines/archive/`
- Fixes orphaned guideline references

### 5. Post-Archive: `update triggers`

Read and execute `/prompts/update-triggers.md`

- Syncs trigger word tables after any new triggers were added during archive
- Verifies no orphaned entries or missing prompts

---

## Combined Summary

After all sub-triggers complete, generate a single combined summary:

```
## Full Archive Session — [Today's Date]

### Prompts
- Reviewed: [N] | Repurposed: [N] | Archived: [N] | Flagged: [N]

### Reports
- Reviewed: [N] | Promoted: [N] | Archived: [N] | Active: [N]

### Tasks
- Reviewed: [N] | Extracted: [N] | Archived: [N] | Active: [N]

### Guidelines
- Reviewed: [N] | Merged: [N] | Updated: [N] | Archived: [N]

### Trigger Words
- Total trigger words: [N] | New triggers added: [N]

### Issues Requiring Review
- [list or "None"]
```

---

## Rules

1. **Run sub-triggers in order** — each builds on the previous
2. **Never skip `update triggers`** — always run after archiving to verify sync
3. **This orchestrator does NOT make direct changes** — it delegates to sub-triggers
4. **If a sub-trigger flags items for user review**, list them in the combined summary
