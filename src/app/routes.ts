/**
 * React Router route configuration.
 * 
 * Defines all application routes mapping to WordPress template hierarchy.
 * Uses React.lazy() for code-splitting — only the active page loads into memory.
 * 
 * @module routes
 * @category routing
 */

import { lazy } from "react";
import { createBrowserRouter, type RouteObject } from "react-router";

// Root Layout (always loaded — it's the shell)
import { RootLayout } from "./components/layout/RootLayout";

// --- Lazy-loaded page components ---

// Core Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Tours
const ToursArchive = lazy(() => import("./pages/ToursArchive"));
const TourSingle = lazy(() => import("./pages/TourSingle"));
const ToursArchiveNew = lazy(() => import("./pages/ToursArchiveNew"));
const TourSingleNew = lazy(() => import("./pages/TourSingleNew"));
const TourGalleryPage = lazy(() => import("./pages/TourGalleryPage"));

// Destinations
const DestinationsArchive = lazy(() => import("./pages/DestinationsArchive"));
const DestinationSingle = lazy(() => import("./pages/DestinationSingle"));
const DestinationsArchiveEnhanced = lazy(() => import("./pages/DestinationsArchiveEnhanced"));
const DestinationsArchiveTest = lazy(() => import("./pages/DestinationsArchiveTest"));
const DestinationsArchiveSimple = lazy(() => import("./pages/DestinationsArchiveSimple"));
const ArchiveDestinationTemplate = lazy(() => import("./templates/ArchiveDestinationTemplate"));
const DestinationRouter = lazy(() => import("./pages/DestinationRouter"));

// Accommodation
const AccommodationArchive = lazy(() => import("./pages/AccommodationArchive"));
const AccommodationSingle = lazy(() => import("./pages/AccommodationSingle"));

// Blog
const BlogArchive = lazy(() => import("./pages/BlogArchive"));
const BlogSingle = lazy(() => import("./pages/BlogSingle"));

// Team
const TeamArchive = lazy(() => import("./pages/TeamArchive"));
const TeamSingle = lazy(() => import("./pages/TeamSingle"));

// Specials
const SpecialsArchive = lazy(() => import("./pages/SpecialsArchive"));
const SpecialSingle = lazy(() => import("./pages/SpecialSingle"));

// Reviews
const ReviewsArchive = lazy(() => import("./pages/ReviewsArchive"));
const ReviewSingle = lazy(() => import("./pages/ReviewSingle"));
const ReviewsHubPage = lazy(() => import("./pages/ReviewsHubPage"));

// Taxonomy
const TaxonomyArchive = lazy(() => import("./pages/TaxonomyArchive"));

// Taxonomy Hubs
const TravelStylesHubPage = lazy(() => import("./pages/TravelStylesHubPage"));
const TravellerTypesHubPage = lazy(() => import("./pages/TravellerTypesHubPage"));
const AccommodationTypesHubPage = lazy(() => import("./pages/AccommodationTypesHubPage"));
const BrandsArchivePage = lazy(() => import("./pages/BrandsArchivePage"));
const FacilitiesHubPage = lazy(() => import("./pages/FacilitiesHubPage"));

