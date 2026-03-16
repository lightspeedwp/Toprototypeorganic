/**
 * Gallery Archive Page
 *
 * Showcases photo albums and individual photos organized
 * by destination and theme categories.
 *
 * WordPress Mapping: templates/page-gallery.html
 * CSS: /src/styles/pages/gallery.css
 * BEM: .wp-page-gallery__*
 *
 * @module GalleryPage
 * @category pages
 */

import { useState, useMemo } from "react";
import { PageShell } from "../components/parts/PageShell";
import { Container } from "../components/common/Container";
import { CTA } from "../components/patterns/CTA";
import { Camera, Image } from "lucide-react";
import {
  GALLERY_CATEGORIES,
  GALLERY_ALBUMS,
  GALLERY_PHOTOS,
} from "../data/gallery";

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredAlbums = useMemo(() => {
    if (activeCategory === "all") return GALLERY_ALBUMS;
    return GALLERY_ALBUMS.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <PageShell context="gallery" className="theme-organic">
      {/* Filter Bar */}
      <section className="wp-page-gallery__albums-section">
        <Container>
          <nav aria-label="Gallery category filter" className="wp-page-gallery__filters">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`wp-page-gallery__filter-chip${activeCategory === cat.id ? " wp-page-gallery__filter-chip--active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Albums Grid */}
          <div className="wp-page-gallery__section-header">
            <h2 className="wp-page-gallery__section-title">Photo Albums</h2>
            <p className="wp-page-gallery__section-subtitle">
              Curated collections from our journeys across the world
            </p>
          </div>

          <div className="wp-page-gallery__albums-grid" role="list" aria-label="Photo albums">
            {filteredAlbums.map((album) => (
              <article
                key={album.id}
                className="wp-page-gallery__album-card"
                role="listitem"
                tabIndex={0}
                aria-label={`${album.title} — ${album.photoCount} photos`}
              >
                <img
                  className="wp-page-gallery__album-image"
                  src={album.coverImage}
                  alt={album.title}
                  loading="lazy"
                />
                <div className="wp-page-gallery__album-overlay">
                  <span className="wp-page-gallery__album-badge">{album.category}</span>
                  <h3 className="wp-page-gallery__album-title">{album.title}</h3>
                  <div className="wp-page-gallery__album-meta">
                    <Camera aria-hidden="true" width={14} height={14} />
                    <span>{album.photoCount} photos</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredAlbums.length === 0 && (
            <div className="wp-page-careers__empty" role="status">
              <Image className="wp-page-careers__empty-icon" aria-hidden="true" />
              <p className="wp-page-careers__empty-title">No albums in this category</p>
              <p className="wp-page-careers__empty-desc">Try selecting a different category filter above.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Photo Grid */}
      <section className="wp-page-gallery__photos-section">
        <Container>
          <div className="wp-page-gallery__section-header">
            <h2 className="wp-page-gallery__section-title">Featured Photos</h2>
            <p className="wp-page-gallery__section-subtitle">
              Snapshots from our travellers and expert photographers
            </p>
          </div>

          <div className="wp-page-gallery__photos-grid" role="list" aria-label="Photo gallery">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className={`wp-page-gallery__photo-card${photo.featured ? " wp-page-gallery__photo-card--featured" : ""}`}
                role="listitem"
                tabIndex={0}
                aria-label={photo.alt}
              >
                <img
                  className="wp-page-gallery__photo-img"
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                />
                <div className="wp-page-gallery__photo-info">
                  <span className="wp-page-gallery__photo-caption">{photo.caption}</span>
                  <span className="wp-page-gallery__photo-location">{photo.location}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="wp-page-careers__empty" role="status">
              <Image className="wp-page-careers__empty-icon" aria-hidden="true" />
              <p className="wp-page-careers__empty-title">No photos in this category</p>
              <p className="wp-page-careers__empty-desc">Try selecting a different category filter above.</p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA */}
      <CTA
        title="Want your photos featured?"
        description="Share your travel moments with us and see your best shots in our gallery."
        primaryLabel="Submit your photos"
        primaryHref="/contact"
        variant="primary"
      />
    </PageShell>
  );
}

export default GalleryPage;
