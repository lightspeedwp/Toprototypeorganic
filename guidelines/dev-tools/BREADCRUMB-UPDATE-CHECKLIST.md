# Dev Tools Breadcrumb Update Checklist

## Overview

All dev tool pages must have breadcrumbs following this pattern:
```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: '{Tool Name}', isCurrent: true }
  ]}
/>
```

## Import Required

Add this import to each page:
```tsx
import { Breadcrumbs } from '../components/common/Breadcrumbs';
```

## Pages Completed ✅

1. **DevToolsPage** - Landing page (parent)
2. **TemplateTester** - "Home > Developer Tools > Template Tester"
3. **ComponentShowcase** - "Home > Developer Tools > Component Showcase"

## Pages Requiring Updates

### 1. BlockDocumentation.tsx
**Breadcrumb:** Home > Developer Tools > Block Documentation

**Location to add:** After `<Container>` opening, before page header

**Code to add:**
```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: 'Block Documentation', isCurrent: true }
  ]}
/>
```

### 2. ComponentAPIReference.tsx
**Breadcrumb:** Home > Developer Tools > Component API

**Code to add:**
```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: 'Component API', isCurrent: true }
  ]}
/>
```

### 3. DesignBlocksShowcase.tsx
**Breadcrumb:** Home > Developer Tools > Design Blocks Showcase

**Code to add:**
```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: 'Design Blocks Showcase', isCurrent: true }
  ]}
/>
```

### 4. ThemeBlocksShowcase.tsx
**Breadcrumb:** Home > Developer Tools > Theme Blocks Showcase

**Code to add:**
```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: 'Theme Blocks Showcase', isCurrent: true }
  ]}
/>
```

### 5. ButtonShowcase.tsx
**Breadcrumb:** Home > Developer Tools > Button Showcase

**Code to add:**
```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: 'Button Showcase', isCurrent: true }
  ]}
/>
```

### 6. HeaderFooterComparison.tsx
**Breadcrumb:** Home > Developer Tools > Header/Footer Comparison

**Code to add:**
```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: 'Header/Footer Comparison', isCurrent: true }
  ]}
/>
```

### 7. SectionStylesShowcase.tsx
**Breadcrumb:** Home > Developer Tools > Section Presets Showcase

**Code to add:**
```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: 'Section Presets Showcase', isCurrent: true }
  ]}
/>
```

### 8. IconLibrary.tsx (Future)
**Breadcrumb:** Home > Developer Tools > Icon Library

**Code to add:**
```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: 'Icon Library', isCurrent: true }
  ]}
/>
```

### 9. LivePreview.tsx (Future)
**Breadcrumb:** Home > Developer Tools > Live Preview

**Code to add:**
```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: 'Live Preview', isCurrent: true }
  ]}
/>
```

### 10. StyleGuide.tsx (Future)
**Breadcrumb:** Home > Developer Tools > Style Guide

**Code to add:**
```tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: 'Style Guide', isCurrent: true }
  ]}
/>
```

## Standard Pattern for All Dev Tool Pages

```tsx
/**
 * {Tool Name} development tool page.
 */

import React from 'react';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export default function {ToolName}({ onNavigate }: {ToolName}Props) {
  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        {/* BREADCRUMBS - Always first */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Developer Tools', href: '/dev-tools' },
            { label: '{Tool Name}', isCurrent: true }
          ]}
        />

        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="mb-4">{Tool Name}</h1>
          <p className="text-muted-foreground max-w-3xl">
            {Tool description}
          </p>
        </div>

        {/* MAIN CONTENT */}
        {/* ... */}
      </Container>
    </div>
  );
}
```

## Testing Checklist

After adding breadcrumbs to each page:

- [ ] Breadcrumbs render correctly
- [ ] "Home" link works
- [ ] "Developer Tools" link works
- [ ] Current page is not linked (no href)
- [ ] Current page has `aria-current="page"`
- [ ] Separators (chevrons) display between items
- [ ] Mobile: wraps properly
- [ ] Desktop: single line
- [ ] Keyboard navigation works
- [ ] Uses CSS variables only (no hardcoded styles)

## Design System Compliance

Breadcrumbs component automatically uses:
- ✅ Font family: `var(--font-family-noto-sans)`
- ✅ Colors: `text-muted-foreground`, `text-foreground`
- ✅ Spacing: `gap-2`, `mb-6`
- ✅ Responsive behavior
- ✅ WCAG AA compliance

---

**Version:** 1.0  
**Last Updated:** December 28, 2024
