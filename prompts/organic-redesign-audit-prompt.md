# Organic Redesign Audit & Implementation Plan Prompt

**Objective:**
Conduct a comprehensive audit of the current Tour Operator prototype’s codebase (CSS, components, tokens) and assess its readiness for a warm, tactile, nature-inspired redesign. Identify areas needing updates and define how to implement organic elements using CSS, SVGs, and optional WebGL enhancements, all while maintaining WCAG AA accessibility and the existing design-token infrastructure.

## Key Tasks:
1. **Code & Token Audit**
   - Review existing CSS files (`theme-base.css`, `theme-light.css`, `theme-dark.css`, `theme-variables.css`, `global.css`) and pattern/component styles.
   - Confirm usage of semantic tokens for colours, fonts, sizes, spacing, radii and shadows.
   - Check light and dark modes for WCAG AA contrast and note any non-compliant areas.

2. **Identify Target Elements**
   - Pinpoint hero sections, card grids, CTAs, editorial blocks and navigation areas that need an organic visual overhaul.
   - Note instances where inline styles or hard-coded values are used—these must be refactored to use tokens.

3. **Define Organic Design System**
   - **Colours & Zones:** Apply “Savanna Sunset” at the top, transition to “Acacia & Clay” in the middle, and end with “Minimal Earth” at the bottom. Ensure dark-mode variants remain warm and compliant.
   - **Typography:** Keep Lora for headings and Noto Sans for body; add Caveat or Shadows Into Light sparingly for accent text.
   - **Texture Levels:** Plan micro-grain overlays (5–10% opacity) for general use, richer textures (15–25%) for hero sections, and botanical overlays for feature sections.
   - **Shapes:** Incorporate soft pebble/blob shapes for hero backgrounds and CTAs; keep form controls clean with softened corners.
   - **Hand-drawn Details:** Use minimal line-art dividers and corner flourishes. Maintain low opacity to avoid clutter.

4. **SVG Asset Generation**
   - Generate SVGs for:
     * Subtle paper grain textures and noise tiles.
     * Soft, irregular blobs in warm creams and sage greens.
     * Botanical line art—acacia trees, savannah grasses, leaves.
     * Modern silhouettes of safari animals (giraffe, elephant) with rounded forms.
   - Ensure assets are lightweight and scalable, with colours tied to tokens via `currentColor`.

5. **WebGL Integration Planning**
   - Identify appropriate sections for WebGL:
     * Hero banners: animated 2D blobs that morph gently, respecting `prefers-reduced-motion`.
     * Interactive 3D map or acacia tree model deeper in the page, loaded lazily.
   - Ensure fallbacks (static SVG or image) for non-WebGL browsers.

6. **Implementation Guidelines**
   - Update design tokens in theme files with new colour and radius values.
   - Create new CSS utility classes (`.overlay--grain`, `.blob-backdrop`, `.hand-drawn-divider`) and pattern styles for organic layouts.
   - Avoid inline styles; reference all values through CSS variables and classes.
   - Ensure new dark-mode styles switch via existing token structure without duplicating rules.
   - Test all components for accessibility—focus states, contrast, touch targets.

## CRITICAL ENFORCEMENT RULES:
1. **Zero Margin Policy**: ALL elements must rely on flex/grid gaps or specific padding. You MUST NOT use margin utilities (e.g., `mb-4`, `mt-8`, `my-6`, `mx-auto`) to separate elements. Use layout components or CSS grid/flex spacing instead.
2. **Organic Wrappers**: Use specific organic section wrappers (`organic-section-top`, `organic-section-middle`, `organic-section-bottom`) for page layout sections. Do not use plain `<section>` or `<div>` for the primary sections of a page.
3. **Strict Token Usage**: Make sure all UI being generated uses variables from `/styles/global.css` and the tailwind configuration. Do not hardcode colors, spacing, borders, or radii.
4. **Restricted Fonts**: For typography, ONLY use the 5 font faces defined in the CSS (Lora, Noto Sans, Courier New, Caveat, Shadows Into Light) for all generated text.

## Output:
Produce a report detailing:
- Files/sections needing refactoring.
- A roadmap for introducing new tokens and classes.
- SVG prompts and guidelines for generating the required graphics.
- A plan for WebGL elements, including fallback strategies.
- A summary of accessibility issues discovered and proposed fixes.

---

## Appendix A: Acacia Drift Organic Redesign CSS Strategy

- **Value:** You can get a *major* organic shift (palette journey + softer shapes + texture + typographic warmth) **without rewriting every pattern** by layering a new `.theme-organic` token set and a small set of targeted override files on top of the existing LSX CSS architecture.
- **Risks:** The current system is strongly “token-first” and *intentionally* keeps Tailwind as a build bridge only; if organic styling is implemented by adding more Tailwind utilities, you’ll push against your own architecture and create hard-to-maintain drift.
- **Next step:** Swap the header/footer logo SVGs first (lowest risk), then introduce `theme-organic` token files + a thin “organic overrides” layer; only then start redesigning patterns/components.

### Current CSS Architecture
- `src/styles/index.css` is the **master entry point**.
- `src/styles/theme.css` is the **token orchestrator**.
- Tokens are already separated properly (base scales, semantic colors, wordpress presets).

### Organic Direction
- A **three-stage palette journey** (Savanna Sunset → Acacia & Clay → Minimal Earth).
- **Blended texture levels** depending on section.
- **Moderate-to-bold organic forms** (soft radii + selective blob/flow moments).
- **Warm Night Mode**.

### Proposed File Architecture
- `theme-organic.css` (orchestrator)
- `theme-organic-light.css` / `theme-organic-dark.css`
- `theme-organic-texture.css` / `theme-organic-shape.css` / `theme-organic-motion.css`
- Overrides layer in `/src/styles/organic/` (e.g. `organic.css`, `patterns.hero.css`, `utilities.webgl.css`).

---

## Appendix B: Organic Design Plan

1. **Logo integration:** Use Base64 data URIs for logos.
2. **Design token guideline overhaul:** Emphasize clamp-based spacing, zero-margin policy, semantic HTML.
3. **CSS structure:** Expand with `theme-organic-light.css` and `theme-organic-dark.css` incorporating the three palette zones (Savanna Sunset, Acacia & Clay, Minimal Earth). Map colors back to `--background`, `--primary`, etc.
4. **Fonts:** Use Lora (headings), Noto Sans (body), Caveat/Shadows Into Light (accents).
5. **Texture & materials:** Three levels of texture using `.overlay--grain` and `mix-blend-mode`.
6. **Shapes:** Use pebble/blob SVGs for background masks.
7. **Illustration & WebGL:** Incorporate lightweight WebGL for morphing blobs, with reduced-motion support. Include 3D interactive safari maps for deep page exploration.
8. **Accessibility:** Enforce 4.5:1 contrast, visible focus rings, and proper touch targets.