# Code Documentation Guidelines

**Version:** V3 — WordPress-Native Alignment  
**Last Updated:** December 25, 2024

This document defines the **code-level documentation standards** for the LightSpeed Tour Operator plugin prototype using JSDoc conventions.

---

## Purpose

Code documentation serves multiple critical purposes:

1. **IDE Support:** Enables autocomplete and inline help in editors
2. **Maintainability:** Explains complex logic and design decisions
3. **Onboarding:** Helps new developers understand the codebase
4. **Type Safety:** Supplements TypeScript with runtime documentation
5. **Usage Examples:** Demonstrates how to use components and functions

---

## Documentation Standard: JSDoc

We use **JSDoc** as our documentation standard because:

- ✅ Industry-standard for JavaScript/TypeScript
- ✅ Excellent IDE integration (VS Code, WebStorm, etc.)
- ✅ Supports TypeScript type annotations
- ✅ Can generate documentation sites
- ✅ Works with existing TypeScript types

---

## Documentation Levels

### 1. File-Level Documentation

**Every file must have a file-level JSDoc comment at the top.**

```typescript
/**
 * Hero pattern component for page headers.
 * 
 * This component renders the hero section used across all major page types.
 * It supports optional background images, intro text, and call-to-action buttons.
 * 
 * @module Hero
 * @category patterns
 * @wordpressPattern lightspeed/hero-standard
 */

import { Container } from "../common/Container";
// ...rest of imports
```

**Required Tags:**
- `@module` - The module/component name
- `@category` - Component category (patterns, blocks, parts, common, ui, pages)
- `@wordpressPattern` or `@wordpressBlock` or `@wordpressTemplate` - WordPress mapping

**Optional Tags:**
- `@see` - Link to related guideline file
- `@since` - Version introduced

**Example for Data File:**

```typescript
/**
 * TypeScript interfaces for all WordPress content types.
 * 
 * These interfaces map directly to WordPress custom post types and taxonomies.
 * All mock data in mock.ts implements these interfaces.
 * 
 * @module types
 * @category data
 * @see /guidelines/ARCHITECTURE.md
 */
```

---

### 2. Interface Documentation

**Every interface must have a JSDoc comment.**

```typescript
/**
 * Props for the Hero pattern component.
 * 
 * The Hero pattern is used for page headers across all major templates
 * (Tours Archive, Destinations Archive, Single Tours, etc.)
 * 
 * @interface HeroProps
 */
export interface HeroProps {
  /**
   * Main heading displayed in the hero section.
   * Should be the page title (H1 element).
   * 
   * @example "Explore Iceland's Natural Wonders"
   */
  title: string;

  /**
   * Optional introductory paragraph displayed below the title.
   * Maximum recommended length: 200 characters.
   * 
   * @example "Discover breathtaking landscapes, geothermal wonders, and the Northern Lights."
   */
  intro?: string;

  /**
   * Optional context text displayed above the title.
   * Typically used for breadcrumb-style navigation context.
   * 
   * @example "Tours / Iceland"
   */
  context?: string;

  /**
   * Optional background image URL.
   * Image should be at least 1920x600px for optimal display.
   * 
   * @example "https://images.unsplash.com/photo-iceland-landscape"
   */
  image?: string;

  /**
   * Optional call-to-action button configuration.
   */
  cta?: {
    /** Button text label */
    label: string;
    /** Button target URL (use hash for prototype) */
    href: string;
  };

  /**
   * Optional additional CSS classes to apply to the hero section.
   */
  className?: string;
}
```

**Required for Each Prop:**
- Description of the prop
- `@example` - Real-world example value (when helpful)

**Optional Tags:**
- `@default` - Default value if applicable
- `@deprecated` - If prop is deprecated

---

### 3. Component Documentation

**Every exported component must have a JSDoc comment.**

