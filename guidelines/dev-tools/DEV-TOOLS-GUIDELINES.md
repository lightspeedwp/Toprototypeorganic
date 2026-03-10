# Developer Tools Guidelines

**Version:** 1.0  
**Last Updated:** December 28, 2024

## Purpose

This document defines the standards, patterns, and best practices for all developer tool pages in the LightSpeed Tour Operator prototype.

Developer tools are internal pages used for:
- Testing and validation
- Documentation and reference
- Component showcases
- Design system demonstration
- QA and debugging

---

## Core Principles

### 1. **Consistency**
All dev tool pages follow the same structural patterns, navigation conventions, and styling guidelines.

### 2. **Accessibility**
WCAG 2.1 AA compliance is mandatory for all dev tools.

### 3. **Design System Adherence**
All styling must use CSS variables from `/src/styles/theme.css`.

### 4. **Mobile-First**
Dev tools must be fully functional on mobile devices.

### 5. **Performance**
Lazy loading, code splitting, and optimization required.

---

## Directory Structure

```
/src/app/pages/
├── DevToolsPage.tsx              # Landing page (hub)
├── TemplateTester.tsx            # Template testing tool
├── ComponentShowcase.tsx         # Component showcase
├── ComponentAPIReference.tsx     # Component API docs
├── BlockDocumentation.tsx        # Block documentation
├── DesignBlocksShowcase.tsx      # Design blocks showcase
├── ThemeBlocksShowcase.tsx       # Theme blocks showcase
├── ButtonShowcase.tsx            # Button styles showcase
├── HeaderFooterComparison.tsx    # Header/footer comparison
├── SectionStylesShowcase.tsx     # Section presets showcase
├── IconLibrary.tsx               # Icon reference (future)
├── LivePreview.tsx               # Live preview tool (future)
└── StyleGuide.tsx                # Style guide (future)
```

---

## Page Structure Template

All dev tool pages must follow this structure:

```tsx
/**
 * {Tool Name} development tool page.
 * 
 * {Brief description of tool purpose and functionality}
 * 
 * @module {ToolName}
 * @category pages
 * @development-tool
 */

import React, { useState } from 'react';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { DevToolFilterControls } from '../components/common/DevToolFilterControls';

interface {ToolName}Props {
  onNavigate?: (pageId: string) => void;
}

export function {ToolName}({ onNavigate }: {ToolName}Props) {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        {/* 1. BREADCRUMBS - Always first */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Developer Tools', href: '/dev-tools' },
            { label: '{Tool Name}', isCurrent: true }
          ]}
        />

        {/* 2. PAGE HEADER */}
        <div className="mb-8">
          <h1 className="mb-4">{Tool Name}</h1>
          <p className="text-muted-foreground max-w-3xl">
            {Tool description}
          </p>
        </div>

        {/* 3. FILTER CONTROLS (if applicable) */}
        <DevToolFilterControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          categoryOptions={categoryOptions}
          onCategoryChange={setCategoryFilter}
          totalCount={totalCount}
          filteredCount={filteredCount}
          itemType="component"
        />

        {/* 4. MAIN CONTENT */}
        <div className="space-y-8">
          {/* Tool-specific content */}
        </div>

        {/* 5. FOOTER NOTE (optional) */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            {Footer message}
          </p>
        </div>
      </Container>
    </div>
  );
}

{ToolName}.displayName = '{ToolName}';
```

---

## Required Components

### 1. Breadcrumbs

**Required on ALL dev tool pages.**

```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: '{Tool Name}', isCurrent: true }
  ]}
/>
```

**Placement:** First element inside Container, before page heading.

**Guidelines:** See `/guidelines/components/Breadcrumbs.md`

### 2. DevToolFilterControls

**Required when page has filterable content.**

```tsx
<DevToolFilterControls
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  categoryFilter={categoryFilter}
  categoryOptions={categoryOptions}
  onCategoryChange={setCategoryFilter}
  totalCount={totalCount}
  filteredCount={filteredCount}
  itemType="component" // or "template", "block", etc.
/>
```

**Features:**
- Mobile: Popover filter panel
- Desktop: Inline filter controls
- Search, category, and status filters
- Results count display
- Clear filters action

**Placement:** After page header, before main content.

---

## Typography Standards

All dev tool pages must use semantic HTML and CSS variables:

### Headings

