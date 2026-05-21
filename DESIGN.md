---
name: Cinematic Arena
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d1c5b4'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#9a8f80'
  outline-variant: '#4e4639'
  surface-tint: '#e9c176'
  primary: '#e9c176'
  on-primary: '#412d00'
  primary-container: '#c5a059'
  on-primary-container: '#4e3700'
  inverse-primary: '#775a19'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#c8c6c5'
  on-tertiary: '#313030'
  tertiary-container: '#a7a5a5'
  on-tertiary-container: '#3c3b3b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#e9c176'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4201'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Bebas Neue
    fontSize: 120px
    fontWeight: '400'
    lineHeight: 110px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Bebas Neue
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: 0.05em
  headline-md:
    fontFamily: Bebas Neue
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: 0.1em
  headline-lg-mobile:
    fontFamily: Bebas Neue
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 48px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.2em
  stats-number:
    fontFamily: Bebas Neue
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 48px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 20px
  section-stack: 120px
---

## Brand & Style

This design system is built for the grandest stage in sports—the FIFA World Cup 2026. The brand personality is **Elite, Immersive, and Dramatic**. It captures the tension and triumph of world-class competition through a "Stadium at Night" aesthetic.

The visual style leverages **Glassmorphism** and **Layered Depth**. High-energy sports presentation is achieved through volumetric lighting effects, where light bleeds from the background to illuminate structural UI elements. The interface should feel like an integrated broadcast experience, moving away from flat SaaS conventions toward a rich, editorial storytelling environment.

- **Atmosphere:** Dark, moody backgrounds contrasted with brilliant "stadium light" highlights.
- **Motion:** Cinematic transitions, slow-zoom background images, and shimmering gold hover states.
- **Visual Priority:** High-fidelity athlete photography and bold typography take precedence over functional chrome.

## Colors

The palette is rooted in the "Golden Hour" of a championship match. 

- **Primary (Gold):** Used exclusively for moments of prestige—trophy icons, championship data, and active navigation states.
- **Neutral (Blacks/Charcoal):** The foundation of the system. `#050505` serves as the base void, while `#121212` creates structural layers.
- **Functional Glass:** Translucent surfaces use a tinted charcoal with high backdrop blur (20px+) to maintain legibility over busy stadium photography.
- **Accents:** High-contrast White is reserved for primary readability and action-oriented labels.

## Typography

The typographic hierarchy is built on extreme contrast. 

**Headlines** utilize **Bebas Neue** to evoke the feeling of historic stadium signage and newspaper headlines. These should be set with tight tracking for a compact, powerful look. 

**Body Text** and **Metadata** use **Inter** for its neutral, high-legibility characteristics, ensuring that dense tournament data remains accessible. 

- **Display Text:** Can utilize "Textured" masks (e.g., concrete or grass textures) for hero sections.
- **Labels:** Always uppercase with wide letter spacing to denote section headers or categories.
- **Numerical Data:** Use Bebas Neue for scoreboards and player numbers to maintain the athletic aesthetic.

## Layout & Spacing

This design system uses a **Fluid-Fixed Hybrid Grid**. 
- **Desktop:** A 12-column grid with a maximum container width of 1440px. Large margins (80px) allow the background atmospheric elements to breathe.
- **Vertical Rhythm:** Generous section spacing (120px) creates a cinematic pace, preventing the UI from feeling cluttered.
- **Mobile:** Transition to a 4-column grid with 20px margins. Stacked cards should utilize the full width to maintain the impact of player photography.

Content should follow a "Z-pattern" for storytelling, interspersed with full-width immersive breaks that showcase high-resolution stadium imagery.

## Elevation & Depth

Depth is conveyed through **Light and Transparency** rather than traditional drop shadows.

1.  **The Pitch (Base):** The deepest layer, usually containing dynamic photography or ambient smoke/particle effects.
2.  **The Glass (Middle):** UI containers using `backdrop-filter: blur(24px)` and a 1px border of `rgba(255,255,255,0.1)` to simulate physical glass panes.
3.  **The Glow (Top):** Active elements emit a soft gold outer glow (`#C5A059`), simulating the flare of stadium floodlights.
4.  **Parallax:** Implement subtle parallax on background layers to create a sense of three-dimensional space as the user scrolls.

## Shapes

The shape language is **Structured and Sharp**. 

To maintain a professional, high-performance athletic feel, we avoid overly rounded "bubbly" corners.
- **Standard UI Elements:** 4px (0.25rem) corner radius.
- **Featured Cards:** 8px (0.5rem) corner radius for a slightly softer, premium feel.
- **Interactive Triggers:** Ghost buttons and thin-line borders emphasize precision.

Use 45-degree angled "clipped" corners for decorative elements or call-to-action badges to reinforce the aggressive, competitive nature of the brand.

## Components

### Buttons
- **Primary:** Gold border (1px), transparent background, white uppercase text (Bebas Neue). On hover, fill with gold and switch text to black.
- **Secondary:** All-white text with a subtle underline or a chevron. No containing box.

### Cards (Player/Nation)
- Vertical orientation with full-bleed photography. 
- Use a bottom-to-top black gradient overlay to ensure text legibility at the base.
- 1px gold border appears only on hover.

### Stats & Numbers
- Displayed with large Bebas Neue glyphs.
- Labels sit underneath in Inter Bold, uppercase, 12px.

### Navigation
- Top-aligned, minimal. Use 1px thin gold lines to indicate the active page.
- "Explore" or "Live" buttons should have a subtle pulsing gold dot icon to indicate real-time activity.

### Glass Containers
- Used for content blocks. Must have `backdrop-filter: blur` to remain readable against stadium backgrounds.
- Borders should be "inner" and semi-transparent.