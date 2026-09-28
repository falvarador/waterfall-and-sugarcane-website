# Spec: navigation/smooth-scroll

## Purpose

Define el comportamiento observable del scroll suave entre secciones al navegar por los anchor links del header, y la compensación del header sticky para que el contenido de destino no quede oculto debajo de él.

## Requirements

### Requirement: Scroll suave al navegar por anchor links

Al activar un anchor link interno (e.g. `href="#servicios"`), el navegador SHALL desplazarse hacia la sección de destino con una animación de scroll suave en lugar de saltar instantáneamente, en todos los navegadores modernos que soporten `scroll-behavior: smooth`.

La animación SHALL estar desactivada cuando el usuario tiene activa la preferencia del sistema operativo `prefers-reduced-motion: reduce`, en cuyo caso el salto SHALL ser instantáneo.

#### Scenario: Navegación suave desde el header en desktop

- **WHEN** el usuario hace click en un enlace de navegación del header (e.g. "Servicios") en un navegador moderno con `prefers-reduced-motion` no activado
- **THEN** la página SHALL desplazarse suavemente hacia la sección correspondiente sin un salto brusco

#### Scenario: Respeto de prefers-reduced-motion

- **WHEN** el usuario tiene activada la preferencia `prefers-reduced-motion: reduce` y hace click en un link de navegación
- **THEN** el desplazamiento SHALL ser instantáneo, sin animación de scroll

#### Scenario: Navegación suave desde el menú mobile

- **WHEN** el usuario hace click en un enlace del menú desplegable mobile
- **THEN** la página SHALL desplazarse suavemente hacia la sección correspondiente tras el cierre del menú

### Requirement: Compensación del header sticky en el destino del scroll

Las secciones de la landing page que son destino de anchor links de navegación SHALL reservar un espacio superior (`scroll-margin-top`) equivalente a la altura del header sticky más un buffer mínimo de 8px, de modo que el contenido de la sección sea visible completamente y no quede oculto debajo del header al llegar al destino.

#### Scenario: Sección visible al llegar por anchor link

- **WHEN** el usuario navega a una sección mediante un anchor link del header
- **THEN** el inicio visible del contenido de la sección (heading y primer elemento) SHALL estar por debajo del header sticky, sin solapamiento

#### Scenario: Compensación consistente en desktop y mobile

- **WHEN** el usuario navega por anchor links tanto en un viewport de escritorio como en uno mobile
- **THEN** el contenido de destino SHALL quedar completamente visible en ambos casos, respetando la altura del header en cada breakpoint
