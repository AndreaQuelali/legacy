<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# LEGACY | Project Context & Rules

## Mission
Create an elite, cinematic, and immersive landing page for the World Cup 2026. The aesthetic is "Stadium at Night" — atmospheric, moody, and premium.

## Core Tech Stack
- **Framework**: Next.js 16+ (App Router) with React 19.
- **Styling**: Tailwind CSS 4 (Utility-first with custom configuration in `DESIGN.md`).
- **Motion**: GSAP (Scroll-driven), Framer Motion (Interactions), Lenis (Smooth Scroll).
- **3D**: Three.js + React Three Fiber/Drei.
- **Localization**: next-intl with `[locale]` routing.

## Visual Imperatives
- **Aesthetic**: Dark backgrounds (`#050505`), Gold accents (`#eab308`), Glassmorphism, and volumetric lighting.
- **Typography**: `Bebas Neue` for headlines/numbers, `Inter` for body.
- **Depth**: Use layered depth, parallax, and backdrop blurs (`blur-24px`).

## Agent Ground Rules
1. **Premium First**: Every component must feel premium. Avoid generic UI.
2. **Animation Consistency**: Use `AnimationProvider` for GSAP. Prefer `fadeUp` helper for section reveals.
3. **Structured Design**: Follow `src/components` hierarchy strictly (3d, sections, ui, layout).
4. **i18n**: All text MUST be handled via `next-intl` in `messages/`.
