# Columns Block

<!-- Metadata -->
- **Slug:** `core/columns`
- **Category:** Design
- **Introduced:** WordPress 5.0

## Purpose

The Columns block is a layout container that allows content creators to arrange text, media or other blocks side‑by‑side. Up to six columns can be created in a row and each column can contain multiple inner blocks. Columns are often used to create grid‑like layouts or to break up large sections of content into digestible segments. According to WordPress documentation, the Columns block provides a flexible way to structure content in up to six columns and can be combined with headings, paragraphs, images and other blocks to build more complex designs.

## WordPress context

In the block editor, the Columns block sits in the **Design** category. It includes toolbar controls to transform the block, adjust column number, move the block, change alignment (wide/full), and vertically align inner blocks. Within each column, you can insert any type of block. On mobile devices, columns stack vertically to maintain readability. Users can set the number of columns, adjust their widths (equal or variable), and apply global settings for color, typography, spacing and borders via the sidebar.

Child blocks like the **Column** block appear automatically when you insert a Columns block. Each Column block has its own settings for padding, margins and design variations; these child blocks should be documented within this file rather than separate files.

## Design system requirements

- **Typography:** Use your theme's text styles (e.g., body, headline) inside Column blocks. The Columns block itself does not impose typography; it simply arranges children. Make sure inner text styles adhere to your typography scale defined in your design system (display, headline, title, body, label). For example, use `var(--text-base)` for body text and `var(--text-lg)` for headings.
- **Colors:** Columns can have background colors or gradients applied at the group or individual column level. Use the theme color palette tokens (`bg-primary`, `bg-secondary`, etc.) and ensure sufficient contrast. Avoid applying individual background colors to each column unless it supports your design intent.
- **Spacing:** Define padding and margin with spacing tokens (Tailwind: `p-4`, `p-6`, `gap-4`, `gap-6`). Adjust column gap via the Columns block settings to control spacing between columns. Maintain consistent gutter spacing across the site.
- **Layout:** Columns support equal width by default. For variable widths, set fractional widths (e.g., 60%/40%). Avoid very narrow columns that make text hard to read; maintain at least 40 characters per line.
- **Borders & shadows:** Use border and shadow tokens from your presets when required. Keep border radius consistent with your design system. Shadows should be subtle and used sparingly.

## Component structure (React)

```jsx
// Example React structure for a two‑column layout
<Columns columns={2} gap="6">
  <Column>
    <h2>Our services</h2>
    <p>We offer a range of digital solutions …</p>
  </Column>
  <Column>
    <img src="/images/services.jpg" alt="Team working" />
  </Column>
</Columns>
```

### Props

| Prop        | Type        | Default | Description |
|-------------|------------|---------|-------------|
| `columns`   | number      | 2       | Number of columns (1–6). |
| `gap`       | string      | `6`     | Horizontal gap between columns (Tailwind gap value). |
| `stackOnMobile` | boolean | true    | Stack columns vertically on mobile. |
| `className` | string      | —       | Additional CSS classes. |
| `children`  | node        | —       | Column components to render. |

## Usage guidelines

1. **Choose the right number of columns:** Use two or three columns for typical content. Four or more columns can be used for icon grids or feature lists, but avoid overloading each column with content.
2. **Responsive behaviour:** Columns automatically stack on small screens. Test your layout in the Style Book preview to ensure readability across viewports. If necessary, adjust column widths or use the Stack block instead for vertical layouts.
3. **Consistent spacing:** Ensure equal gutter spacing between columns. Use spacing tokens rather than arbitrary values for maintainability.
4. **Nested blocks:** Insert any block inside a Column, including groups, buttons or media. For complex layouts, wrap inner content in Group or Stack blocks to manage spacing and backgrounds.

## Design System Implementation

**CSS Variables Used:**
- Typography: `var(--font-family-noto-sans)` (for any text within columns)
- Colors: Semantic tokens (`bg-background`, `bg-card`, etc.)
- Spacing: Tailwind gap scale (`gap-4`, `gap-6`, `gap-8`)
- Responsive: `flex-col md:flex-row` for mobile stacking

**Font Requirements:**
- Columns container doesn't render text directly
- Inner column content uses design system typography
- Never override child component fonts

## WordPress implementation notes

When defining the Columns block in theme.json or custom block registration, use `supports: { align: true, spacing: { margin: true, padding: true }, color: { background: true, text: true } }` to expose alignment and design controls. Use semantic HTML (e.g., `<div>` or `<section>`) for the outer wrapper. In Figma, label columns clearly and map them to React props for Figma‑to‑React generation.

## Accessibility considerations

- Ensure that column order makes sense when read linearly (screen readers will read columns top‑to‑bottom). Avoid placing critical content in the second column if it appears after secondary content.
- Maintain sufficient color contrast between text and background colors.
- Provide alt text for images and accessible labels for interactive elements within columns.

## Variations

The Columns block itself has no style variations, but child columns can adopt different backgrounds or border styles. Avoid using drastically different styles between columns unless necessary. You can use a **Stack** block for vertical alignment of inner elements or a **Grid** block for more complex layouts.

## Related components

- **Stack block:** Use when you want vertical stacking instead of horizontal distribution.
- **Row block:** An alternative container for horizontal distribution with additional alignment controls.
- **Grid block:** Use for more sophisticated grid layouts with automatic column count.
- **Column block:** Individual column component (child of Columns).

## When to use

Use Columns when you need to arrange content side‑by‑side, such as service descriptions with images, features lists, or pricing tables. Avoid using Columns purely for decorative alignment; instead rely on design tokens and spacing.

## Additional notes

Columns should remain flexible and responsive. When building React components from Figma, ensure that each Column component is modular and can accept any child content. Leverage CSS grid or flexbox for implementation to match WordPress behaviour.
