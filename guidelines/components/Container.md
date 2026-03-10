# Container Component

**File:** `/src/app/components/common/Container.tsx`  
**WordPress Mapping:** Utility wrapper (similar to WordPress `.wp-block-group` with constrained width)  
**Category:** Common Component

---

## Purpose

Provides consistent max-width constraints and horizontal padding for content sections, ensuring proper content alignment and responsive spacing across all breakpoints.

---

## Usage

```typescript
import { Container } from "../components/common/Container";

<Container>
  <h2>Section Title</h2>
  <p>Section content...</p>
</Container>
```

---

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `React.ReactNode` | Yes | - | Content to be contained |
| `className` | `string` | No | - | Additional CSS classes to merge with defaults |
| `as` | `"div" \| "section" \| "article" \| "header" \| "footer" \| "nav"` | No | `"div"` | HTML element to render |

---

## Behavior

1. **Max Width:**
   - Constrains content to `max-w-7xl` (1280px)
   - Centers content horizontally with `mx-auto`

2. **Horizontal Padding:**
   - Base: `px-4` (16px)
   - Small screens: `sm:px-6` (24px)
   - Large screens: `lg:px-8` (32px)

3. **Semantic HTML:**
   - Can render as different elements via `as` prop
   - Useful for proper semantic structure

---

## Styling

**Required Design Tokens:**

```typescript
// Layout
mx-auto              // Center horizontally
w-full               // Full width up to max
max-w-7xl            // Maximum width: 1280px

// Spacing
px-4                 // Mobile: 16px horizontal padding
sm:px-6              // Tablet: 24px horizontal padding
lg:px-8              // Desktop: 32px horizontal padding
```

---

## Implementation

```typescript
import { cn } from "../../lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
}

export function Container({ 
  children, 
  className, 
  as: Component = "div" 
}: ContainerProps) {
  return (
    <Component 
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", 
        className
      )}
    >
      {children}
    </Component>
  );
}
```

---

## Common Usage Patterns

### As Section Container

```typescript
<Container as="section" className="py-12">
  <h2>Tours</h2>
  <CardGrid items={tours} />
</Container>
```

### As Article Container

```typescript
<Container as="article" className="prose py-8">
  <h1>Blog Post Title</h1>
  <p>Blog post content...</p>
</Container>
```

### Nested in Full-Width Section

```typescript
<section className="bg-muted py-12">
  <Container>
    <h2>Constrained Content</h2>
    <p>This content respects max-width</p>
  </Container>
</section>
```

### With Additional Vertical Spacing

```typescript
<Container className="py-16 md:py-24">
  {/* Large vertical spacing */}
</Container>
```

---

## Accessibility

- No specific accessibility requirements (semantic HTML wrapper)
- Use appropriate `as` prop for semantic structure
- Ensure proper heading hierarchy within Container

---

## WordPress Equivalent

In WordPress block themes, this maps conceptually to:

```html
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
  <!-- Content here -->
</div>
<!-- /wp:group -->
```

---

## Notes

- **Do not nest Containers** - Use only one Container per section
- **Full-width backgrounds** - Apply background colors to parent section, not Container
- **Override max-width** - Use `className="max-w-4xl"` to override if needed
- **Edge-to-edge content** - Omit Container for full-width layouts (heroes, images)
- **Consistent spacing** - Use Container consistently across all page sections
