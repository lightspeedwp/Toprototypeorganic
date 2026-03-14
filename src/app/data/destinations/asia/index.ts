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
import { SRI_LANKA } from "./sri-lanka";
import { SRI_LANKA_REGIONS } from "./sri-lanka-regions";
import { VIETNAM } from "./vietnam";
import { VIETNAM_REGIONS } from "./vietnam-regions";
import { INDONESIA } from "./indonesia";
import { INDONESIA_REGIONS } from "./indonesia-regions";
import { JAPAN } from "./japan";
import { JAPAN_REGIONS } from "./japan-regions";
import { CAMBODIA } from "./cambodia";
import { CAMBODIA_REGIONS } from "./cambodia-regions";

/**
 * All destinations in Asia (countries + regions)
 */
export const ASIA_DESTINATIONS = [
  THAILAND,
  ...THAILAND_REGIONS,
  SRI_LANKA,
  ...SRI_LANKA_REGIONS,
  VIETNAM,
  ...VIETNAM_REGIONS,
  INDONESIA,
  ...INDONESIA_REGIONS,
  JAPAN,
  ...JAPAN_REGIONS,
  CAMBODIA,
  ...CAMBODIA_REGIONS,
];

/**
 * Only country-level destinations in Asia
 */
export const ASIA_COUNTRIES = [
  THAILAND,
  SRI_LANKA,
  VIETNAM,
  INDONESIA,
  JAPAN,
  CAMBODIA,
];

/**
 * Only region/city/park destinations in Asia
 */
export const ASIA_REGIONS = [
  ...THAILAND_REGIONS,
  ...SRI_LANKA_REGIONS,
  ...VIETNAM_REGIONS,
  ...INDONESIA_REGIONS,
  ...JAPAN_REGIONS,
  ...CAMBODIA_REGIONS,
];
