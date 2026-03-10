import type { Special } from "../types";

export const SPECIALS_DATA: Special[] = [
  {
    id: "special-1",
    slug: "honeymoon-special",
    title: "Honeymoon bliss package",
    excerpt: "Celebrate your love with 50% off for the bride on selected luxury safaris.",
    content: "<p>Embark on the romantic journey of a lifetime. Our Honeymoon Bliss Package offers exclusive benefits for newlyweds, including a 50% discount for the bride accommodation at participating lodges, complimentary couples massages, and private romantic dinners under the African stars.</p><p>Valid for travel within 6 months of your wedding date. Proof of marriage required upon booking.</p>",
    featuredImage: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800",
    discount: "50% Off Partner",
    validFrom: "2024-01-01",
    validTo: "2024-12-31",
    travelStyles: ["style-1", "style-4"],
    categories: ["cat-1"],
    terms: "Minimum stay of 6 nights. Valid for travel dates in 2024. Cannot be combined with other offers. Subject to availability.",
  },
  {
    id: "special-2",
    slug: "green-season-safari",
    title: "Green season secret",
    excerpt: "Experience the magic of the emerald season with up to 30% off standard rates.",
    content: "<p>Discover the secret season of safari. The 'Green Season' brings lush landscapes, birthing season for many herbivores, and dramatic skies perfect for photography. Enjoy fewer crowds and exceptional value with our special rates during this magical time of year.</p><p>This offer applies to selected camps in Botswana, Kenya, and Tanzania.</p>",
    featuredImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800",
    discount: "30% Off",
    validFrom: "2024-11-01",
    validTo: "2025-03-31",
    travelStyles: ["style-3", "style-7"],
    categories: ["cat-5"],
    terms: "Valid for travel between November 1, 2024 and March 31, 2025. Excludes festive season (Dec 20 - Jan 5).",
  },
  {
    id: "special-3",
    slug: "family-safari-offer",
    title: "Kids go free",
    excerpt: "Introduce your children to the wonders of Africa. One child stays free for every two adults.",
    content: "<p>Create unforgettable family memories on safari. We believe every child should see an elephant in the wild. That's why we're offering a 'Kids Go Free' special at our family-friendly partner lodges. Includes Junior Ranger activities, family game drives, and special kids' menus.</p>",
    featuredImage: "https://images.unsplash.com/photo-1551522435-a13afa10f103?w=800",
    discount: "Kids Stay Free",
    validFrom: "2024-04-01",
    validTo: "2024-09-30",
    travelStyles: ["style-5"],
    categories: ["cat-2"],
    terms: "Valid for children under 12 sharing with 2 adults. Maximum 2 children per family. Park fees still apply.",
  },
  {
    id: "special-4",
    slug: "stay-pay-deal",
    title: "Stay 4, pay 3",
    excerpt: "Extend your adventure with a complimentary night at selected luxury lodges.",
    content: "<p>Why rush paradise? Book three nights at any of our participating luxury lodges and receive a fourth night absolutely free. This allows you more time to relax, enjoy the spa, or take that extra game drive you were dreaming of.</p>",
    featuredImage: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800",
    discount: "1 Night Free",
    validFrom: "2024-05-01",
    validTo: "2024-10-31",
    travelStyles: ["style-4", "style-2"],
    categories: ["cat-4"],
    terms: "Applies to accommodation only. Conservation fees payable for free night. Cannot be combined with other offers.",
  },
];

/** Alias for SPECIALS_DATA — used by consumers that import SPECIALS directly from this module. */
export const SPECIALS = SPECIALS_DATA;

/**
 * Get special by slug.
 */
export function getSpecial(slug: string): Special | undefined {
  return SPECIALS_DATA.find(s => s.slug === slug);
}
