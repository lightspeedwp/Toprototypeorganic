# Navigation & Links Guidelines

**Version:** 1.0  
**Last Updated:** December 25, 2024

This document defines **navigation patterns and link usage** for the LightSpeed Tour Operator prototype, aligned with **WordPress block theme architecture** and **accessibility standards**.

---

## Table of Contents

1. [Overview](#overview)
2. [Link vs Button Decision Tree](#link-vs-button-decision-tree)
3. [Navigation Patterns](#navigation-patterns)
4. [Breadcrumb Implementation](#breadcrumb-implementation)
5. [Card Links](#card-links)
6. [Button Styling for Links](#button-styling-for-links)
7. [Accessibility Requirements](#accessibility-requirements)
8. [Common Mistakes](#common-mistakes)
9. [Dark Mode Considerations](#dark-mode-considerations)

---

## Overview

### Core Principles

1. **Links navigate** - Use `<a>` tags for navigation
2. **Buttons perform actions** - Use `<button>` for actions (submit, toggle, etc.)
3. **Semantic HTML first** - Correct element choice aids accessibility
4. **Keyboard navigable** - All interactive elements must be keyboard accessible
5. **Clear focus states** - Visible focus indicators required

### WordPress Context

In WordPress, navigation is handled by:
- **Navigation blocks** - Core/custom navigation menus
- **Link blocks** - Individual links
- **Button blocks** - Styled links or actual buttons
- **Post navigation** - Previous/next links
- **Breadcrumbs** - Hierarchical navigation

---

## Link vs Button Decision Tree

### Use `<a>` (Link) When:

✅ Navigating to another page  
✅ Navigating to a section (anchor link)  
✅ Downloading a file  
✅ Opening an external URL  
✅ Triggering email/phone (mailto:, tel:)

**Examples:**
```tsx
<a href="#tours">View Tours</a>
<a href="mailto:info@example.com">Contact Us</a>
<a href="/tours/safari-adventure">Learn More</a>
```

---

### Use `<button>` When:

✅ Submitting a form  
✅ Opening/closing a modal  
✅ Toggling a state (menu, accordion, etc.)  
✅ Triggering client-side actions  
✅ No destination URL exists

**Examples:**
```tsx
<button onClick={handleSubmit}>Submit Form</button>
<button onClick={() => setOpen(!open)}>Toggle Menu</button>
<button onClick={handleFilter}>Apply Filter</button>
```

---

### Decision Flowchart

```
Does it navigate to a URL?
├─ YES → Use <a>
└─ NO → Does it trigger an action?
    ├─ YES → Use <button>
    └─ NO → Reconsider if element is needed
```

---

## Navigation Patterns

### 1. Primary Navigation (Header)

**Location:** `/src/app/components/parts/Header.tsx`

**Desktop navigation:**
```tsx
<nav className="hidden md:flex items-center gap-6">
  {NAV_LINKS.map((link) => (
    <a
      key={link.href}
      href={link.href}
      className="transition-colors hover:text-primary"
      style={{ 
        fontFamily: 'var(--font-family-noto-sans)', 
        fontSize: 'var(--text-base)', 
        fontWeight: 'var(--font-weight-normal)' 
      }}
    >
      {link.label}
    </a>
  ))}
</nav>
```

**Mobile navigation:**
```tsx
<nav className="flex flex-col gap-2">
  {NAV_LINKS.map((link) => (
    <a
      key={link.href}
      href={link.href}
      className="px-4 py-3 rounded-md hover:bg-sidebar-accent transition-colors"
      onClick={() => setMobileMenuOpen(false)}
      style={{ 
        fontFamily: 'var(--font-family-noto-sans)', 
        fontSize: 'var(--text-lg)',
        fontWeight: 'var(--font-weight-medium)' 
      }}
    >
      {link.label}
    </a>
  ))}
</nav>
```

**Key points:**
- Use `<a>` tags for all navigation items
- Include `onClick` to close mobile menu after click
- Apply proper hover states
- Use CSS variables for typography

---

### 2. Footer Navigation

**Pattern:**
```tsx
<nav className="space-y-2">
  <a 
    href="#tours" 
    className="block text-foreground/80 hover:text-foreground transition-colors"
  >
    Tours
  </a>
  <a 
    href="#destinations" 
    className="block text-foreground/80 hover:text-foreground transition-colors"
  >
    Destinations
  </a>
</nav>
```

**Key points:**
- Use `block` for vertical stacking
- Use opacity for secondary appearance
- Maintain hover states

---

### 3. Taxonomy Filter Navigation

**Location:** `/src/app/components/patterns/TaxonomyFilterPattern.tsx`

**Current implementation (buttons):**
```tsx
<button
  onClick={() => handleClick(option.id)}
  className={`px-4 py-2 rounded-full transition-colors ${
    activeId === option.id
      ? 'bg-primary text-primary-foreground'
      : 'border border-border hover:bg-muted'
  }`}
>
  {option.label}
</button>
```

**Rationale for buttons:**
- Filters trigger client-side state changes (no URL navigation)
- Correct semantic choice for filter actions
- Keyboard accessible via button element

---

### 4. Pagination Links

**Pattern:**
```tsx
<nav aria-label="Pagination" className="flex items-center justify-center gap-2">
  <a 
    href="#page=1" 
    className="px-3 py-2 rounded-md border hover:bg-muted transition-colors"
    aria-label="Go to page 1"
  >
    1
  </a>
  <a 
    href="#page=2" 
    className="px-3 py-2 rounded-md bg-primary text-primary-foreground"
    aria-current="page"
    aria-label="Current page, page 2"
  >
    2
  </a>
  <a 
    href="#page=3" 
    className="px-3 py-2 rounded-md border hover:bg-muted transition-colors"
    aria-label="Go to page 3"
  >
    3
  </a>
</nav>
```

**Key points:**
- Use `<a>` tags (navigates to pages)
- Include `aria-label` for screen readers
- Use `aria-current="page"` for active page
- Wrap in `<nav>` with `aria-label="Pagination"`

---

## Breadcrumb Implementation

### Component Usage

**Import:**
```tsx
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../components/ui/breadcrumb';
```

### Basic Pattern

```tsx
<Breadcrumb className="mb-4">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#tours">Tours</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Cape Town Safari</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

**Output:**
```
Tours > Cape Town Safari
```

---

### With Hierarchy (Destinations)

```tsx
<Breadcrumb className="mb-4">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#destinations">Destinations</BreadcrumbLink>
    </BreadcrumbItem>
    {parentDestination && (
      <>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`#${parentDestination.slug}`}>
            {parentDestination.title}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </>
    )}
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>{destination.title}</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

**Output:**
```
Destinations > South Africa > Cape Town
```

---

### Breadcrumb Styling

**Light mode:**
- Links: `text-foreground/70` with hover to `text-foreground`
- Current page: `text-foreground`
- Separator: ChevronRight icon

**Dark mode:**
- Links: `text-foreground/80` (improved visibility)
- Current page: `text-foreground`
- Separator: Same icon, inherits color

**Accessibility:**
- `<Breadcrumb>` renders as `<nav aria-label="breadcrumb">`
- Current page marked with `aria-current="page"`
- Screen reader friendly structure

---

## Card Links

### Problem: Cards with onClick

❌ **Anti-pattern:**
```tsx
<article 
  className="cursor-pointer"
  onClick={() => console.log('Navigate to:', tour.slug)}
>
  <h3>{tour.title}</h3>
  <p>{tour.excerpt}</p>
</article>
```

**Issues:**
- Not keyboard accessible
- No semantic link
- No right-click "Open in new tab"
- Bad for SEO
- Fails WCAG 2.1 AA

---

### Solution 1: Wrap in Link

✅ **Recommended:**
```tsx
<a 
  href={`#tours/${tour.slug}`} 
  className="block group"
>
  <article className="border rounded-lg overflow-hidden transition-all hover:shadow-lg">
    <img src={tour.featuredImage} alt={tour.title} />
    <div className="p-6">
      <h3 className="group-hover:text-primary transition-colors">
        {tour.title}
      </h3>
      <p className="text-muted-foreground">{tour.excerpt}</p>
    </div>
  </article>
</a>
```

**Benefits:**
- Fully keyboard accessible
- Right-click works
- SEO friendly
- Passes WCAG 2.1 AA
- `group-hover` allows styling entire card

---

### Solution 2: Overlay Link (Advanced)

✅ **For complex cards:**
```tsx
<article className="relative group border rounded-lg overflow-hidden">
  <img src={tour.featuredImage} alt={tour.title} />
  <div className="p-6">
    <h3>
      <a 
        href={`#tours/${tour.slug}`}
        className="before:absolute before:inset-0 group-hover:text-primary transition-colors"
      >
        {tour.title}
      </a>
    </h3>
    <p className="text-muted-foreground">{tour.excerpt}</p>
    
    {/* Additional links need position:relative and z-index */}
    <a 
      href={`#tours/${tour.slug}/book`}
      className="relative z-10 text-primary hover:underline"
      onClick={(e) => e.stopPropagation()}
    >
      Book Now
    </a>
  </div>
</article>
```

**Explanation:**
- `before:absolute before:inset-0` creates clickable overlay
- Additional links need `relative z-10` to appear above overlay
- `stopPropagation` prevents conflicts

---

## Button Styling for Links

### When Links Look Like Buttons

**Use case:** CTA links that should appear as buttons

✅ **Correct approach:**
```tsx
<a
  href="#contact"
  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-primary-foreground hover:bg-primary/90 transition-colors"
  style={{ 
    fontFamily: 'var(--font-family-noto-sans)', 
    fontSize: 'var(--text-base)', 
    fontWeight: 'var(--font-weight-medium)' 
  }}
>
  Get Started
</a>
```

**Why `<a>` not `<button>`:**
- It navigates to `#contact` (a URL)
- Semantically correct
- Keyboard accessible
- Right-click "Open in new tab" works

---

### Button Component with href

**If using a Button component:**

```tsx
import { Button } from '../components/ui/button';

<Button asChild>
  <a href="#contact">Get Started</a>
</Button>
```

**Explanation:**
- `asChild` prop makes Button render as child element
- Child is `<a>` tag (semantic link)
- Maintains button styling
- Correct accessibility

---

## Accessibility Requirements

### Keyboard Navigation

**All links and buttons must:**

1. Be focusable via `Tab` key
2. Be activatable via `Enter` key (links) or `Space`/`Enter` (buttons)
3. Show visible focus indicator
4. Allow `Shift+Tab` to navigate backwards

**Example:**
```tsx
<a 
  href="#tours"
  className="hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm transition-colors"
>
  View Tours
</a>
```

---

### Focus Indicators

**Required for WCAG 2.1 AA:**

```tsx
/* Default focus-visible utility classes */
.focus-visible:ring-2
.focus-visible:ring-ring
.focus-visible:ring-offset-2
.focus-visible:outline-none
```

**Applied to interactive elements:**
```tsx
<a 
  href="#tours"
  className="... focus-visible:ring-2 focus-visible:ring-ring"
>
  Link
</a>

<button className="... focus-visible:ring-2 focus-visible:ring-ring">
  Button
</button>
```

---

### ARIA Labels

**When to use:**

1. **Links without text content:**
```tsx
<a href="#top" aria-label="Back to top">
  <ArrowUp className="w-5 h-5" />
</a>
```

2. **Links with ambiguous text:**
```tsx
<a href="#tours/safari" aria-label="View Safari Tour Details">
  Learn More
</a>
```

3. **Navigation regions:**
```tsx
<nav aria-label="Primary navigation">
  {/* Navigation links */}
</nav>

<nav aria-label="Footer navigation">
  {/* Footer links */}
</nav>

<nav aria-label="Breadcrumb">
  {/* Breadcrumbs */}
</nav>
```

---

### Screen Reader Considerations

**Current page indication:**
```tsx
<a 
  href="#page=2"
  aria-current="page"
  className="bg-primary text-primary-foreground"
>
  2
</a>
```

**External links:**
```tsx
<a 
  href="https://external-site.com"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Visit external site (opens in new tab)"
>
  External Link
  <ExternalLink className="w-4 h-4 inline ml-1" aria-hidden="true" />
</a>
```

**Skip links:**
```tsx
<a 
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground"
>
  Skip to main content
</a>
```

---

## Common Mistakes

### ❌ Mistake 1: Using div with onClick

```tsx
{/* BAD - Not keyboard accessible */}
<div onClick={() => navigate('/tours')} className="cursor-pointer">
  View Tours
</div>
```

```tsx
{/* GOOD - Keyboard accessible */}
<a href="#tours" className="cursor-pointer">
  View Tours
</a>
```

---

### ❌ Mistake 2: Button for Navigation

```tsx
{/* BAD - Semantically incorrect */}
<button onClick={() => window.location.href = '#tours'}>
  View Tours
</button>
```

```tsx
{/* GOOD - Correct semantic element */}
<a href="#tours">
  View Tours
</a>
```

---

### ❌ Mistake 3: Link for Form Submit

```tsx
{/* BAD - Links shouldn't submit forms */}
<a href="#" onClick={handleSubmit}>
  Submit Form
</a>
```

```tsx
{/* GOOD - Button for actions */}
<button type="submit" onClick={handleSubmit}>
  Submit Form
</button>
```

---

### ❌ Mistake 4: Missing href

```tsx
{/* BAD - No href means no navigation */}
<a onClick={() => console.log('clicked')}>
  Broken Link
</a>
```

```tsx
{/* GOOD - Always provide href */}
<a href="#tours" onClick={handleClick}>
  Working Link
</a>
```

---

### ❌ Mistake 5: href="#" with preventDefault

```tsx
{/* BAD - Anti-pattern */}
<a 
  href="#" 
  onClick={(e) => {
    e.preventDefault();
    handleAction();
  }}
>
  Fake Link
</a>
```

```tsx
{/* GOOD - Use button for actions */}
<button onClick={handleAction}>
  Real Button
</button>
```

---

## Dark Mode Considerations

### Link Colors

**Default text links:**
```tsx
<a href="#tours" className="text-primary hover:underline">
  View Tours
</a>
```

**Result:**
- Light mode: `rgba(74, 115, 17, 1)` (olive green)
- Dark mode: `rgba(74, 115, 17, 1)` (same - sufficient contrast)

---

### Navigation Links

**Header/Footer links:**
```tsx
<a href="#tours" className="text-foreground/80 hover:text-foreground transition-colors">
  Tours
</a>
```

**Result:**
- Light mode: `rgba(9, 9, 9, 0.8)` → `rgba(9, 9, 9, 1)` on hover
- Dark mode: `rgba(245, 245, 245, 0.8)` → `rgba(245, 245, 245, 1)` on hover

---

### Breadcrumb Links

**Using breadcrumb component:**
```tsx
<BreadcrumbLink href="#tours">Tours</BreadcrumbLink>
```

**Result:**
- Light mode: `text-foreground/70` → hover `text-foreground`
- Dark mode: `text-foreground/80` → hover `text-foreground`

---

### Button-Styled Links

**Primary CTA:**
```tsx
<a 
  href="#contact"
  className="bg-primary text-primary-foreground hover:bg-primary/90"
>
  Contact Us
</a>
```

**Result:**
- Background stays same in both modes (primary color)
- Text stays white (primary-foreground)
- Hover reduces opacity to 90%

---

## Testing Checklist

### Functional Testing

- [ ] All links navigate to correct URLs
- [ ] All buttons trigger correct actions
- [ ] Breadcrumbs show correct hierarchy
- [ ] Pagination links work
- [ ] Card links are clickable
- [ ] Mobile navigation closes after click
- [ ] External links open in new tab

### Accessibility Testing

- [ ] All links keyboard accessible (`Tab` + `Enter`)
- [ ] All buttons keyboard accessible (`Tab` + `Space` or `Enter`)
- [ ] Focus indicators visible
- [ ] Screen reader announces link destinations
- [ ] `aria-current` marks current page
- [ ] `aria-label` provided where needed
- [ ] Skip links functional

### Visual Testing

- [ ] Links have hover states
- [ ] Active/current links visually distinct
- [ ] Focus rings visible and consistent
- [ ] Text legible in light mode
- [ ] Text legible in dark mode
- [ ] Visited link states (if applicable)

---

## WordPress Mapping

### Navigation Block

React:
```tsx
<nav className="flex items-center gap-6">
  <a href="#tours">Tours</a>
  <a href="#destinations">Destinations</a>
</nav>
```

WordPress (block markup):
```html
<!-- wp:navigation {"layout":{"type":"flex"}} -->
<nav class="wp-block-navigation">
  <!-- wp:navigation-link {"label":"Tours","url":"#tours"} /-->
  <!-- wp:navigation-link {"label":"Destinations","url":"#destinations"} /-->
</nav>
<!-- /wp:navigation -->
```

---

### Breadcrumbs (Plugin)

React:
```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#tours">Tours</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Safari</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

WordPress (Yoast SEO Breadcrumbs):
```php
<?php
if ( function_exists('yoast_breadcrumb') ) {
  yoast_breadcrumb( '<nav class="breadcrumb">', '</nav>' );
}
?>
```

---

## Version History

**1.0** - December 25, 2024
- Initial navigation and links guidelines
- Link vs button decision tree
- Breadcrumb implementation
- Card link patterns
- Accessibility requirements
- Dark mode considerations
- WordPress mapping
