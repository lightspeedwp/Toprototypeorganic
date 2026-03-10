/**
 * Taxonomy Navigation Pattern - WordPress BEM CSS Version
 * 
 * Displays a horizontal list of taxonomy terms (e.g., Travel Styles,
 * Accommodation Types) as clickable filter buttons. Used for filtering
 * archive pages and providing quick navigation between related content.
 * 
 * **Features:**
 * - Horizontal list of term buttons (Desktop)
 * - Mobile-specific "Filters" button with bottom sheet menu
 * - Active state indication
 * - Hover states for interaction
 * - Keyboard accessible
 * - Auto-closes mobile menu on selection
 * 
 * **WordPress Mapping:**
 * 
 * Equivalent to `lightspeed/taxonomy-nav` block pattern.
 * In WordPress, this would be composed of:
 * - core/group (outer navigation wrapper)
 * - core/buttons (button container)
 * - core/button (each term button)
 * 
 * **Design System:**
 * - Buttons: Border outline, primary on active via CSS
 * - Active state: Primary background and text
 * - Hover state: Primary border and text color
 * - Spacing: Consistent gaps between buttons
 * 
 * **CSS:**
 * Styles defined in /src/styles/patterns/taxonomy-nav.css
 * Uses WordPress BEM methodology: .wp-pattern-taxonomy-nav__*
 * 
 * @module TaxonomyNav
 * @category patterns
 * @wordpressPattern lightspeed/taxonomy-nav
 */

import { useState } from "react";
import { Faders, X } from "@phosphor-icons/react";
import { Container } from "../common/Container";
import { cn } from "../../lib/utils";

/**
 * Props for the TaxonomyNav pattern component.
 */
interface TaxonomyNavProps {
  /** Label for the taxonomy (e.g., "Style", "Category") */
  label?: string;
  /** Array of taxonomy terms to display as filter buttons. */
  terms: Array<{
    id: string;
    name: string;
    slug: string;
    count?: number;
  }>;
  /** ID of the currently active/selected term. */
  activeId?: string;
  /** Callback function triggered when a term button is clicked. */
  onTermClick?: (id: string) => void;
  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * Taxonomy Navigation pattern component.
 */
export function TaxonomyNav({ 
  label = "Filter",
  terms = [], 
  activeId, 
  onTermClick, 
  className 
}: TaxonomyNavProps) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTermClick = (id: string) => {
    if (onTermClick) {
      onTermClick(id);
    }
    setMobileMenuOpen(false);
  };

  const activeTerm = terms.find(t => t.id === activeId);
  const activeLabel = activeTerm ? activeTerm.name : `All ${label}s`;

  return (
    <section className={cn("wp-pattern-taxonomy-nav", className)}>
      <Container>
        {/* Desktop Navigation */}
        <nav className="wp-pattern-taxonomy-nav__desktop">
          <div className="wp-pattern-taxonomy-nav__label">
            {label}:
          </div>
          <div className="wp-pattern-taxonomy-nav__items">
            <button
              onClick={() => handleTermClick('')}
              className={cn(
                "wp-pattern-taxonomy-nav__item",
                (!activeId || activeId === '') && "wp-pattern-taxonomy-nav__item--active"
              )}
            >
              All {label}s
            </button>
            {terms.map((term) => (
              <button
                key={term.id}
                onClick={() => handleTermClick(term.id)}
                className={cn(
                  "wp-pattern-taxonomy-nav__item",
                  activeId === term.id && "wp-pattern-taxonomy-nav__item--active"
                )}
              >
                <span>{term.name}</span>
                {term.count !== undefined && (
                  <span className="wp-pattern-taxonomy-nav__count">{term.count}</span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="wp-pattern-taxonomy-nav__mobile">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="wp-pattern-taxonomy-nav__mobile-trigger"
          >
            <Faders size={18} />
            <span>{label}: {activeLabel}</span>
          </button>
        </div>

        {/* Mobile Bottom Sheet Menu */}
        {isMobileMenuOpen && (
          <div className="wp-pattern-taxonomy-nav__mobile-overlay">
            <div 
              className="wp-pattern-taxonomy-nav__mobile-backdrop"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="wp-pattern-taxonomy-nav__mobile-sheet">
              <div className="wp-pattern-taxonomy-nav__mobile-header">
                <h3>Filter by {label}</h3>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="wp-pattern-taxonomy-nav__mobile-close"
                  aria-label="Close filters"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="wp-pattern-taxonomy-nav__mobile-list">
                <button
                  onClick={() => handleTermClick('')}
                  className={cn(
                    "wp-pattern-taxonomy-nav__mobile-item",
                    (!activeId || activeId === '') && "wp-pattern-taxonomy-nav__mobile-item--active"
                  )}
                >
                  All {label}s
                </button>
                {terms.map((term) => (
                  <button
                    key={term.id}
                    onClick={() => handleTermClick(term.id)}
                    className={cn(
                      "wp-pattern-taxonomy-nav__mobile-item",
                      activeId === term.id && "wp-pattern-taxonomy-nav__mobile-item--active"
                    )}
                  >
                    <span>{term.name}</span>
                    {term.count !== undefined && (
                      <span className="wp-pattern-taxonomy-nav__mobile-count">({term.count})</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="wp-pattern-taxonomy-nav__mobile-footer">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="wp-pattern-taxonomy-nav__mobile-done"
                >
                  Close Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}