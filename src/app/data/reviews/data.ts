import type { Review } from "../types";

/**
 * Mock data for customer reviews and testimonials.
 */
export const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    slug: "perfect-honeymoon",
    title: "The perfect honeymoon",
    excerpt: "We couldn't have asked for a better start to our marriage.",
    content: "<p>We booked the Cape Town Honeymoon Escape and it exceeded every expectation. The accommodation was stunning, particularly Ellerman House. Our guide in Cape Town, Peter, was knowledgeable and friendly. The transition to the Winelands was seamless. Highly recommend LightSpeed Tours for taking the stress out of planning.</p>",
    rating: 5,
    author: "Emily & Jack",
    authorLocation: "New York, USA",
    date: "2024-02-15",
    tourId: "tour-1",
    verified: true,
    wouldRecommend: true,
    groupType: "Couple",
    tripDuration: "7 days",
    categories: ["cat-1", "cat-5"],
    aspectRatings: {
      service: 5,
      value: 5,
      accommodation: 5,
      activities: 4,
      food: 5,
      guide: 5
    }
  },
  {
    id: "rev-2",
    slug: "family-safari-adventure",
    title: "Unforgettable family adventure",
    excerpt: "Our kids (ages 8 and 10) were absolutely captivated.",
    content: "<p>Taking the kids on the Kruger Safari Experience was the best decision. The lodge was incredibly family-friendly with a junior ranger program that kept the kids engaged. Seeing the Big Five was a bonus, but the whole experience of being in the bush was magical. David at LightSpeed helped us choose the perfect lodge.</p>",
    rating: 5,
    author: "The Thompsons",
    authorLocation: "London, UK",
    date: "2024-01-10",
    tourId: "tour-2",
    verified: true,
    wouldRecommend: true,
    groupType: "Family",
    tripDuration: "5 days",
    categories: ["cat-2", "cat-4"],
    aspectRatings: {
      service: 5,
      value: 4,
      accommodation: 5,
      activities: 5,
      food: 4,
      guide: 5
    }
  },
  {
    id: "rev-3",
    slug: "solo-traveler-delight",
    title: "Safe and seamless solo travel",
    excerpt: "As a solo female traveler, I felt completely supported.",
    content: "<p>I was nervous about traveling to Kenya alone, but the team put me at ease. The Cultural Safari was fantastic. The small group size meant I made friends quickly, and the guides were professional and attentive. The visit to the Maasai village was respectful and authentic, not touristy.</p>",
    rating: 4,
    author: "Jessica M.",
    authorLocation: "Sydney, Australia",
    date: "2023-11-20",
    tourId: "tour-4",
    verified: true,
    wouldRecommend: true,
    groupType: "Solo",
    tripDuration: "10 days",
    categories: ["cat-3", "cat-4"],
    aspectRatings: {
      service: 5,
      value: 5,
      accommodation: 4,
      activities: 5,
      food: 3,
      guide: 5
    }
  },
  {
    id: "rev-4",
    slug: "botswana-wilderness-magic",
    title: "Botswana wilderness magic",
    excerpt: "The Okavango Delta is simply otherworldly.",
    content: "<p>The mobile camping safari in Botswana was rugged but comfortable. Sleeping under canvas with the sounds of the delta around us was incredible. Our guide, Kops, was a walking encyclopedia. If you want a real bush experience away from the crowds, this is it.</p>",
    rating: 5,
    author: "Mark & Steve",
    authorLocation: "Toronto, Canada",
    date: "2023-10-05",
    tourId: "tour-6",
    verified: true,
    wouldRecommend: true,
    groupType: "Friends",
    tripDuration: "8 days",
    categories: ["cat-4", "cat-5"],
    aspectRatings: {
      service: 5,
      value: 4,
      accommodation: 5,
      activities: 5,
      food: 5,
      guide: 5
    }
  },
  {
    id: "rev-5",
    slug: "gorilla-trekking-dream",
    title: "A dream come true",
    excerpt: "Staring into the eyes of a silverback is life-changing.",
    content: "<p>The trek was tough, muddy, and steep, but absolutely worth every step. The hour we spent with the gorilla family flew by. The lodge was cozy and the staff helped clean our boots every evening! Excellent organization by LightSpeed Tours.</p>",
    rating: 5,
    author: "Maria S.",
    authorLocation: "Madrid, Spain",
    date: "2024-03-01",
    tourId: "tour-8",
    verified: true,
    wouldRecommend: true,
    groupType: "Solo",
    tripDuration: "5 days",
    categories: ["cat-3", "cat-4"],
    aspectRatings: {
      service: 5,
      value: 4,
      accommodation: 5,
      activities: 5,
      food: 4,
      guide: 5
    }
  },
];

/** Alias for REVIEWS_DATA — used by consumers that import REVIEWS directly from this module. */
export const REVIEWS = REVIEWS_DATA;

/**
 * Get review by slug.
 */
export function getReview(slug: string): Review | undefined {
  return REVIEWS_DATA.find(r => r.slug === slug);
}