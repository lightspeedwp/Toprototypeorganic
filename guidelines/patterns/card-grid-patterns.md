# Card Grid Pattern Guidelines

**Version:** V3 — WordPress-Native Alignment

This document defines **card grid patterns** for listing content in the LightSpeed Tour Operator plugin prototype.

---

## Purpose

Card grids display **collections of content** in a consistent, scannable format. They are the primary pattern for archives and listings.

---

## Core Principles

1. **Consistent card structure** across all content types
2. **Responsive grid** adapts to screen size
3. **Content-first** - image + essential meta only
4. **Keyboard accessible** - entire card is clickable
5. **Empty states** explicit when no content

---

## Card Grid Structure

```
Card Grid
├── Section wrapper
├── Container
│   ├── Grid container
│   │   ├── Card (item 1)
│   │   ├── Card (item 2)
│   │   ├── Card (item 3)
│   │   └── ...
```

---

## Standard Card Grid

**Used on:** All archive pages (Tours, Destinations, Accommodation, Blog, Team)

```typescript
<section className="py-12 md:py-16">
  <Container>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <CardTour key={item.id} tour={item} />
      ))}
    </div>
  </Container>
</section>
```

**Properties:**
- 1 column mobile
- 2 columns tablet
- 3 columns desktop
- 24px gap between cards

---

## Two-Column Grid

**Used on:** Wider cards, less content density

```typescript
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {items.map(item => (
    <Card key={item.id} />
  ))}
</div>
```

**When to use:**
- Accommodation listings (more image focus)
- Featured content sections
- Cards with more text content

---

## Four-Column Grid

**Used on:** Smaller cards, higher density

```typescript
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {items.map(item => (
    <Card key={item.id} />
  ))}
</div>
```

**When to use:**
- Team member cards (smaller)
- Category/taxonomy navigation
- Icon-led cards

---

## Card Component Structure

### Tour Card

```typescript
<a 
  href={`/tours/${tour.slug}`}
  className="group block bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
>
  {/* Image */}
  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
    <img
      src={tour.image}
      alt={tour.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
      width={600}
      height={400}
    />
  </div>

  {/* Content */}
  <div className="p-4">
    {/* Title */}
    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
      {tour.title}
    </h3>

    {/* Meta */}
    <div className="space-y-2 text-sm text-muted-foreground mb-3">
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" aria-hidden="true" />
        <span>{tour.duration}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4" aria-hidden="true" />
        <span>{tour.destination}</span>
      </div>
    </div>

    {/* Excerpt (optional) */}
    <p className="text-sm text-muted-foreground line-clamp-2">
      {tour.excerpt}
    </p>
  </div>
</a>
```

---

### Destination Card

```typescript
<a 
  href={`/destinations/${destination.slug}`}
  className="group block bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
>
  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
    <img
      src={destination.image}
      alt={destination.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
      width={600}
      height={450}
    />
  </div>

  <div className="p-4">
    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
      {destination.title}
    </h3>

    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
      <MapPin className="w-4 h-4" aria-hidden="true" />
      <span>{destination.region}</span>
    </div>

    {destination.tourCount && (
      <p className="text-sm text-muted-foreground">
        {destination.tourCount} tours available
      </p>
    )}
  </div>
</a>
```

---

### Accommodation Card

```typescript
<a 
  href={`/accommodation/${accommodation.slug}`}
  className="group block bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
>
  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
    <img
      src={accommodation.image}
      alt={accommodation.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
      width={600}
      height={400}
    />
    
    {/* Type badge */}
    <div className="absolute top-3 left-3 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium">
      {accommodation.type}
    </div>
  </div>

  <div className="p-4">
    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
      {accommodation.title}
    </h3>

    <div className="space-y-2 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4" aria-hidden="true" />
        <span>{accommodation.location}</span>
      </div>
      <div className="flex items-center gap-2">
        <Star className="w-4 h-4" aria-hidden="true" />
        <span>{accommodation.rating} star</span>
      </div>
    </div>
  </div>
</a>
```

---

### Blog Post Card

```typescript
<a 
  href={`/blog/${post.slug}`}
  className="group block bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
>
  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
    <img
      src={post.image}
      alt={post.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
      width={600}
      height={400}
    />
  </div>

  <div className="p-4">
    {/* Category */}
    {post.category && (
      <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md mb-2">
        {post.category}
      </span>
    )}

    {/* Title */}
    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
      {post.title}
    </h3>

    {/* Excerpt */}
    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
      {post.excerpt}
    </p>

    {/* Meta */}
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      {post.author && (
        <>
          <span aria-hidden="true">•</span>
          <span>{post.author}</span>
        </>
      )}
    </div>
  </div>
</a>
```

---

### Team Member Card

```typescript
<a 
  href={`/team/${member.slug}`}
  className="group block bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
>
  <div className="relative aspect-square overflow-hidden bg-muted">
    <img
      src={member.photo}
      alt={member.name}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
      width={400}
      height={400}
    />
  </div>

  <div className="p-4 text-center">
    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
      {member.name}
    </h3>
    <p className="text-sm text-muted-foreground">
      {member.role}
    </p>
  </div>
</a>
```

