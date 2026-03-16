/**
 * CTA Pattern Component
 * 
 * Prominent call-to-action section with premium design.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Compass, Envelope, Calendar } from "@phosphor-icons/react";
import { Container } from "../common/Container";
import { EnquiryModal } from "./EnquiryModal";
import { cn } from "../../lib/utils";
import { BotanicalCorner } from "../common/organic/OrganicAssets";

interface ActionButton {
  label: string;
  href?: string;
  onClick?: () => void;
  openModal?: boolean;
  icon?: any;
}

export type CTAVariant = "default" | "gradient" | "bordered" | "minimal";

interface CTAProps {
  title: string;
  description?: string;
  accent?: string;
  primaryAction: ActionButton;
  secondaryAction?: ActionButton;
  variant?: CTAVariant;
  backgroundImage?: string;
  className?: string;
  animated?: boolean;
}

export function CTA({
  title, description, accent, primaryAction, secondaryAction,
  variant = "default", backgroundImage, className, animated = true,
}: CTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = (action: ActionButton) => {
    if (action.openModal !== false && (action.openModal || !action.onClick)) {
      setIsModalOpen(true);
    } else if (action.onClick) {
      action.onClick();
    }
  };

  return (
    <>
      <section className={cn("wp-pattern-cta has-organic-assets", `wp-pattern-cta--${variant}`, className)}>
        {/* Background Image/Pattern */}
        {backgroundImage && (
          <div className="wp-pattern-cta__background">
            <img src={backgroundImage} alt="" aria-hidden="true" className="wp-pattern-cta__background-image" loading="lazy" />
            <div className="wp-pattern-cta__overlay" />
          </div>
        )}

        {/* Botanical Flourish */}
        <BotanicalCorner className="wp-part-botanical-ornament--bottom-right-large" />
        <BotanicalCorner className="wp-part-botanical-ornament--top-left-large" />

        <Container className="relative">
          <div className="wp-pattern-cta__inner relative z-10 flex flex-col items-center text-center gap-element-lg">
            <motion.div
              initial={animated ? { opacity: 0, scale: 0.9 } : {}}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="wp-pattern-cta__badge m-0"
            >
              <Compass className="wp-pattern-cta__badge-icon" />
              <span className="wp-pattern-cta__badge-text font-[family:var(--font-family-noto-sans)]">Begin Your Chronicle</span>
            </motion.div>

            <motion.h2
              initial={animated ? { opacity: 0, y: 20 } : {}}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="wp-pattern-cta__title m-0 font-[family:var(--font-family-lora)]"
            >
              {title}
            </motion.h2>

            {accent && (
              <motion.div
                initial={animated ? { opacity: 0, y: 10 } : {}}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="font-[family:var(--font-family-shadows)] text-[length:var(--text-3xl)] text-[color:var(--color-accent)] m-0"
              >
                {accent}
              </motion.div>
            )}

            {description && (
              <motion.p
                initial={animated ? { opacity: 0, y: 20 } : {}}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="wp-pattern-cta__description m-0 font-[family:var(--font-family-noto-sans)]"
              >
                {description}
              </motion.p>
            )}

            <motion.div
              initial={animated ? { opacity: 0, y: 20 } : {}}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="wp-pattern-cta__actions m-0 flex flex-wrap items-center justify-center gap-fluid-lg"
            >
              <button
                onClick={() => handleAction(primaryAction)}
                className="wp-pattern-cta__button-primary flex items-center gap-fluid-sm font-[family:var(--font-family-noto-sans)]"
              >
                {primaryAction.label}
                <ArrowRight className="wp-pattern-cta__button-icon w-[var(--spacing-element-sm)] h-[var(--spacing-element-sm)]" />
              </button>

              {secondaryAction && (
                <button
                  onClick={() => handleAction(secondaryAction)}
                  className="wp-pattern-cta__button-secondary font-[family:var(--font-family-noto-sans)]"
                >
                  {secondaryAction.label}
                </button>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      <EnquiryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}

export default CTA;