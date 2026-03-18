# Migrate Phosphor — Safe Icon Migration (lucide-react → @phosphor-icons/react)

**Type:** Migration  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `migrate phosphor`  
**Repeatable:** Yes — run per batch  
**Prerequisite:** Run `audit phosphor` first to generate the migration plan.

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

- **Target:** `@phosphor-icons/react` — the approved icon library
- **Legacy:** `lucide-react` — being phased out
- **Typography:** ONLY 5 approved font variables (Lora, Noto Sans, Courier New, Caveat, Shadows Into Light)
- **Colors:** CSS variables only — no hardcoded values
- **Styling:** All via CSS variables from theme files
- **Router:** `react-router` only — never `react-router-dom`

---

## Purpose

Execute safe, incremental migration of `lucide-react` imports to `@phosphor-icons/react` equivalents without breaking any existing functionality. One batch per session.

**When to Use:** After `audit phosphor` has generated a migration plan and batch assignments.

---

## Pre-Migration Checklist

Before starting ANY migration batch:

1. [ ] Read `/reports/` for the latest phosphor audit report
2. [ ] Read `/tasks/task-list.md` for current batch assignment
3. [ ] Verify `@phosphor-icons/react` is in `package.json` dependencies
4. [ ] Identify which batch to execute (always next uncompleted batch)

---

## Migration Rules (CRITICAL)

### Rule 1: One File at a Time
- Migrate ONE file completely before moving to the next
- Never leave a file in a half-migrated state

### Rule 2: Preserve Behaviour
- Icon `size` prop: Both libraries support `size={N}` — keep as-is
- Icon `className` prop: Both support it — keep as-is
- `strokeWidth` prop: Phosphor doesn't use this — REMOVE it, use `weight` instead:
  - `strokeWidth={1}` → `weight="thin"`
  - `strokeWidth={1.5}` → `weight="light"`
  - `strokeWidth={2}` → `weight="regular"` (default, can omit)
  - `strokeWidth={2.5}` → `weight="bold"`
- `fill` prop: In Phosphor, use `weight="fill"` instead of `fill="currentColor"`
- `absoluteStrokeWidth` prop: Remove entirely

### Rule 3: Import Style
```tsx
// BEFORE (lucide-react)
import { ChevronRight, Search, X } from "lucide-react";

// AFTER (@phosphor-icons/react)
import { CaretRight, MagnifyingGlass, X } from "@phosphor-icons/react";
```

### Rule 4: Alias Pattern for Minimal Diff
```tsx
import { CaretRight as ChevronRight } from "@phosphor-icons/react";
```
**ONLY use aliases during initial migration.** Follow-up cleanup renames JSX to native Phosphor names.

### Rule 5: Never Touch Protected Files
- `/src/app/components/figma/ImageWithFallback.tsx`
- `/pnpm-lock.yaml`

### Rule 6: shadcn/ui Components
Files in `/src/app/components/blocks/ui/` — migrate LAST (Batch 4).

---

## Execution Steps

### Step 1: Identify Current Batch
Read the task list and find the next uncompleted migration batch.

### Step 2: Execute File-by-File Migration
For each file in the batch:
1. **Read the file** — identify all lucide-react imports
2. **Map icons** — look up Phosphor equivalents from the audit report
3. **Verify Phosphor icons exist:**
   ```bash
   grep "IconName" node_modules/@phosphor-icons/react/dist/index.es.js
   ```
4. **Replace the import line** — change source, map icon names
5. **Scan JSX for prop changes** — remove `strokeWidth`, add `weight` if needed
6. **Verify no lucide-react imports remain in the file**

### Step 3: Update Tracking
- Mark the task `[x]` in `/tasks/task-list.md` with today's date

### Step 4: Batch Summary
```
## Migration Session — [Today's Date]

### Batch [N] Complete
- Files migrated: [N]
- Icons replaced: [N]
- Remaining lucide-react files: [N]
- Migration progress: [N]%
```

