/**
 * Mock Data Explorer — Developer Tool
 *
 * Browse all mock data files with record counts, field schemas,
 * and sample data previews. Helps developers understand the shape
 * and scope of the content model.
 *
 * @module MockDataExplorer
 * @category dev-tools
 */

import { useState, useMemo } from "react";
import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import {
  Database,
  Table,
  MagnifyingGlass,
  Compass,
  MapTrifold,
  Bed,
  Article,
  Users,
  Star,
  ChatCircle,
  Question,
  Tag,
  Camera,
  Handshake,
  Briefcase,
  ShieldCheck,
  CalendarBlank,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/*  Data model definitions                                             */
/* ------------------------------------------------------------------ */

interface DataCollection {
  id: string;
  name: string;
  icon: React.ReactNode;
  file: string;
  count: number;
  description: string;
  fields: string[];
  sampleData: Record<string, string | number>[];
}

const DATA_COLLECTIONS: DataCollection[] = [
  {
    id: "tours",
    name: "Tours",
    icon: <Compass className="w-5 h-5" />,
    file: "/src/app/data/tours.ts",
    count: 61,
    description: "Safari tour packages across three continents with itineraries, pricing, and travel styles.",
    fields: ["id", "slug", "title", "subtitle", "description", "duration", "price", "continent", "country", "travelStyle", "highlights"],
    sampleData: [
      { title: "Serengeti Migration Safari", duration: "8 days", price: "$4,250", continent: "Africa" },
      { title: "Okavango Delta Explorer", duration: "6 days", price: "$3,800", continent: "Africa" },
      { title: "Borneo Rainforest Trek", duration: "10 days", price: "$5,100", continent: "Asia" },
    ],
  },
  {
    id: "destinations",
    name: "Destinations",
    icon: <MapTrifold className="w-5 h-5" />,
    file: "/src/app/data/destinations/",
    count: 87,
    description: "Hierarchical destination taxonomy — continents, regions, countries, and points of interest.",
    fields: ["id", "slug", "name", "type", "parent", "continent", "description", "highlights", "bestTimeToVisit"],
    sampleData: [
      { name: "Serengeti National Park", type: "region", continent: "Africa" },
      { name: "Kruger National Park", type: "region", continent: "Africa" },
      { name: "Galápagos Islands", type: "region", continent: "South America" },
    ],
  },
  {
    id: "accommodation",
    name: "Accommodation",
    icon: <Bed className="w-5 h-5" />,
    file: "/src/app/data/accommodation.ts",
    count: 50,
    description: "Lodges, camps, and hotels with facilities, pricing tiers, and location data.",
    fields: ["id", "slug", "name", "type", "destination", "priceRange", "rating", "facilities", "description"],
    sampleData: [
      { name: "Singita Grumeti", type: "Luxury Lodge", priceRange: "$$$$", rating: 4.9 },
      { name: "Ngorongoro Serena", type: "Safari Lodge", priceRange: "$$$", rating: 4.5 },
      { name: "Sanctuary Retreats", type: "Eco Camp", priceRange: "$$$", rating: 4.7 },
    ],
  },
  {
    id: "reviews",
    name: "Reviews",
    icon: <ChatCircle className="w-5 h-5" />,
    file: "/src/app/data/reviews.ts",
    count: 41,
    description: "Guest reviews with ratings, tour references, and traveller profiles.",
    fields: ["id", "slug", "author", "rating", "title", "content", "tourSlug", "date", "avatar"],
    sampleData: [
      { author: "Sarah M.", rating: 5, title: "Life-changing experience", tourSlug: "serengeti-migration" },
      { author: "James K.", rating: 4, title: "Incredible wildlife", tourSlug: "okavango-explorer" },
      { author: "Lisa W.", rating: 5, title: "Beyond expectations", tourSlug: "kruger-classic" },
    ],
  },
  {
    id: "team",
    name: "Team Members",
    icon: <Users className="w-5 h-5" />,
    file: "/src/app/data/team.ts",
    count: 18,
    description: "Staff profiles with roles, expertise areas, and biographical information.",
    fields: ["id", "slug", "name", "role", "department", "bio", "expertise", "image", "social"],
    sampleData: [
      { name: "David Livingstone", role: "Head Guide", department: "Operations" },
      { name: "Amara Okafor", role: "Travel Consultant", department: "Sales" },
      { name: "Kim Tanaka", role: "Marketing Manager", department: "Marketing" },
    ],
  },
  {
    id: "blog",
    name: "Blog Posts",
    icon: <Article className="w-5 h-5" />,
    file: "/src/app/data/blog.ts",
    count: 44,
    description: "Editorial content including travel guides, tips, and destination features.",
    fields: ["id", "slug", "title", "excerpt", "content", "author", "date", "category", "tags", "image"],
    sampleData: [
      { title: "Top 10 Safari Tips for First-Timers", category: "Tips", author: "David Livingstone" },
      { title: "The Great Migration Explained", category: "Wildlife", author: "Amara Okafor" },
      { title: "Packing Guide: What to Bring on Safari", category: "Guides", author: "Kim Tanaka" },
    ],
  },
  {
    id: "specials",
    name: "Specials & Offers",
    icon: <Star className="w-5 h-5" />,
    file: "/src/app/data/specials.ts",
    count: 12,
    description: "Promotional offers, seasonal deals, and limited-time tour packages.",
    fields: ["id", "slug", "title", "description", "discount", "validFrom", "validTo", "tourSlugs", "terms"],
    sampleData: [
      { title: "Early Bird Migration Special", discount: "15%", validTo: "2026-06-30" },
      { title: "Family Safari Bundle", discount: "20%", validTo: "2026-12-31" },
      { title: "Honeymoon Package", discount: "10%", validTo: "2026-09-30" },
    ],
  },
  {
    id: "faqs",
    name: "FAQs",
    icon: <Question className="w-5 h-5" />,
    file: "/src/app/data/faqs.ts",
    count: 91,
    description: "Frequently asked questions across 14 categories with structured answers.",
    fields: ["id", "question", "answer", "category", "relatedTours", "order"],
    sampleData: [
      { question: "What vaccinations do I need?", category: "Health & Safety" },
      { question: "When is the best time to visit?", category: "Planning" },
      { question: "What is included in the price?", category: "Booking" },
    ],
  },
  {
    id: "gallery",
    name: "Gallery",
    icon: <Camera className="w-5 h-5" />,
    file: "/src/app/data/gallery.ts",
    count: 40,
    description: "High-quality images organized by destination and wildlife category.",
    fields: ["id", "src", "alt", "caption", "category", "destination", "photographer"],
    sampleData: [
      { alt: "Elephant at sunset", category: "Wildlife", destination: "Serengeti" },
      { alt: "Victoria Falls aerial", category: "Landscape", destination: "Zimbabwe" },
      { alt: "Local market scene", category: "Culture", destination: "Zanzibar" },
    ],
  },
  {
    id: "partners",
    name: "Partners",
    icon: <Handshake className="w-5 h-5" />,
    file: "/src/app/data/partners.ts",
    count: 12,
    description: "Travel industry partners, conservation organizations, and affiliate brands.",
    fields: ["id", "name", "logo", "description", "url", "category"],
    sampleData: [
      { name: "World Wildlife Fund", category: "Conservation" },
      { name: "African Parks Network", category: "Conservation" },
      { name: "Travel Africa Magazine", category: "Media" },
    ],
  },
  {
    id: "careers",
    name: "Careers",
    icon: <Briefcase className="w-5 h-5" />,
    file: "/src/app/data/careers.ts",
    count: 8,
    description: "Open positions with requirements, benefits, and application details.",
    fields: ["id", "title", "department", "location", "type", "description", "requirements", "benefits"],
    sampleData: [
      { title: "Senior Safari Guide", department: "Operations", location: "Tanzania" },
      { title: "Digital Marketing Specialist", department: "Marketing", location: "Cape Town" },
      { title: "Booking Consultant", department: "Sales", location: "Remote" },
    ],
  },
  {
    id: "taxonomies",
    name: "Taxonomies",
    icon: <Tag className="w-5 h-5" />,
    file: "/src/app/data/taxonomies/",
    count: 35,
    description: "Travel styles, accommodation types, continents, brands, and facilities taxonomies.",
    fields: ["id", "slug", "name", "type", "description", "count", "parent"],
    sampleData: [
      { name: "Adventure", type: "travel-style", count: 18 },
      { name: "Luxury Lodge", type: "accommodation-type", count: 12 },
      { name: "Africa", type: "continent", count: 45 },
    ],
  },
  {
    id: "insurance",
    name: "Travel Insurance",
    icon: <ShieldCheck className="w-5 h-5" />,
    file: "/src/app/data/insurance.ts",
    count: 4,
    description: "Travel insurance plan tiers with coverage details and pricing.",
    fields: ["id", "name", "price", "coverage", "benefits", "exclusions"],
    sampleData: [
      { name: "Basic Cover", price: "$45", coverage: "Medical only" },
      { name: "Comprehensive", price: "$120", coverage: "Full cover + cancellation" },
    ],
  },
  {
    id: "testimonials",
    name: "Testimonials",
    icon: <CalendarBlank className="w-5 h-5" />,
    file: "/src/app/data/testimonials.ts",
    count: 15,
    description: "Featured customer testimonials for marketing and social proof sections.",
    fields: ["id", "quote", "author", "location", "rating", "tour", "image"],
    sampleData: [
      { author: "The Hendersons", location: "London, UK", rating: 5 },
      { author: "Maria Garcia", location: "Madrid, Spain", rating: 5 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function MockDataExplorer() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const totalRecords = useMemo(
    () => DATA_COLLECTIONS.reduce((s, c) => s + c.count, 0),
    [],
  );

  const filtered = useMemo(() => {
    if (!search) return DATA_COLLECTIONS;
    const q = search.toLowerCase();
    return DATA_COLLECTIONS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.fields.some((f) => f.toLowerCase().includes(q)),
    );
  }, [search]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <DevToolsBreadcrumbs currentPage="Mock Data Explorer" />

      {/* Hero */}
      <section className="wp-devtool__hero">
        <Container>
          <div className="wp-devtool__hero-inner">
            <div className="wp-devtool__hero-badge">
              <Database className="w-4 h-4" />
              Mock Data Explorer
            </div>
            <h1>Mock Data Explorer</h1>
            <p className="wp-devtool__hero-description">
              Browse all {DATA_COLLECTIONS.length} data collections containing {totalRecords}+ records.
              Inspect field schemas, preview sample data, and understand the content model.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats + search */}
      <section className="wp-devtool__section">
        <Container>
          <div className="wp-devtool__stats">
            <div className="wp-devtool__stat-card">
              <span className="wp-devtool__stat-value">{totalRecords}+</span>
              <span className="wp-devtool__stat-label">Total Records</span>
            </div>
            <div className="wp-devtool__stat-card">
              <span className="wp-devtool__stat-value">{DATA_COLLECTIONS.length}</span>
              <span className="wp-devtool__stat-label">Collections</span>
            </div>
            <div className="wp-devtool__stat-card">
              <span className="wp-devtool__stat-value">14</span>
              <span className="wp-devtool__stat-label">FAQ Categories</span>
            </div>
            <div className="wp-devtool__stat-card">
              <span className="wp-devtool__stat-value">3</span>
              <span className="wp-devtool__stat-label">Continents</span>
            </div>
          </div>

          {/* Search */}
          <label className="wp-devtool__grid-toggle" style={{ maxWidth: "24rem" }}>
            <MagnifyingGlass className="w-4 h-4" style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search collections or fields…"
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                fontFamily: "var(--font-family-noto-sans)",
                fontSize: "var(--text-sm)",
                color: "var(--foreground)",
                width: "100%",
              }}
              aria-label="Search data collections"
            />
          </label>
        </Container>
      </section>

      {/* Data cards */}
      <section className="wp-devtool__section wp-devtool__section--alt">
        <Container>
          <div className="wp-devtool__data-grid">
            {filtered.map((collection) => (
              <div key={collection.id} className="wp-devtool__data-card">
                <div className="wp-devtool__data-card-header">
                  <div className="wp-devtool__data-card-icon">{collection.icon}</div>
                  <span className="wp-devtool__data-card-count">{collection.count}</span>
                </div>
                <div className="wp-devtool__data-card-title">{collection.name}</div>
                <div className="wp-devtool__data-card-file">{collection.file}</div>
                <p style={{ color: "var(--muted-foreground)", fontSize: "var(--text-sm)", paddingBottom: "var(--spacing-element-sm)" }}>
                  {collection.description}
                </p>
                <div className="wp-devtool__data-fields">
                  {collection.fields.map((field) => (
                    <span key={field} className="wp-devtool__data-field-tag">{field}</span>
                  ))}
                </div>

                {/* Expand for sample data */}
                <button
                  className="wp-devtool__tab"
                  onClick={() => toggleExpand(collection.id)}
                  style={{ alignSelf: "flex-start", marginTop: "var(--spacing-element-sm)" }}
                  aria-expanded={expandedId === collection.id}
                  aria-label={`${expandedId === collection.id ? "Hide" : "Show"} sample data for ${collection.name}`}
                >
                  <Table className="w-4 h-4" />
                  {expandedId === collection.id ? "Hide" : "Preview"} Sample
                </button>

                {expandedId === collection.id && collection.sampleData.length > 0 && (
                  <div style={{ paddingTop: "var(--spacing-element-sm)", overflow: "auto" }}>
                    <table className="wp-devtool__preview-table">
                      <thead>
                        <tr>
                          {Object.keys(collection.sampleData[0]).map((key) => (
                            <th key={key}>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {collection.sampleData.map((row, idx) => (
                          <tr key={idx}>
                            {Object.values(row).map((val, i) => (
                              <td key={i} style={{ fontFamily: "var(--font-family-mono)", fontSize: "var(--text-xs)" }}>
                                {String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
