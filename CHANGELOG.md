# Changelog

All notable changes to the LightSpeed Tour Operator prototype are documented in this file.

---

## [Unreleased] - March 13, 2026

### Added
- **Trigger Word System** — Type "cleanup" or "continue" in chat to execute prompts automatically. Configured in `/guidelines/Guidelines.md` and documented in `/guidelines/prompts/trigger-words.md`.
- **`/prompts/cleanup.md` v2.0** — Comprehensive single-session cleanup prompt covering 6 phases: filesystem, imports/routes, tasks/reports, status updates, dynamic page sync, and summary. Replaces `/prompts/utilities/housekeeping-audit.md` as the primary cleanup tool.
- **`/prompts/continue.md` v2.0** — Simplified continue prompt that resumes next unchecked task from `task-list.md`. Includes Figma Make environment reminder, design system compliance rules, and large-task handling.
- **`/guidelines/prompts/trigger-words.md`** — Trigger word reference documentation with registration rules.
- **`/guidelines/prompts/report-naming.md`** — Naming conventions for reports, tasks, and cleanup rules including protected files list.
- **Guidelines.md v3.1** — Added trigger words section, environment reminder, and updated file structure trees to include `/guidelines/prompts/` folder.
- **SitemapPage data-driven rebuild** - Completely rebuilt `/src/app/pages/SitemapPage.tsx` as a fully data-driven page importing real mock data from all content modules (Tours, Destinations, Accommodation, Blog, Reviews, Team, Specials) and all taxonomies (Travel Styles, Continents, Accommodation Types, Brands, Blog Categories, Blog Tags). Features 14 sitemap sections, dynamic stats bar, lucide-react icons, and discovery CTA.
- **Sitemap BEM CSS** - Created `/src/styles/pages/sitemap.css` (220 lines) with full BEM architecture using design system tokens for grid layout, section headers, link lists, stats bar, and discovery section.
- **Phase 1.3 Organic Redesign Audit** - Comprehensive audit of organic theme implementation: 92/100 compliance score, all 7 token files verified, 13 override CSS files audited, 6 SVG assets confirmed, 0 inline styles, 0 dark: classes, 0 non-approved fonts. Report: `/reports/2026-03-13-organic-redesign-audit.md`
- **Phase 1.4 Design System Contract Audit (Re-Run)** - Full 6-contract audit (A–F): 98% compliance, 0 Critical, 0 High, 1 Medium (mega-menu desktop-first query), 2 Low (doc drifts). Zero regressions since March 3. Report: `/reports/2026-03-13-design-system-contract-audit-rerun.md`
- **Phase 3.1 Asia Destinations Expansion** — Added 5 new countries with full countryInfo (10 sections each) and 14 regions across 2 sessions: Sri Lanka (Kandy, Ella, Galle), Vietnam (Hanoi, Hoi An, Ha Long Bay), Indonesia (Bali, Komodo National Park, Raja Ampat), Japan (Kyoto, Tokyo, Hokkaido), Cambodia (Siem Reap, Phnom Penh). All content in organic voice/tone. Asia now has 6 countries, 22 destinations total (dest-57 to dest-75). Continents taxonomy and aggregator index fully updated.
- **Phase 3.1 Europe Destinations Expansion** — Added 4 new countries with full countryInfo (10 sections each) and 8 regions: Portugal (Lisbon, Porto), Italy (Tuscany, Amalfi Coast), Greece (Santorini, Crete), Iceland (South Coast, Golden Circle). All content in organic voice/tone. Europe now has 4 countries, 12 destinations total (dest-76 to dest-87). Continents taxonomy and Europe aggregator index fully updated.
- **Phase 3.2 Accommodation Expansion (Session 1)** — Added 16 new luxury properties across Asia and Europe (acc-25 to acc-40): Thailand (Mandarin Oriental Bangkok, Six Senses Yao Noi), Japan (Hoshinoya Kyoto, Park Hyatt Tokyo), Sri Lanka (Wild Coast Tented Lodge), Vietnam (Sofitel Legend Metropole Hanoi), Indonesia (COMO Shambhala Estate), Cambodia (Shinta Mani Wild), Portugal (Vermelho Hotel, The Yeatman), Italy (Castello di Vicarello, Belmond Hotel Caruso), Greece (Canaves Oia Epitome, Blue Palace Elounda), Iceland (The Retreat at Blue Lagoon, Deplar Farm). Accommodation types taxonomy updated, destination cross-references wired, new module files `properties-asia.ts` and `properties-europe.ts`. Total: 40 properties (24 Africa + 8 Asia + 8 Europe).
- **Phase 3.2 Accommodation Expansion (Session 2 — COMPLETE)** — Added 10 final properties (acc-41 to acc-50): Mobile Camps (Great Plains Duba Explorers, Asilia Olakira Migration Camp), Guesthouses (Casa Mãe Lagos, Masseria Torre Maizza), Africa (Segera Retreat Laikipia, Jack's Camp Makgadikgadi), Asia (Aman Tokyo, Six Senses Ninh Van Bay), Indian Ocean (North Island Seychelles, Soneva Fushi Maldives). All 10 accommodation types now populated. Total: **50 properties** across 3 continents + Indian Ocean. Phase 3.2 COMPLETE.
- **Phase 3.3 Tours Expansion (COMPLETE)** — Added 26 new tours across Asia and Europe (tour-36 to tour-61): Thailand (2), Japan (3), Sri Lanka (2), Vietnam (2), Indonesia (1), Cambodia (1), multi-country Asia (2), Portugal (3), Italy (3), Greece (3), Iceland (3), multi-country Europe (1). All tours in organic voice/tone with detailed narrative content, travel style taxonomy fully updated with all 61 tour IDs. New modular files `tours-asia.ts` and `tours-europe.ts` with `ALL_TOURS` aggregator. Total: **61 tours** across 10 travel styles, 3 continents. Phase 3.3 COMPLETE.
- **Guidelines.md v4.0 Restructured** — Reduced from ~1300 lines to ~350 lines by extracting duplicated content into modular rule files. Created `/guidelines/rules/` (3 files: design-system-rules, file-organization, workflow). Created `/guidelines/_templates/` (7 templates: design-token, component, pattern, general, report, prompt, task-list) with meta-guide `_templates.md`. Created 8 new design token guideline files (animations, buttons, dark-light-mode, iconography, responsive, forms, touch-targets, navigation). Total design token files: **17**. Created `/prompts/report-processor-orchestrator.md` for automated report-to-task processing. Created `/prompts/guidelines-audit.md` for systematic guideline file auditing.
- **Reports Cleanup** — Archived 2 fully resolved reports (inline-styles-audit: 100% compliant, light-dark-mode-audit: all findings fixed). Verified 3 active reports are within 7-day window with open findings.

### Fixed
- **Mega-menu desktop-first query** - Refactored `mega-menu.css` from `@media (max-width: 1024px) { display: none }` to mobile-first pattern: base `display: none` + `@media (min-width: 1025px) { display: block }`. Resolves Contract D violation.
- **MODERN-TYPOGRAPHY.md doc drift** - Added missing `--text-2xs` token (micro: 10px→12px) to body scale, responsive table, fluid utility classes, and migration section. Fixed Caveat/Shadows Into Light font fallback stacks to match `theme-base.css` exactly.
- **Organic dark mode backgrounds** - Fixed CSS selector specificity issue

### Removed
- **Root orphaned files** — Deleted 12 files from root: `fix_margins.js`, `fix_syntax.js`, `fix_syntax2.js`, `check_icons.cjs`, `snippets.code-snippets`, `test_sync.txt`, `main.ts`, `preview-head.html`, `preview.ts`, `preview.tsx`, `_/husky.sh`, `workflows/design-system-compliance.yml`
- **Source orphaned scripts** — Deleted 13 files from `/src/`: `check-icons.ts`, `check_contrast.js`, `contrast.js`, `fix_button_script.js`, `fix_buttons.js`, `fix_margins.js`, `fix_margins2.js`, `fix_quote.js`, `fix_special_single.js`, `fix_text_10px.js`, `fix_text_length.js`, `test-icons.js`, `test_border.js`
- **Temp sandbox** — Deleted `/tmp/sandbox/` folder (4 files)
- **Superseded reports** — Deleted 4 reports superseded by newer versions: `2026-03-01-file-optimization-audit.md`, `2026-03-10-organic-redesign-audit-report.md`, `2026-03-11-organic-redesign-audit.md`, `2026-03-11-design-system-contract-audit-organic.md`

### Changed
- **BreadcrumbsPattern nav padding** - Added `pt-2 pb-0` (8px top, 0px bottom) to breadcrumb nav element
- **Tour card price position** - Moved "From $X" price element to directly below the title (instead of bottom of card body) in both `DayAndDuskPage.tsx` and `OrganicLandingPage.tsx` for better visual hierarchy
- **Task list cleanup** - Archived 2 completed task files, removed 12 superseded reports (Feb 25 and Mar 3 batches), updated master task list with current project status
- **SitemapPage unused imports** - Removed unused lucide-react icons (Settings, Wrench) and unused data imports (FACILITIES, REVIEW_CATEGORIES, SPECIAL_CATEGORIES)
- **Task list updated** - Marked header dark mode fix as applied, added SitemapPage rebuild entry, updated status

### Cleanup — March 14, 2026

#### Removed
- `snippets.code-snippets` — Orphaned file, not in allowed root files list
- `main.ts` — Orphaned Storybook config (no Storybook dependency installed)
- `preview-head.html` — Orphaned Storybook config
- `preview.ts` — Orphaned Storybook config
- `preview.tsx` — Orphaned Storybook config (duplicate of preview.ts)

#### Verified
- CSS import chain (`index.css` → all 42+ referenced files) — All imports valid
- Route ↔ Page sync (`routes.ts` → all lazy-imported pages) — All 154 lazy imports valid
- `/tasks/` folder — Clean (master list only)
- `/reports/` folder — 3 active reports within 30-day window
- `/docs/` folder — Flagged for consolidation (multiple FINAL/CONFIRMED docs)

---

## [1.12.0] - March 11, 2026

### Added
- **Day & Dusk Landing Page** (`/organic-demo/day-and-dusk-page`) - Full light/dark mode landing page with:
  - WebGL sky shaders (`sky-day` bright blue gradient, `sky-dusk` amber/crimson sunset)
  - Savannah contour frame SVG overlay (light/dark variants)
  - Safari medallion with float animation
  - Botanical corner decorations
  - Dedicated BEM CSS classes in `/src/styles/organic/day-and-dusk.css`
  - All organic SVG assets switching between light/dark variants

### Added
- **Comprehensive Audit Phase 1.1** - Tailwind CSS audit (85% compliance, 120 files mapped)
- **Comprehensive Audit Phase 1.2** - Light/dark mode audit (97.5% WCAG AA)

### Fixed
- **Header navigation dark mode contrast** - Changed `var(--color-primary)` to `var(--accent-foreground)` in hover/active states. Dark mode contrast improved from 2.3:1 to 9.86:1 (WCAG AA)

---

## [1.11.0] - March 10, 2026

### Added
- **Organic Redesign Audit** - Initial audit of organic design implementation
- **Design System Contract Audit (Organic)** - Verification of organic compliance across 4 phases:
  - Phase 1: Organic Section Implementation (HomePage, ToursArchive, TourSingle)
  - Phase 2: Organic Typography Integration (Caveat + Shadows Into Light fonts)
  - Phase 3: Texture Overlays (subtle, medium, rich)
  - Phase 4: Token Enforcement (39 inline styles verified as exempt)

---

## [1.10.0] - March 7, 2026

### Changed
- **Task archive cleanup** - Deleted 73 completed task files, created archive manifest in `/tasks/archive/README.md`

---

## [1.9.0] - March 6, 2026

### Completed
- **Styles, Links & Assets Refactor** - All 3 phases: legal links, pagination semantics, social links, alt text, SiteLogo/RelatedRegions CSS variables
- **CSS Architecture Cleanup** - All 4 phases: inline style elimination, component audit, ESLint proposal

---

## [1.8.0] - March 4, 2026

### Added
- **Design System Contract Compliance** - Full CSS audit against WP-preset-first token contract:
  - 95/95 tasks completed across 6 phases
  - card-grid.css v2.0 created
  - Zero max-width queries, zero href="#", all contrast ratios >= 7:1

---

## [1.7.0] - March 3, 2026

### Added
- **File Optimization Audit** - CSS file structure analysis and optimization recommendations

---

## [1.6.0] - March 1, 2026

### Completed
- **WordPress BEM CSS Migration** - 100% of 27 user-facing pages migrated across 3 sessions:
  - Session 1: 8 pages (ContactPage, AccommodationSingle, BlogArchive, etc.)
  - Session 2: 7 pages (WhyBookWithUs, NewsletterSignup, TripPlanner, etc.)
  - Session 3: 3 pages (ReviewsHub, SavedPassengers, TourComparison)
  - 260+ BEM classes, 23 CSS files, 8,250+ CSS lines

---

## [1.5.0] - February 27, 2026

### Completed
- **Root Directory Cleanup** - 286 files moved/deleted, root reduced to config files only
- **Guidelines enforcement** - Strict root directory rules, file organization policies

---

## [1.4.0] - December 26, 2024

### Added
- **Split Theme Architecture** - Theme system split into `theme-light.css`, `theme-dark.css`, and `theme.css`
- **5 Auditing Utilities** - Component Auditor, Dark Mode Checker, Sample Auditor, Contrast Checker, Compliance Scorecard
- **Performance Monitor** - Core Web Vitals tracking (FCP, LCP, FID, CLS, TTI, Memory)
- **Modern Font Weight Scale** - H1 Bold (700), H2-H3 Semibold (600), H4-H6 Medium (500), Body Normal (400)

---

## [1.3.0] - December 25, 2024

### Added
- **Organic Design System** - SVG assets (Savannah contour frame, Safari medallion, Botanical corner), organic CSS variables, WebGL graphics support
- **Pattern Guidelines** - Section styles, navigation links, typography verification, archive patterns
- **5 Font System** - Lora (serif), Noto Sans (sans-serif), Courier New (monospace), Caveat (handwriting), Shadows Into Light (handwriting)

---

## [1.2.0] - Initial Release

### Added
- WordPress block theme prototype with React + Tailwind CSS v4
- 27 user-facing page templates
- 23 reusable components with BEM naming
- Design system with CSS custom properties
- Light/dark mode via CSS variables
- WCAG 2.1 AA accessibility compliance
- Template Browser developer tool
- Mock data for all content types (Tours, Destinations, Accommodation, Reviews, Blog, Team, Specials)