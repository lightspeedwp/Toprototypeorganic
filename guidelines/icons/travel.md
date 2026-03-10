# Travel Icons

## Purpose

This document catalogs **travel-related icons** from lucide-react that are approved for use in the LightSpeed Tour Operator plugin prototype.

---

## CRITICAL: Verification Required

**BEFORE using ANY icon listed here, you MUST verify it exists:**

```bash
grep "IconName" node_modules/lucide-react/dist/esm/icons/index.js
```

Icon names may change between lucide-react versions. Always verify before importing.

---

## Destination & Location Icons

### Primary Location Icons

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| 📍 | `MapPin` | Location markers, destination indicators | `grep "MapPin"` |
| 🌍 | `Globe` | International destinations, world travel | `grep "Globe"` |
| 🗺️ | `Map` | Maps, route planning, geography | `grep "Map\"" ` |
| 🧭 | `Compass` | Navigation, discovery, exploration | `grep "Compass"` |

**Example Usage:**
```typescript
import { MapPin, Globe, Map, Compass } from "lucide-react";

<div className="flex items-center gap-2">
  <MapPin className="w-4 h-4 text-muted-foreground" />
  <span>Reykjavik, Iceland</span>
</div>
```

---

### Geographic Features

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| ⛰️ | `Mountain` | Mountain destinations, hiking | `grep "Mountain"` |
| 🌊 | `Waves` | Ocean, beach, coastal destinations | `grep "Waves"` |
| 🏞️ | `TreePine` | Forest, nature, wilderness | `grep "TreePine"` |
| 🌲 | `Trees` | Woodland, parks | `grep "Trees"` |

**Example Usage:**
```typescript
import { Mountain, Waves } from "lucide-react";

<div className="flex gap-2">
  <Mountain className="w-5 h-5 text-primary" />
  <Waves className="w-5 h-5 text-accent" />
</div>
```

---

## Transportation Icons

### Air Travel

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| ✈️ | `Plane` | Flights, air travel | `grep "Plane\"" ` |
| 🛫 | `PlaneTakeoff` | Departure information | `grep "PlaneTakeoff"` |
| 🛬 | `PlaneLanding` | Arrival information | `grep "PlaneLanding"` |

**Example Usage:**
```typescript
import { Plane, PlaneTakeoff } from "lucide-react";

<div className="flex items-center gap-2 text-sm text-muted-foreground">
  <Plane className="w-4 h-4" />
  <span>Flight included</span>
</div>
```

---

### Ground Transportation

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| 🚌 | `Bus` | Bus tours, ground transport | `grep "Bus\"" ` |
| 🚗 | `Car` | Car rental, road trips | `grep "Car\"" ` |
| 🚂 | `Train` | Train travel, rail journeys | `grep "Train"` |

**Example Usage:**
```typescript
import { Bus, Car } from "lucide-react";

<div className="flex gap-4">
  <div className="flex items-center gap-1">
    <Bus className="w-4 h-4" />
    <span>Coach travel</span>
  </div>
  <div className="flex items-center gap-1">
    <Car className="w-4 h-4" />
    <span>Car rental</span>
  </div>
</div>
```

---

### Water Transportation

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| ⛴️ | `Ship` | Cruises, ferries | `grep "Ship\"" ` |
| 🛥️ | `Sailboat` | Sailing, yacht trips | `grep "Sailboat"` |

**Example Usage:**
```typescript
import { Ship } from "lucide-react";

<div className="flex items-center gap-2">
  <Ship className="w-5 h-5 text-accent" />
  <span>Fjord cruise included</span>
</div>
```

---

## Accommodation Icons

### Accommodation Types

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| 🏨 | `Hotel` | Hotels, lodging | `grep "Hotel"` |
| 🏠 | `Home` | Vacation homes, apartments | `grep "Home\"" ` |
| 🏢 | `Building2` | Buildings, urban accommodation | `grep "Building2"` |
| ⛺ | `Tent` | Camping, glamping | `grep "Tent\"" ` |

**Example Usage:**
```typescript
import { Hotel, Tent } from "lucide-react";

<div className="flex items-center gap-2">
  <Hotel className="w-5 h-5 text-primary" />
  <span>4-star hotel accommodation</span>
</div>
```

---

## Activity Icons

### Outdoor Activities

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| 🥾 | `Footprints` | Hiking, trekking | `grep "Footprints"` |
| 🧗 | `PersonStanding` | Climbing, adventure | `grep "PersonStanding"` |
| 🏊 | `Waves` | Swimming, water activities | `grep "Waves"` |
| 🚴 | `Bike` | Cycling tours | `grep "Bike\"" ` |

