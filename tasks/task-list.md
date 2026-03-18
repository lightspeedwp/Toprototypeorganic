# Task List - Master Checklist

**Last Updated:** March 18, 2026  
**Status:** Phase 6.1 Icon Migration — In Progress

---

## Phase 4: Template Polish — Wire Expanded Data (Complete ✅)

### 4.1 Core Data Wiring (Complete ✅)

- [x] **4.1.1** Fix `mockExpanded.ts` — replace generator-based data with hand-crafted aggregations (61 tours, 50 accommodation, 87 destinations, 44 blog posts, 41 reviews, 18 team, 91 FAQs)
- [x] **4.1.2** Fix `FAQsArchivePage.tsx` — use `ALL_FAQS` (91) + `searchAllFAQs` instead of legacy `FAQS` (28) + `searchFAQs`
- [x] **4.1.3** Fix `FAQPage.tsx` — dynamically build 14 FAQ categories from `FAQ_CATEGORIES` + `getAllFAQsByCategory` instead of 6 hardcoded categories
- [x] **4.1.4** Fix `HomePage.tsx` — import `ALL_TOURS`, `ALL_DESTINATIONS`, `ALL_ACCOMMODATION`, `ALL_BLOG_POSTS`, `ALL_TEAM`, `ALL_REVIEWS` from mockExpanded
- [x] **4.1.5** Fix `SitemapPage.tsx` — use expanded data for stats + add Asia/Europe destinations + add FAQ stats (91 FAQs, 14 categories)

### 4.2 Legacy Import Migration (Complete ✅)

Migrated 21 files from Africa-only subsets to expanded data:

- [x] **4.2.1** `SingleDestinationTemplate.tsx` — ALL_DESTINATIONS, ALL_TOURS, ALL_ACCOMMODATION
- [x] **4.2.2** `DestinationSingle.tsx` — ALL_DESTINATIONS, ALL_TOURS, ALL_REVIEWS
- [x] **4.2.3** `DestinationCountryPage.tsx` — ALL_DESTINATIONS, ALL_TOURS, ALL_BLOG_POSTS, ALL_REVIEWS, ALL_TEAM
- [x] **4.2.4** `DestinationRegionPage.tsx` — ALL_DESTINATIONS, ALL_TOURS, ALL_ACCOMMODATION, ALL_BLOG_POSTS, ALL_REVIEWS, ALL_TEAM
- [x] **4.2.5** `TeamSingle.tsx` — ALL_TOURS, ALL_TEAM from mockExpanded
- [x] **4.2.6** `ReviewSingle.tsx` — ALL_REVIEWS from mockExpanded (removed unused TOURS import)
- [x] **4.2.7** `SpecialSingle.tsx` — ALL_TOURS from mockExpanded
- [x] **4.2.8** `BookingPage.tsx` — ALL_TOURS from mockExpanded
- [x] **4.2.9** `WishlistPage.tsx` — ALL_TOURS from mockExpanded
- [x] **4.2.10** `TourComparisonPage.tsx` — ALL_TOURS from mockExpanded
- [x] **4.2.11** `AdvancedSearchResultsPage.tsx` — ALL_TOURS from mockExpanded
- [x] **4.2.12** `ItineraryBuilderPage.tsx` — ALL_DESTINATIONS, ALL_TOURS, ALL_ACCOMMODATION from mockExpanded
- [x] **4.2.13** `OrganicDemo.tsx` — ALL_TOURS from mockExpanded
- [x] **4.2.14** `OrganicLandingPage.tsx` — ALL_TOURS from tours
- [x] **4.2.15** `DayAndDuskPage.tsx` — ALL_TOURS from tours
- [x] **4.2.16** `ComponentShowcase.tsx` — ALL_TOURS, ALL_DESTINATIONS, ALL_BLOG_POSTS, ALL_ACCOMMODATION, ALL_SPECIALS, ALL_TEAM from mockExpanded
- [x] **4.2.17** `CardInteractions.tsx` — ALL_TOURS, ALL_DESTINATIONS, ALL_ACCOMMODATION, ALL_BLOG_POSTS, ALL_TEAM, ALL_SPECIALS from mockExpanded
- [x] **4.2.18** `MegaMenu.tsx` — ALL_TOURS from tours, ALL_ACCOMMODATION from accommodation
- [x] **4.2.19** `ToursForDestinationBlock.tsx` — ALL_TOURS from mockExpanded
- [x] **4.2.20** `RelatedToursBlock.tsx` — ALL_TOURS from mockExpanded
- [x] **4.2.21** `RelatedAccommodationsBlock.tsx` — ALL_ACCOMMODATION from mockExpanded

### 4.3 Verification & Enhancement (Complete ✅)

