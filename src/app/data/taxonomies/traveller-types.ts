import type { TravellerType } from "../types";

/**
 * Traveller Types (Taxonomy)
 * Categorizes tours by the type of traveller they are best suited for.
 */
export const TRAVELLER_TYPES: TravellerType[] = [
  {
    id: "ttype-1",
    slug: "solo",
    name: "Solo Traveller",
    description:
      "Independent adventures designed for solo explorers seeking authentic experiences, like-minded companions on small-group departures, and the freedom to travel at their own pace.",
    tourIds: [
      "tour-8",
      "tour-10",
      "tour-13",
      "tour-14",
      "tour-19",
      "tour-23",
      "tour-24",
      "tour-29",
      "tour-31",
      "tour-33",
    ],
    destinationIds: [
      "dest-3",
      "dest-7",
      "dest-12",
      "dest-15",
      "dest-27",
      "dest-40",
      "dest-51",
    ],
  },
  {
    id: "ttype-2",
    slug: "couple",
    name: "Couple",
    description:
      "Romantic escapes and intimate experiences crafted for two, from honeymoon hideaways and private island retreats to exclusive safari suites with plunge pools and candlelit bush dinners.",
    tourIds: [
      "tour-1",
      "tour-9",
      "tour-13",
      "tour-15",
      "tour-16",
      "tour-17",
      "tour-20",
      "tour-21",
      "tour-22",
      "tour-25",
      "tour-28",
      "tour-29",
      "tour-30",
      "tour-33",
      "tour-34",
    ],
    destinationIds: [
      "dest-1",
      "dest-2",
      "dest-7",
      "dest-10",
      "dest-27",
      "dest-28",
      "dest-47",
      "dest-53",
      "dest-54",
    ],
  },
  {
    id: "ttype-3",
    slug: "multi-generational",
    name: "Multi-Generational",
    description:
      "Thoughtfully designed itineraries that bring grandparents, parents, and children together with activities suited to all ages, private vehicles, and flexible pacing.",
    tourIds: [
      "tour-3",
      "tour-12",
      "tour-15",
      "tour-16",
      "tour-18",
      "tour-25",
      "tour-27",
      "tour-28",
      "tour-35",
    ],
    destinationIds: [
      "dest-1",
      "dest-2",
      "dest-3",
      "dest-4",
      "dest-47",
      "dest-48",
      "dest-53",
    ],
  },
  {
    id: "ttype-4",
    slug: "family",
    name: "Family with Kids",
    description:
      "Safari and beach holidays designed with younger travellers in mind, featuring malaria-free reserves, child-friendly lodges, interactive experiences, and shorter game drives.",
    tourIds: [
      "tour-3",
      "tour-12",
      "tour-18",
      "tour-27",
      "tour-35",
    ],
    destinationIds: [
      "dest-1",
      "dest-2",
      "dest-3",
      "dest-4",
      "dest-10",
      "dest-47",
      "dest-48",
      "dest-49",
      "dest-53",
    ],
  },
  {
    id: "ttype-5",
    slug: "group",
    name: "Group / Friends",
    description:
      "Shared adventures for groups of friends, club trips, or special interest groups with exclusive-use lodges, group discounts, and curated social experiences.",
    tourIds: [
      "tour-4",
      "tour-6",
      "tour-14",
      "tour-20",
      "tour-21",
      "tour-23",
      "tour-24",
      "tour-26",
      "tour-31",
      "tour-32",
      "tour-35",
    ],
    destinationIds: [
      "dest-1",
      "dest-3",
      "dest-5",
      "dest-12",
      "dest-15",
      "dest-27",
      "dest-36",
      "dest-40",
    ],
  },
];

/**
 * Get traveller type by slug.
 */
export function getTravellerType(slug: string): TravellerType | undefined {
  return TRAVELLER_TYPES.find((t) => t.slug === slug);
}
