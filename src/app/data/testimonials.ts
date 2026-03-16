/**
 * Mock data for Testimonials page.
 *
 * Curated traveller testimonials with photos, ratings,
 * and trip details for social proof.
 *
 * @module data/testimonials
 * @category data
 */

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  tour: string;
  tourSlug: string;
  date: string;
  quote: string;
  highlight: string;
  featured?: boolean;
}

export interface TestimonialStat {
  label: string;
  value: string;
  description: string;
}

export const TESTIMONIAL_STATS: TestimonialStat[] = [
  { label: "Traveller Rating", value: "4.9/5", description: "Average across 2,400+ reviews" },
  { label: "Would Recommend", value: "98%", description: "Of travellers recommend us to friends" },
  { label: "Return Travellers", value: "67%", description: "Book a second trip within 2 years" },
  { label: "Years of Excellence", value: "15+", description: "Crafting unforgettable journeys" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah & Michael Thompson",
    location: "London, United Kingdom",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    tour: "Serengeti & Zanzibar Explorer",
    tourSlug: "serengeti-zanzibar-explorer",
    date: "November 2025",
    quote: "From the moment we landed in Tanzania, everything was seamless. Our guide, Joseph, had an uncanny ability to find wildlife — we saw the Big Five in just three days. The transition from the bush to Zanzibar's beaches was the perfect contrast. This trip changed how we see the world.",
    highlight: "Witnessing a leopard hunt at sunset",
    featured: true,
  },
  {
    id: "test-2",
    name: "David Chen",
    location: "Vancouver, Canada",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    tour: "Gorilla Trekking Rwanda",
    tourSlug: "gorilla-trekking-rwanda",
    date: "September 2025",
    quote: "Sitting three metres from a silverback mountain gorilla with his family around him was the most profound wildlife experience of my life. The guides were incredibly knowledgeable about conservation efforts, and I felt I was contributing to something meaningful.",
    highlight: "One hour with the gorilla family",
    featured: true,
  },
  {
    id: "test-3",
    name: "Emma & Jack Williams",
    location: "Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    tour: "Cape Town to Kruger",
    tourSlug: "cape-town-to-kruger",
    date: "January 2026",
    quote: "We've done safaris with other companies before, but LightSpeed operates on another level. The accommodation choices were extraordinary — each lodge had its own character. The attention to detail in every transfer, meal, and game drive was impeccable.",
    highlight: "Sunrise game drive spotting a cheetah with cubs",
    featured: true,
  },
  {
    id: "test-4",
    name: "Dr. Amara Osei",
    location: "Accra, Ghana",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
    rating: 5,
    tour: "Okavango Delta & Victoria Falls",
    tourSlug: "okavango-delta-victoria-falls",
    date: "August 2025",
    quote: "As an African traveller exploring my own continent, I wanted an experience that went beyond the typical tourist trail. LightSpeed delivered exactly that — mokoro rides through pristine channels, walking safaris led by local Batswana guides, and a genuine connection to the land.",
    highlight: "Mokoro sunset in the delta",
  },
  {
    id: "test-5",
    name: "Henrik & Ingrid Larsson",
    location: "Stockholm, Sweden",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 4,
    tour: "Namibia Desert Explorer",
    tourSlug: "namibia-desert-explorer",
    date: "March 2025",
    quote: "The Namibian landscapes are otherworldly — climbing Dune 45 at dawn was breathtaking. Our guide knew every hidden gem along the Skeleton Coast. The only reason for 4 stars is we wished it was longer! Already planning our return trip.",
    highlight: "Stargazing in the NamibRand Reserve",
  },
  {
    id: "test-6",
    name: "Maria Santos",
    location: "Lisbon, Portugal",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
    rating: 5,
    tour: "Bali Cultural Immersion",
    tourSlug: "bali-cultural-immersion",
    date: "October 2025",
    quote: "I chose this tour for its focus on cultural depth rather than beach resorts, and it exceeded every expectation. The temple ceremonies, rice terrace treks, and cooking classes gave me genuine insight into Balinese life. The boutique accommodations were stunning.",
    highlight: "Private ceremony at a family temple",
  },
  {
    id: "test-7",
    name: "James & Patricia O'Brien",
    location: "Dublin, Ireland",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    rating: 5,
    tour: "Kenya Family Safari",
    tourSlug: "kenya-family-safari",
    date: "December 2025",
    quote: "Travelling with three kids (ages 8, 11, 14) can be daunting, but LightSpeed made it effortless. The family-friendly lodges had activities for every age, and our guide made the game drives educational and thrilling. Our kids still talk about the baby elephants daily.",
    highlight: "Watching our kids befriend Maasai children",
    featured: true,
  },
  {
    id: "test-8",
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    rating: 5,
    tour: "Tuscany Wine & Heritage Trail",
    tourSlug: "tuscany-wine-heritage",
    date: "May 2025",
    quote: "The Tuscan countryside exceeded my dreams. Each vineyard visit was thoughtfully arranged — not tourist traps, but genuine family estates. The medieval hilltop villages at golden hour were perfect for photography. An elegant, unhurried journey.",
    highlight: "Private wine tasting at a 400-year-old estate",
  },
];
