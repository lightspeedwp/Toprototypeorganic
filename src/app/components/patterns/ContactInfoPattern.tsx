/**
 * Contact Info Pattern Component
 * 
 * Displays contact details with icons in a responsive grid.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Container } from "../common/Container";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Phone, EnvelopeSimple as Mail, MapPin, Clock, Icon as PhosphorIcon, Globe, Users } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { motion as Motion } from "motion/react";

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
  icon?: PhosphorIcon;
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

const DEFAULT_ICONS: Record<ContactType, PhosphorIcon> = {
  phone: Phone,
  email: Mail,
  address: MapPin,
  hours: Clock,
  website: Globe,
  social: Users // Fallback
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
    ...(phone ? [{ type: 'phone' as const, label: 'Phone', value: phone, href: `tel:${phone.replace(/\s/g, '')}` }] : []),
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
        {/* Section Header */}
        {(title || description) && (
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            {title && (
              <HeadingBlock level={2} textAlign="center" className="mb-4">
                {title}
              </HeadingBlock>
            )}
            {description && (
              <ParagraphBlock className="text-muted-foreground" textAlign="center">
                {description}
              </ParagraphBlock>
            )}
          </div>
        )}

        {/* Contact Grid */}
        <div className={cn("grid gap-8 md:gap-12", gridClasses)}>
          {items.map((item, index) => {
            const Icon = item.icon || DEFAULT_ICONS[item.type] || Globe;
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
                  borderColor: "var(--primary)",
                  boxShadow: "var(--elevation-md)"
                } : undefined}
                className={cn(
                  "wp-pattern-lts-contact-info__item",
                  variant === 'card' && "p-8 bg-card border-2 border-border rounded-2xl shadow-sm transition-all duration-300"
                )}
              >
                {/* Icon Wrapper */}
                <div className="flex justify-center mb-6">
                  <div className={cn(
                    "size-14 rounded-2xl flex items-center justify-center transition-all duration-300",
                    variant === 'card' ? "bg-primary/10 text-primary" : "bg-muted text-primary"
                  )}>
                    <Icon className="size-6" aria-hidden="true" />
                  </div>
                </div>

                {/* Label */}
                <HeadingBlock level={3} textAlign="center" className="mb-3">
                  {item.label}
                </HeadingBlock>

                {/* Values */}
                <div className="space-y-2 text-center">
                  {values.map((val, idx) => (
                    <div key={idx}>
                      {item.href ? (
                        <a 
                          href={item.href}
                          className="text-foreground font-medium hover:text-primary transition-colors underline-offset-4 decoration-primary/30 hover:underline"
                        >
                          {val}
                        </a>
                      ) : (
                        <p className="text-muted-foreground font-medium m-0">
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
      </Container>
    </section>
  );
}

export default ContactInfoPattern;
