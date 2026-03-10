/**
 * Secure Payment Indicators Pattern - Trust Badges
 * 
 * Displays security and trust indicators to reassure customers
 * about payment safety and reliability.
 * 
 * **WordPress Mapping:**
 * - Pattern: lightspeed/secure-payment-indicators
 * - Block composition: Group + Icons + Badges
 * 
 * **Features:**
 * - SSL certificate indicator
 * - PCI-DSS compliance badge
 * - Payment provider logos
 * - Money-back guarantee
 * - Trusted by indicators
 * - Security certifications
 * 
 * **Design System:**
 * - Typography: Lora (headings), Noto Sans (body)
 * - Colors: Semantic tokens from theme.css
 * - Spacing: Consistent rhythm with CSS variables
 * 
 * @module SecurePaymentIndicators
 * @category patterns
 * @wordpressPattern lightspeed/secure-payment-indicators
 */

import { Shield, Lock, Medal as Award, CheckCircle as CircleCheck, CreditCard, SealCheck as Verified } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

/**
 * Indicator variant type.
 */
type IndicatorVariant = "compact" | "detailed" | "icons-only";

/**
 * Secure payment indicators props.
 */
interface SecurePaymentIndicatorsProps {
  variant?: IndicatorVariant;
  showPaymentLogos?: boolean;
  showGuarantee?: boolean;
  className?: string;
}

/**
 * Security indicator configuration.
 */
interface SecurityIndicator {
  id: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
  badge?: string;
}

/**
 * Security indicators data.
 */
const SECURITY_INDICATORS: SecurityIndicator[] = [
  {
    id: "ssl",
    icon: Lock,
    title: "SSL Encrypted",
    description: "256-bit encryption protects your data",
    badge: "Verified",
  },
  {
    id: "pci",
    icon: Shield,
    title: "PCI-DSS Compliant",
    description: "Meets highest security standards",
    badge: "Certified",
  },
  {
    id: "verified",
    icon: CircleCheck,
    title: "Verified Secure",
    description: "Regularly audited and monitored",
  },
  {
    id: "guarantee",
    icon: Award,
    title: "Money-Back Guarantee",
    description: "100% refund if tour is cancelled",
  },
];

/**
 * Payment provider logos.
 */
const PAYMENT_PROVIDERS = [
  { name: "Visa", available: true },
  { name: "Mastercard", available: true },
  { name: "Amex", available: true },
  { name: "PayPal", available: true },
  { name: "Apple Pay", available: true },
  { name: "Google Pay", available: true },
];

/**
 * Secure Payment Indicators Component.
 */
export function SecurePaymentIndicators({
  variant = "detailed",
  showPaymentLogos = true,
  showGuarantee = true,
  className,
}: SecurePaymentIndicatorsProps) {
  const indicators = showGuarantee 
    ? SECURITY_INDICATORS 
    : SECURITY_INDICATORS.filter(i => i.id !== "guarantee");

  // Compact variant - single row
  if (variant === "compact") {
    return (
      <div className={cn("wp-bg-muted-light rounded-lg p-4", className)}>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {indicators.map((indicator) => {
            const Icon = indicator.icon;
            return (
              <div key={indicator.id} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">{indicator.title}</span>
                {indicator.badge && (
                  <span className="wp-badge-primary-sm rounded-full">
                    {indicator.badge}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Icons only variant - minimal
  if (variant === "icons-only") {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-4", className)}>
        {indicators.map((indicator) => {
          const Icon = indicator.icon;
          return (
            <div
              key={indicator.id}
              className="group relative"
              title={indicator.title}
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground border border-border rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {indicator.title}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Detailed variant - default
  return (
    <div className={cn("space-y-6", className)}>
      {/* Security Features Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {indicators.map((indicator) => {
          const Icon = indicator.icon;
          return (
            <div
              key={indicator.id}
              className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="wp-icon-container-primary rounded-lg">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium">{indicator.title}</h4>
                    {indicator.badge && (
                      <span className="wp-badge-primary-sm rounded-full">
                        {indicator.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {indicator.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Provider Logos */}
      {showPaymentLogos && (
        <div className="wp-bg-muted-light rounded-lg p-4">
          <div className="text-center mb-4">
            <p className="text-sm font-medium text-muted-foreground">
              Accepted Payment Methods
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {PAYMENT_PROVIDERS.map((provider) => (
              <div
                key={provider.name}
                className={cn(
                  "px-4 py-2 rounded-md border bg-card flex items-center justify-center min-w-[80px]",
                  provider.available
                    ? "border-border"
                    : "border-border opacity-50"
                )}
              >
                <span className="text-sm font-medium text-foreground">
                  {provider.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trust Statistics */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="grid gap-6 sm:grid-cols-3 text-center">
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Verified className="w-5 h-5 text-primary" />
              <p className="text-2xl font-medium">10,000+</p>
            </div>
            <p className="text-sm text-muted-foreground">Secure Bookings</p>
          </div>
          
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <p className="text-2xl font-medium">100%</p>
            </div>
            <p className="text-sm text-muted-foreground">Payment Protection</p>
          </div>
          
          <div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-5 h-5 text-primary" />
              <p className="text-2xl font-medium">5-Star</p>
            </div>
            <p className="text-sm text-muted-foreground">Trustpilot Rating</p>
          </div>
        </div>
      </div>

      {/* Additional Security Info */}
      <div className="wp-bg-muted-light rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-2">
              Your Security is Our Priority
            </p>
            <ul className="space-y-1 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CircleCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>All transactions are encrypted with 256-bit SSL</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>We never store your full card number</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>PCI-DSS Level 1 certified payment processing</span>
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Regular security audits and monitoring</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}