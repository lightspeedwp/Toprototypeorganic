/**
 * Active Filter Summary Pattern Component
 * 
 * Renders a horizontal bar showing currently-active filter tags
 * with individual remove buttons and a "Clear all" action.
 * Reusable across all archive templates for consistent UX.
 * Animated enter/exit for each tag via Motion.
 * 
 * WordPress Mapping:
 * - Pattern: lightspeed/active-filters
 * - Block: core/group (with query filter context)
 * 
 * @module ActiveFilterSummary
 * @category patterns
 */

import { X } from "@phosphor-icons/react";
import { motion as Motion, AnimatePresence } from "motion/react";

export interface ActiveFilterTag {
  /** Unique key for React list rendering */
  id: string;
  /** Display label shown inside the tag */
  label: string;
  /** Callback fired when the individual tag's remove button is clicked */
  onRemove: () => void;
}

/* ================================================================
   Filter Tag Builder Utilities
   
   Pure helper functions that standardise how each archive template
   constructs its ActiveFilterTag[] array. Eliminates duplicated
   inline spread/map/conditional logic across all 5 templates.
   ================================================================ */

/**
 * Creates a search-query tag (shown as `"query text"`).
 * Returns an empty array when the query is blank.
 */
export function searchFilterTag(
  query: string,
  onClear: () => void
): ActiveFilterTag[] {
  return query
    ? [{ id: "search-query", label: `"${query}"`, onRemove: onClear }]
    : [];
}

/**
 * Creates a tag for a single-value filter (e.g. category, continent, rating).
 * Returns an empty array when the value matches its default (inactive) state.
 */
export function singleFilterTag(
  key: string,
  value: string | undefined,
  label: string,
  onClear: () => void,
  defaultValue: string = ""
): ActiveFilterTag[] {
  return value && value !== defaultValue
    ? [{ id: `${key}-${value}`, label, onRemove: onClear }]
    : [];
}

/**
 * Creates tags for a multi-value (array) filter (e.g. travel styles, facilities).
 * Each item gets its own removable tag.
 */
export function multiFilterTags(
  key: string,
  items: Array<{ id: string; label: string }>,
  onRemoveOne: (id: string) => void
): ActiveFilterTag[] {
  return items.map((item) => ({
    id: `${key}-${item.id}`,
    label: item.label,
    onRemove: () => onRemoveOne(item.id),
  }));
}

/**
 * Concatenates multiple tag arrays into a single flat array.
 * Convenience wrapper to keep template JSX clean.
 */
export function buildFilterTags(
  ...groups: ActiveFilterTag[][]
): ActiveFilterTag[] {
  return groups.flat();
}

interface ActiveFilterSummaryProps {
  /** Array of active filter tags to display */
  tags: ActiveFilterTag[];
  /** Callback fired when "Clear all" is clicked */
  onClearAll: () => void;
  /** Optional className for the wrapper */
  className?: string;
}

/**
 * ActiveFilterSummary renders a summary bar of active filters.
 * 
 * Uses `.wp-pattern-active-filters` BEM block from facility-chips.css.
 * Wraps content in AnimatePresence internally — callers do NOT need
 * to wrap in AnimatePresence or conditionally render.
 */
export function ActiveFilterSummary({ tags, onClearAll, className }: ActiveFilterSummaryProps) {
  return (
    <AnimatePresence>
      {tags.length > 0 && (
        <Motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className={`wp-pattern-active-filters${className ? ` ${className}` : ""}`}
          role="status"
          aria-live="polite"
        >
          <span className="wp-pattern-active-filters__label">
            Active filters ({tags.length}):
          </span>
          <div className="wp-pattern-active-filters__list">
            <AnimatePresence mode="popLayout">
              {tags.map((tag) => (
                <Motion.button
                  key={tag.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  type="button"
                  className="wp-pattern-active-filters__tag"
                  onClick={tag.onRemove}
                  aria-label={`Remove ${tag.label} filter`}
                >
                  <span>{tag.label}</span>
                  <X size={12} weight="bold" />
                </Motion.button>
              ))}
            </AnimatePresence>
          </div>
          <button
            type="button"
            className="wp-pattern-active-filters__clear"
            onClick={onClearAll}
          >
            Clear all
          </button>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}

export default ActiveFilterSummary;