/**
 * Countdown Component
 * 
 * Versatile countdown timer for events, sales, and deadlines.
 * 
 * **Features:**
 * - Multiple display variants
 * - Auto-update every second
 * - Expiration callback
 * - Custom labels
 * - Dark/light mode compatible
 * - Responsive design
 * 
 * @module Countdown
 * @category components/common
 */

import { useState, useEffect } from "react";
import { Clock } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Time remaining structure.
 */
interface TimeRemaining {
  /** Days remaining */
  days: number;
  
  /** Hours remaining */
  hours: number;
  
  /** Minutes remaining */
  minutes: number;
  
  /** Seconds remaining */
  seconds: number;
  
  /** Total milliseconds remaining */
  total: number;
}

/**
 * Props for Countdown component.
 */
interface CountdownProps {
  /** Target date/time */
  targetDate: Date | string;
  
  /** Display variant */
  variant?: "default" | "compact" | "minimal" | "card" | "inline";
  
  /** Size variant */
  size?: "sm" | "md" | "lg";
  
  /** Show labels */
  showLabels?: boolean;
  
  /** Custom labels */
  labels?: {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
  
  /** Callback when countdown expires */
  onExpire?: () => void;
  
  /** Hide when expired */
  hideOnExpire?: boolean;
  
  /** Custom expired message */
  expiredMessage?: string;
  
  /** Additional CSS classes */
  className?: string;
}

/**
 * Calculate time remaining.
 */
function calculateTimeRemaining(targetDate: Date | string): TimeRemaining {
  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
  const now = new Date();
  const total = target.getTime() - now.getTime();

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, total };
}

/**
 * Countdown Component.
 * 
 * Display countdown timer to target date.
 * 
 * **Usage:**
 * 
 * Default countdown:
 * ```tsx
 * <Countdown
 *   targetDate={new Date("2026-02-01T00:00:00")}
 *   showLabels
 * />
 * ```
 * 
 * Compact variant:
 * ```tsx
 * <Countdown
 *   targetDate="2026-02-01"
 *   variant="compact"
 *   size="sm"
 * />
 * ```
 * 
 * With expiration callback:
 * ```tsx
 * <Countdown
 *   targetDate={saleEndDate}
 *   onExpire={() => {
 *     console.log("Sale ended!");
 *     removeSaleBanner();
 *   }}
 *   hideOnExpire
 * />
 * ```
 * 
 * @component
 * @category common
 */
