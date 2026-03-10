# Contact Information Pattern

**Category:** Content / Utility  
**WordPress Equivalent:** Group block + Grid block + Card blocks  
**Section Styles:** `section-contact-info-default`  
**Status:** ✅ Documented

---

## Overview

Displays contact details (phone, email, address) with icons in an organized, scannable format.

---

## WordPress Block Structure

```
Group {
  className: "section-contact-info-default"
  
  Inner Blocks:
    └── Container
          ├── HeadingBlock { level: 2, text: "Get in Touch" }
          └── Grid { columns: { xs: 1, md: 3 } }
                ├── ContactCard { icon: "Phone", title: "Call Us", value: "+1 (555) 123-4567" }
                ├── ContactCard { icon: "Mail", title: "Email Us", value: "hello@example.com" }
                └── ContactCard { icon: "MapPin", title: "Visit Us", value: "123 Main St, City, State" }
}
```

---

## Section Styles

```css
.section-contact-info-default {
  background: var(--background);
  padding: var(--spacing-section-md);
}

.section-contact-info-default .contact-card {
  text-align: center;
  padding: var(--spacing-element-md);
}

.section-contact-info-default .contact-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--spacing-element-sm);
  color: var(--primary);
}

.section-contact-info-default .contact-title {
  font-family: var(--font-family-lora);
  font-weight: var(--font-weight-medium);
  color: var(--foreground);
  margin-bottom: var(--spacing-element-xs);
}

.section-contact-info-default .contact-value {
  color: var(--muted-foreground);
}

.section-contact-info-default a {
  color: var(--primary);
  text-decoration: none;
}

.section-contact-info-default a:hover {
  text-decoration: underline;
}
```

---

## Design Token Usage

### Colors
- Icon: `text-primary` → `var(--primary)`
- Title: `text-foreground` → `var(--foreground)`
- Value: `text-muted-foreground` → `var(--muted-foreground)`
- Link: `text-primary` with underline on hover

### Typography
- Title: `var(--font-family-lora)`, `var(--font-weight-medium)`
- Value: Inherits from parent

---

## Props Interface

```typescript
interface ContactInfoPatternProps {
  title?: string;
  contacts: Array<{
    icon: string;
    title: string;
    value: string;
    href?: string;  // tel: or mailto: link
  }>;
}
```

---

## Usage Examples

```typescript
<ContactInfoPattern
  title="Get in Touch"
  contacts={[
    {
      icon: "Phone",
      title: "Call Us",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: "Mail",
      title: "Email Us",
      value: "hello@example.com",
      href: "mailto:hello@example.com"
    },
    {
      icon: "MapPin",
      title: "Visit Us",
      value: "123 Main Street, New York, NY 10001"
    }
  ]}
/>
```

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

