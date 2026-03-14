/**
 * Booking Confirmation Page - WordPress Template
 * 
 * Displays booking confirmation after successful reservation.
 * Shows booking details, payment status, and next steps.
 * 
 * **WordPress Mapping:**
 * - Template: page-booking-confirmation.php
 * - Template hierarchy: page-booking-confirmation.php → page.php → singular.php → index.php
 * 
 * **Required Patterns (in order):**
 * 1. Hero - Confirmation message
 * 2. Booking Summary - Details of reservation
 * 3. Payment Info - Status and instructions
 * 4. Next Steps - What to do next
 * 5. CTA - Print confirmation, contact support
 * 
 * @module BookingConfirmationPage
 * @category pages
 * @wordpressTemplate page-booking-confirmation.php
 */

import { Check, Calendar, Users, EnvelopeSimple as Mail, Phone, Printer, DownloadSimple as Download, ShareNetwork as Share2, MapPin, Clock } from "@phosphor-icons/react";
import { Container } from "../components/common/Container";
import { CTA } from "../components/patterns/CTA";
import { GroupBlock } from "../components/blocks/design/GroupBlock";
import { SocialShare } from "../components/patterns/SocialShare";
import { cn } from "../lib/utils";
import { toast } from "sonner";

/**
 * Booking confirmation data.
 */
interface BookingConfirmation {
  bookingId: string;
  tourTitle: string;
  tourImage?: string;
  travelDate: string;
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
  };
  totalPrice: string;
  paymentStatus: "pending" | "confirmed" | "failed";
  bookingDate: string;
  confirmationEmail: string;
}

/**
 * Booking Confirmation Page Component
 */
