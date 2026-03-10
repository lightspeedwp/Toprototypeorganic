/**
 * Newsletter section for the homepage.
 *
 * This section provides a signup form for the company newsletter.
 *
 * **WordPress CSS:**
 * Uses BEM classes from `/src/styles/patterns/newsletter.css`
 * Section background from `/src/styles/templates/home.css`
 *
 * @module NewsletterSection
 * @category components/patterns/homepage
 */

import { Container } from "../../common/Container";
import { NewsletterSignupPattern } from "../NewsletterSignupPattern";

/**
 * Props for the NewsletterSection component.
 */
interface NewsletterSectionProps {
  /** Newsletter section header data (title, description). */
  newsletter: {
    title: string;
    description: string;
  };
  /** Callback for form submission. */
  onSubmit: (email: string) => Promise<boolean>;
}

/**
 * NewsletterSection Component.
 */
export function NewsletterSection({ newsletter, onSubmit }: NewsletterSectionProps) {
  return (
    <section className="wp-template-home__newsletter">
      <Container>
        <NewsletterSignupPattern
          title={newsletter.title}
          description={newsletter.description}
          variant="default"
          onSubmit={onSubmit}
        />
      </Container>
    </section>
  );
}

export default NewsletterSection;
