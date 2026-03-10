# Design System Contract — Task List

**Generated:** 2026-03-03
**Source:** `/reports/2026-03-03-design-system-contract-audit.md`
**Prompt:** `/prompts/design-system-contract-audit.md`

---

## Phase 1: Critical Fixes (Container Contract + Docs Alignment)

### 1.1 Container Max-Width (Critical — 3 files)

- [x] `global.css:283` — Replace `max-width: 1440px` with `max-width: var(--container-max-width)` ✅ Done 2026-03-04
- [x] `wordpress-classes.css:138` — Replace `max-width: 1440px` with `max-width: var(--container-max-width)` ✅ Done 2026-03-04
- [x] `parts/header.css:55` — Replace `max-width: 1440px` with `max-width: var(--container-max-width)` ✅ Done 2026-03-04

### 1.2 Documentation Token Alignment (Low — 3 docs)

- [x] `guidelines/design-tokens/colors.md` — Update colour hex values to match current `theme-light.css` and `theme-dark.css` (v5.0 palette) ✅ Done 2026-03-04
- [x] `guidelines/design-tokens/shadows.md` — Update shadow values to match current elevation tokens in theme-light.css (`0px 1px 2px` not `0px 4px 0px`) ✅ Done 2026-03-04
- [x] `guidelines/design-tokens/borders.md` — Update border colour hex values to match current `--border` token (`#BDBDBD` light / `#404040` dark) ✅ Done 2026-03-04

---

## Phase 2: Card Grid Column Progression (High — 1 file)

- [x] `patterns/card-grid.css:52` — Change 2-col breakpoint from `480px` to `640px` ✅ Done 2026-03-04
- [x] `patterns/card-grid.css:63` — Change 3-col breakpoint from `768px` to `1024px` ✅ Done 2026-03-04
- [x] `patterns/card-grid.css:73` — Change 4-col breakpoint from `1024px` to `1280px` ✅ Done 2026-03-04
- [x] `patterns/card-grid.css:82` — Keep 5-col at `1440px` (matches contract) ✅ Confirmed 2026-03-04
- [x] `patterns/card-grid.css:90` — Change 6-col breakpoint from `1600px` to `1680px` ✅ Done 2026-03-04
- [x] **card-grid.css v2.0.0** — Full rewrite with BEM modifier classes (`--cols-2` through `--cols-6`), gap modifiers (`--gap-sm/md/lg`), list layout, grid item class. ✅ Done 2026-03-06

---

## Phase 3: Margin Elimination — Patterns (High — 28 instances)

### 3.1 High Priority (card components — visible on every page)

- [x] `patterns/feature-card.css:49` — `margin-bottom: 1rem` → use `gap` on parent ✅ Done 2026-03-04 (converted to flex-column + gap)
- [x] `patterns/feature-card.css:80` — `margin-bottom: 0.5rem` → use `gap` on parent ✅ Done 2026-03-04 (removed, parent gap handles)
- [x] `patterns/team-card.css:116,123,145,158` — Convert all `margin-bottom` to flex-column `gap` ✅ Already clean (previous migration)
- [x] `patterns/blog-card.css:112,140,154` — Convert all `margin-bottom` to flex-column `gap` ✅ Already clean (previous migration)

### 3.2 Medium Priority (layout patterns)

- [x] `patterns/mobile-menu.css:213,214,302,355` — Convert margins to gap/padding ✅ Done 2026-03-04
- [x] `patterns/featured-section.css:46` — `margin-top: 3rem` → `padding-block-start` or parent `gap` ✅ Already clean (previous migration)
- [x] `patterns/sitemap-grid.css:26,27,58` — Negative margins removed, spacing/transitions tokenized ✅ Done 2026-03-04

### 3.3 Review Required (editorial prose)

- [x] `patterns/editorial-content.css:172,194,199,221,236,258,279,308` — These are `margin-block` on prose elements (`blockquote`, `table`, `figure`, `hr`, `ul`, `ol`). **EXEMPT per human review — semantic prose flow margins.** ✅ Confirmed exempt 2026-03-04

---

## Phase 4: Margin Elimination — Parts (High — 11 instances)

### 4.1 Header

- [x] `parts/header.css:237` — `margin-top: 0.5rem` → padding or gap ✅ Done 2026-03-04
- [x] `parts/header.css:329` — `margin-top: 0.125rem` → padding ✅ Done 2026-03-04
- [x] `parts/header.css:347` — `margin-bottom: 0.125rem` → padding ✅ Done 2026-03-04
- [x] `parts/header.css:482` — `margin-bottom: 1rem` → gap on parent ✅ Done 2026-03-04
- [x] `parts/header.css:515` — `margin-bottom: 1rem` → gap on parent ✅ Done 2026-03-04

### 4.2 Footer

