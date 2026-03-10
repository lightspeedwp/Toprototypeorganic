# Organic redesign CSS strategy for the Tour Operator Figma Make prototype

## Executive summary

Ash, your codebase already has a strong “theme-token-first” foundation: the fastest, safest way to move the UI into a new “organic” direction is to treat organic-ness as a **token + pattern-skinning problem**, not a rewrite.

The most leverage comes from (a) shifting the **semantic colour tokens** and **shape language** (radius/edge treatment) at the theme layer, then (b) introducing **lightweight texture + organic shape utilities** that patterns (hero, cards, sections) can opt into, while keeping accessibility and performance intact. Designmodo explicitly warns that heavy, high-detail textures and photo backgrounds quickly increase “visual weight,” so the strategy should bake in guardrails (subtle grain, sparse use of “hero textures,” and strong whitespace). citeturn27search0

The repo documentation also shows intentional direction: Tailwind exists as a **runtime/build compatibility bridge**, while the “real” design system is meant to be **CSS variables + WordPress-aligned classes**. Your redesign plan should respect that trajectory so you don’t create future migration debt. fileciteturn36file0L1-L1

## What “organic” styling really means in practice

Organic design’s value is emotional: it replaces rigid, clinical geometry with cues that feel tactile, natural, and “alive”—often via muted palettes, imperfect shapes, botanical motifs, and texture. Envato frames the trend around **neutral/earthy colours**, **organic (asymmetrical) shapes**, **botanical design**, **natural textures (paper/linen/woodgrain/soil)**, and **craftcore/handmade cues**. citeturn28search0

Designmodo’s examples and reflection add a pragmatic web-design lens: organic sites commonly use **foliage/plant decorations**, **grass/wood textures**, **illustrated landscapes**, and layered compositions; but they emphasise the need to balance texture and photographic richness to avoid messiness and excessive “visual weight.” citeturn27search0

For your prototype, translate those ideas into four controllable “knobs” you can tune without rewriting every component:

**Palette and contrast**  
“Organic” does not mean “only brown and green.” It is commonly earthy and muted, but designers can incorporate brighter accents for energy and differentiation. citeturn27search0turn28search0  
In your system, that means: re-map `--background`, `--card`, `--muted`, `--border`, `--primary`, `--accent` to warmer, less clinical values, keeping WCAG contrast requirements intact.

**Shape language**  
Organic shapes are asymmetrical and fluid, often mimicking stones/leaves/waves. citeturn28search0  
In your system, that means: increase baseline radii and introduce one or two **“pebble / blob” radius tokens** that patterns can use for hero backdrops, badges, image frames, and CTA buttons.

**Texture and material**  
Paper grain, linen, bark/stone lightly applied can give depth and warmth. citeturn28search0  
In your system, that means: add a subtle, reusable texture overlay (grain/noise) and a couple of background “materials” as optional utilities (e.g., paper, linen).

**Handmade linework and “craftcore” details**  
Hand-drawn and handmade cues are rising as a response to digital saturation; they can be added via strokes, doodle dividers, or botanical line art. citeturn28search0  
In your system, that means: implement a small library of SVG-based dividers and corner flourishes that patterns can attach via pseudo-elements (not heavy image assets).

## How the current CSS is structured

Your codebase is explicitly designed around a **master CSS entry point** and strict import order, with the theme/tokens loaded before anything else. The architecture is spelled out in the “CSS File Structure Guidelines” and reinforced by the master stylesheet entry. fileciteturn36file0L1-L1 fileciteturn36file1L1-L1

### The cascade model you already have

At a high level, the project uses:

**One global entry:** `src/main.tsx` imports `./styles/index.css` → everything flows from there.

**A strict import order:** `src/styles/index.css` loads fonts, Tailwind compatibility, then theme, then global WordPress classes, then sections/parts/templates/pages/patterns/components. fileciteturn36file1L1-L1

**A token-first theme system:**  
The repo documentation defines a “five theme files” model—base tokens, light colours, dark overrides, WordPress preset namespace mapping, and optional alternate themes—loaded via a theme orchestrator file. fileciteturn36file0L1-L1

### Tailwind’s actual role in this repo

There is a key nuance you should align the redesign with:

* The repo’s CSS architecture documentation states the project “does NOT use Tailwind CSS” as the styling system; Tailwind is present for pipeline/runtime compatibility. New components are expected to move toward WordPress-aligned classes rather than Tailwind utilities. fileciteturn36file0L1-L1  
* Some older guideline docs still describe workflows that rely on Tailwind utilities for spacing/radius, as long as they resolve to your semantic tokens (and forbid inline styles/hardcoding). fileciteturn35file0L1-L1 fileciteturn35file3L1-L1