```typescript
/**
 * Hero pattern component for page headers.
 * 
 * The Hero component is a foundational pattern used across all major page types
 * in the WordPress block theme. It provides a consistent header structure with
 * optional background images, introductory text, and call-to-action buttons.
 * 
 * **WordPress Mapping:** Equivalent to `lightspeed/hero-standard` pattern
 * 
 * **Usage Guidelines:**
 * - Use one Hero per page (typically at the top)
 * - Title should be the page H1 (only one H1 per page)
 * - Image should be decorative only (opacity reduced to 20%)
 * - CTA optional but recommended for conversion pages
 * 
 * **Accessibility:**
 * - Uses semantic HTML (h1, p, a)
 * - Background image has empty alt attribute (decorative)
 * - Focus states visible on CTA button
 * 
 * @component
 * @category patterns
 * @wordpressPattern lightspeed/hero-standard
 * 
 * @param {HeroProps} props - Component properties
 * @returns {JSX.Element} Rendered hero section
 * 
 * @example
 * // Basic hero with title only
 * <Hero title="Explore Iceland" />
 * 
 * @example
 * // Full hero with all options
 * <Hero
 *   title="Explore Iceland's Natural Wonders"
 *   intro="Discover breathtaking landscapes and the Northern Lights."
 *   context="Tours / Iceland"
 *   image="https://images.unsplash.com/photo-iceland"
 *   cta={{ label: "View Tours", href: "#tours" }}
 * />
 * 
 * @example
 * // Hero with custom background color
 * <Hero
 *   title="About Our Company"
 *   intro="Learn about our mission and team."
 *   className="bg-muted"
 * />
 */
export function Hero({ title, intro, context, image, cta, className }: HeroProps) {
  return (
    <section className={cn("relative py-16 md:py-24", className)}>
      {/* Component implementation */}
    </section>
  );
}
```

**Required Tags:**
- `@component` - Identifies as a React component
- `@category` - Component category
- `@wordpressPattern` or `@wordpressBlock` or `@wordpressTemplate` - WordPress mapping
- `@param` - Props parameter
- `@returns` - Return value description
- `@example` - At least one usage example (preferably 2-3 examples)

**Optional Tags:**
- `@see` - Link to guideline file
- `@deprecated` - If component is deprecated

**Additional Documentation Sections (in description):**
- **WordPress Mapping:** Clear explanation of WordPress equivalent
- **Usage Guidelines:** When and how to use the component
- **Accessibility:** Key accessibility features

---

### 4. Function Documentation

**Every exported function must have a JSDoc comment.**

```typescript
/**
 * Merges CSS class names using clsx and tailwind-merge.
 * 
 * This utility function combines multiple class names and resolves
 * Tailwind CSS conflicts using tailwind-merge. It's the recommended
 * way to conditionally apply classes in all components.
 * 
 * **Why tailwind-merge?**
 * Tailwind classes can conflict (e.g., "p-4 p-6" should become "p-6").
 * This function ensures the last class wins when conflicts occur.
 * 
 * @function cn
 * @category utility
 * 
 * @param {...ClassValue[]} inputs - Class names to merge (strings, objects, arrays)
 * @returns {string} Merged class name string
 * 
 * @example
 * // Simple class merging
 * cn("text-sm", "font-bold") // => "text-sm font-bold"
 * 
 * @example
 * // Conditional classes
 * cn("text-sm", isActive && "text-primary") // => "text-sm text-primary" (if active)
 * 
 * @example
 * // Resolving Tailwind conflicts
 * cn("p-4", "p-6") // => "p-6" (last class wins)
 * 
 * @example
 * // Common component pattern
 * <div className={cn("base-class", className)}>
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Required Tags:**
- `@function` - Identifies as a function
- `@category` - Function category
- `@param` - Each parameter with type and description
- `@returns` - Return value with type and description
- `@example` - At least 2-3 usage examples

---

### 5. Hook Documentation

**Every custom hook must have a JSDoc comment.**

```typescript
/**
 * React hook that detects mobile viewport size.
 * 
 * This hook returns true when the viewport width is below 768px (mobile breakpoint).
 * It uses a media query listener to update reactively when the window is resized.
 * 
 * **Important:** The hook returns `undefined` on first render (SSR-safe), then
 * updates to a boolean after mounting. Always handle the undefined case.
 * 
 * @hook useIsMobile
 * @category hooks
 * 
 * @returns {boolean} True if viewport is mobile size (<768px), false otherwise
 * 
 * @example
 * // Basic usage
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *   
 *   return (
 *     <div>
 *       {isMobile ? <MobileView /> : <DesktopView />}
 *     </div>
 *   );
 * }
 * 
 * @example
 * // Handling undefined state
 * function MyComponent() {
 *   const isMobile = useIsMobile();
 *   
 *   if (isMobile === undefined) {
 *     return <LoadingState />;
 *   }
 *   
 *   return isMobile ? <MobileView /> : <DesktopView />;
 * }
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  // ... implementation
  return !!isMobile;
}
```

**Required Tags:**
- `@hook` - Identifies as a React hook
- `@category` - Hook category
- `@returns` - Return value description
- `@example` - At least one usage example

---

### 6. Type/Constant Documentation

**Important types and constants should have JSDoc comments.**

```typescript
/**
 * Mobile breakpoint width in pixels.
 * 
 * Viewports below this width are considered mobile.
 * This value matches Tailwind's `md:` breakpoint.
 * 
 * @constant {number}
 */
