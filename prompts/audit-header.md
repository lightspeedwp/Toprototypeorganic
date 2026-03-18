# Audit Header — Template Part Compliance

**Type:** Audit  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `audit header`  
**Repeatable:** Yes  
**Estimated Duration:** 1 session (15-30 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/rules/design-system-rules.md` — Styling compliance
- `/guidelines/components/Header.md` — Header component guidelines
- `/guidelines/overview-components.md` — Component architecture
- `/guidelines/design-tokens/navigation.md` — Navigation styling tokens
- `/guidelines/patterns/navigation-links.md` — Navigation link patterns

---

## Design System Rules

- **Typography:** ONLY 5 approved font variables (Lora, Noto Sans, Courier New, Caveat, Shadows Into Light)
- **Colors:** CSS variables only from `theme-base.css` / `theme-light.css` / `theme-dark.css`
- **Icons:** `@phosphor-icons/react` (default) — `lucide-react` is legacy
- **Router:** `react-router` only — never `react-router-dom`
- **Styling:** External CSS with BEM naming (`.wp-part-header__*`) — no inline styles
- **Layout:** Zero Margin Policy — flex/grid gaps only

---

## Purpose

Audit the header template part to ensure it follows the WordPress block theme architecture: **one template part** (`/src/app/components/parts/Header.tsx`) that loads **different pattern components** based on the current page context.

### Architecture Goal

```
Header (Template Part — ONE component, always loaded)
├── HomepageHeaderPattern    — transparent, no breadcrumbs, overlay on hero
├── DefaultHeaderPattern     — standard nav with breadcrumbs, solid background
├── DevToolsHeaderPattern    — simplified nav, dev-tools branding, no mega menu
└── (future patterns...)     — extensible per section/page type
```

The Header template part determines which pattern to render based on:
- Current route path (`/`, `/dev-tools/*`, etc.)
- Optional `variant` prop from the layout
- Page context from React Router

---

## Audit Steps

### Step 1: Inventory Current Header Usage

1. Read `/src/app/components/parts/Header.tsx` — document its full API and behaviour
2. Read `/src/app/components/parts/HeaderNew.tsx` — if it exists, document differences
3. Search for ALL imports of Header components across the codebase:
   ```
   file_search: content_pattern="import.*Header" name_pattern="**/*.tsx"
   ```
4. Check `/src/app/components/layout/RootLayout.tsx` — which Header is used?
5. Check `/src/app/components/layout/PageLayout.tsx` — which Header is used?

**Record:**
- [ ] How many Header component files exist? (goal: 1 template part + N patterns)
- [ ] Is there a single entry point or multiple competing headers?
- [ ] Does `HeaderNew.tsx` duplicate functionality? Should it be consolidated?

### Step 2: Check Pattern Architecture

1. Does the Header template part accept a `variant` or `context` prop?
2. Does it switch rendering based on route/context?
3. Are there separate pattern components for different sections?
4. Or is all logic monolithically contained in one file?

**Expected structure:**
```
/src/app/components/parts/Header.tsx          — Template part (orchestrator)
/src/app/components/patterns/HeaderDefault.tsx — Default header pattern
/src/app/components/patterns/HeaderHome.tsx    — Homepage header pattern
/src/app/components/patterns/HeaderDevTools.tsx — Dev tools header pattern
```

### Step 3: Homepage Header Audit

The homepage header should be **unique**:
- [ ] Transparent background (overlay on hero)
- [ ] No breadcrumbs
- [ ] Logo and nav visible over hero imagery
- [ ] Becomes solid/opaque on scroll
- [ ] Different CTA emphasis than inner pages

Does the current Header handle this? If so, how (CSS class toggle, conditional render, separate component)?

### Step 4: Dev Tools Header Audit

The dev tools section (`/dev-tools/*`) should have a **distinct header pattern**:
- [ ] Simplified navigation (no mega menu for tour content)
- [ ] Dev tools branding/label
- [ ] Links to dev tool categories instead of tour/destination content
- [ ] Consistent with dev tools visual language

### Step 5: Breadcrumbs Integration

- [ ] Are breadcrumbs part of the header or separate?
- [ ] Does the homepage correctly EXCLUDE breadcrumbs?
- [ ] Do dev tools pages have their own breadcrumb trail?
- [ ] Is the breadcrumb component imported from `/src/app/components/common/Breadcrumbs.tsx`?

### Step 6: Data File Usage

- [ ] Does the header consume navigation data from `/src/app/data/content/navigation.ts`?
- [ ] Are there separate nav data structures for different header patterns?
- [ ] Should dev tools nav data be in a separate file or section?

### Step 7: CSS Architecture

- [ ] Is there a single CSS file at `/src/styles/parts/header.css`?
- [ ] Does it use BEM naming with `.wp-part-header__*` prefix?
- [ ] Are pattern-specific styles separated or mixed in?
- [ ] Are all values CSS variables (no hardcoded colors, fonts, spacing)?

### Step 8: Generate Report

Save to `/reports/YYYY-MM/YYYY-MM-DD-header-audit.md`:

```markdown
# Header Template Part Audit

**Date:** [Today]

## Current State
- Header files: [list]
- Pattern architecture: [monolithic / separated / partially separated]
- Homepage variant: [handled / not handled]
- Dev tools variant: [handled / not handled]
- Breadcrumbs: [integrated / separate / missing]

## Issues Found
1. [issue] — Priority [P0/P1/P2]

## Recommended Actions
1. [action]

## Files to Create/Modify
- [list]
```

Add tasks to `/tasks/task-list.md`.

---

## Success Criteria

- [ ] Single Header template part identified or recommended
- [ ] Pattern variants documented (homepage, default, dev tools)
- [ ] Breadcrumb integration audited
- [ ] Data file usage verified
- [ ] CSS architecture checked
- [ ] Report saved and tasks created