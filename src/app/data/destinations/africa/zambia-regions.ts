/**
 * Zambia - Regions and Parks
 * @module africa/zambia-regions
 * @category data/destinations
 */
import type { Destination } from "../../types";

export const ZAMBIA_REGIONS: Destination[] = [
  {
    id: "dest-41",
    slug: "south-luangwa",
    title: "South Luangwa National Park",
    excerpt:
      "The birthplace of the walking safari and one of Africa's greatest wildlife sanctuaries, famed for leopards, wild dogs, and authentic bush camp experiences.",
    content:
      "South Luangwa National Park is arguably Africa's finest walking safari destination and one of the continent's greatest wildlife sanctuaries. Covering 9,050 square kilometres in the Luangwa Valley, the park is fed by the Luangwa River, which creates oxbow lagoons, floodplains, and dense riverine forest teeming with wildlife.\n\nThe park is renowned for its leopard density — one of the highest in Africa — with regular sightings of these normally elusive cats. Walking safaris, pioneered here by legendary guide Norman Carr in the 1950s, remain the park's signature experience: tracking lion and elephant on foot with armed guides, interpreting animal tracks, and understanding the bush at a pace that vehicle-based safaris cannot match.\n\nBush camps in the Luangwa are typically intimate affairs of 4-8 rooms, often unfenced and set along the river. Night drives reveal a different world: hunting leopards, honey badgers, genets, and the park's endemic Thornicroft's giraffe. The camp-to-camp walking safari format, sleeping in different locations each night, is the ultimate immersive bush experience.",
    featuredImage:
      "https://images.unsplash.com/photo-1746719874157-d1e93ce6ca8b?w=800",
    parentId: "dest-40",
    continentId: "continent-1",
    type: "park",
    tourIds: ["tour-10", "tour-23"],
    accommodationIds: [],
    travelStyles: ["wildlife", "walking-safari", "adventure"],
    bestTime: "June - October (dry season; best game viewing & walking)",
    climate: "Hot in October 40C+; pleasant June-August 25C; closed roads in wet season",
    currency: "Zambian Kwacha (ZMW)",
    language: "English, Chichewa",
    timezone: "Central Africa Time (CAT, UTC+2)",
    highlights: [
      "Walking safaris — the original and best",
      "Exceptional leopard sighting frequency",
      "Thornicroft's giraffe — endemic subspecies",
      "Night drives — leopards, genets, civets",
      "Camp-to-camp walking safari format",
    ],
    coordinates: { lat: -13.0833, lng: 31.7500 },
  },
  {
    id: "dest-42",
    slug: "lower-zambezi",
    title: "Lower Zambezi National Park",
    excerpt:
      "Canoe past elephants on the mighty Zambezi River in one of Africa's most scenic and intimate wildlife destinations.",
    content:
      "The Lower Zambezi National Park is Zambia's most exclusive and scenically spectacular safari destination. Set along the northern bank of the Zambezi River opposite Zimbabwe's Mana Pools, the park offers a unique combination of land and water-based safari activities in a stunningly beautiful setting.\n\nCanoeing on the Zambezi is the park's signature experience — paddling silently past elephant herds drinking at the river's edge, hippo pods, and enormous crocodiles basking on sandbanks. The river's islands and channels create excellent fishing grounds for tiger fish, and the surrounding escarpment forest supports good populations of leopard, buffalo, and elephant.\n\nWith only a handful of lodges and camps, the Lower Zambezi maintains an intimate, uncrowded atmosphere. Activities blend seamlessly between game drives through the river valley, walks along the escarpment, fishing excursions, and sunset boat cruises — all against the dramatic backdrop of the Zambezi escarpment.",
    featuredImage:
      "https://images.unsplash.com/photo-1746719874157-d1e93ce6ca8b?w=800",
    parentId: "dest-40",
    continentId: "continent-1",
    type: "park",
    tourIds: ["tour-23"],
    accommodationIds: [],
    travelStyles: ["wildlife", "adventure", "luxury"],
    bestTime: "May - October (dry season; camps open April - November)",
    climate: "Hot valley climate; 35C+ October; cooler June-August",
    currency: "Zambian Kwacha (ZMW)",
    language: "English",
    timezone: "Central Africa Time (CAT, UTC+2)",
    highlights: [
      "Zambezi canoe safaris past elephants",
      "Tiger fish angling",
      "Dramatic escarpment scenery",
      "Intimate, exclusive camp atmosphere",
      "Combined land and water safari",
    ],
    coordinates: { lat: -15.2500, lng: 29.5000 },
  },
];