---

## Card Anatomy

### Required Elements

1. **Clickable wrapper** - Entire card is link
2. **Image** - Consistent aspect ratio
3. **Title** - Semantic heading (H3)
4. **Meta** - Essential info only (2-3 items max)

### Optional Elements

1. **Excerpt** - Short description (2-3 lines max)
2. **Badge/Label** - Category, type, status
3. **Author/Date** - For editorial content

---

## Aspect Ratios

### 16:9 (Standard)

```typescript
<div className="aspect-[16/9]">
  <img />
</div>
```

**Used for:**
- Tours
- Accommodation
- Blog posts
- General content

---

### 4:3 (Portrait-ish)

```typescript
<div className="aspect-[4/3]">
  <img />
</div>
```

**Used for:**
- Destinations
- Featured content

---

### 1:1 (Square)

```typescript
<div className="aspect-square">
  <img />
</div>
```

**Used for:**
- Team members
- Category icons
- Profile images

---

## Hover States

### Image Scale

```typescript
<img className="group-hover:scale-105 transition-transform duration-300" />
```

---

### Shadow Elevation

```typescript
<div className="shadow-sm hover:shadow-md transition-shadow">
```

---

### Title Color

```typescript
<h3 className="group-hover:text-primary transition-colors">
```

---

## Empty State

When no cards to display:

```typescript
{items.length === 0 ? (
  <div className="col-span-full text-center py-12">
    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
    <h3 className="font-semibold mb-2">No tours found</h3>
    <p className="text-sm text-muted-foreground">
      Try adjusting your filters or search query
    </p>
  </div>
) : (
  items.map(item => <Card key={item.id} item={item} />)
)}
```

---

## Loading State

While fetching content:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {[1, 2, 3, 4, 5, 6].map(i => (
    <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="aspect-[16/9] bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
      </div>
    </div>
  ))}
</div>
```

---

## Spacing Rules

### Grid Gap

```typescript
gap-6  // 24px - standard spacing
gap-4  // 16px - tighter spacing (4-column grids)
gap-8  // 32px - looser spacing (large cards)
```

---

### Card Padding

```typescript
p-4   // 16px - standard card padding
p-6   // 24px - larger cards
```

---

### Section Padding

```typescript
py-12 md:py-16  // Section vertical padding
```

---

## Accessibility Requirements

### Semantic HTML

```typescript
<a href="...">  {/* Entire card is link */}
  <article>     {/* Optional semantic wrapper */}
    <img alt="..." />  {/* Descriptive alt text */}
    <h3>Title</h3>     {/* Semantic heading */}
  </article>
</a>
```

---

### Icon Labels

```typescript
<Calendar className="w-4 h-4" aria-hidden="true" />
<span>8 days</span>  {/* Text provides context */}
```

Icons are decorative when paired with text.

---

### Focus States

```typescript
<a className="focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
  {/* Card content */}
</a>
```

---

## Responsive Behavior

### Mobile (< 768px)

- 1 column
- Smaller text
- Reduced padding

### Tablet (768px - 1023px)

- 2 columns
- Standard text
- Standard padding

### Desktop (≥ 1024px)

- 3 columns (standard)
- 2 or 4 columns (variants)
- Full padding

---

## Dark Mode Adaptation

All cards automatically adapt:

```typescript
bg-card              // Light: white / Dark: dark gray
text-card-foreground // Light: black / Dark: white
border-border        // Light: medium gray / Dark: lighter gray
text-muted-foreground // Light: gray / Dark: light gray
```

---

## Performance Optimization

### Lazy Loading

```typescript
<img loading="lazy" />  {/* All images except first 3 */}
```

First 3 cards should use `loading="eager"` or omit attribute.

---

### Explicit Dimensions

```typescript
<img width={600} height={400} />  {/* Prevent layout shift */}
```

---

## Complete Example

```typescript
<section className="py-12 md:py-16">
  <Container>
    {/* Section Header */}
    <div className="mb-8">
      <h2 className="text-[32px] font-semibold mb-2">Featured Tours</h2>
      <p className="text-muted-foreground">
        Discover our most popular African adventures
      </p>
    </div>

    {/* Grid */}
    {tours.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour, index) => (
          <a
            key={tour.id}
            href={`/tours/${tour.slug}`}
            className="group block bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading={index < 3 ? "eager" : "lazy"}
                width={600}
                height={400}
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                {tour.title}
              </h3>

              <div className="space-y-2 text-sm text-muted-foreground mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>{tour.destination}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {tour.excerpt}
              </p>
            </div>
          </a>
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-semibold mb-2">No tours found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters
        </p>
      </div>
    )}
  </Container>
</section>
```

---

## Related Documentation

- [patterns/hero-patterns.md](hero-patterns.md) - Hero patterns
- [patterns/filter-patterns.md](filter-patterns.md) - Filter patterns
- [components/Container.md](../components/Container.md) - Container component
- [design-tokens/spacing.md](../design-tokens/spacing.md) - Spacing system
- [mobile/images.md](../mobile/images.md) - Image optimization
