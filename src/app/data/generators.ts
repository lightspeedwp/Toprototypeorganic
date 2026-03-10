/**
 * Mock Data Generators
 *
 * Programmatically generates additional mock data entries to ensure
 * every content type has 36+ items for 3-page archive pagination.
 *
 * @module generators
 * @category data
 */

import type {
  Tour,
  Destination,
  Accommodation,
  BlogPost,
  Review,
  TeamMember,
  TravelStyle,
  AccommodationType,
  Continent,
  Brand,
  Facility,
  BlogCategory,
  BlogTag,
} from "./types";
import type { EnhancedSpecial, EnhancedTeamMember } from "./types";

/* ============================================
   REAL IMAGE POOLS
   Each generator cycles through verified Unsplash URLs.
   ============================================ */

const TOUR_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1500549158481-49dcc08a37ab?w=800",
  "https://images.unsplash.com/photo-1729476266005-b14af8894f5e?w=800",
  "https://images.unsplash.com/photo-1724935451945-1f1967520d32?w=800",
  "https://images.unsplash.com/photo-1681834418277-b01c30279693?w=800",
  "https://images.unsplash.com/photo-1646667844634-1eac4e8f5b60?w=800",
  "https://images.unsplash.com/photo-1713623311512-ce3a9ff7d9ca?w=800",
  "https://images.unsplash.com/photo-1667504319000-8c82a5f5605f?w=800",
  "https://images.unsplash.com/photo-1712244876693-a89f6172178e?w=800",
  "https://images.unsplash.com/photo-1641225191051-935bf55b3f08?w=800",
  "https://images.unsplash.com/photo-1697898109604-e06e88b15271?w=800",
  "https://images.unsplash.com/photo-1596750320291-a082a23dcc19?w=800",
  "https://images.unsplash.com/photo-1668010882703-fb9fc62c250a?w=800",
  "https://images.unsplash.com/photo-1640734838138-0ac0bdab0210?w=800",
  "https://images.unsplash.com/photo-1624605707211-7109c1899164?w=800",
  "https://images.unsplash.com/photo-1568517868534-1637be8943be?w=800",
  "https://images.unsplash.com/photo-1573481726566-9d98bb795fff?w=800",
  "https://images.unsplash.com/photo-1563833045671-00cdda139b50?w=800",
  "https://images.unsplash.com/photo-1598563426949-bbff8101ed13?w=800",
  "https://images.unsplash.com/photo-1522865080725-2a9ea1fcb94e?w=800",
  "https://images.unsplash.com/photo-1635156612596-0a7afa9bb0ff?w=800",
  "https://images.unsplash.com/photo-1649284344538-58ddd43c80f7?w=800",
  "https://images.unsplash.com/photo-1729180253305-23990aee8705?w=800",
  "https://images.unsplash.com/photo-1649188580837-8c82a5f5605f?w=800",
  "https://images.unsplash.com/photo-1763878119119-aff0820121fd?w=800",
];

const DESTINATION_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1646667844634-1eac4e8f5b60?w=800",
  "https://images.unsplash.com/photo-1667504319000-8c82a5f5605f?w=800",
  "https://images.unsplash.com/photo-1596750320291-a082a23dcc19?w=800",
  "https://images.unsplash.com/photo-1598563426949-bbff8101ed13?w=800",
  "https://images.unsplash.com/photo-1724935451945-1f1967520d32?w=800",
  "https://images.unsplash.com/photo-1681834418277-b01c30279693?w=800",
  "https://images.unsplash.com/photo-1668010882703-fb9fc62c250a?w=800",
  "https://images.unsplash.com/photo-1635156612596-0a7afa9bb0ff?w=800",
  "https://images.unsplash.com/photo-1712244876693-a89f6172178e?w=800",
  "https://images.unsplash.com/photo-1624605707211-7109c1899164?w=800",
  "https://images.unsplash.com/photo-1573481726566-9d98bb795fff?w=800",
  "https://images.unsplash.com/photo-1522865080725-2a9ea1fcb94e?w=800",
  "https://images.unsplash.com/photo-1641225191051-935bf55b3f08?w=800",
  "https://images.unsplash.com/photo-1563833045671-00cdda139b50?w=800",
  "https://images.unsplash.com/photo-1649188580837-8c82a5f5605f?w=800",
  "https://images.unsplash.com/photo-1640734838138-0ac0bdab0210?w=800",
  "https://images.unsplash.com/photo-1568517868534-1637be8943be?w=800",
  "https://images.unsplash.com/photo-1649284344538-58ddd43c80f7?w=800",
  "https://images.unsplash.com/photo-1729180253305-23990aee8705?w=800",
  "https://images.unsplash.com/photo-1713623311512-ce3a9ff7d9ca?w=800",
];

const ACCOMMODATION_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1607712617949-8c993d290809?w=800",
  "https://images.unsplash.com/photo-1770461129148-0ccbd2d9ffdb?w=800",
  "https://images.unsplash.com/photo-1769149255670-aa0ad6428dd6?w=800",
  "https://images.unsplash.com/photo-1762509298322-265ae9f4a32c?w=800",
  "https://images.unsplash.com/photo-1640755668096-4f4c7b8f4410?w=800",
  "https://images.unsplash.com/photo-1662792721650-545a15f07ff6?w=800",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
  "https://images.unsplash.com/photo-1697898109604-e06e88b15271?w=800",
];

const BLOG_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1673505413397-0cd0dc4f5854?w=800",
  "https://images.unsplash.com/photo-1680788649730-6965da661d07?w=800",
  "https://images.unsplash.com/photo-1758365817075-b40399f2f8f2?w=800",
  "https://images.unsplash.com/photo-1764972542894-edeb15fbb13c?w=800",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
  "https://images.unsplash.com/photo-1500549158481-49dcc08a37ab?w=800",
  "https://images.unsplash.com/photo-1563833045671-00cdda139b50?w=800",
  "https://images.unsplash.com/photo-1596750320291-a082a23dcc19?w=800",
  "https://images.unsplash.com/photo-1573481726566-9d98bb795fff?w=800",
  "https://images.unsplash.com/photo-1668010882703-fb9fc62c250a?w=800",
  "https://images.unsplash.com/photo-1635156612596-0a7afa9bb0ff?w=800",
];

const SPECIAL_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
  "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=800",
  "https://images.unsplash.com/photo-1568012015-ccfe1f67a119?w=800",
  "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800",
  "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800",
  "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800",
  "https://images.unsplash.com/photo-1551465397-e512d5a48e3b?w=800",
  "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800",
  "https://images.unsplash.com/photo-1697898109604-e06e88b15271?w=800",
];

const TEAM_PORTRAIT_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=400",
  "https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=400",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
  "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
];

/* ============================================
   TAXONOMY EXPANSION
   ============================================ */

export const EXPANDED_CONTINENTS: Continent[] = [
  { id: "continent-1", slug: "africa", name: "Africa", description: "The diverse and magnificent African continent, home to iconic wildlife and rich cultural heritage.", destinationIds: ["dest-1","dest-2","dest-3","dest-4","dest-5","dest-6","dest-7","dest-8","dest-9","dest-10","dest-11","dest-17","dest-18","dest-19","dest-20","dest-21"] },
  { id: "continent-2", slug: "antarctica", name: "Antarctica", description: "The frozen continent at the bottom of the world, offering pristine wilderness and extraordinary wildlife encounters.", destinationIds: ["dest-12","dest-22"] },
  { id: "continent-3", slug: "asia", name: "Asia", description: "The largest and most diverse continent, blending ancient traditions with modern wonders.", destinationIds: ["dest-23","dest-24","dest-25","dest-26"] },
  { id: "continent-4", slug: "europe", name: "Europe", description: "A continent of rich history, cultural landmarks, and diverse landscapes from the Arctic to the Mediterranean.", destinationIds: ["dest-13","dest-14","dest-27","dest-28"] },
  { id: "continent-5", slug: "north-america", name: "North America", description: "From the Arctic tundra to tropical beaches, North America offers incredible natural diversity.", destinationIds: ["dest-29","dest-30","dest-31"] },
  { id: "continent-6", slug: "oceania", name: "Oceania", description: "Island nations and vast outback landscapes surrounded by the Pacific Ocean.", destinationIds: ["dest-32","dest-33"] },
  { id: "continent-7", slug: "south-america", name: "South America", description: "A continent of extraordinary landscapes from Patagonian glaciers to Amazon rainforest.", destinationIds: ["dest-15","dest-16","dest-34","dest-35","dest-36"] },
];

