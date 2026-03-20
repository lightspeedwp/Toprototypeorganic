# Expand WebGL — Discover & Recommend WebGL Integrations

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand webgl`  
**Repeatable:** Yes — run after adding new page types or content areas  
**Estimated Duration:** 1 session (10-20 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/Guidelines.md` — Page archetypes, content architecture
- `/guidelines/overview-components.md` — Component architecture

---

## Design System Rules (apply to ALL generated/modified UI)

- ALL styling via CSS variables from `/src/styles/theme-base.css`, `/src/styles/theme-light.css`, `/src/styles/theme-dark.css`
- Typography: ONLY approved font faces via CSS variables
- Icons: `@phosphor-icons/react` (default) — `lucide-react` is legacy
- Canvas-based drawing: use canvas directly (no konva)

---

## Purpose

Review page briefs, content types, and the overall project context to recommend **Canvas and WebGL-based visual enhancements** that would add visual impact, interactivity, or storytelling power. Focus on enhancements that serve the tour operator context — maps, 3D terrain, interactive globes, particle effects for ambient mood, etc.

**Important:** All canvas/WebGL implementations must use the Canvas API directly — `konva` is not supported in this environment.

---

## Candidate Integrations

### High-Impact (Tour Operator Context)

1. **Interactive Globe** — 3D rotating globe showing destinations with clickable markers
2. **Route Visualiser** — animated line drawing showing tour itineraries on a map
3. **Parallax Hero Backgrounds** — depth-based scrolling effects for hero sections
4. **Particle Atmosphere** — subtle floating particles for ambient mood (stars, dust motes, fireflies)
5. **Image Reveal Effects** — canvas-based image transitions on scroll

### Medium-Impact (General Enhancement)

6. **Animated Counter** — canvas-based number animation for statistics
7. **Wave Dividers** — animated SVG/canvas section dividers
8. **Gradient Mesh** — dynamic colour mesh backgrounds
9. **Mouse Trail Effects** — subtle cursor-following visual feedback
10. **Loading Animations** — branded canvas-based loading states

### Low-Impact (Nice-to-Have)

11. **Background Noise Texture** — subtle grain overlay via canvas
12. **Confetti/Celebration** — for booking confirmation or special offers
13. **Scroll Progress Indicator** — visual scroll position via canvas

---

## Steps

### Step 1: Inventory Existing Canvas/WebGL Usage

1. Search for `<canvas` elements across all `.tsx` files
2. Search for `getContext('2d')` or `getContext('webgl')` usage
3. Search for any WebGL library imports
4. Build current usage map:

| Component | Type | Page | Purpose |
|-----------|------|------|---------|
| [name] | Canvas 2D / WebGL | [page] | [purpose] |

### Step 2: Analyse Pages for Enhancement Opportunities

For each page type, assess which WebGL integrations would add value:

| Page | Current Visual Treatment | Enhancement Opportunity | Integration Type |
|------|------------------------|------------------------|-----------------|
| Home | Static hero image | Interactive globe with destinations | WebGL (high) |
| Tour Detail | Static itinerary list | Route visualiser on map | Canvas 2D (medium) |
| Destinations Archive | Card grid | Globe with markers | WebGL (high) |
| About | Static sections | Particle atmosphere | Canvas 2D (low) |

### Step 3: Assess Technical Feasibility

For each candidate:

| Integration | Complexity | Performance Impact | Fallback Strategy | Dependencies |
|-------------|-----------|-------------------|-------------------|-------------|
| Globe | High | Medium (WebGL) | Static map image | None (raw WebGL) |
| Particles | Low | Low (2D canvas) | Remove silently | None |
| Route viz | Medium | Low (2D canvas) | Static image | None |

### Step 4: Generate Recommendations

```
### WebGL Expansion Proposals — [Today's Date]

| # | Priority | Integration | Target Page(s) | Complexity | Performance |
|---|----------|------------|----------------|-----------|-------------|
| 1 | High | Interactive Globe | Home, Destinations | High | Medium |
| 2 | Medium | Particle Atmosphere | Home hero, About | Low | Low |
| 3 | Medium | Route Visualiser | Tour Detail | Medium | Low |
| 4 | Low | Wave Dividers | All sections | Low | Minimal |
```

### Step 5: Accessibility & Performance Notes

For each recommendation, specify:
- **Reduced motion:** Must respect `prefers-reduced-motion`
- **Fallback:** What non-WebGL users see
- **Performance budget:** Max impact on Core Web Vitals
- **Keyboard navigation:** How interactive elements handle focus

### Step 6: User Decision

Wait for approval before implementing any integration.

---

## Rules

1. **Canvas API only** — no konva, no three.js unless user explicitly requests
2. **Respect `prefers-reduced-motion`** — all animations must have static fallbacks
3. **Performance first** — never degrade Core Web Vitals for visual flair
4. **Progressive enhancement** — page must work without WebGL
5. **CSS variables for colours** — canvas draw calls must read from CSS custom properties
6. **Never auto-implement** — present proposals and wait for approval
7. **Lazy load** — all canvas/WebGL components must be lazy-loaded

---

## Success Criteria

- [ ] Existing canvas/WebGL usage inventoried
- [ ] Each page assessed for enhancement opportunities
- [ ] Technical feasibility evaluated per integration
- [ ] Accessibility and performance impacts documented
- [ ] Prioritised proposals presented for user decision
