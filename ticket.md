Quiero que construyas la configuración inicial y la estructura base de un proyecto frontend moderno llamado “LEGACY”, una landing page cinematográfica inspirada en la Copa Mundial 2026.

IMPORTANTE:
NO desarrolles todavía toda la landing completa.
SOLO crea:
- configuración inicial,
- arquitectura del proyecto,
- estructura de carpetas,
- providers,
- layout principal,
- configuración de librerías,
- componentes base,
- sistema de animaciones preparado,
- estilos globales,
- secciones vacías listas para desarrollarse.

STACK OBLIGATORIO:
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- GSAP
- Framer Motion
- Lenis (smooth scroll)
- Three.js
- React Three Fiber
- Drei
- Shadcn/UI
- Lucide React
- clsx
- tailwind-merge

OBJETIVO VISUAL:
La landing debe tener estética:
- cinematic stadium,
- deportiva premium,
- oscura,
- épica,
- moderna,
- tipo trailer de FIFA/Champions League.

CONFIGURACIÓN INICIAL:

1. Configura correctamente:
- Tailwind
- TypeScript
- aliases (@/components, @/lib, etc.)
- ESLint
- Prettier
- fuentes modernas
- variables CSS globales
- modo dark por defecto

2. Instala y configura:
- GSAP + ScrollTrigger
- Framer Motion
- Lenis
- React Three Fiber
- Drei
- Shadcn UI

3. Crea la estructura profesional de carpetas:

src/
 ├── app/
 ├── components/
 │    ├── ui/
 │    ├── layout/
 │    ├── sections/
 │    ├── animations/
 │    ├── 3d/
 │    └── shared/
 ├── hooks/
 ├── lib/
 ├── providers/
 ├── styles/
 ├── data/
 ├── types/
 └── utils/

4. Crear providers globales:
- SmoothScrollProvider (Lenis)
- AnimationProvider
- ThemeProvider

5. Crear configuración base de GSAP:
- registrar ScrollTrigger
- helper reutilizable para animaciones

6. Crear layout principal:
- navbar cinematográfico transparente
- background oscuro
- overlay gradients
- estructura responsive
- footer minimalista

7. Crear componentes vacíos base:
- HeroSection
- NationsSection
- PlayersSection
- StadiumSection
- TimelineSection
- CTASection

NO implementar contenido complejo todavía.
Solo placeholders elegantes y estructura lista.

8. Crear sistema de estilos globales:
- colores cinematográficos
- dorado suave
- negro profundo
- overlays
- glow effects
- typography moderna

9. Configurar:
- scroll smooth global
- optimización para animaciones
- performance básica
- lazy loading preparado

10. Agregar:
- utilidades reutilizables
- helpers para classnames
- hooks base para scroll y viewport

11. Crear una escena inicial simple de React Three Fiber:
- canvas fullscreen
- iluminación básica
- objeto placeholder animado
- preparado para futuros modelos 3D

12. Crear README profesional que explique:
- stack
- arquitectura
- convenciones
- cómo correr el proyecto
- cómo agregar nuevas secciones
- cómo usar animaciones GSAP
- cómo usar componentes 3D

13. Buenas prácticas obligatorias:
- clean architecture
- componentes reutilizables
- separación clara
- escalabilidad
- performance first
- responsive first
- código limpio y mantenible

14. El proyecto debe verse profesional desde el inicio aunque tenga placeholders.

15. NO usar estilos inline innecesarios.
16. NO crear lógica innecesaria todavía.
17. NO agregar backend.
18. NO agregar autenticación.
19. NO agregar CMS.

Solo dejar una base sólida, moderna y escalable para continuar el desarrollo de la landing cinematográfica.