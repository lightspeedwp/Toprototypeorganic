# Content Expansion Prompt — African Safari Tour Operator

**Created:** March 12, 2026  
**Objective:** Expand mock data to cover 3 African macro-regions, 15+ countries, 40+ regions, 10 accommodation types, 2 real brands (Londolozi + andBeyond), 5 traveller types, and 30+ tours — all cross-referenced.

---

## Current State (Pre-Expansion)

| Content Type       | Count | ID Range      |
|--------------------|-------|---------------|
| Tours              | 12    | tour-1..12    |
| Destinations       | ~14   | dest-1..11, 20, 25-26 |
| Accommodation      | 9     | acc-1..9      |
| Travel Styles      | 6     | style-1..6    |
| Accommodation Types| 3     | type-1..3     |
| Brands             | 6     | brand-1..6    |
| Traveller Types    | 0     | (new taxonomy) |

### Known Issues
- Tours 6-11 reference destinations that don't exist as Destination entries (Botswana, Namibia, Uganda, Mozambique, Zambia, Zimbabwe)
- SA only has 1 region (Cape Town) — needs Kruger, Garden Route, KZN
- No Indian Ocean Island destinations
- No Traveller Types taxonomy at all
- Only 3 accommodation types (need 10)
- Londolozi brand missing

---

## Target State (Post-Expansion)

| Content Type       | Target | Notes                              |
|--------------------|--------|------------------------------------|
| Tours              | 35-40  | 5-10 per taxonomy term             |
| Destinations       | 55-60  | 15 countries + 40+ regions         |
| Accommodation      | 20-25  | Including Londolozi + andBeyond     |
| Travel Styles      | 10     | Add Photography, Walking, Beach, Fly-in, Self-drive |
| Accommodation Types| 10     | Hotel, Lodge, Resort, Tented Camp, Boutique, Villa, Mobile, Treehouse, Guesthouse, Private Island |
| Brands             | 8      | Add Londolozi, keep existing        |
| Traveller Types    | 5      | Solo, Couple, Multi-gen, Family, Group |

---

## Phase 1: Data Architecture (Types + Taxonomies)

### 1A. New TravellerType Interface
Create `/src/app/data/types/traveller-types.ts`:
```typescript
export interface TravellerType {
  id: string;
  slug: string;
  name: string;
  description: string;
  tourIds: string[];
}
```
Export from `types/index.ts`.

### 1B. Traveller Types Data
Create `/src/app/data/taxonomies/traveller-types.ts`:
- `ttype-1` Solo Traveller
- `ttype-2` Couple
- `ttype-3` Multi-Generational
- `ttype-4` Family with Kids  
- `ttype-5` Group / Friends

### 1C. Expand Accommodation Types (3 → 10)
Add to `/src/app/data/taxonomies/accommodation-types.ts`:
- `type-4` Tented Camp
- `type-5` Boutique Hotel
- `type-6` Villa / Private House
- `type-7` Mobile Camp
- `type-8` Treehouse Lodge
- `type-9` Guesthouse / B&B
- `type-10` Private Island Resort

### 1D. Expand Travel Styles (6 → 10)
Add to `/src/app/data/taxonomies/travel-styles.ts`:
- `style-7` Photography Safari
- `style-8` Walking Safari
- `style-9` Beach & Island
- `style-10` Fly-in Safari

### 1E. Add Londolozi Brand
Add to `/src/app/data/taxonomies/brands.ts`:
- `brand-7` Londolozi Private Game Reserve

---

## Phase 2: Destination Expansion

### 2A. East Africa
**Countries to add:** Uganda, Rwanda  
**Existing:** Kenya (dest-3), Tanzania (dest-4)

| ID      | Slug              | Title                    | Type    | Parent  |
|---------|-------------------|--------------------------|---------|---------|
| dest-12 | uganda            | Uganda                   | country | —       |
| dest-13 | bwindi            | Bwindi Impenetrable Forest | park  | dest-12 |
| dest-14 | queen-elizabeth   | Queen Elizabeth NP        | park    | dest-12 |
| dest-15 | rwanda            | Rwanda                   | country | —       |
| dest-16 | volcanoes-np      | Volcanoes National Park  | park    | dest-15 |
| dest-17 | nyungwe-forest    | Nyungwe Forest           | park    | dest-15 |

