# Proposal

## Why

El sitio actual del emprendimiento turístico "Waterfall & Sugarcane El Flaco" presenta una landing page genérica y plana que no comunica la identidad de marca, no genera confianza ni urgencia de visita, y carece de canales de conversión claros (WhatsApp, formulario, llamada). Se necesita un rediseño integral que transforme el sitio en una herramienta activa de captación de visitantes, alineada con estándares modernos de rendimiento (Core Web Vitals), accesibilidad y experiencia de usuario.

## What Changes

- **Nuevo sistema de tokens de diseño** (paleta semántica, escala tipográfica y espaciado) definido en `global.css` como CSS custom properties bajo el bloque `@theme` de Tailwind CSS v4. Los tokens actuales (`brand-green`, `brand-bg`, etc.) serán extendidos y reorganizados con roles semánticos explícitos.
- **Rediseño completo del `Hero.astro`**: imagen LCP optimizada con `<picture>` + `fetchpriority="high"`, badge de prueba social visible, headline con propuesta de valor, CTA principal hacia WhatsApp y CTA secundario hacia formulario.
- **Nuevo componente `Services.astro`** (reemplaza `Attractions.astro` como sección principal de servicios): tarjetas con micro-interacciones CSS (`@starting-style`, `scale-up` on hover) sin JS.
- **Nuevo componente `SocialProof.astro`** que centraliza la prueba social: contador de visitantes, años de experiencia y rating agregado; reemplaza la sección `About` actual como bloque de confianza.
- **Refactor de `Testimonials.astro`**: rediseño visual con scroll-driven reveal effects (CSS nativo `animation-timeline: view()`) y fallback con `IntersectionObserver`.
- **Nuevo componente `HowItWorks.astro`**: sección de proceso de visita en 3–4 pasos con iconografía inline SVG, reemplaza `Events.astro` como sección informativa central.
- **Nuevo componente `ContactBlock.astro`** (activa la sección `Contact` actualmente comentada): formulario HTML nativo con validación `required`/`type`, botón flotante de WhatsApp sticky y enlace `tel:` para llamada directa.
- **Actualización de `Layout.astro`**: `lang="es"`, `<title>` y `<meta description>` con copy real, preload de fuente crítica (`Playfair Display`), preconnect a Google Fonts ya existente.
- **Scroll-entry reveal animations** en secciones secundarias usando CSS Scroll-driven Animations (`animation-timeline: view()`) con `@media (prefers-reduced-motion: reduce)` como fallback, más `IntersectionObserver` JS para Firefox (browser que no soporta scroll-driven animations aún).
- **`Header.astro`**: navbar con glassmorphism (`backdrop-filter: blur`) y detección de scroll para modo sticky usando `@starting-style` sin JS; el CTA de reserva siempre visible en desktop.

## Capabilities

### New Capabilities

- `design-system`: Tokens de diseño semánticos (colores, tipografía, espaciado) definidos en `global.css`; paleta y escala que toda la UI consume.
- `landing/hero`: Hero section con imagen LCP optimizada, propuesta de valor, prueba social inline y CTAs de conversión.
- `landing/services`: Sección de servicios/experiencias con tarjetas interactivas y micro-animaciones CSS.
- `landing/social-proof`: Bloque de prueba social (métricas numéricas + testimonios rediseñados).
- `landing/how-it-works`: Proceso de visita paso a paso como sección informativa clave.
- `landing/contact`: Bloque de contacto con formulario HTML nativo, botón WhatsApp sticky y enlace a llamada.
- `motion/scroll-reveal`: Sistema de animaciones de entrada al hacer scroll usando CSS Scroll-driven Animations con fallback accesible.

### Modified Capabilities

_(ninguna — no existen specs previas en este proyecto)_

## Impact

- **Archivos modificados**: `src/styles/global.css`, `src/layouts/Layout.astro`, `src/pages/index.astro`, `src/components/Hero.astro`, `src/components/Header.astro`, `src/components/Testimonials.astro`, `src/components/TestimonialCard.astro`.
- **Archivos nuevos**: `src/components/Services.astro`, `src/components/ServiceCard.astro`, `src/components/SocialProof.astro`, `src/components/HowItWorks.astro`, `src/components/ContactBlock.astro`, `src/components/WhatsAppFAB.astro`, `src/components/StepCard.astro`.
- **Archivos eliminados/deprecados**: `src/components/Attractions.astro`, `src/components/AttractionCard.astro`, `src/components/Events.astro`, `src/components/EventCard.astro` (su función informativa pasa a `HowItWorks`).
- **Dependencias**: Ninguna nueva dependencia de npm. Todo el movimiento se implementa con CSS nativo (Scroll-driven Animations) + JS mínimo solo para el fallback de Firefox. Tailwind CSS v4 ya instalado.
- **Rendimiento**: Se requiere que el LCP del Hero esté por debajo de 2.5 s en conexión 4G simulada. Las imágenes del Hero deben servirse en formato AVIF/WebP.
