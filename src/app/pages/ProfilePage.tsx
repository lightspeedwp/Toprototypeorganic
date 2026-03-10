/**
 * Profile Page - User Profile Management
 * 
 * A comprehensive profile management page with account details,
 * preferences, and quick access to key features.
 * 
 * **WordPress Mapping:**
 * - Template: page-profile.php
 * - Template hierarchy: page-profile.php → page.php → singular.php → index.php
 * 
 * **Required Patterns (in order):**
 * 1. Hero - Profile header with avatar
 * 2. Quick Stats - Bookings, points, membership
 * 3. Profile Sections - Personal info, preferences
 * 4. Quick Actions - Common tasks
 * 
 * **Features:**
 * - Profile information display
 * - Avatar upload
 * - Quick statistics
 * - Recent bookings
 * - Saved passengers
 * - Account settings access
 * - Logout functionality
 * 
 * @module ProfilePage
 * @category pages
 * @wordpressTemplate page-profile.php
 */

import "../../styles/pages/profile.css";
import { useState } from "react";
import { PageShell } from "../components/parts/PageShell";
import { Container } from "../components/common/Container";
import {
  User,
  EnvelopeSimple as Mail,
  Phone,
  MapPin,
  Calendar,
  Gear as Settings,
  SignOut as LogOut,
  PencilSimple as Edit,
  Heart,
  Users,
  CreditCard,
  Shield,
  Bell,
  CaretRight as ChevronRight,
  Medal as Award,
  AirplaneTilt as Plane,
  Star,
} from "@phosphor-icons/react";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { useNavigation } from "../contexts/NavigationContext";

/**
 * Profile page props.
 */
interface ProfilePageProps {
  onNavigate?: (pageId: string) => void;
}

/**
 * Mock user data.
 */
const MOCK_USER = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, USA",
  memberSince: "2023-01-15",
  avatar: null,
  stats: {
    totalBookings: 12,
    upcomingTrips: 2,
    rewardPoints: 2450,
    savedTours: 8,
  },
  membership: {
    tier: "Gold",
    level: 2,
    nextTier: "Platinum",
    pointsToNext: 550,
  },
};

/**
 * Profile Page Component.
 */
