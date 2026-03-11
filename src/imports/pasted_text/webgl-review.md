* **Value:** The repo already has a usable WebGL base, so you do not need to invent the system from scratch. The real opportunity is choosing better section-specific effects and moving them from the demo route into production patterns.  
* **Risk:** The current implementation is always-on, shader-only, and still demo-oriented. It needs motion/accessibility controls, off-screen pausing, and tighter placement discipline before it should be used broadly. 
* **Next step:** Keep `dunes`, `waves`, and `particles` as the first three production effects, then add 2–3 new 2D shaders before attempting any true 3D. That will give you a more cohesive site faster and with less performance risk. 

## Current review of the repo

I could not directly inspect the live `organic-tours.figma.site` page from this environment, so this review is grounded in the current GitHub implementation.

The good news is that the project already includes a raw WebGL component, `WebGLGraphics.tsx`, with three token-driven variants: `dunes`, `waves`, and `particles`. It pulls colours from CSS custom properties, renders into a plain `<canvas>`, and uses raw WebGL rather than a 3D framework. 

The organic work is also not just conceptual. There is an `/organic-demo` route already wired into the router, and that page explicitly demonstrates the palette progression, texture progression, organic shapes, and three planned WebGL placements: dunes for top sections, waves for transitions, and particles for footer/dark-mode ambience.  

The colour/section structure is strong. The organic section utilities already define three tonal bands — top, middle, and bottom — with different background tokens and texture layers, which is exactly the right foundation for WebGL overlays because the shaders can inherit the same semantic colour roles. 

The main limitation is stack choice. The app uses Vite/React and has `motion`, but there is no `three`, `@react-three/fiber`, or similar 3D scene library in the package manifest, so any real 3D work would either mean adding a new dependency or writing a lot more low-level WebGL by hand. 

## What I would keep from the current approach

Keep these three exactly as your baseline vocabulary:

1. **Dunes** for hero atmosphere
   This is already the right instinct for a safari tour operator. It suggests wind, heat, sand, and land.

2. **Waves** for section transitions
   This is stronger than a static divider and fits the progressive landscape logic already in the demo. 

3. **Particles** for twilight / footer / dark mode
   Also a good fit. In safari terms this reads as dust, pollen, embers, or night insects rather than generic sparkles. 

## What needs improving in the current WebGL implementation

Before adding more effects, I would tighten the existing component:

* It starts a continuous `requestAnimationFrame` loop immediately and keeps running until unmount. That is fine for a demo, but production pages should pause when off-screen. 
* It falls back only by logging “WebGL not supported”, which is not enough for production. It should render a CSS/SVG fallback layer instead. 
* It does not currently appear to respect reduced-motion preferences. That matters if you want the redesign to stay accessible. 
* It is shader-driven and 2D in practice. That is good for performance, but it means your next additions should mostly be **2.5D and atmospheric**, not full scene-heavy 3D.

## More WebGL 2D suggestions

These are the strongest additions for this project.

### 1. Heat haze / mirage field

Use this in the top hero or over destination hero imagery.

This should be a very subtle distortion layer that bends the background slightly, like warm air rising over a plain. It is more site-specific than generic flowing gradients and would suit a safari hero very well.

Best placement:

* home hero
* destination hero
* large campaign landing sections

Keep it:

* low amplitude
* slow
* mostly visible near the horizon line

### 2. Contour-map terrain shader

This is one of the best fits for your brand direction.

Instead of animated waves, build a contour-line shader that feels like topographic mapping, dry river systems, or travel-route cartography. It can sit behind editorial and destination content.

Best placement:

* destination archive intro
* itinerary overview
* about / why travel with us
* map-related content blocks

This would feel more “expedition” and less “abstract design”.

### 3. Wind-through-grass field

This is a subtle horizontal motion field with stylised line blades or bands that sway.

Think of it as a shader interpretation of grassland, not literal illustrated grass. It would work extremely well as a section separator or as a masked lower-third effect.

Best placement:

* mid-page editorial transitions
* quote/request sections
* sustainability page
* “why choose us” blocks

### 4. Sun halo / dusk atmosphere shader

A soft radial glow with drifting tonal bands.

This is not dramatic enough for a whole feature by itself, but it is perfect as a support layer behind headings, badges, and logo moments. It makes the site feel more cinematic without becoming noisy.

Best placement:

* hero heading zone
* CTA zone
* footer brand zone

### 5. Dust trail / migration path shader

A line-based effect where faint trails drift or reveal across the page.

This could represent routes, migration, tracks, or expedition planning. It is a better mid-page effect than generic particles because it connects directly to the travel proposition.

