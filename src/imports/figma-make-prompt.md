# Consolidated Q&A + Figma Make Master Prompt

## Brief Summary
This merges your answers into one decision-complete Q&A set and provides a single prompt you can paste into Figma Make (or your orchestration assistant) for this React tour-operator prototype.  
Workflow priority is locked to: guidelines/docs review first, then orchestrator audit, then audit report, then implementation plan.

## Single Merged Q&A
1. **Q: Fluid scale at 1920 (example `--text-6xl` now 72 max) — increase?**  
   **A:** Yes. Use `clamp()` and raise large-display max sizes; target `--text-6xl` up to `96px` at large desktop.

2. **Q: Margin elimination scope?**  
   **A:** Remove margins from patterns/parts/templates layout orchestration. Keep semantic flow margins for `h1-h6`, `p`, and content prose.

3. **Q: Breakpoint strategy — many breakpoints vs clamp-first?**  
   **A:** Clamp-first for fluid type/spacing. Media queries only for structural changes (grid columns, nav/layout shifts).

4. **Q: Which breakpoints?**  
   **A:** Use: `320, 480, 640, 768, 1024, 1280, 1440, 1600, 1920` (mobile-first).

5. **Q: 5-6 column progression on wide screens?**  
   **A:** `1 (320–639), 2 (640–1023), 3 (1024–1279), 4 (1280–1439), 5 (1440–1679), 6 (1680+)`.

6. **Q: `blockGap` as central WP variable?**  
   **A:** Yes. Canonical `--wp--style--block-gap` mapped to fluid gap (16–32).

7. **Q: Extend spacing presets?**  
   **A:** Keep WP preset tokens stable; add project-level aliases where needed (`--gap-stack`, `--gap-grid`, etc.) mapped back to canonical scales.

8. **Q: Vertical vs horizontal `blockGap`?**  
   **A:** Support both unified `gap` and split `row-gap`/`column-gap` for layout-specific control.

9. **Q: How does WordPress handle block gap classes?**  
   **A:** Through layout wrappers (`is-layout-flow`, `is-layout-flex`, `is-layout-grid`) and `--wp--style--block-gap`; mirror this behavior in project classes/utilities.

10. **Q: Vertical rhythm without margins — spacer blocks?**  
    **A:** Spacer block is forbidden. Wrap sections/components in stack/grid containers using `gap` + padding.

11. **Q: Container max width on 1920?**  
    **A:** Expand max container from `1440` to `1680` with fluid side gutters for airy composition.

12. **Q: Class naming standard?**  
    **A:** Use WP-aligned project prefix: `.wp-block-tour-*` and related WP-style classes; no Tailwind utility-class authoring.

13. **Q: Guideline consolidation approach?**  
    **A:** Consolidate into 3 master docs: `Architecture`, `Tokens`, `Responsive/Layout`; archive old docs as reference.

14. **Q: Tailwind config alignment?**  
    **A:** Do not use Tailwind for prototype authoring; use React + CSS variables + WP-aligned classes.

15. **Q: Typography family policy?**  
    **A:** Lora for headings; Noto Sans for body/UI; mono only for technical values (booking IDs/reference codes).

16. **Q: Which mobile docs are most outdated?**  
    **A:** Prioritize spacing scale docs, breakpoint docs, and grid behavior docs.

17. **Q: Known inaccurate/legacy tokens to target first?**  
    **A:** Target legacy token usage drift first (`--text-*`, old font-family aliases, and mismatched docs vs current WP preset variables).

18. **Q: Should section vertical padding be highly fluid?**  
    **A:** Yes. Use fluid section scales (roughly 40 mobile up to 160 desktop depending on section tier).

19. **Q: Should `complianceScorecard.ts` fail all margin usage?**  
    **A:** Fail non-exempt margin usage in patterns/parts/templates. Allow exceptions list for semantic prose flow, accessibility helpers, print, and auto-centering patterns.

20. **Q: Audit scope — all CSS or only updated files?**  
    **A:** Audit all CSS files, prioritize token-source and global architecture layers first, then component/block styles.

21. **Q: `theme.json` source?**  
    **A:** Use mapping from current CSS custom properties as source of truth.

22. **Q: Fluid implementation method (320→1920)?**  
    **A:** Combination approach: `clamp()` + structural media queries + container queries where component-level behavior benefits.

23. **Q: Preferred spacing scales?**  
    **A:** Mobile mins: `4, 8, 12, 16, 24, 32, 48`. Large-screen maxes: `8, 16, 24, 32, 48, 64, 96`.

24. **Q: Grid system preference?**  
    **A:** CSS Grid with auto-fit/minmax where useful, with explicit breakpoint column caps for archive predictability.

25. **Q: Margin migration priority and rollout?**  
    **A:** High: global/shared components (header/footer/card grid). Medium: page-specific. Low: dev/demo. Roll out phased, not big-bang.

26. **Q: Block gap scope (WP support, CSS gap, custom var)?**  
    **A:** All of the above, unified under WP-aligned variable contract.

27. **Q: Guidelines and CSS architecture detail level?**  
    **A:** All of the above: high-level map + detailed token reference + migration guide.

28. **Q: Timeline phases?**  
    **A:**  
    Phase 1: guidelines/docs audit + updates.  
    Phase 2: codebase audit + report + task lists + human review list.  
    Phase 3: implementation (margin elimination, fluid spacing/type, responsive grid).  
    Phase 4: verification/regression pass, governance checks, and rollout sign-off.