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
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div>
        <h3 className="mb-2">Select Payment Method</h3>
        <p className="text-muted-foreground">
          Choose how you'd like to pay for your booking
        </p>
      </div>

      {/* Saved Cards (Optional) */}
      {showSavedCards && (
        <div className="wp-callout-accent">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium mb-1">Saved Payment Methods</p>
              <p className="text-sm text-muted-foreground mb-3">
                Use a previously saved card for faster checkout
              </p>
              
              <button
                onClick={() => handleMethodSelect("credit-card")}
                className={cn(
                  "w-full p-3 rounded-md border-2 transition-all text-left",
                  activeMethod === "credit-card"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 bg-card"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Visa ending in 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/25</p>
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
      <div className="grid gap-3">
        {filteredMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = activeMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => handleMethodSelect(method.id)}
              className={cn(
                "p-4 md:p-5 rounded-lg border-2 transition-all text-left group",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 bg-card"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium">{method.name}</h4>
                      {method.badge && (
                        <span
                          className={cn(
                            "px-2 py-0.5 text-xs rounded-full",
                            method.popular
                              ? "wp-bg-primary-light"
                              : "bg-accent text-accent-foreground"
                          )}
                        >
                          {method.badge}
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <CircleCheck className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {method.description}
                  </p>

                  {/* Payment Details */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    {method.processingTime && (
                      <div className="flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" />
                        <span>{method.processingTime}</span>
                      </div>
                    )}
                    {method.fees && (
                      <div className="flex items-center gap-1.5">
                        <span>•</span>
                        <span>{method.fees}</span>
                      </div>
                    )}
                    {method.secure && (
                      <div className="flex items-center gap-1.5">
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
      <div className="wp-bg-muted-light rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">
              Secure Payment Processing
            </p>
            <p className="text-muted-foreground">
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