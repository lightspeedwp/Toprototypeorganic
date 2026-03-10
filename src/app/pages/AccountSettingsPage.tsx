/**
 * Account Settings Page - User Preferences & Security
 * 
 * A comprehensive account settings page for managing preferences,
 * security, and account options.
 * 
 * **WordPress Mapping:**
 * - Template: page-account-settings.php
 * - Template hierarchy: page-account-settings.php → page.php → singular.php → index.php
 * 
 * **Required Patterns (in order):**
 * 1. Hero - Settings introduction
 * 2. Settings Sections - Organized settings categories
 * 3. Security Options - Password, 2FA, sessions
 * 4. Preferences - Notifications, privacy, language
 * 5. Danger Zone - Account deletion
 * 
 * **Features:**
 * - Password change
 * - Two-factor authentication
 * - Email preferences
 * - Notification settings
 * - Privacy controls
 * - Language & currency
 * - Account deletion
 * 
 * @module AccountSettingsPage
 * @category pages
 * @wordpressTemplate page-account-settings.php
 */

import { useState } from "react";
import { Container } from "../components/common/Container";
import {
  Gear as Settings,
  LockKey as Lock,
  Shield,
  Bell,
  Globe,
  Eye,
  EnvelopeSimple as Mail,
  DeviceMobile as Smartphone,
  Trash as Trash2,
  FloppyDisk as Save,
  CheckCircle as CircleCheck,
  Warning as AlertTriangle,
  Key,
  User,
} from "@phosphor-icons/react";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { useNavigation } from "../contexts/NavigationContext";

/**
 * Account settings page props.
 */
interface AccountSettingsPageProps {
  onNavigate?: (pageId: string) => void;
}

/**
 * Account Settings Page Component.
 */
