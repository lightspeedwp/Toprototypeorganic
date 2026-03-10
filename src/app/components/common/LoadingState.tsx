/**
 * Loading State Components
 * 
 * Elegant loading states for different use cases.
 * Skeleton screens, spinners, progress bars, and placeholders.
 * 
 * @module LoadingState
 * @category common
 */

import { CircleNotch } from "@phosphor-icons/react";
import { cn } from '../../lib/utils';

/**
 * Loading spinner props.
 */
interface LoadingSpinnerProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Custom className */
  className?: string;
  /** Loading text */
  text?: string;
}

/**
 * Loading Spinner Component
 * 
 * Animated spinner for loading states.
 * 
 * @example
 * ```tsx
 * <LoadingSpinner size="lg" text="Loading tours..." />
 * ```
 */
export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <CircleNotch className={cn('animate-spin text-primary', sizes[size])} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}

/**
 * Skeleton props.
 */
interface SkeletonProps {
  /** Custom className */
  className?: string;
  /** Width */
  width?: string | number;
  /** Height */
  height?: string | number;
  /** Border radius */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** Animate */
  animate?: boolean;
}

/**
 * Skeleton Component
 * 
 * Placeholder skeleton for loading content.
 * 
 * @example
 * ```tsx
 * <Skeleton width="100%" height="200px" rounded="lg" />
 * ```
 */
export function Skeleton({
  className,
  width,
  height,
  rounded = 'md',
  animate = true,
}: SkeletonProps) {
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  return (
    <div
      className={cn(
        'bg-muted',
        roundedClasses[rounded],
        animate && 'animate-pulse',
        className
      )}
      style={{
        '--dynamic-width': typeof width === 'number' ? `${width}px` : width,
        '--dynamic-height': typeof height === 'number' ? `${height}px` : height,
        width: 'var(--dynamic-width)',
        height: 'var(--dynamic-height)'
      } as React.CSSProperties}
    />
  );
}

/**
 * Card skeleton props.
 */
interface CardSkeletonProps {
  /** Number of cards to show */
  count?: number;
  /** Custom className */
  className?: string;
}

/**
 * Card Skeleton Component
 * 
 * Skeleton for card layouts (tour cards, accommodation cards, etc.).
 * 
 * @example
 * ```tsx
 * <CardSkeleton count={3} />
 * ```
 */
export function CardSkeleton({ count = 1, className }: CardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn('bg-card border border-border rounded-lg overflow-hidden', className)}>
          {/* Image */}
          <Skeleton width="100%" height="200px" rounded="none" />
          
          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <Skeleton width="80%" height="24px" />
            
            {/* Description */}
            <div className="space-y-2">
              <Skeleton width="100%" height="16px" />
              <Skeleton width="90%" height="16px" />
            </div>
            
            {/* Metadata */}
            <div className="flex gap-3">
              <Skeleton width="60px" height="20px" />
              <Skeleton width="80px" height="20px" />
            </div>
            
            {/* Button */}
            <Skeleton width="100%" height="40px" />
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * List skeleton props.
 */
interface ListSkeletonProps {
  /** Number of list items */
  count?: number;
  /** Custom className */
  className?: string;
}

/**
 * List Skeleton Component
 * 
 * Skeleton for list layouts.
 * 
 * @example
 * ```tsx
 * <ListSkeleton count={5} />
 * ```
 */
export function ListSkeleton({ count = 3, className }: ListSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg">
          {/* Icon/Image */}
          <Skeleton width="48px" height="48px" rounded="lg" />
          
          {/* Content */}
          <div className="flex-1 space-y-2">
            <Skeleton width="40%" height="20px" />
            <Skeleton width="60%" height="16px" />
          </div>
          
          {/* Action */}
          <Skeleton width="80px" height="32px" />
        </div>
      ))}
    </div>
  );
}

/**
 * Progress bar props.
 */
interface ProgressBarProps {
  /** Progress value (0-100) */
  value: number;
  /** Show percentage text */
  showValue?: boolean;
  /** Custom className */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'default' | 'success' | 'warning' | 'error';
}

/**
 * Progress Bar Component
 * 
 * Animated progress indicator.
 * 
 * @example
 * ```tsx
 * <ProgressBar value={75} showValue variant="success" />
 * ```
 */
export function ProgressBar({
  value,
  showValue = false,
  className,
  size = 'md',
  variant = 'default',
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantClasses = {
    default: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-destructive',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full bg-muted rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cn('h-full transition-all duration-500 ease-out', variantClasses[variant])}
          style={{ '--dynamic-width': `${clampedValue}%`, width: 'var(--dynamic-width)' } as React.CSSProperties}
        />
      </div>
      {showValue && (
        <p className="text-sm text-muted-foreground mt-2 text-center">
          {Math.round(clampedValue)}%
        </p>
      )}
    </div>
  );
}

/**
 * Full page loading props.
 */
interface FullPageLoadingProps {
  /** Loading message */
  message?: string;
  /** Custom className */
  className?: string;
}

/**
 * Full Page Loading Component
 * 
 * Full-screen loading overlay.
 * 
 * @example
 * ```tsx
 * <FullPageLoading message="Loading your adventure..." />
 * ```
 */
export function FullPageLoading({ message = 'Loading...', className }: FullPageLoadingProps) {
  return (
    <div className={cn(
      'fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50',
      className
    )}>
      <div className="text-center">
        <LoadingSpinner size="xl" text={message} />
      </div>
    </div>
  );
}

/**
 * Inline loading props.
 */
interface InlineLoadingProps {
  /** Loading text */
  text?: string;
  /** Custom className */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md';
}

/**
 * Inline Loading Component
 * 
 * Compact inline loading indicator.
 * 
 * @example
 * ```tsx
 * <InlineLoading text="Saving..." size="sm" />
 * ```
 */
export function InlineLoading({ text, className, size = 'sm' }: InlineLoadingProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <CircleNotch className={cn('animate-spin', size === 'sm' ? 'w-4 h-4' : 'w-5 h-5')} />
      {text && <span className="text-sm">{text}</span>}
    </span>
  );
}

/**
 * Empty state props.
 */
interface EmptyStateProps {
  /** Icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Title */
  title: string;
  /** Description */
  description?: string;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Custom className */
  className?: string;
}

/**
 * Empty State Component
 * 
 * Placeholder for empty data states.
 * 
 * @example
 * ```tsx
 * <EmptyState
 *   icon={MapPin}
 *   title="No tours found"
 *   description="Try adjusting your filters"
 *   action={{
 *     label: "Clear Filters",
 *     onClick: clearFilters,
 *   }}
 * />
 * ```
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('text-center py-section-sm', className)}>
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      
      <h3 className="mb-2">{title}</h3>
      
      {description && (
        <p className="text-muted-foreground mb-6">{description}</p>
      )}
      
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

/**
 * LoadingState — backwards-compatible alias for LoadingSpinner.
 *
 * Some modules may reference `{ LoadingState }` by name.
 * This re-export keeps those imports working without changes.
 */
export const LoadingState = LoadingSpinner;