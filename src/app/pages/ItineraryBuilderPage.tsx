/**
 * Itinerary Builder Page
 * 
 * Interactive page where users can build a custom safari itinerary
 * by adding destinations, activities, and accommodation day by day.
 * 
 * @module ItineraryBuilderPage
 * @category pages
 */

import { useState, useCallback } from "react";
import {
  Plus, Trash, MapPin, Bed, Binoculars, Car, Coffee,
  Sun, Moon, Camera, ArrowRight, Calendar, CurrencyDollar,
  Users, PaperPlaneTilt, X,
} from "@phosphor-icons/react";
import { Hero } from "../components/patterns/Hero";
import { CTA } from "../components/patterns/CTA";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { Container } from "../components/common/Container";
import { DESTINATIONS, TOURS, ACCOMMODATION } from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";

interface Activity {
  id: string;
  name: string;
  time: "morning" | "afternoon" | "evening";
  icon: "game-drive" | "walking" | "cultural" | "transfer" | "leisure" | "photography";
}

interface ItineraryDay {
  id: string;
  dayNumber: number;
  title: string;
  destination: string;
  accommodation: string;
  activities: Activity[];
}

const ACTIVITY_ICONS: Record<string, any> = {
  "game-drive": Binoculars,
  walking: MapPin,
  cultural: Sun,
  transfer: Car,
  leisure: Coffee,
  photography: Camera,
};

const TIME_LABELS: Record<string, string> = {
  morning: "AM",
  afternoon: "PM",
  evening: "Eve",
};

const SAMPLE_ACTIVITIES: Activity[] = [
  { id: "a1", name: "Morning Game Drive", time: "morning", icon: "game-drive" },
  { id: "a2", name: "Bush Walk with Guide", time: "morning", icon: "walking" },
  { id: "a3", name: "Cultural Village Visit", time: "afternoon", icon: "cultural" },
  { id: "a4", name: "Scenic Transfer", time: "morning", icon: "transfer" },
  { id: "a5", name: "Pool & Spa Relaxation", time: "afternoon", icon: "leisure" },
  { id: "a6", name: "Sunset Photography Session", time: "evening", icon: "photography" },
  { id: "a7", name: "Afternoon Game Drive", time: "afternoon", icon: "game-drive" },
  { id: "a8", name: "Sundowner Drinks", time: "evening", icon: "leisure" },
  { id: "a9", name: "Night Safari", time: "evening", icon: "game-drive" },
  { id: "a10", name: "Boat Safari", time: "morning", icon: "game-drive" },
];

const DEFAULT_ITINERARY: ItineraryDay[] = [
  {
    id: "day-1",
    dayNumber: 1,
    title: "Arrival & Welcome",
    destination: DESTINATIONS[0]?.title || "Johannesburg",
    accommodation: ACCOMMODATION[0]?.title || "City Hotel",
    activities: [
      { id: "d1-a1", name: "Airport Transfer", time: "afternoon", icon: "transfer" },
      { id: "d1-a2", name: "Welcome Dinner", time: "evening", icon: "leisure" },
    ],
  },
  {
    id: "day-2",
    dayNumber: 2,
    title: "Into the Bush",
    destination: DESTINATIONS[1]?.title || "Kruger National Park",
    accommodation: ACCOMMODATION[1]?.title || "Safari Lodge",
    activities: [
      { id: "d2-a1", name: "Scenic Flight to Camp", time: "morning", icon: "transfer" },
      { id: "d2-a2", name: "Afternoon Game Drive", time: "afternoon", icon: "game-drive" },
      { id: "d2-a3", name: "Sundowner Drinks", time: "evening", icon: "leisure" },
    ],
  },
  {
    id: "day-3",
    dayNumber: 3,
    title: "Full Safari Day",
    destination: DESTINATIONS[1]?.title || "Kruger National Park",
    accommodation: ACCOMMODATION[1]?.title || "Safari Lodge",
    activities: [
      { id: "d3-a1", name: "Morning Game Drive", time: "morning", icon: "game-drive" },
      { id: "d3-a2", name: "Bush Walk with Guide", time: "afternoon", icon: "walking" },
      { id: "d3-a3", name: "Sunset Photography Session", time: "evening", icon: "photography" },
    ],
  },
];

