/**
 * Africa Destinations Aggregator
 * 
 * Aggregates all African destinations (countries + regions).
 * 
 * @module africa
 * @category data/destinations
 */

import { SOUTH_AFRICA } from "./south-africa";
import { SOUTH_AFRICA_REGIONS } from "./south-africa-regions";
import { KENYA } from "./kenya";
import { KENYA_REGIONS } from "./kenya-regions";
import { TANZANIA } from "./tanzania";
import { TANZANIA_REGIONS } from "./tanzania-regions";
import { MOROCCO } from "./morocco";
import { MOROCCO_REGIONS } from "./morocco-regions";
import { EGYPT } from "./egypt";

/**
 * All destinations in Africa (countries + regions)
 */
export const AFRICA_DESTINATIONS = [
  SOUTH_AFRICA,
  ...SOUTH_AFRICA_REGIONS,
  KENYA,
  ...KENYA_REGIONS,
  TANZANIA,
  ...TANZANIA_REGIONS,
  MOROCCO,
  ...MOROCCO_REGIONS,
  EGYPT,
];

/**
 * Only country-level destinations in Africa
 */
export const AFRICA_COUNTRIES = [
  SOUTH_AFRICA,
  KENYA,
  TANZANIA,
  MOROCCO,
  EGYPT,
];

/**
 * Only region/city/park destinations in Africa
 */
export const AFRICA_REGIONS = [
  ...SOUTH_AFRICA_REGIONS,
  ...KENYA_REGIONS,
  ...TANZANIA_REGIONS,
  ...MOROCCO_REGIONS,
];