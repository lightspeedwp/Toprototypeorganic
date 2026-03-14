/**
 * South Africa - Regions, Cities, and Parks
 * 
 * All region-type destinations within South Africa.
 * 
 * @module africa/south-africa-regions
 * @category data/destinations
 */

import type { Destination } from "../../types";

export const SOUTH_AFRICA_REGIONS: Destination[] = [
  {
    id: "dest-2",
    slug: "cape-town",
    title: "Cape Town",
    excerpt: "Where majestic mountains meet pristine beaches, this Mother City combines natural splendor with vibrant culture, world-class dining, and a captivating history.",
    content: "Cape Town consistently ranks among the world's most beautiful cities, and it's easy to see why. The dramatic Table Mountain forms an iconic backdrop to a cosmopolitan metropolis where pristine Atlantic beaches, historic neighborhoods, and innovative cuisine create an irresistible urban paradise. Ride the cable car to Table Mountain's summit for breathtaking 360-degree views, explore the colorful Bo-Kaap district, visit the poignant Robben Island where Nelson Mandela was imprisoned, or simply relax on Camps Bay beach. The nearby Cape Winelands offer world-class wine tasting amid stunning mountain scenery, while Cape Point provides dramatic coastal vistas. From penguin colonies at Boulders Beach to the bustling V&A Waterfront, Cape Town seamlessly blends natural wonders with sophisticated urban amenities.",
    featuredImage: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800",
    parentId: "dest-1",
    continentId: "continent-1",
    tourIds: ["tour-1", "tour-3"],
    accommodationIds: ["acc-1", "acc-2"],
    travelStyles: ["luxury", "adventure", "cultural"],
    bestTime: "October - April (summer season)",
    climate: "Mediterranean climate with mild, wet winters and warm, dry summers",
    currency: "South African Rand (ZAR)",
    language: "English, Afrikaans, Xhosa",
    timezone: "South Africa Standard Time (SAST, UTC+2)",
    highlights: [
      "Table Mountain - UNESCO World Heritage Site with cable car access",
      "V&A Waterfront - premier shopping, dining, and entertainment complex",
      "Robben Island - powerful apartheid history and Mandela's prison",
      "Cape Point - dramatic meeting of two oceans at Africa's tip",
      "Bo-Kaap - colorful Malay Quarter with vibrant painted houses",
      "Boulders Beach - African penguin colony viewing",
    ],
    type: "city",
    experiences: [
      "Table Mountain Cable Car & Hiking",
      "Cape Winelands Wine Tasting Tours",
      "Boulders Beach Penguin Colony",
      "Chapman's Peak Scenic Drive",
      "City Food & Culture Tours",
      "Kirstenbosch Botanical Gardens",
      "Seal Island & Shark Cage Diving",
      "Sunset Cruises from V&A Waterfront",
    ],
    videos: [
      {
        id: "vid-ct-1",
        title: "Cape Town - The Mother City",
        url: "https://youtube.com/watch?v=example-ct1",
        thumbnail: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400",
      },
      {
        id: "vid-ct-2",
        title: "Table Mountain Cable Car Experience",
        url: "https://youtube.com/watch?v=example-ct2",
        thumbnail: "https://images.unsplash.com/photo-1591825403514-a74ab8f71d47?w=400",
      },
      {
        id: "vid-ct-3",
        title: "Cape Winelands Day Trip",
        url: "https://youtube.com/watch?v=example-ct3",
        thumbnail: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800",
      "https://images.unsplash.com/photo-1591825403514-a74ab8f71d47?w=800",
      "https://images.unsplash.com/photo-1588417156929-2be99cd6cd26?w=800",
      "https://images.unsplash.com/photo-1563656157432-67560011e209?w=800",
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    ],
    relatedSpecialIds: ["special-1"],
    relatedBlogIds: ["blog-1", "blog-2"],
    relatedReviewIds: ["review-1", "review-2", "review-3"],
    dedicatedConsultantId: "team-1",
  },
  {
    id: "dest-47",
    slug: "greater-kruger",
    title: "Greater Kruger",
    excerpt:
      "South Africa's premier Big Five safari region, encompassing the vast national park and exclusive private reserves like Sabi Sand, Timbavati, and Thornybush.",
    content:
      "The Greater Kruger ecosystem is South Africa's safari heartland — a 25,000 square kilometre mosaic of the Kruger National Park and adjoining private reserves that together form one of the largest wildlife areas in Africa. While Kruger itself is one of the continent's most famous parks with excellent self-drive infrastructure, the unfenced private reserves along its western boundary offer the country's most exclusive and intimate safari experiences.\n\nThe Sabi Sand Game Reserve is the jewel of the private reserves, renowned worldwide for its extraordinary leopard sightings — these are among the most habituated leopards in Africa, comfortable around vehicles and offering unparalleled photographic opportunities. Londolozi, Singita, and MalaMala are legendary properties here. The Timbavati and Thornybush reserves offer similarly excellent game viewing with lower density.\n\nThe Greater Kruger supports an extraordinary diversity: the Big Five, wild dogs, cheetah, hippo, crocodile, and over 500 bird species. Malaria-free private reserves in the south make this one of the few Big Five destinations safe for families with young children.",
    featuredImage:
      "https://images.unsplash.com/photo-1673044042167-a46533228f4e?w=800",
    parentId: "dest-1",
    continentId: "continent-1",
    type: "region",
    tourIds: ["tour-2", "tour-13", "tour-18", "tour-22", "tour-28", "tour-35"],
    accommodationIds: ["acc-4", "acc-10", "acc-11", "acc-12", "acc-13", "acc-14", "acc-22"],
    travelStyles: ["wildlife", "luxury", "photography", "family"],
    bestTime: "May - September (dry season; best game viewing)",
    climate: "Subtropical; warm winters 25C, hot summers 35C+; wet Oct-Mar",
    currency: "South African Rand (ZAR)",
    language: "English, Afrikaans, Tsonga, Sepedi",
    timezone: "South Africa Standard Time (SAST, UTC+2)",
    highlights: [
      "Sabi Sand — world's best leopard sightings",
      "Londolozi — pioneering conservation legacy",
      "Big Five guaranteed in private reserves",
      "Walking safaris with expert trackers",
      "Night drives revealing nocturnal wildlife",
      "Malaria-free options for families",
    ],
    coordinates: { lat: -24.0000, lng: 31.5000 },
  },
  {
    id: "dest-48",
    slug: "garden-route",
    title: "Garden Route",
    excerpt:
      "A breathtaking 300-kilometre coastal drive from Mossel Bay to Storms River, winding through indigenous forests, charming towns, and dramatic cliffs.",
    content:
      "The Garden Route is one of the world's great road trips — a 300-kilometre stretch of South Africa's southern coast between Mossel Bay and Storms River that weaves through indigenous forests, past golden beaches, over dramatic cliff-top passes, and through charming towns. The route gets its name from the lush, year-round green vegetation sustained by the region's generous rainfall.\n\nKnysna, the route's unofficial capital, sits on a stunning lagoon guarded by towering sandstone headlands. Plettenberg Bay offers pristine beaches and whale watching, while Tsitsikamma National Park provides the route's dramatic finale with its suspension bridge over the Storms River Mouth gorge. Between these highlights lie ancient yellowwood forests, artisan markets, farm stalls, and some of South Africa's best restaurants.\n\nThe Garden Route pairs naturally with Cape Town at the western end and Addo Elephant National Park at the eastern end, creating a comprehensive South African holiday that combines city, coast, and bush. Self-drive is the most popular way to experience the route, with excellent accommodation ranging from beachside B&Bs to forest lodges.",
    featuredImage:
      "https://images.unsplash.com/photo-1724069757316-fabc71465f7c?w=800",
    parentId: "dest-1",
    continentId: "continent-1",
    type: "region",
    tourIds: ["tour-12", "tour-35"],
    accommodationIds: [],
    travelStyles: ["family", "adventure", "cultural"],
    bestTime: "September - April (warmest); year-round destination",
    climate: "Temperate maritime; mild year-round 15-25C; rain any time",
    currency: "South African Rand (ZAR)",
    language: "English, Afrikaans",
    timezone: "South Africa Standard Time (SAST, UTC+2)",
    highlights: [
      "Knysna Lagoon and Heads viewpoint",
      "Tsitsikamma suspension bridge and coastal walks",
      "Plettenberg Bay whale watching",
      "Cango Caves exploration",
      "Indigenous forest canopy walks",
      "Addo Elephant Park extension",
    ],
    coordinates: { lat: -33.9000, lng: 23.0000 },
  },
  {
    id: "dest-49",
    slug: "kwazulu-natal",
    title: "KwaZulu-Natal",
    excerpt:
      "From the Big Five reserves of Hluhluwe-iMfolozi to the Drakensberg mountains and Zulu cultural heartland, KZN offers South Africa's most diverse province.",
    content:
      "KwaZulu-Natal is South Africa's most culturally rich and geographically diverse province, stretching from subtropical Indian Ocean beaches to the soaring Drakensberg mountain escarpment. The province is the heartland of the Zulu nation, offering authentic cultural experiences alongside world-class wildlife and dramatic landscapes.\n\nHluhluwe-iMfolozi Park is Africa's oldest proclaimed nature reserve and the cradle of rhino conservation — the legendary Operation Rhino saved the white rhino from extinction here in the 1960s. The park offers excellent Big Five game viewing in a malaria-free setting, making it ideal for families. iSimangaliso Wetland Park, a UNESCO World Heritage Site, stretches 280km along the coast with hippos, crocodiles, whale sharks, and Africa's largest estuary.\n\nThe Drakensberg mountains, also a UNESCO World Heritage Site, provide spectacular hiking, ancient San rock art (the densest concentration in the world), and cool mountain retreats. Phinda Private Game Reserve and other exclusive lodges offer luxury safari experiences, while the Zulu cultural villages around Eshowe and Shakaland bring the region's proud warrior heritage to life.",
    featuredImage:
      "https://images.unsplash.com/photo-1496801541048-1f1c4924efcc?w=800",
    parentId: "dest-1",
    continentId: "continent-1",
    type: "region",
    tourIds: ["tour-32", "tour-35"],
    accommodationIds: ["acc-15"],
    travelStyles: ["wildlife", "cultural", "family"],
    bestTime: "May - September (dry, cool); October - March (green, warm)",
    climate: "Subtropical coast, temperate interior; warm year-round",
    currency: "South African Rand (ZAR)",
    language: "isiZulu, English",
    timezone: "South Africa Standard Time (SAST, UTC+2)",
    highlights: [
      "Hluhluwe-iMfolozi — oldest reserve, rhino conservation cradle",
      "iSimangaliso Wetland Park — UNESCO coastal wilderness",
      "Drakensberg mountains — hiking and San rock art",
      "Phinda Private Game Reserve — luxury Big Five",
      "Zulu cultural heritage experiences",
      "Malaria-free Big Five safari",
    ],
    coordinates: { lat: -28.5305, lng: 30.8958 },
  },
  {
    id: "dest-50",
    slug: "cape-winelands",
    title: "Cape Winelands",
    excerpt:
      "Rolling vineyards, Cape Dutch architecture, and world-class wines set against a backdrop of dramatic mountain ranges just an hour from Cape Town.",
    content:
      "The Cape Winelands is one of the world's most beautiful wine regions, a landscape of rolling vineyards, whitewashed Cape Dutch homesteads, and oak-lined avenues set against the dramatic peaks of the Hottentots Holland, Simonsberg, and Helderberg mountains. Just 45 minutes from Cape Town, the Winelands encompasses the historic towns of Stellenbosch, Franschhoek, and Paarl — each with its own distinct character.\n\nStellenbosch, founded in 1679, is the heart of South African wine country with over 150 wine estates offering tastings and cellar tours. Franschhoek, established by French Huguenot settlers, has earned the title of South Africa's culinary capital with more award-winning restaurants per capita than anywhere in the country. The Franschhoek Wine Tram offers a charming way to visit estates without driving.\n\nBeyond wine, the region offers mountain hiking, cycling through vineyards, art galleries, farm markets, and luxury boutique hotels. The Winelands integrates seamlessly into a Cape Town holiday and pairs beautifully with the Garden Route for a comprehensive Western Cape experience.",
    featuredImage:
      "https://images.unsplash.com/photo-1706700700231-91a762a35531?w=800",
    parentId: "dest-1",
    continentId: "continent-1",
    type: "region",
    tourIds: ["tour-1", "tour-28", "tour-35"],
    accommodationIds: [],
    travelStyles: ["luxury", "cultural", "honeymoon"],
    bestTime: "October - April (summer); February-March (harvest season)",
    climate: "Mediterranean; warm dry summers 28C, mild wet winters 15C",
    currency: "South African Rand (ZAR)",
    language: "Afrikaans, English",
    timezone: "South Africa Standard Time (SAST, UTC+2)",
    highlights: [
      "Stellenbosch — 150+ wine estates and tastings",
      "Franschhoek — South Africa's culinary capital",
      "Franschhoek Wine Tram experience",
      "Cape Dutch architecture and heritage",
      "Farm-to-table dining and artisan markets",
      "Mountain hiking and cycling routes",
    ],
    coordinates: { lat: -33.9321, lng: 18.8602 },
  },
];