export const EXPANDED_TRAVEL_STYLES: TravelStyle[] = [
  { id: "style-1", slug: "honeymoon", name: "Honeymoon", description: "Romantic getaways designed for couples celebrating their love", tourIds: ["tour-1","tour-2","tour-14","tour-26"], destinationIds: ["dest-1","dest-23"], accommodationIds: ["acc-1","acc-10"] },
  { id: "style-2", slug: "adventure", name: "Adventure", description: "Thrilling experiences for active travelers seeking excitement", tourIds: ["tour-3","tour-4","tour-15","tour-16","tour-27","tour-28"], destinationIds: ["dest-12","dest-15"], accommodationIds: ["acc-4","acc-5"] },
  { id: "style-3", slug: "wildlife", name: "Wildlife", description: "Safari expeditions to observe nature's most magnificent creatures", tourIds: ["tour-5","tour-6","tour-17","tour-18","tour-29"], destinationIds: ["dest-3","dest-4","dest-5"], accommodationIds: ["acc-2","acc-6"] },
  { id: "style-4", slug: "luxury", name: "Luxury", description: "Premium experiences with exceptional service and accommodations", tourIds: ["tour-1","tour-2","tour-7","tour-19","tour-30"], destinationIds: ["dest-1","dest-2"], accommodationIds: ["acc-1","acc-3","acc-7"] },
  { id: "style-5", slug: "family", name: "Family", description: "Family-friendly adventures suitable for all ages", tourIds: ["tour-3","tour-8","tour-20","tour-31"], destinationIds: ["dest-6","dest-7"], accommodationIds: ["acc-8"] },
  { id: "style-6", slug: "cultural", name: "Cultural", description: "Immersive journeys exploring local traditions and heritage", tourIds: ["tour-4","tour-9","tour-21","tour-32"], destinationIds: ["dest-8","dest-23"], accommodationIds: ["acc-9"] },
  { id: "style-7", slug: "photography", name: "Photography", description: "Specialized trips designed for photography enthusiasts", tourIds: ["tour-10","tour-22","tour-33"], destinationIds: ["dest-12","dest-3"], accommodationIds: ["acc-4"] },
  { id: "style-8", slug: "eco-tourism", name: "Eco-Tourism", description: "Sustainable travel experiences that protect natural environments", tourIds: ["tour-11","tour-23","tour-34"], destinationIds: ["dest-5","dest-15"], accommodationIds: ["acc-5","acc-6"] },
];

export const EXPANDED_ACCOMMODATION_TYPES: AccommodationType[] = [
  { id: "type-1", slug: "hotel", name: "Hotel", description: "Traditional hotel accommodation with full amenities and services", accommodationIds: ["acc-1","acc-3","acc-10","acc-15","acc-20","acc-25"] },
  { id: "type-2", slug: "lodge", name: "Lodge", description: "Safari lodges and wilderness lodges in natural settings", accommodationIds: ["acc-2","acc-6","acc-11","acc-16","acc-21","acc-26"] },
  { id: "type-3", slug: "resort", name: "Resort", description: "Full-service resorts with extensive facilities and entertainment", accommodationIds: ["acc-7","acc-12","acc-17","acc-22","acc-27"] },
  { id: "type-4", slug: "camp", name: "Camp", description: "Tented camps and bush camps offering authentic wilderness experiences", accommodationIds: ["acc-4","acc-8","acc-13","acc-18","acc-23","acc-28"] },
  { id: "type-5", slug: "expedition-ship", name: "Expedition Ship", description: "Purpose-built expedition vessels for polar and coastal voyages", accommodationIds: ["acc-5","acc-9","acc-14","acc-19","acc-24"] },
  { id: "type-6", slug: "guesthouse", name: "Guesthouse", description: "Intimate guesthouses with local character and personal service", accommodationIds: ["acc-29","acc-30","acc-31"] },
  { id: "type-7", slug: "villa", name: "Villa", description: "Private villas offering exclusivity and space for families or groups", accommodationIds: ["acc-32","acc-33","acc-34"] },
  { id: "type-8", slug: "boutique", name: "Boutique Hotel", description: "Stylish, design-led properties with unique character", accommodationIds: ["acc-35","acc-36"] },
];

export const EXPANDED_BRANDS: Brand[] = [
  { id: "brand-1", slug: "relais-chateaux", name: "Relais & Châteaux", description: "Collection of luxury hotels and restaurants worldwide", accommodationIds: ["acc-1","acc-10","acc-20"] },
  { id: "brand-2", slug: "leading-hotels", name: "Leading Hotels of the World", description: "Prestigious collection of independent luxury hotels", accommodationIds: ["acc-3","acc-15","acc-25"] },
  { id: "brand-3", slug: "independent", name: "Independent", description: "Independently owned and operated properties", accommodationIds: ["acc-2","acc-4","acc-5","acc-6","acc-7","acc-8","acc-9","acc-11","acc-12","acc-13","acc-14"] },
  { id: "brand-4", slug: "andbeyond", name: "&Beyond", description: "Sustainable luxury safari lodges across Africa and South America", accommodationIds: ["acc-16","acc-21","acc-26"] },
  { id: "brand-5", slug: "singita", name: "Singita", description: "Ultra-luxury conservation-focused safari lodges", accommodationIds: ["acc-17","acc-22","acc-27"] },
  { id: "brand-6", slug: "wilderness-safaris", name: "Wilderness Safaris", description: "Ecotourism company focused on conservation and community", accommodationIds: ["acc-18","acc-23","acc-28"] },
];

export const EXPANDED_FACILITIES: Facility[] = [
  { id: "facility-1", slug: "swimming-pool", name: "Swimming Pool", description: "On-site swimming pool", icon: "Waves", accommodationIds: ["acc-1","acc-2","acc-3","acc-7","acc-10","acc-12","acc-15","acc-17","acc-20"] },
  { id: "facility-2", slug: "spa", name: "Spa & Wellness", description: "Full-service spa and wellness facilities", icon: "Sparkles", accommodationIds: ["acc-1","acc-3","acc-7","acc-10","acc-15","acc-17"] },
  { id: "facility-3", slug: "restaurant", name: "Restaurant", description: "On-site dining facilities", icon: "Utensils", accommodationIds: ["acc-1","acc-2","acc-3","acc-5","acc-7","acc-10","acc-12","acc-15","acc-17","acc-20"] },
  { id: "facility-4", slug: "wifi", name: "WiFi", description: "Wireless internet access", icon: "Wifi", accommodationIds: ["acc-1","acc-2","acc-3","acc-7","acc-10","acc-12","acc-15","acc-17","acc-20"] },
  { id: "facility-5", slug: "bar", name: "Bar & Lounge", description: "Bar and lounge area", icon: "Wine", accommodationIds: ["acc-1","acc-2","acc-3","acc-5","acc-7","acc-10","acc-15"] },
  { id: "facility-6", slug: "game-drives", name: "Game Drives", description: "Guided game drive excursions", icon: "Binoculars", accommodationIds: ["acc-2","acc-4","acc-6","acc-8","acc-11","acc-13","acc-16","acc-18"] },
  { id: "facility-7", slug: "guided-walks", name: "Guided Walks", description: "Guided bush walks and nature trails", icon: "Footprints", accommodationIds: ["acc-2","acc-4","acc-6","acc-8","acc-11","acc-13"] },
  { id: "facility-8", slug: "gym", name: "Fitness Centre", description: "Fully equipped fitness centre", icon: "Dumbbell", accommodationIds: ["acc-1","acc-3","acc-7","acc-10","acc-15","acc-20"] },
  { id: "facility-9", slug: "conference", name: "Conference Facilities", description: "Meeting and conference rooms", icon: "Presentation", accommodationIds: ["acc-1","acc-3","acc-7","acc-10"] },
  { id: "facility-10", slug: "laundry", name: "Laundry Service", description: "Daily laundry and dry cleaning", icon: "Shirt", accommodationIds: ["acc-1","acc-2","acc-3","acc-5","acc-7","acc-10","acc-12"] },
  { id: "facility-11", slug: "kids-club", name: "Kids Club", description: "Supervised children's activities", icon: "Baby", accommodationIds: ["acc-7","acc-8","acc-12","acc-20"] },
  { id: "facility-12", slug: "airport-transfer", name: "Airport Transfer", description: "Complimentary airport shuttle service", icon: "Car", accommodationIds: ["acc-1","acc-3","acc-5","acc-7","acc-10","acc-15"] },
];