**Kenya regions to add:**
| dest-18 | amboseli          | Amboseli National Park   | park    | dest-3  |
| dest-19 | laikipia          | Laikipia Plateau         | region  | dest-3  |
| dest-21 | samburu           | Samburu National Reserve | park    | dest-3  |

**Tanzania regions to add:**
| dest-22 | ngorongoro        | Ngorongoro Crater        | park    | dest-4  |
| dest-23 | tarangire         | Tarangire National Park  | park    | dest-4  |

### 2B. Southern Africa  
**Countries to add:** Botswana, Namibia, Zimbabwe, Zambia, Mozambique  
**Existing:** South Africa (dest-1)

| ID      | Slug              | Title                    | Type    | Parent  |
|---------|-------------------|--------------------------|---------|---------|
| dest-27 | botswana          | Botswana                 | country | —       |
| dest-28 | okavango-delta    | Okavango Delta           | region  | dest-27 |
| dest-29 | chobe             | Chobe National Park      | park    | dest-27 |
| dest-30 | makgadikgadi      | Makgadikgadi Pans        | park    | dest-27 |
| dest-31 | namibia           | Namibia                  | country | —       |
| dest-32 | sossusvlei        | Sossusvlei               | region  | dest-31 |
| dest-33 | etosha            | Etosha National Park     | park    | dest-31 |
| dest-34 | skeleton-coast    | Skeleton Coast           | region  | dest-31 |
| dest-35 | damaraland        | Damaraland               | region  | dest-31 |
| dest-36 | zimbabwe          | Zimbabwe                 | country | —       |
| dest-37 | hwange            | Hwange National Park     | park    | dest-36 |
| dest-38 | victoria-falls-zw | Victoria Falls (Zimbabwe)| region  | dest-36 |
| dest-39 | mana-pools        | Mana Pools National Park | park    | dest-36 |
| dest-40 | zambia            | Zambia                   | country | —       |
| dest-41 | south-luangwa     | South Luangwa NP         | park    | dest-40 |
| dest-42 | lower-zambezi     | Lower Zambezi NP         | park    | dest-40 |
| dest-43 | victoria-falls-zm | Victoria Falls (Zambia)  | region  | dest-40 |
| dest-44 | mozambique        | Mozambique               | country | —       |
| dest-45 | bazaruto          | Bazaruto Archipelago     | region  | dest-44 |
| dest-46 | vilanculos        | Vilanculos               | region  | dest-44 |

**South Africa regions to add:**
| dest-47 | kruger-region     | Greater Kruger           | region  | dest-1  |
| dest-48 | garden-route      | Garden Route             | region  | dest-1  |
| dest-49 | kwazulu-natal     | KwaZulu-Natal            | region  | dest-1  |
| dest-50 | winelands         | Cape Winelands           | region  | dest-1  |

### 2C. Indian Ocean Islands
| ID      | Slug              | Title                    | Type    | Parent  |
|---------|-------------------|--------------------------|---------|---------|
| dest-51 | madagascar        | Madagascar               | country | —       |
| dest-52 | nosy-be           | Nosy Be                  | region  | dest-51 |
| dest-53 | mauritius         | Mauritius                | country | —       |
| dest-54 | seychelles        | Seychelles               | country | —       |
| dest-55 | mahe              | Mahé                     | region  | dest-54 |
| dest-56 | praslin           | Praslin                  | region  | dest-54 |

---

## Phase 3: Accommodation Expansion

### 3A. Londolozi Properties (brand-7)
| ID     | Slug                      | Title                        | Type | Destination   |
|--------|---------------------------|------------------------------|------|---------------|
| acc-10 | londolozi-tree-camp       | Londolozi Tree Camp          | type-8 | dest-47 (Kruger) |
| acc-11 | londolozi-granite-suites  | Londolozi Granite Suites     | type-2 | dest-47       |
| acc-12 | londolozi-pioneer-camp    | Londolozi Pioneer Camp       | type-4 | dest-47       |
| acc-13 | londolozi-founders-camp   | Londolozi Founders Camp      | type-2 | dest-47       |
| acc-14 | londolozi-varty-camp      | Londolozi Varty Camp         | type-2 | dest-47       |

