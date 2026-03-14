# Figma Make Prototype Guidelines

**Version:** V4.0 — Modular Architecture
**Last Updated:** March 13, 2026

---

## Trigger Words — Quick Commands

| Trigger | Action | Prompt File |
|---------|--------|-------------|
| **cleanup** | Run full project hygiene | `/prompts/cleanup.md` |
| **continue** | Resume next unchecked task | `/prompts/continue.md` |
| **cleanup then continue** | Run cleanup, then next task | Both in sequence |

Read the referenced prompt file and execute ALL instructions in a single session.

**Reference:** `/guidelines/prompts/trigger-words.md` — Full trigger word system
**Naming:** `/guidelines/prompts/report-naming.md` — Naming conventions

---

## Environment Reminder (Figma Make)

You are working inside **Figma Make** — a sandboxed web IDE.

**NEVER suggest:** "Refresh your browser", "Clear your cache", "Run npm install in your terminal", "Restart the dev server", "Open your terminal and run..."

All file changes are **live immediately**. Use only the available tools.

---

## Design System Rules (MANDATORY)

**📖 Full rules:** [`/guidelines/rules/design-system-rules.md`](rules/design-system-rules.md)

### The Two Non-Negotiable Rules

1. **CSS Variables ONLY** — No hardcoded colors, fonts, spacing, borders, radius, shadows
2. **5 Approved Fonts ONLY** — Lora, Noto Sans, Courier New, Caveat, Shadows Into Light

### Critical Prohibitions

- ❌ No inline `style={{ }}` attributes (2 exemptions: motion/react, dynamic CSS props)
- ❌ No `dark:` Tailwind classes (CSS variables handle dark mode)
- ❌ No hardcoded hex colors in CSS or JSX
- ❌ No margin utilities for layout (use flex/grid gaps)
- ❌ No Tailwind typography classes unless intentionally overriding defaults

### Required Practices

- ✅ CSS variables from `theme-base.css` / `theme-light.css` / `theme-dark.css`
- ✅ External `.css` files with BEM naming (`.wp-part-*`, `.wp-pattern-*`, `.wp-block-*`)
- ✅ Semantic HTML (`<h2>`, `<nav>`, `<article>`)
- ✅ Organic section wrappers for page layout sections

---

## File Organization

**📖 Full rules:** [`/guidelines/rules/file-organization.md`](rules/file-organization.md)

- Root directory: Config files only (package.json, tsconfig, etc.)
- Documentation → `/docs/`
- Reports → `/reports/` (archive → `/reports/archive/`)
- Tasks → `/tasks/` (archive → `/tasks/archive/`)
- Prompts → `/prompts/`
- Guidelines → `/guidelines/`
- Source code → `/src/`

---

## Workflow & Task Management

**📖 Full rules:** [`/guidelines/rules/workflow.md`](rules/workflow.md)

**Standard pattern:** Create Prompt → Run Audit → Save Report → Create Tasks → Update Master Task List

**Templates:** Use templates from `/guidelines/_templates/` for consistency.
**Template guide:** [`/guidelines/_templates.md`](_templates.md)

---

## Quick Start — Reading Order

**IMPORTANT: Follow these steps IN ORDER before writing any code.**

### Step 1: Architecture & Overview (REQUIRED)

- [`overview-components.md`](overview-components.md) — Component architecture, directory structure
- [`overview-patterns.md`](overview-patterns.md) — Block patterns, composition rules
- [`overview-icons.md`](overview-icons.md) — Icon system, verification process
- [`blocks/overview-blocks.md`](blocks/overview-blocks.md) — WordPress blocks & tour operator blocks
- [`blocks/overview-parts.md`](blocks/overview-parts.md) — Template parts reference
- [`blocks/overview-templates.md`](blocks/overview-templates.md) — Page template archetypes

### Step 2: Design Tokens (REQUIRED)

Read all files in [`design-tokens/`](design-tokens/):

