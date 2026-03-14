/**
 * Component API Reference
 * 
 * Comprehensive documentation for all pattern components, blocks, and cards.
 * Includes prop tables, usage examples, WordPress equivalents, and accessibility notes.
 * 
 * **Features:**
 * - Searchable component directory
 * - Detailed prop documentation with types
 * - Live code examples
 * - WordPress block mapping
 * - Accessibility requirements
 * - Design system tokens used
 * 
 * **Design System:**
 * All components documented here use CSS variables from theme.css.
 * Typography follows Lora (headings) and Noto Sans (body text).
 * 
 * @module ComponentAPIReference
 * @category pages
 */

import { useState } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/common/Container";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { DevToolsBreadcrumbs } from "../components/common/DevToolsBreadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/blocks/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/blocks/ui/tabs";
import { Input } from "../components/blocks/ui/input";
import { Badge } from "../components/blocks/ui/badge";
import { Button } from "../components/blocks/design/Button";
import { Separator } from "../components/blocks/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/blocks/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/blocks/ui/table";
import { MagnifyingGlass as Search, Package, Layers, GridNine as Grid3x3, FileCode } from "@phosphor-icons/react";

/**
 * Component documentation structure
 */
interface ComponentDoc {
  id: string;
  name: string;
  category: "Pattern" | "Block" | "Card" | "Part" | "Common";
  description: string;
  wpEquivalent: string;
  importPath: string;
  props: PropDoc[];
  examples: ExampleDoc[];
  accessibility: string[];
  designTokens: string[];
  relatedComponents: string[];
}

/**
 * Prop documentation
 */
interface PropDoc {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
}

/**
 * Usage example
 */
interface ExampleDoc {
  title: string;
  code: string;
  description: string;
}

/**
 * Complete component documentation database
 */
