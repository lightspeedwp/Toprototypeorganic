# Modern Design Patterns

**Version:** V3 — WordPress-Native Alignment

This document defines **modern design patterns** and best practices for the LightSpeed Tour Operator plugin prototype.

---

## Purpose

This guide ensures the prototype uses contemporary, accessible design patterns that:

- Follow WordPress block theme conventions
- Meet WCAG 2.1 AA accessibility standards
- Work seamlessly in light and dark modes
- Provide excellent mobile experiences
- Use CSS variables for easy customization

---

## Pattern Categories

### 1. Layout Patterns
### 2. Navigation Patterns
### 3. Content Patterns
### 4. Interactive Patterns
### 5. Feedback Patterns

---

## 1. Layout Patterns

### Container-Constrained Layout

**Pattern:** Content centered with maximum width

```typescript
<Container>
  <h1>Page Title</h1>
  <p>Content constrained to readable width</p>
</Container>
```

**Properties:**
- Max width: 1280px
- Horizontal padding: 16px mobile, 24px desktop
- Automatic centering

---

### Grid Layout

**Pattern:** Responsive multi-column grids

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

**Breakpoints:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Wide: 4 columns (optional)

---

### Stack Layout

**Pattern:** Vertical spacing between elements

```typescript
<div className="space-y-6">
  <section>Section 1</section>
  <section>Section 2</section>
  <section>Section 3</section>
</div>
```

**Spacing scale:**
- `space-y-2`: 8px (tight)
- `space-y-4`: 16px (normal)
- `space-y-6`: 24px (comfortable)
- `space-y-8`: 32px (loose)

---

### Cluster Layout

**Pattern:** Inline items with wrapping

```typescript
<div className="flex flex-wrap gap-2">
  <Badge>Tag 1</Badge>
  <Badge>Tag 2</Badge>
  <Badge>Tag 3</Badge>
</div>
```

---

## 2. Navigation Patterns

### Horizontal Navigation

**Pattern:** Desktop primary navigation

```typescript
<nav className="hidden md:flex items-center gap-6">
  <a href="/tours">Tours</a>
  <a href="/destinations">Destinations</a>
  <a href="/about">About</a>
</nav>
```

---

### Mobile Navigation

**Pattern:** Hamburger menu with overlay

```typescript
<nav className="md:hidden">
  <button onClick={toggleMenu}>
    {isOpen ? <X /> : <Menu />}
  </button>
  
  {isOpen && (
    <div className="fixed inset-0 bg-sidebar">
      <ul className="p-6 space-y-2">
        <li><a href="/tours">Tours</a></li>
        <li><a href="/destinations">Destinations</a></li>
      </ul>
    </div>
  )}
</nav>
```

---

### Breadcrumbs

**Pattern:** Hierarchical navigation trail

```typescript
<nav className="flex items-center gap-2 text-sm">
  <a href="/">Home</a>
  <ChevronRight className="w-4 h-4" />
  <a href="/tours">Tours</a>
  <ChevronRight className="w-4 h-4" />
  <span>Iceland Explorer</span>
</nav>
```

---

### Pagination

**Pattern:** Page number navigation

```typescript
<nav className="flex items-center justify-center gap-2">
  <button><ChevronLeft /></button>
  <button>1</button>
  <button className="bg-primary text-primary-foreground">2</button>
  <button>3</button>
  <button><ChevronRight /></button>
</nav>
```

---

### Tabs

**Pattern:** Content section switching

```typescript
<div className="border-b border-border">
  <nav className="flex gap-4">
    <button className="px-4 py-3 border-b-2 border-primary">
      Overview
    </button>
    <button className="px-4 py-3 border-b-2 border-transparent">
      Itinerary
    </button>
  </nav>
</div>
```

---

## 3. Content Patterns

### Card Pattern

**Pattern:** Contained content block

```typescript
<article className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
  <img src="/image.jpg" alt="Card image" className="w-full aspect-video object-cover" />
  <div className="p-4">
    <h3 className="font-semibold mb-2">Card Title</h3>
    <p className="text-sm text-muted-foreground">Card description</p>
  </div>
</article>
```

**Variants:**
- Image top
- Image left (desktop)
- No image
- With action button

---

### Hero Pattern

**Pattern:** Large introductory section

```typescript
<section className="py-12 md:py-20">
  <Container>
    <h1 className="text-[36px] md:text-[60px] font-semibold mb-4">
      Hero Title
    </h1>
    <p className="text-lg md:text-xl text-muted-foreground mb-6">
      Hero description
    </p>
    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md">
      Primary CTA
    </button>
  </Container>
</section>
```

---

### Editorial Content

**Pattern:** Long-form text with semantic HTML

```typescript
<article className="prose prose-sm md:prose-base max-w-none">
  <h2>Section Title</h2>
  <p>Paragraph text with automatic styling from theme.css</p>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
  </ul>
</article>
```

---

### Meta List

**Pattern:** Icon + label + value

```typescript
<div className="flex flex-col gap-3">
  <div className="flex items-center gap-2 text-sm">
    <Calendar className="w-4 h-4 text-muted-foreground" />
    <span className="text-muted-foreground">Duration:</span>
    <span className="font-medium">8 days</span>
  </div>
  <div className="flex items-center gap-2 text-sm">
    <Users className="w-4 h-4 text-muted-foreground" />
    <span className="text-muted-foreground">Group size:</span>
    <span className="font-medium">12-16 people</span>
  </div>
</div>
```

