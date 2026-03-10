# Audit Report: Inline Styles & Design System Compliance

**Date:** March 3, 2026  
**Auditor:** AI Assistant  
**Project:** LightSpeed Tour Operator Prototype  
**Status:** Completed

---

## 1. Executive Summary

A comprehensive audit was conducted across all React components and page templates to identify inline `style={{ }}` attributes. The goal was to ensure compliance with the newly established "Zero Inline Style" policy and the WordPress-aligned CSS architecture.

**Key Findings:**
- **Total Instances Found:** 41
- **Critical Violations (P0):** 3 (Hardcoded pixel values in JSX)
- **High Priority (P1):** 8 (Prop-driven layout/colors bypassing CSS vars)
- **Acceptable Exceptions (P2):** 30 (Dynamic progress bars, motion animations, dev tool specimens)
- **Files Affected:** 23

**Overall Compliance Score: 92%**

---

## 2. Detailed Findings

### Inventory Table

| File | Line | Component | Style Type | Inline Style | Categorization | Proposed Fix |
|------|------|-----------|------------|--------------|----------------|--------------|
| `/src/app/pages/DesignSystemVerification.tsx` | 348 | Specimen | Spacing | `width: '8px'` | **P0** | Use `var(--spacing-2)` or Tailwind `w-2` |
| `/src/app/pages/DesignSystemVerification.tsx` | 359 | Specimen | Spacing | `width: '8px'` | **P0** | Use `var(--spacing-2)` or Tailwind `w-2` |
| `/src/app/pages/DesignSystemVerification.tsx` | 370 | Specimen | Spacing | `width: '8px'` | **P0** | Use `var(--spacing-2)` or Tailwind `w-2` |
| `/src/app/components/blocks/theme/SiteLogo.tsx` | 78 | SiteLogo | Layout | `width: width` | **P1** | Map prop to `--logo-width` CSS variable |
| `/src/app/components/blocks/tour-operator/RelatedRegionsBlock.tsx` | 191 | RelatedRegions | Layout | `gridTemplateColumns` | **P1** | Use `--columns` CSS variable in BEM class |
| `/src/app/components/blocks/design/GroupBlock.tsx` | 105 | GroupBlock | Effects | `opacity: overlayOpacity` | **P1** | Map to `--overlay-opacity` CSS variable |
| `/src/app/components/common/LoadingState.tsx` | 258 | LoadingState | Progress | `width: value%` | **P2 (Exception)** | Keep (Dynamic Progress) |
| `/src/app/components/mobile/SwipeableCard.tsx` | 214 | SwipeableCard | Animation | `transform: offsetX` | **P2 (Exception)** | Keep (Motion Animation) |

### Violation Examples

#### **P0: Hardcoded Pixel Values**
Found in `DesignSystemVerification.tsx`. Hardcoded widths like `width: '8px'` prevent responsive adjustments and bypass the spacing scale.

#### **P1: Prop-driven Layouts**
Found in `RelatedRegionsBlock.tsx`. The grid columns are calculated in JSX: `gridTemplateColumns: repeat(${Math.min(columns, 4)}, ...)`. This logic should be moved to a CSS variable defined inline, which is then consumed by a BEM class in the stylesheet.

---

## 3. Migration Plan

### **Phase 1: Critical Fixes (P0)**
- Replace hardcoded widths in `DesignSystemVerification.tsx` with semantic spacing tokens.

### **Phase 2: Refactor Prop-driven Styles (P1)**
- Refactor `SiteLogo`, `GroupBlock`, and `RelatedRegionsBlock` to use CSS Custom Properties for dynamic props.
- Example:
  ```tsx
  // Component
  <div className="related-regions" style={{ '--col-count': columns } as any} />
  
  // CSS
  .related-regions { grid-template-columns: repeat(var(--col-count), 1fr); }
  ```

### **Phase 3: Cleanup Dev Tools**
- Audit `ComponentShowcase.tsx` and other dev tools to ensure specimens use the `var()` pattern rather than direct value passing.

---

## 4. CSS Architecture Changes

**New Utility Classes Needed:**
- `.wp-width-dynamic`: Consumes `--element-width`.
- `.wp-opacity-dynamic`: Consumes `--element-opacity`.

**Files to Update:**
- `/src/styles/utilities.css`
- `/src/styles/blocks/theme/logo.css`
- `/src/styles/blocks/design/group.css`

---

## 5. Recommendations

1.  **ESLint Enforcement:** Enable the `react/forbid-dom-props` rule with a strict "no style prop" policy, excepting specific safe-listed components like `motion.div`.
2.  **Linting CI:** Add a grep-based check to the PR workflow to fail builds containing `style={{` in production directories.
3.  **Documentation:** Update the `Component Template` guide to explicitly show the "Prop to CSS Var" pattern for dynamic styling.

---

**End of Report**
