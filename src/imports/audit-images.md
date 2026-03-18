# Audit Images — Broken Image & Asset Compliance

**Type:** Audit  
**Created:** 2026-03-16  
**Version:** 1.0.0  
**Status:** Ready  
**Trigger Word:** `audit images`

---

## Prompt Purpose

**Objective:** Audit all images across the entire codebase for broken URLs, missing alt text, accessibility violations, performance issues, and asset compliance. Fix broken images by replacing them with valid Unsplash URLs via the `unsplash_tool`.

**When to Use:** After adding new pages, importing content, updating data files, or when visual gaps/broken images are reported.

**Reference Guidelines:**
- `/guidelines/accessibility.md`
- `/guidelines/design-tokens/iconography.md`
- `/guidelines/build-rules.md`

---

## Workflow Steps

### Step 1: Inventory All Image Sources

Scan the entire codebase for image references:

1. **`<img>` tags** — Search all `.tsx` files for `<img` elements
2. **`<ImageWithFallback>` components** — Search for `ImageWithFallback` usage
3. **CSS `backgroundImage` inline styles** — Search for `backgroundImage.*url(`
4. **CSS `background-image` in stylesheets** — Search `.css` for `url(http`
5. **`figma:asset` imports** — Search for `import.*figma:asset`
6. **SVG imports from `/src/imports/`** — Search for `import.*imports/svg`
7. **Data file image URLs** — Search all `/src/app/data/*.ts` files for `unsplash`, `imageUrl`, `featuredImage`, `avatar`, `photo`, `thumbnail`

### Step 2: Validate Image URLs

For each image URL found:

1. **Unsplash URLs** — Verify the photo ID portion of the URL is a valid format (not dynamically constructed with arithmetic)
2. **External URLs** — Flag any non-Unsplash external URLs (third-party CDNs, texture sites, etc.) as fragile dependencies
3. **Dynamic URL construction** — Flag any template literal URLs that use arithmetic to generate photo IDs (e.g., `photo-${baseId + index}`) — these produce invalid Unsplash URLs
4. **Duplicate URLs** — Identify images reused across multiple files (not a violation, but worth noting for deduplication to data files)

### Step 3: Accessibility Compliance

Check every `<img>` and `<ImageWithFallback>` for:

1. **`alt` attribute** — Must be present and descriptive (not empty unless decorative)
2. **Decorative images** — Must use `alt=""` AND `aria-hidden="true"` or be CSS background images
3. **`loading="lazy"`** — All below-fold images should have `loading="lazy"`
4. **Role attribute** — Decorative background images in `<div>` elements should have `role="img"` if they convey meaning, or `aria-hidden="true"` if decorative

### Step 4: Performance Check

1. **Image sizing** — Check for missing `width`/`height` attributes (causes CLS)
2. **Unsplash parameters** — Verify URLs include `w=` sizing parameters to avoid loading full-resolution images
3. **Format optimization** — Check for `auto=format` parameter in Unsplash URLs

### Step 5: Fix Broken Images

For each broken image found:

1. Use the `unsplash_tool` to find a replacement image matching the context
2. Replace the broken URL with the new valid Unsplash URL
3. Ensure the replacement includes proper `w=`, `q=`, and `fit=` parameters
4. Verify `alt` text is contextually accurate

### Step 6: Report

Save report to `/reports/YYYY-MM/YYYY-MM-DD-image-audit.md` with:

- Total images audited (by source type)
- Broken/invalid URLs found (with file and line)
- Missing alt text violations
- Missing `loading="lazy"` violations
- External dependency risks
- Dynamically constructed URL issues
- Fixes applied
- Remaining issues

---

## Image Source Categories

| Category | Location Pattern | Priority |
|---|---|---|
| Template inline images | `/src/app/components/templates/*.tsx` | P1 — user-facing |
| Pattern images | `/src/app/components/patterns/*.tsx` | P1 — reused across pages |
| Data file images | `/src/app/data/*.ts` (featuredImage, avatar, photo, imageUrl) | P1 — feeds multiple templates |
| Post format images | `/src/app/components/templates/post-formats/*.tsx` | P2 — content pages |
| CSS background images | `backgroundImage` inline styles in `.tsx` | P2 — decorative |
| External textures | Third-party URLs (transparenttextures, etc.) | P3 — fragile dependencies |

---

## Known Patterns

### Valid Unsplash URL Format

```
https://images.unsplash.com/photo-{PHOTO_ID}?w={WIDTH}&q={QUALITY}&auto=format&fit=crop
```

### Invalid Dynamic Construction

```typescript
// BAD — produces invalid photo IDs for index > 0
`https://images.unsplash.com/photo-${1494790108377 + i}?w=400`

// GOOD — use array of real Unsplash URLs
const avatars = ['https://images.unsplash.com/photo-...', ...]
```

---

## Success Criteria

- [ ] All image URLs are valid and load correctly
- [ ] Zero dynamically constructed Unsplash photo IDs
- [ ] All `<img>` tags have `alt` attributes
- [ ] All below-fold images have `loading="lazy"`
- [ ] Zero external third-party image dependencies (or documented as acceptable)
- [ ] Report saved to `/reports/`
