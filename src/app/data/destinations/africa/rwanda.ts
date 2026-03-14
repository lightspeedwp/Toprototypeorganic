/**
 * Rwanda - Country Destination Data
 * @module africa/rwanda
 * @category data/destinations
 */

import type { Destination } from "../../types";

export const RWANDA: Destination = {
  id: "dest-15",
  slug: "rwanda",
  title: "Rwanda",
  excerpt:
    "The Land of a Thousand Hills, where mist-shrouded volcanoes shelter endangered mountain gorillas and a remarkable national transformation inspires the world.",
  content:
    "Rwanda has emerged as one of Africa's most compelling destinations, a tiny landlocked nation that has transformed itself from tragedy into a beacon of conservation, innovation, and hospitality. Known as the Land of a Thousand Hills for its endlessly undulating terrain, Rwanda offers some of the continent's most exclusive and intimate wildlife experiences.\n\nThe Volcanoes National Park, part of the Virunga massif shared with Uganda and the DRC, is the premier destination for mountain gorilla trekking. Rwanda's gorilla permits, while among the most expensive in Africa, fund conservation and community programmes that have helped gorilla populations grow. The experience of trekking through bamboo forest to encounter a silverback at close range is profoundly moving.\n\nBeyond gorillas, Rwanda surprises with its diversity: Nyungwe Forest National Park shelters 13 primate species including chimpanzees and L'Hoest's monkeys, with a spectacular canopy walkway suspended above the treetops. Akagera National Park in the east provides classic Big Five savanna safari, completing Rwanda's transformation into a year-round wildlife destination. Kigali, one of Africa's cleanest and safest capitals, serves as a sophisticated base with excellent restaurants, vibrant arts, and the deeply moving Genocide Memorial.",
  featuredImage:
    "https://images.unsplash.com/photo-1662612732223-1fe6ea43263e?w=800",
  continentId: "continent-1",
  type: "country",
  tourIds: ["tour-14", "tour-31"],
  accommodationIds: ["acc-20"],
  travelStyles: ["adventure", "wildlife", "luxury"],
  bestTime: "June - September & December - February (dry seasons)",
  climate: "Temperate tropical highland; cooler than expected for equatorial",
  currency: "Rwandan Franc (RWF)",
  language: "Kinyarwanda, English, French, Swahili (all official)",
  timezone: "Central Africa Time (CAT, UTC+2)",
  highlights: [
    "Volcanoes NP — mountain gorilla and golden monkey trekking",
    "Nyungwe Forest — chimpanzees and canopy walkway",
    "Akagera NP — Big Five savanna safari",
    "Kigali — vibrant capital with Genocide Memorial",
    "Lake Kivu — scenic lakeside relaxation",
    "Tea and coffee plantation tours in the highlands",
  ],
  coordinates: { lat: -1.9403, lng: 29.8739 },
};
