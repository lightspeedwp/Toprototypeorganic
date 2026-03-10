/**
 * Site Configuration
 * 
 * Global configuration constants for the application.
 * Centralizes brand names, social links, contact info, etc.
 * 
 * @module site-config
 * @category data
 */

import { FacebookLogo as Facebook, InstagramLogo as Instagram, TwitterLogo as Twitter, LinkedinLogo as Linkedin, YoutubeLogo as Youtube } from "@phosphor-icons/react";

export const SITE_CONFIG = {
  name: "LightSpeed Tours",
  brandName: "LightSpeed Tours", // Main brand name
  brandNameItalic: "<em>LightSpeed Tours</em>", // HTML version if needed
  description: "Creating unforgettable travel experiences to the world's most extraordinary destinations since 2005.",
  contact: {
    phone: "+1 555-0123",
    email: "info@lightspeedtours.com",
    address: "123 Safari Way, Cape Town, South Africa",
  },
  social: [
    {
      name: "Facebook",
      url: "https://facebook.com",
      Icon: Facebook,
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      Icon: Instagram,
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      Icon: Twitter,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      Icon: Linkedin,
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      Icon: Youtube,
    },
  ],
  // Legacy brand names for reference or migration
  legacy: {
    tourOperator: "Tour Operator",
    tourOperatorPlugin: "Tour Operator Plugin",
    tourOperatorWebSolutions: "Tour Operator Web Solutions",
  }
};

/**
 * Helper to render the brand name with optional italics enforcement.
 * 
 * @param text - The text containing the brand name
 * @returns ReactNode with italicized brand name
 */
export function formatBrandText(text: string) {
  // Simple string replacement isn't enough for React if we want <em> tags.
  // This is a placeholder for a more complex component if needed.
  // For now, we assume simple string usage in most places.
  return text; 
}
