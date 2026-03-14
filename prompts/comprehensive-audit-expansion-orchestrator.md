# 🎯 Comprehensive Audit & Expansion Orchestrator Prompt

**Version:** 1.0.0  
**Date:** March 11, 2026  
**Type:** Master Orchestrator  
**Objective:** Systematically audit, refactor, and expand the LightSpeed Tour Operator React prototype for WordPress-aligned BEM architecture with complete design system compliance

---

## 📋 MASTER EXECUTION SEQUENCE

This orchestrator coordinates **14 sub-prompts** across **5 major phases**:

```
Phase 1: Design System Audits (Tailwind, Light/Dark Mode, Organic Design)
Phase 2: Code Quality Audits (Inline Styles, CSS Presets, Data Integrity, File Optimization)
Phase 3: Data Expansion (All Content Types)
Phase 4: Root Cleanup (Files, Orphans, Imports)
Phase 5: Consolidation (Reports, Tasks, Implementation Plan)
```

**⚠️ CRITICAL RULES:**
1. **Zero Margin Policy:** ALL elements must use flex/grid gaps or padding. NO margin utilities (`mb-4`, `mt-8`, `my-6`, `mx-auto`).
2. **Organic Wrappers:** Use specific organic section wrappers (`organic-section-top`, `organic-section-middle`, `organic-section-bottom`) for page layout sections.
3. **Strict Token Usage:** ALL styling MUST use CSS variables from `/src/styles/global.css` and Tailwind config. NO hardcoded colors, spacing, borders, or radii.
4. **Restricted Fonts:** ONLY 5 font faces (Lora, Noto Sans, Courier New, Caveat, Shadows Into Light) for ALL generated text.
5. **Button Icon Layout:** For buttons with icons, use this CSS pattern: `display: flex; align-items: center; gap: 5px;` (without nowrap).

---

## 🔍 PHASE 1: DESIGN SYSTEM AUDITS

### 1.1 Tailwind CSS Comprehensive Audit & Mapping

**Prompt:** `/prompts/tailwind-audit-prompt.md` (ENHANCED)  
**Objective:** Complete Tailwind variable inventory, map to WordPress-aligned CSS variables

#### Enhancements Required:

**1.1.1 Complete Tailwind Variable Catalog**

Create exhaustive inventory of ALL Tailwind utilities used in codebase:

**Categories to catalog:**
- Layout: `flex`, `grid`, `block`, `inline`, `container`, `aspect-*`
- Spacing: `p-*`, `px-*`, `py-*`, `gap-*`, `space-*` (all values 0-96)
- Typography: `text-*`, `font-*`, `leading-*`, `tracking-*`, `uppercase`, `lowercase`, `capitalize`
- Colors: `bg-*`, `text-*`, `border-*`, `ring-*`, `divide-*`
- Sizing: `w-*`, `h-*`, `min-*`, `max-*`, `size-*`
- Borders: `border`, `border-*`, `rounded-*`, `divide-*`
- Effects: `shadow-*`, `opacity-*`, `blur-*`, `brightness-*`
- Transitions: `transition-*`, `duration-*`, `ease-*`, `delay-*`
- Transforms: `scale-*`, `rotate-*`, `translate-*`, `skew-*`
- Responsive: `sm:*`, `md:*`, `lg:*`, `xl:*`, `2xl:*`
- States: `hover:*`, `focus:*`, `active:*`, `group-hover:*`, `peer-*`
- Dark Mode: `dark:*` (CRITICAL VIOLATIONS - must be 100% eliminated)

**1.1.2 WordPress-Aligned CSS Variable Mapping**

Create comprehensive mapping table:

```markdown
| Tailwind Utility | Current Usage Count | WordPress CSS Variable | Global CSS Class | Migration Priority |
|------------------|---------------------|------------------------|------------------|-------------------|
| text-2xl | 142 | var(--text-2xl) | .text-2xl | P1 |
| bg-white | 89 | var(--background) | .bg-background | P0 (Critical) |
| p-6 | 76 | var(--spacing-element-lg) | .p-element-lg | P2 |
| rounded-lg | 65 | var(--radius-lg) | .rounded-lg | P2 |
| shadow-md | 54 | var(--elevation-md) | .shadow-md | P2 |
```

**1.1.3 Identify Missing CSS Variables**

For each Tailwind utility that LACKS a WordPress-aligned CSS variable:

```markdown
## Missing CSS Variables Report

### Colors
- [ ] `bg-gray-50` → Need `--background-subtle` or `--muted-lighter`
- [ ] `text-gray-600` → Need `--foreground-medium` or `--muted-foreground-dark`

### Spacing
- [ ] `p-1.5` → Need `--spacing-element-xs` (6px)
- [ ] `gap-2.5` → Need `--spacing-gap-sm` (10px)

### Effects
- [ ] `blur-sm` → Need `--blur-subtle`
- [ ] `backdrop-blur-md` → Need `--backdrop-blur-medium`
```

**1.1.4 Tailwind-to-WordPress Class Mapping Strategy**

Create three-tier mapping:

**Tier 1: Direct Mapping** (Tailwind utility → WordPress class, same name)
```css
/* In /src/styles/global.css or wordpress-classes.css */
.text-2xl { font-size: var(--text-2xl); }
.bg-background { background-color: var(--background); }
.p-6 { padding: var(--spacing-element-lg); }
```

**Tier 2: Semantic Mapping** (Tailwind utility → WordPress semantic class)
```css
.has-background { background-color: var(--background); }
.has-primary-background-color { background-color: var(--primary); }
.has-foreground-color { color: var(--foreground); }
```

