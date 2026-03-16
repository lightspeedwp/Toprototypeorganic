/**
 * MegaMenu — Desktop navigation flyout panels
 *
 * Displays categorised content (archives, taxonomies, regions)
 * when hovering or clicking main nav items.
 *
 * WordPress Mapping: Enhancement to core/navigation block
 * CSS: /src/styles/parts/mega-menu.css (BEM: .wp-part-mega-menu__*)
 *
 * @module MegaMenu
 * @category parts
 */

import { MapPin, ArrowRight, Compass, Hotel, Tag, Users, BookOpen, Leaf, TreePine, Heart, Shield, Building2, Star, Phone, HelpCircle } from "lucide-react";
import { cn } from "../../lib/utils";

/* ── Data Imports ─────────────────────────────────────────────────── */
import { TRAVEL_STYLES } from "../../data/taxonomies/travel-styles";
import { TRAVELLER_TYPES } from "../../data/taxonomies/traveller-types";
import { ACCOMMODATION_TYPES } from "../../data/taxonomies/accommodation-types";
import { BRANDS } from "../../data/taxonomies/brands";
import { BLOG_CATEGORIES } from "../../data/blog/categories";
import { ALL_TOURS as TOURS } from "../../data/tours";
import { ALL_ACCOMMODATION as ACCOMMODATION } from "../../data/accommodation";
import {
  EAST_AFRICA,
  SOUTHERN_AFRICA,
  INDIAN_OCEAN_DESTINATIONS,
} from "../../data/destinations";

/* ── Types ────────────────────────────────────────────────────────── */

interface MegaMenuProps {
  activeMenu: string | null;
  onNavigate: (path: string) => void;
  onClose: () => void;
}

/* ── Component ────────────────────────────────────────────────────── */