---

## Master Icon Mapping Reference

| Lucide | Phosphor | Category |
|--------|----------|----------|
| `ArrowRight` | `ArrowRight` | Navigation |
| `ArrowLeft` | `ArrowLeft` | Navigation |
| `ChevronRight` | `CaretRight` | Navigation |
| `ChevronLeft` | `CaretLeft` | Navigation |
| `ChevronUp` | `CaretUp` | Navigation |
| `ChevronDown` | `CaretDown` | Navigation |
| `ChevronsUpDown` | `CaretUpDown` | Navigation |
| `X` | `X` | Action |
| `Check` | `Check` | Action |
| `Plus` | `Plus` | Action |
| `Minus` | `Minus` | Action |
| `Search` | `MagnifyingGlass` | Action |
| `Filter` | `Funnel` | Action |
| `SlidersHorizontal` | `Faders` | Action |
| `Settings` | `Gear` | Action |
| `Menu` | `List` | UI |
| `MoreHorizontal` | `DotsThree` | UI |
| `Sun` | `Sun` | Theme |
| `Moon` | `Moon` | Theme |
| `Eye` | `Eye` | View |
| `EyeOff` | `EyeSlash` | View |
| `Download` | `DownloadSimple` | File |
| `Trash2` | `Trash` | File |
| `Edit` | `PencilSimple` | Edit |
| `Clock` | `Clock` | Time |
| `Calendar` | `Calendar` | Time |
| `MapPin` | `MapPin` | Location |
| `Globe` | `Globe` | Location |
| `Mail` | `Envelope` | Communication |
| `Phone` | `Phone` | Communication |
| `Heart` | `Heart` | Social |
| `Star` | `Star` | Social |
| `Share2` | `ShareNetwork` | Social |
| `Facebook` | `FacebookLogo` | Social |
| `Twitter` | `XLogo` | Social |
| `Instagram` | `InstagramLogo` | Social |
| `Linkedin` | `LinkedinLogo` | Social |
| `Youtube` | `YoutubeLogo` | Social |
| `Github` | `GithubLogo` | Social |
| `AlertTriangle` | `Warning` | Status |
| `AlertCircle` | `WarningCircle` | Status |
| `Info` | `Info` | Status |
| `CheckCircle` | `CheckCircle` | Status |
| `Loader` | `CircleNotch` | Loading |
| `RefreshCw` | `ArrowsClockwise` | Loading |
| `TrendingUp` | `TrendUp` | Data |
| `Zap` | `Lightning` | Misc |
| `Package` | `Package` | Misc |
| `Layers` | `Stack` | Misc |
| `ExternalLink` | `ArrowSquareOut` | Link |
| `Play` | `Play` | Media |
| `Users` | `Users` | People |
| `User` | `User` | People |
| `Home` | `House` | Navigation |
| `BookOpen` | `BookOpen` | Content |
| `Tag` | `Tag` | Content |
| `Shield` | `Shield` | Security |
| `Compass` | `Compass` | Travel |
| `Map` | `MapTrifold` | Travel |
| `Plane` | `Airplane` | Travel |
| `Bed` | `Bed` | Travel |
| `Wifi` | `Wifi` | Amenity |
| `Coffee` | `Coffee` | Amenity |
| `Utensils` | `ForkKnife` | Amenity |
| `Mountain` | `Mountains` | Nature |
| `Camera` | `Camera` | Activity |
| `Binoculars` | `Binoculars` | Activity |

---

## Post-Migration: Final Cleanup (after ALL batches)

1. Remove `lucide-react` from `package.json`
2. Remove alias imports — rename JSX to native Phosphor names
3. Run `audit phosphor` one final time to confirm 100%
4. Add CHANGELOG entry

---

## Success Criteria

- [ ] Current batch files: zero `lucide-react` imports remaining
- [ ] All icon replacements use correct Phosphor equivalents
- [ ] No broken icon rendering
- [ ] Task list and CHANGELOG updated