**Tier 3: BEM Pattern Classes** (Tailwind utilities → BEM component classes)
```css
.wp-pattern-hero__title {
  font-family: var(--font-family-lora);
  font-size: var(--text-6xl);
  font-weight: var(--font-weight-bold);
  color: var(--foreground);
}
```

**Deliverables:**
- `/reports/2026-03-11-tailwind-audit-comprehensive.md` - Full Tailwind inventory
- `/reports/2026-03-11-wordpress-css-variable-mapping.md` - Complete mapping table
- `/reports/2026-03-11-missing-css-variables.md` - Variables to create
- `/guidelines/css-architecture/tailwind-wordpress-mapping.md` - Migration guide
- `/tasks/tailwind-replacement-tasks.md` - Phased replacement plan

---

### 1.2 Light & Dark Mode Comprehensive Audit

**Prompt:** `/prompts/light-dark-mode-style-audit.md` (EXPANDED)  
**Objective:** Ensure 100% CSS variable usage, WCAG AA compliance, and proper dark mode implementation

#### Enhancements Required:

**1.2.1 Expanded Color Token Coverage**

Audit ALL color usages:

**Header Navigation Specific:**
```bash
# Check header navigation hover states
grep -rn "header\|navigation\|nav\|menu" \
  src/styles/parts/ \
  src/app/components/parts/Header.tsx \
  --include="*.css" --include="*.tsx"
```

**Interactive Elements:**
- [ ] Navigation menu item hover (light mode)
- [ ] Navigation menu item hover (dark mode) ← **CRITICAL ISSUE REPORTED**
- [ ] Navigation menu item active state
- [ ] Dropdown menu backgrounds
- [ ] Dropdown menu item hover
- [ ] Button hover states (all variants)
- [ ] Link hover states
- [ ] Input focus states
- [ ] Card hover states

**1.2.2 Contrast Ratio Verification**

Expand contrast audit to include:

**Additional Light Mode Pairs:**
```markdown
| Text Color | Background | Context | WCAG AA (4.5:1) | Actual | Status |
|------------|------------|---------|-----------------|--------|--------|
| --primary | --background | Navigation links | Required | ? | ⚠️ Verify |
| --primary (hover) | --muted | Nav hover state | Required | ? | 🔴 FAIL reported |
| --foreground | --card | Card content | Required | ? | ⚠️ Verify |
| --accent | --card | Accent elements | Required | ? | ⚠️ Verify |
```

**Additional Dark Mode Pairs:**
```markdown
| Text Color | Background | Context | WCAG AA (4.5:1) | Actual | Status |
|------------|------------|---------|-----------------|--------|--------|
| --primary | --background | Navigation links | Required | ? | ⚠️ Verify |
| --primary (hover) | --muted | Nav hover state | Required | ? | 🔴 FAIL reported |
| --foreground | --card | Card content | Required | ? | ⚠️ Verify |
| --muted-foreground | --sidebar | Sidebar text | Required | ? | ⚠️ Verify |
```

**1.2.3 Header Navigation Dark Mode Fix**

**Specific Issue:** Menu item hover in dark mode has poor contrast.

**Investigation Required:**
```bash
# Find header navigation styles
grep -rn "header.*hover\|nav.*hover\|menu.*hover" \
  src/styles/parts/header.css \
  src/app/components/parts/Header.tsx

# Check for hardcoded hover colors
grep -rn "hover:bg-\|hover:text-\|group-hover" \
  src/app/components/parts/Header.tsx
```

**Fix Strategy:**
1. Identify current hover state implementation
2. Replace with CSS variable: `--primary` for light mode, adjusted `--primary` or `--primary-hover` for dark mode
3. Ensure WCAG AA compliance (4.5:1 minimum)
4. Test on actual header navigation component

**1.2.4 Logo Switching Verification**

Verify logo correctly switches between modes:

```css
/* Expected in theme-light.css */
:root {
  --logo-url: url('/assets/logo-dark.svg'); /* Dark logo for light mode */
}

/* Expected in theme-dark.css */
.dark {
  --logo-url: url('/assets/logo-light.svg'); /* Light logo for dark mode */
}
```

**Deliverables:**
- `/reports/2026-03-11-light-dark-mode-comprehensive-audit.md` - Full audit with expanded coverage
- `/reports/2026-03-11-contrast-ratios-wcag.md` - All color pairs tested
- `/reports/2026-03-11-header-navigation-dark-mode-fix.md` - Specific fix plan
- `/tasks/light-dark-mode-fixes.md` - Prioritized task list

---

### 1.3 Organic Redesign Audit

**Prompt:** `/prompts/organic-redesign-audit-prompt.md` (UPDATED)  
**Objective:** Verify organic design implementation aligns with voice/tone, fix light/dark mode issues

#### Enhancements Required:

**1.3.1 Voice & Tone Alignment**

**Organic Site Concept:**
- **Top Zone:** Savanna Sunset (warm oranges, golden yellows)
- **Middle Zone:** Acacia & Clay (sage greens, terracotta)
- **Bottom Zone:** Minimal Earth (creams, soft beiges, muted browns)

**Content Writing Guidelines:**
- **Tone:** Warm, tactile, nature-inspired, approachable
- **Voice:** Organic, authentic, sustainable, culturally respectful
- **Avoid:** Corporate jargon, aggressive sales language, generic travel clichés

**Audit Checklist:**
- [ ] Color palette uses warm, organic tones (not cool blues/grays)
- [ ] Typography uses handwriting fonts (Caveat, Shadows Into Light) for accents
- [ ] Texture overlays present but subtle (5-10% opacity for general, 15-25% for hero)
- [ ] Shapes use soft pebble/blob SVGs (not sharp geometric)
- [ ] Copy feels warm and tactile (not clinical)

