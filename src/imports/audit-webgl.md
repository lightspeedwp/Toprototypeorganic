# Audit WebGL — Canvas & WebGL Usage Inventory

**Type:** Audit  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `audit webgl`

---

## Prompt Purpose

**Objective:** Inventory all existing canvas and WebGL usage in the codebase, assess performance impact, identify safe integration points for future WebGL enhancements, and ensure all visual effects respect `prefers-reduced-motion` and `prefers-color-scheme` standards.

**When to Use:** Before planning WebGL hero effects, background geometry, or particle systems. Also useful as a pre-performance audit for visual effects.

**Reference Guidelines:**
- `/guidelines/design-tokens/animations.md`
- `/guidelines/design-tokens/dark-light-mode.md`
- `/guidelines/accessibility.md`
- `/guidelines/performance.md`

**Important:** This environment does not support the `konva` React package. Use raw Canvas API or WebGL directly.

---

## Workflow Steps

### Step 1: Existing Canvas/WebGL Inventory

Scan the entire codebase for:

1. **Canvas elements:** Search for `<canvas` in all `.tsx` files — list every instance with file path and purpose.
2. **WebGL contexts:** Search for `getContext('webgl')`, `getContext('2d')`, `getContext('webgl2')` — list usage.
3. **Animation libraries:** Search for Three.js, PixiJS, p5.js, or any WebGL wrapper imports.
4. **CSS-based alternatives:** Identify existing visual effects implemented with CSS (gradients, `backdrop-filter`, `filter`, `mix-blend-mode`, `clip-path`) that could be candidates for WebGL enhancement or that already serve the same purpose.
5. **Shader usage:** Search for GLSL shader strings or `.glsl`/`.frag`/`.vert` file imports.

### Step 2: Performance Impact Assessment

For each existing canvas/WebGL instance found:

1. **Frame rate impact:** Does it run on `requestAnimationFrame`? Is it throttled?
2. **Memory usage:** Are textures, buffers, and contexts properly disposed on unmount?
3. **Resize handling:** Does it respond to `window.resize` without leaking listeners?
4. **Mobile impact:** Is it disabled or simplified on mobile viewports (< 768px)?
5. **GPU load:** Estimate complexity (particle count, shader passes, geometry vertices).

### Step 3: Safe Integration Points

Recommend locations where WebGL could enhance the Funky Neon aesthetic without harming UX:

1. **Hero backgrounds:** Subtle animated mesh grids, floating particle fields, or organic noise textures behind hero content. Must not compete with text readability.
2. **Section transitions:** Smooth gradient transitions or parallax depth effects between page sections.
3. **Accent elements:** Small canvas-based glow effects, orb animations, or data visualizations that supplement CSS effects.
4. **Loading states:** Skeleton shimmer effects or progress indicators that benefit from GPU acceleration.
5. **Interactive elements:** Hover-triggered ripple effects, magnetic cursor effects, or parallax card tilts.

For each recommendation, specify:
- **Performance budget:** Maximum acceptable frame time impact.
- **Fallback:** What CSS-only alternative should render when WebGL is unavailable.
- **Disable conditions:** `prefers-reduced-motion: reduce`, low-power devices, mobile viewports.

### Step 4: Accessibility & Motion Compliance

1. **`prefers-reduced-motion`:** All canvas animations MUST check this media query and either stop or reduce to static rendering.
2. **`prefers-color-scheme`:** WebGL effects MUST respect theme mode — read CSS variables or respond to theme class changes for color palette.
3. **Focus management:** Canvas elements must not trap keyboard focus — ensure proper `tabIndex` and `aria-hidden="true"` for decorative canvases.
4. **Screen reader:** Decorative canvases must be hidden from assistive technology. Interactive canvases must have ARIA descriptions.
5. **Seizure safety:** No effects should flash more than 3 times per second (WCAG 2.3.1).

### Step 5: Report

Save report to `/reports/YYYY-MM/webgl-audit.md` with:
- Existing canvas/WebGL inventory (file, purpose, performance notes)
- Performance impact assessment per instance
- Recommended integration points with fallbacks
- Accessibility compliance status
- Priority recommendations (what to add, what to optimize, what to remove)

---

## Success Criteria

- [ ] Complete inventory of all canvas/WebGL usage in codebase
- [ ] Performance impact documented for each instance
- [ ] Safe integration points identified with fallback strategies
- [ ] All effects respect `prefers-reduced-motion` and `prefers-color-scheme`
- [ ] No seizure-risk flash rates in any visual effect
- [ ] Report saved to `/reports/`
