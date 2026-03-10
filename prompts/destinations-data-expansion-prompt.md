# Prompt: Expand Destinations Data & Update Guidelines

## Context

The LightSpeed Tour Operator prototype has destination templates (Country, Region, Archive) that require comprehensive mock data across multiple continents and improved guidelines. The current data structure has all destinations in a single file, which needs to be reorganized by taxonomy (continents), content types (countries), and hierarchical regions (cities, towns, provinces, parks).

## Current State

### Existing Files
- `/src/app/data/destinations.ts` - All destinations in one file (16 destinations)
- `/src/app/data/types.ts` - Destination interface defined
- `/guidelines/templates/destination-templates.md` - Template guidelines exist
- `/guidelines/patterns/ReviewCard.md` - Pattern guidelines exist
- `/guidelines/patterns/TeamMemberCard.md` - Pattern guidelines exist

### Current Destination Types
- **Countries:** South Africa, Tanzania, Botswana, Kenya, Namibia
- **Regions/Cities:** Cape Town, Zanzibar, Victoria Falls, Kruger, Serengeti, Masai Mara, Okavango Delta, Amboseli, Etosha, Sossusvlei, Chobe

### Templates
- **DestinationCountryPage** - 11 sections including 10 country info cards
- **DestinationRegionPage** - 11 sections including accommodation section
- **DestinationsArchiveEnhanced** - Featured countries + regions + filtering
- **DestinationRouter** - Smart routing by destination type

## Required Work

### Phase 1: Data Structure Reorganization

**Goal:** Split destinations data into logical, maintainable files by taxonomy and hierarchy.

#### 1.1 Create Continent Taxonomy Files

Create separate files for each continent with proper taxonomy structure:

**File Structure:**
```
/src/app/data/destinations/
├── continents.ts           # Continent taxonomy definitions
├── africa.ts               # African countries & regions
├── asia.ts                 # Asian countries & regions
├── europe.ts               # European countries & regions
├── north-america.ts        # North American countries & regions
├── south-america.ts        # South American countries & regions
├── oceania.ts              # Oceania countries & regions
└── index.ts                # Barrel export file
```

**Continents Taxonomy (`continents.ts`):**
```typescript
export const CONTINENTS = [
  {
    id: "continent-africa",
    slug: "africa",
    name: "Africa",
    description: "The cradle of humankind offers unparalleled wildlife, diverse cultures, and dramatic landscapes.",
    countryCount: 10,
    regionCount: 25,
  },
  {
    id: "continent-asia",
    slug: "asia",
    name: "Asia",
    description: "Ancient civilizations, spiritual diversity, and breathtaking natural beauty from Himalayas to tropical islands.",
    countryCount: 8,
    regionCount: 20,
  },
  // Add Europe, North America, South America, Oceania
];
```

#### 1.2 Create Country Data Files by Continent

Each continent file should contain:
- **Countries** (type: "country") with full data including:
  - All 10 countryInfo sections (banking, climate, cuisine, electricity, dress, health, safety, transport, visa, currency)
  - 6-8 highlights
  - 8-10 experiences
  - 3-5 videos
  - 4-8 gallery images
  - Related content IDs
  - Dedicated consultant ID

- **Regions** (type: "region" | "city" | "park" | "province") with full data including:
  - Parent country reference
  - 4-6 highlights
  - 6-8 experiences
  - 2-4 videos
  - 4-6 gallery images
  - Accommodation IDs (required for regions)
  - Related content IDs

#### 1.3 Required Destinations to Create

**Africa (expand to 10 countries, 25 regions):**

*Countries (add 5 more):*
- South Africa ✅ (existing, enhance)
- Tanzania ✅ (existing, add countryInfo)
- Botswana ✅ (existing, add countryInfo)
- Kenya ✅ (existing, add countryInfo)
- Namibia ✅ (existing, add countryInfo)
- **Zimbabwe** (new - add full data)
- **Zambia** (new - add full data)
- **Rwanda** (new - add full data)
- **Uganda** (new - add full data)
- **Morocco** (new - add full data)

*Regions (expand to 25 total):*

**South Africa regions:**
- Cape Town ✅ (existing, enhance)
- Kruger ✅ (existing, enhance with accommodation)
- **Johannesburg** (new - city)
- **Garden Route** (new - region)
- **Winelands** (new - region)
- **Durban** (new - city)

**Tanzania regions:**
- Zanzibar ✅ (existing, enhance)
- Serengeti ✅ (existing, enhance)
- **Ngorongoro** (new - park)
- **Arusha** (new - city)
- **Stone Town** (new - town)

