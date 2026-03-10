/**
 * Credit Card Form Pattern - Secure Card Input
 * 
 * A comprehensive credit card input form with validation, masking,
 * and card brand detection.
 * 
 * **WordPress Mapping:**
 * - Pattern: lightspeed/credit-card-form
 * - Block composition: Group + Form fields + Validation
 * 
 * **Features:**
 * - Card number input with masking
 * - Automatic card brand detection
 * - CVV security code input
 * - Expiry date validation
 * - Real-time validation
 * - Cardholder name
 * - Save card option
 * - Accessibility-compliant
 * 
 * **Design System:**
 * - Typography: Lora (headings), Noto Sans (body)
 * - Colors: Semantic tokens from theme.css
 * - Spacing: Consistent rhythm with CSS variables
 * 
 * @module CreditCardForm
 * @category patterns
 * @wordpressPattern lightspeed/credit-card-form
 */

import { useState, useEffect } from "react";
import { CreditCard, Lock, Shield, WarningCircle as AlertCircle, Check } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Card brand type.
 */
type CardBrand = "visa" | "mastercard" | "amex" | "discover" | "unknown";

/**
 * Credit card data structure.
 */
export interface CreditCardData {
  cardNumber: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  saveCard: boolean;
  billingZip?: string;
}

/**
 * Credit card form props.
 */
interface CreditCardFormProps {
  cardData?: Partial<CreditCardData>;
  onCardDataChange?: (data: CreditCardData) => void;
  showSaveOption?: boolean;
  showBillingZip?: boolean;
  className?: string;
}

/**
 * Detect card brand from number.
 */
const detectCardBrand = (number: string): CardBrand => {
  const cleaned = number.replace(/\s/g, "");
  
  if (/^4/.test(cleaned)) return "visa";
  if (/^5[1-5]/.test(cleaned)) return "mastercard";
  if (/^3[47]/.test(cleaned)) return "amex";
  if (/^6(?:011|5)/.test(cleaned)) return "discover";
  
  return "unknown";
};

/**
 * Format card number with spaces.
 */
const formatCardNumber = (value: string, brand: CardBrand): string => {
  const cleaned = value.replace(/\D/g, "");
  
  // American Express: 4-6-5 format
  if (brand === "amex") {
    const match = cleaned.match(/(\d{1,4})(\d{1,6})?(\d{1,5})?/);
    if (!match) return cleaned;
    return [match[1], match[2], match[3]].filter(Boolean).join(" ");
  }
  
  // Other cards: 4-4-4-4 format
  const match = cleaned.match(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/);
  if (!match) return cleaned;
  return [match[1], match[2], match[3], match[4]].filter(Boolean).join(" ");
};

/**
 * Validate card number using Luhn algorithm.
 */
