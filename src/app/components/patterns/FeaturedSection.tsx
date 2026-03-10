/**
 * Generic Featured Section component.
 *
 * This pattern provides a consistent wrapper for any section that displays
 * a grid of cards (tours, destinations, accommodation, etc.) with a header
 * and an optional "View All" button.
 */

import { Container } from "../common/Container";
import { SectionHeader } from "../common/SectionHeader";
import { ViewAllButton } from "../common/ViewAllButton";
import { cn } from "../../lib/utils";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

/**
 * Props for the FeaturedSection component.
 */
interface FeaturedSectionProps<T extends { id: string | number }> {
  /** CSS class for the section wrapper element. */
  className?: string;
  /** Section header data and optional icon/prefix. */
  header: {
    eyebrow?: string;
    title: string;
    description: string;
    icon?: PhosphorIcon;
    prefix?: string;
  };
  /** Array of items to display in the grid. */
  items: T[];
  /** CSS class for the grid wrapper element. */
  gridClassName?: string;
  /** Function to render each card item. */
  renderCard: (item: T) => React.ReactNode;
  /** Optional configuration for the View All button. */
  viewAll?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "outline" | "ghost";
  };
  /** Optional children to render below the grid but above the view all button. */
  children?: React.ReactNode;
}

/**
 * FeaturedSection Component.
 */
export function FeaturedSection<T extends { id: string | number }>({
  className,
  header,
  items,
  gridClassName,
  renderCard,
  viewAll,
  children,
}: FeaturedSectionProps<T>) {
  return (
    <section className={cn("wp-featured-section", className)}>
      <Container>
        <SectionHeader
          section={{
            eyebrow: header.eyebrow,
            title: header.title,
            description: header.description,
          }}
          icon={header.icon}
          prefix={header.prefix || "wp-featured-section"}
        />

        <div className={cn("wp-featured-section__grid", gridClassName)}>
          {items.map((item) => (
            <div key={item.id} className="wp-featured-section__item">
              {renderCard(item)}
            </div>
          ))}
        </div>

        {children}

        {viewAll && (
          <div className="wp-featured-section__footer">
            <ViewAllButton
              label={viewAll.label}
              onClick={viewAll.onClick}
              variant={viewAll.variant}
            />
          </div>
        )}
      </Container>
    </section>
  );
}

export default FeaturedSection;
