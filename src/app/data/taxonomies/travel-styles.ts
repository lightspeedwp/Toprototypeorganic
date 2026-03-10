import type { TravelStyle } from "../types";

/**
 * Travel Styles (Taxonomy)
 * Categorizes tours, destinations, and accommodation by the type of travel experience.
 */
export const TRAVEL_STYLES: TravelStyle[] = [
  {
    id: "style-1",
    slug: "honeymoon",
    name: "Honeymoon",
    description: "Romantic getaways designed for couples celebrating their love",
    tourIds: ["tour-1", "tour-2"],
    destinationIds: ["dest-1", "dest-7"],
    accommodationIds: ["acc-1", "acc-3"],
  },
  {
    id: "style-2",
    slug: "adventure",
    name: "Adventure",
    description: "Thrilling experiences for active travelers seeking excitement",
    tourIds: ["tour-3", "tour-4", "tour-6", "tour-7", "tour-8", "tour-10"],
    destinationIds: ["dest-4", "dest-6", "dest-8"],
    accommodationIds: ["acc-6", "acc-8", "acc-9"],
  },
  {
    id: "style-3",
    slug: "wildlife",
    name: "Wildlife",
    description: "Safari expeditions to observe nature's most magnificent creatures",
    tourIds: ["tour-2", "tour-4", "tour-5", "tour-6", "tour-7", "tour-8", "tour-10", "tour-11"],
    destinationIds: ["dest-3", "dest-4", "dest-5", "dest-6", "dest-9", "dest-10", "dest-11", "dest-12", "dest-13", "dest-14", "dest-16"],
    accommodationIds: ["acc-2", "acc-4", "acc-5", "acc-6", "acc-7", "acc-9"],
  },
  {
    id: "style-4",
    slug: "luxury",
    name: "Luxury",
    description: "Premium experiences with exceptional service and accommodations",
    tourIds: ["tour-1", "tour-2", "tour-5", "tour-6", "tour-9", "tour-11"],
    destinationIds: ["dest-1", "dest-2", "dest-3", "dest-4", "dest-7"],
    accommodationIds: ["acc-1", "acc-3", "acc-4", "acc-5", "acc-6", "acc-8"],
  },
  {
    id: "style-5",
    slug: "family",
    name: "Family",
    description: "Family-friendly adventures suitable for all ages",
    tourIds: ["tour-3", "tour-12"],
    destinationIds: ["dest-1", "dest-2", "dest-5", "dest-7"],
    accommodationIds: ["acc-3", "acc-7"],
  },
  {
    id: "style-6",
    slug: "cultural",
    name: "Cultural",
    description: "Immersive journeys exploring local traditions and heritage",
    tourIds: ["tour-4", "tour-12"],
    destinationIds: ["dest-1", "dest-2", "dest-5", "dest-7"],
    accommodationIds: ["acc-2", "acc-5"],
  },
];

/**
 * Get travel style by slug.
 */
export function getTravelStyle(slug: string): TravelStyle | undefined {
  return TRAVEL_STYLES.find(s => s.slug === slug);
}
