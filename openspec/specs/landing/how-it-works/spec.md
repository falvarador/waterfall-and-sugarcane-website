# Spec: landing/how-it-works

## Purpose

Define el comportamiento observable de la sección "Cómo funciona tu visita": un proceso paso a paso que educa al visitante sobre qué esperar, aumentando la confianza y reduciendo la fricción de conversión.

## Requirements

### Requirement: Proceso de visita en pasos numerados

La sección HowItWorks SHALL renderizar entre 3 y 5 pasos del proceso de visita en formato vertical (mobile) y horizontal con conectores (desktop ≥1024px). Cada paso SHALL contener:
- Número de paso destacado
- Ícono SVG inline
- Título del paso (heading `<h3>`)
- Descripción breve (1–2 oraciones)

#### Scenario: Layout horizontal con conectores en desktop

- **WHEN** el viewport es ≥1024px
- **THEN** los pasos SHALL disponerse horizontalmente con una línea o decorador visual entre ellos que indica progresión

#### Scenario: Layout vertical apilado en mobile

- **WHEN** el viewport es <768px
- **THEN** los pasos SHALL disponerse verticalmente, con el número de paso y título en la misma fila

### Requirement: Datos de pasos configurables

Los datos de cada paso (número, título, descripción, ícono) SHALL definirse en el frontmatter de `HowItWorks.astro` como un array, de modo que agregar o reordenar pasos no requiera modificar el template HTML.

#### Scenario: Reordenar pasos

- **WHEN** se cambia el orden de los objetos en el array de datos del frontmatter
- **THEN** los pasos SHALL renderizarse en el nuevo orden sin errores visuales

### Requirement: Reveal al scroll de cada paso

Cada paso SHALL aplicar un efecto de entrada (fade-in + slide desde el lado o desde abajo) cuando entra al viewport, usando las mismas reglas de scroll-driven animations y fallback que define `landing/social-proof` (CSS nativo para Chrome/Edge/Safari 26+ y `IntersectionObserver` para Firefox).

#### Scenario: Pasos aparecen progresivamente al scroll

- **WHEN** el usuario hace scroll hasta la sección HowItWorks
- **THEN** cada paso SHALL aparecer con animación de entrada de forma escalonada (stagger mínimo de 100ms entre pasos)

#### Scenario: Sin animaciones en prefers-reduced-motion

- **WHEN** `prefers-reduced-motion: reduce` está activo
- **THEN** todos los pasos SHALL ser visibles inmediatamente sin animación
