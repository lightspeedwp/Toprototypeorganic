/**
 * Component Showcase Page
 * 
 * Interactive preview system for all pattern components with live prop editors.
 * Allows developers to test components with different configurations in real-time.
 * 
 * **Features:**
 * - Live component preview with hot reload
 * - Interactive prop editors with type-safe controls
 * - Dark mode toggle for testing
 * - Code snippet generation
 * - Responsive preview modes (mobile, tablet, desktop)
 * - Component variant switching
 * - Category and search filtering
 * 
 * **Design System:**
 * All styling uses CSS variables from theme.css for consistency.
 * Typography follows semantic HTML with Lora (headings) and Noto Sans (body).
 * 
 * @module ComponentShowcase
 * @category pages
 */

import { useState, useMemo } from "react";
import { Container } from "../components/common/Container";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { DevToolsBreadcrumbs } from "../components/common/DevToolsBreadcrumbs";
import { Hero } from "../components/patterns/Hero";
import { ArchiveHeader } from "../components/patterns/ArchiveHeader";
import { CardGrid } from "../components/patterns/CardGrid";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { EditorialContent } from "../components/patterns/EditorialContent";
import { TaxonomyNav } from "../components/patterns/TaxonomyNav";
import { RelatedContent } from "../components/patterns/RelatedContent";
import { TourCard } from "../components/patterns/TourCard";
import { DestinationCard } from "../components/patterns/DestinationCard";
import { BlogCard } from "../components/patterns/BlogCard";
import { AccommodationCard } from "../components/patterns/AccommodationCard";
import { SpecialCard } from "../components/patterns/SpecialCard";
import { TeamCard } from "../components/patterns/TeamCard";
import { FastFacts } from "../components/patterns/FastFacts";
import { Pagination } from "../components/patterns/Pagination";
import { BreadcrumbsPattern } from "../components/patterns/BreadcrumbsPattern";
import { SectionHeaderPattern } from "../components/patterns/SectionHeaderPattern";
import { TableOfContentsPattern } from "../components/patterns/TableOfContentsPattern";
import { ContactFormPattern } from "../components/patterns/ContactFormPattern";
import { Logo } from "../components/common/Logo";
import { BackToTopButton } from "../components/common/BackToTopButton";
import { ScrollDownArrow } from "../components/common/ScrollDownArrow";
import { ThemeSwitcher } from "../components/common/ThemeSwitcher";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/blocks/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/blocks/ui/card";
import { Label } from "../components/blocks/ui/label";
import { Input } from "../components/blocks/ui/input";
import { Textarea } from "../components/blocks/ui/textarea";
import { Switch } from "../components/blocks/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/blocks/ui/select";
import { Button } from "../components/blocks/design/Button";
import { Badge } from "../components/blocks/ui/badge";
import { Monitor, DeviceTablet as Tablet, DeviceMobile as Smartphone, Copy, Check, MagnifyingGlass as Search } from "@phosphor-icons/react";
import { TOURS, DESTINATIONS, BLOG_POSTS, TRAVEL_STYLES, FAQ_GENERAL, ACCOMMODATION, SPECIALS, TEAM } from "../data/mock";

/**
 * Component metadata for showcase
 */
interface ComponentMeta {
  id: string;
  name: string;
  category: "Pattern" | "Block" | "Card" | "Common";
  description: string;
  wpEquivalent?: string;
  props: PropConfig[];
}

/**
 * Prop configuration for interactive editors
 */
interface PropConfig {
  name: string;
  type: "text" | "textarea" | "boolean" | "select" | "number";
  label: string;
  defaultValue: any;
  options?: { label: string; value: any }[];
  description?: string;
}

/**
 * Available components for showcase
 */
