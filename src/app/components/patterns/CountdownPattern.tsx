import { useState, useEffect } from "react";
import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Button } from "../blocks/design/Button";
import { Clock } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * CountdownPattern - Limited-time offer urgency
 * 
 * WordPress Equivalent: Group block + Custom countdown block
 * Section Style: section-countdown-default, section-countdown-inline
 * 
 * Design System Compliance:
 * - Typography: AUTOMATIC via HeadingBlock, ParagraphBlock
 * - Colors: bg-accent, text-accent-foreground (semantic tokens)
 * - Spacing: Tailwind scale
 * - NO hardcoded values
 */

export interface CountdownPatternProps {
  /** Countdown end date/time */
  endDate: Date | string;
  
  /** Section heading */
  title?: string;
  
  /** Section description */
  description?: string;
  
  /** Call-to-action */
  cta?: {
    label: string;
    onClick: () => void;
  };
  
  /** Display variant */
  variant?: 'default' | 'inline' | 'compact';
  
  /** Show when expired */
  expiredMessage?: string;
  
  /** Optional custom classes */
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const calculateTimeRemaining = (endDate: Date | string): TimeRemaining => {
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  const now = new Date();
  const difference = end.getTime() - now.getTime();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
};

export function CountdownPattern({
  endDate,
  title = "Limited Time Offer",
  description,
  cta,
  variant = 'default',
  expiredMessage = "This offer has expired.",
  className,
}: CountdownPatternProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(
    calculateTimeRemaining(endDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(endDate);
      setTimeRemaining(remaining);
      
      if (remaining.isExpired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  if (timeRemaining.isExpired) {
    return (
      <div className={cn("bg-[color:var(--color-muted)] py-element-2xl", className)}>
        <Container>
          <div className="flex flex-col items-center gap-element-md text-center">
            <Clock className="w-12 h-12 text-[color:var(--color-muted-foreground)]" aria-hidden="true" />
            <ParagraphBlock className="text-[color:var(--color-muted-foreground)] !m-0">
              {expiredMessage}
            </ParagraphBlock>
          </div>
        </Container>
      </div>
    );
  }

  const isCompact = variant === 'compact';
  const isInline = variant === 'inline';

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className={cn("flex flex-col items-center", isCompact ? "gap-element-xs" : "gap-element-sm")}>
      <div 
        className={cn(
          "bg-[color:var(--color-card)] border border-[color:var(--color-border)] rounded-[var(--radius-lg)] flex items-center justify-center",
          isCompact ? "w-12 h-12" : "w-20 h-20"
        )}
      >
        <span 
          className={cn(
            "text-[color:var(--color-primary)] font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-bold)] leading-none",
            isCompact ? "text-[length:var(--text-xl)]" : "text-[length:var(--text-4xl)]"
          )}
        >
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span 
        className={cn(
          "text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] uppercase tracking-wider",
          isCompact ? "text-[length:var(--text-xs)]" : "text-[length:var(--text-sm)]"
        )}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className={cn(
      "bg-[color:var(--color-accent)] text-[color:var(--color-accent-foreground)]",
      variant === 'default' && "py-section-sm md:py-section-md",
      variant === 'inline' && "py-element-2xl",
      variant === 'compact' && "py-element-lg",
      className
    )}>
      <Container>
        <div className={cn(
          "flex items-center justify-between gap-fluid-lg",
          (variant === 'default' || !isInline) && "flex-col text-center"
        )}>
          {/* Text Content */}
          <div className={cn(
            "flex flex-col gap-element-sm",
            isInline && "flex-1"
          )}>
            <div className={cn("flex items-center gap-fluid-sm", !isInline && "justify-center")}>
              <Clock className="w-5 h-5" aria-hidden="true" />
              <span 
                className="uppercase tracking-wider text-[length:var(--text-sm)] font-[family:var(--font-family-noto-sans)]"
              >
                Limited Time Offer
              </span>
            </div>

            <HeadingBlock 
              level={2} 
              textAlign={isInline ? 'left' : 'center'}
              className="text-[color:var(--color-accent-foreground)] !m-0 font-[family:var(--font-family-lora)]"
            >
              {title}
            </HeadingBlock>

            {description && (
              <div className={cn("flex w-full", !isInline && "justify-center")}>
                <ParagraphBlock className={cn(
                  "!m-0 font-[family:var(--font-family-noto-sans)]",
                  isInline ? "text-left" : "text-center",
                  !isCompact && "max-w-2xl"
                )}>
                  {description}
                </ParagraphBlock>
              </div>
            )}
          </div>

          {/* Countdown Timer */}
          <div className={cn(
            "flex items-center gap-fluid-sm",
            isCompact && "gap-fluid-xs"
          )}>
            {timeRemaining.days > 0 && (
              <TimeUnit value={timeRemaining.days} label="Days" />
            )}
            <TimeUnit value={timeRemaining.hours} label="Hours" />
            <TimeUnit value={timeRemaining.minutes} label="Mins" />
            {!isCompact && (
              <TimeUnit value={timeRemaining.seconds} label="Secs" />
            )}
          </div>

          {/* CTA Button */}
          {cta && !isCompact && (
            <div className={cn(
              isInline && "flex-shrink-0"
            )}>
              <Button
                variant="secondary"
                size="lg"
                onClick={cta.onClick}
                className="bg-accent-foreground text-accent hover:bg-accent-foreground/90"
              >
                {cta.label}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}