- [x] `parts/footer.css:41` — `margin-bottom: 3rem` → `padding-bottom` or parent `gap` ✅ Done 2026-03-04
- [x] `parts/footer.css:68` — `margin-bottom: 1rem` → gap on parent ✅ Done 2026-03-04
- [x] `parts/footer.css:96` — `margin-bottom: 1.5rem` → gap ✅ Done 2026-03-04
- [x] `parts/footer.css:104` — `margin-bottom: 1rem` → gap ✅ Done 2026-03-04
- [x] `parts/footer.css:114` — `margin-bottom: 0.75rem` → gap ✅ Done 2026-03-04
- [x] `parts/footer.css:201` — `margin-bottom: 1rem` → gap ✅ Done 2026-03-04
- [x] `parts/footer.css:251` — `margin-bottom: 1.5rem` → gap ✅ Done 2026-03-04
- [x] `parts/footer.css:273` — `margin-top: 0.125rem` → padding ✅ Done 2026-03-04

---

## Phase 5: Margin Elimination — Templates (High — 24 instances)

### 5.1 Home Template

- [x] `templates/home.css` — Already uses design tokens (var(--spacing-*)) ✅ Confirmed 2026-03-04

### 5.2 Single Tour Template

- [x] `templates/single-tour.css` — All 16 margin instances converted to padding/gap tokens ✅ Done 2026-03-04
- [x] All hardcoded rem values tokenized (gap, padding, border-radius, transitions)
- [x] Sticky sidebar `top` values use `var(--header-bar-height)` token

### 5.3 Archive Template

- [x] `templates/archive.css` — All 13 margin instances converted to padding/gap tokens ✅ Done 2026-03-04
- [x] All hardcoded rem values tokenized (gap, padding, transitions)
- [x] Sticky filter `top` and sidebar `top` use `var(--header-bar-height)` token
- [x] `z-index` values use `var(--z-sticky)` token

### 5.4 Single Template

- [x] `templates/single.css` — All 20+ margin instances converted ✅ Done 2026-03-04
- [x] Editorial prose margins (h2/h3/h4/p/li/ul/ol/blockquote/img) tokenized with `margin-block` (EXEMPT per human-review 3.3)
- [x] Layout grid gaps tokenized: `var(--spacing-gap-lg)` / `var(--spacing-gap-xl)`
- [x] Sidebar, gallery, related, author sections fully tokenized
- [x] ToC sticky `top` uses `var(--header-bar-height)`, z-index uses `var(--z-sticky)`

---

## Phase 6: Desktop-First Media Query Migration (Medium — 21 instances)

Convert all `@media (max-width:)` to mobile-first `@media (min-width:)`:

### 6.1 Pattern CSS

- [x] `hero.css:398` — `max-width: 640px` → refactor to mobile-first base ✅ Done (prior session)
- [x] `card-grid.css:197` — `max-width: 640px` → refactor ✅ Done (prior session)
- [x] `faq.css:250` — `max-width: 640px` → refactor ✅ Done (prior session)
- [x] `cta.css:318` — `max-width: 640px` → refactor ✅ Done (prior session)
- [x] `editorial-content.css:349` — `max-width: 640px` → refactor ✅ Done (prior session)
- [x] `cards.css:333,483` — `max-width: 640px` → refactor ✅ Done (prior session)
- [x] `archive-header.css:123` — `max-width: 640px` → refactor ✅ Done (prior session)
- [x] `fast-facts.css:207` — `max-width: 640px` → refactor ✅ Done (prior session)
- [x] `related-content.css:163` — `max-width: 640px` → refactor ✅ Done (prior session)
- [x] `pagination.css:129` — `max-width: 640px` → refactor ✅ Done (prior session)
- [x] `breadcrumbs.css:165` — `max-width: 640px` → refactor ✅ Done (prior session)
- [x] `feature-card.css:170` — `max-width: 768px` → refactor ✅ Done (prior session)
- [x] `notification-banner.css:153` — `max-width: 640px` → refactor ✅ Done (prior session)

### 6.2 Template CSS

- [x] `home.css:402` — `max-width: 767px` → refactor ✅ Done 2026-03-04
- [x] `archive.css` — All max-width queries converted ✅ Done 2026-03-04
- [x] `archive-tours.css:126` — `max-width: 767px` → refactor ✅ Done 2026-03-04
- [x] `single.css` — All max-width queries converted ✅ Done 2026-03-04
- [x] `page-about.css` — All max-width queries converted ✅ Done 2026-03-04
- [x] `page-contact.css` — All max-width queries converted ✅ Done 2026-03-04
- [x] `page-faq.css` — All max-width queries converted ✅ Done 2026-03-04
- [x] `page-utility.css` — All max-width queries converted ✅ Done 2026-03-04
- [x] `page.css` — All max-width queries converted ✅ Done 2026-03-04

### 6.3 Part CSS

