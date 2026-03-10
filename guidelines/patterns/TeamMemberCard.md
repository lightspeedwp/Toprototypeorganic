# TeamMemberCard Pattern Guidelines

**Component:** TeamMemberCard  
**Category:** Pattern  
**Version:** 1.0  
**Last Updated:** 2026-02-28

---

## Overview

The TeamMemberCard pattern displays team member profiles with photos, bios, specialties, and contact information. Used in destination pages, tour pages, and team archives.

---

## Component Location

**File:** `/src/app/components/patterns/TeamMemberCard.tsx`  
**CSS:** `/src/styles/components/team-card.css`

---

## Usage

```typescript
import TeamMemberCard from "../components/patterns/TeamMemberCard";
// or
import { TeamMemberCard } from "../components/patterns/TeamMemberCard";

<TeamMemberCard 
  member={teamMemberObject}
  showContact={true}
  showBio={true}
  className="additional-classes"
/>
```

---

## Props

### Required Props

**`member`** (TeamMember object)
```typescript
{
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  excerpt: string;
  featuredImage: string;
  specialties: string[];
  email?: string;
  phone?: string;
}
```

### Optional Props

**`showContact`** (boolean, default: true)
- `true` → Display email and phone links
- `false` → Hide contact information section

**`showBio`** (boolean, default: true)
- `true` → Display full bio
- `false` → Display excerpt only

**`className`** (string, default: "")
- Additional CSS classes to apply to wrapper

---

## Visual Structure

```
┌─────────────────────────────────┐
│  ┌───────────────────────────┐  │
│  │                           │  │
│  │     [Member Photo]        │  │
│  │    (1:1 aspect ratio)     │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  John Smith                     │
│  DESTINATION SPECIALIST         │
│                                 │
│  Bio text here, truncated to   │
│  150 characters if using        │
│  excerpt mode...                │
│                                 │
│  Specialties:                   │
│  [Africa] [Safaris] [Luxury]    │
│                                 │
│  ─────────────────────────      │
│  📧 john@example.com            │
│  📞 +1 234 567 8900             │
│                                 │
│  View full profile →            │
└─────────────────────────────────┘
```

---

## BEM CSS Structure

### Block

**`.team-card`** - Main container
- `display: flex`
- `flex-direction: column`
- `gap: 1.5rem`
- `padding: 1.5rem`
- `background-color: var(--card)`
- `border: 1px solid var(--border)`
- `border-radius: var(--radius-lg)`

**Hover State:**
- `border-color: var(--primary)`
- `box-shadow: var(--elevation-sm)`

### Elements

**`.team-card__photo-wrapper`** - Photo container
- `aspect-ratio: 1 / 1`
- `border-radius: var(--radius-lg)`
- `overflow: hidden`
- `background-color: var(--muted)`

**`.team-card__photo`** - Photo image
- `width: 100%`
- `height: 100%`
- `object-fit: cover`
- Hover: `transform: scale(1.05)`

**`.team-card__content`** - Content wrapper
- `display: flex`
- `flex-direction: column`
- `gap: 0.75rem`

**`.team-card__name`** - Member name
- `font-family: var(--font-family-lora)` (serif)
- `font-size: var(--text-2xl)`
- `font-weight: var(--font-weight-medium)`
- `line-height: var(--leading-tight)`
- `color: var(--foreground)`

**`.team-card__role`** - Member role
- `font-family: var(--font-family-noto-sans)`
- `font-size: var(--text-sm)`
- `font-weight: var(--font-weight-medium)`
- `color: var(--primary)`
- `text-transform: uppercase`
- `letter-spacing: var(--tracking-wide)`

**`.team-card__bio`** - Bio text
- `font-family: var(--font-family-noto-sans)`
- `font-size: var(--text-base)`
- `font-weight: var(--font-weight-normal)`
- `line-height: var(--leading-relaxed)`
- `color: var(--muted-foreground)`

**`.team-card__specialties`** - Specialties section
- `padding-top: 0.75rem`
- `border-top: 1px solid var(--border)`

**`.team-card__specialties-label`** - Specialties heading
- `font-family: var(--font-family-noto-sans)`
- `font-size: var(--text-sm)`
- `font-weight: var(--font-weight-medium)`
- `color: var(--foreground)`

**`.team-card__specialties-list`** - Specialties container
- `display: flex`
- `flex-wrap: wrap`
- `gap: 0.5rem`

**`.team-card__specialty`** - Individual specialty badge
- `padding: 0.25rem 0.75rem`
- `font-family: var(--font-family-noto-sans)`
- `font-size: var(--text-xs)`
- `background-color: var(--muted)`
- `border-radius: var(--radius-full)`

