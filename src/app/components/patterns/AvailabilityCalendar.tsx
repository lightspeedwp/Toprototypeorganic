/**
 * Availability Calendar Pattern - Tour Date Selection with Pricing
 * 
 * An interactive calendar component for selecting tour dates with
 * availability status and dynamic pricing display.
 * 
 * **WordPress Mapping:**
 * - Pattern: lightspeed/availability-calendar
 * - Block composition: Group + Calendar widget
 * 
 * **Features:**
 * - Month/year navigation
 * - Available/unavailable date indicators
 * - Dynamic pricing per date
 * - Seasonal variations display
 * - Mobile-responsive layout
 * - Keyboard navigation
 * - Accessibility-compliant
 * 
 * **Design System:**
 * - Typography: Lora (headings), Noto Sans (body)
 * - Colors: Semantic tokens from theme.css
 * - Spacing: Consistent rhythm with CSS variables
 * 
 * @module AvailabilityCalendar
 * @category patterns
 * @wordpressPattern lightspeed/availability-calendar
 */

import { useState, useMemo } from "react";
import { CaretLeft as ChevronLeft, CaretRight as ChevronRight, Calendar as CalendarIcon, CurrencyDollar as DollarSign, WarningCircle as AlertCircle } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Date availability status.
 */
type AvailabilityStatus = "available" | "limited" | "unavailable";

/**
 * Date info with pricing.
 */
interface DateInfo {
  date: Date;
  status: AvailabilityStatus;
  price?: string;
  spotsLeft?: number;
  season?: "high" | "shoulder" | "low";
}

/**
 * Calendar props.
 */
