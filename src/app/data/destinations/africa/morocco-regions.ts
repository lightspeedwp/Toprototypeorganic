/**
 * Morocco - Regions and Cities
 * @module africa/morocco-regions
 * @category data/destinations
 */

import type { Destination } from "../../types";

export const MOROCCO_REGIONS: Destination[] = [
  {
    id: "dest-11",
    slug: "marrakech",
    title: "Marrakech",
    excerpt: "The Red City pulsates with energy — ancient medina alleys, fragrant souks, palatial riads, and the legendary Jemaa el-Fnaa square at its heart.",
    content: "Marrakech is Morocco's most magnetic city, a place where medieval splendor meets contemporary cool. The medina, enclosed by 12th-century red-ochre walls, is a UNESCO World Heritage Site and one of the most exhilarating urban experiences in the world. At its heart, the Jemaa el-Fnaa transforms from a daytime market into a nightly carnival of storytellers, musicians, acrobats, and food stalls.\n\nThe surrounding souks are a maze of artisan workshops and vendors selling everything from hand-woven carpets and brass lanterns to aromatic spices and leather goods. Architectural highlights include the intricate Bahia Palace, the soaring Koutoubia Mosque minaret, and the serene Majorelle Garden — the cobalt-blue retreat restored by Yves Saint Laurent. Luxury riads (traditional courtyard houses) have been transformed into boutique hotels offering an authentic Moroccan experience.\n\nModern Marrakech extends beyond the medina walls into the Ville Nouvelle, where contemporary art galleries, rooftop bars, and international restaurants create a cosmopolitan counterpoint to the ancient heart.",
    featuredImage: "https://images.unsplash.com/photo-1653260137243-2b3daabf9aab?w=800",
    parentId: "dest-5",
    continentId: "continent-1",
    tourIds: ["tour-7"],
    accommodationIds: ["acc-10", "acc-11"],
    travelStyles: ["cultural", "luxury", "adventure"],
    bestTime: "March - May & September - November (mild weather)",
    climate: "Semi-arid; hot summers (35-45°C), mild winters (10-20°C)",
    currency: "Moroccan Dirham (MAD)",
    language: "Arabic, Berber, French",
    timezone: "Western European Time (WET, UTC+1)",
    highlights: [
      "Jemaa el-Fnaa — the world's most vibrant public square",
      "Medina Souks — labyrinthine artisan markets",
      "Majorelle Garden — Yves Saint Laurent's blue paradise",
      "Bahia Palace — 19th-century Islamic architectural masterpiece",
      "Koutoubia Mosque — Marrakech's iconic 12th-century minaret",
      "Atlas Mountains day trips — Berber villages and waterfalls",
    ],
    type: "city",
    experiences: [
      "Medina Walking Tour with Local Guide",
      "Souk Shopping & Bargaining",
      "Majorelle Garden & YSL Museum Visit",
      "Traditional Hammam Spa Experience",
      "Cooking Class in a Riad",
      "Sunset Rooftop Drinks",
      "Atlas Mountains Day Excursion",
      "Hot Air Balloon at Sunrise",
    ],
    videos: [
      { id: "vid-mk-1", title: "Marrakech — The Red City", url: "https://youtube.com/watch?v=example-mk1", thumbnail: "https://images.unsplash.com/photo-1653260137243-2b3daabf9aab?w=400" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1653260137243-2b3daabf9aab?w=800",
      "https://images.unsplash.com/photo-1628790891451-024e881c49e2?w=800",
    ],
    relatedSpecialIds: ["special-3"],
    relatedBlogIds: ["blog-2"],
    relatedReviewIds: ["review-5"],
    dedicatedConsultantId: "team-3",
  },
];
