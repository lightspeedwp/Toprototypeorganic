# Memory Optimization Prompt (Revised)

**Prompt Type:** Codebase Analysis & Optimization
**Created:** March 2, 2026
**Revised:** March 5, 2026
**Category:** Performance & Architecture
**Related Report:** `/reports/2026-03/memory-reduction-audit-march-5.md`
**Related Tasks:** `/tasks/memory-reduction-tasks.md`

---

## Objective

Reduce the LSX Design codebase memory footprint by splitting oversized files, consolidating duplicate data, removing orphaned CSS, flattening component nesting, and enforcing DRY architecture across templates, patterns, data, and CSS.

---

## Audit Scope (6 Pillars)

### 1. Break Up Large Files

**Thresholds:**
- **Critical:** > 1,000 lines (split immediately)
- **High:** 500-1,000 lines (split or refactor)
- **Medium:** 300-500 lines (evaluate for extraction)

**File Categories:**
| Category | Location | Count | Total Lines |
|----------|----------|-------|-------------|
| Templates (TSX) | `/src/app/components/templates/` | 159 | ~36,000 |
| CSS Templates | `/src/styles/templates/` | 145+ | ~78,000 |
| Patterns (TSX) | `/src/app/components/patterns/` | 105 | ~16,000 |
| CSS Patterns | `/src/styles/patterns/` | 90+ | ~18,000 |
| Data Files | `/src/app/data/` | 126 | ~26,500 |
| Routes | `/src/app/routes.tsx` | 1 | 1,147 |
| Utilities | `/src/app/utils/` | 6 | 2,325 |

**Splitting Strategies:**
- **routes.tsx (1,147 lines):** Split into route groups (`/routes/about.ts`, `/routes/services.ts`, `/routes/solutions.ts`, etc.) with a barrel file
- **Data files > 500 lines:** Split by sub-category (e.g., `faqs.ts` into `faqs/homepage.ts`, `faqs/services.ts`, etc.)
- **CSS > 800 lines:** Extract repeated sections into base/shared files or split by media query / section concern
- **Templates > 500 lines:** Extract repeated JSX into pattern components

### 2. Remove Duplicate and Orphaned CSS (DRY)

**Critical Finding: 31 "-optimized" CSS duplicates**

After Phase 3.3 optimization, 31 template CSS files exist in BOTH original and optimized versions. Both are loaded:
- Original imported at component level: `import '@/styles/templates/analytics-service.css'`
- Optimized imported globally via `index.css`: `@import './templates/analytics-service-optimized.css'`

**Action:** For each pair, determine which is active and delete the unused file. Update imports.

**Estimated Savings:** ~9,743 lines (optimized files) or more (original files) depending on which version is kept.

**Data File Consolidation:**
- `testimonials.ts` + `testimonials-extended.ts` + `testimonials-enhanced.ts` = 896 lines (3 files -> 1)
- `faqs.ts` + `faqs-extended.ts` = 1,587 lines (merge or split by page context)
- `pages.ts` + `site-pages.ts` + `site-pages/pages.ts` = 979 lines (clarify canonical source)
- `hosting.ts` + `hosting-page.ts` = 438 lines (merge into one)
- `why-choose-us.ts` + `why-choose-us-page.ts` = 440 lines (merge into one)

### 3. CSS File Review & Reduction

**Files > 800 lines (split candidates):**

| File | Lines | Action |
|------|-------|--------|
| `blocks/theme/site-header.css` | 1,051 | Split: base, mega-menu variants, responsive |
| `templates/page-journey-stage.css` | 1,050 | Split: hero, content sections, interactive |
| `templates/page-service-discovery.css` | 1,045 | Replace with optimized + base |
| `templates/page-services-landing.css` | 986 | Replace with optimized version |
| `templates/mailchimp-solution-page.css` | 961 | Extract shared solution styles |
| `templates/page-solution-tour-design.css` | 939 | Extract shared solution styles |
| `templates/page-solution-redesign.css` | 917 | Extract shared solution styles |
| `templates/page-service-development.css` | 891 | Replace with optimized + base |
| `templates/blog-index-page.css` | 848 | Split: hero, grid, sidebar, pagination |
| `templates/page-solution-ecommerce.css` | 844 | Extract shared solution styles |
| `templates/contact-page.css` | 840 | Split: hero, form, info, map |
| `templates/wetu-importer-page.css` | 833 | Split into sections |
| `templates/lsx-search-page.css` | 823 | Split: search, results, filters |
| `templates/about-base.css` | 823 | Already a base -- review for unused selectors |
| `blocks/theme/site-footer.css` | 817 | Split: base, widget areas, responsive |
| `utilities.css` | 805 | Split by category: grid, text, display, spacing |
| `section-styles.css` | 794 | Split by section variant |

