# Banner Cover Block

## Overview
**Slug:** `lsx-tour-operator/banner-cover`

**Category:** Tour Operator

**Purpose:** The Banner Cover block renders a full‑width cover section using a banner image from a custom field.  It can optionally fall back to the post's featured image and allows overlay settings like dimming and minimum height.  This block is often used at the top of pages to create impactful hero sections.

## WordPress context
Place this block at the start of tour, destination or accommodation pages to introduce the content with a striking image.  The block reads the banner image from a dedicated custom field; if none is set, it can use the featured image.  Editors can adjust dim ratio and minimum height in the block settings.

## Design system requirements
- **Image handling:** Maintain proper aspect ratios for banner images (e.g., 16:9 or 21:9) to avoid distortion.  Provide controls for focal point selection if supported.
- **Overlay:** Offer options for overlay colour and opacity (dim ratio) to ensure that text remains readable against the image.
- **Height:** Allow minimum height settings to ensure the banner is tall enough to display content and maintain design consistency.
- **Text styling:** If text (e.g., a title or tagline) is placed on top of the banner, use high‑contrast typography from the design system.

## Component structure (React)
Implement a `BannerCoverBlock` component that fetches the banner image URL from custom fields.  Render the image as a background of a `<div>` with CSS background properties.  Include attributes for `dimRatio`, `minHeight` and `useFeaturedImage`.  If inner blocks are present (e.g., heading, tagline, buttons), render them within the cover.

## Props
| Name | Type | Description |
|-----|------|-------------|
| `imageUrl` | string | URL of the banner image. |
| `useFeaturedImage` | boolean | Whether to use the post's featured image if no banner is set. |
| `dimRatio` | number | Overlay opacity (0–100). |
| `minHeight` | string | Minimum height of the cover section (e.g., `400px`). |
| `align` | string | Alignment option (`full`, `wide`). |
| `className` | string | Additional CSS classes. |

## Usage guidelines
Choose high‑resolution images that represent the destination or tour.  Avoid overlaying important content near image edges where cropping may occur.  If text appears on the banner, ensure it remains legible against the image and overlay.

## Implementation notes
Use the `cover` block component pattern from WordPress as a reference.  Ensure that the block supports full and wide alignments.  Provide fallback behaviours when no image is supplied.

## Accessibility
Add an `aria-label` to describe the visual content of the banner for screen readers.  If the banner conveys essential information, provide alternative text or include that information in the main content.

## Related components
Often used with Tagline and Modal Button blocks inside the hero section.  Can be part of hero patterns defined in the template restructuring.

## When to use
For hero sections or any large, visually rich header area.  Avoid using this block for minor banners or simple image displays—use the Image block instead.

## Additional notes
To improve performance, consider lazy loading or using responsive image sizes based on device width.
