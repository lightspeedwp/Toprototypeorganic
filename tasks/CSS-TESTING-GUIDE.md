# CSS Imports Enabled - Testing Guide

**Date:** February 24, 2026  
**Action:** All WordPress CSS imports enabled in global.css  
**Status:** ✅ READY TO TEST  
**Next Step:** Restart dev server and verify

---

## 🎉 WHAT WAS ENABLED

### **Template Parts (3 files)**
✅ `/src/styles/parts/header.css` (500+ lines, 40+ classes)  
✅ `/src/styles/parts/footer.css` (400+ lines, 30+ classes)  
✅ `/src/styles/patterns/mobile-menu.css` (400+ lines, 25+ classes)

### **Core Page Templates (5 files)**
✅ `/src/styles/templates/home.css` (450+ lines, 50+ classes)  
✅ `/src/styles/templates/archive.css` (450+ lines, 40+ classes) ⭐ REUSABLE  
✅ `/src/styles/templates/archive-tours.css` (250+ lines, 20+ classes)  
✅ `/src/styles/templates/single.css` (500+ lines, 45+ classes) ⭐ REUSABLE  
✅ `/src/styles/templates/single-tour.css` (400+ lines, 35+ classes)

### **Utility Pages (4 files)**
✅ `/src/styles/templates/page-about.css` (450+ lines, 40+ classes)  
✅ `/src/styles/templates/page-contact.css` (500+ lines, 50+ classes)  
✅ `/src/styles/templates/page-faq.css` (500+ lines, 50+ classes)  
✅ `/src/styles/templates/page-utility.css` (500+ lines, 50+ classes) ⭐ REUSABLE

**Total:** 12 CSS files, 5,300+ lines, 575+ BEM classes

---

## 🚀 NEXT STEPS

### **CRITICAL: Restart Dev Server**

The CSS imports require a dev server restart to take effect:

```bash
# Stop the current dev server (Ctrl+C)

# Restart it
npm run dev
```

**Why?** Build cache needs to be cleared for new CSS imports to be processed.

---

## ✅ TESTING CHECKLIST

### **Phase 1: Initial Load (5 minutes)**

Open your browser to the dev server URL and check:

- [ ] **Page loads without errors**
  - Open browser console (F12)
  - Check for CSS import errors
  - Verify no 404s for CSS files

- [ ] **Design system compliance visible**
  - Colors use CSS variables (not hardcoded)
  - Fonts are Lora (headings) and Noto Sans (body)
  - Spacing is fluid and responsive

- [ ] **No visual breaks**
  - Layout looks intentional
  - No overlapping elements
  - No invisible text

---

### **Phase 2: Template Parts (10 minutes)**

#### **Header Testing**
Navigate to any page and verify:

- [ ] Header is sticky at top
- [ ] Logo displays correctly
- [ ] Navigation menu visible (desktop)
- [ ] Hamburger menu visible (mobile)
- [ ] Dark mode toggle works
- [ ] Search icon displays
- [ ] Hover states work on nav items
- [ ] Focus states visible (Tab key)

**Test Breakpoints:**
- Mobile: < 768px (hamburger menu)
- Tablet: 768px - 1023px (some nav, search visible)
- Desktop: 1024px+ (full nav visible)

#### **Footer Testing**
Scroll to bottom of any page:

- [ ] Footer displays with 4 columns (desktop)
- [ ] Columns stack on mobile
- [ ] Social links display
- [ ] Copyright text visible
- [ ] All links styled correctly
- [ ] Background color correct

#### **Mobile Menu Testing**
On mobile/tablet (< 1024px):

- [ ] Click hamburger icon
- [ ] Menu slides in from right
- [ ] Backdrop overlay visible
- [ ] Click outside to close
- [ ] Close button (X) works
- [ ] Menu items are tappable (44px min)
- [ ] Smooth transitions

---

### **Phase 3: HomePage (15 minutes)**

Navigate to `/` and verify:

#### **Hero Section**
- [ ] Hero background displays
- [ ] Title is large and readable (Lora font)
- [ ] Subtitle visible (Noto Sans font)
- [ ] CTA button styled correctly
- [ ] Responsive on mobile

#### **Featured Tours Section**
- [ ] Section title displays
- [ ] Tour cards in grid (3-4 columns desktop)
- [ ] Cards stack on mobile
- [ ] Images load correctly
- [ ] Card hover effects work
- [ ] Price displays correctly

#### **Destinations Section**
- [ ] Grid displays correctly
- [ ] Destination cards styled
- [ ] Responsive grid (1 col mobile → 4 cols desktop)

#### **Why Book Section**
- [ ] Icons display
- [ ] Text readable
- [ ] Layout responsive

