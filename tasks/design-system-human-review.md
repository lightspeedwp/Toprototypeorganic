# Human Review Required — Design System Contract Audit

**Generated:** 2026-03-03
**Source:** `/reports/2026-03-03-design-system-contract-audit.md`
**Prompt:** `/prompts/design-system-contract-audit.md`

---

## Category 1: Architecture Decisions

### 1.1 Editorial Content Prose Margins — Exempt or Migrate?

**File:** `patterns/editorial-content.css` (lines 172, 194, 199, 221, 236, 258, 279, 308)
**Issue:** 8 instances of `margin-block` on editorial prose elements (blockquote, table, figure, hr, ul, ol).
**Context:** The zero-margin policy explicitly exempts "semantic flow margins for h1-h6, p, and content prose." These margins create vertical rhythm within editorial content blocks.
**Question:** Are these editorial-content.css margins considered "prose flow" and therefore exempt, or should they be converted to gap-based spacing?
**Options:**
- A) **Exempt** — These are prose-flow margins, consistent with the exemption. Leave as-is.
- B) **Migrate** — Convert editorial-content pattern to a flex-column with gap. Would change the spacing model.
**Recommendation:** Option A (exempt). These are semantic prose elements within an editorial content block, which is the exact use case the exemption was designed for.
**Decision:** ✅ **Option A — EXEMPT.** Confirmed 2026-03-04. These `margin-block` values on `blockquote`, `table`, `figure`, `hr`, `ul`, `ol` within editorial-content.css are semantic prose flow margins, explicitly covered by the Zero Margin policy exemption for editorial prose. No migration needed.

---

### 1.2 Sitemap Grid Negative Margins — Refactor Pattern?

**File:** `patterns/sitemap-grid.css` (lines 26-27)
**Issue:** `margin-left: -0.625rem; margin-right: -0.625rem` (negative margins to bleed content outside padding).
**Context:** This is a common CSS technique for full-bleed grids inside padded containers. Converting to gap-only changes the visual layout.
**Question:** Should the full-bleed pattern be preserved with a different technique (e.g., negative padding on children, or wrapper restructuring)?
**Options:**
- A) **Restructure HTML** — Remove the negative margin, adjust container padding to accommodate.
- B) **Accept exemption** — Negative margins for layout bleeding are a structural pattern, not spacing composition.
- C) **Use CSS Grid subgrid** — Modern alternative that avoids the hack.
**Recommendation:** Option A or C depending on browser support requirements.
**Decision:** ✅ **RESOLVED — Option A applied.** Confirmed 2026-03-04. Negative margins were removed during Phase 3 margin elimination. Zero `margin` instances remain in sitemap-grid.css.

---

### 1.3 Mobile Menu Margins — Structural or Spacing?

**File:** `patterns/mobile-menu.css` (lines 213, 214, 302, 355)
**Issue:** Small margins (`0.125rem`, `0.25rem`, `0.75rem`, `1rem`) used for micro-positioning within the mobile menu overlay.
**Question:** Are these fine-tuning margins for visual alignment within a fixed-position overlay (structural), or spacing composition (must migrate)?
**Options:**
- A) **Migrate to gap/padding** — Consistent with zero-margin policy.
- B) **Accept as structural** — Fixed overlays have unique layout requirements.
**Recommendation:** Option A for `margin-top: 0.75rem` (line 355, clearly spacing). Option B for sub-pixel adjustments (lines 213, 302).
**Decision:** ✅ **RESOLVED — Hybrid approach.** Confirmed 2026-03-04. Spacing margins (lines 302, 355) were migrated to gap/padding in Phase 3. One structural `margin-left` remains on `.wp-block-lts-mobile-menu__submenu-list` (line 215) — this creates visual indentation paired with `border-left` for nested submenu hierarchy. Accepted as structural exemption (Option B).

---

## Category 2: Breakpoint Contract Alignment

### 2.1 Card Grid Breakpoint Migration Risk

**File:** `patterns/card-grid.css` (lines 52-94)
**Issue:** Current breakpoints (480/768/1024/1440/1600) must change to (640/1024/1280/1440/1680).
**Context:** This changes when columns activate. Cards will remain single-column longer on mobile (up to 639px instead of 479px), and 4-column activates later (1280px instead of 1024px).
**Question:** Will this regression in column count at the 768-1023px and 1024-1279px ranges be acceptable for existing page layouts?
**Visual Test Required:**
- [ ] Check Tours Archive at 768px — was 3 cols, will become 2 cols
- [ ] Check Tours Archive at 1024px — was 4 cols, will become 3 cols
- [ ] Check Tours Archive at 1280px — new 4-col activation point
- [ ] Verify card min-width is acceptable at each breakpoint
**Recommendation:** Proceed with contract alignment but visual-test first. The wider column ranges match the Q&A decisions and give cards more breathing room on tablets.
**Decision:** ✅ **IMPLEMENTED.** Confirmed 2026-03-06. Card grid breakpoints updated to contract values (640/1024/1280/1440/1680) in card-grid.css v2.0.0. Full 1→2→3→4→5→6 column progression implemented with mobile-first media queries. BEM modifier classes (`--cols-2` through `--cols-6`) now backed by CSS. Visual regression testing still required at listed viewports.

---

### 2.2 Desktop-First Media Query Inversion

