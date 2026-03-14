import type { AccommodationType } from "../types";

/**
 * Accommodation Types (Taxonomy)
 * Categorizes accommodation by type (Hotel, Resort, Lodge, etc.).
 * Updated Phase 3.2 — 50 total properties, all 10 types populated.
 */
export const ACCOMMODATION_TYPES: AccommodationType[] = [
  {
    id: "type-1",
    slug: "hotel",
    name: "Hotel",
    description: "Comfortable city hotels with modern amenities",
    accommodationIds: ["acc-1", "acc-25", "acc-28", "acc-30", "acc-34", "acc-36", "acc-47"],
  },
  {
    id: "type-2",
    slug: "lodge",
    name: "Lodge",
    description: "Safari lodges in prime wildlife viewing locations",
    accommodationIds: [
      "acc-2", "acc-4", "acc-5", "acc-6", "acc-7",
      "acc-11", "acc-13", "acc-14", "acc-15", "acc-16",
      "acc-17", "acc-18", "acc-22", "acc-40", "acc-45",
    ],
  },
  {
    id: "type-3",
    slug: "resort",
    name: "Resort",
    description: "Beachfront resorts with full facilities",
    accommodationIds: ["acc-3", "acc-24", "acc-26", "acc-31", "acc-38", "acc-39", "acc-48"],
  },
  {
    id: "type-4",
    slug: "tented-camp",
    name: "Tented Camp",
    description:
      "Classic canvas safari camps combining wilderness immersion with comfort, often in unfenced areas for an authentic bush experience",
    accommodationIds: ["acc-12", "acc-21", "acc-29", "acc-32", "acc-46"],
  },
  {
    id: "type-5",
    slug: "boutique",
    name: "Boutique Hotel",
    description:
      "Intimate, design-led properties with distinctive character, typically fewer than 20 rooms with personalised service",
    accommodationIds: ["acc-20", "acc-27", "acc-33", "acc-37"],
  },
  {
    id: "type-6",
    slug: "villa",
    name: "Villa / Private House",
    description:
      "Exclusive-use properties offering complete privacy with dedicated staff, ideal for families and groups",
    accommodationIds: ["acc-35"],
  },
  {
    id: "type-7",
    slug: "mobile-camp",
    name: "Mobile Camp",
    description:
      "Semi-permanent camps that follow wildlife movements, offering the most immersive safari experience with luxury camping",
    accommodationIds: ["acc-41", "acc-42"],
  },
  {
    id: "type-8",
    slug: "treehouse",
    name: "Treehouse Lodge",
    description:
      "Elevated accommodation built among treetops, offering unique perspectives of the bush and extraordinary wildlife encounters",
    accommodationIds: ["acc-8", "acc-10"],
  },
  {
    id: "type-9",
    slug: "guesthouse",
    name: "Guesthouse / B&B",
    description:
      "Owner-managed properties with a personal touch, home-cooked meals, and insider local knowledge",
    accommodationIds: ["acc-43", "acc-44"],
  },
  {
    id: "type-10",
    slug: "private-island",
    name: "Private Island Resort",
    description:
      "Exclusive island properties offering barefoot luxury, pristine beaches, and world-class marine experiences",
    accommodationIds: ["acc-19", "acc-23", "acc-49", "acc-50"],
  },
];

/**
 * Get accommodation type by slug.
 */
export function getAccommodationType(
  slug: string
): AccommodationType | undefined {
  return ACCOMMODATION_TYPES.find((t) => t.slug === slug);
}
