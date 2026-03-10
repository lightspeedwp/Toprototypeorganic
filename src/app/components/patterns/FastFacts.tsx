/**
 * Fast Facts Pattern Component
 * 
 * Displays a grid of quick-reference facts with icons and values.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Container } from "../common/Container";
import { cn } from "../../lib/utils";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

interface FastFact {
  icon: PhosphorIcon;
  label: string;
  value: string;
}

interface FastFactsProps {
  facts: FastFact[];
  className?: string;
}

export function FastFacts({ facts, className }: FastFactsProps) {
  if (facts.length === 0) return null;

  return (
    <section className={cn("wp-pattern-fast-facts", className)}>
      <Container>
        <div className="wp-pattern-fast-facts__grid wp-pattern-fast-facts__grid--cols-4">
          {facts.map((fact, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="wp-pattern-fast-facts__item wp-pattern-fast-facts__item--horizontal"
            >
              <fact.icon className="wp-pattern-fast-facts__icon" />
              <div className="wp-pattern-fast-facts__text">
                <span className="wp-pattern-fast-facts__label">
                  {fact.label}
                </span>
                <span className="wp-pattern-fast-facts__value wp-pattern-fast-facts__value--small">
                  {fact.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default FastFacts;
