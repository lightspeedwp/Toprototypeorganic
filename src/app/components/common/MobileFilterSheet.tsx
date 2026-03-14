/**
 * Mobile Filter Sheet component.
 * 
 * Provides a slide-up sheet interface for filtering archives on mobile devices.
 * Used on tour archives, destination archives, and other filterable listings.
 * 
 * **Features:**
 * - Slide-up sheet with backdrop
 * - Multiple filter categories
 * - Clear all filters action
 * - Apply/close controls
 * - Smooth animations
 * 
 * @module MobileFilterSheet
 * @category common
 */

import { X, Faders, Check } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

/**
 * Filter option interface.
 * 
 * @interface FilterOption
 */
interface FilterOption {
  /** Option ID */
  id: string;
  /** Display label */
  label: string;
  /** Number of items with this filter */
  count?: number;
}

/**
 * Filter category interface.
 * 
 * @interface FilterCategory
 */
interface FilterCategory {
  /** Category ID */
  id: string;
  /** Category display name */
  label: string;
  /** Available options */
  options: FilterOption[];
}

/**
 * Props for the MobileFilterSheet component.
 * 
 * @interface MobileFilterSheetProps
 */
interface MobileFilterSheetProps {
  /** Whether the sheet is open */
  isOpen: boolean;
  /** Callback when sheet should close */
  onClose: () => void;
  /** Available filter categories */
  categories: FilterCategory[];
  /** Currently selected filter IDs */
  selectedFilters: string[];
  /** Callback when filters change */
  onFiltersChange: (filterIds: string[]) => void;
  /** Optional callback when Apply is clicked */
  onApply?: () => void;
}

/**
 * Mobile Filter Sheet component.
 * 
 * A mobile-optimized slide-up sheet for filtering content on archive pages.
 * Replaces desktop sidebar filters with a touch-friendly interface.
 * 
 * **Usage:**
 * - Triggered by "Filter" button on mobile archive pages
 * - Shows all available filter categories
 * - Allows multi-select within categories
 * - "Clear All" resets all filters
 * - "Apply" closes sheet and applies filters
 * 
 * **Mobile UX:**
 * - Slides up from bottom
 * - Backdrop dismisses sheet
 * - Touch-friendly checkboxes
 * - Clear visual feedback
 * - Smooth animations
 * 
 * @component
 * @category common
 * 
 * @param {MobileFilterSheetProps} props - Component properties
 * @returns {JSX.Element} Rendered filter sheet
 * 
 * @example
 * // Basic usage in archive
 * const [filterOpen, setFilterOpen] = useState(false);
 * const [selected, setSelected] = useState<string[]>([]);
 * 
 * <MobileFilterSheet
 *   isOpen={filterOpen}
 *   onClose={() => setFilterOpen(false)}
 *   categories={filterCategories}
 *   selectedFilters={selected}
 *   onFiltersChange={setSelected}
 * />
 */
export function MobileFilterSheet({
  isOpen,
  onClose,
  categories,
  selectedFilters,
  onFiltersChange,
  onApply
}: MobileFilterSheetProps) {
  
  /**
   * Toggle a filter option.
   */
  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      onFiltersChange(selectedFilters.filter(id => id !== filterId));
    } else {
      onFiltersChange([...selectedFilters, filterId]);
    }
  };

  /**
   * Clear all selected filters.
   */
  const clearAllFilters = () => {
    onFiltersChange([]);
  };

  /**
   * Handle apply action.
   */
  const handleApply = () => {
    onApply?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-background border-t rounded-t-[var(--radius-xl)] shadow-lg z-50 md:hidden max-h-[85vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-element-md border-b">
              <div className="flex items-center gap-fluid-sm">
                <Faders className="w-5 h-5 text-primary" />
                <h2
                  className="font-[family-name:var(--font-family-lora)] text-[length:var(--text-xl)] font-[var(--font-weight-medium)]"
                >
                  Filters
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-element-xs hover:bg-muted rounded-[var(--radius-md)] transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-element-md flex flex-col gap-fluid-lg">
              {categories.map((category) => (
                <div key={category.id} className="flex flex-col gap-element-sm">
                  {/* Category Label */}
                  <h3
                    className="font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-base)] font-[var(--font-weight-semibold)]"
                  >
                    {category.label}
                  </h3>

                  {/* Filter Options */}
                  <div className="flex flex-col gap-element-sm">
                    {category.options.map((option) => {
                      const isSelected = selectedFilters.includes(option.id);
                      
                      return (
                        <button
                          key={option.id}
                          onClick={() => toggleFilter(option.id)}
                          className={cn(
                            "w-full flex items-center justify-between p-element-md rounded-[var(--radius-md)] border transition-colors",
                            isSelected
                              ? "wp-bg-primary-light border-primary"
                              : "bg-card border-border hover:bg-muted"
                          )}
                        >
                          <span
                            className={cn(
                              "font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-base)]",
                              isSelected ? "font-[var(--font-weight-medium)]" : "font-[var(--font-weight-normal)]"
                            )}
                          >
                            {option.label}
                            {option.count !== undefined && (
                              <span className="pl-element-xs text-muted-foreground">
                                ({option.count})
                              </span>
                            )}
                          </span>
                          
                          {/* Checkbox */}
                          <div
                            className={cn(
                              "w-5 h-5 rounded-[var(--radius-sm)] border-2 flex items-center justify-center transition-colors",
                              isSelected
                                ? "bg-primary border-primary"
                                : "border-muted-foreground"
                            )}
                          >
                            {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="p-element-md border-t wp-bg-muted-ultralight flex gap-fluid-md">
              {/* Clear All */}
              <button
                onClick={clearAllFilters}
                disabled={selectedFilters.length === 0}
                className={cn(
                  "flex-1 px-element-md py-element-sm rounded-[var(--radius-lg)] border transition-colors font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-base)] font-[var(--font-weight-medium)]",
                  selectedFilters.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-muted"
                )}
              >
                Clear All
              </button>

              {/* Apply */}
              <button
                onClick={handleApply}
                className="flex-1 px-element-md py-element-sm bg-primary text-primary-foreground rounded-[var(--radius-lg)] hover:bg-primary/90 transition-colors font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-base)] font-[var(--font-weight-medium)]"
              >
                Apply Filters
                {selectedFilters.length > 0 && (
                  <span className="pl-element-sm">({selectedFilters.length})</span>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}