**`.team-card__contact`** - Contact section
- `display: flex`
- `flex-direction: column`
- `gap: 0.5rem`
- `padding-top: 0.75rem`
- `border-top: 1px solid var(--border)`

**`.team-card__contact-link`** - Email/phone link
- `display: inline-flex`
- `align-items: center`
- `gap: 0.5rem`
- `font-family: var(--font-family-noto-sans)`
- `font-size: var(--text-sm)`
- `color: var(--foreground)`
- Hover: `color: var(--primary)`
- Icon color: `var(--primary)`

**`.team-card__link`** - View profile link
- `font-family: var(--font-family-noto-sans)`
- `font-size: var(--text-sm)`
- `font-weight: var(--font-weight-medium)`
- `color: var(--primary)`
- Hover: underline

---

## Design System Compliance

### Colors
✅ All colors use CSS custom properties:
- Background: `var(--card)`
- Border: `var(--border)`
- Text: `var(--foreground)`
- Muted text: `var(--muted-foreground)`
- Accent: `var(--primary)`

❌ NO hardcoded colors

### Typography
✅ Only approved fonts:
- Name: `var(--font-family-lora)` (Lora serif)
- All other text: `var(--font-family-noto-sans)` (Noto Sans)

❌ NO other fonts

### Spacing
✅ Uses consistent spacing:
- Card padding: `1.5rem`
- Internal gaps: `0.5rem` to `1.5rem`
- Photo aspect ratio: `1:1`

### Borders & Radius
✅ Uses design system tokens:
- Border radius: `var(--radius-lg)`
- Badge radius: `var(--radius-full)`
- Border width: `1px solid`

---

## Responsive Behavior

### Mobile (< 768px)
- Full-width card
- Single column layout
- Touch-friendly tap targets (44px min)

### Tablet (768px - 1024px)
- 2-column grid in parent container
- Photo scales proportionally

### Desktop (> 1024px)
- 3-column grid in parent container
- Optimal card dimensions

---

## Content Display Logic

### Bio Display

**When `showBio={true}`:**
- Display full `member.bio` text
- No truncation

**When `showBio={false}`:**
- Display `member.excerpt` text
- If excerpt > 150 chars, truncate with "..."

```typescript
const bioText = showBio ? member.bio : member.excerpt;
const truncatedBio = bioText && bioText.length > 150 
  ? `${bioText.slice(0, 150)}...` 
  : bioText;
```

### Contact Display

**When `showContact={true}`:**
- Show email link (if exists)
- Show phone link (if exists)
- Both in contact section with divider

**When `showContact={false}`:**
- Entire contact section hidden

### Specialties Display

- Shows first 3 specialties only
- If more than 3, remaining are hidden
- Each specialty as pill badge

```typescript
member.specialties.slice(0, 3).map(...)
```

---

## Accessibility

### Semantic HTML
- `<article>` wrapper for team member
- `<h3>` for member name
- `<a>` for links with `href`

### ARIA Labels
- Email link: `href="mailto:{email}"`
- Phone link: `href="tel:{phone}"`
- Profile link: Descriptive text

### Keyboard Navigation
- All links keyboard accessible
- Tab order: Photo (not focusable) → Email → Phone → Profile
- Enter activates links

### Focus States
- Visible focus indicators: `focus-visible:ring-2 ring-ring`
- 2px outline with offset

### Images
- Alt text: Member's name
- Proper aspect ratio maintained

---

## Use Cases

### 1. Destination Pages (Single Consultant)
Display dedicated consultant:
```typescript
<section className="py-section-md bg-background">
  <Container>
    <div className="max-w-2xl mx-auto text-center mb-8">
      <h2 className="mb-2">Your Destination Expert</h2>
      <p className="text-muted-foreground">
        Get personalized advice from our {destination.title} specialist
      </p>
    </div>
    <div className="max-w-xl mx-auto">
      <TeamMemberCard 
        member={consultant} 
        showContact={true} 
        showBio={true} 
      />
    </div>
  </Container>
</section>
```

### 2. Team Archive Page
Display all team members:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {teamMembers.map((member) => (
    <TeamMemberCard 
      key={member.id} 
      member={member}
      showContact={false}
      showBio={false}
    />
  ))}
</div>
```

### 3. Tour Pages
Display tour leader:
```typescript
<aside className="bg-card border border-border rounded-lg p-6">
  <h3 className="mb-4">Your Tour Leader</h3>
  <TeamMemberCard 
    member={tourLeader}
    showContact={true}
    showBio={true}
  />