const MOBILE_BREAKPOINT = 768;

/**
 * Navigation link configuration for site header.
 * 
 * @constant {NavLink[]}
 */
const NAV_LINKS: NavLink[] = [
  { label: "Tours", href: "#tours" },
  // ...
];
```

---

## Category Tags Reference

Use these standard category values:

| Category | Use For |
|----------|---------|
| `patterns` | Block patterns (Hero, CardGrid, CTA, etc.) |
| `blocks` | Block components (Taxonomy nav, pagination, etc.) |
| `parts` | Template parts (Header, Footer) |
| `common` | Common components (Container, Logo, etc.) |
| `ui` | shadcn/ui components |
| `pages` | Page templates |
| `data` | Data types and mock data |
| `hooks` | React hooks |
| `utility` | Utility functions |
| `layout` | Layout components |

---

## WordPress Mapping Tags

Use these tags to document WordPress equivalents:

```typescript
/**
 * @wordpressPattern lightspeed/hero-standard
 */

/**
 * @wordpressBlock core/group
 */

/**
 * @wordpressBlock custom/tour-card
 */

/**
 * @wordpressTemplate archive-tour
 */

/**
 * @wordpressPart header
 */
```

---

## Examples by File Type

### Data Types File

```typescript
/**
 * TypeScript interfaces for WordPress content types.
 * 
 * These interfaces define the structure of all content types used in the
 * LightSpeed Tour Operator plugin. They map directly to WordPress custom
 * post types and taxonomies.
 * 
 * @module types
 * @category data
 * @see /guidelines/ARCHITECTURE.md
 */

/**
 * Tour custom post type.
 * 
 * Tours are the primary content type for travel packages. Each tour
 * includes destination references, travel style taxonomy terms, and
 * detailed itinerary information.
 * 
 * @interface Tour
 * @wordpressPostType tour
 */
export interface Tour {
  /**
   * Unique tour identifier.
   * Maps to WordPress post ID.
   */
  id: string;

  /**
   * URL-friendly tour identifier.
   * Maps to WordPress post slug.
   * 
   * @example "iceland-explorer"
   */
  slug: string;

  /**
   * Tour title/name.
   * Used as H1 on single tour pages.
   * 
   * @example "Iceland Explorer: 7-Day Adventure"
   */
  title: string;

