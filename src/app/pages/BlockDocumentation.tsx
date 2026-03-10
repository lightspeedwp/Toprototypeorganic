/**
 * Block Documentation Page
 * 
 * Comprehensive documentation for all WordPress-equivalent blocks with
 * implementation examples, prop tables, and usage guidelines.
 * 
 * **Features:**
 * - 10-12 documented blocks
 * - WordPress block mapping
 * - Interactive examples
 * - Accessibility guidelines
 * - Design system integration
 * 
 * @module BlockDocumentation
 * @category pages
 */

import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/common/Container";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { DevToolsBreadcrumbs } from "../components/common/DevToolsBreadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/blocks/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/blocks/ui/tabs";
import { Badge } from "../components/blocks/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/blocks/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/blocks/ui/accordion";
import { Code, Package, Layers, CheckCircle as CircleCheck, WarningCircle as AlertCircle } from "@phosphor-icons/react";

/**
 * Block documentation structure
 */
interface BlockDoc {
  id: string;
  name: string;
  wpBlock: string;
  category: "Content" | "Layout" | "Navigation" | "Widget" | "Media";
  description: string;
  props: PropDoc[];
  usage: string;
  example: string;
  accessibility: AccessibilityDoc;
  designSystem: DesignSystemDoc;
  relatedBlocks: string[];
}

