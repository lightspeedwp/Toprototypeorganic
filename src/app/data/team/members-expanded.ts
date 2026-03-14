import type { TeamMember } from "../types";

/**
 * Expanded team members — additional 13 profiles beyond the original 5.
 * Total team: 18 members across 6 roles.
 *
 * Roles: Management, Travel Consultants, Guides, Operations, Marketing & Content, Reservations
 *
 * @module team-members-expanded
 * @category data
 * @wordpressPostType team
 */
export const TEAM_MEMBERS_EXPANDED: TeamMember[] = [
  // ── Management ───────────────────────────────────────────────────────
  {
    id: "team-6",
    slug: "amara-nkosi",
    name: "Amara Nkosi",
    role: "Managing Director",
    bio: "<p>Amara founded LightSpeed Tours in 2008 after a decade managing luxury lodges across Botswana and Namibia. Born and raised in Gaborone, she witnessed firsthand how responsible tourism can transform communities — funding schools, protecting wildlife corridors, and creating dignified employment in remote areas.</p><p>Under her leadership, LightSpeed has grown from a two-person startup into a multi-continent operation serving over 3,000 travellers annually. Amara sits on the board of the African Tourism Association and was named one of Travel + Leisure's \"Women Shaping the Future of Travel\" in 2023.</p>",
    excerpt: "Founder and visionary leader with 20+ years shaping responsible tourism across Africa.",
    featuredImage: "https://images.unsplash.com/photo-1668752741330-8adc5cef7485?w=400",
    email: "amara.nkosi@lightspeedtours.com",
    phone: "+267 700 111222",
    specialties: ["Botswana", "Namibia", "Luxury Safaris", "Conservation Tourism"],
    roleIds: ["role-1"],
  },
  {
    id: "team-7",
    slug: "tom-henriksen",
    name: "Tom Henriksen",
    role: "Finance Director",
    bio: "<p>Tom joined LightSpeed after a career in corporate finance in Johannesburg, drawn by the chance to apply his skills to something he believed in. He oversees budgeting, supplier agreements, and the company's B-Corp certification process — ensuring financial rigour without compromising ethical standards.</p><p>Outside of work, Tom is an enthusiastic trail runner and has completed the Ultra-Trail Cape Town three times. He brings the same endurance mindset to building sustainable business practices.</p>",
    excerpt: "Steering financial strategy and B-Corp certification with precision and purpose.",
    featuredImage: "https://images.unsplash.com/photo-1711637819634-fdc2343b1138?w=400",
    email: "tom.henriksen@lightspeedtours.com",
    phone: "+27 21 555 0130",
    specialties: ["Financial Planning", "Supplier Relations", "Sustainability Reporting"],
    roleIds: ["role-1"],
  },

  // ── Travel Consultants ───────────────────────────────────────────────
  {
    id: "team-8",
    slug: "priya-sharma",
    name: "Priya Sharma",
    role: "Asia Travel Specialist",
    bio: "<p>Priya spent five years living between Thailand, Sri Lanka, and Japan before joining LightSpeed to launch the Asia programme. She holds a degree in Anthropology from Delhi University and approaches every itinerary as a cultural narrative — connecting food, history, and landscapes into a single coherent story.</p><p>Her signature is the \"slow travel\" philosophy: fewer destinations, deeper immersion. Clients regularly tell her that her recommendations led to the most meaningful meals, hikes, and conversations of their lives.</p>",
    excerpt: "Asia specialist crafting slow-travel itineraries across Thailand, Japan, and Sri Lanka.",
    featuredImage: "https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=400",
    email: "priya.sharma@lightspeedtours.com",
    phone: "+91 98765 43210",
    specialties: ["Thailand", "Japan", "Sri Lanka", "Cultural Immersion", "Food Journeys"],
    roleIds: ["role-2"],
  },
  {
    id: "team-9",
    slug: "nikos-papadopoulos",
    name: "Nikos Papadopoulos",
    role: "Europe & Mediterranean Specialist",
    bio: "<p>Born on the island of Crete, Nikos grew up surrounded by olive groves, ancient ruins, and a grandmother who insisted every guest eat until they couldn't move. After studying Tourism Management in Athens and working for boutique hotels across the Greek islands, he joined LightSpeed to build the European portfolio.</p><p>Nikos has a gift for finding the hidden corners that mass tourism overlooks — the family-run taverna on a back street in Santorini, the unmarked hiking trail above Positano, the vineyard in the Douro Valley that only locals know about. His itineraries feel like being shown around by a well-connected friend.</p>",
    excerpt: "Mediterranean native designing authentic European experiences beyond the guidebook.",
    featuredImage: "https://images.unsplash.com/photo-1757690927997-b9872fb49cbf?w=400",
    email: "nikos.papadopoulos@lightspeedtours.com",
    phone: "+30 694 555 1234",
    specialties: ["Greece", "Italy", "Portugal", "Wine & Food", "Island Hopping"],
    roleIds: ["role-2"],
  },
  {
    id: "team-10",
    slug: "fatima-al-rashid",
    name: "Fatima Al-Rashid",
    role: "Adventure & Active Travel Consultant",
    bio: "<p>Fatima is the person clients call when they want to push beyond their comfort zone — responsibly. A qualified mountaineering instructor who has summited Kilimanjaro, Mont Blanc, and Mount Toubkal, she designs itineraries that balance challenge with safety and wonder.</p><p>She joined LightSpeed after five years leading multi-day hiking expeditions across Morocco and Tanzania. Fatima is passionate about making adventure travel accessible to a wider audience, particularly women travelling solo for the first time.</p>",
    excerpt: "Mountaineer and adventure specialist making active travel accessible to all.",
    featuredImage: "https://images.unsplash.com/photo-1508339917912-c0892cfee9d1?w=400",
    email: "fatima.alrashid@lightspeedtours.com",
    phone: "+212 661 555 789",
    specialties: ["Kilimanjaro", "Trekking", "Adventure Travel", "Solo Women Travellers"],
    roleIds: ["role-2"],
  },

  // ── Guides ───────────────────────────────────────────────────────────
  {
    id: "team-11",
    slug: "sipho-dlamini",
    name: "Sipho Dlamini",
    role: "Senior Safari Guide — Southern Africa",
    bio: "<p>Sipho holds the coveted FGASA Level 3 qualification — the highest guiding credential in Southern Africa — and has spent 18 years in the Greater Kruger ecosystem. He can identify over 400 bird species by call alone and has a near-mythical reputation for finding wild dogs when nobody else can.</p><p>Beyond his tracking skills, Sipho is a gifted storyteller who weaves Zulu folklore, ecological science, and personal anecdote into every game drive. Guests often describe his drives as the highlight of their entire African journey.</p>",
    excerpt: "FGASA Level 3 guide with 18 years in Greater Kruger — the wild dog whisperer.",
    featuredImage: "https://images.unsplash.com/photo-1674469773458-6a2dd73e77e6?w=400",
    email: "sipho.dlamini@lightspeedtours.com",
    phone: "+27 82 555 6789",
    specialties: ["Greater Kruger", "Birding", "Wild Dogs", "Walking Safaris", "South Africa"],
    roleIds: ["role-3"],
  },
  {
    id: "team-12",
    slug: "grace-mwangi",
    name: "Grace Mwangi",
    role: "Safari Guide — East Africa",
    bio: "<p>Grace grew up on the edge of the Masai Mara, where her father was a community conservancy ranger. She studied Wildlife Biology at the University of Nairobi and became one of Kenya's first female silver-level safari guides. Her knowledge of predator behaviour is exceptional — she has tracked the Mara's lion prides for over a decade.</p><p>Grace is also deeply involved in community education, running bush-skills workshops for local youth and mentoring the next generation of female guides in the Mara ecosystem.</p>",
    excerpt: "Pioneering female guide tracking Mara lion prides and mentoring the next generation.",
    featuredImage: "https://images.unsplash.com/flagged/photo-1562549181-3dc6b09065f6?w=400",
    email: "grace.mwangi@lightspeedtours.com",
    phone: "+254 712 555 432",
    specialties: ["Masai Mara", "Big Cats", "Wildlife Biology", "Community Conservation"],
    roleIds: ["role-3"],
  },
  {
    id: "team-13",
    slug: "carlos-mendoza",
    name: "Carlos Mendoza",
    role: "Cultural Guide — Europe & Mediterranean",
    bio: "<p>Carlos holds a PhD in Mediterranean Archaeology from the University of Barcelona and spent eight years lecturing before realising he'd rather share history on location than in a classroom. He guides LightSpeed's cultural journeys across Portugal, Greece, and Italy — bringing ancient sites to life with a narrative style that clients call \"better than any documentary.\"</p><p>He's equally at home discussing Minoan civilisation at Knossos, navigating Lisbon's Alfama district, or explaining why the pasta in Bologna tastes different from anywhere else in Italy.</p>",
    excerpt: "Archaeologist turned cultural guide bringing Mediterranean history to vivid life.",
    featuredImage: "https://images.unsplash.com/photo-1564541558234-ef406c118d0c?w=400",
    email: "carlos.mendoza@lightspeedtours.com",
    phone: "+34 612 555 890",
    specialties: ["Greece", "Portugal", "Italy", "Archaeology", "Cultural History"],
    roleIds: ["role-3"],
  },

  // ── Operations ───────────────────────────────────────────────────────
  {
    id: "team-14",
    slug: "yuki-tanaka",
    name: "Yuki Tanaka",
    role: "Asia Operations Manager",
    bio: "<p>Yuki manages all on-the-ground logistics for LightSpeed's Asia programmes from her base in Chiang Mai. Having lived in Thailand for 12 years, she has built an extraordinary network of local partners — from ryokan owners in Kyoto to tuk-tuk drivers in Colombo who know every shortcut.</p><p>Her operational philosophy is simple: every transfer, every meal, every check-in should feel effortless to the guest, no matter how complex the behind-the-scenes coordination. She's the reason LightSpeed's Asia trips run like clockwork.</p>",
    excerpt: "Asia logistics expert ensuring every detail runs seamlessly from Chiang Mai to Kyoto.",
    featuredImage: "https://images.unsplash.com/photo-1686737357914-80a665ca1c29?w=400",
    email: "yuki.tanaka@lightspeedtours.com",
    phone: "+66 82 555 4321",
    specialties: ["Thailand", "Japan", "Sri Lanka", "Logistics", "Supplier Relations"],
    roleIds: ["role-4"],
  },

  // ── Marketing & Content ──────────────────────────────────────────────
  {
    id: "team-15",
    slug: "olivia-van-der-berg",
    name: "Olivia van der Berg",
    role: "Head of Marketing & Content",
    bio: "<p>Olivia is a former travel journalist who spent a decade writing for Conde Nast Traveller and National Geographic Traveler before joining LightSpeed. She oversees all brand storytelling, from the website and social media to the in-trip journals that guests receive as keepsakes.</p><p>Her background means she approaches marketing as editorial craft rather than sales — every piece of content aims to inform and inspire first, sell second. She also manages LightSpeed's photography partnerships and leads the annual photo safari departure.</p>",
    excerpt: "Former travel journalist crafting brand stories that inform and inspire first.",
    featuredImage: "https://images.unsplash.com/photo-1596566263618-46778ebc6121?w=400",
    email: "olivia.vanderberg@lightspeedtours.com",
    phone: "+27 21 555 0135",
    specialties: ["Content Strategy", "Travel Writing", "Photography", "Brand Storytelling"],
    roleIds: ["role-5"],
  },
  {
    id: "team-16",
    slug: "kwame-asante",
    name: "Kwame Asante",
    role: "Digital Marketing Specialist",
    bio: "<p>Kwame joined LightSpeed straight from the University of Ghana's new Digital Media programme, bringing a fresh perspective to the team's online presence. He manages SEO, email campaigns, and social media — growing the company's Instagram following by 300% in his first year through authentic storytelling rather than paid promotion.</p><p>A self-taught photographer with a sharp eye for composition, Kwame frequently joins departures to create content. His drone footage of the Okavango Delta has become some of LightSpeed's most-shared material.</p>",
    excerpt: "Digital storyteller growing our audience through authentic content and drone photography.",
    featuredImage: "https://images.unsplash.com/photo-1706025090996-63717544be2d?w=400",
    email: "kwame.asante@lightspeedtours.com",
    phone: "+233 24 555 6789",
    specialties: ["Digital Marketing", "Social Media", "Drone Photography", "SEO"],
    roleIds: ["role-5"],
  },

  // ── Reservations ─────────────────────────────────────────────────────
  {
    id: "team-17",
    slug: "lucia-ferreira",
    name: "Lucia Ferreira",
    role: "Head of Reservations",
    bio: "<p>Lucia is the calm centre of LightSpeed's booking engine. With 14 years of experience in luxury travel reservations — including stints at &Beyond and Wilderness Safaris — she knows every lodge, camp, and boutique hotel in the portfolio inside out. She negotiates rates, manages allotments, and ensures every booking confirmation is bulletproof.</p><p>Her superpower is solving the unsolvable: finding a room at a fully booked lodge, rearranging an itinerary around a cancelled flight, or coordinating a surprise anniversary dinner at a remote bush camp with 48 hours' notice.</p>",
    excerpt: "Reservations veteran who turns impossible requests into confirmed bookings.",
    featuredImage: "https://images.unsplash.com/photo-1750175676518-41b83c741d1a?w=400",
    email: "lucia.ferreira@lightspeedtours.com",
    phone: "+27 21 555 0140",
    specialties: ["Lodge Bookings", "Rate Negotiation", "Itinerary Management", "VIP Requests"],
    roleIds: ["role-6"],
  },
  {
    id: "team-18",
    slug: "lin-chen",
    name: "Lin Chen",
    role: "Reservations Coordinator — Asia & Europe",
    bio: "<p>Lin handles all booking coordination for LightSpeed's Asia and Europe programmes. Fluent in Mandarin, English, and Thai, she navigates the complexities of multi-country itineraries with quiet efficiency — juggling different time zones, booking systems, and cultural expectations.</p><p>Before joining LightSpeed, Lin managed reservations for a luxury hotel group in Singapore. She brings that five-star hospitality mindset to every interaction, treating each booking as an opportunity to exceed expectations rather than simply process a transaction.</p>",
    excerpt: "Multilingual coordinator ensuring flawless bookings across Asia and Europe.",
    featuredImage: "https://images.unsplash.com/photo-1746903399197-32161078fc58?w=400",
    email: "lin.chen@lightspeedtours.com",
    phone: "+65 9123 4567",
    specialties: ["Asia Bookings", "Europe Bookings", "Multi-Country Logistics", "Mandarin", "Thai"],
    roleIds: ["role-6"],
  },
];
