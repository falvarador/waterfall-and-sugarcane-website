# Design

## Context

El proyecto es una landing page estática construida con **Astro 7** + **Tailwind CSS v4** (vía plugin `@tailwindcss/vite`). No hay framework de UI reactivo (React, Vue, Preact) instalado; el directorio `src/components/` contiene únicamente componentes `.astro`. Hay íconos SVG inline encapsulados en `src/components/icons/` y un `IconRenderer.astro` como dispatcher.

El estado actual del sitio presenta:
- Ausencia de optimización de imagen LCP (usa `background-image` CSS, no `<picture>`)
- Paleta de colores reducida (5 tokens) sin roles semánticos completos
- Sección `Contact.astro` con el formulario vacío y comentada en `index.astro`
- Sección `Events.astro` que actúa como listado de fechas, sin valor como proceso informativo
- Sin animaciones de scroll-reveal
- Sin FAB de WhatsApp flotante

Ver `proposal.md → Why` para la motivación completa.

## Goals / Non-Goals

**Goals:**
- Definir la arquitectura de tokens de diseño que unifique la paleta visual
- Decidir cómo implementar las animaciones de scroll-reveal sin romper el zero-JS por defecto de Astro
- Definir la estrategia de imagen del Hero para cumplir LCP ≤2.5s
- Establecer qué componentes son puramente estáticos (`.astro`) vs cuáles necesitan una isla de JS mínima
- Establecir la convención de datos (frontmatter array) para secciones data-driven

**Non-Goals:**
- Internacionalización (i18n) — el sitio es exclusivamente en español
- CMS headless — los datos se manejan directamente en el frontmatter de componentes `.astro`
- PWA / Service Worker — fuera del alcance de este rediseño
- Pruebas automatizadas (E2E, unit) — no hay infraestructura de testing en este proyecto
- Optimización de imágenes automática con `astro:assets` — las imágenes provienen de URLs externas en la fase inicial; se revisará en un cambio posterior

## Decisions

### D1: Tailwind CSS v4 `@theme` como fuente única de verdad para tokens

**Decisión**: Todos los tokens de diseño (colores, fuentes) se definen como CSS custom properties en el bloque `@theme {}` de `src/styles/global.css`. No se usa `tailwind.config.js` (patrón de v3).

**Alternativa considerada**: Archivo separado `tokens.css` con `@layer base` y variables CSS; luego `safelist` en config. Descartado porque Tailwind v4 resuelve esto nativamente con `@theme`, eliminando la necesidad de config JS.

**Roles semánticos de la paleta extendida**:

```css
@theme {
  /* Fondos */
  --color-bg:            #F9F9F7;   /* página principal */
  --color-surface:       #FFFFFF;   /* tarjetas, formularios */
  --color-surface-raised: #EEF7EF;  /* navbar sticky, hover cards */

  /* Marca */
  --color-primary:       #3D7A47;   /* verde esmeralda profundo */
  --color-primary-dark:  #2E5C34;   /* hover/active de primary */
  --color-accent:        #F59E0B;   /* ámbar dorado — estrellas, badges */

  /* Texto */
  --color-text:          #1C2B1E;   /* texto principal — verde muy oscuro */
  --color-text-muted:    #5C6B5E;   /* subtítulos, metadatos */
  --color-border:        #D4E4D6;   /* bordes sutiles */
  --color-white:         #FFFFFF;

  /* Fuentes (existentes, mantenidas) */
  --font-family-sans:    Montserrat, sans-serif;
  --font-family-serif:   'Playfair Display', serif;
}
```

> **Nota de migración**: Los colores existentes (`brand-green`, `brand-bg`, `brand-text`, `brand-yellow`) se mantienen durante la transición pero se deprecan a favor de los roles semánticos. Los componentes existentes que los usen se migrarán en la misma PR.

---

### D2: Imagen Hero con `<picture>` + `fetchpriority="high"` (no background-image CSS)

**Decisión**: El Hero reemplaza el `background-image` CSS por un elemento `<picture>` posicionado absolutamente con `object-fit: cover`. El `<img>` lleva `fetchpriority="high"` y `loading="eager"`. Un overlay `<div>` con `background: rgba(0,0,0,0.45)` se superpone encima.

**Alternativa considerada**: Mantener `background-image` CSS y añadir `<link rel="preload" as="image">` en el `<head>`. Descartado porque el preload de imágenes responsive con `imagesrcset` y `imagesizes` es propenso a errores de configuración en SSG; `<picture>` es más explícito y compatible con `fetchpriority`.

**Razón**: El browser resource hinting prioriza `<img fetchpriority="high">` con seguridad sin configuración adicional; es el patrón recomendado por la guía `optimize-image-priority` de modern-web-guidance.

```html
<!-- Estructura del Hero image layer -->
<picture class="absolute inset-0 w-full h-full">
  <source type="image/avif" srcset="hero.avif" />
  <source type="image/webp" srcset="hero.webp" />
  <img
    src="hero.jpg"
    alt="Cascada y Caña — Vista panorámica"
    class="w-full h-full object-cover"
    fetchpriority="high"
    loading="eager"
    width="1920"
    height="1080"
  />
</picture>
<div class="absolute inset-0 bg-black/45" aria-hidden="true"></div>
```

---

### D3: Scroll-reveal con CSS Scroll-driven Animations + IntersectionObserver fallback

**Decisión**: Las animaciones de reveal se implementan en dos capas:

**Capa 1 (CSS nativo — Chrome 115+, Edge 115+, Safari 26+)**:
```css
@supports ((animation-timeline: view()) and (animation-range: entry)) {
  [data-reveal] {
    animation: reveal-up linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 30%;
  }
  @keyframes reveal-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-reveal] { animation: none; }
  }
}
```

