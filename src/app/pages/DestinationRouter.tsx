/**
 * Destination Router - Smart Template Routing
 * 
 * Detects destination type and routes to the appropriate page template:
 * - Countries → DestinationCountryPage
 * - Regions/Cities/Parks → DestinationRegionPage
 * - Legacy destinations → DestinationSingle
 * 
 * Uses static imports to avoid dynamic import errors in this environment.
 * All styling uses CSS custom properties from design system.
 * 
 * @module DestinationRouter
 * @category pages
 */

import { useParams } from "react-router";
import { AppLink as Link } from "../components/common/AppLink";
import { DESTINATIONS } from "../data/mock";
import { Container } from "../components/common/Container";
import { useNavigation } from "../contexts/NavigationContext";

// Static imports for page templates
import DestinationCountryPage from "./DestinationCountryPage";
import DestinationRegionPage from "./DestinationRegionPage";
import DestinationSingle from "./DestinationSingle";

/**
 * Not found fallback component.
 */
function NotFoundFallback() {
  return (
    <section className="py-section-md bg-background">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="mb-4 text-4xl font-bold font-serif">Destination not found</h1>
          <p className="text-muted-foreground mb-12 italic font-serif">
            The territory you're looking for doesn't exist or has been removed from our catalog.
          </p>
          <Link 
            to="/destinations" 
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-widest no-underline hover:bg-primary/90 transition-all shadow-xl hover:-translate-y-1 active:translate-y-0"
          >
            Browse all territories
          </Link>
        </div>
      </Container>
    </section>
  );
}

/**
 * DestinationRouter - routes to appropriate template based on destination type.
 */
function DestinationRouter() {
  const { slug } = useParams<{ slug: string }>();
  const { currentPath } = useNavigation();
  
  // Find destination by slug
  const destination = DESTINATIONS.find((d) => d.slug === slug);

  // If destination not found
  if (!destination) {
    return <NotFoundFallback />;
  }

  // Route based on type
  const destinationType = destination.type;

  return (
    <>
      {destinationType === "country" && <DestinationCountryPage />}
      {(destinationType === "region" || destinationType === "city" || destinationType === "park") && (
        <DestinationRegionPage />
      )}
      {!destinationType && <DestinationSingle />}
    </>
  );
}

export default DestinationRouter;
export { DestinationRouter };