export function Countdown({
  targetDate,
  variant = "default",
  size = "md",
  showLabels = true,
  labels = {
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
  },
  onExpire,
  hideOnExpire = false,
  expiredMessage = "Event has ended",
  className,
}: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetDate)
  );
  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(targetDate);
      setTimeRemaining(remaining);

      if (remaining.total <= 0 && !hasExpired) {
        setHasExpired(true);
        if (onExpire) {
          onExpire();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, hasExpired, onExpire]);

  // Hide if expired and hideOnExpire is true
  if (hasExpired && hideOnExpire) {
    return null;
  }

  // Show expired message
  if (hasExpired) {
    return (
      <div className={cn("text-center py-4", className)}>
        <p className="text-muted-foreground">
          {expiredMessage}
        </p>
      </div>
    );
  }

  const sizeClasses = {
    sm: {
      numberClass: "text-fluid-2xl",
      labelClass: "text-fluid-xs",
      gap: "gap-2",
    },
    md: {
      numberClass: "text-fluid-4xl",
      labelClass: "text-fluid-sm",
      gap: "gap-4",
    },
    lg: {
      numberClass: "text-fluid-6xl",
      labelClass: "text-fluid-base",
      gap: "gap-6",
    },
  };

  const currentSize = sizeClasses[size];

  // Inline variant
  if (variant === "inline") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Clock size={20} className="text-primary" />
        <span className="text-foreground font-semibold">
          {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
        </span>
      </div>
    );
  }

  // Minimal variant
  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center justify-center gap-1", className)}>
        <span className={cn("text-foreground font-serif font-bold", currentSize.numberClass)}>
          {String(timeRemaining.days).padStart(2, "0")}:
          {String(timeRemaining.hours).padStart(2, "0")}:
          {String(timeRemaining.minutes).padStart(2, "0")}:
          {String(timeRemaining.seconds).padStart(2, "0")}
        </span>
      </div>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <div className={cn("inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg", className)}>
        {Object.entries(timeRemaining)
          .filter(([key]) => key !== "total")
          .map(([key, value], index, arr) => (
            <div key={key} className="flex items-baseline gap-1">
              <span className={cn("text-foreground font-serif font-bold", currentSize.numberClass)}>
                {String(value).padStart(2, "0")}
              </span>
              {showLabels && (
                <span className={cn("text-muted-foreground", currentSize.labelClass)}>
                  {labels[key as keyof typeof labels]?.[0]}
                </span>
              )}
              {index < arr.length - 1 && (
                <span className="text-muted-foreground mx-1">:</span>
              )}
            </div>
          ))}
      </div>
    );
  }

  // Card variant
  if (variant === "card") {
    return (
      <div className={cn("flex items-center justify-center", currentSize.gap, className)}>
        {Object.entries(timeRemaining)
          .filter(([key]) => key !== "total")
          .map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col items-center p-4 bg-card border border-border rounded-lg min-w-[80px]"
            >
              <span className={cn("text-foreground font-serif font-bold", currentSize.numberClass)}>
                {String(value).padStart(2, "0")}
              </span>
              {showLabels && (
                <span className={cn("text-muted-foreground mt-1 uppercase", currentSize.labelClass)}>
                  {labels[key as keyof typeof labels]}
                </span>
              )}
            </div>
          ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("flex items-center justify-center", currentSize.gap, className)}>
      {Object.entries(timeRemaining)
        .filter(([key]) => key !== "total")
        .map(([key, value]) => (
          <div key={key} className="flex flex-col items-center">
            <span className={cn("text-foreground font-serif font-bold", currentSize.numberClass)}>
              {String(value).padStart(2, "0")}
            </span>
            {showLabels && (
              <span className={cn("text-muted-foreground mt-1 uppercase", currentSize.labelClass)}>
                {labels[key as keyof typeof labels]}
              </span>
            )}
          </div>
        ))}
    </div>
  );
}

/**
 * CountdownSection Component.
 * 
 * Complete countdown section with title and description.
 * 
 * **Usage:**
 * ```tsx
 * <CountdownSection
 *   title="Summer Sale Ends In"
 *   description="Don't miss out on 20% off all tours!"
 *   targetDate={saleEndDate}
 *   variant="card"
 *   size="lg"
 * />
 * ```
 */
export function CountdownSection({
  title,
  description,
  targetDate,
  variant = "default",
  size = "md",
  className,
}: {
  title: string;
  description?: string;
  targetDate: Date | string;
  variant?: CountdownProps["variant"];
  size?: CountdownProps["size"];
  className?: string;
}) {
  return (
    <div className={cn("text-center space-y-6", className)}>
      <div>
        <h2 className="text-foreground mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground text-fluid-lg">
            {description}
          </p>
        )}
      </div>

      <Countdown
        targetDate={targetDate}
        variant={variant}
        size={size}
        showLabels
      />
    </div>
  );
}

/**
 * CountdownBadge Component.
 * 
 * Small countdown badge for inline use.
 * 
 * **Usage:**
 * ```tsx
 * <CountdownBadge
 *   targetDate={limitedOfferEnd}
 *   label="Offer ends in"
 * />
 * ```
 */
export function CountdownBadge({
  targetDate,
  label,
  className,
}: {
  targetDate: Date | string;
  label?: string;
  className?: string;
}) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeRemaining.total <= 0) return null;

  return (
    <div
      className={cn(
        "wp-badge-primary",
        className
      )}
    >
      <Clock size={16} />
      {label && (
        <span className="text-fluid-sm font-medium">
          {label}:
        </span>
      )}
      <span className="text-fluid-sm font-semibold">
        {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
      </span>
    </div>
  );
}