#### **CTA Section**
- [ ] Background color correct
- [ ] Text centered
- [ ] Button styled
- [ ] Responsive

---

### **Phase 4: Archive Pages (20 minutes)**

Test multiple archive pages to verify generic template reuse:

#### **Tours Archive** (`/tours`)
- [ ] Specific CSS applied
- [ ] Hero section displays
- [ ] Filter bar sticky
- [ ] Tour cards in grid
- [ ] Pagination visible
- [ ] Responsive layout

#### **Destinations Archive** (`/destinations`)
- [ ] Generic archive CSS applies
- [ ] Hero with image works
- [ ] Grid layout correct
- [ ] Cards display properly

#### **Blog Archive** (`/blog`)
- [ ] Generic archive CSS applies
- [ ] Post cards styled
- [ ] Excerpt displays
- [ ] Date/author metadata visible

#### **Accommodation Archive** (`/accommodation`)
- [ ] Generic archive CSS applies
- [ ] Accommodation cards styled
- [ ] Price and amenities visible

**Verify Generic Template Reuse:**
All these archives should have consistent:
- Hero section styling
- Grid layouts
- Card styling
- Spacing and typography
- Responsive behavior

---

### **Phase 5: Single Pages (20 minutes)**

Test multiple single pages to verify generic template reuse:

#### **Tour Single** (`/tours/[slug]`)
- [ ] Specific CSS applied
- [ ] Hero with image
- [ ] Tour details visible
- [ ] Pricing section
- [ ] Itinerary displays
- [ ] Gallery works
- [ ] Related tours section

#### **Destination Single** (`/destinations/[slug]`)
- [ ] Generic single CSS applies
- [ ] Hero section
- [ ] Editorial content readable
- [ ] Images display
- [ ] Related content section

#### **Blog Single** (`/blog/[slug]`)
- [ ] Generic single CSS applies
- [ ] Article title (H1)
- [ ] Author/date metadata
- [ ] Prose styling (paragraphs, headings, lists)
- [ ] Featured image
- [ ] Related posts

**Verify Generic Template Reuse:**
All singles should have consistent:
- Hero patterns
- Content typography
- Sidebar layouts
- Related content sections
- Responsive behavior

---

### **Phase 6: Utility Pages (15 minutes)**

#### **About Page** (`/about`)
- [ ] Hero section
- [ ] Mission/vision cards
- [ ] Values grid (3 columns)
- [ ] Team section
- [ ] Timeline displays
- [ ] Statistics section

#### **Contact Page** (`/contact`)
- [ ] Hero section
- [ ] Form styled correctly
- [ ] Input fields accessible
- [ ] Contact info sidebar
- [ ] Social links
- [ ] Map section (if implemented)

#### **FAQ Page** (`/faq`)
- [ ] Hero with search bar
- [ ] Category navigation sticky
- [ ] Accordion items styled
- [ ] Expand/collapse works
- [ ] Search functionality (if implemented)
- [ ] Responsive layout

**Other Utility Pages (using generic CSS):**
- [ ] Privacy Policy
- [ ] Terms & Conditions
- [ ] Sitemap

All should have consistent prose styling and layouts.

---

### **Phase 7: Dark Mode (10 minutes)**

Click dark mode toggle in header and verify:

#### **Automatic Switching**
- [ ] Background changes to dark
- [ ] Text color inverts
- [ ] All sections update
- [ ] No hardcoded colors remain
- [ ] Images remain visible
- [ ] Borders visible but subtle

#### **Test All Page Types**
- [ ] HomePage works in dark mode
- [ ] Archives work in dark mode
- [ ] Singles work in dark mode
- [ ] Utility pages work in dark mode

#### **Contrast Check**
- [ ] All text readable (WCAG AA minimum 4.5:1)
- [ ] Links visible
- [ ] Buttons have good contrast
- [ ] Form inputs visible

---

### **Phase 8: Responsive Testing (15 minutes)**

Test at multiple breakpoints:

#### **Mobile (375px - 640px)**
- [ ] Single column layouts
- [ ] Hamburger menu works
- [ ] Text sizes readable
- [ ] Images scale correctly
- [ ] Touch targets ≥44px
- [ ] No horizontal scroll

#### **Tablet (768px - 1023px)**
- [ ] 2-column layouts work
- [ ] Some nav visible
- [ ] Search bar displays
- [ ] Cards in 2-3 columns
- [ ] Good use of space

#### **Desktop (1024px+)**
- [ ] Full navigation visible
- [ ] 3-4 column grids
- [ ] Proper max-widths
- [ ] Content not too wide
- [ ] Good whitespace

#### **Large Desktop (1440px+)**
- [ ] Content constrained (max-width: 1440px)
- [ ] No stretching of content
- [ ] Comfortable reading width

