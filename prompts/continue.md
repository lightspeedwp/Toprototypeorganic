# Continue — Resume Next Task

**Type:** Utility  
**Version:** 4.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `continue`  
**Repeatable:** Yes — paste into any new session to resume work

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Project entry point, trigger words, architecture overview
- `/guidelines/rules/design-system-rules.md` — Styling compliance
- `/guidelines/overview-components.md` — Component architecture
- `/guidelines/overview-icons.md` — Icon system

---

## Design System Compliance (Non-Negotiable)

All generated/modified UI must follow:
- **Typography:** ONLY 5 approved font variables:
  - `var(--font-family-lora)` — Headings, editorial
  - `var(--font-family-noto-sans)` — Body, UI
  - `var(--font-family-caveat)` — Accent (sparingly)
  - `var(--font-family-shadows)` — Decorative (very sparingly)
  - `var(--font-family-mono)` — Code, technical
- **Font sizes:** `var(--text-6xl)` through `var(--text-2xs)` fluid scale
- **Colors:** Semantic CSS variables only — zero hardcoded hex values
- **Spacing:** `var(--spacing-*)` tokens only — zero hardcoded `px` or `rem`
- **Border radius:** `var(--radius-*)` tokens
- **Icons:** `@phosphor-icons/react` (default) — `lucide-react` is legacy, being phased out
- **Router:** `react-router` only — never `react-router-dom`
- **Classes:** BEM naming + `.wp-*` utilities — zero Tailwind classes
- **Layout:** Zero Margin Policy — flex/grid gaps only
- NEVER delete protected files

---

## Step 1 — Read Context

1. Read `/guidelines/Guidelines.md` — project rules and design system
2. Read `/tasks/task-list.md` — find open tasks (`[ ]`)
3. If no open tasks there, check for other task files in `/tasks/`

---

## Step 2 — Pick Next Task

Select the **first unchecked task** using this priority order:

1. **Build blockers** — anything breaking the build or deployment
2. **In-progress work** — tasks with partial completion noted
3. **High Priority items** — under "High Priority" headings
4. **Next sequential step** — next item in current workflow
5. **Strategy tasks** — phased improvement work

If the task references a specific guideline, **read it first** before starting. Relevant guideline files:
- Component tasks → `/guidelines/components/[ComponentName].md`
- Pattern tasks → `/guidelines/patterns/[pattern-name].md`
- Icon tasks → `/guidelines/icons/travel.md` or `/guidelines/icons/interface.md`
- Design token tasks → `/guidelines/design-tokens/[token-name].md`

---

## Step 3 — Execute

1. **Announce:** "Executing: [task name] from [source file]"
2. **Do the work** — follow the task description completely
3. **On completion:**
   - Mark the task `[x]` in its source file with today's date and a brief note
   - Add a concise CHANGELOG entry under `[Unreleased]` if notable
   - Add any follow-up tasks to `/tasks/task-list.md`

---

## Step 4 — Loop or Stop

- **Session has capacity?** -> Go back to Step 2, pick next task
- **Session getting long or next task is unrelated?** -> Stop and provide summary:

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
- **No hardcoded values** — 100% CSS variable compliance
- **No new fonts/colors/tokens** — use only what's defined in the CSS
- **Figma Make environment** — never suggest browser refresh, cache clear, or terminal commands
