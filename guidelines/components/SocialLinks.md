# Social Links Component Guidelines

**Component:** `SocialLinks`  
**Location:** `/src/app/components/common/SocialLinks.tsx`  
**WordPress Equivalent:** `core/social-links`  
**Category:** Common Components (Social)

---

## Purpose

The SocialLinks component displays a list of social media icons linking to external profiles.

**Use for:**
- Footer social media links
- Author bio social profiles
- Team member social links
- Contact page social connections

**Don't use for:**
- Share buttons (use ShareButton component)
- Social media feeds (use custom integration)
- Social login (use authentication component)

---

## WordPress Mapping

```html
<!-- WordPress Template (footer.html) -->
<!-- wp:social-links {"className":"is-style-logos-only"} -->
<ul class="wp-block-social-links is-style-logos-only">
  <!-- wp:social-link {"url":"https://facebook.com/example","service":"facebook"} /-->
  <!-- wp:social-link {"url":"https://twitter.com/example","service":"twitter"} /-->
  <!-- wp:social-link {"url":"https://instagram.com/example","service":"instagram"} /-->
</ul>
<!-- /wp:social-links -->
```

**React Equivalent:**

```tsx
<SocialLinks
  links={[
    { platform: "facebook", url: "https://facebook.com/example" },
    { platform: "twitter", url: "https://twitter.com/example" },
    { platform: "instagram", url: "https://instagram.com/example" },
  ]}
/>
```

---

## Component API

### Props

```typescript
interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label?: string;
}

type SocialPlatform =
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "pinterest"
  | "tiktok"
  | "whatsapp"
  | "email"
  | "website";

interface SocialLinksProps {
  /** Array of social links */
  links: SocialLink[];
  
  /** Icon size (default: "md") */
  size?: "sm" | "md" | "lg";
  
  /** Show labels (default: false) */
  showLabels?: boolean;
  
  /** Icon style (default: "outline") */
  style?: "outline" | "solid" | "colored";
  
  /** Layout direction (default: "horizontal") */
  direction?: "horizontal" | "vertical";
  
  /** Gap between icons (default: 2) */
  gap?: number;
  
  /** Open in new tab (default: true) */
  openInNewTab?: boolean;
  
  /** Additional CSS classes */
  className?: string;
}
```

---

## Usage

### Basic Usage

```tsx
import { SocialLinks } from "../components/common/SocialLinks";

<SocialLinks
  links={[
    { platform: "facebook", url: "https://facebook.com/lightspeedtours" },
    { platform: "twitter", url: "https://twitter.com/lightspeedtours" },
    { platform: "instagram", url: "https://instagram.com/lightspeedtours" },
  ]}
/>
```

### Footer Usage

```tsx
// Footer component
<footer>
  <div className="footer-section">
    <h3>Connect With Us</h3>
    <SocialLinks
      links={SOCIAL_LINKS}
      size="lg"
      style="outline"
    />
  </div>
</footer>
```

### Author Bio

```tsx
<div className="author-bio">
  <img src={author.photo} alt={author.name} />
  <h4>{author.name}</h4>
  <p>{author.bio}</p>
  <SocialLinks
    links={author.socialLinks}
    size="sm"
    showLabels
    direction="vertical"
  />
</div>
```

### Team Member Card

```tsx
<div className="team-card">
  <img src={member.photo} alt={member.name} />
  <h3>{member.name}</h3>
  <p>{member.role}</p>
  <SocialLinks
    links={member.socialLinks}
    size="md"
    style="colored"
  />
</div>
```

### With Labels

```tsx
<SocialLinks
  links={links}
  showLabels
  direction="vertical"
  gap={3}
/>
```

---

## Visual Appearance

### Horizontal (Default)
```
[f] [t] [i] [l]
```

### Vertical
```
[f]
[t]
[i]
[l]
```

### With Labels
```
[f] Facebook
[t] Twitter
[i] Instagram
[l] LinkedIn
```

---

## Styling

### CSS Variables (from theme.css)

```css
/* Use semantic colors */
.social-link {
  color: hsl(var(--muted-foreground));
  transition: color 0.2s ease;
}

.social-link:hover {
  color: hsl(var(--primary));
}

/* Colored variant */
.social-link-facebook { color: #1877f2; }
.social-link-twitter { color: #1da1f2; }
.social-link-instagram { color: #e4405f; }
.social-link-linkedin { color: #0a66c2; }
.social-link-youtube { color: #ff0000; }
.social-link-pinterest { color: #e60023; }
.social-link-tiktok { color: #000000; }
```

### Design Tokens

