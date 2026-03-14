/**
 * Rwanda - Regions and Parks
 * @module africa/rwanda-regions
 * @category data/destinations
 */

import type { Destination } from "../../types";

export const RWANDA_REGIONS: Destination[] = [
  {
    id: "dest-16",
    slug: "volcanoes-np",
    title: "Volcanoes National Park",
    excerpt:
      "The mist-shrouded Virunga volcanoes where Dian Fossey studied mountain gorillas, offering Africa's most iconic primate encounter.",
    content:
      "Volcanoes National Park protects the Rwandan section of the Virunga Mountains, a chain of eight volcanoes straddling the borders of Rwanda, Uganda, and the Democratic Republic of Congo. This is where Dian Fossey conducted her groundbreaking gorilla research, immortalised in 'Gorillas in the Mist,' and the park remains the world's premier gorilla trekking destination.\n\nTen habituated gorilla families receive a maximum of eight visitors each per day, ensuring intimate encounters in their natural bamboo and hagenia forest habitat. Treks depart at dawn from park headquarters, with hikes ranging from one to four hours depending on the gorillas' location on the volcanic slopes. The moment you sit quietly among a gorilla family — watching juveniles play, mothers nurse, and the silverback keep watch — is consistently rated as the greatest wildlife experience on Earth.\n\nThe park also offers golden monkey tracking, Dian Fossey's tomb hike, and volcano summit treks including Bisoke (with its stunning crater lake) and Karisimbi (Rwanda's highest peak at 4,507m). The surrounding community has developed world-class lodges that combine conservation with luxury.",
    featuredImage:
      "https://images.unsplash.com/photo-1662612732223-1fe6ea43263e?w=800",
    parentId: "dest-15",
    continentId: "continent-1",
    type: "park",
    tourIds: ["tour-14", "tour-31"],
    accommodationIds: ["acc-20"],
    travelStyles: ["adventure", "wildlife", "luxury"],
    bestTime: "June - September & December - February",
    climate: "Cool and misty; 10-18C; altitude 2,400-4,500m",
    currency: "Rwandan Franc (RWF)",
    language: "Kinyarwanda, English, French",
    timezone: "Central Africa Time (CAT, UTC+2)",
    highlights: [
      "Mountain gorilla trekking — 10 habituated families",
      "Golden monkey tracking in bamboo forest",
      "Dian Fossey tomb hike and research centre",
      "Bisoke volcano crater lake trek",
      "Karisimbi summit — Rwanda's highest peak",
    ],
    coordinates: { lat: -1.4583, lng: 29.5250 },
  },
  {
    id: "dest-17",
    slug: "nyungwe-forest",
    title: "Nyungwe Forest National Park",
    excerpt:
      "One of Africa's oldest montane rainforests, home to 13 primate species and a breathtaking canopy walkway suspended 50 metres above the forest floor.",
    content:
      "Nyungwe Forest is one of the largest remaining tracts of montane forest in Central Africa, a 1,020 square kilometre wilderness that has remained continuously forested since the last ice age. This ancient ecosystem supports 13 primate species — more than any other East African forest — including habituated chimpanzee communities, troops of Ruwenzori colobus monkeys numbering up to 400 individuals, and the rare L'Hoest's monkey.\n\nThe park's star attraction beyond primates is the Igishigishigi canopy walkway, a 200-metre suspension bridge hovering 50 metres above the forest floor, offering a bird's-eye perspective of the canopy and the misty valleys below. Over 310 bird species have been recorded, including 29 Albertine Rift endemics, making this one of Africa's top birding destinations.\n\nTrails range from gentle nature walks to challenging multi-day treks through the forest's heart. Waterfalls, orchids, and giant tree ferns create a prehistoric atmosphere, while the adjacent tea plantations offer cultural excursions and stunning views across the Congo-Nile Divide.",
    featuredImage:
      "https://images.unsplash.com/photo-1662612732223-1fe6ea43263e?w=800",
    parentId: "dest-15",
    continentId: "continent-1",
    type: "park",
    tourIds: ["tour-31"],
    accommodationIds: [],
    travelStyles: ["adventure", "wildlife"],
    bestTime: "June - September (driest); year-round for primates",
    climate: "Cool and wet; 15-20C; frequent mist and rain",
    currency: "Rwandan Franc (RWF)",
    language: "Kinyarwanda, English, French",
    timezone: "Central Africa Time (CAT, UTC+2)",
    highlights: [
      "Chimpanzee tracking — habituated communities",
      "Canopy walkway — 50m above the forest floor",
      "Colobus monkey troops of 400+",
      "310 bird species including 29 endemics",
      "Waterfall trails and tea plantation visits",
    ],
    coordinates: { lat: -2.4833, lng: 29.2000 },
  },
];
