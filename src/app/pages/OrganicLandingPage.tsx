/**
 * Organic Landing Page Demo
 *
 * A full landing-page concept using organic design elements:
 * - Savannah SVG bush frame with sky gradient background
 * - Safari medallion/shield SVG
 * - Botanical corner decorations
 * - CSS animations (float, morph, drift, shimmer, sway)
 * - CSS shapes (blob clip-paths, organic border-radius, wave dividers)
 * - WebGL graphics (dunes, waves, particles) integrated per section
 * - Organic pattern cards (tour, destination, accommodation, review)
 * - CTA with modal triggered by button
 *
 * Route: /organic-demo/landing-page
 */

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Container } from "../components/common/Container";
import { WebGLGraphics } from "../components/common/WebGLGraphics";
import { ALL_TOURS as TOURS } from "../data/tours";
import { DESTINATIONS } from "../data/destinations";
import { ACCOMMODATION } from "../data/accommodation";
import { REVIEWS } from "../data/reviews";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Star,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  X,
  Compass,
  Heart,
  Shield,
  Tent,
  Clock,
} from "lucide-react";

/* ────────────────── SVG ASSETS ────────────────── */
import SavannahFrameLight from "../../imports/Savannah-contour-frame-light.svg";
import SavannahFrameDark from "../../imports/Savannah-contour-frame-dark.svg";
import SafariMedallionLight from "../../imports/Safari-medallion-light.svg";
import SafariMedallionDark from "../../imports/Safari-medallion-dark.svg";
import BotanicalCornerLight from "../../imports/Botanical-corner-light.svg";
import BotanicalCornerDark from "../../imports/Botanical-corner-dark.svg";

/* ────────────────── IMAGES ────────────────── */
const IMG_HERO_BG =
  "https://images.unsplash.com/photo-1595652974625-f01356aa9316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc2F2YW5uYWglMjBsYW5kc2NhcGUlMjBzdW5zZXQlMjBnb2xkZW58ZW58MXx8fHwxNzczMzExMTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_LODGE =
  "https://images.unsplash.com/photo-1607712617949-8c993d290809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYWZhcmklMjBsb2RnZSUyMGV2ZW5pbmclMjB3YXJtJTIwbGlnaHR8ZW58MXx8fHwxNzczMzExMTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_ELEPHANT =
  "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd2lsZGxpZmUlMjBlbGVwaGFudCUyMHNhZmFyaSUyMGdvbGRlbiUyMGhvdXJ8ZW58MXx8fHwxNzczMzExMTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_ACACIA =
  "https://images.unsplash.com/photo-1758867022060-230aba0aee2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2FjaWElMjB0cmVlJTIwYWZyaWNhbiUyMHNhdmFubmElMjBzaWxob3VldHRlfGVufDF8fHx8MTc3MzMxMTExOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_GIRAFFE =
  "https://images.unsplash.com/photo-1743096045377-348708bfede5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJhZmZlJTIwYWZyaWNhbiUyMHBsYWlucyUyMHdpbGRlcm5lc3MlMjBuYXR1cmV8ZW58MXx8fHwxNzczMzExMTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

/* ────────────────── HELPERS ────────────────── */
function isDark() {
  return document.documentElement.classList.contains("dark");
}

function useIsDark() {
  const [dark, setDark] = useState(isDark);
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(isDark()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);
  return dark;
}

