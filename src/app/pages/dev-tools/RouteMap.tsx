/**
 * Route Map — Developer Tool
 *
 * Visual map of all application routes organized by section.
 * Shows path, component name, and whether routes have children.
 * Lets developers quickly navigate to any page in the app.
 *
 * @module RouteMap
 * @category dev-tools
 */

import { useState, useMemo } from "react";
import { AppLink as Link } from "../../components/common/AppLink";
import { Container } from "../../components/common/Container";
import { DevToolsBreadcrumbs } from "../../components/common/DevToolsBreadcrumbs";
import {
  MapTrifold,
  TreeStructure,
  House,
  Compass,
  Bed,
  Article,
  Users,
  Star,
  ChatCircle,
  Wrench,
  User,
  MagnifyingGlass,
  Tag,
  ArrowRight,
  FunnelSimple,
} from "@phosphor-icons/react";

/* ------------------------------------------------------------------ */
/*  Route data — mirrors routes.ts structure                           */
/* ------------------------------------------------------------------ */

interface RouteInfo {
  path: string;
  component: string;
  hasChildren?: boolean;
}

interface RouteGroup {
  id: string;
  title: string;
  icon: React.ReactNode;
  routes: RouteInfo[];
}

const ROUTE_GROUPS: RouteGroup[] = [
  {
    id: "core",
    title: "Core Pages",
    icon: <House className="w-5 h-5" />,
    routes: [
      { path: "/", component: "HomePage" },
      { path: "/about", component: "AboutPage" },
      { path: "/contact", component: "ContactPage" },
      { path: "/faq", component: "FAQPage" },
      { path: "/faqs", component: "FAQsArchivePage" },
      { path: "/privacy-policy", component: "PrivacyPolicyPage" },
      { path: "/terms-conditions", component: "TermsConditionsPage" },
      { path: "/why-book-with-us", component: "WhyBookWithUsPage" },
      { path: "/sitemap", component: "SitemapPage" },
      { path: "/gallery", component: "GalleryPage" },
      { path: "/testimonials", component: "TestimonialsPage" },
      { path: "/partners", component: "PartnersPage" },
      { path: "/careers", component: "CareersPage" },
      { path: "/sustainability", component: "SustainabilityPage" },
    ],
  },
  {
    id: "tours",
    title: "Tours",
    icon: <Compass className="w-5 h-5" />,
    routes: [
      { path: "/tours", component: "ToursArchive" },
      { path: "/tours/new", component: "ToursArchiveNew" },
      { path: "/tours/travel-style/:slug", component: "TaxonomyArchive" },
      { path: "/tours/:slug", component: "TourSingle" },
      { path: "/tours/:slug/new", component: "TourSingleNew" },
      { path: "/tours/:slug/gallery", component: "TourGalleryPage" },
    ],
  },
  {
    id: "destinations",
    title: "Destinations",
    icon: <MapTrifold className="w-5 h-5" />,
    routes: [
      { path: "/destinations", component: "DestinationsArchive" },
      { path: "/destinations/old", component: "ArchiveDestinationTemplate" },
      { path: "/destinations/:slug", component: "DestinationRouter" },
    ],
  },
  {
    id: "accommodation",
    title: "Accommodation",
    icon: <Bed className="w-5 h-5" />,
    routes: [
      { path: "/accommodation", component: "AccommodationArchive" },
      { path: "/accommodation/:slug", component: "AccommodationSingle" },
    ],
  },
  {
    id: "blog",
    title: "Blog",
    icon: <Article className="w-5 h-5" />,
    routes: [
      { path: "/blog", component: "BlogArchive" },
      { path: "/blog/:slug", component: "BlogSingle" },
    ],
  },
  {
    id: "team",
    title: "Team",
    icon: <Users className="w-5 h-5" />,
    routes: [
      { path: "/team", component: "TeamArchive" },
      { path: "/team/:slug", component: "TeamSingle" },
    ],
  },
  {
    id: "specials",
    title: "Specials",
    icon: <Star className="w-5 h-5" />,
    routes: [
      { path: "/specials", component: "SpecialsArchive" },
      { path: "/specials/:slug", component: "SpecialSingle" },
    ],
  },
  {
    id: "reviews",
    title: "Reviews",
    icon: <ChatCircle className="w-5 h-5" />,
    routes: [
      { path: "/reviews", component: "ReviewsArchive" },
      { path: "/reviews/hub", component: "ReviewsHubPage" },
      { path: "/reviews/:slug", component: "ReviewSingle" },
    ],
  },
  {
    id: "taxonomies",
    title: "Taxonomy Hubs",
    icon: <Tag className="w-5 h-5" />,
    routes: [
      { path: "/travel-styles", component: "TravelStylesHubPage" },
      { path: "/travel-styles/:slug", component: "TaxonomyArchive" },
      { path: "/traveller-types", component: "TravellerTypesHubPage" },
      { path: "/traveller-types/:slug", component: "TaxonomyArchive" },
      { path: "/continents/:slug", component: "TaxonomyArchive" },
      { path: "/accommodation-types", component: "AccommodationTypesHubPage" },
      { path: "/accommodation-types/:slug", component: "TaxonomyArchive" },
      { path: "/brands", component: "BrandsArchivePage" },
      { path: "/brands/:slug", component: "TaxonomyArchive" },
      { path: "/facilities", component: "FacilitiesHubPage" },
      { path: "/facilities/:slug", component: "TaxonomyArchive" },
      { path: "/categories/:slug", component: "TaxonomyArchive" },
      { path: "/tags/:slug", component: "TaxonomyArchive" },
    ],
  },
  {
    id: "account",
    title: "Account & Booking",
    icon: <User className="w-5 h-5" />,
    routes: [
      { path: "/login", component: "LoginPage" },
      { path: "/register", component: "RegisterPage" },
      { path: "/account", component: "ProfilePage" },
      { path: "/account/profile", component: "ProfilePage" },
      { path: "/account/settings", component: "AccountSettingsPage" },
      { path: "/account/saved-passengers", component: "SavedPassengersPage" },
      { path: "/account/wishlist", component: "WishlistPage" },
      { path: "/account/bookings", component: "BookingManagementPage" },
      { path: "/account/loyalty-rewards", component: "LoyaltyRewardsPage" },
      { path: "/booking/:tourId", component: "BookingPage" },
      { path: "/booking-confirmation", component: "BookingConfirmationPage" },
      { path: "/payment", component: "PaymentPage" },
    ],
  },
  {
    id: "conversion",
    title: "Conversion & Tools",
    icon: <MagnifyingGlass className="w-5 h-5" />,
    routes: [
      { path: "/quote-request", component: "QuoteRequestPage" },
      { path: "/destination-guides", component: "DestinationGuidesHubPage" },
      { path: "/travel-insurance", component: "TravelInsurancePage" },
      { path: "/newsletter", component: "NewsletterSignupPage" },
      { path: "/packing-guides", component: "PackingGuidesPage" },
      { path: "/search", component: "SearchResultsPage" },
      { path: "/advanced-search", component: "AdvancedSearchResultsPage" },
      { path: "/tour-comparison", component: "TourComparisonPage" },
      { path: "/trip-planner", component: "TripPlannerPage" },
      { path: "/itinerary-builder", component: "ItineraryBuilderPage" },
    ],
  },
  {
    id: "devtools",
    title: "Developer Tools",
    icon: <Wrench className="w-5 h-5" />,
    routes: [
      { path: "/dev-tools", component: "DevToolsPage" },
      { path: "/dev-tools/route-map", component: "RouteMap" },
      { path: "/dev-tools/color-palette", component: "ColorPalette" },
      { path: "/dev-tools/breakpoint-debugger", component: "BreakpointDebugger" },
      { path: "/dev-tools/mock-data-explorer", component: "MockDataExplorer" },
      { path: "/dev-tools/grid-overlay", component: "GridOverlay" },
      { path: "/dev-tools/typography-specimens", component: "TypographySpecimens" },
      { path: "/dev-tools/spacing-scale", component: "SpacingScale" },
      { path: "/dev-tools/shadow-scale", component: "ShadowScale" },
      { path: "/dev-tools/radius-specimens", component: "RadiusSpecimens" },
      { path: "/dev-tools/card-interactions", component: "CardInteractions" },
      { path: "/dev-tools/animations-showcase", component: "AnimationsShowcase" },
      { path: "/dev-tools/button-showcase", component: "ButtonShowcase" },
      { path: "/dev-tools/design-tokens-reference", component: "DesignTokensReference" },
      { path: "/dev-tools/design-system-playground", component: "DesignSystemPlayground" },
      { path: "/dev-tools/component-showcase", component: "ComponentShowcase" },
      { path: "/dev-tools/icon-library", component: "IconLibrary" },
      { path: "/dev-tools/accessibility-audit", component: "AccessibilityAudit" },
      { path: "/dev-tools/code-quality-dashboard", component: "CodeQualityDashboard" },
      { path: "/dev-tools/performance-monitor", component: "PerformanceMonitor" },
      { path: "/dev-tools/analytics-dashboard", component: "AnalyticsDashboard" },
      { path: "/dev-tools/deployment-readiness", component: "DeploymentReadiness" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function RouteMap() {
  const [filter, setFilter] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const totalRoutes = useMemo(
    () => ROUTE_GROUPS.reduce((sum, g) => sum + g.routes.length, 0),
    [],
  );

  const filteredGroups = useMemo(() => {
    return ROUTE_GROUPS.filter((g) => !selectedGroup || g.id === selectedGroup)
      .map((g) => ({
        ...g,
        routes: g.routes.filter(
          (r) =>
            !filter ||
            r.path.toLowerCase().includes(filter.toLowerCase()) ||
            r.component.toLowerCase().includes(filter.toLowerCase()),
        ),
      }))
      .filter((g) => g.routes.length > 0);
  }, [filter, selectedGroup]);

  const filteredCount = filteredGroups.reduce((s, g) => s + g.routes.length, 0);

  return (
    <>
      <DevToolsBreadcrumbs currentPage="Route Map" />

      {/* Hero */}
      <section className="wp-devtool__hero">
        <Container>
          <div className="wp-devtool__hero-inner">
            <div className="wp-devtool__hero-badge">
              <TreeStructure className="w-4 h-4" />
              Route Map
            </div>
            <h1>Application Route Map</h1>
            <p className="wp-devtool__hero-description">
              Visual overview of all {totalRoutes} routes organized by section. Click any route to navigate directly.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="wp-devtool__section">
        <Container>
          <div className="wp-devtool__stats">
            <div className="wp-devtool__stat-card">
              <span className="wp-devtool__stat-value">{totalRoutes}</span>
              <span className="wp-devtool__stat-label">Total Routes</span>
            </div>
            <div className="wp-devtool__stat-card">
              <span className="wp-devtool__stat-value">{ROUTE_GROUPS.length}</span>
              <span className="wp-devtool__stat-label">Sections</span>
            </div>
            <div className="wp-devtool__stat-card">
              <span className="wp-devtool__stat-value">
                {ROUTE_GROUPS.reduce((s, g) => s + g.routes.filter((r) => r.path.includes(":")).length, 0)}
              </span>
              <span className="wp-devtool__stat-label">Dynamic Routes</span>
            </div>
            <div className="wp-devtool__stat-card">
              <span className="wp-devtool__stat-value">
                {ROUTE_GROUPS.reduce((s, g) => s + g.routes.filter((r) => !r.path.includes(":")).length, 0)}
              </span>
              <span className="wp-devtool__stat-label">Static Routes</span>
            </div>
          </div>

          {/* Search + Filter */}
          <div className="wp-devtool__section-header">
            <div className="wp-devtool__tab-bar">
              <label className="wp-devtool__grid-toggle" style={{ flex: "1 1 16rem", maxWidth: "24rem" }}>
                <FunnelSimple className="w-4 h-4" />
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search routes or components…"
                  className="wp-devtool__search-input"
                  style={{
                    border: "none",
                    background: "transparent",
                    outline: "none",
                    fontFamily: "var(--font-family-noto-sans)",
                    fontSize: "var(--text-sm)",
                    color: "var(--foreground)",
                    width: "100%",
                  }}
                  aria-label="Search routes"
                />
              </label>
              <button
                className={`wp-devtool__tab ${!selectedGroup ? "wp-devtool__tab--active" : ""}`}
                onClick={() => setSelectedGroup(null)}
              >
                All ({totalRoutes})
              </button>
              {ROUTE_GROUPS.map((g) => (
                <button
                  key={g.id}
                  className={`wp-devtool__tab ${selectedGroup === g.id ? "wp-devtool__tab--active" : ""}`}
                  onClick={() => setSelectedGroup(selectedGroup === g.id ? null : g.id)}
                >
                  {g.title} ({g.routes.length})
                </button>
              ))}
            </div>
            {filter && (
              <p className="wp-devtool__stat-label">
                Showing {filteredCount} of {totalRoutes} routes
              </p>
            )}
          </div>

          {/* Route Groups */}
          <div className="flex flex-col" style={{ gap: "var(--spacing-gap-md)" }}>
            {filteredGroups.map((group) => (
              <div key={group.id} className="wp-devtool__route-group">
                <div className="wp-devtool__route-group-header">
                  <div className="wp-devtool__route-group-icon">{group.icon}</div>
                  <h3 style={{ flex: 1 }}>{group.title}</h3>
                  <span className="wp-devtool__route-group-count">{group.routes.length} routes</span>
                </div>
                <div className="wp-devtool__route-list">
                  {group.routes.map((route) => {
                    const isDynamic = route.path.includes(":");
                    return (
                      <Link
                        key={route.path}
                        to={isDynamic ? "#" : route.path}
                        className="wp-devtool__route-item"
                        aria-label={`Navigate to ${route.path}`}
                      >
                        <span className="wp-devtool__route-path">
                          {route.path}
                          {isDynamic && (
                            <span style={{ color: "var(--accent)", fontWeight: "var(--font-weight-medium)" }}> (dynamic)</span>
                          )}
                        </span>
                        <span className="wp-devtool__route-component">
                          {route.component}
                          {!isDynamic && <ArrowRight className="w-3 h-3" style={{ display: "inline", verticalAlign: "middle" }} />}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