**Kenya regions:**
- Masai Mara ✅ (existing, enhance)
- Amboseli ✅ (existing, enhance)
- **Nairobi** (new - city)
- **Diani Beach** (new - region)
- **Samburu** (new - park)

**Botswana regions:**
- Okavango Delta ✅ (existing, enhance)
- Chobe ✅ (existing, enhance)
- **Makgadikgadi Pans** (new - park)

**Namibia regions:**
- Etosha ✅ (existing, enhance)
- Sossusvlei ✅ (existing, enhance)
- **Skeleton Coast** (new - region)
- **Swakopmund** (new - town)

**Zimbabwe regions:**
- Victoria Falls ✅ (existing, enhance - move to Zimbabwe parent)
- **Hwange National Park** (new - park)

**Additional:**
- **Livingstone, Zambia** (new - town, Victoria Falls access)
- **Kigali, Rwanda** (new - city)
- **Marrakech, Morocco** (new - city)

**Asia (add 8 countries, 20 regions):**

*Countries:*
- **Thailand** (full data with countryInfo)
- **Vietnam** (full data with countryInfo)
- **Japan** (full data with countryInfo)
- **Indonesia** (full data with countryInfo)
- **India** (full data with countryInfo)
- **Sri Lanka** (full data with countryInfo)
- **Nepal** (full data with countryInfo)
- **Cambodia** (full data with countryInfo)

*Regions (3-4 per country):*
- Bangkok, Phuket, Chiang Mai (Thailand)
- Hanoi, Ho Chi Minh City, Halong Bay (Vietnam)
- Tokyo, Kyoto, Osaka (Japan)
- Bali, Jakarta, Komodo (Indonesia)
- Delhi, Rajasthan, Kerala, Goa (India)
- Colombo, Kandy, Galle (Sri Lanka)
- Kathmandu, Pokhara (Nepal)
- Siem Reap, Phnom Penh (Cambodia)

**Europe (add 6 countries, 18 regions):**

*Countries:*
- **Italy** (full data)
- **France** (full data)
- **Spain** (full data)
- **Greece** (full data)
- **Iceland** (full data)
- **Croatia** (full data)

*Regions (3 per country):*
- Rome, Florence, Venice (Italy)
- Paris, Provence, French Riviera (France)
- Barcelona, Madrid, Seville (Spain)
- Athens, Santorini, Crete (Greece)
- Reykjavik, Golden Circle, South Coast (Iceland)
- Dubrovnik, Split, Plitvice (Croatia)

**Other Continents:**
- North America: USA, Canada, Mexico + regions
- South America: Peru, Brazil, Argentina, Chile + regions
- Oceania: Australia, New Zealand + regions

**Target Total:** 40+ countries, 100+ regions

---

### Phase 2: Content Quality Requirements

#### 2.1 Country Destinations (type: "country")

**Required Fields & Quality Standards:**

**Basic Fields:**
- `excerpt`: 120-150 chars, compelling hook, unique selling proposition
- `content`: 300-500 words, 3 paragraphs:
  - Paragraph 1: Overview and main attractions
  - Paragraph 2: Experiences and what to expect
  - Paragraph 3: Cultural/historical significance
- `highlights`: 6-8 specific, concrete bullet points (not generic)
- `experiences`: 8-10 activities, 2-3 words each, mix active and cultural

**Country Info (10 sections, 2-3 sentences each):**
1. **Banking:** Banks, ATMs, credit cards, currency exchange tips
2. **Climate:** Regional variations, temperatures by season, what to pack
3. **Cuisine:** Traditional dishes, dining scene, food experiences, specialties
4. **Electricity:** Voltage, plug types, adapter needs, power reliability
5. **Dress:** What to pack for activities, cultural considerations, weather layers
6. **Health:** Vaccinations, malaria, water safety, medical facilities, insurance
7. **Safety:** Practical tips, common concerns, what to avoid, emergency contacts
8. **Transport:** Roads, car rental, flights, taxis, public transport, driving side
9. **Visa:** Entry requirements, passport validity, visa-free countries, documentation
10. **Currency:** Denominations, exchange, credit cards, tipping customs

**Media:**
- `videos`: 3-5 videos with unique IDs, titles, placeholder URLs
- `gallery`: 6-8 Unsplash images (1200x800 min)

**Relations:**
- `tourIds`: 3-6 tour IDs
- `relatedSpecialIds`: 1-3 special IDs
- `relatedBlogIds`: 2-4 blog post IDs
- `relatedReviewIds`: 3-5 review IDs
- `dedicatedConsultantId`: 1 team member ID (required)

