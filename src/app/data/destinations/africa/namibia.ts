/**
 * Namibia - Country Destination Data
 * @module africa/namibia
 * @category data/destinations
 */
import type { Destination } from "../../types";

export const NAMIBIA: Destination = {
  id: "dest-31",
  slug: "namibia",
  title: "Namibia",
  excerpt:
    "A land of stark, otherworldly beauty where towering red dunes, shipwreck-strewn coastlines, desert-adapted elephants, and some of the darkest skies on Earth create Africa's most photogenic destination.",
  content:
    "Namibia is a country of extremes and superlatives — the world's oldest desert, the tallest sand dunes, one of the least densely populated nations on Earth, and some of the most dramatic landscapes anywhere. From the rust-red dunes of Sossusvlei to the wildlife-rich plains of Etosha, from the Skeleton Coast's haunting shipwrecks to the ancient rock art of Twyfelfontein, Namibia offers landscapes and experiences unlike anywhere else in Africa.\n\nThe Namib Desert, estimated at 55-80 million years old, dominates the country's western edge with towering dunes reaching 300 metres. Sossusvlei's iconic dunes, particularly Big Daddy and Dune 45, have become symbols of African travel, while the surreal Deadvlei clay pan with its ancient camelthorn trees creates one of the world's most photographed scenes. Etosha National Park in the north provides classic safari around waterholes where elephant, lion, black rhino, and giraffe congregate.\n\nNamibia's conservation model is remarkable — community conservancies now cover over 20% of the country, protecting desert-adapted elephant, lion, and black rhino while creating local livelihoods. The country's excellent road network and low crime make it one of Africa's premier self-drive destinations, while its dark skies have earned international recognition for stargazing.",
  featuredImage:
    "https://images.unsplash.com/photo-1652439310454-a50203f01d8f?w=800",
  continentId: "continent-1",
  type: "country",
  tourIds: ["tour-7", "tour-20", "tour-33"],
  accommodationIds: ["acc-9", "acc-17"],
  travelStyles: ["adventure", "wildlife", "photography"],
  bestTime: "May - October (dry season); year-round for landscapes",
  climate: "Arid to semi-arid; hot days, cold desert nights; coastal fog belt",
  currency: "Namibian Dollar (NAD), South African Rand also accepted",
  language: "English (official), Afrikaans, Oshiwambo, German",
  timezone: "Central Africa Time (CAT, UTC+2)",
  highlights: [
    "Sossusvlei — towering red dunes and Deadvlei clay pan",
    "Etosha National Park — waterhole game viewing",
    "Skeleton Coast — shipwrecks and seal colonies",
    "Damaraland — desert-adapted elephants and Twyfelfontein rock art",
    "Fish River Canyon — world's second-largest canyon",
    "NamibRand Nature Reserve — International Dark Sky Reserve",
  ],
  coordinates: { lat: -22.9576, lng: 18.4904 },
};
