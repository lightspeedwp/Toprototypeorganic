import type { Facility } from "../types";

/**
 * Facilities (Taxonomy)
 * Represents accommodation facilities/amenities.
 */
export const FACILITIES: Facility[] = [
  {
    id: "facility-1",
    slug: "swimming-pool",
    name: "Swimming Pool",
    description: "On-site swimming pool",
    icon: "Waves",
    accommodationIds: ["acc-1", "acc-2", "acc-3", "acc-4", "acc-6", "acc-7", "acc-8", "acc-9"],
  },
  {
    id: "facility-2",
    slug: "spa",
    name: "Spa & Wellness",
    description: "Full-service spa and wellness facilities",
    icon: "Sparkles",
    accommodationIds: ["acc-1", "acc-3", "acc-4", "acc-7", "acc-8"],
  },
  {
    id: "facility-3",
    slug: "restaurant",
    name: "Restaurant",
    description: "On-site dining facilities",
    icon: "Utensils",
    accommodationIds: ["acc-1", "acc-2", "acc-3", "acc-4", "acc-5", "acc-6", "acc-7", "acc-8", "acc-9"],
  },
  {
    id: "facility-4",
    slug: "wifi",
    name: "WiFi",
    description: "Wireless internet access",
    icon: "Wifi",
    accommodationIds: ["acc-1", "acc-2", "acc-3", "acc-4", "acc-5", "acc-6", "acc-7", "acc-8", "acc-9"],
  },
  {
    id: "facility-5",
    slug: "bar",
    name: "Bar & Lounge",
    description: "Bar and lounge area",
    icon: "Wine",
    accommodationIds: ["acc-1", "acc-2", "acc-3", "acc-4", "acc-5", "acc-6", "acc-7", "acc-8", "acc-9"],
  },
  {
    id: "facility-6",
    slug: "game-drives",
    name: "Game Drives",
    description: "Guided wildlife game drives",
    icon: "Binoculars",
    accommodationIds: ["acc-2", "acc-4", "acc-5", "acc-6", "acc-7", "acc-8", "acc-9"],
  },
  {
    id: "facility-7",
    slug: "water-sports",
    name: "Water Sports",
    description: "Water sports and activities",
    icon: "Ship",
    accommodationIds: ["acc-3", "acc-8"],
  },
  {
    id: "facility-8",
    slug: "kids-club",
    name: "Kids Club",
    description: "Children's club and activities",
    icon: "Baby",
    accommodationIds: ["acc-3"],
  },
  {
    id: "facility-9",
    slug: "gym",
    name: "Fitness Center",
    description: "On-site fitness facilities",
    icon: "Dumbbell",
    accommodationIds: ["acc-1", "acc-3", "acc-4"],
  },
  {
    id: "facility-10",
    slug: "laundry",
    name: "Laundry Service",
    description: "Daily laundry service",
    icon: "Shirt",
    accommodationIds: ["acc-1", "acc-2", "acc-3", "acc-4", "acc-5", "acc-6", "acc-7", "acc-8", "acc-9"],
  },
  {
    id: "facility-11",
    slug: "airport-transfer",
    name: "Airport Transfer",
    description: "Complimentary airport transfers",
    icon: "Car",
    accommodationIds: ["acc-1", "acc-3", "acc-8"],
  },
  {
    id: "facility-12",
    slug: "guided-walks",
    name: "Guided Walks",
    description: "Guided nature walks",
    icon: "Footprints",
    accommodationIds: ["acc-2", "acc-4", "acc-6", "acc-7", "acc-9"],
  },
];

/**
 * Get facility by slug.
 */
export function getFacility(slug: string): Facility | undefined {
  return FACILITIES.find(f => f.slug === slug);
}
