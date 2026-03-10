# Search Block

<!-- Metadata -->
- **Slug:** `core/search`
- **Category:** Theme
- **Introduced:** WordPress 5.6
- **React Component:** `/src/app/components/blocks/theme/Search.tsx`

## Purpose

The Search block adds a search form to your site, enabling visitors to search posts, pages or other content. It consists of an input field and a submit button. It is typically placed in headers, sidebars or footers.

## WordPress context

The Search block appears in the **Theme** category. When inserted, it displays a text input and a submit button. The toolbar provides controls to change alignment and button position (button inside the input or outside). In the sidebar, you can set the placeholder text, choose whether the search button displays an icon or text label, adjust typography and color, and configure spacing and border styles. The block supports the addition of a search label for accessibility.

## Design system requirements

### Form layout
- **Button inside:** Icon button inside the input field (compact, ideal for headers)
- **Button outside:** Separate button with text label (clearer affordance, ideal for sidebars)
- Maintain consistent height across input and button (44px minimum for touch targets)

### Typography
- **Font family:** Noto Sans (`var(--font-family-noto-sans)`)
- **Input text:** `var(--text-base)` (16px) with `var(--font-weight-normal)` (400)
- **Placeholder text:** Same size as input, `text-muted-foreground`
- **Button text:** `var(--text-base)` with `var(--font-weight-medium)` (500)

### Colors
- **Input background:** `bg-background` or `bg-muted` based on context
- **Input text:** `text-foreground`
- **Input border:** `border-border`
- **Placeholder:** `text-muted-foreground`
- **Button:** `bg-primary` with `text-primary-foreground`
- **Focus state:** `ring-2 ring-ring ring-offset-2`
- Ensure WCAG AA contrast (4.5:1 minimum)

### Spacing & sizing
- **Input padding:** `px-4 py-2` (16px horizontal, 8px vertical)
- **Button padding:** `px-4 py-2` (same as input for alignment)
- **Gap between input and button (if outside):** `gap-2` (8px)
- **Minimum height:** 44px for accessibility
- **Margin around form:** Use spacing tokens for container margins

### Border & radius
- **Border width:** `border` (1px)
- **Border radius:** `rounded-lg` (`var(--radius-lg)` = 6px)
- **Consistent radius:** Apply same radius to input and button
- **Focus border:** `border-primary` on focus

### Icon
- Use Search icon from lucide-react
- Icon size: `h-4 w-4` (16px)
- Icon color: Inherits from button or `text-muted-foreground` for input

## Component structure (React)

```tsx
<Search 
  placeholder="Search articles…" 
  buttonLabel="Search"
  showIcon={true}
  buttonPosition="outside"
  align="left"
/>
```

### Props

| Prop             | Type     | Default    | Description |
|------------------|----------|------------|-------------|
| `placeholder`    | string   | `Search…`  | Placeholder text in the input field |
| `buttonLabel`    | string   | `Search`   | Text label for the button (empty string for icon only) |
| `showIcon`       | boolean  | `true`     | Whether to display a search icon |
| `buttonPosition` | string   | `outside`  | Position of button: `inside` or `outside` |
| `align`          | string   | `left`     | Alignment within container (`left`, `center`, `right`) |
| `onSubmit`       | function | —          | Submit handler (receives search query) |
| `className`      | string   | —          | Additional CSS classes |
| `style`          | object   | —          | Inline style overrides |

## Usage guidelines

1. **Placement:** Place search forms where users expect them:
   - Header (top right or center)
   - Sidebar (for blogs/documentation)
   - Footer
   - Avoid hiding search behind icons on desktop; visible search encourages engagement

2. **Accessible labeling:** 
   - Use a `<label>` element associated with the search input via `htmlFor` and `id`
   - Even if you hide the label visually, it must remain accessible to screen readers
   - Use `aria-label` on the form: `<form role="search" aria-label="Site search">`

3. **Placeholder text:** 
   - Keep concise and descriptive (e.g., "Search articles", "Find tours")
   - Do not rely solely on placeholder text as the label
   - Placeholder should disappear when user starts typing

4. **Button label vs. icon:** 
   - Use text label for better accessibility, especially for users with cognitive impairments
   - If using icon only, provide `aria-label` describing the button's function
   - Consider "Search" text for button clarity

5. **Keyboard interaction:** 
   - Users should be able to submit by pressing Enter
   - Ensure search field has `type="search"` for proper browser behavior
   - Handle `onSubmit` event to prevent page reload and process search

## WordPress implementation notes

Define search styles in theme.json under `styles.blocks["core/search"]`, including input and button styling. Use CSS variables for colors, border radius and spacing. When mapping Figma designs, convert the search input and button into a Search component and ensure it posts to the WordPress search endpoint (`?s=search-term`). Provide support for customizing placeholder text and button label via props.

## Accessibility considerations

- Provide a visible or visually hidden label for the search input
- Use `<form role="search">` to identify the search landmark
- Ensure focus styles are visible on both the input and the button
- Provide clear error state or empty state message if search yields no results
- Use semantic form elements (`<form>`, `<input type="search">`, `<button type="submit">`)
- Minimum touch target: 44px × 44px for mobile

## Variations

### Button inside (compact)
```tsx
<Search buttonPosition="inside" showIcon={true} buttonLabel="" />
```

### Button outside with text
```tsx
<Search buttonPosition="outside" showIcon={true} buttonLabel="Search" />
```

### Icon only button
```tsx
<Search buttonPosition="outside" showIcon={true} buttonLabel="" />
```

### Centered in header
```tsx
<Search align="center" buttonPosition="inside" placeholder="Search…" />
```

## Related components

- **Navigation block:** Search is often placed near navigation in headers
- **Query Loop block:** Use to display search results
- **Query Title block:** Shows the search query on results page

## When to use

Use the Search block on sites with substantial content, enabling users to quickly find information. For small sites or landing pages with limited content, a search may not be necessary. Consider search when you have:
- 20+ pages/posts
- Multiple content types
- Documentation or knowledge base
- Blog with many articles

## Design system compliance

**Typography:**
- ✅ Font family: Noto Sans (`var(--font-family-noto-sans)`)
- ✅ Font sizes from CSS variables
- ✅ Font weights from CSS variables
- ✅ No hardcoded text styling

**Colors:**
- ✅ Semantic tokens only (`bg-background`, `text-foreground`, `bg-primary`, etc.)
- ✅ No hardcoded colors
- ✅ Dark mode support via CSS variables
- ✅ WCAG AA contrast ratios

**Spacing:**
- ✅ Tailwind padding/gap scale
- ✅ Consistent spacing tokens
- ✅ No arbitrary values

**Borders & Radius:**
- ✅ Border width from design system
- ✅ Border radius from CSS variables (`var(--radius-lg)`)
- ✅ Consistent border colors

**Accessibility:**
- ✅ Semantic HTML (`<form role="search">`)
- ✅ Proper labels (visible or sr-only)
- ✅ Focus indicators
- ✅ Minimum touch targets

## Additional notes

Ensure that your site's search is performant and relevant. Consider:
- Custom search plugins for improved results
- Faceted search for filtering results
- Search analytics to understand user queries
- Autocomplete/suggestions for better UX

When using third-party search services (e.g., Algolia, Elasticsearch), adapt the Search component to query those endpoints while maintaining the same design and accessibility standards. Provide loading states during search and clear error messages if search fails.

**Mobile considerations:**
- Input should be large enough for touch (44px minimum)
- Consider expanding search on focus to full width
- Provide clear close/clear button
- Test on various devices and screen sizes