export const EXPANDED_BLOG_CATEGORIES: BlogCategory[] = [
  { id: "cat-1", slug: "news", name: "News", description: "Latest updates from the world of travel", postIds: ["post-1","post-7","post-13","post-19","post-25","post-31"] },
  { id: "cat-2", slug: "tour-operators", name: "Tour Operators", description: "Insights and advice for tour operators", postIds: ["post-2","post-8","post-14","post-20","post-26","post-32"] },
  { id: "cat-3", slug: "travel-tips", name: "Travel Tips", description: "Practical advice for travellers", postIds: ["post-3","post-9","post-15","post-21","post-27","post-33"] },
  { id: "cat-4", slug: "destination-guides", name: "Destination Guides", description: "In-depth destination insights and travel guides", postIds: ["post-4","post-10","post-16","post-22","post-28","post-34"] },
  { id: "cat-5", slug: "wildlife-nature", name: "Wildlife & Nature", description: "Conservation news and wildlife encounters", postIds: ["post-5","post-11","post-17","post-23","post-29","post-35"] },
  { id: "cat-6", slug: "culture-history", name: "Culture & History", description: "Exploring local traditions and historical sites", postIds: ["post-6","post-12","post-18","post-24","post-30","post-36"] },
  { id: "cat-7", slug: "food-drink", name: "Food & Drink", description: "Culinary experiences and local cuisine", postIds: ["post-7","post-13","post-25"] },
  { id: "cat-8", slug: "adventure-stories", name: "Adventure Stories", description: "First-hand accounts of thrilling travel experiences", postIds: ["post-8","post-14","post-26"] },
];

export const EXPANDED_BLOG_TAGS: BlogTag[] = [
  { id: "tag-1", slug: "botswana", name: "Botswana", postIds: ["post-1","post-5","post-17"] },
  { id: "tag-2", slug: "wildlife", name: "Wildlife", postIds: ["post-1","post-5","post-11","post-17","post-23","post-29","post-35"] },
  { id: "tag-3", slug: "luxury-safari", name: "Luxury Safari", postIds: ["post-1","post-7","post-19"] },
  { id: "tag-4", slug: "responsible-travel", name: "Responsible Travel", postIds: ["post-2","post-8","post-20"] },
  { id: "tag-5", slug: "community-tourism", name: "Community Tourism", postIds: ["post-2","post-14"] },
  { id: "tag-6", slug: "best-practices", name: "Best Practices", postIds: ["post-2","post-8"] },
  { id: "tag-7", slug: "packing-tips", name: "Packing Tips", postIds: ["post-3","post-9","post-21"] },
  { id: "tag-8", slug: "safari-preparation", name: "Safari Preparation", postIds: ["post-3","post-15","post-27"] },
  { id: "tag-9", slug: "travel-advice", name: "Travel Advice", postIds: ["post-3","post-9","post-15","post-21","post-27","post-33"] },
  { id: "tag-10", slug: "photography", name: "Photography", postIds: ["post-4","post-10","post-22","post-28"] },
  { id: "tag-11", slug: "family-travel", name: "Family Travel", postIds: ["post-6","post-12","post-18","post-24","post-30"] },
  { id: "tag-12", slug: "budget-travel", name: "Budget Travel", postIds: ["post-9","post-21","post-33"] },
  { id: "tag-13", slug: "honeymoon", name: "Honeymoon", postIds: ["post-7","post-19","post-31"] },
  { id: "tag-14", slug: "adventure", name: "Adventure", postIds: ["post-8","post-14","post-20","post-26","post-32"] },
  { id: "tag-15", slug: "conservation", name: "Conservation", postIds: ["post-5","post-11","post-23","post-29","post-35"] },
];

/* ============================================
   CONTENT TYPE GENERATORS
   ============================================ */

