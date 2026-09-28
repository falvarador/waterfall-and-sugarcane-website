# Spec: landing/contact

## Purpose

Define el comportamiento observable del bloque de contacto: formulario HTML nativo validado, botón flotante de WhatsApp (FAB) sticky y enlace de llamada directa, como canales de conversión primarios del sitio.

## Requirements

### Requirement: Formulario HTML nativo con validación

El bloque de contacto SHALL contener un `<form>` HTML nativo (sin framework JS externo) con los siguientes campos:
- Nombre completo: `<input type="text" required minlength="2">`
- Teléfono o Email: `<input type="tel" required>` o `<input type="email" required>` (uno de los dos)
- Mensaje / Motivo de visita: `<textarea required minlength="10">`
- Botón de envío: `<button type="submit">`

La validación SHALL realizarse con atributos HTML nativos (`required`, `type`, `minlength`). No SHALL depender de una librería JS de validación.

#### Scenario: Envío de formulario con campo vacío

- **WHEN** el usuario hace click en "Enviar" con un campo requerido vacío
- **THEN** el navegador SHALL mostrar su validación nativa (`reportValidity`) impidiendo el envío

#### Scenario: Formulario accesible en mobile

- **WHEN** el usuario abre el formulario en un dispositivo móvil
- **THEN** los campos de tipo `tel` y `email` SHALL activar el teclado numérico y de correo respectivamente en el teclado virtual del dispositivo

### Requirement: Botón flotante WhatsApp (FAB) sticky

La página SHALL renderizar un botón de acción flotante (`position: fixed`, `z-index` alto) con el ícono de WhatsApp, siempre visible en la esquina inferior derecha durante el scroll. El FAB SHALL:
- Tener un `href` a `https://wa.me/[número]?text=[mensaje+precargado]`
- Tener `target="_blank" rel="noopener noreferrer"`
- Tener un `aria-label="Contactar por WhatsApp"` accesible
- Área de toque mínima de 56×56px

#### Scenario: FAB visible durante el scroll

- **WHEN** el usuario hace scroll en cualquier posición de la página
- **THEN** el FAB de WhatsApp SHALL permanecer visible y clickeable en la esquina inferior derecha

#### Scenario: FAB accesible por teclado

- **WHEN** el usuario navega por la página usando Tab
- **THEN** el FAB SHALL recibir foco y SHALL ser activable con Enter/Space

### Requirement: Información de contacto estática

Junto al formulario (layout de 2 columnas en desktop, apilado en mobile) SHALL mostrarse:
- Número de teléfono como `<a href="tel:+[número]">` con ícono de teléfono
- Número de WhatsApp como `<a href="https://wa.me/[número]">` con ícono de WhatsApp
- Email de contacto como `<a href="mailto:[email]">` con ícono de email
- Horario de atención (texto estático)

#### Scenario: Click en teléfono desde mobile

- **WHEN** un usuario en mobile hace click en el enlace de teléfono
- **THEN** SHALL intentar iniciar una llamada telefónica al número de destino

### Requirement: Acción del formulario configurable

El `<form>` SHALL tener su `action` apuntando a un endpoint o servicio de formularios externo (ej: Formspree, Netlify Forms) configurable vía variable de entorno o prop del componente. En ausencia de acción configurada, el formulario SHALL mostrar los datos en consola (modo desarrollo) sin errores.

#### Scenario: Envío exitoso con Formspree configurado

- **WHEN** el usuario completa todos los campos requeridos y hace click en "Enviar"
- **THEN** el formulario SHALL enviarse al endpoint configurado y SHALL mostrar un mensaje de confirmación al usuario (éxito o error)
