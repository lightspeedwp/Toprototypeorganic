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
  CreditCard,
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
  const [activeTab, setActiveTab] = useState("profile");

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
          <div className="max-w-4xl flex flex-col gap-element-md">
            <div className="flex items-center gap-fluid-md">
              <Settings className="w-8 h-8 text-primary" />
              <h1>Account Settings</h1>
            </div>
            <p className="text-[length:var(--text-lg)] text-muted-foreground font-[family-name:var(--font-family-noto-sans)]">
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
          <div className="max-w-4xl flex flex-col gap-section-sm">
            {/* Security Settings */}
            <div className="bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden">
              <div className="p-element-xl border-b border-border">
                <div className="flex items-center gap-fluid-md">
                  <Shield className="w-6 h-6 text-primary" />
                  <h2>Security</h2>
                </div>
              </div>
              <div className="p-element-xl flex flex-col gap-element-xl">
                {/* Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-fluid-md">
                    <Lock className="w-5 h-5 text-primary shrink-0" />
                    <div className="flex flex-col gap-element-xs">
                      <p className="font-[var(--font-weight-medium)] font-[family-name:var(--font-family-noto-sans)]">Password</p>
                      <p className="text-[length:var(--text-sm)] text-muted-foreground font-[family-name:var(--font-family-noto-sans)]">
                        Last changed 3 months ago
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleChangePassword}
                    className={cn(
                      "inline-flex items-center gap-fluid-sm px-element-md py-element-sm rounded-[var(--radius-md)]",
                      "border border-border text-foreground font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[var(--font-weight-medium)]",
                      "hover:bg-accent transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                  >
                    <Key className="w-4 h-4" />
                    <span>Change Password</span>
                  </button>
                </div>

                {/* Two-Factor Authentication */}
                <div className="flex items-center justify-between pt-element-xl border-t border-border">
                  <div className="flex items-start gap-fluid-md flex-1">
                    <Smartphone className="w-5 h-5 text-primary shrink-0" />
                    <div className="flex flex-col gap-element-xs">
                      <p className="font-[var(--font-weight-medium)] font-[family-name:var(--font-family-noto-sans)]">Two-Factor Authentication</p>
                      <p className="text-[length:var(--text-sm)] text-muted-foreground font-[family-name:var(--font-family-noto-sans)]">
                        Add an extra layer of security to your account
                      </p>
                      <p className="text-[length:var(--text-xs)] text-muted-foreground font-[family-name:var(--font-family-noto-sans)]">
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
                      "inline-flex items-center gap-fluid-sm px-element-md py-element-sm rounded-[var(--radius-md)] transition-colors",
                      "font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[var(--font-weight-medium)]",
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
                <div className="flex items-center justify-between pt-element-xl border-t border-border">
                  <div className="flex items-start gap-fluid-md">
                    <Eye className="w-5 h-5 text-primary shrink-0" />
                    <div className="flex flex-col gap-element-xs">
                      <p className="font-[var(--font-weight-medium)] font-[family-name:var(--font-family-noto-sans)]">Active Sessions</p>
                      <p className="text-[length:var(--text-sm)] text-muted-foreground font-[family-name:var(--font-family-noto-sans)]">
                        Manage devices where you're logged in
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toast.info("View sessions - Coming soon")}
                    className={cn(
                      "inline-flex items-center gap-fluid-sm px-element-md py-element-sm rounded-[var(--radius-md)]",
                      "border border-border text-foreground font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[var(--font-weight-medium)]",
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
            <div className="bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden">
              <div className="p-element-xl border-b border-border">
                <div className="flex items-center gap-fluid-md">
                  <Mail className="w-6 h-6 text-primary" />
                  <h2>Email Notifications</h2>
                </div>
              </div>
              <div className="p-element-xl flex flex-col gap-element-lg">
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
                    className="flex items-center justify-between py-element-md border-b border-border last:border-0"
                  >
                    <div className="flex flex-col gap-element-xs">
                      <p className="font-[var(--font-weight-medium)] font-[family-name:var(--font-family-noto-sans)]">{item.label}</p>
                      <p className="text-[length:var(--text-xs)] text-muted-foreground font-[family-name:var(--font-family-noto-sans)]">{item.description}</p>
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
                      <div className="w-11 h-6 bg-muted rounded-[var(--radius-full)] peer peer-checked:bg-primary transition-colors">
                        <div
                          className={cn(
                            "absolute top-0.5 left-0.5 bg-background rounded-[var(--radius-full)] h-5 w-5 transition-transform",
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
            <div className="bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden">
              <div className="p-element-xl border-b border-border">
                <div className="flex items-center gap-fluid-md">
                  <Bell className="w-6 h-6 text-primary" />
                  <h2>Notifications</h2>
                </div>
              </div>
              <div className="p-element-xl flex flex-col gap-element-lg">
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
                    className="flex items-center justify-between py-element-md border-b border-border last:border-0"
                  >
                    <div className="flex flex-col gap-element-xs">
                      <p className="font-[var(--font-weight-medium)] font-[family-name:var(--font-family-noto-sans)]">{item.label}</p>
                      <p className="text-[length:var(--text-xs)] text-muted-foreground font-[family-name:var(--font-family-noto-sans)]">{item.description}</p>
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
                      <div className="w-11 h-6 bg-muted rounded-[var(--radius-full)] peer peer-checked:bg-primary transition-colors">
                        <div
                          className={cn(
                            "absolute top-0.5 left-0.5 bg-background rounded-[var(--radius-full)] h-5 w-5 transition-transform",
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
            <div className="bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden">
              <div className="p-element-xl border-b border-border">
                <div className="flex items-center gap-fluid-md">
                  <Eye className="w-6 h-6 text-primary" />
                  <h2>Privacy</h2>
                </div>
              </div>
              <div className="p-element-xl flex flex-col gap-element-lg">
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
                    className="flex items-center justify-between py-element-md border-b border-border last:border-0"
                  >
                    <div className="flex flex-col gap-element-xs">
                      <p className="font-[var(--font-weight-medium)] font-[family-name:var(--font-family-noto-sans)]">{item.label}</p>
                      <p className="text-[length:var(--text-xs)] text-muted-foreground font-[family-name:var(--font-family-noto-sans)]">{item.description}</p>
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
                      <div className="w-11 h-6 bg-muted rounded-[var(--radius-full)] peer peer-checked:bg-primary transition-colors">
                        <div
                          className={cn(
                            "absolute top-0.5 left-0.5 bg-background rounded-[var(--radius-full)] h-5 w-5 transition-transform",
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
            <div className="bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden">
              <div className="p-element-xl border-b border-border">
                <div className="flex items-center gap-fluid-md">
                  <Globe className="w-6 h-6 text-primary" />
                  <h2>Preferences</h2>
                </div>
              </div>
              <div className="p-element-xl flex flex-col gap-element-lg">
                {/* Language */}
                <div className="flex flex-col gap-element-sm">
                  <label htmlFor="language" className="block font-[family-name:var(--font-family-noto-sans)] font-[var(--font-weight-medium)]">
                    Language
                  </label>
                  <select
                    id="language"
                    value={preferences.language}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, language: e.target.value }))
                    }
                    className={cn(
                      "w-full px-element-md py-element-md rounded-[var(--radius-md)]",
                      "bg-input-background border border-border font-[family-name:var(--font-family-noto-sans)]",
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
                <div className="flex flex-col gap-element-sm">
                  <label htmlFor="currency" className="block font-[family-name:var(--font-family-noto-sans)] font-[var(--font-weight-medium)]">
                    Currency
                  </label>
                  <select
                    id="currency"
                    value={preferences.currency}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, currency: e.target.value }))
                    }
                    className={cn(
                      "w-full px-element-md py-element-md rounded-[var(--radius-md)]",
                      "bg-input-background border border-border font-[family-name:var(--font-family-noto-sans)]",
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
                <div className="flex flex-col gap-element-sm">
                  <label htmlFor="timezone" className="block font-[family-name:var(--font-family-noto-sans)] font-[var(--font-weight-medium)]">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    value={preferences.timezone}
                    onChange={(e) =>
                      setPreferences((prev) => ({ ...prev, timezone: e.target.value }))
                    }
                    className={cn(
                      "w-full px-element-md py-element-md rounded-[var(--radius-md)]",
                      "bg-input-background border border-border font-[family-name:var(--font-family-noto-sans)]",
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

            {/* Payment Methods */}
            <div className="bg-card border border-border rounded-[var(--radius-lg)] overflow-hidden">
              <div className="p-element-xl border-b border-border">
                <div className="flex items-center gap-fluid-md">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <h2>Payment Methods</h2>
                </div>
              </div>
              <div className="p-element-xl flex flex-col gap-element-xl">
                <p className="text-[length:var(--text-sm)] text-muted-foreground font-[family-name:var(--font-family-noto-sans)]">
                  Add or manage your payment methods for secure transactions.
                </p>
                <button
                  onClick={() => toast.info("Manage payment methods - Coming soon")}
                  className={cn(
                    "inline-flex items-center gap-fluid-sm px-element-md py-element-sm rounded-[var(--radius-md)]",
                    "border border-border text-foreground font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[var(--font-weight-medium)]",
                    "hover:bg-accent transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-ring"
                  )}
                >
                  Manage Payment Methods
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-fluid-md">
              <button
                onClick={handleSaveSettings}
                className={cn(
                  "inline-flex items-center gap-fluid-sm px-element-xl py-element-md rounded-[var(--radius-md)]",
                  "bg-primary text-primary-foreground font-[family-name:var(--font-family-noto-sans)] font-[var(--font-weight-medium)]",
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
                  "inline-flex items-center gap-fluid-sm px-element-xl py-element-md rounded-[var(--radius-md)]",
                  "border border-border text-foreground font-[family-name:var(--font-family-noto-sans)] font-[var(--font-weight-medium)]",
                  "hover:bg-accent transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-ring"
                )}
              >
                Cancel
              </button>
            </div>

            {/* Danger Zone */}
            <div className="bg-destructive/5 border-2 border-destructive/20 rounded-[var(--radius-lg)] overflow-hidden">
              <div className="p-element-xl border-b border-destructive/20">
                <div className="flex items-center gap-fluid-md">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                  <h2>Danger Zone</h2>
                </div>
              </div>
              <div className="p-element-xl">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-element-sm">
                    <p className="font-[var(--font-weight-medium)] text-destructive font-[family-name:var(--font-family-noto-sans)]">Delete Account</p>
                    <p className="text-[length:var(--text-sm)] text-muted-foreground font-[family-name:var(--font-family-noto-sans)]">
                      Permanently delete your account and all associated data. This action
                      cannot be undone.
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className={cn(
                      "inline-flex items-center gap-fluid-sm px-element-md py-element-sm rounded-[var(--radius-md)]",
                      "bg-destructive text-destructive-foreground font-[family-name:var(--font-family-noto-sans)] text-[length:var(--text-sm)] font-[var(--font-weight-medium)]",
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