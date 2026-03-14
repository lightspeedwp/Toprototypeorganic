# Report & Task File Naming Conventions

**Version:** 1.0.0
**Date:** March 13, 2026

---

## Report Files (`/reports/`)

### Naming Format
```
/reports/YYYY-MM-DD-[descriptive-name].md
```

### Examples
```
/reports/2026-03-13-design-system-contract-audit-rerun.md
/reports/2026-03-13-organic-redesign-audit.md
/reports/2026-03-11-tailwind-audit-comprehensive.md
```

### Rules
1. **Always date-prefix** with ISO format `YYYY-MM-DD`
2. **Use kebab-case** for the descriptive name
3. **Be specific** — include the audit/task type in the name
4. **Append qualifier** if re-running: `-rerun`, `-v2`, `-phase-2`
5. **Never overwrite** — create new dated file instead
6. **Archive** reports older than 30 days to `/reports/archive/`

### Report Structure
```markdown
# [Audit Name] Report

**Date:** [YYYY-MM-DD]
**Auditor:** AI Assistant
**Scope:** [What was audited]

## Executive Summary
- Total files audited: X
- Total violations found: X
- Critical: X | High: X | Medium: X | Low: X

## Findings
[Organized by contract/category]

## Recommended Actions
[Prioritized fix list]
```

---

## Task Files (`/tasks/`)

### Master Task List
```
/tasks/task-list.md    ← NEVER DELETE. Update in place.
```

### Individual Task Files
```
/tasks/[descriptive-name]-tasks.md
```

### Examples
```
/tasks/design-system-contract-tasks.md
/tasks/css-compliance-fixes.md
/tasks/header-navigation-dark-mode-fix.md
```

### Rules
1. **Always suffix** with `-tasks.md`
2. **Use kebab-case** for the descriptive name
3. **Reference from master** — add a link in `task-list.md`
4. **Delete when complete** — once ALL items are `[x]`, delete the file during cleanup
5. **Archive if partial** — if >30 days old with remaining items, move to `/tasks/archive/`

### Task File Structure
```markdown
# [Task Name] — Task List

**Generated:** [YYYY-MM-DD]
**Source:** [Link to audit report that generated these tasks]

## Phase 1: [Category]
- [ ] File: [path] — [Description of fix]
- [ ] File: [path] — [Description of fix]

## Phase 2: [Category]
- [ ] ...
```

---

## Cleanup Rules

### During `/prompts/cleanup.md` execution:

| Folder | Action | Condition |
|--------|--------|-----------|
| `/reports/` | Archive to `/reports/archive/` | Older than 30 days (by filename date) |
| `/reports/` | Keep in place | Less than 30 days old |
| `/tasks/` | Delete | All items checked `[x]` |
| `/tasks/` | Keep | Has unchecked items `[ ]` |
| `/tasks/` | Archive to `/tasks/archive/` | Partial completion, >30 days old |
| `/tasks/task-list.md` | Update in place | NEVER delete |
| `/prompts/` | Keep (never delete) | Prompts are reusable |

---

## Protected from Deletion

These files must NEVER be deleted during any cleanup operation:

### System Files
- `/pnpm-lock.yaml`
- `/src/app/components/figma/ImageWithFallback.tsx`

### Project Core
- `/tasks/task-list.md` (update only)
- `/guidelines/Guidelines.md` (update tree section only)
- `/CHANGELOG.md` (append only)
- `/src/app/App.tsx`
- `/src/app/routes.ts`
- `/src/styles/index.css`

### Design System
- `/src/styles/theme.css`
- `/src/styles/theme-base.css`
- `/src/styles/theme-light.css`
- `/src/styles/theme-dark.css`
- `/src/styles/theme-variables.css`
- `/src/styles/global.css`
- `/src/styles/tailwind.css`

### Data Layer
- All files in `/src/app/data/` (never delete without explicit user request)
