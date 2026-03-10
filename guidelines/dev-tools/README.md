# Developer Tools Documentation

Welcome to the Developer Tools documentation for the LightSpeed Tour Operator prototype.

## Quick Navigation

### Main Guidelines
- **[DEV-TOOLS-GUIDELINES.md](./DEV-TOOLS-GUIDELINES.md)** - Complete dev tools standards and patterns
- **[BREADCRUMB-UPDATE-CHECKLIST.md](./BREADCRUMB-UPDATE-CHECKLIST.md)** - Breadcrumb implementation guide

### Related Documentation
- **[Breadcrumbs Component](../components/Breadcrumbs.md)** - Breadcrumbs component documentation
- **[Design System Guide](../DESIGN-SYSTEM-GUIDE.md)** - Complete design system guide
- **[Design Tokens](../design-tokens/)** - Color, typography, spacing tokens

## Developer Tools Overview

The prototype includes 12 developer tools organized into 4 categories:

### Documentation (2 tools)
1. **Block Documentation** - Document all blocks with usage examples
2. **Style Guide** - Complete design system style guide *(future)*

### Showcase (5 tools)
3. **Component Showcase** - Showcase all 27 components
4. **Design Blocks Showcase** - Showcase design blocks (buttons, groups, grids)
5. **Theme Blocks Showcase** - Showcase theme blocks (navigation, site logo)
6. **Button Showcase** - Showcase all button styles
7. **Section Presets Showcase** - Showcase all 22 section styles

### Testing (3 tools)
8. **Template Tester** - Test all 43 templates and pages
9. **Header/Footer Comparison** - Compare header and footer templates
10. **Live Preview** - Live component preview tool *(future)*

### Reference (2 tools)
11. **Component API** - Reference all component APIs
12. **Icon Library** - Icon reference with search *(future)*

## Access Developer Tools

**URL:** `/dev-tools/`

The developer tools landing page provides:
- Category organization
- Tool descriptions
- Quick stats
- Direct links to all tools

## Key Components

### 1. Breadcrumbs Component
**Location:** `/src/app/components/common/Breadcrumbs.tsx`

Standard navigation breadcrumb trail used on ALL dev tool pages.

**Pattern:**
```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: 'Template Tester', isCurrent: true }
  ]}
/>
```

**Documentation:** [components/Breadcrumbs.md](../components/Breadcrumbs.md)

### 2. DevToolFilterControls Component
**Location:** `/src/app/components/common/DevToolFilterControls.tsx`

Standardized filtering interface for dev tool pages with mobile-friendly popover.

**Features:**
- Mobile: Popover filter panel
- Desktop: Inline filter controls
- Search, category, and status filters
- Results count display
- Clear filters action

**Usage:**
```tsx
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

## Standard Page Structure

All dev tool pages follow this structure:

```tsx
<div className="min-h-screen bg-background py-12">
  <Container>
    {/* 1. BREADCRUMBS */}
    <Breadcrumbs items={[...]} />

    {/* 2. PAGE HEADER */}
    <div className="mb-8">
      <h1 className="mb-4">{Title}</h1>
      <p className="text-muted-foreground">{Description}</p>
    </div>

    {/* 3. FILTER CONTROLS (if applicable) */}
    <DevToolFilterControls {...} />

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
```

## Design System Compliance

All dev tools MUST:
- ✅ Use CSS variables from `/src/styles/theme.css`
- ✅ Use semantic HTML (h1-h6, p, nav, etc.)
- ✅ Use Lora font for headings
- ✅ Use Noto Sans font for body text
- ✅ Meet WCAG 2.1 AA standards
- ✅ Be mobile-responsive
- ✅ Support light/dark modes

**Never:**
- ❌ Hardcode colors
- ❌ Hardcode fonts
- ❌ Use Tailwind text size classes on headings (text-2xl, etc.)
- ❌ Use Tailwind font weight classes on headings (font-bold, etc.)

## Typography Standards

### Headings (Automatic Styling)

```tsx
// H1 - Page title
<h1>Page Title</h1>
// Gets: 48px, Lora, Bold (700)

// H2 - Section title
<h2>Section Title</h2>
// Gets: 32px, Lora, Semibold (600)

// H3 - Subsection title
<h3>Subsection Title</h3>
// Gets: 24px, Lora, Semibold (600)
```

### Body Text

```tsx
// Paragraph
<p className="text-muted-foreground">
  Description text
</p>
// Gets: 16px, Noto Sans, Normal (400)
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
```

## Color Standards

Use semantic color tokens only:

```tsx
// Backgrounds
className="bg-background"      // Page background
className="bg-card"            // Card background
className="bg-muted"           // Muted background

// Text
className="text-foreground"           // Primary text
className="text-muted-foreground"     // Secondary text
className="text-primary"              // Primary accent text

// Borders
className="border-border"      // Standard border
className="border-primary"     // Accent border
```

## Mobile Responsiveness

### Breakpoints

```tsx
// Mobile-first approach
className="text-sm md:text-base lg:text-lg"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="py-8 md:py-12 lg:py-16"
```

### Filter Controls

Always use `DevToolFilterControls` for mobile-friendly filtering:
- Mobile: Popover with filter button
- Desktop: Inline filter controls

### Touch Targets

Minimum 44px × 44px for all interactive elements:

```tsx
// Buttons
className="px-4 py-3"  // At least 48px height

// Links in cards
className="p-6"        // Generous padding
```

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

## Testing Checklist

Before submitting a dev tool page:

- [ ] Breadcrumbs present and functional
- [ ] Typography uses semantic HTML
- [ ] All colors use semantic tokens
- [ ] Responsive on mobile/tablet/desktop
- [ ] Filter controls work (mobile popover, desktop inline)
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] ARIA labels present
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets are 44px minimum
- [ ] Page loads quickly
- [ ] No console errors
- [ ] Works in light and dark mode

## Example Implementations

1. **DevToolsPage** (`/src/app/pages/DevToolsPage.tsx`)
   - Landing page pattern
   - Category organization
   - Stats display
   - Card grid layout

2. **TemplateTester** (`/src/app/pages/TemplateTester.tsx`)
   - Filter controls
   - Category filtering
   - Status filtering
   - Mobile-responsive

3. **ComponentShowcase** (`/src/app/pages/ComponentShowcase.tsx`)
   - Search functionality
   - Category filtering
   - Component cards
   - Stats tracking

## Quick Start Guide

To create a new dev tool page:

1. **Create the page file:**
   ```bash
   /src/app/pages/YourTool.tsx
   ```

2. **Follow the standard structure:**
   - Import Breadcrumbs and Container
   - Add breadcrumbs first
   - Add page header
   - Add filter controls (if needed)
   - Add main content
   - Add optional footer

3. **Add to App.tsx:**
   - Lazy load the component
   - Add to PAGES configuration

4. **Add to DevToolsPage:**
   - Add tool to `devTools` array
   - Specify category and icon

5. **Test thoroughly:**
   - Use the testing checklist above

## Questions?

For questions or clarifications:
- Review [DEV-TOOLS-GUIDELINES.md](./DEV-TOOLS-GUIDELINES.md)
- Check [Design System Guide](../DESIGN-SYSTEM-GUIDE.md)
- Refer to example implementations

---

**Version:** 1.0  
**Last Updated:** December 28, 2024  
**Maintainer:** LightSpeed Tour Operator Prototype Team