**Example Usage:**
```typescript
import { Footprints, Bike } from "lucide-react";

<ul className="space-y-2">
  <li className="flex items-center gap-2">
    <Footprints className="w-4 h-4 text-primary" />
    <span>Guided hiking</span>
  </li>
  <li className="flex items-center gap-2">
    <Bike className="w-4 h-4 text-primary" />
    <span>Bike tours</span>
  </li>
</ul>
```

---

### Photography & Sightseeing

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| 📷 | `Camera` | Photography, sightseeing | `grep "Camera"` |
| 👁️ | `Eye` | Viewing, observation | `grep "Eye\"" ` |
| 🔭 | `Telescope` | Wildlife viewing, stargazing | `grep "Telescope"` |

**Example Usage:**
```typescript
import { Camera } from "lucide-react";

<div className="flex items-center gap-2 text-accent">
  <Camera className="w-5 h-5" />
  <span>Photography tour</span>
</div>
```

---

## Time & Duration Icons

### Time-Related

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| 📅 | `Calendar` | Dates, scheduling | `grep "Calendar\"" ` |
| 🕐 | `Clock` | Time, duration | `grep "Clock\"" ` |
| ⏰ | `AlarmClock` | Start times, wake-up calls | `grep "AlarmClock"` |
| 🌅 | `Sunrise` | Morning activities, dawn | `grep "Sunrise"` |
| 🌇 | `Sunset` | Evening activities, dusk | `grep "Sunset"` |

**Example Usage:**
```typescript
import { Calendar, Clock } from "lucide-react";

<div className="flex items-center gap-4 text-sm">
  <div className="flex items-center gap-1">
    <Calendar className="w-4 h-4 text-muted-foreground" />
    <span>8 days</span>
  </div>
  <div className="flex items-center gap-1">
    <Clock className="w-4 h-4 text-muted-foreground" />
    <span>6:00 AM start</span>
  </div>
</div>
```

---

## Weather & Seasons

### Weather Icons

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| ☀️ | `Sun` | Sunny weather, summer | `grep "Sun\"" ` |
| ☁️ | `Cloud` | Cloudy weather | `grep "Cloud\"" ` |
| ❄️ | `Snowflake` | Snow, winter destinations | `grep "Snowflake"` |
| 🌡️ | `Thermometer` | Temperature information | `grep "Thermometer"` |

**Example Usage:**
```typescript
import { Snowflake, Sun } from "lucide-react";

<div className="flex gap-2">
  <div className="flex items-center gap-1">
    <Snowflake className="w-4 h-4 text-accent" />
    <span>Winter activities</span>
  </div>
  <div className="flex items-center gap-1">
    <Sun className="w-4 h-4 text-accent" />
    <span>Summer tours</span>
  </div>
</div>
```

---

## People & Group Icons

### Group Information

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| 👥 | `Users` | Group size, travelers | `grep "Users\"" ` |
| 👤 | `User` | Single traveler, profile | `grep "User\"" ` |
| 👨‍👩‍👧‍👦 | `Users2` | Families, group tours | `grep "Users2"` |
| 👶 | `Baby` | Family-friendly, children | `grep "Baby\"" ` |

**Example Usage:**
```typescript
import { Users, User } from "lucide-react";

<div className="flex items-center gap-2">
  <Users className="w-4 h-4 text-muted-foreground" />
  <span>12-16 people</span>
</div>
```

---

## Food & Dining Icons

### Dining

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| 🍽️ | `Utensils` | Meals, dining | `grep "Utensils"` |
| ☕ | `Coffee` | Breakfast, cafes | `grep "Coffee"` |
| 🍷 | `Wine` | Wine tours, tastings | `grep "Wine\"" ` |
| 🍺 | `Beer` | Breweries, pubs | `grep "Beer\"" ` |

**Example Usage:**
```typescript
import { Utensils, Coffee } from "lucide-react";

<ul className="space-y-1">
  <li className="flex items-center gap-2 text-sm">
    <Coffee className="w-4 h-4 text-muted-foreground" />
    <span>Breakfast included</span>
  </li>
  <li className="flex items-center gap-2 text-sm">
    <Utensils className="w-4 h-4 text-muted-foreground" />
    <span>Daily dinner</span>
  </li>
</ul>
```

---

## Pricing & Value Icons

### Financial

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| 💰 | `DollarSign` | Pricing, cost | `grep "DollarSign"` |
| 💳 | `CreditCard` | Payment, booking | `grep "CreditCard"` |
| 🏷️ | `Tag` | Discounts, specials | `grep "Tag\"" ` |
| ✨ | `Sparkles` | Premium, featured | `grep "Sparkles"` |

