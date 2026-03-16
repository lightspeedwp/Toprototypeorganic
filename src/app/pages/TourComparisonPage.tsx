/**
 * Tour Comparison Page - Side-by-Side Tour Comparison
 * 
 * A comprehensive comparison tool for evaluating multiple tours
 * side-by-side across features, pricing, itineraries, and reviews.
 * 
 * **WordPress Mapping:**
 * - Template: page-tour-comparison.php
 * - Post Type: page
 * 
 * **Adheres to Design System:**
 * - Uses BEM CSS classes from /src/styles/pages/tour-comparison.css
 * - Avoiding Tailwind utility classes for layout/styling
 * - Semantic HTML structure
 * 
 * @module TourComparisonPage
 * @category pages
 */

import React, { useState } from "react";
import { Container } from "../components/common/Container";
import {
  X,
  Check,
  Minus,
  Calendar,
  MapPin,
  CurrencyDollar as DollarSign,
  Heart,
  ShareNetwork as Share2,
  ArrowRight,
  Plus,
  Users,
  Medal as Award,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { ALL_TOURS as TOURS } from "../data/mockExpanded";
import type { Tour } from "../data/types";
import { useNavigation } from "../contexts/NavigationContext";
import { motion as Motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { HeadingBlock } from "../components/blocks/core/HeadingBlock";
import { ParagraphBlock } from "../components/blocks/core/ParagraphBlock";
import "../../styles/pages/tour-comparison.css";

/**
 * Comparison feature row definition.
 */
interface ComparisonFeature {
  category: string;
  features: {
    label: string;
    values: (tour: Tour) => string | number | boolean | null;
    type: "text" | "number" | "boolean" | "price";
  }[];
}

export function TourComparisonPage() {
  const { navigateTo, navigateToTour } = useNavigation();
  
  // Select first 3 tours for comparison initially
  const [selectedTours, setSelectedTours] = useState<Tour[]>(TOURS.slice(0, 3));

  /**
   * Remove tour from comparison.
   */
  const handleRemoveTour = (tourId: string) => {
    setSelectedTours((prev) => prev.filter((tour) => tour.id !== tourId));
    toast.success("Tour removed from comparison");
  };

  /**
   * Add tour to comparison (Mock functionality).
   */
  const handleAddTour = () => {
    if (selectedTours.length >= 3) {
      toast.error("You can compare up to 3 tours at once");
      return;
    }
    // Logic to add a tour that isn't already selected
    const remainingTours = TOURS.filter(t => !selectedTours.some(st => st.id === t.id));
    if (remainingTours.length > 0) {
      setSelectedTours(prev => [...prev, remainingTours[0]]);
      toast.success(`${remainingTours[0].title} added to comparison`);
    } else {
      toast.info("No more tours available to add");
    }
  };

  /**
   * Share comparison.
   */
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success("Comparison link copied to clipboard!");
  };

  /**
   * Comparison features configuration.
   */
  const comparisonFeatures: ComparisonFeature[] = [
    {
      category: "Quick Specs",
      features: [
        { label: "Destination", values: (tour) => tour.destination, type: "text" },
        { label: "Duration", values: (tour) => `${tour.duration} days`, type: "text" },
        { label: "Group Size", values: (tour) => `Max ${tour.groupSize}`, type: "text" },
        { label: "Difficulty", values: (tour) => tour.difficulty, type: "text" },
      ],
    },
    {
      category: "Investment",
      features: [
        { label: "Base Price", values: (tour) => tour.pricing.basePrice, type: "price" },
        { label: "Single Supplement", values: (tour) => tour.pricing.singleSupplement || 0, type: "price" },
        { label: "Deposit Required", values: (tour) => tour.pricing.deposit || 0, type: "price" },
      ],
    },
    {
      category: "Hospitality",
      features: [
        { label: "Accommodation", values: (tour) => tour.accommodation || "Luxury Tents/Lodges", type: "text" },
        { label: "Meals", values: (tour) => tour.mealsIncluded || "Full Board", type: "text" },
        { label: "Private Transport", values: (tour) => tour.transport || "4x4 Land Cruiser", type: "text" },
      ],
    },
    {
      category: "What's Included",
      features: [
        { label: "Airport Transfers", values: (tour) => tour.airportTransfers !== false, type: "boolean" },
        { label: "Park Fees", values: (tour) => true, type: "boolean" }, // Mocked inclusion
        { label: "Flights", values: (tour) => tour.flightsIncluded || false, type: "boolean" },
        { label: "Travel Insurance", values: (tour) => tour.insuranceIncluded || false, type: "boolean" },
      ],
    },
    {
      category: "Reputation",
      features: [
        { label: "Rating", values: (tour) => tour.reviewScore || 4.9, type: "number" },
        { label: "Reviews", values: (tour) => tour.reviewCount || 12, type: "number" },
      ],
    },
  ];

  /**
   * Render feature value with appropriate formatting.
   */
  const renderValue = (
    value: string | number | boolean | null,
    type: "text" | "number" | "boolean" | "price"
  ) => {
    if (value === null || value === undefined) {
      return <Minus className="size-4 opacity-30" />;
    }

    switch (type) {
      case "boolean":
        return value ? (
          <Check className="size-5 text-primary" />
        ) : (
          <X className="size-5 opacity-20" />
        );
      case "price":
        return <span className="font-bold text-foreground">${(value as number).toLocaleString()}</span>;
      case "number":
        return <span className="font-semibold text-foreground">{value}</span>;
      default:
        return <span className="text-foreground">{value as string}</span>;
    }
  };

  const hasToursToCompare = selectedTours.length >= 1;

  return (
    <article className="wp-template-tour-comparison">
      {/* Hero Section */}
      <section className="wp-comparison-hero">
        <Container>
          <div className="wp-comparison-hero__content">
            <HeadingBlock level={1} className="wp-comparison-hero__title">
              Compare Your Journeys
            </HeadingBlock>
            <ParagraphBlock className="wp-comparison-hero__description">
              Analyze your favorite African expeditions side-by-side. From pricing to exclusive inclusions, 
              find the perfect match for your travel style.
            </ParagraphBlock>

            <div className="wp-comparison-hero__actions">
              <button
                onClick={handleAddTour}
                disabled={selectedTours.length >= 3}
                className="button button--outline"
              >
                <Plus className="size-4" />
                Add Expedition
              </button>
              {selectedTours.length >= 2 && (
                <button onClick={handleShare} className="button button--ghost">
                  <Share2 className="size-4" />
                  Share Comparison
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Comparison Content */}
      <section className="wp-comparison-content section">
        <Container>
          {hasToursToCompare ? (
            <Motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="wp-comparison-main"
            >
              {/* Main Comparison Table */}
              <div className="wp-comparison-table-wrapper">
                <table className="wp-comparison-table">
                  <thead>
                    <tr className="wp-comparison-table__head-row">
                      {/* Corner Cell */}
                      <th className="wp-comparison-table__corner-cell"></th>
                      
                      {/* Tour Headers */}
                      {selectedTours.map((tour) => (
                        <th key={tour.id} className="wp-comparison-table__tour-header">
                          <div className="wp-comparison-table__tour-card">
                            <button
                              onClick={() => handleRemoveTour(tour.id)}
                              className="button button--destructive button--sm wp-comparison-table__remove-btn rounded-full"
                              title="Remove from comparison"
                            >
                              <X className="size-3" />
                            </button>

                            <div className="wp-comparison-table__image-wrapper">
                              <ImageWithFallback
                                src={tour.featuredImage}
                                alt={tour.title}
                                className="wp-comparison-table__image"
                              />
                            </div>

                            <HeadingBlock level={3} className="wp-comparison-table__tour-title">
                              {tour.title}
                            </HeadingBlock>

                            <div className="wp-comparison-table__tour-meta">
                              <div className="wp-comparison-table__meta-item">
                                <MapPin className="size-3" /> {tour.destination}
                              </div>
                              <div className="wp-comparison-table__meta-item">
                                <Calendar className="size-3" /> {tour.duration} Days
                              </div>
                            </div>

                            <div className="wp-comparison-table__price">
                              ${tour.pricing.basePrice.toLocaleString()}
                            </div>

                            <button
                              onClick={() => navigateToTour(tour.slug)}
                              className="button button--primary button--sm"
                            >
                              View Tour <ArrowRight className="size-3" />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  
                  <tbody>
                    {comparisonFeatures.map((cat, catIdx) => (
                      <React.Fragment key={catIdx}>
                        {/* Category Heading Row */}
                        <tr className="wp-comparison-table__category-row">
                          <td 
                            colSpan={selectedTours.length + 1} 
                            className="wp-comparison-table__category-cell"
                          >
                            {cat.category}
                          </td>
                        </tr>

                        {/* Feature Rows */}
                        {cat.features.map((feature, featIdx) => (
                          <tr key={featIdx} className="wp-comparison-table__feature-row">
                            <td className="wp-comparison-table__label-cell">
                              {feature.label}
                            </td>
                            {selectedTours.map((tour) => (
                              <td key={tour.id} className="wp-comparison-table__value-cell">
                                {renderValue(feature.values(tour), feature.type)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Unique Highlights Comparison */}
              <HeadingBlock level={2} className="pt-12 pb-8">
                Distinctive Highlights
              </HeadingBlock>
              
              <div className="wp-comparison-highlights">
                {selectedTours.map((tour) => (
                  <div key={tour.id} className="wp-comparison-highlights__card">
                    <HeadingBlock level={4} className="pb-4">
                      {tour.title}
                    </HeadingBlock>
                    <ul className="wp-comparison-highlights__list">
                      {tour.highlights.slice(0, 5).map((h, i) => (
                        <li key={i} className="wp-comparison-highlights__item">
                          <Check className="wp-comparison-highlights__icon size-4" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Motion.div>
          ) : (
            /* Empty State */
            <div className="wp-comparison-empty">
              <div className="wp-comparison-empty__icon-wrapper">
                <Users className="size-12" />
              </div>
              <HeadingBlock level={2} className="wp-comparison-empty__title">
                Start Your Comparison
              </HeadingBlock>
              <ParagraphBlock className="wp-comparison-empty__description">
                You haven't selected any tours to compare yet. Add at least two expeditions 
                to see how they stack up against each other.
              </ParagraphBlock>
              <button
                onClick={() => navigateTo("/tours")}
                className="button button--primary button--lg"
              >
                Browse Expeditions <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* Comparison Tips */}
      {selectedTours.length >= 2 && (
        <section className="wp-comparison-tips">
          <Container>
            <div className="wp-comparison-tips__card">
              <div className="flex items-center gap-3 pb-6">
                <Award className="size-6 text-primary" />
                <HeadingBlock level={3} className="m-0">Expert Comparison Advice</HeadingBlock>
              </div>
              <ul className="wp-comparison-highlights__list">
                {[
                  "Look beyond the base price — check what's included in 'What's Included'.",
                  "Compare group sizes — smaller groups often provide more intimate wildlife encounters.",
                  "Consider the travel style — luxury focusing on comfort vs. adventure focusing on proximity.",
                  "Check the number of destinations covered per week to gauge the pace of the journey."
                ].map((tip, i) => (
                  <li key={i} className="wp-comparison-highlights__item">
                    <div className="size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 translate-y-0.5 font-bold text-xs">
                      {i + 1}
                    </div>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      {/* Final CTA */}
      <CTA
        title="Still Can't Decide?"
        description="Our safari specialists can help you find the exact right fit for your interests and budget."
        variant="gradient"
        primaryAction={{ label: "Talk to an Expert", onClick: () => navigateTo("/contact") }}
        secondaryAction={{ label: "Start Trip Planner", onClick: () => navigateTo("/trip-planner") }}
      />
    </article>
  );
}

export default TourComparisonPage;