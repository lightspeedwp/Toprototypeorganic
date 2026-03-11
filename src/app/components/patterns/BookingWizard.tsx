/**
 * Booking Wizard Pattern - Multi-Step Booking Flow
 * 
 * A comprehensive booking wizard component that guides users through the
 * complete tour booking process in multiple steps.
 * 
 * **WordPress Mapping:**
 * - Pattern: lightspeed/booking-wizard
 * - Block composition: Group + Columns + Forms
 * 
 * **Steps:**
 * 1. Tour Selection + Date Picker
 * 2. Passenger Details
 * 3. Contact Information
 * 4. Review + Payment
 * 5. Confirmation
 * 
 * **Features:**
 * - Progress indicator
 * - Form validation
 * - localStorage persistence
 * - Accessibility-compliant
 * - Mobile-responsive
 * 
 * **Design System:**
 * - Typography: Lora (headings), Noto Sans (body)
 * - Colors: Semantic tokens from theme.css
 * - Spacing: Consistent rhythm with CSS variables
 * 
 * @module BookingWizard
 * @category patterns
 * @wordpressPattern lightspeed/booking-wizard
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  Users, 
  EnvelopeSimple as Mail, 
  CreditCard, 
  Check, 
  CaretRight as ChevronRight, 
  CaretLeft as ChevronLeft,
  WarningCircle as AlertCircle 
} from "@phosphor-icons/react";
import { Container } from "../common/Container";
import { cn } from "../../lib/utils";
import type { Tour } from "../../data/types";

/**
 * Booking step configuration.
 */
interface BookingStep {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  description: string;
}

/**
 * Booking data structure.
 */
export interface BookingData {
  tour: Tour | null;
  selectedDate: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  leadPassenger: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
  };
  additionalPassengers: Array<{
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  }>;
  specialRequests: string;
  paymentMethod: "credit-card" | "bank-transfer" | "";
  termsAccepted: boolean;
}

/**
 * Booking wizard props.
 */
interface BookingWizardProps {
  tour: Tour;
  onComplete?: (bookingData: BookingData) => void;
  onCancel?: () => void;
  onNavigate?: (pageId: string) => void;
  className?: string;
}

/**
 * Booking steps configuration.
 */
const BOOKING_STEPS: BookingStep[] = [
  {
    id: "date-selection",
    label: "Select Date",
    icon: Calendar,
    description: "Choose your travel dates",
  },
  {
    id: "passenger-details",
    label: "Passengers",
    icon: Users,
    description: "Add traveler information",
  },
  {
    id: "contact-info",
    label: "Contact",
    icon: Mail,
    description: "Your contact details",
  },
  {
    id: "payment",
    label: "Payment",
    icon: CreditCard,
    description: "Review and pay",
  },
];

/**
 * Booking Wizard Component.
 * 
 * Multi-step booking flow with progress tracking and validation.
 */
