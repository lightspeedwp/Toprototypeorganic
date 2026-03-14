/**
 * Uganda - Country Destination Data
 * @module africa/uganda
 * @category data/destinations
 */

import type { Destination } from "../../types";

export const UGANDA: Destination = {
  id: "dest-12",
  slug: "uganda",
  title: "Uganda",
  excerpt:
    "The Pearl of Africa, where misty mountain forests shelter endangered gorillas and chimpanzees, and the Nile begins its epic journey north.",
  content:
    "Uganda is East Africa's most underrated gem, a compact country of extraordinary biodiversity where lush rainforests, snow-capped mountains, vast lakes, and rolling savannas create a patchwork of habitats unmatched on the continent. Winston Churchill famously called it 'the Pearl of Africa,' and the description still holds. Uganda's crown jewel is its population of endangered mountain gorillas in Bwindi Impenetrable Forest and Mgahinga Gorilla National Park — an encounter that ranks among the world's most profound wildlife experiences.\n\nBeyond gorillas, Uganda offers exceptional primate diversity: chimpanzee tracking in Kibale Forest, golden monkey encounters in the Virungas, and troops of colobus and red-tailed monkeys swinging through canopy walkways. Queen Elizabeth National Park delivers classic savanna safari with tree-climbing lions, enormous hippo pods, and the spectacular Kazinga Channel boat cruise. Murchison Falls, where the entire Nile forces through a 7-metre gap, provides one of Africa's most dramatic natural spectacles.\n\nUganda's cultural richness matches its natural heritage, with the Buganda Kingdom, Karamojong warriors, and Batwa pygmy communities offering immersive cultural exchanges. The country's rapidly improving tourism infrastructure, combined with significantly lower costs than neighbouring Kenya and Tanzania, makes it one of Africa's best-value safari destinations.",
  featuredImage:
    "https://images.unsplash.com/photo-1557447636-028d8c59b13c?w=800",
  continentId: "continent-1",
  type: "country",
  tourIds: ["tour-8", "tour-31"],
  accommodationIds: ["acc-21"],
  travelStyles: ["adventure", "wildlife"],
  bestTime: "June - September & December - February (dry seasons)",
  climate: "Tropical; moderated by altitude; two dry seasons",
  currency: "Ugandan Shilling (UGX)",
  language: "English and Swahili (both official), Luganda widely spoken",
  timezone: "East Africa Time (EAT, UTC+3)",
  highlights: [
    "Bwindi Impenetrable Forest — mountain gorilla trekking",
    "Kibale Forest — chimpanzee tracking capital of the world",
    "Murchison Falls — the Nile's most powerful waterfall",
    "Queen Elizabeth NP — tree-climbing lions and Kazinga Channel",
    "Rwenzori Mountains — snow-capped Mountains of the Moon",
    "Lake Bunyonyi — terraced hillside scenery and canoe trips",
  ],
  coordinates: { lat: 1.3733, lng: 32.2903 },
};
