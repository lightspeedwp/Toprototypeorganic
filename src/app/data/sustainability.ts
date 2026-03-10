/**
 * Sustainability & Conservation Data
 * 
 * Centralized content for the Sustainability & Conservation page.
 * Strictly adheres to the content model for the Tour Operator plugin.
 */

import { Compass, Shield, Users, Heart, Leaf, Globe } from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

export interface ConservationProject {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "Wildlife" | "Community" | "Environment";
  impact: string;
  iconName: string;
}

export interface SustainabilityCommitment {
  title: string;
  description: string;
  iconName: string;
}

export const CONSERVATION_PROJECTS: ConservationProject[] = [
  {
    id: "project-1",
    title: "Lion Recovery Fund",
    description: "Supporting the protection of lions across Africa's key landscapes through anti-poaching and habitat restoration.",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800",
    category: "Wildlife",
    impact: "Protected 1,200 lions across 4 countries",
    iconName: "Shield"
  },
  {
    id: "project-2",
    title: "Rhino Guardians",
    description: "Funding elite tracking units to protect endangered black and white rhinos from poachers in private conservancies.",
    image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800",
    category: "Wildlife",
    impact: "Zero poaching incidents in our partner conservancies for 3 years",
    iconName: "Compass"
  },
  {
    id: "project-3",
    title: "Community Education",
    description: "Building schools and providing scholarships for children living near wildlife reserves to foster long-term stewardship.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800",
    category: "Community",
    impact: "12 schools built and 450 scholarships awarded",
    iconName: "Users"
  },
  {
    id: "project-4",
    title: "Reforestation Initiative",
    description: "Restoring indigenous forests in the Eastern Rift Valley to combat soil erosion and provide carbon sinks.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    category: "Environment",
    impact: "150,000 indigenous trees planted and counting",
    iconName: "Leaf"
  }
];

export const SUSTAINABILITY_COMMITMENTS: SustainabilityCommitment[] = [
  {
    title: "Plastic-Free Safaris",
    description: "We've eliminated single-use plastics from all our tours, providing guests with reusable stainless steel bottles and filtered water.",
    iconName: "Leaf"
  },
  {
    title: "Carbon Offsetting",
    description: "Every flight and land transfer is carbon-offset through verified gold-standard projects across the continent.",
    iconName: "Globe"
  },
  {
    title: "Ethical Wildlife Encounters",
    description: "Strict adherence to wildlife viewing protocols ensures no disruption to natural animal behaviors.",
    iconName: "Heart"
  }
];

export const SUSTAINABILITY_HERO = {
  title: "Safeguarding Africa's Future",
  description: "Our commitment to conservation, community empowerment, and sustainable travel practices.",
  image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600"
};
