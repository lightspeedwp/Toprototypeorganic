/**
 * Skeleton Loading States Component
 * 
 * Provides skeleton loading placeholders for better perceived performance.
 * Shows content structure while data is loading.
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Colors: bg-muted, animate-pulse
 * - Border radius: rounded-md, rounded-lg
 * - Responsive sizing
 * 
 * **Features:**
 * - Multiple skeleton variants (card, text, image, avatar)
 * - Customizable dimensions
 * - Animation control
 * - Accessible (aria-busy, aria-live)
 * 
 * @module Skeleton
 * @category common
 */

import { cn } from "../../lib/utils";

/**
 * Skeleton component props.
 */
interface SkeletonProps {
  /** Width of skeleton (CSS value) */
  width?: string | number;
  /** Height of skeleton (CSS value) */
  height?: string | number;
  /** Border radius variant */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Additional CSS classes */
  className?: string;
  /** Disable animation */
  noAnimation?: boolean;
}

/**
 * Base Skeleton Component
 * 
 * @param {SkeletonProps} props - Component properties
 * @returns {JSX.Element} Rendered skeleton
 * 
 * @example
 * ```tsx
 * <Skeleton width="100%" height="200px" radius="lg" />
 * ```
 */
export function Skeleton({
  width = "100%",
  height = "1rem",
  radius = "md",
  className,
  noAnimation = false,
}: SkeletonProps) {
  const radiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div
      className={cn(
        "bg-muted",
        radiusClasses[radius],
        !noAnimation && "animate-pulse",
        className
      )}
      style={{
        '--dynamic-width': typeof width === 'number' ? `${width}px` : width,
        '--dynamic-height': typeof height === 'number' ? `${height}px` : height,
        width: 'var(--dynamic-width)',
        height: 'var(--dynamic-height)'
      } as React.CSSProperties}
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

/**
 * Card skeleton variant.
 * 
 * @param {object} props - Component properties
 * @returns {JSX.Element} Rendered card skeleton
 * 
 * @example
 * ```tsx
 * <SkeletonCard />
 * ```
 */
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card",
        className
      )}
      role="status"
      aria-busy="true"
    >
      {/* Image */}
      <Skeleton height="200px" radius="none" />
      
      {/* Content */}
      <div className="space-y-3 p-4">
        {/* Title */}
        <Skeleton height="1.5rem" width="80%" />
        
        {/* Description lines */}
        <div className="space-y-2">
          <Skeleton height="0.875rem" width="100%" />
          <Skeleton height="0.875rem" width="90%" />
          <Skeleton height="0.875rem" width="95%" />
        </div>
        
        {/* Meta info */}
        <div className="flex items-center gap-4 pt-2">
          <Skeleton height="0.75rem" width="60px" />
          <Skeleton height="0.75rem" width="80px" />
        </div>
        
        {/* Button */}
        <Skeleton height="2.5rem" width="100%" radius="md" />
      </div>
    </div>
  );
}

/**
 * Text skeleton variant.
 * 
 * @param {object} props - Component properties
 * @returns {JSX.Element} Rendered text skeleton
 * 
 * @example
 * ```tsx
 * <SkeletonText lines={3} />
 * ```
 */
export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)} role="status" aria-busy="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="0.875rem"
          width={i === lines - 1 ? "70%" : "100%"}
        />
      ))}
    </div>
  );
}

/**
 * Avatar skeleton variant.
 * 
 * @param {object} props - Component properties
 * @returns {JSX.Element} Rendered avatar skeleton
 * 
 * @example
 * ```tsx
 * <SkeletonAvatar size="lg" />
 * ```
 */
export function SkeletonAvatar({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
  };

  return (
    <Skeleton
      width={sizes[size]}
      height={sizes[size]}
      radius="full"
      className={className}
    />
  );
}

/**
 * Image skeleton variant.
 * 
 * @param {object} props - Component properties
 * @returns {JSX.Element} Rendered image skeleton
 * 
 * @example
 * ```tsx
 * <SkeletonImage aspectRatio="16/9" />
 * ```
 */
export function SkeletonImage({
  aspectRatio = "16/9",
  className,
}: {
  aspectRatio?: "1/1" | "4/3" | "16/9" | "21/9";
  className?: string;
}) {
  const ratios = {
    "1/1": "aspect-square",
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-video",
    "21/9": "aspect-[21/9]",
  };

  return (
    <Skeleton
      className={cn("w-full", ratios[aspectRatio], className)}
      radius="md"
    />
  );
}

/**
 * Header skeleton variant.
 * 
 * @param {object} props - Component properties
 * @returns {JSX.Element} Rendered header skeleton
 * 
 * @example
 * ```tsx
 * <SkeletonHeader />
 * ```
 */
export function SkeletonHeader({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2", className)} role="status" aria-busy="true">
      <Skeleton height="2.5rem" width="60%" />
      <Skeleton height="1rem" width="40%" />
    </div>
  );
}

/**
 * List skeleton variant.
 * 
 * @param {object} props - Component properties
 * @returns {JSX.Element} Rendered list skeleton
 * 
 * @example
 * ```tsx
 * <SkeletonList items={5} />
 * ```
 */
export function SkeletonList({
  items = 5,
  showAvatar = true,
  className,
}: {
  items?: number;
  showAvatar?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)} role="status" aria-busy="true">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          {showAvatar && <SkeletonAvatar size="md" />}
          <div className="flex-1 space-y-2">
            <Skeleton height="1rem" width="70%" />
            <Skeleton height="0.875rem" width="50%" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Table skeleton variant.
 * 
 * @param {object} props - Component properties
 * @returns {JSX.Element} Rendered table skeleton
 * 
 * @example
 * ```tsx
 * <SkeletonTable rows={5} columns={4} />
 * ```
 */
export function SkeletonTable({
  rows = 5,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("space-y-3", className)}
      role="status"
      aria-busy="true"
    >
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} height="1rem" className="flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} height="2rem" className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Grid skeleton variant.
 * 
 * @param {object} props - Component properties
 * @returns {JSX.Element} Rendered grid skeleton
 * 
 * @example
 * ```tsx
 * <SkeletonGrid items={6} columns={3} />
 * ```
 */
export function SkeletonGrid({
  items = 6,
  columns = 3,
  className,
}: {
  items?: number;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={cn("grid gap-6", gridClasses[columns], className)}
      role="status"
      aria-busy="true"
    >
      {Array.from({ length: items }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/**
 * Form skeleton variant.
 * 
 * @param {object} props - Component properties
 * @returns {JSX.Element} Rendered form skeleton
 * 
 * @example
 * ```tsx
 * <SkeletonForm fields={4} />
 * ```
 */
export function SkeletonForm({
  fields = 4,
  className,
}: {
  fields?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-6", className)} role="status" aria-busy="true">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          {/* Label */}
          <Skeleton height="1rem" width="30%" />
          {/* Input */}
          <Skeleton height="2.5rem" width="100%" />
        </div>
      ))}
      
      {/* Submit button */}
      <Skeleton height="2.5rem" width="150px" />
    </div>
  );
}

export default Skeleton;
