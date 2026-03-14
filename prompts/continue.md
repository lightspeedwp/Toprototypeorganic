# Continue Prompt

**Version:** 2.0.0
**Date:** March 13, 2026
**Type:** Resume next logical task
**Trigger:** User says **"continue"** (see `/guidelines/Guidelines.md` trigger words)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately. Use only the tools available: `read`, `write_tool`, `fast_apply_tool`, `edit_tool`, `delete_tool`, `file_search`, and `bash` (node_modules only).

---

## Instructions

1. Read `/tasks/task-list.md`
2. Find the **first unchecked task** (`- [ ]`)
3. If that task references a prompt file → read the prompt file too
4. If that task references a report or task file → read those for context
5. **Execute the task** — write code, run audits, create reports as needed
6. When done:
   - Mark the task `[x]` in `task-list.md`
   - Add results/findings under the task entry
   - Update the `**Status:**` line at the top
   - Update `**Last Updated:**` date
   - Add a CHANGELOG entry if meaningful work was done
7. **Stop** after completing the task. Do not continue to the next task unless the user says "continue" again.

---

## Design System Compliance

**All UI code generated during task execution MUST follow these rules:**

- Use CSS variables from `/src/styles/theme-base.css`, `theme-light.css`, `theme-dark.css`
- Use ONLY the 5 approved fonts: Lora, Noto Sans, Courier New, Caveat, Shadows Into Light
- Use BEM class naming: `.wp-pattern-*`, `.wp-part-*`, `.wp-block-*`
- Create external CSS files for styling — no inline `style={{}}` attributes
- No `dark:` Tailwind classes — CSS variables handle dark mode automatically
- No hardcoded colors, fonts, spacing, borders, radius, or shadows
- Follow Zero Margin Policy: use flex/grid gaps and padding, not margins

---

## If No Unchecked Tasks Exist

If `task-list.md` has no unchecked tasks:

1. Tell the user: "All tasks in task-list.md are complete."
2. Suggest running **"cleanup"** to verify project health
3. Ask the user what they'd like to work on next

---

## If the Task Is Too Large for One Session

If the task would take more than ~30 minutes:

1. Complete as much as reasonably possible
2. Add a `**Progress:**` note under the task in `task-list.md` with what was completed
3. Leave the task unchecked `[ ]` so the next "continue" picks it up
4. Tell the user what was done and what remains
