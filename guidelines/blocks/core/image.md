# Image Block (core/image)

**Category:** Core Content  
**WordPress Block:** `core/image`  
**Status:** ✅ Documented

---

## Overview

The Image block displays responsive images with optional captions, aspect ratios, and sizing controls.

---

## Block Attributes

```typescript
interface ImageBlockAttributes {
  /** Image source URL */
  src: string;
  
  /** Alt text (required for accessibility) */
  alt: string;
  
  /** Optional caption */
  caption?: string;
  
  /** Size preset */
  size?: 'sm' | 'md' | 'lg' | 'full';
  
  /** Aspect ratio */
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
  
  /** Optional custom classes */
  className?: string;
}
```

---

## Design Token Application

### Colors
- Border radius: `rounded-lg` → `var(--radius-lg)` (6px)
- Caption text: `text-muted-foreground` → `var(--muted-foreground)`

### Typography (Caption)
- Font size: `text-sm` → `var(--text-sm)`
- Font family: Inherits from parent (Noto Sans)

---

## Implementation

```typescript
export function ImageBlock({ 
  src, 
  alt, 
  caption, 
  size = 'full',
  aspectRatio = 'auto',
  className 
}: ImageBlockAttributes) {
  return (
    <figure className={className}>
      <img 
        src={src} 
        alt={alt}
        className={cn(
          "w-full h-auto rounded-lg object-cover",
          aspectRatio !== 'auto' && `aspect-${aspectRatio.replace('/', '-')}`
        )}
      />
      {caption && (
        <figcaption className="text-sm text-muted-foreground mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
```

---

## Usage Examples

```typescript
// Basic image
<ImageBlock 
  src="/images/safari.jpg" 
  alt="Lions in Masai Mara"
/>

// With caption
<ImageBlock 
  src="/images/safari.jpg" 
  alt="Lions in Masai Mara"
  caption="Male lion pride in Masai Mara National Reserve"
/>

// Fixed aspect ratio
<ImageBlock 
  src="/images/accommodation.jpg" 
  alt="Safari lodge"
  aspectRatio="16/9"
/>
```

---

## Accessibility Requirements

- [ ] **Required:** Alt text for all images
- [ ] Alt text describes image content accurately
- [ ] Decorative images use `alt=""` (empty string)
- [ ] Caption provides additional context (not duplicate alt)

---

**Version:** 1.0  
**Last Updated:** December 27, 2024  
**Status:** ✅ Complete

