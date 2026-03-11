/**
 * Itinerary List Pattern component for displaying day-by-day tour schedules.
 * 
 * Displays a chronological list of itinerary days with titles, descriptions,
 * activities, meals, and accommodation information. Used on tour detail pages
 * to provide comprehensive day-by-day breakdowns of multi-day tours.
 * 
 * **Features:**
 * - Numbered day cards with visual indicators
 * - Day title and detailed description
 * - Optional activity lists
 * - Meal information (e.g., "B, L, D")
 * - Accommodation details
 * - Empty state handling
 * - Responsive card layout
 * - Structured meta information
 * 
 * **WordPress Mapping:**
 * 
 * Equivalent to `patterns/itinerary-list.php` block pattern.
 * In WordPress, this would be composed of:
 * - core/group (itinerary wrapper)
 * - Repeating core/group (day cards)
 * - core/heading (day titles)
 * - core/paragraph (descriptions)
 * - core/list (activities)
 * - Custom meta blocks (meals, accommodation)
 * 
 * **Design System:**
 * - Cards: Card background with border, rounded, 20/24px padding
 * - Day number: Circular badge, primary color, semibold
 * - Title: H3 with default Lora styling, semibold
 * - Description: Noto Sans, 16px, muted foreground
 * - Activities: Bulleted list, 14px, muted foreground
 * - Meta: 14px, muted with bold labels, top border
 * - Empty state: Muted background, centered text
 * 
 * **Behavioral Notes:**
 * - Returns empty state if no days provided
 * - Days displayed in order received
 * - Activities shown only if present
 * - Meta info (meals/accommodation) conditional
 * - Responsive padding (20px mobile, 24px desktop)
 * 
 * **Accessibility:**
 * - Semantic HTML (article for each day)
 * - Heading hierarchy (H3 for day titles, H4 for sections)
 * - List semantics for activities
 * - Clear visual separation between days
 * - Sufficient color contrast
 * 
 * @module ItineraryListPattern
 * @category patterns
 * @wordpressPattern lightspeed/itinerary-list
 * @see /guidelines/patterns/editorial-content-patterns.md
 */

/**
 * Individual itinerary day structure.
 * 
 * @interface ItineraryDay
 */
interface ItineraryDay {
  /** Day number (1, 2, 3, etc.) */
  day: number;
  /** Day title (e.g., "Arrival in Reykjavik") */
  title: string;
  /** Detailed description of the day's activities */
  description: string;
  /** Optional array of specific activities */
  activities?: string[];
  /** Optional meals included (e.g., "B, L, D" for breakfast, lunch, dinner) */
  meals?: string;
  /** Optional accommodation type or name */
  accommodation?: string;
}

/**
 * Props for the ItineraryListPattern component.
 * 
 * @interface ItineraryListPatternProps
 */
interface ItineraryListPatternProps {
  /** 
   * Array of itinerary days in chronological order.
   * 
   * Each day should include:
   * - day: Day number
   * - title: Day name/title
   * - description: Full day description
   * - activities: Optional activity list
   * - meals: Optional meal codes
   * - accommodation: Optional accommodation info
   * 
   * @example
   * [
   *   {
   *     day: 1,
   *     title: "Arrival in Reykjavik",
   *     description: "Arrive at airport...",
   *     activities: ["City tour", "Welcome dinner"],
   *     meals: "D",
   *     accommodation: "Hotel Reykjavik"
   *   }
   * ]
   */
  days: ItineraryDay[];
}

/**
 * Itinerary List Pattern component.
 * 
 * @component
 * @category patterns
 * @wordpressPattern lightspeed/itinerary-list
 * 
 * @param {ItineraryListPatternProps} props - Component properties
 * @returns {JSX.Element} Rendered itinerary list or empty state
 * 
 * @example
 * // Basic usage
 * <ItineraryListPattern days={tour.itinerary} />
 * 
 * @example
 * // With full details
 * <ItineraryListPattern
 *   days={[
 *     {
 *       day: 1,
 *       title: "Arrival",
 *       description: "Meet and greet at airport",
 *       activities: ["Transfer to hotel", "Welcome dinner"],
 *       meals: "D",
 *       accommodation: "City Hotel"
 *     },
 *     {
 *       day: 2,
 *       title: "Safari Drive",
 *       description: "Full day game drive",
 *       activities: ["Morning drive", "Bush lunch", "Afternoon drive"],
 *       meals: "B, L, D",
 *       accommodation: "Safari Lodge"
 *     }
 *   ]}
 * />
 */
export function ItineraryListPattern({ days }: ItineraryListPatternProps) {
  if (!days || days.length === 0) {
    return (
      <div className="text-center py-section-sm px-[var(--spacing-element-lg)] wp-bg-muted-ultralight rounded-[var(--radius-lg)]">
        <p className="text-muted-foreground m-0">
          Detailed itinerary coming soon
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[var(--spacing-gap-lg)]">
      {days.map((day) => (
        <article
          key={day.day}
          className="bg-card border border-border rounded-[var(--radius-lg)] p-[var(--spacing-element-xl)] md:p-[var(--spacing-element-2xl)]"
        >
          {/* Day Number & Title */}
          <div className="flex items-start gap-[var(--spacing-gap-lg)] mb-[var(--spacing-element-lg)]">
            <div className="wp-icon-container-primary rounded-[var(--radius-full)] flex-shrink-0">
              {/* Day number uses CSS variable for font-weight */}
              <span 
                className="text-primary font-[var(--font-weight-semibold)]"
              >
                {day.day}
              </span>
            </div>
            <div className="flex-1">
              {/* H3 uses system default font-weight-semibold */}
              <h3 className="!mb-[var(--spacing-element-xs)]">
                Day {day.day}: {day.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-[var(--spacing-element-lg)]">
            {day.description}
          </p>

          {/* Activities */}
          {day.activities && day.activities.length > 0 && (
            <div className="mb-[var(--spacing-element-lg)]">
              <h4 className="mb-[var(--spacing-element-sm)] text-fluid-sm font-[var(--font-weight-medium)]">Activities</h4>
              <ul className="space-y-[var(--spacing-gap-xs)] m-0 pl-0 list-none">
                {day.activities.map((activity, idx) => (
                  <li key={idx} className="text-muted-foreground flex items-start gap-[var(--spacing-gap-sm)] text-fluid-sm">
                    <span className="text-primary mt-[var(--spacing-element-xs)]">•</span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-[var(--spacing-gap-lg)] text-muted-foreground pt-[var(--spacing-element-lg)] border-t border-border text-fluid-sm">
            {day.meals && (
              <div>
                {/* Bold labels use CSS variable */}
                <span 
                  className="text-foreground font-[var(--font-weight-medium)]"
                >
                  Meals:
                </span> {day.meals}
              </div>
            )}
            {day.accommodation && (
              <div>
                {/* Bold labels use CSS variable */}
                <span 
                  className="text-foreground font-[var(--font-weight-medium)]"
                >
                  Accommodation:
                </span> {day.accommodation}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}