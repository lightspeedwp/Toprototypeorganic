# Team Grid Pattern Guidelines

**Component:** `TeamGridPattern`  
**File:** `/src/app/components/patterns/TeamGridPattern.tsx`  
**Category:** Content Pattern  
**WordPress Equivalent:** Team Member block, Staff Grid  
**Pattern Slug:** `lightspeed/team-grid`

---

## Overview

The Team Grid Pattern displays team member profiles in a responsive grid layout with photos, names, roles, bios, and optional contact information. Perfect for About pages, Team pages, and staff directories.

### When to Use

- ✅ Team/About pages
- ✅ Staff directories
- ✅ Leadership pages
- ✅ Expert/guide profiles
- ✅ Company culture showcases
- ✅ Author bios (for multi-author blogs)

### When NOT to Use

- ❌ Single person bios (use editorial content)
- ❌ User testimonials (use ReviewsSectionPattern)
- ❌ Product listings (use CardGrid)
- ❌ Blog author boxes (use dedicated author component)
- ❌ Contact directories (use ContactInfoPattern)

---

## Component API

### Props Interface

```typescript
interface TeamGridPatternProps {
  /** Grid heading @default undefined */
  title?: string;
  
  /** Grid description @default undefined */
  description?: string;
  
  /** Array of team members */
  members: TeamMember[];
  
  /** Grid columns (2, 3, or 4) @default 3 */
  columns?: 2 | 3 | 4;
  
  /** Show contact info (email, phone) @default true */
  showContactInfo?: boolean;
  
  /** Visual variant @default "default" */
  variant?: "default" | "compact";
}

interface TeamMember {
  /** Unique identifier */
  id: string;
  
  /** Full name */
  name: string;
  
  /** Job title/role */
  role: string;
  
  /** Profile photo URL */
  photo: string;
  
  /** Short biography (optional) */
  bio?: string;
  
  /** Email address (optional) */
  email?: string;
  
  /** Phone number (optional) */
  phone?: string;
  
  /** Location/office (optional) */
  location?: string;
  
  /** Areas of expertise (optional, max 3) */
  specialties?: string[];
}
```

### Default Behavior

**Grid Layout:**
- 1 column on mobile (< 768px)
- 2 columns on tablet (768px - 1023px)
- 3 columns on desktop (1024px+)
- Can be customized via `columns` prop

**Photo Handling:**
- Aspect ratio: 1:1 (square)
- Object-fit: cover
- Hover effect: subtle scale
- Alt text: "{name} - {role}"

**Contact Info:**
- Shows by default (`showContactInfo={true}`)
- Displays email and phone if provided
- Click-to-email and click-to-call links
- Icons: Mail, Phone (Lucide React)

---

## Usage Examples

### Basic Usage

```tsx
import { TeamGridPattern } from "../components/patterns/TeamGridPattern";
import { TEAM_MEMBERS } from "../data/mock";

<TeamGridPattern
  title="Meet Our Team"
  description="Experienced safari guides and travel experts passionate about Africa"
  members={TEAM_MEMBERS}
/>
```

### Custom Grid Columns

```tsx
// 2-column grid (ideal for leadership team)
<TeamGridPattern
  title="Leadership Team"
  members={leaders}
  columns={2}
/>

// 4-column grid (ideal for large teams)
<TeamGridPattern
  title="Our Guides"
  members={guides}
  columns={4}
/>
```

### Without Contact Info

```tsx
<TeamGridPattern
  title="Our Experts"
  members={team}
  showContactInfo={false}
/>
```

### Compact Variant

```tsx
<TeamGridPattern
  title="Team"
  members={team}
  variant="compact"
  columns={4}
/>
```

---

## Team Member Data

### Required Fields

```typescript
const member: TeamMember = {
  id: "john-doe",
  name: "John Doe",
  role: "Senior Safari Guide",
  photo: "https://images.unsplash.com/photo-1...",
};
```

### Recommended Fields

```typescript
const member: TeamMember = {
  id: "john-doe",
  name: "John Doe",
  role: "Senior Safari Guide",
  photo: "https://images.unsplash.com/photo-1...",
  bio: "John has over 15 years of experience leading safaris across East Africa...",
  email: "john@touroperator.com",
  phone: "+27 21 123 4567",
  location: "Cape Town, South Africa",
  specialties: ["Wildlife Photography", "Big Five", "Birding"],
};
```

### Specialty Tags

**Best Practices:**
- Maximum 3 specialties per person
- Keep labels short (1-3 words)
- Use consistent terminology across team
- Highlight unique expertise