// Utility Pages
const FAQPage = lazy(() => import("./pages/FAQPage"));
const FAQsArchivePage = lazy(() => import("./pages/FAQsArchivePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsConditionsPage = lazy(() => import("./pages/TermsConditionsPage"));
const WhyBookWithUsPage = lazy(() => import("./pages/WhyBookWithUsPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));

// Conversion Pages
const QuoteRequestPage = lazy(() => import("./pages/QuoteRequestPage"));
const DestinationGuidesHubPage = lazy(() => import("./pages/DestinationGuidesHubPage"));
const TravelInsurancePage = lazy(() => import("./pages/TravelInsurancePage"));
const NewsletterSignupPage = lazy(() => import("./pages/NewsletterSignupPage"));
const PackingGuidesPage = lazy(() => import("./pages/PackingGuidesPage"));
const SustainabilityPage = lazy(() => import("./pages/SustainabilityPage"));

// Booking & Account
const BookingPage = lazy(() => import("./pages/BookingPage"));
const BookingConfirmationPage = lazy(() => import("./pages/BookingConfirmationPage"));
const BookingConfirmationPageEnhanced = lazy(() => import("./pages/BookingConfirmationPageEnhanced"));
const BookingManagementPage = lazy(() => import("./pages/BookingManagementPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SavedPassengersPage = lazy(() => import("./pages/SavedPassengersPage"));
const AccountSettingsPage = lazy(() => import("./pages/AccountSettingsPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const TourComparisonPage = lazy(() => import("./pages/TourComparisonPage"));
const TripPlannerPage = lazy(() => import("./pages/TripPlannerPage"));

// Itinerary & Loyalty
const ItineraryBuilderPage = lazy(() => import("./pages/ItineraryBuilderPage"));
const LoyaltyRewardsPage = lazy(() => import("./pages/LoyaltyRewardsPage"));

// Search
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"));
const AdvancedSearchResultsPage = lazy(() => import("./pages/AdvancedSearchResultsPage"));

// Developer Tools
const DevToolsPage = lazy(() => import("./pages/DevToolsPage"));
const TemplateTester = lazy(() => import("./pages/TemplateTester"));
const ComponentShowcase = lazy(() => import("./pages/ComponentShowcase"));
const ComponentAPIReference = lazy(() => import("./pages/ComponentAPIReference"));
const BlockDocumentation = lazy(() => import("./pages/BlockDocumentation"));
const DesignBlocksShowcase = lazy(() => import("./pages/DesignBlocksShowcase"));
const ThemeBlocksShowcase = lazy(() => import("./pages/ThemeBlocksShowcase"));
const HeaderFooterComparison = lazy(() => import("./pages/HeaderFooterComparison"));
const ButtonShowcase = lazy(() => import("./pages/ButtonShowcase"));
const SectionStylesShowcase = lazy(() => import("./pages/SectionStylesShowcase"));
const IconLibrary = lazy(() => import("./pages/IconLibrary"));
const LivePreview = lazy(() => import("./pages/LivePreview"));
const StyleGuide = lazy(() => import("./pages/StyleGuide"));
const DesignSystemShowcase = lazy(() => import("./pages/DesignSystemShowcase"));
const DesignSystemExample = lazy(() => import("./pages/DesignSystemExample"));
const DesignSystemVerification = lazy(() => import("./pages/DesignSystemVerification"));
const ComponentLibrary = lazy(() => import("./pages/ComponentLibrary"));
const NotificationBannerExamples = lazy(() => import("./pages/NotificationBannerExamples"));
const Diagnostic = lazy(() => import("./pages/Diagnostic"));
const OrganicDemo = lazy(() => import("./pages/OrganicDemo"));
const OrganicLandingPage = lazy(() => import("./pages/OrganicLandingPage"));
const DayAndDuskPage = lazy(() => import("./pages/DayAndDuskPage"));

// Dev Tools Sub-pages
const AccessibilityAudit = lazy(() => import("./pages/dev-tools/AccessibilityAudit"));
const AnalyticsDashboard = lazy(() => import("./pages/dev-tools/AnalyticsDashboard"));
const CodeQualityDashboard = lazy(() => import("./pages/dev-tools/CodeQualityDashboard"));
const DeploymentReadiness = lazy(() => import("./pages/dev-tools/DeploymentReadiness"));
const DesignSystemPlayground = lazy(() => import("./pages/dev-tools/DesignSystemPlayground"));
const DesignTokensReference = lazy(() => import("./pages/dev-tools/DesignTokensReference"));
const DocumentationGenerator = lazy(() => import("./pages/dev-tools/DocumentationGenerator"));
const IntegrationTester = lazy(() => import("./pages/dev-tools/IntegrationTester"));
const PerformanceMonitor = lazy(() => import("./pages/dev-tools/PerformanceMonitor"));
const SnippetGenerator = lazy(() => import("./pages/dev-tools/SnippetGenerator"));
const VisualRegressionTester = lazy(() => import("./pages/dev-tools/VisualRegressionTester"));
const DevToolsIndex = lazy(() => import("./pages/dev-tools/index"));
const TypographySpecimens = lazy(() => import("./pages/dev-tools/TypographySpecimens"));
const SpacingScale = lazy(() => import("./pages/dev-tools/SpacingScale"));
const ShadowScale = lazy(() => import("./pages/dev-tools/ShadowScale"));
const RadiusSpecimens = lazy(() => import("./pages/dev-tools/RadiusSpecimens"));
const CardInteractions = lazy(() => import("./pages/dev-tools/CardInteractions"));
const AnimationsShowcase = lazy(() => import("./pages/dev-tools/AnimationsShowcase"));

const routes: RouteObject[] = [
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      {
        path: "tours",
        children: [
          { index: true, Component: ToursArchive },
          { path: "new", Component: ToursArchiveNew },
          { path: "travel-style/:slug", Component: TaxonomyArchive },
          { path: ":slug", Component: TourSingle },
          { path: ":slug/new", Component: TourSingleNew },
          { path: ":slug/gallery", Component: TourGalleryPage },
        ],
      },
      {
        path: "destinations",
        children: [
          { index: true, Component: DestinationsArchive },
          { path: "simple", Component: DestinationsArchiveSimple },
          { path: "test", Component: DestinationsArchiveTest },
          { path: "enhanced", Component: DestinationsArchiveEnhanced },
          { path: "old", Component: ArchiveDestinationTemplate },
          { path: ":slug", Component: DestinationRouter },
        ],
      },
      {
        path: "accommodation",
        children: [
          { index: true, Component: AccommodationArchive },
          { path: ":slug", Component: AccommodationSingle },
        ],
      },
      {
        path: "blog",
        children: [
          { index: true, Component: BlogArchive },
          { path: ":slug", Component: BlogSingle },
        ],
      },
      {
        path: "team",
        children: [
          { index: true, Component: TeamArchive },
          { path: ":slug", Component: TeamSingle },
        ],
      },
      {
        path: "specials",
        children: [
          { index: true, Component: SpecialsArchive },
          { path: ":slug", Component: SpecialSingle },
        ],
      },
      {
        path: "reviews",
        children: [
          { index: true, Component: ReviewsArchive },
          { path: "hub", Component: ReviewsHubPage },
          { path: ":slug", Component: ReviewSingle },
        ],
      },
      { path: "travel-styles", Component: TravelStylesHubPage },
      { path: "travel-styles/:slug", Component: TaxonomyArchive },
      { path: "traveller-types", Component: TravellerTypesHubPage },
      { path: "traveller-types/:slug", Component: TaxonomyArchive },
      { path: "continents/:slug", Component: TaxonomyArchive },
      { path: "accommodation-types", Component: AccommodationTypesHubPage },
      { path: "accommodation-types/:slug", Component: TaxonomyArchive },
      { path: "brands", Component: BrandsArchivePage },
      { path: "brands/:slug", Component: TaxonomyArchive },
      { path: "facilities", Component: FacilitiesHubPage },
      { path: "facilities/:slug", Component: TaxonomyArchive },
      { path: "categories/:slug", Component: TaxonomyArchive },
      { path: "tags/:slug", Component: TaxonomyArchive },
      { path: "faq", Component: FAQPage },
      { path: "faqs", Component: FAQsArchivePage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
      { path: "privacy-policy", Component: PrivacyPolicyPage },
      { path: "terms-conditions", Component: TermsConditionsPage },
      { path: "why-book-with-us", Component: WhyBookWithUsPage },
      { path: "sitemap", Component: SitemapPage },
      { path: "quote-request", Component: QuoteRequestPage },
      { path: "destination-guides", Component: DestinationGuidesHubPage },
      { path: "travel-insurance", Component: TravelInsurancePage },
      { path: "newsletter", Component: NewsletterSignupPage },
      { path: "packing-guides", Component: PackingGuidesPage },
      { path: "sustainability", Component: SustainabilityPage },
      { path: "booking/:tourId", Component: BookingPage },
      { path: "booking-confirmation", Component: BookingConfirmationPage },
      { path: "booking-confirmation-enhanced", Component: BookingConfirmationPageEnhanced },
      { path: "booking-management", Component: BookingManagementPage },
      { path: "payment", Component: PaymentPage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "profile", Component: ProfilePage },
      { path: "saved-passengers", Component: SavedPassengersPage },
      { path: "account-settings", Component: AccountSettingsPage },
      { path: "wishlist", Component: WishlistPage },
      { path: "tour-comparison", Component: TourComparisonPage },
      { path: "trip-planner", Component: TripPlannerPage },
      { path: "itinerary-builder", Component: ItineraryBuilderPage },
      { path: "loyalty-rewards", Component: LoyaltyRewardsPage },
      { path: "search", Component: SearchResultsPage },
      { path: "advanced-search", Component: AdvancedSearchResultsPage },
      {
        path: "dev-tools",
        children: [
          { index: true, Component: DevToolsPage },
          { path: "template-tester", Component: TemplateTester },
          { path: "component-showcase", Component: ComponentShowcase },
          { path: "component-api-reference", Component: ComponentAPIReference },
          { path: "block-documentation", Component: BlockDocumentation },
          { path: "design-blocks-showcase", Component: DesignBlocksShowcase },
          { path: "theme-blocks-showcase", Component: ThemeBlocksShowcase },
          { path: "header-footer-comparison", Component: HeaderFooterComparison },
          { path: "button-showcase", Component: ButtonShowcase },
          { path: "section-styles-showcase", Component: SectionStylesShowcase },
          { path: "icon-library", Component: IconLibrary },
          { path: "live-preview", Component: LivePreview },
          { path: "style-guide", Component: StyleGuide },
          { path: "design-system-showcase", Component: DesignSystemShowcase },
          { path: "design-system-example", Component: DesignSystemExample },
          { path: "design-system-verification", Component: DesignSystemVerification },
          { path: "component-library", Component: ComponentLibrary },
          { path: "notification-examples", Component: NotificationBannerExamples },
          { path: "accessibility-audit", Component: AccessibilityAudit },
          { path: "analytics-dashboard", Component: AnalyticsDashboard },
          { path: "code-quality-dashboard", Component: CodeQualityDashboard },
          { path: "deployment-readiness", Component: DeploymentReadiness },
          { path: "design-system-playground", Component: DesignSystemPlayground },
          { path: "design-tokens-reference", Component: DesignTokensReference },
          { path: "documentation-generator", Component: DocumentationGenerator },
          { path: "integration-tester", Component: IntegrationTester },
          { path: "performance-monitor", Component: PerformanceMonitor },
          { path: "snippet-generator", Component: SnippetGenerator },
          { path: "visual-regression-tester", Component: VisualRegressionTester },
          { path: "dev-tools-index", Component: DevToolsIndex },
          { path: "typography-specimens", Component: TypographySpecimens },
          { path: "typography", Component: TypographySpecimens },
          { path: "spacing-scale", Component: SpacingScale },
          { path: "shadow-scale", Component: ShadowScale },
          { path: "radius-specimens", Component: RadiusSpecimens },
          { path: "card-interactions", Component: CardInteractions },
          { path: "animations-showcase", Component: AnimationsShowcase },
        ],
      },
      { path: "diagnostic", Component: Diagnostic },
      { path: "organic-demo", Component: OrganicDemo },
      { path: "organic-demo/landing-page", Component: OrganicLandingPage },
      { path: "organic-demo/day-and-dusk-page", Component: DayAndDuskPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
];

export const router = createBrowserRouter(routes);