function ItineraryBuilderPage() {
  const { navigateTo } = useNavigation();
  const [days, setDays] = useState<ItineraryDay[]>(DEFAULT_ITINERARY);
  const [travellers, setTravellers] = useState(2);
  const [showActivityPicker, setShowActivityPicker] = useState<string | null>(null);

  const addDay = useCallback(() => {
    const newDayNumber = days.length + 1;
    setDays((prev) => [
      ...prev,
      {
        id: `day-${newDayNumber}-${Date.now()}`,
        dayNumber: newDayNumber,
        title: `Day ${newDayNumber}`,
        destination: "",
        accommodation: "",
        activities: [],
      },
    ]);
  }, [days.length]);

  const removeDay = useCallback((dayId: string) => {
    setDays((prev) =>
      prev
        .filter((d) => d.id !== dayId)
        .map((d, i) => ({ ...d, dayNumber: i + 1 }))
    );
  }, []);

  const addActivity = useCallback((dayId: string, activity: Activity) => {
    setDays((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? { ...d, activities: [...d.activities, { ...activity, id: `${dayId}-${Date.now()}` }] }
          : d
      )
    );
    setShowActivityPicker(null);
  }, []);

  const removeActivity = useCallback((dayId: string, activityId: string) => {
    setDays((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? { ...d, activities: d.activities.filter((a) => a.id !== activityId) }
          : d
      )
    );
  }, []);

  const totalActivities = days.reduce((sum, d) => sum + d.activities.length, 0);
  const estimatedPrice = days.length * 450 * travellers;

  return (
    <article className="wp-page-itinerary-builder">
      <BreadcrumbsPattern
        items={[
          { label: "Home", href: "/", onClick: () => navigateTo("/") },
          { label: "Itinerary Builder" },
        ]}
        fullWidth
      />

      <Hero
        title="Build Your Dream Safari"
        intro="Create a personalised day-by-day itinerary with our interactive builder. Add destinations, activities, and accommodation, then share it with our specialists to refine the details."
        image="https://images.unsplash.com/photo-1758928807778-3e09d91b83b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
        context="Itinerary Builder"
        height="medium"
        overlay="medium"
      />

      {/* Builder Workspace */}
      <section className="wp-page-itinerary-builder__workspace">
        <Container>
          <div className="wp-page-itinerary-builder__layout">
            {/* Main Timeline */}
            <div className="wp-page-itinerary-builder__main">
              {days.map((day) => (
                <div key={day.id} className="wp-page-itinerary-builder__day-card">
                  <div className="wp-page-itinerary-builder__day-header">
                    <div className="flex items-center gap-3">
                      <span className="wp-page-itinerary-builder__day-number">
                        {day.dayNumber}
                      </span>
                      <div>
                        <h3 className="wp-page-itinerary-builder__day-title">{day.title}</h3>
                        {day.destination && (
                          <span className="wp-page-itinerary-builder__activity-time">
                            <MapPin size={12} /> {day.destination}
                            {day.accommodation && ` · ${day.accommodation}`}
                          </span>
                        )}
                      </div>
                    </div>
                    {days.length > 1 && (
                      <button
                        onClick={() => removeDay(day.id)}
                        className="wp-page-itinerary-builder__activity-icon"
                        aria-label={`Remove day ${day.dayNumber}`}
                        type="button"
                      >
                        <Trash size={18} />
                      </button>
                    )}
                  </div>

                  {/* Activities */}
                  <div className="wp-page-itinerary-builder__day-activities">
                    {day.activities.map((activity) => {
                      const IconComp = ACTIVITY_ICONS[activity.icon] || Binoculars;
                      return (
                        <div key={activity.id} className="wp-page-itinerary-builder__activity">
                          <span className="wp-page-itinerary-builder__activity-icon">
                            <IconComp size={16} />
                          </span>
                          <div className="flex-1">
                            <span className="wp-page-itinerary-builder__activity-name">
                              {activity.name}
                            </span>
                            <span className="wp-page-itinerary-builder__activity-time">
                              {" "}· {TIME_LABELS[activity.time]}
                            </span>
                          </div>
                          <button
                            onClick={() => removeActivity(day.id, activity.id)}
                            className="wp-page-itinerary-builder__activity-icon"
                            aria-label={`Remove ${activity.name}`}
                            type="button"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Activity */}
                  {showActivityPicker === day.id ? (
                    <div className="wp-page-itinerary-builder__panel">
                      <div className="flex items-center justify-between">
                        <h4 className="wp-page-itinerary-builder__panel-title">Add Activity</h4>
                        <button
                          onClick={() => setShowActivityPicker(null)}
                          type="button"
                          aria-label="Close activity picker"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {SAMPLE_ACTIVITIES.map((activity) => {
                          const IconComp = ACTIVITY_ICONS[activity.icon] || Binoculars;
                          return (
                            <button
                              key={activity.id}
                              onClick={() => addActivity(day.id, activity)}
                              className="wp-page-itinerary-builder__activity"
                              type="button"
                            >
                              <span className="wp-page-itinerary-builder__activity-icon">
                                <IconComp size={16} />
                              </span>
                              <span className="wp-page-itinerary-builder__activity-name">
                                {activity.name}
                              </span>
                              <span className="wp-page-itinerary-builder__activity-time">
                                {TIME_LABELS[activity.time]}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowActivityPicker(day.id)}
                      className="wp-page-itinerary-builder__add-button"
                      type="button"
                    >
                      <Plus size={16} /> Add Activity
                    </button>
                  )}
                </div>
              ))}

              {/* Add Day Button */}
              <button
                onClick={addDay}
                className="wp-page-itinerary-builder__add-button"
                type="button"
              >
                <Plus size={18} /> Add Day {days.length + 1}
              </button>
            </div>

            {/* Sidebar Summary */}
            <div className="wp-page-itinerary-builder__sidebar">
              <div className="wp-page-itinerary-builder__panel">
                <h3 className="wp-page-itinerary-builder__panel-title">Trip Summary</h3>

                <div className="wp-page-itinerary-builder__summary-row">
                  <span className="wp-page-itinerary-builder__summary-label">
                    <Calendar size={14} /> Duration
                  </span>
                  <span className="wp-page-itinerary-builder__summary-value">
                    {days.length} days / {Math.max(0, days.length - 1)} nights
                  </span>
                </div>

                <div className="wp-page-itinerary-builder__summary-row">
                  <span className="wp-page-itinerary-builder__summary-label">
                    <Users size={14} /> Travellers
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTravellers(Math.max(1, travellers - 1))}
                      className="wp-page-itinerary-builder__day-number"
                      aria-label="Remove traveller"
                      type="button"
                    >
                      -
                    </button>
                    <span className="wp-page-itinerary-builder__summary-value">{travellers}</span>
                    <button
                      onClick={() => setTravellers(Math.min(12, travellers + 1))}
                      className="wp-page-itinerary-builder__day-number"
                      aria-label="Add traveller"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="wp-page-itinerary-builder__summary-row">
                  <span className="wp-page-itinerary-builder__summary-label">
                    <Binoculars size={14} /> Activities
                  </span>
                  <span className="wp-page-itinerary-builder__summary-value">
                    {totalActivities}
                  </span>
                </div>

                <div className="wp-page-itinerary-builder__summary-row">
                  <span className="wp-page-itinerary-builder__summary-label">
                    <MapPin size={14} /> Destinations
                  </span>
                  <span className="wp-page-itinerary-builder__summary-value">
                    {new Set(days.filter((d) => d.destination).map((d) => d.destination)).size}
                  </span>
                </div>

                <div className="wp-page-itinerary-builder__summary-row" aria-hidden>
                  <span />
                  <span />
                </div>

                <div className="wp-page-itinerary-builder__summary-row">
                  <span className="wp-page-itinerary-builder__summary-label">
                    <CurrencyDollar size={14} /> Estimated From
                  </span>
                  <span className="wp-page-itinerary-builder__summary-total">
                    ${estimatedPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigateTo("/quote-request")}
                className="wp-page-itinerary-builder__add-button"
                type="button"
              >
                <PaperPlaneTilt size={18} /> Send to Specialist <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Container>
      </section>

      <CTA
        title="Prefer Expert Planning?"
        description="Our safari specialists can build a tailored itinerary from scratch based on your preferences, budget, and travel dates."
        variant="gradient"
        primaryAction={{
          label: "Talk to a Specialist",
          onClick: () => navigateTo("/contact"),
        }}
        secondaryAction={{
          label: "Browse Our Tours",
          onClick: () => navigateTo("/tours"),
        }}
      />
    </article>
  );
}

export default ItineraryBuilderPage;
