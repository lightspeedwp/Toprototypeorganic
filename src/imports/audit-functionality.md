# Audit Functionality — UI State & Interaction Compliance

**Type:** Audit  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `audit functionality`

---

## Prompt Purpose

**Objective:** Audit all interactive UI elements for correct state wiring — verify search, filters, navigation interactions, form submissions, and toggles work as expected. Identify UI elements that render visually but have no underlying state management or event handling.

**When to Use:** After building new interactive features, refactoring state management, or when user-facing bugs are reported.

**Note:** This project is a marketing/service portal. E-commerce features (cart, checkout, add-to-cart) are **out of scope** per Guidelines. This audit focuses on the interactive elements that DO exist in the codebase.

**Reference Guidelines:**
- `/guidelines/components/components-vs-patterns.md`
- `/guidelines/data-files.md`
- `/guidelines/accessibility.md`

---

## Workflow Steps

### Step 1: Interactive Element Inventory

Scan all `.tsx` files and build an inventory of interactive UI:

1. **Search components:** Find all search inputs — do they filter content, navigate to a search results page, or do nothing?
2. **Filter components:** Find all filter buttons/dropdowns — do they update displayed content?
3. **Toggle components:** Find theme toggles, accordions, tab panels, collapsibles — do they manage state?
4. **Form components:** Find contact forms, newsletter signups, any input groups — do they validate and handle submission?
5. **Navigation interactions:** Mobile hamburger menu, dropdown menus, breadcrumb navigation — do they work?
6. **Modal/dialog triggers:** Buttons that should open modals — do the modals exist and open?

### Step 2: Dead UI Detection

For each interactive element found, verify:

1. **Click handlers exist:** `onClick`, `onSubmit`, `onChange` handlers are attached and contain logic (not empty functions or `console.log` stubs).
2. **State is wired:** Components that display dynamic content have corresponding `useState`, `useReducer`, or context state.
3. **Visual feedback:** Interactions provide feedback (loading states, success messages, error states, active/selected styles).
4. **No phantom buttons:** Buttons that look interactive but do nothing on click.
5. **Disabled states:** Buttons with `disabled` prop have visual indication and correct `aria-disabled`.

### Step 3: Search Functionality

1. **Input behavior:** Search input accepts text, responds to keystrokes.
2. **Results rendering:** Search query produces filtered/matching results.
3. **Empty state:** Searching for non-matching terms shows an appropriate empty state message.
4. **Clear action:** Search input can be cleared, resetting results.
5. **Keyboard:** Search submits on Enter key press.

### Step 4: Filter Functionality

1. **Filter state:** Selected filter updates the displayed content/cards.
2. **Active indicator:** Active filter has distinct visual styling.
3. **Reset/clear:** A way to clear all filters exists.
4. **URL sync:** If filters affect URL params, verify they persist on page refresh.
5. **Combination:** Multiple filter selections work correctly together.

### Step 5: Form Functionality

1. **Validation:** Required fields show errors when empty on submit.
2. **Error messages:** Validation errors are descriptive and associated with their field.
3. **Submit handling:** Form submit triggers the handler (even if it's a mock/placeholder).
4. **Success state:** Successful submission shows confirmation feedback.
5. **Loading state:** Submission shows a loading indicator while processing.

### Step 6: Navigation Interactions

1. **Mobile menu:** Hamburger toggle opens/closes mobile navigation.
2. **Dropdown menus:** Desktop nav dropdowns open on hover/click and close appropriately.
3. **Active route:** Current page is highlighted in navigation.
4. **Scroll behavior:** Smooth scroll to anchors works where implemented.
5. **Back navigation:** Browser back button works correctly with client-side routing.

### Step 7: Report

Save report to `/reports/YYYY-MM/functionality-audit.md` with:
- Interactive element inventory (type, file, status: working/broken/dead)
- Dead UI elements (renders but does nothing)
- Search functionality status
- Filter functionality status
- Form functionality status
- Navigation interaction status
- Fixes applied
- Remaining issues with priority

---

## Success Criteria

- [ ] All interactive elements have working event handlers
- [ ] Zero dead UI elements (buttons/inputs that do nothing)
- [ ] Search produces filtered results with empty state handling
- [ ] Filters update content with visual active state
- [ ] Forms validate, submit, and provide feedback
- [ ] Mobile navigation toggles correctly
- [ ] Report saved to `/reports/`
