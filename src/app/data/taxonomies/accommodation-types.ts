import type { AccommodationType } from "../types";

/**
 * Accommodation Types (Taxonomy)
 * Categorizes accommodation by type (Hotel, Resort, Lodge, etc.).
 */
export const ACCOMMODATION_TYPES: AccommodationType[] = [
  {
    id: "type-1",
    slug: "hotel",
    name: "Hotel",
    description: "Comfortable city hotels with modern amenities",
    accommodationIds: ["acc-1"],
  },
  {
    id: "type-2",
    slug: "lodge",
    name: "Lodge",
    description: "Safari lodges in prime wildlife viewing locations",
    accommodationIds: ["acc-2"],
  },
  {
    id: "type-3",
    slug: "resort",
    name: "Resort",
    description: "Beachfront resorts with full facilities",
    accommodationIds: ["acc-3"],
  },
];

/**
 * Get accommodation type by slug.
 */
export function getAccommodationType(slug: string): AccommodationType | undefined {
  return ACCOMMODATION_TYPES.find(t => t.slug === slug);
}
