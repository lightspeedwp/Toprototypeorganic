# Update Tasks — Sync Task List with Project State

**Type:** Maintenance  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `update tasks`  
**Repeatable:** Yes — run after completing work or at session start  
**Estimated Duration:** 1 session (10-15 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/rules/workflow.md` — Task/report workflow

---

## Purpose

Sync `/tasks/task-list.md` and all active task files with the current project state. Mark completed work, remove stale entries, consolidate fragmented tasks, and ensure the task list is the single source of truth for outstanding work.

---

## Steps

### Step 1: Audit task-list.md

1. Read `/tasks/task-list.md`
2. For each `[ ]` (open) item:
   - Verify the work hasn't already been completed by checking the codebase
   - If complete → mark `[x]` with today's date
   - If no longer relevant (feature removed, approach changed) → remove with note
3. For each `[x]` (done) item:
   - Verify it's truly complete
4. Remove duplicates
5. Update `Last Updated` date

### Step 2: Audit Task Files

1. List all `.md` files in `/tasks/` (not archive, not task-list.md)
2. For each file:
   - Count `[ ]` vs `[x]` items
   - If all done → flag for archival (don't archive here — `archive tasks` does that)
   - If has open items → verify they're also in `task-list.md`

### Step 3: Add Missing Tasks

1. Check recent reports for untracked issues → add to `task-list.md`
2. Check recent changelog entries for follow-up work → add if needed
3. Ensure every open item has clear acceptance criteria

### Step 4: Summary

```
## Update Tasks Session — [Today's Date]

| Action | Count |
|--------|-------|
| Tasks marked complete | [N] |
| Stale tasks removed | [N] |
| New tasks added | [N] |
| Duplicates removed | [N] |
| Task files ready for archival | [N] |

Open tasks remaining: [N]
```

---

## Success Criteria

- [ ] `task-list.md` reflects actual project state
- [ ] No duplicate entries
- [ ] No completed work listed as open
- [ ] All active task file items also tracked in `task-list.md`