```tsx
// H1 - Page title
<h1 className="mb-4">
  Page Title
</h1>

// Gets automatically:
// - font-family: var(--font-family-lora)
// - font-size: var(--text-6xl)
// - font-weight: var(--font-weight-bold)

// H2 - Section title
<h2 className="mb-6">
  Section Title
</h2>

// Gets automatically:
// - font-family: var(--font-family-lora)
// - font-size: var(--text-4xl)
// - font-weight: var(--font-weight-semibold)

// H3 - Subsection title
<h3 className="mb-4">
  Subsection Title
</h3>

// Gets automatically:
// - font-family: var(--font-family-lora)
// - font-size: var(--text-3xl)
// - font-weight: var(--font-weight-semibold)
```

### Body Text

```tsx
// Paragraph
<p className="text-muted-foreground">
  Description text
</p>

// Gets automatically:
// - font-family: var(--font-family-noto-sans)
// - font-size: var(--text-base)
// - font-weight: var(--font-weight-normal)
```

### Override Only When Necessary

```tsx
// Small text (metadata, captions)
<p
  className="text-sm text-muted-foreground"
  style={{
    fontFamily: 'var(--font-family-noto-sans)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-weight-normal)',
  }}
>
  Small print
</p>

// Medium weight for labels
<span
  style={{
    fontFamily: 'var(--font-family-noto-sans)',
    fontWeight: 'var(--font-weight-medium)',
  }}
>
  Label
</span>
```

---

## Color Standards

**Use semantic color tokens only:**

```tsx
// Backgrounds
className="bg-background"      // Page background
className="bg-card"            // Card background
className="bg-muted"           // Muted background
className="bg-primary"         // Primary accent

// Text
className="text-foreground"           // Primary text
className="text-muted-foreground"     // Secondary text
className="text-primary"              // Primary accent text
className="text-card-foreground"      // Card text

// Borders
className="border-border"      // Standard border
className="border-primary"     // Accent border

// States
className="hover:bg-muted"           // Hover background
className="hover:text-foreground"    // Hover text
className="focus:ring-ring"          // Focus ring
```

**Never hardcode colors:**

```tsx
// ❌ WRONG
className="text-gray-600"
style={{ color: '#6b7280' }}

// ✅ CORRECT
className="text-muted-foreground"
```

---

## Spacing Standards

**Use Tailwind spacing scale:**

```tsx
// Padding
className="p-4"    // 16px
className="p-6"    // 24px
className="p-8"    // 32px

// Margin
className="mb-4"   // 16px
className="mb-6"   // 24px
className="mb-8"   // 32px
className="mb-12"  // 48px

// Gap
className="gap-4"  // 16px
className="gap-6"  // 24px
className="gap-8"  // 32px

// Responsive spacing
className="py-8 md:py-12 lg:py-16"
```

**Standard Page Sections:**

```tsx
// Page wrapper
className="min-h-screen bg-background py-12"

// Section spacing
className="mb-8"   // Between major sections
className="mb-12"  // Between page sections

// Component spacing
className="space-y-4"   // Tight spacing (cards, list items)
className="space-y-6"   // Medium spacing (sections)
className="space-y-8"   // Wide spacing (major sections)
```

---

## Layout Patterns

### Grid Layouts

**Component Cards:**

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id} className="bg-card border border-border rounded-lg p-6">
      {/* Card content */}
    </div>
  ))}
</div>
```

**Stats Display:**

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
  {stats.map(stat => (
    <div key={stat.id} className="bg-card border border-border rounded-lg p-4">
      {/* Stat content */}
    </div>
  ))}
</div>
```

### List Layouts

**Vertical Stack:**

```tsx
<div className="space-y-6">
  {items.map(item => (
    <div key={item.id} className="bg-card border border-border rounded-lg p-6">
      {/* Item content */}
    </div>
  ))}
</div>
```

---

## Mobile Responsiveness

### Breakpoints

```tsx
// Mobile-first approach
className="text-sm md:text-base lg:text-lg"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="py-8 md:py-12 lg:py-16"
```

### Filter Controls

**Always use DevToolFilterControls for mobile-friendly filtering:**

```tsx
// Mobile: Popover with filter button
// Desktop: Inline filter controls
<DevToolFilterControls
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  categoryFilter={categoryFilter}
  categoryOptions={categoryOptions}
  onCategoryChange={setCategoryFilter}
  totalCount={totalCount}
  filteredCount={filteredCount}
  itemType="component"
/>
```

