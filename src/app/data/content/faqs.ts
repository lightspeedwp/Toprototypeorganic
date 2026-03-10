/**
 * Centralized Page Section FAQ data.
 * 
 * Each page template's FAQ accordion section pulls from this collection.
 * This ensures consistent FAQ content across the site and allows
 * editorial control from a single data source.
 * 
 * @module content-faqs
 * @category data/content
 */

import type { PageSectionFAQs } from "../types";

/**
 * FAQ sets for all page templates.
 */
export const PAGE_SECTION_FAQS: PageSectionFAQs[] = [
  {
    id: "faq-section-tours",
    context: "tours-archive",
    sectionTitle: "Frequently asked questions about our tours",
    sectionDescription: "Common questions about booking, itineraries, and what to expect on your safari.",
    items: [
      { id: "faq-ta-1", question: "How far in advance should I book a tour?", answer: "We recommend booking at least 6–12 months in advance, especially for peak season (June–October). Popular lodges and parks fill up quickly. Last-minute bookings are sometimes possible but limit availability.", category: "tours" },
      { id: "faq-ta-2", question: "What is included in the tour price?", answer: "Most tours include accommodation, meals as specified, park entrance fees, guide services, and ground transportation. International flights, travel insurance, visas, and personal expenses are typically excluded. Each tour page lists exact inclusions and exclusions.", category: "tours" },
      { id: "faq-ta-3", question: "Can tours be customized?", answer: "Absolutely! All our tours can be tailored to your preferences, budget, and schedule. Our specialists will work with you to adjust itineraries, add extra days, upgrade accommodation, or combine multiple destinations.", category: "tours" },
      { id: "faq-ta-4", question: "What is the typical group size?", answer: "Our group tours typically have 2–12 travelers. We also offer private tours for couples, families, and small groups who prefer a more exclusive experience.", category: "tours" },
    ],
  },
  {
    id: "faq-section-destinations",
    context: "destinations-archive",
    sectionTitle: "Frequently asked questions about destinations",
    sectionDescription: "Learn about visas, best travel times, safety, and what makes each destination special.",
    items: [
      { id: "faq-da-1", question: "Do I need a visa to visit African destinations?", answer: "Visa requirements vary by nationality and destination. Most travelers need a visa for countries like Tanzania and Kenya (often available on arrival or via e-visa). South Africa offers visa-free entry for many nationalities. We provide detailed visa guidance for every booking.", category: "destinations" },
      { id: "faq-da-2", question: "When is the best time to visit for wildlife viewing?", answer: "The dry season (June–October) is generally best for wildlife viewing across most of Southern and East Africa, as animals gather around water sources. However, the green season (November–April) offers lush landscapes, bird watching, and lower prices.", category: "destinations" },
      { id: "faq-da-3", question: "Are the destinations safe for tourists?", answer: "Our destinations are well-established tourist regions with excellent safety records. We work only with licensed operators and experienced guides. Standard travel precautions apply, and our team provides detailed safety briefings before departure.", category: "destinations" },
      { id: "faq-da-4", question: "What vaccinations are recommended?", answer: "Required vaccinations depend on the destination. Yellow fever vaccination is mandatory for some East African countries. We recommend consulting a travel health clinic 6–8 weeks before departure. Malaria prophylaxis is recommended for most safari destinations.", category: "destinations" },
    ],
  },
  {
    id: "faq-section-accommodation",
    context: "accommodation-archive",
    sectionTitle: "Frequently asked questions about accommodation",
    sectionDescription: "Everything you need to know about safari lodges, camps, and hotels.",
    items: [
      { id: "faq-aa-1", question: "What types of accommodation are available?", answer: "We offer a range from luxury safari lodges and boutique hotels to intimate tented camps and eco-lodges. Each property is personally inspected and selected for quality, location, and guest experience.", category: "accommodation" },
      { id: "faq-aa-2", question: "Are the tented camps safe?", answer: "Yes! Safari tented camps are fully furnished, often luxurious, and built to high safety standards. They feature proper beds, en-suite bathrooms, and 24-hour security. Staff are trained in wildlife safety protocols.", category: "accommodation" },
      { id: "faq-aa-3", question: "Can I request specific dietary requirements?", answer: "Absolutely. All our partner lodges and camps accommodate dietary requirements including vegetarian, vegan, gluten-free, halal, and kosher. Please inform us at booking so we can make arrangements in advance.", category: "accommodation" },
    ],
  },
  {
    id: "faq-section-blog",
    context: "blog-archive",
    sectionTitle: "About our blog",
    sectionDescription: "Learn more about our travel content and how it can help plan your safari.",
    items: [
      { id: "faq-ba-1", question: "Who writes the blog content?", answer: "Our blog is written by our team of safari specialists, experienced guides, and guest contributors who have firsthand knowledge of the destinations and experiences we cover.", category: "general" },
      { id: "faq-ba-2", question: "Can I contribute a guest post?", answer: "We welcome guest contributions from travelers who have experienced our tours. Contact our editorial team with your story idea and we'll be happy to discuss collaboration opportunities.", category: "general" },
    ],
  },
  {
    id: "faq-section-team",
    context: "team-archive",
    sectionTitle: "Questions about our team",
    sectionDescription: "Learn how our specialists can help plan your perfect safari.",
    items: [
      { id: "faq-tea-1", question: "Can I choose which specialist to work with?", answer: "Yes! Each specialist has different areas of expertise and destination knowledge. Browse our team profiles to find the best match for your travel interests, or let us recommend someone based on your requirements.", category: "general" },
      { id: "faq-tea-2", question: "How experienced are your team members?", answer: "Our team has a combined 100+ years of African travel experience. Every specialist has personally visited the destinations they recommend and undergoes continuous training to stay current with the latest developments.", category: "general" },
    ],
  },
  {
    id: "faq-section-specials",
    context: "specials-archive",
    sectionTitle: "Frequently asked questions about special offers",
    sectionDescription: "How our promotions work and how to take advantage of them.",
    items: [
      { id: "faq-sa-1", question: "How do I claim a special offer?", answer: "Simply contact us referencing the specific offer or use the 'Claim This Offer' button on the special's page. Our team will verify availability and guide you through the booking process.", category: "general" },
      { id: "faq-sa-2", question: "Can special offers be combined with other discounts?", answer: "Generally, special offers cannot be combined with other promotions. However, some value-add offers (like complimentary spa treatments) can sometimes be added to existing bookings. Ask your specialist for details.", category: "general" },
      { id: "faq-sa-3", question: "What happens if a special offer expires before I book?", answer: "We often have similar offers coming up. Subscribe to our newsletter to be first to know about new specials. Our team may also be able to negotiate similar terms depending on availability.", category: "general" },
    ],
  },
  {
    id: "faq-section-reviews",
    context: "reviews-archive",
    sectionTitle: "About our reviews",
    sectionDescription: "How we collect and verify traveler reviews.",
    items: [
      { id: "faq-ra-1", question: "Are the reviews genuine?", answer: "Yes, all reviews are from verified travelers who have booked and completed a trip with us. We send review invitations after each trip and publish all feedback, positive and constructive, without editing the content.", category: "general" },
      { id: "faq-ra-2", question: "Can I leave a review after my trip?", answer: "Absolutely! After your trip, you'll receive an email invitation to share your experience. You can also submit a review anytime through your account or by contacting our team.", category: "general" },
    ],
  },
  {
    id: "faq-section-home",
    context: "home",
    sectionTitle: "Frequently asked questions",
    sectionDescription: "Quick answers to common questions about LightSpeed Tours and planning your safari.",
    items: [
      { id: "faq-h-1", question: "What makes LightSpeed Tours different?", answer: "We combine over 20 years of African expertise with a deeply personal approach. Every safari is custom-designed by specialists who have personally explored the destinations. We focus on quality over volume, ensuring exceptional experiences.", category: "general" },
      { id: "faq-h-2", question: "How do I start planning my safari?", answer: "Simply contact us with your travel dates, budget, and interests. Our specialists will create a personalized itinerary proposal within 48 hours. There's no obligation—just expert advice tailored to your dream trip.", category: "general" },
      { id: "faq-h-3", question: "Is travel insurance required?", answer: "While not always legally required, we strongly recommend comprehensive travel insurance including medical evacuation coverage for all safari destinations. We can recommend trusted insurance providers.", category: "general" },
    ],
  },
  {
    id: "faq-section-about",
    context: "about",
    sectionTitle: "Questions about LightSpeed Tours",
    items: [
      { id: "faq-ab-1", question: "How long has LightSpeed Tours been operating?", answer: "LightSpeed Tours has been crafting exceptional African safari experiences for over 20 years. Founded by passionate travelers, we've grown into one of Africa's most trusted tour operators.", category: "general" },
      { id: "faq-ab-2", question: "Do you support sustainable tourism?", answer: "Sustainability is at the core of everything we do. We partner with conservation-focused lodges, support local communities, and follow responsible tourism practices. A portion of every booking goes to wildlife conservation projects.", category: "general" },
    ],
  },
  {
    id: "faq-section-contact",
    context: "contact",
    sectionTitle: "Contact & communication FAQ",
    items: [
      { id: "faq-co-1", question: "What is your response time?", answer: "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our office directly. During peak season, response times may be slightly longer.", category: "general" },
      { id: "faq-co-2", question: "Can I schedule a video consultation?", answer: "Yes! We offer complimentary video consultations with our safari specialists. This is a great way to discuss your travel plans in detail and get personalized recommendations.", category: "general" },
    ],
  },
  {
    id: "faq-section-tour-single",
    context: "tour-single",
    sectionTitle: "Tour FAQs",
    sectionDescription: "Common questions about this tour experience.",
    items: [
      { id: "faq-ts-1", question: "What fitness level is required?", answer: "Each tour has a difficulty rating listed on the page. Most safari tours require moderate fitness — the ability to walk on uneven terrain and get in/out of safari vehicles. Specific requirements are noted per tour.", category: "tours" },
      { id: "faq-ts-2", question: "Can I extend or shorten the itinerary?", answer: "Absolutely. All our tours can be customized. Contact your specialist to add extra days, combine destinations, or adjust the pace to suit your preferences.", category: "tours" },
      { id: "faq-ts-3", question: "What happens in case of bad weather?", answer: "Safari activities continue in most weather conditions. However, if conditions become unsafe, our guides will adjust plans accordingly. Alternative activities are always available.", category: "tours" },
    ],
  },
  {
    id: "faq-section-destination-single",
    context: "destination-single",
    sectionTitle: "Destination FAQs",
    sectionDescription: "Practical information for planning your visit.",
    items: [
      { id: "faq-ds-1", question: "What currency should I bring?", answer: "Currency details are listed on each destination page. US Dollars are widely accepted across Africa. We recommend carrying a mix of local currency and USD. ATMs are available in major towns.", category: "destinations" },
      { id: "faq-ds-2", question: "Is it safe to travel independently?", answer: "While independent travel is possible in many areas, we strongly recommend guided experiences for safari regions. Our local guides ensure safety, enhance wildlife sightings, and provide invaluable cultural context.", category: "destinations" },
      { id: "faq-ds-3", question: "What should I know about local customs?", answer: "We provide comprehensive cultural briefings before departure. Respect for local customs, appropriate dress at cultural sites, and photography etiquette are covered in your pre-trip documentation.", category: "destinations" },
    ],
  },
  {
    id: "faq-section-accommodation-single",
    context: "accommodation-single",
    sectionTitle: "Accommodation FAQs",
    sectionDescription: "What to expect during your stay.",
    items: [
      { id: "faq-as-1", question: "Is WiFi available?", answer: "WiFi availability varies by property and is listed on each accommodation page. Remote safari camps may have limited connectivity, which is part of the wilderness experience. Most lodges offer WiFi in common areas.", category: "accommodation" },
      { id: "faq-as-2", question: "What about laundry services?", answer: "Most safari lodges and camps offer daily laundry service, often complimentary. This allows you to pack lighter. Specific services are noted on each property page.", category: "accommodation" },
    ],
  },
  {
    id: "faq-section-blog-single",
    context: "blog-single",
    sectionTitle: "Article FAQs",
    sectionDescription: "Questions related to this article topic.",
    items: [
      { id: "faq-bs-1", question: "Can I share this article?", answer: "Yes! We encourage sharing our content. Use the social sharing buttons at the top of each article, or copy the URL to share directly.", category: "general" },
      { id: "faq-bs-2", question: "How can I get more information on this topic?", answer: "Contact our travel specialists for personalized advice related to any topic covered in our blog. We're happy to provide detailed information and tailor recommendations to your specific interests.", category: "general" },
    ],
  },
  {
    id: "faq-section-special-single",
    context: "special-single",
    sectionTitle: "Special offer FAQs",
    sectionDescription: "Everything you need to know about this offer.",
    items: [
      { id: "faq-ss-1", question: "How do I redeem this offer?", answer: "Click the 'Claim This Offer' button or contact our team directly. Quote the offer name or promo code when booking. Our specialists will confirm availability and apply the discount.", category: "general" },
      { id: "faq-ss-2", question: "Can this offer be combined with other promotions?", answer: "Special offers cannot typically be combined. However, our team may be able to suggest alternative value-adds. Contact us to discuss your options.", category: "general" },
    ],
  },
  {
    id: "faq-section-review-single",
    context: "review-single",
    sectionTitle: "Review FAQs",
    items: [
      { id: "faq-rs-1", question: "How are reviews verified?", answer: "All reviews come from guests who have booked and completed a trip through us. We verify each reviewer against our booking records before publication.", category: "general" },
      { id: "faq-rs-2", question: "Can I leave my own review?", answer: "Yes! After your trip you will receive an email invitation to share your experience. You can also submit reviews through your account dashboard at any time.", category: "general" },
    ],
  },
  {
    id: "faq-section-team-single",
    context: "team-single",
    sectionTitle: "Working with our specialists",
    items: [
      { id: "faq-tms-1", question: "How do I book with this specialist?", answer: "Simply click the 'Contact' button on their profile or call our office and request them by name. Our booking team will connect you directly.", category: "general" },
      { id: "faq-tms-2", question: "What if my preferred specialist is unavailable?", answer: "We have a talented team of specialists with overlapping expertise. If your preferred consultant is unavailable, we will recommend someone equally qualified for your destination and travel style.", category: "general" },
    ],
  },
];

/**
 * Helper: get page section FAQs by context key.
 * 
 * @param context - The page/template context (e.g., "home", "tours-archive")
 * @returns PageSectionFAQs or undefined
 */
export function getPageSectionFAQs(context: string): PageSectionFAQs | undefined {
  return PAGE_SECTION_FAQS.find((f) => f.context === context);
}