const TOUR_TEMPLATES: Array<{
  title: string; slug: string; excerpt: string; destination: string;
  travelStyles: string[]; destinations: string[]; duration: string; price: string;
  difficulty: string; bestTime: string; accommodation: string[];
}> = [
  { title: "Serengeti Migration Safari", slug: "serengeti-migration-safari", excerpt: "Witness the greatest wildlife spectacle on Earth — the Great Migration across the Serengeti.", destination: "Tanzania", travelStyles: ["style-3","style-2"], destinations: ["dest-4"], duration: "10 days", price: "From $5,200 per person", difficulty: "Moderate", bestTime: "July - October", accommodation: ["acc-11"] },
  { title: "Patagonia Explorer", slug: "patagonia-explorer", excerpt: "Discover the raw beauty of Patagonia's glaciers, mountains, and wildlife.", destination: "Argentina", travelStyles: ["style-2","style-7"], destinations: ["dest-15"], duration: "12 days", price: "From $4,800 per person", difficulty: "Challenging", bestTime: "November - March", accommodation: ["acc-12"] },
  { title: "Vietnam Heritage Journey", slug: "vietnam-heritage-journey", excerpt: "Travel from Hanoi to Ho Chi Minh City exploring Vietnam's rich cultural heritage.", destination: "Vietnam", travelStyles: ["style-6","style-5"], destinations: ["dest-23"], duration: "14 days", price: "From $2,900 per person", difficulty: "Easy", bestTime: "October - April", accommodation: ["acc-13"] },
  { title: "Iceland Ring Road Adventure", slug: "iceland-ring-road-adventure", excerpt: "Complete circuit of Iceland's Ring Road with geysers, waterfalls, and Northern Lights.", destination: "Iceland", travelStyles: ["style-2","style-7"], destinations: ["dest-13"], duration: "10 days", price: "From $4,200 per person", difficulty: "Moderate", bestTime: "June - September", accommodation: ["acc-14"] },
  { title: "Zanzibar Beach & Spice Retreat", slug: "zanzibar-beach-spice-retreat", excerpt: "Relax on pristine beaches and explore the aromatic spice plantations of Zanzibar.", destination: "Tanzania", travelStyles: ["style-1","style-4"], destinations: ["dest-4","dest-17"], duration: "7 days", price: "From $2,500 per person", difficulty: "Easy", bestTime: "June - October", accommodation: ["acc-15"] },
  { title: "Namibia Desert Odyssey", slug: "namibia-desert-odyssey", excerpt: "Journey through the otherworldly landscapes of the Namib Desert and Skeleton Coast.", destination: "Namibia", travelStyles: ["style-2","style-7"], destinations: ["dest-7"], duration: "11 days", price: "From $4,600 per person", difficulty: "Moderate", bestTime: "May - October", accommodation: ["acc-16"] },
  { title: "Rwanda Gorilla Trekking", slug: "rwanda-gorilla-trekking", excerpt: "Come face-to-face with mountain gorillas in the misty forests of Volcanoes National Park.", destination: "Rwanda", travelStyles: ["style-3","style-8"], destinations: ["dest-18"], duration: "5 days", price: "From $3,800 per person", difficulty: "Challenging", bestTime: "June - September", accommodation: ["acc-17"] },
  { title: "Japan Cherry Blossom Tour", slug: "japan-cherry-blossom-tour", excerpt: "Experience Japan's magical cherry blossom season across Tokyo, Kyoto, and Osaka.", destination: "Japan", travelStyles: ["style-6","style-4"], destinations: ["dest-24"], duration: "12 days", price: "From $5,500 per person", difficulty: "Easy", bestTime: "March - April", accommodation: ["acc-18"] },
  { title: "Costa Rica Eco-Adventure", slug: "costa-rica-eco-adventure", excerpt: "Explore rainforests, volcanoes, and pristine beaches in this eco-tourism paradise.", destination: "Costa Rica", travelStyles: ["style-8","style-5"], destinations: ["dest-29"], duration: "10 days", price: "From $3,200 per person", difficulty: "Moderate", bestTime: "December - April", accommodation: ["acc-19"] },
  { title: "Luxury Maldives Escape", slug: "luxury-maldives-escape", excerpt: "Ultimate overwater villa experience in the crystal-clear waters of the Maldives.", destination: "Maldives", travelStyles: ["style-1","style-4"], destinations: ["dest-25"], duration: "7 days", price: "From $6,800 per person", difficulty: "Easy", bestTime: "November - April", accommodation: ["acc-20"] },
  { title: "Morocco Imperial Cities", slug: "morocco-imperial-cities", excerpt: "Journey through Marrakech, Fez, Rabat, and Meknes — Morocco's four imperial cities.", destination: "Morocco", travelStyles: ["style-6","style-7"], destinations: ["dest-19"], duration: "9 days", price: "From $2,800 per person", difficulty: "Easy", bestTime: "March - May", accommodation: ["acc-21"] },
  { title: "New Zealand Great Walks", slug: "new-zealand-great-walks", excerpt: "Trek New Zealand's most iconic trails through fjords, mountains, and ancient forests.", destination: "New Zealand", travelStyles: ["style-2","style-8"], destinations: ["dest-32"], duration: "14 days", price: "From $4,500 per person", difficulty: "Challenging", bestTime: "November - March", accommodation: ["acc-22"] },
  { title: "Ethiopia Omo Valley Expedition", slug: "ethiopia-omo-valley-expedition", excerpt: "Meet the fascinating tribes of Ethiopia's Omo Valley in this cultural immersion.", destination: "Ethiopia", travelStyles: ["style-6","style-7"], destinations: ["dest-20"], duration: "10 days", price: "From $3,600 per person", difficulty: "Challenging", bestTime: "September - March", accommodation: ["acc-23"] },
  { title: "Galápagos Islands Cruise", slug: "galapagos-islands-cruise", excerpt: "Sail the enchanted Galápagos Islands and encounter wildlife found nowhere else on Earth.", destination: "Ecuador", travelStyles: ["style-3","style-8"], destinations: ["dest-34"], duration: "8 days", price: "From $5,900 per person", difficulty: "Easy", bestTime: "June - November", accommodation: ["acc-24"] },
  { title: "Borneo Rainforest Explorer", slug: "borneo-rainforest-explorer", excerpt: "Discover orangutans, pygmy elephants, and ancient rainforests in Malaysian Borneo.", destination: "Malaysia", travelStyles: ["style-3","style-8"], destinations: ["dest-26"], duration: "10 days", price: "From $3,400 per person", difficulty: "Moderate", bestTime: "March - October", accommodation: ["acc-25"] },
  { title: "Peruvian Andes & Amazon", slug: "peruvian-andes-amazon", excerpt: "From Machu Picchu to the Amazon rainforest — Peru's most iconic experiences.", destination: "Peru", travelStyles: ["style-2","style-6"], destinations: ["dest-35"], duration: "14 days", price: "From $4,100 per person", difficulty: "Challenging", bestTime: "May - September", accommodation: ["acc-26"] },
  { title: "Greek Island Hopping", slug: "greek-island-hopping", excerpt: "Sail between Santorini, Mykonos, and Crete — the jewels of the Aegean Sea.", destination: "Greece", travelStyles: ["style-1","style-4"], destinations: ["dest-27"], duration: "10 days", price: "From $3,900 per person", difficulty: "Easy", bestTime: "May - October", accommodation: ["acc-27"] },
  { title: "Canadian Rockies Wildlife", slug: "canadian-rockies-wildlife", excerpt: "Spot grizzly bears, elk, and wolves in the dramatic Canadian Rocky Mountains.", destination: "Canada", travelStyles: ["style-3","style-5"], destinations: ["dest-30"], duration: "9 days", price: "From $3,700 per person", difficulty: "Moderate", bestTime: "June - September", accommodation: ["acc-28"] },
  { title: "Madagascar Lemur Trail", slug: "madagascar-lemur-trail", excerpt: "Track lemurs through Madagascar's unique rainforests and spiny deserts.", destination: "Madagascar", travelStyles: ["style-3","style-8"], destinations: ["dest-21"], duration: "12 days", price: "From $4,300 per person", difficulty: "Challenging", bestTime: "April - November", accommodation: ["acc-29"] },
  { title: "Norway Fjords & Northern Lights", slug: "norway-fjords-northern-lights", excerpt: "Cruise through dramatic fjords and chase the Northern Lights in Arctic Norway.", destination: "Norway", travelStyles: ["style-2","style-7"], destinations: ["dest-28"], duration: "8 days", price: "From $4,700 per person", difficulty: "Easy", bestTime: "September - March", accommodation: ["acc-30"] },
  { title: "Australian Outback Expedition", slug: "australian-outback-expedition", excerpt: "Explore the red centre, Great Barrier Reef, and ancient Aboriginal sites.", destination: "Australia", travelStyles: ["style-2","style-6"], destinations: ["dest-33"], duration: "14 days", price: "From $5,100 per person", difficulty: "Moderate", bestTime: "April - October", accommodation: ["acc-31"] },
  { title: "Colombia Caribbean Coast", slug: "colombia-caribbean-coast", excerpt: "Discover Cartagena's colonial charm and the untouched beaches of the Caribbean coast.", destination: "Colombia", travelStyles: ["style-6","style-1"], destinations: ["dest-36"], duration: "9 days", price: "From $2,600 per person", difficulty: "Easy", bestTime: "December - March", accommodation: ["acc-32"] },
  { title: "Bhutan Happiness Trail", slug: "bhutan-happiness-trail", excerpt: "Walk the ancient trails of the world's happiest country, visiting sacred monasteries.", destination: "Bhutan", travelStyles: ["style-6","style-2"], destinations: ["dest-23"], duration: "10 days", price: "From $4,800 per person", difficulty: "Challenging", bestTime: "March - May", accommodation: ["acc-33"] },
  { title: "Alaska Wilderness Adventure", slug: "alaska-wilderness-adventure", excerpt: "Bear viewing, glacier trekking, and whale watching in America's last frontier.", destination: "USA", travelStyles: ["style-2","style-3"], destinations: ["dest-31"], duration: "10 days", price: "From $4,400 per person", difficulty: "Moderate", bestTime: "June - August", accommodation: ["acc-34"] },
];

