/**
 * Final CTA section for the homepage.
 *
 * This section provides a final call to action at the bottom of the front page.
 */

import { CTA } from "../CTA";

/**
 * Props for the FinalCTASection component.
 */
interface FinalCTASectionProps {
  /** CTA section content (title, description, buttons). */
  cta: {
    title: string;
    description: string;
    primaryButtonLabel: string;
    primaryButtonHref: string;
    secondaryButtonLabel: string;
    secondaryButtonHref: string;
  };
  /** Callback for navigation. */
  onNavigate: (path: string) => void;
}

/**
 * FinalCTASection Component.
 */
export function FinalCTASection({ cta, onNavigate }: FinalCTASectionProps) {
  return (
    <CTA
      title={cta.title}
      description={cta.description}
      variant="gradient"
      primaryAction={{
        label: cta.primaryButtonLabel,
        onClick: () => onNavigate(cta.primaryButtonHref),
      }}
      secondaryAction={{
        label: cta.secondaryButtonLabel,
        onClick: () => onNavigate(cta.secondaryButtonHref),
      }}
    />
  );
}

export default FinalCTASection;
