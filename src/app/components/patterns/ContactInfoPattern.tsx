/**
 * Contact Info Pattern Component
 * 
 * Displays contact details with icons in a responsive grid.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Phone, EnvelopeSimple as Mail, MapPin, Clock, Globe, Users } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { motion as Motion } from "motion/react";
import { isValidElement, type ReactNode, type ComponentType } from "react";

/**
 * Contact method type definition.
 */
export type ContactType = 'phone' | 'email' | 'address' | 'hours' | 'website' | 'social';

/**
 * Individual contact item structure.
 */
export interface ContactInfoItem {
  /** Contact method type */
  type: ContactType;
  /** Display label */
  label: string;
  /** Contact value/details (supports multiple lines) */
  value: string | string[];
  /** Optional custom icon (overrides default type icon) */
  icon?: ReactNode | ComponentType<any>;
  /** Optional link (for phone/email/website) */
  href?: string;
}

/**
 * Props for ContactInfoPattern component.
 */
export interface ContactInfoPatternProps {
  /** Section heading */
  title?: string;
  /** Section description */
  description?: string;
  /** Array of contact items */
  items?: ContactInfoItem[];
  /** Grid columns (mobile is always 1) */
  columns?: 1 | 2 | 3 | 4;
  /** Visual variant */
  variant?: 'default' | 'card' | 'minimal';
  /** Additional CSS classes */
  className?: string;
  
  /* Legacy Props Support */
  phone?: string;
  email?: string;
  address?: string;
}

const DEFAULT_ICONS: Record<ContactType, ComponentType<any>> = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  hours: Clock,
  website: Globe,
  social: Users
};

/**
 * Contact Info Pattern - WordPress Aligned
 */
export function ContactInfoPattern({
  title,
  description,
  items: itemsProp,
  columns = 3,
  variant = 'default',
  className,
  phone,
  email,
  address,
}: ContactInfoPatternProps) {
  // Map legacy props to items if provided
  const items = itemsProp || [
    ...(phone ? [{ type: 'phone' as const, label: 'Phone', value: phone, href: `tel:${phone.replace(/\\s/g, '')}` }] : []),
    ...(email ? [{ type: 'email' as const, label: 'Email', value: email, href: `mailto:${email}` }] : []),
    ...(address ? [{ type: 'address' as const, label: 'Address', value: address }] : []),
  ];

  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section className={cn("wp-pattern-lts-contact-info", `wp-pattern-lts-contact-info--${variant}`, className)}>
      <Container>
        <div className="flex flex-col items-center">
          {/* Section Header */}
          {(title || description) && (
            <div className="flex flex-col items-center justify-center text-center pb-fluid-2xl md:pb-fluid-3xl max-w-3xl w-full">
              {title && (
                <HeadingBlock level={2} textAlign="center" className="pb-element-md !m-0 font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)]">
                  {title}
                </HeadingBlock>
              )}
              {description && (
                <ParagraphBlock className="text-[color:var(--color-muted-foreground)] font-[family:var(--font-family-noto-sans)] !m-0" textAlign="center">
                  {description}
                </ParagraphBlock>
              )}
            </div>
          )}

          {/* Contact Grid */}
          <div className={cn("grid gap-fluid-xl md:gap-fluid-3xl w-full", gridClasses)}>
            {items.map((item, index) => {
              const iconProp = item.icon || DEFAULT_ICONS[item.type] || Globe;
              
              // Handle both JSX elements and component references
              const renderIcon = () => {
                if (isValidElement(iconProp)) return iconProp;
                if (typeof iconProp === 'function') {
                  const IconComponent = iconProp as ComponentType<any>;
                  return <IconComponent className="w-[var(--spacing-element-xl)] h-[var(--spacing-element-xl)]" aria-hidden="true" />;
                }
                return <Globe className="w-[var(--spacing-element-xl)] h-[var(--spacing-element-xl)]" aria-hidden="true" />;
              };

              const values = Array.isArray(item.value) ? item.value : [item.value];
              
              return (
                <Motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                  whileHover={variant === 'card' ? { 
                    y: -8, 
                    borderColor: "var(--color-primary)",
                    boxShadow: "var(--elevation-md)"
                  } : undefined}
                  className={cn(
                    "wp-pattern-lts-contact-info__item flex flex-col items-center",
                    variant === 'card' && "p-element-2xl bg-[color:var(--color-card)] border-2 border-[color:var(--color-border)] rounded-[var(--radius-2xl)] shadow-[var(--elevation-sm)] transition-all duration-300"
                  )}
                >
                  {/* Icon Wrapper */}
                  <div className="flex justify-center pb-element-lg">
                    <div className={cn(
                      "w-[var(--spacing-element-4xl)] h-[var(--spacing-element-4xl)] rounded-[var(--radius-2xl)] flex items-center justify-center transition-all duration-300",
                      variant === 'card' ? "bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]" : "bg-[color:var(--color-muted)] text-[color:var(--color-primary)]"
                    )}>
                      {renderIcon()}
                    </div>
                  </div>

                  {/* Label */}
                  <HeadingBlock level={3} textAlign="center" className="pb-element-sm !m-0 font-[family:var(--font-family-lora)] text-[color:var(--color-foreground)]">
                    {item.label}
                  </HeadingBlock>

                  {/* Values */}
                  <div className="flex flex-col gap-fluid-xs text-center font-[family:var(--font-family-noto-sans)]">
                    {values.map((val, idx) => (
                      <div key={idx}>
                        {item.href ? (
                          <a 
                            href={item.href}
                            className="text-[color:var(--color-foreground)] font-[weight:var(--font-weight-medium)] hover:text-[color:var(--color-primary)] transition-colors underline-offset-4 decoration-[color:var(--color-primary)]/30 hover:underline"
                          >
                            {val}
                          </a>
                        ) : (
                          <p className="text-[color:var(--color-muted-foreground)] font-[weight:var(--font-weight-medium)] !m-0">
                            {val}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </Motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ContactInfoPattern;