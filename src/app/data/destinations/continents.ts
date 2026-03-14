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
    destinationIds: [
      "dest-1", "dest-2", "dest-3", "dest-4", "dest-5", "dest-6",
      "dest-7", "dest-8", "dest-9", "dest-10", "dest-11",
      "dest-12", "dest-13", "dest-14", "dest-15", "dest-16", "dest-17",
      "dest-18", "dest-19", "dest-22",
      "dest-27", "dest-28", "dest-29",
      "dest-31", "dest-32", "dest-33", "dest-34",
      "dest-36", "dest-37", "dest-38",
      "dest-40", "dest-41", "dest-42",
      "dest-44", "dest-45",
      "dest-47", "dest-48", "dest-49", "dest-50",
      "dest-51", "dest-52", "dest-53", "dest-54", "dest-55", "dest-56",
    ],
  },
  {
    id: "continent-2",
    slug: "asia",
    name: "Asia",
    description: "Discover ancient temples, modern cities, tropical beaches, and rich cultural heritage across the world's largest continent.",
    destinationIds: [
      "dest-20", "dest-25", "dest-26",
      "dest-57", "dest-58", "dest-59", "dest-60",
      "dest-61", "dest-62", "dest-63", "dest-64",
      "dest-65", "dest-66", "dest-67", "dest-68",
      "dest-69", "dest-70", "dest-71", "dest-72",
      "dest-73", "dest-74", "dest-75",
    ],
  },
  {
    id: "continent-3",
    slug: "europe",
    name: "Europe",
    description: "Explore centuries of history, world-class art, diverse cuisines, and iconic cities across this culturally rich continent.",
    destinationIds: [
      "dest-76", "dest-77", "dest-78",
      "dest-79", "dest-80", "dest-81",
      "dest-82", "dest-83", "dest-84",
      "dest-85", "dest-86", "dest-87",
    ],
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