/**
 * Packing Data
 * 
 * Mock data for packing lists and guides.
 * 
 * @module packing
 * @category data
 */

import type { 
  PackingList, 
  PackingCategory, 
  SafariEssential, 
  SeasonalGuide, 
  PhotographyGear, 
  HealthSafetyItem 
} from "./types";

/**
 * Packing Lists
 * 
 * Pre-defined packing lists for different travel styles.
 * Used on PackingGuidesPage to help travelers prepare.
 * 
 * @constant {PackingList[]}
 */
export const PACKING_LISTS: PackingList[] = [
  {
    id: "essential-safari",
    title: "Essential Safari Packing List",
    description: "Complete checklist for your African safari adventure",
    category: "general",
    items: [
      "Passport (valid 6+ months)",
      "Vaccination certificates",
      "Travel insurance documents",
      "Binoculars (8x32 or 10x42)",
      "Lightweight daypack",
      "Reusable water bottle",
      "Sunscreen (SPF 50+)",
      "Insect repellent (DEET 30%+)",
      "Wide-brimmed hat",
      "Sunglasses (UV protection)",
      "Neutral-colored clothing (khaki, olive, tan)",
      "Long-sleeved shirts (sun protection)",
      "Long pants (lightweight)",
      "Closed-toe walking shoes",
      "Fleece or light jacket (mornings/evenings)",
      "Headlamp or flashlight",
      "Camera with zoom lens",
      "Extra batteries and memory cards",
      "Phone charger and power adapter",
      "Personal medications",
      "Basic first-aid kit",
      "Hand sanitizer and wet wipes"
    ],
    featured: true,
    downloads: 12847
  },
  {
    id: "photography-gear",
    title: "Safari Photography Equipment Guide",
    description: "Essential camera gear for capturing stunning wildlife photos",
    category: "photography",
    items: [
      "DSLR or mirrorless camera body",
      "Telephoto lens (200-600mm recommended)",
      "Wide-angle lens (for landscapes)",
      "Extra camera batteries (4-6)",
      "Multiple memory cards (64GB+)",
      "Lens cleaning kit",
      "Beanbag or tripod (vehicle support)",
      "Lens hood (reduce glare)",
      "Polarizing filter",
      "Camera rain cover",
      "Backup camera body (optional)",
      "External hard drive (backup photos)",
      "Card reader",
      "Silica gel packets (moisture protection)"
    ],
    featured: true,
    downloads: 8934
  },
  {
    id: "health-safety",
    title: "Health & Safety Essentials",
    description: "Medical preparations and safety items for safari travel",
    category: "health",
    items: [
      "Malaria prophylaxis (prescribed)",
      "Antimalarial medication",
      "Diarrhea medication (Imodium)",
      "Antihistamines (allergies)",
      "Pain relievers (ibuprofen, acetaminophen)",
      "Antibiotics (prescribed for emergencies)",
      "Motion sickness tablets",
      "Rehydration salts (Pedialyte)",
      "Prescription medications (2x duration)",
      "Hand sanitizer (travel size)",
      "Antibacterial wipes",
      "Sunburn relief gel",
      "Lip balm with SPF",
      "Insect bite cream",
      "Band-aids and blister plasters",
      "Digital thermometer",
      "Travel insurance card",
      "Emergency contact list"
    ],
    featured: true,
    downloads: 7621
  },
  {
    id: "seasonal-wet",
    title: "Wet Season Packing (Nov-Apr)",
    description: "Additional items for safari during rainy season",
    category: "seasonal",
    items: [
      "Lightweight rain jacket",
      "Waterproof daypack cover",
      "Quick-dry clothing",
      "Waterproof camera bag",
      "Extra socks (quick-dry)",
      "Waterproof phone pouch",
      "Umbrella (compact)",
      "Waterproof hiking boots"
    ],
    featured: false,
    downloads: 3456
  },
  {
    id: "luxury-safari",
    title: "Luxury Safari Extras",
    description: "Enhanced comfort items for premium safari experiences",
    category: "general",
    items: [
      "Elegant evening wear (lodge dinners)",
      "Smart casual outfits",
      "Quality leather journal",
      "Premium binoculars (Swarovski/Zeiss)",
      "Portable speaker (Bluetooth)",
      "E-reader or tablet",
      "Travel pillow and blanket",
      "Noise-cancelling headphones",
      "Silk sleep mask",
      "Luxury toiletries",
      "Favorite snacks/treats"
    ],
    featured: false,
    downloads: 5123
  }
];

