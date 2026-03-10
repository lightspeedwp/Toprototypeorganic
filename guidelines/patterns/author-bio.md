# Author Bio Pattern

**Category:** Content / Blog  
**WordPress Equivalent:** Group block + Image block + Heading + Paragraph blocks  
**Section Styles:** `section-author-bio-default`  
**Status:** ✅ Documented

---

## Overview

Displays author information on blog posts including photo, name, bio, and social links.

---

## WordPress Block Structure

```
Group {
  className: "section-author-bio-default"
  
  Inner Blocks:
    └── Container { maxWidth: "md" }
          ├── ImageBlock { src: author.photo, aspectRatio: "1/1", size: 80, rounded: "full" }
          ├── HeadingBlock { level: 4, text: author.name }
          ├── ParagraphBlock { text: author.bio }
          └── SocialLinks { links: author.socialLinks }
}
```

---

## Section Styles

```css
.section-author-bio-default {
  background: var(--muted);
  border-radius: var(--radius-lg);
  padding: var(--spacing-element-lg);
}

.section-author-bio-default .author-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: var(--spacing-element-sm);
}
```

---

## Design Token Usage

### Colors
- Background: `bg-muted` → `var(--muted)`
- Text: AUTOMATIC via semantic HTML

### Spacing
- Section padding: `p-6 md:p-8`
- Photo to name: `mb-4`

---

## Props Interface

```typescript
interface AuthorBioPatternProps {
  author: {
    name: string;
    photo: string;
    bio: string;
    socialLinks?: Array<{ platform: string; url: string }>;
  };
}
```

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