const COMPONENT_DOCS: ComponentDoc[] = [
  {
    id: "hero",
    name: "Hero",
    category: "Pattern",
    description: "Large introductory banner with heading, description, and optional CTA buttons. Used at the top of landing pages and major sections.",
    wpEquivalent: "Cover block + Group block pattern",
    importPath: "import { Hero } from '../components/patterns/Hero';",
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Main heading text, typically H1"
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Supporting text below the title"
      },
      {
        name: "primaryButtonText",
        type: "string",
        required: false,
        description: "Text for primary CTA button"
      },
      {
        name: "secondaryButtonText",
        type: "string",
        required: false,
        description: "Text for secondary CTA button"
      },
      {
        name: "backgroundImage",
        type: "string",
        required: false,
        description: "URL to background image"
      },
      {
        name: "height",
        type: "'small' | 'medium' | 'large'",
        required: false,
        defaultValue: "medium",
        description: "Hero section height"
      },
    ],
    examples: [
      {
        title: "Basic Hero",
        code: `<Hero 
  title="Discover Amazing Adventures"
  description="Explore the world with curated tours"
/>`,
        description: "Simple hero with title and description only"
      },
      {
        title: "Hero with CTAs",
        code: `<Hero 
  title="Ready to Explore?"
  description="Join thousands of travelers"
  primaryButtonText="Browse Tours"
  secondaryButtonText="Learn More"
/>`,
        description: "Hero with primary and secondary action buttons"
      },
    ],
    accessibility: [
      "Heading hierarchy maintained (H1 for title)",
      "Buttons have sufficient color contrast",
      "Focus states visible on all interactive elements",
      "Keyboard navigable buttons",
    ],
    designTokens: [
      "var(--background)",
      "var(--foreground)",
      "var(--primary)",
      "var(--primary-foreground)",
      "var(--text-4xl) - title size",
      "var(--font-family-lora) - title font",
    ],
    relatedComponents: ["ArchiveHeader", "CTA"],
  },
  {
    id: "archive-header",
    name: "ArchiveHeader",
    category: "Pattern",
    description: "Page header for archive and listing pages. Displays title, optional description, and item count.",
    wpEquivalent: "Query Title + Query Pagination (count) + Group pattern",
    importPath: "import { ArchiveHeader } from '../components/patterns/ArchiveHeader';",
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Page heading, typically archive name"
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Optional description text"
      },
      {
        name: "count",
        type: "number",
        required: false,
        description: "Number of items in archive"
      },
    ],
    examples: [
      {
        title: "Simple Archive Header",
        code: `<ArchiveHeader 
  title="All Tours"
  count={42}
/>`,
        description: "Basic archive header with title and count"
      },
      {
        title: "Archive Header with Description",
        code: `<ArchiveHeader 
  title="Adventure Tours"
  description="Explore thrilling experiences"
  count={18}
/>`,
        description: "Archive header with all props"
      },
    ],
    accessibility: [
      "Proper heading hierarchy (H1)",
      "Count announced by screen readers",
      "Semantic HTML structure",
    ],
    designTokens: [
      "var(--text-4xl) - title",
      "var(--text-base) - description",
      "var(--muted-foreground) - count",
    ],
    relatedComponents: ["Hero", "TaxonomyNav"],
  },
  {
    id: "card-grid",
    name: "CardGrid",
    category: "Pattern",
    description: "Responsive grid container for displaying card components. Automatically adjusts columns based on viewport.",
    wpEquivalent: "Query Loop block with Grid layout",
    importPath: "import { CardGrid } from '../components/patterns/CardGrid';",
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        required: true,
        description: "Card components to display in grid"
      },
      {
        name: "columns",
        type: "number",
        required: false,
        defaultValue: "3",
        description: "Number of columns on desktop"
      },
      {
        name: "gap",
        type: "number",
        required: false,
        defaultValue: "6",
        description: "Gap between cards in Tailwind spacing units"
      },
    ],
    examples: [
      {
        title: "Tour Cards Grid",
        code: `<CardGrid columns={3} gap={6}>
  {tours.map(tour => (
    <TourCard key={tour.id} tour={tour} />
  ))}
</CardGrid>`,
        description: "3-column grid of tour cards"
      },
      {
        title: "Destination Cards Grid",
        code: `<CardGrid columns={4} gap={8}>
  {destinations.map(dest => (
    <DestinationCard key={dest.id} destination={dest} />
  ))}
</CardGrid>`,
        description: "4-column grid with larger gaps"
      },
    ],
    accessibility: [
      "Semantic list structure",
      "Proper card ordering",
      "Keyboard navigable cards",
    ],
    designTokens: [
      "Tailwind gap utilities",
      "Responsive grid columns",
    ],
    relatedComponents: ["TourCard", "DestinationCard", "BlogCard"],
  },
  {
    id: "cta",
    name: "CTA",
    category: "Pattern",
    description: "Call-to-action section with heading, description, and prominent button. Used to drive user actions.",
    wpEquivalent: "Group block + Buttons block pattern",
    importPath: "import { CTA } from '../components/patterns/CTA';",
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "CTA heading"
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Supporting text"
      },
      {
        name: "buttonText",
        type: "string",
        required: true,
        description: "Button label"
      },
      {
        name: "variant",
        type: "'default' | 'centered' | 'compact'",
        required: false,
        defaultValue: "default",
        description: "Visual style variant"
      },
      {
        name: "onButtonClick",
        type: "() => void",
        required: false,
        description: "Button click handler"
      },
    ],
    examples: [
      {
        title: "Basic CTA",
        code: `<CTA 
  title="Ready to Start?"
  buttonText="Get Started"
/>`,
        description: "Simple CTA with title and button"
      },
      {
        title: "Centered CTA",
        code: `<CTA 
  title="Join Our Community"
  description="Connect with fellow travelers"
  buttonText="Sign Up Now"
  variant="centered"
/>`,
        description: "Centered CTA with description"
      },
    ],
    accessibility: [
      "Clear call-to-action button",
      "Sufficient contrast ratios",
      "Keyboard accessible",
      "Screen reader friendly",
    ],
    designTokens: [
      "var(--primary) - button background",
      "var(--primary-foreground) - button text",
      "var(--text-2xl) - title size",
    ],
    relatedComponents: ["Hero", "EditorialContent"],
  },
  {
    id: "faq",
    name: "FAQ",
    category: "Pattern",
    description: "Accordion-style frequently asked questions. Each item expands/collapses to show answer.",
    wpEquivalent: "Details block (WordPress 6.4+) or custom accordion",
    importPath: "import { FAQ } from '../components/patterns/FAQ';",
    props: [
      {
        name: "title",
        type: "string",
        required: false,
        description: "Section heading"
      },
      {
        name: "items",
        type: "Array<{ question: string; answer: string }>",
        required: true,
        description: "FAQ items with questions and answers"
      },
    ],
    examples: [
      {
        title: "FAQ Section",
        code: `<FAQ 
  title="Frequently Asked Questions"
  items={[
    {
      question: "How do I book a tour?",
      answer: "You can book directly on our website..."
    },
    {
      question: "What's your cancellation policy?",
      answer: "We offer full refunds..."
    }
  ]}
/>`,
        description: "FAQ section with title and items"
      },
    ],
    accessibility: [
      "ARIA expanded states",
      "Keyboard navigation (Tab, Enter, Space)",
      "Screen reader announcements",
      "Focus management",
    ],
    designTokens: [
      "var(--card) - accordion background",
      "var(--border) - dividers",
      "var(--text-xl) - question text",
    ],
    relatedComponents: ["EditorialContent"],
  },
  {
    id: "editorial-content",
    name: "EditorialContent",
    category: "Pattern",
    description: "Rich text content block with optional heading. Supports formatted paragraphs and basic HTML.",
    wpEquivalent: "Group block with Heading + Paragraph blocks",
    importPath: "import { EditorialContent } from '../components/patterns/EditorialContent';",
    props: [
      {
        name: "title",
        type: "string",
        required: false,
        description: "Optional section heading"
      },
      {
        name: "content",
        type: "string",
        required: true,
        description: "HTML content string"
      },
      {
        name: "maxWidth",
        type: "'narrow' | 'medium' | 'wide'",
        required: false,
        defaultValue: "medium",
        description: "Content width constraint"
      },
    ],
    examples: [
      {
        title: "Editorial Content",
        code: `<EditorialContent 
  title="About This Experience"
  content="<p>Join us for an unforgettable adventure...</p>"
/>`,
        description: "Content block with heading"
      },
    ],
    accessibility: [
      "Semantic HTML structure",
      "Proper heading hierarchy",
      "Readable line length (maxWidth)",
      "Sufficient line spacing",
    ],
    designTokens: [
      "var(--text-base) - body text",
      "var(--text-xl) - heading",
      "var(--font-family-noto-sans) - body font",
    ],
    relatedComponents: ["FAQ", "CTA"],
  },
  {
    id: "taxonomy-nav",
    name: "TaxonomyNav",
    category: "Block",
    description: "Horizontal navigation for filtering by taxonomy terms (categories, tags, travel styles).",
    wpEquivalent: "Navigation block with term links",
    importPath: "import { TaxonomyNav } from '../components/patterns/TaxonomyNav';",
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "Label text before links"
      },
      {
        name: "items",
        type: "Array<{ slug: string; name: string }>",
        required: true,
        description: "Taxonomy terms to display"
      },
      {
        name: "activeSlug",
        type: "string",
        required: false,
        description: "Currently active term slug"
      },
    ],
    examples: [
      {
        title: "Travel Style Filter",
        code: `<TaxonomyNav 
  label="Filter by:"
  items={travelStyles}
  activeSlug="adventure"
/>`,
        description: "Navigation for filtering travel styles"
      },
    ],
    accessibility: [
      "Semantic nav element",
      "ARIA current for active item",
      "Keyboard navigable links",
      "Clear focus indicators",
    ],
    designTokens: [
      "var(--foreground) - link text",
      "var(--primary) - active state",
      "var(--border) - separators",
    ],
    relatedComponents: ["ArchiveHeader", "CardGrid"],
  },
  {
    id: "related-content",
    name: "RelatedContent",
    category: "Pattern",
    description: "Section displaying related posts, tours, or destinations with heading and grid layout.",
    wpEquivalent: "Related Posts block or Query Loop with custom query",
    importPath: "import { RelatedContent } from '../components/patterns/RelatedContent';",
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "Section heading"
      },
      {
        name: "items",
        type: "Array<Tour | Destination | BlogPost>",
        required: true,
        description: "Related content items"
      },
      {
        name: "type",
        type: "'tours' | 'destinations' | 'posts'",
        required: true,
        description: "Type of content being displayed"
      },
    ],
    examples: [
      {
        title: "Related Tours",
        code: `<RelatedContent 
  title="You May Also Like"
  items={relatedTours}
  type="tours"
/>`,
        description: "Display related tour items"
      },
    ],
    accessibility: [
      "Semantic section element",
      "Proper heading hierarchy",
      "Keyboard navigable cards",
    ],
    designTokens: [
      "var(--text-2xl) - title",
      "Card component tokens",
    ],
    relatedComponents: ["CardGrid", "TourCard"],
  },
  {
    id: "tour-card",
    name: "TourCard",
    category: "Card",
    description: "Individual tour card displaying image, title, price, duration, and link to detail page.",
    wpEquivalent: "Custom block or pattern for tour post type",
    importPath: "import { TourCard } from '../components/patterns/TourCard';",
    props: [
      {
        name: "tour",
        type: "Tour",
        required: true,
        description: "Tour data object"
      },
    ],
    examples: [
      {
        title: "Tour Card",
        code: `<TourCard tour={tourData} />`,
        description: "Display a single tour card"
      },
    ],
    accessibility: [
      "Semantic article element",
      "Image alt text",
      "Clickable card area",
      "Price announced clearly",
    ],
    designTokens: [
      "var(--card) - background",
      "var(--border) - card border",
      "var(--radius-lg) - corners",
    ],
    relatedComponents: ["CardGrid", "DestinationCard"],
  },
  {
    id: "destination-card",
    name: "DestinationCard",
    category: "Card",
    description: "Individual destination card with image, title, description, and link.",
    wpEquivalent: "Custom block or pattern for destination post type",
    importPath: "import { DestinationCard } from '../components/patterns/DestinationCard';",
    props: [
      {
        name: "destination",
        type: "Destination",
        required: true,
        description: "Destination data object"
      },
    ],
    examples: [
      {
        title: "Destination Card",
        code: `<DestinationCard destination={destData} />`,
        description: "Display a single destination card"
      },
    ],
    accessibility: [
      "Semantic article element",
      "Image alt text",
      "Clickable card area",
      "Clear heading hierarchy",
    ],
    designTokens: [
      "var(--card) - background",
      "var(--border) - card border",
      "var(--radius-lg) - corners",
    ],
    relatedComponents: ["CardGrid", "TourCard"],
  },
  {
    id: "blog-card",
    name: "BlogCard",
    category: "Card",
    description: "Individual blog post card with featured image, title, excerpt, date, and author.",
    wpEquivalent: "Post Template within Query Loop",
    importPath: "import { BlogCard } from '../components/patterns/BlogCard';",
    props: [
      {
        name: "post",
        type: "BlogPost",
        required: true,
        description: "Blog post data object"
      },
    ],
    examples: [
      {
        title: "Blog Post Card",
        code: `<BlogCard post={postData} />`,
        description: "Display a single blog post card"
      },
    ],
    accessibility: [
      "Semantic article element",
      "Time element for date",
      "Image alt text",
      "Author information",
    ],
    designTokens: [
      "var(--card) - background",
      "var(--muted-foreground) - metadata",
      "var(--radius-lg) - corners",
    ],
    relatedComponents: ["CardGrid", "TourCard"],
  },
  {
    id: "fast-facts",
    name: "FastFacts",
    category: "Pattern",
    description: "Quick facts sidebar or section displaying key metadata (duration, price, dates, etc.).",
    wpEquivalent: "Group block with custom meta fields",
    importPath: "import { FastFacts } from '../components/patterns/FastFacts';",
    props: [
      {
        name: "facts",
        type: "Array<{ label: string; value: string; icon?: string }>",
        required: true,
        description: "Array of fact items to display"
      },
      {
        name: "title",
        type: "string",
        required: false,
        defaultValue: "Quick Facts",
        description: "Section heading"
      },
    ],
    examples: [
      {
        title: "Tour Fast Facts",
        code: `<FastFacts 
  title="Tour Details"
  facts={[
    { label: "Duration", value: "7 days" },
    { label: "Price", value: "$2,499" },
    { label: "Group Size", value: "12-16 people" }
  ]}
/>`,
        description: "Display key tour information"
      },
    ],
    accessibility: [
      "Definition list structure",
      "Clear label/value pairs",
      "Icon decorative or with alt",
    ],
    designTokens: [
      "var(--card) - background",
      "var(--muted-foreground) - labels",
    ],
    relatedComponents: ["EditorialContent"],
  },
];

