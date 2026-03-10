/**
 * Continents Taxonomy
 * 
 * Defines all continents for destination organization.
 * Used for filtering and navigation in the destinations archive.
 * 
 * Uses the Continent interface from types.ts for compatibility.
 * 
 * @module continents
 * @category data
 */

import type { Continent } from "../types";

/**
 * All continents with metadata
 */
export const CONTINENTS: Continent[] = [
  {
    id: "continent-1",
    slug: "africa",
    name: "Africa",
    description: "Experience diverse wildlife, ancient cultures, and stunning landscapes from the Sahara to Cape Town.",
    destinationIds: ["dest-1", "dest-2"],
  },
  {
    id: "continent-2",
    slug: "asia",
    name: "Asia",
    description: "Discover ancient temples, modern cities, tropical beaches, and rich cultural heritage across the world's largest continent.",
    destinationIds: [],
  },
  {
    id: "continent-3",
    slug: "europe",
    name: "Europe",
    description: "Explore centuries of history, world-class art, diverse cuisines, and iconic cities across this culturally rich continent.",
    destinationIds: [],
  },
  {
    id: "continent-4",
    slug: "north-america",
    name: "North America",
    description: "From Arctic wilderness to tropical beaches, discover vast national parks, vibrant cities, and diverse cultures.",
    destinationIds: [],
  },
  {
    id: "continent-5",
    slug: "south-america",
    name: "South America",
    description: "Journey through ancient ruins, Amazon rainforests, Andean peaks, and passionate cultures across this diverse continent.",
    destinationIds: [],
  },
  {
    id: "continent-6",
    slug: "oceania",
    name: "Oceania",
    description: "Explore pristine beaches, unique wildlife, indigenous cultures, and breathtaking natural wonders across the Pacific.",
    destinationIds: [],
  },
];
