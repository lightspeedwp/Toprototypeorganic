# Grid Block

<!-- Metadata -->
- **Slug:** `core/grid`
- **Category:** Design
- **Introduced:** WordPress 6.3

## Purpose

The Grid block is a flexible container for organising blocks into rows and columns. It extends the functionality of Columns and Row blocks by supporting automatic column generation and manual column counts, enabling complex responsive layouts. According to WordPress documentation, the Grid block allows you to arrange multiple blocks and adjust their height, width and positioning; you can transform it into a Group, Row or Stack block.

## WordPress context

Found in the **Design** category, the Grid block features toolbar controls to transform, drag and move it, set horizontal and vertical alignment, and change width alignment. The layout settings in the sidebar allow you to specify the number of columns manually or let WordPress calculate it automatically based on available space. You can adjust gaps between rows and columns, set sticky positioning for the grid, and apply color, typography, dimensions, border and advanced settings.

## Design system requirements

- **Layout:** Use the Grid block for complex layouts that require both rows and columns, such as product grids or card collections. Define the `columns` property to control the number of columns, or leave it blank to auto‑generate columns based on a minimum column width. Use spacing tokens for row and column gaps to maintain consistency.
- **Responsive design:** Configure the grid to automatically adjust column count on smaller screens. Use CSS grid's `auto-fill` and `minmax()` functions in your implementation to achieve this. Do not hard‑code fixed widths; instead rely on flexible units like `fr` and percentages.
- **Typography & colors:** The Grid block itself does not impose typography; inner blocks must adhere to your design system's type scale. Use palette tokens for background and text colors if a uniform background is applied to the grid.
- **Spacing:** Define row and column gaps using spacing tokens (Tailwind: `gap-4`, `gap-6`, `gap-8`). Avoid adding individual margins to grid items.
- **Borders & shadows:** Apply border and shadow styles sparingly to the grid container or to individual items; use tokens from your presets to maintain consistency.

## Component structure (React)

```jsx
// Example React structure for an auto‑filling grid of cards
<Grid columns={3} minWidth="250px" gap="6">
  {products.map(product => (
    <Card 
      key={product.id} 
      title={product.name} 
      image={product.image} 
      price={product.price} 
    />
  ))}
</Grid>
```

### Props

| Prop         | Type    | Default | Description |
|--------------|---------|---------|-------------|
| `columns`    | number  | —       | Fixed number of columns. If undefined, columns auto‑fill based on `minWidth`. |
| `minWidth`   | string  | `250px` | Minimum width for each grid item; used when `columns` is undefined to calculate auto‑filling columns. |
| `gap`        | string  | `6`     | Gap between grid items (Tailwind gap value). |
| `className`  | string  | —       | Additional CSS classes. |
| `children`   | node    | —       | Grid items to render. |

## Usage guidelines

1. **Choose the right container:** Use Grid when you need a flexible arrangement of items both vertically and horizontally. For simple two‑column layouts, the Columns block is sufficient; for horizontal alignment only, use Row; for vertical alignment only, use Stack.
2. **Responsive behaviours:** Use `minWidth` to let the grid auto‑fill columns based on available width. Test on small screens to ensure items do not become too narrow. Optionally, specify breakpoints in your CSS or component props.
3. **Consistent spacing:** Control row and column gaps using spacing tokens rather than hard‑coded pixel values.
4. **Nesting:** You can nest Grid blocks within each other or combine with other layout blocks. For example, a page may have a two‑column layout with each column containing a Grid of cards.
5. **Performance considerations:** Avoid rendering very large numbers of items in a single grid; paginate or lazy load content when necessary.

## Design System Implementation

**CSS Variables Used:**
- Typography: `var(--font-family-noto-sans)` (for any text within grid)
- Colors: Semantic tokens (`bg-background`, `bg-card`, etc.)
- Spacing: Tailwind gap scale (`gap-4`, `gap-6`, `gap-8`)
- Responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

**Font Requirements:**
- Grid container doesn't render text directly
- Inner grid items use design system typography
- Never override child component fonts

## WordPress implementation notes

In theme.json, enable `supports: { align: true, layout: true }` for the Grid block. When implementing in React, use CSS Grid with properties like `grid-template-columns: repeat(auto-fill, minmax(minWidth, 1fr))` to replicate WordPress behaviour. Expose props for column count, minimum width and gaps. Map Figma components that use multi‑row and multi‑column auto‑layout to the Grid component.

## Accessibility considerations

- Ensure that the reading order remains logical; avoid using CSS order to rearrange items visually without updating the DOM order.
- Provide descriptive alt text for images and clear labels for interactive elements within grid items.
- Use semantic containers like `<section>` or `<ul>` with `<li>` elements for lists if appropriate.

## Variations

The Grid block can be used to create masonry‑style layouts by varying the height of grid items. However, keep accessibility in mind; irregular layouts can be harder to follow. For card grids, maintain consistent card heights or align the content area to maintain rhythm.

## Related components

- **Columns block:** For simple column layouts.
- **Row block:** For horizontal alignment.
- **Stack block:** For vertical stacking.

## When to use

Use the Grid block to display collections of items such as products, blog posts or image galleries that benefit from a structured grid layout. Avoid using Grid for simple linear content; a Row or Stack may be more appropriate.

## Additional notes

The Grid block leverages CSS Grid technology. When converting Figma designs to React components, interpret frames with both horizontal and vertical auto‑layout as Grid containers. Provide responsive settings for column count and gaps to align with WordPress behaviour.
