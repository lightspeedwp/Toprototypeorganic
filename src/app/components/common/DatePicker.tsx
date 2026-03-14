/**
 * DatePicker Component
 * 
 * Calendar-based date picker for booking dates, filters, and forms.
 * Supports single date selection, date ranges, and disabled dates.
 * 
 * **Design System:**
 * - Uses CSS variables from theme.css
 * - Typography: Noto Sans for all text
 * - Colors: Semantic tokens (background, foreground, primary, border)
 * - Spacing: Consistent with design system
 * 
 * **Features:**
 * - Calendar view with month navigation
 * - Disabled dates support
 * - Min/max date constraints
 * - Highlighted selected date
 * - Keyboard navigation
 * - Mobile-responsive
 * - Accessible
 * 
 * @module DatePicker
 * @category common
 */

import { useState, useEffect } from "react";
import { CaretLeft, CaretRight, Calendar } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * DatePicker component props.
 */
interface DatePickerProps {
  /** Selected date (ISO string) */
  value?: string;
  /** Callback when date changes */
  onChange?: (date: string) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Array of disabled dates (ISO strings) */
  disabledDates?: string[];
  /** Array of highlighted dates (ISO strings) */
  highlightedDates?: string[];
  /** Show input field */
  showInput?: boolean;
  /** Placeholder text for input */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Show calendar by default */
  defaultOpen?: boolean;
}

/**
 * DatePicker Component
 * 
 * @param {DatePickerProps} props - Component properties
 * @returns {JSX.Element} Rendered date picker
 * 
 * @example
 * ```tsx
 * <DatePicker
 *   value={selectedDate}
 *   onChange={(date) => setSelectedDate(date)}
 *   minDate={new Date()}
 *   placeholder="Select a date"
 * />
 * ```
 */
