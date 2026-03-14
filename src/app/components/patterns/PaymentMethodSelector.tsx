/**
 * Payment Method Selector Pattern - Payment Option Selection
 * 
 * A comprehensive payment method selection component with multiple
 * payment options and trust indicators.
 * 
 * **WordPress Mapping:**
 * - Pattern: lightspeed/payment-method-selector
 * - Block composition: Group + Radio buttons + Icons
 * 
 * **Features:**
 * - Multiple payment methods (credit card, bank transfer, PayPal, etc.)
 * - Visual radio button cards
 * - Payment method descriptions
 * - Trust badges for each method
 * - Secure payment indicators
 * - Installment options display
 * - Saved payment methods
 * 
 * **Design System:**
 * - Typography: Lora (headings), Noto Sans (body)
 * - Colors: Semantic tokens from theme.css
 * - Spacing: Consistent rhythm with CSS variables
 * 
 * @module PaymentMethodSelector
 * @category patterns
 * @wordpressPattern lightspeed/payment-method-selector
 */

import { useState } from "react";
import { 
  CreditCard, 
  Buildings as Building2, 
  DeviceMobile as Smartphone,
  Wallet,
  Shield,
  Lock,
  CheckCircle as CircleCheck,
  Info
} from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Payment method type.
 */
export type PaymentMethodType = 
  | "credit-card" 
  | "debit-card"
  | "bank-transfer" 
  | "paypal"
  | "apple-pay"
  | "google-pay"
  | "installments";

/**
 * Payment method configuration.
 */
interface PaymentMethod {
  id: PaymentMethodType;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  badge?: string;
  processingTime?: string;
  fees?: string;
  secure?: boolean;
  popular?: boolean;
}

/**
 * Payment method selector props.
 */
interface PaymentMethodSelectorProps {
  selectedMethod?: PaymentMethodType | null;
  onMethodChange?: (method: PaymentMethodType) => void;
  availableMethods?: PaymentMethodType[];
  showSavedCards?: boolean;
  className?: string;
}

/**
 * Available payment methods configuration.
 */
const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "credit-card",
    name: "Credit Card",
    description: "Pay securely with Visa, Mastercard, or American Express",
    icon: CreditCard,
    badge: "Most Popular",
    processingTime: "Instant",
    fees: "No fees",
    secure: true,
    popular: true,
  },
  {
    id: "debit-card",
    name: "Debit Card",
    description: "Direct payment from your bank account",
    icon: CreditCard,
    processingTime: "Instant",
    fees: "No fees",
    secure: true,
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Pay with your PayPal account balance or linked cards",
    icon: Wallet,
    processingTime: "Instant",
    fees: "No fees",
    secure: true,
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    description: "Direct bank transfer - receive payment instructions via email",
    icon: Building2,
    processingTime: "1-3 business days",
    fees: "No fees",
    secure: true,
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    description: "Fast and secure payment with Apple Pay",
    icon: Smartphone,
    badge: "Quick Checkout",
    processingTime: "Instant",
    fees: "No fees",
    secure: true,
  },
  {
    id: "google-pay",
    name: "Google Pay",
    description: "Pay quickly with Google Pay",
    icon: Smartphone,
    processingTime: "Instant",
    fees: "No fees",
    secure: true,
  },
  {
    id: "installments",
    name: "Pay in Installments",
    description: "Split your payment into 3 or 6 monthly installments",
    icon: Wallet,
    badge: "Flexible",
    processingTime: "Instant approval",
    fees: "Interest may apply",
    secure: true,
  },
];

/**
 * Payment Method Selector Component.
 */