**Good Examples:**
```typescript
specialties: ["Wildlife Photography", "Big Five", "Birding"]
specialties: ["Luxury Safaris", "Honeymoons", "Family Tours"]
specialties: ["Conservation", "Tracking", "Bush Skills"]
```

**Bad Examples:**
```typescript
specialties: ["Very experienced in wildlife photography"] // Too long
specialties: ["Guide", "Expert", "Professional"] // Too generic
specialties: ["Safari"] // Not specific enough
```

---

## Grid Configurations

### 2-Column Grid

**Best For:**
- Leadership teams (4-6 people)
- Featured experts
- Founder profiles
- Key staff highlights

**Responsive Behavior:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 2 columns

```tsx
<TeamGridPattern
  columns={2}
  members={leaders}
/>
```

---

### 3-Column Grid (Default)

**Best For:**
- Standard team pages (6-12 people)
- Department teams
- Guide rosters
- Balanced layout

**Responsive Behavior:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

```tsx
<TeamGridPattern
  columns={3}
  members={team}
/>
```

---

### 4-Column Grid

**Best For:**
- Large teams (12+ people)
- Staff directories
- All guides/staff pages
- Compact presentation

**Responsive Behavior:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns

```tsx
<TeamGridPattern
  columns={4}
  members={allStaff}
/>
```

---

## Variants

### 1. Default Variant

**Appearance:**
- Full card layout
- Photo with aspect-square
- Full bio text displayed
- Contact info with icons
- Specialty badges (max 3)
- Hover effect on photo (scale 1.05)
- Card border and shadow

**Use Cases:**
- Primary team pages
- About page team section
- Detailed staff profiles

```tsx
<TeamGridPattern
  variant="default"
  members={team}
/>
```

---

### 2. Compact Variant

**Appearance:**
- Reduced card padding
- Smaller photo size
- Truncated bio (2 lines max)
- Minimal contact info
- Specialty badges (max 2)
- Lighter hover effects
- Thinner borders

**Use Cases:**
- Large teams
- Secondary pages
- Space-constrained layouts
- Quick team overview

```tsx
<TeamGridPattern
  variant="compact"
  members={team}
  columns={4}
/>
```

---

## Photo Guidelines

### Image Specifications

**Requirements:**
- **Aspect Ratio:** 1:1 (square)
- **Minimum Size:** 400px × 400px
- **Recommended Size:** 800px × 800px
- **Format:** JPG or WebP
- **File Size:** < 200KB (optimized)

### Photo Best Practices

✅ **Good Photos:**
- Professional headshots
- Good lighting
- Plain or blurred background
- Smiling/friendly expression
- Direct eye contact with camera
- Consistent style across team

❌ **Bad Photos:**
- Group photos (use individual)
- Low resolution/pixelated
- Heavily filtered
- Cropped from larger photos
- Inconsistent backgrounds
- Dark or underexposed

### Placeholder Images

```typescript
// Use Unsplash for demo/placeholder
photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"

// Or use UI Avatars for initials
photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400`
```

---

## Contact Information

### Email Display

**With Contact Info:**
```html
<a href="mailto:john@example.com" className="flex items-center gap-2">
  <Mail className="h-4 w-4" />
  <span>john@example.com</span>
</a>
```

**Behavior:**
- Click opens default email client
- mailto: link with email address
- Icon: Mail (Lucide React)
- Hover: underline text

### Phone Display

**With Contact Info:**
```html
<a href="tel:+27211234567" className="flex items-center gap-2">
  <Phone className="h-4 w-4" />
  <span>+27 21 123 4567</span>
</a>
```

**Behavior:**
- Click initiates phone call (mobile)
- tel: link with phone number
- Icon: Phone (Lucide React)
- Hover: underline text

### Location Display

**With Location:**
```html
<div className="flex items-center gap-2">
  <MapPin className="h-4 w-4" />
  <span>Cape Town, South Africa</span>
</div>
```

**Behavior:**
- Display only (not clickable by default)
- Icon: MapPin (Lucide React)
- Can be made clickable to open Google Maps

---

## Specialty Badges

### Badge Display

**Default:**
- Maximum 3 badges shown
- Small rounded badges
- Light background (primary/10)
- Primary text color
- Truncate if too long

**Styling:**
```css
background-color: rgba(var(--primary-rgb), 0.1);
color: var(--primary);
font-size: 0.75rem; /* 12px */
padding: 0.25rem 0.5rem; /* 4px 8px */
border-radius: var(--radius-md);
```

### Badge Examples

```tsx
// Display specialties
{member.specialties?.slice(0, 3).map((specialty) => (
  <span
    key={specialty}
    className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary"
  >
    {specialty}
  </span>
))}
```

---

## Design System Compliance

### Colors

All colors use CSS variables:

```css
/* Card */
background-color: var(--card);
border-color: var(--border);