export function generateAdditionalTours(startId: number = 13): Tour[] {
  return TOUR_TEMPLATES.map((t, i) => ({
    id: `tour-${startId + i}`,
    slug: t.slug,
    title: t.title,
    excerpt: t.excerpt,
    content: `<p>${t.excerpt}</p><p>This carefully crafted journey takes you through the very best of ${t.destination}. Every detail has been considered to ensure an unforgettable travel experience, from hand-picked accommodation to expert local guides who bring each destination to life.</p>`,
    featuredImage: TOUR_IMAGES[i % TOUR_IMAGES.length],
    travelStyles: t.travelStyles,
    destinations: t.destinations,
    duration: t.duration,
    price: t.price,
    groupSize: i % 3 === 0 ? "Private tour (2-4 people)" : i % 3 === 1 ? "Small group (6-12)" : "Max 16 travelers",
    difficulty: t.difficulty,
    bestTime: t.bestTime,
    accommodation: t.accommodation,
    highlights: [
      `Expert local guides in ${t.destination}`,
      "Hand-picked accommodation throughout",
      "All ground transfers included",
      "Small group or private options",
      "Authentic cultural experiences",
    ],
    included: [
      "All accommodation as described",
      "Daily breakfast",
      "Guided excursions",
      "Ground transportation",
      "Entrance fees to all listed sites",
      "Airport transfers",
    ],
    excluded: [
      "International flights",
      "Travel insurance",
      "Meals not mentioned",
      "Personal expenses",
      "Gratuities",
    ],
    destination: t.destination,
  }));
}

const DESTINATION_TEMPLATES: Array<{
  title: string; slug: string; excerpt: string; continentId: string;
  parentId?: string; bestTime: string; climate: string; currency: string;
  language: string; timezone: string;
}> = [
  { title: "Zanzibar", slug: "zanzibar", excerpt: "The Spice Island — pristine beaches, historic Stone Town, and vibrant coral reefs.", continentId: "continent-1", parentId: "dest-4", bestTime: "June - October", climate: "Tropical maritime", currency: "Tanzanian Shilling (TZS)", language: "Swahili, English", timezone: "GMT+3" },
  { title: "Rwanda", slug: "rwanda", excerpt: "The land of a thousand hills, home to endangered mountain gorillas.", continentId: "continent-1", bestTime: "June - September", climate: "Tropical highland", currency: "Rwandan Franc (RWF)", language: "Kinyarwanda, English, French", timezone: "GMT+2" },
  { title: "Morocco", slug: "morocco", excerpt: "Imperial cities, Saharan dunes, and the vibrant souks of Marrakech.", continentId: "continent-1", bestTime: "March - May", climate: "Mediterranean to arid", currency: "Moroccan Dirham (MAD)", language: "Arabic, Berber, French", timezone: "GMT+1" },
  { title: "Ethiopia", slug: "ethiopia", excerpt: "Ancient churches, tribal cultures, and the stunning Simien Mountains.", continentId: "continent-1", bestTime: "October - March", climate: "Tropical monsoon", currency: "Ethiopian Birr (ETB)", language: "Amharic, English", timezone: "GMT+3" },
  { title: "Madagascar", slug: "madagascar", excerpt: "Island of biodiversity — lemurs, baobabs, and unique ecosystems found nowhere else.", continentId: "continent-1", bestTime: "April - November", climate: "Tropical", currency: "Malagasy Ariary (MGA)", language: "Malagasy, French", timezone: "GMT+3" },
  { title: "South Georgia Island", slug: "south-georgia", excerpt: "Sub-Antarctic wildlife paradise with massive penguin colonies and elephant seals.", continentId: "continent-2", bestTime: "October - March", climate: "Sub-Antarctic maritime", currency: "British Pound (GBP)", language: "English", timezone: "GMT-2" },
  { title: "Vietnam", slug: "vietnam", excerpt: "Ancient temples, bustling cities, and stunning karst landscapes from north to south.", continentId: "continent-3", bestTime: "October - April", climate: "Tropical monsoon", currency: "Vietnamese Dong (VND)", language: "Vietnamese", timezone: "GMT+7" },
  { title: "Japan", slug: "japan", excerpt: "Where ancient tradition meets ultramodern innovation — cherry blossoms to bullet trains.", continentId: "continent-3", bestTime: "March - May", climate: "Temperate to subtropical", currency: "Japanese Yen (JPY)", language: "Japanese", timezone: "GMT+9" },
  { title: "Maldives", slug: "maldives", excerpt: "Overwater paradise — crystal-clear waters, vibrant coral reefs, and luxury resorts.", continentId: "continent-3", bestTime: "November - April", climate: "Tropical", currency: "Maldivian Rufiyaa (MVR)", language: "Dhivehi", timezone: "GMT+5" },
  { title: "Borneo", slug: "borneo", excerpt: "Ancient rainforests, orangutans, and indigenous Dayak cultures.", continentId: "continent-3", bestTime: "March - October", climate: "Equatorial", currency: "Malaysian Ringgit (MYR)", language: "Malay, English", timezone: "GMT+8" },
  { title: "Greece", slug: "greece", excerpt: "Sun-drenched islands, ancient ruins, and world-renowned Mediterranean cuisine.", continentId: "continent-4", bestTime: "May - October", climate: "Mediterranean", currency: "Euro (EUR)", language: "Greek", timezone: "GMT+2" },
  { title: "Norway", slug: "norway", excerpt: "Dramatic fjords, Northern Lights, and the midnight sun above the Arctic Circle.", continentId: "continent-4", bestTime: "June - August", climate: "Maritime to Arctic", currency: "Norwegian Krone (NOK)", language: "Norwegian", timezone: "GMT+1" },
  { title: "Costa Rica", slug: "costa-rica", excerpt: "Eco-tourism paradise with rainforests, volcanoes, and two stunning coastlines.", continentId: "continent-5", bestTime: "December - April", climate: "Tropical", currency: "Costa Rican Colón (CRC)", language: "Spanish", timezone: "GMT-6" },
  { title: "Canada", slug: "canada", excerpt: "Rocky Mountains, pristine lakes, and vast wilderness teeming with wildlife.", continentId: "continent-5", bestTime: "June - September", climate: "Continental to Arctic", currency: "Canadian Dollar (CAD)", language: "English, French", timezone: "GMT-5 to GMT-8" },
  { title: "Alaska", slug: "alaska", excerpt: "America's last frontier — glaciers, grizzly bears, and untamed wilderness.", continentId: "continent-5", parentId: "dest-31", bestTime: "June - August", climate: "Subarctic", currency: "US Dollar (USD)", language: "English", timezone: "GMT-9" },
  { title: "New Zealand", slug: "new-zealand", excerpt: "Dramatic landscapes from volcanic plateaus to fjords, with Māori cultural heritage.", continentId: "continent-6", bestTime: "November - March", climate: "Temperate maritime", currency: "New Zealand Dollar (NZD)", language: "English, Māori", timezone: "GMT+12" },
  { title: "Australia", slug: "australia", excerpt: "Ancient outback, Great Barrier Reef, and vibrant cities in the world's smallest continent.", continentId: "continent-6", bestTime: "April - October", climate: "Arid to tropical", currency: "Australian Dollar (AUD)", language: "English", timezone: "GMT+10" },
  { title: "Galápagos Islands", slug: "galapagos", excerpt: "Darwin's living laboratory — unique wildlife encounters in the Pacific.", continentId: "continent-7", bestTime: "June - November", climate: "Tropical dry", currency: "US Dollar (USD)", language: "Spanish", timezone: "GMT-6" },
  { title: "Peru", slug: "peru", excerpt: "Machu Picchu, the Sacred Valley, and the Amazon — ancient civilization meets biodiversity.", continentId: "continent-7", bestTime: "May - September", climate: "Varies by altitude", currency: "Peruvian Sol (PEN)", language: "Spanish, Quechua", timezone: "GMT-5" },
  { title: "Colombia", slug: "colombia", excerpt: "Colonial Cartagena, coffee country, and untouched Caribbean coastlines.", continentId: "continent-7", bestTime: "December - March", climate: "Tropical to highland", currency: "Colombian Peso (COP)", language: "Spanish", timezone: "GMT-5" },
];