const COMPONENTS: ComponentMeta[] = [
  // Hero Patterns
  {
    id: "hero",
    name: "Hero",
    category: "Pattern",
    description: "Large introductory banner with heading, description, and optional CTA buttons",
    wpEquivalent: "Cover block + Group block pattern",
    props: [
      { name: "title", type: "text", label: "Title", defaultValue: "Discover Amazing Adventures" },
      { name: "description", type: "textarea", label: "Description", defaultValue: "Explore the world with our curated collection of extraordinary tours and experiences." },
      { name: "primaryButtonText", type: "text", label: "Primary Button", defaultValue: "Browse Tours" },
      { name: "secondaryButtonText", type: "text", label: "Secondary Button", defaultValue: "Learn More" },
      { name: "showButtons", type: "boolean", label: "Show Buttons", defaultValue: true },
    ],
  },
  
  // Header Patterns
  {
    id: "archive-header",
    name: "Archive Header",
    category: "Pattern",
    description: "Page header for archive/listing pages with title, count, and optional description",
    wpEquivalent: "Query Title + Query Pagination + Group pattern",
    props: [
      { name: "title", type: "text", label: "Title", defaultValue: "All Tours" },
      { name: "description", type: "textarea", label: "Description", defaultValue: "Browse our complete collection of guided tours and adventures." },
      { name: "count", type: "number", label: "Item Count", defaultValue: 24 },
      { name: "showCount", type: "boolean", label: "Show Count", defaultValue: true },
    ],
  },
  {
    id: "section-header",
    name: "Section Header",
    category: "Pattern",
    description: "Reusable section header with title, subtitle, and optional description",
    wpEquivalent: "Group block with Heading + Paragraph",
    props: [
      { name: "title", type: "text", label: "Title", defaultValue: "Section Title" },
      { name: "subtitle", type: "text", label: "Subtitle", defaultValue: "Optional subtitle" },
      { name: "description", type: "textarea", label: "Description", defaultValue: "Section description text." },
      { name: "showSubtitle", type: "boolean", label: "Show Subtitle", defaultValue: true },
      { name: "showDescription", type: "boolean", label: "Show Description", defaultValue: true },
    ],
  },
  
  // Grid Patterns
  {
    id: "card-grid",
    name: "Card Grid",
    category: "Pattern",
    description: "Responsive grid layout for displaying cards (tours, destinations, blog posts)",
    wpEquivalent: "Query Loop block with Grid layout",
    props: [
      { name: "columns", type: "select", label: "Columns", defaultValue: "3", options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ]},
      { name: "gap", type: "select", label: "Gap Size", defaultValue: "6", options: [
        { label: "Small (4)", value: "4" },
        { label: "Medium (6)", value: "6" },
        { label: "Large (8)", value: "8" },
      ]},
    ],
  },
  {
    id: "team-grid",
    name: "Team Grid",
    category: "Pattern",
    description: "Grid layout for displaying team member cards",
    wpEquivalent: "Query Loop block with custom post type",
    props: [
      { name: "title", type: "text", label: "Title", defaultValue: "Meet Our Team" },
      { name: "columns", type: "select", label: "Columns", defaultValue: "3", options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ]},
    ],
  },
  
  // CTA Patterns
  {
    id: "cta",
    name: "Call to Action",
    category: "Pattern",
    description: "Prominent call-to-action section with heading, description, and button",
    wpEquivalent: "Group block + Buttons block pattern",
    props: [
      { name: "title", type: "text", label: "Title", defaultValue: "Ready to Start?" },
      { name: "description", type: "textarea", label: "Description", defaultValue: "Get in touch with our team to plan your perfect journey." },
      { name: "buttonText", type: "text", label: "Button Text", defaultValue: "Get Started" },
    ],
  },
  
  // Content Patterns
  {
    id: "editorial-content",
    name: "Editorial Content",
    category: "Pattern",
    description: "Rich text content block with optional heading and formatted paragraphs",
    wpEquivalent: "Group block with Heading + Paragraph blocks",
    props: [
      { name: "title", type: "text", label: "Title", defaultValue: "About This Experience" },
      { name: "showTitle", type: "boolean", label: "Show Title", defaultValue: true },
    ],
  },
  {
    id: "fast-facts",
    name: "Fast Facts",
    category: "Pattern",
    description: "Quick facts/metadata display for tours and destinations",
    wpEquivalent: "Custom block or List block pattern",
    props: [
      { name: "title", type: "text", label: "Title", defaultValue: "Quick Facts" },
      { name: "showTitle", type: "boolean", label: "Show Title", defaultValue: true },
    ],
  },
  
  // Utility Patterns
  {
    id: "faq",
    name: "FAQ",
    category: "Pattern",
    description: "Accordion-style frequently asked questions section",
    wpEquivalent: "Details block (WordPress 6.4+) or custom accordion pattern",
    props: [
      { name: "title", type: "text", label: "Section Title", defaultValue: "Frequently Asked Questions" },
      { name: "showTitle", type: "boolean", label: "Show Title", defaultValue: true },
    ],
  },
  {
    id: "table-of-contents",
    name: "Table of Contents",
    category: "Pattern",
    description: "Navigational table of contents for long-form content",
    wpEquivalent: "Navigation block or List block",
    props: [
      { name: "title", type: "text", label: "Title", defaultValue: "Table of Contents" },
    ],
  },
  {
    id: "contact-form",
    name: "Contact Form",
    category: "Pattern",
    description: "Contact form with validation and submission handling",
    wpEquivalent: "Form block or Contact Form 7",
    props: [
      { name: "title", type: "text", label: "Title", defaultValue: "Get in Touch" },
      { name: "showTitle", type: "boolean", label: "Show Title", defaultValue: true },
    ],
  },
  
  // Navigation Patterns
  {
    id: "taxonomy-nav",
    name: "Taxonomy Navigation",
    category: "Block",
    description: "Horizontal navigation for taxonomy terms (categories, tags, travel styles)",
    wpEquivalent: "Navigation block with term links",
    props: [
      { name: "label", type: "text", label: "Label", defaultValue: "Filter by:" },
      { name: "showLabel", type: "boolean", label: "Show Label", defaultValue: true },
    ],
  },
  {
    id: "breadcrumbs",
    name: "Breadcrumbs",
    category: "Block",
    description: "Hierarchical navigation breadcrumb trail",
    wpEquivalent: "Breadcrumbs block or Navigation block",
    props: [],
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "Block",
    description: "Page navigation for archive/listing pages",
    wpEquivalent: "Query Pagination block",
    props: [
      { name: "currentPage", type: "number", label: "Current Page", defaultValue: 1 },
      { name: "totalPages", type: "number", label: "Total Pages", defaultValue: 5 },
    ],
  },
  
  // Related Content
  {
    id: "related-content",
    name: "Related Content",
    category: "Pattern",
    description: "Section displaying related posts/tours with heading and grid layout",
    wpEquivalent: "Related Posts block or Query Loop with custom query",
    props: [
      { name: "title", type: "text", label: "Title", defaultValue: "You May Also Like" },
      { name: "columns", type: "select", label: "Columns", defaultValue: "3", options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ]},
    ],
  },
  
  // Card Components
  {
    id: "tour-card",
    name: "Tour Card",
    category: "Card",
    description: "Individual tour card with image, title, metadata, and link",
    wpEquivalent: "Custom block or pattern for tour display",
    props: [
      { name: "showImage", type: "boolean", label: "Show Image", defaultValue: true },
      { name: "showPrice", type: "boolean", label: "Show Price", defaultValue: true },
      { name: "showDuration", type: "boolean", label: "Show Duration", defaultValue: true },
    ],
  },
  {
    id: "destination-card",
    name: "Destination Card",
    category: "Card",
    description: "Individual destination card with image, title, and description",
    wpEquivalent: "Custom block or pattern for destination display",
    props: [
      { name: "showImage", type: "boolean", label: "Show Image", defaultValue: true },
      { name: "showDescription", type: "boolean", label: "Show Description", defaultValue: true },
    ],
  },
  {
    id: "blog-card",
    name: "Blog Card",
    category: "Card",
    description: "Individual blog post card with image, title, excerpt, and metadata",
    wpEquivalent: "Post Template within Query Loop",
    props: [
      { name: "showImage", type: "boolean", label: "Show Featured Image", defaultValue: true },
      { name: "showExcerpt", type: "boolean", label: "Show Excerpt", defaultValue: true },
      { name: "showDate", type: "boolean", label: "Show Date", defaultValue: true },
      { name: "showAuthor", type: "boolean", label: "Show Author", defaultValue: true },
    ],
  },
  {
    id: "accommodation-card",
    name: "Accommodation Card",
    category: "Card",
    description: "Individual accommodation card with image, title, and details",
    wpEquivalent: "Custom block or pattern for accommodation display",
    props: [
      { name: "showImage", type: "boolean", label: "Show Image", defaultValue: true },
      { name: "showRating", type: "boolean", label: "Show Rating", defaultValue: true },
    ],
  },
  {
    id: "special-card",
    name: "Special Card",
    category: "Card",
    description: "Individual special offer card with discount badge",
    wpEquivalent: "Custom block or pattern for special display",
    props: [
      { name: "showImage", type: "boolean", label: "Show Image", defaultValue: true },
      { name: "showDiscount", type: "boolean", label: "Show Discount Badge", defaultValue: true },
    ],
  },
  {
    id: "team-card",
    name: "Team Member Card",
    category: "Card",
    description: "Individual team member card with photo, name, and role",
    wpEquivalent: "Custom block or pattern for team display",
    props: [
      { name: "showImage", type: "boolean", label: "Show Photo", defaultValue: true },
      { name: "showBio", type: "boolean", label: "Show Bio", defaultValue: true },
    ],
  },
  
  // Common Components
  {
    id: "logo",
    name: "Logo",
    category: "Common",
    description: "Site branding logo with automatic dark mode switching",
    wpEquivalent: "Site Logo block",
    props: [],
  },
  {
    id: "back-to-top",
    name: "Back to Top Button",
    category: "Common",
    description: "Floating button to scroll back to top of page",
    wpEquivalent: "Custom block or JavaScript enhancement",
    props: [],
  },
  {
    id: "scroll-down",
    name: "Scroll Down Arrow",
    category: "Common",
    description: "Animated arrow indicating scrollable content below",
    wpEquivalent: "Custom block or JavaScript enhancement",
    props: [],
  },
  {
    id: "theme-switcher",
    name: "Dark Mode Switcher",
    category: "Common",
    description: "Toggle between light and dark color modes",
    wpEquivalent: "Custom block or JavaScript enhancement",
    props: [],
  },
];