/* Text */
color: var(--foreground); /* name */
color: var(--muted-foreground); /* role, location */

/* Links */
color: var(--primary);
hover:color: var(--primary);
hover:text-decoration: underline;

/* Specialty badges */
background-color: rgba(var(--primary-rgb), 0.1);
color: var(--primary);

/* Focus */
ring-color: var(--ring);
```

### Typography

```css
/* Name uses Lora (serif) */
font-family: var(--font-family-lora);
font-weight: var(--font-weight-semibold); /* 600 */
font-size: 1.25rem; /* 20px */

/* Role uses Noto Sans */
font-family: var(--font-family-noto-sans);
font-weight: var(--font-weight-medium); /* 500 */
font-size: 0.875rem; /* 14px */
color: var(--muted-foreground);

/* Bio uses Noto Sans */
font-family: var(--font-family-noto-sans);
font-weight: var(--font-weight-normal); /* 400 */
font-size: 0.875rem; /* 14px */

/* Contact info uses Noto Sans */
font-family: var(--font-family-noto-sans);
font-size: 0.75rem; /* 12px */
```

### Spacing

```css
/* Grid gap */
gap: 2rem; /* 32px - default */
gap: 1.5rem; /* 24px - compact */

/* Card padding */
padding: 1.5rem; /* 24px - default */
padding: 1rem; /* 16px - compact */

/* Element spacing */
margin-bottom: 1rem; /* photo to name */
margin-bottom: 0.5rem; /* name to role */
margin-bottom: 0.75rem; /* role to bio */
margin-bottom: 0.5rem; /* bio to contact */
```

---

## Accessibility

### WCAG 2.1 AA Compliance

✅ **Semantic HTML:**
- Uses `<article>` for each team member
- Proper heading hierarchy (h3 for names)
- Links for email/phone with proper hrefs

✅ **Images:**
- Alt text: "{name} - {role}"
- Descriptive and informative
- Loading: lazy (performance)

✅ **Keyboard Navigation:**
- All links keyboard accessible
- Logical tab order
- Visible focus indicators

✅ **Screen Readers:**
- Member cards announced as articles
- Names announced as headings
- Contact links properly labeled

### Alt Text Best Practices

✅ **Good Alt Text:**
```typescript
alt={`${member.name} - ${member.role}`}
// "John Doe - Senior Safari Guide"
```

❌ **Bad Alt Text:**
```typescript
alt="photo" // Not descriptive
alt="" // Missing information
alt={member.name} // Missing role context
```

---

## Mobile Optimization

### Responsive Behavior

**Mobile (< 768px):**
- 1 column grid
- Full-width cards
- Stacked layout
- Larger touch targets

**Tablet (768px - 1023px):**
- 2 columns (regardless of `columns` prop)
- Balanced layout
- Adequate spacing

**Desktop (1024px+):**
- Respects `columns` prop (2, 3, or 4)
- Optimized grid
- Hover effects active

### Touch Targets

All interactive elements meet minimum size:
- Email/phone links: 44px × 44px minimum
- Photo clickable area (optional): full card
- Adequate spacing between links

### Performance

**Image Optimization:**
- Lazy loading images
- Responsive image sizes
- WebP format (with JPG fallback)
- Proper aspect ratios (no layout shift)

```tsx
<img
  src={member.photo}
  alt={`${member.name} - ${member.role}`}
  loading="lazy"
  className="aspect-square object-cover"
/>
```

---

## Hover Effects

### Photo Hover

```css
.team-photo {
  transition: transform 0.3s ease;
}

.team-photo:hover {
  transform: scale(1.05);
}
```

### Card Hover

```css
.team-card {
  transition: shadow 0.3s ease, transform 0.3s ease;
}

.team-card:hover {
  box-shadow: var(--elevation-md);
  transform: translateY(-2px);
}
```

### Link Hover

```css
.team-link {
  transition: color 0.2s ease;
}

.team-link:hover {
  color: var(--primary);
  text-decoration: underline;
}
```

---

## Advanced Usage

### Filterable Team Grid

```tsx
const [filter, setFilter] = useState<string>("all");

const filteredMembers = filter === "all"
  ? members
  : members.filter((m) => m.role.toLowerCase().includes(filter));

<>
  <div className="flex gap-2 mb-8">
    <button onClick={() => setFilter("all")}>All</button>
    <button onClick={() => setFilter("guide")}>Guides</button>
    <button onClick={() => setFilter("manager")}>Management</button>
  </div>
  
  <TeamGridPattern members={filteredMembers} />
