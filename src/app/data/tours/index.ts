export * from "../taxonomies/travel-styles";
export * from "./data";

import { TOURS } from "./data";
import { TOURS_ASIA } from "./tours-asia";
import { TOURS_EUROPE } from "./tours-europe";

/**
 * All tours (61 total)
 * Africa (35) + Asia (13) + Europe (13)
 */
export const ALL_TOURS = [
  ...TOURS,
  ...TOURS_ASIA,
  ...TOURS_EUROPE,
];

export { TOURS, TOURS_ASIA, TOURS_EUROPE };