/**
 * Packing Categories
 * 
 * Organizational categories for packing lists.
 * Used to help users find relevant lists quickly.
 * 
 * @constant {PackingCategory[]}
 */
export const PACKING_CATEGORIES: PackingCategory[] = [
  {
    id: "cat-general",
    name: "General Safari Packing",
    description: "Complete checklists for all safari travelers",
    icon: "Package",
    listIds: ["essential-safari", "luxury-safari"]
  },
  {
    id: "cat-photography",
    name: "Photography Equipment",
    description: "Camera gear and accessories for wildlife photography",
    icon: "Camera",
    listIds: ["photography-gear"]
  },
  {
    id: "cat-health",
    name: "Health & Safety",
    description: "Medical preparations and safety essentials",
    icon: "Heart",
    listIds: ["health-safety"]
  },
  {
    id: "cat-seasonal",
    name: "Seasonal Guides",
    description: "Weather-specific packing recommendations",
    icon: "Cloud",
    listIds: ["seasonal-wet"]
  }
];

/**
 * Safari Essential Items
 * 
 * Must-have, recommended, and optional items for safari.
 * Used to communicate item priorities to travelers.
 * 
 * @constant {SafariEssential[]}
 */
export const SAFARI_ESSENTIALS: SafariEssential[] = [
  {
    id: "ess-binoculars",
    name: "Binoculars (8x32 or 10x42)",
    category: "Viewing Equipment",
    priority: "must-have",
    notes: "Essential for wildlife viewing. 8x32 for compact travel, 10x42 for better magnification."
  },
  {
    id: "ess-sunscreen",
    name: "High SPF Sunscreen (50+)",
    category: "Sun Protection",
    priority: "must-have",
    notes: "African sun is intense. Reef-safe formula recommended."
  },
  {
    id: "ess-insect-repellent",
    name: "Insect Repellent (DEET 30%+)",
    category: "Bug Protection",
    priority: "must-have",
    notes: "Essential for malaria prevention. Apply after sunscreen."
  },
  {
    id: "ess-neutral-clothing",
    name: "Neutral-Colored Clothing",
    category: "Apparel",
    priority: "must-have",
    notes: "Khaki, olive, tan colors. Avoid bright colors and camouflage patterns."
  },
  {
    id: "ess-hat",
    name: "Wide-Brimmed Hat",
    category: "Sun Protection",
    priority: "must-have",
    notes: "Protects face and neck from sun. Choose breathable fabric."
  },
  {
    id: "ess-camera",
    name: "Camera with Zoom Lens",
    category: "Photography",
    priority: "recommended",
    notes: "200-600mm telephoto lens ideal for wildlife. Smartphone cameras work too."
  },
  {
    id: "ess-daypack",
    name: "Lightweight Daypack",
    category: "Luggage",
    priority: "recommended",
    notes: "For game drives. Keep essentials handy (water, sunscreen, camera)."
  },
  {
    id: "ess-headlamp",
    name: "Headlamp or Flashlight",
    category: "Lighting",
    priority: "recommended",
    notes: "For navigating camps at night. Red light mode preserves night vision."
  },
  {
    id: "ess-fleece",
    name: "Fleece or Light Jacket",
    category: "Apparel",
    priority: "recommended",
    notes: "Mornings and evenings can be cool. Layering is key."
  },
  {
    id: "ess-closed-shoes",
    name: "Closed-Toe Walking Shoes",
    category: "Footwear",
    priority: "must-have",
    notes: "For bush walks. Lightweight hiking shoes or sneakers work well."
  },
  {
    id: "ess-sunglasses",
    name: "Sunglasses (UV Protection)",
    category: "Sun Protection",
    priority: "must-have",
    notes: "Polarized lenses reduce glare. Wraparound style protects from dust."
  },
  {
    id: "ess-water-bottle",
    name: "Reusable Water Bottle",
    category: "Hydration",
    priority: "recommended",
    notes: "Stay hydrated on game drives. Insulated bottle keeps water cool."
  },
  {
    id: "ess-first-aid",
    name: "Basic First-Aid Kit",
    category: "Medical",
    priority: "recommended",
    notes: "Band-aids, pain relievers, antihistamines, diarrhea medication."
  },
  {
    id: "ess-power-adapter",
    name: "Power Adapter (Type D/M/G)",
    category: "Electronics",
    priority: "must-have",
    notes: "Check destination. South Africa uses Type M, Kenya/Tanzania use Type G."
  },
  {
    id: "ess-journal",
    name: "Travel Journal",
    category: "Personal",
    priority: "optional",
    notes: "Record sightings, experiences, and memories. Digital or paper."
  },
  {
    id: "ess-field-guide",
    name: "Wildlife Field Guide",
    category: "Reference",
    priority: "optional",
    notes: "Identify animals and birds. Many guides have excellent apps."
  },
  {
    id: "ess-dry-bag",
    name: "Dry Bag or Waterproof Pouch",
    category: "Protection",
    priority: "recommended",
    notes: "Protects electronics from dust and rain. Especially useful in open vehicles."
  },
  {
    id: "ess-buff",
    name: "Buff or Bandana",
    category: "Apparel",
    priority: "recommended",
    notes: "Multi-purpose: sun protection, dust mask, headband, scarf."
  }
];

