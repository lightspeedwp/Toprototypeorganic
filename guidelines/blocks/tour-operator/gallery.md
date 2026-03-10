# Gallery Block (Tour Operator)

## Overview
**Slug:** `lsx-tour-operator/gallery`

**Category:** Tour Operator

**Purpose:** This gallery block outputs a collection of images associated with a tour, accommodation or destination.  It provides a custom wrapper around the core Gallery block, ensuring that images are displayed consistently with the plugin's design system.

## WordPress context
Use this block on pages where visual storytelling is important—such as showcasing accommodation rooms or destination highlights.  The block reads image IDs from a custom field or media gallery field.  It can be used inside patterns like hero sections or featured sections.

## Design system requirements
- **Aspect ratio:** Maintain consistent aspect ratios for all images.  Use the design system's aspect ratio presets for galleries.
- **Layout:** Support grid and masonry layouts.  Provide controls for the number of columns and spacing between images.
- **Captions:** Allow captions for each image.  Apply appropriate typography and spacing to captions.
- **Colours:** Use neutral backgrounds to ensure images stand out.  Provide settings for border colour and radius if needed.

## Component structure (React)
Implement a `TOGalleryBlock` component that wraps the core Gallery block.  Pass along attributes for image IDs, columns, link behaviour and cropping.  Enforce design system defaults for spacing and aspect ratio.

## Props
| Name | Type | Description |
|-----|------|-------------|
| `ids` | array | Array of image attachment IDs. |
| `columns` | number | Number of columns in the gallery. |
| `linkTo` | string | Linking behaviour (`none`, `media`, `attachment`). |
| `crop` | boolean | Whether to crop images to uniform sizes. |
| `className` | string | Additional CSS classes. |

## Usage guidelines
Use high‑quality images that reflect the experience being sold.  Limit the gallery to a reasonable number of photos (4–10).  Provide descriptive captions where appropriate.  Avoid mixing images of very different orientations; choose a consistent aspect ratio.

## Implementation notes
Store image IDs in a repeater or gallery field.  Use the WordPress Media Library for image management.  Ensure lazy loading is enabled for performance.  Provide translation functions for any static text.

## Accessibility
Include meaningful `alt` text for every image.  Captions should supplement, not replace, alt text.  Ensure keyboard users can tab through images if the gallery links are enabled.

## Related components
Often used alongside Videos and WETU Map blocks in media sections.  May appear within hero or section patterns for destinations and tours.

## When to use
On pages where visuals are a key selling point—accommodations, tours, destinations and blog posts with strong imagery.

## Additional notes
If you need to display images with lightbox functionality, consider integrating a lightbox script or using WordPress core enhancements in a future version.
