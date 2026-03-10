/**
 * Swipeable Card Component
 * 
 * Mobile-optimized card with swipe gestures for actions.
 * 
 * **Features:**
 * - Swipe left/right to reveal actions
 * - Spring animation
 * - Haptic feedback (if supported)
 * - Customizable actions
 * - Auto-reset on release
 * 
 * @module SwipeableCard
 * @category components/mobile
 */

import { useState, useRef } from "react";
import { usePan } from "../../hooks/use-touch-gestures";
import { cn } from "../../lib/utils";

/**
 * Swipeable card action.
 */
interface SwipeAction {
  label: string;
  icon?: React.ReactNode;
  color?: string;
  onAction: () => void;
}

/**
 * Props for SwipeableCard component.
 */
interface SwipeableCardProps {
  /** Card content */
  children: React.ReactNode;
  
  /** Left swipe actions */
  leftActions?: SwipeAction[];
  
  /** Right swipe actions */
  rightActions?: SwipeAction[];
  
  /** Swipe threshold (0-1) */
  threshold?: number;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Swipeable Card Component.
 * 
 * Card that can be swiped to reveal action buttons.
 * 
 * **Usage:**
 * 
 * Basic usage:
 * ```tsx
 * <SwipeableCard
 *   leftActions={[
 *     {
 *       label: "Archive",
 *       icon: <Archive size={20} />,
 *       color: "bg-blue-500",
 *       onAction: () => console.log("Archived"),
 *     },
 *   ]}
 *   rightActions={[
 *     {
 *       label: "Delete",
 *       icon: <Trash size={20} />,
 *       color: "bg-red-500",
 *       onAction: () => console.log("Deleted"),
 *     },
 *   ]}
 * >
 *   <div className="p-4">
 *     <h3>Card Title</h3>
 *     <p>Card content</p>
 *   </div>
 * </SwipeableCard>
 * ```
 * 
 * @component
 * @category mobile
 */
export function SwipeableCard({
  children,
  leftActions = [],
  rightActions = [],
  threshold = 0.3,
  className,
}: SwipeableCardProps) {
  const [offsetX, setOffsetX] = useState(0);
  const [isReleased, setIsReleased] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Haptic feedback (if supported)
  const triggerHaptic = () => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  // Pan handlers
  const panHandlers = usePan({
    onPanStart: () => {
      setIsReleased(false);
    },
    onPanMove: (deltaX) => {
      // Only allow horizontal swiping
      const maxSwipe = containerRef.current?.offsetWidth || 0;
      const clampedDelta = Math.max(-maxSwipe * 0.5, Math.min(maxSwipe * 0.5, deltaX));
      setOffsetX(clampedDelta);
    },
    onPanEnd: (deltaX) => {
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const swipeThreshold = containerWidth * threshold;

      // Check if swipe exceeds threshold
      if (Math.abs(deltaX) > swipeThreshold) {
        // Swipe right (show left actions)
        if (deltaX > 0 && leftActions.length > 0) {
          triggerHaptic();
          setOffsetX(containerWidth * 0.3);
        }
        // Swipe left (show right actions)
        else if (deltaX < 0 && rightActions.length > 0) {
          triggerHaptic();
          setOffsetX(-containerWidth * 0.3);
        } else {
          setOffsetX(0);
        }
      } else {
        setOffsetX(0);
      }

      setIsReleased(true);
    },
  });

  // Handle action click
  const handleAction = (action: SwipeAction) => {
    action.onAction();
    setOffsetX(0);
    triggerHaptic();
  };

  // Reset card position
  const resetPosition = () => {
    setOffsetX(0);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-lg bg-card", className)}
    >
      {/* Left Actions (visible when swiped right) */}
      {leftActions.length > 0 && (
        <div className="absolute inset-y-0 left-0 flex items-center gap-2 px-4">
          {leftActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleAction(action)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "text-white transition-all duration-200",
                "hover:scale-105 active:scale-95",
                action.color || "bg-primary"
              )}
              style={{
                opacity: offsetX > 0 ? 1 : 0,
                transform: `translateX(${offsetX > 0 ? 0 : -20}px)`,
              }}
            >
              {action.icon}
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Right Actions (visible when swiped left) */}
      {rightActions.length > 0 && (
        <div className="absolute inset-y-0 right-0 flex items-center gap-2 px-4">
          {rightActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleAction(action)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "text-white transition-all duration-200",
                "hover:scale-105 active:scale-95",
                action.color || "bg-primary"
              )}
              style={{
                opacity: offsetX < 0 ? 1 : 0,
                transform: `translateX(${offsetX < 0 ? 0 : 20}px)`,
              }}
            >
              {action.icon}
              <span className="text-sm font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Card Content */}
      <div
        {...panHandlers}
        className="relative bg-card cursor-grab active:cursor-grabbing"
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: isReleased ? "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
        }}
        onClick={offsetX !== 0 ? resetPosition : undefined}
      >
        {children}
      </div>
    </div>
  );
}
