# Workflow & Task Management Rules

**Category:** Rules — Project Workflow
**Last Updated:** March 13, 2026
**Status:** Active

---

## Standard Workflow Pattern

**Always follow this sequence when given a task:**

```
1. CREATE PROMPT → /prompts/[task-name].md
2. RUN AUDIT → Execute based on prompt
3. SAVE REPORT → /reports/[YYYY-MM-DD]-[task-name]-report.md
4. CREATE TASKS → /tasks/[task-name]-tasks.md
5. UPDATE MASTER → Add to /tasks/task-list.md
```

---

## Task Management

- **Master Task List:** `/tasks/task-list.md` — Central checklist (never delete)
- **Individual Tasks:** `/tasks/[descriptive-name]-tasks.md`
- **Completed Tasks:** Archive to `/tasks/archive/`
- **Format:** Markdown with checkboxes `- [ ]` / `- [x]`

---

## Report Management

- **Location:** `/reports/` with date-stamped names
- **Archive:** Reports older than 7 days with all findings resolved → `/reports/archive/`
- **Format:** Use template from `/guidelines/_templates/report.md`
- **Processing:** Run `/prompts/report-processor-orchestrator.md` to synchronise reports with tasks

---

## Prompt Management

- **Location:** `/prompts/`
- **Multi-step prompts:** Subfolders with orchestrator (e.g., `/prompts/multi-phase/orchestrator.md`)
- **Keep all prompts** for reuse — never delete working prompts

---

## Folder Structure

```
/tasks/
├── task-list.md          # Master checklist (protected)
├── [name]-tasks.md       # Individual task lists
└── archive/              # Completed tasks

/prompts/
├── [name].md             # Single-file prompts
├── cleanup.md            # Trigger: "cleanup"
├── continue.md           # Trigger: "continue"
└── [multi-step]/         # Multi-step prompts
    ├── orchestrator.md
    └── phase-*.md

/reports/
├── [date]-[name].md      # Active reports
└── archive/              # Resolved/old reports
```

---

## Guideline References in Reports

Always cite specific guideline files in findings:

```markdown
**Violation:** Component uses hardcoded color `#548235`
**Guideline:** `/guidelines/design-tokens/colors.md` — Semantic Color Tokens
**Fix:** Replace with `var(--primary)` CSS variable
```

---

## Templates

Use templates from `/guidelines/_templates/` for consistency:

| Template | File |
|----------|------|
| Report | `/guidelines/_templates/report.md` |
| Task List | `/guidelines/_templates/task-list.md` |
| Prompt | `/guidelines/_templates/prompt.md` |
| Design Token Guideline | `/guidelines/_templates/design-token.md` |
| Component Guideline | `/guidelines/_templates/component.md` |
| Pattern Guideline | `/guidelines/_templates/pattern.md` |
| General Guideline | `/guidelines/_templates/general.md` |
