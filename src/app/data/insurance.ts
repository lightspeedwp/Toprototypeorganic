/**
 * Insurance Data
 * 
 * Mock data for travel insurance content.
 * 
 * @module insurance
 * @category data
 */

import type { InsuranceProvider, InsurancePlan, InsuranceScenario, InsuranceRequirement } from "./types";

/**
 * Insurance Providers
 * 
 * Recommended travel insurance providers for safari trips.
 * Used on TravelInsurancePage to display recommended insurance partners.
 * 
 * @constant {InsuranceProvider[]}
 */
export const INSURANCE_PROVIDERS: InsuranceProvider[] = [
  {
    id: "world-nomads",
    name: "World Nomads",
    logo: "WN",
    rating: 4.8,
    reviewCount: 12453,
    startingPrice: "$89",
    features: [
      "Adventure activities covered",
      "24/7 emergency assistance",
      "Flexible policies",
      "Buy/extend while traveling"
    ],
    url: "https://www.worldnomads.com",
    recommended: true
  },
  {
    id: "allianz",
    name: "Allianz Travel",
    logo: "AL",
    rating: 4.7,
    reviewCount: 8932,
    startingPrice: "$75",
    features: [
      "Comprehensive coverage",
      "Trip cancellation protection",
      "Medical emergency coverage",
      "24/7 hotline"
    ],
    url: "https://www.allianztravelinsurance.com",
    recommended: true
  },
  {
    id: "safety-wing",
    name: "SafetyWing",
    logo: "SW",
    rating: 4.6,
    reviewCount: 5621,
    startingPrice: "$45",
    features: [
      "Affordable monthly coverage",
      "Covers multiple countries",
      "Digital nomad friendly",
      "Easy online claims"
    ],
    url: "https://www.safetywing.com",
    recommended: false
  }
];

/**
 * Insurance Plans
 * 
 * Different coverage tiers for travel insurance.
 * Used on TravelInsurancePage for plan comparison.
 * 
 * @constant {InsurancePlan[]}
 */
export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: "basic",
    name: "Basic Coverage",
    price: "$45-75",
    coverage: {
      medical: "$50,000",
      evacuation: "$100,000",
      cancellation: "$1,000",
      baggage: "$500"
    },
    features: [
      "Essential medical coverage",
      "Emergency evacuation",
      "Basic trip cancellation",
      "Limited baggage protection"
    ],
    recommended: false
  },
  {
    id: "standard",
    name: "Standard Coverage",
    price: "$89-125",
    coverage: {
      medical: "$100,000",
      evacuation: "$250,000",
      cancellation: "$5,000",
      baggage: "$1,500"
    },
    features: [
      "Comprehensive medical coverage",
      "Full evacuation coverage",
      "Trip cancellation & interruption",
      "Baggage loss & delay",
      "Adventure activities included",
      "24/7 emergency assistance"
    ],
    recommended: true
  },
  {
    id: "premium",
    name: "Premium Coverage",
    price: "$150-200",
    coverage: {
      medical: "$250,000",
      evacuation: "$500,000",
      cancellation: "$10,000",
      baggage: "$3,000"
    },
    features: [
      "Maximum medical coverage",
      "Unlimited evacuation",
      "Cancel for any reason option",
      "Full baggage protection",
      "Pre-existing conditions covered",
      "Concierge services"
    ],
    recommended: false
  }
];

/**
 * Insurance Scenarios
 * 
 * Real-world examples of insurance coverage scenarios.
 * Used on TravelInsurancePage to demonstrate insurance value.
 * 
 * @constant {InsuranceScenario[]}
 */
export const INSURANCE_SCENARIOS: InsuranceScenario[] = [
  {
    id: "scenario-1",
    title: "Medical Emergency in Kenya",
    description: "You fall ill with malaria during your safari and require hospitalization in Nairobi.",
    cost: "$8,500",
    covered: true,
    details: "Standard coverage includes medical treatment, hospitalization, and necessary medications."
  },
  {
    id: "scenario-2",
    title: "Medical Evacuation from Botswana",
    description: "You suffer a severe injury in a remote safari camp and need evacuation to South Africa.",
    cost: "$45,000",
    covered: true,
    details: "Premium evacuation coverage includes air ambulance to nearest adequate medical facility."
  },
  {
    id: "scenario-3",
    title: "Trip Cancellation Due to Illness",
    description: "You become ill before departure and must cancel your $12,000 safari booking.",
    cost: "$12,000",
    covered: true,
    details: "Trip cancellation coverage reimburses non-refundable expenses for covered reasons."
  },
  {
    id: "scenario-4",
    title: "Lost Luggage in Transit",
    description: "Your checked baggage with safari equipment is lost by the airline.",
    cost: "$2,500",
    covered: true,
    details: "Baggage coverage reimburses up to policy limit for lost items and emergency purchases."
  }
];

/**
 * Insurance Requirements
 * 
 * Destination-specific insurance requirements.
 * Used on TravelInsurancePage to inform travelers of insurance needs.
 * 
 * @constant {InsuranceRequirement[]}
 */
export const INSURANCE_REQUIREMENTS: InsuranceRequirement[] = [
  {
    id: "req-kenya-tanzania",
    destination: "Kenya & Tanzania",
    mandatory: false,
    description: "Not legally required, but strongly recommended. Medical evacuation from remote parks can cost $30,000-50,000. Ensure coverage includes safari activities.",
    recommendedCoverage: ["Medical", "Evacuation", "Safari Activities"]
  },
  {
    id: "req-south-africa",
    destination: "South Africa",
    mandatory: false,
    description: "Not mandatory. However, private medical care is recommended and can be expensive. Insurance should cover medical treatment and evacuation.",
    recommendedCoverage: ["Medical", "Evacuation"]
  },
  {
    id: "req-rwanda-uganda",
    destination: "Rwanda & Uganda (Gorilla Trekking)",
    mandatory: false,
    description: "Highly recommended due to remote locations and strenuous activities. Ensure coverage includes trekking and adventure activities.",
    recommendedCoverage: ["Medical", "Evacuation", "Adventure Activities"]
  },
  {
    id: "req-botswana-namibia",
    destination: "Botswana & Namibia",
    mandatory: false,
    description: "Not required but essential. Remote safari camps are hours from medical facilities. Comprehensive evacuation coverage is critical.",
    recommendedCoverage: ["Medical", "Evacuation", "Remote Area Coverage"]
  }
];
