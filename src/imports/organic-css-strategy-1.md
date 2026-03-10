# Acacia Drift Organic Redesign CSS Strategy and Token Overhaul

## Executive summary

- **Value:** You can get a *major* organic shift (palette journey + softer shapes + texture + typographic warmth) **without rewriting every pattern** by layering a new `.theme-organic` token set and a small set of targeted override files on top of the existing LSX CSS architecture. fileciteturn164file0  
- **Risks:** The current system is strongly “token-first” and *intentionally* keeps Tailwind as a build bridge only; if organic styling is implemented by adding more Tailwind utilities, you’ll push against your own architecture and create hard-to-maintain drift. fileciteturn177file0turn164file1  
- **Next step:** Swap the header/footer logo SVGs first (lowest risk), then introduce `theme-organic` token files + a thin “organic overrides” layer; only then start redesigning patterns/components. fileciteturn182file0turn164file0  

## Current CSS architecture and why it’s a good base for an organic theme

Your repo already has a clean “CSS orchestration” model:

- `src/styles/index.css` is the **master entry point** with a clearly documented import order (fonts → build pipeline bridge → tokens → global → patterns/components). fileciteturn164file0turn164file1  
- `src/styles/theme.css` is the **token orchestrator** and also sets baseline semantic HTML typography and utility classes (e.g., `.text-fluid-*`, `.py-section-*`). fileciteturn165file4turn165file0  
- Tokens are already separated properly:  
  - theme-agnostic scale tokens live in `theme-base.css` (fluid type, spacing, radius, animation). fileciteturn165file0  
  - light/dark semantic colours and effects live in `theme-light.css` and `theme-dark.css`. fileciteturn165file2turn165file3  
  - WordPress preset variables map to semantic tokens in `theme-variables.css` (which aligns with how WordPress exposes preset CSS custom properties). fileciteturn165file1turn8search0  

That separation is exactly what you want for an organic redesign: organic is mostly (a) **colour + surface treatment**, (b) **shape language defaults**, (c) **texture + illustration layer**, (d) **typographic accent rules**. Those all belong in *token layers + thin overrides*, not scattered across pattern CSS.

Also worth noting: the build still requires `tailwind.css` for Tailwind v4 pipeline directives, but the file is explicitly positioned as a compatibility bridge and not the styling system. fileciteturn177file0turn164file1  

## Branding first: adding Acacia Drift light and dark logos to header and footer

You’re already set up for “no SVG import” environments: the current Logo component renders **inline SVG** (`LogoSVG.tsx`) and swaps light/dark via CSS classes and the `.dark` root strategy. fileciteturn182file1turn182file0turn171file0  
Header and Footer both consume `<Logo … />`, so replacing the SVG source updates both places immediately. fileciteturn168file0turn170file0  

Here are the two provided assets (so you can visually sanity-check before pasting):

![Acacia Drift logo (light)](sandbox:/mnt/data/logo-acacia-drift-light.svg)

![Acacia Drift logo (dark)](sandbox:/mnt/data/logo-acacia-drift-dark.svg)

### Recommended implementation approach

Keep the public API unchanged:

- **Do not change** `Logo.tsx` props/signature unless you need to change sizing behaviour. fileciteturn180file1  
- **Replace** the SVG markup inside `LogoSVG.tsx` for `LogoLight` and `LogoDark`. fileciteturn182file0  
- **Do not rely on** `--logo-url` yet for React rendering; those tokens are useful for future WP mapping, but your runtime logo is currently inline SVG. fileciteturn165file2turn165file3turn182file0  

### Practical notes before you paste the SVGs into TSX

Your SVG exports currently include attributes like `width`, `height`, and `preserveAspectRatio="none"` (common from design exports). For a logo component:

- Remove fixed `width`/`height` so sizing is controlled by your existing size classes in `logo.css`. fileciteturn167file0turn164file0  
- Change `preserveAspectRatio` to `xMidYMid meet` (or remove it) to avoid distortion in responsive containers.  
- Keep `viewBox` intact.  
- Keep `aria-hidden="true"` on the SVG and let the parent link/button provide the accessible label (this is already how your Logo is documented). fileciteturn178file0turn180file1  

### Drop-in TSX scaffold for `LogoSVG.tsx`

This shows the intended structure. You’ll paste the *path contents* from each SVG into the matching component:

