/**
 * Asia Destinations Aggregator
 * 
 * Aggregates all Asian destinations (countries + regions).
 * 
 * @module asia
 * @category data/destinations
 */

import { THAILAND } from "./thailand";
import { THAILAND_REGIONS } from "./thailand-regions";

/**
 * All destinations in Asia (countries + regions)
 */
export const ASIA_DESTINATIONS = [
  THAILAND,
  ...THAILAND_REGIONS,
];

/**
 * Only country-level destinations in Asia
 */
export const ASIA_COUNTRIES = [
  THAILAND,
];

/**
 * Only region/city/park destinations in Asia
 */
export const ASIA_REGIONS = [
  ...THAILAND_REGIONS,
];