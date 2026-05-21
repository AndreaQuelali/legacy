# LEGACY | World Cup 2026 Landing Project

LEGACY es una landing page cinematográfica de alto impacto inspirada en la Copa Mundial 2026, diseñada con una estética épica y deportiva premium.

## 🚀 Stack Tecnológico

- **Framework:** [Next.js 16+](https://nextjs.org/) (App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animaciones:**
  - [GSAP](https://gsap.com/) + ScrollTrigger (Animaciones complejas y basadas en scroll)
  - [Framer Motion](https://www.framer.com/motion/) (Micro-interacciones y transiciones de estado)
  - [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll global)
- **3D Engine:**
  - [Three.js](https://threejs.org/)
  - [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
  - [Drei](https://github.com/pmndrs/drei)
- **UI & Componentes:**
  - [Shadcn UI](https://ui.shadcn.com/)
  - [Lucide React](https://lucide.dev/)

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una estructura limpia y escalable dentro del directorio `src/`:

```text
src/
├── app/             # Rutas, layouts y páginas principales
├── components/      # Componentes organizados por responsabilidad
│   ├── 3d/          # Escenas y modelos React Three Fiber
│   ├── animations/  # Envoltorios y utilidades de animación
│   ├── layout/      # Navbar, Footer, etc.
│   ├── sections/    # Secciones principales de la landing
│   ├── ui/          # Componentes atómicos (Shadcn)
│   └── shared/      # Componentes reutilizables generales
├── hooks/           # Custom hooks (scroll, viewport, etc.)
├── lib/             # Configuraciones de librerías de terceros
├── providers/       # Providers globales (Theme, Scroll, Animation)
├── styles/          # Tokens de diseño y CSS global
└── utils/           # Utilidades puras
```

## 🛠️ Cómo empezar

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Corre el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎨 Convenciones de Diseño

- **Paleta:** Negro profundo (`#050505`), Dorado (`#eab308`), y overlays radiales.
- **Tipografía:** Moderna, con alto contraste en pesos para títulos.
- **Animaciones:** Preferir GSAP para secuencias complejas. Usar el `AnimationProvider` para registrar plugins.

## 📦 Agregar nueva sección

1. Crea el componente en `src/components/sections/`.
2. Importalo en `src/app/page.tsx`.
3. Usa el helper `fadeUp` de `AnimationProvider` para añadir entrada suave.

---
Desarrollado con pasión para el LEGACY PROJECT 2026.
