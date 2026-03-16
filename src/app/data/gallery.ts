/**
 * Mock data for Gallery Archive page.
 *
 * Provides curated gallery albums and individual photos
 * organized by destination and theme.
 *
 * @module data/gallery
 * @category data
 */

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  photographer: string;
  location: string;
  category: string;
  featured?: boolean;
}

export interface GalleryAlbum {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  photoCount: number;
  category: string;
}

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "wildlife", label: "Wildlife" },
  { id: "landscapes", label: "Landscapes" },
  { id: "culture", label: "Culture & People" },
  { id: "accommodation", label: "Lodges & Camps" },
  { id: "adventure", label: "Adventure" },
  { id: "conservation", label: "Conservation" },
];

export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: "album-1",
    slug: "serengeti-migration",
    title: "The Great Migration",
    description: "Witness millions of wildebeest crossing the Serengeti plains in one of nature's greatest spectacles.",
    coverImage: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=800&q=80",
    photoCount: 24,
    category: "wildlife",
  },
  {
    id: "album-2",
    slug: "okavango-delta",
    title: "Okavango Delta Waterways",
    description: "Glide through crystal-clear channels of the world's largest inland delta in Botswana.",
    coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    photoCount: 18,
    category: "landscapes",
  },
  {
    id: "album-3",
    slug: "maasai-culture",
    title: "Maasai Heritage",
    description: "Intimate portraits and ceremonies from East Africa's most iconic pastoralist communities.",
    coverImage: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80",
    photoCount: 16,
    category: "culture",
  },
  {
    id: "album-4",
    slug: "luxury-lodges",
    title: "Luxury Safari Lodges",
    description: "Step inside the finest bush lodges and tented camps across Africa, Asia, and Europe.",
    coverImage: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    photoCount: 20,
    category: "accommodation",
  },
  {
    id: "album-5",
    slug: "mountain-gorillas",
    title: "Mountain Gorillas of Rwanda",
    description: "Face-to-face encounters with endangered mountain gorillas in the Virunga Mountains.",
    coverImage: "https://images.unsplash.com/photo-1580674287404-cb0baea48607?w=800&q=80",
    photoCount: 14,
    category: "wildlife",
  },
  {
    id: "album-6",
    slug: "victoria-falls",
    title: "Victoria Falls & Beyond",
    description: "The thundering curtain of water and the adventure playground that surrounds it.",
    coverImage: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80",
    photoCount: 22,
    category: "adventure",
  },
  {
    id: "album-7",
    slug: "conservation-stories",
    title: "Conservation in Action",
    description: "Behind the scenes of anti-poaching units, wildlife rehabilitation, and community projects.",
    coverImage: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80",
    photoCount: 12,
    category: "conservation",
  },
  {
    id: "album-8",
    slug: "namibia-deserts",
    title: "Namibia's Desert Landscapes",
    description: "The surreal dunes of Sossusvlei and the Skeleton Coast's haunting beauty.",
    coverImage: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=800&q=80",
    photoCount: 19,
    category: "landscapes",
  },
  {
    id: "album-9",
    slug: "bali-temples",
    title: "Bali Temple Trail",
    description: "Ancient temples rising from jungle canopies in the heart of Indonesia.",
    coverImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    photoCount: 15,
    category: "culture",
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "photo-1",
    src: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=600&q=80",
    alt: "Wildebeest crossing the Mara River during the Great Migration",
    caption: "The Great Crossing at Mara River",
    photographer: "James Mwangi",
    location: "Serengeti, Tanzania",
    category: "wildlife",
    featured: true,
  },
  {
    id: "photo-2",
    src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80",
    alt: "Aerial view of the Okavango Delta waterways",
    caption: "Jewel of Botswana",
    photographer: "Sarah van der Berg",
    location: "Okavango Delta, Botswana",
    category: "landscapes",
    featured: true,
  },
  {
    id: "photo-3",
    src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80",
    alt: "Maasai warriors performing a traditional jumping dance",
    caption: "Adumu Jumping Ceremony",
    photographer: "David Kimathi",
    location: "Maasai Mara, Kenya",
    category: "culture",
  },
  {
    id: "photo-4",
    src: "https://images.unsplash.com/photo-1580674287404-cb0baea48607?w=600&q=80",
    alt: "Silverback mountain gorilla in dense bamboo forest",
    caption: "The Silverback Guardian",
    photographer: "Claire Uwimana",
    location: "Volcanoes NP, Rwanda",
    category: "wildlife",
    featured: true,
  },
  {
    id: "photo-5",
    src: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=600&q=80",
    alt: "Red sand dunes of Sossusvlei at sunrise",
    caption: "Dawn over Dune 45",
    photographer: "Hans Muller",
    location: "Sossusvlei, Namibia",
    category: "landscapes",
  },
  {
    id: "photo-6",
    src: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&q=80",
    alt: "Ranger monitoring rhino in the bush",
    caption: "Eyes on the Rhino",
    photographer: "Thabo Mabaso",
    location: "Kruger NP, South Africa",
    category: "conservation",
  },
  {
    id: "photo-7",
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    alt: "Luxury tented suite overlooking the savanna",
    caption: "Bush Luxury Redefined",
    photographer: "Emma Richardson",
    location: "Masai Mara, Kenya",
    category: "accommodation",
  },
  {
    id: "photo-8",
    src: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=600&q=80",
    alt: "Victoria Falls rainbow mist rising above the gorge",
    caption: "The Smoke That Thunders",
    photographer: "Robert Ncube",
    location: "Victoria Falls, Zimbabwe",
    category: "adventure",
  },
  {
    id: "photo-9",
    src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    alt: "Ancient Balinese temple surrounded by jungle",
    caption: "Temple of the Forest",
    photographer: "Made Suartana",
    location: "Ubud, Bali",
    category: "culture",
  },
  {
    id: "photo-10",
    src: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=600&q=80",
    alt: "Elephant family walking through golden grass at sunset",
    caption: "Family Bonds",
    photographer: "James Mwangi",
    location: "Amboseli, Kenya",
    category: "wildlife",
    featured: true,
  },
  {
    id: "photo-11",
    src: "https://images.unsplash.com/photo-1504600770771-fb03a7f2c5b5?w=600&q=80",
    alt: "Hot air balloon floating over Serengeti plains at dawn",
    caption: "Above the Plains",
    photographer: "Sarah van der Berg",
    location: "Serengeti, Tanzania",
    category: "adventure",
  },
  {
    id: "photo-12",
    src: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&q=80",
    alt: "Leopard resting on a tree branch in dappled sunlight",
    caption: "The Elusive Hunter",
    photographer: "Claire Uwimana",
    location: "South Luangwa, Zambia",
    category: "wildlife",
  },
];
