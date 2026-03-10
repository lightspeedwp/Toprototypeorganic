# Health Block

## Overview
**Slug:** `lsx-tour-operator/health`

**Category:** Tour Operator

**Purpose:** The Health block displays health and medical information for a destination, including vaccination requirements, recommended precautions and emergency contact details.  It helps travellers prepare for their trip by communicating health advisories in a consistent format.

## WordPress context
Use this block on destination pages or within travel guides.  It should appear alongside other practical information blocks (e.g., Visa, Dress).  The content is drawn from custom fields or taxonomy terms associated with the destination.  The block can include headings and paragraphs to structure the advice.

## Design system requirements
- **Typography:** Use heading styles for section titles (e.g., "Health & Safety") and body styles for the descriptive text.
- **Colours:** Provide text and background colour options.  Use alert colours (e.g., orange or red) sparingly to call attention to critical warnings.
- **Spacing:** Allow margin and padding adjustments to integrate the block into different layouts.
- **Icons:** Optionally display a health icon from the Icons block at the start of the content.

## Component structure (React)
Build a `HealthBlock` component that reads health content from metadata.  The component should output a container with optional heading and paragraphs.  Use block attributes to control colours, typography and spacing.

## Props
| Name | Type | Description |
|-----|------|-------------|
| `title` | string | Heading for the health section. |
| `content` | string | Health information text. |
| `icon` | string | Name of the health icon (optional). |
| `className` | string | Additional CSS classes. |

## Usage guidelines
Provide clear, factual information based on reliable sources.  Avoid including personally identifiable or sensitive health data.  Keep paragraphs short and scannable.  Link to official health organisations for more details.

## Implementation notes
Bind the block's attributes to custom fields on the destination.  For example, use ACF fields like `health_notes` or `medical_requirements`.  Wrap static labels in translation functions.  If the block is empty, do not render it.

## Accessibility
Ensure there is sufficient contrast between text and background.  Use semantic headings to aid screen reader navigation.  If you include icons, mark them as decorative.

## Related components
Often paired with Visa, Dress and Best Time to Visit blocks to create a comprehensive travel info section.  May also appear in special interests patterns if health is a particular focus.

## When to use
Include this block whenever there are specific health advisories for a destination or activity.  It's optional for destinations without special requirements.

## Additional notes
Health regulations can change quickly; encourage site administrators to review and update this information regularly.
