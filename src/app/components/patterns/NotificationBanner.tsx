import { cn } from "../../lib/utils";
import { X, WarningCircle as AlertCircle, CheckCircle as CircleCheck, Info, Warning as AlertTriangle } from "@phosphor-icons/react";

/**
 * NotificationBanner Component
 * 
 * Design System Compliant:
 * ✅ All colors use CSS variables
 * ✅ All fonts use defined families (Lora, Noto Sans)
 * ✅ All spacing uses CSS variables
 * ✅ No inline styles
 * ✅ BEM naming convention
 * ✅ Automatic dark mode support
 * ✅ External CSS file
 */

export interface NotificationBannerProps {
  variant?: "info" | "success" | "warning" | "error";
  title: string;
  message?: string;
  onClose?: () => void;
  dismissible?: boolean;
}

export function NotificationBanner({
  variant = "info",
  title,
  message,
  onClose,
  dismissible = true,
}: NotificationBannerProps) {
  const icons = {
    info: Info,
    success: CircleCheck,
    warning: AlertTriangle,
    error: AlertCircle,
  };

  const Icon = icons[variant];

  return (
    <div
      className={cn(
        "wp-notification-banner",
        `wp-notification-banner--${variant}`
      )}
      role="alert"
      aria-live={variant === "error" ? "assertive" : "polite"}
    >
      {/* Icon */}
      <div className="wp-notification-banner__icon">
        <Icon className="wp-notification-banner__icon-svg" />
      </div>

      {/* Content */}
      <div className="wp-notification-banner__content">
        <h3 className="wp-notification-banner__title">{title}</h3>
        {message && (
          <p className="wp-notification-banner__message">{message}</p>
        )}
      </div>

      {/* Dismiss Button */}
      {dismissible && onClose && (
        <button
          className="wp-notification-banner__dismiss"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X className="wp-notification-banner__dismiss-icon" />
        </button>
      )}
    </div>
  );
}