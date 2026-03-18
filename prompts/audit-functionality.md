# Audit Functionality — UI State & Interaction Compliance

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit functionality`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Audit all interactive UI elements for correct state wiring — verify search, filters, navigation interactions, form submissions, and toggles work as expected. Identify UI elements that render visually but have no underlying state management or event handling.

**When to Use:** After building new interactive features, refactoring state management, or when user-facing bugs are reported.

**Scope Note:** This project is a tour operator marketing/service portal. E-commerce features (cart, checkout, add-to-cart) are **out of scope**. This audit focuses on: archive filters with URL query param sync, search with debounce, mega menu navigation, theme toggling, accordion FAQs, contact/enquiry forms, and scroll interactions.

---

## Workflow Steps

### Step 1: Interactive Element Inventory

Scan all `.tsx` files and build an inventory:

1. **Search components:** All archive search inputs — do they use debounced filtering with `useResultsAnnouncement`?
2. **Filter components:** All 5 archive filter hooks — do they sync with URL query parameters and compute `activeFilterCount` correctly?
3. **Toggle components:** Theme toggle, accordions, tab panels, collapsibles — do they manage state?
4. **Form components:** Contact forms, newsletter signups, enquiry modals — do they validate and handle submission?
5. **Navigation interactions:** Mobile hamburger menu, mega menu dropdowns, breadcrumb navigation — do they work?
6. **Modal/dialog triggers:** Enquiry modal, any other modals — do they open/close correctly?

### Step 2: Dead UI Detection

For each interactive element found, verify:

1. **Click handlers exist:** `onClick`, `onSubmit`, `onChange` handlers contain real logic.
2. **State is wired:** Dynamic content has corresponding `useState`, `useReducer`, or context state.
3. **Visual feedback:** Interactions provide feedback (loading states, success messages, error states, active/selected styles).
4. **No phantom buttons:** No buttons that look interactive but do nothing on click.

### Step 3: Search Functionality

1. **Input behavior:** Search input accepts text, responds to keystrokes with debounce.
2. **Results rendering:** Search query produces filtered/matching results.
3. **Empty state:** Non-matching searches show appropriate empty state message.
4. **Clear action:** Search input can be cleared, resetting results.
5. **Screen reader:** Results count announced via `useResultsAnnouncement`.

### Step 4: Filter Functionality

1. **Filter state:** Selected filter updates displayed content/cards.
2. **Active indicator:** Active filters have distinct visual styling and `activeFilterCount` badge.
3. **Reset/clear:** A way to clear all filters exists.
4. **URL sync:** Filters persist in URL query params and survive page refresh.
5. **Combination:** Multiple filter selections work correctly together.

### Step 5: Form Functionality

1. **Validation:** Required fields show errors when empty on submit.
2. **Error messages:** Validation errors are descriptive and associated with their field.
3. **Submit handling:** Form submit triggers the handler.
4. **Success state:** Successful submission shows confirmation feedback.

### Step 6: Navigation Interactions

1. **Mobile menu:** Hamburger toggle opens/closes mobile navigation.
2. **Mega menu:** Desktop mega menu dropdowns open on hover/click and close appropriately.
3. **Active route:** Current page is highlighted in navigation.
4. **Scroll behavior:** ScrollBackToTop and ScrollDownArrow components function correctly.
5. **Back navigation:** Browser back button works correctly with React Router.

### Step 7: Report

Save report to `/reports/YYYY-MM/functionality-audit.md` with:
- Interactive element inventory (type, file, status: working/broken/dead)
- Dead UI elements
- Search/filter/form/navigation status
- Fixes applied
- Remaining issues with priority

---

## Success Criteria

- [ ] All interactive elements have working event handlers
- [ ] Zero dead UI elements (buttons/inputs that do nothing)
- [ ] Search produces filtered results with empty state handling and screen reader announcements
- [ ] Filters update content with visual active state and URL sync
- [ ] Forms validate, submit, and provide feedback
- [ ] Mobile navigation and mega menus toggle correctly
- [ ] Report saved to `/reports/`
