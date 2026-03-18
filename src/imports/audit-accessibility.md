# Audit Accessibility — Comprehensive WCAG 2.1 AA Audit

**Type:** Audit  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `audit accessibility`

---

## Prompt Purpose

**Objective:** Comprehensive accessibility audit covering focus visibility, keyboard navigation, ARIA labelling for icon-only buttons, and touch target sizing — with strict enforcement of AA baseline (24x24) and 44x44 for important controls.

**When to Use:** As a deep-dive complement to `audit a11y`. Use this for the full audit; use `audit a11y` for quick checks.

**Reference Guidelines:**
- `/guidelines/accessibility.md`
- `/guidelines/design-tokens/touch-targets.md`
- `/guidelines/design-tokens/forms.md`
- `/guidelines/design-tokens/buttons.md`

---

## Workflow Steps

### Step 1: Focus Visibility Audit

Scan all `.tsx` and `.css` files for:

1. **`:focus-visible` styles:** Every interactive element (buttons, links, inputs, selects, textareas, checkboxes, radios) MUST have a visible `:focus-visible` style. Search for elements missing this.
2. **Focus ring styling:** Focus indicators must use `outline: 2px solid var(--primary)` with `outline-offset` — no `outline: none` without replacement.
3. **Custom focus:** Components with custom focus styling (box-shadow, border-color change) must be clearly visible and meet 3:1 contrast against adjacent colors.
4. **Focus suppression:** Search for `outline: none`, `outline: 0`, or `:focus { outline: none }` — these are violations unless paired with a replacement focus indicator.
5. **Focus within:** Verify composite components (dropdowns, accordions, tab panels) manage focus correctly within their scope.

### Step 2: Keyboard Navigation

1. **Tab order:** Interactive elements are reachable via Tab key in logical DOM order.
2. **Escape key:** Modals, dropdowns, and popovers close on Escape.
3. **Arrow keys:** Tab panels, radio groups, and select menus navigate with arrow keys.
4. **Enter/Space:** Buttons and links activate on Enter; checkboxes toggle on Space.
5. **Skip link:** A "Skip to main content" link exists as the first focusable element.
6. **Focus trap:** Modals trap focus within their bounds (Tab doesn't escape to background content).
7. **Focus restoration:** When a modal closes, focus returns to the trigger element.

### Step 3: ARIA Labelling

1. **Icon-only buttons:** Every button containing only an icon (Phosphor icon, SVG) MUST have `aria-label` describing the action (e.g., `aria-label="Close menu"`).
2. **Icon-only links:** Same rule for `<a>` tags containing only an icon.
3. **Form associations:** Every `<input>`, `<select>`, `<textarea>` must have a visible `<label>` or `aria-label`/`aria-labelledby`.
4. **Dynamic regions:** Content that updates dynamically should use `aria-live` (polite or assertive as appropriate).
5. **Roles:** Custom widgets (tabs, accordions, carousels) must have correct ARIA roles (`role="tablist"`, `role="tab"`, `role="tabpanel"`, etc.).
6. **States:** Toggle buttons must use `aria-pressed` or `aria-expanded`. Disabled controls must use `aria-disabled="true"`.
7. **Decorative elements:** Icons, background images, and ornamental SVGs must have `aria-hidden="true"`.

### Step 4: Touch Target Sizing

Per `/guidelines/design-tokens/touch-targets.md`:

| Control Type | Minimum Size | Standard |
|---|---|---|
| All interactive elements | 24x24px | WCAG AA baseline |
| Primary actions (buttons, nav links) | 44x44px | Internal standard |
| Form inputs | 44px height | Internal standard |
| Icon-only buttons | 44x44px | Internal standard |
| Close/dismiss buttons | 44x44px | Internal standard |
| Pagination controls | 44x44px | Internal standard |

Audit steps:
1. **Measure:** Check computed size of all interactive elements — flag anything below 24x24px.
2. **Important controls:** Primary buttons, navigation links, form submits must meet 44x44px.
3. **Spacing:** Adjacent touch targets must have at least 8px spacing between them.
4. **Padding expansion:** Small visual elements (icon buttons) should use padding to expand their touch target to 44x44px even if the visual icon is smaller.

### Step 5: Image & Media Accessibility

1. **Alt text:** All `<img>` tags have `alt` attributes — meaningful for content images, empty (`alt=""`) for decorative.
2. **SVG accessibility:** Inline SVGs have `role="img"` and `aria-label`, or `aria-hidden="true"` if decorative.
3. **Background images:** Content conveyed via `background-image` has an accessible text alternative nearby.
4. **Video/audio:** If present, must have captions/transcripts.

### Step 6: Color & Contrast

1. **Text contrast:** Normal text (< 18px) meets 4.5:1 ratio against background.
2. **Large text contrast:** Text >= 18px or bold >= 14px meets 3:1 ratio.
3. **UI component contrast:** Borders, focus rings, and form outlines meet 3:1 against adjacent colors.
4. **Color independence:** No information conveyed by color alone — icons, text labels, or patterns must supplement color coding.

### Step 7: Report

Save report to `/reports/YYYY-MM/accessibility-comprehensive-audit.md` with:
- Files scanned
- Focus visibility violations (by file)
- Keyboard navigation issues
- ARIA labelling violations (icon-only buttons listed individually)
- Touch target violations (element, current size, required size)
- Image/media issues
- Contrast failures
- Fixes applied
- Remaining issues with priority (P1: blocks users, P2: degrades experience, P3: best practice)

---

## Success Criteria

- [ ] Every interactive element has visible `:focus-visible` styling
- [ ] Keyboard navigation works for all interactive flows
- [ ] All icon-only buttons/links have `aria-label`
- [ ] All interactive elements meet 24x24px minimum; important controls meet 44x44px
- [ ] All images have appropriate `alt` attributes
- [ ] Color contrast meets WCAG AA thresholds
- [ ] Report saved to `/reports/`