/**
 * Viewport size options for responsive preview
 */
const VIEWPORTS = [
  { label: "Desktop", value: "desktop", width: "100%", icon: Monitor },
  { label: "Tablet", value: "tablet", width: "768px", icon: Tablet },
  { label: "Mobile", value: "mobile", width: "375px", icon: Smartphone },
];

/**
 * Component Showcase Page
 * 
 * Interactive development tool for testing and documenting components.
 */
export default function ComponentShowcase() {
  const [selectedComponent, setSelectedComponent] = useState<string>("hero");
  const [viewport, setViewport] = useState<string>("desktop");
  const [props, setProps] = useState<Record<string, any>>({});
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const currentComponent = COMPONENTS.find(c => c.id === selectedComponent);

  /**
   * Filter components by search query and category
   */
  const filteredComponents = useMemo(() => {
    return COMPONENTS.filter(component => {
      const matchesSearch = searchQuery === "" || 
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || component.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  /**
   * Get unique categories
   */
  const categories = useMemo(() => {
    const cats = Array.from(new Set(COMPONENTS.map(c => c.category)));
    return ["all", ...cats];
  }, []);

  /**
   * Initialize props with default values when component changes
   */
  const initializeProps = (componentId: string) => {
    const component = COMPONENTS.find(c => c.id === componentId);
    if (!component) return;

    const initialProps: Record<string, any> = {};
    component.props.forEach(prop => {
      initialProps[prop.name] = prop.defaultValue;
    });
    setProps(initialProps);
  };

  /**
   * Handle component selection change
   */
  const handleComponentChange = (componentId: string) => {
    setSelectedComponent(componentId);
    initializeProps(componentId);
  };

  /**
   * Update a single prop value
   */
  const updateProp = (name: string, value: any) => {
    setProps(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Generate code snippet for current configuration
   */
  const generateCodeSnippet = () => {
    if (!currentComponent) return "";

    const propsString = Object.entries(props)
      .filter(([_, value]) => value !== undefined && value !== "")
      .map(([key, value]) => {
        if (typeof value === "string") return `${key}="${value}"`;
        if (typeof value === "boolean") return value ? key : "";
        return `${key}={${JSON.stringify(value)}}`;
      })
      .filter(Boolean)
      .join("\n  ");

    return `<${currentComponent.name}${propsString ? `\n  ${propsString}` : ""}\n/>`;
  };

  /**
   * Copy code snippet to clipboard
   */
  const copyCodeSnippet = async () => {
    const code = generateCodeSnippet();
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /**
   * Render the selected component with current props
   */
  const renderComponent = () => {
    if (!currentComponent) return null;

    switch (selectedComponent) {
      case "hero":
        return (
          <Hero
            title={props.title}
            description={props.description}
            primaryButtonText={props.showButtons ? props.primaryButtonText : undefined}
            secondaryButtonText={props.showButtons ? props.secondaryButtonText : undefined}
          />
        );
      
      case "archive-header":
        return (
          <ArchiveHeader
            title={props.title}
            description={props.description}
            count={props.showCount ? props.count : undefined}
          />
        );
      
      case "section-header":
        return (
          <SectionHeaderPattern
            title={props.title}
            subtitle={props.showSubtitle ? props.subtitle : undefined}
            description={props.showDescription ? props.description : undefined}
          />
        );
      
      case "card-grid":
        return (
          <CardGrid columns={parseInt(props.columns)} gap={parseInt(props.gap)}>
            {TOURS.slice(0, 6).map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </CardGrid>
        );
      
      case "team-grid":
        return (
          <CardGrid columns={parseInt(props.columns)}>
            {TEAM.slice(0, parseInt(props.columns) * 2).map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </CardGrid>
        );
      
      case "cta":
        return (
          <CTA
            title={props.title || "Ready to Start?"}
            description={props.description}
            primaryAction={{
              label: props.buttonText || "Get Started",
              href: "#"
            }}
          />
        );
      
      case "faq":
        return (
          <FAQ
            title={props.showTitle ? props.title : undefined}
            items={FAQ_GENERAL.slice(0, 5)}
          />
        );
      
      case "editorial-content":
        return (
          <EditorialContent
            title={props.showTitle ? props.title : undefined}
            content="This is sample editorial content. In a real implementation, this would be rich text from the WordPress editor with proper formatting, links, and embedded media."
          />
        );
      
      case "fast-facts":
        return (
          <FastFacts
            title={props.showTitle ? props.title : undefined}
            facts={[
              { label: "Duration", value: "7 Days" },
              { label: "Difficulty", value: "Moderate" },
              { label: "Group Size", value: "12 Max" },
              { label: "Best Time", value: "May-Sep" },
            ]}
          />
        );
      
      case "taxonomy-nav":
        return (
          <TaxonomyNav
            label={props.showLabel ? props.label : undefined}
            items={TRAVEL_STYLES}
            activeSlug="adventure"
          />
        );
      
      case "breadcrumbs":
        return (
          <BreadcrumbsPattern
            items={[
              { label: "Home", href: "/" },
              { label: "Tours", href: "/tours" },
              { label: "Iceland Explorer", href: "/tours/iceland-explorer" },
            ]}
          />
        );
      
      case "pagination":
        return (
          <Pagination
            currentPage={props.currentPage}
            totalPages={props.totalPages}
            onPageChange={() => {}}
          />
        );
      
      case "table-of-contents":
        return (
          <TableOfContentsPattern
            title={props.title}
            items={[
              { id: "overview", label: "Overview" },
              { id: "itinerary", label: "Itinerary" },
              { id: "inclusions", label: "What's Included" },
              { id: "reviews", label: "Reviews" },
            ]}
          />
        );
      
      case "contact-form":
        return (
          <ContactFormPattern
            title={props.showTitle ? props.title : undefined}
          />
        );
      
      case "related-content":
        return (
          <RelatedContent
            title={props.title}
            items={TOURS.slice(0, parseInt(props.columns))}
            type="tours"
          />
        );
      
      case "tour-card":
        return <TourCard tour={TOURS[0]} />;
      
      case "destination-card":
        return <DestinationCard destination={DESTINATIONS[0]} />;
      
      case "blog-card":
        return <BlogCard post={BLOG_POSTS[0]} />;
      
      case "accommodation-card":
        return <AccommodationCard accommodation={ACCOMMODATION[0]} />;
      
      case "special-card":
        return <SpecialCard special={SPECIALS[0]} />;
      
      case "team-card":
        return <TeamCard member={TEAM[0]} />;
      
      case "logo":
        return (
          <div className="flex items-center justify-center p-8 bg-muted/50 rounded-lg">
            <Logo />
          </div>
        );
      
      case "back-to-top":
        return (
          <div className="relative h-96 bg-muted/50 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Scroll down to see the Back to Top button</p>
            <BackToTopButton />
          </div>
        );
      
      case "scroll-down":
        return (
          <div className="relative h-96 bg-muted/50 rounded-lg flex items-center justify-center">
            <ScrollDownArrow />
          </div>
        );
      
      case "theme-switcher":
        return (
          <div className="flex items-center justify-center p-8 bg-muted/50 rounded-lg">
            <ThemeSwitcher />
          </div>
        );
      
      default:
        return <div className="p-8 text-center text-muted-foreground">Component preview not available</div>;
    }
  };

  /**
   * Initialize props on mount
   */
  useState(() => {
    initializeProps(selectedComponent);
  });

  return (
    <>
      <DevToolsBreadcrumbs currentPage="Component Showcase" />
      <div className="min-h-screen bg-muted/30">
        {/* Page Header */}
        <div className="border-b bg-card">
          <Container>
            {/* Breadcrumbs */}
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Developer Tools', href: '/dev-tools' },
                { label: 'Component Showcase', isCurrent: true }
              ]}
            />
            
            <div className="py-8 flex flex-col gap-2">
              <h1>Component Showcase</h1>
              <p className="text-muted-foreground">
                Interactive preview system for testing components with live prop editors
              </p>
            </div>
          </Container>
        </div>

        <Container>
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-gap-lg py-section-sm">
            {/* Sidebar - Component Selector */}
            <aside className="flex flex-col gap-6">
              {/* Search and Filter */}
              <Card>
                <CardHeader>
                  <CardTitle>Filter Components</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search components..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="category-filter">Category</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger id="category-filter">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>
                            {cat === "all" ? "All Categories" : `${cat}s`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Results Count */}
                  <p className="text-sm text-muted-foreground">
                    {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''} found
                  </p>
                </CardContent>
              </Card>

              {/* Component List */}
              <Card>
                <CardHeader>
                  <CardTitle>Components</CardTitle>
                  <CardDescription>Select a component to preview</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-1 max-h-[600px] overflow-y-auto">
                  {categories.filter(cat => cat !== "all").map(category => {
                    const categoryComponents = filteredComponents.filter(c => c.category === category);
                    if (categoryComponents.length === 0) return null;

                    return (
                      <div key={category}>
                        <div className="px-3 py-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            {category}s ({categoryComponents.length})
                          </p>
                        </div>
                        {categoryComponents.map(component => (
                          <button
                            key={component.id}
                            onClick={() => handleComponentChange(component.id)}
                            className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-accent ${
                              selectedComponent === component.id ? "bg-accent" : ""
                            }`}
                          >
                            {component.name}
                          </button>
                        ))}
                      </div>
                    );
                  })}

                  {filteredComponents.length === 0 && (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      No components match your search
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Component Info */}
              {currentComponent && (
                <Card>
                  <CardHeader>
                    <CardTitle>Info</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <Label>Description</Label>
                      <p className="text-sm text-muted-foreground">{currentComponent.description}</p>
                    </div>
                    {currentComponent.wpEquivalent && (
                      <div className="flex flex-col gap-1">
                        <Label>WordPress Equivalent</Label>
                        <p className="text-sm text-muted-foreground">{currentComponent.wpEquivalent}</p>
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      <Label>Category</Label>
                      <div>
                        <Badge variant="secondary">{currentComponent.category}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </aside>

            {/* Main Content - Preview & Controls */}
            <div className="flex flex-col gap-6">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="props">Props</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>

                {/* Preview Tab */}
                <TabsContent value="preview" className="flex flex-col gap-4">
                  {/* Viewport Controls */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Viewport</CardTitle>
                        <div className="flex gap-2">
                          {VIEWPORTS.map(vp => {
                            const Icon = vp.icon;
                            return (
                              <Button
                                key={vp.value}
                                variant={viewport === vp.value ? "default" : "outline"}
                                size="sm"
                                onClick={() => setViewport(vp.value)}
                              >
                                <Icon className="h-4 w-4" />
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Component Preview */}
                  <Card>
                    <CardContent className="p-0">
                      <div className="flex justify-center overflow-auto bg-background p-8">
                        <div
                          className="max-w-full"
                          style={{
                            '--viewport-width': VIEWPORTS.find(v => v.value === viewport)?.width,
                            width: 'var(--viewport-width)',
                          } as React.CSSProperties}
                        >
                          {renderComponent()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Props Editor Tab */}
                <TabsContent value="props" className="flex flex-col gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Props Editor</CardTitle>
                      <CardDescription>
                        Modify component properties in real-time
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      {currentComponent?.props.map(propConfig => (
                        <div key={propConfig.name} className="flex flex-col gap-2">
                          <Label htmlFor={propConfig.name}>{propConfig.label}</Label>
                          {propConfig.description && (
                            <p className="text-xs text-muted-foreground">{propConfig.description}</p>
                          )}
                          
                          {/* Text Input */}
                          {propConfig.type === "text" && (
                            <Input
                              id={propConfig.name}
                              value={props[propConfig.name] || ""}
                              onChange={(e) => updateProp(propConfig.name, e.target.value)}
                              placeholder={propConfig.defaultValue}
                            />
                          )}

                          {/* Textarea */}
                          {propConfig.type === "textarea" && (
                            <Textarea
                              id={propConfig.name}
                              value={props[propConfig.name] || ""}
                              onChange={(e) => updateProp(propConfig.name, e.target.value)}
                              placeholder={propConfig.defaultValue}
                              rows={3}
                            />
                          )}

                          {/* Number Input */}
                          {propConfig.type === "number" && (
                            <Input
                              id={propConfig.name}
                              type="number"
                              value={props[propConfig.name] || ""}
                              onChange={(e) => updateProp(propConfig.name, parseInt(e.target.value))}
                            />
                          )}

                          {/* Boolean Switch */}
                          {propConfig.type === "boolean" && (
                            <div className="flex items-center gap-2">
                              <Switch
                                id={propConfig.name}
                                checked={props[propConfig.name] || false}
                                onCheckedChange={(checked) => updateProp(propConfig.name, checked)}
                              />
                              <Label htmlFor={propConfig.name} className="cursor-pointer">
                                {props[propConfig.name] ? "Enabled" : "Disabled"}
                              </Label>
                            </div>
                          )}

                          {/* Select Dropdown */}
                          {propConfig.type === "select" && (
                            <Select
                              value={props[propConfig.name]}
                              onValueChange={(value) => updateProp(propConfig.name, value)}
                            >
                              <SelectTrigger id={propConfig.name}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {propConfig.options?.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                      ))}

                      {currentComponent?.props.length === 0 && (
                        <p className="text-sm text-muted-foreground">
                          This component has no configurable props.
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Code Tab */}
                <TabsContent value="code" className="flex flex-col gap-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Code Snippet</CardTitle>
                          <CardDescription>
                            Copy this code to use the component with current props
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyCodeSnippet}
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <pre className="overflow-auto rounded-md bg-muted p-4">
                        <code className="text-sm">{generateCodeSnippet()}</code>
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Footer - Quick Links */}
              <Card>
                <CardContent className="p-6">
                  <div className="wp-pattern-card-grid__container wp-pattern-card-grid__container--cols-2">
                    <div className="flex flex-col gap-2">
                      <h3>
                        Component Stats
                      </h3>
                      <div className="flex flex-col gap-1 text-sm">
                        <p className="text-muted-foreground">
                          <span className="font-sans font-semibold">
                            {COMPONENTS.length}
                          </span>{' '}
                          total components
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-sans font-semibold">
                            {COMPONENTS.filter(c => c.category === 'Pattern').length}
                          </span>{' '}
                          patterns
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-sans font-semibold">
                            {COMPONENTS.filter(c => c.category === 'Block').length}
                          </span>{' '}
                          blocks
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-sans font-semibold">
                            {COMPONENTS.filter(c => c.category === 'Card').length}
                          </span>{' '}
                          cards
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-sans font-semibold">
                            {COMPONENTS.filter(c => c.category === 'Common').length}
                          </span>{' '}
                          common utilities
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3>
                        Quick Links
                      </h3>
                      <div className="flex flex-col gap-2">
                        <button 
                          type="button"
                          onClick={() => {
                            alert('Use the "Templates" button in the top-left corner to browse all page templates!');
                          }}
                          className="block text-sm text-primary hover:underline font-sans font-medium cursor-pointer bg-transparent border-none p-0"
                        >
                          Template Browser →
                        </button>
                        <p className="text-xs text-muted-foreground">
                          Browse all {filteredComponents.length === COMPONENTS.length ? COMPONENTS.length : `${filteredComponents.length}/${COMPONENTS.length}`} components with advanced filtering
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}