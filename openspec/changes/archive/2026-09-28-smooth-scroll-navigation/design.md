# Design

## Context

El sitio usa Astro con Tailwind CSS v4. El header (`Header.astro`) es sticky (`sticky top-0 z-50`) con una altura aproximada de 72px en desktop. Los anchor links del header apuntan a `id`s definidos en los componentes de sección (`#inicio`, `#nosotros`, `#servicios`, `#testimonios`, `#contacto`). Actualmente no existe `scroll-behavior` configurado, por lo que la navegación es instantánea.

Todo el CSS global vive en `src/styles/global.css`. No hay router SPA ni librería de scroll — la página usa navegación nativa del browser.

## Goals / Non-Goals

**Goals:**
- Activar smooth scroll nativo del browser para los anchor links
- Compensar el alto del header sticky en el destino del scroll
- Respetar `prefers-reduced-motion`

**Non-Goals:**
- Scroll programático con JS (no es necesario para este caso)
- Offset dinámico calculado en JS al cambiar el viewport (el header tiene altura fija en desktop y mobile)
- Modificar el comportamiento del menú mobile (ya funciona con `closeMenu()`)

## Decisions

### 1. CSS puro vía `scroll-behavior: smooth` — sin JavaScript

**Decisión**: Usar `html { scroll-behavior: smooth; }` en `global.css`, envuelto en `@media (prefers-reduced-motion: no-preference)`.

**Por qué no JS**: `scrollIntoView({ behavior: 'smooth' })` requeriría interceptar todos los clicks en anchor links, incluyendo los del menú mobile y el FAB de WhatsApp. El CSS nativo lo cubre globalmente sin puntos de mantenimiento adicionales.

**Alternativa descartada**: Librería como `smooth-scroll` o `lenis` — overhead injustificado para una landing page estática sin rutas SPA.

**Soporte**: `scroll-behavior: smooth` tiene soporte global >96% (Chrome 61+, Firefox 36+, Safari 15.4+, Edge 79+). El fallback natural es el comportamiento actual (scroll instantáneo).

### 2. `scroll-margin-top` en secciones — en lugar de padding-top extra

**Decisión**: Agregar `scroll-margin-top: 88px` (72px header + 16px buffer) a los selectores `section[id]` y `div[id]` que son destino de navegación.

**Por qué `scroll-margin-top` y no `padding-top`**: `padding-top` alteraría el espaciado visual de todas las secciones, afectando el diseño. `scroll-margin-top` es invisible al layout — solo afecta dónde se posiciona el viewport cuando se hace scroll hasta ese elemento, sin cambiar su apariencia.

**Valor concreto**: 88px = 72px (altura del header) + 16px (buffer de respiración visual). Este valor es fijo porque el header tiene `py-4` (16px top+bottom) y el contenido interno de ~40px — total ~72px. En mobile el header es igual de alto.

## Risks / Trade-offs

- **Header dinámico futuro**: Si el header cambia de altura (e.g. se agrega un banner promocional arriba), habrá que actualizar el valor de `scroll-margin-top`. Es un valor hardcoded, no calculado. → Mitigación: el valor está en una sola regla CSS, fácil de actualizar.
- **Sections sin `id`**: Solo las secciones con `id` se ven afectadas. Las secciones que no son destino de navegación no se modifican.
