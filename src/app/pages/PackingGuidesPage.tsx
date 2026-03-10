/**
 * Packing Lists & Safari Guides Page
 * 
 * Comprehensive packing lists, preparation guides, and safari planning
 * resources. Now uses PageShell for centralized breadcrumbs + hero.
 */

import { useState } from "react";
import { Container } from "../components/common/Container";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { HighlightsGridPattern } from "../components/patterns/HighlightsGridPattern";
import { StatisticsMetricsPattern } from "../components/patterns/StatisticsMetricsPattern";
import { SectionHeaderPattern } from "../components/patterns/SectionHeaderPattern";
import { PageShell } from "../components/parts/PageShell";
import { Button } from "../components/blocks/design/Button";
import { 
  Download, 
  Package,
  Camera,
  Heart,
  Sun,
  Spinner as LoaderCircle,
  Star,
  TrendUp as TrendingUp,
  ShieldCheck,
  CheckCircle as CircleCheck
} from "@phosphor-icons/react";
import {
  PACKING_LISTS
} from "../data/mock";
import { useNavigation } from "../contexts/NavigationContext";

export function PackingGuidesPage() {
  const { navigateTo } = useNavigation();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (listId: string) => {
    setDownloadingId(listId);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setDownloadingId(null);
    alert("Checklist download has started!");
  };

  const stats = [
    { value: "30k+", label: "Guides Downloaded", icon: Download },
    { value: "100%", label: "Accuracy Rate", icon: ShieldCheck },
    { value: "4.8", label: "Helpfulness", icon: Star, suffix: "/5" },
  ];

  return (
    <PageShell context="packing-guides">
      <StatisticsMetricsPattern statistics={stats} />

      {/* Popular Lists */}
      <section className="py-section-md">
        <Container>
          <SectionHeaderPattern
            title="Featured Preparation Checklists"
            description="Our most downloaded guides for safari success."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PACKING_LISTS.filter(list => list.featured).map((list) => (
              <div key={list.id} className="group p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-6">
                  <Package size={24} />
                </div>
                <h3 className="mb-3">{list.title}</h3>
                <p className="text-sm text-muted-foreground mb-8 flex-1">{list.description}</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-4">
                    <span className="text-foreground">{list.items.length} Points</span>
                    <span>{list.downloads.toLocaleString()} downloads</span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full rounded-xl"
                    disabled={downloadingId === list.id}
                    onClick={() => handleDownload(list.id)}
                  >
                    {downloadingId === list.id ? <LoaderCircle className="animate-spin" /> : "Download PDF"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories */}
      <HighlightsGridPattern
        title="Expert Recommendations"
        description="Focused advice for every aspect of your African journey."
        highlights={[
          { id: "c1", title: "Wildlife Photography", description: "Lenses, bodies, and accessories for the perfect shot.", icon: Camera },
          { id: "c2", title: "Health & Wellness", description: "Medical kits, preventative measures, and wellness tips.", icon: Heart },
          { id: "c3", title: "Seasonal Tech", description: "Solar power, connectivity, and digital essentials.", icon: TrendingUp },
          { id: "c4", title: "Sun Protection", description: "Clothing and gear for the intense African sun.", icon: Sun }
        ]}
        columns={4}
        variant="minimal"
      />

      {/* Practical Commitment */}
      <section className="py-section-md bg-muted/20 border-y border-border/50">
        <Container maxWidth="narrow">
          <SectionHeaderPattern
            title="The Safari Gear Promise"
            description="We believe in packing light and packing right. Our guides focus on essential quality over unnecessary quantity."
            centered
          />
          <div className="grid gap-4">
            {[
              "Neutral colors only (avoid brights and blues)",
              "Layering systems for variable temperatures",
              "Soft-sided luggage for bush flights",
              "Ethical photography equipment guidelines"
            ].map((promise, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border/50 m-0">
                <CircleCheck size={20} className="text-primary" />
                <span>{promise}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <FAQ
        title="Packing FAQ"
        intro="Answers to common questions about preparing for the wild."
        items={[
          { id: "p1", question: "What colors are best for safari?", answer: "Stick to neutral tones like khaki, olive, beige, and light brown. Avoid white (it gets dusty), black/dark blue (attracts tsetse flies), and camouflage (illegal in some countries).", category: "clothing" },
          { id: "p2", question: "How much luggage can I bring?", answer: "Most small aircraft have a strict 15kg (33lb) limit including hand luggage, and bags MUST be soft-sided with no wheels or frames.", category: "logistics" }
        ]}
      />

      {/* CTA */}
      <CTA
        title="Ready to Put Your Gear to the Test?"
        description="Now that you're prepared, let's find the perfect safari to match your style."
        variant="gradient"
        primaryAction={{ label: "Browse Safari Collection", onClick: () => navigateTo("/tours") }}
        secondaryAction={{ label: "Request a Tailored Quote", onClick: () => navigateTo("/contact") }}
      />
    </PageShell>
  );
}

export default PackingGuidesPage;
