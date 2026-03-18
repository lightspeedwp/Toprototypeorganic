# Audit WebGL — Canvas & WebGL Usage Inventory

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit webgl`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

**Important:** This environment does not support the `konva` React package. Use raw Canvas API or WebGL directly.

---

## Prompt Purpose

**Objective:** Inventory all existing canvas and WebGL usage in the codebase, assess performance impact, identify safe integration points for future WebGL enhancements, and ensure all visual effects respect `prefers-reduced-motion` and `prefers-color-scheme` standards.

**When to Use:** Before planning WebGL hero effects, background geometry, or particle systems. Also useful as a pre-performance audit for visual effects.

---

## Workflow Steps

### Step 1: Existing Canvas/WebGL Inventory

Scan the entire codebase for:

1. **Canvas elements:** Search for `<canvas` in all `.tsx` files.
2. **WebGL contexts:** Search for `getContext('webgl')`, `getContext('2d')`, `getContext('webgl2')`.
3. **Animation libraries:** Search for Three.js, PixiJS, p5.js, or any WebGL wrapper imports.
4. **CSS-based alternatives:** Identify existing visual effects implemented with CSS (gradients, `backdrop-filter`, `filter`, `mix-blend-mode`, `clip-path`) — organic texture overlays, shape decorations.
5. **Shader usage:** Search for GLSL shader strings or `.glsl`/`.frag`/`.vert` file imports.

### Step 2: Performance Impact Assessment

For each existing canvas/WebGL instance:

1. **Frame rate impact:** Does it run on `requestAnimationFrame`? Is it throttled?
2. **Memory usage:** Are textures, buffers, and contexts properly disposed on unmount?
3. **Resize handling:** Does it respond to `window.resize` without leaking listeners?
4. **Mobile impact:** Is it disabled or simplified on mobile viewports (< 768px)?

### Step 3: Safe Integration Points

Recommend locations where WebGL could enhance the organic design aesthetic:

1. **Hero backgrounds:** Subtle animated organic textures, flowing gradients, or nature-inspired particle fields behind hero content.
2. **Section transitions:** Smooth organic transitions between page sections.
3. **Accent elements:** Small canvas-based effects that complement the warm, travel-oriented design.
4. **Interactive elements:** Hover-triggered effects on tour/destination cards.

For each recommendation, specify:
- **Fallback:** CSS-only alternative when WebGL is unavailable.
- **Disable conditions:** `prefers-reduced-motion: reduce`, low-power devices, mobile viewports.

### Step 4: Accessibility & Motion Compliance

1. **`prefers-reduced-motion`:** All canvas animations MUST check this media query.
2. **`prefers-color-scheme`:** Effects MUST respect theme mode via CSS variables from `theme-light.css`/`theme-dark.css`.
3. **Focus management:** Canvas elements must not trap keyboard focus — `aria-hidden="true"` for decorative canvases.
4. **Seizure safety:** No effects should flash more than 3 times per second (WCAG 2.3.1).

### Step 5: Report

Save report to `/reports/YYYY-MM/webgl-audit.md`.

---

## Success Criteria

- [ ] Complete inventory of all canvas/WebGL usage
- [ ] Performance impact documented for each instance
- [ ] Safe integration points identified with fallbacks
- [ ] All effects respect `prefers-reduced-motion` and `prefers-color-scheme`
- [ ] No seizure-risk flash rates
- [ ] Report saved to `/reports/`
