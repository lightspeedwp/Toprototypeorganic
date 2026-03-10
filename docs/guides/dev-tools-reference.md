# Developer Tools - Quick Reference Card

**Version:** 1.0  
**Date:** December 28, 2024 (Archived: February 25, 2026)

---

## 🚀 Quick Access

### Developer Tools Hub
**URL:** `/dev-tools`  
**Purpose:** Landing page for all developer tools

### Dev Tools Available

| # | Tool | URL | Purpose |
|---|------|-----|---------|
| 1 | **Template Tester** | `/template-tester` | Test all templates |
| 2 | **Component Showcase** | `/component-showcase` | View components with live editors |
| 3 | **Component API** | `/component-api-reference` | API documentation |
| 4 | **Block Documentation** | `/block-documentation` | WordPress block docs |
| 5 | **Design Blocks** | `/design-blocks-showcase` | Button, Group, Grid, etc. |
| 6 | **Theme Blocks** | `/theme-blocks-showcase` | Navigation, Logo, etc. |
| 7 | **Button Showcase** | `/button-showcase` | All button styles |
| 8 | **Header/Footer Comparison** | `/header-footer-comparison` | Template variations |
| 9 | **Section Presets** | `/section-styles-showcase` | Section styles |
| 10 | **Developer Tools Hub** | `/dev-tools` | Landing page |

---

## 📦 Components

### 1. Breadcrumbs
**File:** `/src/app/components/common/Breadcrumbs.tsx`

```tsx
import { Breadcrumbs } from '../components/common/Breadcrumbs';

<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Developer Tools', href: '/dev-tools' },
    { label: 'Tool Name', isCurrent: true }
  ]}
/>
```

### 2. DevToolFilterControls
**File:** `/src/app/components/common/DevToolFilterControls.tsx`

```tsx
import { DevToolFilterControls } from '../components/common/DevToolFilterControls';

<DevToolFilterControls
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  categoryFilter={categoryFilter}
  categoryOptions={[
    { value: 'all', label: 'All' },
    { value: 'pattern', label: 'Patterns' }
  ]}
  onCategoryChange={setCategoryFilter}
  totalCount={27}
  filteredCount={15}
  itemType="component"
/>
```

---

## 📐 Standard Page Structure

```tsx
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export default function DevTool() {
  return (
    <div className="min-h-screen bg-background py-12">
      <Container>
        {/* 1. BREADCRUMBS */}
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Developer Tools', href: '/dev-tools' },
            { label: 'Tool Name', isCurrent: true }
          ]}
        />

        {/* 2. PAGE HEADER */}
        <div className="mb-8">
          <h1 className="mb-4">Tool Name</h1>
          <p className="text-muted-foreground">Description</p>
        </div>

        {/* 3. MAIN CONTENT */}
        <div className="space-y-8">
          {/* Your content */}
        </div>
      </Container>
    </div>
  );
}
```

---

## 🎨 Design System Rules

### Typography
```tsx
// ❌ DON'T use Tailwind classes on headings
<h1 className="text-4xl font-bold">Title</h1>

// ✅ DO use semantic HTML - gets styling from /src/styles/global.css
<h1>Title</h1>
```

### Colors
```tsx
// ❌ DON'T hardcode colors
<div className="bg-gray-100 text-gray-900">

// ✅ DO use semantic tokens from global.css
<div className="bg-muted text-foreground">
```

### Font Families (from /src/styles/global.css)
- **Headings:** Lora (serif) via CSS variables
- **Body:** Noto Sans (sans-serif) via CSS variables
- **Monospace:** Courier New via CSS variables

### Font Weights (from CSS variables)
- **H1:** Bold (700)
- **H2-H3:** Semibold (600)
- **H4-H6:** Medium (500)
- **Body:** Normal (400)
- **Labels:** Medium (500)

---

## 📱 Mobile Patterns

### Responsive Breakpoints
```tsx
// Mobile-first
className="text-sm md:text-base lg:text-lg"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="py-8 md:py-12 lg:py-16"
```

### Filter Controls
- **Mobile (<768px):** Popover with button
- **Desktop (≥768px):** Inline controls

---

## 🔍 Common Imports

```tsx
// Layout
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

// Filtering
import { DevToolFilterControls } from '../components/common/DevToolFilterControls';

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/blocks/design/Button';

// Icons (always verify with bash first!)
import { Search, Filter, ArrowRight } from 'lucide-react';
```

---

## ✅ Testing Checklist

When creating a new dev tool page:

- [ ] Add breadcrumbs
- [ ] Use semantic HTML (h1-h6)
- [ ] Use CSS variables only (no hardcoded values)
- [ ] Test mobile responsiveness
- [ ] Verify keyboard navigation
- [ ] Check ARIA labels
- [ ] Test dark mode
- [ ] Add to TemplateTester
- [ ] Add to App.tsx PAGES array
- [ ] Lazy load component

---

## 📚 Documentation

### Component Guidelines
- `/guidelines/components/`

### Design Tokens
- `/guidelines/design-tokens/colors.md`
- `/guidelines/design-tokens/typography.md`
- `/guidelines/design-tokens/spacing.md`

### Source
- **CSS Variables:** `/src/styles/global.css`

---

## 🛠️ Adding a New Dev Tool

### 1. Create the Page Component
```bash
/src/app/pages/NewDevTool.tsx
```

### 2. Add to App.tsx
```tsx
// Import (lazy load)
const NewDevTool = lazy(() => import("./pages/NewDevTool"));

// Add to PAGES array
{
  id: "new-dev-tool",
  label: "New Dev Tool",
  description: "Development tool - Description",
  component: NewDevTool,
}
```

### 3. Add to DevToolsPage
```tsx
// In devTools array
{
  id: 'new-dev-tool',
  name: 'New Dev Tool',
  description: 'Description',
  icon: Search, // Choose appropriate icon
  route: '/new-dev-tool',
  category: 'documentation' // or showcase, testing, reference
}
```

---

## 💡 Pro Tips

### Typography
- Never use `text-2xl`, `font-bold`, etc. on headings
- Use `<h1>`, `<h2>`, etc. for automatic styling from global.css
- Override only for special cases (metadata, captions)

### Colors
- Always use semantic tokens from `/src/styles/global.css`
- Never hardcode colors or use `gray-600` style classes
- Use `text-muted-foreground`, `bg-card`, etc.

### Spacing
- Use Tailwind classes: `p-4`, `mb-6`, `gap-4`
- For fluid spacing: Use CSS variables
- Mobile-first: `py-8 md:py-12 lg:py-16`

### Accessibility
- Add ARIA labels to all interactive elements
- Use semantic HTML (`<nav>`, `<button>`, etc.)
- Ensure 44px minimum touch targets
- Test keyboard navigation

---

## 🔗 Quick Links

- **Guidelines:** `/guidelines/`
- **Components:** `/src/app/components/`
- **Pages:** `/src/app/pages/`
- **Design Tokens:** `/guidelines/design-tokens/`
- **CSS Variables:** `/src/styles/global.css`

---

**Version:** 1.0  
**Last Updated:** December 28, 2024  
**Archived:** February 25, 2026  
**Note:** Always use CSS variables from /src/styles/global.css for all styling