```tsx
// /src/app/components/common/LogoSVG.tsx

import * as React from "react";

type Props = React.SVGProps<SVGSVGElement>;

export function LogoLight(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* Paste ALL <path .../> nodes from logo-acacia-drift-light.svg here */}
    </svg>
  );
}

export function LogoDark(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {/* Paste ALL <path .../> nodes from logo-acacia-drift-dark.svg here */}
    </svg>
  );
}
```

### Documentation updates to do alongside the swap

Update the Logo docs to reflect Acacia Drift and remove references to the previous brand asset colours (“Tour Operator Web Solutions wordmark…” etc.). fileciteturn178file0turn180file1  

## Organic theme CSS plan that layers on top of the existing structure

### Organic direction you’ve chosen, translated into CSS constraints

You explicitly want something that’s *not* a generic “modern organic / craftcore / botanical editorial” bucket; it’s a **tour operator aesthetic** with:

- A **three-stage palette journey** (Savanna Sunset → Acacia & Clay → Minimal Earth).
- **Blended texture levels** depending on section (subtle in most places, richer in hero/feature moments).
- **Moderate-to-bold organic forms** (soft radii + selective blob/flow moments).
- **Warm Night Mode** rather than pure black dark mode.

That maps cleanly to a token approach where you:
1) keep “global brand tokens” stable, and  
2) allow **section-scoped surface tokens** to vary by page depth.

This is consistent with the broader organic design guidance: earthy/neutral palettes, organic shapes, and tactile textures, but with a warning to avoid over-weighting pages with heavy textures everywhere. citeturn6search1turn7search0  

### Proposed new CSS files

You asked for a new CSS structure that avoids giant files. The safest pattern is:

- **Theme tokens** in small files, imported by the theme orchestrator.
- **Overrides** in a dedicated `organic/` folder, imported once at the end of `index.css`.

Here’s a concrete, modular file plan:

#### Token layer additions (new theme files)

Create these in `/src/styles/`:

- `theme-organic.css` (orchestrator: imports the organic token modules only)
- `theme-organic-light.css` (light-mode organic token overrides scoped to `.theme-organic`)
- `theme-organic-dark.css` (dark-mode organic token overrides scoped to `.dark.theme-organic`)
- `theme-organic-wp-presets.css` (optional: remaps `--wp--preset--*` under `.theme-organic` without changing preset *structure*) fileciteturn165file1turn8search0  
- `theme-organic-texture.css` (texture tokens + base overlay utilities)
- `theme-organic-shape.css` (shape tokens: radii defaults + blob masks)
- `theme-organic-motion.css` (organic easing + animation keyframes + reduced-motion handling) citeturn9search0  

#### Override layer additions (organic styling overrides)

Create a new folder: `/src/styles/organic/`

- `organic.css` (orchestrator for the overrides folder)
- `parts.header.css` (header-specific organic overrides)
- `parts.footer.css` (footer-specific organic overrides)
- `patterns.hero.css` (hero organic shape + texture + typography accent rules)
- `components.buttons.css` (button shape, hover “soft morph”, focus)
- `components.cards.css` (card surfaces, borders, subtle grain)
- `utilities.dividers.css` (hand-drawn dividers, section separators)
- `utilities.webgl.css` (canvas/WebGL containers, fallback surfaces)

This lets each file stay small and makes it obvious where organic styling lives.

### Where the imports should go

Your current import sequencing is strict and documented. fileciteturn164file0turn164file1  

Use that structure, but add two small hooks:

#### Update `theme.css`

At the end of `theme.css` imports, after `theme-funky.css`, add:

```css
@import './theme-organic.css';
```

This matches the same pattern used for funky themes and keeps “theme-related composition” inside the theme orchestrator. fileciteturn165file4turn164file1turn176file9  

#### Update `index.css`

At the very end of `index.css` (after components), add:

```css
/* ── Organic theme overrides (scoped; safe to import last) ────────── */
@import './organic/organic.css';
```

Because everything inside `organic/` will be scoped to `.theme-organic`, this won’t affect existing styling until the class is enabled. fileciteturn164file0  

### How `.theme-organic` should be activated

You already toggle dark mode via the `.dark` class on `<html>` in `ThemeProvider`. fileciteturn171file0turn165file3  