Practically, treat this as a transition period: you can redesign safely by putting almost all “organic-ness” into **CSS variables + pattern CSS**, allowing any remaining Tailwind-using components to “inherit the new look” via token mapping.

### Non-negotiables enforced by the guidelines

Your guidelines repeatedly reinforce constraints that matter for an organic redesign prompt:

* **No inline styles** (with narrow exceptions for animation/dynamic CSS custom properties). fileciteturn35file0L1-L1  
* **CSS variables / design tokens must drive styling** (no hardcoded colours/fonts). fileciteturn35file0L1-L1  
* **WordPress-aligned naming and structure** (patterns, parts, templates), with documented conventions. fileciteturn35file1L1-L1

Those are actually helpful for organic design: tokens make global “material” changes fast and consistent.

## CSS strategy for an organic redesign

### Core principle

Make organic styling an **overlay on your existing system**, not a parallel system.

That means:

1. **Token shift first** (palette, radii, shadows, typography nuances).  
2. **System utilities second** (texture overlay, blob shapes, hand-drawn dividers).  
3. **Pattern tuning third** (hero, cards, archive header, CTA, editorial content).  
4. Only then decide whether to **eliminate legacy Tailwind class usage** or keep it as a minor implementation detail.

This approach is consistent with the way organic sites are described: the “look” comes from layered textures, natural motifs, and palette choices, but must remain balanced and not visually heavy. citeturn27search0turn28search0

### Token changes

Implement these by editing your theme tokens, not by sprinkling overrides throughout patterns.

**Palette: move to “warm neutrals + botanical accents”**  
Envato’s pattern is neutral base + earthy accents. citeturn28search0  
Designmodo notes organic sites often use browns/greens/textures but can include brighter colours for vividness. citeturn27search0

Recommended direction (expressed in *semantic* tokens, not raw hex values in components):

* `--background`: warm paper/cream instead of pure white
* `--card`: slightly different shade than background (paper stack effect)
* `--muted`: linen-like surface
* `--border`: warmer grey / clay line (avoid cold blue-greys)
* `--primary`: muted botanical green (not neon)
* `--accent`: terracotta / amber (used sparingly)
* Shadows: softer, more diffused (less “material UI” hard edge)

**Shape: codify “pebble edges” and “blob backdrops”**  
Organic shapes are asymmetrical and soft. citeturn28search0  
Introduce two new shape tokens:

* `--radius-ui`: a slightly larger default radius for buttons/inputs/cards (still consistent)
* `--radius-blob-1`, `--radius-blob-2`: multi-value border-radius strings for decorative shapes (background blobs or image masks)

These should be opt-in (used by patterns), not automatically applied to every component—or you risk turning everything into “rounded rectangles,” which is not truly organic.

**Typography: keep legibility, add warmth**  
Organic design often pairs a warm serif with clean supporting type. Envato explicitly recommends soft serifs and “natural flow” type choices. citeturn28search0  
Given your design system already restricts fonts (and enforces design tokens), your “organic typography” work should focus on:

* small adjustments to letter spacing (less mechanical)
* slightly higher line-height for editorial sections
* careful use of italic/quotes to feel crafted
* avoid pure black: use your semantic foreground token and slightly soften it

### Add an organic surface layer

Designmodo’s reflection warns that high-detail textures and photo backgrounds increase “visual weight,” so the objective is **micro-texture**, not heavy texture. citeturn27search0

Implement as:

* A single `.wp-surface-grain` utility (or similar) that adds a subtle overlay via pseudo-element.
* Apply it at the **page-shell** or **hero** level only, not every card.
* Provide a “texture intensity token” (e.g., `--texture-opacity`) so you can dial it down in dark mode and for performance-critical views.

### Pattern-level organic upgrades

Target a small number of high-impact patterns first. Your stylesheet organisation already separates patterns (hero, card grids, editorial content, CTA, etc.), which is ideal. fileciteturn36file0L1-L1 fileciteturn36file1L1-L1

Recommended priority order:

**Hero pattern**  
Add an organic blob backdrop behind headline + introduce a topographic/line-art overlay at low opacity. Organic shapes are frequently used as section dividers/backgrounds. citeturn28search0

**Card grids and cards**  
Cards should feel like “paper pieces” placed on a desk: warm surface, softer shadow, slight border variation, optional “organic corner” micro-variation on featured cards.

**Section dividers**  
Replace straight rules with subtle hand-drawn divider SVGs (thin, not noisy). Craftcore cues are part of the trend. citeturn28search0

**Navigation and filters**  
Keep usability. Organic does not mean confusing layout. Use organic hover states (pill/pebble) but preserve clear hit targets and whitespace.

