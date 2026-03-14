/**
 * Enhanced Booking Confirmation Page - WordPress Template
 * 
 * Feature-rich confirmation page with print, download, share, and calendar features.
 * 
 * **WordPress Mapping:**
 * - Template: page-booking-confirmation.php
 * - Template hierarchy: page-booking-confirmation.php → page.php → singular.php → index.php
 * 
 * **Required Patterns (in order):**
 * 1. Hero - Success message
 * 2. Booking Summary - Complete details
 * 3. Action Buttons - Print, Download, Share, Add to Calendar
 * 4. Next Steps - What to do next
 * 5. Contact Support - Help section
 * 
 * **Features:**
 * - Print-friendly layout
 * - Download PDF (mock)
 * - Add to calendar (iCal)
 * - QR code for booking reference
 * - Social sharing
 * - Email confirmation resend
 * 
 * @module BookingConfirmationPageEnhanced
 * @category pages
 * @wordpressTemplate page-booking-confirmation.php
 */

import { useNavigation } from "../contexts/NavigationContext";
import { useState } from "react";
import { 
  Check, 
  Calendar, 
  Users, 
  EnvelopeSimple as Mail, 
  Phone, 
  Printer, 
  DownloadSimple as Download, 
  ShareNetwork as Share2, 
  MapPin, 
  Clock,
  Copy,
  CheckCircle as CircleCheck,
  WarningCircle as AlertCircle,
  CreditCard,
  Info
} from "@phosphor-icons/react";
import { Container } from "../components/common/Container";
import { GroupBlock } from "../components/blocks/design/GroupBlock";
import { cn } from "../lib/utils";
import { toast } from "sonner";

/**
 * Booking confirmation data.
 */
interface BookingConfirmation {
  bookingId: string;
  tourTitle: string;
  tourImage?: string;
  tourSlug: string;
  travelDate: string;
  returnDate: string;
  duration: string;
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
  depositPaid: string;
  balanceDue: string;
  paymentStatus: "pending" | "confirmed" | "failed";
  bookingDate: string;
  confirmationEmail: string;
}

/**
 * Enhanced Booking Confirmation Page Component
 */
