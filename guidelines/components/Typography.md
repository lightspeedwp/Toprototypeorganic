# Typography Component

**File:** `/src/app/components/common/Typography.tsx` (future)  
**WordPress Mapping:** Utility component (not a WordPress block)  
**Category:** Common Component

---

## Purpose

Provides utility component for applying consistent typography styles when semantic HTML alone is insufficient (e.g., styled spans, custom text treatments).

**Note:** This is a **future** component. Currently, use semantic HTML elements (`<h1>`, `<h2>`, `<p>`, etc.) which automatically receive typography styles from `/src/styles/theme.css`.

---

## When to Use

❌ **Do NOT use for:**
- Section headings → Use `<h2>`, `<h3>`
- Body text → Use `<p>`
- Lists → Use `<ul>`, `<ol>`, `<li>`

✅ **DO use for:**
- Custom text treatments (e.g., feature stats, badge text)
- Styled inline elements (e.g., `<span>`)
- Overriding default typography in special contexts
- Dynamic text that needs specific styling

---

## Proposed API

```typescript
import { Typography } from "../components/common/Typography";

<Typography variant="h1" as="div">
  Display heading rendered as div
</Typography>

<Typography variant="body" className="text-muted-foreground">
  Custom styled body text
</Typography>
```

---

## Proposed Props

| Prop | Type | Options | Default | Description |
|------|------|---------|---------|-------------|
| `variant` | `string` | `"h1" \| "h2" \| "h3" \| "h4" \| "body" \| "label"` | `"body"` | Typography style to apply |
| `as` | `string` | Any HTML element | `"p"` | HTML element to render |
| `children` | `React.ReactNode` | - | - | Content |
| `className` | `string` | - | - | Additional classes |

---

## Typography Variants

### Heading 1
```typescript
<Typography variant="h1">
  // font-family: var(--font-family-lora)
  // font-size: var(--text-4xl) (60px)
  // font-weight: var(--font-weight-semibold) (600)
  // line-height: 1.25
</Typography>
```

### Heading 2
```typescript
<Typography variant="h2">
  // font-family: var(--font-family-lora)
  // font-size: var(--text-2xl) (32px)
  // font-weight: var(--font-weight-semibold) (600)
  // line-height: 1.25
</Typography>
```

### Heading 3
```typescript
<Typography variant="h3">
  // font-family: var(--font-family-lora)
  // font-size: var(--text-xl) (20px)
  // font-weight: var(--font-weight-semibold) (600)
  // line-height: 1.25
</Typography>
```

### Heading 4
```typescript
<Typography variant="h4">
  // font-family: var(--font-family-lora)
  // font-size: var(--text-lg) (16px)
  // font-weight: var(--font-weight-semibold) (600)
  // line-height: 1.25
</Typography>
```

### Body
```typescript
<Typography variant="body">
  // font-family: var(--font-family-noto-sans)
  // font-size: var(--text-base) (16px)
  // font-weight: var(--font-weight-normal) (400)
  // line-height: 1.5
</Typography>
```

### Label
```typescript
<Typography variant="label">
  // font-family: var(--font-family-lora)
  // font-size: var(--text-base) (16px)
  // font-weight: var(--font-weight-medium) (500)
  // line-height: 1.5
</Typography>
```

---

## Implementation Example (Future)

```typescript
import { cn } from "../../lib/utils";

interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "label";
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  h1: "font-lora text-[length:var(--text-4xl)] font-semibold leading-tight",
  h2: "font-lora text-[length:var(--text-2xl)] font-semibold leading-tight",
  h3: "font-lora text-[length:var(--text-xl)] font-semibold leading-tight",
  h4: "font-lora text-[length:var(--text-lg)] font-semibold leading-tight",
  body: "font-sans text-[length:var(--text-base)] font-normal leading-normal",
  label: "font-lora text-[length:var(--text-base)] font-medium leading-normal",
};

export function Typography({
  variant = "body",
  as: Component = "p",
  children,
  className,
}: TypographyProps) {
  return (
    <Component className={cn(variantStyles[variant], className)}>
      {children}
    </Component>
  );
}
```

---

## Current Approach (Recommended)

Until Typography component is implemented, use semantic HTML:

```typescript
// ✅ Correct approach
<h2>Section Title</h2>
<p>Body content</p>

// ❌ Avoid this
<div className="text-2xl font-bold">Section Title</div>
```

**Exception:** Use Tailwind classes only when semantic HTML doesn't fit:

```typescript
// Small metadata text
<span className="text-sm text-muted-foreground">
  Published: March 15, 2024
</span>

// Feature stat
<div className="text-4xl font-bold text-accent">
  250+
</div>
```

---

## Notes

- Prefer semantic HTML over Typography component when possible
- Component useful for design system consistency in edge cases
- Always reference CSS variables, not hardcoded values
- Consider implementing when complex text styling needs arise

---

## WordPress 6.9 "Fit Text" Support

**NEW:** Typography component should support the WordPress 6.9 "Fit text to container" feature for creating high-impact, responsive headlines.

### Fit Text Variant

```typescript
<Typography variant="h1" fitText>
  Explore Iceland's Glaciers
</Typography>
```

### Proposed Implementation

```typescript
interface TypographyProps {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "label";
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  fitText?: boolean;  // NEW: Enable fit-text scaling
}

export function Typography({
  variant = "body",
  as: Component = "p",
  children,
  className,
  fitText = false,
}: TypographyProps) {
  const baseStyles = variantStyles[variant];
  
  const fitTextStyles = fitText
    ? "w-full text-center font-size-[clamp(2rem,8vw,12rem)] leading-[1.1]"
    : "";
  
  return (
    <div className={fitText ? "w-full container-inline-size" : undefined}>
      <Component className={cn(baseStyles, fitTextStyles, className)}>
        {children}
      </Component>
    </div>
  );
}
```

### Fit Text CSS Classes

```css
/* Add to theme.css */
.container-inline-size {
  container-type: inline-size;
}

.fit-text {
  width: 100%;
  text-align: center;
  font-size: clamp(2rem, 8vw, 12rem);
  line-height: 1.1;
}
```

### Usage Example

```typescript
// Hero with fit-text headline
<Hero>
  <Typography variant="h1" fitText>
    Discover the Land of Fire and Ice
  </Typography>
  <p className="text-center mt-4">
    Experience Iceland's breathtaking landscapes
  </p>
</Hero>

// Callout banner
<section className="bg-primary text-primary-foreground py-12">
  <Container>
    <Typography variant="h2" fitText>
      Limited Time Offer
    </Typography>
  </Container>
</section>
```

### When to Use Fit Text

**✅ Good for:**
- Hero headlines
- Banner messages
- Callout sections
- Landing page titles
- Featured quotes

**❌ Avoid for:**
- Body paragraphs
- Card titles
- Navigation text
- Form labels
- Multi-line content
