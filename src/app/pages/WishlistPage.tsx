/**
 * Wishlist Page - Saved Tours & Favorites
 * 
 * A page for managing saved tours and favorite destinations.
 * Users can save tours for later, receive price drop alerts,
 * and quickly access their favorite trips.
 * 
 * **WordPress Mapping:**
 * - Template: page-wishlist.php
 * - Template hierarchy: page-wishlist.php → page.php → singular.php → index.php
 * 
 * **Required Patterns (in order):**
 * 1. Hero - Wishlist introduction
 * 2. Filter - Sort and filter options
 * 3. Card Grid - Saved tours/destinations
 * 4. Empty State - No items message
 * 5. Quick Actions - Share, compare, clear
 * 
 * **Features:**
 * - Save/unsave tours
 * - Price drop notifications
 * - Sort by date added, price, popularity
 * - Filter by travel style, destination
 * - Share wishlist
 * - Compare tours
 * - Quick booking
 * 
 * @module WishlistPage
 * @category pages
 * @wordpressTemplate page-wishlist.php
 */

import { useState } from "react";
import { PageShell } from "../components/parts/PageShell";
import { Container } from "../components/common/Container";
import { Heart, ShareNetwork as Share2, X, Calendar, CurrencyDollar as DollarSign, MapPin, Users, TrendDown as TrendingDown, CheckCircle as CircleCheck, ArrowRight } from "@phosphor-icons/react";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import { TOURS } from "../data/mock";
import type { Tour } from "../data/types";
import { useNavigation } from "../contexts/NavigationContext";

/**
 * Wishlist page props.
 */
interface WishlistPageProps {
  onNavigate?: (pageId: string) => void;
}

/**
 * Saved tour with additional metadata.
 */
interface WishlistItem {
  tour: Tour;
  savedAt: Date;
  priceAtSave: number;
  currentPrice: number;
  priceDropAlert: boolean;
}

/**
 * Wishlist Page Component.
 */