**1.3.2 Organic Theme CSS Variables**

Verify organic theme files exist and are properly structured:

**Files to Check:**
```
/src/styles/theme-organic.css (orchestrator)
/src/styles/theme-organic-light.css (light mode organic colors)
/src/styles/theme-organic-dark.css (dark mode organic colors)
/src/styles/theme-organic-texture.css (texture overlays)
/src/styles/theme-organic-shape.css (blob/pebble shapes)
/src/styles/theme-organic-motion.css (WebGL/animation)
/src/styles/theme-organic-wp-presets.css (WordPress preset mapping)
```

**1.3.3 Dark Mode Organic Color Compliance**

Organic dark mode should feel **warm, not cool**:

```css
/* GOOD: Warm dark mode */
.dark {
  --background: hsl(30, 15%, 8%); /* Warm dark brown */
  --card: hsl(30, 12%, 12%); /* Warm dark card */
  --primary: hsl(80, 45%, 60%); /* Warm sage green */
  --accent: hsl(30, 85%, 60%); /* Warm terracotta */
}

/* BAD: Cool dark mode */
.dark {
  --background: hsl(220, 15%, 8%); /* Cool dark blue */
  --card: hsl(220, 12%, 12%); /* Cool dark card */
  --primary: hsl(200, 45%, 60%); /* Cool blue */
}
```

**1.3.4 Organic Section Wrappers**

Verify all pages use organic section wrappers:

```tsx
// GOOD: Organic section wrappers
<section className="organic-section-top">
  <Hero />
</section>
<section className="organic-section-middle">
  <CardGrid />
</section>
<section className="organic-section-bottom">
  <CTA />
</section>

// BAD: Generic section wrappers
<section className="bg-white py-12">
  <Hero />
</section>
```

**Deliverables:**
- `/reports/2026-03-11-organic-redesign-audit.md` - Full organic design audit
- `/reports/2026-03-11-organic-voice-tone-alignment.md` - Content voice/tone review
- `/tasks/organic-redesign-fixes.md` - Fixes for organic implementation

---

### 1.4 Design System Contract Audit

**Prompt:** `/prompts/design-system-contract-audit.md` (UPDATED)  
**Objective:** Verify all CSS and components comply with updated organic design system contracts

#### Enhancements Required:

**1.4.1 Organic Design System Contracts**

Update audit to include organic-specific contracts:

**Contract G: Organic Color Zones**

**Rule:** Page sections must follow the three-zone color palette journey.

**Top Zone (Hero, Header):**
```css
.organic-section-top {
  background: linear-gradient(135deg, 
    var(--organic-savanna-sunset-start) 0%,
    var(--organic-savanna-sunset-end) 100%
  );
}
```

**Middle Zone (Content, Cards):**
```css
.organic-section-middle {
  background-color: var(--organic-acacia-clay);
}
```

**Bottom Zone (CTA, Footer):**
```css
.organic-section-bottom {
  background-color: var(--organic-minimal-earth);
}
```

**Contract H: Organic Typography**

**Rule:** Use handwriting fonts (Caveat, Shadows Into Light) ONLY for accents.

**Allowed:**
```tsx
<p className="font-caveat text-xl">Hand-written accent</p>
<span className="font-shadows text-lg">Decorative flourish</span>
```

**Forbidden:**
```tsx
<h1 className="font-caveat">Main Heading</h1> <!-- Too much -->
<p className="font-shadows">Body paragraph</p> <!-- Illegible -->
```

**Contract I: Texture Overlay Levels**

**Rule:** Three texture levels based on section importance.

**Level 1: Subtle (General)**
```css
.texture-subtle::before {
  background-image: url('/textures/paper-grain.svg');
  opacity: 0.05; /* 5% opacity */
  mix-blend-mode: multiply;
}
```

**Level 2: Medium (Hero)**
```css
.texture-medium::before {
  background-image: url('/textures/canvas-texture.svg');
  opacity: 0.20; /* 20% opacity */
  mix-blend-mode: overlay;
}
```

**Level 3: Rich (Feature Sections)**
```css
.texture-rich::before {
  background-image: url('/textures/botanical-overlay.svg');
  opacity: 0.15; /* 15% opacity */
  mix-blend-mode: soft-light;
}
```

**Deliverables:**
- `/reports/2026-03-11-design-system-contract-audit-organic.md` - Updated audit with organic contracts
- `/tasks/design-system-organic-compliance.md` - Organic compliance fixes

---

## 🧹 PHASE 2: CODE QUALITY AUDITS

### 2.1 Inline Styles Audit

**Prompt:** `/prompts/audit-inline-styles-prompt.md` (REVISED)  
**Objective:** Identify and eliminate ALL inline `style={{}}` attributes

#### Revisions Required:

**2.1.1 Comprehensive Inline Style Scan**

```bash
# Find ALL inline styles
grep -rn "style={{" \
  src/app/ \
  --include="*.tsx" \
  --include="*.ts" \
  | wc -l

# Expected: 0 (target)
```

**2.1.2 Acceptable Exceptions**

Only these uses of `style={{}}` are allowed:

1. **Motion/Framer Motion dynamic values:**
```tsx
<motion.div style={{ y }} /> <!-- ACCEPTABLE -->
```

2. **Dynamic CSS Custom Properties:**
```tsx
<div style={{ '--dynamic-color': color } as React.CSSProperties} /> <!-- ACCEPTABLE -->
```

**2.1.3 Replacement Strategy**