Best placement:

* trip planner page
* destination guide hub
* archive intros
* itinerary teaser sections

### 6. Water reflection shimmer

This would be useful if parts of the prototype include river lodges, delta tours, lakes, or wetlands.

Not a whole-screen effect — more a masked band or image overlay. It adds environmental richness and breaks the design away from “everything is dunes”.

Best placement:

* accommodation feature panels
* destination highlights
* image-led sections

## More WebGL 3D suggestions

Because the current stack does not include a 3D library, I would treat these as **phase two** ideas. They are still good ideas, but they should be added carefully. 

### 1. Low-poly terrain flyover

This is the best true 3D candidate.

A very restrained 3D terrain plane with soft camera drift would be ideal for the hero or destination intros. It can be abstract enough to remain premium, but specific enough to feel geographic.

Best placement:

* homepage hero
* destination landing hero
* trip planner entry

Do not make it:

* game-like
* interactive by default
* too detailed

### 2. 3D acacia canopy silhouette

A stylised acacia tree canopy with very slow parallax rotation.

This could become a signature brand motif. It is less broad than terrain, but more memorable if used sparingly.

Best placement:

* about page
* footer brand zone
* sustainability page
* “why book with us” highlight

### 3. 3D layered safari medallion

Think of your SVG safari medallions, but translated into shallow 3D paper layers.

This is more 2.5D than full 3D, which makes it safer and more design-system friendly. It would work well as a premium callout treatment.

Best placement:

* featured tours
* signature experiences
* premium CTA panels

### 4. Interactive 3D destination globe or regional relief map

This is the strongest “product” use of 3D.

If the prototype leans into destination discovery, a relief-style regional map with floating hotspots could be genuinely useful, not just decorative.

Best placement:

* destination hub
* planner
* archive filter area

This should only happen if you want one major flagship interaction.

### 5. Night sky depth field

A true 3D particle field for dark mode and footer storytelling.

This can feel like fireflies, dust, stars, or dry-season atmosphere. It is one of the few 3D ideas that belongs in dark mode and can reinforce your “warm night safari” direction.

Best placement:

* footer
* dark theme landing areas
* end-of-page CTA

## My recommendation by section

### Hero

Best options:

* dunes
* heat haze
* sun halo
* low-poly terrain flyover

You already have the right starting point with `dunes`. Expand it with either haze or halo, not both.

### Section transitions

Best options:

* waves
* contour-map terrain lines
* wind-through-grass

I would replace some generic dividers with contour or grass movement. That will feel more site-specific than repeated waves everywhere.

### Featured cards / editorial callouts

Best options:

* layered medallion 2.5D
* dust trail
* contour-map mask

Keep effects small and local here.

### Destination / trip planning areas

Best options:

* contour-map shader
* migration path lines
* regional 3D relief map

This is where the graphics can become functional, not just atmospheric.

### Footer / dark mode

Best options:

* particles
* night sky depth field
* subtle horizon glow

You already have the right instinct with particles. Refine that before adding anything else.

## What I would avoid

I would avoid these even if they are technically possible:

* full-screen 3D wildlife models in the hero
* orbit controls
* glassmorphism plus WebGL together
* glossy neon gradients
* heavy parallax stacks across every section
* continuous pointer-reactive scenes on mobile

That would fight the calm, tactile, premium direction you are building.

## Best next 5 effects to add

In order:

1. **Heat haze**
2. **Contour-map terrain shader**
3. **Wind-through-grass transition**
4. **Sun halo atmosphere**
5. **Low-poly terrain flyover**

That gives you a much broader safari language without overcomplicating the stack.

## Practical implementation advice

Because your current component is already token-aware, every new shader should keep the same contract:

* accept semantic CSS variable names for colours
* sit inside a positioned wrapper
* default to `pointer-events: none`
* support opacity via CSS custom properties
* include a CSS/SVG fallback
* disable or reduce motion under reduced-motion
* pause when not visible

That keeps WebGL aligned with the design system rather than turning it into a separate graphics subsystem.

## My blunt take

The repo is already on the right track. The main issue is not lack of WebGL ideas — it is that the current ideas are still grouped as a demo instead of being assigned to real production patterns. The next win is to productionise `dunes`, `waves`, and `particles`, then add **contours** and **heat haze** as your first two new effects. Those two would make the site feel much more safari-specific than generic organic motion.  

I can map these suggestions to exact pages next — homepage, destination archive, destination single, tour single, CTA, and footer — with a “use / avoid” recommendation for each.