export function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
  availableMethods = ["credit-card", "debit-card", "paypal", "bank-transfer", "apple-pay", "google-pay", "installments"],
  showSavedCards = false,
  className,
}: PaymentMethodSelectorProps) {
  const [internalSelected, setInternalSelected] = useState<PaymentMethodType | null>(
    selectedMethod || null
  );

  const handleMethodSelect = (method: PaymentMethodType) => {
    setInternalSelected(method);
    onMethodChange?.(method);
  };

  const filteredMethods = PAYMENT_METHODS.filter((method) =>
    availableMethods.includes(method.id)
  );

  const activeMethod = internalSelected || selectedMethod;

  return (
    <div className={cn("flex flex-col gap-fluid-lg", className)}>
      {/* Header */}
      <div className="flex flex-col gap-element-xs">
        <h3 className="m-0 font-[family:var(--font-family-lora)]">Select Payment Method</h3>
        <p className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] m-0">
          Choose how you'd like to pay for your booking
        </p>
      </div>

      {/* Saved Cards (Optional) */}
      {showSavedCards && (
        <div className="wp-callout-accent">
          <div className="flex items-start gap-fluid-sm">
            <Shield className="w-5 h-5 text-[color:var(--color-primary)] flex-shrink-0 relative top-0.5" />
            <div className="flex-1 flex flex-col gap-element-sm">
              <div className="flex flex-col gap-element-xs">
                <p className="font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)] m-0">Saved Payment Methods</p>
                <p className="text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] m-0">
                  Use a previously saved card for faster checkout
                </p>
              </div>
              
              <button
                onClick={() => handleMethodSelect("credit-card")}
                className={cn(
                  "w-full p-element-md rounded-[var(--radius-md)] border-2 transition-all text-left",
                  activeMethod === "credit-card"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 bg-card"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-fluid-sm">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-[length:var(--text-sm)] font-[var(--font-weight-medium)] m-0">Visa ending in 4242</p>
                      <p className="text-[length:var(--text-xs)] text-muted-foreground m-0">Expires 12/25</p>
                    </div>
                  </div>
                  {activeMethod === "credit-card" && (
                    <CircleCheck className="w-5 h-5 text-primary" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Methods Grid */}
      <div className="grid gap-fluid-sm">
        {filteredMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = activeMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={cn(
                "p-element-lg md:p-element-xl rounded-[var(--radius-lg)] border-2 transition-all text-left group",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 bg-card"
              )}
            >
              <div className="flex items-start gap-fluid-md">
                {/* Icon */}
                <div
                  className={cn(
                    "flex-shrink-0 w-[var(--spacing-element-3xl)] h-[var(--spacing-element-3xl)] rounded-[var(--radius-lg)] flex items-center justify-center transition-colors",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}
                >
                  <Icon className="w-[var(--spacing-element-lg)] h-[var(--spacing-element-lg)]" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col gap-element-sm">
                  <div className="flex items-start justify-between gap-fluid-sm">
                    <div className="flex items-center gap-fluid-sm flex-wrap">
                      <h4 className="font-[family:var(--font-family-lora)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)] m-0">{method.name}</h4>
                      {method.badge && (
                        <span
                          className={cn(
                            "px-element-sm py-0.5 text-[length:var(--text-xs)] font-[family:var(--font-family-noto-sans)] rounded-[var(--radius-full)]",
                            method.popular
                              ? "wp-bg-primary-light"
                              : "bg-[color:var(--color-accent)] text-[color:var(--color-accent-foreground)]"
                          )}
                        >
                          {method.badge}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <CircleCheck className="w-5 h-5 text-[color:var(--color-primary)] flex-shrink-0" />
                    )}
                  </div>
                  
                  <p className="text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] m-0">
                    {method.description}
                  </p>

                  {/* Payment Details */}
                  <div className="flex flex-wrap items-center gap-fluid-md text-[length:var(--text-xs)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)]">
                    {method.processingTime && (
                      <div className="flex items-center gap-fluid-xs">
                        <Info className="w-3.5 h-3.5" />
                        <span>{method.processingTime}</span>
                      </div>
                    )}
                    {method.fees && (
                      <div className="flex items-center gap-fluid-xs">
                        <span>•</span>
                        <span>{method.fees}</span>
                      </div>
                    )}
                    {method.secure && (
                      <div className="flex items-center gap-fluid-xs">
                        <Lock className="w-3.5 h-3.5 text-primary" />
                        <span className="text-primary">Secure</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Security Notice */}
      <div className="wp-bg-muted-light rounded-[var(--radius-lg)] p-element-lg">
        <div className="flex items-start gap-fluid-sm">
          <Shield className="w-5 h-5 text-[color:var(--color-primary)] flex-shrink-0 relative top-0.5" />
          <div className="text-[length:var(--text-sm)] flex flex-col gap-element-xs">
            <p className="font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] text-[color:var(--color-foreground)] m-0">
              Secure Payment Processing
            </p>
            <p className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] m-0">
              All payments are processed through our secure, PCI-DSS compliant payment
              gateway. Your payment information is encrypted and never stored on our
              servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}