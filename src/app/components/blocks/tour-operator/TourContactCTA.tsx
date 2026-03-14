/**
 * Tour Contact CTA Block Component
 * 
 * Sidebar contact widget with phone number, email link,
 * and optional enquiry button.
 * 
 * **WordPress Context:**
 * - Slug: lsx-tour-operator/contact-cta
 * - Category: Tour Operator
 * - Used in single tour/accommodation sidebar
 * 
 * @module TourContactCTA
 * @category blocks/tour-operator
 */

import './TourContactCTA.css';
import { Phone, Envelope as Mail, ChatCircle as MessageSquare } from '@phosphor-icons/react';

export interface TourContactCTAProps {
  /** Section title */
  title?: string;
  /** Descriptive text */
  description?: string;
  /** Phone number to display */
  phone?: string;
  /** Email address to display */
  email?: string;
  /** Enquiry button label */
  enquiryLabel?: string;
  /** Enquiry button click handler */
  onEnquiry?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Tour Contact CTA Block component.
 * 
 * @component
 * @category blocks/tour-operator
 */
export function TourContactCTA({
  title = 'Questions About This Tour?',
  description = 'Our travel experts are here to help you plan the perfect adventure.',
  phone,
  email,
  enquiryLabel = 'Send an Enquiry',
  onEnquiry,
  className = '',
}: TourContactCTAProps) {
  return (
    <div className={`lsx-tour-contact-cta ${className}`} role="complementary" aria-label={title}>
      <h4 className="pb-element-sm">{title}</h4>
      <p className="lsx-tour-contact-cta__description">{description}</p>

      <div className="lsx-tour-contact-cta__links">
        {phone && (
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="lsx-tour-contact-cta__link">
            <Phone size={16} className="lsx-tour-contact-cta__link-icon" aria-hidden="true" />
            <span>{phone}</span>
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} className="lsx-tour-contact-cta__link">
            <Mail size={16} className="lsx-tour-contact-cta__link-icon" aria-hidden="true" />
            <span>{email}</span>
          </a>
        )}
      </div>

      {onEnquiry && (
        <>
          <hr className="lsx-tour-contact-cta__divider" />
          <button
            className="lsx-tour-contact-cta__button"
            onClick={onEnquiry}
            type="button"
          >
            <MessageSquare size={16} aria-hidden="true" />
            {enquiryLabel}
          </button>
        </>
      )}
    </div>
  );
}

TourContactCTA.displayName = 'TourContactCTA';