For each inline style found:

**Hardcoded Colors:**
```tsx
// BAD
<div style={{ backgroundColor: 'white', color: '#548235' }}>

// GOOD
<div className="bg-background text-primary">
```

**Hardcoded Spacing:**
```tsx
// BAD
<div style={{ padding: '24px', marginBottom: '16px' }}>

// GOOD
<div className="p-6 mb-4"> <!-- Or better: use gap on parent -->
```

**Hardcoded Fonts:**
```tsx
// BAD
<p style={{ fontFamily: 'Arial', fontSize: '18px' }}>

// GOOD
<p className="font-sans text-lg">
```

**Deliverables:**
- `/reports/2026-03-11-inline-styles-audit.md` - All inline styles found
- `/tasks/inline-styles-elimination.md` - Replacement tasks

---

### 2.2 CSS Preset Validation

**Prompt:** `/prompts/css-preset-validation-prompt.md` (REVISED)  
**Objective:** Ensure all CSS presets use WordPress-aligned variables

#### Revisions Required:

**2.2.1 WordPress Preset Namespace Validation**

Verify all `--wp--preset--*` variables are defined:

```bash
# Check theme-variables.css
grep "wp--preset" src/styles/theme-variables.css | wc -l

# Expected: 50+ preset definitions
```

**2.2.2 Preset-to-Token Mapping**

Ensure WordPress presets reference semantic tokens:

```css
/* GOOD: Presets reference tokens */
--wp--preset--color--primary: var(--primary);
--wp--preset--color--foreground: var(--foreground);

/* BAD: Presets have hardcoded values */
--wp--preset--color--primary: #4A7311; /* Should use var(--primary) */
```

**Deliverables:**
- `/reports/2026-03-11-css-preset-validation.md` - Preset audit results
- `/tasks/css-preset-fixes.md` - Preset mapping fixes

---

### 2.3 CSS Data Integrity Audit

**Prompt:** `/prompts/css-data-integrity-audit.md` (REVISED)  
**Objective:** Ensure CSS files match guidelines documentation

#### Revisions Required:

**2.3.1 Token Value Cross-Reference**

For each design token category, verify docs match code:

**Typography:**
```bash
# Extract from theme-base.css
grep "^\\s*--text-" src/styles/theme-base.css

# Compare to /guidelines/design-tokens/MODERN-TYPOGRAPHY.md
```

**Spacing:**
```bash
# Extract from theme-base.css
grep "^\\s*--spacing-" src/styles/theme-base.css

# Compare to /guidelines/design-tokens/MODERN-SPACING.md
```

**Colors:**
```bash
# Extract from theme-light.css
grep "^\\s*--color-\\|^\\s*--primary\\|^\\s*--secondary" src/styles/theme-light.css

# Compare to /guidelines/design-tokens/colors.md
```

**2.3.2 Identify Documentation Drift**

Create report of mismatches:

```markdown
## Documentation Drift Report

### Typography Mismatches
- **--text-6xl**: Docs say `clamp(2.5rem, 5vw, 4rem)`, Code has `clamp(2.5rem, 4.5vw, 3.75rem)` ← Update docs
- **--text-base**: Docs say `16px`, Code has `clamp(1rem, 1vw, 1.125rem)` ← Update docs

### Spacing Mismatches
- **--spacing-section-lg**: Docs say `clamp(4rem, 10vw, 8rem)`, Code has `clamp(4rem, 8vw, 6rem)` ← Update docs
```

**Deliverables:**
- `/reports/2026-03-11-css-data-integrity-audit.md` - Docs vs. code comparison
- `/tasks/documentation-sync.md` - Doc update tasks

---

### 2.4 File Optimization & Refactoring

**Prompt:** `/prompts/file-optimization-and-refactoring.md` (REVISED)  
**Objective:** Optimize CSS file structure and eliminate duplication

#### Revisions Required:

**2.4.1 CSS File Duplication Scan**

Find duplicate or near-duplicate CSS rules:

```bash
# Find potential duplicates
find src/styles -name "*.css" -exec md5sum {} \; | sort | uniq -w32 -D
```

**2.4.2 CSS File Import Optimization**

Verify proper import order in `/src/styles/index.css`:

**Expected Order:**
1. `fonts.css` (font-face declarations)
2. `tailwind.css` (Tailwind directives)
3. `theme.css` (design tokens orchestrator)
4. `global.css` (WordPress utilities)
5. `sections.css`, `breadcrumbs.css`, `print.css` (layout utilities)
6. `parts/*.css` (header, footer)
7. `templates/*.css` (page templates)
8. `pages/*.css` (page-specific)
9. `patterns/*.css` (patterns)
10. `common/*.css`, `components/*.css` (components)

**2.4.3 Unused CSS Class Detection**

For each CSS file, find classes that are never used:

```bash
# Extract all CSS classes
grep -rh "^\\." src/styles/patterns/*.css | cut -d' ' -f1 | sort -u > /tmp/css-classes.txt

# Search for usage in TSX files
while read class; do
  if ! grep -rq "$class" src/app/; then
    echo "Unused: $class"
  fi
done < /tmp/css-classes.txt
```

**Deliverables:**
- `/reports/2026-03-11-file-optimization-audit.md` - Duplication and unused code
- `/tasks/css-file-optimization.md` - Cleanup and consolidation tasks

---

## 📊 PHASE 3: DATA EXPANSION

### 3.1 Destinations Data Expansion

**Prompt:** `/prompts/destinations-data-expansion-prompt.md` (UPDATED FOR ORGANIC VOICE)  
**Objective:** Expand destinations to 40+ countries, 100+ regions with organic voice/tone

