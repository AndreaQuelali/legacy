# LEGACY Development Guide

## Build & Run
- **Install**: `npm install`
- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## Project Structure & Patterns
- **Routes**: `[locale]` based (next-intl).
- **Styles**: Tailwind CSS 4 (`src/app/globals.css`).
- **Components**:
  - `src/components/3d/`: R3F scenes and models.
  - `src/components/sections/`: High-level landing sections (Hero, Nations, etc.).
  - `src/components/ui/`: Atomic elements (buttons, inputs).
  - `src/components/animations/`: GSAP/Framer wrappers.
- **Providers**: `AnimationProvider` (GSAP), `ThemeProvider`, `ScrollProvider` (Lenis).

## Coding Standards
- **Naming**: PascalCase for React components, camelCase for variables/functions.
- **Types**: Use TypeScript interfaces/types for all props and data.
- **Animations**:
  - Use `fadeUp` from `AnimationProvider` for entry animations.
  - Use `useLayoutEffect` for GSAP initializations.
  - Framer Motion for simple hover/interaction states.
- **i18n**: Follow `next-intl` patterns. Add keys to `messages/[locale].json`.
- **UI**: Follow `DESIGN.md` for colors (`#050505`, `#eab308`) and typography (Bebas Neue).

## Core Dependencies
- Next.js 16 PRE-RELEASE
- React 19
- Tailwind CSS 4
- GSAP / Framer Motion / Lenis / Three.js