interface AvailabilityCalendarProps {
  tourId: string;
  basePrice: string;
  onDateSelect?: (date: Date, dateInfo: DateInfo) => void;
  selectedDate?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

/**
 * Availability Calendar Component.
 */
export function AvailabilityCalendar({
  tourId,
  basePrice,
  onDateSelect,
  selectedDate = null,
  minDate = new Date(),
  maxDate,
  className,
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate mock availability data (in real app, fetch from API)
  const getDateInfo = (date: Date): DateInfo => {
    const month = date.getMonth();
    const day = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Past dates are unavailable
    if (date < today) {
      return {
        date,
        status: "unavailable",
      };
    }

    // High season (Jun-Aug)
    if (month >= 5 && month <= 7) {
      return {
        date,
        status: day === 0 || day === 6 ? "limited" : "available",
        price: basePrice,
        spotsLeft: day === 0 || day === 6 ? 3 : 12,
        season: "high",
      };
    }

    // Shoulder season (Apr-May, Sep-Oct)
    if ((month >= 3 && month <= 4) || (month >= 8 && month <= 9)) {
      const basePriceNum = parseInt(basePrice.replace(/[^0-9]/g, ""));
      return {
        date,
        status: "available",
        price: `$${basePriceNum - 200}`,
        spotsLeft: 12,
        season: "shoulder",
      };
    }

    // Low season (Nov-Mar)
    const basePriceNum = parseInt(basePrice.replace(/[^0-9]/g, ""));
    return {
      date,
      status: "available",
      price: `$${basePriceNum - 400}`,
      spotsLeft: 12,
      season: "low",
    };
  };

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (DateInfo | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(getDateInfo(date));
    }

    return days;
  };

  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth, basePrice]);

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Check if date is selected
  const isDateSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const monthYear = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("bg-[color:var(--color-card)] border border-[color:var(--color-border)] rounded-[var(--radius-lg)] p-element-lg md:p-element-xl flex flex-col gap-fluid-lg", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-fluid-sm">
          <CalendarIcon className="w-5 h-5 text-[color:var(--color-primary)] relative top-px" />
          <h3 className="font-[family:var(--font-family-lora)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)] m-0">Select Departure Date</h3>
        </div>
        <div className="flex items-center gap-fluid-xs">
          <button
            onClick={goToPreviousMonth}
            className={cn(
              "p-element-sm rounded-[var(--radius-md)] transition-colors",
              "hover:bg-[color:var(--color-accent)] text-[color:var(--color-foreground)]",
              "focus:outline-none focus:ring-2 focus:ring-[color:var(--color-ring)]"
            )}
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="min-w-[150px] text-center font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)]">{monthYear}</span>
          <button
            onClick={goToNextMonth}
            className={cn(
              "p-element-sm rounded-[var(--radius-md)] transition-colors",
              "hover:bg-accent text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring"
            )}
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-fluid-xs">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-[length:var(--text-sm)] font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-muted-foreground)] py-element-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-fluid-xs">
        {days.map((dayInfo, index) => {
          if (!dayInfo) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const { date, status, price, spotsLeft } = dayInfo;
          const isSelected = isDateSelected(date);
          const isToday =
            date.getDate() === new Date().getDate() &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear();

          return (
            <button
              key={index}
              onClick={() => status !== "unavailable" && onDateSelect?.(date, dayInfo)}
              disabled={status === "unavailable"}
              className={cn(
                "aspect-square p-element-xs rounded-[var(--radius-md)] transition-all text-center relative group",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                // Default state
                status === "available" && "hover:bg-accent cursor-pointer",
                // Limited availability
                status === "limited" && "hover:bg-accent/80 cursor-pointer",
                // Unavailable
                status === "unavailable" && "opacity-40 cursor-not-allowed",
                // Selected
                isSelected && "bg-primary text-primary-foreground hover:bg-primary/90",
                // Today
                isToday && !isSelected && "ring-1 ring-primary"
              )}
              aria-label={`${date.toLocaleDateString()}, ${status}, ${price || "unavailable"}`}
            >
              <div className="flex flex-col items-center justify-center h-full gap-fluid-xs">
                <span className={cn("text-[length:var(--text-sm)] font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)]", isSelected && "text-[color:var(--color-primary-foreground)]")}>
                  {date.getDate()}
                </span>
                {status !== "unavailable" && price && (
                  <span
                    className={cn(
                      "text-[length:var(--text-xs)] font-[family:var(--font-family-noto-sans)]",
                      isSelected ? "text-[color:var(--color-primary-foreground)]/80" : "text-[color:var(--color-muted-foreground)]"
                    )}
                  >
                    {price}
                  </span>
                )}
              </div>

              {/* Status indicator */}
              {status === "limited" && !isSelected && (
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-accent rounded-[var(--radius-full)]" />
              )}

              {/* Tooltip on hover */}
              {status !== "unavailable" && (
                <div
                  className={cn(
                    "absolute bottom-full left-1/2 -translate-x-1/2 pb-element-sm px-element-sm py-element-xs rounded-[var(--radius-md)]",
                    "bg-[color:var(--color-popover)] text-[color:var(--color-popover-foreground)] border border-[color:var(--color-border)] shadow-[var(--elevation-lg)]",
                    "text-[length:var(--text-xs)] whitespace-nowrap z-10",
                    "opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  )}
                >
                  <div className="flex flex-col gap-fluid-xs font-[family:var(--font-family-noto-sans)]">
                    <p className="font-[weight:var(--font-weight-medium)] m-0">{date.toLocaleDateString()}</p>
                    <p className="text-[color:var(--color-muted-foreground)] m-0">Price: {price}</p>
                    {spotsLeft && spotsLeft <= 5 && (
                      <p className="text-[color:var(--color-accent)] m-0">Only {spotsLeft} spots left</p>
                    )}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="pt-element-lg border-t border-[color:var(--color-border)]">
        <div className="flex flex-wrap items-center gap-fluid-md text-[length:var(--text-sm)] font-[family:var(--font-family-noto-sans)]">
          <div className="flex items-center gap-fluid-xs">
            <div className="w-4 h-4 bg-[color:var(--color-primary)] rounded-[var(--radius-sm)]" />
            <span className="text-[color:var(--color-muted-foreground)]">Selected</span>
          </div>
          <div className="flex items-center gap-fluid-xs">
            <div className="w-4 h-4 bg-[color:var(--color-accent)] rounded-[var(--radius-sm)] relative">
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-[color:var(--color-accent)] rounded-[var(--radius-full)]" />
            </div>
            <span className="text-[color:var(--color-muted-foreground)]">Limited availability</span>
          </div>
          <div className="flex items-center gap-fluid-xs">
            <div className="w-4 h-4 bg-[color:var(--color-muted)] rounded-[var(--radius-sm)] opacity-40" />
            <span className="text-[color:var(--color-muted-foreground)]">Unavailable</span>
          </div>
        </div>
      </div>

      {/* Selected date info */}
      {selectedDate && (
        <div className="wp-callout-accent">
          <div className="flex items-start gap-fluid-md">
            <DollarSign className="w-[var(--spacing-element-md)] h-[var(--spacing-element-md)] text-[color:var(--color-primary)] flex-shrink-0" />
            <div className="flex-1 flex flex-col gap-fluid-xs">
              <p className="font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] m-0">Selected Departure Date</p>
              <p className="text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] m-0">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {(() => {
                const info = getDateInfo(selectedDate);
                return info.price ? (
                  <p className="text-[length:var(--text-sm)] pt-element-sm m-0">
                    <span className="text-muted-foreground">Price:</span>{" "}
                    <span className="font-[var(--font-weight-medium)] text-primary">{info.price}</span>
                    <span className="text-muted-foreground"> per person</span>
                  </p>
                ) : null;
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Pricing info */}
      <div className="pt-fluid-md bg-[color:var(--color-muted)]/50 rounded-[var(--radius-lg)] p-element-lg">
        <div className="flex items-start gap-fluid-sm">
          <AlertCircle className="w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)] text-[color:var(--color-muted-foreground)] flex-shrink-0" />
          <div className="text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)] flex flex-col gap-fluid-xs">
            <p className="font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)] m-0">Seasonal Pricing</p>
            <ul className="flex flex-col gap-fluid-xs font-[family:var(--font-family-noto-sans)] m-0 list-none pl-0">
              <li>• High Season (Jun-Aug): Base price</li>
              <li>• Shoulder Season (Apr-May, Sep-Oct): Save $200</li>
              <li>• Low Season (Nov-Mar): Save $400</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}