export default function WishlistPage({ onNavigate }: WishlistPageProps) {
  const { navigateTo } = useNavigation();
  const nav = (path: string) => {
    if (onNavigate) onNavigate(path);
    else navigateTo(path);
  };

  // Mock wishlist data - first 4 tours
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(
    TOURS.slice(0, 4).map((tour, index) => ({
      tour,
      savedAt: new Date(Date.now() - (index + 1) * 7 * 24 * 60 * 60 * 1000), // Saved 1-4 weeks ago
      priceAtSave: tour.pricing.basePrice + (index * 200), // Simulate original price
      currentPrice: tour.pricing.basePrice,
      priceDropAlert: index < 2, // First 2 items have price drops
    }))
  );

  const [sortBy, setSortBy] = useState<"date" | "price" | "name">("date");
  const [showCompare, setShowCompare] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<Set<string>>(new Set());

  /**
   * Remove item from wishlist.
   */
  const handleRemove = (tourId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.tour.id !== tourId));
    toast.success("Removed from wishlist");
  };

  /**
   * Share wishlist.
   */
  const handleShare = () => {
    // In real app, would generate shareable link
    navigator.clipboard.writeText(window.location.href);
    toast.success("Wishlist link copied to clipboard!");
  };

  /**
   * Clear all items.
   */
  const handleClearAll = () => {
    const confirm = window.confirm("Remove all items from your wishlist?");
    if (confirm) {
      setWishlistItems([]);
      toast.success("Wishlist cleared");
    }
  };

  /**
   * Toggle compare selection.
   */
  const handleToggleCompare = (tourId: string) => {
    setSelectedForCompare((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tourId)) {
        newSet.delete(tourId);
      } else {
        if (newSet.size >= 3) {
          toast.error("You can compare up to 3 tours at once");
          return prev;
        }
        newSet.add(tourId);
      }
      return newSet;
    });
  };

  /**
   * Go to compare page.
   */
  const handleCompare = () => {
    if (selectedForCompare.size < 2) {
      toast.error("Select at least 2 tours to compare");
      return;
    }
    toast.info("Compare feature - Coming soon");
    // onNavigate?.("tour-comparison-page");
  };

  /**
   * Sort items.
   */
  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return b.savedAt.getTime() - a.savedAt.getTime();
      case "price":
        return a.currentPrice - b.currentPrice;
      case "name":
        return a.tour.title.localeCompare(b.tour.title);
      default:
        return 0;
    }
  });

  /**
   * Calculate price drop percentage.
   */
  const getPriceDrop = (item: WishlistItem) => {
    const drop = item.priceAtSave - item.currentPrice;
    const percentage = (drop / item.priceAtSave) * 100;
    return { drop, percentage };
  };

  const hasItems = wishlistItems.length > 0;
  const priceDropCount = wishlistItems.filter((item) => item.priceDropAlert).length;

  return (
    <PageShell context="wishlist" className="theme-organic">
      <div className="organic-section-top">
        {/* ================================================================
            HERO - Wishlist introduction
            ================================================================ */}
        <section className="py-section-sm md:py-section-md bg-muted">
          <Container>
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-primary fill-current" />
                <h1>My Wishlist</h1>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                Save your favorite tours and get notified when prices drop
              </p>

              {/* Stats */}
              {hasItems && (
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                    <Heart className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">
                      {wishlistItems.length} saved tour{wishlistItems.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {priceDropCount > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                      <TrendingDown className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {priceDropCount} price drop{priceDropCount !== 1 ? "s" : ""}!
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Container>
        </section>
      </div>

      <div className="organic-section-middle">

      {/* ================================================================
          MAIN CONTENT - Wishlist items
          ================================================================ */}
      <section className="py-section-sm md:py-section-md bg-background">
        <Container>
          {hasItems ? (
            <div className="max-w-6xl mx-auto">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                {/* Sort */}
                <div className="flex items-center gap-3">
                  <label htmlFor="sort" className="text-sm text-muted-foreground">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className={cn(
                      "px-4 py-2 rounded-md",
                      "bg-input-background border border-border",
                      "text-foreground text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                  >
                    <option value="date">Date Added</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowCompare(!showCompare)}
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm",
                      "border border-border text-foreground",
                      "hover:bg-accent transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-ring",
                      showCompare && "bg-accent"
                    )}
                  >
                    <CircleCheck className="w-4 h-4" />
                    <span>Compare ({selectedForCompare.size})</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm",
                      "border border-border text-foreground",
                      "hover:bg-accent transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                  <button
                    onClick={handleClearAll}
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm",
                      "border border-destructive text-destructive",
                      "hover:bg-destructive/10 transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-ring"
                    )}
                  >
                    <X className="w-4 h-4" />
                    <span>Clear All</span>
                  </button>
                </div>
              </div>

              {/* Compare Bar */}
              {showCompare && selectedForCompare.size > 0 && (
                <div className="mb-6 bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {selectedForCompare.size} tour{selectedForCompare.size !== 1 ? "s" : ""} selected for comparison
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedForCompare(new Set())}
                        className="text-sm text-muted-foreground hover:text-foreground"
                      >
                        Clear selection
                      </button>
                      <button
                        onClick={handleCompare}
                        disabled={selectedForCompare.size < 2}
                        className={cn(
                          "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm",
                          "bg-primary text-primary-foreground",
                          "hover:bg-primary/90 transition-colors",
                          "focus:outline-none focus:ring-2 focus:ring-ring",
                          "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span>Compare Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Wishlist Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {sortedItems.map((item) => {
                  const { drop, percentage } = getPriceDrop(item);
                  const hasPriceDrop = drop > 0;
                  const isSelected = selectedForCompare.has(item.tour.id);

                  return (
                    <div
                      key={item.tour.id}
                      className={cn(
                        "bg-card border rounded-lg overflow-hidden transition-all",
                        isSelected
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] bg-muted">
                        <img
                          src={item.tour.featuredImage}
                          alt={item.tour.title}
                          className="w-full h-full object-cover"
                        />
                        {hasPriceDrop && item.priceDropAlert && (
                          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center gap-1.5">
                            <TrendingDown className="w-3.5 h-3.5" />
                            <span>Price dropped {percentage.toFixed(0)}%!</span>
                          </div>
                        )}
                        <button
                          onClick={() => handleRemove(item.tour.id)}
                          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <X className="w-5 h-5 text-destructive" />
                        </button>
                        {showCompare && (
                          <button
                            onClick={() => handleToggleCompare(item.tour.id)}
                            className={cn(
                              "absolute bottom-3 right-3 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "bg-background/90 hover:bg-background"
                            )}
                            aria-label="Select for comparison"
                          >
                            <CircleCheck className={cn("w-5 h-5", isSelected && "fill-current")} />
                          </button>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="mb-3">
                          <button
                            onClick={() => nav("/tours/" + item.tour.slug)}
                            className="hover:text-primary transition-colors"
                          >
                            {item.tour.title}
                          </button>
                        </h3>

                        {/* Details */}
                        <div className="grid gap-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{item.tour.destination}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{item.tour.duration} days</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            <span>Max {item.tour.groupSize} people</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="mb-4 pt-4 border-t border-border">
                          {hasPriceDrop ? (
                            <div>
                              <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-sm text-muted-foreground line-through">
                                  ${item.priceAtSave.toLocaleString()}
                                </span>
                                <span className="text-2xl font-medium text-primary">
                                  ${item.currentPrice.toLocaleString()}
                                </span>
                              </div>
                              <p className="text-xs text-primary">
                                Save ${drop.toLocaleString()} ({percentage.toFixed(0)}% off)
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-baseline gap-2">
                              <DollarSign className="w-5 h-5 text-muted-foreground" />
                              <span className="text-2xl font-medium">
                                ${item.currentPrice.toLocaleString()}
                              </span>
                              <span className="text-sm text-muted-foreground">per person</span>
                            </div>
                          )}
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted-foreground">
                          <span>
                            Added {item.savedAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                          <button
                            onClick={() => nav("/booking")}
                            className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                          >
                            <span>Book now</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="max-w-2xl mx-auto text-center py-section-sm">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="mb-4">Your Wishlist is Empty</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start saving tours you're interested in. We'll notify you when prices drop!
              </p>
              <button
                onClick={() => nav("/tours")}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-md",
                  "bg-primary text-primary-foreground",
                  "hover:bg-primary/90 transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-ring"
                )}
              >
                <span>Browse Tours</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ================================================================
          FEATURES - Wishlist benefits
          ================================================================ */}
      {hasItems && (
        <section className="py-section-sm md:py-section-md bg-muted">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="mb-4">Wishlist Benefits</h2>
                <p className="text-lg text-muted-foreground">
                  Make the most of your saved tours
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    icon: TrendingDown,
                    title: "Price Drop Alerts",
                    description: "Get notified instantly when your saved tours go on sale",
                  },
                  {
                    icon: Share2,
                    title: "Share with Others",
                    description: "Share your wishlist with travel companions for easy planning",
                  },
                  {
                    icon: CircleCheck,
                    title: "Compare Tours",
                    description: "Select multiple tours to compare features and prices side-by-side",
                  },
                ].map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={index}
                      className="bg-card border border-border rounded-lg p-6 text-center"
                    >
                      <Icon className="w-10 h-10 text-primary mx-auto mb-3" />
                      <h4 className="mb-2">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Container>
        </section>
      )}
      </div>
    </PageShell>
  );
}