### 4. Clean Up Layers & Components

**Hidden/Unused Layer Detection:**
- [ ] Scan for commented-out JSX in all templates
- [ ] Scan for unused imports (imported but never referenced in JSX)
- [ ] Scan for orphaned CSS files (no corresponding TSX component)
- [ ] Scan for orphaned data exports (exported but never imported)
- [ ] Identify and remove dead CSS selectors (classes not used in any TSX)

**Nested Layer Reduction:**
- [ ] Identify components with 5+ levels of `div` nesting
- [ ] Identify unnecessary wrapper `div` elements
- [ ] Replace nested `div`s with semantic HTML (`section`, `article`, `nav`, `aside`)
- [ ] Flatten component hierarchies where intermediate wrappers add no value

### 5. Flatten Complex SVGs & Vectors

**Note:** This project uses Phosphor Icons (no custom SVGs in `/src/imports/`). SVG optimization applies to:
- Inline SVG decorations in templates (gradient orbs, circuit patterns, etc.)
- CSS-based SVG backgrounds
- Any future SVG imports

**Actions:**
- [ ] Audit inline SVG complexity in hero sections
- [ ] Replace complex SVG decorations with CSS equivalents where possible
- [ ] Ensure CSS `background-image` SVGs are minified

### 6. Trim Component Variants

**Variant Analysis Targets:**
- [ ] Hero pattern: How many variant props? Can any be merged?
- [ ] Card patterns (PostCard, PortfolioCard, ServicesCard): Consolidate shared styling
- [ ] CTA patterns (FunkyCTA, CTAInline, CTASection, GradientCTASection): 4 CTA patterns -- can any merge?
- [ ] Stats patterns (StatsGrid, StatsSection, StatCounter): 3 stats patterns -- consolidate?
- [ ] Testimonial patterns (TestimonialCard, TestimonialGrid, TestimonialSlider, TestimonialInline, FeaturedTestimonial, VideoTestimonial, ServiceTestimonial, ServiceTestimonials): 8 testimonial patterns -- reduce to 3-4?
- [ ] Related patterns (RelatedPosts, RelatedServices, RelatedServicesGrid, RelatedServicesInPhase, RelatedContentWidget): 5 related patterns -- consolidate?

**Property Conversion:**
- Replace variants that differ only by color with a `color` prop
- Replace variants that differ only by size with a `size` prop
- Replace variants that differ only by layout with a `layout` prop

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Files > 1,000 lines | Reduce from 10 to 0 |
| Duplicate CSS pairs eliminated | 31 pairs resolved |
| Data file consolidation | ~3,000 lines saved |
| CSS total reduction | 15-20% (~17,000-23,000 lines) |
| Average CSS file size | Reduce from 264 to < 200 lines |
| Component pattern count | Reduce testimonial patterns from 8 to 4 |
| routes.tsx | Split from 1,147 lines to < 200 per file |

---

## Execution Order

1. **Phase 1 (Quick Wins):** Resolve 31 duplicate CSS pairs, consolidate duplicate data files
2. **Phase 2 (File Splitting):** Split routes.tsx, split CSS files > 800 lines, split data files > 500 lines
3. **Phase 3 (Pattern Consolidation):** Merge similar patterns (testimonials, CTAs, stats, related)
4. **Phase 4 (Layer Cleanup):** Remove unused imports, orphaned files, flatten nesting

---

## Design System Compliance (Non-Negotiable)

All changes MUST maintain:
- [ ] 100% CSS variable usage (`var(--font-primary)`, `var(--spacing-*)`, `var(--primary)`, etc.)
- [ ] WordPress utility classes only (`.wp-*` prefix, no Tailwind)
- [ ] Font faces from CSS only (`var(--font-primary)` for Lexend, `var(--font-secondary)` for Manrope)
- [ ] User can update entire site styling by editing CSS files alone
- [ ] Reduced motion support (`prefers-reduced-motion`)
- [ ] WCAG 2.1 AA compliance

---

## Deliverables

1. **Audit Report:** `/reports/2026-03/memory-reduction-audit-march-5.md`
2. **Task List:** `/tasks/memory-reduction-tasks.md`
3. **Updated General Task List:** `/tasks/task-list.md` (add follow-up items)

---

**End of Prompt**