For now, simplest is:

- Add `theme-organic` to `<html>` once (hard-coded), or
- Extend `ThemeContext` later to manage `themeVariant` (default/funky/organic).

Hard-coded activation is fine for a redesign branch:

```ts
// inside ThemeProvider useEffect or app bootstrap
document.documentElement.classList.add("theme-organic");
```

Keep the scope consistent with funky theme conventions (`.theme-funky`, `.dark.theme-funky`). fileciteturn164file1turn176file9  

## Fonts and colour palette choices for Acacia Drift

### Font system selection

You chose Option C: **handwritten accent sparingly + Lora + Noto Sans**.

That’s aligned with common organic guidance: use warm serifs and sparing handwritten treatments for human texture, but keep legibility for primary UX content. citeturn6search1turn7search0  

Recommended final set:

- **Headings / editorial:** Lora (keep) — it’s already integrated in your tokens and baseline typography rules. fileciteturn165file0turn165file4turn5search4  
- **Body / UI:** Noto Sans (keep) — already baseline body font-family in theme defaults. fileciteturn165file4turn167file0  
- **Code:** existing mono stack stays.
- **Accent (sparingly):** Caveat (choose one accent font; avoid loading two handwriting families unless there’s a clear need). Caveat is explicitly described as a handwriting typeface with multiple styles on Google Fonts. citeturn5search0turn5search6  

#### Font-loading change

Right now you load Lora + Noto Sans in `fonts.css` via Google Fonts. fileciteturn167file0  

Update it to include Caveat:

```css
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@300;400;500;600;700&family=Noto+Sans:wght@300;400;500;600;700&family=Caveat:wght@400;500;600;700&display=swap');
```

Then add a token in your organic theme (or theme-base if you accept it globally):

```css
.theme-organic {
  --font-family-hand: 'Caveat', 'Comic Sans MS', cursive;
}
```

…and introduce a single utility class in `theme-organic-typography.css` or `organic/utilities.*`:

```css
.theme-organic .is-style-handwritten,
.theme-organic .wp-text--hand {
  font-family: var(--font-family-hand);
  letter-spacing: 0.01em;
}
```

### Colour system: the “journey palette” that shifts by section

Designmodo’s organic design examples lean heavily on earthy colours + nature-linked textures, and Envato highlights neutral palettes, organic shapes, and natural textures as core characteristics. citeturn7search0turn6search1  

You want three “chapters” down the page:

- **Top:** Savanna Sunset (warm cream/sand + terracotta + sage)
- **Middle:** Acacia & Clay (paper beige + botanical green + clay)
- **Bottom:** Minimal Earth (linen + muted olive + soft terracotta)

#### The key implementation choice

Do **not** try to create three global themes.

Instead: keep one organic theme, but **override surface tokens at the section root** (this is also consistent with how WordPress theme.json presets can be scoped, and how custom properties cascade). citeturn8search0  

##### Example: token design

In `theme-organic-light.css`:

```css
.theme-organic {
  /* Stage surfaces (light) */
  --o-surface-sun:   #F5F1E8; /* Savanna sand */
  --o-surface-clay:  #F0EDE3; /* Paper beige */
  --o-surface-linen: #FAF8F3; /* Minimal linen */

  /* Global organic ink */
  --o-ink: #2B2520; /* warm charcoal */

  /* Brand actions */
  --primary: #5C733E;          /* deeper acacia green */
  --primary-foreground: #FFFFFF;

  --accent: #A75820;           /* darker terracotta for legible accents */
  --accent-foreground: #FFFFFF;

  /* Base semantics default to “linen chapter” unless overridden per section */
  --background: var(--o-surface-linen);
  --foreground: var(--o-ink);
}
```

Then, in `theme-organic-shape.css` or `theme-organic-light.css`, set **section-level overrides**:

```css
/* Hero feels like “arrival” */
.theme-organic .section-hero-primary {
  --background: var(--o-surface-sun);
}

/* Mid-page feels greener / more grounded */
.theme-organic .section-content-default,
.theme-organic .section-card-grid-default {
  --background: var(--o-surface-clay);
}

/* Footer / end-of-journey feels calm */
.theme-organic .wp-part-footer {
  --background: var(--o-surface-linen);
}
```

This works well with your existing `sections.css` architecture because it already uses semantic tokens like `--background`, `--muted`, etc. fileciteturn183file0turn165file4  