---

## 4. Interactive Patterns

### Button Variants

**Primary:**
```typescript
<button className="px-4 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
  Primary Action
</button>
```

**Secondary:**
```typescript
<button className="px-4 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90">
  Secondary Action
</button>
```

**Outline:**
```typescript
<button className="px-4 py-3 border border-border rounded-md hover:bg-muted">
  Outline Button
</button>
```

**Ghost:**
```typescript
<button className="px-4 py-3 hover:bg-muted rounded-md">
  Ghost Button
</button>
```

---

### Form Input

**Pattern:** Labeled input with validation

```typescript
<div className="space-y-2">
  <label htmlFor="email" className="block font-medium">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    className="w-full px-3 py-3 border border-border rounded-md focus:ring-2 focus:ring-ring"
    placeholder="you@example.com"
  />
  {error && <p className="text-sm text-destructive">{error}</p>}
</div>
```

---

### Accordion

**Pattern:** Expandable content sections

```typescript
<div className="divide-y divide-border border border-border rounded-lg">
  {items.map(item => (
    <details key={item.id} className="group">
      <summary className="flex items-center justify-between p-4 cursor-pointer">
        <span className="font-medium">{item.question}</span>
        <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
      </summary>
      <div className="p-4 pt-0 text-muted-foreground">
        {item.answer}
      </div>
    </details>
  ))}
</div>
```

---

### Modal Dialog

**Pattern:** Overlay dialog

```typescript
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="bg-card rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
    <h2 className="text-xl font-semibold mb-4">Dialog Title</h2>
    <p className="text-muted-foreground mb-6">Dialog content</p>
    <div className="flex justify-end gap-3">
      <button className="px-4 py-2 border border-border rounded-md">
        Cancel
      </button>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
        Confirm
      </button>
    </div>
  </div>
</div>
```

---

### Dropdown Menu

**Pattern:** Contextual menu

```typescript
<div className="relative">
  <button>Menu</button>
  {isOpen && (
    <div className="absolute top-full mt-2 bg-popover border border-border rounded-md shadow-lg min-w-[200px]">
      <ul className="py-2">
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-muted">
            Menu Item 1
          </a>
        </li>
      </ul>
    </div>
  )}
</div>
```

---

## 5. Feedback Patterns

### Loading State

**Pattern:** Skeleton or spinner

```typescript
<div className="space-y-4">
  <div className="h-8 bg-muted rounded animate-pulse" />
  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
  <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
</div>
```

---

### Empty State

**Pattern:** No content message

```typescript
<div className="text-center py-12">
  <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
  <h3 className="font-semibold mb-2">No results found</h3>
  <p className="text-sm text-muted-foreground">
    Try adjusting your search or filters
  </p>
</div>
```

---

### Success Message

**Pattern:** Confirmation feedback

```typescript
<div className="flex items-center gap-2 p-4 bg-primary/10 border border-primary rounded-md">
  <CheckCircle className="w-5 h-5 text-primary" />
  <p className="text-sm text-primary">
    Your message has been sent successfully
  </p>
</div>
```

---

### Error Message

**Pattern:** Error feedback

```typescript
<div className="flex items-start gap-2 p-4 bg-destructive/10 border border-destructive rounded-md">
  <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
  <div>
    <p className="text-sm font-medium text-destructive">
      Error submitting form
    </p>
    <p className="text-sm text-destructive/80 mt-1">
      Please check all required fields
    </p>
  </div>
</div>
```

---

## Responsive Design Patterns

### Mobile-First Approach

Start with mobile, enhance for desktop:

```typescript
<div className="
  space-y-4              // Mobile spacing
  md:space-y-0          // Remove vertical spacing
  md:flex               // Desktop: flex layout
  md:items-center       // Desktop: align items
  md:gap-6              // Desktop: horizontal gap
">
  <div>Content 1</div>
  <div>Content 2</div>
</div>
```

---

### Responsive Typography

```typescript
<h1 className="text-[36px] md:text-[48px] lg:text-[60px]">
  Responsive Heading
</h1>
```

---

### Responsive Grids

```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
  {items.map(item => <Card key={item.id} />)}
</div>
```

---

## Accessibility Patterns

### Skip Link

```typescript
<a
  href="#main"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
>
  Skip to main content
</a>
```

---

### Focus Management

```typescript
<button className="
  px-4 py-3
  focus:outline-none        // Remove default outline
  focus:ring-2             // Add custom ring
  focus:ring-ring          // Ring color
  focus:ring-offset-2      // Offset for visibility
">
  Accessible Button
</button>
```

---

### Screen Reader Only

```typescript
<span className="sr-only">
  Additional context for screen readers
</span>
```

---

## Animation Patterns

### Transition

```typescript
<button className="transition-colors duration-200 hover:bg-primary/90">
  Smooth Color Transition
</button>
```

---

### Transform

```typescript
<button className="transition-transform duration-200 active:scale-95">
  Scale on Press
</button>
```

---

### Fade In

```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Fade in content
</motion.div>
```

---

## Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [THEME-VARIATIONS.md](THEME-VARIATIONS.md) - Light/dark mode
- [design-tokens/colors.md](design-tokens/colors.md) - Color system
- [mobile/typography.md](mobile/typography.md) - Mobile typography
- [mobile/touch-targets.md](mobile/touch-targets.md) - Touch targets
