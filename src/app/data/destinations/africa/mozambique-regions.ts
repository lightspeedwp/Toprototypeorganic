/**
 * Mozambique - Regions
 * @module africa/mozambique-regions
 * @category data/destinations
 */
import type { Destination } from "../../types";

export const MOZAMBIQUE_REGIONS: Destination[] = [
  {
    id: "dest-45",
    slug: "bazaruto",
    title: "Bazaruto Archipelago",
    excerpt:
      "A chain of five pristine islands in a protected marine national park, offering world-class diving, snorkeling, and barefoot luxury in the Indian Ocean.",
    content:
      "The Bazaruto Archipelago is Mozambique's premier beach destination and one of the Indian Ocean's most beautiful island groups. Five main islands — Bazaruto, Benguerra, Magaruque, Santa Carolina, and Bangue — are protected within a marine national park, ensuring pristine coral reefs, crystal-clear waters, and abundant marine life.\n\nThe archipelago's warm waters support an extraordinary diversity of marine life including manta rays, whale sharks, humpback whales (June-November), dolphins, sea turtles, and over 2,000 species of fish. Diving and snorkeling are exceptional, with visibility often exceeding 30 metres. Dhow sailing between islands, deep-sea fishing, and kayaking through mangrove channels provide alternative water activities.\n\nLuxury lodges on Benguerra and Bazaruto islands offer the quintessential barefoot luxury experience — elegant villas on deserted beaches, private plunge pools, fresh seafood, and the gentle rhythm of island life. The combination of marine adventure and tropical relaxation makes this the perfect complement to a southern African safari.",
    featuredImage:
      "https://images.unsplash.com/photo-1639309527384-02fec9eff92a?w=800",
    parentId: "dest-44",
    continentId: "continent-1",
    type: "region",
    tourIds: ["tour-9", "tour-22"],
    accommodationIds: ["acc-23"],
    travelStyles: ["beach-island", "honeymoon", "luxury"],
    bestTime: "May - November (dry; best diving visibility)",
    climate: "Tropical; warm year-round 25-30C; water temp 23-28C",
    currency: "Mozambican Metical (MZN)",
    language: "Portuguese, Sena",
    timezone: "Central Africa Time (CAT, UTC+2)",
    highlights: [
      "Diving with manta rays and whale sharks",
      "Pristine coral reefs — 2,000+ fish species",
      "Dhow sailing between islands",
      "Humpback whale watching June-November",
      "Barefoot luxury island lodges",
    ],
    coordinates: { lat: -21.6500, lng: 35.4833 },
  },
];
