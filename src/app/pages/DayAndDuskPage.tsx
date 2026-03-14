/**
 * Day & Dusk Landing Page
 *
 * Light mode = "Day" — bright blue WebGL sky, light Savannah SVG, warm earth tones
 * Dark mode  = "Dusk" — amber/crimson WebGL sunset sky, dark Savannah SVG, warm night palette
 *
 * Features:
 * - WebGL sky-day / sky-dusk shaders that switch with dark mode
 * - Savannah contour SVG frame (light/dark variants) as bush foreground
 * - Safari medallion shield with float animation
 * - Botanical corner decorations
 * - CSS animations: float, morph, drift, sway, shimmer, pulse-glow
 * - CSS shapes: blob clip-paths, organic pebble radius, leaf shapes, wave dividers
 * - Organic pattern sections: tours, destinations, accommodation, reviews, CTA + modal
 * - Every section has explicit day/dusk colour handling via BEM CSS classes
 *
 * Route: /organic-demo/day-and-dusk-page
 */

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Container } from "../components/common/Container";
import { WebGLGraphics } from "../components/common/WebGLGraphics";
import { TOURS } from "../data/tours";
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
  Sun,
  Moon,
  Binoculars,
  TreePine,
} from "lucide-react";

/* ── SVG ASSETS ── */
import SavannahFrameLight from "../../imports/Savannah-contour-frame-light.svg";
import SavannahFrameDark from "../../imports/Savannah-contour-frame-dark.svg";
import SafariMedallionLight from "../../imports/Safari-medallion-light.svg";
import SafariMedallionDark from "../../imports/Safari-medallion-dark.svg";
import BotanicalCornerLight from "../../imports/Botanical-corner-light.svg";
import BotanicalCornerDark from "../../imports/Botanical-corner-dark.svg";

/* ── IMAGES ── */
const IMG_LION =
  "https://images.unsplash.com/photo-1757709938871-408b412f0b0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW9uJTIwc2FmYXJpJTIwd2lsZGxpZmUlMjBjbG9zZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzMxMTYxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_ZEBRA =
  "https://images.unsplash.com/photo-1761602964537-b0be3172b0ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZWJyYSUyMGhlcmQlMjBhZnJpY2FuJTIwZ3Jhc3NsYW5kJTIwbWlncmF0aW9ufGVufDF8fHx8MTc3MzMxMTYxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_JEEP =
  "https://images.unsplash.com/photo-1765706730243-b8964b3d5692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBqZWVwJTIwZ2FtZSUyMGRyaXZlJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc3MzMxMTYxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_CAMP =
  "https://images.unsplash.com/photo-1679756977334-2700ebc6f8f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0ZW50ZWQlMjBjYW1wJTIwaW50ZXJpb3IlMjBjYW5kbGUlMjB3YXJtfGVufDF8fHx8MTc3MzMxMTYyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_MOUNTAIN =
  "https://images.unsplash.com/photo-1637494124766-2222ede3402b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbGFuZHNjYXBlJTIwbW91bnRhaW4lMjBzdW5yaXNlJTIwcGFub3JhbWljfGVufDF8fHx8MTc3MzMxMTYyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const IMG_ELEPHANT =
  "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd2lsZGxpZmUlMjBlbGVwaGFudCUyMHNhZmFyaSUyMGdvbGRlbiUyMGhvdXJ8ZW58MXx8fHwxNzczMzExMTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

/* ── HELPERS ── */
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

/* ── ANIMATED SECTION ── */
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ── WAVE DIVIDER ── */
function Wave({ fillVar, flip }: { fillVar: string; flip?: boolean }) {
  return (
    <div
      className={`dnd-wave ${flip ? "rotate-180" : ""}`}
    >
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          d="M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,80 L0,80 Z"
          fill={fillVar}
        />
      </svg>
    </div>
  );
}

