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
import { UGANDA } from "./uganda";
import { UGANDA_REGIONS } from "./uganda-regions";
import { RWANDA } from "./rwanda";
import { RWANDA_REGIONS } from "./rwanda-regions";
import { BOTSWANA } from "./botswana";
import { BOTSWANA_REGIONS } from "./botswana-regions";
import { NAMIBIA } from "./namibia";
import { NAMIBIA_REGIONS } from "./namibia-regions";
import { ZIMBABWE } from "./zimbabwe";
import { ZIMBABWE_REGIONS } from "./zimbabwe-regions";
import { ZAMBIA } from "./zambia";
import { ZAMBIA_REGIONS } from "./zambia-regions";
import { MOZAMBIQUE } from "./mozambique";
import { MOZAMBIQUE_REGIONS } from "./mozambique-regions";

/**
 * All destinations in Africa (countries + regions)
 */
export const AFRICA_DESTINATIONS = [
  // Southern Africa
  SOUTH_AFRICA,
  ...SOUTH_AFRICA_REGIONS,
  BOTSWANA,
  ...BOTSWANA_REGIONS,
  NAMIBIA,
  ...NAMIBIA_REGIONS,
  ZIMBABWE,
  ...ZIMBABWE_REGIONS,
  ZAMBIA,
  ...ZAMBIA_REGIONS,
  MOZAMBIQUE,
  ...MOZAMBIQUE_REGIONS,
  // East Africa
  KENYA,
  ...KENYA_REGIONS,
  TANZANIA,
  ...TANZANIA_REGIONS,
  UGANDA,
  ...UGANDA_REGIONS,
  RWANDA,
  ...RWANDA_REGIONS,
  // North Africa
  MOROCCO,
  ...MOROCCO_REGIONS,
  EGYPT,
];

/**
 * Only country-level destinations in Africa
 */
export const AFRICA_COUNTRIES = [
  SOUTH_AFRICA,
  BOTSWANA,
  NAMIBIA,
  ZIMBABWE,
  ZAMBIA,
  MOZAMBIQUE,
  KENYA,
  TANZANIA,
  UGANDA,
  RWANDA,
  MOROCCO,
  EGYPT,
];

/**
 * Only region/city/park destinations in Africa
 */
export const AFRICA_REGIONS = [
  ...SOUTH_AFRICA_REGIONS,
  ...BOTSWANA_REGIONS,
  ...NAMIBIA_REGIONS,
  ...ZIMBABWE_REGIONS,
  ...ZAMBIA_REGIONS,
  ...MOZAMBIQUE_REGIONS,
  ...KENYA_REGIONS,
  ...TANZANIA_REGIONS,
  ...UGANDA_REGIONS,
  ...RWANDA_REGIONS,
  ...MOROCCO_REGIONS,
];

/**
 * Macro-region groupings for navigation
 */
export const EAST_AFRICA = [
  KENYA,
  ...KENYA_REGIONS,
  TANZANIA,
  ...TANZANIA_REGIONS,
  UGANDA,
  ...UGANDA_REGIONS,
  RWANDA,
  ...RWANDA_REGIONS,
];

export const SOUTHERN_AFRICA = [
  SOUTH_AFRICA,
  ...SOUTH_AFRICA_REGIONS,
  BOTSWANA,
  ...BOTSWANA_REGIONS,
  NAMIBIA,
  ...NAMIBIA_REGIONS,
  ZIMBABWE,
  ...ZIMBABWE_REGIONS,
  ZAMBIA,
  ...ZAMBIA_REGIONS,
  MOZAMBIQUE,
  ...MOZAMBIQUE_REGIONS,
];