**Capa 2 (JS fallback — Firefox)**:
Un `<script>` inline mínimo en `Layout.astro`, solo ejecutado cuando `CSS.supports(...)` es `false`, usa `IntersectionObserver` con `threshold: 0.15` para añadir la clase `.is-visible`.

```css
/* Para el fallback JS */
@supports not ((animation-timeline: view()) and (animation-range: entry)) {
  [data-reveal] {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  [data-reveal].is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    [data-reveal] { opacity: 1; transform: none; transition: none; }
  }
}
```

**Alternativa considerada**: Polyfill `scroll-timeline-polyfill`. Descartado explícitamente por la guía `parallax-scroll-effects` de modern-web-guidance ("not feature complete and has a lot of known issues"). El fallback con `IntersectionObserver` es más liviano y correcto.

**Alternativa considerada**: Usar una librería JS de animación (GSAP ScrollTrigger, Motion One). Descartado para mantener el bundle JS en 0 bytes para el 90% de usuarios (Chrome/Edge/Safari 26+) y mínimo para Firefox.

---

### D4: Micro-interacciones de tarjetas via CSS puro (sin JS)

**Decisión**: Los efectos hover de `ServiceCard.astro` y `TestimonialCard.astro` usan únicamente `transition`, `transform: scale()` y `box-shadow` vía clases Tailwind utilitarias. No se usa `@starting-style` (Newly Available, no Widely Available aún) para estas interacciones simples.

```
hover:shadow-xl hover:scale-[1.02] transition-transform duration-200
```

**Alternativa considerada**: `@starting-style` para animar la entrada inicial de cards en el DOM. Descartado porque no está en Baseline Widely Available y la ganancia perceptual es marginal frente a los reveal animations del scroll.

---

### D5: FAB de WhatsApp como componente estático `.astro` con `position: fixed`

**Decisión**: `WhatsAppFAB.astro` es un `<a>` con `position: fixed` renderizado dentro del `<body>` en `Layout.astro` (fuera del `<main>`). No requiere JS. La animación de entrada usa `@keyframes` CSS con un `animation-delay` de 2s para no competir con el LCP.

**Alternativa considerada**: Ocultar el FAB al inicio y mostrarlo tras scroll usando un `IntersectionObserver` sentinel. Descartado para reducir complejidad; el FAB visible desde inicio con un pequeño delay de animación tiene mejor UX sin coste de JS.

---

### D6: Formulario HTML nativo sin isla de JS (en primera iteración)

**Decisión**: `ContactBlock.astro` usa `<form action="[FORMSPREE_URL]" method="POST">` con validación HTML nativa. Formspree maneja el envío y la confirmación con su redirect, sin JS en el sitio. La URL de Formspree se inyecta como `import.meta.env.PUBLIC_FORMSPREE_URL`.

**Alternativa considerada**: Preact/React isla con `fetch` + estado de UI de éxito/error. Se deja como mejora futura (un segundo cambio) cuando se quiera una confirmación visual inline sin redirect.

---

### D7: Arquitectura de secciones en `index.astro`

**Orden final de secciones** (de arriba a abajo):
1. `<Header>` (sticky, glassmorphism)
2. `<Hero>` (LCP, CTAs principales)
3. `<SocialProof>` (métricas + badge de confianza, early en el flujo)
4. `<Services>` (propuesta de valor expandida)
5. `<Testimonials>` (prueba social cualitativa)
6. `<HowItWorks>` (proceso = reducción de fricción)
7. `<ContactBlock>` (conversión final + FAB sticky)
8. `<Footer>`

**Componentes deprecados** (a eliminar): `Attractions.astro`, `AttractionCard.astro`, `Events.astro`, `EventCard.astro`. Su contenido informativo se transfiere a `HowItWorks.astro` y `Services.astro`.

## Risks / Trade-offs

- **[Riesgo] Imágenes del hero en URLs externas (picsum.photos en producción)** → Migración: reemplazar URLs con imágenes reales del negocio en AVIF/WebP antes del lanzamiento. Esta tarea está marcada en `tasks.md`.
- **[Riesgo] Safari 26 para scroll-driven animations** → Safari 26 se lanzó en Sep 2025 (iOS 26 / macOS Tahoe). Los usuarios con Safari <26 verán los elementos sin animación reveal (degradación graceful, no broken). Mitigación: los estilos por defecto muestran los elementos visibles.
- **[Trade-off] Formulario con redirect de Formspree** → La UX de confirmación es un redirect a página de Formspree en lugar de un mensaje inline. Aceptable para la v1; se mejora en una segunda iteración con una isla de Preact.
- **[Trade-off] No se usa `astro:assets` para optimización automática de imágenes** → Las imágenes remotas requieren configuración adicional de dominio en `astro.config.mjs`. Se deja para cuando el cliente provea imágenes propias alojadas.
- **[Riesgo] Número de WhatsApp hardcodeado** → El número debe parametrizarse como variable de entorno (`PUBLIC_WHATSAPP_NUMBER`) para facilitar cambios futuros sin editar componentes.

## Open Questions

- **¿El cliente tiene imágenes propias del negocio disponibles?** — afecta directamente la implementación del Hero y la galería de testimonios. Si no las tiene, se usarán placeholders de alta calidad con aviso explícito.
- **¿Cuál es el número real de WhatsApp y el mensaje de bienvenida precargado?** — necesario para el FAB y el CTA del Hero antes de hacer deployment.
- **¿El cliente quiere Google Maps embed en la sección de Location?** — `Location.astro` ya existe; si se mantiene, deberá implementarse `loading="lazy"` en el iframe del mapa.
