# Update Reports — Re-evaluate Active Report Status

**Type:** Maintenance  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `update reports`  
**Repeatable:** Yes — run after resolving issues from audit reports  
**Estimated Duration:** 1 session (10-20 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/rules/workflow.md` — Task/report workflow
- `/guidelines/prompts/report-naming.md` — Naming conventions

---

## Purpose

Re-evaluate all active reports (in `/reports/`, not in `/reports/archive/`) against the current codebase. Mark resolved issues as fixed, update grades/scores, and flag reports that are now fully resolved for archival by `archive reports`.

---

## Steps

### Step 1: Inventory Active Reports

1. List all `.md` files in `/reports/` (not `/reports/archive/`)
2. For each report, note: title, date, scope, open issue count

### Step 2: Re-evaluate Each Report

For each active report:

1. Read the report — identify all open issues (`[ ]` checkboxes, "Open Issues" sections)
2. For each open issue, verify against current codebase:
   - Does the referenced file still exist?
   - Has the issue been fixed since the report was written?
   - Is the issue still valid?
3. Mark resolved issues as `[x]` with a note: `[x] ~~issue~~ (resolved [date])`
4. Remove issues that are no longer applicable (file deleted, feature removed)
5. Update any grades or scores to reflect current state

### Step 3: Flag Fully Resolved Reports

Reports where ALL issues are now resolved → add a header note:
```markdown
> **Status: FULLY RESOLVED** — Ready for archival via `archive reports`
```

### Step 4: Summary

```
## Update Reports Session — [Today's Date]

| Report | Open Before | Resolved | Open After | Status |
|--------|------------|----------|------------|--------|
| name.md | [N] | [N] | [N] | Active / Fully Resolved |

Total: [N] reports updated, [N] issues resolved, [N] reports ready for archival
```

---

## Success Criteria

- [ ] All active reports re-evaluated against current codebase
- [ ] Resolved issues marked with completion date
- [ ] Fully resolved reports flagged for archival
- [ ] No stale issue counts