#### Updates Required:

**3.1.1 Organic Voice & Tone Guidelines**

**Voice:** Warm, tactile, nature-inspired, sustainable, authentic  
**Tone:** Approachable, respectful, inspiring (not salesy)

**Writing Style:**
- Use sensory language (warm, textured, vibrant, rich)
- Emphasize sustainability and cultural respect
- Avoid corporate jargon and generic travel clichés
- Focus on authentic experiences and connections

**Examples:**

**Generic Travel Copy (AVOID):**
```
"South Africa is a popular tourist destination with amazing wildlife and beautiful beaches."
```

**Organic Voice Copy (USE):**
```
"Feel the warm African sun on sun-baked savannas where wildlife roams freely. Discover the rhythm of vibrant cultures, the richness of varied landscapes, and the deep connection between land and people."
```

**3.1.2 Continent-Specific Content Guidelines**

**Africa:**
- Emphasize raw natural beauty, wildlife, cultural diversity
- Highlight sustainable tourism and conservation efforts
- Use warm, earthy language (savanna, ochre, terracotta)

**Asia:**
- Balance ancient traditions with modern vibrancy
- Emphasize spiritual journeys and cultural immersion
- Use rich, textured language (silk, spices, jade)

**Europe:**
- Focus on heritage, craftsmanship, timeless beauty
- Highlight sustainable travel and local connections
- Use elegant, refined language (stone, marble, vintage)

**3.1.3 Data Organization**

Maintain file structure from original prompt:

```
/src/app/data/destinations/
├── continents.ts
├── africa.ts (10 countries, 25 regions) ← PRIORITY 1
├── asia.ts (8 countries, 20 regions) ← PRIORITY 2
├── europe.ts (6 countries, 18 regions) ← PRIORITY 3
├── north-america.ts
├── south-america.ts
├── oceania.ts
└── index.ts
```

**Deliverables:**
- 40+ countries with full data (10 countryInfo sections each)
- 100+ regions with accommodation IDs
- All content written in organic voice/tone
- `/guidelines/data/destinations-data-structure.md` (updated)

---

### 3.2 Accommodation Data Expansion

**Prompt:** `/prompts/accommodation-data-expansion-prompt.md` (NEW)  
**Objective:** Expand accommodation data, organize by accommodation type taxonomy

**File Structure:**
```
/src/app/data/accommodation/
├── types.ts (accommodation type taxonomy)
├── hotels.ts
├── lodges.ts
├── camps.ts
├── villas.ts
├── guesthouses.ts
└── index.ts
```

**Accommodation Types:**
- Hotels (luxury, boutique, budget)
- Lodges (safari lodges, eco-lodges)
- Camps (tented camps, mobile camps)
- Villas (private villas, beach villas)
- Guesthouses (B&Bs, homestays)

**Content per Accommodation (minimum 50 total):**
- Name, slug, type, location (destination ID)
- Description (200-300 words, organic voice)
- Highlights (4-6 specific features)
- Facilities (pool, spa, restaurant, WiFi, etc.)
- Room types (3-5 types with descriptions)
- Gallery (6-8 images)
- Related destination IDs
- Related tour IDs
- Price range indicator

**Deliverables:**
- 50+ accommodations organized by type
- `/guidelines/data/accommodation-data-structure.md` (new)

---

### 3.3 Tours Data Expansion

**Prompt:** `/prompts/tours-data-expansion-prompt.md` (NEW)  
**Objective:** Expand tours data, organize by travel style taxonomy

**File Structure:**
```
/src/app/data/tours/
├── styles.ts (travel style taxonomy)
├── adventure.ts
├── wildlife-safari.ts
├── cultural.ts
├── luxury.ts
├── family.ts
├── honeymoon.ts
└── index.ts
```

**Travel Styles:**
- Adventure
- Wildlife Safari
- Cultural
- Luxury
- Family
- Honeymoon
- Wellness
- Photography

**Content per Tour (minimum 60 total):**
- Name, slug, style, destinations
- Description (400-600 words, organic voice)
- Itinerary (7-14 days with daily descriptions)
- Highlights (6-8 experiences)
- Inclusions/Exclusions
- Accommodation IDs
- Gallery (8-12 images)
- Price range
- Difficulty level
- Best time to visit

**Deliverables:**
- 60+ tours organized by travel style
- `/guidelines/data/tours-data-structure.md` (new)

---

### 3.4 Reviews Data Expansion

**Prompt:** `/prompts/reviews-data-expansion-prompt.md` (NEW)  
**Objective:** Create authentic, detailed review data

**Content per Review (minimum 40 total):**
- Reviewer name, avatar, location
- Rating (1-5 stars)
- Review text (150-300 words, organic voice)
- Tour/destination/accommodation reviewed
- Travel date
- Verified badge
- Helpful votes

**Review Voice:**
- Authentic, personal, detailed
- Specific experiences, not generic praise
- Mix of positive and constructive feedback
- Emotional connection to experience

**Deliverables:**
- 40+ authentic reviews
- `/guidelines/data/reviews-data-structure.md` (new)

---

### 3.5 Team Data Expansion

**Prompt:** `/prompts/team-data-expansion-prompt.md` (NEW)  
**Objective:** Create team member profiles for destination specialists

**Content per Team Member (minimum 15 total):**
- Name, role, avatar
- Bio (200-300 words, organic voice)
- Specialties (destinations, travel styles)
- Languages spoken
- Years of experience
- Favorite destination
- Contact info
- Social media links

