# Spec Delta

## Purpose

Define el sistema de tokens de diseño centralizado que toda la UI del sitio debe consumir: paleta de colores semántica, escala tipográfica y escala de espaciado, expresados como CSS custom properties en el bloque `@theme` de Tailwind CSS v4.

## ADDED Requirements

### Requirement: Paleta de colores semántica

El sistema SHALL exponer los siguientes roles de color como CSS custom properties en `src/styles/global.css` bajo el bloque `@theme`:

| Token | Rol | Uso principal |
|---|---|---|
| `--color-bg` | Fondo de página | `<body>`, secciones alternadas |
| `--color-surface` | Fondo de tarjetas/paneles | Cards, modales, formularios |
| `--color-surface-raised` | Superficies elevadas | Navbar sticky, CTA cards |
| `--color-primary` | Verde esmeralda principal | Botones primarios, iconos activos |
| `--color-primary-dark` | Verde oscuro (hover) | Estado hover de botón primario |
| `--color-accent` | Dorado/ámbar | Badges, estrella de rating, decoraciones |
| `--color-text` | Texto principal | Cuerpo de texto, headings |
| `--color-text-muted` | Texto secundario | Subtítulos, metadatos |
| `--color-border` | Bordes sutiles | Divisores, inputs |
| `--color-white` | Blanco puro | Texto sobre fondos oscuros |

#### Scenario: Rendering consistente entre secciones

- **WHEN** se renderiza cualquier sección de la landing page
- **THEN** los colores aplicados DEBEN provenir exclusivamente de los tokens semánticos del `@theme`, no de valores hexadecimales hardcoded en clases Tailwind arbitrarias

### Requirement: Escala tipográfica con dos familias

El sistema SHALL definir exactamente dos familias tipográficas con sus pesos:

- `--font-family-sans`: Montserrat (pesos 400, 500, 600, 700) — UI, body, labels
- `--font-family-serif`: Playfair Display (peso 700) — headings de secciones, taglines

El layout SHALL respetar una jerarquía de tipo: `text-5xl`/`text-6xl` (hero h1) → `text-4xl` (section heading h2) → `text-2xl` (card title h3) → `text-base` (body).

#### Scenario: Heading de sección usa fuente serif

- **WHEN** se renderiza el `<h2>` de cualquier sección principal (Hero, Services, SocialProof, HowItWorks, Contact)
- **THEN** el elemento DEBE renderizar con `font-family-serif` y peso 700

### Requirement: Escala de espaciado y layout

El layout SHALL usar un sistema de contenedor único (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`) aplicado consistentemente. El espaciado vertical entre secciones SHALL ser `py-20` (80px) en desktop y `py-14` en mobile.

#### Scenario: Ancho de contenedor consistente

- **WHEN** se renderiza cualquier sección de la landing
- **THEN** el contenido útil SHALL estar dentro de un contenedor con ancho máximo de 1280px y padding horizontal simétrico responsive
