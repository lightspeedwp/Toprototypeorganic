/**
 * Booking Management Page - View and Manage Bookings
 * 
 * A comprehensive page for users to view, filter, and manage their tour bookings.
 * 
 * **WordPress Mapping:**
 * - Template: page-my-bookings.php
 * - Template hierarchy: page-my-bookings.php → page.php → singular.php → index.php
 * 
 * **Required Patterns (in order):**
 * 1. Hero - Page introduction
 * 2. Filter/Sort Controls - Filter bookings by status/date
 * 3. Booking List - List of all bookings
 * 4. Empty State - No bookings message
 * 5. CTA - Book new tour
 * 
 * **Features:**
 * - View all bookings
 * - Filter by status (upcoming, completed, cancelled)
 * - Sort by date
 * - Quick actions (view details, cancel, modify)
 * - Print booking confirmation
 * - Download booking documents
 * 
 * @module BookingManagementPage
 * @category pages
 * @wordpressTemplate page-my-bookings.php
 */

import { useNavigation } from "../contexts/NavigationContext";
import { useState } from "react";
import { 
  Calendar, 
  Users, 
  CurrencyDollar as DollarSign, 
  MapPin,
  Faders as Filter,
  CaretDown as ChevronDown,
  Eye,
  Printer,
  Download,
  XCircle as CircleX,
  PencilSimple as Edit,
  CheckCircle as CircleCheck,
  Clock,
  WarningCircle as AlertCircle,
  MagnifyingGlass as Search
} from "@phosphor-icons/react";
import { Container } from "../components/common/Container";
import { cn } from "../lib/utils";
import { toast } from "sonner";

/**
 * Booking status type.
 */
type BookingStatus = "upcoming" | "completed" | "cancelled" | "pending";

/**
 * Booking item structure.
 */
interface Booking {
  id: string;
  bookingRef: string;
  tourTitle: string;
  tourImage: string;
  departureDate: string;
  returnDate: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  totalPrice: string;
  status: BookingStatus;
  bookingDate: string;
}

/**
 * Mock bookings data.
 */
const MOCK_BOOKINGS: Booking[] = [
  {
    id: "1",
    bookingRef: "BK-2024-001234",
    tourTitle: "Iceland Explorer - Fire & Ice Adventure",
    tourImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800",
    departureDate: "2024-08-15",
    returnDate: "2024-08-22",
    passengers: { adults: 2, children: 0, infants: 0 },
    totalPrice: "$5,990",
    status: "upcoming",
    bookingDate: "2024-01-15",
  },
  {
    id: "2",
    bookingRef: "BK-2024-000987",
    tourTitle: "Kenya Safari Adventure - Big Five Experience",
    tourImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
    departureDate: "2024-06-10",
    returnDate: "2024-06-17",
    passengers: { adults: 2, children: 1, infants: 0 },
    totalPrice: "$8,500",
    status: "upcoming",
    bookingDate: "2023-12-20",
  },
  {
    id: "3",
    bookingRef: "BK-2023-008765",
    tourTitle: "Antarctica Expedition - Ultimate Polar Experience",
    tourImage: "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=800",
    departureDate: "2023-11-20",
    returnDate: "2023-12-05",
    passengers: { adults: 2, children: 0, infants: 0 },
    totalPrice: "$12,990",
    status: "completed",
    bookingDate: "2023-08-10",
  },
];

/**
 * Booking Management Page Component.
 */
