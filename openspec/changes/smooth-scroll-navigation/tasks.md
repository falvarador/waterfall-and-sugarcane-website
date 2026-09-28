# Tasks

## 1. Smooth scroll CSS

- [x] 1.1 En `src/styles/global.css`, agregar la regla `html { scroll-behavior: smooth; }` dentro de un bloque `@media (prefers-reduced-motion: no-preference)` para respetar la preferencia del usuario. Verificar que la regla esté presente en el CSS compilado inspeccionando el output de `astro build` o revisando el archivo directamente.

- [x] 1.2 Verificar manualmente en el navegador que al hacer click en un link del header (e.g. "Servicios"), la página se desplaza con animación suave hacia la sección correspondiente en lugar de saltar.

- [x] 1.3 Verificar con DevTools o `prefers-reduced-motion` simulator (Chrome DevTools → Rendering → Emulate CSS media) que con `prefers-reduced-motion: reduce` activo el desplazamiento es instantáneo.

## 2. Compensación del header sticky

- [x] 2.1 En `src/styles/global.css`, agregar la regla `section[id], div[id] { scroll-margin-top: 88px; }` para compensar el alto del header sticky (~72px) más un buffer de 16px. Verificar que la regla está presente en el CSS del proyecto.

- [x] 2.2 Verificar manualmente en el navegador (desktop y mobile) que al navegar a cualquier sección mediante un anchor link del header, el heading de la sección queda completamente visible por debajo del header sticky y no hay solapamiento visual.

- [x] 2.3 Verificar el escenario en el menú mobile: abrir el menú, hacer click en un link (e.g. "Contacto"), confirmar que el menú se cierra y la sección de contacto queda visible sin quedar tapada por el header.

## 3. Verificación de regresión

- [x] 3.1 Confirmar que los scroll-reveal animations (`[data-reveal]`) siguen funcionando correctamente después del cambio: hacer scroll lento por la página y verificar que los elementos con animación de entrada aún aparecen con su efecto fade-in/slide-up.

- [x] 3.2 Confirmar que el FAB de WhatsApp y el botón "Reservar visita" del header que apuntan a `#contacto` también se benefician del scroll suave y la compensación del header.
