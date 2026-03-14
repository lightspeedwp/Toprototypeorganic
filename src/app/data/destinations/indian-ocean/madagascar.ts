/**
 * Madagascar - Country Destination Data
 * @module indian-ocean/madagascar
 * @category data/destinations
 */
import type { Destination } from "../../types";

export const MADAGASCAR: Destination = {
  id: "dest-51",
  slug: "madagascar",
  title: "Madagascar",
  excerpt:
    "The world's fourth-largest island, where 90% of wildlife is found nowhere else on Earth — lemurs, baobabs, chameleons, and rainforests create a living laboratory of evolution.",
  content:
    "Madagascar is unlike anywhere else on Earth. Separated from Africa 160 million years ago, this island continent has evolved a staggering array of unique species — over 90% of its wildlife and 80% of its plants are endemic, found nowhere else on the planet. Lemurs are the island's iconic residents, with 111 species ranging from the tiny mouse lemur (the world's smallest primate) to the indri, whose haunting calls echo through the eastern rainforests.\n\nThe landscapes are equally extraordinary. The Avenue of the Baobabs, with its towering 800-year-old trees silhouetted against sunset skies, is one of Africa's most photographed scenes. The limestone tsingy formations of Bemaraha create an alien landscape of razor-sharp pinnacles. Eastern rainforests harbour most of the island's biodiversity, while the arid south resembles the American Southwest with spiny forests of Octopus trees.\n\nMadagascar's cultural heritage blends Southeast Asian, African, and Arab influences — the Malagasy people share genetic ties with Borneo's Dayak people, arriving by outrigger canoe 2,000 years ago. Rice paddies, zebu cattle, and warm hospitality characterise rural life. Nosy Be island in the northwest offers tropical beach relaxation with whale shark encounters and coral reef diving.",
  featuredImage:
    "https://images.unsplash.com/photo-1659944984855-776187144baf?w=800",
  continentId: "continent-1",
  type: "country",
  tourIds: ["tour-24"],
  accommodationIds: [],
  travelStyles: ["adventure", "wildlife"],
  bestTime: "April - October (dry season); September-October (best for lemurs)",
  climate: "Tropical; varies by region — humid east, arid south, temperate highlands",
  currency: "Malagasy Ariary (MGA)",
  language: "Malagasy and French (both official)",
  timezone: "East Africa Time (EAT, UTC+3)",
  highlights: [
    "Lemurs — 111 endemic species found nowhere else",
    "Avenue of the Baobabs — iconic sunset silhouettes",
    "Tsingy de Bemaraha — razor-sharp limestone formations",
    "Andasibe-Mantadia — indri calls and rainforest biodiversity",
    "Nosy Be — tropical island with whale sharks",
    "Isalo National Park — dramatic sandstone canyons",
  ],
  coordinates: { lat: -18.7669, lng: 46.8691 },
};