const validateCardNumber = (number: string): boolean => {
  const cleaned = number.replace(/\D/g, "");
  
  if (cleaned.length < 13 || cleaned.length > 19) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Credit Card Form Component.
 */
export function CreditCardForm({
  cardData,
  onCardDataChange,
  showSaveOption = true,
  showBillingZip = true,
  className,
}: CreditCardFormProps) {
  const [formData, setFormData] = useState<CreditCardData>({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    saveCard: false,
    billingZip: "",
    ...cardData,
  });

  const [touched, setTouched] = useState({
    cardNumber: false,
    cardholderName: false,
    expiryMonth: false,
    expiryYear: false,
    cvv: false,
    billingZip: false,
  });

  const [cardBrand, setCardBrand] = useState<CardBrand>("unknown");

  // Detect card brand
  useEffect(() => {
    const brand = detectCardBrand(formData.cardNumber);
    setCardBrand(brand);
  }, [formData.cardNumber]);

  // Notify parent of changes
  useEffect(() => {
    onCardDataChange?.(formData);
  }, [formData, onCardDataChange]);

  /**
   * Update form field.
   */
  const updateField = <K extends keyof CreditCardData>(
    field: K,
    value: CreditCardData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Mark field as touched.
   */
  const markTouched = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  /**
   * Handle card number input.
   */
  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const maxLength = cardBrand === "amex" ? 15 : 16;
    
    if (cleaned.length <= maxLength) {
      const formatted = formatCardNumber(cleaned, cardBrand);
      updateField("cardNumber", formatted);
    }
  };

  /**
   * Handle CVV input.
   */
  const handleCvvChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const maxLength = cardBrand === "amex" ? 4 : 3;
    
    if (cleaned.length <= maxLength) {
      updateField("cvv", cleaned);
    }
  };

  /**
   * Validation checks.
   */
  const isCardNumberValid = validateCardNumber(formData.cardNumber);
  const isCardNumberComplete = formData.cardNumber.replace(/\s/g, "").length >= 13;
  const isExpiryValid = formData.expiryMonth && formData.expiryYear;
  const isCvvValid = formData.cvv.length >= 3;
  const isCardholderNameValid = formData.cardholderName.length >= 3;

  const showCardNumberError = touched.cardNumber && isCardNumberComplete && !isCardNumberValid;
  const showExpiryError = (touched.expiryMonth || touched.expiryYear) && !isExpiryValid;
  const showCvvError = touched.cvv && !isCvvValid;
  const showNameError = touched.cardholderName && !isCardholderNameValid;

  // Generate year options (current year + 10 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear + i);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-start gap-3">
        <CreditCard className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
        <div>
          <h3 className="mb-2">Card Information</h3>
          <p className="text-sm text-muted-foreground">
            Enter your card details below
          </p>
        </div>
      </div>

      {/* Card Number */}
      <div>
        <label htmlFor="cardNumber" className="mb-2 block">
          Card Number *
        </label>
        <div className="relative">
          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            onBlur={() => markTouched("cardNumber")}
            className={cn(
              "w-full px-4 py-3 pr-12 rounded-md",
              "bg-input-background border-2",
              "text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "transition-colors",
              showCardNumberError
                ? "border-destructive focus:border-destructive"
                : isCardNumberValid && touched.cardNumber
                ? "border-primary"
                : "border-border"
            )}
          />
          
          {/* Card Brand Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {cardBrand !== "unknown" && (
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-muted-foreground uppercase">
                  {cardBrand}
                </span>
                {isCardNumberValid && touched.cardNumber && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
            )}
          </div>
        </div>
        
        {showCardNumberError && (
          <div className="flex items-center gap-1.5 mt-2 text-sm text-destructive">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Please enter a valid card number</span>
          </div>
        )}
      </div>

      {/* Cardholder Name */}
      <div>
        <label htmlFor="cardholderName" className="mb-2 block">
          Cardholder Name *
        </label>
        <input
          id="cardholderName"
          type="text"
          placeholder="John Doe"
          value={formData.cardholderName}
          onChange={(e) => updateField("cardholderName", e.target.value)}
          onBlur={() => markTouched("cardholderName")}
          className={cn(
            "w-full px-4 py-3 rounded-md",
            "bg-input-background border-2",
            "text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            "transition-colors",
            showNameError
              ? "border-destructive"
              : isCardholderNameValid && touched.cardholderName
              ? "border-primary"
              : "border-border"
          )}
        />
        
        {showNameError && (
          <div className="flex items-center gap-1.5 mt-2 text-sm text-destructive">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Please enter the name as shown on card</span>
          </div>
        )}
      </div>

      {/* Expiry Date and CVV */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Expiry Month */}
        <div>
          <label htmlFor="expiryMonth" className="mb-2 block">
            Expiry Month *
          </label>
          <select
            id="expiryMonth"
            value={formData.expiryMonth}
            onChange={(e) => updateField("expiryMonth", e.target.value)}
            onBlur={() => markTouched("expiryMonth")}
            className={cn(
              "w-full px-4 py-3 rounded-md",
              "bg-input-background border-2",
              "text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "transition-colors",
              showExpiryError
                ? "border-destructive"
                : formData.expiryMonth && touched.expiryMonth
                ? "border-primary"
                : "border-border"
            )}
          >
            <option value="">Month</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month.toString().padStart(2, "0")}>
                {month.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>

        {/* Expiry Year */}
        <div>
          <label htmlFor="expiryYear" className="mb-2 block">
            Expiry Year *
          </label>
          <select
            id="expiryYear"
            value={formData.expiryYear}
            onChange={(e) => updateField("expiryYear", e.target.value)}
            onBlur={() => markTouched("expiryYear")}
            className={cn(
              "w-full px-4 py-3 rounded-md",
              "bg-input-background border-2",
              "text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "transition-colors",
              showExpiryError
                ? "border-destructive"
                : formData.expiryYear && touched.expiryYear
                ? "border-primary"
                : "border-border"
            )}
          >
            <option value="">Year</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* CVV */}
        <div>
          <label htmlFor="cvv" className="mb-2 flex items-center gap-2">
            <span>CVV *</span>
            <div className="group relative">
              <Lock className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground border border-border rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                3-4 digit security code on back of card
              </div>
            </div>
          </label>
          <input
            id="cvv"
            type="text"
            inputMode="numeric"
            placeholder={cardBrand === "amex" ? "1234" : "123"}
            value={formData.cvv}
            onChange={(e) => handleCvvChange(e.target.value)}
            onBlur={() => markTouched("cvv")}
            className={cn(
              "w-full px-4 py-3 rounded-md",
              "bg-input-background border-2",
              "text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "transition-colors",
              showCvvError
                ? "border-destructive"
                : isCvvValid && touched.cvv
                ? "border-primary"
                : "border-border"
            )}
          />
          
          {showCvvError && (
            <div className="flex items-center gap-1.5 mt-2 text-sm text-destructive">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Invalid CVV</span>
            </div>
          )}
        </div>
      </div>

      {/* Billing ZIP (Optional) */}
      {showBillingZip && (
        <div>
          <label htmlFor="billingZip" className="mb-2 block">
            Billing ZIP Code (Optional)
          </label>
          <input
            id="billingZip"
            type="text"
            placeholder="12345"
            value={formData.billingZip}
            onChange={(e) => updateField("billingZip", e.target.value)}
            onBlur={() => markTouched("billingZip")}
            className={cn(
              "w-full px-4 py-3 rounded-md",
              "bg-input-background border border-border",
              "text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring"
            )}
          />
        </div>
      )}

      {/* Save Card Option */}
      {showSaveOption && (
        <div className="flex items-start gap-3">
          <input
            id="saveCard"
            type="checkbox"
            checked={formData.saveCard}
            onChange={(e) => updateField("saveCard", e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-ring"
          />
          <label htmlFor="saveCard" className="text-sm cursor-pointer flex-1">
            <span className="font-medium">Save this card for future bookings</span>
            <p className="text-muted-foreground mt-0.5">
              Your card details will be securely stored for faster checkout next time
            </p>
          </label>
        </div>
      )}

      {/* Security Notice */}
      <div className="wp-bg-muted-light rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">
              256-bit SSL Encryption
            </p>
            <p className="text-muted-foreground">
              Your payment information is encrypted and transmitted securely. We never
              store your full card number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