#### 2.2 Region Destinations (type: "region" | "city" | "park")

**Required Fields & Quality Standards:**

**Basic Fields:**
- `excerpt`: 120-150 chars, what makes this region unique
- `content`: 200-400 words, 2-3 paragraphs
- `parentId`: Reference to country destination (required)
- `highlights`: 4-6 specific attractions/experiences
- `experiences`: 6-8 activities, location-specific

**Media:**
- `videos`: 2-4 videos with unique IDs
- `gallery`: 4-6 Unsplash images

**Accommodation:**
- `accommodationIds`: 2-6 accommodation IDs (required for regions)

**Relations:**
- `tourIds`: 2-4 tour IDs
- `relatedSpecialIds`: 0-2 special IDs (optional)
- `relatedBlogIds`: 1-2 blog post IDs
- `relatedReviewIds`: 2-4 review IDs
- `dedicatedConsultantId`: 1 team member ID (optional but recommended)

#### 2.3 Content Writing Standards

**Tone:**
- Professional yet approachable
- Informative without being encyclopedic
- Enthusiastic but not hyperbolic
- Culturally respectful

**Style:**
- Active voice preferred
- Concrete specifics over generalities
- Mix practical info with inspiration
- Avoid clichés ("hidden gem", "off the beaten path")

**Accuracy:**
- Research actual facts (climate, currency, languages)
- Use real place names and attractions
- Accurate best times to visit
- Realistic travel logistics

**Unsplash Images:**
- Use search terms: "{destination name} landscape"
- Example: "Cape Town Table Mountain", "Serengeti wildlife", "Tokyo skyline"
- Verify images load correctly
- Use high-quality images (1200x800 minimum)

---

### Phase 3: Guidelines Updates

#### 3.1 Update Existing Guidelines

**File:** `/guidelines/templates/destination-templates.md`

**Updates Needed:**
- [ ] Add data file structure section (new organization)
- [ ] Update import examples (from continent files)
- [ ] Add content for all 3 destination types (country, region, city)
- [ ] Expand data requirements section
- [ ] Add examples for each continent
- [ ] Update WordPress mapping for hierarchical data
- [ ] Add migration guide from old structure

**File:** `/guidelines/patterns/ReviewCard.md`

**Updates Needed:**
- [ ] Verify design system compliance section is complete
- [ ] Add more use case examples (destination pages)
- [ ] Ensure CSS variable references are accurate
- [ ] Add dark mode examples

**File:** `/guidelines/patterns/TeamMemberCard.md`

**Updates Needed:**
- [ ] Verify design system compliance section is complete
- [ ] Add destination specialist use case
- [ ] Ensure CSS variable references are accurate
- [ ] Add examples with/without contact info

#### 3.2 Create New Guidelines

**Create:** `/guidelines/data/destinations-data-structure.md`

**Content:**
- Data file organization (continents, countries, regions)
- Destination interface documentation
- Field-by-field requirements and examples
- Content writing guidelines
- Unsplash image sourcing
- Data validation rules
- Hierarchy and relationships (parent/child)
- Testing data quality

**Create:** `/guidelines/blocks/destination-info-cards.md`

**Content:**
- Country info card block documentation
- 10 card types with icons
- Props and styling
- BEM CSS structure
- Use in DestinationCountryPage
- Design system compliance
- Accessibility requirements

**Create:** `/guidelines/parts/destination-fast-facts.md`

**Content:**
- Fast Facts sidebar documentation
- Fields displayed
- Sticky behavior
- Responsive layout
- Design system compliance
- Use in Country and Region pages

**Optional:** `/guidelines/patterns/destination-card.md`

**Content:**
- Destination card pattern (used in archives)
- Overlay card variant (featured countries)
- Standard card variant (featured regions)
- List view variant
- Props and variations
- Design system compliance

#### 3.3 Update Related Guidelines

**Review and update if needed:**
- `/guidelines/patterns/hero-patterns.md` - Add destination hero examples
- `/guidelines/patterns/card-grid-patterns.md` - Add destination card examples
- `/guidelines/components/Container.md` - Ensure accurate
- `/guidelines/icons/travel.md` - Add country info icons (if missing)

---

### Phase 4: Design System Compliance

**All destinations data, components, and guidelines MUST follow these rules:**

#### 4.1 CSS Variables Only

**Required:**
- ✅ All colors via CSS custom properties from `/src/styles/global.css`
- ✅ Use semantic tokens: `var(--card)`, `var(--primary)`, `var(--muted-foreground)`
- ✅ Section backgrounds: `bg-background`, `bg-muted`, `bg-accent`, `bg-card`
- ✅ Borders: `border-border`
- ✅ Text colors: `text-foreground`, `text-muted-foreground`, `text-primary`

