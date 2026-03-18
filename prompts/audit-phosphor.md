# Audit Phosphor — Icon System Compliance

**Type:** Audit  
**Version:** 2.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `audit phosphor`  
**Repeatable:** Yes — run after each migration batch and after package updates  
**Followed by:** Type `migrate phosphor` to execute migration batches based on findings.

---

## Guideline References (Read-Only)

- `/guidelines/rules/design-system-rules.md` — Styling compliance
- `/guidelines/overview-icons.md` — Icon system
- `/guidelines/icons/travel.md` — Travel icon names
- `/guidelines/icons/interface.md` — Interface icon names
- `/guidelines/design-tokens/iconography.md` — Icon sizing and weight tokens

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Design System Rules

- **Icons:** `@phosphor-icons/react` is the ONLY approved icon library
- **Legacy:** `lucide-react` imports are migration targets — must be replaced
- Both packages coexist during migration; goal is 100% Phosphor, 0% Lucide
- Phosphor `weight` prop options: `"thin" | "light" | "regular" | "bold" | "fill" | "duotone"`
- Default weight for UI icons: `"regular"`; for decorative/branded: `"duotone"` or `"fill"`

---

## Purpose

This prompt performs THREE audits in one pass:

1. **Legacy Detection:** Find all remaining `lucide-react` imports for migration
2. **Import Integrity:** Verify all `@phosphor-icons/react` imports reference icons that actually exist in the installed package version
3. **Naming Freshness:** Catch icons that have been renamed or deprecated across Phosphor package updates

This catches the common scenario where a Phosphor package update renames icons (e.g., `FadersHorizontal` → `Sliders`), causing silent import failures.

---

## Audit Steps

### Step 1: Package Version Check

1. Read `/package.json` — record installed versions:
   - `@phosphor-icons/react`: [version]
   - `lucide-react`: [version] (if still present)

2. Verify `@phosphor-icons/react` is installed and importable:
   ```bash
   grep "version" node_modules/@phosphor-icons/react/package.json
   ```

### Step 2: Find ALL Legacy lucide-react Imports

Search for every file still importing from `lucide-react`:
```
file_search: content_pattern="from ['\""]lucide-react['\""]"
```

For each file found, record:
| File | Icons Imported | Phosphor Equivalent | Status |
|------|---------------|---------------------|--------|
| path | `IconName` | `PhosphorName` | Pending/Blocked |

**Classify each file:**
- **Simple:** Direct 1:1 name match exists in Phosphor
- **Medium:** Name differs, needs mapping (e.g., `ChevronRight` → `CaretRight`)
- **Complex:** Wildcard import, dynamic icon resolution, or shadcn/ui dependency
- **Blocked:** shadcn/ui internal dependency that can't be changed without breaking

### Step 3: Verify ALL Phosphor Icon Imports Are Valid

For every file importing from `@phosphor-icons/react`:

1. Extract all imported icon names
2. Verify each icon exists in the installed package:
   ```bash
   grep "export.*IconName" node_modules/@phosphor-icons/react/dist/index.es.js
   ```

3. Flag any imports that DON'T match an export — these are **broken imports** (P0 fix)

**Common failure patterns:**
- Icon was renamed in a package update
- Icon name is misspelled
- Icon was removed from the library
- Using a Lucide name instead of Phosphor name (e.g., `Menu` instead of `List`)

### Step 4: Check for Deprecated / Renamed Icons

Some Phosphor icons get renamed across major versions. Check for these known renames:

| Old Name | New Name | Version Changed |
|----------|----------|----------------|
| `CircleWavyCheck` | `SealCheck` | v2.0 |
| `CircleWavyWarning` | `SealWarning` | v2.0 |
| `Broadcast` | `Broadcast` | (still valid) |

Verify by grepping the actual export list:
```bash
grep "export" node_modules/@phosphor-icons/react/dist/index.es.js | wc -l
```

### Step 5: Check Import Patterns

Flag problematic import patterns:

1. **Wildcard imports** (`import * as PhosphorIcons from "@phosphor-icons/react"`)
   - These pull in the entire icon library — performance concern
   - List all files using this pattern
   - Recommend switching to named imports where possible

2. **Dynamic icon resolution** (`const Icon = PhosphorIcons[name]`)
   - These are fragile and break silently if icon names change
   - Document where they're used and what icon names they resolve

3. **Aliased imports** (`import { CaretRight as ChevronRight }`)
   - These are migration artifacts — flag for cleanup to native Phosphor names

4. **Mixed imports** (both `@phosphor-icons/react` AND `lucide-react` in same file)
   - These are mid-migration files — prioritise for completion

### Step 6: Check Weight & Size Consistency

Scan for Phosphor icon usage patterns:
- Are `weight` props used consistently? (UI = `"regular"`, decorative = `"duotone"`)
- Are `size` props consistent with design tokens?
- Any icons using `strokeWidth` (a Lucide prop that doesn't exist in Phosphor)?

### Step 7: shadcn/ui Component Scan

Check `/src/app/components/blocks/ui/` for icon dependencies:
- Which shadcn/ui components import icons?
- Do they import from `lucide-react` internally?
- Can they accept Phosphor icons as children/props?

### Step 8: Generate Migration Batches

Organise remaining `lucide-react` files into migration batches:

**Batch 1 — Quick Wins:** ≤ 3 icons, direct 1:1 mapping, no dynamic usage  
**Batch 2 — Standard:** 4-10 icons, straightforward mapping  
**Batch 3 — Complex:** Dynamic resolution, wildcard imports, prop passing  
**Batch 4 — shadcn/ui:** UI primitives, may need wrapper functions

### Step 9: Generate Report

Save to `/reports/YYYY-MM/YYYY-MM-DD-phosphor-audit.md`:

```markdown
# Phosphor Icon System Audit

**Date:** [Today]
**Package Version:** @phosphor-icons/react@[version]

## Migration Progress
- Total files with icon imports: [N]
- Files using @phosphor-icons/react: [N] ([%]%)
- Files using lucide-react: [N] ([%]%)
- Files with BOTH: [N]
- Broken Phosphor imports: [N] (P0!)

## Broken Imports (P0 — fix immediately)
| File | Broken Icon | Correct Name |
|------|------------|--------------|
| ... | ... | ... |

## Legacy lucide-react Imports
| File | Icons | Complexity |
|------|-------|-----------|
| ... | ... | Simple/Medium/Complex |

## Migration Batches
### Batch 1 — Quick Wins ([N] files)
[list]

### Batch 2 — Standard ([N] files)
[list]

### Batch 3 — Complex ([N] files)
[list]

### Batch 4 — shadcn/ui ([N] files)
[list]

## Problematic Patterns
- Wildcard imports: [N] files
- Dynamic resolution: [N] files
- Aliased imports (cleanup needed): [N] files

## Icon Weight Consistency
- [findings]

## Recommendations
1. [action]
```

Add tasks to `/tasks/task-list.md`.

---

## Success Criteria

- [ ] Every icon import in the codebase identified and classified
- [ ] All `@phosphor-icons/react` imports verified against installed package
- [ ] All `lucide-react` imports catalogued with Phosphor equivalents
- [ ] Broken/renamed icons flagged as P0
- [ ] Migration batches generated
- [ ] shadcn/ui dependencies documented
- [ ] Report saved and tasks created