export function BookingConfirmationPage() {
  // Mock booking data (in real app, this would come from URL params or API)
  const booking: BookingConfirmation = {
    bookingId: "BK-2024-001234",
    tourTitle: "Kenya Safari Adventure - 7 Days",
    travelDate: "2024-08-15",
    passengers: {
      adults: 2,
      children: 0,
      infants: 0,
    },
    leadPassenger: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
    totalPrice: "$4,998",
    paymentStatus: "confirmed",
    bookingDate: new Date().toISOString(),
    confirmationEmail: "bookings@lightspeedtours.com",
  };

  /**
   * Handle print confirmation.
   */
  const handlePrint = () => {
    window.print();
    toast.success("Opening print dialog...");
  };

  /**
   * Handle download confirmation (mock).
   */
  const handleDownload = () => {
    toast.success("Downloading confirmation PDF...");
    // In real app, would generate and download PDF
  };

  const travelDate = new Date(booking.travelDate);
  const bookingDate = new Date(booking.bookingDate);

  return (
    <>
      {/* ================================================================
          HERO - Confirmation message
          ================================================================ */}
      <GroupBlock sectionStyle="section-hero-default">
        <Container className="flex flex-col items-center">
          <div className="max-w-3xl w-full text-center flex flex-col items-center gap-6">
            {/* Success Icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
              <Check size={40} className="text-primary-foreground" />
            </div>

            <h1 className="text-foreground">Booking Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your reservation. Your booking has been confirmed and a
              confirmation email has been sent to{" "}
              <strong className="text-foreground">{booking.leadPassenger.email}</strong>
            </p>

            {/* Booking Reference */}
            <div className="inline-flex items-center gap-3 rounded-lg border-2 border-primary bg-primary/10 px-6 py-4">
              <span className="text-sm text-muted-foreground">Booking Reference:</span>
              <span className="text-xl font-bold text-foreground">{booking.bookingId}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Printer size={20} />
                Print Confirmation
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-foreground transition-colors hover:bg-muted"
              >
                <Download size={20} />
                Download PDF
              </button>
            </div>
          </div>
        </Container>
      </GroupBlock>

      {/* ================================================================
          BOOKING SUMMARY - Details of reservation
          ================================================================ */}
      <GroupBlock sectionStyle="section-default">
        <Container className="flex flex-col items-center">
          <div className="max-w-4xl w-full flex flex-col gap-8 items-center">
            <h2 className="text-center text-foreground">Booking Summary</h2>

            <div className="flex flex-col gap-6 w-full">
              {/* Tour Details */}
              <div className="rounded-lg border border-border bg-card p-6 flex flex-col gap-4">
                <h3 className="flex items-center gap-2 text-foreground">
                  <MapPin size={24} className="text-primary" />
                  Tour Details
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tour:</span>
                    <span className="font-medium text-foreground">{booking.tourTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Travel Date:</span>
                    <span className="font-medium text-foreground">
                      {travelDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking Date:</span>
                    <span className="font-medium text-foreground">
                      {bookingDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Passenger Details */}
              <div className="rounded-lg border border-border bg-card p-6 flex flex-col gap-4">
                <h3 className="flex items-center gap-2 text-foreground">
                  <Users size={24} className="text-primary" />
                  Passengers
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Adults:</span>
                    <span className="font-medium text-foreground">{booking.passengers.adults}</span>
                  </div>
                  {booking.passengers.children > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Children:</span>
                      <span className="font-medium text-foreground">{booking.passengers.children}</span>
                    </div>
                  )}
                  {booking.passengers.infants > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Infants:</span>
                      <span className="font-medium text-foreground">{booking.passengers.infants}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Details */}
              <div className="rounded-lg border border-border bg-card p-6 flex flex-col gap-4">
                <h3 className="flex items-center gap-2 text-foreground">
                  <Mail size={24} className="text-primary" />
                  Lead Passenger
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium text-foreground">
                      {booking.leadPassenger.firstName} {booking.leadPassenger.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium text-foreground">{booking.leadPassenger.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium text-foreground">{booking.leadPassenger.phone}</span>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="rounded-lg border-2 border-primary bg-primary/10 p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-foreground">Total Amount</h3>
                  <span className="font-serif text-fluid-3xl text-foreground">{booking.totalPrice}</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-background/50 px-4 py-3">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
                      booking.paymentStatus === "confirmed" &&
                        "bg-primary text-primary-foreground",
                      booking.paymentStatus === "pending" &&
                        "bg-accent text-accent-foreground",
                      booking.paymentStatus === "failed" &&
                        "bg-destructive text-destructive-foreground"
                    )}
                  >
                    {booking.paymentStatus === "confirmed" && <Check size={16} />}
                    {booking.paymentStatus === "confirmed" && "Confirmed"}
                    {booking.paymentStatus === "pending" && <Clock size={16} />}
                    {booking.paymentStatus === "pending" && "Pending"}
                    {booking.paymentStatus === "failed" && "Failed"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </GroupBlock>

      {/* ================================================================
          NEXT STEPS - What to do next
          ================================================================ */}
      <GroupBlock sectionStyle="section-accent-subtle">
        <Container className="flex flex-col items-center">
          <div className="max-w-3xl w-full flex flex-col gap-8 items-center">
            <h2 className="text-center text-foreground">What Happens Next?</h2>

            <div className="flex flex-col gap-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-foreground">Check Your Email</h3>
                  <p className="text-muted-foreground">
                    A confirmation email with all booking details has been sent to{" "}
                    <strong className="text-foreground">{booking.leadPassenger.email}</strong>.
                    Please check your spam folder if you don't see it within 10 minutes.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-foreground">Complete Payment</h3>
                  <p className="text-muted-foreground">
                    {booking.paymentStatus === "confirmed"
                      ? "Your payment has been processed successfully. Thank you!"
                      : "Please complete the payment using the link sent to your email within 24 hours to secure your booking."}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-foreground">Prepare for Your Trip</h3>
                  <p className="text-muted-foreground">
                    Review the tour itinerary, packing list, and travel requirements.
                    Our team will contact you 2 weeks before departure with final details.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  4
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-foreground">Contact Support</h3>
                  <p className="text-muted-foreground">
                    Have questions? Our support team is available 24/7 to help you.
                    Email us at{" "}
                    <a
                      href={`mailto:${booking.confirmationEmail}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {booking.confirmationEmail}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </GroupBlock>

      {/* ================================================================
          SHARE - Social sharing
          ================================================================ */}
      <GroupBlock sectionStyle="section-default">
        <Container className="flex flex-col items-center">
          <div className="max-w-3xl w-full text-center flex flex-col items-center gap-4">
            <h3 className="text-foreground">Share Your Adventure</h3>
            <p className="text-muted-foreground">
              Excited about your upcoming trip? Share it with friends and family!
            </p>
            <div className="flex justify-center">
              <SocialShare
                title={`I just booked ${booking.tourTitle}!`}
                description="Join me on this amazing adventure"
                variant="buttons"
                showLabels
              />
            </div>
          </div>
        </Container>
      </GroupBlock>

      {/* ================================================================
          CTA - Continue browsing
          ================================================================ */}
      <CTA
        title="Need Help?"
        description="Our support team is here to assist you with any questions about your booking."
        primaryAction={{
          label: "Contact Support",
          href: "contact-page",
        }}
        secondaryAction={{
          label: "View My Bookings",
          href: "home-page",
        }}
        variant="centered"
      />
    </>
  );
}

export default BookingConfirmationPage;