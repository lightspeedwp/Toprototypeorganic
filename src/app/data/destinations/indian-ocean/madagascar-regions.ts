/**
 * Madagascar - Regions
 * @module indian-ocean/madagascar-regions
 * @category data/destinations
 */
import type { Destination } from "../../types";

export const MADAGASCAR_REGIONS: Destination[] = [
  {
    id: "dest-52",
    slug: "nosy-be",
    title: "Nosy Be",
    excerpt:
      "Madagascar's premier tropical island, where turquoise waters, whale shark encounters, and ylang-ylang scented breezes create the perfect Indian Ocean escape.",
    content:
      "Nosy Be is Madagascar's most popular beach destination — a lush, volcanic island off the northwest coast known as the 'Perfume Island' for its ylang-ylang, coffee, and vanilla plantations. The island offers a perfect blend of tropical relaxation and marine adventure, with warm turquoise waters supporting exceptional snorkeling, diving, and seasonal whale shark encounters.\n\nThe surrounding archipelago of smaller islands — Nosy Komba (lemur island), Nosy Tanikely (marine reserve), and Nosy Iranja (turtle nesting beach) — provide excellent day-trip excursions by traditional pirogue boat. Whale sharks visit between October and December, offering swimming encounters with the world's largest fish. Humpback whales pass through from July to September.\n\nNosy Be serves as an ideal add-on to a Madagascar wildlife tour or as a standalone tropical escape. The island has the country's best-developed tourism infrastructure with luxury resorts, boutique hotels, and excellent seafood restaurants.",
    featuredImage:
      "https://images.unsplash.com/photo-1627900355526-f77d70cc6887?w=800",
    parentId: "dest-51",
    continentId: "continent-1",
    type: "region",
    tourIds: ["tour-24"],
    accommodationIds: [],
    travelStyles: ["beach-island", "adventure"],
    bestTime: "April - November (dry season); Oct-Dec for whale sharks",
    climate: "Tropical; warm year-round 25-32C; dry April-November",
    currency: "Malagasy Ariary (MGA)",
    language: "Malagasy, French",
    timezone: "East Africa Time (EAT, UTC+3)",
    highlights: [
      "Whale shark swimming — October to December",
      "Nosy Komba lemur encounters",
      "Nosy Tanikely marine reserve snorkeling",
      "Ylang-ylang and vanilla plantation tours",
      "Humpback whale watching July-September",
    ],
    coordinates: { lat: -13.3333, lng: 48.2667 },
  },
];
