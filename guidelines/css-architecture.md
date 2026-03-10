# CSS Architecture Guidelines

**Version:** 1.0  
**Created:** February 19, 2026  
**Source:** Audit Report V6

---

## CSS Loading Order

The CSS loads via `/src/styles/index.css` in this exact order:

```
1. fonts.css         - @font-face declarations (Lora, Noto Sans)
2. tailwind.css      - Tailwind CSS v4 core (@import 'tailwindcss')
3. theme.css         - CSS variables + @theme inline (imports theme-light.css, theme-dark.css)
4. global.css        - WordPress-aligned semantic HTML + WP utility classes
5. sections.css      - Section preset backgrounds/layouts (22 types)
6. breadcrumbs.css   - Breadcrumb component styles
7. print.css         - Print media queries
```

**Rules:**
- NEVER add `@import` to any file other than `index.css`
- NEVER import `global.css` or `theme.css` directly from a component
- Component-level CSS is ONLY for tour-operator blocks (BEM-named, scoped classes)

### CSS Layer Cascade (CRITICAL)

Tailwind v4 uses CSS `@layer` for all generated utilities. The cascade priority is:

```
1. @layer base        ← theme.css base styles (h1-h6, p, a, etc.)
2. @layer components  ← shadcn/ui component styles
3. @layer utilities   ← Tailwind utility classes (text-sm, bg-primary, etc.)
4. Un-layered CSS     ← global.css, sections.css (HIGHEST priority)
```

**Un-layered CSS always beats ALL layered CSS, regardless of specificity.** This means:
- A bare `p { font-size: 1rem }` in global.css would override `@layer utilities { .text-sm { font-size: 0.875rem } }`
- This is why global.css must NEVER define bare element selectors for typography
- All bare element typography (`h1`-`h6`, `p`, `a`, etc.) is defined in `theme.css @layer base`
- `global.css` only adds `.wp-block-*` class selectors for WordPress block editor compatibility

---

## Class Name Ownership

### Tailwind Owns These (DO NOT redefine in CSS files)

The following class names are reserved for Tailwind's utility layer. Never define these in `global.css`, `sections.css`, or any custom CSS:

**Layout:** `flex`, `grid`, `block`, `hidden`, `inline`, `inline-block`, `inline-flex`  
**Position:** `relative`, `absolute`, `fixed`, `sticky`  
**Spacing:** `p-*`, `px-*`, `py-*`, `m-*`, `mx-*`, `my-*`, `mt-*`, `mb-*`, `gap-*`  
**Sizing:** `w-*`, `h-*`, `max-w-*`, `min-w-*`, `min-h-*`  
**Typography:** `font-bold`, `font-semibold`, `font-medium`, `font-normal`, `font-light`  
**Decoration:** `rounded-*`, `border-*`, `shadow-*`, `opacity-*`  
**Interaction:** `cursor-pointer`, `cursor-not-allowed`, `pointer-events-none`  
**Overflow:** `overflow-hidden`, `overflow-auto`, `overflow-scroll`  
**Object:** `object-cover`, `object-contain`, `object-center`  
**Responsive:** `md:*`, `lg:*`, `sm:*`, `xl:*`

### global.css Owns These (WordPress-specific, non-conflicting)

**Semantic HTML typography:**
- `h1`-`h6`, `p`, `a`, `blockquote`, `code`, `pre`, `ul`, `ol`, `li`

**WordPress block classes:**
- `.wp-block-*`, `.wp-element-link`
- `.has-*-background`, `.has-*-color`
- `.is-style-*`

**WordPress layout:**
- `.alignleft`, `.alignright`, `.aligncenter`, `.alignwide`, `.alignfull`
- `.container`, `.container--narrow`, `.container--wide`
- `.section`, `.section--sm`, `.section--lg`

**WordPress buttons (BEM-style):**
- `.button`, `.button--primary`, `.button--secondary`, `.button--outline`, `.button--ghost`, `.button--destructive`
- `.button--sm`, `.button--lg`
- `.wp-block-button`, `.wp-block-button__link`

**WordPress forms (BEM-style):**
- `.form__group`, `.form__label`, `.form__input`, `.form__textarea`, `.form__select`
- `.form__checkbox`, `.form__radio`, `.form__helper`, `.form__error`