export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  highlightedDates = [],
  showInput = true,
  placeholder = "Select a date",
  className,
  defaultOpen = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [currentMonth, setCurrentMonth] = useState(
    value ? new Date(value) : new Date()
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );

  // Update selected date when value prop changes
  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
      setCurrentMonth(new Date(value));
    }
  }, [value]);

  /**
   * Get days in month.
   */
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  /**
   * Get first day of month (0 = Sunday, 6 = Saturday).
   */
  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  /**
   * Check if date is disabled.
   */
  const isDateDisabled = (date: Date): boolean => {
    const dateStr = date.toISOString().split("T")[0];
    
    // Check if in disabled dates array
    if (disabledDates.includes(dateStr)) {
      return true;
    }
    
    // Check min/max constraints
    if (minDate && date < minDate) {
      return true;
    }
    if (maxDate && date > maxDate) {
      return true;
    }
    
    return false;
  };

  /**
   * Check if date is highlighted.
   */
  const isDateHighlighted = (date: Date): boolean => {
    const dateStr = date.toISOString().split("T")[0];
    return highlightedDates.includes(dateStr);
  };

  /**
   * Check if date is selected.
   */
  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  /**
   * Check if date is today.
   */
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  /**
   * Handle date selection.
   */
  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;
    
    setSelectedDate(date);
    setIsOpen(false);
    
    if (onChange) {
      onChange(date.toISOString().split("T")[0]);
    }
  };

  /**
   * Navigate to previous month.
   */
  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  /**
   * Navigate to next month.
   */
  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  /**
   * Generate calendar days.
   */
  const generateCalendarDays = (): (Date | null)[] => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (Date | null)[] = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      );
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("relative", className)}>
      {/* Input Field */}
      {showInput && (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center gap-fluid-sm rounded-[var(--radius-md)] border border-border bg-background px-element-md py-element-sm text-left text-foreground transition-colors hover:border-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <Calendar size={20} className="text-muted-foreground" />
          <span className={cn(!selectedDate && "text-muted-foreground")}>
            {selectedDate
              ? selectedDate.toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : placeholder}
          </span>
        </button>
      )}

      {/* Calendar Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          {showInput && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Calendar */}
          <div
            className={cn(
              "z-50 rounded-[var(--radius-lg)] border border-border bg-card p-element-md shadow-lg flex flex-col gap-element-md",
              showInput && "absolute left-0 right-0 top-full translate-y-2"
            )}
          >
            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="flex h-8 w-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
                aria-label="Previous month"
              >
                <CaretLeft size={20} />
              </button>

              <h3 className="text-foreground">
                {currentMonth.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>

              <button
                type="button"
                onClick={handleNextMonth}
                className="flex h-8 w-8 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted"
                aria-label="Next month"
              >
                <CaretRight size={20} />
              </button>
            </div>

            {/* Week Days */}
            <div className="pb-element-sm grid grid-cols-7 gap-fluid-xs">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="flex h-8 items-center justify-center text-xs font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-fluid-xs">
              {calendarDays.map((date, index) => {
                if (!date) {
                  return <div key={`empty-${index}`} className="h-8" />;
                }

                const disabled = isDateDisabled(date);
                const selected = isDateSelected(date);
                const highlighted = isDateHighlighted(date);
                const today = isToday(date);

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDateClick(date)}
                    disabled={disabled}
                    className={cn(
                      "flex h-8 items-center justify-center rounded-[var(--radius-md)] text-[length:var(--text-sm)] transition-colors",
                      disabled &&
                        "cursor-not-allowed text-muted-foreground/50 line-through",
                      !disabled && !selected && "text-foreground hover:bg-muted",
                      selected &&
                        "bg-primary font-[var(--font-weight-medium)] text-primary-foreground hover:bg-primary/90",
                      highlighted && !selected && "bg-accent text-accent-foreground",
                      today && !selected && "border border-primary"
                    )}
                    aria-label={date.toLocaleDateString()}
                    aria-selected={selected}
                    aria-disabled={disabled}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Legend (Optional) */}
            {(highlightedDates.length > 0 || minDate || maxDate) && (
              <div className="flex flex-col gap-element-xs border-t border-border pt-element-md">
                {highlightedDates.length > 0 && (
                  <div className="flex items-center gap-fluid-sm text-[length:var(--text-xs)] text-muted-foreground">
                    <div className="h-4 w-4 rounded-[var(--radius-sm)] bg-accent" />
                    <span>Available dates</span>
                  </div>
                )}
                <div className="flex items-center gap-fluid-sm text-[length:var(--text-xs)] text-muted-foreground">
                  <div className="h-4 w-4 rounded-[var(--radius-sm)] border border-primary" />
                  <span>Today</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * DateRangePicker Component (Future Enhancement)
 * 
 * For selecting a date range (start and end date).
 * Can be implemented by extending DatePicker logic.
 */
export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  className,
  startLabel = "Start Date",
  endLabel = "End Date",
}: {
  startDate?: string;
  endDate?: string;
  onChange?: (start: string, end: string) => void;
  className?: string;
  startLabel?: string;
  endLabel?: string;
}) {
  const [start, setStart] = useState<string | undefined>(startDate);
  const [end, setEnd] = useState<string | undefined>(endDate);

  const handleStartChange = (date: string) => {
    setStart(date);
    if (end && onChange) {
      onChange(date, end);
    }
  };

  const handleEndChange = (date: string) => {
    setEnd(date);
    if (start && onChange) {
      onChange(start, date);
    }
  };

  return (
    <div className={cn("flex gap-fluid-md", className)}>
      <div className="flex-1">
        <label className="pb-element-xs block text-[length:var(--text-sm)] font-[var(--font-weight-medium)] text-foreground">
          {startLabel}
        </label>
        <DatePicker
          value={start}
          onChange={handleStartChange}
          maxDate={end ? new Date(end) : undefined}
          placeholder="Select start date"
        />
      </div>
      <div className="flex-1">
        <label className="pb-element-xs block text-[length:var(--text-sm)] font-[var(--font-weight-medium)] text-foreground">
          {endLabel}
        </label>
        <DatePicker
          value={end}
          onChange={handleEndChange}
          minDate={start ? new Date(start) : undefined}
          placeholder="Select end date"
        />
      </div>
    </div>
  );
}

export default DatePicker;