/**
 * Uganda - Regions and Parks
 * @module africa/uganda-regions
 * @category data/destinations
 */

import type { Destination } from "../../types";

export const UGANDA_REGIONS: Destination[] = [
  {
    id: "dest-13",
    slug: "bwindi",
    title: "Bwindi Impenetrable Forest",
    excerpt:
      "A UNESCO-listed montane rainforest sheltering nearly half the world's remaining mountain gorillas amid mist-draped canopy.",
    content:
      "Bwindi Impenetrable Forest National Park is one of Africa's most ancient and biologically rich habitats — a 331 square kilometre expanse of dense montane rainforest that has survived since the last ice age. Home to approximately 459 mountain gorillas, roughly half the world's remaining population, Bwindi offers the life-changing experience of trekking through tangled undergrowth to sit quietly with a habituated gorilla family.\n\nThe trek itself is an adventure: trails climb steeply through thick vegetation at altitudes between 1,160 and 2,607 metres, with hikes lasting from one to eight hours depending on the gorilla family's location. The reward — an hour observing silverbacks, playful juveniles, and nursing mothers at close range — is consistently described as one of the most moving wildlife encounters on Earth.\n\nBeyond gorillas, Bwindi supports over 120 mammal species, 348 bird species (including 23 Albertine Rift endemics), and more than 220 butterfly species. The surrounding Batwa pygmy communities offer cultural experiences that illuminate the forest's human history.",
    featuredImage:
      "https://images.unsplash.com/photo-1557447636-028d8c59b13c?w=800",
    parentId: "dest-12",
    continentId: "continent-1",
    type: "park",
    tourIds: ["tour-8", "tour-31"],
    accommodationIds: ["acc-21"],
    travelStyles: ["adventure", "wildlife"],
    bestTime: "June - September & December - February",
    climate: "Cool and misty; temperatures 7-20C; rain possible year-round",
    currency: "Ugandan Shilling (UGX)",
    language: "English, Rukiga, Rufumbira",
    timezone: "East Africa Time (EAT, UTC+3)",
    highlights: [
      "Mountain gorilla trekking — 1 hour with habituated families",
      "Gorilla habituation experience — extended 4 hours",
      "Batwa pygmy cultural trail",
      "Forest birding — 23 Albertine Rift endemics",
      "Waterfall trails and nature walks",
    ],
    coordinates: { lat: -1.0486, lng: 29.6149 },
  },
  {
    id: "dest-14",
    slug: "queen-elizabeth",
    title: "Queen Elizabeth National Park",
    excerpt:
      "Uganda's most diverse park where savanna meets rainforest, famous for tree-climbing lions and the wildlife-rich Kazinga Channel.",
    content:
      "Queen Elizabeth National Park is Uganda's most visited safari destination and one of the most scenically varied parks in Africa. Spanning 1,978 square kilometres across the western rift valley floor, the park encompasses open savanna, tropical forest, wetlands, crater lakes, and the shores of Lakes Edward and George connected by the Kazinga Channel — one of the continent's greatest wildlife-viewing waterways.\n\nThe park is renowned for its tree-climbing lions in the Ishasha sector, where prides habitually lounge in fig trees — a behaviour seen in only two places on Earth. The Kazinga Channel boat cruise reveals hundreds of hippos, enormous Nile crocodiles, and elephant herds drinking at the water's edge, with prolific birdlife including African fish eagles, shoebills, and pelicans.\n\nChimpanzee tracking in the Kyambura Gorge adds a primate dimension, while the Katwe explosion craters offer dramatic lunar landscapes. The park's position within the Albertine Rift means it supports an extraordinary 611 bird species — more than any other East African park.",
    featuredImage:
      "https://images.unsplash.com/photo-1557447636-028d8c59b13c?w=800",
    parentId: "dest-12",
    continentId: "continent-1",
    type: "park",
    tourIds: ["tour-31"],
    accommodationIds: [],
    travelStyles: ["adventure", "wildlife"],
    bestTime: "June - September & December - February",
    climate: "Warm tropical; 20-27C; two dry seasons",
    currency: "Ugandan Shilling (UGX)",
    language: "English, Rutooro",
    timezone: "East Africa Time (EAT, UTC+3)",
    highlights: [
      "Tree-climbing lions in Ishasha sector",
      "Kazinga Channel boat cruise",
      "Chimpanzee tracking in Kyambura Gorge",
      "Katwe explosion craters",
      "611 bird species — highest in East Africa",
    ],
    coordinates: { lat: -0.1974, lng: 30.0008 },
  },
];
