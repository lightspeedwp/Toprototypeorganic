export * from "../taxonomies/accommodation-types";
export * from "./properties";

import { ACCOMMODATION } from "./properties";
import { ACCOMMODATION_ASIA } from "./properties-asia";
import { ACCOMMODATION_EUROPE } from "./properties-europe";
import { ACCOMMODATION_EXPANSION } from "./properties-expansion";

/**
 * All accommodation properties (50 total)
 * Africa (24) + Asia (8) + Europe (8) + Expansion (10)
 */
export const ALL_ACCOMMODATION = [
  ...ACCOMMODATION,
  ...ACCOMMODATION_ASIA,
  ...ACCOMMODATION_EUROPE,
  ...ACCOMMODATION_EXPANSION,
];

export {
  ACCOMMODATION,
  ACCOMMODATION_ASIA,
  ACCOMMODATION_EUROPE,
  ACCOMMODATION_EXPANSION,
};
