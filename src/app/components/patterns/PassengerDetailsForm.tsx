/**
 * Passenger Details Form Pattern - Complete Traveler Information Collection
 * 
 * A comprehensive form component for collecting detailed passenger information
 * for tour bookings with validation and accessibility.
 * 
 * **WordPress Mapping:**
 * - Pattern: lightspeed/passenger-details-form
 * - Block composition: Group + Form fields
 * 
 * **Features:**
 * - Lead passenger information
 * - Additional passenger forms (dynamic)
 * - Date of birth validation
 * - Passport/ID information
 * - Dietary requirements
 * - Special requests
 * - Form validation
 * - Accessibility-compliant
 * 
 * **Design System:**
 * - Typography: Lora (headings), Noto Sans (body)
 * - Colors: Semantic tokens from theme.css
 * - Spacing: Consistent rhythm with CSS variables
 * 
 * @module PassengerDetailsForm
 * @category patterns
 * @wordpressPattern lightspeed/passenger-details-form
 */

import { useState } from "react";
import { Plus, Trash as Trash2, User, Calendar, Globe, WarningCircle as AlertCircle, Check } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Passenger information structure.
 */
export interface PassengerInfo {
  id: string;
  type: "adult" | "child" | "infant";
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other" | "";
  nationality: string;
  passportNumber?: string;
  passportExpiry?: string;
  dietaryRequirements?: string;
  specialNeeds?: string;
}

/**
 * Form props.
 */
interface PassengerDetailsFormProps {
  passengerCount: {
    adults: number;
    children: number;
    infants: number;
  };
  passengers: PassengerInfo[];
  onPassengersChange: (passengers: PassengerInfo[]) => void;
  showPassportInfo?: boolean;
  className?: string;
}

/**
 * Passenger Details Form Component.
 */
