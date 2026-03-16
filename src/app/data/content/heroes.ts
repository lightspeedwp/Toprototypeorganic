/**
 * Centralized Hero Content data.
 *
 * Each page template pulls its hero section data from this collection
 * instead of hardcoding text in the component. This mirrors how WordPress
 * would store hero content in block patterns or custom fields.
 *
 * Every hero entry can optionally include:
 *  - badge   → icon-chip rendered above the title
 *  - CTAs    → primary and/or secondary buttons (omit to hide)
 *  - showScrollIndicator → bouncing arrow at the bottom
 *
 * @module content-heroes
 * @category data/content
 */

import type { HeroContent } from "../types";

/**
 * Hero section data for all page templates.
 * Keyed by `context` — pages look up their hero via getHeroContent(context).
 */
export const HERO_CONTENT: HeroContent[] = [
  /* ============================================================
     HOME
     ============================================================ */
  {
    id: "hero-home",
    context: "home",
    badge: { icon: "Compass", label: "Handcrafted Journeys" },
    title: "Discover your next adventure",
    description:
      "Unforgettable tours across the world's most breathtaking destinations. From rugged mountains to pristine coastlines, we craft journeys that inspire.",
    image:
      "https://images.unsplash.com/photo-1761364622323-833282bb4aef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Explore tours",
    primaryCTAHref: "/tours",
    secondaryCTALabel: "View destinations",
    secondaryCTAHref: "/destinations",
    height: "large",
    overlay: "medium",
    showScrollIndicator: true,
  },

  /* ============================================================
     TOURS
     ============================================================ */
  {
    id: "hero-tours",
    context: "tours-archive",
    badge: { icon: "Binoculars", label: "Safari Collection" },
    title: "Extraordinary African safaris",
    description:
      "From the Serengeti plains to Cape Town's coastline, discover handcrafted safari experiences led by expert guides who know Africa inside out.",
    image:
      "https://images.unsplash.com/photo-1761076736889-8856b226ab60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Browse all tours",
    primaryCTAHref: "/tours",
    height: "medium",
    overlay: "medium",
    showScrollIndicator: true,
  },

  /* ============================================================
     DESTINATIONS
     ============================================================ */
  {
    id: "hero-destinations",
    context: "destinations-archive",
    badge: { icon: "MapPin", label: "Explore Africa" },
    title: "Explore Africa's finest destinations",
    description:
      "From sun-drenched savannas to lush river deltas, each destination offers unique wildlife encounters, cultures, and landscapes waiting to be explored.",
    image:
      "https://images.unsplash.com/photo-1772289935190-c5cacb1cec12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "View destinations",
    primaryCTAHref: "/destinations",
    height: "medium",
    overlay: "medium",
    showScrollIndicator: true,
  },

  /* ============================================================
     ACCOMMODATION
     ============================================================ */
  {
    id: "hero-accommodation",
    context: "accommodation-archive",
    badge: { icon: "Bed", label: "Lodges & Camps" },
    title: "Exceptional safari lodges & camps",
    description:
      "Stay in handpicked lodges, luxury tented camps, and boutique hotels that make your African safari an unforgettable experience.",
    image:
      "https://images.unsplash.com/photo-1718811662128-3bd32ccb068f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Explore accommodation",
    primaryCTAHref: "/accommodation",
    height: "medium",
    overlay: "medium",
    showScrollIndicator: true,
  },

  /* ============================================================
     BLOG
     ============================================================ */
  {
    id: "hero-blog",
    context: "blog-archive",
    badge: { icon: "BookOpen", label: "Safari Journal" },
    title: "Safari stories & travel inspiration",
    description:
      "Expert insights, destination guides, and traveler stories from across Africa. Get inspired for your next safari adventure.",
    image:
      "https://images.unsplash.com/photo-1584535508174-a20c98bc9a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Read latest posts",
    primaryCTAHref: "/blog",
    height: "medium",
    overlay: "medium",
  },

  /* ============================================================
     TEAM
     ============================================================ */
  {
    id: "hero-team",
    context: "team-archive",
    badge: { icon: "Users", label: "Our Specialists" },
    title: "Meet our safari specialists",
    description:
      "Passionate travel experts with decades of combined African experience. Our team lives and breathes safari, ensuring every trip exceeds expectations.",
    image:
      "https://images.unsplash.com/photo-1726091985316-e3dc508937c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Meet the team",
    primaryCTAHref: "/team",
    height: "medium",
    overlay: "medium",
  },

  /* ============================================================
     SPECIALS
     ============================================================ */
  {
    id: "hero-specials",
    context: "specials-archive",
    badge: { icon: "Percent", label: "Limited Offers" },
    title: "Exclusive safari deals & offers",
    description:
      "Limited-time promotions on our most popular safari experiences. Book now and save on your African adventure of a lifetime.",
    image:
      "https://images.unsplash.com/photo-1636874751251-77c09a685fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "View all specials",
    primaryCTAHref: "/specials",
    height: "medium",
    overlay: "medium",
  },

  /* ============================================================
     REVIEWS
     ============================================================ */
  {
    id: "hero-reviews",
    context: "reviews-archive",
    badge: { icon: "Star", label: "Traveler Stories" },
    title: "What our travelers say",
    description:
      "Real stories from real travelers. Read verified reviews from guests who have experienced our African safari adventures firsthand.",
    image:
      "https://images.unsplash.com/flagged/photo-1557828823-b5bb7f45d726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Read reviews",
    primaryCTAHref: "/reviews",
    height: "medium",
    overlay: "medium",
  },

  /* ============================================================
     REVIEWS HUB
     ============================================================ */
  {
    id: "hero-reviews-hub",
    context: "reviews-hub",
    badge: { icon: "Star", label: "Verified Reviews" },
    title: "Trusted by thousands of travelers",
    description:
      "Browse verified reviews, ratings, and testimonials from safari guests around the world.",
    image:
      "https://images.unsplash.com/flagged/photo-1557828823-b5bb7f45d726?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Read all reviews",
    primaryCTAHref: "/reviews",
    height: "medium",
    overlay: "medium",
  },

  /* ============================================================
     ABOUT
     ============================================================ */
  {
    id: "hero-about",
    context: "about",
    badge: { icon: "Heart", label: "Our Story" },
    title: "Crafting legends since 2010",
    description:
      "A deep-rooted commitment to conservation, community, and the raw beauty of the African wilderness. Discover our story, our values, and why thousands of travelers trust us.",
    image:
      "https://images.unsplash.com/photo-1710115528585-fd3f176268c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "View our team",
    primaryCTAHref: "/team",
    secondaryCTALabel: "Contact us",
    secondaryCTAHref: "/contact",
    height: "medium",
    overlay: "medium",
  },

  /* ============================================================
     CONTACT
     ============================================================ */
  {
    id: "hero-contact",
    context: "contact",
    badge: { icon: "MessageCircle", label: "Get In Touch" },
    title: "Let's plan your adventure",
    description:
      "Ready to plan your African adventure? Our friendly team is here to help you every step of the way. Reach out today.",
    image:
      "https://images.unsplash.com/photo-1770843093638-1941ee5cbc64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Send a message",
    primaryCTAHref: "/contact",
    height: "small",
    overlay: "medium",
  },

  /* ============================================================
     FAQ
     ============================================================ */
  {
    id: "hero-faq",
    context: "faq",
    badge: { icon: "CircleHelp", label: "Help Centre" },
    title: "Frequently asked questions",
    description:
      "Everything you need to know about planning your African safari. Can't find your answer? Contact our team directly.",
    image:
      "https://images.unsplash.com/photo-1692690135466-cecd5d5c608c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Contact us",
    primaryCTAHref: "/contact",
    height: "small",
    overlay: "medium",
  },

  /* ============================================================
     FAQs ARCHIVE
     ============================================================ */
  {
    id: "hero-faqs-archive",
    context: "faqs-archive",
    badge: { icon: "CircleHelp", label: "Knowledge Base" },
    title: "Safari travel FAQs",
    description:
      "Browse our comprehensive FAQ library covering bookings, destinations, health & safety, and more.",
    image:
      "https://images.unsplash.com/photo-1692690135466-cecd5d5c608c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Contact support",
    primaryCTAHref: "/contact",
    height: "small",
    overlay: "medium",
  },

  /* ============================================================
     WHY BOOK WITH US
     ============================================================ */
  {
    id: "hero-why-book",
    context: "why-book-with-us",
    badge: { icon: "Award", label: "Why Choose Us" },
    title: "Why book with LightSpeed Tours",
    description:
      "Decades of expertise, handpicked experiences, and a commitment to sustainable tourism. Here's why thousands of travelers choose us.",
    image:
      "https://images.unsplash.com/photo-1759129669520-b285523c4901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Start planning",
    primaryCTAHref: "/tours",
    secondaryCTALabel: "Contact us",
    secondaryCTAHref: "/contact",
    height: "medium",
    overlay: "medium",
  },

  /* ============================================================
     QUOTE REQUEST
     ============================================================ */
  {
    id: "hero-quote-request",
    context: "quote-request",
    badge: { icon: "Send", label: "Free Quote" },
    title: "Tailor your safari journey",
    description:
      "Receive a personalized, obligation-free itinerary and comprehensive quote within 24 business hours.",
    image:
      "https://images.unsplash.com/photo-1760512559343-aa2ec0abf85c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "medium",
    overlay: "medium",
  },

  /* ============================================================
     QUOTE REQUEST — SUCCESS
     ============================================================ */
  {
    id: "hero-quote-success",
    context: "quote-request-success",
    badge: { icon: "Send", label: "Request Received" },
    title: "Quote request received!",
    description:
      "Our safari specialists are already hard at work designing your perfect African adventure.",
    image:
      "https://images.unsplash.com/photo-1760512559343-aa2ec0abf85c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "medium",
    overlay: "medium",
  },

  /* ============================================================
     DESTINATION GUIDES HUB
     ============================================================ */
  {
    id: "hero-destination-guides",
    context: "destination-guides",
    badge: { icon: "Map", label: "Travel Guides" },
    title: "Destination guides & tips",
    description:
      "In-depth travel guides to help you prepare for your African safari. Explore cultures, climates, and must-see experiences.",
    image:
      "https://images.unsplash.com/photo-1772289935190-c5cacb1cec12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "View destinations",
    primaryCTAHref: "/destinations",
    height: "medium",
    overlay: "medium",
  },

  /* ============================================================
     TRAVEL INSURANCE
     ============================================================ */
  {
    id: "hero-travel-insurance",
    context: "travel-insurance",
    badge: { icon: "Shield", label: "Travel Protection" },
    title: "Safari travel insurance",
    description:
      "Protect your adventure with comprehensive travel insurance tailored for African safaris.",
    image:
      "https://images.unsplash.com/photo-1616706924384-06dd562f1696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "small",
    overlay: "medium",
  },

  /* ============================================================
     NEWSLETTER
     ============================================================ */
  {
    id: "hero-newsletter",
    context: "newsletter",
    badge: { icon: "Mail", label: "Stay Connected" },
    title: "Join the safari insider list",
    description:
      "Get exclusive deals, travel tips, and destination inspiration delivered straight to your inbox.",
    image:
      "https://images.unsplash.com/photo-1636874751251-77c09a685fcf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "small",
    overlay: "medium",
  },

  /* ============================================================
     PACKING GUIDES
     ============================================================ */
  {
    id: "hero-packing-guides",
    context: "packing-guides",
    badge: { icon: "Luggage", label: "Packing Tips" },
    title: "Safari packing guides",
    description:
      "Everything you need to pack for your African safari, from clothing essentials to camera gear.",
    image:
      "https://images.unsplash.com/photo-1763569799665-485826a970f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "small",
    overlay: "medium",
  },

  /* ============================================================
     SUSTAINABILITY
     ============================================================ */
  {
    id: "hero-sustainability",
    context: "sustainability",
    badge: { icon: "Leaf", label: "Responsible Travel" },
    title: "Our commitment to sustainability",
    description:
      "Responsible tourism is at the heart of everything we do. Learn how we protect the landscapes and communities we visit.",
    image:
      "https://images.unsplash.com/photo-1616706924384-06dd562f1696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Learn more",
    primaryCTAHref: "/sustainability",
    height: "medium",
    overlay: "medium",
  },

  /* ============================================================
     PRIVACY POLICY
     ============================================================ */
  {
    id: "hero-privacy",
    context: "privacy-policy",
    badge: { icon: "Shield", label: "Your Privacy" },
    title: "Privacy policy",
    description:
      "How we protect your data and ensure transparency in our operations.",
    image:
      "https://images.unsplash.com/photo-1692690135466-cecd5d5c608c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "small",
    overlay: "medium",
  },

  /* ============================================================
     TERMS & CONDITIONS
     ============================================================ */
  {
    id: "hero-terms",
    context: "terms-conditions",
    badge: { icon: "FileText", label: "Legal" },
    title: "Terms & conditions",
    description:
      "The terms and conditions that govern your use of our services and booking agreements.",
    image:
      "https://images.unsplash.com/photo-1692690135466-cecd5d5c608c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "small",
    overlay: "medium",
  },

  /* ============================================================
     SEARCH RESULTS
     ============================================================ */
  {
    id: "hero-search",
    context: "search",
    badge: { icon: "Search", label: "Search Results" },
    title: "Find your perfect safari",
    description:
      "Search across tours, destinations, accommodation, and more to find exactly what you're looking for.",
    image:
      "https://images.unsplash.com/photo-1770843093638-1941ee5cbc64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "small",
    overlay: "medium",
  },

  /* ============================================================
     NOT FOUND (404)
     ============================================================ */
  {
    id: "hero-not-found",
    context: "not-found",
    badge: { icon: "Compass", label: "Off Trail" },
    title: "Off the beaten path",
    description:
      "We're sorry, but the page you were looking for doesn't exist or has been moved to a new territory.",
    image:
      "https://images.unsplash.com/photo-1763287901011-f116861d7a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Return home",
    primaryCTAHref: "/",
    secondaryCTALabel: "Browse tours",
    secondaryCTAHref: "/tours",
    height: "medium",
    overlay: "dark",
  },

  /* ============================================================
     SITEMAP
     ============================================================ */
  {
    id: "hero-sitemap",
    context: "sitemap",
    badge: { icon: "Map", label: "Site Navigation" },
    title: "Sitemap",
    description:
      "A complete overview of all pages and sections available on our site.",
    image:
      "https://images.unsplash.com/photo-1770843093638-1941ee5cbc64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "small",
    overlay: "medium",
  },

  /* ============================================================
     BOOKING CONFIRMATION
     ============================================================ */
  {
    id: "hero-booking-confirmation",
    context: "booking-confirmation",
    badge: { icon: "Calendar", label: "Booking Confirmed" },
    title: "Your safari is booked!",
    description:
      "Congratulations — your African adventure awaits. Check your email for full details and next steps.",
    image:
      "https://images.unsplash.com/photo-1761364622323-833282bb4aef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "medium",
    overlay: "medium",
  },

  /* ============================================================
     TRIP PLANNER
     ============================================================ */
  {
    id: "hero-trip-planner",
    context: "trip-planner",
    badge: { icon: "Route", label: "Plan Your Safari" },
    title: "Build your dream itinerary",
    description:
      "Use our interactive trip planner to design a bespoke African safari tailored to your interests, budget, and travel dates.",
    image:
      "https://images.unsplash.com/photo-1662217134917-264a5e248581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Start planning",
    primaryCTAHref: "/trip-planner",
    height: "medium",
    overlay: "medium",
    showScrollIndicator: true,
  },

  /* ============================================================
     WISHLIST
     ============================================================ */
  {
    id: "hero-wishlist",
    context: "wishlist",
    badge: { icon: "Heart", label: "Your Favourites" },
    title: "Your safari wishlist",
    description:
      "Tours, destinations, and lodges you've saved for later. Review your favourites and start planning your perfect trip.",
    image:
      "https://images.unsplash.com/photo-1577971132997-c10be9372519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "small",
    overlay: "medium",
  },

  /* ============================================================
     PROFILE / ACCOUNT
     ============================================================ */
  {
    id: "hero-profile",
    context: "profile",
    badge: { icon: "User", label: "Your Account" },
    title: "Manage your profile",
    description:
      "View your bookings, update personal details, and manage your travel preferences.",
    image:
      "https://images.unsplash.com/photo-1712479667983-9f2872d33fb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "small",
    overlay: "medium",
  },

  /* ============================================================
     TRAVEL STYLES (TAXONOMY HUB)
     ============================================================ */
  {
    id: "hero-travel-styles",
    context: "travel-styles",
    badge: { icon: "Compass", label: "Travel Styles" },
    title: "Find your style of safari",
    description:
      "From luxury fly-in camps to overland expeditions, discover the travel style that matches your sense of adventure.",
    image:
      "https://images.unsplash.com/photo-1741850821150-58b56e0e6156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Browse styles",
    primaryCTAHref: "/travel-styles",
    height: "medium",
    overlay: "medium",
    showScrollIndicator: true,
  },

  /* ============================================================
     DEV TOOLS
     ============================================================ */
  {
    id: "hero-dev-tools",
    context: "dev-tools",
    badge: { icon: "Terminal", label: "Developer Tools" },
    title: "Developer tools hub",
    description:
      "Explore, audit, and validate every design token powering the LightSpeed prototype. Change one variable, update the entire system.",
    image:
      "https://images.unsplash.com/photo-1770734360042-676ef707d022?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "small",
    overlay: "dark",
  },

  /* ============================================================
     BOOKING PAGE
     ============================================================ */
  {
    id: "hero-booking",
    context: "booking",
    badge: { icon: "CreditCard", label: "Secure Booking" },
    title: "Complete your booking",
    description:
      "You're one step away from an unforgettable African safari. Review your selection and confirm your reservation.",
    image:
      "https://images.unsplash.com/photo-1688373905562-c21cf858720d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    height: "small",
    overlay: "medium",
  },

  /* ============================================================
     GALLERY
     ============================================================ */
  {
    id: "hero-gallery",
    context: "gallery",
    badge: { icon: "Camera", label: "Photo Gallery" },
    title: "Captured moments from extraordinary journeys",
    description:
      "Browse our curated collection of photographs from safaris, cultural encounters, and breathtaking landscapes across three continents.",
    image:
      "https://images.unsplash.com/photo-1738701243287-df5b46011c2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Browse gallery",
    primaryCTAHref: "/gallery",
    height: "medium",
    overlay: "medium",
    showScrollIndicator: true,
  },

  /* ============================================================
     TESTIMONIALS
     ============================================================ */
  {
    id: "hero-testimonials",
    context: "testimonials",
    badge: { icon: "Star", label: "Traveller Stories" },
    title: "Stories from those who journeyed with us",
    description:
      "Real experiences from real travellers. Discover why thousands of adventurers trust us with their most important journeys.",
    image:
      "https://images.unsplash.com/photo-1766717698967-8effd1f9631b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Read stories",
    primaryCTAHref: "/testimonials",
    height: "medium",
    overlay: "medium",
    showScrollIndicator: true,
  },

  /* ============================================================
     PARTNERS
     ============================================================ */
  {
    id: "hero-partners",
    context: "partners",
    badge: { icon: "Handshake", label: "Our Network" },
    title: "The partners who make it possible",
    description:
      "From conservation organisations to luxury lodges, our carefully chosen partners share our commitment to responsible, transformative travel.",
    image:
      "https://images.unsplash.com/photo-1727762423147-fdb6d59748c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "Meet our partners",
    primaryCTAHref: "/partners",
    height: "medium",
    overlay: "medium",
    showScrollIndicator: true,
  },

  /* ============================================================
     CAREERS
     ============================================================ */
  {
    id: "hero-careers",
    context: "careers",
    badge: { icon: "Briefcase", label: "Join Our Team" },
    title: "Build a career that matters",
    description:
      "Join a passionate team of guides, conservationists, and travel experts who are changing the way the world experiences nature.",
    image:
      "https://images.unsplash.com/photo-1707819235986-df585047b0c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    primaryCTALabel: "View openings",
    primaryCTAHref: "/careers",
    height: "medium",
    overlay: "medium",
    showScrollIndicator: true,
  },
];

/**
 * Helper: get hero content by context key.
 *
 * @param context - The page/template context (e.g., "home", "tours-archive")
 * @returns HeroContent or undefined
 */
export function getHeroContent(context: string): HeroContent | undefined {
  return HERO_CONTENT.find((h) => h.context === context);
}