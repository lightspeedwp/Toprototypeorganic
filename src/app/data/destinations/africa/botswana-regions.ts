/**
 * Botswana - Regions and Parks
 * @module africa/botswana-regions
 * @category data/destinations
 */
import type { Destination } from "../../types";

export const BOTSWANA_REGIONS: Destination[] = [
  {
    id: "dest-28",
    slug: "okavango-delta",
    title: "Okavango Delta",
    excerpt:
      "The world's largest inland delta, a UNESCO World Heritage labyrinth of crystal-clear channels, palm islands, and floodplains teeming with wildlife.",
    content:
      "The Okavango Delta is one of the planet's most extraordinary ecosystems — a 22,000 square kilometre inland delta where the Okavango River spreads across the Kalahari Desert, creating a mosaic of permanent and seasonal waterways, islands, and floodplains. This UNESCO World Heritage Site supports one of Africa's greatest concentrations of wildlife, with the annual flood cycle (peaking May-August) transforming the landscape and drawing animals from surrounding dry areas.\n\nSafari in the Delta is uniquely varied. Glide silently through papyrus-lined channels in a traditional mokoro dugout canoe, tracking red lechwe and sitatunga in the shallows. Drive across palm-studded islands encountering lion, leopard, wild dog, and elephant. Walk with expert guides through pristine bush. And fly between camps in light aircraft, gaining a bird's-eye perspective of the Delta's extraordinary patterns.\n\nThe Delta's camps and lodges rank among Africa's most exclusive, with many accessible only by air. Intimate camps of just 6-12 rooms ensure personalised service and uncrowded game viewing in one of the last great wilderness areas on Earth.",
    featuredImage:
      "https://images.unsplash.com/photo-1652778287834-d626affb8eff?w=800",
    parentId: "dest-27",
    continentId: "continent-1",
    type: "region",
    tourIds: ["tour-6", "tour-15", "tour-26", "tour-30"],
    accommodationIds: ["acc-6", "acc-16"],
    travelStyles: ["adventure", "wildlife", "luxury", "fly-in-safari", "walking-safari"],
    bestTime: "May - October (dry/flood season); best wildlife viewing",
    climate: "Semi-arid with flooding; warm days 25-35C, cool winter nights",
    currency: "Botswana Pula (BWP)",
    language: "English, Setswana",
    timezone: "Central Africa Time (CAT, UTC+2)",
    highlights: [
      "Mokoro excursions through pristine channels",
      "Walking safaris on Delta islands",
      "Exceptional wild dog and leopard sightings",
      "Light aircraft scenic flights",
      "Night drives in private concessions",
    ],
    coordinates: { lat: -19.5000, lng: 22.9500 },
  },
  {
    id: "dest-29",
    slug: "chobe",
    title: "Chobe National Park",
    excerpt:
      "Home to Africa's largest elephant population, where herds of hundreds gather along the Chobe River in one of the continent's greatest wildlife spectacles.",
    content:
      "Chobe National Park is Botswana's first and most accessible national park, covering 11,700 square kilometres in the country's northeast corner. The park is most famous for its extraordinary elephant population — estimated at over 120,000 — making it the highest concentration of elephants in Africa. During the dry season, herds of several hundred elephants gather along the Chobe River to drink, bathe, and socialise.\n\nThe Chobe riverfront offers outstanding boat safaris, floating past elephants swimming across the channel, hippo pods, and enormous crocodiles sunning on sandbanks. Buffalo herds thousands strong graze the floodplains, attracting lion prides and other predators. The Savuti region, in the park's western section, is legendary for its predator density and the fascinating phenomenon of bull elephants that have learned to raid camps.\n\nChobe's proximity to Victoria Falls (just 80km) makes it a natural extension to any Falls visit, and the town of Kasane serves as a comfortable gateway with several excellent lodges along the riverfront.",
    featuredImage:
      "https://images.unsplash.com/photo-1595062889972-9c7125152cc0?w=800",
    parentId: "dest-27",
    continentId: "continent-1",
    type: "park",
    tourIds: ["tour-30"],
    accommodationIds: [],
    travelStyles: ["wildlife", "luxury", "family"],
    bestTime: "May - October (dry season — elephants gather at river)",
    climate: "Semi-arid; hot summers 35C+, mild dry winters",
    currency: "Botswana Pula (BWP)",
    language: "English, Setswana",
    timezone: "Central Africa Time (CAT, UTC+2)",
    highlights: [
      "120,000+ elephants — Africa's largest population",
      "Chobe River boat safaris",
      "Savuti predator encounters",
      "Buffalo herds thousands strong",
      "Easy combination with Victoria Falls",
    ],
    coordinates: { lat: -18.5000, lng: 25.1500 },
  },
];
