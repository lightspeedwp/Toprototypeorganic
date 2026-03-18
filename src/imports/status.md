# Status — Project Health Dashboard

**Type:** Utility  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `status`

---

## Prompt Purpose

**Objective:** Generate a quick health check of the entire project — file counts, compliance scores, open tasks, and recent activity.

**When to Use:** At the start of a session to understand current project state, or to get a snapshot before planning new work.

---

## Workflow Steps

### Step 1: Codebase Metrics

1. Count files by type in `/src/`:
   - `.tsx` components (templates, patterns, blocks, parts, common, ui)
   - `.ts` data files
   - `.css` style files
2. Count total routes from `/src/app/routes/`
3. Count guideline files in `/guidelines/`

### Step 2: Task Status

1. Read `/tasks/task-list.md` — count open `[ ]` vs completed `[x]` tasks
2. Read `/tasks/master-task-list.md` — get dashboard summary if available
3. Identify the next 3 actionable tasks by priority

### Step 3: Compliance Quick-Check

Spot-check 5 random template files for:
- Zero `lucide-react` imports
- Zero `react-router-dom` imports
- Zero hardcoded hex values in style props
- CSS variable usage for fonts (`var(--font-primary)`)

### Step 4: Recent Activity

1. Read `/CHANGELOG.md` `[Unreleased]` section
2. Identify last 5 changes made

### Step 5: Output Summary

Present findings in this format:

```
## Project Status — [Today's Date]

### Codebase
| Metric | Count |
|--------|-------|
| Templates | [N] |
| Patterns | [N] |
| Routes | [N] |
| CSS Files | [N] |
| Data Files | [N] |
| Guidelines | [N] |

### Tasks
- Open: [N]
- Completed: [N]
- Next priority: [task name]

### Compliance
- Lucide imports: [0 ✅ / N ❌]
- Hardcoded values: [0 ✅ / N ❌]
- CSS variable fonts: [✅ / ❌]

### Recent Changes
- [change 1]
- [change 2]
- [change 3]
```

---

## Success Criteria

- [ ] All metrics gathered and reported
- [ ] Next priority task identified
- [ ] Compliance spot-check completed
- [ ] No files modified (read-only operation)
