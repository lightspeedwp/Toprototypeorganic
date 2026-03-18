# Status — Project Health Dashboard

**Type:** Utility  
**Version:** 2.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `status`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Generate a quick health check of the entire project — file counts, compliance scores, open tasks, and recent activity. This is a **read-only operation** — no files are modified.

**When to Use:** At the start of a session to understand current state, or to get a snapshot before planning new work.

---

## Workflow Steps

### Step 1: Codebase Metrics

Count files by type in `/src/`:
- `.tsx` pages in `/src/app/pages/`
- `.tsx` components (patterns, blocks, parts, common, ui) in `/src/app/components/`
- `.ts` data files in `/src/app/data/`
- `.css` style files in `/src/styles/`
- Total routes from `/src/app/routes.ts`
- Guideline files in `/guidelines/`
- Prompt files in `/prompts/`

### Step 2: Data Inventory

Count records in key data files:
- Tours, Destinations, Accommodations, Specials
- Reviews, Team Members, Blog Posts
- FAQs (total and by category)

### Step 3: Task Status

1. Read `/tasks/task-list.md` — count open `[ ]` vs completed `[x]` tasks.
2. Check for other task files in `/tasks/`.
3. Identify the next 3 actionable tasks by priority.

### Step 4: Compliance Quick-Check

Spot-check 5 random page/component files for:
- Zero `@phosphor-icons/react` imports (should be `lucide-react`)
- Zero `react-router-dom` imports (should be `react-router`)
- Zero hardcoded hex values in JSX or inline styles
- CSS variable usage for fonts (approved 5 font variables only)
- Zero `dark:` Tailwind classes
- Zero margin utilities for layout (Zero Margin Policy)

### Step 5: Recent Activity

1. Read `/CHANGELOG.md` `[Unreleased]` section.
2. Identify last 5 changes made.

### Step 6: Output Summary

```
## Project Status — [Today's Date]

### Codebase
| Metric | Count |
|--------|-------|
| Pages | [N] |
| Components | [N] |
| Routes | [N] |
| CSS Files | [N] |
| Data Files | [N] |
| Guidelines | [N] |
| Prompts | [N] |

### Content Data
| Type | Count |
|------|-------|
| Tours | [N] |
| Destinations | [N] |
| Accommodations | [N] |
| Reviews | [N] |
| Team Members | [N] |
| Blog Posts | [N] |
| FAQs | [N] |

### Tasks
- Open: [N]
- Completed: [N]
- Next priority: [task name]

### Compliance (5-file spot check)
- Phosphor imports: [0 = PASS / N = FAIL]
- react-router-dom: [0 = PASS / N = FAIL]
- Hardcoded hex: [0 = PASS / N = FAIL]
- Approved fonts: [PASS / FAIL]
- dark: classes: [0 = PASS / N = FAIL]
- Margin utilities: [0 = PASS / N = FAIL]

### Recent Changes
- [change 1]
- [change 2]
- [change 3]
```

---

## Success Criteria

- [ ] All metrics gathered and reported
- [ ] Data inventory completed
- [ ] Next priority task identified
- [ ] Compliance spot-check completed
- [ ] **No files modified** (read-only operation)