- [x] **4.3.1** Audit remaining pages — all legacy ACCOMMODATION/BLOG_POSTS/REVIEWS_DATA/TEAM_MEMBERS imports cleaned
- [x] **4.3.2** Verify `ArchiveDestinationTemplate` — uses ALL_DESTINATIONS + ALL_CONTINENTS from mockExpanded
- [x] **4.3.3** Verify `SpecialsArchive` — uses ALL_SPECIALS from mockExpanded
- [x] **4.3.4** Add continent-level FAQ context — SingleDestinationTemplate maps continent-2→asia, continent-3→europe via `getAllFAQsByCategory` + `FAQ_DESTINATIONS`
- [x] **4.3.5** Verify single-detail slug resolution — SingleTourTemplate, SingleAccommodationTemplate, SingleBlogTemplate all use expanded arrays; BlogSingle uses ALL_TEAM for author lookup

---

## Phase 4 Final Data Counts

| Content Type | Count | Source |
|-------------|-------|--------|
| Tours | 61 | 35 Africa + 13 Asia + 13 Europe |
| Destinations | 87 | Across 6 continents |
| Accommodation | 50 | 24 Africa + 8 Asia + 8 Europe + 10 expansion |
| Blog Posts | 44 | 24 Africa + 10 Asia + 10 Europe |
| Reviews | 41 | 15 Africa + 13 Asia + 13 Europe |
| Team Members | 18 | 5 original + 13 expanded |
| FAQs | 91 | Across 14 categories |
| Travel Styles | 10 | — |
| Traveller Types | 5 | — |
| Brands | 7 | — |

---

## Phase 5: Next Steps (Planned)

- [x] **5.1** Design system compliance audit — scan all components for hardcoded colors, non-variable spacing, non-approved fonts
- [x] **5.2** Accessibility audit — heading hierarchy, ARIA labels, focus indicators, touch targets
  - **Report:** `/reports/2026-03/2026-03-15-accessibility-audit.md`
  - **Fixed:** 19 hardcoded touch targets → `var(--touch-target-min)`, ~55 hardcoded margins → spacing variables across 13 CSS files
  - **Passing:** Heading hierarchy, ARIA labels (19+ instances), focus-visible (30+ rules), alt text, sr-only (19 instances), skip links
  - **Remaining:** `page-utility.css` has ~26 editorial prose margins (low priority)
- [x] **5.3** Performance review — lazy loading, code splitting, image optimization
  - **Report:** `/reports/2026-03/2026-03-15-performance-review.md`
  - **Fixed:** 13 images missing `loading="lazy"` across 9 component files (CTA, RoomTypes, HighlightsGrid, AuthorBio, ImageCarousel ×3, ConservationSection, SustainabilityPattern, EnquiryModal, MegaMenu ×5)
  - **Cleaned:** Removed 3 duplicate destination archive routes, 1 unused import
  - **Added:** 4 new pages (Gallery, Testimonials, Partners, Careers) with lazy-loaded routes, mock data, BEM CSS, hero content, and breadcrumbs
  - **Reorganized:** Account routes nested under `/account/*` with legacy flat-path fallbacks
  - **Confirmed:** All 80+ page routes use `React.lazy()` code splitting; Hero image correctly eager (LCP)
- [ ] **5.4** Mobile responsiveness audit — verify all templates at mobile/tablet breakpoints
- [ ] **5.5** Cross-template navigation verification — ensure all inter-page links resolve correctly

---

## Phase 6: Full Audit Findings (2026-03-18)

**Report:** `/reports/2026-03/2026-03-18-full-audit.md`

### 6.1 Icon Library Migration — Phosphor Icons (lucide-react → @phosphor-icons/react)

**Direction:** Make `@phosphor-icons/react` the default icon library. Migrate remaining `lucide-react` imports to Phosphor equivalents. Both packages coexist during migration.

**Trigger Words:** `audit phosphor` (scan) → `migrate phosphor` (execute batch)

**Status:** Not started — run `audit phosphor` first to generate the migration plan and batch files.

- [ ] **6.1.0** Run `audit phosphor` to scan codebase and generate migration report + batch assignments
- [ ] **6.1.1** Execute Batch 1 — Quick wins (simple 1:1 icon swaps)
- [ ] **6.1.2** Execute Batch 2 — Standard migrations (multiple icons per file)
- [ ] **6.1.3** Execute Batch 3 — Complex components (dynamic icon resolution, prop passing)
- [ ] **6.1.4** Execute Batch 4 — shadcn/ui primitives (migrate last, may need type wrappers)
- [ ] **6.1.5** Final cleanup — remove `lucide-react` from package.json, update all guideline references

### 6.2 Orphaned Page Cleanup — P1

- [ ] **6.2.1** Verify DestinationRouter.tsx imports DestinationCountryPage, DestinationRegionPage, DestinationSingle
- [ ] **6.2.2** Archive or delete DestinationsArchiveEnhanced.tsx (superseded)
- [ ] **6.2.3** Archive or delete DestinationsArchiveSimple.tsx (superseded)
- [ ] **6.2.4** Archive or delete DestinationsArchiveTest.tsx (test file)

### 6.3 Image Lazy Loading — P2

- [ ] **6.3.1** Audit all `<img>` tags for missing `loading="lazy"` on below-the-fold images
- [ ] **6.3.2** Add lazy loading to card components (TourCard, DestinationCard, AccommodationCard, etc.)