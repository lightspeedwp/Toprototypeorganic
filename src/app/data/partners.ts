/**
 * Mock data for Partners page.
 *
 * Conservation partners, lodge partners, and industry affiliations.
 *
 * @module data/partners
 * @category data
 */

export interface Partner {
  id: string;
  name: string;
  slug: string;
  category: PartnerCategory;
  description: string;
  logo: string;
  website: string;
  region: string;
  established: string;
  highlight: string;
  featured?: boolean;
}

export type PartnerCategory =
  | "conservation"
  | "lodge"
  | "tourism-board"
  | "community"
  | "industry";

export const PARTNER_CATEGORIES: { id: PartnerCategory | "all"; label: string }[] = [
  { id: "all", label: "All Partners" },
  { id: "conservation", label: "Conservation" },
  { id: "lodge", label: "Lodge Partners" },
  { id: "tourism-board", label: "Tourism Boards" },
  { id: "community", label: "Community" },
  { id: "industry", label: "Industry" },
];

export const PARTNERS: Partner[] = [
  {
    id: "partner-1",
    name: "African Wildlife Foundation",
    slug: "african-wildlife-foundation",
    category: "conservation",
    description: "Working to ensure wildlife and wild lands thrive across Africa through conservation research, education, and sustainable development.",
    logo: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=200&q=80",
    website: "https://awf.org",
    region: "Pan-African",
    established: "1961",
    highlight: "Helped protect over 65 million acres of conservation land",
    featured: true,
  },
  {
    id: "partner-2",
    name: "Singita Lodges",
    slug: "singita-lodges",
    category: "lodge",
    description: "Award-winning luxury lodges across Tanzania, Rwanda, South Africa, and Zimbabwe, setting the global standard for sustainable luxury tourism.",
    logo: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&q=80",
    website: "https://singita.com",
    region: "Southern & East Africa",
    established: "1993",
    highlight: "Pioneer of the luxury conservation model",
    featured: true,
  },
  {
    id: "partner-3",
    name: "Tanzania National Parks",
    slug: "tanapa",
    category: "tourism-board",
    description: "The official body managing Tanzania's 22 national parks, including the Serengeti, Kilimanjaro, and Tarangire.",
    logo: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=200&q=80",
    website: "https://tanzaniaparks.go.tz",
    region: "Tanzania",
    established: "1959",
    highlight: "Custodians of the Serengeti ecosystem",
  },
  {
    id: "partner-4",
    name: "Rhino Conservation Botswana",
    slug: "rhino-conservation-botswana",
    category: "conservation",
    description: "Dedicated to protecting Botswana's rhino population through monitoring, anti-poaching patrols, and community outreach programmes.",
    logo: "https://images.unsplash.com/photo-1504600770771-fb03a7f2c5b5?w=200&q=80",
    website: "https://rhinoconservationbotswana.com",
    region: "Botswana",
    established: "2003",
    highlight: "Reintroduced rhinos to the Okavango Delta",
  },
  {
    id: "partner-5",
    name: "andBeyond",
    slug: "and-beyond",
    category: "lodge",
    description: "Responsible luxury safari company operating across 15 African countries with a philosophy of Care of the Land, Wildlife, and People.",
    logo: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=200&q=80",
    website: "https://andbeyond.com",
    region: "Pan-African & Asia",
    established: "1991",
    highlight: "Community impact reaching 78,000+ people",
    featured: true,
  },
  {
    id: "partner-6",
    name: "Maasai Heritage Trust",
    slug: "maasai-heritage-trust",
    category: "community",
    description: "Empowering Maasai communities through education, healthcare, and culturally sensitive tourism that preserves traditional knowledge.",
    logo: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=200&q=80",
    website: "#",
    region: "Kenya & Tanzania",
    established: "2008",
    highlight: "18 community schools built and supported",
  },
  {
    id: "partner-7",
    name: "South African Tourism",
    slug: "south-african-tourism",
    category: "tourism-board",
    description: "The official marketing organisation for South African tourism, promoting the country as a premier destination worldwide.",
    logo: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=200&q=80",
    website: "https://southafrica.net",
    region: "South Africa",
    established: "1996",
    highlight: "Supporting responsible tourism growth",
  },
  {
    id: "partner-8",
    name: "ATTA",
    slug: "atta",
    category: "industry",
    description: "The Africa Travel & Tourism Association connects travel professionals and promotes Africa as a sustainable tourism destination.",
    logo: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=200&q=80",
    website: "https://atta.travel",
    region: "Pan-African",
    established: "1996",
    highlight: "Network of 750+ quality-assured members",
  },
  {
    id: "partner-9",
    name: "Green Globe Certification",
    slug: "green-globe",
    category: "industry",
    description: "International certification body for sustainable tourism, verifying the environmental and social responsibility of travel businesses.",
    logo: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&q=80",
    website: "https://greenglobe.com",
    region: "Global",
    established: "1993",
    highlight: "Gold-standard sustainability verification",
  },
];