interface PropDoc {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

interface AccessibilityDoc {
  requirements: string[];
  wcagLevel: "A" | "AA" | "AAA";
  ariaAttributes: string[];
}

interface DesignSystemDoc {
  colors: string[];
  typography: string[];
  spacing: string[];
  customTokens: string[];
}

/**
 * Complete block documentation database
 */
const BLOCK_DOCS: BlockDoc[] = [
  {
    id: "hero-block",
    name: "Hero Block",
    wpBlock: "core/cover + core/group",
    category: "Content",
    description: "Large banner section for page introductions with background image/video support, heading, description, and call-to-action buttons.",
    props: [
      { name: "title", type: "string", required: true, description: "Main heading (H1)" },
      { name: "description", type: "string", required: false, description: "Supporting text" },
      { name: "backgroundImage", type: "string", required: false, description: "Background image URL" },
      { name: "backgroundVideo", type: "string", required: false, description: "Background video URL" },
      { name: "overlay", type: "boolean", required: false, default: "true", description: "Dark overlay for readability" },
      { name: "overlayOpacity", type: "number", required: false, default: "50", description: "Overlay opacity (0-100)" },
      { name: "height", type: "'small'|'medium'|'large'|'full'", required: false, default: "medium", description: "Hero height" },
      { name: "alignment", type: "'left'|'center'|'right'", required: false, default: "center", description: "Content alignment" },
      { name: "primaryButton", type: "ButtonProps", required: false, description: "Primary CTA button" },
      { name: "secondaryButton", type: "ButtonProps", required: false, description: "Secondary CTA button" },
    ],
    usage: `Use Hero blocks at the top of landing pages, archive pages, or major content sections. Ensure sufficient contrast between text and background.`,
    example: `<Hero
  title="Explore Iceland"
  description="Discover breathtaking landscapes"
  backgroundImage="/images/iceland-hero.jpg"
  overlay={true}
  overlayOpacity={40}
  height="large"
  alignment="center"
  primaryButton={{
    text: "View Tours",
    href: "/tours/iceland"
  }}
  secondaryButton={{
    text: "Learn More",
    href: "/destinations/iceland"
  }}
/>`,
    accessibility: {
      requirements: [
        "Heading hierarchy maintained (H1 for title)",
        "Minimum 4.5:1 contrast ratio for text",
        "Background images have alt text",
        "Buttons are keyboard accessible",
        "Focus indicators visible",
      ],
      wcagLevel: "AA",
      ariaAttributes: ["aria-label on section", "role='img' on background"],
    },
    designSystem: {
      colors: ["var(--background)", "var(--foreground)", "var(--primary)", "var(--primary-foreground)"],
      typography: ["var(--text-4xl) - title", "var(--text-lg) - description", "var(--font-family-lora) - headings"],
      spacing: ["py-24 md:py-32 - vertical padding", "gap-6 - content spacing"],
      customTokens: ["--hero-overlay-opacity", "--hero-min-height"],
    },
    relatedBlocks: ["ArchiveHeader", "CTA", "EditorialContent"],
  },
  {
    id: "card-grid-block",
    name: "Card Grid Block",
    wpBlock: "core/query + core/post-template (Grid layout)",
    category: "Layout",
    description: "Responsive grid container for displaying card components (tours, destinations, blog posts). Automatically adjusts columns based on viewport.",
    props: [
      { name: "children", type: "React.ReactNode", required: true, description: "Card components" },
      { name: "columns", type: "2|3|4|5|6", required: false, default: "3", description: "Desktop columns" },
      { name: "gap", type: "number", required: false, default: "6", description: "Gap between items (Tailwind units)" },
      { name: "minWidth", type: "string", required: false, default: "280px", description: "Minimum card width" },
      { name: "aspectRatio", type: "string", required: false, description: "Card aspect ratio" },
    ],
    usage: `Use for displaying collections of similar items. Automatically responsive with mobile (1 col), tablet (2 col), desktop (3-6 col).`,
    example: `<CardGrid columns={3} gap={6} minWidth="300px">
  {tours.map(tour => (
    <TourCard key={tour.id} tour={tour} />
  ))}
</CardGrid>`,
    accessibility: {
      requirements: [
        "Semantic list structure (ul/li)",
        "Each card is keyboard navigable",
        "Grid announces properly to screen readers",
        "Cards maintain logical reading order",
      ],
      wcagLevel: "AA",
      ariaAttributes: ["aria-label on grid container"],
    },
    designSystem: {
      colors: ["var(--card)", "var(--border)"],
      typography: [],
      spacing: ["gap-4 md:gap-6 - responsive gaps", "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"],
      customTokens: [],
    },
    relatedBlocks: ["TourCard", "DestinationCard", "BlogCard", "Query"],
  },
  {
    id: "taxonomy-filter-block",
    name: "Taxonomy Filter Block",
    wpBlock: "core/navigation + core/term-links",
    category: "Navigation",
    description: "Horizontal navigation for filtering content by taxonomy terms. Includes active state indication and optional counts.",
    props: [
      { name: "label", type: "string", required: false, description: "Filter label text" },
      { name: "terms", type: "Term[]", required: true, description: "Taxonomy terms array" },
      { name: "activeTerm", type: "string", required: false, description: "Active term slug" },
      { name: "showCounts", type: "boolean", required: false, default: "false", description: "Show item counts" },
      { name: "layout", type: "'horizontal'|'vertical'", required: false, default: "horizontal", description: "Layout direction" },
    ],
    usage: `Use above content grids to allow filtering by categories, tags, or custom taxonomies. Always indicate active state clearly.`,
    example: `<TaxonomyFilter
  label="Filter by Travel Style:"
  terms={travelStyles}
  activeTerm="adventure"
  showCounts={true}
/>`,
    accessibility: {
      requirements: [
        "Semantic nav element",
        "ARIA current on active item",
        "Keyboard navigation with arrow keys",
        "Focus indicators on all links",
      ],
      wcagLevel: "AA",
      ariaAttributes: ["aria-current='page'", "role='navigation'"],
    },
    designSystem: {
      colors: ["var(--foreground)", "var(--primary)", "var(--border)", "var(--muted-foreground)"],
      typography: ["var(--text-base)", "var(--font-weight-medium)"],
      spacing: ["gap-4 - term spacing", "px-4 py-2 - term padding"],
      customTokens: [],
    },
    relatedBlocks: ["TaxonomyNav", "Query", "CardGrid"],
  },
  {
    id: "faq-block",
    name: "FAQ Block",
    wpBlock: "core/details (WordPress 6.4+)",
    category: "Widget",
    description: "Accordion-style frequently asked questions with expand/collapse functionality. Each item contains question and answer.",
    props: [
      { name: "title", type: "string", required: false, description: "Section heading" },
      { name: "items", type: "FAQItem[]", required: true, description: "FAQ items array" },
      { name: "defaultOpen", type: "number", required: false, description: "Default open item index" },
      { name: "allowMultiple", type: "boolean", required: false, default: "false", description: "Allow multiple items open" },
      { name: "variant", type: "'default'|'bordered'|'separated'", required: false, default: "default", description: "Visual style" },
    ],
    usage: `Use for frequently asked questions, help documentation, or expandable content sections. Keep answers concise.`,
    example: `<FAQ
  title="Frequently Asked Questions"
  items={[
    {
      question: "How do I book a tour?",
      answer: "You can book directly through our website..."
    },
    {
      question: "What's included?",
      answer: "All tours include..."
    }
  ]}
  defaultOpen={0}
/>`,
    accessibility: {
      requirements: [
        "ARIA expanded states on buttons",
        "Keyboard navigation (Tab, Enter, Space)",
        "Screen reader announcements",
        "Focus management on expand/collapse",
      ],
      wcagLevel: "AA",
      ariaAttributes: ["aria-expanded", "aria-controls", "role='region'"],
    },
    designSystem: {
      colors: ["var(--card)", "var(--border)", "var(--foreground)"],
      typography: ["var(--text-xl) - questions", "var(--text-base) - answers"],
      spacing: ["py-4 - item padding", "gap-2 - items gap"],
      customTokens: [],
    },
    relatedBlocks: ["EditorialContent", "Accordion"],
  },
  {
    id: "cta-block",
    name: "Call-to-Action Block",
    wpBlock: "core/group + core/buttons",
    category: "Content",
    description: "Prominent call-to-action section with heading, description, and button(s). Used to drive conversions.",
    props: [
      { name: "title", type: "string", required: true, description: "CTA heading" },
      { name: "description", type: "string", required: false, description: "Supporting text" },
      { name: "primaryButton", type: "ButtonProps", required: true, description: "Primary action button" },
      { name: "secondaryButton", type: "ButtonProps", required: false, description: "Secondary button" },
      { name: "variant", type: "'default'|'centered'|'compact'|'wide'", required: false, default: "default", description: "Layout variant" },
      { name: "backgroundColor", type: "string", required: false, description: "Background color" },
    ],
    usage: `Place CTAs strategically throughout pages to drive actions. Use clear, action-oriented button text.`,
    example: `<CTA
  title="Ready to Explore?"
  description="Join thousands of happy travelers"
  primaryButton={{
    text: "Browse Tours",
    href: "/tours",
    variant: "primary"
  }}
  secondaryButton={{
    text: "Contact Us",
    href: "/contact",
    variant: "outline"
  }}
  variant="centered"
/>`,
    accessibility: {
      requirements: [
        "Clear, descriptive button text",
        "Sufficient contrast for buttons",
        "Keyboard accessible",
        "Touch target minimum 44x44px",
      ],
      wcagLevel: "AA",
      ariaAttributes: [],
    },
    designSystem: {
      colors: ["var(--primary)", "var(--primary-foreground)", "var(--accent)"],
      typography: ["var(--text-2xl) - title", "var(--text-base) - description"],
      spacing: ["p-8 md:p-12 - section padding", "gap-6 - content spacing"],
      customTokens: [],
    },
    relatedBlocks: ["Hero", "Button", "EditorialContent"],
  },
  {
    id: "editorial-content-block",
    name: "Editorial Content Block",
    wpBlock: "core/group + core/heading + core/paragraph",
    category: "Content",
    description: "Rich text content block with optional heading. Supports formatted text, lists, links, and basic HTML.",
    props: [
      { name: "title", type: "string", required: false, description: "Section heading" },
      { name: "content", type: "string", required: true, description: "HTML content string" },
      { name: "maxWidth", type: "'narrow'|'medium'|'wide'|'full'", required: false, default: "medium", description: "Content width" },
      { name: "alignment", type: "'left'|'center'|'right'", required: false, default: "left", description: "Text alignment" },
    ],
    usage: `Use for long-form content, about sections, tour descriptions. Keep paragraphs scannable with headings and lists.`,
    example: `<EditorialContent
  title="About This Tour"
  content="<p>Experience the wonder...</p><ul><li>Item 1</li></ul>"
  maxWidth="medium"
/>`,
    accessibility: {
      requirements: [
        "Proper heading hierarchy",
        "Semantic HTML structure",
        "Readable line length (maxWidth)",
        "Sufficient line spacing",
        "Link text is descriptive",
      ],
      wcagLevel: "AA",
      ariaAttributes: [],
    },
    designSystem: {
      colors: ["var(--foreground)", "var(--muted-foreground)"],
      typography: ["var(--text-base)", "var(--font-family-noto-sans)", "line-height: 1.75"],
      spacing: ["prose styling", "max-w-prose - readable width"],
      customTokens: [],
    },
    relatedBlocks: ["Heading", "Paragraph", "List"],
  },
  {
    id: "fast-facts-block",
    name: "Fast Facts Block",
    wpBlock: "custom/meta-block or core/list",
    category: "Widget",
    description: "Quick facts sidebar displaying key metadata with icons (duration, price, dates, group size, etc.).",
    props: [
      { name: "title", type: "string", required: false, default: "Quick Facts", description: "Section heading" },
      { name: "facts", type: "Fact[]", required: true, description: "Array of facts" },
      { name: "variant", type: "'sidebar'|'inline'|'grid'", required: false, default: "sidebar", description: "Layout variant" },
      { name: "iconPosition", type: "'left'|'right'", required: false, default: "left", description: "Icon position" },
    ],
    usage: `Use in tour/accommodation detail pages to highlight important information. Keep facts concise and scannable.`,
    example: `<FastFacts
  title="Tour Details"
  facts={[
    { label: "Duration", value: "7 days", icon: "Calendar" },
    { label: "Price", value: "$2,499", icon: "DollarSign" },
    { label: "Group Size", value: "12-16", icon: "Users" }
  ]}
  variant="sidebar"
/>`,
    accessibility: {
      requirements: [
        "Definition list structure (dl/dt/dd)",
        "Icons are decorative or have alt",
        "Clear label-value pairing",
        "Readable font sizes",
      ],
      wcagLevel: "AA",
      ariaAttributes: [],
    },
    designSystem: {
      colors: ["var(--card)", "var(--muted-foreground)", "var(--foreground)"],
      typography: ["var(--text-base)", "var(--font-weight-medium) - labels"],
      spacing: ["gap-4 - fact spacing", "p-6 - container padding"],
      customTokens: [],
    },
    relatedBlocks: ["EditorialContent", "Meta"],
  },
  {
    id: "related-content-block",
    name: "Related Content Block",
    wpBlock: "core/query (custom related posts query)",
    category: "Widget",
    description: "Section displaying related posts/tours/destinations based on taxonomy, tags, or manual selection.",
    props: [
      { name: "title", type: "string", required: false, default: "You May Also Like", description: "Section heading" },
      { name: "items", type: "Post[]", required: true, description: "Related items array" },
      { name: "columns", type: "2|3|4", required: false, default: "3", description: "Grid columns" },
      { name: "limit", type: "number", required: false, default: "3", description: "Number of items to show" },
      { name: "queryType", type: "'taxonomy'|'tags'|'manual'", required: false, default: "taxonomy", description: "How to determine related" },
    ],
    usage: `Place at end of detail pages to suggest related content. Ensure items are truly related to current content.`,
    example: `<RelatedContent
  title="Similar Tours"
  items={relatedTours}
  columns={3}
  limit={3}
  queryType="taxonomy"
/>`,
    accessibility: {
      requirements: [
        "Semantic section element",
        "Proper heading hierarchy",
        "Grid is keyboard navigable",
        "Clear relationship to main content",
      ],
      wcagLevel: "AA",
      ariaAttributes: ["aria-labelledby"],
    },
    designSystem: {
      colors: ["var(--background)", "var(--card)"],
      typography: ["var(--text-2xl) - heading"],
      spacing: ["py-12 - section padding", "gap-6 - grid gap"],
      customTokens: [],
    },
    relatedBlocks: ["CardGrid", "Query", "TourCard"],
  },
  {
    id: "archive-header-block",
    name: "Archive Header Block",
    wpBlock: "core/query-title + core/term-description",
    category: "Content",
    description: "Page header for archive pages displaying title, description, and optional item count.",
    props: [
      { name: "title", type: "string", required: true, description: "Archive title" },
      { name: "description", type: "string", required: false, description: "Archive description" },
      { name: "count", type: "number", required: false, description: "Total items" },
      { name: "showCount", type: "boolean", required: false, default: "true", description: "Display count" },
      { name: "breadcrumbs", type: "Breadcrumb[]", required: false, description: "Breadcrumb navigation" },
    ],
    usage: `Use at top of all archive/listing pages. Title should match the archive type (e.g., "Adventure Tours").`,
    example: `<ArchiveHeader
  title="Adventure Tours"
  description="Thrilling experiences for the bold"
  count={42}
  showCount={true}
/>`,
    accessibility: {
      requirements: [
        "H1 heading for title",
        "Count announced to screen readers",
        "Breadcrumbs are navigable",
        "Semantic structure",
      ],
      wcagLevel: "AA",
      ariaAttributes: ["aria-label on count"],
    },
    designSystem: {
      colors: ["var(--foreground)", "var(--muted-foreground)"],
      typography: ["var(--text-4xl) - title", "var(--text-base) - description"],
      spacing: ["py-8 - vertical padding", "gap-4 - content spacing"],
      customTokens: [],
    },
    relatedBlocks: ["Hero", "TaxonomyNav", "Breadcrumbs"],
  },
  {
    id: "pagination-block",
    name: "Pagination Block",
    wpBlock: "core/query-pagination",
    category: "Navigation",
    description: "Pagination controls for navigating through archive pages or query results.",
    props: [
      { name: "currentPage", type: "number", required: true, description: "Current page number" },
      { name: "totalPages", type: "number", required: true, description: "Total number of pages" },
      { name: "onPageChange", type: "(page: number) => void", required: true, description: "Page change handler" },
      { name: "showFirstLast", type: "boolean", required: false, default: "true", description: "Show first/last buttons" },
      { name: "siblingCount", type: "number", required: false, default: "1", description: "Pages to show on each side" },
    ],
    usage: `Place below content grid on archive pages. Ensure keyboard navigation and clear current page indication.`,
    example: `<Pagination
  currentPage={2}
  totalPages={10}
  onPageChange={handlePageChange}
  showFirstLast={true}
  siblingCount={1}
/>`,
    accessibility: {
      requirements: [
        "Semantic nav element",
        "ARIA current on active page",
        "Keyboard navigation",
        "Screen reader announcements",
        "Focus management on page change",
      ],
      wcagLevel: "AA",
      ariaAttributes: ["aria-current='page'", "aria-label='Pagination'", "role='navigation'"],
    },
    designSystem: {
      colors: ["var(--primary)", "var(--border)", "var(--muted)"],
      typography: ["var(--text-base)"],
      spacing: ["gap-2 - button spacing"],
      customTokens: [],
    },
    relatedBlocks: ["Query", "CardGrid", "Navigation"],
  },
  {
    id: "breadcrumbs-block",
    name: "Breadcrumbs Block",
    wpBlock: "custom/breadcrumbs or yoast-seo breadcrumbs",
    category: "Navigation",
    description: "Hierarchical navigation showing current page location within site structure.",
    props: [
      { name: "items", type: "BreadcrumbItem[]", required: true, description: "Breadcrumb items" },
      { name: "separator", type: "string|React.ReactNode", required: false, default: "/", description: "Separator character/icon" },
      { name: "showHome", type: "boolean", required: false, default: "true", description: "Show home link" },
    ],
    usage: `Place below header on detail and taxonomy pages. Keep breadcrumb text concise and descriptive.`,
    example: `<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Tours", href: "/tours" },
    { label: "Adventure", href: "/tours/adventure" },
    { label: "Iceland Explorer" }
  ]}
  separator="/"
/>`,
    accessibility: {
      requirements: [
        "Semantic nav element with aria-label",
        "Ordered list structure",
        "Current page not a link",
        "ARIA current on last item",
      ],
      wcagLevel: "AA",
      ariaAttributes: ["aria-label='Breadcrumb'", "aria-current='page'"],
    },
    designSystem: {
      colors: ["var(--muted-foreground)", "var(--foreground)"],
      typography: ["var(--text-sm)"],
      spacing: ["gap-2 - item spacing"],
      customTokens: [],
    },
    relatedBlocks: ["Navigation", "ArchiveHeader"],
  },
  {
    id: "team-member-card",
    name: "Team Member Card",
    wpBlock: "custom/team-member",
    category: "Widget",
    description: "Card displaying team member information with photo, name, role, bio, and social links.",
    props: [
      { name: "member", type: "TeamMember", required: true, description: "Team member data" },
      { name: "showBio", type: "boolean", required: false, default: "true", description: "Show biography" },
      { name: "showSocial", type: "boolean", required: false, default: "true", description: "Show social links" },
      { name: "variant", type: "'card'|'list'", required: false, default: "card", description: "Display variant" },
    ],
    usage: `Use in team archive page or about section. Ensure all images have alt text with member names.`,
    example: `<TeamMemberCard
  member={teamMemberData}
  showBio={true}
  showSocial={true}
  variant="card"
/>`,
    accessibility: {
      requirements: [
        "Image alt text with member name",
        "Semantic article element",
        "Heading for name",
        "Social links have descriptive text",
      ],
      wcagLevel: "AA",
      ariaAttributes: [],
    },
    designSystem: {
      colors: ["var(--card)", "var(--border)"],
      typography: ["var(--text-xl) - name", "var(--text-base) - role/bio"],
      spacing: ["p-6 - card padding", "gap-4 - content spacing"],
      customTokens: [],
    },
    relatedBlocks: ["CardGrid", "Image", "SocialLinks"],
  },
];

/**
 * Block Documentation Page
 */
export default function BlockDocumentation() {
  return (
    <PageLayout>
      <DevToolsBreadcrumbs currentPage="Block Documentation" />
      <div className="min-h-screen bg-background">
        {/* Page Header */}
        <div className="border-b bg-card">
          <Container>
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Developer Tools', href: '/dev-tools' },
                { label: 'Block Documentation', isCurrent: true }
              ]}
            />
            
