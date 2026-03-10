# SEO & Marketing Quick Start Guide

**Version:** 1.0  
**Date:** January 3, 2026  
**Category:** SEO & Marketing System

---

## 🚀 Quick Integration Guide

### **1. Basic SEO Setup (Every Page)**

```tsx
import { SEO } from "../components/seo/SEO";

function MyPage() {
  return (
    <>
      <SEO
        meta={{
          title: "Page Title | Site Name",
          description: "Page description (120-160 chars)",
          canonical: "https://example.com/page-path",
        }}
      />
      
      <PageLayout>
        {/* Page content */}
      </PageLayout>
    </>
  );
}
```

---

### **2. Tour Page SEO**

```tsx
import { SEO } from "../components/seo/SEO";
import { generateTourMetaTags } from "../components/seo/MetaTags";
import { generateTourSchema, generateBreadcrumbSchema } from "../lib/schema";

function TourPage({ tour }: { tour: Tour }) {
  const baseUrl = "https://example.com";
  const siteName = "Arctic Adventures";

  const metaTags = generateTourMetaTags(tour, baseUrl, siteName);
  
  const schemas = [
    generateTourSchema(tour, baseUrl),
    generateBreadcrumbSchema([
      { label: "Home", href: "/" },
      { label: "Tours", href: "/tours" },
      { label: tour.name },
    ]),
  ];

  return (
    <>
      <SEO meta={metaTags} schema={schemas} />
      <PageLayout>{/* Content */}</PageLayout>
    </>
  );
}
```

---

### **3. Add Social Proof**

```tsx
import { SocialProof, StarRating } from "../components/marketing/SocialProof";

function TourHero({ tour }: { tour: Tour }) {
  return (
    <section>
      <h1>{tour.name}</h1>
      
      {/* Star rating */}
      <StarRating rating={tour.rating} count={tour.reviewCount} />
      
      {/* Social proof indicators */}
      <SocialProof
        indicators={[
          { type: "bookings", value: "2,341", label: "Bookings this year" },
          { type: "popular", value: "Top 10%", label: "Most Popular" },
        ]}
        variant="inline"
      />
    </section>
  );
}
```

---

### **4. Add Trust Badges**

```tsx
import { TrustBadges } from "../components/marketing/TrustBadges";

function TourFooter() {
  return (
    <footer>
      <TrustBadges variant="horizontal" />
    </footer>
  );
}
```

---

### **5. Add Social Sharing**

```tsx
import { ShareSection } from "../components/marketing/SocialShareButtons";

function TourDetail({ tour }: { tour: Tour }) {
  return (
    <article>
      {/* Tour content */}
      
      <ShareSection
        title="Share this tour"
        data={{
          url: `https://example.com/tours/${tour.slug}`,
          title: tour.name,
          description: tour.description,
          image: tour.featuredImage,
        }}
        showLabels
      />
    </article>
  );
}
```

---

### **6. Add Promotional Banner**

```tsx
import { PromoBanner } from "../components/marketing/PromoBanner";

function AppLayout() {
  return (
    <>
      <PromoBanner
        message="🎉 Summer Sale: 20% off all tours!"
        variant="promo"
        ctaText="Shop Now"
        onCtaClick={() => navigate("/specials")}
        dismissible
        sticky
        position="top"
      />
      
      {/* Rest of layout */}
    </>
  );
}
```

---

### **7. Track Analytics**

```tsx
import { Analytics, usePageView } from "../components/marketing/Analytics";

function TourPage({ tour }: { tour: Tour }) {
  // Track page view
  usePageView(`/tours/${tour.slug}`, tour.name);

  // Track tour view
  useEffect(() => {
    Analytics.trackTourView(tour.id, tour.name);
  }, [tour]);

  const handleInquiry = () => {
    Analytics.trackTourInquiry(tour.id, tour.name);
    // Open inquiry form
  };

  const handleBooking = () => {
    Analytics.trackBookingStarted(tour.id, tour.name, tour.price.amount);
    // Navigate to booking
  };

  return (
    <PageLayout>
      <button onClick={handleInquiry}>Inquire</button>
      <button onClick={handleBooking}>Book Now</button>
    </PageLayout>
  );
}
```

---

## 📦 Component Reference

### **SEO Components:**
- `SEO` - All-in-one SEO wrapper
- `MetaTags` - Meta tags manager
- `StructuredData` - Schema.org JSON-LD
- `RichSnippets` - Search result preview

### **Marketing Components:**
- `TrustBadges` - Trust indicators
- `SocialProof` - Social proof indicators
- `SocialShareButtons` - Social sharing
- `PromoBanner` - Promotional banners
- `Analytics` - Analytics tracking

### **Utilities:**
- `schema.ts` - Schema.org generators
- `seo-helpers.ts` - SEO utilities

---

## 🎯 Common Patterns

### **Tour Archive Page:**

```tsx
<SEO
  meta={{
    title: "Tours | Arctic Adventures",
    description: "Browse our collection of adventure tours...",
    canonical: "https://example.com/tours",
  }}
/>

<Hero title="Our Tours" />
<SocialProof indicators={[...]} />
<CardGrid items={tours} />
<TrustBadges />
```

---

### **Blog Post:**

```tsx
const metaTags = generateBlogPostMetaTags(post, baseUrl, siteName);
const articleSchema = generateArticleSchema(post, siteName, logoUrl);

<SEO meta={metaTags} schema={articleSchema} />

<article>
  <h1>{post.title}</h1>
  <div>{post.content}</div>
  
  <ShareSection
    title="Share this article"
    data={{
      url: `${baseUrl}/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
    }}
  />
</article>
```

---

### **Destination Page:**

```tsx
const metaTags = generateDestinationMetaTags(destination, baseUrl, siteName);
const destSchema = generateDestinationSchema(destination);

<SEO meta={metaTags} schema={destSchema} />

<Hero title={destination.name} image={destination.featuredImage} />
<EditorialContent content={destination.content} />
<ShareSection data={shareData} />
```

---

## ✅ SEO Checklist

For every page, ensure:

- [ ] Page title (< 60 chars, includes brand)
- [ ] Meta description (120-160 chars)
- [ ] Canonical URL
- [ ] Open Graph tags (title, description, image)
- [ ] Twitter Card tags
- [ ] Schema.org structured data
- [ ] Image alt text
- [ ] Social sharing buttons
- [ ] Analytics tracking

---

## 🎨 Design System

All components use CSS variables:

```css
/* Colors */
bg-primary, text-primary-foreground
bg-muted, text-muted-foreground
bg-card, text-card-foreground

/* Typography */
font-family: var(--font-family-lora)      /* Headings */
font-family: var(--font-family-noto-sans) /* Body */

/* Spacing */
p-4, py-6, gap-3, etc.
```

---

## 📖 Full Documentation

See `/SEO-MARKETING-SYSTEM-COMPLETE.md` for comprehensive documentation.

---

**Quick Start Complete!** ✅

All components are production-ready and use design system tokens exclusively. 🚀
