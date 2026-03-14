# [Prompt Title]

**Version:** [N.N]
**Category:** [Audit | Generation | Refactor | Cleanup]
**Estimated Time:** [N minutes/hours]
**Prerequisites:** [List any files to read first]

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. All file changes are live immediately. Use only the available tools. NEVER suggest terminal commands, browser refresh, cache clearing, or npm install.

---

## Objective

[1-2 sentences stating the goal clearly.]

---

## Scope

**In Scope:**
- [File pattern or directory]
- [Specific checks]

**Out of Scope:**
- [What to skip]

---

## Instructions

### Phase 1: [Phase Name]

1. [Step 1]
2. [Step 2]
3. [Step 3]

### Phase 2: [Phase Name]

1. [Step 1]
2. [Step 2]

---

## Acceptance Criteria

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

---

## Output

**Report:** Save to `/reports/[YYYY-MM-DD]-[name]-report.md`
**Tasks:** Save to `/tasks/[name]-tasks.md`
**Update:** Add to `/tasks/task-list.md` master checklist

---

## Design System Compliance

All generated code MUST:
- Use CSS variables from `/src/styles/theme-base.css` and `/src/styles/theme-light.css`
- Use ONLY approved fonts: Lora, Noto Sans, Courier New, Caveat, Shadows Into Light
- Use external CSS with BEM naming
- Use NO inline styles (except motion/dynamic CSS prop exemptions)
- Use NO `dark:` Tailwind classes
- Use NO hardcoded colors, fonts, or spacing values

---

## Related Guidelines

| Guideline | Why It Matters |
|-----------|---------------|
| `/guidelines/Guidelines.md` | Master entry point |
| `/guidelines/design-tokens/[relevant].md` | Token reference |
