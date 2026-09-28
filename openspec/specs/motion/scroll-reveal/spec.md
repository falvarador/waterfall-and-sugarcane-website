# Spec: motion/scroll-reveal

## Purpose

Define el sistema de animaciones de entrada al scroll que se aplica de manera transversal a los componentes de la landing page, basado en CSS Scroll-driven Animations con fallback progresivo para Firefox.

## Requirements

### Requirement: Animaciones scroll-driven como CSS nativo

Los componentes que implementen scroll-reveal SHALL usar `animation-timeline: view()` y `animation-range: entry 0% entry 30%` como implementación primaria. Las animaciones SHALL usar exclusivamente propiedades compositor-safe: `opacity` y `transform` (translate, scale).

La implementación SHALL estar protegida por `@supports ((animation-timeline: view()) and (animation-range: entry))` para evitar comportamiento indefinido en navegadores sin soporte.

#### Scenario: Reveal en Chrome/Edge/Safari 26+

- **WHEN** el usuario hace scroll en un navegador que soporta scroll-driven animations
- **THEN** los elementos con reveal animado SHALL aparecer mediante CSS nativo sin ningún código JavaScript ejecutándose

#### Scenario: Feature detection positivo

- **WHEN** `CSS.supports('(animation-timeline: view()) and (animation-range: entry)')` retorna `true`
- **THEN** el script de fallback `IntersectionObserver` NO SHALL ejecutarse ni añadirse al DOM

### Requirement: Fallback IntersectionObserver para Firefox

Cuando el navegador no soporta CSS Scroll-driven Animations, un script SHALL activarse para observar los elementos marcados con el atributo `data-reveal`, añadiendo la clase `is-visible` cuando el elemento intersecta el viewport con un threshold de 0.15.

Los estilos de los elementos con `data-reveal` SHALL asumir el estado inicial oculto (`opacity: 0; transform: translateY(20px)`) y transicionar al estado visible vía la clase `.is-visible` (`opacity: 1; transform: translateY(0)`).

#### Scenario: Reveal en Firefox (fallback)

- **WHEN** el usuario hace scroll en Firefox hasta un elemento marcado con `data-reveal`
- **THEN** el elemento SHALL recibir la clase `is-visible` y aplicar su transición CSS al estado visible

### Requirement: Respeto de prefers-reduced-motion

Todas las animaciones de scroll-reveal, tanto CSS nativas como las de fallback, SHALL ser desactivadas cuando `prefers-reduced-motion: reduce` está activo. Los elementos afectados SHALL ser visibles en su estado final inmediatamente.

#### Scenario: Elemento con data-reveal en prefers-reduced-motion

- **WHEN** `prefers-reduced-motion: reduce` está activo y el usuario hace scroll
- **THEN** el elemento SHALL ser completamente visible (`opacity: 1`, `transform: none`) sin animación de transición

### Requirement: Rendimiento — solo propiedades compositor

Todas las animaciones de scroll-reveal SHALL animar exclusivamente `opacity` y `transform`. No SHALL animarse propiedades que disparen layout (width, height, top, left, padding, margin) ni propiedades que disparen paint (background-color, color, border).

#### Scenario: Animación sin layout thrashing

- **WHEN** se reproducen las animaciones de scroll-reveal en un dispositivo de gama media
- **THEN** las animaciones SHALL mantener 60fps sin janks de layout medibles en DevTools
