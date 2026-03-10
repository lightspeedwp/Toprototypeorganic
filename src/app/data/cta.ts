/**
 * CTA Data
 * 
 * Mock data for Call-to-Action components.
 * 
 * @module cta
 * @category data
 */

import type { CTAContent } from "./types";

/**
 * CTA Content - Reusable call-to-action content for archive pages.
 * 
 * Each CTA includes persuasive copy tailored to its context (tours, destinations, etc.)
 * and action-oriented button labels to drive conversions.
 * 
 * @constant {CTAContent}
 */
export const CTA_TOURS_ARCHIVE: CTAContent = {
  id: "cta-tours-archive",
  context: "tours-archive",
  title: "Ready to start your African adventure?",
  description: "Our safari specialists are ready to help you plan the perfect journey. Share your travel dreams with us and we'll create a personalized itinerary that exceeds your expectations.",
  primaryButtonLabel: "Plan my safari",
  secondaryButtonLabel: "Contact us",
  secondaryButtonAction: "contact-page",
  modalTitle: "Let's plan your dream safari",
  modalDescription: "Tell us about your ideal African adventure and our expert team will craft a personalized itinerary just for you. Whether you're seeking wildlife encounters, cultural experiences, or luxury relaxation, we'll make it unforgettable.",
};

export const CTA_DESTINATIONS_ARCHIVE: CTAContent = {
  id: "cta-destinations-archive",
  context: "destinations-archive",
  title: "Discover your perfect destination",
  description: "From the Serengeti to Victoria Falls, Africa awaits. Let our destination experts help you choose the perfect location for your dream safari adventure.",
  primaryButtonLabel: "Get destination advice",
  secondaryButtonLabel: "View all tours",
  secondaryButtonAction: "tours-archive",
  modalTitle: "Find your perfect African destination",
  modalDescription: "Share what you're looking for in a safari destination and our experts will recommend the best locations, times to visit, and experiences for your interests and budget.",
};

export const CTA_ACCOMMODATION_ARCHIVE: CTAContent = {
  id: "cta-accommodation-archive",
  context: "accommodation-archive",
  title: "Find your perfect safari lodge",
  description: "From luxury tented camps to intimate bush lodges, we'll help you find accommodation that makes your African safari truly unforgettable.",
  primaryButtonLabel: "Get accommodation recommendations",
  secondaryButtonLabel: "Explore tours",
  secondaryButtonAction: "tours-archive",
  modalTitle: "Discover your ideal safari accommodation",
  modalDescription: "Tell us about your accommodation preferences and we'll recommend the perfect lodges and camps for your safari. Whether you seek luxury, authenticity, or eco-conscious stays, we'll find your match.",
};

export const CTA_BLOG_ARCHIVE: CTAContent = {
  id: "cta-blog-archive",
  context: "blog-archive",
  title: "Turn your safari dreams into reality",
  description: "Inspired by what you've read? Our safari specialists can help you experience it firsthand. Let's start planning your African adventure today.",
  primaryButtonLabel: "Start planning",
  secondaryButtonLabel: "View safari tours",
  secondaryButtonAction: "tours-archive",
  modalTitle: "Bring your safari dreams to life",
  modalDescription: "You've explored our stories—now it's time to create your own. Share your interests with us and we'll design a safari experience that brings everything you've read about to life.",
};

export const CTA_TEAM_ARCHIVE: CTAContent = {
  id: "cta-team-archive",
  context: "team-archive",
  title: "Work with our expert team",
  description: "Our passionate safari specialists have firsthand knowledge of every destination we offer. Connect with us to start planning your personalized African journey.",
  primaryButtonLabel: "Connect with a specialist",
  secondaryButtonLabel: "Browse tours",
  secondaryButtonAction: "tours-archive",
  modalTitle: "Connect with your safari specialist",
  modalDescription: "Our team has decades of combined experience exploring Africa. Share your travel vision with us and we'll match you with the perfect specialist to bring it to life.",
};

export const CTA_SPECIALS_ARCHIVE: CTAContent = {
  id: "cta-specials-archive",
  context: "specials-archive",
  title: "Claim your special offer today",
  description: "These exclusive deals won't last forever. Contact us now to secure your discounted safari adventure and start planning the trip of a lifetime.",
  primaryButtonLabel: "Claim this offer",
  secondaryButtonLabel: "View all tours",
  secondaryButtonAction: "tours-archive",
  modalTitle: "Secure your special safari offer",
  modalDescription: "Don't miss out on these limited-time deals. Share your travel dates and preferences with us, and we'll help you take advantage of the best offer for your dream safari.",
};

export const CTA_TAXONOMY_ARCHIVE: CTAContent = {
  id: "cta-taxonomy-archive",
  context: "taxonomy-archive",
  title: "Ready to experience this style of travel?",
  description: "Our specialists can recommend the perfect tours and destinations that match this travel style. Let's create your ideal African adventure together.",
  primaryButtonLabel: "Get personalized recommendations",
  secondaryButtonLabel: "Explore all travel styles",
  secondaryButtonAction: "tours-archive",
  modalTitle: "Find tours that match your style",
  modalDescription: "You've found a travel style that excites you—now let us show you the best tours, destinations, and experiences that bring it to life. Share your preferences and we'll create the perfect itinerary.",
};
