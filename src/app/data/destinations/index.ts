/**
 * Destinations Data - Main Aggregator
 *
 * Central export point for all destination data organized by continent/region.
 *
 * @module destinations
 * @category data
 */

import { CONTINENTS } from "./continents";
import {
  AFRICA_DESTINATIONS,
  AFRICA_COUNTRIES,
  AFRICA_REGIONS,
  EAST_AFRICA,
  SOUTHERN_AFRICA,
} from "./africa";
import { ASIA_DESTINATIONS } from "./asia";
import { EUROPE_DESTINATIONS } from "./europe";
import { NORTH_AMERICA_DESTINATIONS } from "./north-america";
import { SOUTH_AMERICA_DESTINATIONS } from "./south-america";
import { OCEANIA_DESTINATIONS } from "./oceania";
import {
  INDIAN_OCEAN_DESTINATIONS,
  INDIAN_OCEAN_COUNTRIES,
  INDIAN_OCEAN_REGIONS,
} from "./indian-ocean";

/**
 * All destinations across all continents + Indian Ocean
 */
export const DESTINATIONS = [
  ...AFRICA_DESTINATIONS,
  ...INDIAN_OCEAN_DESTINATIONS,
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
  AFRICA_COUNTRIES,
  AFRICA_REGIONS,
  EAST_AFRICA,
  SOUTHERN_AFRICA,
  INDIAN_OCEAN_DESTINATIONS,
  INDIAN_OCEAN_COUNTRIES,
  INDIAN_OCEAN_REGIONS,
  ASIA_DESTINATIONS,
  EUROPE_DESTINATIONS,
  NORTH_AMERICA_DESTINATIONS,
  SOUTH_AMERICA_DESTINATIONS,
  OCEANIA_DESTINATIONS,
};