/**
 * Seasonal Packing Guides
 * 
 * Weather-based packing recommendations by season.
 * Used to help travelers pack appropriately for conditions.
 * 
 * @constant {SeasonalGuide[]}
 */
export const SEASONAL_GUIDES: SeasonalGuide[] = [
  {
    id: "season-dry",
    season: "Dry Season (May-October)",
    months: "May, June, July, August, September, October",
    temperature: "15-28°C (59-82°F) during day, 5-15°C (41-59°F) at night",
    clothing: [
      "Warm fleece or jacket for early mornings",
      "Long pants (lightweight)",
      "Long-sleeved shirts",
      "Layers for temperature changes",
      "Closed-toe shoes",
      "Warm socks for cool mornings",
      "Beanie or warm hat"
    ],
    considerations: [
      "Dusty conditions - bring dust protection for camera",
      "Very dry air - pack lip balm and moisturizer",
      "Cooler mornings/evenings - layering essential",
      "Peak wildlife viewing season",
      "Less vegetation - easier animal spotting"
    ]
  },
  {
    id: "season-wet",
    season: "Wet Season (November-April)",
    months: "November, December, January, February, March, April",
    temperature: "20-32°C (68-90°F) during day, 15-20°C (59-68°F) at night",
    clothing: [
      "Lightweight rain jacket",
      "Quick-dry clothing",
      "Breathable fabrics",
      "Waterproof hiking boots",
      "Extra socks (moisture-wicking)",
      "Sun protection (still needed)",
      "Shorts for hot days"
    ],
    considerations: [
      "Afternoon thunderstorms common - pack rain gear",
      "Higher humidity - choose breathable fabrics",
      "Waterproof camera protection essential",
      "Green season - lush landscapes and baby animals",
      "Fewer tourists, lower prices",
      "Some roads may be inaccessible"
    ]
  },
  {
    id: "season-shoulder",
    season: "Shoulder Season (April-May, Oct-Nov)",
    months: "April, May, October, November",
    temperature: "18-30°C (64-86°F) variable conditions",
    clothing: [
      "Versatile layering options",
      "Both warm and cool weather items",
      "Light rain jacket",
      "Mix of long and short sleeves",
      "Comfortable walking shoes",
      "Fleece for cooler moments"
    ],
    considerations: [
      "Unpredictable weather - pack for all conditions",
      "Transitional wildlife movements",
      "Good balance of prices and crowds",
      "Variable temperatures - bring layers",
      "Mix of dry and wet season benefits"
    ]
  },
  {
    id: "season-gorilla",
    season: "Gorilla Trekking (Rwanda/Uganda)",
    months: "Year-round with dry seasons: June-September, December-February",
    temperature: "10-25°C (50-77°F) in highlands",
    clothing: [
      "Waterproof hiking boots (essential)",
      "Long pants (thick fabric - nettle protection)",
      "Long-sleeved shirt",
      "Waterproof jacket",
      "Gardening gloves (for grabbing vegetation)",
      "Gaiters (ankle protection)",
      "Warm layers for high altitude"
    ],
    considerations: [
      "Steep, muddy terrain - proper boots critical",
      "Stinging nettles common - cover all skin",
      "High altitude (cold) - bring warm layers",
      "Rain possible year-round - waterproof everything",
      "Physical fitness required - prepare accordingly",
      "Porter service available and recommended"
    ]
  }
];