  // ... rest of interface
}
```

### Pattern Component File

```typescript
/**
 * Card Grid pattern component.
 * 
 * Provides a responsive grid layout for displaying cards (tours, destinations,
 * blog posts, etc.). Supports 2, 3, or 4 column layouts with automatic
 * responsive breakpoints.
 * 
 * @module CardGrid
 * @category patterns
 * @wordpressPattern lightspeed/card-grid
 * @see /guidelines/patterns/card-grid-patterns.md
 */

import { Container } from "../common/Container";
import { cn } from "../../lib/utils";

/**
 * Props for the CardGrid pattern component.
 * 
 * @interface CardGridProps
 */
export interface CardGridProps {
  /**
   * Card components to display in the grid.
   * Typically TourCard, DestinationCard, or BlogCard components.
   */
  children: React.ReactNode;

  /**
   * Number of columns in desktop layout.
   * Mobile always uses 1 column.
   * 
   * @default 3
   */
  columns?: 2 | 3 | 4;

  /**
   * Optional additional CSS classes.
   */
  className?: string;
}

/**
 * Card Grid pattern component.
 * 
 * Renders a responsive grid of cards with automatic column layout based on
 * screen size. This pattern is used throughout the site for listing tours,
 * destinations, accommodation, blog posts, and team members.
 * 
 * **Responsive Behavior:**
 * - Mobile: 1 column (always)
 * - Tablet (md): 2 columns
 * - Desktop (lg): 2, 3, or 4 columns (based on `columns` prop)
 * 
 * **WordPress Mapping:** Equivalent to `lightspeed/card-grid` pattern
 * 
 * @component
 * @category patterns
 * @wordpressPattern lightspeed/card-grid
 * 
 * @param {CardGridProps} props - Component properties
 * @returns {JSX.Element} Rendered card grid section
 * 
 * @example
 * // 3-column grid (default)
 * <CardGrid>
 *   <TourCard tour={tour1} />
 *   <TourCard tour={tour2} />
 *   <TourCard tour={tour3} />
 * </CardGrid>
 * 
 * @example
 * // 4-column grid
 * <CardGrid columns={4}>
 *   {destinations.map(dest => (
 *     <DestinationCard key={dest.id} destination={dest} />
 *   ))}
 * </CardGrid>
 */
export function CardGrid({ children, columns = 3, className }: CardGridProps) {
  // ... implementation
}
```

### Common Component File

```typescript
/**
 * Container component for width constraints.
 * 
 * Provides consistent max-width and horizontal padding across all pages.
 * This is a foundational component used by virtually all patterns and blocks.
 * 
 * @module Container
 * @category common
 * @see /guidelines/components/Container.md
 */

import { cn } from "../../lib/utils";

/**
 * Props for the Container component.
 * 
 * @interface ContainerProps
 */
export interface ContainerProps {
  /** Content to wrap */
  children: React.ReactNode;

  /** Optional additional CSS classes */
  className?: string;

  /**
   * HTML element to render as.
   * Choose the semantically appropriate element for your content.
   * 
   * @default "div"
   */
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
}

/**
 * Container component.
 * 
 * Wraps content with consistent max-width and horizontal padding.
 * Automatically handles responsive padding (smaller on mobile, larger on desktop).
 * 
 * **Max Width:** 1280px (Tailwind's max-w-7xl)  
 * **Padding:** 16px mobile, 24px tablet, 32px desktop
 * 
 * @component
 * @category common
 * 
 * @param {ContainerProps} props - Component properties
 * @returns {JSX.Element} Rendered container element
 * 
 * @example
 * // Default div container
 * <Container>
 *   <h1>Page Title</h1>
 *   <p>Content here</p>
 * </Container>
 * 
 * @example
 * // Semantic section element
 * <Container as="section">
 *   <SectionContent />
 * </Container>
 * 
 * @example
 * // With additional styling
 * <Container className="bg-muted py-12">
 *   <FeatureContent />
 * </Container>
 */
