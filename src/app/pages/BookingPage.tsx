/**
 * Booking Page - Complete Tour Booking Flow
 * 
 * A complete booking page that demonstrates the end-to-end user journey
 * from tour selection to booking confirmation.
 * 
 * **WordPress Mapping:**
 * - Template: page-booking.php
 * - Template hierarchy: page-booking.php → page.php → singular.php → index.php
 * 
 * **Required Patterns (in order):**
 * 1. Hero - Booking introduction
 * 2. BookingWizard - Multi-step booking flow
 * 3. Trust Indicators - Security badges
 * 4. FAQ - Common booking questions
 * 
 * **Features:**
 * - Multi-step wizard
 * - Form persistence
 * - Validation
 * - Mobile-responsive
 * - Accessibility-compliant
 * 
 * @module BookingPage
 * @category pages
 * @wordpressTemplate page-booking.php
 */

import { useState } from "react";
import { useNavigate } from "../hooks/use-navigate";
import { BookingWizard, type BookingData } from "../components/patterns/BookingWizard";
import { Container } from "../components/common/Container";
import { Shield, LockKey as Lock, Medal as Award, Headphones as HeadphonesIcon } from "@phosphor-icons/react";
import { cn } from "../lib/utils";
import { TOURS } from "../data/mock";
import type { Tour } from "../data/types";

/**
 * Booking Page props.
 */
interface BookingPageProps {
  tourId?: string;
  onNavigate?: (pageId: string) => void;
}

/**
 * Booking Page Component.
 */
export default function BookingPage({ tourId, onNavigate }: BookingPageProps) {
  const navigate = useNavigate(onNavigate);
  
  // Get tour from mock data (in real app, would fetch from API/props)
  const tour: Tour = tourId 
    ? TOURS.find(t => t.id === tourId) || TOURS[0]
    : TOURS[0];

  /**
   * Handle booking completion.
   */
  const handleBookingComplete = (bookingData: BookingData) => {
    console.log("Booking completed:", bookingData);
    
    // Navigate to payment page
    navigate("payment-page");
  };

  /**
   * Handle booking cancellation.
   */
  const handleBookingCancel = () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      navigate("tours-archive");
    }
  };

  return (
    <main className="theme-organic">
      <div className="organic-section-top">
        {/* Hero Section */}
        <section className="py-section-sm md:py-section-md">
          <Container>
            <div className="max-w-3xl">
              <h1 className="mb-4">Book Your Adventure</h1>
              <p className="text-lg text-muted-foreground">
                You're just a few steps away from an unforgettable journey. Complete the booking
                process below to secure your spot on <span className="font-medium text-foreground">{tour.title}</span>.
              </p>
            </div>
          </Container>
        </section>

        {/* Trust Indicators */}
        <section className="py-8 bg-background/50 border-y border-border/20">
          <Container>
            <div className="wp-booking-trust-grid">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Secure Booking</p>
                  <p className="text-xs text-muted-foreground">256-bit SSL</p>
                </div>
              </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Data Protected</p>
                <p className="text-xs text-muted-foreground">GDPR compliant</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Best Price</p>
                <p className="text-xs text-muted-foreground">Guaranteed</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <HeadphonesIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">24/7 Support</p>
                <p className="text-xs text-muted-foreground">Here to help</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
      </div>

      <div className="organic-section-middle">
        {/* Booking Wizard */}
        <BookingWizard
          tour={tour}
          onComplete={handleBookingComplete}
          onCancel={handleBookingCancel}
        />
      </div>

      <div className="organic-section-bottom">
        {/* FAQ Section */}
      <section className="py-section-sm md:py-section-md bg-muted">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-2 text-center">Booking Questions?</h2>
            <p className="text-muted-foreground text-center mb-8">
              Everything you need to know about the booking process
            </p>

            <div className="space-y-4">
              {[
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards (Visa, Mastercard, Amex) and bank transfers. All payments are processed securely through our encrypted payment gateway.",
                },
                {
                  question: "When will I receive my booking confirmation?",
                  answer: "You'll receive an instant confirmation email as soon as your booking is complete. This includes your booking reference number and tour details.",
                },
                {
                  question: "Can I modify my booking later?",
                  answer: "Yes! You can modify your booking up to 30 days before departure. Contact our support team with your booking reference to make changes.",
                },
                {
                  question: "What is your cancellation policy?",
                  answer: "Cancellations made 60+ days before departure receive a full refund minus a small processing fee. See our full Terms & Conditions for details.",
                },
                {
                  question: "Is travel insurance included?",
                  answer: "Travel insurance is not included but highly recommended. We can help you arrange comprehensive coverage during the booking process.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h4 className="font-medium">{faq.question}</h4>
                    <svg
                      className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180"
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
                  </summary>
                  <p className="mt-3 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Support CTA */}
      <section className="py-section-sm md:py-section-md bg-primary text-primary-foreground">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <HeadphonesIcon className="w-12 h-12 mx-auto mb-4" />
            <h2 className="mb-4">Need Assistance?</h2>
            <p className="text-lg mb-6 text-primary-foreground/90">
              Our travel experts are here to help you every step of the way
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate("contact-page")}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-md",
                  "bg-background text-foreground",
                  "hover:bg-background/90 transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                )}
              >
                Contact Us
              </button>
              <a
                href="tel:+1234567890"
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-md",
                  "border-2 border-primary-foreground/20 text-primary-foreground",
                  "hover:bg-primary-foreground/10 transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                )}
              >
                Call: +1 (234) 567-890
              </a>
            </div>
          </div>
        </Container>
      </section>
      </div>
    </main>
  );
}