# Tasks

## 1. Sistema de Tokens de Diseño (Design System)

- [ ] 1.1 Actualizar `src/styles/global.css`: expandir el bloque `@theme` con los nuevos roles semánticos de color (`--color-bg`, `--color-surface`, `--color-surface-raised`, `--color-primary`, `--color-primary-dark`, `--color-accent`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-white`). Verificar que `astro dev` compile sin errores y que los tokens sean inspeccionables en DevTools > Styles.

- [ ] 1.2 Añadir las variables de entorno necesarias al `.env.example` del proyecto: `PUBLIC_WHATSAPP_NUMBER`, `PUBLIC_FORMSPREE_URL`. Verificar que el archivo exista con valores de ejemplo documentados.

## 2. Layout y Estructura Global

- [ ] 2.1 Actualizar `src/layouts/Layout.astro`: cambiar `lang="en"` a `lang="es"`, añadir `<title>` con nombre real del negocio, `<meta name="description">` relevante para SEO turístico, y `<meta property="og:image">` placeholder. Verificar el markup con DevTools > Elements.

- [ ] 2.2 Añadir en `Layout.astro` la preconexión a Google Fonts ya existente (ya presente) y verificar que la fuente `Playfair Display` se preloade con `<link rel="preload" as="font" type="font/woff2" crossorigin>` para el peso 700. Verificar en DevTools > Network que la fuente aparece como `preload` antes que otros recursos.

- [ ] 2.3 Añadir en `Layout.astro` el script inline mínimo de fallback para el sistema de scroll-reveal (`IntersectionObserver`) tal como define `design.md → D3`. El script solo se activa si `CSS.supports('(animation-timeline: view()) and (animation-range: entry)')` devuelve `false`. Verificar en Firefox que los elementos con `data-reveal` reciben la clase `is-visible` al scroll.

- [ ] 2.4 Incluir `WhatsAppFAB.astro` en `Layout.astro` fuera del `<slot />`, antes del cierre de `</body>`. Verificar que el FAB aparece en todas las páginas y está posicionado en la esquina inferior derecha.

## 3. Componente Hero (LCP + CTAs)

- [ ] 3.1 Refactorizar `src/components/Hero.astro`: reemplazar el `background-image` CSS por un `<picture>` con fuentes AVIF y WebP + `<img fetchpriority="high" loading="eager" width="1920" height="1080">` posicionado absolutamente con `object-fit: cover`. Verificar en Lighthouse que el LCP es identificado como un `<img>` y no un elemento de background.

- [ ] 3.2 Añadir en el Hero el badge de categoría, el `<h1>` con propuesta de valor, párrafo de subtítulo, indicador de prueba social ("⭐ 4.9 · +500 visitantes"), botón primario WhatsApp (`href="https://wa.me/${whatsappNumber}"`) y enlace secundario al formulario. Verificar que en un viewport 375×667 todos estos elementos son visibles sin scroll (screenshot o DevTools Device Emulation).

- [ ] 3.3 Ajustar el overlay del Hero a `bg-black/45` y verificar en Colour Contrast Analyser (o similar) que el ratio de contraste del texto blanco sobre el overlay es ≥4.5:1.

## 4. Sistema de Scroll-Reveal (motion/scroll-reveal)

- [ ] 4.1 Añadir en `src/styles/global.css` los keyframes `reveal-up` y los estilos `[data-reveal]` para ambas capas (CSS nativo con `@supports` y fallback `@supports not`), incluyendo el bloque `@media (prefers-reduced-motion: reduce)` que desactiva las animaciones. Verificar que en Chrome con DevTools > Animations los elementos animados muestran la timeline de scroll.

- [ ] 4.2 Verificar que en modo `prefers-reduced-motion: reduce` (activado desde DevTools > Rendering > Emulate CSS media feature) los elementos con `data-reveal` son visibles inmediatamente al cargar sin animación.

## 5. Componente SocialProof

- [ ] 5.1 Crear `src/components/SocialProof.astro` con las métricas numéricas definidas en el frontmatter (array de `{ value, label }`), el `StarRating` existente y el grid de métricas (3 columnas desktop, 2 columnas mobile). Añadir `data-reveal` a cada métrica para scroll-reveal. Verificar renderizado en `astro dev`.

- [ ] 5.2 Refactorizar `src/components/Testimonials.astro` y `src/components/TestimonialCard.astro`: aplicar el nuevo sistema de tokens de color, añadir `data-reveal` a cada tarjeta y el lógica de avatar (imagen `<img loading="lazy">` vs iniciales). Verificar que el avatar con URL se renderiza como `<img>` y sin URL se renderiza como círculo con iniciales.

## 6. Componente Services

- [ ] 6.1 Crear `src/components/Services.astro` con el array de servicios en el frontmatter (mínimo 3 ítems: Visita a la Cascada, Degustación de Jugo de Caña, Caminata Guiada) y el grid responsive. Verificar el layout en 375px, 768px y 1280px con DevTools.

- [ ] 6.2 Crear `src/components/ServiceCard.astro` con el slot de ícono, heading `<h3>`, descripción y los estilos hover CSS (`hover:shadow-xl hover:scale-[1.02] transition-transform duration-200`). Verificar que el efecto hover funciona en desktop y está desactivado en `prefers-reduced-motion: reduce`.

## 7. Componente HowItWorks

- [ ] 7.1 Crear `src/components/HowItWorks.astro` con los pasos del proceso definidos en el frontmatter (mínimo 3 pasos: Reserva → Llega → Disfruta). Layout: horizontal con conectores en desktop, vertical en mobile. Añadir `data-reveal` con `animation-delay` escalonado (100ms por paso). Verificar layout en desktop y mobile.

- [ ] 7.2 Crear `src/components/StepCard.astro` con número de paso, ícono SVG inline, título y descripción. Verificar que el número de paso se renderiza como texto grande y decorativo (no semántico como heading).

## 8. Componente ContactBlock + WhatsApp FAB

- [ ] 8.1 Crear `src/components/ContactBlock.astro` con el `<form action={formspreeUrl} method="POST">` con campos `name`, `tel`/`email` y `textarea`, todos con `required` y tipos correctos, más botón de envío. Verificar que la validación HTML nativa previene envío con campos vacíos (test manual en browser).

- [ ] 8.2 Añadir la columna de información de contacto estática en `ContactBlock.astro`: `<a href="tel:...">`, `<a href="https://wa.me/...">`, `<a href="mailto:...">` y horario de atención. Verificar que en mobile el click en `tel:` intenta iniciar llamada.

- [ ] 8.3 Crear `src/components/WhatsAppFAB.astro`: `<a>` con `position: fixed`, ícono WhatsApp, `aria-label`, `href` a `wa.me` con mensaje precargado, área de toque 56×56px, y `animation-delay: 2s` CSS para entrada diferida. Verificar que el FAB es accesible por teclado (Tab focus visible) y que permanece fijo durante el scroll.

## 9. Header Actualizado

- [ ] 9.1 Actualizar `src/components/Header.astro`: aplicar glassmorphism (`backdrop-blur-sm bg-white/80`) cuando la clase `scrolled` está activa. Añadir el script inline mínimo que añade/quita la clase `scrolled` según `window.scrollY > 50`. Verificar que el efecto glassmorphism aparece al hacer scroll en Chrome y Firefox.

- [ ] 9.2 Añadir en el Header un botón/enlace CTA de "Reservar" visible en desktop (oculto en mobile via `hidden md:flex`) que apunte a `#contacto`. Verificar que en desktop el botón es visible en el navbar.

## 10. Integración y Limpieza

- [ ] 10.1 Actualizar `src/pages/index.astro` con la nueva arquitectura de secciones según `design.md → D7`: `<SocialProof>`, `<Services>`, `<Testimonials>`, `<HowItWorks>`, `<ContactBlock>`. Descomentar `<Contact>` → reemplazar por `<ContactBlock>`. Verificar que la página carga en `astro dev` sin errores de consola.

- [ ] 10.2 Eliminar los componentes deprecados: `src/components/Attractions.astro`, `src/components/AttractionCard.astro`, `src/components/Events.astro`, `src/components/EventCard.astro`. Verificar que no quedan imports de estos archivos en ningún `.astro` (`grep -r "Attractions\|Events\|AttractionCard\|EventCard" src/` debe devolver 0 resultados).

- [ ] 10.3 Migrar los componentes existentes que usen tokens deprecados (`brand-green`, `brand-bg`, `brand-text`, `brand-yellow`) al nuevo sistema de roles semánticos. Verificar con `grep -r "brand-green\|brand-bg\|brand-text\|brand-yellow" src/` que no quedan usos no migrados en componentes nuevos o refactorizados.

- [ ] 10.4 Ejecutar `astro build` y verificar que el build completa sin errores. Revisar el output HTML del Hero en `dist/` para confirmar que el `<img>` tiene `fetchpriority="high"` y que no hay `background-image` inline en la sección hero.

- [ ] 10.5 Ejecutar Lighthouse en modo mobile (vía `astro preview`) y verificar: LCP ≤2.5s, sin errores de accesibilidad en los CTAs del Hero y el FAB, y Performance Score ≥85.