**Team Roles:**
- Africa Specialists (5 members)
- Asia Specialists (3 members)
- Europe Specialists (2 members)
- Tour Designers (3 members)
- Operations Team (2 members)

**Deliverables:**
- 15+ team members with full profiles
- `/guidelines/data/team-data-structure.md` (new)

---

### 3.6 Blog Data Expansion

**Prompt:** `/prompts/blog-data-expansion-prompt.md` (NEW)  
**Objective:** Create blog posts with organic voice, organized by categories/tags

**File Structure:**
```
/src/app/data/blog/
├── categories.ts
├── tags.ts
├── travel-tips.ts
├── destination-guides.ts
├── wildlife-conservation.ts
├── cultural-insights.ts
└── index.ts
```

**Content per Blog Post (minimum 30 total):**
- Title, slug, category, tags
- Excerpt (120-150 chars)
- Content (800-1200 words, organic voice)
- Featured image
- Gallery (3-5 images)
- Author (team member ID)
- Publish date
- Related destination/tour IDs

**Blog Categories:**
- Travel Tips
- Destination Guides
- Wildlife & Conservation
- Cultural Insights
- Sustainable Travel
- Photography

**Deliverables:**
- 30+ blog posts with full content
- `/guidelines/data/blog-data-structure.md` (new)

---

### 3.7 FAQ Data Expansion

**Prompt:** `/prompts/faq-data-expansion-prompt.md` (NEW)  
**Objective:** Create comprehensive FAQ data for all pages/templates

**FAQ Categories:**
- General Travel
- Booking & Payments
- Destinations (per continent)
- Tours (per travel style)
- Accommodation
- Visas & Documentation
- Health & Safety
- Sustainability

**Content per FAQ Section (minimum 80 total questions):**
- Category name
- Questions (8-12 per category)
- Answers (50-150 words, organic voice)
- Related links

**FAQ Placement:**
- Homepage: General Travel (6-8 questions)
- Tours Archive: Tours (6-8 questions)
- Tour Single: Tour-specific (4-6 questions)
- Destinations Archive: Destinations (6-8 questions)
- Destination Single: Destination-specific (4-6 questions)
- About: General (6-8 questions)
- Contact: Booking & Payments (6-8 questions)

**Deliverables:**
- 80+ FAQ questions organized by category
- `/guidelines/data/faq-data-structure.md` (new)

---

## 🗑️ PHASE 4: ROOT CLEANUP

### 4.1 Root Directory Cleanup

**Prompt:** `/prompts/root-cleanup-orchestrator.md` (UPDATED)  
**Objective:** Clean root directory, remove orphaned files, optimize imports

#### Updates Required:

**4.1.1 Current Root Directory State**

Scan and categorize ALL root files:

```bash
ls -la / | grep -v "^d"
```

**Expected Root Files:**
```
KEEP:
- index.html
- package.json
- pnpm-lock.yaml
- vite.config.ts
- tsconfig.json
- tsconfig.node.json
- .gitignore
- README.md (optional)
- CHANGELOG.md (optional)

MOVE TO /docs/:
- *.md files (except README, CHANGELOG)

DELETE:
- .eslintrc.cjs (if ESLint not installed)
- .prettierrc, .prettierignore (if Prettier not needed)
- .npmrc (may interfere with Figma Make)
- postcss.config.mjs (if empty)
- Any backup files (*-backup.*, *-old.*)
- Any numbered variants (*-2.*, *-3.*)
```

**4.1.2 Orphaned Component Detection**

Find components that are never imported:

```bash
# Find all TSX component files
find src/app/components -name "*.tsx" -type f > /tmp/components.txt

# Check each for imports
while read component; do
  filename=$(basename "$component" .tsx)
  if ! grep -rq "from.*$filename" src/app/ --include="*.tsx" --include="*.ts"; then
    echo "Orphaned: $component"
  fi
done < /tmp/components.txt
```

**4.1.3 Unused CSS File Detection**

Find CSS files that are never imported:

```bash
# Find all CSS files
find src/styles -name "*.css" -type f > /tmp/css-files.txt

# Check each for imports
while read cssfile; do
  filename=$(basename "$cssfile")
  if ! grep -rq "@import.*$filename\|import.*$filename" src/ --include="*.css" --include="*.ts" --include="*.tsx"; then
    echo "Orphaned: $cssfile"
  fi
done < /tmp/css-files.txt
```

**4.1.4 Unused Import Detection**

For each TSX/TS file, find unused imports:

```bash
# This requires TypeScript compiler checks
tsc --noEmit --listFiles 2>&1 | grep "is declared but its value is never read"
```

**Deliverables:**
- `/reports/2026-03-11-root-cleanup-audit.md` - Full cleanup audit
- `/tasks/root-cleanup-tasks.md` - Cleanup task list

---

### 4.2 Root Cleanup Sub-Prompts

Execute sub-prompts from `/prompts/root-cleanup/`:

**4.2.1 Phase 1: Root Files Audit**
**Prompt:** `/prompts/root-cleanup/phase-1-files-audit.md`

**4.2.2 Phase 2: Component Orphans Audit**
**Prompt:** `/prompts/root-cleanup/phase-2-orphans-audit.md`

**4.2.3 Phase 3: Styles Audit**
**Prompt:** `/prompts/root-cleanup/phase-3-styles-audit.md`

**4.2.4 Phase 4: Imports Audit**
**Prompt:** `/prompts/root-cleanup/phase-4-imports-audit.md`

---

## 📋 PHASE 5: CONSOLIDATION & IMPLEMENTATION

### 5.1 Master Report Generation

**Objective:** Consolidate all audit findings into master report

**File:** `/reports/2026-03-11-master-audit-report.md`

