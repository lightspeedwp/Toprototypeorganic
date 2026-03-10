import { useState } from "react";
import { NotificationBanner } from "../components/patterns/NotificationBanner";
import { Container } from "../components/common/Container";

/**
 * Notification Banner Examples
 * 
 * This page demonstrates the NotificationBanner component
 * following design system compliance:
 * 
 * ✅ All colors from CSS variables
 * ✅ All fonts from defined families
 * ✅ Automatic dark mode support
 * ✅ No hardcoded values
 * ✅ User can customize via CSS
 */

export default function NotificationBannerExamples() {
  const [showInfo, setShowInfo] = useState(true);
  const [showSuccess, setShowSuccess] = useState(true);
  const [showWarning, setShowWarning] = useState(true);
  const [showError, setShowError] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Container className="py-section-lg">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="mb-4">Notification Banner Component</h1>
          <p className="text-muted-foreground">
            Design system compliant notification banners with automatic dark mode support.
            All styling uses CSS variables from the theme system.
          </p>
        </div>

        {/* Examples */}
        <div className="space-y-6">
          {/* Info Notification */}
          <div>
            <h2 className="mb-4">Info Notification</h2>
            {showInfo ? (
              <NotificationBanner
                variant="info"
                title="New feature available"
                message="Check out our latest tour packages for summer 2026."
                onClose={() => setShowInfo(false)}
              />
            ) : (
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                onClick={() => setShowInfo(true)}
              >
                Show Info Notification
              </button>
            )}
          </div>

          {/* Success Notification */}
          <div>
            <h2 className="mb-4">Success Notification</h2>
            {showSuccess ? (
              <NotificationBanner
                variant="success"
                title="Booking confirmed"
                message="Your tour reservation has been successfully submitted. Check your email for confirmation details."
                onClose={() => setShowSuccess(false)}
              />
            ) : (
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                onClick={() => setShowSuccess(true)}
              >
                Show Success Notification
              </button>
            )}
          </div>

          {/* Warning Notification */}
          <div>
            <h2 className="mb-4">Warning Notification</h2>
            {showWarning ? (
              <NotificationBanner
                variant="warning"
                title="Limited availability"
                message="Only 3 spots remaining for this tour date. Book soon to secure your place."
                onClose={() => setShowWarning(false)}
              />
            ) : (
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                onClick={() => setShowWarning(true)}
              >
                Show Warning Notification
              </button>
            )}
          </div>

          {/* Error Notification */}
          <div>
            <h2 className="mb-4">Error Notification</h2>
            {showError ? (
              <NotificationBanner
                variant="error"
                title="Payment failed"
                message="We couldn't process your payment. Please check your card details and try again."
                onClose={() => setShowError(false)}
              />
            ) : (
              <button
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                onClick={() => setShowError(true)}
              >
                Show Error Notification
              </button>
            )}
          </div>

          {/* Non-dismissible Example */}
          <div>
            <h2 className="mb-4">Non-dismissible Notification</h2>
            <NotificationBanner
              variant="info"
              title="System maintenance scheduled"
              message="Our website will be undergoing maintenance on March 1st from 2-4 AM EST."
              dismissible={false}
            />
          </div>

          {/* Title Only Example */}
          <div>
            <h2 className="mb-4">Title Only</h2>
            <NotificationBanner
              variant="success"
              title="Changes saved successfully"
              onClose={() => {}}
            />
          </div>
        </div>

        {/* Design System Compliance Info */}
        <div className="mt-16 p-6 bg-card border border-border rounded-lg">
          <h2 className="mb-4">✅ Design System Compliance</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>✅ All colors use CSS variables (--info, --success, --warning, --destructive)</li>
            <li>✅ All fonts use defined families (Lora for titles, Noto Sans for messages)</li>
            <li>✅ All spacing uses CSS variables (fluid responsive)</li>
            <li>✅ All radius uses CSS variables (--radius-lg, --radius-sm)</li>
            <li>✅ All shadows use CSS variables (--elevation-sm, --elevation-md)</li>
            <li>✅ No inline styles</li>
            <li>✅ No hardcoded values</li>
            <li>✅ BEM naming convention (.wp-notification-banner--*)</li>
            <li>✅ Automatic dark mode support</li>
          </ul>

          <div className="mt-6">
            <h3 className="mb-2 font-semibold">User Customization:</h3>
            <p className="text-sm text-muted-foreground">
              Users can customize all colors, fonts, spacing, and styling by editing:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>• <code className="bg-muted px-2 py-1 rounded">/src/styles/theme-light.css</code> - Light mode colors</li>
              <li>• <code className="bg-muted px-2 py-1 rounded">/src/styles/theme-dark.css</code> - Dark mode colors</li>
              <li>• <code className="bg-muted px-2 py-1 rounded">/src/styles/theme.css</code> - Typography & spacing</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