/**
 * Photography Gear
 * 
 * Camera equipment and accessories for safari photography.
 * Used to help photographers prepare their gear.
 * 
 * @constant {PhotographyGear[]}
 */
export const PHOTOGRAPHY_GEAR: PhotographyGear[] = [
  {
    id: "gear-camera-body",
    name: "DSLR or Mirrorless Camera",
    category: "camera",
    priority: "essential",
    notes: "Full-frame or APS-C sensor. Fast autofocus for wildlife action."
  },
  {
    id: "gear-telephoto",
    name: "Telephoto Lens (200-600mm)",
    category: "lens",
    priority: "essential",
    notes: "Critical for wildlife. 400-600mm ideal. Image stabilization recommended."
  },
  {
    id: "gear-wide-angle",
    name: "Wide-Angle Lens (16-35mm)",
    category: "lens",
    priority: "recommended",
    notes: "For landscapes, camps, and environmental portraits."
  },
  {
    id: "gear-mid-range",
    name: "Mid-Range Zoom (24-70mm or 24-105mm)",
    category: "lens",
    priority: "recommended",
    notes: "Versatile all-rounder for camps, people, and general photography."
  },
  {
    id: "gear-batteries",
    name: "Extra Camera Batteries (4-6)",
    category: "accessory",
    priority: "essential",
    notes: "Limited charging opportunities. Cold mornings drain batteries faster."
  },
  {
    id: "gear-memory-cards",
    name: "Memory Cards (64GB+ each)",
    category: "accessory",
    priority: "essential",
    notes: "Multiple cards (4-6). Fast write speed (95MB/s+) for burst shooting."
  },
  {
    id: "gear-beanbag",
    name: "Beanbag or Window Mount",
    category: "accessory",
    priority: "recommended",
    notes: "Stabilize camera in vehicle. Beanbag is most versatile for safari."
  },
  {
    id: "gear-cleaning-kit",
    name: "Lens Cleaning Kit",
    category: "accessory",
    priority: "essential",
    notes: "Dust is constant. Microfiber cloths, air blower, lens pen."
  },
  {
    id: "gear-filters",
    name: "Polarizing Filter",
    category: "accessory",
    priority: "recommended",
    notes: "Reduce glare, enhance skies. Get proper size for your lenses."
  },
  {
    id: "gear-rain-cover",
    name: "Camera Rain Cover",
    category: "accessory",
    priority: "recommended",
    notes: "Protects from rain and dust. Essential for wet season."
  },
  {
    id: "gear-backup-body",
    name: "Backup Camera Body",
    category: "camera",
    priority: "optional",
    notes: "For serious photographers. Equipment can fail in harsh conditions."
  },
  {
    id: "gear-hard-drive",
    name: "Portable Hard Drive (1TB+)",
    category: "accessory",
    priority: "recommended",
    notes: "Backup photos daily. Consider 2 drives (redundancy)."
  },
  {
    id: "gear-card-reader",
    name: "Fast Card Reader",
    category: "accessory",
    priority: "recommended",
    notes: "USB 3.0 or faster. Speeds up photo transfers and backups."
  },
  {
    id: "gear-silica",
    name: "Silica Gel Packets",
    category: "accessory",
    priority: "recommended",
    notes: "Moisture protection for gear. Store in camera bag."
  },
  {
    id: "gear-converter",
    name: "Teleconverter (1.4x or 2x)",
    category: "lens",
    priority: "optional",
    notes: "Extends reach of telephoto. Some loss of image quality and light."
  }
];

