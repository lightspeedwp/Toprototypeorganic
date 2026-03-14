import type { TravelStyle } from "../types";

/**
 * Travel Styles (Taxonomy)
 * Categorizes tours, destinations, and accommodation by the type of travel experience.
 * Updated Phase 3.3 — 61 total tours, all styles populated with Asia + Europe.
 */
export const TRAVEL_STYLES: TravelStyle[] = [
  {
    id: "style-1",
    slug: "honeymoon",
    name: "Honeymoon",
    description: "Romantic getaways designed for couples celebrating their love",
    tourIds: ["tour-1", "tour-17", "tour-25", "tour-34", "tour-46", "tour-49", "tour-52", "tour-61"],
    destinationIds: ["dest-1", "dest-2", "dest-10", "dest-53", "dest-54", "dest-76", "dest-79", "dest-82"],
    accommodationIds: ["acc-1", "acc-3", "acc-19", "acc-24", "acc-25", "acc-27", "acc-33", "acc-34", "acc-35", "acc-36", "acc-37"],
  },
  {
    id: "style-2",
    slug: "adventure",
    name: "Adventure",
    description: "Thrilling experiences for active travelers seeking excitement",
    tourIds: [
      "tour-6", "tour-7", "tour-8", "tour-10", "tour-14",
      "tour-19", "tour-20", "tour-21", "tour-23", "tour-24",
      "tour-26", "tour-31", "tour-33", "tour-35",
      "tour-38", "tour-39", "tour-40", "tour-41", "tour-42", "tour-43",
      "tour-48", "tour-54", "tour-55", "tour-56", "tour-58", "tour-60",
    ],
    destinationIds: [
      "dest-4", "dest-6", "dest-8", "dest-12", "dest-13",
      "dest-15", "dest-27", "dest-28", "dest-31", "dest-36",
      "dest-40", "dest-41", "dest-51",
      "dest-57", "dest-65", "dest-69", "dest-82", "dest-85",
    ],
    accommodationIds: ["acc-6", "acc-8", "acc-9", "acc-20", "acc-21", "acc-29", "acc-32", "acc-40", "acc-41", "acc-46"],
  },
  {
    id: "style-3",
    slug: "wildlife",
    name: "Wildlife",
    description:
      "Safari expeditions to observe nature's most magnificent creatures",
    tourIds: [
      "tour-2", "tour-4", "tour-5", "tour-6", "tour-7",
      "tour-8", "tour-10", "tour-11", "tour-13", "tour-14",
      "tour-15", "tour-16", "tour-18", "tour-19", "tour-21",
      "tour-22", "tour-24", "tour-26", "tour-27", "tour-28",
      "tour-29", "tour-30", "tour-31", "tour-32", "tour-35",
      "tour-39",
    ],
    destinationIds: [
      "dest-1", "dest-3", "dest-4", "dest-5", "dest-6",
      "dest-9", "dest-10", "dest-11", "dest-12", "dest-13",
      "dest-14", "dest-16", "dest-27", "dest-28", "dest-29",
      "dest-36", "dest-37", "dest-40", "dest-41", "dest-47", "dest-51",
      "dest-57",
    ],
    accommodationIds: [
      "acc-2", "acc-4", "acc-5", "acc-6", "acc-7",
      "acc-9", "acc-10", "acc-11", "acc-12", "acc-13",
      "acc-14", "acc-15", "acc-16", "acc-18", "acc-20",
      "acc-21", "acc-22", "acc-29", "acc-41", "acc-42", "acc-45",
    ],
  },
  {
    id: "style-4",
    slug: "luxury",
    name: "Luxury",
    description:
      "Premium experiences with exceptional service and accommodations",
    tourIds: [
      "tour-1", "tour-2", "tour-5", "tour-6", "tour-9",
      "tour-11", "tour-15", "tour-16", "tour-21", "tour-22",
      "tour-25", "tour-28", "tour-30", "tour-34",
      "tour-37", "tour-44", "tour-46",
      "tour-51", "tour-52", "tour-55", "tour-56", "tour-57", "tour-61",
    ],
    destinationIds: [
      "dest-1", "dest-2", "dest-3", "dest-4", "dest-7",
      "dest-27", "dest-28", "dest-47", "dest-53", "dest-54",
      "dest-69", "dest-70", "dest-76", "dest-79", "dest-82", "dest-85",
    ],
    accommodationIds: [
      "acc-1", "acc-3", "acc-4", "acc-5", "acc-6",
      "acc-8", "acc-10", "acc-11", "acc-16", "acc-17",
      "acc-19", "acc-22", "acc-23", "acc-24",
      "acc-25", "acc-27", "acc-28", "acc-30", "acc-31",
      "acc-33", "acc-34", "acc-35", "acc-36", "acc-37", "acc-39", "acc-47", "acc-48", "acc-49", "acc-50",
    ],
  },
  {
    id: "style-5",
    slug: "family",
    name: "Family",
    description: "Family-friendly adventures suitable for all ages",
    tourIds: ["tour-3", "tour-12", "tour-18", "tour-27", "tour-35", "tour-45", "tour-50", "tour-59"],
    destinationIds: [
      "dest-1", "dest-2", "dest-3", "dest-4", "dest-7",
      "dest-10", "dest-47", "dest-48", "dest-49", "dest-53",
      "dest-20", "dest-76", "dest-79", "dest-82",
    ],
    accommodationIds: ["acc-3", "acc-7", "acc-14", "acc-15", "acc-25", "acc-38", "acc-43", "acc-50"],
  },
  {
    id: "style-6",
    slug: "cultural",
    name: "Cultural",
    description: "Immersive journeys exploring local traditions and heritage",
    tourIds: [
      "tour-4", "tour-12", "tour-19", "tour-32", "tour-35",
      "tour-36", "tour-37", "tour-38", "tour-39", "tour-40", "tour-42", "tour-43", "tour-44", "tour-45",
      "tour-47", "tour-49", "tour-51", "tour-53", "tour-54", "tour-57", "tour-59", "tour-60",
    ],
    destinationIds: [
      "dest-1", "dest-2", "dest-3", "dest-5", "dest-7",
      "dest-8", "dest-12", "dest-49",
      "dest-20", "dest-61", "dest-65", "dest-69", "dest-73",
      "dest-76", "dest-79", "dest-82", "dest-85",
    ],
    accommodationIds: ["acc-2", "acc-5", "acc-15", "acc-25", "acc-27", "acc-30", "acc-44"],
  },
  {
    id: "style-7",
    slug: "photography",
    name: "Photography Safari",
    description:
      "Specialist photographic safaris with expert guides, hides, and optimal lighting schedules for capturing Africa's wildlife and landscapes",
    tourIds: ["tour-7", "tour-13", "tour-29", "tour-33", "tour-47", "tour-58"],
    destinationIds: [
      "dest-1", "dest-3", "dest-7", "dest-27", "dest-28",
      "dest-31", "dest-34", "dest-47",
      "dest-61", "dest-85",
    ],
    accommodationIds: ["acc-4", "acc-10", "acc-11", "acc-18", "acc-40"],
  },
  {
    id: "style-8",
    slug: "walking-safari",
    name: "Walking Safari",
    description:
      "On-foot bush experiences with armed guides, tracking wildlife at ground level through pristine wilderness areas",
    tourIds: ["tour-6", "tour-10", "tour-23"],
    destinationIds: [
      "dest-4", "dest-27", "dest-28",
      "dest-40", "dest-41", "dest-42",
    ],
    accommodationIds: ["acc-6", "acc-8"],
  },
  {
    id: "style-9",
    slug: "beach-island",
    name: "Beach & Island",
    description:
      "Tropical paradise escapes combining pristine beaches, crystal-clear waters, and marine adventures with barefoot luxury",
    tourIds: ["tour-9", "tour-17", "tour-22", "tour-25", "tour-27", "tour-34", "tour-36", "tour-41", "tour-48", "tour-50", "tour-53"],
    destinationIds: [
      "dest-10", "dest-44", "dest-45", "dest-53", "dest-54",
      "dest-55", "dest-56",
      "dest-20", "dest-26", "dest-65", "dest-68", "dest-76", "dest-82",
    ],
    accommodationIds: ["acc-3", "acc-19", "acc-23", "acc-24", "acc-26", "acc-48", "acc-49", "acc-50"],
  },
  {
    id: "style-10",
    slug: "fly-in-safari",
    name: "Fly-in Safari",
    description:
      "Light aircraft transfers between remote camps and lodges, maximising time in the wilderness and accessing areas unreachable by road",
    tourIds: ["tour-13", "tour-15", "tour-16", "tour-30"],
    destinationIds: [
      "dest-3", "dest-4", "dest-7", "dest-9",
      "dest-27", "dest-28", "dest-29",
    ],
    accommodationIds: ["acc-5", "acc-6", "acc-16", "acc-18"],
  },
];

/**
 * Get travel style by slug.
 */
export function getTravelStyle(slug: string): TravelStyle | undefined {
  return TRAVEL_STYLES.find((s) => s.slug === slug);
}
