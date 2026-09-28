# Spec Delta

## Purpose

Define el comportamiento observable de la sección Hero de la landing page: imagen LCP optimizada, propuesta de valor clara, prueba social inline y canales de conversión prioritarios (WhatsApp y formulario).

## ADDED Requirements

### Requirement: Imagen hero como LCP candidato optimizado

El Hero SHALL renderizar la imagen de fondo usando un elemento `<picture>` con fuentes AVIF y WebP, con atributos `fetchpriority="high"` y `loading="eager"` en el `<img>` de fallback. No SHALL usar `background-image` CSS para la imagen principal del hero.

#### Scenario: Carga prioritaria de imagen hero

- **WHEN** el navegador parsea el HTML de la página
- **THEN** la imagen del hero SHALL aparecer en el LCP del navegador y SHALL comenzar a descargarse antes que cualquier otro recurso no crítico

#### Scenario: Formato moderno con fallback

- **WHEN** el navegador soporta AVIF
- **THEN** SHALL cargar la fuente AVIF
- **WHEN** el navegador solo soporta WebP
- **THEN** SHALL cargar la fuente WebP
- **WHEN** el navegador solo soporta JPEG/PNG
- **THEN** SHALL cargar el `<img>` de fallback

### Requirement: Propuesta de valor visible sin scroll

El Hero SHALL contener en el viewport inicial (above-the-fold):
- Un badge/etiqueta de categoría ("Turismo Rural • [Región]")
- Un `<h1>` con la propuesta de valor principal del negocio (máximo 10 palabras en la primera línea)
- Un párrafo de subtítulo (máximo 20 palabras)
- Un indicador de prueba social (ej: "⭐ 4.9 · +500 visitantes felices")
- Un CTA primario (botón WhatsApp) y un CTA secundario (enlace al formulario)

#### Scenario: Contenido visible sin scroll en mobile

- **WHEN** la página se carga en un viewport de 375×667px (iPhone SE)
- **THEN** el `<h1>`, al menos un CTA y el badge de prueba social SHALL ser visibles sin necesidad de hacer scroll

### Requirement: CTAs de conversión directos

El Hero SHALL incluir:
- Un botón principal con `href` a `https://wa.me/[número]` con `target="_blank" rel="noopener"` y ícono de WhatsApp
- Un enlace secundario con `href="#contacto"` o `href="#formulario"`

Ambos CTAs SHALL ser clickeables con área de toque mínima de 44×44px en mobile.

#### Scenario: Click en CTA WhatsApp desde mobile

- **WHEN** un usuario en mobile hace click/tap en el botón de WhatsApp del Hero
- **THEN** SHALL abrirse la aplicación WhatsApp o la web de WhatsApp con el número precargado

### Requirement: Overlay de legibilidad accesible

El Hero SHALL aplicar un overlay oscuro sobre la imagen que garantice un ratio de contraste WCAG AA (≥4.5:1) entre el texto blanco y el fondo resultante.

#### Scenario: Contraste de texto sobre imagen

- **WHEN** se renderiza el texto del Hero sobre la imagen con overlay
- **THEN** el ratio de contraste del texto blanco con el overlay SHALL ser ≥4.5:1 medido con herramientas de accesibilidad estándar