- [x] `header.css:640,707` — `max-width: 1023px` → refactor ✅ Done (prior session)

### 6.4 Shared CSS

- [x] `sections.css:262` — `max-width: 640px` → refactor ✅ Done (prior session)
- [x] `sections.css:891` — `max-width: 768px` → refactor ✅ Done (prior session)

### 6.5 Common/Component CSS (Additional — found in final sweep)

- [x] `common/back-to-top.css` — `max-width: 639px` → mobile-first ✅ Done 2026-03-04
- [x] `common/view-all.css` — `max-width: 767px` → mobile-first ✅ Done 2026-03-04
- [x] `pages/design-system-showcase.css` — `max-width: 768px` → mobile-first ✅ Done 2026-03-04
- [x] `pages/design-system-example.css` — `max-width: 768px` → mobile-first ✅ Done 2026-03-04
- [x] `pages/component-library.css` — `max-width: 768px` → mobile-first ✅ Done 2026-03-04
- [x] `components/card.css` — `max-width: 768px` → mobile-first ✅ Done 2026-03-04
- [x] `blocks/tour-operator/TourSustainability.css` — `max-width: 640px` → mobile-first ✅ Done 2026-03-04
- [x] `blocks/tour-operator/BestTimeToVisit.css` — `max-width: 480px` → mobile-first ✅ Done 2026-03-04
- [x] `blocks/tour-operator/Health.css` — `max-width: 640px` → mobile-first ✅ Done 2026-03-04

**Phase 6 Status:** ✅ COMPLETE — Zero `max-width` queries remain in production CSS. Only `breakpoint-system.css` documentation file retains intentional "avoid" examples.

---

## Phase 7: Verification & Regression (Post-Implementation)

- [ ] Visual regression check at **320px** (mobile floor)
- [ ] Visual regression check at **480px** (large phone)
- [ ] Visual regression check at **640px** (2-column activation)
- [ ] Visual regression check at **768px** (tablet)
- [ ] Visual regression check at **1024px** (desktop / 3-column)
- [ ] Visual regression check at **1280px** (4-column activation)
- [ ] Visual regression check at **1440px** (5-column activation)
- [ ] Visual regression check at **1600px** (container max-width boundary)
- [ ] Visual regression check at **1680px** (6-column activation)
- [ ] Visual regression check at **1920px** (design ceiling)
- [ ] Dark mode contrast verification (WCAG AA)
- [ ] Run compliance scorecard
- [ ] Human review sign-off on flagged items

---

**Total Tasks:** ~95
**Estimated Effort:** Phase 1-2 (quick, ~30 min) | Phase 3-5 (medium, ~4 hrs) | Phase 6 (medium, ~2 hrs) | Phase 7 (manual, ~2 hrs)

---

## Additional Token Migration (Completed 2026-03-04)

Beyond the audit tasks above, the following global.css hardcoded values were migrated to design system tokens:

- [x] **Buttons** — `gap`, `padding`, `transition` → `var(--spacing-element-*)`, `var(--transition-base)`
- [x] **Cards** — `padding`, `margin-bottom`, `transition` → `var(--spacing-element-*)`, `var(--transition-base)`
- [x] **Forms** — `margin-bottom`, `padding`, `transition` → `var(--spacing-element-*)`, `var(--transition-base)`
- [x] **Links** — `transition` → `var(--transition-base)`
- [x] **Quotes** — `padding-left`, `margin` → `var(--spacing-element-md)`
- [x] **Code** — `border-radius` → `var(--radius-sm)`
- [x] **Images** — `margin-top` → `var(--spacing-element-xs)`
- [x] **Header nav** — `gap` → `var(--spacing-element-xs)`
- [x] **Mega menu** — `margin-top`, `z-index` → `var(--spacing-element-xs)`, `var(--z-dropdown)`
- [x] **Mobile menu** — `z-index` → `var(--z-overlay)`
- [x] **Container** — `max-width` variants → `var(--container-max-width-*)`
- [x] **Header inner** — `padding` → `var(--spacing-container-*)`

### Homepage CSS (home.css) Token Migration:
- [x] All 6 grid gaps: `1.5rem` → `var(--spacing-gap-sm)`
- [x] Section eyebrow: `gap`, `letter-spacing` → tokens
- [x] View-all button: `gap`, `padding`, `margin-top`, `transition` → tokens
- [x] CTA section: `margin-bottom`, `gap`, `padding`, `transition`, `box-shadow` → tokens

### Pattern CSS Token Migration:
- [x] `section-header.css` — All hardcoded margins/gaps/letter-spacing → tokens
- [x] `view-all.css` — `margin-top` → tokens, icon class added
- [x] `conservation-section.css` — Title accent class (replaced Tailwind `text-primary italic`)
- [x] `feature-card.css` — Converted to flex-column + gap, tokenized padding/transitions/backgrounds