/* ── ENQUIRY MODAL ── */
function EnquiryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="organic-modal__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="organic-modal__content"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-element-xs rounded-[var(--radius-full)] bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Close enquiry modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col gap-fluid-lg">
              <div className="text-center flex flex-col gap-fluid-xs">
                <h2 className="m-0">Begin Your Safari Journey</h2>
                <p className="text-muted-foreground m-0">
                  Tell us about your dream adventure — our team will craft a
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
                      placeholder="Jane Doe"
                      className="w-full h-12 rounded-[var(--organic-radius-md)] border border-border bg-background px-element-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div className="flex flex-col gap-fluid-xs">
                    <label className="text-fluid-sm">Email</label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full h-12 rounded-[var(--organic-radius-md)] border border-border bg-background px-element-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-fluid-xs">
                  <label className="text-fluid-sm">Your Dream Safari</label>
                  <textarea
                    rows={3}
                    placeholder="I'd love a 10-day luxury safari through Kenya and Tanzania..."
                    className="w-full rounded-[var(--organic-radius-md)] border border-border bg-background p-element-md focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
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
      )}
    </AnimatePresence>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN PAGE
   ════════════════════════════════════════════════════════ */
export default function DayAndDuskPage() {
  const dark = useIsDark();
  const [modalOpen, setModalOpen] = useState(false);

  const SavannahFrame = dark ? SavannahFrameDark : SavannahFrameLight;
  const Medallion = dark ? SafariMedallionDark : SafariMedallionLight;
  const Botanical = dark ? BotanicalCornerDark : BotanicalCornerLight;

  const tours = TOURS.slice(0, 3);
  const destinations = DESTINATIONS.slice(0, 3);
  const accommodation = ACCOMMODATION.slice(0, 3);
  const reviews = REVIEWS.slice(0, 3);
  const cardImages = [IMG_LION, IMG_ZEBRA, IMG_JEEP];
  const destImages = [IMG_ELEPHANT, IMG_MOUNTAIN, IMG_CAMP];

  return (
    <div className="theme-organic">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="dnd-hero">
        {/* WebGL sky — switches between day and dusk */}
        <div className="dnd-hero__sky">
          {dark ? (
            <WebGLGraphics
              key="sky-dusk"
              variant="sky-dusk"
              colorVar1="--organic-sunset-bg-primary"
              colorVar2="--organic-sunset-primary"
              colorVar3="--organic-sunset-accent"
            />
          ) : (
            <WebGLGraphics
              key="sky-day"
              variant="sky-day"
              colorVar1="--organic-sunset-accent"
              colorVar2="--organic-sunset-bg-secondary"
              colorVar3="--organic-sunset-bg-primary"
            />
          )}
        </div>

        {/* Savannah contour SVG at bottom (light/dark variant) */}
        <div className="dnd-hero__savannah">
          <img src={SavannahFrame} alt="" aria-hidden="true" />
        </div>

        {/* Hero content — centred above the bush line */}
        <motion.div
          className="dnd-hero__content"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Shield medallion */}
          <img
            src={Medallion}
            alt="Safari medallion"
            className="dnd-hero__shield"
          />

          <div className="flex flex-col gap-fluid-sm items-center pt-fluid-lg">
            {/* Day/Dusk indicator */}
            <span className="dnd-card__tag wp-text--hand text-fluid-base">
              {dark ? (
                <>
                  <Moon className="w-4 h-4" /> Dusk Edition
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4" /> Day Edition
                </>
              )}
            </span>

            <h1 className="dnd-hero__title m-0">
              {dark ? "Where Night Meets the Wild" : "Discover Wild Africa"}
            </h1>
            <p className="dnd-hero__subtitle text-fluid-lg max-w-2xl m-0">
              {dark
                ? "As the sun dips below the acacia canopy, a different Africa awakens. Experience the magic of dusk safaris."
                : "Handcrafted safari experiences through breathtaking landscapes under the golden African sun."}
            </p>

            <div className="flex flex-col sm:flex-row gap-fluid-md pt-fluid-md">
              <button
                onClick={() => setModalOpen(true)}
                className="dnd-hero__btn-primary organic-pebble px-element-xl py-element-md transition-all hover:scale-105 organic-animate-pulse-glow flex items-center gap-fluid-xs justify-center"
              >
                <Compass className="w-5 h-5" />
                Start Your Journey
              </button>
              <a
                href="/tours"
                className="dnd-hero__btn-secondary organic-pebble px-element-xl py-element-md transition-all hover:scale-105 flex items-center gap-fluid-xs justify-center no-underline"
              >
                Explore Tours
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ TRUST STATS ═══════════════ */}
      <section className="dnd-section--sand py-section-sm">
        <Container>
          <FadeIn>
            <div className="dnd-stats">
              {[
                { value: "2,500+", label: "Happy Travellers" },
                { value: "98%", label: "Would Return" },
                { value: "15+", label: "Years Experience" },
                { value: "4.9", label: "Average Rating" },
              ].map((s) => (
                <div key={s.label} className="dnd-stat">
                  <span className="dnd-stat__value">{s.value}</span>
                  <span className="dnd-stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ═══════════════ WAVE ═══════════════ */}
      <Wave fillVar="var(--organic-clay-bg-primary)" />

      {/* ═══════════════ FEATURED TOURS ═══════════════ */}
      <section className="dnd-section--clay py-section-lg relative overflow-hidden">
        {/* Subtle WebGL waves */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]">
          <WebGLGraphics
            variant="waves"
            colorVar1="--organic-clay-primary"
            colorVar2="--organic-clay-accent"
          />
        </div>

        <Container className="relative z-10">
          <FadeIn>
            <div className="text-center flex flex-col gap-fluid-sm items-center pb-fluid-2xl">
              <span className="dnd-card__tag wp-text--hand text-fluid-base">
                <Binoculars className="w-4 h-4" />
                {dark ? "Twilight Adventures" : "Sun-Drenched Adventures"}
              </span>
              <h2 className="m-0">Featured Safari Tours</h2>
              <p className="dnd-muted max-w-2xl m-0">
                Each journey blends adventure, comfort, and authentic cultural
                immersion across Africa's most spectacular landscapes.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-fluid-lg">
            {tours.map((tour, i) => (
              <FadeIn key={tour.id} delay={i * 0.12}>
                <article className="dnd-card flex flex-col h-full">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={tour.image || cardImages[i]}
                      alt={tour.title}
                      className="dnd-card__image transition-transform hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex gap-fluid-xs">
                      <span className="dnd-card__tag">
                        <MapPin className="w-3 h-3" />
                        {tour.destination || "East Africa"}
                      </span>
                    </div>
                    {tour.duration && (
                      <span className="dnd-card__tag absolute top-3 right-3">
                        <Clock className="w-3 h-3" />
                        {tour.duration}
                      </span>
                    )}
                  </div>
                  <div className="dnd-card__body flex-1">
                    <h3 className="m-0">{tour.title}</h3>
                    {tour.price && (
                      <span className="text-primary font-[family:var(--font-family-lora)]">
                        From ${tour.price.toLocaleString()}
                      </span>
                    )}
                    <p className="dnd-muted m-0 flex-1">{tour.excerpt}</p>
                    <div className="flex items-center justify-end pt-fluid-xs">
                      <a
                        href={`/tours/${tour.slug}`}
                        className="flex items-center gap-1 text-primary no-underline hover:underline"
                      >
                        View Details <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════ WAVE ═══════════════ */}
      <Wave fillVar="var(--organic-sunset-bg-primary)" flip />

      {/* ═══════════════ DESTINATIONS — morphing blob images ═══════════════ */}
      <section className="dnd-section--sand py-section-lg relative overflow-hidden">
        <img
          src={Botanical}
          alt=""
          aria-hidden="true"
          className="dnd-botanical dnd-botanical--bottom-left"
        />

        <Container className="relative z-10">
          <FadeIn>
            <div className="text-center flex flex-col gap-fluid-sm items-center pb-fluid-2xl">
              <span className="dnd-card__tag wp-text--hand text-fluid-base">
                <MapPin className="w-4 h-4" />
                Iconic Destinations
              </span>
              <h2 className="m-0">Where Will Africa Take You?</h2>
              <p className="dnd-muted max-w-2xl m-0">
                From sun-drenched Serengeti plains to misty Rwandan highlands —
                explore destinations that define wild Africa.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-lg">
            {destinations.map((dest, i) => (
              <FadeIn key={dest.id} delay={i * 0.12}>
                <article className="dnd-card group flex flex-col h-full">
                  <div className="relative overflow-hidden pt-element-lg">
                    <div className="organic-animate-morph overflow-hidden w-[90%] aspect-square">
                      <ImageWithFallback
                        src={dest.image || destImages[i]}
                        alt={dest.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="dnd-card__body flex-1 text-center">
                    <h3 className="m-0">{dest.title}</h3>
                    <p className="dnd-muted m-0 flex-1">
                      {dest.excerpt ||
                        "A magnificent destination where wilderness meets wonder."}
                    </p>
                    <a
                      href={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-1 text-primary no-underline hover:underline"
                    >
                      Explore <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════ WAVE ═══════════════ */}
      <Wave fillVar="var(--organic-clay-bg-primary)" />

      {/* ═══════════════ ACCOMMODATION — leaf-shaped drift images ═══════════════ */}
      <section className="dnd-section--clay py-section-lg relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.07]">
          <WebGLGraphics
            variant="particles"
            colorVar1="--organic-earth-accent"
            colorVar2="--organic-earth-primary"
          />
        </div>

        <img
          src={Botanical}
          alt=""
          aria-hidden="true"
          className="dnd-botanical dnd-botanical--top-right organic-animate-sway"
        />

        <Container className="relative z-10">
          <FadeIn>
            <div className="text-center flex flex-col gap-fluid-sm items-center pb-fluid-2xl">
              <span className="dnd-card__tag wp-text--hand text-fluid-base">
                <Tent className="w-4 h-4" />
                {dark ? "Starlit Retreats" : "Handpicked Lodges"}
              </span>
              <h2 className="m-0">Where Luxury Meets the Wild</h2>
              <p className="dnd-muted max-w-2xl m-0">
                Exclusive tented camps under star-lit skies, boutique lodges on
                ancient cliffs — sleep where adventure waits at your doorstep.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-lg">
            {accommodation.map((acc, i) => (
              <FadeIn key={acc.id} delay={i * 0.12}>
                <article className="dnd-card group flex flex-col h-full">
                  <div className="relative overflow-hidden pt-element-lg">
                    {/* Leaf-shaped image with drift animation */}
                    <div className="organic-shape-leaf overflow-hidden w-[85%] aspect-[4/3] organic-animate-drift">
                      <ImageWithFallback
                        src={acc.featuredImage || IMG_CAMP}
                        alt={acc.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="dnd-card__body flex-1">
                    <div className="flex items-center gap-fluid-xs">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-fluid-sm dnd-muted">
                        {acc.location || "Southern Africa"}
                      </span>
                    </div>
                    <h3 className="m-0">{acc.title}</h3>
                    <p className="dnd-muted m-0 flex-1">
                      {acc.excerpt ||
                        "An exclusive retreat nestled in the heart of the wilderness."}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════ WAVE ═══════════════ */}
      <Wave fillVar="var(--organic-sunset-bg-primary)" flip />

      {/* ═══════════════ REVIEWS / QUOTES ═══════════════ */}
      <section className="dnd-section--sand py-section-lg">
        <Container>
          <FadeIn>
            <div className="text-center flex flex-col gap-fluid-sm items-center pb-fluid-2xl">
              <span className="dnd-card__tag wp-text--hand text-fluid-base">
                <Heart className="w-4 h-4" />
                Guest Stories
              </span>
              <h2 className="m-0 wp-text--hand">
                {dark ? "Tales by Firelight" : "Voices From the Wild"}
              </h2>
              <p className="dnd-muted max-w-2xl m-0">
                Real stories from travellers whose lives were transformed by
                Africa.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-fluid-lg">
            {reviews.map((review, i) => (
              <FadeIn key={review.id} delay={i * 0.12}>
                <blockquote className="dnd-quote flex flex-col gap-fluid-md h-full m-0">
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating || 5 }).map((_, si) => (
                      <Star
                        key={si}
                        className="w-4 h-4 text-primary fill-primary"
                      />
                    ))}
                  </div>
                  <p className="font-[family:var(--font-family-lora)] italic flex-1 m-0">
                    &ldquo;{review.excerpt}&rdquo;
                  </p>
                  <footer className="flex items-center gap-fluid-sm">
                    <div className="w-10 h-10 rounded-[var(--radius-full)] bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                      {(review.author || "G").charAt(0)}
                    </div>
                    <div>
                      <cite className="not-italic block font-[family:var(--font-family-noto-sans)]">
                        {review.author || "Safari Guest"}
                      </cite>
                      <span className="text-fluid-xs dnd-muted">
                        {review.authorLocation || ""}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════ WAVE ═══════════════ */}
      <Wave fillVar="var(--organic-earth-bg-primary)" />

      {/* ═══════════════ CTA — with WebGL dunes background ═══════════════ */}
      <section className="dnd-section--linen py-section-lg relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.1]">
          <WebGLGraphics
            variant="dunes"
            colorVar1="--organic-sunset-primary"
            colorVar2="--organic-sunset-accent"
          />
        </div>

        <Container className="relative z-10">
          <FadeIn>
            <div className="dnd-cta relative flex flex-col items-center gap-fluid-lg">
              {/* Botanical decoration */}
              <img
                src={Botanical}
                alt=""
                aria-hidden="true"
                className="dnd-botanical dnd-botanical--top-right"
              />
              <img
                src={Botanical}
                alt=""
                aria-hidden="true"
                className="dnd-botanical dnd-botanical--bottom-left"
              />

              {/* Shield */}
              <img
                src={Medallion}
                alt=""
                aria-hidden="true"
                className="w-14 h-auto organic-animate-float opacity-50"
              />

              <div className="flex flex-col gap-fluid-sm items-center relative z-10">
                <h2 className="m-0 wp-text--hand text-inherit">
                  {dark
                    ? "Answer the Call of the Dusk"
                    : "Ready for Your Adventure?"}
                </h2>
                <p className="max-w-xl m-0 opacity-80">
                  Let our expert guides craft a bespoke safari experience
                  tailored to your dreams.
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
                  className="organic-pebble px-element-xl py-element-md border-2 border-[color:var(--glass-border)] text-inherit transition-all hover:bg-[color:var(--glass-bg)] hover:scale-105 flex items-center gap-fluid-xs justify-center no-underline"
                >
                  <Users className="w-5 h-5" />
                  Speak to an Expert
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap justify-center gap-fluid-lg pt-fluid-sm relative z-10 opacity-70">
                {[
                  { icon: Shield, label: "ATOL Protected" },
                  { icon: Star, label: "4.9/5 Rating" },
                  { icon: Calendar, label: "Flexible Booking" },
                  { icon: TreePine, label: "Carbon Offset" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-fluid-xs">
                    <item.icon className="w-4 h-4" />
                    <span className="text-fluid-xs">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ═══════════════ FOOTER FLOURISH ═══════════════ */}
      <div className="dnd-section--linen py-fluid-lg text-center">
        <p className="wp-text--hand-alt m-0 dnd-muted">
          {dark
            ? "Under African stars — Est. 2024"
            : "Crafted with passion for Africa — Est. 2024"}
        </p>
      </div>

      {/* ═══════════════ MODAL ═══════════════ */}
      <EnquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}