export function Container({ children, className, as: Component = "div" }: ContainerProps) {
  return (
    <Component className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Component>
  );
}
```

---

## Documentation Checklist

Before committing code, ensure:

- [ ] File has file-level JSDoc comment
- [ ] All exported interfaces have JSDoc comments
- [ ] All interface props have descriptions
- [ ] All exported components have JSDoc comments
- [ ] Component JSDoc includes WordPress mapping
- [ ] Component JSDoc includes at least 2 usage examples
- [ ] All exported functions have JSDoc comments
- [ ] Function JSDoc includes usage examples
- [ ] All custom hooks have JSDoc comments
- [ ] Hook JSDoc includes usage examples
- [ ] Important constants have JSDoc comments
- [ ] Category tags are accurate
- [ ] WordPress mapping tags are present

---

## IDE Integration

### VS Code

JSDoc comments automatically appear in:
- Autocomplete suggestions
- Hover tooltips
- Parameter hints
- Quick info panels

**Enable JSDoc highlighting:**
Add to `.vscode/settings.json`:

```json
{
  "typescript.suggest.completeJSDocs": true,
  "javascript.suggest.completeJSDocs": true
}
```

### WebStorm

JSDoc comments automatically appear in:
- Code completion
- Quick documentation (Ctrl+Q)
- Parameter info (Ctrl+P)

---

## Documentation Generation

JSDoc comments can be used to generate documentation sites using tools like:

- **TypeDoc** - Converts TypeScript + JSDoc to documentation
- **JSDoc** - Traditional JSDoc documentation generator
- **Docusaurus** - Can integrate TypeDoc output

**Future:** Consider generating documentation site from JSDoc comments.

---

## Common Patterns

### Pattern Component Template

```typescript
/**
 * [Pattern Name] pattern component.
 * 
 * [Brief description of pattern purpose and when to use it]
 * 
 * @module [PatternName]
 * @category patterns
 * @wordpressPattern lightspeed/[pattern-slug]
 * @see /guidelines/patterns/[pattern-name].md
 */

/**
 * Props for [PatternName] component.
 * @interface [PatternName]Props
 */
export interface [PatternName]Props {
  // Props with JSDoc comments
}

/**
 * [Pattern Name] component.
 * 
 * [Detailed description]
 * 
 * **WordPress Mapping:** [WordPress equivalent]
 * 
 * **Usage Guidelines:**
 * - [Guideline 1]
 * - [Guideline 2]
 * 
 * @component
 * @category patterns
 * @wordpressPattern lightspeed/[pattern-slug]
 * 
 * @param {[PatternName]Props} props - Component properties
 * @returns {JSX.Element} Rendered component
 * 
 * @example
 * // [Example description]
 * <PatternName prop="value" />
 */
export function [PatternName](props: [PatternName]Props) {
  // Implementation
}
```

---

## Anti-Patterns

### ❌ Don't: Minimal/Missing Documentation

```typescript
// Bad - no documentation
export function Hero({ title }: HeroProps) {
  return <div>{title}</div>;
}
```

### ✅ Do: Comprehensive Documentation

```typescript
/**
 * Hero pattern component for page headers.
 * [Full documentation as shown in examples above]
 */
export function Hero({ title }: HeroProps) {
  return <div>{title}</div>;
}
```

### ❌ Don't: Redundant Documentation

```typescript
/**
 * Title prop
 * @param {string} title - The title
 */
title: string;
```

### ✅ Do: Meaningful Documentation

```typescript
/**
 * Main heading displayed in the hero section.
 * Should be the page title (H1 element).
 * @example "Explore Iceland's Natural Wonders"
 */
title: string;
```

---

## Resources

- [JSDoc Official Documentation](https://jsdoc.app/)
- [TypeScript JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [VS Code JSDoc Support](https://code.visualstudio.com/docs/languages/javascript#_jsdoc-support)

---

## Related Guidelines

- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [overview-components.md](overview-components.md) - Component organization
- [Guidelines.md](Guidelines.md) - Main guidelines

---

**Remember:** Good documentation makes code self-explanatory. Write docs for your future self and your teammates.
