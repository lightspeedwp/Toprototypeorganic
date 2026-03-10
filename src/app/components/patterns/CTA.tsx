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
  primaryAction: ActionButton;
  secondaryAction?: ActionButton;
  variant?: CTAVariant;
  backgroundImage?: string;
  className?: string;
  animated?: boolean;
}

export function CTA({
  title, description, primaryAction, secondaryAction,
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
      <section className={cn("wp-pattern-cta px-[24px] py-[40px]", `wp-pattern-cta--${variant}`, className)}>
        {/* Background Image/Pattern */}
        {backgroundImage && (
          <div className="wp-pattern-cta__background">
            <img src={backgroundImage} alt="" aria-hidden="true" className="wp-pattern-cta__background-image" />
            <div className="wp-pattern-cta__overlay" />
          </div>
        )}

        <Container>
          <div className="wp-pattern-cta__inner">
            <motion.div
              initial={animated ? { opacity: 0, scale: 0.9 } : {}}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="wp-pattern-cta__badge"
            >
              <Compass className="wp-pattern-cta__badge-icon" />
              <span className="wp-pattern-cta__badge-text">Begin Your Chronicle</span>
            </motion.div>

            <motion.h2
              initial={animated ? { opacity: 0, y: 20 } : {}}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="wp-pattern-cta__title"
            >
              {title}
            </motion.h2>

            {description && (
              <motion.p
                initial={animated ? { opacity: 0, y: 20 } : {}}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="wp-pattern-cta__description"
              >
                {description}
              </motion.p>
            )}

            <motion.div
              initial={animated ? { opacity: 0, y: 20 } : {}}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="wp-pattern-cta__actions"
            >
              <button
                onClick={() => handleAction(primaryAction)}
                className="wp-pattern-cta__button-primary"
              >
                {primaryAction.label}
                <ArrowRight className="wp-pattern-cta__button-icon" />
              </button>

              {secondaryAction && (
                <button
                  onClick={() => handleAction(secondaryAction)}
                  className="wp-pattern-cta__button-secondary"
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