# Expand Hooks — Discover Missing Custom React Hooks

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand hooks`  
**Repeatable:** Yes — run after adding new interactive features  
**Estimated Duration:** 1 session (10-20 minutes)

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Guideline References (Read-Only)

- `/guidelines/overview-components.md` — Component architecture
- `/guidelines/rules/design-system-rules.md` — Styling compliance

---

## Purpose

Identify **reusable custom React hooks** that multiple components would benefit from. Find duplicated stateful logic, repeated side effects, and common browser API interactions that should be abstracted into shared hooks in `/src/app/hooks/`.

---

## Common Hook Candidates

### Browser API Hooks

1. **useLocalStorage** — typed localStorage with SSR safety and serialisation
2. **useMediaQuery** — responsive breakpoint detection
3. **useIntersectionObserver** — element visibility tracking
4. **useScrollPosition** — window/element scroll position
5. **useWindowSize** — responsive window dimensions
6. **useClipboard** — copy to clipboard with feedback
7. **useOnClickOutside** — detect clicks outside a ref

### State Management Hooks

8. **useDebounce** — debounced value for search inputs
9. **useToggle** — boolean state with toggle, on, off
10. **usePrevious** — track previous value of a state
11. **useArray** — array state with add, remove, update, clear
12. **useMap** — Map state with set, delete, clear
13. **useCounter** — numeric state with increment, decrement, reset

### UI Interaction Hooks

14. **useKeyboardShortcut** — register keyboard shortcuts
15. **useFocusTrap** — trap focus within a modal/dialog
16. **useScrollLock** — prevent body scroll when modal is open
17. **useSwipe** — touch swipe detection for mobile
18. **useHover** — element hover state tracking

### Data Hooks

19. **useFilteredData** — filter + sort + paginate data arrays
20. **useSearchData** — fuzzy search across data fields
21. **usePagination** — page state with next, prev, goTo

---

## Steps

### Step 1: Inventory Existing Hooks

1. List all files in `/src/app/hooks/`
2. Search for `function use` patterns across the codebase
3. Note which hooks are defined inline vs shared

| Hook | Location | Shared? | Used By |
|------|----------|---------|---------|
| useTheme | hooks/useTheme.ts | ✅ | Header, all components |
| (inline) useState + localStorage | TourDetail.tsx | ❌ | TourDetail only |

### Step 2: Find Duplicated Stateful Logic

Search for patterns repeated in 2+ components:

1. `localStorage.getItem` / `localStorage.setItem` → needs `useLocalStorage`
2. `window.matchMedia` / `addEventListener('resize')` → needs `useMediaQuery`
3. `IntersectionObserver` → needs `useIntersectionObserver`
4. `setTimeout` for debouncing → needs `useDebounce`
5. `document.addEventListener('mousedown')` for click outside → needs `useOnClickOutside`
6. `document.body.style.overflow = 'hidden'` → needs `useScrollLock`

| # | Pattern | Found In | Occurrences | Proposed Hook |
|---|---------|----------|-------------|---------------|
| 1 | localStorage read/write | 3 components | 3 | useLocalStorage |
| 2 | resize listener | 4 components | 4 | useMediaQuery |
| 3 | IntersectionObserver | 2 components | 2 | useIntersectionObserver |

### Step 3: Identify Hook Gaps from Context Dependencies

Cross-reference with `expand contexts` results:

| Context | Depends On | Hook Exists? |
|---------|-----------|-------------|
| WishlistContext | useLocalStorage | ❌ |
| ScrollContext | useIntersectionObserver | ❌ |
| FilterContext | useDebounce | ❌ |

### Step 4: Generate Hook Specifications

For each proposed hook:

```
### Proposed: useLocalStorage<T>

**Location:** `/src/app/hooks/useLocalStorage.ts`

**Signature:**
```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void]
```

**Features:**
- Generic type support
- JSON serialisation/deserialisation
- SSR-safe (checks `typeof window`)
- Cross-tab sync via `storage` event
- Error handling for quota exceeded

**Would deduplicate code in:**
- WishlistContext (proposed)
- ThemeContext (current)
- RecentlyViewedContext (proposed)
```

### Step 5: Prioritise

| # | Hook | Deduplicates | Enables Contexts | Priority |
|---|------|-------------|-----------------|----------|
| 1 | useLocalStorage | 3 instances | Wishlist, RecentlyViewed | High |
| 2 | useMediaQuery | 4 instances | — | High |
| 3 | useDebounce | 2 instances | Filter | Medium |
| 4 | useIntersectionObserver | 2 instances | Scroll | Medium |
| 5 | useScrollLock | 1 instance | Modal | Low |

### Step 6: User Decision

Present recommendations. Wait for approval.

---

## Rules

1. **Hooks live in `/src/app/hooks/`** — never defined inline in components
2. **One hook per file** — named `use[Name].ts`
3. **TypeScript generics** where applicable
4. **No side effects on import** — hooks only execute when called
5. **SSR-safe** — check for `window`/`document` before using browser APIs
6. **Never auto-create** — present proposals and wait for approval
7. **Test with 2+ consumers** — a hook needs at least 2 usage sites

---

## Success Criteria

- [ ] Existing hooks inventoried
- [ ] Duplicated stateful logic identified across codebase
- [ ] Context dependencies cross-referenced
- [ ] Hook specifications with signatures and features
- [ ] Priority ranking based on deduplication and enablement
- [ ] Recommendations presented for user approval
