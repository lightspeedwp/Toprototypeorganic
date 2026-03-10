/**
 * Tour Gallery Page - WordPress Template
 * 
 * Displays a comprehensive photo and video gallery for a tour or destination.
 * Showcases multiple media formats with lightbox and carousel functionality.
 * 
 * **WordPress Mapping:**
 * - Template: page-tour-gallery.php or single-tour.php (gallery section)
 * - Template hierarchy: page-tour-gallery.php → page.php → singular.php → index.php
 * 
 * **Required Patterns (in order):**
 * 1. Hero - Gallery header with featured image
 * 2. Image Carousel - Featured photos slideshow
 * 3. Image Gallery - Grid of all photos
 * 4. Video Gallery - Tour videos
 * 5. CTA - Book tour or contact
 * 
 * @module TourGalleryPage
 * @category pages
 * @wordpressTemplate page-tour-gallery.php
 */

import { Container } from "../components/common/Container";
import { GroupBlock } from "../components/blocks/design/GroupBlock";
import { ImageCarousel, ThumbnailCarousel } from "../components/patterns/ImageCarousel";
import { ImageGallery, GallerySection } from "../components/patterns/ImageGallery";
import { VideoPlayer, VideoGallery } from "../components/common/VideoPlayer";
import { CTA } from "../components/patterns/CTA";
import { LightboxImage } from "../components/common/Lightbox";
import { MapPin, Calendar, Users } from "@phosphor-icons/react";

/**
 * Tour Gallery Page Component
 */
