# Task List: Inline Styles Removal & Design System Alignment

**Project:** CSS Architecture Cleanup  
**Date:** March 3, 2026  
**Status:** Complete

---

## 🟥 Phase 1: Critical Fixes (P0)
- [x] **Task 1.1:** Refactor `DesignSystemVerification.tsx` to remove hardcoded `8px` widths. ✅ Done 2026-03-04
  - *Fix:* Replaced `style={{ width: '8px' }}` with Tailwind class `w-2`.

## 🟧 Phase 2: Dynamic Prop Refactor (P1)
- [x] **Task 2.1:** Refactor `SiteLogo.tsx` to use CSS Variables for width. ✅ Done 2026-03-04
  - *Previous:* `style={{ width }}`
  - *Now:* `style={{ '--logo-width': width }}` + CSS `width: var(--logo-width, auto)`
- [x] **Task 2.2:** Refactor `RelatedRegionsBlock.tsx` grid logic. ✅ Done 2026-03-04
  - *Previous:* `style={{ gridTemplateColumns: ... }}`
  - *Now:* `style={{ '--grid-columns': columns }}` + CSS `grid-template-columns: repeat(var(--grid-columns), ...)`
- [x] **Task 2.3:** Refactor `GroupBlock.tsx` overlay opacity. ✅ Done 2026-03-04
  - *Previous:* `style={{ opacity: overlayOpacity }}` and `style={{ backgroundImage: ... }}`
  - *Now:* `style={{ '--overlay-opacity': ..., '--group-bg-image': ... }}` + CSS classes

## 🟦 Phase 3: Developer Tools & Specimens
- [x] **Task 3.1:** Audit `ComponentShowcase.tsx` for inline styles. ✅ Done 2026-03-04
  - Only 1 remaining inline style: viewport width CSS variable pattern (compliant exemption).
- [x] **Task 3.2:** Verify all dev tool specimens use `var()` patterns. ✅ Done 2026-03-04
  - SpacingScale, ShadowScale, RadiusSpecimens all use `var()` references — compliant.
  - PerformanceMonitor, AnalyticsDashboard use dynamic data-viz percentages — legitimate exemption.

## 🟩 Phase 4: Enforcement & Documentation
- [x] **Task 4.1:** Update `DESIGN-SYSTEM-ENFORCEMENT.md` with "Dynamic Styling" pattern examples. ✅ Done 2026-03-04
  - Added "Dynamic Styling Pattern - CSS Custom Properties" section with step-by-step guide, forbidden examples, and exempt categories table.
- [x] **Task 4.2:** Propose ESLint rule for `react/forbid-dom-props`. ✅ Done 2026-03-04
  - Added proposed ESLint config to DESIGN-SYSTEM-ENFORCEMENT.md with `"warn"` level and exemption guidance.

### Remaining Inline Styles — All Exempt

The following files still contain `style={{}}` but are **compliant** per guidelines:

| File | Reason | Category |
|------|--------|----------|
| `LoadingState.tsx` | Dynamic skeleton/progress bar width | Legitimate dynamic |
| `Skeleton.tsx` | Dynamic width/height from props | Legitimate dynamic |
| `progress.tsx` | shadcn/ui third-party library | Do not modify |
| `chart.tsx` | shadcn/ui third-party library | Do not modify |
| `SwipeableCard.tsx` | Touch/swipe animation offsets | Motion exemption |
| `PullToRefresh.tsx` | Touch/pull animation values | Motion exemption |
| `BottomSheet.tsx` | Touch/drag animation values | Motion exemption |
| `TripPlannerPage.tsx` | Progress bar width percentage | Legitimate dynamic |
| `SectionStylesShowcase.tsx` | Dev tool background-image specimen | Dev tool |
| `SpacingScale.tsx` | Uses `var()` references | Already compliant |
| `ShadowScale.tsx` | Uses `var()` references | Already compliant |
| `RadiusSpecimens.tsx` | Uses `var()` references | Already compliant |
| `PerformanceMonitor.tsx` | Dev tool data visualization | Dev tool |
| `AnalyticsDashboard.tsx` | Dev tool data visualization | Dev tool |

---

**Master Tracking:** Added to `/tasks/task-list.md`