export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { navigateTo } = useNavigation();
  const nav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else navigateTo(path);
  };

  const [user] = useState(MOCK_USER);

  /**
   * Handle logout.
   */
  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you want to log out?");
    if (confirm) {
      toast.success("Logged out successfully");
      nav("/login");
    }
  };

  /**
   * Handle edit profile.
   */
  const handleEditProfile = () => {
    toast.info("Edit profile - Feature coming soon");
  };

  /**
   * Handle avatar upload.
   */
  const handleAvatarUpload = () => {
    toast.info("Avatar upload - Feature coming soon");
  };

  const memberSince = new Date(user.memberSince);

  return (
    <>
      {/* ================================================================
          HERO - Profile header
          ================================================================ */}
      <section className="wp-pattern-profile__hero">
        <Container>
          <div className="wp-pattern-profile__hero-content max-w-5xl mx-auto">
            {/* Avatar */}
            <div className="wp-pattern-profile__avatar-container">
              <div className="wp-pattern-profile__avatar">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="wp-pattern-profile__avatar-img"
                  />
                ) : (
                  <User className="wp-pattern-profile__avatar-icon" />
                )}
              </div>
              <button
                onClick={handleAvatarUpload}
                className="wp-pattern-profile__avatar-edit"
                aria-label="Upload avatar"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>

            {/* User Info */}
            <div className="wp-pattern-profile__info">
              <div className="wp-pattern-profile__info-header">
                <div>
                  <h1 className="mb-2">
                    {user.firstName} {user.lastName}
                  </h1>
                  <div className="wp-pattern-profile__meta">
                    <span className="wp-pattern-profile__meta-item">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </span>
                    <span className="wp-pattern-profile__meta-item">
                      <MapPin className="w-4 h-4" />
                      {user.location}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleEditProfile}
                  className="wp-pattern-profile__btn-edit"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>

              {/* Membership Badge */}
              <div className="wp-badge-accent-bordered inline-flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{user.membership.tier} Member</span>
                <span className="text-xs text-muted-foreground">
                  Level {user.membership.level}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mt-3">
                Member since {memberSince.toLocaleDateString("en-US", { 
                  month: "long", 
                  year: "numeric" 
                })}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          QUICK STATS - Dashboard statistics
          ================================================================ */}
      <section className="wp-pattern-profile__stats-section">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="wp-pattern-profile__stats-grid">
              <div className="wp-pattern-profile__stat-card">
                <div className="wp-pattern-profile__stat-content">
                  <div className="wp-pattern-profile__stat-icon-wrapper">
                    <Plane className="wp-pattern-profile__stat-icon" />
                  </div>
                  <div>
                    <p className="wp-pattern-profile__stat-value">{user.stats.totalBookings}</p>
                    <p className="wp-pattern-profile__stat-label">Total Trips</p>
                  </div>
                </div>
              </div>

              <div className="wp-pattern-profile__stat-card">
                <div className="wp-pattern-profile__stat-content">
                  <div className="wp-pattern-profile__stat-icon-wrapper">
                    <Calendar className="wp-pattern-profile__stat-icon" />
                  </div>
                  <div>
                    <p className="wp-pattern-profile__stat-value">{user.stats.upcomingTrips}</p>
                    <p className="wp-pattern-profile__stat-label">Upcoming</p>
                  </div>
                </div>
              </div>

              <div className="wp-pattern-profile__stat-card">
                <div className="wp-pattern-profile__stat-content">
                  <div className="wp-pattern-profile__stat-icon-wrapper">
                    <Star className="wp-pattern-profile__stat-icon" />
                  </div>
                  <div>
                    <p className="wp-pattern-profile__stat-value">{user.stats.rewardPoints.toLocaleString()}</p>
                    <p className="wp-pattern-profile__stat-label">Points</p>
                  </div>
                </div>
              </div>

              <div className="wp-pattern-profile__stat-card">
                <div className="wp-pattern-profile__stat-content">
                  <div className="wp-pattern-profile__stat-icon-wrapper">
                    <Heart className="wp-pattern-profile__stat-icon" />
                  </div>
                  <div>
                    <p className="wp-pattern-profile__stat-value">{user.stats.savedTours}</p>
                    <p className="wp-pattern-profile__stat-label">Saved</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Progress */}
            <div className="wp-pattern-profile__membership-progress">
              <div className="wp-pattern-profile__progress-header">
                <div>
                  <p className="wp-pattern-profile__progress-title">
                    {user.membership.pointsToNext} points to {user.membership.nextTier}
                  </p>
                  <p className="wp-pattern-profile__progress-subtitle">
                    Current: {user.stats.rewardPoints.toLocaleString()} points
                  </p>
                </div>
                <Award className="wp-pattern-profile__progress-icon" />
              </div>
              <div className="has-width-full has-height-2 has-muted-background-color has-border-radius-full wp-block-lts-layout--overflow-hidden">
                <div
                  className="has-height-full has-primary-background-color"
                  style={{
                    width: `${(user.stats.rewardPoints / (user.stats.rewardPoints + user.membership.pointsToNext)) * 100}%`,
                    transition: "all 500ms"
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          MAIN CONTENT - Profile sections & quick actions
          ================================================================ */}
      <section className="wp-pattern-profile__main-section">
        <Container>
          <div className="wp-pattern-profile__layout-grid max-w-5xl mx-auto">
            {/* Left Column - Quick Actions */}
            <div className="wp-pattern-profile__sidebar">
              {/* Account Menu */}
              <div className="wp-pattern-profile__menu">
                <div className="wp-pattern-profile__menu-header">
                  <h3 className="m-0 text-lg">Account</h3>
                </div>
                <nav className="wp-pattern-profile__menu-list">
                  {[
                    {
                      icon: User,
                      label: "Personal Information",
                      onClick: () => handleEditProfile(),
                    },
                    {
                      icon: Calendar,
                      label: "My Bookings",
                      onClick: () => nav("/booking/management"),
                    },
                    {
                      icon: Users,
                      label: "Saved Passengers",
                      onClick: () => nav("/profile/passengers"),
                    },
                    {
                      icon: Heart,
                      label: "Wishlist",
                      onClick: () => toast.info("Wishlist - Coming soon"),
                    },
                    {
                      icon: CreditCard,
                      label: "Payment Methods",
                      onClick: () => toast.info("Payment methods - Coming soon"),
                    },
                    {
                      icon: Bell,
                      label: "Notifications",
                      onClick: () => toast.info("Notifications - Coming soon"),
                    },
                    {
                      icon: Settings,
                      label: "Account Settings",
                      onClick: () => nav("/profile/settings"),
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={item.onClick}
                        className="wp-pattern-profile__menu-item"
                      >
                        <div className="wp-pattern-profile__menu-item-content">
                          <Icon className="wp-pattern-profile__menu-icon" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="wp-pattern-profile__menu-arrow" />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="wp-pattern-profile__logout-btn"
              >
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </div>

            {/* Right Column - Recent Activity */}
            <div className="wp-pattern-profile__content">
              {/* Recent Bookings */}
              <div className="wp-pattern-profile__card">
                <div className="wp-pattern-profile__card-header">
                  <h3 className="wp-pattern-profile__card-title">Recent Bookings</h3>
                  <button
                    onClick={() => nav("/booking/management")}
                    className="wp-pattern-profile__card-action"
                  >
                    View all
                  </button>
                </div>
                <div className="wp-pattern-profile__booking-list">
                  {[
                    {
                      id: "BK-2024-001234",
                      tour: "Iceland Explorer",
                      date: "Aug 15, 2024",
                      status: "Confirmed",
                    },
                    {
                      id: "BK-2024-000987",
                      tour: "Kenya Safari Adventure",
                      date: "Jun 10, 2024",
                      status: "Confirmed",
                    },
                  ].map((booking) => (
                    <div key={booking.id} className="wp-pattern-profile__booking-item">
                      <div className="wp-pattern-profile__booking-content">
                        <div className="flex items-center justify-between mb-2">
                          <p className="wp-pattern-profile__booking-title">{booking.tour}</p>
                          <span className="wp-pattern-profile__booking-status">
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {booking.date}
                          </span>
                          <span className="font-mono text-xs">{booking.id}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Info */}
              <div className="wp-pattern-profile__card">
                <div className="wp-pattern-profile__card-body">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="mb-2">Account Security</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Keep your account secure with two-factor authentication and regular
                        password updates
                      </p>
                      <div className="wp-pattern-profile__form-group mb-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Two-Factor Auth</span>
                          <span className="text-destructive">Not enabled</span>
                        </div>
                      </div>
                      <div className="wp-pattern-profile__form-group">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Last password change</span>
                          <span>3 months ago</span>
                        </div>
                      </div>
                      <button
                        onClick={() => nav("/profile/settings")}
                        className="wp-pattern-profile__card-action mt-4"
                      >
                        Review security settings →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Details */}
              <div className="wp-pattern-profile__card">
                <div className="wp-pattern-profile__card-body">
                  <h4 className="mb-4">Travel Statistics</h4>
                  <div className="wp-pattern-profile__form-grid">
                    <div className="wp-pattern-profile__form-group">
                      <p className="wp-pattern-profile__form-label">Countries Visited</p>
                      <p className="wp-pattern-profile__form-value text-2xl font-medium m-0">15</p>
                    </div>
                    <div className="wp-pattern-profile__form-group">
                      <p className="wp-pattern-profile__form-label">Total Distance</p>
                      <p className="wp-pattern-profile__form-value text-2xl font-medium m-0">125,000 km</p>
                    </div>
                    <div className="wp-pattern-profile__form-group">
                      <p className="wp-pattern-profile__form-label">Favorite Destination</p>
                      <p className="wp-pattern-profile__form-value text-lg font-medium m-0">Iceland</p>
                    </div>
                    <div className="wp-pattern-profile__form-group">
                      <p className="wp-pattern-profile__form-label">Next Adventure</p>
                      <p className="wp-pattern-profile__form-value text-lg font-medium m-0">45 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}