export function TourGalleryPage() {
  // Mock gallery data
  const featuredImages: LightboxImage[] = [
    {
      src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&h=900&fit=crop",
      alt: "Maasai Mara Safari",
      title: "Maasai Mara Safari",
      caption: "Witness the incredible wildlife of Kenya's most famous reserve",
    },
    {
      src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600&h=900&fit=crop",
      alt: "African Sunset",
      title: "African Sunset",
      caption: "Spectacular sunsets over the African savanna",
    },
    {
      src: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&h=900&fit=crop",
      alt: "Wildlife Encounter",
      title: "Wildlife Encounter",
      caption: "Get up close with Africa's magnificent animals",
    },
    {
      src: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=1600&h=900&fit=crop",
      alt: "Safari Camp",
      title: "Luxury Safari Camp",
      caption: "Comfortable accommodations in the heart of nature",
    },
  ];

  const galleryImages: LightboxImage[] = [
    {
      src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
      alt: "Lions in Maasai Mara",
      caption: "Pride of lions resting under acacia tree",
    },
    {
      src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=600&fit=crop",
      alt: "Elephant family",
      caption: "Elephant herd crossing the plains",
    },
    {
      src: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&h=600&fit=crop",
      alt: "Zebras grazing",
      caption: "Zebras in their natural habitat",
    },
    {
      src: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&h=600&fit=crop",
      alt: "Giraffe at sunset",
      caption: "Giraffe silhouetted against the setting sun",
    },
    {
      src: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&h=600&fit=crop",
      alt: "Safari vehicle",
      caption: "Game drive through the reserve",
    },
    {
      src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=1200&fit=crop",
      alt: "Cheetah portrait",
      caption: "Close-up of a resting cheetah",
    },
    {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      alt: "Wildebeest migration",
      caption: "The great migration crossing the Mara River",
    },
    {
      src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=800&fit=crop",
      alt: "African sunset colors",
      caption: "Vibrant colors of an African sunset",
    },
    {
      src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
      alt: "Safari camp at night",
      caption: "Cozy campfire under the stars",
    },
  ];

  const wildlifeImages: LightboxImage[] = [
    {
      src: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop",
      alt: "Lion close-up",
      caption: "Majestic male lion",
    },
    {
      src: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&h=600&fit=crop",
      alt: "Leopard in tree",
      caption: "Leopard resting on tree branch",
    },
    {
      src: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&h=600&fit=crop",
      alt: "Rhino family",
      caption: "Endangered black rhinos",
    },
    {
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      alt: "Buffalo herd",
      caption: "Cape buffalo in large numbers",
    },
    {
      src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=600&fit=crop",
      alt: "Hippo in water",
      caption: "Hippo pod in the river",
    },
    {
      src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
      alt: "Bird species",
      caption: "Over 500 bird species recorded",
    },
  ];

  const videos = [
    {
      src: "dQw4w9WgXcQ", // Replace with real tour video ID
      source: "youtube" as const,
      title: "Kenya Safari Adventure - Full Tour",
      description: "Experience the complete safari journey from start to finish",
    },
    {
      src: "dQw4w9WgXcQ", // Replace with real video ID
      source: "youtube" as const,
      title: "Wildlife Encounters",
      description: "Close encounters with Africa's Big Five",
    },
    {
      src: "dQw4w9WgXcQ", // Replace with real video ID
      source: "youtube" as const,
      title: "Safari Camp Experience",
      description: "Tour of our luxury safari accommodations",
    },
  ];

  return (
    <>
      {/* ================================================================
          HERO - Gallery header
          ================================================================ */}
      <GroupBlock sectionStyle="section-hero-default">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              <MapPin size={16} />
              Maasai Mara, Kenya
            </div>

            <h1 className="mb-4 text-foreground">Kenya Safari Adventure Gallery</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Explore stunning photos and videos from one of Africa's most spectacular
              wildlife destinations. Preview your adventure through the eyes of our guests.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>7 Days / 6 Nights</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>Max 12 Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⭐️</span>
                <span>4.9/5 (127 reviews)</span>
              </div>
            </div>
          </div>
        </Container>
      </GroupBlock>

      {/* ================================================================
          FEATURED CAROUSEL - Hero slideshow
          ================================================================ */}
      <GroupBlock sectionStyle="section-default">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-center text-foreground">Featured Photos</h2>
            <ImageCarousel
              images={featuredImages}
              autoPlayInterval={5000}
              showArrows
              showIndicators
              showCaptions
              enableLightbox
              aspectRatio="video"
            />
          </div>
        </Container>
      </GroupBlock>

      {/* ================================================================
          THUMBNAIL CAROUSEL - Alternative view
          ================================================================ */}
      <GroupBlock sectionStyle="section-accent-subtle">
        <Container>
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-6 text-center text-foreground">Browse All Photos</h2>
            <ThumbnailCarousel
              images={featuredImages}
              showCaptions
              enableLightbox
            />
          </div>
        </Container>
      </GroupBlock>

      {/* ================================================================
          GALLERY GRID - All photos
          ================================================================ */}
      <GroupBlock sectionStyle="section-default">
        <Container>
          <GallerySection
            title="Tour Photo Gallery"
            description="Click any image to view full size. All photos taken by our guests and tour guides."
            images={galleryImages}
            layout="grid"
            columns={3}
            showCaptions
            enableLightbox
          />
        </Container>
      </GroupBlock>

      {/* ================================================================
          MASONRY GALLERY - Wildlife photos
          ================================================================ */}
      <GroupBlock sectionStyle="section-muted-subtle">
        <Container>
          <GallerySection
            title="Wildlife Photography"
            description="Stunning captures of the Big Five and other incredible species"
            images={wildlifeImages}
            layout="masonry"
            showCaptions
            enableLightbox
          />
        </Container>
      </GroupBlock>

      {/* ================================================================
          VIDEO GALLERY - Tour videos
          ================================================================ */}
      <GroupBlock sectionStyle="section-default">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-foreground">Tour Videos</h2>
              <p className="text-muted-foreground">
                Watch highlights from recent tours and get a feel for the experience
              </p>
            </div>

            <VideoGallery videos={videos} columns={2} />
          </div>
        </Container>
      </GroupBlock>

      {/* ================================================================
          SINGLE VIDEO EXAMPLE
          ================================================================ */}
      <GroupBlock sectionStyle="section-accent-subtle">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 text-center">
              <h2 className="mb-4 text-foreground">Virtual Tour Experience</h2>
              <p className="text-muted-foreground">
                Take a 360° virtual tour of the Maasai Mara (coming soon)
              </p>
            </div>

            <VideoPlayer
              src="dQw4w9WgXcQ"
              source="youtube"
              title="360° Virtual Safari Tour"
              aspectRatio="16:9"
              lazyLoad
            />
          </div>
        </Container>
      </GroupBlock>

      {/* ================================================================
          STATS SECTION
          ================================================================ */}
      <GroupBlock sectionStyle="section-default">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 font-serif text-fluid-4xl text-primary">150+</div>
                <p className="text-muted-foreground">Photo Gallery</p>
              </div>
              <div className="text-center">
                <div className="mb-2 font-serif text-fluid-4xl text-primary">12</div>
                <p className="text-muted-foreground">Video Tours</p>
              </div>
              <div className="text-center">
                <div className="mb-2 font-serif text-fluid-4xl text-primary">50+</div>
                <p className="text-muted-foreground">Wildlife Species</p>
              </div>
              <div className="text-center">
                <div className="mb-2 font-serif text-fluid-4xl text-primary">127</div>
                <p className="text-muted-foreground">Guest Reviews</p>
              </div>
            </div>
          </div>
        </Container>
      </GroupBlock>

      {/* ================================================================
          CTA - Book tour
          ================================================================ */}
      <CTA
        title="Ready for Your Safari Adventure?"
        description="Join us on an unforgettable journey through Kenya's most spectacular wildlife reserve. Limited availability for 2024."
        primaryAction={{
          label: "Book This Tour",
          href: "tour-single",
        }}
        secondaryAction={{
          label: "View All Tours",
          href: "tours-archive",
        }}
        variant="centered"
      />
    </>
  );
}

export default TourGalleryPage;