**Structure:**

```markdown
# Master Audit Report
**Date:** March 11, 2026

## Executive Summary
- Total files audited: X
- Total violations found: X
- Critical: X | High: X | Medium: X | Low: X
- Estimated effort: X hours

## Phase 1: Design System Audits
### 1.1 Tailwind CSS Audit
- Total Tailwind classes found: X
- Classes needing mapping: X
- Missing CSS variables: X

### 1.2 Light/Dark Mode Audit
- WCAG AA violations: X
- Header navigation issues: X (CRITICAL)
- Logo switching: ✅ or ❌

### 1.3 Organic Redesign Audit
- Voice/tone alignment: X%
- Organic section usage: X%
- Dark mode warmth: ✅ or ❌

### 1.4 Design System Contract Audit
- Contract violations: X
- Critical: X | High: X | Medium: X

## Phase 2: Code Quality Audits
### 2.1 Inline Styles
- Inline style instances: X
- Acceptable exceptions: X
- Replacement needed: X

### 2.2 CSS Presets
- Preset definitions: X
- Preset-to-token mapping: X%

### 2.3 CSS Data Integrity
- Documentation drift: X mismatches

### 2.4 File Optimization
- Duplicate CSS files: X
- Unused CSS classes: X
- Unused imports: X

## Phase 3: Data Expansion
- Destinations: X countries, X regions
- Accommodation: X properties
- Tours: X tours
- Reviews: X reviews
- Team: X members
- Blog: X posts
- FAQs: X questions

## Phase 4: Root Cleanup
- Root files cleaned: X
- Orphaned components: X
- Orphaned CSS files: X
- Unused imports: X

## Priority Summary
### P0 (Critical - Fix Immediately)
- [ ] Task 1
- [ ] Task 2

### P1 (High - Fix Soon)
- [ ] Task 1
- [ ] Task 2

### P2 (Medium - Fix After Core)
- [ ] Task 1
- [ ] Task 2

### P3 (Low - Nice to Have)
- [ ] Task 1
- [ ] Task 2
```

---

### 5.2 Master Task List Generation

**Objective:** Create comprehensive, phased task list

**File:** `/tasks/2026-03-11-master-task-list.md`

**Structure:**

```markdown
# Master Task List
**Date:** March 11, 2026
**Generated From:** Master Audit Report

## Phase 1A: Critical Violations (Week 1)
**Objective:** Fix blocking issues

- [ ] **CRITICAL:** Eliminate all `dark:` Tailwind classes (X files)
  - Files: [list]
  - Effort: X hours
  - Assignee: [name]

- [ ] **CRITICAL:** Fix header navigation dark mode contrast
  - File: /src/app/components/parts/Header.tsx
  - Effort: 2 hours
  - Assignee: [name]

## Phase 1B: High Priority Design System (Week 1-2)
**Objective:** Establish CSS variable foundation

- [ ] Create missing CSS variables (X variables)
  - File: /src/styles/theme-base.css
  - Effort: 4 hours

- [ ] Map Tailwind classes to WordPress CSS classes (X mappings)
  - Files: /src/styles/global.css, /src/styles/wordpress-classes.css
  - Effort: 8 hours

## Phase 2: Code Quality Cleanup (Week 2-3)
**Objective:** Eliminate inline styles, optimize files

- [ ] Eliminate inline styles (X instances)
  - Files: [list]
  - Effort: X hours

- [ ] Remove orphaned components (X files)
  - Files: [list]
  - Effort: 2 hours

## Phase 3: Data Expansion (Week 3-4)
**Objective:** Create comprehensive mock data

- [ ] Expand destinations (Africa: 10 countries, 25 regions)
  - Effort: 15 hours

- [ ] Expand accommodation (50 properties)
  - Effort: 8 hours

- [ ] Expand tours (60 tours)
  - Effort: 12 hours

## Phase 4: Documentation & Guidelines (Week 4-5)
**Objective:** Update all guidelines to match code

- [ ] Update design token guidelines (5 files)
  - Effort: 6 hours

- [ ] Create data structure guidelines (7 files)
  - Effort: 8 hours

## Phase 5: Testing & Validation (Week 5)
**Objective:** Verify all changes, test compliance

- [ ] Visual regression testing (all breakpoints)
  - Effort: 4 hours

- [ ] WCAG AA compliance verification
  - Effort: 3 hours

- [ ] Design system compliance scorecard
  - Effort: 2 hours
```

---

### 5.3 Update Master Task List

**File:** `/tasks/task-list.md`

Add all new tasks from master task list:

```markdown
# Master Task List
**Last Updated:** March 11, 2026

## Active Projects

### Comprehensive Audit & Refactor (March 2026)
- [ ] Phase 1A: Critical Violations
- [ ] Phase 1B: High Priority Design System
- [ ] Phase 2: Code Quality Cleanup
- [ ] Phase 3: Data Expansion
- [ ] Phase 4: Documentation & Guidelines
- [ ] Phase 5: Testing & Validation

See: `/tasks/2026-03-11-master-task-list.md` for details
```

---

## ✅ SUCCESS CRITERIA

### Design System Compliance
- [ ] **0** `dark:` Tailwind classes in codebase
- [ ] **0** inline `style={{}}` attributes (except motion/dynamic CSS vars)
- [ ] **0** hardcoded colors outside theme files
- [ ] **0** hardcoded fonts outside theme files
- [ ] **100%** WCAG AA compliance (all color pairs)
- [ ] **100%** CSS variable usage for all styling

