/**
 * Payment Page - Complete Payment Processing Flow
 * 
 * A comprehensive payment page with payment method selection,
 * card input, and secure processing.
 * 
 * **WordPress Mapping:**
 * - Template: page-payment.php
 * - Template hierarchy: page-payment.php → page.php → singular.php → index.php
 * 
 * **Required Patterns (in order):**
 * 1. Hero - Payment introduction
 * 2. Booking Summary - Order details
 * 3. PaymentMethodSelector - Choose payment method
 * 4. CreditCardForm - Card details (conditional)
 * 5. SecurePaymentIndicators - Trust badges
 * 6. Payment Action - Submit button
 * 
 * **Features:**
 * - Multi-payment method support
 * - Secure card processing
 * - Real-time validation
 * - Order summary
 * - Trust indicators
 * - Mobile-responsive
 * 
 * @module PaymentPage
 * @category pages
 * @wordpressTemplate page-payment.php
 */

import { useState } from "react";
import { useNavigate } from "../hooks/use-navigate";
import { Container } from "../components/common/Container";
import { PaymentMethodSelector, type PaymentMethodType } from "../components/patterns/PaymentMethodSelector";
import { CreditCardForm, type CreditCardData } from "../components/patterns/CreditCardForm";
import { SecurePaymentIndicators } from "../components/patterns/SecurePaymentIndicators";
import { LockKey as Lock, CheckCircle as CircleCheck, WarningCircle as AlertCircle, CreditCard, Calendar, Users, MapPin } from "@phosphor-icons/react";
import { cn } from "../lib/utils";
import { toast } from "sonner";

/**
 * Payment page props.
 */
interface PaymentPageProps {
  onNavigate?: (pageId: string) => void;
}

/**
 * Mock booking data.
 */
const MOCK_BOOKING = {
  bookingRef: "BK-2024-001234",
  tourTitle: "Iceland Explorer - Fire & Ice Adventure",
  departureDate: "2024-08-15",
  returnDate: "2024-08-22",
  duration: "8 days, 7 nights",
  passengers: {
    adults: 2,
    children: 0,
    infants: 0,
  },
  leadPassenger: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  },
  pricing: {
    basePrice: 5990,
    discount: 0,
    tax: 299,
    total: 6289,
  },
};

/**
 * Payment Page Component.
 */
