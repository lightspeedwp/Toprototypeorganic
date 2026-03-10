/**
 * Destination Guides Hub Page - Conversion Optimization Page
 * 
 * Comprehensive destination guides with downloadable PDFs and expert travel advice.
 * Now uses PageShell for centralized breadcrumbs + hero.
 */

import { useState } from "react";
import { Container } from "../components/common/Container";
import { CTA } from "../components/patterns/CTA";
import { FAQ } from "../components/patterns/FAQ";
import { SectionHeaderPattern } from "../components/patterns/SectionHeaderPattern";
import { StatisticsMetricsPattern } from "../components/patterns/StatisticsMetricsPattern";
import { HighlightsGridPattern } from "../components/patterns/HighlightsGridPattern";
import { PageShell } from "../components/parts/PageShell";
import { Button } from "../components/blocks/design/Button";
import { 
  Download, 
  MapPin, 
  BookOpen, 
  FileText,
  Calendar,
  Star,
  CheckCircle as CircleCheck,
  Spinner as LoaderCircle
} from "@phosphor-icons/react";
import { useNavigation } from "../contexts/NavigationContext";

const GUIDES = [
  {
    id: "kenya-complete",
    title: "Complete Kenya Safari Guide",
    destination: "Kenya",
    description: "Everything you need to know about planning your Kenya safari adventure.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600",
    pages: 48,
    rating: 4.9,
    category: "africa",
    fileSize: "12.5 MB"
  },
  {
    id: "tanzania-serengeti",
    title: "Serengeti Migration Guide",
    destination: "Tanzania",
    description: "Witness the greatest wildlife spectacle on earth with our expert timeline.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600",
    pages: 36,
    rating: 4.8,
    category: "wildlife",
    fileSize: "10.2 MB"
  },
  {
    id: "south-africa-explorer",
    title: "South Africa Explorer Guide",
    destination: "South Africa",
    description: "From Cape Town to Kruger, discover South Africa's diverse landscapes.",
    image: "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600",
    pages: 52,
    rating: 4.9,
    category: "africa",
    fileSize: "15.8 MB"
  },
  {
    id: "rwanda-gorillas",
    title: "Rwanda Gorilla Trekking Guide",
    destination: "Rwanda",
    description: "Complete guide to gorilla trekking in Rwanda's Volcanoes National Park.",
    image: "https://images.unsplash.com/photo-1551526805-b43a85b4e0b5?w=600",
    pages: 28,
    rating: 5.0,
    category: "wildlife",
    fileSize: "8.4 MB"
  }
];

export function DestinationGuidesHubPage() {
  const { navigateTo } = useNavigation();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (guideId: string) => {
    setDownloadingId(guideId);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setDownloadingId(null);
    alert("Your guide download has started!");
  };

  return (
    <PageShell context="destination-guides">
      {/* Stats */}
      <StatisticsMetricsPattern
        statistics={[
          { value: "15k+", label: "Guides Downloaded", icon: Download },
          { value: "48", label: "Countries Covered", icon: MapPin },
          { value: "4.9", label: "Average Rating", icon: Star, suffix: "/5" },
        ]}
      />

      {/* Featured Guides */}
      <section className="py-section-md">
        <Container>
          <SectionHeaderPattern
            title="Most Popular Guides"
            description="Our top-rated resources for planning your African adventure."
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GUIDES.map((guide) => (
              <div key={guide.id} className="group flex flex-col bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={guide.image} alt={guide.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs uppercase tracking-widest px-2 py-1 rounded">
                    Free Download
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <MapPin size={12} className="text-primary" />
                    <span>{guide.destination}</span>
                  </div>
                  <h4 className="mb-3">{guide.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-6">{guide.description}</p>
                  
                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-4">
                      <span className="flex items-center gap-1"><FileText size={12} /> {guide.pages} pages</span>
                      <span className="flex items-center gap-1 text-foreground">{guide.fileSize}</span>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full rounded-xl"
                      disabled={downloadingId === guide.id}
                      onClick={() => handleDownload(guide.id)}
                    >
                      {downloadingId === guide.id ? <LoaderCircle className="animate-spin" /> : <><Download size={16} /> Get My Guide</>}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Value Proposition */}
      <HighlightsGridPattern
        title="Why Use Our Guides?"
        description="We put our heart and soul into creating the most accurate safari resources on the web."
        highlights={[
          { id: "v1", title: "Expert Vetted", description: "Every guide is written and reviewed by specialists who spend 3 months a year in the field.", icon: CircleCheck },
          { id: "v2", title: "Fresh Content", description: "Our guides are updated quarterly to reflect the latest park fees and animal migration patterns.", icon: Calendar },
          { id: "v3", title: "Practical Logic", description: "From visa requirements to exact packing lists, we handle the logistics so you don't have to.", icon: BookOpen }
        ]}
        variant="minimal"
        columns={3}
      />

      {/* FAQ */}
      <FAQ
        title="Guide Hub FAQ"
        intro="Answers to common questions about our downloadable resources."
        items={[
          { id: "fg1", question: "Do I need to pay for these guides?", answer: "No, all our destination guides are completely free to download as part of our commitment to traveler education.", category: "general" },
          { id: "fg2", question: "What format are the guides in?", answer: "Guides are provided in high-resolution PDF format, perfect for viewing on tablets during your flight or printing out.", category: "tech" }
        ]}
      />

      {/* CTA */}
      <CTA
        title="Ready to Turn Research into Reality?"
        description="Our team is standing by to help you design a tailored itinerary based on the insights in our guides."
        variant="gradient"
        primaryAction={{ label: "Talk to a Specialist", onClick: () => navigateTo("/contact") }}
        secondaryAction={{ label: "Explore Safari Tours", onClick: () => navigateTo("/tours") }}
      />
    </PageShell>
  );
}

export default DestinationGuidesHubPage;
