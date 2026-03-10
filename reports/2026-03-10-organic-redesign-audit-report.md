# Organic Redesign Audit & Implementation Report

**Date:** March 10, 2026
**Subject:** Readiness & Roadmap for "Acacia Drift" Organic Theme Integration
**Reference Prompt:** `/prompts/organic-redesign-audit-prompt.md`

---

## Executive Summary
An exhaustive audit of the Tour Operator prototype’s codebase has been conducted to verify readiness for the "Acacia Drift" organic redesign. The overarching CSS architecture (orchestrated through `index.css` and `theme.css`) is robust and highly compatible with the new `.theme-organic` overlay strategy. The foundation for the organic design tokens (e.g., `theme-organic-light.css`, `organic/utilities.typography.css`) is already present. Key areas of focus for the implementation phase will be removing margin-based layout spacing in favor of the new **Zero Margin Policy**, implementing **Organic Wrappers**, and restricting typography to the designated 5 fonts.

---

## 1. Code & Token Audit Findings

### CSS Architecture
* **Strengths:** The system separates structural scale tokens (`theme-base.css`) from semantic palettes (`theme-light.css`, `theme-dark.css`). 
* **Organic Overlay:** The `/src/styles/organic/` directory and `theme-organic.css` orchestrator are in place.

### Variable Usage & Compliance
* **Typography:** Core files correctly map to `var(--font-family-lora)` and `var(--font-family-noto-sans)`.
* **Zero Margin Policy Violations:** Certain legacy layout patterns currently utilize `mb-` or `mt-` Tailwind utilities for vertical rhythm. These violate the new CSS grid/flex gap spacing rules and must be refactored.
* **Inline Styles:** Most inline `style={{...}}` usage is properly constrained to `motion` (Framer Motion) dynamic values (e.g., in `SwipeableCard.tsx`, `BottomSheet.tsx`). Minor static inline styles discovered in `LoadingState.tsx` and `Skeleton.tsx` will need migration to proper CSS classes.

---

## 2. Target Elements Needing Refactoring

1. **Hero Sections (`<Hero />`, `<HeroStandard />`)**
   * **Action:** Wrap in `.organic-section-top`. 
   * **Visuals:** Add `.blob-backdrop` behind the text container and incorporate level 3 (20-25%) `.overlay--grain` texture.
2. **Card Grids (`<CardGrid />`, `<DestinationCard />`)**
   * **Action:** Refactor all margin utilities (`mb-X`) to flex or grid containers using `--spacing-gap-*` tokens. 
   * **Visuals:** Soften `.rounded-*` borders. Add `.overlay--grain` at level 2 (10-15%).
3. **Editorial Blocks (`<EditorialContent />`)**
   * **Action:** Wrap in `.organic-section-middle`. 
   * **Visuals:** Inject `.hand-drawn-divider` elements between major content chunks.
4. **CTAs & Navigation**
   * **Action:** Wrap bottom-of-page CTAs in `.organic-section-bottom`. Ensure buttons adhere to minimum 44px touch targets. 

---

## 3. Organic Design System Blueprint

* **Colours & Palette Journey:**
  * **Top (Savanna Sunset):** Warm cream/sand backgrounds (`var(--o-surface-sun)`), terracotta accents.
  * **Middle (Acacia & Clay):** Paper beige (`var(--o-surface-clay)`), botanical green primaries.
  * **Bottom (Minimal Earth):** Linen surfaces (`var(--o-surface-linen)`), muted olive tones.
* **Typography Rules:**
  * **Headings:** Lora (`var(--font-family-lora)`).
  * **Body:** Noto Sans (`var(--font-family-noto-sans)`).
  * **Accents/Flourishes (Used Sparingly):** Caveat or Shadows Into Light. 
  * **Code/System:** Courier New.
* **Texture & Materials:** Micro-grain noise overlays via `mix-blend-mode` to simulate tactile paper without heavy raster images.

---

## 4. SVG Asset Generation Prompts

To generate the necessary vector assets for this redesign, the following prompts should be utilized:
1. **Grain Texture:** *"Subtle paper grain texture tile with recycled paper fibres and speckles, 5% opacity noise, seamless SVG filter."*
2. **Blob Masks:** *"Soft abstract pebble shapes overlapping in warm cream and sage tones, irregular organic outlines, SVG mask suitable for background layers."*
3. **Botanical Details:** *"Fine botanical line art of savannah grasses and acacia leaves, thin strokes, low-opacity, suitable for corner flourishes."*
4. **Wildlife Silhouettes:** *"Savannah wildlife silhouettes (giraffe, elephant) in a minimal, modern style with softened, rounded forms."*
5. **Hand-Drawn Dividers:** *"Thin, hand-drawn horizontal line separator with slight imperfections and a slight curve."*

---

## 5. WebGL Integration Plan

* **2D Hero Blob Canvas:** A lightweight WebGL context will render gently morphing, organic 2D blobs behind the Hero text layer (`pointer-events: none`).
* **3D Safari Map (Deep Page):** An interactive 3D terrain map (via Three.js) for exploring specific tours, injected via lazy loading to prioritize initial page performance.
* **Accessibility / Fallbacks:**
  * CSS `prefers-reduced-motion: reduce` media queries will immediately pause WebGL rendering and lock shaders to a static frame.
  * For non-WebGL environments, the system will fall back to a static `.blob-backdrop` SVG.

---

## 6. Implementation Roadmap

- [x] **Phase 1: Architecture Setup**
  - Integrate Acacia Drift SVG logos via base64 data URIs.
  - Establish `theme-organic-*` CSS files in `/styles`.
  - Update `Guidelines.md` with the 5-font rule, Zero Margin policy, and Organic Wrapper policy.
- [ ] **Phase 2: Layout & Spacing Migration**
  - Audit all `.tsx` pages to strip margin classes (`mb-*`, `mt-*`, `mx-*`, `my-*`).
  - Implement `.organic-section-*` structural wrappers across all archetypal pages.
- [ ] **Phase 3: Component Visuals**
  - Integrate SVG grain filters and soft-radius tokens into standard UI elements (Cards, Buttons).
  - Apply Caveat / Shadows Into Light font utilities to microcopy and decorative elements.
- [ ] **Phase 4: Enhancements & Testing**
  - Inject WebGL canvases where appropriate.
  - Validate WCAG AA contrast (4.5:1 minimum) in both Light and "Warm Night Mode".
  - Ensure touch targets are ≥ 44x44px and focus states are visible.