export function PassengerDetailsForm({
  passengerCount,
  passengers,
  onPassengersChange,
  showPassportInfo = true,
  className,
}: PassengerDetailsFormProps) {
  const [expandedPassenger, setExpandedPassenger] = useState<string | null>(
    passengers[0]?.id || null
  );

  /**
   * Initialize passengers if empty.
   */
  const initializePassengers = () => {
    if (passengers.length === 0) {
      const newPassengers: PassengerInfo[] = [];
      
      // Add adults
      for (let i = 0; i < passengerCount.adults; i++) {
        newPassengers.push({
          id: `adult-${i}`,
          type: "adult",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          nationality: "",
        });
      }
      
      // Add children
      for (let i = 0; i < passengerCount.children; i++) {
        newPassengers.push({
          id: `child-${i}`,
          type: "child",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          nationality: "",
        });
      }
      
      // Add infants
      for (let i = 0; i < passengerCount.infants; i++) {
        newPassengers.push({
          id: `infant-${i}`,
          type: "infant",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          nationality: "",
        });
      }
      
      onPassengersChange(newPassengers);
      if (newPassengers.length > 0) {
        setExpandedPassenger(newPassengers[0].id);
      }
    }
  };

  // Initialize on mount
  useState(() => {
    initializePassengers();
  });

  /**
   * Update passenger field.
   */
  const updatePassenger = (id: string, field: keyof PassengerInfo, value: string) => {
    const updated = passengers.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    onPassengersChange(updated);
  };

  /**
   * Check if passenger form is complete.
   */
  const isPassengerComplete = (passenger: PassengerInfo) => {
    return (
      passenger.firstName &&
      passenger.lastName &&
      passenger.dateOfBirth &&
      passenger.gender &&
      passenger.nationality
    );
  };

  /**
   * Toggle passenger form expansion.
   */
  const togglePassenger = (id: string) => {
    setExpandedPassenger(expandedPassenger === id ? null : id);
  };

  const totalPassengers = passengerCount.adults + passengerCount.children + passengerCount.infants;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <User className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
        <div>
          <h2 className="mb-2">Passenger Information</h2>
          <p className="text-muted-foreground">
            Please provide details for all {totalPassengers} passenger
            {totalPassengers !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Passenger Forms */}
      <div className="space-y-4">
        {passengers.map((passenger, index) => {
          const isExpanded = expandedPassenger === passenger.id;
          const isComplete = isPassengerComplete(passenger);
          const passengerLabel = `${passenger.type === "adult" ? "Adult" : passenger.type === "child" ? "Child" : "Infant"} ${
            index + 1
          }`;

          return (
            <div
              key={passenger.id}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              {/* Passenger Header */}
              <button
                onClick={() => togglePassenger(passenger.id)}
                className={cn(
                  "w-full px-4 md:px-6 py-4 flex items-center justify-between",
                  "hover:bg-accent transition-colors text-left",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      isComplete ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}
                  >
                    {isComplete ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{passengerLabel}</p>
                    {passenger.firstName && passenger.lastName && (
                      <p className="text-sm text-muted-foreground">
                        {passenger.firstName} {passenger.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <svg
                  className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform",
                    isExpanded && "rotate-180"
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Passenger Form */}
              {isExpanded && (
                <div className="px-4 md:px-6 pb-6 border-t border-border">
                  <div className="pt-6 grid gap-6 md:grid-cols-2">
                    {/* First Name */}
                    <div>
                      <label htmlFor={`${passenger.id}-firstName`} className="mb-2 block">
                        First Name *
                      </label>
                      <input
                        id={`${passenger.id}-firstName`}
                        type="text"
                        required
                        value={passenger.firstName}
                        onChange={(e) =>
                          updatePassenger(passenger.id, "firstName", e.target.value)
                        }
                        placeholder="John"
                        className={cn(
                          "w-full px-4 py-3 rounded-md",
                          "bg-input-background border border-border",
                          "text-foreground placeholder:text-muted-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-ring"
                        )}
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label htmlFor={`${passenger.id}-lastName`} className="mb-2 block">
                        Last Name *
                      </label>
                      <input
                        id={`${passenger.id}-lastName`}
                        type="text"
                        required
                        value={passenger.lastName}
                        onChange={(e) =>
                          updatePassenger(passenger.id, "lastName", e.target.value)
                        }
                        placeholder="Doe"
                        className={cn(
                          "w-full px-4 py-3 rounded-md",
                          "bg-input-background border border-border",
                          "text-foreground placeholder:text-muted-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-ring"
                        )}
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label htmlFor={`${passenger.id}-dob`} className="mb-2 block">
                        Date of Birth *
                      </label>
                      <input
                        id={`${passenger.id}-dob`}
                        type="date"
                        required
                        value={passenger.dateOfBirth}
                        onChange={(e) =>
                          updatePassenger(passenger.id, "dateOfBirth", e.target.value)
                        }
                        max={new Date().toISOString().split("T")[0]}
                        className={cn(
                          "w-full px-4 py-3 rounded-md",
                          "bg-input-background border border-border",
                          "text-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-ring"
                        )}
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label htmlFor={`${passenger.id}-gender`} className="mb-2 block">
                        Gender *
                      </label>
                      <select
                        id={`${passenger.id}-gender`}
                        required
                        value={passenger.gender}
                        onChange={(e) =>
                          updatePassenger(
                            passenger.id,
                            "gender",
                            e.target.value as PassengerInfo["gender"]
                          )
                        }
                        className={cn(
                          "w-full px-4 py-3 rounded-md",
                          "bg-input-background border border-border",
                          "text-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-ring"
                        )}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Nationality */}
                    <div className="md:col-span-2">
                      <label htmlFor={`${passenger.id}-nationality`} className="mb-2 block">
                        Nationality *
                      </label>
                      <input
                        id={`${passenger.id}-nationality`}
                        type="text"
                        required
                        value={passenger.nationality}
                        onChange={(e) =>
                          updatePassenger(passenger.id, "nationality", e.target.value)
                        }
                        placeholder="e.g., United States"
                        className={cn(
                          "w-full px-4 py-3 rounded-md",
                          "bg-input-background border border-border",
                          "text-foreground placeholder:text-muted-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-ring"
                        )}
                      />
                    </div>

                    {/* Passport Information (only for adults) */}
                    {showPassportInfo && passenger.type === "adult" && (
                      <>
                        <div>
                          <label
                            htmlFor={`${passenger.id}-passportNumber`}
                            className="mb-2 block"
                          >
                            Passport Number
                          </label>
                          <input
                            id={`${passenger.id}-passportNumber`}
                            type="text"
                            value={passenger.passportNumber || ""}
                            onChange={(e) =>
                              updatePassenger(passenger.id, "passportNumber", e.target.value)
                            }
                            placeholder="AB123456"
                            className={cn(
                              "w-full px-4 py-3 rounded-md",
                              "bg-input-background border border-border",
                              "text-foreground placeholder:text-muted-foreground",
                              "focus:outline-none focus:ring-2 focus:ring-ring"
                            )}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`${passenger.id}-passportExpiry`}
                            className="mb-2 block"
                          >
                            Passport Expiry Date
                          </label>
                          <input
                            id={`${passenger.id}-passportExpiry`}
                            type="date"
                            value={passenger.passportExpiry || ""}
                            onChange={(e) =>
                              updatePassenger(passenger.id, "passportExpiry", e.target.value)
                            }
                            min={new Date().toISOString().split("T")[0]}
                            className={cn(
                              "w-full px-4 py-3 rounded-md",
                              "bg-input-background border border-border",
                              "text-foreground",
                              "focus:outline-none focus:ring-2 focus:ring-ring"
                            )}
                          />
                        </div>
                      </>
                    )}

                    {/* Dietary Requirements */}
                    <div className="md:col-span-2">
                      <label
                        htmlFor={`${passenger.id}-dietary`}
                        className="mb-2 block"
                      >
                        Dietary Requirements (Optional)
                      </label>
                      <input
                        id={`${passenger.id}-dietary`}
                        type="text"
                        value={passenger.dietaryRequirements || ""}
                        onChange={(e) =>
                          updatePassenger(passenger.id, "dietaryRequirements", e.target.value)
                        }
                        placeholder="e.g., Vegetarian, Gluten-free, etc."
                        className={cn(
                          "w-full px-4 py-3 rounded-md",
                          "bg-input-background border border-border",
                          "text-foreground placeholder:text-muted-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-ring"
                        )}
                      />
                    </div>

                    {/* Special Needs */}
                    <div className="md:col-span-2">
                      <label htmlFor={`${passenger.id}-special`} className="mb-2 block">
                        Special Needs or Requests (Optional)
                      </label>
                      <textarea
                        id={`${passenger.id}-special`}
                        rows={3}
                        value={passenger.specialNeeds || ""}
                        onChange={(e) =>
                          updatePassenger(passenger.id, "specialNeeds", e.target.value)
                        }
                        placeholder="Any medical conditions, mobility issues, or special requests..."
                        className={cn(
                          "w-full px-4 py-3 rounded-md resize-none",
                          "bg-input-background border border-border",
                          "text-foreground placeholder:text-muted-foreground",
                          "focus:outline-none focus:ring-2 focus:ring-ring"
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Status */}
      <div className="wp-bg-muted-light rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">
              {passengers.filter(isPassengerComplete).length} of {totalPassengers} passenger
              {totalPassengers !== 1 ? "s" : ""} completed
            </p>
            <p className="text-muted-foreground">
              Please ensure all required fields are filled for each passenger before continuing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
