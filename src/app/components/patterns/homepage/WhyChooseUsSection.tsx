/**
 * Why Choose Us section for the homepage.
 *
 * This section highlights the key benefits of booking with the tour operator.
 *
 * **WordPress CSS:**
 * Uses BEM classes from `/src/styles/patterns/why-choose-us.css`
 *
 * @module WhyChooseUsSection
 * @category components/patterns/homepage
 */

import { WhyChooseUsPattern } from "../WhyChooseUsPattern";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

/**
 * Interface for a single feature.
 */
interface Feature {
  icon: PhosphorIcon;
  title: string;
  description: string;
}

/**
 * Props for the WhyChooseUsSection component.
 */
interface WhyChooseUsSectionProps {
  /** Array of feature objects to display. */
  features: Feature[];
  /** Section header data (title, description). */
  section: {
    title: string;
    description: string;
  };
}

/**
 * WhyChooseUsSection Component.
 */
export function WhyChooseUsSection({ features, section }: WhyChooseUsSectionProps) {
  return (
    <WhyChooseUsPattern
      title={section.title}
      description={section.description}
      features={features}
      columns={3}
      className="wp-template-home__features"
    />
  );
}

export default WhyChooseUsSection;
