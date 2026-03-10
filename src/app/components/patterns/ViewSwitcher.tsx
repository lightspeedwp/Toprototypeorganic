/**
 * View Switcher Component
 * 
 * Allows toggling between grid and list views on archive pages.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { List as LayoutList, SquaresFour as Grid2x2, GridNine as Grid3x3 } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

export type ViewMode = "list" | "grid-2" | "grid-3";

interface ViewSwitcherProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  className?: string;
  label?: string;
}

const VIEW_MODES = [
  { mode: "list", label: "List view", Icon: LayoutList },
  { mode: "grid-2", label: "2-column grid", Icon: Grid2x2 },
  { mode: "grid-3", label: "3-column grid", Icon: Grid3x3 },
] as const;

export function ViewSwitcher({
  currentView,
  onViewChange,
  className,
  label = "Layout",
}: ViewSwitcherProps) {
  return (
    <div
      className={cn("wp-pattern-lts-view-switcher", className)}
      role="group"
      aria-label={label}
    >
      <span className="wp-pattern-lts-view-switcher__label">
        {label}
      </span>

      <div className="wp-pattern-lts-view-switcher__group">
        {VIEW_MODES.map(({ mode, label: ariaLabel, Icon }) => {
          const isActive = currentView === mode;
          return (
            <button
              key={mode}
              type="button"
              onClick={() => onViewChange(mode)}
              className={cn(
                "wp-pattern-lts-view-switcher__btn",
                isActive
                  ? "wp-pattern-lts-view-switcher__btn--active"
                  : "wp-pattern-lts-view-switcher__btn--inactive"
              )}
              aria-label={ariaLabel}
              aria-pressed={isActive}
            >
              <Icon />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ViewSwitcher;