**Colors:**
- Default: `text-muted-foreground`
- Hover: `text-primary`
- Colored: Platform-specific brand colors

**Spacing:**
- Gap (horizontal): `gap-2` (8px), `gap-3` (12px), `gap-4` (16px)
- Gap (vertical): `space-y-2`, `space-y-3`, `space-y-4`
- Padding: `p-2` (8px) for clickable area

**Icon Sizes:**
- Small: `size-4` (16px)
- Medium: `size-5` (20px)
- Large: `size-6` (24px)

**Typography (labels):**
- Font family: Noto Sans (from theme.css)
- Font size: `text-sm` (14px)
- Font weight: `font-medium` (500)

**Touch Targets:**
- Minimum: `44x44px` (includes padding)

---

## Platform Icons

### Supported Platforms

Using **lucide-react** icons:

```tsx
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Globe,
} from "lucide-react";

// Platform-specific imports
const platformIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  email: Mail,
  website: Globe,
};
```

**Note:** For Pinterest and TikTok, use SVG icons or icon library that supports them.

### Platform URLs

```typescript
const platformPatterns = {
  facebook: /^https?:\/\/(www\.)?facebook\.com\//,
  twitter: /^https?:\/\/(www\.)?twitter\.com\//,
  instagram: /^https?:\/\/(www\.)?instagram\.com\//,
  linkedin: /^https?:\/\/(www\.)?linkedin\.com\//,
  youtube: /^https?:\/\/(www\.)?youtube\.com\//,
  pinterest: /^https?:\/\/(www\.)?pinterest\.com\//,
  tiktok: /^https?:\/\/(www\.)?tiktok\.com\//,
};
```

---

## Accessibility

### WCAG 2.1 AA Compliance

**Semantic HTML:**
```tsx
<nav aria-label="Social media links">
  <ul className="social-links">
    <li>
      <a
        href="https://facebook.com/example"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow us on Facebook"
      >
        <Facebook size={20} aria-hidden="true" />
      </a>
    </li>
  </ul>
</nav>
```

**Required Attributes:**
- `aria-label="Social media links"` on `<nav>`
- `aria-label` on each link (e.g., "Follow us on Facebook")
- `aria-hidden="true"` on icons (decorative)
- `target="_blank"` with `rel="noopener noreferrer"` for security
- `title` attribute for tooltips (optional)

**Keyboard Navigation:**
- **Tab** - Focus each link
- **Enter** - Activate link
- All links keyboard accessible

**Screen Reader Announcements:**
- "Social media links, navigation"
- "Follow us on Facebook, link, opens in new window"
- "Connect on Twitter, link, opens in new window"

**Focus States:**
- All links must have visible focus indicators
- Use `ring-ring` for focus outline
- Ensure sufficient contrast (4.5:1)

---

## Data Structure

### Mock Data

```typescript
// /src/app/data/mock.ts

export const SOCIAL_LINKS = [
  {
    platform: "facebook" as const,
    url: "https://facebook.com/lightspeedtours",
    label: "Follow us on Facebook",
  },
  {
    platform: "twitter" as const,
    url: "https://twitter.com/lightspeedtours",
    label: "Follow us on Twitter",
  },
  {
    platform: "instagram" as const,
    url: "https://instagram.com/lightspeedtours",
    label: "Follow us on Instagram",
  },
  {
    platform: "linkedin" as const,
    url: "https://linkedin.com/company/lightspeedtours",
    label: "Connect on LinkedIn",
  },
  {
    platform: "youtube" as const,
    url: "https://youtube.com/@lightspeedtours",
    label: "Subscribe on YouTube",
  },
];
```

### Author Social Links

```typescript
interface Author {
  id: string;
  name: string;
  bio: string;
  photo: string;
  socialLinks: SocialLink[];
}

const author = {
  id: "john-doe",
  name: "John Doe",
  bio: "Travel writer and photographer",
  photo: "/authors/john-doe.jpg",
  socialLinks: [
    { platform: "twitter", url: "https://twitter.com/johndoe" },
    { platform: "instagram", url: "https://instagram.com/johndoe" },
    { platform: "website", url: "https://johndoe.com" },
  ],
};
```

---

## Common Patterns

### Footer Social Links

```tsx
function Footer() {
  return (
    <footer className="bg-muted">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 py-12">
          {/* Other footer columns */}
          
          <div>
            <h3 className="mb-4">Connect</h3>
            <SocialLinks
              links={SOCIAL_LINKS}
              size="lg"
              gap={3}
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}
```

### Author Bio