/**
 * Component API Reference Page
 */
export default function ComponentAPIReference() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  /**
   * Filter components based on search and category
   */
  const filteredComponents = COMPONENT_DOCS.filter(component => {
    const matchesSearch = 
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "all" || 
      component.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  /**
   * Get unique categories
   */
  const categories = ["all", ...Array.from(new Set(COMPONENT_DOCS.map(c => c.category)))];

  return (
    <PageLayout>
      <DevToolsBreadcrumbs currentPage="Component API Reference" />
      <div className="min-h-screen bg-background">
        {/* Page Header */}
        <div className="border-b bg-card">
          <Container>
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Developer Tools', href: '/dev-tools' },
                { label: 'Component API', isCurrent: true }
              ]}
            />
            
            <div className="py-8">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="pb-2">Component API Reference</h1>
                  <p className="text-muted-foreground">
                    Complete documentation for all pattern components
                  </p>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {COMPONENT_DOCS.length} Components
                </Badge>
              </div>

              {/* Search and Filter */}
              <div className="pt-6 flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search components..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <div className="py-8">
            {/* Components List */}
            <div className="flex flex-col gap-6">
              {filteredComponents.map((component) => (
                <Card key={component.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 pb-2">
                          <CardTitle>{component.name}</CardTitle>
                          <Badge variant="outline">{component.category}</Badge>
                        </div>
                        <CardDescription>{component.description}</CardDescription>
                        <div className="pt-3 flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">
                            <FileCode className="pr-1 h-3 w-3" />
                            {component.wpEquivalent}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Tabs defaultValue="props" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="props">Props</TabsTrigger>
                        <TabsTrigger value="examples">Examples</TabsTrigger>
                        <TabsTrigger value="a11y">Accessibility</TabsTrigger>
                        <TabsTrigger value="tokens">Design Tokens</TabsTrigger>
                      </TabsList>

                      {/* Props Table */}
                      <TabsContent value="props" className="pt-4">
                        <div className="pb-4">
                          <code className="rounded bg-muted px-2 py-1 text-sm">
                            {component.importPath}
                          </code>
                        </div>
                        
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Prop</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Required</TableHead>
                              <TableHead>Default</TableHead>
                              <TableHead>Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {component.props.map((prop) => (
                              <TableRow key={prop.name}>
                                <TableCell className="font-mono text-sm">{prop.name}</TableCell>
                                <TableCell className="font-mono text-sm text-muted-foreground">
                                  {prop.type}
                                </TableCell>
                                <TableCell>
                                  {prop.required ? (
                                    <Badge variant="destructive" className="text-xs">Required</Badge>
                                  ) : (
                                    <Badge variant="secondary" className="text-xs">Optional</Badge>
                                  )}
                                </TableCell>
                                <TableCell className="font-mono text-sm">
                                  {prop.defaultValue || "-"}
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {prop.description}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TabsContent>

                      {/* Examples */}
                      <TabsContent value="examples" className="pt-4 flex flex-col gap-4">
                        {component.examples.map((example, index) => (
                          <div key={index}>
                            <h4 className="pb-2">{example.title}</h4>
                            <p className="pb-3 text-sm text-[color:var(--color-muted-foreground)]">
                              {example.description}
                            </p>
                            <pre className="overflow-auto rounded-md bg-muted p-4">
                              <code className="text-sm">{example.code}</code>
                            </pre>
                          </div>
                        ))}
                      </TabsContent>

                      {/* Accessibility */}
                      <TabsContent value="a11y" className="pt-4">
                        <ul className="flex flex-col gap-2">
                          {component.accessibility.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="pt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--color-primary)]" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>

                      {/* Design Tokens */}
                      <TabsContent value="tokens" className="pt-4">
                        <div className="flex flex-col gap-2">
                          {component.designTokens.map((token, index) => (
                            <code
                              key={index}
                              className="block rounded bg-muted px-3 py-2 text-sm"
                            >
                              {token}
                            </code>
                          ))}
                        </div>

                        {component.relatedComponents.length > 0 && (
                          <div className="pt-6">
                            <h4 className="pb-3">Related Components</h4>
                            <div className="flex flex-wrap gap-2">
                              {component.relatedComponents.map((related) => (
                                <Badge key={related} variant="outline">
                                  {related}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredComponents.length === 0 && (
              <Card>
                <CardContent className="py-section-sm text-center">
                  <p className="text-muted-foreground">
                    No components found matching your search.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </Container>
      </div>
    </PageLayout>
  );
}