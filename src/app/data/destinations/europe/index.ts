/**
 * Europe Destinations Aggregator
 *
 * Aggregates all European destinations (countries + regions).
 *
 * @module europe
 * @category data/destinations
 */

import { PORTUGAL } from "./portugal";
import { PORTUGAL_REGIONS } from "./portugal-regions";
import { ITALY } from "./italy";
import { ITALY_REGIONS } from "./italy-regions";
import { GREECE } from "./greece";
import { GREECE_REGIONS } from "./greece-regions";
import { ICELAND } from "./iceland";
import { ICELAND_REGIONS } from "./iceland-regions";

/**
 * All destinations in Europe (countries + regions)
 */
export const EUROPE_DESTINATIONS = [
  PORTUGAL,
  ...PORTUGAL_REGIONS,
  ITALY,
  ...ITALY_REGIONS,
  GREECE,
  ...GREECE_REGIONS,
  ICELAND,
  ...ICELAND_REGIONS,
];

/**
 * Only country-level destinations in Europe
 */
export const EUROPE_COUNTRIES = [
  PORTUGAL,
  ITALY,
  GREECE,
  ICELAND,
];

/**
 * Only region/city/park destinations in Europe
 */
export const EUROPE_REGIONS = [
  ...PORTUGAL_REGIONS,
  ...ITALY_REGIONS,
  ...GREECE_REGIONS,
  ...ICELAND_REGIONS,
];
