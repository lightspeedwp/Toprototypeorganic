/**
 * Homepage Template - Main landing page.
 *
 * Comprehensive homepage showcasing all major sections of the site with links
 * to archive pages and detail pages. Now refactored into modular section components.
 *
 * **ALL content is pulled from centralized data files** — no hardcoded strings.
 * Section headers, features, statistics, newsletter copy, and CTA copy all
 * come from `/src/app/data/mock.ts` via the `HOMEPAGE_CONTENT` bundle.
 *
 * **WordPress Mapping:**
 * Equivalent to `templates/front-page.html` or `page-home.html`.
 *
 * **WordPress CSS:**
 * Uses BEM classes from `/src/styles/templates/home.css`
 *
 * @module HomePage
 * @category pages
 */

import { Hero } from "../components/patterns/Hero";
import { FAQ } from "../components/patterns/FAQ";
import {
  FeaturedToursSection,
  DestinationsSection,
  WhyChooseUsSection,
  StatisticsSection,
  AccommodationSection,
  TeamSection,
  TestimonialsSection,
  BlogSection,
  NewsletterSection,
  FinalCTASection,
  ConservationSection,
} from "../components/patterns/homepage";

import {
  TOURS,
  DESTINATIONS,
  ACCOMMODATION,
  BLOG_POSTS,
  TEAM,
  REVIEWS,
  getPageSectionFAQs,
  HOMEPAGE_CONTENT,
  getHomepageSection,
} from "../data/mock";

import { useNavigation } from "../contexts/NavigationContext";
import type { ComponentType } from "react";
import {
  MapPin,
  Compass,
  Bed as Hotel,
  Users,
  TrendUp as TrendingUp,
  Shield,
  Heart,
  ArrowRight,
  Globe,
  Trophy as Award,
} from "@phosphor-icons/react";

// ----------------------------------------------------------------
// Icon map — maps string keys stored in data to actual React icons.
// This keeps the data layer free of React imports.
// ----------------------------------------------------------------
const ICON_MAP: Record<string, ComponentType<any>> = {
  MapPin,
  Compass,
  Hotel,
  Users,
  TrendingUp,
  Shield,
  Heart,
  ArrowRight,
  Globe,
  Award,
};

/** Safely resolve an icon name to a phosphor-react component. */
function resolveIcon(name: string): ComponentType<any> {
  return ICON_MAP[name] ?? Compass;
}

/**
 * Props for the HomePage component.
 */
interface HomePageProps {
  /** Callback when navigation link is clicked */
  onNavigate?: (pageId: string) => void;
}

/**
 * Homepage Template component.
 */
export function HomePage({ onNavigate }: HomePageProps) {
  const { navigateTo } = useNavigation();
  const nav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else navigateTo(path);
  };

  // ----- Data queries (WordPress WP_Query equivalents) -----
  const featuredTours = TOURS.slice(0, 3);
  const featuredDestinations = DESTINATIONS.slice(0, 4);
  const featuredAccommodation = ACCOMMODATION.slice(0, 3);
  const featuredBlogPosts = BLOG_POSTS.slice(0, 3);
  const featuredTeam = TEAM.slice(0, 3);
  const featuredTestimonials = REVIEWS.slice(0, 3);

  // ----- Centralized content -----
  const faqData = getPageSectionFAQs("home");

  // Homepage content bundle — ALL section copy lives here
  const { features, statistics, newsletter, cta } = HOMEPAGE_CONTENT;

  // Lookup helpers
  const sec = (key: string) => getHomepageSection(key);
  const toursSection = sec("featured-tours")!;
  const destinationsSection = sec("destinations")!;
  const whySection = sec("why-choose-us")!;
  const statsSection = sec("statistics")!;
  const accommodationSection = sec("accommodation")!;
  const teamSection = sec("team")!;
  const testimonialsSection = sec("testimonials")!;
  const blogSection = sec("blog")!;

  return (
    <main className="wp-template-home theme-organic">
      {/* Hero Section (Savanna Sunset) */}
      <section className="organic-section-top texture-medium">
        <Hero context="home" />
      </section>

      {/* Primary Content (Acacia & Clay) */}
      <section className="organic-section-middle texture-subtle">
        {/* Featured Tours */}
        <FeaturedToursSection
          tours={featuredTours}
          section={toursSection}
          onNavigate={nav}
        />

        {/* Destinations */}
        <DestinationsSection
          destinations={featuredDestinations}
          section={destinationsSection}
          onNavigate={nav}
        />
      </section>

      {/* Feature/Alternative Content (Acacia & Clay - Alt) */}
      <section className="organic-section-middle-alt">
        {/* Why Choose Us */}
        <WhyChooseUsSection
          features={features.map((f) => ({
            icon: resolveIcon(f.iconName),
            title: f.title,
            description: f.description,
          }))}
          section={whySection}
        />

        {/* Conservation Spotlight (NEW) */}
        <ConservationSection onNavigate={nav} />

        {/* Statistics */}
        <StatisticsSection
          statistics={statistics.map((s) => ({
            value: s.value,
            suffix: s.suffix,
            label: s.label,
            icon: resolveIcon(s.iconName),
          }))}
          section={statsSection}
        />
      </section>

      {/* Secondary Content (Acacia & Clay) */}
      <section className="organic-section-middle">
        {/* Accommodation */}
        <AccommodationSection
          accommodation={featuredAccommodation}
          section={accommodationSection}
          onNavigate={nav}
        />

        {/* Team */}
        <TeamSection
          team={featuredTeam}
          section={teamSection}
          onNavigate={nav}
        />

        {/* Testimonials */}
        <TestimonialsSection
          reviews={featuredTestimonials}
          section={testimonialsSection}
          onNavigate={nav}
        />
      </section>

      {/* Minimal Earth for Bottom Sections */}
      <section className="organic-section-bottom">
        {/* Blog */}
        <BlogSection
          posts={featuredBlogPosts}
          section={blogSection}
          onNavigate={nav}
        />

        {/* FAQ Section */}
        {faqData && faqData.items.length > 0 && (
          <FAQ
            items={faqData.items}
            title={faqData.sectionTitle}
            intro={faqData.sectionDescription}
          />
        )}
      </section>

      {/* Newsletter and CTA (Minimal Earth Alt) */}
      <section className="organic-section-bottom-alt">
        {/* Newsletter */}
        <NewsletterSection
          newsletter={newsletter}
          onSubmit={async (email) => {
            console.log("Newsletter signup:", email);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return true;
          }}
        />

        {/* Final CTA */}
        <FinalCTASection
          cta={cta}
          onNavigate={nav}
        />
      </section>
    </main>
  );
}

export default HomePage;