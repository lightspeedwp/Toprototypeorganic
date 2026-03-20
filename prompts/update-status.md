# Update Status — Generate Project Health Snapshot

**Type:** Maintenance  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `update status`  
**Repeatable:** Yes — run at any time for a fresh snapshot  
**Estimated Duration:** 1 session (10-15 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Project structure

---

## Purpose

Generate a fresh project health dashboard by counting and evaluating all project assets. Unlike `status` (read-only snapshot), this prompt also **updates status-related files** (e.g., README badge counts, dev-tools status page data).

---

## Steps

### Step 1: Codebase Inventory

Count:
- Pages in `/src/app/pages/` (total, by archetype)
- Components in `/src/app/components/` (by category: blocks, patterns, parts, common, ui)
- Data files in `/src/app/data/` (total, records per type)
- CSS files in `/src/styles/` (total)
- Routes in `/src/app/routes.ts` (total, by type)

### Step 2: Content Inventory

Count records in data files:
- Tours, Destinations, Accommodations, Specials
- Team members, Reviews, Blog posts
- Navigation items, FAQ entries

### Step 3: Project Management Inventory

Count:
- Active trigger words (prompt files with trigger words)
- Guideline files (total, by category)
- Active reports (open issues count)
- Active tasks (open items count)
- Archived items (prompts, reports, tasks, guidelines)

### Step 4: Health Metrics

Evaluate:
- Lucide-react remaining files (migration progress)
- Orphaned files (CSS, data, components)
- Broken imports (count)
- Routes without pages / pages without routes

### Step 5: Update Status Artifacts

1. Update any status-related dev-tools page data
2. Update README.md project metrics if present
3. Generate the dashboard output

### Step 6: Dashboard Output

```
## Project Health — [Today's Date]

### Codebase
| Category | Count |
|----------|-------|
| Pages | [N] |
| Components | [N] |
| Data files | [N] |
| CSS files | [N] |
| Routes | [N] |

### Content Records
| Type | Records |
|------|---------|
| Tours | [N] |
| Destinations | [N] |
| Accommodations | [N] |
| ... | ... |

### Project Management
| Category | Count |
|----------|-------|
| Trigger words | [N] |
| Guidelines | [N] |
| Active reports | [N] (open issues: [N]) |
| Active tasks | [N] (open items: [N]) |

### Health
| Metric | Status |
|--------|--------|
| Broken imports | [N] |
| Orphaned files | [N] |
| Lucide migration | [N]% complete |
| Route coverage | [N]% |
```

---

## Success Criteria

- [ ] All counts are accurate against current codebase
- [ ] Status artifacts updated
- [ ] Health metrics calculated