/* ────────────────── ANIMATED SECTION WRAPPER ────────────────── */
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────── WAVE DIVIDER SVG ────────────────── */
function WaveDivider({
  fill = "var(--organic-clay-bg-primary)",
  flip = false,
}: {
  fill?: string;
  flip?: boolean;
}) {
  return (
    <div
      className="organic-divider-wave"
      style={
        flip
          ? ({ transform: "rotate(180deg)" } as React.CSSProperties)
          : undefined
      }
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ────────────────── MOUNTAIN SILHOUETTE SVG ────────────────── */
function MountainSilhouette() {
  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M0,200 L0,140 Q120,80 200,100 Q300,60 400,90 Q500,30 600,70 Q700,20 800,60 Q900,10 1000,50 Q1100,30 1200,70 Q1300,50 1400,80 L1440,90 L1440,200 Z"
        fill="rgba(60,45,30,0.35)"
      />
      <path
        d="M0,200 L0,160 Q180,110 300,130 Q450,80 600,110 Q750,60 900,100 Q1050,70 1200,110 Q1350,90 1440,120 L1440,200 Z"
        fill="rgba(45,35,25,0.5)"
      />
    </svg>
  );
}

/* ────────────────── ENQUIRY MODAL ────────────────── */
function EnquiryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <motion.div
      className="organic-modal__overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="organic-modal__content"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-element-xs rounded-[var(--radius-full)] bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-fluid-lg">
          <div className="flex flex-col gap-fluid-xs text-center">
            <h2 className="m-0">Begin Your Safari Journey</h2>
            <p className="text-muted-foreground m-0">
              Tell us about your dream adventure and our experts will craft a
              bespoke itinerary just for you.
            </p>
          </div>

          <form
            className="flex flex-col gap-fluid-md"
            onSubmit={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-md">
              <div className="flex flex-col gap-fluid-xs">
                <label className="text-fluid-sm">Full Name</label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full h-12 rounded-[var(--organic-radius-md)] border border-border bg-background px-element-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="flex flex-col gap-fluid-xs">
                <label className="text-fluid-sm">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full h-12 rounded-[var(--organic-radius-md)] border border-border bg-background px-element-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
            <div className="flex flex-col gap-fluid-xs">
              <label className="text-fluid-sm">
                What kind of adventure interests you?
              </label>
              <textarea
                rows={3}
                placeholder="I'd love to see the Big Five on a luxury safari..."
                className="w-full rounded-[var(--organic-radius-md)] border border-border bg-background p-element-md focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="organic-pebble px-element-xl py-element-md bg-primary text-primary-foreground transition-transform hover:scale-105"
            >
              Send Enquiry
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN LANDING PAGE COMPONENT
   ════════════════════════════════════════════════════════ */
export default function OrganicLandingPage() {
  const dark = useIsDark();
  const [modalOpen, setModalOpen] = useState(false);

  const SavannahFrame = dark ? SavannahFrameDark : SavannahFrameLight;
  const Medallion = dark ? SafariMedallionDark : SafariMedallionLight;
  const Botanical = dark ? BotanicalCornerDark : BotanicalCornerLight;

  const featuredTours = TOURS.slice(0, 3);
  const featuredDestinations = DESTINATIONS.slice(0, 3);
  const featuredAccommodation = ACCOMMODATION.slice(0, 3);
  const featuredReviews = REVIEWS.slice(0, 3);

  return (
    <div className="organic-demo-page theme-organic">
      {/* ═══════════════════════════════════════════
          HERO — Sky gradient, mountains, savannah bush, shield
          ═══════════════════════════════════════════ */}
      <section className="organic-landing__hero">
        {/* Sky gradient background */}
        <div className="organic-landing__hero-sky" />

        {/* Hero background image with overlay */}
        <div className="absolute inset-0 z-[1]">
          <ImageWithFallback
            src={IMG_HERO_BG}
            alt="African savannah at sunset"
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        {/* Mountain silhouettes */}
        <div className="organic-landing__hero-mountains">
          <MountainSilhouette />
        </div>

        {/* Savannah bush frame at bottom */}
        <div className="organic-landing__hero-bush">
          <img
            src={SavannahFrame}
            alt=""
            aria-hidden="true"
            className="w-full h-auto"
          />
        </div>

        {/* Botanical corner decorations */}
        <img
          src={Botanical}
          alt=""
          aria-hidden="true"
          className="organic-botanical-corner organic-botanical-corner--top-right organic-animate-sway"
        />

        {/* Hero content */}
        <motion.div
          className="organic-landing__hero-content px-element-lg flex flex-col items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Safari Shield/Medallion */}
          <img
            src={Medallion}
            alt="LightSpeed Safari Medallion"
            className="organic-landing__hero-shield"
          />

          <h1 className="m-0 text-primary-foreground drop-shadow-lg organic-shimmer-text">
            Discover Wild Africa
          </h1>
          <p className="text-fluid-lg max-w-2xl text-primary-foreground/90 drop-shadow-md m-0 pt-fluid-sm">
            Handcrafted safari experiences through breathtaking landscapes.
            Encounter majestic wildlife in their natural habitat.
          </p>

          <div className="flex flex-col sm:flex-row gap-fluid-md justify-center pt-fluid-lg">
            <button
              onClick={() => setModalOpen(true)}
              className="organic-pebble px-element-xl py-element-md bg-primary text-primary-foreground transition-all hover:scale-105 organic-animate-pulse-glow flex items-center gap-fluid-xs justify-center"
            >
              <Compass className="w-5 h-5" />
              Start Your Journey
            </button>
            <a
              href="/tours"
              className="organic-pebble px-element-xl py-element-md bg-[color:var(--glass-bg)] text-[color:var(--overlay-text)] border border-[color:var(--glass-border)] backdrop-blur-sm transition-all hover:bg-[color:var(--glass-bg-hover)] hover:scale-105 flex items-center gap-fluid-xs justify-center no-underline"
            >
              Explore Tours
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          WAVE DIVIDER — Hero to Featured Tours
          ═══════════════════════════════════════════ */}
      <WaveDivider fill="var(--organic-clay-bg-primary)" />

      {/* ═══════════════════════════════════════════
          FEATURED TOURS — Cards with WebGL background
          ═══════════════════════════════════════════ */}
      <section className="organic-section-middle py-section-lg relative overflow-hidden">
        {/* WebGL waves background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12]">
          <WebGLGraphics
            variant="waves"
            colorVar1="--organic-clay-primary"
            colorVar2="--organic-clay-accent"
          />
        </div>

        <Container className="relative z-10">
          <AnimatedSection>
            <div className="text-center flex flex-col gap-fluid-sm items-center pb-fluid-2xl">
              <span className="organic-card__tag wp-text--hand text-fluid-base">
                <Compass className="w-4 h-4" />
                Curated Experiences
              </span>
              <h2 className="m-0">Featured Safari Adventures</h2>
              <p className="text-muted-foreground max-w-2xl m-0">
                Each journey is carefully designed to blend adventure, comfort,
                and authentic cultural immersion across Africa's most
                spectacular landscapes.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-lg">
            {featuredTours.map((tour, i) => (
              <AnimatedSection key={tour.id} delay={i * 0.15}>
                <article className="organic-card flex flex-col h-full">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={
                        tour.image ||
                        [IMG_ELEPHANT, IMG_ACACIA, IMG_GIRAFFE][i]
                      }
                      alt={tour.title}
                      className="organic-card__image transition-transform hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex gap-fluid-xs">
                      <span className="organic-card__tag">
                        <MapPin className="w-3 h-3" />
                        {tour.destination || "East Africa"}
                      </span>
                    </div>
                    {tour.duration && (
                      <span className="organic-card__tag absolute top-3 right-3">
                        <Clock className="w-3 h-3" />
                        {tour.duration}
                      </span>
                    )}
                  </div>
                  <div className="organic-card__body flex-1">
                    <h3 className="m-0">{tour.title}</h3>
                    {tour.price && (
                      <span className="text-primary font-[family:var(--font-family-lora)]">
                        From ${tour.price.toLocaleString()}
                      </span>
                    )}
                    <p className="text-muted-foreground m-0 flex-1">
                      {tour.excerpt}
                    </p>
                    <div className="flex items-center justify-end pt-fluid-xs">
                      <a
                        href={`/tours/${tour.slug}`}
                        className="flex items-center gap-1 text-primary no-underline hover:underline"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          WAVE DIVIDER
          ══���════════════════════════════════════════ */}
      <WaveDivider fill="var(--organic-sunset-bg-primary)" flip />

      {/* ═══════════════════════════════════════════
          DESTINATIONS — Organic blob shapes + CSS morph animation
          ═══════════════════════════════════════════ */}
      <section className="organic-section-top py-section-lg relative overflow-hidden">
        {/* Botanical corner decoration */}
        <img
          src={Botanical}
          alt=""
          aria-hidden="true"
          className="organic-botanical-corner organic-botanical-corner--bottom-left"
        />

        <Container className="relative z-10">
          <AnimatedSection>
            <div className="text-center flex flex-col gap-fluid-sm items-center pb-fluid-2xl">
              <span className="organic-card__tag wp-text--hand text-fluid-base">
                <MapPin className="w-4 h-4" />
                Iconic Destinations
              </span>
              <h2 className="m-0">Where Will Africa Take You?</h2>
              <p className="text-muted-foreground max-w-2xl m-0">
                From the sun-drenched plains of the Serengeti to the misty
                mountains of Rwanda, explore destinations that define the
                essence of wild Africa.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-lg">
            {featuredDestinations.map((dest, i) => (
              <AnimatedSection key={dest.id} delay={i * 0.12}>
                <article className="organic-card group flex flex-col h-full">
                  {/* Organic morphing blob image container */}
                  <div className="relative overflow-hidden pt-element-lg">
                    <div className="organic-animate-morph overflow-hidden w-[90%] aspect-square">
                      <ImageWithFallback
                        src={
                          dest.image ||
                          [IMG_ELEPHANT, IMG_ACACIA, IMG_GIRAFFE][i]
                        }
                        alt={dest.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="organic-card__body flex-1 text-center">
                    <h3 className="m-0">{dest.title}</h3>
                    <p className="text-muted-foreground m-0 flex-1">
                      {dest.excerpt ||
                        "A magnificent destination where wilderness meets wonder."}
                    </p>
                    <a
                      href={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-1 text-primary no-underline hover:underline"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          WAVE DIVIDER
          ═══════════════════════════════════════════ */}
      <WaveDivider fill="var(--organic-clay-bg-primary)" />

      {/* ═══════════════════════════════════════════
          ACCOMMODATION — Leaf-shaped images + drift animation
          ═══════════════════════════════════════════ */}
      <section className="organic-section-middle py-section-lg relative overflow-hidden">
        {/* WebGL particles background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.1]">
          <WebGLGraphics
            variant="particles"
            colorVar1="--organic-earth-accent"
            colorVar2="--organic-earth-primary"
          />
        </div>

        <Container className="relative z-10">
          <AnimatedSection>
            <div className="text-center flex flex-col gap-fluid-sm items-center pb-fluid-2xl">
              <span className="organic-card__tag wp-text--hand text-fluid-base">
                <Tent className="w-4 h-4" />
                Handpicked Lodges
              </span>
              <h2 className="m-0">Where Luxury Meets the Wild</h2>
              <p className="text-muted-foreground max-w-2xl m-0">
                From exclusive tented camps under star-lit skies to boutique
                lodges perched on ancient cliffs — sleep where adventure waits
                at your doorstep.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-lg">
            {featuredAccommodation.map((acc, i) => (
              <AnimatedSection key={acc.id} delay={i * 0.12}>
                <article className="organic-card group flex flex-col h-full">
                  <div className="relative overflow-hidden pt-element-lg">
                    {/* Leaf-shaped image with drift animation */}
                    <div className="organic-shape-leaf overflow-hidden w-[85%] aspect-[4/3] organic-animate-drift">
                      <ImageWithFallback
                        src={acc.featuredImage || IMG_LODGE}
                        alt={acc.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="organic-card__body flex-1">
                    <div className="flex items-center gap-fluid-xs">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-fluid-sm text-muted-foreground">
                        {acc.location || "Southern Africa"}
                      </span>
                    </div>
                    <h3 className="m-0">{acc.title}</h3>
                    <p className="text-muted-foreground m-0 flex-1">
                      {acc.excerpt ||
                        "An exclusive retreat nestled in the heart of the wilderness."}
                    </p>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          WAVE DIVIDER
          ═══════════════════════════════════════════ */}
      <WaveDivider fill="var(--organic-sunset-bg-primary)" flip />

      {/* ═══════════════════════════════════════════
          REVIEWS / QUOTES — Organic quote pattern
          ══════════════════════════════════════════ */}
      <section className="organic-section-top py-section-lg relative overflow-hidden">
        <Container className="relative z-10">
          <AnimatedSection>
            <div className="text-center flex flex-col gap-fluid-sm items-center pb-fluid-2xl">
              <span className="organic-card__tag wp-text--hand text-fluid-base">
                <Heart className="w-4 h-4" />
                Guest Stories
              </span>
              <h2 className="m-0 wp-text--hand">
                Voices From the Wild
              </h2>
              <p className="text-muted-foreground max-w-2xl m-0">
                Real stories from travelers whose lives were changed by Africa.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-lg">
            {featuredReviews.map((review, i) => (
              <AnimatedSection key={review.id} delay={i * 0.12}>
                <blockquote className="organic-quote flex flex-col gap-fluid-md h-full m-0">
                  {/* Star rating */}
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating || 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className="w-4 h-4 text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <p className="organic-quote__text flex-1 m-0">
                    &ldquo;{review.content || review.excerpt}&rdquo;
                  </p>
                  <footer className="flex items-center gap-fluid-sm">
                    <div className="w-10 h-10 rounded-[var(--radius-full)] bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      {(review.author || "Guest").charAt(0)}
                    </div>
                    <div>
                      <cite className="organic-quote__author not-italic block">
                        {review.author || "Safari Guest"}
                      </cite>
                      {review.tourName && (
                        <span className="text-fluid-xs text-muted-foreground">
                          {review.tourName}
                        </span>
                      )}
                    </div>
                  </footer>
                </blockquote>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          WAVE DIVIDER
          ═══════════════════════════════════════════ */}
      <WaveDivider fill="var(--organic-earth-bg-primary)" />

      {/* ═══════════════════════════════════════════
          CTA — Full organic CTA with WebGL dunes + modal trigger
          ═══════════════════════════════════════════ */}
      <section className="organic-section-bottom py-section-lg relative overflow-hidden">
        {/* WebGL dunes in background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
          <WebGLGraphics
            variant="dunes"
            colorVar1="--organic-sunset-primary"
            colorVar2="--organic-sunset-accent"
          />
        </div>

        <Container className="relative z-10">
          <AnimatedSection>
            <div className="organic-cta relative flex flex-col items-center gap-fluid-lg">
              {/* Botanical corners */}
              <img
                src={Botanical}
                alt=""
                aria-hidden="true"
                className="organic-botanical-corner organic-botanical-corner--top-right opacity-20"
              />
              <img
                src={Botanical}
                alt=""
                aria-hidden="true"
                className="organic-botanical-corner organic-botanical-corner--bottom-left opacity-20"
              />

              {/* Shield */}
              <img
                src={Medallion}
                alt=""
                aria-hidden="true"
                className="w-16 h-auto organic-animate-float opacity-60"
              />

              <div className="flex flex-col gap-fluid-sm items-center relative z-10">
                <h2 className="m-0 text-primary-foreground wp-text--hand">
                  Ready to Answer the Call of the Wild?
                </h2>
                <p className="text-primary-foreground/80 max-w-xl m-0">
                  Let our expert guides craft a bespoke safari experience
                  tailored to your dreams. From intimate game drives to
                  star-gazing bush dinners — your adventure begins with a single
                  step.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-fluid-md relative z-10">
                <button
                  onClick={() => setModalOpen(true)}
                  className="organic-pebble px-element-xl py-element-md bg-[color:var(--primary-foreground)] text-[color:var(--primary)] transition-all hover:scale-105 flex items-center gap-fluid-xs justify-center"
                >
                  <Shield className="w-5 h-5" />
                  Request a Free Quote
                </button>
                <a
                  href="/contact"
                  className="organic-pebble px-element-xl py-element-md border-2 border-[color:var(--glass-border)] text-[color:var(--overlay-text)] transition-all hover:bg-[color:var(--glass-bg)] hover:scale-105 flex items-center gap-fluid-xs justify-center no-underline"
                >
                  <Users className="w-5 h-5" />
                  Speak to an Expert
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap justify-center gap-fluid-lg pt-fluid-md relative z-10">
                {[
                  { icon: Shield, label: "ATOL Protected" },
                  { icon: Star, label: "4.9/5 Rating" },
                  { icon: Calendar, label: "Flexible Booking" },
                  { icon: Heart, label: "2,500+ Happy Guests" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-fluid-xs text-primary-foreground/70"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-fluid-xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER FLOURISH
          ═══════════════════════════════════════════ */}
      <div className="organic-section-bottom py-fluid-lg text-center">
        <p className="text-muted-foreground wp-text--hand-alt m-0">
          Crafted with passion for Africa &mdash; Est. 2024
        </p>
      </div>

      {/* ═══════════════════════════════════════════
          ENQUIRY MODAL
          ═══════════════════════════════════════════ */}
      <EnquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}