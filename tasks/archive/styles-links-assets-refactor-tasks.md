# Task List: Styles, Links & Assets Refactor

**Project:** Quality Assurance & Design System Alignment  
**Date:** March 3, 2026  
**Status:** Complete

---

## 🟥 Phase 1: Critical Fixes (P0)
- [x] **Task 1.1:** Fix placeholder legal links in `BookingWizard.tsx`. ✅ Done 2026-03-04
  - Link "Terms & Conditions" to `/terms-conditions`.
  - Link "Privacy Policy" to `/privacy-policy`.
- [x] **Task 1.2:** Fix placeholder pagination links in `Pagination.tsx`. ✅ Done 2026-03-04
  - Converted `<a href="#">` to semantic `<button>` elements (no navigation needed — state-based).
- [x] **Task 1.3:** Refactor `DesignSystemVerification.tsx` to remove hardcoded `8px` widths. ✅ Done 2026-03-04
  - *Fix:* Replaced with Tailwind `w-2` class.

## 🟧 Phase 2: Asset & Link Optimization (P1)
- [x] **Task 2.1:** Fix social media placeholder links in `FooterNew.tsx`. ✅ Done 2026-03-04
  - Replaced `href="#"` with actual social media URLs, added `target="_blank"`, `rel="noopener noreferrer"`, and `aria-label`.
- [x] **Task 2.2:** Add missing `alt` text to images in: ✅ Done 2026-03-04
  - `CTA.tsx` — decorative background image, `alt=""` correct per WCAG, added `aria-hidden="true"`
  - `EnquiryModal.tsx` — already had `alt="Wilderness"` ✅
  - `ConservationSection.tsx` — already had `alt="Conservation in Africa"` ✅
  - `WhyBookWithUsPage.tsx` — already had `alt="African landscape"` ✅
  - `ReviewsHubPage.tsx` — fixed `alt=""` → `alt="Photo of {review.author}"`
- [x] **Task 2.3:** Refactor `SiteLogo.tsx` to use CSS Variables for width. ✅ Done 2026-03-04
- [x] **Task 2.4:** Refactor `RelatedRegionsBlock.tsx` grid logic to use CSS Variables. ✅ Done 2026-03-04

## 🟦 Phase 3: Documentation & Enforcement
- [x] **Task 3.1:** Update `DESIGN-SYSTEM-ENFORCEMENT.md` with Image Alt Text requirements. ✅ Done 2026-03-04
  - Added "Image Alt Text - Mandatory Rules" section with correct/forbidden examples and rules.
- [x] **Task 3.2:** Update `DESIGN-SYSTEM-ENFORCEMENT.md` with the broken links prevention policy. ✅ Done 2026-03-04
  - Added "Broken Links Prevention - Mandatory Rules" section with decision tree.
  - Updated Verification Checklist with link and alt text checks.

---

**Master Tracking:** Added to `/tasks/task-list.md`