export default function AccountSettingsPage({ onNavigate }: AccountSettingsPageProps) {
  const { navigateTo } = useNavigation();
  const nav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else navigateTo(path);
  };
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState({
    bookingConfirmations: true,
    promotions: true,
    newsletters: true,
    priceAlerts: false,
  });
  const [pushNotifications, setPushNotifications] = useState({
    bookingUpdates: true,
    newMessages: true,
    promotions: false,
  });
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showReviews: true,
    shareData: false,
  });
  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "USD",
    timezone: "America/New_York",
  });

  /**
   * Handle save settings.
   */
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  /**
   * Handle enable 2FA.
   */
  const handleEnable2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(
      twoFactorEnabled
        ? "Two-factor authentication disabled"
        : "Two-factor authentication enabled"
    );
  };

  /**
   * Handle change password.
   */
  const handleChangePassword = () => {
    toast.info("Change password - Opens password change modal");
  };

  /**
   * Handle delete account.
   */
  const handleDeleteAccount = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirm) {
      const confirmText = window.prompt(
        'Type "DELETE" to confirm account deletion:'
      );
      if (confirmText === "DELETE") {
        toast.error("Account deletion initiated");
        // Would navigate to account deletion confirmation or login
      }
    }
  };

  return (
    <>
      {/* ================================================================
          HERO - Settings introduction
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-muted">
        <Container>
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-8 h-8 text-primary" />
              <h1>Account Settings</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Manage your account preferences, security settings, and privacy options
            </p>
          </div>
        </Container>
      </section>

      {/* ================================================================
          MAIN CONTENT - Settings sections
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-background">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Security Settings */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2>Security</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {/* Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Password</p>
                      <p className="text-sm text-muted-foreground">
                        Last changed 3 months ago
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleChangePassword}
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-md",
                      "border border-border text-foreground",
                      "hover:bg-accent transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                  >
                    <Key className="w-4 h-4" />
                    <span>Change Password</span>
                  </button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div className="flex items-start gap-3 flex-1">
                    <Smartphone className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Status:{" "}
                        <span
                          className={
                            twoFactorEnabled ? "text-primary" : "text-destructive"
                          }
                        >
                          {twoFactorEnabled ? "Enabled" : "Not enabled"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleEnable2FA}
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-ring",
                      twoFactorEnabled
                        ? "border border-destructive text-destructive hover:bg-destructive/10"
                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    {twoFactorEnabled ? "Disable" : "Enable"} 2FA
                  </button>
                </div>

                {/* Active Sessions */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">
                        Manage devices where you're logged in
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toast.info("View sessions - Coming soon")}
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-md",
                      "border border-border text-foreground",
                      "hover:bg-accent transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                  >
                    View Sessions
                  </button>
                </div>
              </div>
            </div>

            {/* Email Notifications */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" />
                  <h2>Email Notifications</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  {
                    key: "bookingConfirmations" as const,
                    label: "Booking Confirmations",
                    description: "Receive emails when bookings are confirmed",
                  },
                  {
                    key: "promotions" as const,
                    label: "Special Offers & Promotions",
                    description: "Get notified about exclusive deals and discounts",
                  },
                  {
                    key: "newsletters" as const,
                    label: "Newsletters",
                    description: "Travel tips, destination guides, and inspiration",
                  },
                  {
                    key: "priceAlerts" as const,
                    label: "Price Drop Alerts",
                    description: "Get notified when prices drop on saved tours",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium mb-1">{item.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailNotifications[item.key]}
                        onChange={(e) =>
                          setEmailNotifications((prev) => ({
                            ...prev,
                            [item.key]: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors">
                        <div
                          className={cn(
                            "absolute top-0.5 left-0.5 bg-background rounded-full h-5 w-5 transition-transform",
                            emailNotifications[item.key] && "translate-x-5"
                          )}
                        />
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Push Notifications */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <Bell className="w-6 h-6 text-primary" />
                  <h2>Push Notifications</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  {
                    key: "bookingUpdates" as const,
                    label: "Booking Updates",
                    description: "Important updates about your bookings",
                  },
                  {
                    key: "newMessages" as const,
                    label: "New Messages",
                    description: "Notifications for new messages from support",
                  },
                  {
                    key: "promotions" as const,
                    label: "Promotional Offers",
                    description: "Push notifications for special deals",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium mb-1">{item.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pushNotifications[item.key]}
                        onChange={(e) =>
                          setPushNotifications((prev) => ({
                            ...prev,
                            [item.key]: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors">
                        <div
                          className={cn(
                            "absolute top-0.5 left-0.5 bg-background rounded-full h-5 w-5 transition-transform",
                            pushNotifications[item.key] && "translate-x-5"
                          )}
                        />
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-primary" />
                  <h2>Privacy</h2>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  {
                    key: "showProfile" as const,
                    label: "Public Profile",
                    description: "Allow others to see your profile information",
                  },
                  {
                    key: "showReviews" as const,
                    label: "Show Reviews",
                    description: "Display your reviews publicly",
                  },
                  {
                    key: "shareData" as const,
                    label: "Share Analytics Data",
                    description: "Help us improve by sharing usage data",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <p className="font-medium mb-1">{item.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy[item.key]}
                        onChange={(e) =>
                          setPrivacy((prev) => ({
                            ...prev,
                            [item.key]: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors">
                        <div
                          className={cn(
                            "absolute top-0.5 left-0.5 bg-background rounded-full h-5 w-5 transition-transform",
                            privacy[item.key] && "translate-x-5"
                          )}
                        />
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary" />
                  <h2>Preferences</h2>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {/* Language */}
                <div>
                  <label htmlFor="language" className="mb-2 block">
                    Language
                  </label>
                  <select
                    id="language"
                    value={preferences.language}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, language: e.target.value }))
                    }
                    className={cn(
                      "w-full px-4 py-3 rounded-md",
                      "bg-input-background border border-border",
                      "text-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="it">Italiano</option>
                  </select>
                </div>

                {/* Currency */}
                <div>
                  <label htmlFor="currency" className="mb-2 block">
                    Currency
                  </label>
                  <select
                    id="currency"
                    value={preferences.currency}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, currency: e.target.value }))
                    }
                    className={cn(
                      "w-full px-4 py-3 rounded-md",
                      "bg-input-background border border-border",
                      "text-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                  </select>
                </div>

                {/* Timezone */}
                <div>
                  <label htmlFor="timezone" className="mb-2 block">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    value={preferences.timezone}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, timezone: e.target.value }))
                    }
                    className={cn(
                      "w-full px-4 py-3 rounded-md",
                      "bg-input-background border border-border",
                      "text-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveSettings}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-md",
                  "bg-primary text-primary-foreground",
                  "hover:bg-primary/90 transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-ring"
                )}
              >
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
              <button
                onClick={() => nav("/profile")}
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

            {/* Danger Zone */}
            <div className="bg-destructive/5 border-2 border-destructive/20 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-destructive/20">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                  <h2>Danger Zone</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium mb-2 text-destructive">Delete Account</p>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data. This action
                      cannot be undone.
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-md",
                      "bg-destructive text-destructive-foreground",
                      "hover:bg-destructive/90 transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}