/**
 * Pull to Refresh Component
 * 
 * Mobile-style pull-to-refresh interaction.
 * 
 * **Features:**
 * - Pull down to trigger refresh
 * - Visual feedback indicator
 * - Configurable threshold
 * - Spring animation
 * - Loading state
 * 
 * @module PullToRefresh
 * @category components/mobile
 */

import { useState, useRef } from "react";
import { ArrowsClockwise as RefreshCw } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Props for PullToRefresh component.
 */
interface PullToRefreshProps {
  /** Content to display */
  children: React.ReactNode;
  
  /** Refresh callback */
  onRefresh: () => Promise<void> | void;
  
  /** Pull distance threshold (in pixels) */
  threshold?: number;
  
  /** Refresh indicator color */
  indicatorColor?: string;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Pull to Refresh Component.
 * 
 * Enables pull-to-refresh interaction on mobile devices.
 * 
 * **Usage:**
 * 
 * Basic usage:
 * ```tsx
 * <PullToRefresh
 *   onRefresh={async () => {
 *     await fetchNewData();
 *   }}
 * >
 *   <div>Your scrollable content</div>
 * </PullToRefresh>
 * ```
 * 
 * With custom threshold:
 * ```tsx
 * <PullToRefresh
 *   onRefresh={handleRefresh}
 *   threshold={100}
 * >
 *   <div>Content</div>
 * </PullToRefresh>
 * ```
 * 
 * @component
 * @category mobile
 */
export function PullToRefresh({
  children,
  onRefresh,
  threshold = 80,
  indicatorColor = "text-primary",
  className,
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canPull, setCanPull] = useState(false);
  
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if container is at top
  const isAtTop = (): boolean => {
    if (!containerRef.current) return false;
    return containerRef.current.scrollTop === 0;
  };

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isRefreshing) return;
    
    if (isAtTop()) {
      startY.current = e.touches[0].clientY;
      setCanPull(true);
    }
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!canPull || isRefreshing) return;

    const currentY = e.touches[0].clientY;
    const distance = currentY - startY.current;

    // Only allow pulling down
    if (distance > 0) {
      // Add resistance to pull (logarithmic scale)
      const resistance = 0.5;
      const adjustedDistance = Math.pow(distance, resistance) * 3;
      setPullDistance(Math.min(adjustedDistance, threshold * 1.5));
    }
  };

  // Handle touch end
  const handleTouchEnd = async () => {
    if (!canPull || isRefreshing) return;

    setCanPull(false);

    // Trigger refresh if threshold exceeded
    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      setPullDistance(threshold);

      try {
        await onRefresh();
      } catch (error) {
        console.error("Refresh error:", error);
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  };

  // Calculate indicator opacity and rotation
  const progress = Math.min(pullDistance / threshold, 1);
  const opacity = Math.min(progress * 2, 1);
  const rotation = progress * 360;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-auto h-full", className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to Refresh Indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center"
        style={{
          height: pullDistance,
          opacity,
          transition: isRefreshing || !canPull ? "all 0.3s ease-out" : "none",
        }}
      >
        <div className="flex flex-col items-center gap-fluid-xs">
          <RefreshCw
            className={cn("transition-transform", indicatorColor)}
            size={24}
            style={{
              transform: `rotate(${isRefreshing ? 360 : rotation}deg)`,
              animation: isRefreshing ? "spin 1s linear infinite" : "none",
            }}
          />
          {progress >= 1 && !isRefreshing && (
            <span className="text-[length:var(--text-sm)] text-muted-foreground">Release to refresh</span>
          )}
          {isRefreshing && (
            <span className="text-[length:var(--text-sm)] text-muted-foreground">Refreshing...</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: isRefreshing || !canPull ? "transform 0.3s ease-out" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}