export function generateAdditionalDestinations(startId: number = 17): Destination[] {
  return DESTINATION_TEMPLATES.map((d, i) => ({
    id: `dest-${startId + i}`,
    slug: d.slug,
    title: d.title,
    excerpt: d.excerpt,
    content: `<p>${d.excerpt}</p><p>${d.title} offers travellers an extraordinary blend of natural beauty, cultural richness, and unforgettable experiences. Whether you're seeking adventure, relaxation, or cultural immersion, this destination delivers on every front.</p>`,
    featuredImage: DESTINATION_IMAGES[i % DESTINATION_IMAGES.length],
    parentId: d.parentId,
    continentId: d.continentId,
    travelStyles: ["style-2", "style-6"],
    tourIds: [`tour-${startId + i}`],
    accommodationIds: [`acc-${startId + i}`],
    bestTime: d.bestTime,
    climate: d.climate,
    currency: d.currency,
    language: d.language,
    timezone: d.timezone,
    highlights: [
      `Iconic landmarks of ${d.title}`,
      "Rich cultural heritage",
      "Stunning natural landscapes",
      "Authentic local experiences",
    ],
  }));
}

export function generateAdditionalAccommodation(startId: number = 10): Accommodation[] {
  const templates = [
    { title: "Serena Safari Lodge", slug: "serena-safari-lodge", location: "Serengeti, Tanzania", type: "type-2", rating: 5 },
    { title: "Patagonia Eco Lodge", slug: "patagonia-eco-lodge", location: "Torres del Paine, Chile", type: "type-2", rating: 4 },
    { title: "Hanoi Heritage Hotel", slug: "hanoi-heritage-hotel", location: "Old Quarter, Hanoi", type: "type-1", rating: 4 },
    { title: "Iceland Adventure Camp", slug: "iceland-adventure-camp", location: "South Iceland", type: "type-4", rating: 4 },
    { title: "Zanzibar Beach Resort", slug: "zanzibar-beach-resort", location: "Nungwi, Zanzibar", type: "type-3", rating: 5 },
    { title: "Namibia Desert Lodge", slug: "namibia-desert-lodge", location: "Sossusvlei, Namibia", type: "type-2", rating: 5 },
    { title: "Volcanoes Wilderness Lodge", slug: "volcanoes-wilderness-lodge", location: "Musanze, Rwanda", type: "type-2", rating: 5 },
    { title: "Kyoto Ryokan", slug: "kyoto-ryokan", location: "Gion, Kyoto", type: "type-8", rating: 5 },
    { title: "Monteverde Cloud Forest Hotel", slug: "monteverde-cloud-forest-hotel", location: "Monteverde, Costa Rica", type: "type-1", rating: 4 },
    { title: "Maldives Overwater Villas", slug: "maldives-overwater-villas", location: "North Malé Atoll, Maldives", type: "type-7", rating: 5 },
    { title: "Riad Jardin Secret", slug: "riad-jardin-secret", location: "Medina, Marrakech", type: "type-6", rating: 4 },
    { title: "Fiordland Lodge", slug: "fiordland-lodge", location: "Te Anau, New Zealand", type: "type-2", rating: 5 },
    { title: "Omo Valley Tented Camp", slug: "omo-valley-tented-camp", location: "Omo Valley, Ethiopia", type: "type-4", rating: 3 },
    { title: "Galápagos Explorer Vessel", slug: "galapagos-explorer-vessel", location: "Galápagos Islands, Ecuador", type: "type-5", rating: 5 },
    { title: "Borneo Rainforest Lodge", slug: "borneo-rainforest-lodge", location: "Danum Valley, Sabah", type: "type-2", rating: 4 },
    { title: "Sacred Valley Lodge", slug: "sacred-valley-lodge", location: "Urubamba, Peru", type: "type-2", rating: 5 },
    { title: "Santorini Cliff Hotel", slug: "santorini-cliff-hotel", location: "Oia, Santorini", type: "type-8", rating: 5 },
    { title: "Canadian Rockies Lodge", slug: "canadian-rockies-lodge", location: "Banff, Alberta", type: "type-2", rating: 4 },
    { title: "Madagascar Eco Camp", slug: "madagascar-eco-camp", location: "Ranomafana, Madagascar", type: "type-4", rating: 3 },
    { title: "Arctic Explorer Lodge", slug: "arctic-explorer-lodge", location: "Tromsø, Norway", type: "type-2", rating: 4 },
    { title: "Uluru Outback Resort", slug: "uluru-outback-resort", location: "Uluru, Australia", type: "type-3", rating: 4 },
    { title: "Cartagena Colonial Hotel", slug: "cartagena-colonial-hotel", location: "Old Town, Cartagena", type: "type-8", rating: 4 },
    { title: "Bhutan Mountain Lodge", slug: "bhutan-mountain-lodge", location: "Paro Valley, Bhutan", type: "type-2", rating: 4 },
    { title: "Alaska Wilderness Lodge", slug: "alaska-wilderness-lodge", location: "Denali, Alaska", type: "type-2", rating: 4 },
    { title: "Seychelles Island Villa", slug: "seychelles-island-villa", location: "Praslin, Seychelles", type: "type-7", rating: 5 },
    { title: "Masai Mara Luxury Tented Camp", slug: "masai-mara-luxury-tented-camp", location: "Masai Mara, Kenya", type: "type-4", rating: 5 },
    { title: "Amazon River Lodge", slug: "amazon-river-lodge", location: "Iquitos, Peru", type: "type-2", rating: 3 },
  ];
  return templates.map((t, i) => ({
    id: `acc-${startId + i}`,
    slug: t.slug,
    title: t.title,
    excerpt: `Experience the finest ${t.type === "type-2" ? "lodge" : t.type === "type-4" ? "camp" : "hotel"} accommodation at ${t.title}.`,
    content: `<p>${t.title} offers exceptional accommodation in ${t.location}. Guests enjoy world-class service, stunning surroundings, and authentic experiences that create lasting memories.</p>`,
    featuredImage: ACCOMMODATION_IMAGES[i % ACCOMMODATION_IMAGES.length],
    types: [t.type],
    destinations: [`dest-${startId + i > 36 ? ((startId + i) % 36) + 1 : startId + i}`],
    travelStyles: i % 2 === 0 ? ["style-4","style-1"] : ["style-2","style-3"],
    brands: [i % 3 === 0 ? "brand-4" : i % 3 === 1 ? "brand-5" : "brand-6"],
    facilities: ["facility-1","facility-3","facility-4"],
    rating: t.rating,
    amenities: ["WiFi", "Restaurant", "24-hour reception", "Room service"],
    roomTypes: ["Standard Room", "Deluxe Room", "Suite"],
    location: t.location,
  }));
}

