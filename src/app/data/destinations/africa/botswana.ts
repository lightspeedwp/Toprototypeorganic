/**
 * Botswana - Country Destination Data
 * @module africa/botswana
 * @category data/destinations
 */
import type { Destination } from "../../types";

export const BOTSWANA: Destination = {
  id: "dest-27",
  slug: "botswana",
  title: "Botswana",
  excerpt:
    "Africa's premier wilderness destination, where the Okavango Delta's crystal waters, the Kalahari's ancient sands, and a low-volume, high-value tourism model create the continent's most exclusive safari experiences.",
  content:
    "Botswana represents the pinnacle of African safari — a vast, sparsely populated country that has chosen quality over quantity, protecting nearly 40% of its land as national parks and reserves while maintaining some of the highest tourism prices on the continent. The result is an unmatched wilderness experience where you share extraordinary wildlife encounters with very few other visitors.\n\nThe Okavango Delta, a UNESCO World Heritage Site, is Botswana's crown jewel — the world's largest inland delta where the Okavango River fans out across the Kalahari sands, creating a labyrinth of waterways, islands, and floodplains that supports extraordinary biodiversity. Safari here combines mokoro (dugout canoe) excursions through papyrus channels with game drives across palm-dotted islands, offering a uniquely aquatic perspective on classic African wildlife.\n\nChobe National Park in the north holds one of Africa's largest elephant populations, with herds of several hundred gathering along the Chobe River. The Makgadikgadi Pans — vast, ancient salt flats — offer surreal landscapes and seasonal zebra migrations. The Central Kalahari Game Reserve provides remote desert safari with black-maned lions, brown hyenas, and San Bushman cultural encounters.",
  featuredImage:
    "https://images.unsplash.com/photo-1652778287834-d626affb8eff?w=800",
  continentId: "continent-1",
  type: "country",
  tourIds: ["tour-6", "tour-15", "tour-26", "tour-30"],
  accommodationIds: ["acc-6", "acc-16"],
  travelStyles: ["adventure", "wildlife", "luxury"],
  bestTime: "May - October (dry season); November - March (green season)",
  climate: "Semi-arid; hot summers, mild dry winters; Delta floods May-September",
  currency: "Botswana Pula (BWP)",
  language: "English (official), Setswana widely spoken",
  timezone: "Central Africa Time (CAT, UTC+2)",
  highlights: [
    "Okavango Delta — mokoro safaris through pristine waterways",
    "Chobe National Park — massive elephant herds on the river",
    "Makgadikgadi Pans — surreal salt flat landscapes",
    "Central Kalahari — black-maned lions and desert wildlife",
    "Moremi Game Reserve — predator-rich wilderness",
    "San Bushman cultural walks in the Kalahari",
  ],
  coordinates: { lat: -22.3285, lng: 24.6849 },
};
