/**
 * Related Regions Block
 * 
 * Displays regions (child destinations) related to the current destination.
 * Helps users explore sub-regions or nearby areas.
 * 
 * **WordPress Mapping:**
 * Block slug: lsx-tour-operator/related-regions
 * Category: Tour Operator
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Lora for headings, Noto Sans for body text
 * - section-content-supporting style class
 * 
 * @module RelatedRegionsBlock
 * @category blocks/tour-operator
 * @see /guidelines/blocks/related-regions.md
 */

import React from "react";
import { MapPin } from "@phosphor-icons/react";
import './RelatedRegionsBlock.css';
import { Container } from "../../common/Container";
import { DESTINATIONS } from "../../../data/mock";
import type { Destination } from "../../../data/types";

/**
 * Props for the RelatedRegionsBlock component
 */
interface RelatedRegionsBlockProps {
  /** Heading text */
  title?: string;
  /** The ID of the parent region to query */
  parentId: string;
  /** Layout type (list or grid) */
  layout?: "list" | "grid";
  /** Number of columns if using grid layout */
  columns?: number;
  /** Additional CSS classes */
  className?: string;
  /** Navigation callback for region clicks */
  onNavigate?: (slug: string) => void;
}

/**
 * Get child regions for a parent destination
 */
function getChildRegions(parentId: string): Destination[] {
  return DESTINATIONS.filter(dest => dest.parentId === parentId);
}

/**
 * Region List Item Component
 */
function RegionListItem({
  region,
  onClick,
}: {
  region: Destination;
  onClick?: () => void;
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="wp-block-lts-related-regions__list-btn"
      >
        <div className="wp-icon-container-primary wp-bg-primary-hover">
          <MapPin />
        </div>
        <div className="wp-block-lts-related-regions__list-content">
          <h3 className="wp-block-lts-related-regions__list-title">
            {region.name}
          </h3>
          {region.tagline && (
            <p className="wp-block-lts-related-regions__list-tagline">
              {region.tagline}
            </p>
          )}
        </div>
        <svg
          className="wp-block-lts-related-regions__list-arrow"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </li>
  );
}

/**
 * Region Grid Item Component
 */
function RegionGridItem({
  region,
  onClick,
}: {
  region: Destination;
  onClick?: () => void;
}) {
  return (
    <article>
      <button
        onClick={onClick}
        className="wp-block-lts-related-regions__grid-btn"
      >
        <div className="wp-block-lts-related-regions__grid-content-wrapper">
          <div className="wp-icon-container-primary-hover">
            <MapPin />
          </div>
          <div className="wp-block-lts-related-regions__grid-content">
            <h3 className="wp-block-lts-related-regions__grid-title">
              {region.name}
            </h3>
            {region.tagline && (
              <p className="wp-block-lts-related-regions__grid-tagline">
                {region.tagline}
              </p>
            )}
          </div>
        </div>
      </button>
    </article>
  );
}

/**
 * Related Regions Block Component
 * 
 * Displays child regions of a parent destination.
 * 
 * @param {RelatedRegionsBlockProps} props - Component properties
 * @returns {JSX.Element} Rendered related regions block
 * 
 * @example
 * <RelatedRegionsBlock
 *   parentId="dest-1"
 *   layout="grid"
 *   columns={3}
 *   onNavigate={(slug) => console.log(slug)}
 * />
 */
export function RelatedRegionsBlock({
  title = "Explore Nearby Regions",
  parentId,
  layout = "grid",
  columns = 3,
  className = "",
  onNavigate,
}: RelatedRegionsBlockProps) {
  const regions = getChildRegions(parentId);

  // Don't render if no child regions
  if (regions.length === 0) {
    return null;
  }

  return (
    <section className={`section-content-supporting wp-block-lts-related-regions ${className}`}>
      <Container>
        {/* Section Header */}
        <div className="wp-block-lts-related-regions__header">
          <h2 className="wp-block-lts-related-regions__title">{title}</h2>
          <div className="wp-block-lts-related-regions__divider" />
          <p className="wp-block-lts-related-regions__subtitle">
            {regions.length} {regions.length === 1 ? "region" : "regions"} to explore
          </p>
        </div>

        {/* Regions List/Grid */}
        {layout === "list" ? (
          <ul className="wp-block-lts-related-regions__list">
            {regions.map((region) => (
              <RegionListItem
                key={region.id}
                region={region}
                onClick={() => onNavigate?.(region.slug)}
              />
            ))}
          </ul>
        ) : (
          <div
            className="wp-block-lts-related-regions__grid"
            style={{
              '--grid-columns': Math.min(columns, 4),
            } as React.CSSProperties}
          >
            {regions.map((region) => (
              <RegionGridItem
                key={region.id}
                region={region}
                onClick={() => onNavigate?.(region.slug)}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}