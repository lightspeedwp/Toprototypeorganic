/**
 * Namibia - Regions and Parks
 * @module africa/namibia-regions
 * @category data/destinations
 */
import type { Destination } from "../../types";

export const NAMIBIA_REGIONS: Destination[] = [
  {
    id: "dest-32",
    slug: "sossusvlei",
    title: "Sossusvlei",
    excerpt:
      "The towering rust-red dunes of the Namib Desert, including iconic Dune 45, Big Daddy, and the surreal Deadvlei clay pan.",
    content:
      "Sossusvlei is the heart of the Namib-Naukluft National Park and one of Africa's most iconic landscapes. The area's star-shaped dunes, sculpted by millions of years of wind, reach heights of over 300 metres and glow in every shade of orange, crimson, and apricot as the light shifts. Climbing Dune 45 at sunrise is a rite of passage, while Big Daddy offers more ambitious hikers sweeping views across the entire dune sea.\n\nThe Deadvlei clay pan, surrounded by towering dunes and dotted with 900-year-old camelthorn tree skeletons, is one of the most photographed scenes on Earth. The contrast of white clay, blackened trees, orange dunes, and deep blue sky creates an almost alien landscape. Nearby Sesriem Canyon offers shaded walks through geological time, while hot-air balloon rides at dawn provide a bird's-eye view of the desert's extraordinary patterns.\n\nLodges in the area range from simple campsites to ultra-luxury desert lodges, many using the Namib's extreme environment as a design feature with star beds, open-air bathrooms, and decks oriented toward sunset and the Milky Way.",
    featuredImage:
      "https://images.unsplash.com/photo-1652439310454-a50203f01d8f?w=800",
    parentId: "dest-31",
    continentId: "continent-1",
    type: "region",
    tourIds: ["tour-7", "tour-20"],
    accommodationIds: ["acc-9", "acc-17"],
    travelStyles: ["adventure", "photography"],
    bestTime: "April - October (cooler; best light for photography)",
    climate: "Hyper-arid; 0-40C temperature swings; virtually no rain",
    currency: "Namibian Dollar (NAD)",
    language: "English, Afrikaans",
    timezone: "Central Africa Time (CAT, UTC+2)",
    highlights: [
      "Dune 45 sunrise climb",
      "Big Daddy — tallest dune at 325 metres",
      "Deadvlei clay pan and ancient tree skeletons",
      "Sesriem Canyon geological walk",
      "Hot-air balloon over the dune sea",
    ],
    coordinates: { lat: -24.7275, lng: 15.2993 },
  },
  {
    id: "dest-33",
    slug: "etosha",
    title: "Etosha National Park",
    excerpt:
      "A vast salt pan surrounded by waterholes where lions, elephants, black rhinos, and hundreds of other species gather in one of Africa's finest parks.",
    content:
      "Etosha National Park covers 22,270 square kilometres of northern Namibia, centred on the vast Etosha Pan — a shimmering salt flat visible from space. The park's genius lies in its ring of natural and artificial waterholes around the pan's edge, creating predictable wildlife concentration points where visitors can simply park and watch the drama unfold.\n\nThe waterhole strategy makes Etosha one of Africa's most reliable parks for Big Five sightings. Black rhino are particularly well-represented, often visiting floodlit waterholes at night. Lion prides patrol the open grasslands, while elephant herds move between water sources. The park supports over 340 bird species, and during the wet season, the pan attracts vast flocks of flamingos.\n\nEtosha is Namibia's most accessible wildlife destination, with paved roads, well-maintained rest camps, and a self-drive-friendly layout. Three main rest camps offer accommodation ranging from campsites to chalets, while the western section has recently opened with exclusive private concessions.",
    featuredImage:
      "https://images.unsplash.com/photo-1636786306533-256d5db83424?w=800",
    parentId: "dest-31",
    continentId: "continent-1",
    type: "park",
    tourIds: ["tour-7", "tour-20"],
    accommodationIds: [],
    travelStyles: ["wildlife", "family", "photography"],
    bestTime: "June - November (dry season; animals at waterholes)",
    climate: "Semi-arid; hot summers 35C+, mild winters; rain Nov-April",
    currency: "Namibian Dollar (NAD)",
    language: "English, Afrikaans, Oshiwambo",
    timezone: "Central Africa Time (CAT, UTC+2)",
    highlights: [
      "Floodlit waterhole game viewing at night",
      "Black rhino sightings — excellent population",
      "Lion prides hunting on the pan edge",
      "Vast flamingo flocks in wet season",
      "Self-drive-friendly with good infrastructure",
    ],
    coordinates: { lat: -18.8556, lng: 16.3278 },
  },
  {
    id: "dest-34",
    slug: "skeleton-coast",
    title: "Skeleton Coast",
    excerpt:
      "One of Earth's most remote and hauntingly beautiful coastlines, where desert dunes meet the Atlantic amid shipwrecks, seal colonies, and desert-adapted wildlife.",
    content:
      "The Skeleton Coast is Namibia's most remote and atmospheric destination — a 500-kilometre stretch of Atlantic coastline where the cold Benguela Current meets the Namib Desert, creating a landscape of eerie fog, shipwrecked hulls, and raw natural beauty. Named for the whale and seal bones that once littered its beaches, the coast is now scattered with rusting ships that couldn't navigate its treacherous waters.\n\nAccess to the northern Skeleton Coast is restricted to fly-in safaris, ensuring one of Africa's most exclusive and uncrowded wilderness experiences. Desert-adapted elephants, lions, and brown hyenas roam the gravel plains, while Cape fur seal colonies numbering 100,000+ congregate at Cape Cross. The intersection of desert and ocean creates unique ecosystems and surreal landscapes.\n\nFlying along the coast in a light aircraft, dipping into river valleys to track desert elephants, and camping on isolated beaches under star-filled skies — a Skeleton Coast safari is an expedition-style adventure for those seeking truly off-the-beaten-path Africa.",
    featuredImage:
      "https://images.unsplash.com/photo-1551176968-bf1e434355f6?w=800",
    parentId: "dest-31",
    continentId: "continent-1",
    type: "region",
    tourIds: ["tour-33"],
    accommodationIds: [],
    travelStyles: ["adventure", "photography"],
    bestTime: "Year-round; May - September driest",
    climate: "Cool desert coast; fog-bound; 15-25C year-round",
    currency: "Namibian Dollar (NAD)",
    language: "English, Afrikaans",
    timezone: "Central Africa Time (CAT, UTC+2)",
    highlights: [
      "Shipwreck ruins along the Atlantic shore",
      "Cape Cross seal colony — 100,000+ seals",
      "Desert-adapted elephants and lions",
      "Fly-in expedition-style safari",
      "Dune-meets-ocean landscapes",
    ],
    coordinates: { lat: -20.3000, lng: 13.5000 },
  },
];
