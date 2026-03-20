# Expand Contexts — Discover Missing React Contexts

**Type:** Utility  
**Version:** 1.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `expand contexts`  
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

Analyse the codebase for **state management gaps** where React Context would provide cross-component communication without prop drilling. Identify functionality that requires shared state across distant components — wishlist tracking, comparison features, notification systems, user preferences, etc.

---

## Common Context Candidates

### User Experience Contexts

1. **WishlistContext** — save/unsave tours, accommodations, destinations
2. **CompareContext** — compare multiple tours or accommodations side-by-side
3. **RecentlyViewedContext** — track and display recently viewed items
4. **SearchContext** — global search state, recent searches, suggestions
5. **FilterContext** — shared filter state across archive pages

### UI State Contexts

6. **NotificationContext** — toast messages, alerts, system notifications
7. **ModalContext** — global modal management, stacking
8. **SidebarContext** — sidebar open/close state
9. **BreadcrumbContext** — dynamic breadcrumb generation from route
10. **ScrollContext** — scroll position, section visibility tracking

### Existing Contexts (likely already implemented)

11. **ThemeContext** — dark/light mode toggle
12. **MobileMenuContext** — mobile navigation state
13. **NavigationContext** — active route, navigation data

---

## Steps

### Step 1: Inventory Existing Contexts

1. Search for `createContext` across all `.tsx` files
2. Search for `useContext` usage
3. Search for Context Provider patterns

| Context | File | Provides | Consumed By |
|---------|------|----------|-------------|
| ThemeContext | contexts/ThemeContext.tsx | theme, toggleTheme | Header, all components |

### Step 2: Identify Prop Drilling

Search for props being passed through 3+ component levels:
1. Scan pages → patterns → blocks for repeated prop chains
2. Identify state that's lifted to page level but consumed by deep children

| Prop | Drilled Through | Should Be Context? |
|------|----------------|-------------------|
| `onToggleWishlist` | Page → CardGrid → Card → Button | Yes — WishlistContext |

### Step 3: Identify Missing Cross-Component State

For each feature area, check if state needs to be shared:

| Feature | Components Involved | Shared State Needed? | Proposed Context |
|---------|-------------------|---------------------|-----------------|
| Wishlist | Header badge, Cards, Detail pages | Yes — count + list | WishlistContext |
| Compare | Cards, Compare page, floating bar | Yes — selected items | CompareContext |
| Recently viewed | Detail pages, sidebar, footer | Yes — history list | RecentlyViewedContext |

### Step 4: Generate Context Specifications

For each proposed context:

```
### Proposed: WishlistContext

**Location:** `/src/app/contexts/WishlistContext.tsx`
**Hook:** `useWishlist()`

**State:**
- `items: string[]` — IDs of wishlisted items
- `count: number` — derived count

**Actions:**
- `addToWishlist(id: string, type: PostType): void`
- `removeFromWishlist(id: string): void`
- `isWishlisted(id: string): boolean`
- `clearWishlist(): void`

**Storage:** `localStorage` (persists across sessions)

**Consumed by:**
- Header (wishlist count badge)
- TourCard, AccomCard (heart icon toggle)
- WishlistPage (full list display)
```

### Step 5: Assess Dependencies

Check if proposed contexts need custom hooks:

| Context | Depends On Hook | Hook Exists? |
|---------|----------------|-------------|
| WishlistContext | useLocalStorage | Check |
| RecentlyViewedContext | useLocalStorage | Check |
| ScrollContext | useIntersectionObserver | Check |

Flag missing hooks for `expand hooks` to handle.

### Step 6: User Decision

Present recommendations. Wait for approval.

---

## Rules

1. **Context for cross-component state only** — don't use context for single-component state
2. **Custom hook per context** — always expose via `useContextName()` hook
3. **No business logic in context** — contexts manage state, not API calls
4. **localStorage for persistence** — use `useLocalStorage` hook where needed
5. **Never auto-create** — present proposals and wait for approval
6. **TypeScript required** — all context values and actions must be typed

---

## Success Criteria

- [ ] Existing contexts inventoried
- [ ] Prop drilling patterns identified
- [ ] Cross-component state needs mapped
- [ ] Context specifications with state, actions, and consumers
- [ ] Hook dependencies identified
- [ ] Recommendations presented for user approval
