# Expand Components — Discover & Propose Shared Atomic Components

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand components`  
**Repeatable:** Yes — run after adding new patterns or templates  
**Estimated Duration:** 1 session (15-25 minutes)  
**Followed by:** Approved components can be scaffolded via `new block`.

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/overview-components.md` — Component architecture, directory structure
- `/guidelines/blocks/overview-blocks.md` — WordPress block inventory
- `/guidelines/Guidelines.md` — WordPress-native React mapping

---

## Design System Rules (apply to ALL generated/modified UI)

- ALL styling via CSS variables from `/src/styles/theme-base.css`, `/src/styles/theme-light.css`, `/src/styles/theme-dark.css`
- Typography: ONLY approved font faces via CSS variables
- Icons: `@phosphor-icons/react` (default) — `lucide-react` is legacy
- Zero Margin Policy: flex/grid gaps only for layout spacing
- External `.css` files with BEM naming

---

## Purpose

Analyse all templates, patterns, and pages to identify **duplicated component logic** that could be extracted into reusable atomic block components in `/src/app/components/blocks/`. This reduces code duplication, ensures consistency, and makes the design system more composable.

---

## What to Look For

### Duplicated UI Fragments

1. **Price displays** — formatted price with currency, per-person, was/now
2. **Rating/star displays** — star icons with score and count
3. **Badge/tag elements** — category labels, status indicators, featured flags
4. **Avatar/profile images** — circular images with fallbacks
5. **Icon + text pairs** — icon with label, consistently styled
6. **Duration displays** — "3 days / 2 nights" formatted strings
7. **Difficulty indicators** — Easy/Medium/Hard with visual treatment
8. **Image with overlay** — image with gradient text overlay
9. **Stat counters** — number with label and optional icon
10. **Read more / truncated text** — text with expand/collapse
11. **Breadcrumb items** — individual crumb with separator
12. **Social link icons** — platform icon with URL

### Logic Duplication

1. **Formatting utilities** — price formatting, date formatting, pluralisation
2. **Data filtering** — filter logic repeated across archive pages
3. **Responsive visibility** — show/hide patterns repeated inline
4. **Empty state handling** — "No results" UI repeated across pages
5. **Loading state** — skeleton/spinner patterns inconsistently implemented

---

## Steps

### Step 1: Inventory Existing Block Components

1. List all components in `/src/app/components/blocks/`
2. For each, note: name, props, where it's used
3. List all components in `/src/app/components/common/`

| Component | Location | Props | Used By |
|-----------|----------|-------|---------|
| Button | blocks/ | variant, size, ... | 12 patterns |
| Card | blocks/ | ... | 5 patterns |

### Step 2: Scan for Duplicated UI Fragments

1. Search across all `.tsx` files for repeated JSX structures
2. Focus on `/src/app/components/patterns/` and `/src/app/pages/`
3. Look for JSX that appears in 2+ files with minor variations

For each duplicate found:

| # | Fragment | Found In | Variations | Lines of Code |
|---|----------|----------|------------|---------------|
| 1 | Price display | TourCard, AccomCard, SpecialCard | Currency symbol position, decimal handling | ~8-12 per instance |
| 2 | Star rating | ReviewCard, TourDetail, AccomDetail | Icon choice, size, colour | ~6-10 per instance |

### Step 3: Analyse Extraction Candidates

For each duplicate, assess:
- **Frequency** — how many places use this pattern? (2+)
- **Consistency** — are the variations meaningful or accidental?
- **Complexity** — is extraction worth the abstraction cost?
- **Props needed** — what would the component's API look like?

Score each candidate:

| # | Fragment | Frequency | Consistency | Worth Extracting? | Proposed Component |
|---|----------|-----------|-------------|-------------------|-------------------|
| 1 | Price display | 5 | Low (inconsistent) | Yes — will unify | `PriceTag` |
| 2 | Star rating | 3 | High (same shape) | Yes — reduce code | `Rating` |
| 3 | Single icon+text | 15 | Medium | Maybe — very simple | `IconLabel` |

### Step 4: Generate Proposals

For each viable extraction:

```
### Proposed: PriceTag Block Component

**Location:** `/src/app/components/blocks/PriceTag.tsx`
**CSS:** `/src/styles/blocks/price-tag.css`
**Props:**
- `amount: number` — price value
- `currency?: string` — currency code (default: "ZAR")
- `period?: string` — "per person", "per night", etc.
- `originalAmount?: number` — strike-through price for specials
- `size?: "sm" | "md" | "lg"` — display size

**Would replace duplicated code in:**
- TourCard (lines 45-52)
- AccomCard (lines 38-46)
- SpecialCard (lines 22-30)
- TourDetail (lines 120-130)

**Estimated code reduction:** ~40 lines across 4 files
```

### Step 5: User Decision

Present all proposals in a summary table:

| # | Priority | Component | Type | Replaces Duplication In | Code Reduction |
|---|----------|-----------|------|------------------------|----------------|
| 1 | High | PriceTag | Block | 4 files | ~40 lines |
| 2 | High | Rating | Block | 3 files | ~25 lines |
| 3 | Medium | Badge | Block | 6 files | ~30 lines |
| 4 | Low | IconLabel | Block | 15 files | ~15 lines |

Wait for user approval.

---

## Continuation Protocol

When user says **`continue`** after approving:

1. Read `/prompts/new-block.md`
2. Scaffold the highest-priority approved component
3. After scaffolding, update all consuming components to use the new block
4. Prompt: "Component [name] extracted. Say `continue` for the next one."

---

## Rules

1. **Minimum 2 usage sites** — don't extract single-use code
2. **Map to WordPress blocks** — every extracted component should have a WP block equivalent
3. **BEM naming** — `.wp-block-[name]` class convention
4. **External CSS** — never inline styles in extracted components
5. **CSS variables only** — all styling via design tokens
6. **Never auto-extract** — present proposals and wait for approval
7. **Visual parity** — extraction must not change appearance

---

## Success Criteria

- [ ] Existing block components inventoried
- [ ] Duplicated UI fragments identified across codebase
- [ ] Extraction candidates scored and prioritised
- [ ] Detailed proposals with props and CSS specs
- [ ] Code reduction estimates provided
- [ ] Ready for `continue` → `new block` execution chain