| File | Coverage |
|------|----------|
| [`colors.md`](design-tokens/colors.md) | Semantic color system |
| [`typography.md`](design-tokens/typography.md) | Typography hierarchy |
| [`MODERN-TYPOGRAPHY.md`](design-tokens/MODERN-TYPOGRAPHY.md) | Fluid type scale details |
| [`spacing.md`](design-tokens/spacing.md) | Spacing scale |
| [`MODERN-SPACING.md`](design-tokens/MODERN-SPACING.md) | Fluid spacing details |
| [`borders.md`](design-tokens/borders.md) | Border styles |
| [`radii.md`](design-tokens/radii.md) | Border radius presets |
| [`shadows.md`](design-tokens/shadows.md) | Shadow/elevation presets |
| [`animations.md`](design-tokens/animations.md) | Transitions & easing |
| [`buttons.md`](design-tokens/buttons.md) | Button variants & sizing |
| [`dark-light-mode.md`](design-tokens/dark-light-mode.md) | Dual-theme system |
| [`iconography.md`](design-tokens/iconography.md) | Icon system |
| [`responsive.md`](design-tokens/responsive.md) | Breakpoints & fluid scaling |
| [`forms.md`](design-tokens/forms.md) | Form input styling |
| [`touch-targets.md`](design-tokens/touch-targets.md) | Interactive element sizes |
| [`navigation.md`](design-tokens/navigation.md) | Navigation styling |
| [`styles/section-styles.md`](styles/section-styles.md) | Section preset styles |

### Step 3: Component Guidelines (BEFORE using any component)

- [`components/Header.md`](components/Header.md) | [`components/Footer.md`](components/Footer.md)
- [`components/Hero.md`](components/Hero.md) | [`components/CardGrid.md`](components/CardGrid.md)
- [`components/CTA.md`](components/CTA.md) | [`components/Logo.md`](components/Logo.md)
- [`components/Container.md`](components/Container.md) | [`components/Typography.md`](components/Typography.md)
- [`components/ScrollBackToTop.md`](components/ScrollBackToTop.md) | [`components/ScrollDownArrow.md`](components/ScrollDownArrow.md)

### Step 4: Icon Guidelines (BEFORE using any icon)

- [`icons/travel.md`](icons/travel.md) — Travel-related icons
- [`icons/interface.md`](icons/interface.md) — UI control icons

**Always verify icons exist in lucide-react:**
```bash
grep "IconName" node_modules/lucide-react/dist/esm/icons/index.js
```

### Step 5: Pattern Guidelines

- [`patterns/section-styles.md`](patterns/section-styles.md) — Section composition & backgrounds
- [`patterns/navigation-links.md`](patterns/navigation-links.md) — Links, buttons, accessibility
- [`patterns/typography-verification.md`](patterns/typography-verification.md) — Typography standards
- [`patterns/archive-patterns.md`](patterns/archive-patterns.md) — Archive template system
- [`patterns/hero-patterns.md`](patterns/hero-patterns.md) | [`patterns/card-grid-patterns.md`](patterns/card-grid-patterns.md)
- [`patterns/cta-patterns.md`](patterns/cta-patterns.md) | [`patterns/editorial-content-patterns.md`](patterns/editorial-content-patterns.md)
- [`patterns/filter-patterns.md`](patterns/filter-patterns.md) | [`patterns/PostGrid.md`](patterns/PostGrid.md)

### Step 6: Write Code

Only after completing steps 1–5 should you begin writing code.

---

## Content Architecture

### Canonical Post Types (Fixed — do not invent new ones)

Tours, Destinations (hierarchical), Accommodation, Specials, Team, Reviews, Blog Posts, Core Pages (About, Contact, FAQ)

### Canonical Taxonomies

Travel Styles, Accommodation Types, Continents, Brands, Facilities, Blog Categories, Blog Tags

### Mock Data

All mock data in `/src/app/data/`. Always use data from mock files — never hardcode content.

---

## Page Archetypes

All pages must conform to one of these archetypes:

| Archetype | Example | Required Patterns (order) |
|-----------|---------|--------------------------|
| **Content Hub** | Tours Archive | Hero → Filter (opt) → Card Grid → FAQ → CTA (opt) |
| **Taxonomy Archive** | Adventure Tours | Archive Header → Tax Nav (opt) → Card Grid → Pagination → FAQ → CTA (opt) |
| **Single Detail** | Tour Detail | Hero → Editorial → Meta/Facts → Supporting (opt) → Related → FAQ → CTA |
| **Editorial Listing** | Blog | Listing Header → Card Grid → Pagination → FAQ (opt) |
| **Utility Page** | FAQ | Page Header → Editorial → Structured Block → CTA (opt) |

---

## WordPress-Native React Mapping

