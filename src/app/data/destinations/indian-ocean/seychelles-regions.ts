/**
 * Seychelles - Regions
 * @module indian-ocean/seychelles-regions
 * @category data/destinations
 */
import type { Destination } from "../../types";

export const SEYCHELLES_REGIONS: Destination[] = [
  {
    id: "dest-55",
    slug: "mahe",
    title: "Mahe",
    excerpt:
      "The Seychelles' largest and most developed island, home to the capital Victoria, lush mountain hikes, and dozens of pristine granite-framed beaches.",
    content:
      "Mahe is the Seychelles' main island and the gateway to the archipelago, home to 90% of the population and the tiny capital Victoria — one of the world's smallest capital cities. Despite its role as the country's hub, Mahe retains a relaxed, unhurried atmosphere with over 65 beaches, mountainous jungle interior, and a growing selection of luxury resorts and boutique hotels.\n\nThe Morne Seychellois National Park covers 20% of the island, offering hiking trails through misty cloud forest to the 905-metre summit. Beau Vallon is the island's most popular beach with excellent snorkeling and a lively atmosphere, while Anse Intendance and Anse Takamaka on the south coast offer more secluded, wild beauty.\n\nMahe serves as the base for island-hopping excursions to Praslin and La Digue, and for accessing the outer islands. Victoria's colourful Sir Selwyn Selwyn-Clarke Market is the best place to experience local Creole culture, with stalls selling fresh fish, tropical fruits, spices, and handmade crafts.",
    featuredImage:
      "https://images.unsplash.com/photo-1563464638093-4d6c0cffbf67?w=800",
    parentId: "dest-54",
    continentId: "continent-1",
    type: "region",
    tourIds: ["tour-17"],
    accommodationIds: [],
    travelStyles: ["beach-island", "honeymoon", "luxury"],
    bestTime: "April - May & October - November (calmest seas)",
    climate: "Tropical; warm year-round 24-32C",
    currency: "Seychellois Rupee (SCR)",
    language: "Seychellois Creole, English, French",
    timezone: "Seychelles Time (SCT, UTC+4)",
    highlights: [
      "65+ beaches including Beau Vallon and Anse Intendance",
      "Morne Seychellois National Park hiking",
      "Victoria — world's smallest capital city",
      "Sir Selwyn Selwyn-Clarke Market",
      "Gateway to Praslin and La Digue",
    ],
    coordinates: { lat: -4.6796, lng: 55.4920 },
  },
  {
    id: "dest-56",
    slug: "praslin",
    title: "Praslin",
    excerpt:
      "Home to the UNESCO-listed Vallee de Mai and some of the world's most stunning beaches, Praslin is the Seychelles' second-largest island.",
    content:
      "Praslin is the Seychelles' second-largest island and arguably its most beautiful, combining world-class beaches with the unique UNESCO World Heritage Vallee de Mai forest. This prehistoric palm forest is the only place on Earth where the coco de mer palm grows naturally, its enormous double-lobed nuts weighing up to 25kg — the world's largest seed.\n\nAnse Lazio, consistently ranked among the world's top beaches, features a crescent of powder-white sand framed by granite boulders and lapped by crystal-clear water. Anse Georgette, accessible only by foot or boat, offers even more seclusion. The island's coral reefs provide excellent snorkeling directly from the beach.\n\nPraslin's hotels range from intimate guesthouses to luxury resorts, many set directly on the beach. The island serves as the departure point for La Digue (15 minutes by ferry) and for diving excursions to the Aride Island Special Reserve and the remote Curieuse Island, where giant tortoises roam freely.",
    featuredImage:
      "https://images.unsplash.com/photo-1563464638093-4d6c0cffbf67?w=800",
    parentId: "dest-54",
    continentId: "continent-1",
    type: "region",
    tourIds: ["tour-17"],
    accommodationIds: ["acc-24"],
    travelStyles: ["beach-island", "honeymoon", "luxury"],
    bestTime: "April - May & October - November (calmest seas)",
    climate: "Tropical; warm year-round 24-32C",
    currency: "Seychellois Rupee (SCR)",
    language: "Seychellois Creole, English, French",
    timezone: "Seychelles Time (SCT, UTC+4)",
    highlights: [
      "Vallee de Mai UNESCO forest — coco de mer palms",
      "Anse Lazio — world's top-rated beach",
      "Anse Georgette — secluded paradise",
      "Giant tortoise encounters on Curieuse Island",
      "Gateway to La Digue island",
    ],
    coordinates: { lat: -4.3333, lng: 55.7500 },
  },
];
