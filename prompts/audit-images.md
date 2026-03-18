# Audit Images — Broken Image & Asset Compliance

**Type:** Audit  
**Created:** 2026-03-18  
**Version:** 2.0.0  
**Status:** Active  
**Trigger Word:** `audit images`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Audit all images across the entire codebase for broken URLs, missing alt text, accessibility violations, performance issues, and asset compliance. Fix broken images by replacing them with valid Unsplash URLs via the `unsplash_tool`.

**When to Use:** After adding new pages, importing content, updating data files, or when visual gaps/broken images are reported.

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

1. **Unsplash URLs** — Verify photo ID format is valid (not dynamically constructed with arithmetic).
2. **External URLs** — Flag non-Unsplash external URLs as fragile dependencies.
3. **Dynamic URL construction** — Flag template literal URLs using arithmetic to generate photo IDs.
4. **Duplicate URLs** — Identify images reused across multiple files.

### Step 3: Accessibility Compliance

1. **`alt` attribute** — Must be present and descriptive (not empty unless decorative).
2. **Decorative images** — Must use `alt=""` AND `aria-hidden="true"` or be CSS background images.
3. **`loading="lazy"`** — All below-fold images should have `loading="lazy"`.
4. **Role attribute** — Decorative background `<div>` elements should have `aria-hidden="true"`.

### Step 4: Performance Check

1. **Unsplash parameters** — Verify URLs include `w=` sizing parameters.
2. **Format optimization** — Check for `auto=format` parameter in Unsplash URLs.

### Step 5: Fix Broken Images

For each broken image:
1. Use the `unsplash_tool` to find a replacement matching the context.
2. Replace the broken URL with the new valid Unsplash URL.
3. Ensure replacement includes proper `w=`, `q=`, and `fit=` parameters.
4. Verify `alt` text is contextually accurate.

### Step 6: Report

Save report to `/reports/YYYY-MM/image-audit.md` with:
- Total images audited (by source type)
- Broken/invalid URLs found
- Missing alt text violations
- Missing `loading="lazy"` violations
- Fixes applied
- Remaining issues

---

## Image Source Priority

| Category | Location | Priority |
|---|---|---|
| Data file images | `/src/app/data/*.ts` | P1 — feeds multiple templates |
| Pattern images | `/src/app/components/patterns/*.tsx` | P1 — reused across pages |
| Template inline images | `/src/app/pages/*.tsx` | P1 — user-facing |
| CSS background images | `backgroundImage` in `.tsx` | P2 — decorative |

---

## Success Criteria

- [ ] All image URLs are valid and load correctly
- [ ] Zero dynamically constructed Unsplash photo IDs
- [ ] All `<img>` tags have `alt` attributes
- [ ] All below-fold images have `loading="lazy"`
- [ ] Zero external third-party image dependencies (or documented)
- [ ] Report saved to `/reports/`