export function BookingWizard({
  tour,
  onComplete,
  onCancel,
  onNavigate,
  className,
}: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData>({
    tour,
    selectedDate: "",
    passengers: {
      adults: 2,
      children: 0,
      infants: 0,
    },
    leadPassenger: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
    },
    additionalPassengers: [],
    specialRequests: "",
    paymentMethod: "",
    termsAccepted: false,
  });

  // Load saved booking data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("booking-draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBookingData({ ...parsed, tour }); // Keep current tour
      } catch (e) {
        console.error("Failed to load saved booking:", e);
      }
    }
  }, [tour]);

  // Save booking data to localStorage
  useEffect(() => {
    localStorage.setItem("booking-draft", JSON.stringify(bookingData));
  }, [bookingData]);

  /**
   * Update booking data.
   */
  const updateBookingData = <K extends keyof BookingData>(
    key: K,
    value: BookingData[K]
  ) => {
    setBookingData((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Navigate to next step.
   */
  const handleNext = () => {
    if (currentStep < BOOKING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /**
   * Navigate to previous step.
   */
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /**
   * Complete booking.
   */
  const handleComplete = () => {
    onComplete?.(bookingData);
    localStorage.removeItem("booking-draft");
  };

  /**
   * Validate current step.
   */
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return bookingData.selectedDate !== "";
      case 1:
        return bookingData.passengers.adults > 0;
      case 2:
        return (
          bookingData.leadPassenger.firstName &&
          bookingData.leadPassenger.lastName &&
          bookingData.leadPassenger.email &&
          bookingData.leadPassenger.phone
        );
      case 3:
        return (
          bookingData.paymentMethod !== "" && 
          bookingData.termsAccepted
        );
      default:
        return false;
    }
  };

  const currentStepData = BOOKING_STEPS[currentStep];

  return (
    <section className={cn("py-section-sm md:py-section-md bg-background", className)}>
      <Container>
        {/* Progress Indicator */}
        <div className="mb-[var(--spacing-gap-2xl)] md:mb-[var(--spacing-gap-3xl)]">
          <div className="flex items-center justify-between mb-[var(--spacing-gap-md)]">
            {BOOKING_STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-[var(--radius-full)] transition-all duration-300",
                      isActive && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                      isCompleted && "bg-primary text-primary-foreground",
                      !isActive && !isCompleted && "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 md:w-6 md:h-6" />
                    ) : (
                      <StepIcon className="w-5 h-5 md:w-6 md:h-6" />
                    )}
                  </div>
                  
                  <div className="mt-[var(--spacing-element-sm)] text-center hidden md:block">
                    <p
                      className={cn(
                        "text-[length:var(--text-sm)] font-[var(--font-weight-medium)] transition-colors m-0",
                        isActive && "text-primary",
                        !isActive && "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </p>
                  </div>

                  {index < BOOKING_STEPS.length - 1 && (
                    <div
                      className={cn(
                        "absolute top-5 md:top-6 left-1/2 w-full h-0.5 -z-10 transition-colors duration-300 -translate-x-1/2",
                        isCompleted ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile step label */}
          <div className="md:hidden text-center mt-[var(--spacing-gap-md)]">
            <p className="text-[length:var(--text-sm)] text-muted-foreground m-0">
              Step {currentStep + 1} of {BOOKING_STEPS.length}
            </p>
            <h3 className="mt-[var(--spacing-element-xs)] mb-0">{currentStepData.label}</h3>
            <p className="text-[length:var(--text-sm)] text-muted-foreground mt-[var(--spacing-element-xs)] m-0">
              {currentStepData.description}
            </p>
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card border border-border rounded-[var(--radius-lg)] p-[var(--spacing-element-xl)] md:p-[var(--spacing-element-2xl)] mb-[var(--spacing-gap-xl)]"
          >
            {/* Step 1: Date Selection */}
            {currentStep === 0 && (
              <div>
                <h2 className="mb-[var(--spacing-element-sm)]">Select Your Travel Date</h2>
                <p className="text-muted-foreground mb-[var(--spacing-gap-lg)] m-0">
                  Choose when you'd like to start your {tour.title} adventure
                </p>
                
                <div className="space-y-[var(--spacing-gap-md)]">
                  <div>
                    <label htmlFor="travel-date" className="mb-[var(--spacing-element-sm)] block">
                      Departure Date
                    </label>
                    <input
                      id="travel-date"
                      type="date"
                      value={bookingData.selectedDate}
                      onChange={(e) => updateBookingData("selectedDate", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className={cn(
                        "w-full px-[var(--spacing-element-lg)] py-[var(--spacing-element-md)] rounded-[var(--radius-md)]",
                        "bg-input-background border border-border",
                        "text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      )}
                    />
                  </div>

                  {bookingData.selectedDate && (
                    <div className="wp-callout-accent">
                      <div className="flex items-start gap-[var(--spacing-gap-md)]">
                        <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-[var(--font-weight-medium)] m-0">Selected Date</p>
                          <p className="text-[length:var(--text-sm)] text-muted-foreground mt-[var(--spacing-element-xs)] m-0">
                            {new Date(bookingData.selectedDate).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Passenger Details */}
            {currentStep === 1 && (
              <div>
                <h2 className="mb-[var(--spacing-element-sm)]">Passenger Information</h2>
                <p className="text-muted-foreground mb-[var(--spacing-gap-lg)] m-0">
                  How many people will be traveling?
                </p>

                <div className="wp-booking-wizard__passengers-grid">
                  <div>
                    <label htmlFor="adults" className="mb-[var(--spacing-element-sm)] block">
                      Adults (18+)
                    </label>
                    <input
                      id="adults"
                      type="number"
                      min="1"
                      max="10"
                      value={bookingData.passengers.adults}
                      onChange={(e) =>
                        updateBookingData("passengers", {
                          ...bookingData.passengers,
                          adults: parseInt(e.target.value) || 0,
                        })
                      }
                      className={cn(
                        "w-full px-[var(--spacing-element-lg)] py-[var(--spacing-element-md)] rounded-[var(--radius-md)]",
                        "bg-input-background border border-border",
                        "text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring"
                      )}
                    />
                  </div>

                  <div>
                    <label htmlFor="children" className="mb-[var(--spacing-element-sm)] block">
                      Children (2-17)
                    </label>
                    <input
                      id="children"
                      type="number"
                      min="0"
                      max="10"
                      value={bookingData.passengers.children}
                      onChange={(e) =>
                        updateBookingData("passengers", {
                          ...bookingData.passengers,
                          children: parseInt(e.target.value) || 0,
                        })
                      }
                      className={cn(
                        "w-full px-[var(--spacing-element-lg)] py-[var(--spacing-element-md)] rounded-[var(--radius-md)]",
                        "bg-input-background border border-border",
                        "text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring"
                      )}
                    />
                  </div>

                  <div>
                    <label htmlFor="infants" className="mb-[var(--spacing-element-sm)] block">
                      Infants (0-1)
                    </label>
                    <input
                      id="infants"
                      type="number"
                      min="0"
                      max="10"
                      value={bookingData.passengers.infants}
                      onChange={(e) =>
                        updateBookingData("passengers", {
                          ...bookingData.passengers,
                          infants: parseInt(e.target.value) || 0,
                        })
                      }
                      className={cn(
                        "w-full px-[var(--spacing-element-lg)] py-[var(--spacing-element-md)] rounded-[var(--radius-md)]",
                        "bg-input-background border border-border",
                        "text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring"
                      )}
                    />
                  </div>
                </div>

                {/* Passenger Count Summary */}
                <div className="wp-callout-accent mt-[var(--spacing-gap-xl)]">
                  <div className="flex items-start gap-[var(--spacing-gap-md)]">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-[var(--font-weight-medium)] m-0">Total Passengers</p>
                      <p className="text-[length:var(--text-sm)] text-muted-foreground mt-[var(--spacing-element-xs)] m-0">
                        {bookingData.passengers.adults + 
                         bookingData.passengers.children + 
                         bookingData.passengers.infants}{" "}
                        travelers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 2 && (
              <div>
                <h2 className="mb-[var(--spacing-element-sm)]">Contact Information</h2>
                <p className="text-muted-foreground mb-[var(--spacing-gap-lg)] m-0">
                  Primary contact details for this booking
                </p>

                <div className="wp-booking-wizard__contact-grid">
                  <div>
                    <label htmlFor="firstName" className="mb-[var(--spacing-element-sm)] block">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={bookingData.leadPassenger.firstName}
                      onChange={(e) =>
                        updateBookingData("leadPassenger", {
                          ...bookingData.leadPassenger,
                          firstName: e.target.value,
                        })
                      }
                      className={cn(
                        "w-full px-[var(--spacing-element-lg)] py-[var(--spacing-element-md)] rounded-[var(--radius-md)]",
                        "bg-input-background border border-border",
                        "text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring"
                      )}
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="mb-[var(--spacing-element-sm)] block">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      value={bookingData.leadPassenger.lastName}
                      onChange={(e) =>
                        updateBookingData("leadPassenger", {
                          ...bookingData.leadPassenger,
                          lastName: e.target.value,
                        })
                      }
                      className={cn(
                        "w-full px-[var(--spacing-element-lg)] py-[var(--spacing-element-md)] rounded-[var(--radius-md)]",
                        "bg-input-background border border-border",
                        "text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring"
                      )}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-[var(--spacing-element-sm)] block">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={bookingData.leadPassenger.email}
                      onChange={(e) =>
                        updateBookingData("leadPassenger", {
                          ...bookingData.leadPassenger,
                          email: e.target.value,
                        })
                      }
                      className={cn(
                        "w-full px-[var(--spacing-element-lg)] py-[var(--spacing-element-md)] rounded-[var(--radius-md)]",
                        "bg-input-background border border-border",
                        "text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring"
                      )}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-[var(--spacing-element-sm)] block">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={bookingData.leadPassenger.phone}
                      onChange={(e) =>
                        updateBookingData("leadPassenger", {
                          ...bookingData.leadPassenger,
                          phone: e.target.value,
                        })
                      }
                      className={cn(
                        "w-full px-[var(--spacing-element-lg)] py-[var(--spacing-element-md)] rounded-[var(--radius-md)]",
                        "bg-input-background border border-border",
                        "text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring"
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="country" className="mb-[var(--spacing-element-sm)] block">
                      Country of Residence
                    </label>
                    <input
                      id="country"
                      type="text"
                      value={bookingData.leadPassenger.country}
                      onChange={(e) =>
                        updateBookingData("leadPassenger", {
                          ...bookingData.leadPassenger,
                          country: e.target.value,
                        })
                      }
                      className={cn(
                        "w-full px-[var(--spacing-element-lg)] py-[var(--spacing-element-md)] rounded-[var(--radius-md)]",
                        "bg-input-background border border-border",
                        "text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-ring"
                      )}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment & Review */}
            {currentStep === 3 && (
              <div>
                <h2 className="mb-[var(--spacing-element-sm)]">Review & Payment</h2>
                <p className="text-muted-foreground mb-[var(--spacing-gap-lg)] m-0">
                  Review your booking details and complete payment
                </p>

                {/* Booking Summary */}
                <div className="bg-muted rounded-[var(--radius-lg)] p-[var(--spacing-element-xl)] mb-[var(--spacing-gap-xl)]">
                  <h3 className="mb-[var(--spacing-element-md)]">Booking Summary</h3>
                  
                  <div className="space-y-[var(--spacing-gap-sm)]">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tour</span>
                      <span className="font-[var(--font-weight-medium)]">{tour.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Departure Date</span>
                      <span className="font-[var(--font-weight-medium)]">
                        {new Date(bookingData.selectedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Passengers</span>
                      <span className="font-[var(--font-weight-medium)]">
                        {bookingData.passengers.adults + 
                         bookingData.passengers.children + 
                         bookingData.passengers.infants}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lead Passenger</span>
                      <span className="font-[var(--font-weight-medium)]">
                        {bookingData.leadPassenger.firstName}{" "}
                        {bookingData.leadPassenger.lastName}
                      </span>
                    </div>
                    
                    <div className="pt-[var(--spacing-gap-sm)] mt-[var(--spacing-gap-sm)] border-t border-border">
                      <div className="flex justify-between items-center">
                        <span className="font-[var(--font-weight-medium)]">Total Price</span>
                        <span className="text-[length:var(--text-xl)] font-[var(--font-weight-medium)] text-primary">
                          {tour.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-[var(--spacing-gap-xl)]">
                  <label className="mb-[var(--spacing-element-md)] block">Payment Method *</label>
                  <div className="wp-booking-wizard__payment-grid">
                    <button
                      type="button"
                      onClick={() => updateBookingData("paymentMethod", "credit-card")}
                      className={cn(
                        "p-[var(--spacing-element-lg)] rounded-[var(--radius-lg)] border-2 transition-all text-left",
                        bookingData.paymentMethod === "credit-card"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-[var(--spacing-gap-md)]">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-[var(--font-weight-medium)] m-0">Credit Card</p>
                          <p className="text-[length:var(--text-sm)] text-muted-foreground m-0">
                            Secure payment
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateBookingData("paymentMethod", "bank-transfer")}
                      className={cn(
                        "p-[var(--spacing-element-lg)] rounded-[var(--radius-lg)] border-2 transition-all text-left",
                        bookingData.paymentMethod === "bank-transfer"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-[var(--spacing-gap-md)]">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-[var(--font-weight-medium)] m-0">Bank Transfer</p>
                          <p className="text-[length:var(--text-sm)] text-muted-foreground m-0">
                            Details via email
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start gap-[var(--spacing-gap-md)] mb-[var(--spacing-gap-xl)]">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={bookingData.termsAccepted}
                    onChange={(e) =>
                      updateBookingData("termsAccepted", e.target.checked)
                    }
                    className="mt-[var(--spacing-element-xs)] w-4 h-4 rounded-[var(--radius-sm)] border-border text-primary focus:ring-ring"
                  />
                  <label htmlFor="terms" className="text-[length:var(--text-sm)] cursor-pointer m-0">
                    I accept the{" "}
                    <a href="/terms-conditions" className="text-primary hover:underline">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {!isStepValid() && (
                  <div className="flex items-start gap-[var(--spacing-gap-md)] bg-destructive/10 border border-destructive/50 rounded-[var(--radius-lg)] p-[var(--spacing-element-lg)]">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[length:var(--text-sm)] font-[var(--font-weight-medium)] text-destructive m-0">
                        Please complete all required fields
                      </p>
                      <p className="text-[length:var(--text-sm)] text-muted-foreground mt-[var(--spacing-element-xs)] m-0">
                        Select a payment method and accept the terms to continue
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-[var(--spacing-gap-md)]">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={cn(
              "inline-flex items-center gap-[var(--spacing-gap-sm)] px-[var(--spacing-element-xl)] py-[var(--spacing-element-md)] rounded-[var(--radius-md)] transition-all",
              "border border-border text-foreground",
              "hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {currentStep < BOOKING_STEPS.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={cn(
                "inline-flex items-center gap-[var(--spacing-gap-sm)] px-[var(--spacing-element-xl)] py-[var(--spacing-element-md)] rounded-[var(--radius-md)] transition-all",
                "bg-primary text-primary-foreground",
                "hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!isStepValid()}
              className={cn(
                "inline-flex items-center gap-[var(--spacing-gap-sm)] px-[var(--spacing-element-xl)] py-[var(--spacing-element-md)] rounded-[var(--radius-md)] transition-all",
                "bg-primary text-primary-foreground",
                "hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <span>Complete Booking</span>
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}