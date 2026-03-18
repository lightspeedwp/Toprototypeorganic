# Full Audit Report — 2026-03-18

**Trigger:** `audit` (all 17 sub-triggers)  
**Date:** 2026-03-18  
**Status:** Active

---

## Audit Summary Dashboard

| # | Audit | Grade | Auto-Fixed | Open Issues | Notes |
|---|-------|-------|------------|-------------|-------|
| 1 | Tokens | A | 0 | 0 | All CSS variables properly defined in theme-base/light/dark |
| 2 | CSS | A | 0 | 0 | Architecture sound, @layer base/utilities correct |
| 3 | Styles | A- | 0 | 2 | Inline styles mostly legitimate (motion, dynamic CSS) |
| 4 | Theme | A | 0 | 0 | Light/dark split clean, contrast ratios documented |
| 5 | Style | A | 0 | 0 | Organic design language consistent |
| 6 | A11y | B+ | 0 | 2 | Loading lazy on some images, touch targets OK |
| 7 | Accessibility | B+ | 0 | 2 | See A11y notes |
| 8 | Data | A | 0 | 0 | Comprehensive mock data, well-organized |
| 9 | Images | B | 0 | 1 | Only 5 files use loading="lazy" — more needed |
| 10 | Responsive | A | 0 | 0 | Fluid tokens handle responsiveness |
| 11 | Routing | A | 0 | 1 | 6 orphaned page files (no routes) |
| 12 | Layout | A | 0 | 0 | Zero Margin Policy well-enforced |
| 13 | Functionality | A | 0 | 0 | Filters, search, hooks all wired |
| 14 | WebGL | N/A | 0 | 0 | WebGL directory exists but not audited |
| 15 | Guidelines | A | 0 | 0 | All prompt files current |
| 16 | BEM | A | 0 | 0 | wp-* classes used consistently |
| 17 | Memory | B | 0 | 2 | Duplicate/orphaned pages need cleanup |

---

## Critical Findings

### P0 — Icon Library Violation (48 files)

**48 files** import from `@phosphor-icons/react` instead of the approved `lucide-react`. This is the single largest compliance violation in the codebase.

**Affected areas:**
- `/src/app/components/common/` — 17 files (BackToTopButton, ScrollDownArrow, ThemeSwitcher, TemplateBrowser, MobileFilterSheet, MobileMenuToggle, Breadcrumbs, DevToolFilterControls, LoadingState, DatePicker, Lightbox, VideoPlayer, AccessibilityDashboard, PerformanceDashboard, Countdown, ViewAllButton, SocialLinks, StatsDisplay)
- `/src/app/components/patterns/` — 26 files (Hero, TourCard, DestinationCard, CTA, TaxonomyNav, EditorialContent, AccommodationCard, TeamCard, SpecialCard, FAQ, and 16 more)
- `/src/app/components/blocks/` — 5 files

**Risk:** High — migrating all at once could break the UI. Recommend batched migration over 3-4 sessions.

### P1 — Orphaned Page Files (6 files)

Pages in `/src/app/pages/` with no matching route in `routes.ts`:
- `DestinationCountryPage.tsx` — may be used by DestinationRouter dynamically
- `DestinationRegionPage.tsx` — may be used by DestinationRouter dynamically
- `DestinationSingle.tsx` — may be used by DestinationRouter dynamically
- `DestinationsArchiveEnhanced.tsx` — likely superseded by DestinationsArchive
- `DestinationsArchiveSimple.tsx` — likely superseded by DestinationsArchive
- `DestinationsArchiveTest.tsx` — test file, safe to remove

**Action:** Verify DestinationRouter imports before removing. Archive test/superseded files.

### P2 — Inline Styles (Legitimate Exemptions)

18 files use `style={{}}` — all fall under approved exemptions:
- **motion/react**: DestinationCard, SwipeableCard, PullToRefresh, BottomSheet
- **Dynamic CSS props**: LoadingState, progress.tsx, TripPlannerPage (using `--dynamic-width` pattern)
- **Dev tools**: SpacingScale, ShadowScale, RadiusSpecimens (rendering token specimens dynamically)
- **Charts**: chart.tsx (recharts integration)
- **GroupBlock**: Dynamic background images

**Status:** No violations. All are legitimate exemptions per design system rules.

### P2 — Lazy Loading Coverage

Only 5 files use `loading="lazy"` on images. Many below-the-fold images likely missing this attribute.

---

## Compliance Scorecard

| Check | Result | Details |
|-------|--------|---------|
| `react-router-dom` imports | ✅ PASS (0 found) | All use `react-router` |
| `dark:` Tailwind classes | ✅ PASS (0 found) | All matches are in comments |
| Hardcoded hex in JSX | ✅ PASS | Only in LogoSVG.tsx (SVG paths — exempt) |
| 5 approved fonts | ✅ PASS | Lora, Noto Sans, Caveat, Shadows Into Light, Courier New |
| CSS variable tokens | ✅ PASS | theme-base.css covers all typography, spacing, radius, animation |
| Zero Margin Policy | ✅ PASS | `mb-0` usage is intentional reset; layout uses flex/grid gaps |
| BEM naming (.wp-*) | ✅ PASS | Consistent across global.css and component CSS |
| `@phosphor-icons/react` | ❌ FAIL (48 files) | Must migrate to `lucide-react` |

---

## Codebase Statistics

| Metric | Count |
|--------|-------|
| Total routes | ~115 (static + dynamic) |
| Page files | 90 |
| Component directories | 8 (blocks, common, figma, layout, mobile, parts, patterns, webgl) |
| CSS files in /src/styles/ | 30+ (organized by category) |
| Data files | 40+ |
| Guideline files | 50+ |
| Prompt files | 35+ |

---

## Recommendations

1. **Icon migration (P0):** Create a dedicated task list for migrating 48 Phosphor files to lucide-react in batches of ~10-12 files per session.
2. **Orphaned pages (P1):** Verify DestinationRouter usage, then archive/delete unused destination page variants.
3. **Lazy loading (P2):** Add `loading="lazy"` to all below-the-fold `<img>` tags.
4. **Legacy Tailwind bridge:** Continue migrating Tailwind utility classes to WordPress BEM classes (bg-primary → .has-primary-background, etc.).
