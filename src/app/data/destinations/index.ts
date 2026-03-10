/**
 * Destinations Data - Main Aggregator
 * 
 * Central export point for all destination data organized by continent.
 * This file aggregates destinations from all continents into a single array
 * and provides convenient exports for filtered subsets (countries only, regions only).
 * 
 * **Structure:**
 * - `/continents.ts` - Continent taxonomy
 * - `/africa/` - African destinations
 * - `/asia/` - Asian destinations (Phase 3)
 * - `/europe/` - European destinations (Phase 3)
 * - `/north-america/` - North American destinations (Phase 3)
 * - `/south-america/` - South American destinations (Phase 3)
 * - `/oceania/` - Oceanian destinations (Phase 3)
 * 
 * **Usage:**
 * ```typescript
 * import { DESTINATIONS, CONTINENTS, COUNTRIES, REGIONS } from "../data/destinations";
 * ```
 * 
 * @module destinations
 * @category data
 */

import { CONTINENTS } from "./continents";
import { AFRICA_DESTINATIONS } from "./africa";
import { ASIA_DESTINATIONS } from "./asia";
import { EUROPE_DESTINATIONS } from "./europe";
import { NORTH_AMERICA_DESTINATIONS } from "./north-america";
import { SOUTH_AMERICA_DESTINATIONS } from "./south-america";
import { OCEANIA_DESTINATIONS } from "./oceania";

/**
 * All destinations across all continents
 * 
 * Combines countries, regions, cities, and parks from:
 * - Africa
 * - Asia
 * - Europe
 * - North America
 * - South America
 * - Oceania
 */
export const DESTINATIONS = [
  ...AFRICA_DESTINATIONS,
  ...ASIA_DESTINATIONS,
  ...EUROPE_DESTINATIONS,
  ...NORTH_AMERICA_DESTINATIONS,
  ...SOUTH_AMERICA_DESTINATIONS,
  ...OCEANIA_DESTINATIONS,
];

/**
 * Export continents taxonomy
 */
export { CONTINENTS };

/**
 * Only country-level destinations (type: "country")
 */
export const COUNTRIES = DESTINATIONS.filter((d) => d.type === "country");

/**
 * Only region-level destinations (type: "region" | "city" | "park")
 */
export const REGIONS = DESTINATIONS.filter((d) => d.type !== "country");

/**
 * Export continent-specific aggregators for advanced filtering
 */
export {
  AFRICA_DESTINATIONS,
  ASIA_DESTINATIONS,
  EUROPE_DESTINATIONS,
  NORTH_AMERICA_DESTINATIONS,
  SOUTH_AMERICA_DESTINATIONS,
  OCEANIA_DESTINATIONS,
};
