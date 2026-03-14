# Guidelines Templates Reference

**Purpose:** This file documents the template system for creating consistent, high-quality guideline files, reports, prompts, and task lists.

**Location:** `/guidelines/_templates/`

---

## Available Templates

| Template | File | Use When |
|----------|------|----------|
| **Design Tokens** | `design-token.md` | Documenting a CSS variable category (colors, spacing, typography, etc.) |
| **Component** | `component.md` | Documenting a React component (props, usage, WordPress mapping) |
| **Pattern** | `pattern.md` | Documenting a block pattern (composition, variants, section styles) |
| **General Guideline** | `general.md` | Any guideline that doesn't fit the above (architecture, rules, workflow) |
| **Report** | `report.md` | Audit findings, compliance checks, analysis results |
| **Prompt** | `prompt.md` | Reusable AI prompts for audits, generation, or refactoring |
| **Task List** | `task-list.md` | Checklists for tracking work items |

---

## How to Use

1. **Copy the template** — Duplicate the relevant template file
2. **Fill in all sections** — Every section marked `[REQUIRED]` must be completed
3. **Remove unused optional sections** — Delete any `[OPTIONAL]` section not needed
4. **Follow naming conventions** — See `/guidelines/prompts/report-naming.md`
5. **Save to correct folder** — See file placement rules below

## File Placement

| Content Type | Destination |
|-------------|-------------|
| Design token guideline | `/guidelines/design-tokens/` |
| Component guideline | `/guidelines/components/` |
| Pattern guideline | `/guidelines/patterns/` |
| General guideline | `/guidelines/` or appropriate subfolder |
| Report | `/reports/` |
| Prompt | `/prompts/` |
| Task list | `/tasks/` |

## Template Rules

1. Every guideline file MUST have a `## Source of Truth` section linking to the CSS file(s) it documents
2. Every guideline file MUST have a `## Quick Reference` section with a table of token names and values
3. Every design token file MUST include `## Do / Don't` examples
4. Every component file MUST include a WordPress mapping section
5. Reports MUST include an Executive Summary with metrics
6. Prompts MUST include scope, acceptance criteria, and environment reminders
