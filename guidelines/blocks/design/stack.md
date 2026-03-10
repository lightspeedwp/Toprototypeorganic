# Stack Block

<!-- Metadata -->
- **Slug:** `core/stack`
- **Category:** Design
- **Introduced:** WordPress 6.0

## Purpose

The Stack block is a layout container that vertically stacks its child blocks. It simplifies the creation of vertical layouts by automatically applying consistent spacing between items and allows control over alignment and spacing. WordPress documentation explains that the Stack block nests other blocks on top of each other vertically and can be transformed into Group or Row blocks for alternative layouts. It is particularly useful for responsive designs because it stacks content in a predictable manner across screen sizes.

## WordPress context

In the block editor, the Stack block appears in the **Design** category. When selected, the toolbar allows you to transform the block, drag it, move it up or down, justify content (e.g., start, center, space between), align items vertically, change width (default, wide, full) and set sticky positioning (make it stick to the top of the viewport). In the sidebar, layout controls include gap settings, orientation (vertical), and wrap options. You can also customise colors, typography, dimensions, borders and advanced settings.

## Design system requirements

- **Layout:** Use the Stack block to organize a series of elements vertically. Define a consistent gap using spacing tokens (Tailwind: `gap-3`, `gap-4`, `gap-6`, `gap-8`). Stacks are ideal for forms, feature lists or card components where elements should remain vertically aligned on all devices.
- **Typography:** As with other containers, the Stack block does not impose specific typographic styles. Ensure inner blocks use appropriate heading, body or label styles defined in your design system.
- **Colors & backgrounds:** Apply background colors sparingly. Use your palette tokens for backgrounds or separators between stacked items. When grouping several items with a shared background, use the Stack's wrapper rather than individual backgrounds to maintain consistency.
- **Spacing:** Use margin and padding tokens to create space around the Stack relative to other blocks. Inside the Stack, rely on the `gap` property to space items evenly. Avoid manual margins on individual children which can lead to inconsistent spacing.
- **Position:** The Stack block can be set to sticky within its parent container. Use sticky only when necessary (e.g., to keep a sidebar visible). Ensure sticky elements do not obscure other content.

## Component structure (React)

```jsx
// Example React structure for a vertical card list
<Stack gap="6" align="start">
  <Card title="Feature 1" description="Lorem ipsum…" />
  <Card title="Feature 2" description="Dolor sit amet…" />
  <Card title="Feature 3" description="Sed do eiusmod…" />
</Stack>
```

### Props

| Prop         | Type    | Default | Description |
|--------------|---------|---------|-------------|
| `gap`        | string  | `4`     | Vertical space between children (Tailwind gap value). |
| `justify`    | string  | `start` | Vertical justification (`start`, `center`, `between`, `end`). |
| `align`      | string  | `stretch` | Horizontal alignment of items (`start`, `center`, `end`, `stretch`). |
| `className`  | string  | —       | Additional CSS classes. |
| `children`   | node    | —       | Stack items to render. |

## Usage guidelines

1. **Vertical grouping:** Use the Stack block when you need to align items vertically with consistent spacing — for example, form fields, card lists, or article components.
2. **Responsive design:** Stacks maintain vertical alignment across breakpoints. You can nest stacks inside columns to create multi‑column layouts with vertical grouping. Avoid stacking too many large elements as it may lead to long scrolls on mobile.
3. **Combining with other blocks:** Use Stack inside Columns or Grid blocks to create more complex layouts. For example, a pricing table might use Columns with Stacks inside each column to list features.
4. **Sticky positioning:** Use sticky only for small elements like sidebars or headings. Test across browsers and ensure sticky elements do not overlap footers or other content.

## Design System Implementation

**CSS Variables Used:**
- Typography: `var(--font-family-noto-sans)` (for any text within stack)
- Colors: Semantic tokens (`bg-background`, `bg-card`, etc.)
- Spacing: Tailwind gap scale (`gap-3`, `gap-4`, `gap-6`, `gap-8`)
- Layout: Flexbox with `flex-col`

**Font Requirements:**
- Stack container doesn't render text directly
- Inner stack items use design system typography
- Never override child component fonts

## WordPress implementation notes

In theme.json or block registration, enable layout support for the Stack block: `supports: { align: true, layout: true }`. Use a flex container with `flex-direction: column` to replicate WordPress behaviour. Expose props for `gap`, `alignItems`, `justifyContent` and sticky positioning. Map Figma vertical auto‑layout frames to the Stack component during Figma‑to‑React generation.

## Accessibility considerations

- Maintain logical reading order; content in a Stack is read top to bottom. Avoid using CSS or absolute positioning to rearrange the order visually.
- Ensure sufficient contrast if applying a background color to the Stack.
- Provide appropriate labels for each interactive element within the stack (e.g., form inputs, buttons).

## Variations

Stacks may be used with different background colors or border styles. You can also apply a subtle divider line between items using CSS or the Separator block to visually separate stacked items. Limit heavy borders or shadows to maintain a clean interface.

## Related components

- **Row block:** For horizontal alignment of items.
- **Columns block:** For multi‑column layouts.
- **Grid block:** For grid layouts with manual or automatic columns.

## When to use

Use the Stack block when you need to vertically arrange multiple blocks with consistent spacing. It replaces the need for manually adding Spacer blocks between elements. Avoid using Stack solely to add vertical space; instead, adjust the `gap` or use spacing tokens on surrounding blocks.

## Additional notes

The Stack block is implemented using flexbox with `flex-direction: column`. When creating React components, ensure the container uses CSS flex with vertical orientation, and expose props for spacing and alignment to match WordPress controls.
