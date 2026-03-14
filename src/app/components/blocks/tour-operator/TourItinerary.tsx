/**
 * Tour Itinerary Block Component
 * 
 * Displays a day-by-day itinerary for a tour with structured day cards
 * including descriptions, activities, meals, and accommodation details.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/itinerary
 * - Category: Tour Operator
 * - Used on single tour pages
 * 
 * **Design System:**
 * All styling via companion CSS file using design system tokens.
 * Typography: Lora (headings), Noto Sans (body).
 * 
 * @module TourItinerary
 * @category blocks/tour-operator
 */

import './TourItinerary.css';
import { ForkKnife as Utensils, Buildings as Building, CheckCircle as CircleCheck } from '@phosphor-icons/react';

/** Individual itinerary day structure. */
export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities?: string[];
  meals?: string;
  accommodation?: string;
}

export interface TourItineraryProps {
  /** Array of itinerary days in chronological order */
  days: ItineraryDay[];
  /** Optional section title */
  title?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Tour Itinerary Block component.
 * 
 * @component
 * @category blocks/tour-operator
 */
export function TourItinerary({ days, title = 'Day-by-Day Itinerary', className = '' }: TourItineraryProps) {
  if (!days || days.length === 0) {
    return (
      <div className={`lsx-tour-itinerary__empty ${className}`}>
        <p>Detailed itinerary coming soon</p>
      </div>
    );
  }

  return (
    <section className={`lsx-tour-itinerary ${className}`} aria-label={title}>
      <div className="lsx-tour-itinerary__header">
        <h2>{title}</h2>
      </div>

      {days.map((day) => (
        <article key={day.day} className="lsx-tour-itinerary__day">
          {/* Day Header */}
          <div className="lsx-tour-itinerary__day-header">
            <div className="lsx-tour-itinerary__day-badge" aria-hidden="true">
              {day.day}
            </div>
            <div className="lsx-tour-itinerary__day-title-group">
              <h3 className="pb-element-xs">Day {day.day}: {day.title}</h3>
            </div>
          </div>

          {/* Description */}
          <p className="lsx-tour-itinerary__day-description">
            {day.description}
          </p>

          {/* Activities */}
          {day.activities && day.activities.length > 0 && (
            <div className="lsx-tour-itinerary__activities">
              <div className="lsx-tour-itinerary__activities-title">Activities</div>
              <ul className="lsx-tour-itinerary__activities-list">
                {day.activities.map((activity, idx) => (
                  <li key={idx} className="lsx-tour-itinerary__activity-item">
                    <CircleCheck size={14} className="lsx-tour-itinerary__activity-bullet" aria-hidden="true" />
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Meta Footer */}
          {(day.meals || day.accommodation) && (
            <div className="lsx-tour-itinerary__day-meta">
              {day.meals && (
                <div className="lsx-tour-itinerary__meta-item">
                  <Utensils size={14} className="lsx-tour-itinerary__meta-icon" aria-hidden="true" />
                  <span className="lsx-tour-itinerary__meta-label">Meals:</span>
                  <span>{day.meals}</span>
                </div>
              )}
              {day.accommodation && (
                <div className="lsx-tour-itinerary__meta-item">
                  <Building size={14} className="lsx-tour-itinerary__meta-icon" aria-hidden="true" />
                  <span className="lsx-tour-itinerary__meta-label">Stay:</span>
                  <span>{day.accommodation}</span>
                </div>
              )}
            </div>
          )}
        </article>
      ))}
    </section>
  );
}

TourItinerary.displayName = 'TourItinerary';