| React Location | WordPress Equivalent | Purpose |
|---------------|---------------------|---------|
| `/src/app/pages/` | `templates/*.html` | Page templates |
| `/src/app/components/parts/` | `parts/*.html` | Template parts |
| `/src/app/components/patterns/` | `patterns/*.php` | Block patterns |
| `/src/app/components/blocks/` | Core/custom blocks | Block implementations |
| `/src/app/components/common/` | Utility components | Shared utilities |
| `/src/app/components/ui/` | shadcn/ui library | UI primitives |
| `/src/app/data/` | Mock content | Content models |
| `/src/styles/` | `theme.json` + CSS | Design tokens |

### Import Conventions

All imports use **relative paths**. No absolute paths or webpack aliases.

```typescript
// From pages
import { Hero } from "../components/patterns/Hero";
import { cn } from "../lib/utils";
import { TOURS } from "../data/mock";
import type { Tour } from "../data/types";
```

---

## Accessibility Requirements (WCAG 2.1 AA)

1. **One H1 per page**, logical heading hierarchy (H1 → H2 → H3)
2. **Keyboard navigation** for all interactive elements
3. **Visible focus indicators** using `ring-ring`
4. **Color independence** — information not conveyed by color alone
5. **ARIA labels** on buttons, forms, and interactive elements
6. **Empty states** — explicit messages, never blank areas
7. **Touch targets** — minimum 44×44px (`var(--touch-target-min)`)
8. **Skip links** — provide skip-to-content where appropriate

---

## Critical Component Rules

1. **shadcn/ui only in `/ui/`** — Custom components go in appropriate category folders
2. **Read guidelines first** — Check component-specific docs before using any component
3. **WordPress mapping** — Every component maps to a WP block theme concept
4. **Mock data** — Import from `/src/app/data/`, never hardcode
5. **Design tokens** — CSS variables from `theme.css` for all styling
6. **No inline styles** — All styling via Tailwind classes or external CSS

---

## Developer Tools

| Tool | Access | Purpose |
|------|--------|---------|
| **Template Browser** | Top-left floating button | Navigate between all page templates |
| **Dark Mode Switcher** | Header (desktop/mobile) | Toggle light/dark modes |
| **Performance Monitor** | Browser console (auto) | Core Web Vitals tracking |
| **Compliance Scorecard** | Browser console (auto) | Design system compliance scoring |
| **Contrast Auditor** | Browser console (auto) | WCAG AA/AAA contrast checks |

---

## Guidelines File Structure

```
/guidelines/
├── Guidelines.md                    ← THIS FILE (entry point)
├── _templates.md                    ← Template system guide
├── _templates/                      ← File templates
├── rules/                           ← Mandatory rules
│   ├── design-system-rules.md       ← Styling compliance
│   ├── file-organization.md         ← File placement
│   └── workflow.md                  ← Task/report workflow
├── design-tokens/                   ← 17 design token files
├── components/                      ← Component guidelines
├── patterns/                        ← Pattern guidelines
├── blocks/                          ← WordPress block guidelines
├── icons/                           ← Icon category guidelines
├── mobile/                          ← Mobile-specific rules
├── styles/                          ← Section style presets
├── templates/                       ← Template-specific docs
├── prompts/                         ← Trigger word docs
├── testing/                         ← Testing guidelines
├── overview-*.md                    ← System overview files
├── ARCHITECTURE.md                  ← System architecture
├── ARCHITECTURE-BEM-WORDPRESS.md    ← BEM + WP mapping
├── DESIGN-SYSTEM-GUIDE.md           ← Complete design system guide
└── WCAG-ACCESSIBILITY-STANDARDS.md  ← Full accessibility reference
```

---

## Quick Reference Checklist

Before writing any code:

- [ ] Read overview files (components, patterns, icons, blocks)
- [ ] Read design token files for tokens you'll use
- [ ] Read component guidelines for components you'll use
- [ ] Verify all icons exist in `lucide-react`
- [ ] Use relative imports
- [ ] Use semantic HTML elements
- [ ] Use CSS variable tokens (not hardcoded values)
- [ ] Use data from mock files (not hardcoded content)
- [ ] Follow approved page archetypes
- [ ] Follow BEM naming with WP prefixes
- [ ] External CSS files for all styling
- [ ] No inline styles, no `dark:` classes, no margin utilities for layout
