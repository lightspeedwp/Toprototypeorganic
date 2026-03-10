/**
 * Newsletter Signup Pattern Component
 *
 * Email capture form with premium design.
 *
 * **WordPress CSS:**
 * Uses BEM classes from `/src/styles/patterns/newsletter.css`
 *
 * @module NewsletterSignupPattern
 * @category patterns
 */

import { useState } from "react";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Button } from "../blocks/design/Button";
import { Envelope, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export interface NewsletterSignupPatternProps {
  title?: string;
  description?: string;
  buttonText?: string;
  privacyNote?: string;
  variant?: 'default' | 'minimal';
  className?: string;
  onSubmit?: (email: string) => Promise<boolean>;
}

export function NewsletterSignupPattern({
  title = "Stay Inspired",
  description = "Join our community of elite explorers and receive curated destination guides and exclusive seasonal invitations.",
  buttonText = "Join the Inner Circle",
  privacyNote = "Your data is handled with absolute discretion. Unsubscribe at your convenience.",
  variant = 'default',
  className,
  onSubmit,
}: NewsletterSignupPatternProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsLoading(true);
    if (onSubmit) {
      await onSubmit(email);
    } else {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className={cn("wp-pattern-newsletter", className)}>
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="wp-pattern-newsletter__success"
          >
            <div className="wp-pattern-newsletter__success-icon-wrapper">
              <CheckCircle className="wp-pattern-newsletter__success-icon" weight="fill" />
            </div>
            <h3 className="wp-pattern-newsletter__success-title">Welcome to the Collection</h3>
            <p className="wp-pattern-newsletter__success-message">
              Your first edition of the Safari Insider is on its way.
            </p>
          </motion.div>
        ) : (
          <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
            <div className="wp-pattern-newsletter__header">
              <HeadingBlock level={2} textAlign="center">
                {title}
              </HeadingBlock>
              <ParagraphBlock className="wp-pattern-newsletter__description" size="lg">
                {description}
              </ParagraphBlock>
            </div>

            <form onSubmit={handleSubmit} className="wp-pattern-newsletter__form">
              <div className="wp-pattern-newsletter__input-wrapper">
                <Envelope className="wp-pattern-newsletter__input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email..."
                  required
                  disabled={isLoading}
                  className="wp-pattern-newsletter__input"
                />
                <div className="wp-pattern-newsletter__submit-wrapper">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : (
                      <>
                        {buttonText} <ArrowRight className="wp-card__action-icon" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>

            <p className="wp-pattern-newsletter__privacy">
              {privacyNote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NewsletterSignupPattern;