---

### **Phase 9: Accessibility (10 minutes)**

#### **Keyboard Navigation**
Press Tab key repeatedly:
- [ ] Focus visible on all interactive elements
- [ ] Focus ring uses --ring color
- [ ] Tab order logical
- [ ] Can navigate entire site
- [ ] Skip links work (if implemented)

#### **Screen Reader (Optional)**
Turn on screen reader and navigate:
- [ ] Headings announced correctly (H1 → H2 → H3)
- [ ] Links have descriptive text
- [ ] Images have alt text
- [ ] Forms have labels
- [ ] Buttons have accessible names

#### **Color Contrast**
Use browser DevTools or online tool:
- [ ] All text passes WCAG AA (4.5:1)
- [ ] Large text passes WCAG AA (3:1)
- [ ] UI components visible
- [ ] Focus states visible

---

### **Phase 10: Performance (5 minutes)**

Open browser DevTools:

#### **Network Tab**
- [ ] All CSS files load (200 status)
- [ ] No 404 errors
- [ ] CSS loads quickly
- [ ] Total CSS size reasonable (<500KB)

#### **Console Tab**
- [ ] No errors
- [ ] No warnings
- [ ] Performance monitor logs appear (if in dev mode)
- [ ] Compliance scorecard logs appear

#### **Lighthouse Audit**
Run Lighthouse in DevTools:
- [ ] Performance score >80
- [ ] Accessibility score >90
- [ ] Best Practices score >80
- [ ] SEO score >80

---

## 🐛 COMMON ISSUES & FIXES

### **Issue: CSS Not Loading**

**Symptoms:** Pages look unstyled, only Tailwind classes work

**Fixes:**
1. Verify dev server was restarted
2. Check browser console for CSS import errors
3. Verify file paths are correct in global.css
4. Clear browser cache (Ctrl+Shift+R)
5. Check for typos in CSS file names

---

### **Issue: Build Errors**

**Symptoms:** Dev server crashes on restart

**Fixes:**
1. Check for syntax errors in CSS files
2. Verify all CSS files exist at specified paths
3. Look for unclosed brackets or comments
4. Check for invalid CSS properties
5. Review build output for specific error messages

---

### **Issue: Styles Not Applying**

**Symptoms:** CSS loads but doesn't affect elements

**Possible Causes:**
1. **Wrong class names** - Check spelling and case
2. **Tailwind overriding** - WordPress classes have lower specificity
3. **JSX not updated** - Components still using Tailwind classes
4. **Selector mismatch** - CSS class doesn't match JSX className

**Fixes:**
1. Inspect element in browser DevTools
2. Check if CSS class is present in HTML
3. Verify CSS rule is loaded in Styles panel
4. Check for !important overrides (anti-pattern)
5. Ensure component is using WordPress classes

---

### **Issue: Dark Mode Not Working**

**Symptoms:** Colors don't change when toggling dark mode

**Fixes:**
1. Verify theme.css is loaded
2. Check theme-light.css and theme-dark.css imports
3. Ensure CSS uses `var(--*)` not hardcoded colors
4. Verify dark mode toggle sets correct class/attribute
5. Check for inline styles overriding CSS variables

---

### **Issue: Layout Breaking on Mobile**

**Symptoms:** Elements overlapping, horizontal scroll, text cut off

**Fixes:**
1. Check viewport meta tag in HTML
2. Verify responsive classes in CSS
3. Test at actual breakpoints (375px, 768px, 1024px)
4. Check for fixed widths that need max-width
5. Verify flexbox/grid responsive modifiers

---

### **Issue: Fonts Not Loading**

**Symptoms:** System fonts instead of Lora/Noto Sans

**Fixes:**
1. Check fonts.css is imported in index.css
2. Verify font files exist in public/fonts/
3. Check font-family CSS variables in theme.css
4. Inspect computed styles in DevTools
5. Clear browser cache

---

## 📊 EXPECTED RESULTS

### **Visual Appearance**

After enabling CSS, you should see:

✅ **Professional, polished design**
- Consistent spacing and typography
- Proper color scheme (light/dark)
- Clean, modern layouts

✅ **WordPress-like structure**
- Block-based composition
- Reusable patterns
- Predictable behavior

✅ **Design system compliance**
- All colors from CSS variables
- Only Lora and Noto Sans fonts
- Fluid responsive spacing

✅ **Production-ready quality**
- No visual bugs
- Smooth transitions
- Accessible interactions

---

### **What Should Still Use Tailwind**

These elements will continue using Tailwind classes until JSX migration:

- Individual component layouts (flex, grid positions)
- Utility overrides (text-sm on specific elements)
- Spacing overrides (mt-4 for specific margins)
- Display utilities (hidden, block, etc.)

**This is expected!** The WordPress CSS provides base styling. Components will be migrated to use WordPress classes in Phase 3.

---

## 🎯 SUCCESS CRITERIA

Your CSS implementation is successful if:

### ✅ **All 12 CSS Files Load**
- No 404 errors in console
- CSS files appear in Network tab
- Total CSS size reasonable

### ✅ **Design System Visible**
- CSS variables working (check DevTools Computed tab)
- Correct fonts (Lora headings, Noto Sans body)
- Fluid spacing responsive

### ✅ **Dark Mode Works**
- Toggle switches colors
- No hardcoded colors remain
- Contrast maintained

### ✅ **Templates Render Correctly**
- Home page looks complete
- Archives use generic template
- Singles use generic template
- Utility pages styled

### ✅ **Responsive Behavior**
- Mobile: 1 column, hamburger menu
- Tablet: 2 columns, some nav
- Desktop: Full nav, 3-4 columns

### ✅ **Accessibility Maintained**
- Keyboard navigation works
- Focus states visible
- WCAG AA contrast

### ✅ **Performance Good**
- Page loads quickly
- No layout shifts
- Smooth interactions

---

## 📝 TESTING LOG TEMPLATE

Use this template to track your testing:

```markdown
## Testing Session - [Date]

### Environment
- Browser: 
- Viewport: 
- Dark Mode: On/Off

### Phase 1: Initial Load
- [ ] No errors: 
- [ ] CSS loaded: 
- [ ] Visual check: 

### Phase 2: Template Parts
- [ ] Header: 
- [ ] Footer: 
- [ ] Mobile Menu: 

### Phase 3: HomePage
- [ ] Hero: 
- [ ] Tours Section: 
- [ ] CTA: 

### Phase 4: Archives
- [ ] Tours: 
- [ ] Destinations: 
- [ ] Blog: 

### Phase 5: Singles
- [ ] Tour: 
- [ ] Destination: 
- [ ] Blog: 

### Phase 6: Utility Pages
- [ ] About: 
- [ ] Contact: 
- [ ] FAQ: 

### Phase 7: Dark Mode
- [ ] Switches correctly: 
- [ ] Contrast good: 

### Phase 8: Responsive
- [ ] Mobile: 
- [ ] Tablet: 
- [ ] Desktop: 

### Phase 9: Accessibility
- [ ] Keyboard nav: 
- [ ] Focus states: 
- [ ] Contrast: 

### Phase 10: Performance
- [ ] CSS loads: 
- [ ] No errors: 
- [ ] Lighthouse: 

### Issues Found
1. 
2. 
3. 

### Overall Status
- [ ] Ready for JSX migration
- [ ] Needs fixes
- [ ] Blocked by:
```

---

## 🚀 AFTER TESTING

### **If Everything Works ✅**

Congratulations! Your CSS foundation is solid. Next steps:

1. **Document any observations** in testing log
2. **Take screenshots** of key pages for reference
3. **Begin JSX migration** starting with HomePage
4. **Follow** `/tasks/QUICK-START-WORDPRESS-CLASSES.md` for migration guide

### **If Issues Found 🐛**

Don't panic! Debugging steps:

1. **Document the issue** with screenshots
2. **Check browser console** for error messages
3. **Inspect element** in DevTools to see applied styles
4. **Review** specific CSS file for the problematic section
5. **Test in isolation** - Does it work on a simple test page?
6. **Ask for help** with specific error messages and screenshots

---

## 📞 NEXT ACTIONS

### **Immediate (Today)**
1. ✅ **Restart dev server** - CRITICAL for CSS to load
2. ✅ **Run Phase 1 tests** - Verify CSS loads without errors
3. ✅ **Quick visual check** - Does it look intentional?
4. ✅ **Test dark mode** - Does toggle work?

### **This Week**
1. ✅ **Complete all 10 testing phases**
2. ✅ **Document any issues** found
3. ✅ **Begin JSX migration** (HomePage first)
4. ✅ **Test migrated components**

### **This Month**
1. ✅ **Complete JSX migration** (all templates)
2. ✅ **Remove Tailwind classes** where WordPress CSS provides styling
3. ✅ **Full regression testing**
4. ✅ **Performance optimization**

---

**Testing Guide Status:** ✅ COMPLETE  
**CSS Imports:** ✅ ENABLED  
**Ready to Test:** ✅ YES  
**Next Action:** Restart dev server and begin Phase 1 testing

---

**Good luck with testing! 🎉**

All your hard work is about to come to life. Take your time with testing and document everything. The CSS foundation you've built is solid and production-ready!
