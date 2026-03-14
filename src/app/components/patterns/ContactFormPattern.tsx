/**
 * Contact Form Pattern Component
 * 
 * A comprehensive contact form pattern with validation and feedback.
 * Strictly adheres to design system tokens and BEM naming.
 */

import { useState } from "react";
import { HeadingBlock } from "../blocks/core/HeadingBlock";
import { ParagraphBlock } from "../blocks/core/ParagraphBlock";
import { Container } from "../common/Container";
import { PaperPlaneRight as Send, CheckCircle as CircleCheck, WarningCircle as AlertCircle, Spinner as LoaderCircle } from "@phosphor-icons/react";
import { cn } from "../../lib/utils";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactFormPatternProps {
  title?: string;
  description?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
  showPhoneField?: boolean;
  successMessage?: string;
  errorMessage?: string;
  variant?: "default" | "compact";
}

export function ContactFormPattern({
  title = "Send Us a Message",
  description = "Fill out the form below and we'll get back to you within 24 hours",
  onSubmit,
  showPhoneField = true,
  successMessage = "Thank you! Your message has been sent successfully. We'll be in touch soon.",
  errorMessage = "Oops! Something went wrong. Please try again or contact us directly.",
  variant = "default",
}: ContactFormPatternProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      if (onSubmit) await onSubmit(formData);
      else await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className={cn("wp-pattern-lts-contact-form flex flex-col gap-fluid-xl", variant === "compact" ? "max-w-2xl" : "max-w-3xl")}>
      <div className="flex flex-col gap-fluid-sm">
        {title && <HeadingBlock level={2}>{title}</HeadingBlock>}
        {description && <ParagraphBlock className="text-[color:var(--color-muted-foreground)] m-0">{description}</ParagraphBlock>}
      </div>

      {submitStatus === "success" && (
        <div className="p-element-2xl rounded-[var(--radius-xl)] bg-[color:var(--color-primary)]/10 border border-[color:var(--color-primary)]/20 flex items-start gap-fluid-lg">
          <CircleCheck className="w-[var(--spacing-element-xl)] h-[var(--spacing-element-xl)] text-[color:var(--color-primary)] shrink-0" />
          <p className="text-[color:var(--color-primary)] font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-bold)] !m-0">{successMessage}</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-element-2xl rounded-[var(--radius-xl)] bg-[color:var(--color-destructive)]/10 border border-[color:var(--color-destructive)]/20 flex items-start gap-fluid-lg">
          <AlertCircle className="w-[var(--spacing-element-xl)] h-[var(--spacing-element-xl)] text-[color:var(--color-destructive)] shrink-0" />
          <p className="text-[color:var(--color-destructive)] font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-bold)] !m-0">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-fluid-xl">
        <div className="grid md:grid-cols-2 gap-fluid-xl">
          <div className="form__group flex flex-col gap-fluid-sm">
            <label htmlFor="name" className="form__label form__label--required font-[family:var(--font-family-noto-sans)]">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={cn("form__input font-[family:var(--font-family-noto-sans)]", errors.name && "form__input--error")}
              placeholder="Your name"
              required
            />
            {errors.name && <p className="form__error font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)]">{errors.name}</p>}
          </div>

          <div className="form__group flex flex-col gap-fluid-sm">
            <label htmlFor="email" className="form__label form__label--required font-[family:var(--font-family-noto-sans)]">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={cn("form__input font-[family:var(--font-family-noto-sans)]", errors.email && "form__input--error")}
              placeholder="email@example.com"
              required
            />
            {errors.email && <p className="form__error font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)]">{errors.email}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-fluid-xl">
          {showPhoneField && (
            <div className="form__group flex flex-col gap-fluid-sm">
              <label htmlFor="phone" className="form__label font-[family:var(--font-family-noto-sans)]">Phone Number (Optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form__input font-[family:var(--font-family-noto-sans)]"
                placeholder="+27..."
              />
            </div>
          )}

          <div className="form__group flex flex-col gap-fluid-sm">
            <label htmlFor="subject" className="form__label form__label--required font-[family:var(--font-family-noto-sans)]">Subject</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={cn("form__select font-[family:var(--font-family-noto-sans)]", errors.subject && "form__input--error")}
              required
            >
              <option value="">Select a subject</option>
              <option value="general">General Enquiry</option>
              <option value="booking">Tour Booking</option>
              <option value="custom">Custom Itinerary</option>
              <option value="support">Existing Booking</option>
            </select>
            {errors.subject && <p className="form__error font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)]">{errors.subject}</p>}
          </div>
        </div>

        <div className="form__group flex flex-col gap-fluid-sm">
          <label htmlFor="message" className="form__label form__label--required font-[family:var(--font-family-noto-sans)]">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={cn("form__textarea font-[family:var(--font-family-noto-sans)]", errors.message && "form__textarea--error")}
            placeholder="How can we help you design your perfect safari?"
            required
          />
          {errors.message && <p className="form__error font-[family:var(--font-family-noto-sans)] text-[length:var(--text-sm)]">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-fluid-md bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] font-[family:var(--font-family-noto-sans)] font-[weight:var(--font-weight-bold)] py-element-lg rounded-[var(--radius-xl)] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="w-[var(--spacing-element-xl)] h-[var(--spacing-element-xl)] animate-spin" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <Send className="w-[var(--spacing-element-xl)] h-[var(--spacing-element-xl)]" />
              <span>Send Enquiry</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}