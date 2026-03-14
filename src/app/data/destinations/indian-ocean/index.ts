/**
 * Indian Ocean Islands Destinations Aggregator
 *
 * Aggregates all Indian Ocean Island destinations.
 * These are grouped separately from mainland Africa for the
 * 3-region structure: East Africa, Southern Africa, Indian Ocean Islands.
 *
 * @module indian-ocean
 * @category data/destinations
 */

import { MADAGASCAR } from "./madagascar";
import { MADAGASCAR_REGIONS } from "./madagascar-regions";
import { MAURITIUS } from "./mauritius";
import { SEYCHELLES } from "./seychelles";
import { SEYCHELLES_REGIONS } from "./seychelles-regions";

/**
 * All Indian Ocean Island destinations
 */
export const INDIAN_OCEAN_DESTINATIONS = [
  MADAGASCAR,
  ...MADAGASCAR_REGIONS,
  MAURITIUS,
  SEYCHELLES,
  ...SEYCHELLES_REGIONS,
];

/**
 * Only country-level Indian Ocean destinations
 */
export const INDIAN_OCEAN_COUNTRIES = [MADAGASCAR, MAURITIUS, SEYCHELLES];

/**
 * Only region-level Indian Ocean destinations
 */
export const INDIAN_OCEAN_REGIONS = [
  ...MADAGASCAR_REGIONS,
  ...SEYCHELLES_REGIONS,
];
