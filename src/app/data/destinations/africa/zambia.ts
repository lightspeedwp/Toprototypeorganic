/**
 * Zambia - Country Destination Data
 * @module africa/zambia
 * @category data/destinations
 */
import type { Destination } from "../../types";

export const ZAMBIA: Destination = {
  id: "dest-40",
  slug: "zambia",
  title: "Zambia",
  excerpt:
    "The birthplace of the walking safari, where pristine wilderness, the mighty Zambezi, and Victoria Falls combine for Africa's most authentic bush experiences.",
  content:
    "Zambia is where the walking safari was born and where it remains at its finest. This vast, unspoiled country offers some of Africa's most authentic and intimate wildlife encounters, with experienced guides leading guests on foot through pristine bush in parks like South Luangwa and the Lower Zambezi. The country's low tourism numbers and high conservation commitment create experiences of genuine wilderness.\n\nSouth Luangwa National Park is Zambia's flagship destination, renowned for its leopard density, excellent guiding, and the intimate bush camp experience. The Luangwa River draws enormous concentrations of hippos, crocodiles, and elephants, while the surrounding miombo woodland shelters wild dogs, lions, and endemic Thornicroft's giraffes. The Lower Zambezi National Park offers a different flavour — canoeing past elephants on the Zambezi River, fishing for tiger fish, and exceptional river-based game viewing.\n\nVictoria Falls on Zambia's southern border provides the adrenaline counterpoint to the country's tranquil safari offerings. Livingstone town has developed into a sophisticated destination with excellent restaurants and riverside lodges offering front-row seats to one of nature's greatest spectacles.",
  featuredImage:
    "https://images.unsplash.com/photo-1746719874157-d1e93ce6ca8b?w=800",
  continentId: "continent-1",
  type: "country",
  tourIds: ["tour-10", "tour-23"],
  accommodationIds: ["acc-8"],
  travelStyles: ["adventure", "wildlife", "walking-safari"],
  bestTime: "May - October (dry season); emerald season Nov - March for birding",
  climate: "Tropical; dry cool May-August, hot dry September-October, wet November-April",
  currency: "Zambian Kwacha (ZMW)",
  language: "English (official), Bemba, Nyanja, Tonga",
  timezone: "Central Africa Time (CAT, UTC+2)",
  highlights: [
    "South Luangwa — birthplace of the walking safari",
    "Lower Zambezi — canoe safaris on the Zambezi River",
    "Victoria Falls — Zambian side with Devil's Pool",
    "Kafue National Park — Zambia's largest and wildest",
    "Bangweulu Wetlands — shoebill stork habitat",
    "Liuwa Plain — second-largest wildebeest migration",
  ],
  coordinates: { lat: -13.1339, lng: 27.8493 },
};