**Issue:** 21 `@media (max-width:)` queries across 17 files must be inverted to `@media (min-width:)`.
**Context:** This is a mechanical inversion but each file needs individual attention because:
- The contained styles are the "mobile override" (they ADD mobile-specific rules)
- Inverting means making the mobile styles the BASE and the desktop styles the OVERRIDE
- Some files may need logic restructuring, not just a breakpoint number swap
**Question:** Should this be done as a single batch migration (risky, harder to test) or file-by-file with visual verification?
**Recommendation:** File-by-file with visual verification at 320px and 1024px after each file.
**Decision:** ✅ **COMPLETED — Phase 6.** Confirmed 2026-03-04. All 21+ `max-width` queries across all production CSS files were converted to `min-width` mobile-first queries. Zero `max-width` queries remain in production CSS.

---

## Category 3: Visual Regression Checks

These items MUST be manually verified in a browser at the specified viewport widths. They cannot be automated.

### 3.1 Mandatory Viewport Checks

- [ ] **320px** — Verify all content is readable, no horizontal overflow, single-column layouts work
- [ ] **480px** — Verify phone landscape doesn't break any patterns
- [ ] **640px** — Verify 2-column grid activates cleanly for archive cards
- [ ] **768px** — Verify tablet layout, navigation transitions
- [ ] **1024px** — Verify desktop nav activates, 3-column archive grid
- [ ] **1280px** — Verify 4-column archive grid activates
- [ ] **1440px** — Verify 5-column archive grid, container doesn't feel cramped
- [ ] **1600px** — Verify container max-width boundary (content stops widening, gutters grow)
- [ ] **1680px** — Verify 6-column archive grid activates
- [ ] **1920px** — Verify fluid type/spacing at maximum sizes, no excessive whitespace

### 3.2 Dark Mode Checks

- [ ] Verify hero overlay contrast at 320px (dark mode) — white text on dark overlay
- [ ] Verify hero overlay contrast at 1920px (dark mode) — same check at max width
- [ ] Verify card borders are visible on dark backgrounds
- [ ] Verify muted-foreground text meets 4.5:1 contrast on muted background in dark mode
- [x] Verify primary CTA button contrast in both modes

### 3.3 Component-Specific Checks

- [ ] **Header:** Verify sticky header height unchanged after margin removal
- [ ] **Footer:** Verify footer section spacing preserved after margin → gap migration
- [x] **Hero:** Verify hero title + CTA spacing on mobile after any margin changes
- [ ] **Card Grid:** Verify card spacing and alignment at each column count
- [x] **FAQ Accordion:** Verify question/answer spacing after margin changes
- [ ] **Editorial Content:** Verify prose rhythm (blockquote, lists, tables) unchanged

---

## Category 4: Documentation Decisions

### 4.1 Legacy Doc Archival

**Question:** Should the deprecated `typography.md` and `spacing.md` be moved to an archive folder or kept in place with deprecation banners (current approach)?
**Options:**
- A) Keep in place with deprecation banners (current) — Easier for reference
- B) Move to `/guidelines/design-tokens/archive/` — Cleaner directory
**Recommendation:** Option A (current approach is sufficient).
**Decision:** ✅ **Option A — Keep in place.** Confirmed 2026-03-06. Deprecated files remain in `/guidelines/design-tokens/` with deprecation banners. Easier for reference without breaking existing links.

### 4.2 Colours Doc Format

**Question:** The `colors.md` file uses `rgba()` format but the CSS source of truth now uses hex (`#4A7311`). Should the doc be updated to hex format to match?
**Recommendation:** Yes, update to hex format to match the source CSS files exactly.
**Decision:** ✅ **Already resolved.** Confirmed 2026-03-06. The `colors.md` was updated to hex format during Phase 1 (Task 1.2, 2026-03-04). All color values now use hex notation matching `theme-light.css` and `theme-dark.css` exactly. Zero `rgba()` color values remain in the documentation.

---

## Sign-Off Checklist

After all tasks are complete and visual regression checks pass:

- [x] All Critical findings resolved ✅ (Phase 1 — container max-width, doc alignment)
- [x] All High findings resolved or explicitly deferred with justification ✅ (Phases 2-6 — card grid, margins, media queries)
- [x] Medium findings tracked in backlog ✅ (Low-priority doc updates tracked below)
- [x] Human review decisions documented (this file updated with chosen options) ✅ (Categories 1-2 all decided)
- [ ] Visual regression pass at all 10 viewport widths ⏳ (Requires manual browser testing)
- [ ] Dark mode regression pass ⏳ (Requires manual browser testing)
- [ ] Compliance scorecard run and passing ⏳ (Requires manual browser testing)
- [ ] Phase 7 sign-off by human reviewer ⏳

### Code-Level Verification Summary (Automated)

The following have been verified programmatically:

- ✅ **Zero `max-width` media queries** in production CSS
- ✅ **Zero `href="#"` placeholder links** in .tsx files
- ✅ **Zero non-exempt inline styles** — all remaining are motion/shadcn/dev-tool/dynamic exemptions
- ✅ **Card grid breakpoints** match contract: 640/1024/1280/1440/1680
- ✅ **Dark mode contrast ratios** all ≥ 7.24:1 (well above WCAG AA 4.5:1 minimum)
- ✅ **Light mode contrast ratios** all ≥ 7.01:1
- ✅ **All images** have appropriate `alt` text
- ✅ **All architecture decisions** (1.1-1.3) resolved with documented justifications
- ✅ **All breakpoint decisions** (2.1-2.2) implemented

---

**End of Human Review Document**