### Dark mode: Warm Night Mode

You asked for Warm Night Mode; MDN recommends respecting reduced motion preferences for non-essential animation, which becomes more important when adding organic drift, grain, and WebGL flourishes. citeturn9search0  

In `theme-organic-dark.css`:

```css
.dark.theme-organic {
  --o-night: #1F1D1A;
  --o-night-card: #2C2824;
  --o-night-ink: #F7F3EA;

  --background: var(--o-night);
  --card: var(--o-night-card);
  --foreground: var(--o-night-ink);

  /* Keep primary luminous; use dark text on it (like your current dark mode strategy) */
  --primary: #9BB27A;
  --primary-foreground: var(--o-night);

  --accent: #E0A87E;
  --accent-foreground: var(--o-night);
}
```

If you use colour mixing for subtle borders/tints, prefer `color-mix()` (already used elsewhere in your styles) and keep it consistent. citeturn9search2  

## Updated design token guideline drafts

You asked specifically to merge:

- `MODERN-SPACING.md` + legacy `spacing.md` → `spacing.md`
- `MODERN-TYPOGRAPHY.md` + legacy `typography.md` → `typography.md` fileciteturn172file6turn174file2turn170file3turn167file2  

Below are drop-in replacements designed to match your actual CSS token implementation (fluid clamp scales, section utilities, etc.). fileciteturn165file0turn165file4turn183file0  

### New `guidelines/design-tokens/spacing.md`

```md
# Spacing Tokens

This project uses a **fluid spacing scale** implemented as CSS custom properties in `src/styles/theme-base.css`.
Spacing tokens are **theme-agnostic**: they do not change between light/dark mode. fileciteturn165file0

## Source of truth

- Tokens: `src/styles/theme-base.css` fileciteturn165file0
- Section presets: `src/styles/sections.css` fileciteturn183file0
- Import order: `src/styles/index.css` (tokens must load before any component CSS) fileciteturn164file0

## Why fluid spacing?

All spacing tokens use `clamp()` so spacing grows smoothly with viewport width—no breakpoint-specific “jumps”.
This keeps the layout breathable (important for organic styling) without requiring special-case media queries.

## Token groups and intended usage

### Section spacing (outer vertical rhythm)

Use these for **top/bottom padding** of major sections:

- `--spacing-section-sm`
- `--spacing-section-md`
- `--spacing-section-lg`
- `--spacing-section-xl`

Preferred usage:
- `section` wrappers, heroes, mid-page feature blocks, footers.

### Container padding (horizontal gutters)

Use these for **left/right padding** inside containerised layouts:

- `--spacing-container-sm`
- `--spacing-container-md`
- `--spacing-container-lg`

Preferred usage:
- `.container`, pattern inner wrappers.

### Element spacing (component padding)

Use these for **card padding, form padding, button padding**:

- `--spacing-element-xs` … `--spacing-element-xl`

### Gap spacing (grid/flex rhythm)

Use these for **CSS grid gaps** and `flex` gaps:

- `--spacing-gap-xs`
- `--spacing-gap-sm`
- `--spacing-gap-md`
- `--spacing-gap-lg`

## Approved utility classes

Use existing utilities defined in `theme.css` instead of inventing new “one-off” spacing classes:

- `.py-section-sm`, `.py-section-md`, `.py-section-lg`, `.py-section-xl` fileciteturn165file4
- `.gap-fluid-xs`, `.gap-fluid-sm`, `.gap-fluid-md`, `.gap-fluid-lg` fileciteturn165file4

Use section presets when your layout matches an archetype (hero, CTA, content, etc.):
- `.section-hero-primary`, `.section-content-default`, `.section-cta`, etc. fileciteturn183file0

## Rules

### Always
- Use `var(--spacing-...)` tokens
- Prefer section presets in `sections.css` for page structure fileciteturn183file0
- Keep spacing consistent across patterns (avoid page-by-page “creative spacing”)

### Never
- Hardcode `padding: 72px;` / `gap: 36px;`
- Add spacing via inline styles
- Depend on Tailwind spacing utilities for new work (Tailwind exists for build + legacy bridge only) fileciteturn177file0turn164file1

## Organic theme note

The organic redesign should feel more “breathable” by default, but **we should not change the spacing scale values** unless we have evidence the scale is wrong.
Instead:
- Choose larger section presets more often (e.g., prefer `section-md`/`section-lg`)
- Use `--leading-relaxed` / `--leading-loose` for editorial blocks to increase perceived openness
```