export function generateAdditionalBlogPosts(startId: number = 25): BlogPost[] {
  const authors = ["Sarah Johnson", "David Chen", "Emma Wilson", "James Carter", "Aisha Patel", "Carlos Rodriguez"];
  const templates = [
    { title: "Top 10 Honeymoon Destinations in Africa", slug: "top-10-honeymoon-destinations-africa", category: "cat-4", tags: ["tag-13","tag-3"] },
    { title: "How to Choose the Right Safari Vehicle", slug: "how-to-choose-right-safari-vehicle", category: "cat-2", tags: ["tag-6","tag-14"] },
    { title: "Budget Safari Tips: See Africa Without Breaking the Bank", slug: "budget-safari-tips", category: "cat-3", tags: ["tag-12","tag-9"] },
    { title: "The Complete Guide to Photographing Wildlife", slug: "complete-guide-photographing-wildlife", category: "cat-5", tags: ["tag-10","tag-2"] },
    { title: "Why Group Travel Is Making a Comeback", slug: "group-travel-making-comeback", category: "cat-1", tags: ["tag-14","tag-9"] },
    { title: "Travelling with Kids: A Family Safari Guide", slug: "travelling-with-kids-family-safari-guide", category: "cat-6", tags: ["tag-11","tag-9"] },
    { title: "Sustainable Tourism: Making a Positive Impact", slug: "sustainable-tourism-positive-impact", category: "cat-5", tags: ["tag-15","tag-4"] },
    { title: "The Best Time to Visit Each African Country", slug: "best-time-visit-each-african-country", category: "cat-4", tags: ["tag-9","tag-8"] },
    { title: "Culinary Adventures: Eating Your Way Across Africa", slug: "culinary-adventures-eating-across-africa", category: "cat-7", tags: ["tag-14","tag-9"] },
    { title: "How Conservation Tourism Saves Endangered Species", slug: "conservation-tourism-saves-endangered-species", category: "cat-5", tags: ["tag-15","tag-2"] },
    { title: "The Rise of Slow Travel: Quality Over Quantity", slug: "rise-of-slow-travel", category: "cat-8", tags: ["tag-4","tag-9"] },
    { title: "Digital Nomad Guide: Working Remotely from Africa", slug: "digital-nomad-guide-working-remotely-africa", category: "cat-3", tags: ["tag-9","tag-12"] },
  ];
  return templates.map((t, i) => ({
    id: `post-${startId + i}`,
    slug: t.slug,
    title: t.title,
    excerpt: `An in-depth look at ${t.title.toLowerCase()} — expert insights and practical advice.`,
    content: `<p>${t.title} is a topic that resonates with many modern travellers. In this comprehensive guide, we explore the key considerations, share expert tips, and provide practical advice to help you make the most of your travel experiences.</p>`,
    featuredImage: BLOG_IMAGES[i % BLOG_IMAGES.length],
    author: authors[i % authors.length],
    date: `2025-${String(((i % 12) + 1)).padStart(2, "0")}-${String(((i % 28) + 1)).padStart(2, "0")}`,
    categories: [t.category],
    tags: t.tags,
  }));
}

export function generateAdditionalReviews(startId: number = 15): Review[] {
  const reviewers = [
    { name: "Michael Thompson", location: "London, UK" },
    { name: "Sophie Laurent", location: "Paris, France" },
    { name: "Hans Mueller", location: "Berlin, Germany" },
    { name: "Yuki Tanaka", location: "Tokyo, Japan" },
    { name: "Maria Santos", location: "São Paulo, Brazil" },
    { name: "Chen Wei", location: "Beijing, China" },
    { name: "Anna Kowalski", location: "Warsaw, Poland" },
    { name: "James O'Brien", location: "Dublin, Ireland" },
    { name: "Priya Sharma", location: "Mumbai, India" },
    { name: "Lars Johansson", location: "Stockholm, Sweden" },
    { name: "Olivia Hart", location: "Sydney, Australia" },
    { name: "Mohammed Al-Fayed", location: "Dubai, UAE" },
    { name: "Isabella Rossi", location: "Milan, Italy" },
    { name: "Robert Williams", location: "Toronto, Canada" },
    { name: "Elena Volkov", location: "Moscow, Russia" },
    { name: "Akiko Suzuki", location: "Osaka, Japan" },
    { name: "Thomas Fischer", location: "Vienna, Austria" },
    { name: "Carmen Ruiz", location: "Madrid, Spain" },
    { name: "Patrick Nguyen", location: "Ho Chi Minh City, Vietnam" },
    { name: "Fatou Diallo", location: "Dakar, Senegal" },
    { name: "Emily Watson", location: "New York, USA" },
    { name: "Raj Kapoor", location: "New Delhi, India" },
  ];
  return reviewers.map((r, i) => ({
    id: `rev-${startId + i}`,
    slug: `review-${r.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`,
    title: [
      "Absolutely Incredible Experience!",
      "Trip of a Lifetime",
      "Exceeded All Expectations",
      "Perfect in Every Way",
      "Unforgettable Journey",
      "Outstanding Service",
      "Would Recommend to Everyone",
      "A Dream Come True",
    ][i % 8],
    excerpt: `${r.name} shares their experience travelling with Tour Operator Web Solutions.`,
    content: `Our trip was absolutely wonderful from start to finish. The attention to detail, the quality of guides, and the stunning locations all combined to create an experience we will treasure forever. The team went above and beyond to make sure everything was perfect.`,
    rating: [5, 5, 4, 5, 5, 4, 5, 5, 4, 5][i % 10],
    author: r.name,
    authorLocation: r.location,
    date: `2025-${String(((i % 12) + 1)).padStart(2, "0")}-${String(((i * 3 % 28) + 1)).padStart(2, "0")}`,
    tourId: `tour-${(i % 12) + 1}`,
    verified: true,
    wouldRecommend: true,
    groupType: ["Couple", "Family", "Solo", "Friends"][i % 4],
    travelDate: `2025-${String(((i % 12) + 1)).padStart(2, "0")}`,
    tripDuration: ["7 days", "10 days", "14 days", "5 days"][i % 4],
    aspectRatings: {
      service: [5, 5, 4, 5, 5][i % 5],
      value: [4, 5, 4, 5, 4][i % 5],
      accommodation: [5, 5, 5, 4, 5][i % 5],
      activities: [5, 4, 5, 5, 5][i % 5],
      food: [4, 5, 4, 5, 4][i % 5],
      guide: [5, 5, 5, 5, 5][i % 5],
    },
  }));
}

export function generateAdditionalSpecials(startId: number = 10): EnhancedSpecial[] {
  const templates = [
    { title: "Summer Safari Sale", slug: "summer-safari-sale", discount: "25% off", category: "seasonal" },
    { title: "Couples Retreat Special", slug: "couples-retreat-special", discount: "$800 off", category: "seasonal" },
    { title: "Family Adventure Discount", slug: "family-adventure-discount", discount: "Kids travel free", category: "family" },
    { title: "Last Minute Namibia Deal", slug: "last-minute-namibia-deal", discount: "30% off", category: "last-minute" },
    { title: "Book 2 Get 1 Free", slug: "book-2-get-1-free", discount: "3rd trip free", category: "early-bird" },
    { title: "Photography Tour Special", slug: "photography-tour-special", discount: "$500 off", category: "seasonal" },
    { title: "Luxury Lodge Upgrade", slug: "luxury-lodge-upgrade", discount: "Free upgrade", category: "accommodation" },
    { title: "Winter Warmer: Zanzibar Beach", slug: "winter-warmer-zanzibar-beach", discount: "20% off", category: "seasonal" },
    { title: "Anniversary Trip Bonus", slug: "anniversary-trip-bonus", discount: "$600 credit", category: "seasonal" },
    { title: "Group Booking Discount", slug: "group-booking-discount", discount: "15% off groups 6+", category: "group" },
    { title: "Extended Stay Offer", slug: "extended-stay-offer", discount: "Stay 10 pay 8", category: "seasonal" },
    { title: "Solo Traveller Special", slug: "solo-traveller-special", discount: "No single supplement", category: "seasonal" },
    { title: "Gorilla Trekking Flash Sale", slug: "gorilla-trekking-flash-sale", discount: "40% off", category: "flash-sale" },
    { title: "New Year Adventure Deal", slug: "new-year-adventure-deal", discount: "$1,000 off", category: "seasonal" },
    { title: "Repeat Guest Reward", slug: "repeat-guest-reward", discount: "20% loyalty discount", category: "early-bird" },
    { title: "Bucket List Combo Deal", slug: "bucket-list-combo-deal", discount: "Save $1,500", category: "early-bird" },
    { title: "Early Bird Japan Special", slug: "early-bird-japan-special", discount: "25% off", category: "early-bird" },
    { title: "Galápagos Last Cabin Deal", slug: "galapagos-last-cabin-deal", discount: "35% off", category: "last-minute" },
    { title: "Honeymoon Package Upgrade", slug: "honeymoon-package-upgrade", discount: "Free spa package", category: "seasonal" },
    { title: "Multi-Destination Savings", slug: "multi-destination-savings", discount: "Save 20% on 2+ destinations", category: "early-bird" },
    { title: "Weekend Flash Sale: Iceland", slug: "weekend-flash-sale-iceland", discount: "30% off", category: "flash-sale" },
    { title: "Teacher Appreciation Discount", slug: "teacher-appreciation-discount", discount: "15% off for educators", category: "seasonal" },
    { title: "Corporate Team Building Special", slug: "corporate-team-building-special", discount: "Group rates + extras", category: "group" },
    { title: "Adventure Duo Deal", slug: "adventure-duo-deal", discount: "2nd person 50% off", category: "seasonal" },
    { title: "First-Time Traveller Bonus", slug: "first-time-traveller-bonus", discount: "$300 welcome credit", category: "early-bird" },
    { title: "Shoulder Season Savings", slug: "shoulder-season-savings", discount: "Up to 35% off", category: "seasonal" },
    { title: "Ultimate Safari Bundle", slug: "ultimate-safari-bundle", discount: "Save $2,000", category: "early-bird" },
  ];
  return templates.map((t, i) => ({
    id: `special-${startId + i}`,
    slug: t.slug,
    title: t.title,
    excerpt: `${t.discount} — limited time offer on selected ${t.category} departures.`,
    content: `<p>Don't miss this incredible offer! ${t.title} gives you ${t.discount} on selected departures. Book now to secure your spot on one of our most popular journeys.</p>`,
    featuredImage: SPECIAL_IMAGES[i % SPECIAL_IMAGES.length],
    discount: t.discount,
    validFrom: "2025-01-01",
    validTo: "2026-12-31",
    travelStyles: ["style-2","style-4"],
    terms: "Subject to availability. Terms and conditions apply. Cannot be combined with other offers.",
    categories: [t.category],
    tourIds: [`tour-${(i % 12) + 1}`],
    accommodationIds: [`acc-${(i % 9) + 1}`],
    promoCode: `SAVE${startId + i}`,
    isFlashSale: t.category === "flash-sale",
    originalPrice: `$${4000 + i * 200}`,
    discountedPrice: `$${3000 + i * 150}`,
    discountType: t.category === "flash-sale" ? "percentage" as const : "fixed" as const,
    availableSpots: 20 + i,
    bookedSpots: Math.floor(Math.random() * 15),
  }));
}

