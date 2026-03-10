/**
 * FAQ Pattern Component
 * 
 * Displays frequently asked questions in an accessible accordion format.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { Container } from "../common/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../blocks/ui/accordion";
import type { FAQItem } from "../../data/types";
import { Question, Plus } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

interface FAQProps {
  items?: FAQItem[];
  questions?: Array<{ id?: string; question: string; answer: string; category?: string }>;
  title?: string;
  intro?: string;
  subtitle?: string;
  className?: string;
}

export function FAQ({ items, questions, title, intro, subtitle, className }: FAQProps) {
  const resolvedItems: FAQItem[] | undefined = items?.map((item, i) => ({
    ...item,
    id: item.id || `faq-item-${i}`
  })) || (questions ? questions.map((q, i) => ({
    id: q.id || `faq-q-${i}`,
    question: q.question,
    answer: q.answer,
    category: q.category || 'general',
  })) : undefined);

  const resolvedIntro = intro || subtitle;

  if (!resolvedItems || resolvedItems.length === 0) return null;

  return (
    <section className={cn("wp-pattern-faq", className)}>
      <Container>
        <div className="wp-pattern-faq__inner">
          {(title || resolvedIntro) && (
            <div className="wp-pattern-faq__header">
              {title && <h2 className="wp-pattern-faq__title">{title}</h2>}
              {resolvedIntro && (
                <p className="wp-pattern-faq__intro">
                  {resolvedIntro}
                </p>
              )}
            </div>
          )}

          <Accordion type="single" collapsible className="wp-pattern-faq__accordion">
            {resolvedItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <AccordionItem
                  value={item.id}
                  className="wp-pattern-faq__item"
                >
                  <AccordionTrigger className="wp-pattern-faq__trigger px-[0px] pt-[16px] pb-[0px]">
                    <span className="wp-pattern-faq__question">
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="wp-pattern-faq__content">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}

export default FAQ;