**Forbidden:**
- ❌ NO hardcoded colors: `#548235`, `white`, `black`, `rgb()`, `hsl()`
- ❌ NO color names: `green`, `blue`, `red`

#### 4.2 Typography - Approved Fonts Only

**Required:**
- ✅ Headings (H1-H6): Lora (serif) via `var(--font-family-lora)` or Tailwind `font-serif`
- ✅ Body text: Noto Sans (sans-serif) via `var(--font-family-noto-sans)` or Tailwind `font-sans`
- ✅ Code: Courier New (monospace) via `var(--font-family-courier-new)` or Tailwind `font-mono`
- ✅ Semantic HTML: Use `<h1>`, `<h2>`, `<p>` without Tailwind text classes
- ✅ Font weights: `var(--font-weight-normal)`, `var(--font-weight-medium)`, `var(--font-weight-semibold)`, `var(--font-weight-bold)`

**Forbidden:**
- ❌ NO other fonts: Arial, Helvetica, Times New Roman, Georgia, Verdana, system fonts
- ❌ NO hardcoded font families: `font-family: "SomeFont"`
- ❌ NO Tailwind text size classes unless intentionally overriding: `text-2xl`, `text-lg`

#### 4.3 Spacing & Layout

**Required:**
- ✅ Section padding: `py-section-md` or `py-section-lg`
- ✅ Gaps: `gap-4`, `gap-6`, `gap-8`
- ✅ Fluid spacing: `var(--spacing-section-md)`, `var(--spacing-gap-lg)`
- ✅ Container: Use `<Container>` component for width constraints

#### 4.4 No Inline Styles

**Required:**
- ✅ All styling via Tailwind classes or external CSS files
- ✅ Custom CSS in separate `.css` files
- ✅ BEM naming convention for custom CSS

**Forbidden:**
- ❌ NO inline styles: `style={{ backgroundColor: 'white' }}`
- ❌ NO style props in JSX

#### 4.5 Dark Mode

**Required:**
- ✅ Use CSS variables that automatically adapt
- ✅ Use `.dark` selector in CSS files for dark mode overrides
- ✅ Test both light and dark modes

**Forbidden:**
- ❌ NO `dark:` Tailwind classes: `dark:bg-slate-800`, `dark:text-white`

---

### Phase 5: File Organization & Updates

#### 5.1 Update Import Statements

**Current (deprecated):**
```typescript
import { DESTINATIONS } from "../data/mock";
```

**New (organized by continent):**
```typescript
import { DESTINATIONS } from "../data/destinations";
// or specific continent
import { AFRICA_DESTINATIONS } from "../data/destinations/africa";
import { ASIA_DESTINATIONS } from "../data/destinations/asia";
```

#### 5.2 Update Mock Data Barrel File

**File:** `/src/app/data/mock.ts`

Update to import from new destination structure:
```typescript
// Destinations - organized by continent
export * from "./destinations";
export * from "./destinations/continents";
```

#### 5.3 Create Index File

**File:** `/src/app/data/destinations/index.ts`

```typescript
import { CONTINENTS } from "./continents";
import { AFRICA_DESTINATIONS } from "./africa";
import { ASIA_DESTINATIONS } from "./asia";
import { EUROPE_DESTINATIONS } from "./europe";
// ... other continents

// Combine all destinations
export const DESTINATIONS = [
  ...AFRICA_DESTINATIONS,
  ...ASIA_DESTINATIONS,
  ...EUROPE_DESTINATIONS,
  // ... other continents
];

export { CONTINENTS };

// Helper functions
export function getDestination(slug: string) {
  return DESTINATIONS.find(d => d.slug === slug);
}

export function getDestinationsByContinent(continentId: string) {
  return DESTINATIONS.filter(d => d.continentId === continentId);
}

export function getCountries() {
  return DESTINATIONS.filter(d => d.type === "country");
}

export function getRegions() {
  return DESTINATIONS.filter(d => d.type !== "country");
}

export function getChildDestinations(parentId: string) {
  return DESTINATIONS.filter(d => d.parentId === parentId);
}
```

---

### Phase 6: Testing & Validation

#### 6.1 Data Validation

Create validation checks for:
- [ ] All countries have 10 countryInfo sections
- [ ] All regions have parentId
- [ ] All regions have accommodationIds
- [ ] All destinations have required fields
- [ ] All image URLs are valid
- [ ] All relation IDs reference existing items
- [ ] No duplicate slugs
- [ ] Excerpt length 120-150 chars
- [ ] Content length 200-500 words

