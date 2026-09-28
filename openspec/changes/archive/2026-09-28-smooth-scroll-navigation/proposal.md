# Proposal

## Why

Los anchor links del header (`#inicio`, `#servicios`, `#contacto`, etc.) actualmente saltan de forma instantánea, sin ninguna transición, lo que resulta en una experiencia de navegación brusca y desorientadora. Adicionalmente, el header sticky de ~72px oculta el inicio de la sección de destino porque los anchors no compensan su altura.

## What Changes

- Se agrega `scroll-behavior: smooth` al elemento `html` en `global.css`, protegido por `@media (prefers-reduced-motion: no-preference)` para respetar la preferencia del sistema operativo del usuario.
- Se agrega `scroll-margin-top` a todas las secciones con `id` para compensar el alto del header sticky (~80px), evitando que el contenido quede oculto debajo del header al navegar.

## Capabilities

### New Capabilities

- `navigation/smooth-scroll`: Define el comportamiento de scroll suave y la compensación del header sticky para la navegación por anchor links en la landing page.

### Modified Capabilities

*(ninguna — no cambia el comportamiento de los scroll-reveal animations ya especificados en `motion/scroll-reveal`)*

## Impact

- `src/styles/global.css`: Se agregan dos reglas CSS globales (`scroll-behavior` y `scroll-margin-top`).
- No se modifican componentes JavaScript ni Astro.
- Compatible con todos los navegadores modernos; el fallback natural para navegadores sin soporte es el comportamiento actual (scroll instantáneo).