export function MegaMenu({ activeMenu, onNavigate, onClose }: MegaMenuProps) {
  if (!activeMenu) return null;

  const handleNav = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="wp-part-mega-menu__backdrop" onClick={onClose} />

      {/* Tours / Expeditions Mega Menu */}
      <div
        className={cn(
          "wp-part-mega-menu",
          activeMenu === "nav-tours" && "wp-part-mega-menu--open"
        )}
        onMouseLeave={onClose}
      >
        {activeMenu === "nav-tours" && (
          <div className="wp-part-mega-menu__inner wp-part-mega-menu__inner--4col">
            {/* Travel Styles */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Travel Styles
              </span>
              {TRAVEL_STYLES.map((ts) => (
                <button
                  key={ts.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/travel-styles/${ts.slug}`)}
                >
                  <Compass className="wp-part-mega-menu__link-icon" />
                  {ts.name}
                </button>
              ))}
              <button
                className="wp-part-mega-menu__view-all"
                onClick={() => handleNav("/tours")}
              >
                View All Tours <ArrowRight className="wp-part-mega-menu__link-icon" />
              </button>
            </div>

            {/* Traveller Types */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Traveller Types
              </span>
              {TRAVELLER_TYPES.map((tt) => (
                <button
                  key={tt.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/traveller-types/${tt.slug}`)}
                >
                  <Users className="wp-part-mega-menu__link-icon" />
                  {tt.name}
                </button>
              ))}
            </div>

            {/* Popular Tours (quick links) */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Popular Experiences
              </span>
              {TOURS.slice(0, 5).map((tour) => (
                <button
                  key={tour.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/tours/${tour.slug}`)}
                >
                  {tour.title}
                </button>
              ))}
            </div>

            {/* Featured */}
            <div className="wp-part-mega-menu__featured">
              {TOURS[0] && (
                <>
                  <img
                    src={TOURS[0].featuredImage}
                    alt={TOURS[0].title}
                    className="wp-part-mega-menu__featured-image"
                    loading="lazy"
                  />
                  <span className="wp-part-mega-menu__featured-title">
                    {TOURS[0].title}
                  </span>
                  <span className="wp-part-mega-menu__featured-text">
                    {TOURS[0].excerpt.substring(0, 80)}…
                  </span>
                  <button
                    className="wp-part-mega-menu__featured-cta"
                    onClick={() => handleNav(`/tours/${TOURS[0].slug}`)}
                  >
                    Explore <ArrowRight className="wp-part-mega-menu__link-icon" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Destinations / Territories Mega Menu */}
      <div
        className={cn(
          "wp-part-mega-menu",
          activeMenu === "nav-destinations" && "wp-part-mega-menu--open"
        )}
        onMouseLeave={onClose}
      >
        {activeMenu === "nav-destinations" && (
          <div className="wp-part-mega-menu__inner wp-part-mega-menu__inner--4col">
            {/* East Africa */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                East Africa
              </span>
              {EAST_AFRICA.filter((d) => d.type === "country").map((c) => (
                <button
                  key={c.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/destinations/${c.slug}`)}
                >
                  <MapPin className="wp-part-mega-menu__link-icon" />
                  {c.title}
                </button>
              ))}
              {/* Popular regions */}
              <span className="wp-part-mega-menu__region-label">
                Top Regions
              </span>
              {EAST_AFRICA.filter(
                (d) => d.type !== "country" && ["masai-mara", "serengeti", "zanzibar", "bwindi", "volcanoes-np"].includes(d.slug)
              ).map((r) => (
                <button
                  key={r.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/destinations/${r.slug}`)}
                >
                  {r.title}
                </button>
              ))}
            </div>

            {/* Southern Africa */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Southern Africa
              </span>
              {SOUTHERN_AFRICA.filter((d) => d.type === "country").map((c) => (
                <button
                  key={c.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/destinations/${c.slug}`)}
                >
                  <MapPin className="wp-part-mega-menu__link-icon" />
                  {c.title}
                </button>
              ))}
              <span className="wp-part-mega-menu__region-label">
                Top Regions
              </span>
              {SOUTHERN_AFRICA.filter(
                (d) => d.type !== "country" && ["cape-town", "greater-kruger", "okavango-delta", "sossusvlei", "victoria-falls-zw"].includes(d.slug)
              ).map((r) => (
                <button
                  key={r.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/destinations/${r.slug}`)}
                >
                  {r.title}
                </button>
              ))}
            </div>

            {/* Indian Ocean Islands */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Indian Ocean Islands
              </span>
              {INDIAN_OCEAN_DESTINATIONS.filter((d) => d.type === "country").map((c) => (
                <button
                  key={c.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/destinations/${c.slug}`)}
                >
                  <MapPin className="wp-part-mega-menu__link-icon" />
                  {c.title}
                </button>
              ))}
              <span className="wp-part-mega-menu__region-label">
                Top Regions
              </span>
              {INDIAN_OCEAN_DESTINATIONS.filter(
                (d) => d.type !== "country"
              ).map((r) => (
                <button
                  key={r.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/destinations/${r.slug}`)}
                >
                  {r.title}
                </button>
              ))}
              <button
                className="wp-part-mega-menu__view-all"
                onClick={() => handleNav("/destinations")}
              >
                View All Destinations <ArrowRight className="wp-part-mega-menu__link-icon" />
              </button>
            </div>

            {/* Featured Destination */}
            <div className="wp-part-mega-menu__featured">
              <img
                src="https://images.unsplash.com/photo-1652778287834-d626affb8eff?w=400"
                alt="Okavango Delta Botswana"
                className="wp-part-mega-menu__featured-image"
                loading="lazy"
              />
              <span className="wp-part-mega-menu__featured-title">
                Okavango Delta
              </span>
              <span className="wp-part-mega-menu__featured-text">
                A UNESCO jewel — mokoro safaris through pristine waterways
              </span>
              <button
                className="wp-part-mega-menu__featured-cta"
                onClick={() => handleNav("/destinations/okavango-delta")}
              >
                Discover <ArrowRight className="wp-part-mega-menu__link-icon" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Accommodation / Sanctuaries Mega Menu */}
      <div
        className={cn(
          "wp-part-mega-menu",
          activeMenu === "nav-accommodation" && "wp-part-mega-menu--open"
        )}
        onMouseLeave={onClose}
      >
        {activeMenu === "nav-accommodation" && (
          <div className="wp-part-mega-menu__inner wp-part-mega-menu__inner--4col">
            {/* Accommodation Types */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Property Types
              </span>
              {ACCOMMODATION_TYPES.map((at) => (
                <button
                  key={at.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/accommodation-types/${at.slug}`)}
                >
                  <Hotel className="wp-part-mega-menu__link-icon" />
                  {at.name}
                </button>
              ))}
              <button
                className="wp-part-mega-menu__view-all"
                onClick={() => handleNav("/accommodation-types")}
              >
                All Types <ArrowRight className="wp-part-mega-menu__link-icon" />
              </button>
            </div>

            {/* Brands */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Collections & Brands
              </span>
              {BRANDS.map((b) => (
                <button
                  key={b.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/brands/${b.slug}`)}
                >
                  <Tag className="wp-part-mega-menu__link-icon" />
                  {b.name}
                </button>
              ))}
              <button
                className="wp-part-mega-menu__view-all"
                onClick={() => handleNav("/facilities")}
              >
                Browse by Facility <ArrowRight className="wp-part-mega-menu__link-icon" />
              </button>
            </div>

            {/* Featured Properties */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Signature Properties
              </span>
              {ACCOMMODATION.slice(0, 5).map((acc) => (
                <button
                  key={acc.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/accommodation/${acc.slug}`)}
                >
                  {acc.title}
                </button>
              ))}
              <button
                className="wp-part-mega-menu__view-all"
                onClick={() => handleNav("/accommodation")}
              >
                View All Properties <ArrowRight className="wp-part-mega-menu__link-icon" />
              </button>
            </div>

            {/* Featured Brand */}
            <div className="wp-part-mega-menu__featured">
              {ACCOMMODATION[0] && (
                <>
                  <img
                    src={ACCOMMODATION[0].featuredImage}
                    alt={ACCOMMODATION[0].title}
                    className="wp-part-mega-menu__featured-image"
                    loading="lazy"
                  />
                  <span className="wp-part-mega-menu__featured-title">
                    {ACCOMMODATION[0].title}
                  </span>
                  <span className="wp-part-mega-menu__featured-text">
                    {ACCOMMODATION[0].excerpt.substring(0, 80)}…
                  </span>
                  <button
                    className="wp-part-mega-menu__featured-cta"
                    onClick={() => handleNav(`/accommodation/${ACCOMMODATION[0].slug}`)}
                  >
                    Explore Property <ArrowRight className="wp-part-mega-menu__link-icon" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Blog / Chronicles Mega Menu */}
      <div
        className={cn(
          "wp-part-mega-menu",
          activeMenu === "nav-blog" && "wp-part-mega-menu--open"
        )}
        onMouseLeave={onClose}
      >
        {activeMenu === "nav-blog" && (
          <div className="wp-part-mega-menu__inner wp-part-mega-menu__inner--3col">
            {/* Blog Categories */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Categories
              </span>
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/categories/${cat.slug}`)}
                >
                  <BookOpen className="wp-part-mega-menu__link-icon" />
                  {cat.name}
                </button>
              ))}
              <button
                className="wp-part-mega-menu__view-all"
                onClick={() => handleNav("/blog")}
              >
                View All Articles <ArrowRight className="wp-part-mega-menu__link-icon" />
              </button>
            </div>

            {/* Resources */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Resources
              </span>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/destination-guides")}>
                Destination Guides
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/packing-guides")}>
                Packing Guides
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/travel-insurance")}>
                Travel Insurance
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/faq")}>
                Travel FAQ
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/reviews")}>
                Traveller Reviews
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/specials")}>
                Special Offers
              </button>
            </div>

            {/* Company */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Company
              </span>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/about")}>
                Our Story
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/team")}>
                Meet the Team
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/sustainability")}>
                Conservation
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/why-book-with-us")}>
                Why Book With Us
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/contact")}>
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Conservation / Sustainability Mega Menu */}
      <div
        className={cn(
          "wp-part-mega-menu",
          activeMenu === "nav-sustainability" && "wp-part-mega-menu--open"
        )}
        onMouseLeave={onClose}
      >
        {activeMenu === "nav-sustainability" && (
          <div className="wp-part-mega-menu__inner wp-part-mega-menu__inner--4col">
            {/* Our Impact */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Our Impact
              </span>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/sustainability")}>
                <Leaf className="wp-part-mega-menu__link-icon" />
                Conservation Vision
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/sustainability")}>
                <TreePine className="wp-part-mega-menu__link-icon" />
                Reforestation Projects
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/sustainability")}>
                <Shield className="wp-part-mega-menu__link-icon" />
                Anti-Poaching Support
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/sustainability")}>
                <Heart className="wp-part-mega-menu__link-icon" />
                Community Partnerships
              </button>
            </div>

            {/* Conservation Partners */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Conservation Partners
              </span>
              {BRANDS.slice(0, 4).map((brand) => (
                <button
                  key={brand.id}
                  className="wp-part-mega-menu__link"
                  onClick={() => handleNav(`/brands/${brand.slug}`)}
                >
                  {brand.name}
                </button>
              ))}
            </div>

            {/* Conservation Travel Styles */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Travel with Purpose
              </span>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/travel-styles/wildlife")}>
                <Compass className="wp-part-mega-menu__link-icon" />
                Wildlife Safaris
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/travel-styles/walking-safari")}>
                <Compass className="wp-part-mega-menu__link-icon" />
                Walking Safaris
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/travel-styles/photography")}>
                <Compass className="wp-part-mega-menu__link-icon" />
                Photography Safaris
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/travel-styles/cultural")}>
                <Compass className="wp-part-mega-menu__link-icon" />
                Cultural Journeys
              </button>
              <button
                className="wp-part-mega-menu__view-all"
                onClick={() => handleNav("/sustainability")}
              >
                Our Conservation Story <ArrowRight className="wp-part-mega-menu__link-icon" />
              </button>
            </div>

            {/* Featured Conservation */}
            <div className="wp-part-mega-menu__featured">
              <img
                src="https://images.unsplash.com/photo-1772290950495-63d4a55f3aec?w=400"
                alt="Rhino conservation Africa"
                className="wp-part-mega-menu__featured-image"
                loading="lazy"
              />
              <span className="wp-part-mega-menu__featured-title">
                Protecting Africa's Heritage
              </span>
              <span className="wp-part-mega-menu__featured-text">
                Every journey contributes directly to conservation and community development
              </span>
              <button
                className="wp-part-mega-menu__featured-cta"
                onClick={() => handleNav("/sustainability")}
              >
                Learn More <ArrowRight className="wp-part-mega-menu__link-icon" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* The Studio / About Mega Menu */}
      <div
        className={cn(
          "wp-part-mega-menu",
          activeMenu === "nav-about" && "wp-part-mega-menu--open"
        )}
        onMouseLeave={onClose}
      >
        {activeMenu === "nav-about" && (
          <div className="wp-part-mega-menu__inner wp-part-mega-menu__inner--4col">
            {/* About */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                The Company
              </span>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/about")}>
                <Building2 className="wp-part-mega-menu__link-icon" />
                Our Story
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/team")}>
                <Users className="wp-part-mega-menu__link-icon" />
                Meet the Team
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/why-book-with-us")}>
                <Star className="wp-part-mega-menu__link-icon" />
                Why Book With Us
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/reviews")}>
                <Star className="wp-part-mega-menu__link-icon" />
                Traveller Reviews
              </button>
            </div>

            {/* Get in Touch */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Get in Touch
              </span>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/contact")}>
                <Phone className="wp-part-mega-menu__link-icon" />
                Contact Us
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/quote-request")}>
                <Compass className="wp-part-mega-menu__link-icon" />
                Request a Quote
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/trip-planner")}>
                <MapPin className="wp-part-mega-menu__link-icon" />
                Trip Planner
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/newsletter")}>
                <Heart className="wp-part-mega-menu__link-icon" />
                Newsletter Signup
              </button>
            </div>

            {/* Resources */}
            <div className="wp-part-mega-menu__column">
              <span className="wp-part-mega-menu__column-title">
                Resources
              </span>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/faq")}>
                <HelpCircle className="wp-part-mega-menu__link-icon" />
                Travel FAQ
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/destination-guides")}>
                <BookOpen className="wp-part-mega-menu__link-icon" />
                Destination Guides
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/packing-guides")}>
                <BookOpen className="wp-part-mega-menu__link-icon" />
                Packing Guides
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/travel-insurance")}>
                <Shield className="wp-part-mega-menu__link-icon" />
                Travel Insurance
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/terms-conditions")}>
                Terms & Conditions
              </button>
              <button className="wp-part-mega-menu__link" onClick={() => handleNav("/privacy-policy")}>
                Privacy Policy
              </button>
            </div>

            {/* Featured */}
            <div className="wp-part-mega-menu__featured">
              <img
                src="https://images.unsplash.com/photo-1709403229285-35ed7d88a79b?w=400"
                alt="Safari guides team"
                className="wp-part-mega-menu__featured-image"
                loading="lazy"
              />
              <span className="wp-part-mega-menu__featured-title">
                Expert Safari Designers
              </span>
              <span className="wp-part-mega-menu__featured-text">
                Our team of Africa specialists craft bespoke journeys tailored to your dreams
              </span>
              <button
                className="wp-part-mega-menu__featured-cta"
                onClick={() => handleNav("/team")}
              >
                Meet the Team <ArrowRight className="wp-part-mega-menu__link-icon" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MegaMenu;