### Touch Targets

**Minimum 44px × 44px for interactive elements:**

```tsx
// Buttons
className="px-4 py-3"  // At least 48px height

// Links in cards
className="p-6"        // Generous padding

// Icon buttons
className="p-2 min-w-[44px] min-h-[44px]"
```

---

## Accessibility Requirements

### Semantic HTML

```tsx
// ✅ CORRECT
<nav aria-label="Breadcrumb">
  <h1>Page Title</h1>
  <button aria-label="Close">
    <X className="w-4 h-4" />
  </button>
</nav>

// ❌ WRONG
<div>
  <div className="text-4xl font-bold">Page Title</div>
  <div onClick={handleClose}>
    <X className="w-4 h-4" />
  </div>
</div>
```

### ARIA Labels

```tsx
// Form inputs
<label htmlFor="search-input" className="sr-only">
  Search components
</label>
<input id="search-input" type="text" />

// Icon buttons
<button aria-label="Close filters">
  <X className="w-4 h-4" />
</button>

// Status updates
<div role="status" aria-live="polite">
  Showing {count} results
</div>
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Focus states must be visible (use `focus:ring-ring`)
- Tab order must be logical
- Escape key should close popovers/modals

### Color Contrast

- Text: Minimum 4.5:1 (WCAG AA)
- Large text: Minimum 3:1 (WCAG AA)
- Use semantic color tokens (ensures compliance)

---

## Performance Best Practices

### Code Splitting

```tsx
// In App.tsx - lazy load dev tools
const TemplateTester = lazy(() => import("./pages/TemplateTester"));
const ComponentShowcase = lazy(() => import("./pages/ComponentShowcase"));

// Wrap in Suspense
<Suspense fallback={<PageLoadingFallback />}>
  <TemplateTester onNavigate={handleNavigate} />
</Suspense>
```

### State Management

```tsx
// Use React.memo for expensive components
const ExpensiveComponent = memo(({ data }) => {
  // Component logic
});

// Use useMemo for expensive computations
const filteredItems = useMemo(() => {
  return items.filter(item => item.name.includes(searchQuery));
}, [items, searchQuery]);

// Use useCallback for event handlers
const handleSearch = useCallback((query: string) => {
  setSearchQuery(query);
}, []);
```

### Lazy Loading

```tsx
// Defer non-critical content
useEffect(() => {
  const timer = setTimeout(() => {
    setShowSecondaryContent(true);
  }, 100);
  
  return () => clearTimeout(timer);
}, []);
```

---

## Testing Checklist

Before submitting a dev tool page, verify:

- [ ] Breadcrumbs present and functional
- [ ] Typography uses semantic HTML (no Tailwind size/weight classes on headings)
- [ ] All colors use semantic tokens
- [ ] Responsive on mobile (320px+), tablet (768px+), desktop (1024px+)
- [ ] Filter controls work on mobile (popover) and desktop (inline)
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] ARIA labels present
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets are 44px minimum
- [ ] Page loads quickly (lazy loading in place)
- [ ] No console errors or warnings
- [ ] Works in light and dark mode

---

## Example Implementation

See the following pages for reference implementations:

1. **DevToolsPage** (`/src/app/pages/DevToolsPage.tsx`)
   - Landing page pattern
   - Category organization
   - Stats display
   - Card grid layout

2. **TemplateTester** (`/src/app/pages/TemplateTester.tsx`)
   - Filter controls
   - Category filtering
   - Status filtering
   - Results count
   - Mobile-responsive

3. **ComponentShowcase** (`/src/app/pages/ComponentShowcase.tsx`)
   - Search functionality
   - Category filtering
   - Component cards
   - Stats tracking

---

## Related Documentation

- **Breadcrumbs Component:** `/guidelines/components/Breadcrumbs.md`
- **Design System Guide:** `/guidelines/DESIGN-SYSTEM-GUIDE.md`
- **Design Tokens:** `/guidelines/design-tokens/`
- **Overview Components:** `/guidelines/overview-components.md`
- **Overview Patterns:** `/guidelines/overview-patterns.md`

---

## Questions?

For questions or clarifications about dev tool guidelines, refer to the comprehensive guidelines system or the design system documentation.

**Maintainer:** LightSpeed Tour Operator Prototype Team  
**Version:** 1.0  
**Last Updated:** December 28, 2024