#### 6.2 Template Testing

Test all templates with new data:
- [ ] `/destinations` - Archive loads all destinations
- [ ] `/destinations/{country-slug}` - Country page with 11 sections
- [ ] `/destinations/{region-slug}` - Region page with 11 sections
- [ ] Featured sections show correct destinations
- [ ] Filtering works by continent and type
- [ ] Search filters correctly
- [ ] Pagination works
- [ ] Empty states appear when appropriate

#### 6.3 Design System Testing

Verify compliance:
- [ ] All colors use CSS variables
- [ ] Only Lora, Noto Sans, Courier New fonts
- [ ] No inline styles anywhere
- [ ] No dark: classes
- [ ] BEM naming in custom CSS
- [ ] Semantic HTML throughout
- [ ] Light and dark modes work
- [ ] Responsive layouts work

---

## Deliverables Checklist

### Data Files
- [ ] `/src/app/data/destinations/continents.ts` - Continent taxonomy
- [ ] `/src/app/data/destinations/africa.ts` - 10 countries, 25 regions
- [ ] `/src/app/data/destinations/asia.ts` - 8 countries, 20 regions
- [ ] `/src/app/data/destinations/europe.ts` - 6 countries, 18 regions
- [ ] `/src/app/data/destinations/north-america.ts` - Countries and regions
- [ ] `/src/app/data/destinations/south-america.ts` - Countries and regions
- [ ] `/src/app/data/destinations/oceania.ts` - Countries and regions
- [ ] `/src/app/data/destinations/index.ts` - Barrel export with helpers

### Guidelines
- [ ] `/guidelines/templates/destination-templates.md` - Updated with new structure
- [ ] `/guidelines/patterns/ReviewCard.md` - Verified and enhanced
- [ ] `/guidelines/patterns/TeamMemberCard.md` - Verified and enhanced
- [ ] `/guidelines/data/destinations-data-structure.md` - NEW comprehensive data guide
- [ ] `/guidelines/blocks/destination-info-cards.md` - NEW country info cards
- [ ] `/guidelines/parts/destination-fast-facts.md` - NEW fast facts sidebar
- [ ] `/guidelines/patterns/destination-card.md` - OPTIONAL card pattern

### Updated Files
- [ ] `/src/app/data/mock.ts` - Updated imports
- [ ] `/src/app/data/types.ts` - Verified Destination interface
- [ ] Verify all templates work with new data structure

---

## Quality Standards

### Content Quality
- Professional, accurate, well-researched
- Specific details, not generic descriptions
- Appropriate tone and cultural sensitivity
- Proper grammar and spelling

### Code Quality
- TypeScript types for all data
- Consistent naming conventions
- Proper file organization
- Clean, readable code

### Design System
- 100% CSS custom properties
- Only approved fonts (Lora, Noto Sans, Courier New)
- BEM naming for custom CSS
- No inline styles
- No dark: classes
- Semantic HTML

### Documentation
- Comprehensive guidelines
- Clear examples
- Testing checklists
- Common issues addressed

---

## Success Criteria

**Data:**
- ✅ 40+ countries with complete data
- ✅ 100+ regions with complete data
- ✅ All countries have 10 countryInfo sections
- ✅ All regions have accommodation IDs
- ✅ Organized by continent for maintainability

**Guidelines:**
- ✅ Templates guideline updated
- ✅ Data structure guideline created
- ✅ Block/part guidelines created
- ✅ All examples use design system

**Compliance:**
- ✅ 100% CSS variables usage
- ✅ Only approved fonts
- ✅ No inline styles
- ✅ No dark: classes
- ✅ BEM naming

**Testing:**
- ✅ All routes work with new data
- ✅ Filtering and search work
- ✅ Light and dark modes work
- ✅ Responsive layouts work

---

## Notes

- Prioritize Africa and Asia first (tourism focus)
- Use realistic, researched content (not generic)
- Ensure all Unsplash images are high quality
- Test templates with new data structure
- Maintain backward compatibility during migration
- Focus on user experience - content should inspire travel

---

**Total Estimated Work:**
- Data creation: 40+ countries, 100+ regions (~15-20 hours)
- Guidelines creation/updates: 6-8 documents (~8-10 hours)
- Testing and validation: (~2-3 hours)
- **Total: ~25-33 hours of work**

**Priority:**
1. Africa expansion (highest priority - core market)
2. Asia expansion (secondary priority)
3. Europe, Americas, Oceania (tertiary)
4. Guidelines updates (parallel with data creation)
5. Testing and validation (final phase)
