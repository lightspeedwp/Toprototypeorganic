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
      <div className={cn("wp-bg-muted-light rounded-[var(--radius-lg)] p-element-lg", className)}>
        <div className="flex flex-wrap items-center justify-center gap-fluid-md md:gap-fluid-lg">
          {indicators.map((indicator) => {
            const Icon = indicator.icon;
            return (
              <div key={indicator.id} className="flex items-center gap-fluid-sm">
                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-[length:var(--text-sm)]">{indicator.title}</span>
                {indicator.badge && (
                  <span className="wp-badge-primary-sm rounded-[var(--radius-full)]">
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
      <div className={cn("flex flex-wrap items-center justify-center gap-fluid-md", className)}>
        {indicators.map((indicator) => {
          const Icon = indicator.icon;
          return (
            <div
              key={indicator.id}
              className="group relative"
              title={indicator.title}
            >
              <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-muted flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-element-sm px-element-md py-element-sm bg-popover text-popover-foreground border border-border rounded-[var(--radius-md)] text-[length:var(--text-xs)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
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
    <div className={cn("flex flex-col gap-fluid-lg", className)}>
      {/* Security Features Grid */}
      <div className="grid gap-fluid-md sm:grid-cols-2">
        {indicators.map((indicator) => {
          const Icon = indicator.icon;
          return (
            <div
              key={indicator.id}
              className="bg-card border border-border rounded-[var(--radius-lg)] p-element-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start gap-fluid-sm">
                <div className="wp-icon-container-primary rounded-[var(--radius-lg)]">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-fluid-sm pb-element-xs">
                    <h4 className="text-[length:var(--text-sm)] m-0">{indicator.title}</h4>
                    {indicator.badge && (
                      <span className="wp-badge-primary-sm rounded-[var(--radius-full)]">
                        {indicator.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[length:var(--text-sm)] text-muted-foreground m-0">
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
        <div className="wp-bg-muted-light rounded-[var(--radius-lg)] p-element-lg">
          <div className="text-center pb-element-md">
            <p className="text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] m-0">
              Accepted Payment Methods
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-fluid-sm">
            {PAYMENT_PROVIDERS.map((provider) => (
              <div
                key={provider.name}
                className={cn(
                  "px-element-lg py-element-sm rounded-[var(--radius-md)] border bg-[color:var(--color-card)] flex items-center justify-center min-w-[80px]",
                  provider.available
                    ? "border-[color:var(--color-border)]"
                    : "border-[color:var(--color-border)] opacity-50"
                )}
              >
                <span className="text-[length:var(--text-sm)] text-[color:var(--color-foreground)] font-[family:var(--font-family-noto-sans)]">
                  {provider.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trust Statistics */}
      <div className="bg-[color:var(--color-primary)]/5 border border-[color:var(--color-primary)]/20 rounded-[var(--radius-lg)] p-element-xl">
        <div className="grid gap-fluid-lg sm:grid-cols-3 text-center">
          <div className="flex flex-col gap-element-xs">
            <div className="flex items-center justify-center gap-fluid-sm">
              <Verified className="w-5 h-5 text-[color:var(--color-primary)]" />
              <p className="text-[length:var(--text-2xl)] font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)] m-0">10,000+</p>
            </div>
            <p className="text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] m-0">Secure Bookings</p>
          </div>
          
          <div className="flex flex-col gap-element-xs">
            <div className="flex items-center justify-center gap-fluid-sm">
              <Shield className="w-5 h-5 text-[color:var(--color-primary)]" />
              <p className="text-[length:var(--text-2xl)] font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)] m-0">100%</p>
            </div>
            <p className="text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] m-0">Payment Protection</p>
          </div>
          
          <div className="flex flex-col gap-element-xs">
            <div className="flex items-center justify-center gap-fluid-sm">
              <Award className="w-5 h-5 text-[color:var(--color-primary)]" />
              <p className="text-[length:var(--text-2xl)] font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)] m-0">5-Star</p>
            </div>
            <p className="text-[length:var(--text-sm)] text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] m-0">Trustpilot Rating</p>
          </div>
        </div>
      </div>

      {/* Additional Security Info */}
      <div className="wp-bg-muted-light rounded-[var(--radius-lg)] p-element-lg">
        <div className="flex items-start gap-fluid-sm">
          <Lock className="w-5 h-5 text-[color:var(--color-primary)] flex-shrink-0 relative top-0.5" />
          <div className="text-[length:var(--text-sm)] flex flex-col gap-element-sm">
            <p className="text-[color:var(--color-foreground)] font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-medium)] m-0">
              Your Security is Our Priority
            </p>
            <ul className="flex flex-col gap-fluid-xs text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] m-0">
              <li className="flex items-start gap-fluid-sm">
                <CircleCheck className="w-4 h-4 text-[color:var(--color-primary)] flex-shrink-0 relative top-0.5" />
                <span>All transactions are encrypted with 256-bit SSL</span>
              </li>
              <li className="flex items-start gap-fluid-sm">
                <CircleCheck className="w-4 h-4 text-[color:var(--color-primary)] flex-shrink-0 relative top-0.5" />
                <span>We never store your full card number</span>
              </li>
              <li className="flex items-start gap-fluid-sm">
                <CircleCheck className="w-4 h-4 text-[color:var(--color-primary)] flex-shrink-0 relative top-0.5" />
                <span>PCI-DSS Level 1 certified payment processing</span>
              </li>
              <li className="flex items-start gap-fluid-sm">
                <CircleCheck className="w-4 h-4 text-[color:var(--color-primary)] flex-shrink-0 relative top-0.5" />
                <span>Regular security audits and monitoring</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}