### Code Quality
- [ ] **0** orphaned components
- [ ] **0** orphaned CSS files
- [ ] **0** unused imports
- [ ] **≤10** files in root directory
- [ ] **100%** documentation-code alignment

### Data Completeness
- [ ] **40+** countries with full data
- [ ] **100+** regions with full data
- [ ] **50+** accommodations
- [ ] **60+** tours
- [ ] **40+** reviews
- [ ] **15+** team members
- [ ] **30+** blog posts
- [ ] **80+** FAQ questions

### Organic Design Implementation
- [ ] **100%** organic voice/tone in all content
- [ ] **100%** organic section wrappers on all pages
- [ ] **Warm** dark mode (not cool blues/grays)
- [ ] **Proper** three-zone color journey (Savanna Sunset → Acacia & Clay → Minimal Earth)

---

## 📊 EXECUTION TIMELINE

### Week 1: Critical Fixes
- Execute Phase 1 audits (Tailwind, Light/Dark, Organic, Design System)
- Fix critical violations (dark: classes, header nav contrast)
- Generate audit reports

### Week 2: High Priority Refactoring
- Create missing CSS variables
- Map Tailwind to WordPress classes
- Execute Phase 2 audits (Inline Styles, Presets, Data Integrity, Optimization)

### Week 3: Data Expansion (Part 1)
- Expand destinations (Africa, Asia)
- Expand accommodation
- Execute Phase 4 audits (Root Cleanup)

### Week 4: Data Expansion (Part 2)
- Expand tours, reviews, team
- Expand blog posts, FAQs
- Create data structure guidelines

### Week 5: Consolidation & Testing
- Generate master report
- Create master task list
- Visual regression testing
- WCAG AA compliance verification
- Design system compliance scorecard

**Total Estimated Effort:** 80-100 hours

---

## 📖 DELIVERABLES SUMMARY

### Reports (20 files in `/reports/`)
1. `2026-03-11-tailwind-audit-comprehensive.md`
2. `2026-03-11-wordpress-css-variable-mapping.md`
3. `2026-03-11-missing-css-variables.md`
4. `2026-03-11-light-dark-mode-comprehensive-audit.md`
5. `2026-03-11-contrast-ratios-wcag.md`
6. `2026-03-11-header-navigation-dark-mode-fix.md`
7. `2026-03-11-organic-redesign-audit.md`
8. `2026-03-11-organic-voice-tone-alignment.md`
9. `2026-03-11-design-system-contract-audit-organic.md`
10. `2026-03-11-inline-styles-audit.md`
11. `2026-03-11-css-preset-validation.md`
12. `2026-03-11-css-data-integrity-audit.md`
13. `2026-03-11-file-optimization-audit.md`
14. `2026-03-11-root-cleanup-audit.md`
15. `2026-03-11-master-audit-report.md`

### Tasks (10 files in `/tasks/`)
1. `tailwind-replacement-tasks.md`
2. `light-dark-mode-fixes.md`
3. `organic-redesign-fixes.md`
4. `design-system-organic-compliance.md`
5. `inline-styles-elimination.md`
6. `css-preset-fixes.md`
7. `documentation-sync.md`
8. `css-file-optimization.md`
9. `root-cleanup-tasks.md`
10. `2026-03-11-master-task-list.md`

### Guidelines (15 new/updated files in `/guidelines/`)
1. `/guidelines/css-architecture/tailwind-wordpress-mapping.md` (new)
2. `/guidelines/data/destinations-data-structure.md` (updated)
3. `/guidelines/data/accommodation-data-structure.md` (new)
4. `/guidelines/data/tours-data-structure.md` (new)
5. `/guidelines/data/reviews-data-structure.md` (new)
6. `/guidelines/data/team-data-structure.md` (new)
7. `/guidelines/data/blog-data-structure.md` (new)
8. `/guidelines/data/faq-data-structure.md` (new)
9. Other existing guidelines updated as needed

### Data Files (100+ files in `/src/app/data/`)
- Destinations: 7 files (continents + 6 continent data files)
- Accommodation: 6 files (types + 5 type data files)
- Tours: 9 files (styles + 8 style data files)
- Reviews: 1 file
- Team: 1 file
- Blog: 6 files (categories/tags + 4 category data files)
- FAQ: 1 file

---

## 🚀 EXECUTION INSTRUCTIONS

### For AI Assistant:

1. **Read this orchestrator prompt completely**
2. **Confirm understanding of all 5 phases**
3. **Execute Phase 1.1**: Tailwind CSS Comprehensive Audit
   - Generate `/reports/2026-03-11-tailwind-audit-comprehensive.md`
   - Generate `/reports/2026-03-11-wordpress-css-variable-mapping.md`
   - Generate `/reports/2026-03-11-missing-css-variables.md`
   - Generate `/tasks/tailwind-replacement-tasks.md`
4. **Execute Phase 1.2**: Light & Dark Mode Comprehensive Audit
   - Generate reports and tasks
5. **Continue through all phases sequentially**
6. **Generate master report at Phase 5.1**
7. **Generate master task list at Phase 5.2**
8. **Update `/tasks/task-list.md` at Phase 5.3**

### For Developer:

1. **Review master audit report** (`/reports/2026-03-11-master-audit-report.md`)
2. **Review master task list** (`/tasks/2026-03-11-master-task-list.md`)
3. **Prioritize critical fixes** (P0 tasks)
4. **Execute tasks in phased order**
5. **Test after each phase completion**
6. **Update task list with progress**

---

**Status:** Ready to Execute  
**Version:** 1.0.0  
**Date:** March 11, 2026  
**Estimated Total Effort:** 80-100 hours  
**Estimated Timeline:** 5 weeks