### 3B. andBeyond Properties (brand-4, expand)
| ID     | Slug                       | Title                             | Type   | Destination     |
|--------|----------------------------|-----------------------------------|--------|-----------------|
| acc-15 | andbeyond-phinda-vlei-lodge | andBeyond Phinda Vlei Lodge      | type-2 | dest-49 (KZN)   |
| acc-16 | andbeyond-sandibe           | andBeyond Sandibe                | type-2 | dest-28 (Okavango)|
| acc-17 | andbeyond-sossusvlei       | andBeyond Sossusvlei Desert Lodge| type-2 | dest-32          |
| acc-18 | andbeyond-bateleur-camp    | andBeyond Bateleur Camp          | type-4 | dest-7 (Mara)    |
| acc-19 | andbeyond-mnemba-island    | andBeyond Mnemba Island          | type-10| dest-10 (Zanzibar)|

### 3C. Additional Properties
| ID     | Slug                       | Title                          | Type   | Brand   | Destination     |
|--------|----------------------------|--------------------------------|--------|---------|-----------------|
| acc-20 | bisate-lodge               | Bisate Lodge (Wilderness)      | type-5 | brand-6 | dest-16 (Volcanoes)|
| acc-21 | gorilla-forest-camp        | Gorilla Forest Camp            | type-4 | brand-3 | dest-13 (Bwindi) |
| acc-22 | royal-malewane             | Royal Malewane                 | type-2 | brand-3 | dest-47 (Kruger) |
| acc-23 | benguerra-island-lodge     | Benguerra Island Lodge         | type-10| brand-4 | dest-45 (Bazaruto)|
| acc-24 | constance-lemuria          | Constance Lemuria              | type-3 | brand-3 | dest-56 (Praslin)|

---

## Phase 4: Tour Expansion (5-10 per taxonomy)

### Tour-to-Taxonomy Matrix

Each tour must connect to: destinations, travel styles, traveller types, accommodation.

**NEW TOURS (tour-13 through tour-35+):**

| ID      | Title                                    | Travel Styles | Traveller Types | Destinations             | Accommodation |
|---------|------------------------------------------|---------------|-----------------|--------------------------|---------------|
| tour-13 | Londolozi Big Five Photography Safari     | style-3,7,10  | ttype-1,2       | dest-1,47                | acc-10,11     |
| tour-14 | Rwanda Gorilla & Golden Monkey Trek      | style-2,3     | ttype-1,2,5     | dest-15,16               | acc-20        |
| tour-15 | Okavango Delta Fly-in Safari             | style-3,4,10  | ttype-2,3       | dest-27,28               | acc-16        |
| tour-16 | andBeyond Luxury East Africa Circuit     | style-3,4,10  | ttype-2,3       | dest-3,4,7,9,10          | acc-5,18,19   |
| tour-17 | Seychelles Island Hopping Escape         | style-1,9     | ttype-2         | dest-54,55,56            | acc-24        |
| tour-18 | Multi-Gen Cape Town & Safari             | style-3,5     | ttype-3,4       | dest-1,2,47              | acc-1,14      |
| tour-19 | Solo Traveller Kenya Explorer            | style-2,3,6   | ttype-1         | dest-3,7,8,18            | acc-2,7       |
| tour-20 | Namibia Self-Drive Adventure             | style-2       | ttype-2,5       | dest-31,32,33,34,35      | acc-9,17      |
| tour-21 | Victoria Falls & Hwange Safari           | style-2,3,4   | ttype-2,5       | dest-36,37,38            | acc-8         |
| tour-22 | Mozambique & Kruger Safari-Beach Combo   | style-3,4,9   | ttype-2         | dest-1,47,44,45          | acc-12,23     |
| tour-23 | Walking Safari Zambia                    | style-2,3,8   | ttype-1,2,5     | dest-40,41               | —             |
| tour-24 | Madagascar Wildlife Discovery            | style-2,3     | ttype-1,5       | dest-51,52               | —             |
| tour-25 | Mauritius Luxury Beach Retreat           | style-1,4,9   | ttype-2,3       | dest-53                  | —             |
| tour-26 | Friends Group Safari Botswana            | style-2,3     | ttype-5         | dest-27,28,29            | acc-6,16      |
| tour-27 | Family Zanzibar & Serengeti              | style-3,5,9   | ttype-3,4       | dest-4,9,10              | acc-3,5       |
| tour-28 | Londolozi & Cape Town Luxury             | style-3,4     | ttype-2,3       | dest-1,2,47              | acc-1,10,11   |
| tour-29 | Photography Safari Masai Mara            | style-3,7     | ttype-1,2       | dest-3,7                 | acc-18        |
| tour-30 | Chobe & Okavango Fly-in                  | style-3,4,10  | ttype-2         | dest-27,28,29            | acc-6,16      |
| tour-31 | Rwanda & Uganda Primate Safari           | style-2,3     | ttype-1,2,5     | dest-12,13,15,16         | acc-20,21     |
| tour-32 | KZN Battlefields & Bush                  | style-3,6     | ttype-2,5       | dest-1,49                | acc-15        |
| tour-33 | Skeleton Coast Expedition Namibia        | style-2,7     | ttype-1,2       | dest-31,34               | —             |
| tour-34 | Indian Ocean Island Triple               | style-1,4,9   | ttype-2         | dest-10,53,54            | acc-19,24     |
| tour-35 | South Africa Highlights 14-Day           | style-2,3,5,6 | ttype-3,4,5     | dest-1,2,47,48,49,50     | acc-1,4,15,22 |