export default function PaymentPage({ onNavigate }: PaymentPageProps) {
  const navigate = useNavigate(onNavigate);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(null);
  const [cardData, setCardData] = useState<CreditCardData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  /**
   * Handle payment submission.
   */
  const handlePayment = async () => {
    // Validation
    if (!selectedMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (selectedMethod === "credit-card" || selectedMethod === "debit-card") {
      if (!cardData || !cardData.cardNumber || !cardData.cvv || !cardData.expiryMonth || !cardData.expiryYear) {
        toast.error("Please complete all card details");
        return;
      }
    }

    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    // Process payment (mock)
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    toast.success("Payment processed successfully!");
    
    // Navigate to confirmation
    navigate("booking-confirmation-page-enhanced");
  };

  const totalPassengers = 
    MOCK_BOOKING.passengers.adults + 
    MOCK_BOOKING.passengers.children + 
    MOCK_BOOKING.passengers.infants;

  const departureDate = new Date(MOCK_BOOKING.departureDate);
  const returnDate = new Date(MOCK_BOOKING.returnDate);

  const showCardForm = 
    selectedMethod === "credit-card" || 
    selectedMethod === "debit-card";

  return (
    <>
      {/* ================================================================
          HERO - Payment introduction
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-muted">
        <Container>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Lock className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="mb-2">Secure Payment</h1>
                <p className="text-sm text-muted-foreground">
                  Booking Reference: <span className="font-mono font-medium">{MOCK_BOOKING.bookingRef}</span>
                </p>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              Complete your booking for {MOCK_BOOKING.tourTitle}
            </p>
          </div>
        </Container>
      </section>

      {/* ================================================================
          MAIN CONTENT - Payment form and summary
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-background">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Payment Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Payment Method Selection */}
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <PaymentMethodSelector
                  selectedMethod={selectedMethod}
                  onMethodChange={setSelectedMethod}
                  showSavedCards={true}
                />
              </div>

              {/* Credit Card Form (Conditional) */}
              {showCardForm && (
                <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                  <CreditCardForm
                    cardData={cardData || undefined}
                    onCardDataChange={setCardData}
                    showSaveOption={true}
                    showBillingZip={true}
                  />
                </div>
              )}

              {/* Bank Transfer Instructions (Conditional) */}
              {selectedMethod === "bank-transfer" && (
                <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="mb-2">Bank Transfer Instructions</h3>
                      <p className="text-muted-foreground">
                        Complete your booking and we'll send detailed bank transfer instructions to your email
                      </p>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <p className="text-sm font-medium">What happens next:</p>
                    <ol className="text-sm text-muted-foreground space-y-1 ml-4 list-decimal">
                      <li>You'll receive an email with our bank details</li>
                      <li>Transfer the full amount within 3 business days</li>
                      <li>Include your booking reference in the transfer description</li>
                      <li>We'll confirm your booking once payment is received</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-ring"
                />
                <label htmlFor="terms" className="text-sm cursor-pointer flex-1">
                  I agree to the{" "}
                  <button
                    onClick={() => navigate("terms-conditions-page")}
                    className="text-primary hover:underline"
                  >
                    Terms & Conditions
                  </button>
                  {" "}and{" "}
                  <button
                    onClick={() => navigate("privacy-policy-page")}
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </button>
                  . I understand that my payment will be processed securely.
                </label>
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={!selectedMethod || !termsAccepted || isProcessing}
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-md transition-all",
                  "bg-primary text-primary-foreground text-lg font-medium",
                  "hover:bg-primary/90",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Pay ${MOCK_BOOKING.pricing.total.toLocaleString()}</span>
                  </>
                )}
              </button>

              {/* Security Indicators */}
              <SecurePaymentIndicators
                variant="compact"
                showPaymentLogos={false}
                showGuarantee={true}
              />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h3 className="mb-6">Order Summary</h3>

                {/* Tour Details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tour</p>
                    <p className="font-medium">{MOCK_BOOKING.tourTitle}</p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Travel Dates</p>
                      <p className="text-sm font-medium">
                        {departureDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        {" - "}
                        {returnDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <p className="text-xs text-muted-foreground">{MOCK_BOOKING.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Passengers</p>
                      <p className="text-sm font-medium">
                        {totalPassengers} traveler{totalPassengers !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Lead Passenger</p>
                      <p className="text-sm font-medium">
                        {MOCK_BOOKING.leadPassenger.firstName} {MOCK_BOOKING.leadPassenger.lastName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="pt-6 border-t border-border space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tour Price</span>
                    <span className="font-medium">${MOCK_BOOKING.pricing.basePrice.toLocaleString()}</span>
                  </div>
                  
                  {MOCK_BOOKING.pricing.discount > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Discount</span>
                      <span>-${MOCK_BOOKING.pricing.discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span className="font-medium">${MOCK_BOOKING.pricing.tax.toLocaleString()}</span>
                  </div>

                  <div className="pt-3 border-t border-border flex justify-between items-center">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-2xl font-medium text-primary">
                      ${MOCK_BOOKING.pricing.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="wp-callout-accent-soft p-3">
                    <div className="flex items-start gap-2">
                      <CircleCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-muted-foreground">
                        <p className="font-medium text-foreground mb-1">
                          Free Cancellation
                        </p>
                        <p>
                          Cancel up to 60 days before departure for a full refund
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================
          SECURITY & TRUST - Detailed security information
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-muted">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-4">Secure & Trusted Payment</h2>
              <p className="text-lg text-muted-foreground">
                Your security is our top priority
              </p>
            </div>
            
            <SecurePaymentIndicators
              variant="detailed"
              showPaymentLogos={true}
              showGuarantee={true}
            />
          </div>
        </Container>
      </section>
    </>
  );
}