            <div className="py-8">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="mb-2">Block Documentation</h1>
                  <p className="text-muted-foreground">
                    Complete guide to all WordPress-equivalent blocks
                  </p>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {BLOCK_DOCS.length} Blocks
                </Badge>
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <div className="py-8">
            {/* Category Navigation */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {["All", "Content", "Layout", "Navigation", "Widget", "Media"].map(category => (
                  <Badge key={category} variant="outline" className="cursor-pointer">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Blocks List */}
            <div className="space-y-6">
              {BLOCK_DOCS.map((block) => (
                <Card key={block.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle>{block.name}</CardTitle>
                          <Badge variant="outline">{block.category}</Badge>
                        </div>
                        <CardDescription>{block.description}</CardDescription>
                        <div className="mt-3">
                          <Badge variant="secondary" className="text-xs">
                            <Code className="mr-1 h-3 w-3" />
                            {block.wpBlock}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Tabs defaultValue="props" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="props">Props</TabsTrigger>
                        <TabsTrigger value="example">Example</TabsTrigger>
                        <TabsTrigger value="usage">Usage</TabsTrigger>
                        <TabsTrigger value="a11y">A11y</TabsTrigger>
                        <TabsTrigger value="design">Design</TabsTrigger>
                      </TabsList>

                      {/* Props Table */}
                      <TabsContent value="props" className="mt-4">
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
                            {block.props.map((prop) => (
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
                                  {prop.default || "-"}
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {prop.description}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TabsContent>

                      {/* Example Code */}
                      <TabsContent value="example" className="mt-4">
                        <pre className="overflow-auto rounded-md bg-muted p-4">
                          <code className="text-sm">{block.example}</code>
                        </pre>
                      </TabsContent>

                      {/* Usage Guidelines */}
                      <TabsContent value="usage" className="mt-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="mb-2 flex items-center gap-2">
                              <CircleCheck className="h-4 w-4 text-success" />
                              Best Practices
                            </h4>
                            <p className="text-sm text-muted-foreground">{block.usage}</p>
                          </div>
                          
                          {block.relatedBlocks.length > 0 && (
                            <div>
                              <h4 className="mb-3">Related Blocks</h4>
                              <div className="flex flex-wrap gap-2">
                                {block.relatedBlocks.map((related) => (
                                  <Badge key={related} variant="outline">
                                    {related}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      {/* Accessibility */}
                      <TabsContent value="a11y" className="mt-4">
                        <div className="space-y-4">
                          <div>
                            <div className="mb-2 flex items-center gap-2">
                              <h4>Requirements</h4>
                              <Badge variant="outline">WCAG {block.accessibility.wcagLevel}</Badge>
                            </div>
                            <ul className="space-y-2">
                              {block.accessibility.requirements.map((req, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                                  <span className="text-sm">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {block.accessibility.ariaAttributes.length > 0 && (
                            <div>
                              <h4 className="mb-2">ARIA Attributes</h4>
                              <div className="space-y-1">
                                {block.accessibility.ariaAttributes.map((attr, index) => (
                                  <code key={index} className="block rounded bg-muted px-3 py-2 text-sm">
                                    {attr}
                                  </code>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      {/* Design System */}
                      <TabsContent value="design" className="mt-4 space-y-4">
                        <div>
                          <h4 className="mb-2">Colors</h4>
                          <div className="space-y-1">
                            {block.designSystem.colors.map((color, index) => (
                              <code key={index} className="block rounded bg-muted px-3 py-2 text-sm">
                                {color}
                              </code>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="mb-2">Typography</h4>
                          <div className="space-y-1">
                            {block.designSystem.typography.map((typo, index) => (
                              <code key={index} className="block rounded bg-muted px-3 py-2 text-sm">
                                {typo}
                              </code>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="mb-2">Spacing</h4>
                          <div className="space-y-1">
                            {block.designSystem.spacing.map((space, index) => (
                              <code key={index} className="block rounded bg-muted px-3 py-2 text-sm">
                                {space}
                              </code>
                            ))}
                          </div>
                        </div>

                        {block.designSystem.customTokens.length > 0 && (
                          <div>
                            <h4 className="mb-2">Custom Tokens</h4>
                            <div className="space-y-1">
                              {block.designSystem.customTokens.map((token, index) => (
                                <code key={index} className="block rounded bg-muted px-3 py-2 text-sm">
                                  {token}
                                </code>
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
          </div>
        </Container>
      </div>
    </PageLayout>
  );
}