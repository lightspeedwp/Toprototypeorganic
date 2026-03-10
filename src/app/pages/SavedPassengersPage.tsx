/**
 * Saved Passengers Page - Manage Saved Traveler Information
 * 
 * A page for managing saved passenger information for quick booking.
 * 
 * **WordPress Mapping:**
 * - Template: page-saved-passengers.php
 * - Template hierarchy: page-saved-passengers.php → page.php → singular.php → index.php
 * 
 * **Required Patterns (in order):**
 * 1. Hero - Page introduction
 * 2. Passenger List - Saved passenger cards
 * 3. Add Passenger - Form to add new passenger
 * 4. Empty State - No passengers message
 * 
 * **Features:**
 * - View all saved passengers
 * - Add new passenger
 * - Edit passenger details
 * - Delete passenger
 * - Mark as default/primary
 * - Passenger type indicators (adult, child, infant)
 * 
 * @module SavedPassengersPage
 * @category pages
 * @wordpressTemplate page-saved-passengers.php
 */

import { useState } from "react";
import { Container } from "../components/common/Container";
import { PassengerDetailsForm, type PassengerInfo } from "../components/patterns/PassengerDetailsForm";
import { 
  Users, 
  Plus, 
  PencilSimple as Edit, 
  Trash as Trash2, 
  Star, 
  Star as StarOff,
  CheckCircle as CircleCheck,
  User,
  Baby,
  UserCircle as UserRound
} from "@phosphor-icons/react";
import { cn } from "../lib/utils";
import { toast } from "sonner";

/**
 * Saved passengers page props.
 */
interface SavedPassengersPageProps {
  onNavigate?: (pageId: string) => void;
}

/**
 * Mock saved passengers data.
 */
const MOCK_PASSENGERS: PassengerInfo[] = [
  {
    id: "1",
    type: "adult",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1985-03-15",
    gender: "male",
    nationality: "United States",
    passportNumber: "AB123456",
    passportExpiry: "2028-03-15",
    dietaryRequirements: "Vegetarian",
  },
  {
    id: "2",
    type: "adult",
    firstName: "Jane",
    lastName: "Doe",
    dateOfBirth: "1987-07-22",
    gender: "female",
    nationality: "United States",
    passportNumber: "CD789012",
    passportExpiry: "2029-07-22",
    dietaryRequirements: "Gluten-free",
  },
  {
    id: "3",
    type: "child",
    firstName: "Emma",
    lastName: "Doe",
    dateOfBirth: "2015-11-10",
    gender: "female",
    nationality: "United States",
    dietaryRequirements: "None",
  },
];

/**
 * Saved Passengers Page Component.
 */
