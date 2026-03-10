/**
 * React Router route configuration.
 * 
 * Defines all application routes mapping to WordPress template hierarchy.
 * Uses static imports for all page components to avoid dynamic import errors.
 * 
 * @module routes
 * @category routing
 */

import { createBrowserRouter, type RouteObject } from "react-router";

// Root Layout
import { RootLayout } from "./components/layout/RootLayout";

// Core Pages
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

// Tours
import ToursArchive from "./pages/ToursArchive";
import TourSingle from "./pages/TourSingle";
import ToursArchiveNew from "./pages/ToursArchiveNew";
import TourSingleNew from "./pages/TourSingleNew";
import TourGalleryPage from "./pages/TourGalleryPage";

// Destinations
import DestinationsArchive from "./pages/DestinationsArchive";
import DestinationSingle from "./pages/DestinationSingle";
import DestinationsArchiveEnhanced from "./pages/DestinationsArchiveEnhanced";
import DestinationsArchiveTest from "./pages/DestinationsArchiveTest";
import DestinationsArchiveSimple from "./pages/DestinationsArchiveSimple";
import ArchiveDestinationTemplate from "./templates/ArchiveDestinationTemplate";

// Accommodation
import AccommodationArchive from "./pages/AccommodationArchive";
import AccommodationSingle from "./pages/AccommodationSingle";

// Blog
import BlogArchive from "./pages/BlogArchive";
import BlogSingle from "./pages/BlogSingle";

// Team
import TeamArchive from "./pages/TeamArchive";
import TeamSingle from "./pages/TeamSingle";

// Specials
import SpecialsArchive from "./pages/SpecialsArchive";
import SpecialSingle from "./pages/SpecialSingle";

// Reviews
import ReviewsArchive from "./pages/ReviewsArchive";
import ReviewSingle from "./pages/ReviewSingle";
import ReviewsHubPage from "./pages/ReviewsHubPage";

// Taxonomy
import TaxonomyArchive from "./pages/TaxonomyArchive";

// Utility Pages
import FAQPage from "./pages/FAQPage";
import FAQsArchivePage from "./pages/FAQsArchivePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsConditionsPage from "./pages/TermsConditionsPage";
import WhyBookWithUsPage from "./pages/WhyBookWithUsPage";
import SitemapPage from "./pages/SitemapPage";

// Conversion Pages
import QuoteRequestPage from "./pages/QuoteRequestPage";
import DestinationGuidesHubPage from "./pages/DestinationGuidesHubPage";
import TravelInsurancePage from "./pages/TravelInsurancePage";
import NewsletterSignupPage from "./pages/NewsletterSignupPage";
import PackingGuidesPage from "./pages/PackingGuidesPage";
import SustainabilityPage from "./pages/SustainabilityPage";

// Booking & Account
import BookingPage from "./pages/BookingPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import BookingConfirmationPageEnhanced from "./pages/BookingConfirmationPageEnhanced";
import BookingManagementPage from "./pages/BookingManagementPage";
import PaymentPage from "./pages/PaymentPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import SavedPassengersPage from "./pages/SavedPassengersPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import WishlistPage from "./pages/WishlistPage";
import TourComparisonPage from "./pages/TourComparisonPage";
import TripPlannerPage from "./pages/TripPlannerPage";

// Search
import SearchResultsPage from "./pages/SearchResultsPage";
import AdvancedSearchResultsPage from "./pages/AdvancedSearchResultsPage";

// Developer Tools
import DevToolsPage from "./pages/DevToolsPage";
import TemplateTester from "./pages/TemplateTester";
import ComponentShowcase from "./pages/ComponentShowcase";
import ComponentAPIReference from "./pages/ComponentAPIReference";
import BlockDocumentation from "./pages/BlockDocumentation";
import DesignBlocksShowcase from "./pages/DesignBlocksShowcase";
import ThemeBlocksShowcase from "./pages/ThemeBlocksShowcase";
import HeaderFooterComparison from "./pages/HeaderFooterComparison";
import ButtonShowcase from "./pages/ButtonShowcase";
import SectionStylesShowcase from "./pages/SectionStylesShowcase";
import IconLibrary from "./pages/IconLibrary";
import LivePreview from "./pages/LivePreview";
import StyleGuide from "./pages/StyleGuide";
import DesignSystemShowcase from "./pages/DesignSystemShowcase";
import DesignSystemExample from "./pages/DesignSystemExample";
import DesignSystemVerification from "./pages/DesignSystemVerification";
import ComponentLibrary from "./pages/ComponentLibrary";
import NotificationBannerExamples from "./pages/NotificationBannerExamples";
import Diagnostic from "./pages/Diagnostic";

// Dev Tools Sub-pages
import AccessibilityAudit from "./pages/dev-tools/AccessibilityAudit";
import AnalyticsDashboard from "./pages/dev-tools/AnalyticsDashboard";
import CodeQualityDashboard from "./pages/dev-tools/CodeQualityDashboard";
import DeploymentReadiness from "./pages/dev-tools/DeploymentReadiness";
import DesignSystemPlayground from "./pages/dev-tools/DesignSystemPlayground";
import DesignTokensReference from "./pages/dev-tools/DesignTokensReference";
import DocumentationGenerator from "./pages/dev-tools/DocumentationGenerator";
import IntegrationTester from "./pages/dev-tools/IntegrationTester";
import PerformanceMonitor from "./pages/dev-tools/PerformanceMonitor";
import SnippetGenerator from "./pages/dev-tools/SnippetGenerator";
import VisualRegressionTester from "./pages/dev-tools/VisualRegressionTester";
import DevToolsIndex from "./pages/dev-tools/index";
import TypographySpecimens from "./pages/dev-tools/TypographySpecimens";
import SpacingScale from "./pages/dev-tools/SpacingScale";
import ShadowScale from "./pages/dev-tools/ShadowScale";
import RadiusSpecimens from "./pages/dev-tools/RadiusSpecimens";
import CardInteractions from "./pages/dev-tools/CardInteractions";
import AnimationsShowcase from "./pages/dev-tools/AnimationsShowcase";

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
          { path: ":slug", Component: TourSingle },
          { path: ":slug/new", Component: TourSingleNew },
          { path: ":slug/gallery", Component: TourGalleryPage },
        ],
      },
      {
        path: "destinations",
        children: [
          { index: true, Component: DestinationsArchive },
          { path: "test", Component: DestinationsArchiveTest },
          { path: "enhanced", Component: DestinationsArchiveEnhanced },
          { path: "old", Component: ArchiveDestinationTemplate },
          { path: ":slug", Component: DestinationSingle },
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
      { path: "travel-styles/:slug", Component: TaxonomyArchive },
      { path: "continents/:slug", Component: TaxonomyArchive },
      { path: "accommodation-types/:slug", Component: TaxonomyArchive },
      { path: "brands/:slug", Component: TaxonomyArchive },
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
          { path: "typography", Component: TypographySpecimens }, // Alias for typography-specimens
          { path: "spacing-scale", Component: SpacingScale },
          { path: "shadow-scale", Component: ShadowScale },
          { path: "radius-specimens", Component: RadiusSpecimens },
          { path: "card-interactions", Component: CardInteractions },
          { path: "animations-showcase", Component: AnimationsShowcase },
        ],
      },
      { path: "diagnostic", Component: Diagnostic },
      { path: "*", Component: NotFoundPage },
    ],
  },
];

export const router = createBrowserRouter(routes);