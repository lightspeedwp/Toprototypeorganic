/**
 * Schema.org Structured Data Utility
 * 
 * Generates JSON-LD structured data for all content types.
 * Schema.org markup improves SEO by providing search engines
 * with structured information about page content.
 * 
 * Usage: Import the relevant schema generator and render
 * the result inside a <script type="application/ld+json"> tag.
 * 
 * @module schemaOrg
 * @category utils
 * @see https://schema.org
 */

const SITE_NAME = "LightSpeed Tours";
const SITE_URL = "https://lightspeedtours.com";

/**
 * Base organization schema used across all pages.
 */
export function getOrganizationSchema() {
  return {
    "@type": "TravelAgency",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0100",
      "contactType": "customer service",
      "availableLanguage": ["English"],
    },
    "sameAs": [
      "https://facebook.com/lightspeedtours",
      "https://instagram.com/lightspeedtours",
      "https://twitter.com/lightspeedtours",
    ],
  };
}

/**
 * Generate TouristTrip schema for a tour.
 */
export function getTourSchema(tour: {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  price: string;
  duration: string;
  destination?: string;
  highlights?: string[];
  included?: string[];
  rating?: number;
  reviewCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tour.title,
    "description": tour.excerpt,
    "url": `${SITE_URL}/tours/${tour.slug}`,
    "image": tour.featuredImage,
    "touristType": "Leisure",
    "itinerary": {
      "@type": "ItemList",
      "numberOfItems": tour.highlights?.length || 0,
      "itemListElement": tour.highlights?.map((highlight, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": highlight,
      })) || [],
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": tour.price.replace(/[^0-9.]/g, ""),
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString().split("T")[0],
      "url": `${SITE_URL}/tours/${tour.slug}`,
      "seller": getOrganizationSchema(),
    },
    "provider": getOrganizationSchema(),
    ...(tour.rating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": tour.rating,
        "reviewCount": tour.reviewCount || 0,
        "bestRating": 5,
        "worstRating": 1,
      },
    }),
    ...(tour.included && {
      "includesAttraction": tour.included.map(item => ({
        "@type": "TouristAttraction",
        "name": item,
      })),
    }),
  };
}

/**
 * Generate TouristDestination / Place schema.
 */
export function getDestinationSchema(destination: {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  coordinates?: { lat: number; lng: number };
  highlights?: string[];
  climate?: string;
  currency?: string;
  language?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": destination.title,
    "description": destination.excerpt,
    "url": `${SITE_URL}/destinations/${destination.slug}`,
    "image": destination.featuredImage,
    ...(destination.coordinates && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": destination.coordinates.lat,
        "longitude": destination.coordinates.lng,
      },
    }),
    ...(destination.highlights && {
      "touristType": destination.highlights,
    }),
    "containedInPlace": {
      "@type": "Country",
      "name": destination.title,
    },
  };
}

/**
 * Generate LodgingBusiness / Hotel schema.
 */
export function getAccommodationSchema(accommodation: {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  rating: number;
  location: string;
  amenities?: string[];
  roomTypes?: string[];
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": accommodation.title,
    "description": accommodation.excerpt,
    "url": `${SITE_URL}/accommodation/${accommodation.slug}`,
    "image": accommodation.featuredImage,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": accommodation.location,
    },
    "starRating": {
      "@type": "Rating",
      "ratingValue": accommodation.rating,
      "bestRating": 5,
    },
    ...(accommodation.amenities && {
      "amenityFeature": accommodation.amenities.map(amenity => ({
        "@type": "LocationFeatureSpecification",
        "name": amenity,
        "value": true,
      })),
    }),
    ...(accommodation.priceRange && {
      "priceRange": accommodation.priceRange,
    }),
    "provider": getOrganizationSchema(),
  };
}

/**
 * Generate Review schema.
 */
export function getReviewSchema(review: {
  title: string;
  slug: string;
  content: string;
  rating: number;
  author: string;
  authorLocation?: string;
  date: string;
  tourTitle?: string;
  tourSlug?: string;
  destinationTitle?: string;
  accommodationTitle?: string;
  verified?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "name": review.title,
    "reviewBody": review.content,
    "url": `${SITE_URL}/reviews/${review.slug}`,
    "datePublished": review.date,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5,
      "worstRating": 1,
    },
    "author": {
      "@type": "Person",
      "name": review.author,
      ...(review.authorLocation && {
        "address": {
          "@type": "PostalAddress",
          "addressLocality": review.authorLocation,
        },
      }),
    },
    ...(review.tourTitle && {
      "itemReviewed": {
        "@type": "TouristTrip",
        "name": review.tourTitle,
        "url": `${SITE_URL}/tours/${review.tourSlug}`,
      },
    }),
    ...(review.verified && {
      "reviewAspect": "Verified Purchase",
    }),
  };
}

/**
 * Generate Offer schema for specials.
 */
export function getSpecialSchema(special: {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  discount: string;
  validFrom: string;
  validTo: string;
  terms?: string;
  tourTitle?: string;
  tourSlug?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": special.title,
    "description": special.excerpt,
    "url": `${SITE_URL}/specials/${special.slug}`,
    "image": special.featuredImage,
    "validFrom": special.validFrom,
    "validThrough": special.validTo,
    "availability": "https://schema.org/InStock",
    "discount": special.discount,
    ...(special.terms && {
      "termsOfService": special.terms,
    }),
    "seller": getOrganizationSchema(),
  };
}

/**
 * Generate Person schema for team members.
 */
export function getTeamMemberSchema(member: {
  name: string;
  slug: string;
  role: string;
  bio: string;
  featuredImage: string;
  email?: string;
  phone?: string;
  specialties?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "url": `${SITE_URL}/team/${member.slug}`,
    "image": member.featuredImage,
    "jobTitle": member.role,
    "description": member.bio,
    "worksFor": getOrganizationSchema(),
    ...(member.email && { "email": `mailto:${member.email}` }),
    ...(member.phone && { "telephone": member.phone }),
    ...(member.specialties && {
      "knowsAbout": member.specialties,
    }),
  };
}

/**
 * Generate FAQPage schema.
 */
export function getFAQPageSchema(faqs: Array<{
  question: string;
  answer: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/**
 * Generate BlogPosting / Article schema.
 */
export function getBlogPostSchema(post: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  date: string;
  categories?: string[];
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "url": `${SITE_URL}/blog/${post.slug}`,
    "image": post.featuredImage,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": getOrganizationSchema(),
    ...(post.categories && {
      "articleSection": post.categories,
    }),
    ...(post.tags && {
      "keywords": post.tags.join(", "),
    }),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

/**
 * Generate AggregateRating schema for archive pages.
 */
export function getAggregateRatingSchema(data: {
  itemType: string;
  itemName: string;
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": data.itemType,
    "name": data.itemName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": data.ratingValue,
      "reviewCount": data.reviewCount,
      "bestRating": data.bestRating || 5,
      "worstRating": 1,
    },
  };
}

/**
 * Generate BreadcrumbList schema.
 */
export function getBreadcrumbSchema(items: Array<{
  name: string;
  url: string;
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * React component helper: renders a JSON-LD script tag.
 * Use this in component JSX to inject schema data.
 * 
 * @example
 * <SchemaScript data={getTourSchema(tour)} />
 */
export function SchemaScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
