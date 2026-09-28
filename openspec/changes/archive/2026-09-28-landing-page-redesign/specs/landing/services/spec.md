# Spec Delta

## Purpose

Define los comportamientos observables de la sección de servicios/experiencias: presentación de las ofertas del emprendimiento con micro-interacciones CSS y sin dependencia de JavaScript.

## ADDED Requirements

### Requirement: Listado de servicios con tarjetas interactivas

La sección Services SHALL renderizar un mínimo de 3 y máximo de 6 tarjetas de servicio en un grid responsive (1 columna en mobile, 2 en tablet, 3 en desktop). Cada tarjeta SHALL mostrar:
- Ícono SVG inline representativo del servicio
- Nombre del servicio (heading `<h3>`)
- Descripción corta (máximo 2 líneas de texto)
- (Opcional) Precio o rango de precio

#### Scenario: Grid de servicios en desktop

- **WHEN** el viewport es ≥1024px
- **THEN** las tarjetas SHALL disponerse en 3 columnas con gap consistente

#### Scenario: Grid de servicios en mobile

- **WHEN** el viewport es <768px
- **THEN** las tarjetas SHALL disponerse en 1 columna apilada verticalmente

### Requirement: Micro-interacciones CSS sin JavaScript

Las tarjetas de servicio SHALL implementar micro-interacciones usando exclusivamente CSS:
- En hover desktop: la tarjeta SHALL elevar su sombra (`box-shadow`) y hacer scale ligero (`transform: scale(1.02)`) en ≤200ms de transición
- El ícono en hover SHALL cambiar a color `--color-primary`

No SHALL usarse JavaScript para estos efectos.

#### Scenario: Hover en tarjeta de servicio

- **WHEN** el cursor del usuario hace hover sobre una tarjeta de servicio en desktop
- **THEN** la tarjeta SHALL mostrar una elevación visual (sombra incrementada) y escala sutil sin requerir ningún script JS activo

#### Scenario: Sin animaciones en prefers-reduced-motion

- **WHEN** el sistema operativo del usuario tiene activada la preferencia `prefers-reduced-motion: reduce`
- **THEN** las transformaciones de scale y transiciones de la tarjeta SHALL estar desactivadas

### Requirement: Servicios configurables via datos estáticos

Los datos de cada servicio (nombre, descripción, ícono, precio) SHALL provenir de un array de objetos definido en el frontmatter del componente `Services.astro`, no hardcodeado en el template HTML.

#### Scenario: Agregar un nuevo servicio

- **WHEN** se agrega un nuevo objeto al array de datos en el frontmatter de `Services.astro`
- **THEN** la sección SHALL renderizar automáticamente una nueva tarjeta con los datos del nuevo servicio sin modificar el template HTML
