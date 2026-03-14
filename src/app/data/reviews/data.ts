import type { Review } from "../types";

/**
 * Africa Reviews — Customer reviews for African tours and destinations.
 * 
 * rev-1 to rev-15 (15 reviews)
 * Covers: South Africa, Kenya, Tanzania, Botswana, Uganda, Namibia, Mozambique, Zambia, Zimbabwe, Rwanda
 * 
 * @module reviews-africa
 * @category data/reviews
 * @wordpressPostType review
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
    categories: ["cat-2", "cat-6"],
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
    categories: ["cat-3", "cat-4", "cat-7"],
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
    categories: ["cat-4", "cat-5", "cat-6", "cat-9"],
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
  {
    id: "rev-6",
    slug: "namibia-desert-stargazing",
    title: "Stars like you've never seen them",
    excerpt: "The Namibian desert at night is the most beautiful thing I've ever witnessed.",
    content: "<p>The Namibia Desert Adventure blew my mind. Sossusvlei at dawn, the eerie beauty of Deadvlei, and the incredible stargazing from our camp at NamibRand. Our guide explained the constellations and how the San people navigated by them. The self-drive segments were easy and well-planned, with the team tracking our GPS progress. I felt safe and completely free at the same time.</p>",
    rating: 5,
    author: "Andreas W.",
    authorLocation: "Munich, Germany",
    date: "2024-04-12",
    tourId: "tour-7",
    verified: true,
    wouldRecommend: true,
    groupType: "Couple",
    tripDuration: "12 days",
    categories: ["cat-4", "cat-6"],
    aspectRatings: {
      service: 5,
      value: 5,
      accommodation: 4,
      activities: 5,
      food: 4,
      guide: 5
    }
  },
  {
    id: "rev-7",
    slug: "cape-town-winelands-romance",
    title: "Romance in every glass",
    excerpt: "The Winelands sunsets will stay with me forever.",
    content: "<p>We celebrated our 10th anniversary with the Cape Town Explorer tour and it was simply magical. Franschhoek was our favourite — the food and wine pairing at La Motte was outstanding. Table Mountain on a clear day gave us views that no photo can capture. LightSpeed arranged a private sunset picnic at Signal Hill that had us both in tears. If you're looking for romance, this is it.</p>",
    rating: 5,
    author: "Sarah & David K.",
    authorLocation: "Dublin, Ireland",
    date: "2024-05-20",
    tourId: "tour-3",
    verified: true,
    wouldRecommend: true,
    groupType: "Couple",
    tripDuration: "10 days",
    categories: ["cat-1", "cat-5"],
    aspectRatings: {
      service: 5,
      value: 5,
      accommodation: 5,
      activities: 5,
      food: 5,
      guide: 5
    }
  },
  {
    id: "rev-8",
    slug: "tanzania-family-serengeti",
    title: "The Serengeti changed our children",
    excerpt: "Our teenagers put their phones down for the first time in years.",
    content: "<p>I was skeptical about taking teenagers to Tanzania, but the Family Zanzibar & Serengeti tour was transformative. Watching the wildebeest migration had our 14-year-old speechless — she later said it was the most important thing she'd ever seen. The Zanzibar beach days were the perfect wind-down. The guides were incredibly patient with our questions and the lodge was spotless.</p>",
    rating: 5,
    author: "The Petersons",
    authorLocation: "Chicago, USA",
    date: "2024-06-15",
    tourId: "tour-27",
    verified: true,
    wouldRecommend: true,
    groupType: "Family",
    tripDuration: "12 days",
    categories: ["cat-2", "cat-7"],
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
    id: "rev-9",
    slug: "friends-botswana-adventure",
    title: "Best mates, best trip",
    excerpt: "Six friends, one delta, zero regrets.",
    content: "<p>We're a group of six friends who travel together every year. Botswana was our wildest adventure yet. The mokoro canoe trip through the delta channels had us all grinning like kids. Night drives in Moremi were thrilling — we spotted a leopard on our first evening. The mobile camps were surprisingly comfortable, and the campfire storytelling by our guides was the highlight of every night.</p>",
    rating: 5,
    author: "The Cape Town Six",
    authorLocation: "Cape Town, South Africa",
    date: "2024-07-08",
    tourId: "tour-26",
    verified: true,
    wouldRecommend: true,
    groupType: "Friends",
    tripDuration: "8 days",
    categories: ["cat-4", "cat-6", "cat-9"],
    aspectRatings: {
      service: 5,
      value: 5,
      accommodation: 4,
      activities: 5,
      food: 5,
      guide: 5
    }
  },
  {
    id: "rev-10",
    slug: "solo-kenya-empowering",
    title: "Travel that changes your perspective",
    excerpt: "Kenya taught me more about myself than any self-help book.",
    content: "<p>The Solo Kenya Explorer was exactly what I needed after a difficult year. The itinerary balanced adventure with downtime perfectly. The Maasai Mara was obviously incredible, but the community visit near Lake Nakuru was what truly moved me. Watching flamingos at sunrise while drinking Kenyan coffee — those are the moments you travel for. I felt safe, supported, and completely alive.</p>",
    rating: 5,
    author: "Priya N.",
    authorLocation: "Mumbai, India",
    date: "2024-08-22",
    tourId: "tour-19",
    verified: true,
    wouldRecommend: true,
    groupType: "Solo",
    tripDuration: "10 days",
    categories: ["cat-3", "cat-7"],
    aspectRatings: {
      service: 5,
      value: 5,
      accommodation: 4,
      activities: 5,
      food: 4,
      guide: 5
    }
  },
  {
    id: "rev-11",
    slug: "zambia-walking-safari-raw",
    title: "On foot, face to face with nature",
    excerpt: "Walking safaris are the purest way to experience Africa.",
    content: "<p>I've done vehicle safaris before, but walking through the South Luangwa on foot is a completely different experience. Every sense is heightened. Our guide carried a rifle but we never needed it — his knowledge of animal behaviour was extraordinary. Tracking a leopard on foot for two hours was the most exhilarating thing I've ever done. The bush camps were basic but charming, and the star beds were unforgettable.</p>",
    rating: 5,
    author: "Tom B.",
    authorLocation: "Bristol, UK",
    date: "2024-09-10",
    tourId: "tour-10",
    verified: true,
    wouldRecommend: true,
    groupType: "Solo",
    tripDuration: "7 days",
    categories: ["cat-4", "cat-6"],
    aspectRatings: {
      service: 5,
      value: 5,
      accommodation: 4,
      activities: 5,
      food: 4,
      guide: 5
    }
  },
  {
    id: "rev-12",
    slug: "mozambique-beach-bliss",
    title: "Paradise found in Mozambique",
    excerpt: "White sand, warm water, and absolutely nothing to do — perfect.",
    content: "<p>After a hectic year, the Mozambique Beach & Diving tour was exactly the reset I needed. Bazaruto Archipelago is untouched and unspoiled. The diving was spectacular — we saw whale sharks, manta rays, and the most vibrant coral I've ever encountered. But honestly, I spent most of my time in a hammock with a book. The lodge staff remembered our names from day one and treated us like family.</p>",
    rating: 4,
    author: "Claire & James R.",
    authorLocation: "Auckland, New Zealand",
    date: "2024-10-05",
    tourId: "tour-9",
    verified: true,
    wouldRecommend: true,
    groupType: "Couple",
    tripDuration: "8 days",
    categories: ["cat-5", "cat-10"],
    aspectRatings: {
      service: 4,
      value: 4,
      accommodation: 5,
      activities: 4,
      food: 5,
      guide: 4
    }
  },
  {
    id: "rev-13",
    slug: "multi-gen-cape-town",
    title: "Three generations, one incredible trip",
    excerpt: "Grandma had the time of her life — and so did the grandkids.",
    content: "<p>Planning a trip for grandparents, parents, and kids aged 6 and 9 seemed impossible, but LightSpeed nailed it. The multi-generational Cape Town & Safari tour had something for everyone. Grandma loved the wine tasting, the kids went crazy for the penguins at Boulders Beach, and we all loved the safari lodge. The pace was gentle enough for Grandma but exciting enough for the kids. Best family holiday we've ever had.</p>",
    rating: 5,
    author: "The Müller Family",
    authorLocation: "Zurich, Switzerland",
    date: "2024-11-18",
    tourId: "tour-18",
    verified: true,
    wouldRecommend: true,
    groupType: "Family",
    tripDuration: "14 days",
    categories: ["cat-2", "cat-6"],
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
    id: "rev-14",
    slug: "photography-masai-mara",
    title: "Every frame tells a story",
    excerpt: "I came home with 12,000 photos and couldn't delete a single one.",
    content: "<p>The Photography Masai Mara Expedition was designed by photographers, for photographers. Our guide knew the light, the angles, and exactly where the animals would be. We spent golden hour after golden hour in perfect position. The converted safari vehicle had bean bag camera rests and charging stations. My portfolio has been transformed. The small group of fellow photographers made it even better — we've already planned a reunion trip.</p>",
    rating: 5,
    author: "Kenji T.",
    authorLocation: "Osaka, Japan",
    date: "2025-01-15",
    tourId: "tour-29",
    verified: true,
    wouldRecommend: true,
    groupType: "Solo",
    tripDuration: "7 days",
    categories: ["cat-4", "cat-6", "cat-8"],
    aspectRatings: {
      service: 5,
      value: 5,
      accommodation: 4,
      activities: 5,
      food: 4,
      guide: 5
    }
  },
  {
    id: "rev-15",
    slug: "luxury-okavango-fly-in",
    title: "Flying into paradise",
    excerpt: "The scenic flight alone was worth the trip.",
    content: "<p>The Okavango Fly-In Safari is the definition of luxury wilderness. Landing on a dirt airstrip in the middle of the delta with a gin and tonic waiting for us set the tone. The camps were extraordinary — outdoor showers overlooking the floodplains, plunge pools cooled by the delta breeze. We saw wild dogs on our very first drive, which our guide said was rare. The staff-to-guest ratio meant every moment felt personal and unhurried. Worth every penny.</p>",
    rating: 5,
    author: "Victoria & Charles H.",
    authorLocation: "London, UK",
    date: "2025-02-20",
    tourId: "tour-15",
    verified: true,
    wouldRecommend: true,
    groupType: "Couple",
    tripDuration: "6 days",
    categories: ["cat-5", "cat-9"],
    aspectRatings: {
      service: 5,
      value: 4,
      accommodation: 5,
      activities: 5,
      food: 5,
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
