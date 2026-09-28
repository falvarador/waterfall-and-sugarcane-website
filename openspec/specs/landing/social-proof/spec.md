# Spec: landing/social-proof

## Purpose

Define el comportamiento observable del bloque de prueba social que genera confianza: métricas numéricas de impacto, rating agregado y testimonios de visitantes rediseñados con reveal animado al scroll.

## Requirements

### Requirement: Métricas numéricas de confianza

La sección SocialProof SHALL mostrar al menos 3 métricas numéricas en formato destacado (número grande + label descriptivo), por ejemplo: años de operación, número de visitantes atendidos, calificación promedio. Estos valores SHALL estar definidos como datos en el frontmatter del componente, no hardcodeados en el HTML.

#### Scenario: Visualización de métricas

- **WHEN** el usuario navega a la sección de prueba social
- **THEN** SHALL ver al menos 3 indicadores numéricos con etiquetas descriptivas, dispuestos en 1 fila en desktop y en grid 2×N en mobile

### Requirement: Rating agregado visible

La sección SHALL mostrar un rating en formato "⭐ 4.X/5 · [N] reseñas" usando el componente `StarRating` existente.

#### Scenario: Visualización del rating

- **WHEN** el usuario ve la sección SocialProof
- **THEN** SHALL visualizarse el rating numérico (ej: 4.9) junto a las estrellas y el número total de reseñas

### Requirement: Testimonios con reveal al scroll

Los testimonios de visitantes SHALL hacer un efecto de reveal (fade-in + slide-up) cuando entran al viewport durante el scroll, usando CSS Scroll-driven Animations (`animation-timeline: view()`). Deberá existir un fallback con `IntersectionObserver` para Firefox (que no soporta scroll-driven animations).

Para el fallback, se añade una clase `.is-visible` via JS solo cuando `CSS.supports('(animation-timeline: view()) and (animation-range: entry)')` devuelve `false`.

#### Scenario: Reveal con scroll-driven animations (navegadores compatibles)

- **WHEN** el usuario hace scroll hasta llegar a la sección de testimonios en Chrome/Edge/Safari 26+
- **THEN** cada tarjeta de testimonio SHALL hacer fade-in + slide-up usando CSS nativo sin JS

#### Scenario: Reveal con IntersectionObserver (Firefox fallback)

- **WHEN** el usuario hace scroll en Firefox
- **THEN** cada tarjeta de testimonio SHALL hacer fade-in + slide-up usando `IntersectionObserver` y la clase `.is-visible`

#### Scenario: Sin animaciones en prefers-reduced-motion

- **WHEN** `prefers-reduced-motion: reduce` está activo
- **THEN** los testimonios SHALL aparecer directamente sin animación de entrada

### Requirement: Foto de avatar en testimonios

Cada tarjeta de testimonio SHALL mostrar un avatar: si `avatar` (URL) está definido SHALL renderizar un `<img>` con `loading="lazy"`, `width` y `height` explícitos; si no, SHALL renderizar un círculo con las iniciales del nombre.

#### Scenario: Testimonio con foto real

- **WHEN** la propiedad `avatar` de un testimonio contiene una URL válida
- **THEN** SHALL renderizarse un `<img>` lazy-loaded con las dimensiones correctas y texto `alt` descriptivo

#### Scenario: Testimonio sin foto

- **WHEN** la propiedad `avatar` está vacía o no definida
- **THEN** SHALL renderizarse un elemento con el color de fondo `--color-primary` y las iniciales del visitante en texto blanco
