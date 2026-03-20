# Expand Blocks — Discover & Propose Atomic Block Components

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand blocks`  
**Repeatable:** Yes — run after adding new patterns or pages  
**Estimated Duration:** 1 session (15-25 minutes)  
**Followed by:** Approved blocks can be scaffolded via `new block`.

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/blocks/overview-blocks.md` — WordPress block inventory
- `/guidelines/overview-components.md` — Component architecture, directory structure
- `/guidelines/rules/design-system-rules.md` — Styling compliance

---

## Design System Rules (apply to ALL generated/modified UI)

- ALL styling via CSS variables from `/src/styles/theme-base.css`, `/src/styles/theme-light.css`, `/src/styles/theme-dark.css`
- Typography: ONLY approved font faces via CSS variables
- Icons: `@phosphor-icons/react` (default) — `lucide-react` is legacy
- External `.css` files with BEM naming (`.wp-block-*`)
- Zero Margin Policy: flex/grid gaps only for layout spacing

---

## Purpose

Analyse the codebase to discover **atomic block components** that should exist in `/src/app/components/blocks/`. Blocks are the **smallest composable units** that patterns assemble — the building blocks of the design system. Unlike `expand components` (which finds duplicated logic to extract), this prompt identifies **conceptual blocks** that the design system needs based on content types and WordPress block conventions.

---

## Block Categories to Assess

### Core WordPress Blocks (should have React equivalents)

1. **Heading** — semantic heading with level prop
2. **Paragraph** — styled body text
3. **Image** — responsive image with caption, fallback
4. **Button** — all button variants (fill, outline, ghost, text link)
5. **List** — ordered/unordered with custom markers
6. **Quote** — blockquote with citation
7. **Separator** — horizontal rule variants
8. **Spacer** — controlled whitespace
9. **Group** — container with background/border options
10. **Columns** — responsive column layout

### Tour Operator Blocks (domain-specific)

1. **PriceTag** — formatted price with currency, per-person, was/now
2. **StarRating** — star display with score and count
3. **DurationBadge** — "3 days / 2 nights" formatted
4. **DifficultyIndicator** — Easy/Medium/Hard visual treatment
5. **CategoryBadge** — tag/category label with colour coding
6. **AvailabilityIndicator** — in stock / limited / sold out
7. **AddToCartButton** — booking/enquiry CTA with state
8. **ProductCard** — composable card for any product type
9. **MapEmbed** — location display with fallback
10. **GalleryThumbnail** — image with lightbox trigger

### UI Utility Blocks

1. **Avatar** — circular image with initials fallback
2. **Badge** — status/count indicator
3. **Chip** — removable filter tag
4. **Tooltip** — hover information
5. **ProgressBar** — visual progress indicator
6. **Skeleton** — loading placeholder
7. **EmptyState** — "no results" display
8. **ErrorBoundary** — error display component
9. **IconLabel** — icon + text pair, consistently styled
10. **StatCounter** — number with label and optional icon

---

## Steps

### Step 1: Inventory Existing Blocks

1. List all components in `/src/app/components/blocks/`
2. For each, note: name, CSS file, props, usage count
3. Map each to its WordPress block equivalent

| Block | CSS File | Props | Used By | WP Equivalent |
|-------|----------|-------|---------|---------------|
| Button | blocks/button.css | variant, size, ... | 15 patterns | core/button |

### Step 2: Assess Block Coverage

For each category above, check:
- Does a block exist?
- Is it in the correct location (`/components/blocks/`)?
- Does it have BEM CSS (`.wp-block-*`)?
- Is it used by patterns (not pages directly)?

Build a coverage matrix:

| # | Block | Exists? | Location Correct? | BEM CSS? | Used By Patterns? |
|---|-------|---------|--------------------|----------|--------------------|
| 1 | Button | ✅ | ✅ | ✅ | ✅ (15) |
| 2 | PriceTag | ❌ | — | — | — |
| 3 | StarRating | ❌ | — | — | — |

### Step 3: Analyse Pattern Dependencies

For each pattern in `/src/app/components/patterns/`:
1. Read the file
2. Identify inline UI elements that should be blocks
3. Note which blocks the pattern *would* consume if they existed

| Pattern | Inline Elements That Should Be Blocks |
|---------|--------------------------------------|
| TourCard | PriceTag, StarRating, DurationBadge, CategoryBadge |
| ReviewCard | StarRating, Avatar |
| AccomCard | PriceTag, CategoryBadge, AvailabilityIndicator |

### Step 4: Prioritise Missing Blocks

Score each missing block:

| # | Block | Used By (patterns) | Complexity | Priority |
|---|-------|--------------------|-----------|----------|
| 1 | PriceTag | 4 patterns | Low | High |
| 2 | StarRating | 3 patterns | Low | High |
| 3 | CategoryBadge | 6 patterns | Low | High |
| 4 | Avatar | 2 patterns | Low | Medium |

**Priority criteria:**
- **High** — Used by 3+ patterns, low complexity
- **Medium** — Used by 2+ patterns, or medium complexity
- **Low** — Used by 1 pattern, or high complexity

### Step 5: Generate Block Specifications

For each high/medium priority missing block:

```
### Proposed: PriceTag

**Location:** `/src/app/components/blocks/PriceTag.tsx`
**CSS:** `/src/styles/blocks/price-tag.css`
**BEM Root:** `.wp-block-price-tag`
**WP Equivalent:** Custom block `to/price-tag`

**Props:**
- `amount: number`
- `currency?: string` (default: "ZAR")
- `period?: string` ("per person", "per night")
- `originalAmount?: number` (strike-through for specials)
- `size?: "sm" | "md" | "lg"`

**Consumed by:** TourCard, AccomCard, SpecialCard, TourDetail
```

### Step 6: User Decision

Present complete recommendation table. Wait for approval.

---

## Continuation Protocol

When user says **`continue`** after approving:

1. Read `/prompts/new-block.md`
2. Scaffold the highest-priority approved block
3. After scaffolding, update consuming patterns to import the new block
4. Prompt: "Block [name] created. Say `continue` for the next one."

---

## Rules

1. **Blocks are atomic** — no business logic, no data fetching, pure UI
2. **Blocks live in `/components/blocks/`** — never in patterns or pages
3. **BEM naming** — `.wp-block-[name]` class convention
4. **External CSS** — `/src/styles/blocks/[name].css`
5. **CSS variables only** — all styling via design tokens
6. **Patterns consume blocks** — blocks never consume patterns
7. **Never auto-create** — present proposals and wait for approval

---

## Success Criteria

- [ ] All existing blocks inventoried with coverage data
- [ ] WordPress block equivalents mapped
- [ ] Pattern dependencies analysed
- [ ] Missing blocks identified and prioritised
- [ ] Block specifications include props, CSS, and BEM class
- [ ] Ready for `continue` → `new block` execution chain