**WordPress images:**
- `.wp-block-image`, `.image--rounded`, `.image--circle`, `.image__caption`

**WordPress cards (BEM-style):**
- `.wp-block-card`, `.card__header`, `.card__title`, `.card__description`, `.card__content`, `.card__footer`
- NOTE: Use `.wp-block-card` NOT `.card` (`.card` conflicts with shadcn/ui)

**Header/Mobile menu:**
- `.header-desktop-nav`, `.header-desktop-search`, `.header-mobile-search`, `.header-hamburger`
- `.header-mega-menu`, `.header-mega-menu--end`, `.header-bar-height`
- `.mobile-menu-backdrop`, `.mobile-menu-panel`

**Accessibility:**
- `.screen-reader-text`, `.sr-only`

### sections.css Owns These

All section preset classes (22 types). These use the `.section-*` naming pattern:
- `.section-hero-primary`, `.section-hero-secondary`, `.section-hero-minimal`
- `.section-cta-primary`, `.section-cta-secondary`
- `.section-content-*`, `.section-card-grid-*`, `.section-feature-*`
- `.section-archive-*`, `.section-faq`, `.section-utility-*`
- `.section-full-width-*`

### Component CSS Owns These

Tour-operator block CSS files use `.lsx-*` prefixed BEM classes:
- `.lsx-banner-cover`, `.lsx-banner-cover__content`, `.lsx-banner-cover__overlay`
- `.lsx-tour-itinerary`, `.lsx-tour-itinerary__day`
- `.lsx-tour-overview`, `.lsx-tour-quick-facts`
- etc.

Template CSS uses `.single-tour__*` prefixed BEM classes.

---

## Fluid Spacing Tokens

**ALWAYS use fluid section spacing tokens instead of static Tailwind values:**

| Static (DO NOT use) | Fluid (USE THIS) | Range |
|---|---|---|
| `py-8` to `py-12` | `py-section-sm` | 32px - 64px |
| `py-12` to `py-16` | `py-section-md` | 48px - 96px |
| `py-16` to `py-24` | `py-section-lg` | 64px - 128px |
| `py-24` to `py-32` | `py-section-xl` | 80px - 160px |

**ALWAYS use fluid typography tokens instead of static Tailwind values:**

| Static (DO NOT use) | Fluid (USE THIS) |
|---|---|
| `text-xs` | `text-fluid-xs` |
| `text-sm` | `text-fluid-sm` |
| `text-base` | `text-fluid-base` |
| `text-lg` | `text-fluid-lg` |
| `text-xl` | `text-fluid-xl` |
| `text-2xl` | `text-fluid-2xl` |
| `text-3xl` | `text-fluid-3xl` |
| `text-4xl` | `text-fluid-4xl` |

---

## Data Import Convention

### Canonical Import Sources

| What you need | Import from |
|---|---|
| Base data (small sets) | Domain file: `../data/tours`, `../data/destinations`, etc. |
| Expanded data (36+ items) | `../data/mockExpanded` |
| TypeScript interfaces | `../data/types` |
| Legacy compatibility | `../data/mock` (deprecated - migrate to domain files) |

### Rules

1. **NEVER import from `../data/index`** - Use specific domain files for clarity
2. **NEVER import `POSTS`** - The correct name is `BLOG_POSTS`
3. **NEVER create new barrel re-exports** - Import from the source domain file
4. **ALWAYS use named exports** - No default exports in data files
5. **ALWAYS use relative paths** - No `@/` aliases, no absolute paths

---

## Adding New CSS

### For a new tour-operator block:
1. Create `ComponentName.css` in the same directory as `ComponentName.tsx`
2. Use `.lsx-component-name` BEM prefix for all classes
3. Import the CSS file at the top of the `.tsx` file: `import './ComponentName.css';`
4. Use CSS custom properties for all colors, spacing, and typography

### For a new section preset:
1. Add the class to `/src/styles/sections.css`
2. Use `.section-*` naming pattern
3. Use CSS custom properties exclusively
4. Include dark mode support

### For a new utility class:
1. **Prefer Tailwind** - Check if Tailwind already provides the utility
2. If Tailwind doesn't cover it, add to `global.css` with a WordPress-aligned name (`.wp-block-*` or `.has-*`)
3. NEVER use a name that conflicts with Tailwind