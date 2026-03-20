# Expand Animations — Discover & Propose Animation Enhancements

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand animations`  
**Repeatable:** Yes — run after adding new pages or sections  
**Estimated Duration:** 1 session (10-20 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/design-tokens/animations.md` — Transitions & easing tokens
- `/guidelines/rules/design-system-rules.md` — Styling compliance

---

## Design System Rules

- ALL animation durations and easings via CSS variables from design tokens
- `prefers-reduced-motion` must be respected for ALL animations
- Use `motion/react` for complex animations (import as `motion` from `motion/react`)
- CSS transitions for simple hover/focus states
- Zero Margin Policy still applies in animated layouts

---

## Purpose

Discover pages and sections that would benefit from **scroll-triggered animations, micro-interactions, page transitions, or CSS transitions** aligned with the design system's animation tokens. Propose animations that enhance storytelling and user engagement without sacrificing performance or accessibility.

---

## Animation Categories

### 1. Scroll-Triggered Entrance Animations

- **Fade up** — content fades in and slides up on scroll
- **Stagger** — cards/items animate in sequence
- **Reveal** — sections reveal from a clip-path
- **Counter** — numbers count up when stats section enters viewport
- **Progress** — skill bars or timeline fills on scroll

### 2. Micro-Interactions

- **Button press** — subtle scale-down on click
- **Card hover** — lift with shadow, image zoom
- **Icon animation** — icons animate on hover (rotate, bounce, pulse)
- **Toggle transitions** — smooth state changes (accordion, tabs, filters)
- **Form feedback** — input focus glow, validation shake, success check

### 3. Page/Route Transitions

- **Cross-fade** — content fades between route changes
- **Slide** — pages slide in from direction
- **Shared element** — card image transitions to hero on detail page

### 4. Ambient/Decorative

- **Parallax** — background layers move at different scroll speeds
- **Floating elements** — subtle floating decorative shapes
- **Gradient shift** — slow colour gradient animation
- **Cursor effects** — subtle cursor-following highlight

---

## Steps

### Step 1: Inventory Existing Animations

1. Search for `transition` in CSS files
2. Search for `@keyframes` in CSS files
3. Search for `motion` or `framer-motion` imports in TSX files
4. Search for `animation` CSS properties
5. Check for `prefers-reduced-motion` media queries

| Component | Animation Type | CSS/JS | Reduced Motion? |
|-----------|---------------|--------|----------------|
| Header | Menu slide | CSS transition | ❌ |
| Cards | Hover lift | CSS transition | ✅ |

### Step 2: Map Pages to Animation Opportunities

For each page, assess which sections would benefit:

| Page | Section | Current | Proposed Animation | Type | Impact |
|------|---------|---------|-------------------|------|--------|
| Home | Hero | Static | Fade-up entrance | Scroll | High |
| Home | Stats | Static | Counter animation | Scroll | Medium |
| Home | Card Grid | Static | Stagger entrance | Scroll | Medium |
| Tours Archive | Filter results | Instant | Fade/layout animation | Interaction | Medium |
| Tour Detail | Gallery | Static | Image transitions | Interaction | Medium |

### Step 3: Define Animation Tokens Needed

Cross-reference with existing animation tokens:

| Token | Exists? | Value | Used By |
|-------|---------|-------|---------|
| `--transition-duration-fast` | Check | 150ms | Hover states |
| `--transition-duration-normal` | Check | 300ms | Entrances |
| `--transition-duration-slow` | Check | 500ms | Page transitions |
| `--transition-easing-default` | Check | ease-out | Most animations |
| `--transition-easing-spring` | Check | cubic-bezier(...) | Bouncy interactions |

### Step 4: Generate Proposals

For each recommendation:

```
### Proposed: Scroll-Triggered Fade-Up

**Component:** `/src/app/components/common/ScrollReveal.tsx`
**CSS:** `/src/styles/common/scroll-reveal.css`
**Library:** `motion/react` (already installed) or pure CSS with IntersectionObserver

**Behaviour:**
- Elements fade in and translate up 20px when entering viewport
- Stagger option for lists (50ms delay between items)
- Respects `prefers-reduced-motion` (no animation, instant display)
- Uses `--transition-duration-normal` and `--transition-easing-default`

**Usage:**
```jsx
<ScrollReveal>
  <h2>Section Title</h2>
</ScrollReveal>

<ScrollReveal stagger={50}>
  {cards.map(card => <Card key={card.id} {...card} />)}
</ScrollReveal>
```

**Effort:** Low
**Performance Impact:** Minimal (IntersectionObserver)
**A11y:** ✅ Reduced motion respected
```

### Step 5: Prioritise

| # | Animation | Pages Affected | Effort | Performance | Priority |
|---|-----------|---------------|--------|-------------|----------|
| 1 | ScrollReveal (fade-up) | All | Low | Minimal | High |
| 2 | Card hover lift | All cards | Low | Minimal | High |
| 3 | Counter animation | Home, About | Medium | Minimal | Medium |
| 4 | Page transitions | All routes | High | Low | Low |
| 5 | Parallax hero | Home, Detail | Medium | Medium | Low |

### Step 6: User Decision

Present recommendations. Wait for approval.

---

## Rules

1. **`prefers-reduced-motion` is mandatory** — every animation must have a static fallback
2. **CSS variables for all timing** — use animation design tokens
3. **No layout thrashing** — avoid animating `width`, `height`, `top`, `left`
4. **Transform and opacity only** — for GPU-accelerated, jank-free animation
5. **Lazy-load animation libraries** — don't block initial render
6. **Never auto-implement** — present proposals and wait for approval
7. **Motion is the package** — import from `motion/react`, not `framer-motion`

---

## Success Criteria

- [ ] Existing animations inventoried
- [ ] Animation token coverage checked
- [ ] Pages mapped to animation opportunities
- [ ] Proposals include a11y and performance assessment
- [ ] Priority ranking by impact and effort
- [ ] Recommendations presented for user approval