export default function SavedPassengersPage({ onNavigate }: SavedPassengersPageProps) {
  const [passengers, setPassengers] = useState<PassengerInfo[]>(MOCK_PASSENGERS);
  const [primaryPassengerId, setPrimaryPassengerId] = useState<string>("1");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  /**
   * Handle delete passenger.
   */
  const handleDelete = (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this passenger?");
    if (confirm) {
      setPassengers((prev) => prev.filter((p) => p.id !== id));
      toast.success("Passenger deleted successfully");
    }
  };

  /**
   * Handle set as primary.
   */
  const handleSetPrimary = (id: string) => {
    setPrimaryPassengerId(id);
    toast.success("Primary passenger updated");
  };

  /**
   * Handle add new passenger.
   */
  const handleAddPassenger = () => {
    setShowAddForm(true);
    setEditingId(null);
  };

  /**
   * Handle edit passenger.
   */
  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowAddForm(true);
  };

  /**
   * Get passenger type icon.
   */
  const getPassengerTypeIcon = (type: PassengerInfo["type"]) => {
    switch (type) {
      case "adult":
        return User;
      case "child":
        return UserRound;
      case "infant":
        return Baby;
    }
  };

  /**
   * Get passenger type label.
   */
  const getPassengerTypeLabel = (type: PassengerInfo["type"]) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <>
      {/* ================================================================
          HERO - Page introduction
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-muted">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-primary" />
              <h1>Saved Passengers</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Save passenger details for faster booking. Add family members, friends, or
              yourself to quickly fill out booking forms.
            </p>
          </div>
        </Container>
      </section>

      {/* ================================================================
          MAIN CONTENT - Passenger list & management
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-background">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Add Passenger Button */}
            {!showAddForm && (
              <div className="mb-8">
                <button
                  onClick={handleAddPassenger}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-md",
                    "bg-primary text-primary-foreground",
                    "hover:bg-primary/90 transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-ring"
                  )}
                >
                  <Plus className="w-5 h-5" />
                  <span>Add New Passenger</span>
                </button>
              </div>
            )}

            {/* Add/Edit Form */}
            {showAddForm && (
              <div className="mb-8 bg-card border border-border rounded-lg p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2>{editingId ? "Edit Passenger" : "Add New Passenger"}</h2>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingId(null);
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                <PassengerDetailsForm
                  passengerCount={{ adults: 1, children: 0, infants: 0 }}
                  passengers={editingId 
                    ? passengers.filter(p => p.id === editingId)
                    : [{
                        id: "new",
                        type: "adult",
                        firstName: "",
                        lastName: "",
                        dateOfBirth: "",
                        gender: "",
                        nationality: "",
                      }]
                  }
                  onPassengersChange={(updatedPassengers) => {
                    console.log("Passengers updated:", updatedPassengers);
                  }}
                  showPassportInfo={true}
                />

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => {
                      toast.success(editingId ? "Passenger updated!" : "Passenger added!");
                      setShowAddForm(false);
                      setEditingId(null);
                    }}
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-md",
                      "bg-primary text-primary-foreground",
                      "hover:bg-primary/90 transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                  >
                    <CircleCheck className="w-5 h-5" />
                    <span>{editingId ? "Update" : "Save"} Passenger</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingId(null);
                    }}
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-3 rounded-md",
                      "border border-border text-foreground",
                      "hover:bg-accent transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Passenger List */}
            {passengers.length > 0 ? (
              <div className="space-y-4">
                {passengers.map((passenger) => {
                  const TypeIcon = getPassengerTypeIcon(passenger.type);
                  const isPrimary = passenger.id === primaryPassengerId;

                  return (
                    <div
                      key={passenger.id}
                      className={cn(
                        "bg-card border rounded-lg p-6 transition-all",
                        isPrimary
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={cn(
                            "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
                            isPrimary ? "bg-primary text-primary-foreground" : "bg-muted"
                          )}
                        >
                          <TypeIcon className="w-6 h-6" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3>
                                  {passenger.firstName} {passenger.lastName}
                                </h3>
                                {isPrimary && (
                                  <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                                    Primary
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {getPassengerTypeLabel(passenger.type)} • {passenger.nationality}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSetPrimary(passenger.id)}
                                className={cn(
                                  "p-2 rounded-md transition-colors",
                                  isPrimary
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                )}
                                aria-label={isPrimary ? "Primary passenger" : "Set as primary"}
                                title={isPrimary ? "Primary passenger" : "Set as primary"}
                              >
                                {isPrimary ? (
                                  <Star className="w-5 h-5 fill-current" />
                                ) : (
                                  <StarOff className="w-5 h-5" />
                                )}
                              </button>
                              <button
                                onClick={() => handleEdit(passenger.id)}
                                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                aria-label="Edit passenger"
                              >
                                <Edit className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(passenger.id)}
                                className="p-2 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                aria-label="Delete passenger"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          {/* Additional Info Grid */}
                          <div className="wp-page-saved-passengers__info-grid">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Date of Birth</p>
                              <p className="text-sm font-medium">
                                {new Date(passenger.dateOfBirth).toLocaleDateString()}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Gender</p>
                              <p className="text-sm font-medium capitalize">
                                {passenger.gender}
                              </p>
                            </div>

                            {passenger.passportNumber && (
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                  Passport Number
                                </p>
                                <p className="text-sm font-medium font-mono">
                                  {passenger.passportNumber}
                                </p>
                              </div>
                            )}

                            {passenger.passportExpiry && (
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                  Passport Expiry
                                </p>
                                <p className="text-sm font-medium">
                                  {new Date(passenger.passportExpiry).toLocaleDateString()}
                                </p>
                              </div>
                            )}

                            {passenger.dietaryRequirements && (
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">
                                  Dietary Requirements
                                </p>
                                <p className="text-sm font-medium">
                                  {passenger.dietaryRequirements}
                                </p>
                              </div>
                            )}

                            {passenger.specialNeeds && (
                              <div className="sm:col-span-2 md:col-span-3">
                                <p className="text-xs text-muted-foreground mb-1">
                                  Special Needs
                                </p>
                                <p className="text-sm font-medium">{passenger.specialNeeds}</p>
                              </div>
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
              <div className="text-center py-section-sm bg-card border border-border rounded-lg">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="mb-2">No Saved Passengers</h3>
                <p className="text-muted-foreground mb-6">
                  Add passenger details to make future bookings faster and easier
                </p>
                <button
                  onClick={handleAddPassenger}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-md",
                    "bg-primary text-primary-foreground",
                    "hover:bg-primary/90 transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-ring"
                  )}
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Passenger</span>
                </button>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ================================================================
          BENEFITS - Why save passengers
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-muted">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-4">Benefits of Saving Passengers</h2>
              <p className="text-lg text-muted-foreground">
                Speed up your booking process with pre-filled information
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: CircleCheck,
                  title: "Quick Booking",
                  description: "No need to re-enter passenger details for every booking",
                },
                {
                  icon: CircleCheck,
                  title: "Multiple Travelers",
                  description: "Save details for family members and travel companions",
                },
                {
                  icon: CircleCheck,
                  title: "Passport Tracking",
                  description: "Keep track of passport expiry dates for all travelers",
                },
                {
                  icon: CircleCheck,
                  title: "Dietary Preferences",
                  description: "Store dietary requirements and special needs",
                },
                {
                  icon: CircleCheck,
                  title: "Secure Storage",
                  description: "All information is encrypted and securely stored",
                },
                {
                  icon: CircleCheck,
                  title: "Easy Updates",
                  description: "Update details anytime and changes apply to future bookings",
                },
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-lg p-6"
                  >
                    <Icon className="w-8 h-8 text-primary mb-3" />
                    <h4 className="mb-2">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}