/**
 * 404 Not Found Page component.
 */

import { Container } from "../components/common/Container";
import { Hero } from "../components/patterns/Hero";
import { HeadingBlock } from "../components/blocks/core/HeadingBlock";
import { ParagraphBlock } from "../components/blocks/core/ParagraphBlock";
import { Compass, MapPin, House as Home, Phone, ArrowLeft, MagnifyingGlass as Search } from "@phosphor-icons/react";
import { Button } from "../components/blocks/design/Button";
import { useNavigation } from "../contexts/NavigationContext";

export function NotFoundPage() {
  const { navigateTo } = useNavigation();

  const quickLinks = [
    { label: "Safari Collection", icon: Compass, path: "/tours", description: "Our most popular wildlife experiences" },
    { label: "Destinations", icon: MapPin, path: "/destinations", description: "Find where your next story begins" },
    { label: "Our Story", icon: Home, path: "/about", description: "Learn about our heritage and values" },
    { label: "Special Offers", icon: Search, path: "/specials", description: "Exclusive seasonal safari deals" },
  ];

  return (
    <article className="wp-template-page">
      {/* Hero */}
      <Hero context="not-found" />

      {/* Quick Navigation Grid */}
      <section className="py-section-lg bg-card border-b border-border/50">
        <Container>
          <div className="flex flex-col items-center text-center pb-element-2xl max-w-2xl self-center">
            <HeadingBlock level={2}>Where to Next?</HeadingBlock>
            <ParagraphBlock className="text-muted-foreground">
              Don't let a wrong turn end your adventure. Choose one of our base camps below to get back on track.
            </ParagraphBlock>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-fluid-lg">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => navigateTo(link.path)}
                  className="group flex flex-col items-center text-center gap-element-lg p-element-xl rounded-[var(--radius-3xl)] bg-background border-2 border-border/50 hover:border-primary hover:shadow-2xl transition-all duration-500"
                >
                  <div className="size-16 rounded-[var(--radius-2xl)] bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <Icon className="size-8" />
                  </div>
                  <div className="flex flex-col gap-element-sm">
                    <h3 className="text-[length:var(--text-xl)] font-[var(--font-weight-bold)] font-[family-name:var(--font-family-lora)] group-hover:text-primary transition-colors">
                      {link.label}
                    </h3>
                    <p className="text-[length:var(--text-sm)] text-muted-foreground leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Support Message */}
      <section className="py-element-2xl bg-muted/30">
        <Container maxWidth="narrow">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-fluid-lg text-center sm:text-left">
            <div className="p-element-md rounded-[var(--radius-full)] bg-background border-2 border-border shadow-sm">
              <Phone className="size-6 text-primary" />
            </div>
            <div className="flex flex-col gap-element-xs">
              <p className="text-foreground font-[var(--font-weight-bold)] font-[family-name:var(--font-family-noto-sans)]">Still lost in the wilderness?</p>
              <ParagraphBlock className="text-muted-foreground text-[length:var(--text-sm)] m-0">
                Our safari designers are available 24/7 to help you find what you need. 
                <button 
                  onClick={() => navigateTo("/contact")}
                  className="text-primary font-[var(--font-weight-bold)] hover:underline"
                >
                  Contact Support
                </button>
              </ParagraphBlock>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}

export default NotFoundPage;