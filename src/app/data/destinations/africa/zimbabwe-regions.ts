/**
 * Zimbabwe - Regions and Parks
 * @module africa/zimbabwe-regions
 * @category data/destinations
 */
import type { Destination } from "../../types";

export const ZIMBABWE_REGIONS: Destination[] = [
  {
    id: "dest-37",
    slug: "hwange",
    title: "Hwange National Park",
    excerpt:
      "Zimbabwe's largest national park, home to one of Africa's biggest elephant populations and exceptional predator viewing around natural waterholes.",
    content:
      "Hwange National Park covers 14,651 square kilometres of western Zimbabwe and is the country's premier safari destination. The park is famous for its elephant population — estimated at over 40,000 — alongside lion prides, wild dog packs, and the elusive sable and roan antelope that are Zimbabwe's specialities.\n\nHwange's game viewing revolves around its network of over 60 pumped waterholes, creating reliable wildlife concentration points during the dry season. Sitting at a waterhole hide as hundreds of elephants arrive to drink, trumpeting and jostling, is one of Africa's greatest spectacles. The park's diverse habitats — Kalahari sand woodland, mopane forest, and open grassland — support over 100 mammal species and 400 bird species.\n\nThe park's southern section, accessed from Victoria Falls (just 2 hours away), offers the best-developed tourism infrastructure, while the more remote Sinamatella and Robins areas in the north provide wilder, less-visited alternatives.",
    featuredImage:
      "https://images.unsplash.com/photo-1674573606969-0b0403e6fce1?w=800",
    parentId: "dest-36",
    continentId: "continent-1",
    type: "park",
    tourIds: ["tour-11", "tour-21"],
    accommodationIds: [],
    travelStyles: ["wildlife", "adventure"],
    bestTime: "July - October (dry season — best waterhole viewing)",
    climate: "Semi-arid; hot 35C+ October, cool nights June-August",
    currency: "US Dollar (USD)",
    language: "English, Ndebele",
    timezone: "Central Africa Time (CAT, UTC+2)",
    highlights: [
      "40,000+ elephants — one of Africa's largest herds",
      "Waterhole hide photography sessions",
      "Wild dog pack encounters",
      "Sable and roan antelope — Zimbabwe specials",
      "Easy combination with Victoria Falls",
    ],
    coordinates: { lat: -19.0000, lng: 26.5000 },
  },
  {
    id: "dest-38",
    slug: "victoria-falls-zw",
    title: "Victoria Falls (Zimbabwe)",
    excerpt:
      "The Zimbabwean side of the world's largest curtain of falling water, offering dramatic viewpoints, adventure activities, and the iconic Vic Falls spray.",
    content:
      "Victoria Falls — known locally as Mosi-oa-Tunya, 'The Smoke That Thunders' — is one of the Seven Natural Wonders of the World. The falls are 1,708 metres wide and 108 metres high, creating the largest curtain of falling water on Earth. During peak flow (March-May), the spray rises over 400 metres and is visible from 50 kilometres away.\n\nThe Zimbabwe side offers the best viewing of the falls, with a network of footpaths through the rainforest that provide 16 different viewpoints along the gorge rim. The iconic Devil's Pool on the Zambian lip is accessible from the Zimbabwe side during low water (September-December). Beyond the falls, Victoria Falls town has become southern Africa's adventure capital with bungee jumping, white-water rafting, helicopter flights, and microlight flights.\n\nThe town serves as a gateway to Hwange National Park (2 hours) and the Zambezi National Park, where river cruises offer sunset game viewing with elephants, hippos, and crocodiles along the Zambezi.",
    featuredImage:
      "https://images.unsplash.com/photo-1674573606969-0b0403e6fce1?w=800",
    parentId: "dest-36",
    continentId: "continent-1",
    type: "region",
    tourIds: ["tour-21"],
    accommodationIds: [],
    travelStyles: ["adventure", "luxury", "honeymoon"],
    bestTime: "February - May (peak flow); September - December (low water for Devil's Pool)",
    climate: "Subtropical; warm year-round 20-35C; rain November-March",
    currency: "US Dollar (USD)",
    language: "English, Ndebele, Tonga",
    timezone: "Central Africa Time (CAT, UTC+2)",
    highlights: [
      "16 viewpoints along the gorge rim",
      "Devil's Pool swimming on the lip (low water season)",
      "Bungee jumping from Victoria Falls Bridge",
      "Helicopter 'Flight of Angels'",
      "Zambezi sunset river cruises",
    ],
    coordinates: { lat: -17.9243, lng: 25.8572 },
  },
];