export default function BookingManagementPage({ onNavigate }: BookingManagementPageProps) {
  const { navigateTo } = useNavigation();
  const nav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else navigateTo(path);
  };
  const [bookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "price">("date");

  /**
   * Filter and sort bookings.
   */
  const filteredBookings = bookings
    .filter((booking) => {
      if (statusFilter !== "all" && booking.status !== statusFilter) return false;
      if (searchQuery && !booking.tourTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !booking.bookingRef.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime();
      }
      return parseFloat(b.totalPrice.replace(/[^0-9.-]+/g, "")) - parseFloat(a.totalPrice.replace(/[^0-9.-]+/g, ""));
    });

  /**
   * Get status badge color.
   */
  const getStatusBadge = (status: BookingStatus) => {
    const badges = {
      upcoming: {
        bg: "wp-bg-primary-light",
        text: "",
        icon: CircleCheck,
      },
      completed: {
        bg: "bg-muted",
        text: "text-muted-foreground",
        icon: CircleCheck,
      },
      cancelled: {
        bg: "wp-bg-destructive-light",
        text: "",
        icon: CircleX,
      },
      pending: {
        bg: "wp-bg-accent-medium",
        text: "",
        icon: Clock,
      },
    };
    return badges[status];
  };

  /**
   * Handle view booking details.
   */
  const handleViewDetails = (bookingRef: string) => {
    toast.info(`Viewing details for ${bookingRef}`);
    nav("/booking/confirmation");
  };

  /**
   * Handle print booking.
   */
  const handlePrint = (bookingRef: string) => {
    toast.success(`Printing ${bookingRef}...`);
    window.print();
  };

  /**
   * Handle download booking.
   */
  const handleDownload = (bookingRef: string) => {
    toast.success(`Downloading ${bookingRef} PDF...`);
  };

  /**
   * Handle modify booking.
   */
  const handleModify = (bookingRef: string) => {
    toast.info(`Modify booking ${bookingRef} - Contact support for changes`);
  };

  /**
   * Handle cancel booking.
   */
  const handleCancel = (bookingRef: string) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this booking? This action cannot be undone."
    );
    if (confirm) {
      toast.success(`Booking ${bookingRef} cancelled`);
    }
  };

  const totalPassengers = (booking: Booking) =>
    booking.passengers.adults + booking.passengers.children + booking.passengers.infants;

  return (
    <>
      {/* ================================================================
          HERO - Page introduction
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-muted">
        <Container>
          <div className="max-w-3xl">
            <h1 className="mb-4">My Bookings</h1>
            <p className="text-lg text-muted-foreground">
              View and manage all your tour bookings in one place
            </p>
          </div>
        </Container>
      </section>

      {/* ================================================================
          FILTERS & SEARCH - Filter and sort controls
          ================================================================ */}
      <section className="py-6 bg-background border-b border-border">
        <Container>
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tour name or booking ID..."
                className={cn(
                  "w-full pl-10 pr-4 py-2 rounded-md",
                  "bg-input-background border border-border",
                  "text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring"
                )}
              />
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              {(["all", "upcoming", "completed", "cancelled"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm transition-colors",
                    "border border-border",
                    "focus:outline-none focus:ring-2 focus:ring-ring",
                    statusFilter === status
                      ? "bg-primary text-primary-foreground"
                      : "bg-card hover:bg-accent"
                  )}
                >
                  {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "price")}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm",
                  "bg-input-background border border-border",
                  "text-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-ring"
                )}
              >
                <option value="date">Date</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mt-4">
            Showing {filteredBookings.length} of {bookings.length} booking
            {bookings.length !== 1 ? "s" : ""}
          </p>
        </Container>
      </section>

      {/* ================================================================
          BOOKING LIST - List of all bookings
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-background">
        <Container>
          {filteredBookings.length > 0 ? (
            <div className="space-y-6">
              {filteredBookings.map((booking) => {
                const StatusBadge = getStatusBadge(booking.status);
                const StatusIcon = StatusBadge.icon;
                const departureDate = new Date(booking.departureDate);
                const returnDate = new Date(booking.returnDate);

                return (
                  <div
                    key={booking.id}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Tour Image */}
                      <div className="md:w-48 md:flex-shrink-0">
                        <img
                          src={booking.tourImage}
                          alt={booking.tourTitle}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>

                      {/* Booking Details */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="flex-1">
                                <h3 className="mb-2">{booking.tourTitle}</h3>
                                <p className="text-sm text-muted-foreground font-mono">
                                  {booking.bookingRef}
                                </p>
                              </div>
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
                                  StatusBadge.bg,
                                  StatusBadge.text
                                )}
                              >
                                <StatusIcon className="w-3.5 h-3.5" />
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Departure</p>
                                  <p className="text-sm font-medium">
                                    {departureDate.toLocaleDateString()}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Return</p>
                                  <p className="text-sm font-medium">
                                    {returnDate.toLocaleDateString()}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-primary flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Passengers</p>
                                  <p className="text-sm font-medium">
                                    {totalPassengers(booking)} traveler{totalPassengers(booking) !== 1 ? "s" : ""}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-primary flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-muted-foreground">Total</p>
                                  <p className="text-sm font-medium">{booking.totalPrice}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
                          <button
                            onClick={() => handleViewDetails(booking.bookingRef)}
                            className={cn(
                              "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm",
                              "bg-primary text-primary-foreground",
                              "hover:bg-primary/90 transition-colors",
                              "focus:outline-none focus:ring-2 focus:ring-ring"
                            )}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View Details
                          </button>

                          <button
                            onClick={() => handlePrint(booking.bookingRef)}
                            className={cn(
                              "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm",
                              "border border-border text-foreground",
                              "hover:bg-accent transition-colors",
                              "focus:outline-none focus:ring-2 focus:ring-ring"
                            )}
                          >
                            <Printer className="w-3.5 h-3.5" />
                            Print
                          </button>

                          <button
                            onClick={() => handleDownload(booking.bookingRef)}
                            className={cn(
                              "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm",
                              "border border-border text-foreground",
                              "hover:bg-accent transition-colors",
                              "focus:outline-none focus:ring-2 focus:ring-ring"
                            )}
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </button>

                          {booking.status === "upcoming" && (
                            <>
                              <button
                                onClick={() => handleModify(booking.bookingRef)}
                                className={cn(
                                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm",
                                  "border border-border text-foreground",
                                  "hover:bg-accent transition-colors",
                                  "focus:outline-none focus:ring-2 focus:ring-ring"
                                )}
                              >
                                <Edit className="w-3.5 h-3.5" />
                                Modify
                              </button>

                              <button
                                onClick={() => handleCancel(booking.bookingRef)}
                                className={cn(
                                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm",
                                  "border border-destructive text-destructive",
                                  "hover:bg-destructive/10 transition-colors",
                                  "focus:outline-none focus:ring-2 focus:ring-ring"
                                )}
                              >
                                <CircleX className="w-3.5 h-3.5" />
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-section-sm">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="mb-2">No Bookings Found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "You haven't made any bookings yet"}
              </p>
              <button
                onClick={() => nav("/tours")}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-md",
                  "bg-primary text-primary-foreground",
                  "hover:bg-primary/90 transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-ring"
                )}
              >
                Browse Tours
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ================================================================
          CTA - Book new tour
          ================================================================ */}
      {filteredBookings.length > 0 && (
        <section className="py-section-sm md:py-section-md bg-muted">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-4">Ready for Your Next Adventure?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Explore our collection of incredible tours around the world
              </p>
              <button
                onClick={() => nav("/tours")}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-md",
                  "bg-primary text-primary-foreground",
                  "hover:bg-primary/90 transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-ring"
                )}
              >
                Browse All Tours
              </button>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

/**
 * Booking Management Page Props.
 */
interface BookingManagementPageProps {
  onNavigate?: (pageId: string) => void;
}