/**
 * Collapsible Filter Panel Pattern Component
 *
 * Renders an animated, expandable panel of chip-group filter columns
 * with a reset action. Extracts ~60 lines of duplicated JSX from
 * archive templates that use inline AnimatePresence + chip groups.
 *
 * WordPress Mapping:
 * - Pattern: lightspeed/collapsible-filter-panel
 * - Block equivalent: core/group with collapse interaction
 *
 * @module CollapsibleFilterPanel
 * @category patterns
 */

import { motion as Motion, AnimatePresence } from "motion/react";
import { X } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import "../../../styles/patterns/collapsible-filter-panel.css";

/** A single chip item in a filter group */
export interface FilterChipItem {
  id: string;
  label: string;
}

/** A column of selectable chips with a heading */
export interface FilterChipGroup {
  /** Unique key for this group */
  id: string;
  /** Column heading text */
  title: string;
  /** Icon rendered alongside the title */
  icon: ReactNode;
  /** Available chip options */
  items: FilterChipItem[];
  /** Currently selected chip IDs */
  selectedIds: string[];
  /** Toggle handler — called with chip ID */
  onToggle: (id: string) => void;
}

export interface CollapsibleFilterPanelProps {
  /** Controls panel visibility (drives AnimatePresence) */
  isOpen: boolean;
  /** Array of filter chip groups to render as columns */
  groups: FilterChipGroup[];
  /** Reset handler — clears all selections */
  onReset: () => void;
  /** Optional reset button label (default: "Reset Selections") */
  resetLabel?: string;
  /** Optional className for the outer wrapper */
  className?: string;
}

/**
 * CollapsibleFilterPanel renders an animated panel of chip-group
 * columns with a reset action.
 *
 * Uses `.wp-pattern-filter-panel__*` BEM classes from
 * collapsible-filter-panel.css.
 */
export function CollapsibleFilterPanel({
  isOpen,
  groups,
  onReset,
  resetLabel = "Reset Selections",
  className,
}: CollapsibleFilterPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={`wp-pattern-filter-panel${className ? ` ${className}` : ""}`}
        >
          <div className="wp-pattern-filter-panel__grid">
            {groups.map((group) => (
              <div key={group.id} className="wp-pattern-filter-panel__column">
                <h4 className="wp-pattern-filter-panel__title">
                  {group.icon} {group.title}
                </h4>
                <div className="wp-pattern-filter-panel__chip-group">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => group.onToggle(item.id)}
                      className={`wp-pattern-filter-panel__chip${
                        group.selectedIds.includes(item.id)
                          ? " wp-pattern-filter-panel__chip--active"
                          : ""
                      }`}
                      aria-pressed={group.selectedIds.includes(item.id)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Reset action column */}
            <div className="wp-pattern-filter-panel__column wp-pattern-filter-panel__column--actions">
              <button
                onClick={onReset}
                className="wp-pattern-filter-panel__reset"
              >
                <X className="size-3" /> {resetLabel}
              </button>
            </div>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}

export default CollapsibleFilterPanel;