</aside>
```

---

## Data Requirements

### TeamMember Object Structure

```typescript
{
  id: string, // Unique identifier
  slug: string, // URL-friendly identifier
  name: string, // Full name (e.g., "John Smith")
  role: string, // Job title (e.g., "Destination Specialist")
  bio: string, // Full biography, 200-400 words
  excerpt: string, // Short bio, 100-150 chars
  featuredImage: string, // Professional headshot, square, 800x800 min
  specialties: string[], // 3-6 specialties
  email?: string, // Contact email
  phone?: string, // Contact phone
  destinationIds?: string[], // Expertise destinations
  languages?: string[], // Languages spoken
  yearsExperience?: number, // Years in industry
}
```

### Content Guidelines

**Name:**
- Format: "First Last"
- Use professional name
- Example: "Sarah Johnson"

**Role:**
- Be specific and descriptive
- Format: Title Case
- Examples: "Africa Safari Specialist", "Luxury Travel Consultant"

**Bio (Full - 200-400 words):**
- Paragraph 1: Background and experience
- Paragraph 2: Specialties and expertise
- Paragraph 3: Personal touch (why they love travel)

**Excerpt (100-150 chars):**
- One compelling sentence
- Highlight unique expertise
- Example: "Sarah has led over 100 African safaris and brings 15 years of firsthand wildlife expertise."

**Specialties (3-6 items):**
- Specific regions: "East Africa", "Southern Africa"
- Experience types: "Luxury Safaris", "Adventure Travel"
- Special interests: "Wildlife Photography", "Conservation"

**Photo Guidelines:**
- Professional headshot
- Square aspect ratio (1:1)
- Minimum 800x800px
- Good lighting
- Neutral or location-appropriate background
- Smiling, approachable expression

---

## Common Issues & Solutions

### Issue: Photo not displaying

**Cause:** Invalid image URL or missing image  
**Solution:** Verify `featuredImage` URL is valid and accessible

### Issue: Contact info not showing

**Cause:** `showContact` set to false or email/phone undefined  
**Solution:** Set `showContact={true}` and ensure email/phone fields exist

### Issue: Specialties overflow

**Cause:** Too many specialties displayed  
**Solution:** Component automatically limits to 3, verify this logic

### Issue: Bio too long

**Cause:** Full bio displayed in grid view  
**Solution:** Use `showBio={false}` in archive/grid views

### Issue: Photo distorted

**Cause:** Non-square image source  
**Solution:** Use square (1:1) images or adjust `object-fit: cover`

### Issue: Link not working

**Cause:** Invalid slug or route not configured  
**Solution:** Verify slug and `/team/:slug` route exists

---

## WordPress Alignment

### Pattern Registration
```php
register_block_pattern('lightspeed/team-card', [
  'title' => 'Team Member Card',
  'categories' => ['team'],
  'content' => '<!-- wp:group {"className":"team-card"} -->',
]);
```

### Block Markup
Uses core blocks:
- `core/group` (wrapper)
- `core/image` (photo)
- `core/heading` (name)
- `core/paragraph` (bio, role)
- `core/button` (profile link)

---

## Testing Checklist

### Visual Tests
- [ ] Photo displays correctly (1:1 aspect)
- [ ] Photo scales on hover
- [ ] Name and role display correctly
- [ ] Bio truncates at 150 chars when using excerpt
- [ ] Specialties display (max 3)
- [ ] Contact info shows when enabled
- [ ] Card scales responsively

### Functional Tests
- [ ] Email link works (opens mail client)
- [ ] Phone link works (on mobile)
- [ ] Profile link works
- [ ] showContact prop works
- [ ] showBio prop works
- [ ] Custom className applied

### Accessibility Tests
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Links have proper href attributes
- [ ] Images have alt text
- [ ] Color contrast meets WCAG AA

### Design System Tests
- [ ] All colors use CSS variables
- [ ] Only Lora and Noto Sans used
- [ ] No inline styles
- [ ] No dark: classes
- [ ] BEM naming followed

---

## Integration Examples

### Single Consultant (Centered)
```typescript
<div className="max-w-xl mx-auto">
  <TeamMemberCard 
    member={consultant}
    showContact={true}
    showBio={true}
  />
</div>
```

### Team Grid (Full Width)
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {teamMembers.map((member) => (
    <TeamMemberCard 
      key={member.id}
      member={member}
      showContact={false}
      showBio={false}
    />
  ))}
</div>
```

### Sidebar Widget (Narrow)
```typescript
<aside className="sticky top-4">
  <TeamMemberCard 
    member={consultant}
    showContact={true}
    showBio={false}
  />
</aside>
```

---

## File Locations

**Component:** `/src/app/components/patterns/TeamMemberCard.tsx`  
**CSS:** `/src/styles/components/team-card.css`  
**Data:** `/src/app/data/team.ts`  
**Types:** `/src/app/data/types.ts` (TeamMember interface)

---

**Last Updated:** 2026-02-28  
**Status:** Production Ready  
**Review Schedule:** Quarterly