/**
 * Health & Safety Items
 * 
 * Medical preparations and safety requirements for safari.
 * Used to communicate health preparations to travelers.
 * 
 * @constant {HealthSafetyItem[]}
 */
export const HEALTH_SAFETY: HealthSafetyItem[] = [
  {
    id: "health-malaria",
    name: "Malaria Prophylaxis",
    category: "medication",
    required: true,
    notes: "Consult doctor 4-6 weeks before travel. Options: Malarone, Doxycycline, or Mefloquine."
  },
  {
    id: "health-yellow-fever",
    name: "Yellow Fever Vaccination",
    category: "vaccination",
    required: true,
    notes: "Required for many African countries. Get certificate. Valid 10 days after vaccination."
  },
  {
    id: "health-typhoid",
    name: "Typhoid Vaccination",
    category: "vaccination",
    required: false,
    notes: "Recommended for most travelers. Oral or injection form available."
  },
  {
    id: "health-hepatitis-a",
    name: "Hepatitis A Vaccination",
    category: "vaccination",
    required: false,
    notes: "Recommended. Can be combined with Hepatitis B (Twinrix)."
  },
  {
    id: "health-hepatitis-b",
    name: "Hepatitis B Vaccination",
    category: "vaccination",
    required: false,
    notes: "Recommended for longer stays or medical risk. Three-dose series."
  },
  {
    id: "health-tetanus",
    name: "Tetanus Booster",
    category: "vaccination",
    required: false,
    notes: "Ensure up-to-date (every 10 years). Important for outdoor activities."
  },
  {
    id: "health-rabies",
    name: "Rabies Vaccination (Pre-exposure)",
    category: "vaccination",
    required: false,
    notes: "Consider for extended stays or wildlife contact. Three-dose series."
  },
  {
    id: "health-covid",
    name: "COVID-19 Vaccination",
    category: "vaccination",
    required: false,
    notes: "Check current requirements. Some countries require proof of vaccination."
  },
  {
    id: "health-diarrhea",
    name: "Diarrhea Medication (Imodium)",
    category: "medication",
    required: false,
    notes: "Essential for travel. Bring prescribed antibiotics for severe cases."
  },
  {
    id: "health-antihistamine",
    name: "Antihistamines",
    category: "medication",
    required: false,
    notes: "For allergies and insect bites. Non-drowsy formula recommended."
  },
  {
    id: "health-pain-relief",
    name: "Pain Relievers",
    category: "medication",
    required: false,
    notes: "Ibuprofen and acetaminophen. For headaches, minor injuries."
  },
  {
    id: "health-antibiotics",
    name: "Broad-Spectrum Antibiotics",
    category: "medication",
    required: false,
    notes: "Prescribed by doctor for emergencies. Azithromycin or Ciprofloxacin."
  },
  {
    id: "health-motion-sickness",
    name: "Motion Sickness Medication",
    category: "medication",
    required: false,
    notes: "For small aircraft flights and rough roads. Dramamine or natural ginger."
  },
  {
    id: "health-rehydration",
    name: "Oral Rehydration Salts",
    category: "medication",
    required: false,
    notes: "For dehydration from heat or illness. Pedialyte or WHO formula."
  },
  {
    id: "health-prescriptions",
    name: "Personal Prescriptions (2x Duration)",
    category: "medication",
    required: true,
    notes: "Bring twice your trip duration. Keep in original containers with labels."
  },
  {
    id: "health-insurance",
    name: "Travel Insurance Card",
    category: "preparation",
    required: true,
    notes: "Comprehensive coverage including medical evacuation. Keep card accessible."
  },
  {
    id: "health-medical-records",
    name: "Medical History Summary",
    category: "preparation",
    required: false,
    notes: "List of conditions, medications, allergies, blood type, emergency contacts."
  },
  {
    id: "health-water-purification",
    name: "Water Purification Tablets",
    category: "preparation",
    required: false,
    notes: "Backup for remote areas. Iodine or chlorine-based tablets."
  }
];
