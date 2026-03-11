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

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("bg-card border border-border rounded-[var(--radius-lg)] p-[var(--spacing-element-lg)] md:p-[var(--spacing-element-xl)]", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-[var(--spacing-gap-lg)]">
        <div className="flex items-center gap-[var(--spacing-gap-sm)]">
          <CalendarIcon className="w-5 h-5 text-primary" />
          <h3 className="font-[var(--font-weight-medium)] m-0">Select Departure Date</h3>
        </div>
        <div className="flex items-center gap-[var(--spacing-gap-xs)]">
          <button
            onClick={goToPreviousMonth}
            className={cn(
              "p-[var(--spacing-element-sm)] rounded-[var(--radius-md)] transition-colors",
              "hover:bg-accent text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring"
            )}
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="min-w-[150px] text-center font-[var(--font-weight-medium)]">{monthYear}</span>
          <button
            onClick={goToNextMonth}
            className={cn(
              "p-[var(--spacing-element-sm)] rounded-[var(--radius-md)] transition-colors",
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
      <div className="grid grid-cols-7 gap-[var(--spacing-gap-xs)] mb-[var(--spacing-gap-xs)]">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-[length:var(--text-sm)] font-[var(--font-weight-medium)] text-muted-foreground py-[var(--spacing-element-sm)]"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-[var(--spacing-gap-xs)]">
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
                "aspect-square p-[var(--spacing-element-xs)] rounded-[var(--radius-md)] transition-all text-center relative group",
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
              <div className="flex flex-col items-center justify-center h-full">
                <span className={cn("text-[length:var(--text-sm)] font-[var(--font-weight-medium)]", isSelected && "text-primary-foreground")}>
                  {date.getDate()}
                </span>
                {status !== "unavailable" && price && (
                  <span
                    className={cn(
                      "text-[length:var(--text-xs)] mt-0.5",
                      isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
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
                    "absolute bottom-full left-1/2 -translate-x-1/2 mb-[var(--spacing-element-sm)] px-[var(--spacing-element-sm)] py-[var(--spacing-element-xs)] rounded-[var(--radius-md)]",
                    "bg-popover text-popover-foreground border border-border shadow-[var(--elevation-lg)]",
                    "text-[length:var(--text-xs)] whitespace-nowrap z-10",
                    "opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  )}
                >
                  <div className="space-y-[var(--spacing-gap-xs)]">
                    <p className="font-[var(--font-weight-medium)] m-0">{date.toLocaleDateString()}</p>
                    <p className="text-muted-foreground m-0">Price: {price}</p>
                    {spotsLeft && spotsLeft <= 5 && (
                      <p className="text-accent m-0">Only {spotsLeft} spots left</p>
                    )}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-[var(--spacing-gap-lg)] pt-[var(--spacing-element-lg)] border-t border-border">
        <div className="flex flex-wrap items-center gap-[var(--spacing-gap-md)] text-[length:var(--text-sm)]">
          <div className="flex items-center gap-[var(--spacing-gap-xs)]">
            <div className="w-4 h-4 bg-primary rounded-[var(--radius-sm)]" />
            <span className="text-muted-foreground">Selected</span>
          </div>
          <div className="flex items-center gap-[var(--spacing-gap-xs)]">
            <div className="w-4 h-4 bg-accent rounded-[var(--radius-sm)] relative">
              <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-accent rounded-[var(--radius-full)]" />
            </div>
            <span className="text-muted-foreground">Limited availability</span>
          </div>
          <div className="flex items-center gap-[var(--spacing-gap-xs)]">
            <div className="w-4 h-4 bg-muted rounded-[var(--radius-sm)] opacity-40" />
            <span className="text-muted-foreground">Unavailable</span>
          </div>
        </div>
      </div>

      {/* Selected date info */}
      {selectedDate && (
        <div className="wp-callout-accent mt-[var(--spacing-gap-md)]">
          <div className="flex items-start gap-[var(--spacing-gap-sm)]">
            <DollarSign className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-[var(--font-weight-medium)] m-0">Selected Departure Date</p>
              <p className="text-[length:var(--text-sm)] text-muted-foreground mt-[var(--spacing-element-xs)] m-0">
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
                  <p className="text-[length:var(--text-sm)] mt-[var(--spacing-element-sm)] m-0">
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
      <div className="mt-[var(--spacing-gap-md)] wp-bg-muted-light rounded-[var(--radius-lg)] p-[var(--spacing-element-lg)]">
        <div className="flex items-start gap-[var(--spacing-gap-sm)]">
          <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-[length:var(--text-sm)] text-muted-foreground">
            <p className="font-[var(--font-weight-medium)] text-foreground mb-[var(--spacing-element-xs)] m-0">Seasonal Pricing</p>
            <ul className="space-y-[var(--spacing-gap-xs)] m-0 list-none pl-0">
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