export default function BookingConfirmationPageEnhanced({ onNavigate }: { onNavigate?: (path: string) => void }) {
  const { navigateTo } = useNavigation();
  const nav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else navigateTo(path);
  };
  const [copied, setCopied] = useState(false);

  // Mock booking data (in real app, this would come from URL params or API)
  const booking: BookingConfirmation = {
    bookingId: "BK-2024-001234",
    tourTitle: "Iceland Explorer - Fire & Ice Adventure",
    tourSlug: "tour-single",
    travelDate: "2024-08-15",
    returnDate: "2024-08-22",
    duration: "8 days, 7 nights",
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
    totalPrice: "$5,990",
    depositPaid: "$1,500",
    balanceDue: "$4,490",
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

  /**
   * Handle share confirmation.
   */
  const handleShare = async () => {
    const shareData = {
      title: `Booking Confirmation - ${booking.bookingId}`,
      text: `My booking for ${booking.tourTitle} has been confirmed!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Shared successfully!");
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy link
      handleCopyBookingId();
    }
  };

  /**
   * Handle copy booking ID.
   */
  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(booking.bookingId);
    setCopied(true);
    toast.success("Booking ID copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Handle add to calendar.
   */
  const handleAddToCalendar = () => {
    const startDate = new Date(booking.travelDate);
    const endDate = new Date(booking.returnDate);
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${booking.tourTitle}`,
      `DESCRIPTION:Booking ID: ${booking.bookingId}`,
      `LOCATION:Tour Destination`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-${booking.bookingId}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Calendar event downloaded!");
  };

  /**
   * Handle resend confirmation email.
   */
  const handleResendEmail = () => {
    toast.success(`Confirmation email resent to ${booking.leadPassenger.email}`);
    // In real app, would call API
  };

  const travelDate = new Date(booking.travelDate);
  const returnDate = new Date(booking.returnDate);
  const bookingDate = new Date(booking.bookingDate);
  const totalPassengers = booking.passengers.adults + booking.passengers.children + booking.passengers.infants;

  return (
    <>
      {/* ================================================================
          SUCCESS HERO - Confirmation message
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-muted print:bg-white">
        <Container className="flex flex-col items-center">
          <div className="max-w-3xl w-full text-center flex flex-col items-center gap-fluid-lg">
            {/* Success Icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-[var(--radius-full)] bg-primary print:border-4 print:border-primary">
              <Check size={40} className="text-primary-foreground print:text-primary" />
            </div>

            <div className="flex flex-col gap-fluid-sm">
              <h1 className="m-0 text-fluid-4xl">Booking Confirmed!</h1>
              <p className="text-fluid-lg text-muted-foreground m-0">
                Thank you for your reservation. Your booking has been confirmed and a
                confirmation email has been sent to{" "}
                <strong className="text-foreground">{booking.leadPassenger.email}</strong>
              </p>
            </div>

            {/* Booking ID with copy button */}
            <div className="wp-callout-accent inline-flex items-center gap-fluid-md px-element-lg py-element-md print:border-2 rounded-[var(--radius-md)] bg-card">
              <div className="text-left flex flex-col gap-fluid-xs">
                <p className="text-fluid-sm text-muted-foreground m-0">Booking Reference</p>
                <p className="text-fluid-2xl m-0">{booking.bookingId}</p>
              </div>
              <button
                onClick={handleCopyBookingId}
                className={cn(
                  "p-element-sm rounded-[var(--radius-md)] transition-colors print:hidden",
                  "hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
                )}
                aria-label="Copy booking ID"
              >
                {copied ? (
                  <CircleCheck className="w-5 h-5 text-primary" />
                ) : (
                  <Copy className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          ACTION BUTTONS - Print, Download, Share, Calendar
          ================================================================ */}
      <section className="py-element-lg bg-background border-y border-border print:hidden">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-fluid-md">
            <button
              onClick={handlePrint}
              className={cn(
                "inline-flex items-center gap-fluid-sm px-element-md py-element-sm rounded-[var(--radius-md)]",
                "bg-card border border-border text-foreground",
                "hover:bg-accent transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring"
              )}
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownload}
              className={cn(
                "inline-flex items-center gap-fluid-sm px-element-md py-element-sm rounded-[var(--radius-md)]",
                "bg-card border border-border text-foreground",
                "hover:bg-accent transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring"
              )}
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleAddToCalendar}
              className={cn(
                "inline-flex items-center gap-fluid-sm px-element-md py-element-sm rounded-[var(--radius-md)]",
                "bg-card border border-border text-foreground",
                "hover:bg-accent transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring"
              )}
            >
              <Calendar className="w-4 h-4" />
              <span>Add to Calendar</span>
            </button>

            <button
              onClick={handleShare}
              className={cn(
                "inline-flex items-center gap-fluid-sm px-element-md py-element-sm rounded-[var(--radius-md)]",
                "bg-card border border-border text-foreground",
                "hover:bg-accent transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring"
              )}
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </Container>
      </section>

      {/* ================================================================
          BOOKING DETAILS - Complete summary
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-background">
        <Container className="flex flex-col items-center">
          <div className="max-w-4xl w-full flex flex-col gap-section-sm">
            <h2 className="m-0 text-fluid-3xl">Booking Details</h2>

            <div className="wp-booking-details-grid grid gap-fluid-lg md:grid-cols-2">
              {/* Tour Information */}
              <div className="bg-card border border-border rounded-[var(--radius-lg)] p-element-lg flex flex-col gap-fluid-md">
                <h3 className="m-0 text-fluid-lg flex items-center gap-fluid-sm">
                  <MapPin className="text-primary shrink-0" /> Tour Details
                </h3>
                <div className="flex flex-col gap-fluid-sm">
                  <div className="flex flex-col gap-fluid-xs">
                    <p className="text-fluid-sm text-muted-foreground m-0">Tour Name</p>
                    <p className="m-0">{booking.tourTitle}</p>
                  </div>
                  <div className="flex items-start gap-fluid-sm">
                    <Calendar className="w-4 h-4 text-primary translate-y-1 flex-shrink-0" />
                    <div className="flex flex-col gap-fluid-xs">
                      <span className="text-[length:var(--text-xs)] text-muted-foreground">Travel Date</span>
                      <p className="m-0">
                        {travelDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-fluid-sm">
                    <Calendar className="w-4 h-4 text-primary translate-y-1 flex-shrink-0" />
                    <div className="flex flex-col gap-fluid-xs">
                      <span className="text-[length:var(--text-xs)] text-muted-foreground">Return Date</span>
                      <p className="m-0">
                        {returnDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-fluid-sm">
                    <Clock className="w-4 h-4 text-primary translate-y-1 flex-shrink-0" />
                    <div className="flex flex-col gap-fluid-xs">
                      <p className="text-fluid-sm text-muted-foreground m-0">Duration</p>
                      <p className="m-0">{booking.duration}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passenger Information */}
              <div className="bg-card border border-border rounded-[var(--radius-lg)] p-element-lg flex flex-col gap-fluid-md">
                <h3 className="m-0 text-fluid-lg flex items-center gap-fluid-sm">
                  <Users className="text-primary shrink-0" /> Passenger
                </h3>
                <div className="flex flex-col gap-fluid-sm">
                  <div className="flex items-start gap-fluid-sm">
                    <Users className="w-4 h-4 text-primary translate-y-1 flex-shrink-0" />
                    <div className="flex flex-col gap-fluid-xs">
                      <p className="text-fluid-sm text-muted-foreground m-0">Total Passengers</p>
                      <p className="m-0">{totalPassengers} traveler{totalPassengers !== 1 ? "s" : ""}</p>
                      <p className="text-fluid-sm text-muted-foreground m-0">
                        {booking.passengers.adults} Adult{booking.passengers.adults !== 1 ? "s" : ""}
                        {booking.passengers.children > 0 && `, ${booking.passengers.children} Child${booking.passengers.children !== 1 ? "ren" : ""}`}
                        {booking.passengers.infants > 0 && `, ${booking.passengers.infants} Infant${booking.passengers.infants !== 1 ? "s" : ""}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-fluid-sm">
                    <Mail className="w-4 h-4 text-primary translate-y-1 flex-shrink-0" />
                    <div className="flex flex-col gap-fluid-xs">
                      <p className="text-fluid-sm text-muted-foreground m-0">Lead Passenger</p>
                      <p className="m-0">
                        {booking.leadPassenger.firstName} {booking.leadPassenger.lastName}
                      </p>
                      <p className="text-fluid-sm text-muted-foreground m-0">
                        {booking.leadPassenger.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-fluid-sm">
                    <Phone className="w-4 h-4 text-primary translate-y-1 flex-shrink-0" />
                    <div className="flex flex-col gap-fluid-xs">
                      <p className="text-fluid-sm text-muted-foreground m-0">Contact Number</p>
                      <p className="m-0">{booking.leadPassenger.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-card border border-border rounded-[var(--radius-lg)] p-element-lg flex flex-col gap-fluid-md">
                <h3 className="m-0 text-fluid-lg flex items-center gap-fluid-sm">
                  <CreditCard className="text-primary shrink-0" /> Payment
                </h3>
                <div className="flex flex-col gap-fluid-md">
                  <div className="flex items-start gap-fluid-sm">
                    <CreditCard className="w-4 h-4 text-primary translate-y-1 flex-shrink-0" />
                    <div className="flex flex-col gap-fluid-xs">
                      <p className="text-fluid-sm text-muted-foreground m-0">Payment Status</p>
                      <div className="flex items-center gap-fluid-sm">
                        <span
                          className={cn(
                            "inline-flex items-center gap-fluid-xs px-element-sm py-1 rounded-[var(--radius-full)] text-fluid-sm",
                            booking.paymentStatus === "confirmed" &&
                              "wp-bg-primary-light",
                            booking.paymentStatus === "pending" &&
                              "wp-bg-accent-medium",
                            booking.paymentStatus === "failed" &&
                              "wp-bg-destructive-light"
                          )}
                        >
                          {booking.paymentStatus === "confirmed" && <CircleCheck className="w-3.5 h-3.5" />}
                          {booking.paymentStatus === "pending" && <AlertCircle className="w-3.5 h-3.5" />}
                          {booking.paymentStatus === "failed" && <AlertCircle className="w-3.5 h-3.5" />}
                          {booking.paymentStatus === "confirmed" ? "Confirmed" : booking.paymentStatus === "pending" ? "Pending" : "Failed"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-element-md border-t border-border flex flex-col gap-fluid-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Price</span>
                      <span className="">{booking.totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deposit Paid</span>
                      <span className="text-primary">{booking.depositPaid}</span>
                    </div>
                    <div className="flex justify-between pt-element-sm border-t border-border">
                      <span className="">Balance Due</span>
                      <span className="text-fluid-lg">{booking.balanceDue}</span>
                    </div>
                    <p className="text-fluid-xs text-muted-foreground m-0">
                      Due 60 days before departure
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="bg-card border border-border rounded-[var(--radius-lg)] p-element-lg flex flex-col gap-fluid-md">
                <h3 className="m-0 text-fluid-lg flex items-center gap-fluid-sm">
                  <Calendar className="text-primary shrink-0" /> Departure
                </h3>
                <div className="flex flex-col gap-fluid-md">
                  <div className="flex flex-col gap-fluid-xs">
                    <p className="text-fluid-sm text-muted-foreground m-0">Booking Date</p>
                    <p className="m-0">
                      {bookingDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-fluid-xs">
                    <p className="text-fluid-sm text-muted-foreground m-0">Confirmation Email</p>
                    <p className="m-0">{booking.confirmationEmail}</p>
                    <button
                      onClick={handleResendEmail}
                      className="text-fluid-sm text-primary hover:underline print:hidden text-left"
                    >
                      Resend confirmation email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          NEXT STEPS - What to do next
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-muted print:bg-white">
        <Container className="flex flex-col items-center">
          <div className="max-w-3xl w-full text-center flex flex-col gap-section-sm">
            <h2 className="m-0 text-fluid-3xl">What Happens Next?</h2>

            <div className="flex flex-col gap-fluid-md text-left">
              {[
                {
                  step: 1,
                  title: "Check Your Email",
                  description: "You'll receive a detailed confirmation email with your booking reference and tour information.",
                },
                {
                  step: 2,
                  title: "Review Your Itinerary",
                  description: "Download or print your booking confirmation for your records. Add the tour dates to your calendar.",
                },
                {
                  step: 3,
                  title: "Prepare for Your Trip",
                  description: "We'll send you a pre-departure guide 30 days before your tour with packing lists, travel tips, and meeting point details.",
                },
                {
                  step: 4,
                  title: "Final Payment",
                  description: "Your balance payment is due 60 days before departure. We'll send you a reminder with payment instructions.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-fluid-md bg-card border border-border rounded-[var(--radius-lg)] p-element-lg"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-[var(--radius-full)] bg-primary text-primary-foreground flex items-center justify-center">
                    {item.step}
                  </div>
                  <div className="flex flex-col gap-fluid-xs">
                    <h4 className="m-0 text-fluid-lg">{item.title}</h4>
                    <p className="text-muted-foreground m-0">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          CONTACT SUPPORT - Help section
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-primary text-primary-foreground print:hidden">
        <Container className="flex flex-col items-center">
          <div className="max-w-3xl w-full text-center flex flex-col items-center gap-fluid-lg">
            <Info className="w-12 h-12" />
            <div className="flex flex-col gap-fluid-sm">
              <h2 className="m-0 text-primary-foreground text-fluid-3xl">Questions About Your Booking?</h2>
              <p className="text-fluid-lg text-primary-foreground/90 m-0">
                Our travel experts are here to help you with any questions
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-fluid-md">
              <button
                onClick={() => nav("/contact")}
                className={cn(
                  "inline-flex items-center gap-fluid-sm px-element-lg py-element-md rounded-[var(--radius-md)]",
                  "bg-background text-foreground",
                  "hover:bg-background/90 transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                )}
              >
                Contact Support
              </button>
              <button
                onClick={() => nav("/tours/" + booking.tourSlug)}
                className={cn(
                  "inline-flex items-center gap-fluid-sm px-element-lg py-element-md rounded-[var(--radius-md)]",
                  "border-2 border-primary-foreground/20 text-primary-foreground",
                  "hover:bg-primary-foreground/10 transition-all",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                )}
              >
                View Tour Details
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}