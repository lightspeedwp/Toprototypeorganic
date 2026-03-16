/**
 * Mock data for Careers page.
 *
 * Job listings, company values, and employee benefits.
 *
 * @module data/careers
 * @category data
 */

export interface JobListing {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  level: "entry" | "mid" | "senior" | "lead";
  description: string;
  requirements: string[];
  posted: string;
  featured?: boolean;
}

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface EmployeeBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const DEPARTMENTS = [
  { id: "all", label: "All Departments" },
  { id: "operations", label: "Operations" },
  { id: "marketing", label: "Marketing" },
  { id: "conservation", label: "Conservation" },
  { id: "technology", label: "Technology" },
  { id: "guides", label: "Guides & Field" },
  { id: "admin", label: "Administration" },
];

export const COMPANY_VALUES: CompanyValue[] = [
  {
    id: "value-1",
    title: "Conservation First",
    description: "Every decision we make starts with its impact on wildlife and ecosystems. We measure success not just in bookings, but in acres protected.",
    icon: "Leaf",
  },
  {
    id: "value-2",
    title: "Community Empowerment",
    description: "We believe tourism should uplift local communities. Our partnerships create jobs, fund schools, and preserve cultural heritage.",
    icon: "Users",
  },
  {
    id: "value-3",
    title: "Authentic Experiences",
    description: "No cookie-cutter itineraries. We craft journeys that reveal the true spirit of each destination through local connections.",
    icon: "Compass",
  },
  {
    id: "value-4",
    title: "Continuous Learning",
    description: "Our team never stops growing. From guide certifications to leadership training, we invest in every person who joins us.",
    icon: "BookOpen",
  },
];

export const EMPLOYEE_BENEFITS: EmployeeBenefit[] = [
  {
    id: "benefit-1",
    title: "Travel Allowance",
    description: "Annual travel credit to experience our destinations firsthand and deepen your expertise.",
    icon: "Plane",
  },
  {
    id: "benefit-2",
    title: "Flexible Working",
    description: "Remote-first culture with flexible hours. Work from our Cape Town HQ, Nairobi office, or anywhere.",
    icon: "Home",
  },
  {
    id: "benefit-3",
    title: "Professional Development",
    description: "Funded certifications, conference attendance, and mentorship programmes for all team members.",
    icon: "GraduationCap",
  },
  {
    id: "benefit-4",
    title: "Conservation Days",
    description: "Paid volunteer days to participate in conservation and community projects across our network.",
    icon: "Heart",
  },
  {
    id: "benefit-5",
    title: "Health & Wellness",
    description: "Comprehensive medical aid, mental health support, and outdoor wellness programmes.",
    icon: "Shield",
  },
  {
    id: "benefit-6",
    title: "Team Retreats",
    description: "Annual team safari retreats at our partner lodges for connection and inspiration.",
    icon: "Mountain",
  },
];

export const JOB_LISTINGS: JobListing[] = [
  {
    id: "job-1",
    title: "Senior Safari Guide",
    slug: "senior-safari-guide",
    department: "guides",
    location: "Serengeti, Tanzania",
    type: "full-time",
    level: "senior",
    description: "Lead small-group safari experiences across the Serengeti ecosystem. You will interpret wildlife behaviour, manage guest safety, and contribute to our field research programmes.",
    requirements: [
      "FGASA Level 3 or equivalent qualification",
      "5+ years professional guiding experience",
      "Fluent in English and Swahili",
      "Advanced first aid certification",
      "Passion for conservation and education",
    ],
    posted: "2026-03-01",
    featured: true,
  },
  {
    id: "job-2",
    title: "Digital Marketing Manager",
    slug: "digital-marketing-manager",
    department: "marketing",
    location: "Cape Town, South Africa (Hybrid)",
    type: "full-time",
    level: "mid",
    description: "Drive our digital presence across social media, email marketing, and content strategy. You will manage campaigns that inspire travellers and communicate our conservation mission.",
    requirements: [
      "3+ years digital marketing experience in travel/hospitality",
      "Proficiency with analytics tools and marketing automation",
      "Strong copywriting and visual storytelling skills",
      "Experience with SEO and paid media campaigns",
    ],
    posted: "2026-02-20",
    featured: true,
  },
  {
    id: "job-3",
    title: "Conservation Programme Coordinator",
    slug: "conservation-programme-coordinator",
    department: "conservation",
    location: "Nairobi, Kenya",
    type: "full-time",
    level: "mid",
    description: "Coordinate our conservation partnerships across East Africa, manage grant applications, and report on impact metrics for our wildlife protection programmes.",
    requirements: [
      "Degree in Environmental Science, Conservation Biology, or related field",
      "2+ years experience in conservation programme management",
      "Grant writing and donor reporting experience",
      "Strong project management and communication skills",
    ],
    posted: "2026-03-05",
  },
  {
    id: "job-4",
    title: "Full-Stack Developer",
    slug: "full-stack-developer",
    department: "technology",
    location: "Remote",
    type: "full-time",
    level: "mid",
    description: "Build and maintain our booking platform, customer portal, and internal tools. Work with React, Node.js, and WordPress to create seamless digital experiences for travellers.",
    requirements: [
      "3+ years experience with React and TypeScript",
      "Backend experience with Node.js or Python",
      "Familiarity with WordPress and headless CMS patterns",
      "Understanding of accessibility standards (WCAG 2.1)",
    ],
    posted: "2026-03-10",
    featured: true,
  },
  {
    id: "job-5",
    title: "Guest Relations Officer",
    slug: "guest-relations-officer",
    department: "operations",
    location: "Cape Town, South Africa",
    type: "full-time",
    level: "entry",
    description: "Be the first point of contact for our travellers. Handle enquiries, coordinate bookings, and ensure every guest feels personally cared for from their first call to their return home.",
    requirements: [
      "Excellent communication skills in English",
      "Customer service experience (travel industry preferred)",
      "Proficiency with CRM and booking systems",
      "Attention to detail and problem-solving ability",
    ],
    posted: "2026-02-28",
  },
  {
    id: "job-6",
    title: "Photography & Content Creator",
    slug: "photography-content-creator",
    department: "marketing",
    location: "Field-based (Africa)",
    type: "contract",
    level: "mid",
    description: "Travel to our destinations and capture stunning photography and video content for our website, social media, and marketing materials. Document real guest experiences and conservation stories.",
    requirements: [
      "Professional photography portfolio (travel/wildlife preferred)",
      "Video production and editing skills",
      "Ability to travel extensively in remote locations",
      "Social media content creation experience",
    ],
    posted: "2026-03-08",
  },
];
