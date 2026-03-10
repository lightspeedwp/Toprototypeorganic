export * from "./categories";
export * from "./data";

import { getFAQsByCategory } from "./data";

/**
 * Legacy FAQ Groupings
 * 
 * Mapped for backward compatibility with older components.
 */
export const FAQ_GENERAL = getFAQsByCategory("general");
export const FAQ_BOOKING = getFAQsByCategory("booking");
export const FAQ_TOURS = getFAQsByCategory("tours");
export const FAQ_DESTINATIONS = getFAQsByCategory("destinations");
export const FAQ_ACCOMMODATION = getFAQsByCategory("accommodation");
export const FAQ_PAYMENT = getFAQsByCategory("payment");
export const FAQ_TRAVEL = getFAQsByCategory("travel");
export const FAQ_SAFETY = getFAQsByCategory("safety");

export const FAQ_COMPANY = FAQ_GENERAL;
export const FAQ_CONTACT = FAQ_GENERAL;
export const FAQ_TOUR_SPECIFIC = FAQ_TOURS;
export const FAQ_DESTINATION = FAQ_DESTINATIONS;
export const FAQ_TRAVEL_LOGISTICS = FAQ_TRAVEL;
export const FAQ_TEAM = FAQ_GENERAL;

export const PAGE_FAQ_GENERAL = FAQ_GENERAL;
export const PAGE_FAQ_ABOUT = FAQ_COMPANY;
export const PAGE_FAQ_CONTACT = FAQ_CONTACT;
export const PAGE_FAQ_TEAM = FAQ_TEAM;
export const PAGE_FAQ_TOURS = FAQ_TOURS;
export const PAGE_FAQ_DESTINATIONS = FAQ_DESTINATIONS;
export const PAGE_FAQ_ACCOMMODATION = FAQ_ACCOMMODATION;
export const PAGE_FAQ_BOOKING = FAQ_BOOKING;
export const PAGE_FAQ_LOGISTICS = FAQ_TRAVEL_LOGISTICS;
