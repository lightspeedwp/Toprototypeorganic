# Sitemap Grid Pattern

**Category:** Navigation / Utility  
**WordPress Equivalent:** Group block + Grid block + List blocks  
**Section Styles:** `section-sitemap-default`  
**Status:** ✅ Documented

---

## Overview

Displays complete site structure organized by content type in a multi-column grid format.

---

## WordPress Block Structure

```
Group {
  className: "section-sitemap-default"
  
  Inner Blocks:
    └── Container
          ├── HeadingBlock { level: 2, text: "Sitemap" }
          └── Grid { columns: { xs: 1, sm: 2, md: 3, lg: 4 } }
                └── SitemapColumn (per content type)
                      ├── HeadingBlock { level: 4, text: "Tours" }
                      └── ListBlock { unstyled: true }
                            └── ListItem (per page)
                                  └── Link { href: page.url, text: page.title }
}
```

---

## Section Styles

```css
.section-sitemap-default {
  background: var(--background);
  padding: var(--spacing-section-md);
}

.section-sitemap-default .sitemap-column {
  margin-bottom: var(--spacing-element-lg);
}

.section-sitemap-default ul {
  list-style: none;
  padding: 0;
}

.section-sitemap-default li {
  margin-bottom: var(--spacing-element-xs);
}

.section-sitemap-default a {
  color: var(--primary);
  text-decoration: none;
  font-size: var(--text-sm);
}

.section-sitemap-default a:hover {
  text-decoration: underline;
}
```

---

## Design Token Usage

### Colors
- Links: `text-primary` → `var(--primary)`
- Headings: AUTOMATIC via `<h4>`

### Typography
- Column headings (H4): AUTOMATIC
- Links: `text-sm` → `var(--text-sm)`

---

## Props Interface

```typescript
interface SitemapGridPatternProps {
  sections: Array<{
    title: string;
    pages: Array<{
      title: string;
      url: string;
    }>;
  }>;
}
```

---

## Usage Examples

```typescript
<SitemapGridPattern
  sections={[
    {
      title: "Tours",
      pages: [
        { title: "All Tours", url: "/tours" },
        { title: "Kenya Safaris", url: "/tours/kenya" },
        // ...
      ]
    },
    {
      title: "Destinations",
      pages: [
        { title: "All Destinations", url: "/destinations" },
        // ...
      ]
    },
    // ... more sections
  ]}
/>
```

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