**Example Usage:**
```typescript
import { DollarSign, Tag, Sparkles } from "lucide-react";

<div className="flex items-center gap-2">
  <DollarSign className="w-4 h-4 text-muted-foreground" />
  <span className="text-lg font-semibold">From $2,995</span>
  <Tag className="w-4 h-4 text-accent" />
  <span className="text-accent text-sm">20% off</span>
</div>
```

---

## Star Ratings

### Rating Icons

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| ⭐ | `Star` | Ratings, reviews | `grep "Star\"" ` |
| ❤️ | `Heart` | Favorites, likes | `grep "Heart\"" ` |
| 🏆 | `Award` | Highlights, awards | `grep "Award\"" ` |

**Example Usage:**
```typescript
import { Star, Heart } from "lucide-react";

<div className="flex items-center gap-1">
  {[...Array(5)].map((_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${i < 4 ? 'text-accent fill-accent' : 'text-muted'}`}
    />
  ))}
  <span className="text-sm text-muted-foreground ml-1">(4.5)</span>
</div>
```

---

## Services & Amenities

### Included Services

| Icon | Import Name | Usage | Verification |
|------|-------------|-------|--------------|
| ✅ | `Check` | Included features | `grep "Check\"" ` |
| 📶 | `Wifi` | WiFi availability | `grep "Wifi\"" ` |
| 🅿️ | `ParkingCircle` | Parking | `grep "ParkingCircle"` |
| 🏋️ | `Dumbbell` | Gym, fitness | `grep "Dumbbell"` |

**Example Usage:**
```typescript
import { Check, Wifi } from "lucide-react";

<ul className="space-y-2">
  <li className="flex items-start gap-2">
    <Check className="w-5 h-5 text-primary mt-0.5" />
    <span>All meals included</span>
  </li>
  <li className="flex items-start gap-2">
    <Wifi className="w-5 h-5 text-primary mt-0.5" />
    <span>Free WiFi</span>
  </li>
</ul>
```

---

## Common Travel Patterns

### Tour Card Meta

```typescript
import { MapPin, Calendar, Users, DollarSign } from "lucide-react";

<div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
  <div className="flex items-center gap-1">
    <MapPin className="w-4 h-4" />
    <span>Iceland</span>
  </div>
  <div className="flex items-center gap-1">
    <Calendar className="w-4 h-4" />
    <span>8 days / 7 nights</span>
  </div>
  <div className="flex items-center gap-1">
    <Users className="w-4 h-4" />
    <span>12-16 people</span>
  </div>
  <div className="flex items-center gap-1">
    <DollarSign className="w-4 h-4" />
    <span>From $2,995</span>
  </div>
</div>
```

---

### Included Features List

```typescript
import { Check } from "lucide-react";

<ul className="space-y-2">
  <li className="flex items-start gap-2">
    <Check className="w-5 h-5 text-primary mt-0.5" />
    <span>Professional tour guide</span>
  </li>
  <li className="flex items-start gap-2">
    <Check className="w-5 h-5 text-primary mt-0.5" />
    <span>All accommodation</span>
  </li>
  <li className="flex items-start gap-2">
    <Check className="w-5 h-5 text-primary mt-0.5" />
    <span>Daily breakfast & dinner</span>
  </li>
  <li className="flex items-start gap-2">
    <Check className="w-5 h-5 text-primary mt-0.5" />
    <span>Airport transfers</span>
  </li>
</ul>
```

---

### Activity Tags

```typescript
import { Mountain, Camera, Footprints } from "lucide-react";

<div className="flex flex-wrap gap-2">
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
    <Mountain className="w-3 h-3" />
    <span>Hiking</span>
  </span>
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
    <Camera className="w-3 h-3" />
    <span>Photography</span>
  </span>
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm">
    <Footprints className="w-3 h-3" />
    <span>Trekking</span>
  </span>
</div>
```

---

## Accessibility

Always provide alternative text or labels for icons:

```typescript
// Decorative (with visible text)
<div className="flex items-center gap-2">
  <MapPin className="w-4 h-4" aria-hidden="true" />
  <span>Iceland</span>
</div>

// Functional (icon only)
<button aria-label="Add to favorites">
  <Heart className="w-5 h-5" />
</button>
```

---

## Related Documentation

- [icons/interface.md](interface.md) - UI control icons
- [overview-icons.md](../overview-icons.md) - Icon system overview
- [design-tokens/colors.md](../design-tokens/colors.md) - Icon coloring