export function generateAdditionalTeamMembers(startId: number = 13): EnhancedTeamMember[] {
  const templates = [
    { name: "Lena Hoffmann", slug: "lena-hoffmann", role: "Senior Travel Consultant", roleId: "travel-consultant", specialties: ["Europe","Cultural Tours"] },
    { name: "Ahmed Ibrahim", slug: "ahmed-ibrahim", role: "Destination Specialist — Middle East", roleId: "destination-specialist", specialties: ["Middle East","Desert Expeditions"] },
    { name: "Sophie Dubois", slug: "sophie-dubois", role: "Operations Manager", roleId: "operations", specialties: ["Logistics","Group Tours"] },
    { name: "Kenji Watanabe", slug: "kenji-watanabe", role: "Asia Travel Specialist", roleId: "destination-specialist", specialties: ["Japan","Southeast Asia"] },
    { name: "Anya Volkov", slug: "anya-volkov", role: "Polar Expedition Leader", roleId: "guide", specialties: ["Antarctica","Arctic","Expedition Ships"] },
    { name: "Marco Bianchi", slug: "marco-bianchi", role: "Luxury Travel Consultant", roleId: "travel-consultant", specialties: ["Luxury","Honeymoons","Italy"] },
    { name: "Grace Okafor", slug: "grace-okafor", role: "West Africa Specialist", roleId: "destination-specialist", specialties: ["West Africa","Cultural Tours","Community Tourism"] },
    { name: "Daniel Murphy", slug: "daniel-murphy", role: "Adventure Tour Leader", roleId: "guide", specialties: ["Trekking","Mountaineering","Photography"] },
    { name: "Priya Gupta", slug: "priya-gupta", role: "South Asia Consultant", roleId: "travel-consultant", specialties: ["India","Nepal","Sri Lanka","Bhutan"] },
    { name: "Lucas Santos", slug: "lucas-santos", role: "South America Specialist", roleId: "destination-specialist", specialties: ["Brazil","Argentina","Patagonia"] },
    { name: "Ingrid Larsen", slug: "ingrid-larsen", role: "Scandinavian Tour Expert", roleId: "destination-specialist", specialties: ["Norway","Northern Lights","Fjords"] },
    { name: "Chiara Moretti", slug: "chiara-moretti", role: "Marketing Director", roleId: "management", specialties: ["Brand Strategy","Digital Marketing"] },
    { name: "Tariq Hassan", slug: "tariq-hassan", role: "Wildlife Safari Guide", roleId: "guide", specialties: ["Big Five","Bird Watching","Conservation"] },
    { name: "Nadia Petrov", slug: "nadia-petrov", role: "Customer Experience Manager", roleId: "operations", specialties: ["Guest Relations","Quality Assurance"] },
    { name: "Will Fitzgerald", slug: "will-fitzgerald", role: "Photography Tour Leader", roleId: "guide", specialties: ["Wildlife Photography","Landscape Photography"] },
    { name: "Amara Diop", slug: "amara-diop", role: "East Africa Specialist", roleId: "destination-specialist", specialties: ["Kenya","Tanzania","Uganda","Rwanda"] },
    { name: "Henrik Johansson", slug: "henrik-johansson", role: "Expedition Ship Captain", roleId: "guide", specialties: ["Polar Expeditions","Marine Biology"] },
    { name: "Zara Ali", slug: "zara-ali", role: "Family Travel Consultant", roleId: "travel-consultant", specialties: ["Family Holidays","Kids Activities","Multi-generational"] },
    { name: "Pablo Mendez", slug: "pablo-mendez", role: "Central America Specialist", roleId: "destination-specialist", specialties: ["Costa Rica","Guatemala","Belize"] },
    { name: "Freya Nielsen", slug: "freya-nielsen", role: "Sustainability Officer", roleId: "management", specialties: ["Eco-Tourism","Carbon Offsetting","Community Projects"] },
    { name: "Kofi Asante", slug: "kofi-asante", role: "Cultural Tour Guide", roleId: "guide", specialties: ["West African History","Music","Art"] },
    { name: "Mei-Ling Chen", slug: "mei-ling-chen-jr", role: "Digital Experience Specialist", roleId: "operations", specialties: ["Website","App Development","UX"] },
    { name: "Ravi Kumar", slug: "ravi-kumar", role: "Finance Director", roleId: "management", specialties: ["Pricing Strategy","Revenue Management"] },
    { name: "Isabella Martinez", slug: "isabella-martinez", role: "Travel Concierge", roleId: "travel-consultant", specialties: ["VIP Services","Bespoke Itineraries","Luxury"] },
  ];
  return templates.map((t, i) => ({
    id: t.slug,
    slug: t.slug,
    name: t.name,
    role: t.role,
    bio: `<p>${t.name} brings extensive experience and genuine passion to the team. With deep knowledge of ${t.specialties.join(", ")}, ${t.name.split(" ")[0]} ensures every journey is crafted with care and attention to detail.</p>`,
    excerpt: `${t.role} specializing in ${t.specialties.slice(0, 2).join(" and ")}.`,
    featuredImage: TEAM_PORTRAIT_IMAGES[i % TEAM_PORTRAIT_IMAGES.length],
    email: `${t.slug.replace(/-/g, ".")}@touroperator.com`,
    phone: `+1 555-${String(1000 + startId + i)}`,
    specialties: t.specialties,
    roles: [t.roleId],
    languages: ["English", i % 2 === 0 ? "French" : "Spanish"],
    yearsExperience: 5 + (i % 15),
    certifications: ["First Aid", "Wilderness Safety"],
    featured: i < 3,
  }));
}
