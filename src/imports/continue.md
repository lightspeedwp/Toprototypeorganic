# Continue — Resume Next Task

**Type:** Utility Prompt (Reusable)
**Version:** 2.0
**Created:** March 13, 2026
**Status:** Production
**Trigger:** User types `continue` (see `/guidelines/prompt-triggers.md`)
**Repeatable:** Yes — paste into any new session to resume work
**Companion:** Can run standalone OR after `/prompts/cleanup.md`

---

## Instructions

Pick up the next logical task and execute it. This prompt can be used:
- **Standalone** — just type `continue` to resume work
- **After cleanup** — cleanup runs first, then this kicks in automatically

**Environment Reminder:** You are working inside **Figma Make**. Do NOT tell the user to refresh their browser, clear cache, restart dev servers, or run terminal commands — none of that applies here. All work is done via the file editing tools available in this environment.

---

## Step 1 — Read Context

1. Read `/guidelines/Guidelines.md` — project rules and design system
2. Read `/tasks/task-list.md` — find open tasks (`[ ]`)
3. If no open tasks there, read `/tasks/master-task-list.md` — find next incomplete workflow

---

## Step 2 — Pick Next Task

Select the **first unchecked task** using this priority order:

1. **Build blockers** — anything breaking the build or deployment
2. **In-progress work** — tasks with partial completion noted
3. **High Priority items** — under "High Priority" headings
4. **Next sequential step** — next item in current workflow/pillar
5. **Strategy tasks** — `/tasks/strategy-evolution/` phases

If the task references a specific prompt or guideline, **read it first** before starting.

---

## Step 3 — Execute

1. **Announce:** "Executing: [task name] from [source file]"
2. **Do the work** — follow the task description completely
3. **Design system compliance (non-negotiable):**
   - ALL styling via CSS variables (`var(--spacing-*)`, `var(--primary)`, `var(--radius)`, etc.)
   - Typography: ONLY `var(--font-primary)` and `var(--font-secondary)` font faces from `/src/styles/fonts.css`
   - Font sizes: `var(--text-h1)` through `var(--text-h6)` for headings, `var(--text-xs)` through `var(--text-xl)` for body
   - Colors: semantic CSS variables only — zero hardcoded hex values
   - Spacing: `var(--spacing-*)` tokens only — zero hardcoded `px` or `rem`
   - Border radius: `var(--radius)`, `var(--radius-lg)`, etc.
   - Icons: `@phosphor-icons/react` only — zero `lucide-react`
   - Router: `react-router` only — never `react-router-dom`
   - WordPress classes: `.wp-*` prefix where applicable
   - NEVER delete service template files
4. **On completion:**
   - Mark the task `[x]` in its source file with today's date and a brief note
   - Add a concise CHANGELOG entry under `[Unreleased]` if notable
   - Add any follow-up tasks to `/tasks/task-list.md`

---

## Step 4 — Loop or Stop

- **Session has capacity?** → Go back to Step 2, pick next task
- **Session getting long or next task is unrelated?** → Stop and provide summary:

```
## Session Summary — [Today's Date]

### Completed
- [task name] — [brief result]

### Updated Files
- [list of key files modified]

### Next Up
- [what the next open task would be]
```

---

## Rules

- **One task at a time** — finish before starting the next
- **Fix, don't just report** — if you find an issue, fix it inline
- **No files in root** — only config files + `README.md` + `CHANGELOG.md` + `ATTRIBUTIONS.md`
- **No hardcoded values** — 100% CSS variable compliance
- **No new fonts/colors/tokens** — use only what's defined in the CSS
- **Figma Make environment** — never suggest browser refresh, cache clear, or terminal commands
- **Protected files** — see `/guidelines/housekeeping.md` for the full list

---

**Prompt Location:** `/prompts/continue.md`
**Category:** Utilities
**Difficulty:** Easy
**Repeatable:** Yes