### New `guidelines/design-tokens/typography.md`

```md
# Typography Tokens

Typography tokens are defined in `src/styles/theme-base.css` and baseline element rules live in `src/styles/theme.css`. fileciteturn165file0turn165file4

## Source of truth

- Type scale + weights + leading + tracking: `src/styles/theme-base.css` fileciteturn165file0
- Baseline element styling (h1–h6, p, a, etc.): `src/styles/theme.css` fileciteturn165file4
- Font loading: `src/styles/fonts.css` fileciteturn167file0

## Font families

### Core fonts (always allowed)

- Serif: `var(--font-family-lora)` (headings/editorial)
- Sans: `var(--font-family-noto-sans)` (body/UI)
- Mono: `var(--font-family-mono)` (code/technical)

These are already implemented and should remain the foundation. fileciteturn165file0turn165file4

### Organic accent font (allowed only in organic theme)

The organic redesign seeps in “human” detail via one handwriting accent font (e.g., Caveat).
This font must be:
- used sparingly (labels, microcopy, hero eyebrow, short pull-quotes)
- never used for long-form content or primary navigation

Implementation approach:
- Add `--font-family-hand` only under `.theme-organic`
- Add `.wp-text--hand` or `.is-style-handwritten` utility class for usage

## Fluid type scale

The project uses a clamp-based scale:

- `--text-6xl` … `--text-xs`

Mapping is documented in `theme-base.css`. fileciteturn165file0

## Approved utilities

From `theme.css`:
- `.text-fluid-6xl` … `.text-fluid-xs` fileciteturn165file4
- `.font-light` … `.font-bold` fileciteturn165file4
- `.leading-tight` … `.leading-loose` fileciteturn165file0turn165file4
- `.tracking-tighter` … `.tracking-wider` fileciteturn165file0turn165file4

## Organic theme typographic behaviour

To keep the experience “organic” but still tour-operator trustworthy:

- Use handwriting accent only for **small** elements (never body paragraphs).
- Prefer warmer ink colours (avoid pure #000000 for large text blocks).
- Use slightly looser leading (`--leading-relaxed`) for editorial sections.
- Use wider tracking for small caps / eyebrow text to help the design breathe.

## Rules

### Always
- Use semantic HTML: headings are headings, paragraphs are paragraphs
- Use tokens and existing utilities
- Ensure readability first (tour operator UX is trust + clarity)

### Never
- Hardcode font sizes or font families
- Use handwriting fonts for UI controls (forms, nav)
- Introduce new font families without updating design tokens + documentation
```

## Guardrails for texture, motion, and WebGL so the site stays premium

### Texture layering without overwhelming performance

Designmodo explicitly warns that heavy textures and photo backgrounds increase “visual weight” and that balance matters. citeturn7search0  
Envato likewise frames texture as a way to add tactile depth, but it should be applied deliberately (paper grain overlays, linen texture, etc.). citeturn6search1  

Your “blend levels 1/2/3 by section” request is best achieved by:

- storing texture intensity as variables (e.g., `--o-grain-opacity`)
- applying texture via pseudo-elements on a small number of “surface types” (hero, feature, footer)  
- keeping cards at low intensity by default

### Motion and accessibility

If you add organic drift, parallax, reveal-on-scroll, etc., include `prefers-reduced-motion` fallbacks so users who request reduced motion aren’t forced into constant movement. citeturn9search0  

### WebGL 2D/3D integration

Treat WebGL as an enhancement layer:

- Provide a CSS-driven fallback surface (gradients + subtle grain)
- Put canvases behind content and ensure they don’t intercept pointer events (`pointer-events:none`)
- Gate expensive animation in reduced-motion mode and/or low-power conditions

This keeps the “crafted” feel without turning the site into a hardware benchmark.

---

If you want, I can turn the file plan above into **exact file stubs** (empty CSS modules with headers + TODOs) and a **single “Acacia Drift Organic Theme” master prompt** for Figma Make that references: palette journey, Warm Night Mode, handwriting accents, and the new `.theme-organic` token strategy.