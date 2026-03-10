import type { TeamMember } from "../types";

/**
 * Mock data for team members and specialists.
 */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    slug: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Senior Travel Consultant",
    bio: "<p>Sarah grew up in Cape Town and spent every holiday exploring South Africa's national parks. After completing her degree in Tourism Management, she spent five years guiding overland tours across Southern Africa. Her deep love for the bush and extensive first-hand knowledge make her an invaluable resource for planning complex itineraries.</p><p>Sarah specializes in family safaris and multi-generational travel, drawing on her own experiences traveling with her two children.</p>",
    excerpt: "Over 15 years crafting family safaris and luxury escapes across Southern Africa.",
    featuredImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    email: "sarah.mitchell@lightspeedtours.com",
    phone: "+1 555-0123",
    specialties: ["South Africa", "Family Travel", "Luxury Lodges"],
    roleIds: ["role-2"],
  },
  {
    id: "team-2",
    slug: "david-khumalo",
    name: "David Khumalo",
    role: "Head of Operations",
    bio: "<p>Originally from Zimbabwe, David started his career as a professional guide in Hwange National Park. His passion for wildlife and conservation led him to manage luxury camps in Botswana before joining LightSpeed Tours. David ensures every logistical detail of your trip is flawless.</p><p>He is also our sustainability lead, working closely with our partners to ensure our tours have a positive impact on local communities and ecosystems.</p>",
    excerpt: "Former professional guide turned operations expert with a focus on seamless logistics.",
    featuredImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    email: "david.khumalo@lightspeedtours.com",
    phone: "+1 555-0124",
    specialties: ["Botswana", "Zimbabwe", "Logistics", "Sustainability"],
    roleIds: ["role-1", "role-4"],
  },
  {
    id: "team-3",
    slug: "zared-rogers",
    name: "Zared Rogers",
    role: "East Africa Specialist",
    bio: "<p>Zared fell in love with East Africa during a gap year volunteering in Tanzania and never looked back. He has climbed Kilimanjaro three times and tracked gorillas in both Uganda and Rwanda. His enthusiasm for the region is infectious, and he excels at designing active and adventurous itineraries.</p><p>Zared is also a keen photographer and leads our specialized photography safaris.</p>",
    excerpt: "Adventure enthusiast and photography expert specializing in Tanzania and Kenya.",
    featuredImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    email: "zared.rogers@lightspeedtours.com",
    phone: "+1 555-0125",
    specialties: ["Tanzania", "Kenya", "Gorilla Trekking", "Photography"],
    roleIds: ["role-2"],
  },
  {
    id: "team-4",
    slug: "elena-rossi",
    name: "Elena Rossi",
    role: "Luxury Travel Concierge",
    bio: "<p>With a background in high-end hospitality in Europe, Elena brings a meticulous eye for detail to our luxury offerings. She has personally vetted our entire portfolio of premier lodges and hotels. Elena specializes in honeymoons and exclusive private villa rentals.</p><p>She believes that true luxury lies in personalized service and unique, money-can't-buy experiences.</p>",
    excerpt: "Creating bespoke luxury itineraries and exclusive experiences for discerning travelers.",
    featuredImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    email: "elena.rossi@lightspeedtours.com",
    phone: "+1 555-0126",
    specialties: ["Honeymoons", "Private Villas", "Luxury Islands", "Namibia"],
    roleIds: ["role-2"],
  },
  {
    id: "team-5",
    slug: "james-okello",
    name: "James Okello",
    role: "Safari Guide & Team Leader",
    bio: "<p>James is a legend in the Masai Mara, known for his incredible ability to spot leopards and anticipate animal behavior. With over 20 years of guiding experience, he now mentors our junior guides and leads our most exclusive group departures.</p><p>His storytelling around the campfire is legendary, bringing the history and folklore of the savannah to life.</p>",
    excerpt: "Award-winning guide with 20 years of experience in the Masai Mara and Serengeti.",
    featuredImage: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400",
    email: "james.okello@lightspeedtours.com",
    phone: "+254 700 123456",
    specialties: ["Wildlife Guiding", "Big Cats", "Birding", "Kenya"],
    roleIds: ["role-3"],
  },
];

/**
 * Get team member by slug.
 */
export function getTeamMember(slug: string): TeamMember | undefined {
  return TEAM_MEMBERS.find(m => m.slug === slug);
}