### Inline / Tailwind usage policy during redesign

Your documentation is moving toward Tailwind-free styling, but some guidelines and components still use Tailwind utilities. fileciteturn36file0L1-L1 fileciteturn35file3L1-L1

A pragmatic redesign policy that won’t block you:

* Allow existing Tailwind utilities to remain **if** they resolve to your semantic tokens and don’t introduce dark-mode duplication.
* For new organic styling, prefer **pattern CSS + utilities** (WordPress-aligned class names) so the organic system remains stable even if Tailwind mapping is removed later.
* Enforce the repo’s “no inline styles” rule (with the documented exceptions). fileciteturn35file0L1-L1

## Practical checklist for applying organic styling to this prototype

This checklist is written to become the backbone of a “Figma Make prompt” and a dev execution plan.

### Design decisions to lock before touching CSS

Decide these as constraints for the prompt and for token edits:

* Organic sub-style: “modern organic” (refined) vs “craftcore” (more handmade) vs “botanical editorial” (magazine-like)
* Texture level: micro-grain only vs light paper + occasional linen sections
* Shape level: only rounded UI vs blobs and asymmetry in hero / featured sections
* Illustration policy: where hand-drawn elements may appear (hero, dividers, CTA), and where they must not (forms, checkout/booking flows)

### Token implementation steps

1. Update semantic colours in light/dark themes so the entire UI shifts without component refactors (warm background, natural borders, botanical primary, earthy accent). This aligns with organic’s neutral-and-earthy emphasis. citeturn28search0  
2. Introduce blob/pebble shape tokens and apply them only to a few signature elements (hero backdrop, featured card, CTA button). Organic shapes are defined as asymmetrical/freeform. citeturn28search0  
3. Adjust shadow tokens to a softer “natural light” feel and reduce harsh elevation.  
4. Add a single texture overlay utility and keep it subtle to avoid heavy visual weight. citeturn27search0

### Pattern implementation steps

1. Hero: blob backdrop + gentle texture overlay + optional botanical line art in a corner (low opacity).
2. Card grid: add “featured card” variant with slightly more organic shape and a warmer surface.
3. Section headers: replace straight dividers with hand-drawn line dividers (minimal).
4. Editorial content: increase line-height slightly and use warm-muted text token for secondary copy.

### Motion and interaction steps

1. Replace mechanical easing with softer easing curves for hover/fade (keep durations short; avoid “floaty gimmicks” on everything).
2. Use motion sparingly—organic motion should feel like subtle drift, not constant animation.
3. Ensure touch targets remain large and obvious; organic shapes should not reduce tappable area.

## Figma Make prompt template for this redesign

Use this as your base “system prompt” to feed into Figma Make. It is intentionally written to match the repo’s constraints (tokens, no hardcoding, no inline styles) and the desired organic visual direction.

```text
Redesign goal:
Re-style the existing Tour Operator prototype into a new “organic” visual direction (warm, tactile, nature-inspired), without changing the information architecture or route structure.

Non-negotiables:
- Do not add inline style={{ }} attributes (except motion animation values or dynamic CSS custom properties).
- Do not hardcode colours, fonts, sizes, spacing, radius, or shadows in components.
- Use the existing design token system (CSS variables) and WordPress-aligned class naming.
- Dark mode must continue to work via token switching (no duplicated dark-mode utility overrides).

Design direction (organic, modern, refined):
- Neutral, warm base surfaces (paper/cream), with muted botanical greens and earthy accents (terracotta/amber) used sparingly.
- Soft, asymmetrical organic shapes for key hero and featured elements (blob/pebble shapes), but keep most UI controls clean and usable.
- Add subtle natural texture (micro-grain) as an optional overlay for hero/featured sections only. Keep it lightweight and subtle.
- Add minimal hand-drawn linework for section dividers and small corner flourishes (low opacity, not cluttered).

Implementation requirements:
- Update theme tokens first (light and dark semantic colours, shadows, radii/shape tokens).
- Add reusable organic utilities (texture overlay class, blob backdrop class, hand-drawn divider class).
- Apply organic styling primarily through pattern CSS (hero, cards, CTA, editorial sections), not by rewriting every component.
- Keep readability and whitespace: avoid visually heavy texture everywhere.

Deliverables:
- Updated theme tokens + any new organic tokens.
- Updated pattern styling for hero, card grid/cards, CTA, and editorial content to reflect the organic direction.
- Ensure accessibility: heading hierarchy, focus states, contrast, and touch targets remain strong.
```

This prompt follows the core “organic” characteristics (neutral colours, organic shapes, textures, craftcore details) described by Envato, while also respecting Designmodo’s caution about texture heaviness and clutter. citeturn28search0turn27search0