### Coverage Verification per Taxonomy

**Travel Styles (min 5 tours each):**
- style-1 Honeymoon: tour-1,17,25,34 + existing = 5+
- style-2 Adventure: tour-6,7,8,10,14,19,20,21,23,24,26,31,33,35 = 14
- style-3 Wildlife: tour-2,4,5,6,7,8,10,11,13,14,15,16,18,19,21,22,26,27,28,29,30,31,32,35 = 24
- style-4 Luxury: tour-1,2,5,6,9,11,15,16,21,22,25,28,30,34 = 14
- style-5 Family: tour-3,12,18,27,35 = 5
- style-6 Cultural: tour-4,12,19,32 = 4 (add 1 more)
- style-7 Photography: tour-13,29,33 + add to existing = 5
- style-8 Walking: tour-23 + tour-10 + add = 5
- style-9 Beach & Island: tour-17,22,25,27,34 = 5
- style-10 Fly-in: tour-13,15,16,30 + add = 5

**Traveller Types (min 5 tours each):**
- ttype-1 Solo: tour-13,14,19,23,24,29,31,33 = 8
- ttype-2 Couple: tour-13,15,16,17,20,21,22,25,26,28,29,30,31,33,34 = 15
- ttype-3 Multi-Gen: tour-15,16,18,25,27,28,35 = 7
- ttype-4 Family: tour-18,27,35 = 3 (also assign existing family tours)
- ttype-5 Group: tour-14,20,21,23,24,26,31,32,35 = 9

---

## Phase 5: Cross-Reference Updates

After all data is created, update:
1. Travel Styles `tourIds`, `destinationIds`, `accommodationIds`
2. Accommodation Types `accommodationIds`
3. Brands `accommodationIds`  
4. Destinations `tourIds`, `accommodationIds`
5. Continents `destinationIds`
6. Existing tours — add `travellerTypes` field + connect to new destinations/accommodation

---

## Phase 6: Sitemap & Routes

1. Add all new destination routes to `routes.ts`
2. Update SitemapPage to show all new content
3. Verify every tour, destination, accommodation appears in sitemap

---

## Execution Order

```
Phase 1A → Types (TravellerType interface)
Phase 1B → Traveller Types data
Phase 1C → Accommodation Types expansion
Phase 1D → Travel Styles expansion
Phase 1E → Londolozi brand
Phase 2A → East Africa destinations
Phase 2B → Southern Africa destinations
Phase 2C → Indian Ocean destinations
Phase 3A → Londolozi accommodation
Phase 3B → andBeyond accommodation
Phase 3C → Additional accommodation
Phase 4  → New tours (connected to everything)
Phase 5  → Cross-reference updates
Phase 6  → Sitemap + routes
```

**Estimated effort:** 4-6 sessions  
**Priority:** Phase 1 + Phase 2 first (foundational data), then Phase 3-4 (content), then Phase 5-6 (wiring)
