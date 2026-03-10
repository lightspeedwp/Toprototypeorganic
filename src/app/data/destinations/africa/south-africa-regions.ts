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
];