```tsx
function AuthorBio({ author }: { author: Author }) {
  return (
    <div className="flex items-start gap-4 p-6 rounded-lg border border-border">
      <img
        src={author.photo}
        alt={author.name}
        className="size-16 rounded-full"
      />
      <div className="flex-1">
        <h4 className="mb-1">{author.name}</h4>
        <p className="text-sm text-muted-foreground mb-3">{author.bio}</p>
        {author.socialLinks && author.socialLinks.length > 0 && (
          <SocialLinks
            links={author.socialLinks}
            size="sm"
            gap={2}
          />
        )}
      </div>
    </div>
  );
}
```

### Team Member Card

```tsx
function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="text-center">
      <img
        src={member.photo}
        alt={member.name}
        className="w-full aspect-square object-cover rounded-lg mb-4"
      />
      <h3 className="mb-1">{member.name}</h3>
      <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
      {member.socialLinks && (
        <SocialLinks
          links={member.socialLinks}
          size="md"
          style="colored"
          className="justify-center"
        />
      )}
    </div>
  );
}
```

---

## Mobile Considerations

### Touch Targets

**Minimum 44x44px:**
```tsx
<a
  href={link.url}
  className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2"
>
  <Icon size={20} />
</a>
```

### Responsive Layout

```tsx
// Horizontal on desktop, vertical on mobile
<SocialLinks
  links={links}
  className="flex-col sm:flex-row"
/>
```

---

## SEO Considerations

### rel="noopener noreferrer"

```tsx
// Always use for external links
<a
  href={link.url}
  target="_blank"
  rel="noopener noreferrer"
>
  {/* Icon */}
</a>
```

**Why:**
- `noopener` - Prevents access to window.opener
- `noreferrer` - Doesn't send referrer information

### Schema Markup (Optional)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LightSpeed Tours",
  "url": "https://lightspeedtours.com",
  "sameAs": [
    "https://facebook.com/lightspeedtours",
    "https://twitter.com/lightspeedtours",
    "https://instagram.com/lightspeedtours"
  ]
}
```

---

## Testing Checklist

- [ ] All social links display correctly
- [ ] Icons render properly
- [ ] Links open in new tab
- [ ] Links have correct URLs
- [ ] Hover states work
- [ ] Focus states visible
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Touch targets minimum 44x44px
- [ ] Icons scale properly (sm, md, lg)
- [ ] Labels display correctly (if enabled)
- [ ] Direction (horizontal/vertical) works
- [ ] Gap spacing correct
- [ ] Colored style shows brand colors
- [ ] rel="noopener noreferrer" present

---

## Related Components

- **ShareButton** - Share content to social media
- **Footer** - Contains social links
- **AuthorBio** - Shows author social profiles
- **TeamMemberCard** - Displays team member socials

---

## WordPress Block Theme Alignment

### Block Pattern Registration

```php
// WordPress: patterns/footer-with-social.php
<?php
/**
 * Title: Footer with Social Links
 * Slug: tour-operator/footer-social
 * Categories: footer
 */
?>

<!-- wp:group {"className":"footer-section"} -->
<div class="footer-section">
  <!-- wp:heading {"level":3} -->
  <h3>Connect</h3>
  <!-- /wp:heading -->
  
  <!-- wp:social-links {"className":"is-style-logos-only"} -->
  <ul class="wp-block-social-links is-style-logos-only">
    <!-- wp:social-link {"url":"#","service":"facebook"} /-->
    <!-- wp:social-link {"url":"#","service":"twitter"} /-->
    <!-- wp:social-link {"url":"#","service":"instagram"} /-->
  </ul>
  <!-- /wp:social-links -->
</div>
<!-- /wp:group -->
```

### Theme.json Configuration

```json
{
  "settings": {
    "blocks": {
      "core/social-links": {
        "spacing": {
          "blockGap": true
        }
      }
    }
  },
  "styles": {
    "blocks": {
      "core/social-links": {
        "spacing": {
          "blockGap": "0.5rem"
        }
      }
    }
  }
}
```

---

## Implementation Notes

**Component Location:**
- File: `/src/app/components/common/SocialLinks.tsx`
- Utility component (not a pattern or block)

**Icon Library:**
- Use `lucide-react` for icons
- Verify icons exist before importing
- Use `aria-hidden="true"` on decorative icons

**Styling:**
- Uses design tokens from `/src/styles/theme.css`
- No hardcoded colors (use semantic tokens)
- Brand colors only for "colored" style variant

**Security:**
- Always use `rel="noopener noreferrer"` for external links
- Validate URLs before rendering
- Sanitize user-provided URLs

---

This component provides a consistent way to display social media links across the site, from the footer to author bios and team member profiles.
