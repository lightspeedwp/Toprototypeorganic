/**
 * Schema.org Structured Data Utilities
 * 
 * Generate JSON-LD structured data for SEO and rich snippets.
 * 
 * **Supported Types:**
 * - Organization
 * - TouristAttraction
 * - Product (Tours)
 * - Place (Destinations)
 * - Review
 * - AggregateRating
 * - FAQPage
 * - BreadcrumbList
 * - Article (Blog posts)
 * 
 * @module schema
 * @category lib
 */

import type { Tour, Destination, Review, FAQItem, Post, Accommodation } from "../data/types";

/**
 * Base schema context and type.
 */
interface BaseSchema {
  "@context": "https://schema.org";
  "@type": string;
}

/**
 * Organization schema for company/brand.
 */
export interface OrganizationSchema extends BaseSchema {
  "@type": "Organization" | "TravelAgency";
  name: string;
  url: string;
  logo?: string;
  description?: string;
  telephone?: string;
  email?: string;
  address?: {
    "@type": "PostalAddress";
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
}

/**
 * Generate Organization schema.
 */
export function generateOrganizationSchema(data: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  telephone?: string;
  email?: string;
  socialLinks?: string[];
}): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    telephone: data.telephone,
    email: data.email,
    sameAs: data.socialLinks,
  };
}

/**
 * Product schema for tours.
 */
export interface ProductSchema extends BaseSchema {
  "@type": "Product" | "TouristTrip";
  name: string;
  description: string;
  image?: string[];
  brand?: {
    "@type": "Brand" | "Organization";
    name: string;
  };
  offers?: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
    validFrom?: string;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  };
}

/**
 * Generate Product schema for tours.
 */
export function generateTourSchema(tour: Tour, baseUrl: string): ProductSchema {
  const schema: ProductSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description,
    image: tour.featuredImage ? [tour.featuredImage] : undefined,
  };

  if (tour.price) {
    schema.offers = {
      "@type": "Offer",
      price: tour.price.amount.toString(),
      priceCurrency: tour.price.currency,
      availability: "https://schema.org/InStock",
      url: `${baseUrl}/tours/${tour.slug}`,
    };
  }

  if (tour.rating && tour.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

/**
 * Place schema for destinations.
 */
export interface PlaceSchema extends BaseSchema {
  "@type": "Place" | "TouristDestination";
  name: string;
  description?: string;
  image?: string[];
  address?: {
    "@type": "PostalAddress";
    addressCountry?: string;
    addressRegion?: string;
  };
  geo?: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
}

/**
 * Generate Place schema for destinations.
 */
export function generateDestinationSchema(destination: Destination): PlaceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.description,
    image: destination.featuredImage ? [destination.featuredImage] : undefined,
  };
}

/**
 * Review schema.
 */
export interface ReviewSchema extends BaseSchema {
  "@type": "Review";
  reviewRating: {
    "@type": "Rating";
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
  };
  author: {
    "@type": "Person";
    name: string;
  };
  reviewBody?: string;
  datePublished?: string;
}

/**
 * Generate Review schema.
 */
export function generateReviewSchema(review: Review): ReviewSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": "Person",
      name: review.author.name,
    },
    reviewBody: review.content,
    datePublished: review.date,
  };
}

/**
 * FAQPage schema.
 */
export interface FAQPageSchema extends BaseSchema {
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

/**
 * Generate FAQPage schema.
 */
export function generateFAQSchema(faqs: FAQItem[]): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList schema.
 */
export interface BreadcrumbListSchema extends BaseSchema {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }>;
}

/**
 * Generate BreadcrumbList schema.
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ label: string; href?: string }>
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: crumb.href,
    })),
  };
}

/**
 * Article schema for blog posts.
 */
export interface ArticleSchema extends BaseSchema {
  "@type": "Article" | "BlogPosting";
  headline: string;
  description?: string;
  image?: string[];
  datePublished: string;
  dateModified?: string;
  author: {
    "@type": "Person" | "Organization";
    name: string;
  };
  publisher?: {
    "@type": "Organization";
    name: string;
    logo?: {
      "@type": "ImageObject";
      url: string;
    };
  };
}

/**
 * Generate Article schema for blog posts.
 */
export function generateArticleSchema(
  post: Post,
  publisherName: string,
  publisherLogo?: string
): ArticleSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? [post.featuredImage] : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: publisherLogo
        ? {
            "@type": "ImageObject",
            url: publisherLogo,
          }
        : undefined,
    },
  };
}

/**
 * Lodging Business schema for accommodation.
 */
export interface LodgingBusinessSchema extends BaseSchema {
  "@type": "LodgingBusiness" | "Hotel";
  name: string;
  description?: string;
  image?: string[];
  address?: {
    "@type": "PostalAddress";
    addressCountry?: string;
    addressLocality?: string;
  };
  starRating?: {
    "@type": "Rating";
    ratingValue: number;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    reviewCount: number;
  };
}

/**
 * Generate LodgingBusiness schema for accommodation.
 */
export function generateAccommodationSchema(accommodation: Accommodation): LodgingBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: accommodation.name,
    description: accommodation.description,
    image: accommodation.featuredImage ? [accommodation.featuredImage] : undefined,
    starRating: accommodation.starRating
      ? {
          "@type": "Rating",
          ratingValue: accommodation.starRating,
        }
      : undefined,
    aggregateRating:
      accommodation.rating && accommodation.reviewCount
        ? {
            "@type": "AggregateRating",
            ratingValue: accommodation.rating,
            reviewCount: accommodation.reviewCount,
          }
        : undefined,
  };
}

/**
 * Render schema as JSON-LD script tag.
 */
export function renderSchema(schema: BaseSchema | BaseSchema[]): string {
  const schemaArray = Array.isArray(schema) ? schema : [schema];
  return `<script type="application/ld+json">
${JSON.stringify(schemaArray.length === 1 ? schemaArray[0] : schemaArray, null, 2)}
</script>`;
}
