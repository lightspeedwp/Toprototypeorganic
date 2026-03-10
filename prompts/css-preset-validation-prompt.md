# WordPress-Aligned CSS Preset Validation & Migration Audit

**Objective:** 
Before refactoring hardcoded Tailwind utility classes out of our React components, we must first audit and update our CSS stylesheets (`/src/styles/*.css`) to guarantee all necessary WordPress-aligned CSS presets exist. 

This prompt serves as the orchestrator to validate the existence of semantic variables, update our design tokens documentation, and enhance our developer tools to reflect the newly shifted stylesheet logic.

---

## Phase 1: Stylesheet Variable Validation & Creation
*Target Files:* `/src/styles/theme.css`, `/src/styles/theme-light.css`, `/src/styles/theme-dark.css`, `/src/styles/global.css`

Audit these files and create missing CSS custom properties ensuring they map to WordPress `theme.json` concepts. Use BEM-oriented custom classes where utility variables aren't enough.

**1. Layout Widths (Theme.json `layout` equivalency):**
- Verify/create variables for global structural sizing:
  - `--wp--style--global--content-size` (or `--layout-content-width`)
  - `--wp--style--global--wide-size` (or `--layout-wide-width` - e.g., 1440px)
  - Full width is handled natively via viewport width `100vw` or layout shell logic.

**2. Spacing & Margin Zeroing:**
- **Zero Margin Policy:** Establish strict rules using `gap` / `blockGap` for spatial relationships. Verify variables like `--spacing-block-gap` or equivalent exist.
- **Padding:** Verify fluid padding presets (`--spacing-px-sm`, `--spacing-py-md`, etc.) mapped to WP step spacing.
- **Negative Margins:** Ensure explicit exceptions for negative margins are documented for display elements.

**3. Typography (Font Scales & Families):**
- **Fonts:** Ensure ONLY Lora, Noto Sans, and Courier New exist as `--font-family-*`. Remove any stray font-family rules.
- **Scales:** Replace all Tailwind text classes (e.g., `text-[10px]`, `text-2xl`) with WordPress-aligned typography variables (e.g., `--text-xs`, `--text-step-0`).
- **Weights:** Verify bold/semibold/medium/normal variables exist and are strictly mapped to our accepted weights.

**4. Colors & Gradients:**
- Verify global styles for all semantic colors (`--primary`, `--secondary`, `--accent`, `--muted`, `--card`, `--destructive`, `--success`, `--background`, `--foreground`).
- Map gradients securely to variables (e.g., `--gradient-hero`).

**5. Presets (Radii, Shadow, Border):**
- **Radii:** Variables for `--radius-sm` through `--radius-full`.
- **Shadows/Elevation:** Variables for `--elevation-sm`, `--elevation-md`, etc., following the brutalist or specified design logic.
- **Borders:** Variables for border widths and standardized border colors (`--color-border`).

**6. Touch Targets & Hardcoded Sizing:**
- *Crucial:* Add new variables for interactive and hardcoded UI sizes:
  - `--touch-target-min` (e.g., 44px for WCAG AA)
  - `--ui-height-sm`, `--ui-height-md`, `--ui-height-lg`
  - Ensure UI components (tabs, tooltips, buttons) consume these variables instead of `h-[44px]` or `min-w-[80px]`.

---

## Phase 2: Design System Guidelines Update
*Target Directory:* `/guidelines/design-tokens/`

Once the CSS variables in Phase 1 are finalized, audit and update the corresponding documentation files:
- `/guidelines/design-tokens/colors.md`
- `/guidelines/design-tokens/typography.md`
- `/guidelines/design-tokens/spacing.md`
- `/guidelines/design-tokens/borders.md`
- `/guidelines/design-tokens/radii.md`
- `/guidelines/design-tokens/shadows.md`

*Rule:* Every newly created or updated CSS variable MUST be documented in its respective file, emphasizing the alignment with WordPress concepts.

---

## Phase 3: Developer Tools Enhancement
*Target Files:* `/src/app/pages/dev-tools/*.tsx`, `/src/app/components/common/TemplateBrowser.tsx`, `/src/app/utils/designTokenHelper.ts`

Update the internal diagnostic and developer tools to expose the newly fortified CSS variables:
1. Update `DesignTokensReference.tsx` and `DesignSystemPlayground.tsx` to read/display the custom `--*` CSS variables rather than hardcoded Tailwind utilities.
2. Refactor `designTokenHelper.ts` to output our strict CSS variable classes instead of Tailwind presets where applicable.
3. Ensure the `Compliance Scorecard` and `Component Auditor` tools are tracking usage of `--touch-target-min` and the new typography/layout variables instead of raw Tailwind classes.

---

## Phase 4: Execution Checklist
- [ ] Read all `/src/styles/` files to establish the baseline.
- [ ] Inject missing layout widths, blockGaps, and touch target variables.
- [ ] Validate and enforce the Zero Margin policy across spacing variables.
- [ ] Update all token markdown files in `/guidelines/design-tokens/`.
- [ ] Update `/dev-tools/` components to visualize the new variables.
- [ ] Provide the user with a summary report of the newly mapped variables to proceed with component refactoring.