</>
```

### Sortable Team Grid

```tsx
const [sortBy, setSortBy] = useState<"name" | "role">("name");

const sortedMembers = [...members].sort((a, b) => {
  if (sortBy === "name") {
    return a.name.localeCompare(b.name);
  }
  return a.role.localeCompare(b.role);
});

<TeamGridPattern members={sortedMembers} />
```

### Team Member Modal

```tsx
const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

<TeamGridPattern
  members={members.map((m) => ({
    ...m,
    onClick: () => setSelectedMember(m),
  }))}
/>

{selectedMember && (
  <Modal onClose={() => setSelectedMember(null)}>
    <TeamMemberDetail member={selectedMember} />
  </Modal>
)}
```

---

## WordPress Integration

### Block Pattern Registration

```php
register_block_pattern(
  'lightspeed/team-grid',
  array(
    'title' => __('Team Grid', 'lightspeed'),
    'description' => __('Display team members in a responsive grid', 'lightspeed'),
    'categories' => array('lightspeed-content'),
    'content' => '<!-- wp:group {"layout":{"type":"constrained"}} -->
      <div class="wp-block-group">
        <!-- wp:heading -->
        <h2>Meet Our Team</h2>
        <!-- /wp:heading -->
        
        <!-- wp:columns -->
        <div class="wp-block-columns">
          <!-- wp:column -->
          <div class="wp-block-column">
            <!-- wp:image -->
            <!-- wp:heading {"level":3} -->
            <!-- wp:paragraph -->
          </div>
          <!-- /wp:column -->
        </div>
        <!-- /wp:columns -->
      </div>
      <!-- /wp:group -->',
  )
);
```

### Custom Post Type Integration

```php
// Register team member CPT
register_post_type('team_member', array(
  'public' => true,
  'label' => 'Team Members',
  'supports' => array('title', 'editor', 'thumbnail'),
  'has_archive' => true,
));

// Add custom fields
add_action('add_meta_boxes', function() {
  add_meta_box('team_details', 'Team Member Details', 'team_details_callback', 'team_member');
});
```

---

## Testing

### Unit Tests

Required test coverage:

```typescript
describe('TeamGridPattern', () => {
  // Rendering tests
  test('renders all team members');
  test('renders with custom columns');
  test('shows/hides contact info based on prop');
  test('applies correct variant styles');
  
  // Content tests
  test('displays member photos with alt text');
  test('displays member names and roles');
  test('displays bio when provided');
  test('displays specialties (max 3)');
  
  // Contact tests
  test('renders email links when provided');
  test('renders phone links when provided');
  test('renders location when provided');
  
  // Accessibility tests
  test('has proper semantic structure');
  test('has accessible image alt text');
  test('has keyboard-accessible links');
  
  // Responsive tests
  test('applies correct grid columns');
  test('handles mobile breakpoints');
});
```

### Integration Tests

```typescript
test('team grid workflow', () => {
  const members: TeamMember[] = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Guide',
      photo: 'photo.jpg',
      email: 'john@example.com',
    },
  ];
  
  render(<TeamGridPattern members={members} />);
  
  // Verify member displayed
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Guide')).toBeInTheDocument();
  
  // Verify email link
  const emailLink = screen.getByRole('link', { name: /john@example.com/i });
  expect(emailLink).toHaveAttribute('href', 'mailto:john@example.com');
});
```

---

## Troubleshooting

### Common Issues

**Issue:** Images not displaying
**Solution:** Verify image URLs are accessible and CORS-enabled

**Issue:** Grid not responsive
**Solution:** Ensure parent container has proper width constraints

**Issue:** Contact info not showing
**Solution:** Check `showContactInfo={true}` and member has email/phone

**Issue:** Specialty badges overflowing
**Solution:** Use shorter labels or reduce to max 3 specialties

**Issue:** Hover effects not working on mobile
**Solution:** Expected behavior - hover effects only on desktop

---

## Related Components

- **CardGrid** - Generic card grid layout
- **RelatedContent** - Related items grid
- **ReviewsSectionPattern** - Testimonial grid
- **ContactInfoPattern** - Contact information

---

## Change Log

### Version 1.0.0 (December 27, 2024)
- Initial release
- Responsive grid (2, 3, 4 columns)
- Team member cards with photos
- Optional contact information
- Specialty badges (max 3)
- 2 variants: default, compact
- Hover effects
- Full accessibility (WCAG 2.1 AA)
- Mobile optimized
- Design system compliant

---

**Last Updated:** December 27, 2024  
**Maintained By:** Development Team  
**Status:** Production Ready
